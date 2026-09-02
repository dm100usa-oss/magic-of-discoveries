import { NextResponse } from "next/server";
import { activeLangs } from "@/data/dictionaries";
import type { UiLang } from "@/data/books";
import {
  hasPdf,
  pdfProductName,
  PDF_PRICE_CENTS,
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
      "metadata[book]": id,
      "metadata[format]": format,
      "metadata[lang]": lang,
      /* Тот же набор кладем на сам платеж: в письме и в панели Stripe
         сразу видно, что именно куплено. */
      "payment_intent_data[metadata][book]": id,
      "payment_intent_data[metadata][format]": format,
      locale: lang === "es" ? "es" : "en",
      success_url: `${origin}/${lang}/thank-you?s={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${back}`,
    });

    return NextResponse.redirect(session.url as string, 303);
  } catch (error) {
    console.error("checkout failed", error);
    return NextResponse.redirect(`${origin}${back}?pay=error`, 303);
  }
}
