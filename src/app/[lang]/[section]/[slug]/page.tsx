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
import {
  pagesForLang,
  pageBySlug,
  sheetCount,
  printableUrl,
  previewUrl,
  allSheets,
  groupsForLang,
  coloringPageForBook,
} from "@/data/coloringPages";
import {
  guidesForLang,
  guideBySlug,
  guideBookId,
  awardsForBook,
  retailers,
} from "@/data/method";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { BookCard, PageHead } from "@/components/Chrome";
import { RatingLink } from "@/components/Rating";
import { SITE_URL, PUBLISHER, AUTHORS } from "@/lib/site";
import { sectionFromSlug, sectionSlugs, itemPath, sectionPath } from "@/lib/routes";

export function generateStaticParams() {
  const out: { lang: string; section: string; slug: string }[] = [];
  for (const lang of activeLangs) {
    for (const b of booksForLang(lang)) {
      out.push({ lang, section: sectionSlugs[lang].books, slug: b.slug[lang]! });
    }
    for (const p of pagesForLang(lang)) {
      out.push({ lang, section: sectionSlugs[lang].coloring, slug: p.slug[lang]! });
    }
    for (const g of guidesForLang(lang)) {
      out.push({ lang, section: sectionSlugs[lang].method, slug: g.slug[lang]! });
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
      openGraph: {
        title: copy.title,
        description: copy.lead,
        type: "article",
        images: book.cover ? [{ url: book.cover, width: 900, height: 1160 }] : undefined,
      },
    };
  }

  if (s === "coloring") {
    const page = pageBySlug(lang, slug);
    const copy = page?.copy[lang];
    if (!page || !copy) return {};
    const languages: Record<string, string> = {};
    for (const l of activeLangs) {
      if (page.slug[l]) languages[l] = `${SITE_URL}${itemPath(l, "coloring", page.slug[l]!)}`;
    }
    return {
      title: copy.title,
      description: copy.lead,
      alternates: { canonical: itemPath(lang, "coloring", slug), languages },
      openGraph: {
        title: copy.title,
        description: copy.lead,
        type: "article",
        images: [{ url: previewUrl(page.groups[0].sheets[0].id, lang) }],
      },
    };
  }

  if (s === "method") {
    const guide = guideBySlug(lang, slug);
    const copy = guide?.copy[lang];
    if (!guide || !copy) return {};
    const languages: Record<string, string> = {};
    for (const l of activeLangs) {
      if (guide.slug[l]) languages[l] = `${SITE_URL}${itemPath(l, "method", guide.slug[l]!)}`;
    }
    return {
      title: copy.title,
      description: copy.lead,
      alternates: { canonical: itemPath(lang, "method", slug), languages },
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
          {label[f.kind]} · {f.price}
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

  /* ---------- Бесплатные раскраски: страница темы ---------- */
  if (s === "coloring") {
    const page = pageBySlug(lang, slug);
    const copy = page?.copy[lang];
    if (!page || !copy) notFound();
    const f = t.free;
    const bookId = lang === "es" && page.fromBookIdEs ? page.fromBookIdEs : page.fromBookId;
    const pick = bookById(bookId);
    const pickCopy = pick?.copy[lang];
    const pickSlug = pick?.slug[lang];
    const total = sheetCount(page, lang);
    const groups = groupsForLang(page, lang);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: copy.title,
          description: copy.lead,
          inLanguage: lang,
          author: { "@type": "Organization", name: PUBLISHER },
          publisher: { "@type": "Organization", name: PUBLISHER },
          mainEntityOfPage: `${SITE_URL}${itemPath(lang, "coloring", slug)}`,
          image: groups
            .flatMap((g) => g.sheets)
            .slice(0, 6)
            .map((sh) => `${SITE_URL}${previewUrl(sh.id, lang)}`),
        },
        {
          "@type": "FAQPage",
          mainEntity: copy.faq.map((q) => ({
            "@type": "Question",
            name: q.q,
            acceptedAnswer: { "@type": "Answer", text: q.a },
          })),
        },
      ],
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <PageHead title={copy.title} lead={copy.lead} />

        <div className="wrap sheets-intro">
          <div className="prose">
            {copy.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <div className="howto">
            <p className="howto__title">{f.howToTitle}</p>
            <ul>
              {copy.howTo.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        {groups.map((group) => (
          <section className="wrap" key={group.id}>
            <h2 className="section">{group.title[lang] ?? group.title.en}</h2>
            <div className="sheets">
              {group.sheets.map((sh) => {
                const name = sh.name[lang] ?? sh.name.en!;
                return (
                  <figure className="sheet" key={sh.id}>
                    <img
                      src={previewUrl(sh.id, lang)}
                      alt={f.sheetAlt.replace("{name}", name)}
                      width={642}
                      height={822}
                      loading="lazy"
                    />
                    <figcaption>
                      <h3>{f.sheetTitle.replace("{name}", name)}</h3>
                      <p className="sheet__links">
                        <a className="btn btn--pink" href={printableUrl(sh.id, "letter", lang)} download>
                          {f.printLetter}
                        </a>
                        <a className="btn btn--ghost" href={printableUrl(sh.id, "a4", lang)} download>
                          {f.printA4}
                        </a>
                      </p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        ))}

        {/* Решение: книга, из которой взяты рисунки */}
        {pick && pickCopy && pickSlug ? (
          <div className="band band--cream">
            <div className="wrap">
              <h2 className="section">{copy.pickTitle}</h2>
              <p className="lead">{copy.pickLead.replace("{n}", String(total))}</p>
              <div className="pick">
                <Link href={itemPath(lang, "books", pickSlug)} className="pick__cover">
                  {pick.cover ? (
                    <img
                      src={pick.cover}
                      alt={pickCopy.title}
                      width={pick.coverSize?.w ?? 900}
                      height={pick.coverSize?.h ?? 1160}
                      loading="lazy"
                    />
                  ) : (
                    <span className="card__placeholder">{pickCopy.title}</span>
                  )}
                </Link>
                <div>
                  <p className="subtitle">
                    <Link href={itemPath(lang, "books", pickSlug)}>{pickCopy.title}</Link>
                  </p>
                  <ul className="inside">
                    {copy.pickPoints.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <BuyButtons book={pick} lang={lang} />
                  {pick.rating ? (
                    <RatingLink
                      rating={pick.rating}
                      asin={(pick.formats.find((x) => x.kind !== "kindle") ?? pick.formats[0]).asin}
                      labelReviews={t.book.ratingReviews}
                      labelSource={t.book.ratingSource}
                      ariaLabel={t.book.ratingAria}
                    />
                  ) : null}
                  <p className="buy-note">{t.book.formatNote}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="wrap" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}>
          <h2 className="section">{f.faqTitle}</h2>
          <div className="faq">
            {copy.faq.map((q) => (
              <details key={q.q}>
                <summary>{q.q}</summary>
                <p>{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </>
    );
  }

  /* ---------- Страница-руководство раздела Метод ---------- */
  if (s === "method") {
    const guide = guideBySlug(lang, slug);
    const copy = guide?.copy[lang];
    if (!guide || !copy) notFound();
    const m = t.method;
    const pick = bookById(guideBookId(guide, lang));
    const pickCopy = pick?.copy[lang];
    const pickSlug = pick?.slug[lang];

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: copy.title,
          description: copy.lead,
          inLanguage: lang,
          author: { "@type": "Organization", name: PUBLISHER },
          publisher: { "@type": "Organization", name: PUBLISHER },
          mainEntityOfPage: `${SITE_URL}${itemPath(lang, "method", slug)}`,
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
        <PageHead title={copy.title} lead={copy.lead} />

        <div className="wrap guide">
          <div className="prose">
            {copy.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>

          <h2 className="section">{m.guideCheck}</h2>
          <ul className="inside">
            {copy.checklist.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          {pick && pickCopy && pickSlug ? (
            <>
              <h2 className="section">{m.guidePick}</h2>
              <div className="pick">
                <Link href={itemPath(lang, "books", pickSlug)} className="pick__cover">
                  {pick.cover ? (
                    <img
                      src={pick.cover}
                      alt={pickCopy.title}
                      width={pick.coverSize?.w ?? 900}
                      height={pick.coverSize?.h ?? 1160}
                      loading="lazy"
                    />
                  ) : (
                    <span className="card__placeholder">{pickCopy.title}</span>
                  )}
                </Link>
                <div>
                  <p className="lead-text">{copy.pick}</p>
                  <p className="subtitle">
                    <Link href={itemPath(lang, "books", pickSlug)}>{pickCopy.title}</Link>
                  </p>
                  <p>{pickCopy.subtitle}</p>
                  <BuyButtons book={pick} lang={lang} />
                  {pick.rating ? (
                    <RatingLink
                      rating={pick.rating}
                      asin={(pick.formats.find((f) => f.kind !== "kindle") ?? pick.formats[0]).asin}
                      labelReviews={t.book.ratingReviews}
                      labelSource={t.book.ratingSource}
                      ariaLabel={t.book.ratingAria}
                    />
                  ) : null}
                  <p className="buy-note">{t.book.formatNote}</p>
                </div>
              </div>
            </>
          ) : null}

          <h2 className="section">{m.guideFaq}</h2>
          <div className="faq">
            {copy.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          <p style={{ padding: "var(--gap-4) 0 var(--band-y)" }}>
            <Link href={sectionPath(lang, "method")}>{m.guideBack}</Link>
          </p>
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
  const bookAwards = awardsForBook(book.id);
  const freePage = coloringPageForBook(book.id);
  const freeSlug = freePage?.slug[lang];
  const freeSheets = freePage && freeSlug ? allSheets(freePage, lang).slice(0, 10) : [];

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
        image: book.cover ? `${SITE_URL}${book.cover}` : undefined,
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
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={copy.title}
                  width={book.coverSize?.w ?? 900}
                  height={book.coverSize?.h ?? 1160}
                  fetchPriority="high"
                />
              ) : (
                <span className="card__placeholder">{copy.title}</span>
              )}
            </div>
          </div>

          <div>
            <p className="subtitle">{copy.subtitle}</p>
            <p className="lead-text">{copy.lead}</p>

            <BuyButtons book={book} lang={lang} />
            {book.rating && paper ? (
              <RatingLink
                rating={book.rating}
                asin={paper.asin}
                labelReviews={t.book.ratingReviews}
                labelSource={t.book.ratingSource}
                ariaLabel={t.book.ratingAria}
              />
            ) : null}
            <p className="buy-note">
              {t.book.formatNote}
              {book.pdfUrl ? ` ${t.book.pdfNote}` : ""}
            </p>

            {bookAwards.length ? (
              <ul className="award-list">
                {bookAwards.map((a) => (
                  <li key={`${a.program}-${a.year}`}>
                    <span className="award-list__tag">{t.method.bookAward}</span>{" "}
                    {a.result[lang] ?? a.result.en} · {a.category[lang] ?? a.category.en} ·{" "}
                    <a href={a.programUrl} rel="nofollow noopener" target="_blank">
                      {a.program}
                    </a>{" "}
                    {a.year}
                  </li>
                ))}
              </ul>
            ) : null}

            {book.bannerLead || book.artwork?.length || book.banners?.length ? (
              <div className="showcase">
                {book.showcaseLead?.[lang] ?? book.showcaseLead?.en ? (
                  <p className="showcase__lead">
                    {book.showcaseLead[lang] ?? book.showcaseLead.en}
                  </p>
                ) : null}

                {book.bannerLead ? (
                  <img
                    className="theme-banner"
                    src={book.bannerLead.file}
                    alt={book.bannerLead.alt[lang] ?? book.bannerLead.alt.en ?? copy.title}
                    width={book.bannerLead.w}
                    height={book.bannerLead.h}
                    fetchPriority="high"
                  />
                ) : null}

                {book.artwork?.length ? (
                  <div className="artwork">
                    {book.artwork.map((a) => (
                      <img
                        key={a.file}
                        src={a.file}
                        alt={a.alt[lang] ?? a.alt.en ?? copy.title}
                        width={a.w}
                        height={a.h}
                        loading="lazy"
                      />
                    ))}
                  </div>
                ) : null}

                {book.banners?.map((b) => (
                  <img
                    key={b.file}
                    className="theme-banner"
                    src={b.file}
                    alt={b.alt[lang] ?? b.alt.en ?? b.alt.es ?? copy.title}
                    width={b.w}
                    height={b.h}
                    loading="lazy"
                  />
                ))}
              </div>
            ) : null}

            <h2 className="section">{t.book.inside}</h2>
            <ul className="inside">
              {copy.inside.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <h2 className="section">{t.book.forWhom}</h2>
            <p>{copy.forWhom}</p>

            {freePage && freeSheets.length ? (
              <>
                <h2 className="section">{t.free.bookSheetsTitle}</h2>
                <p>{t.free.bookSheetsLead}</p>
                <div className="fan">
                  {freeSheets.map((sh, i) => (
                    <img
                      key={sh.id}
                      src={previewUrl(sh.id, lang)}
                      alt={t.free.sheetAlt.replace("{name}", sh.name[lang] ?? sh.name.en!)}
                      width={642}
                      height={822}
                      loading="lazy"
                      style={{ ["--i" as string]: i }}
                    />
                  ))}
                </div>
                <p style={{ marginBottom: "var(--gap-3)" }}>
                  <Link className="btn btn--mint" href={itemPath(lang, "coloring", freeSlug!)}>
                    {t.free.bookSheetsCta}
                  </Link>
                </p>
              </>
            ) : null}



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

            <p className="method-line">
              {t.method.bookMethod}:{" "}
              <Link href={sectionPath(lang, "method")}>{t.method.title}</Link>
            </p>

            <p className="retail-line">
              {t.method.bookRetail}:{" "}
              {retailers
                .filter((r) => r.name !== "Amazon")
                .map((r, i) => (
                  <span key={r.name}>
                    {i > 0 ? " · " : ""}
                    <a href={r.url} rel="nofollow noopener" target="_blank">
                      {r.name}
                    </a>
                  </span>
                ))}
            </p>

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
          <section style={{ padding: "0 clamp(1rem, 4vw, 2rem) var(--band-y)" }}>
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
