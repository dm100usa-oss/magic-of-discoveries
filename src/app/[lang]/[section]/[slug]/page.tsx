import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  bookBySlug,
  bookById,
  booksForLang,
  amazonUrl,
  type UiLang,
  type Book,
} from "@/data/books";
import { coloringPages, pagesForLang } from "@/data/coloringPages";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { BookCard, PageHead } from "@/components/Chrome";
import { SITE_URL, PUBLISHER, AUTHORS } from "@/lib/site";
import { sectionFromSlug, sectionSlugs, itemPath } from "@/lib/routes";

export function generateStaticParams() {
  const out: { lang: string; section: string; slug: string }[] = [];
  for (const lang of activeLangs) {
    for (const b of booksForLang(lang)) {
      out.push({ lang, section: sectionSlugs[lang].books, slug: b.slug[lang]! });
    }
    for (const p of pagesForLang(lang)) {
      out.push({ lang, section: sectionSlugs[lang].coloring, slug: p.slug[lang]! });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, section, slug: rawSlug } = await params;
  const lang = raw as UiLang;
  const s = sectionFromSlug(lang, decodeURIComponent(section));
  const slug = decodeURIComponent(rawSlug);

  if (s === "books") {
    const book = bookBySlug(lang, slug);
    const copy = book?.copy[lang];
    if (!book || !copy) return {};
    const languages: Record<string, string> = {};
    for (const l of activeLangs) {
      if (book.slug[l]) languages[l] = `${SITE_URL}${itemPath(l, "books", book.slug[l]!)}`;
    }
    return {
      title: copy.title,
      description: copy.subtitle,
      alternates: { canonical: itemPath(lang, "books", slug), languages },
      openGraph: { title: copy.title, description: copy.lead, type: "article" },
    };
  }

  if (s === "coloring") {
    const page = coloringPages.find((p) => p.slug[lang] === slug);
    const copy = page?.copy[lang];
    if (!page || !copy) return {};
    return {
      title: copy.title,
      description: copy.lead,
      alternates: { canonical: itemPath(lang, "coloring", slug) },
    };
  }
  return {};
}

function BuyButtons({ book, lang }: { book: Book; lang: UiLang }) {
  const t = dictionaries[lang].book;
  const label = { paperback: t.buyPaperback, hardcover: t.buyHardcover, kindle: t.buyKindle } as const;
  return (
    <div className="buys">
      {book.formats.map((f) => (
        <a
          key={f.asin}
          className={`btn ${f.kind === "kindle" ? "btn--ghost" : "btn--sun"}`}
          href={amazonUrl(f.asin)}
          rel="nofollow sponsored noopener"
          target="_blank"
        >
          {label[f.kind]} — {f.price}
        </a>
      ))}
      {book.pdfUrl ? (
        <a className="btn btn--pink" href={book.pdfUrl} rel="noopener" target="_blank">
          {t.buyPdf}
        </a>
      ) : null}
    </div>
  );
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>;
}) {
  const { lang: raw, section, slug: rawSlug } = await params;
  const lang = raw as UiLang;
  const s = sectionFromSlug(lang, decodeURIComponent(section));
  const slug = decodeURIComponent(rawSlug);
  const t = dictionaries[lang];

  /* ---------- Отдельная бесплатная раскраска ---------- */
  if (s === "coloring") {
    const page = coloringPages.find((p) => p.slug[lang] === slug);
    const copy = page?.copy[lang];
    if (!page || !copy) notFound();
    const source = bookById(page.fromBookId);
    return (
      <>
        <PageHead title={copy.title} />
        <div className="wrap" style={{ padding: "var(--band-y) 0" }}>
          <p className="lead">{copy.lead}</p>
          <a className="btn btn--pink" href={page.file} download>
            {copy.title}
          </a>
          {source && source.slug[lang] ? (
            <p style={{ marginTop: "var(--gap-4)" }}>
              <Link href={itemPath(lang, "books", source.slug[lang]!)}>
                {source.copy[lang]?.title}
              </Link>
            </p>
          ) : null}
        </div>
      </>
    );
  }

  /* ---------- Страница книги ---------- */
  if (s !== "books") notFound();
  const book = bookBySlug(lang, slug);
  const copy = book?.copy[lang];
  if (!book || !copy) notFound();

  const author = AUTHORS[book.author];
  const pair = book.pairId ? bookById(book.pairId) : undefined;
  const pairLang: UiLang | undefined = pair
    ? pair.editionLang === "es"
      ? "es"
      : "en"
    : undefined;

  const related = booksForLang(lang)
    .filter((b) => b.id !== book.id && (b.series === book.series || b.age === book.age))
    .slice(0, 4);

  const paper = book.formats.find((f) => f.kind !== "kindle") ?? book.formats[0];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        name: copy.title,
        author: { "@type": "Person", name: author.name },
        publisher: { "@type": "Organization", name: PUBLISHER },
        inLanguage: book.editionLang === "bilingual" ? ["en", "es"] : book.editionLang,
        isbn: paper?.asin,
        bookFormat:
          paper?.kind === "hardcover"
            ? "https://schema.org/Hardcover"
            : "https://schema.org/Paperback",
        description: copy.lead,
        typicalAgeRange: book.age === "teens-adults" ? "13-" : book.age,
        offers: book.formats.map((f) => ({
          "@type": "Offer",
          price: f.price.replace("$", ""),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: amazonUrl(f.asin),
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHead title={copy.title} />

      <div className="wrap">
        <div className="book">
          <div className="book__cover">
            <div className="inner">
              <span className="card__placeholder">{copy.title}</span>
            </div>
          </div>

          <div>
            <p className="subtitle">{copy.subtitle}</p>
            <p className="lead-text">{copy.lead}</p>

            <BuyButtons book={book} lang={lang} />
            <p className="buy-note">
              {t.book.formatNote}
              {book.pdfUrl ? ` ${t.book.pdfNote}` : ""}
            </p>

            <h2 className="section">{t.book.inside}</h2>
            <ul className="inside">
              {copy.inside.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <h2 className="section">{t.book.forWhom}</h2>
            <p>{copy.forWhom}</p>

            <div className="specs">
              <dl>
                <dt>{t.book.ageLabel}</dt>
                <dd>{t.catalog.ages[book.age]}</dd>
                {book.drawings ? (
                  <>
                    <dt>{t.book.drawings}</dt>
                    <dd>{book.drawings}</dd>
                  </>
                ) : null}
                <dt>{t.book.size}</dt>
                <dd>{book.size}</dd>
                <dt>ISBN / ASIN</dt>
                <dd>{paper?.asin}</dd>
                <dt>{t.book.author}</dt>
                <dd>
                  <a href={author.amazon} rel="nofollow noopener" target="_blank">
                    {author.name}
                  </a>
                </dd>
                <dt>{t.book.publisher}</dt>
                <dd>{PUBLISHER}</dd>
              </dl>
            </div>

            {pair && pairLang && pair.slug[pairLang] ? (
              <p>
                {t.book.alsoIn}{" "}
                <Link href={itemPath(pairLang, "books", pair.slug[pairLang]!)}>
                  {pairLang === "es" ? "Español" : "English"}
                </Link>
              </p>
            ) : null}

            <h2 className="section" style={{ marginTop: "var(--gap-4)" }}>
              {t.book.faq}
            </h2>
            <div className="faq">
              {copy.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {related.length ? (
          <section style={{ padding: "0 0 var(--band-y)" }}>
            <p className="script-title">{t.book.related}</p>
            <div className="grid">
              {related.map((b) => (
                <BookCard key={b.id} book={b} lang={lang} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
