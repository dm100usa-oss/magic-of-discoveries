import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import type { UiLang } from "@/data/books";
import { activeLangs } from "@/data/dictionaries";
import { shopCopy } from "@/data/shopCopy";
import { hasPdf, downloadUrl, pdfProductName, type PdfFormat } from "@/lib/pdfShop";
import { SITE_URL, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

/* Сообщение от Stripe о том, что деньги пришли.

   Stripe стучится сюда сам, сразу после оплаты. Мы проверяем подпись,
   чтобы никто посторонний не мог прислать поддельное "оплачено",
   и отправляем покупателю письмо со ссылкой на файл.

   Если почтовая служба еще не подключена, письмо просто не уходит,
   и это не ломает покупку: ссылку человек уже получил на экране
   сразу после оплаты. */

export const runtime = "nodejs";

/** Проверяем, что сообщение действительно от Stripe.
    Подпись считается по времени отправки и телу письма. */
function signatureIsValid(body: string, header: string, secret: string) {
  const parts = Object.fromEntries(
    header.split(",").map((p) => p.trim().split("=") as [string, string])
  );
  const time = parts.t;
  const sent = parts.v1;
  if (!time || !sent) return false;

  /* Старые сообщения не принимаем: пять минут это запас на дорогу. */
  const age = Math.abs(Date.now() / 1000 - Number(time));
  if (!Number.isFinite(age) || age > 300) return false;

  const expected = createHmac("sha256", secret)
    .update(`${time}.${body}`)
    .digest("hex");
  const a = Buffer.from(sent);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function sendLetter(to: string, lang: UiLang, book: string, format: PdfFormat) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM_EMAIL;
  if (!apiKey || !from) return;

  const t = shopCopy[lang];
  const link = downloadUrl(SITE_URL, book as never, format);
  const title = pdfProductName(book as never, lang);
  const sheet = format === "letter" ? "Letter 8.5 x 11 in" : "A4";

  const html = `<div style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#222">
<p>${t.emailLead}</p>
<p><strong>${title}</strong><br>${sheet}</p>
<p><a href="${link}" style="display:inline-block;background:#1892c4;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none">${t.download}</a></p>
<p>${t.expiry}</p>
<p>${t.help}</p>
<hr style="border:none;border-top:1px solid #ddd;margin:24px 0">
<p style="font-size:13px;color:#666">${t.emailSign}</p>
</div>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${SITE_NAME} <${from}>`,
      reply_to: CONTACT_EMAIL,
      to: [to],
      subject: t.emailSubject,
      html,
    }),
  });
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const header = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!secret || !header || !signatureIsValid(body, header, secret)) {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  const event = JSON.parse(body) as {
    type: string;
    data: { object: Record<string, unknown> };
  };

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const meta = (session.metadata ?? {}) as Record<string, string>;
    const details = session.customer_details as { email?: string } | undefined;
    const email = details?.email;
    const lang = (
      activeLangs.includes(meta.lang as UiLang) ? meta.lang : "en"
    ) as UiLang;
    const format: PdfFormat = meta.format === "a4" ? "a4" : "letter";

    if (email && hasPdf(meta.book) && session.payment_status === "paid") {
      try {
        await sendLetter(email, lang, meta.book, format);
      } catch (error) {
        /* Письмо не ушло, но покупка состоялась и ссылку человек уже
           видел на экране. Роняем только запись в журнал. */
        console.error("order letter failed", error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
