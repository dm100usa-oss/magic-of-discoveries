import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { UiLang } from "@/data/books";
import { activeLangs } from "@/data/dictionaries";
import { shopCopy } from "@/data/shopCopy";
import { hasPdf, signDownload, type PdfFormat } from "@/lib/pdfShop";
import { paidOrder } from "@/lib/stripe";
import { sectionPath } from "@/lib/routes";

/* Страница после оплаты.

   Ссылка на файл выдается только после того, как Stripe подтвердил,
   что деньги получены. Номер заказа в адресе сам по себе ничего не
   открывает: мы каждый раз спрашиваем у Stripe, оплачен ли он.

   Поисковикам страница закрыта: показывать ее в выдаче незачем. */

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ s?: string }>;
}) {
  const { lang: raw } = await params;
  if (!activeLangs.includes(raw as UiLang)) notFound();
  const lang = raw as UiLang;
  const t = shopCopy[lang];

  const { s } = await searchParams;

  let link: string | null = null;
  if (s) {
    try {
      const order = await paidOrder(s);
      if (order && hasPdf(order.book)) {
        const format = (
          order.format === "a4" ? "a4" : "letter"
        ) as PdfFormat;
        link = `/api/download?t=${signDownload(order.book, format, s)}`;
      }
    } catch (error) {
      console.error("thank-you lookup failed", error);
    }
  }

  return (
    <main className="wrap thanks">
      {link ? (
        <>
          <h1>{t.title}</h1>
          <p className="lead">{t.lead}</p>
          <p className="buys">
            <a className="btn btn--sky" href={link}>
              {t.download}
            </a>
          </p>
          <p className="note">{t.expiry}</p>
          <p className="note">{t.emailed}</p>
          <p className="note">{t.help}</p>
        </>
      ) : (
        <>
          <h1>{t.title}</h1>
          <p className="lead">{t.notFound}</p>
        </>
      )}
      <p>
        <Link href={sectionPath(lang, "books")}>{t.backHome}</Link>
      </p>
    </main>
  );
}
