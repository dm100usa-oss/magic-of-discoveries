import { NextResponse } from "next/server";
import { activeLangs } from "@/data/dictionaries";
import { shopCopy } from "@/data/shopCopy";
import type { UiLang } from "@/data/books";
import {
  hasPdf,
  pdfProductName,
  PDF_PRICE_CENTS,
  PDF_TAX_CODE,
  type PdfFormat,
} from "@/lib/pdfShop";
import { stripe } from "@/lib/stripe";

/* Открывает страницу оплаты Stripe. Сюда приходит нажатие кнопки
   "скачать PDF" со страницы книги.

   Цену и название товара берем на своей стороне, из каталога.
   Из браузера приходит только номер книги и размер листа: цену,
   присланную снаружи, доверять нельзя. */

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const id = String(form.get("book") ?? "");
  const format = String(form.get("format") ?? "") as PdfFormat;
  const rawLang = String(form.get("lang") ?? "en");
  const lang = (activeLangs as readonly string[]).includes(rawLang)
    ? (rawLang as UiLang)
    : "en";
  const back = String(form.get("back") ?? `/${lang}`);

  if (!hasPdf(id) || (format !== "letter" && format !== "a4")) {
    return NextResponse.json({ error: "unknown item" }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const sheet = format === "letter" ? "Letter 8.5 x 11 in" : "A4";

  try {
    const session = await stripe("checkout/sessions", {
      mode: "payment",
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "usd",
      "line_items[0][price_data][unit_amount]": String(PDF_PRICE_CENTS),
      "line_items[0][price_data][product_data][name]":
        pdfProductName(id, lang),
      "line_items[0][price_data][product_data][description]":
        `Printable PDF, ${sheet}`,
      "line_items[0][price_data][product_data][tax_code]": PDF_TAX_CODE,
      "metadata[book]": id,
      "metadata[format]": format,
      "metadata[lang]": lang,
      locale: lang === "es" ? "es" : "en",
      success_url: `${origin}/${lang}/thank-you?s={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${back}`,
    });

    return NextResponse.redirect(session.url as string, 303);
  } catch (error) {
    /* Причина сбоя уходит в журнал сайта, его видно в настройках Vercel.
       Покупателю показываем короткое человеческое объяснение на его
       языке и дорогу назад к книге. Технические подробности на экране
       ему ничего не дают, а доверие к магазину подрывают. */
    console.error("checkout failed", error);
    return failPage(lang, back);
  }
}

/* Страница "оплата не открылась".

   Собирается здесь, а не в общем макете сайта: сюда мы попадаем из
   формы, отдельного адреса у этой страницы нет и в поиске ей делать
   нечего. Вид простой, но в цветах сайта, чтобы человек понимал,
   что он никуда не ушел. */
function failPage(lang: UiLang, back: string) {
  const t = shopCopy[lang];

  /* Адрес возврата пришел из браузера, поэтому проверяем его: пускаем
     только внутрь своего сайта. Если что-то не так, ведем на главную. */
  const safeBack =
    back.startsWith("/") && !back.startsWith("//") ? back : `/${lang}`;

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(t.failTitle)}</title>
</head>
<body style="margin:0;background:#ffffff;color:#33202c;font-family:'Nunito',ui-sans-serif,system-ui,sans-serif;font-size:1.05rem;line-height:1.65">
<main style="max-width:34rem;margin:0 auto;padding:3.5rem 1.25rem">
<h1 style="font-size:1.5rem;line-height:1.3;color:#4d3843;margin:0 0 1rem">${esc(t.failTitle)}</h1>
<p style="margin:0 0 2rem">${esc(t.failText)}</p>
<p style="margin:0"><a href="${esc(safeBack)}" style="display:inline-block;background:#0d5d80;color:#ffffff;padding:0.85rem 1.6rem;border-radius:10px;text-decoration:none">${esc(t.failBack)}</a></p>
</main>
</body>
</html>`;

  return new NextResponse(html, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
