import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  bookBySlug,
  bookById,
  booksForLang,
  amazonUrl,
  bookIsbn13,
  wikidataUrl,
  bookVideo,
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
import { SITE_URL, PUBLISHER, AUTHORS, ADDRESS, SITE_PUBLISHED, SITE_UPDATED, OG_IMAGE } from "@/lib/site";
import { sectionFromSlug, sectionSlugs, itemPath, sectionPath } from "@/lib/routes";
import { langAlternates, breadcrumbs } from "@/lib/schema";
import { reviewsForBook, editorialForBook } from "@/lib/reviews";
import { topicsForBook, allTopics, TOPIC_PREVIEW } from "@/data/bookTopics";

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
    const languages = langAlternates(
      Object.fromEntries(
        activeLangs
          .filter((l) => book.slug[l])
          .map((l) => [l, `${SITE_URL}${itemPath(l, "books", book.slug[l]!)}`])
      )
    );
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
    const languages = langAlternates(
      Object.fromEntries(
        activeLangs
          .filter((l) => page.slug[l])
          .map((l) => [l, `${SITE_URL}${itemPath(l, "coloring", page.slug[l]!)}`])
      )
    );
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
    const languages = langAlternates(
      Object.fromEntries(
        activeLangs
          .filter((l) => guide.slug[l])
          .map((l) => [l, `${SITE_URL}${itemPath(l, "method", guide.slug[l]!)}`])
      )
    );
    return {
      title: copy.title,
      description: copy.lead,
      alternates: { canonical: itemPath(lang, "method", slug), languages },
      openGraph: {
        title: copy.title,
        description: copy.lead,
        type: "article",
        publishedTime: SITE_PUBLISHED,
        modifiedTime: SITE_UPDATED,
        images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height }],
      },
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
          className={`btn ${f.kind === "kindle" ? "btn--ghost" : "btn--pink"}`}
          href={amazonUrl(f.asin)}
          rel="nofollow sponsored noopener"
          target="_blank"
        >
          {label[f.kind]} · {f.price}
        </a>
      ))}
      {book.pdfUrl ? (
        <a className="btn btn--sky" href={book.pdfUrl} rel="noopener" target="_blank">
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
          publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
          datePublished: SITE_PUBLISHED,
          dateModified: SITE_UPDATED,
          mainEntityOfPage: `${SITE_URL}${itemPath(lang, "coloring", slug)}`,
          image: groups
            .flatMap((g) => g.sheets)
            .slice(0, 6)
            .map((sh) => `${SITE_URL}${previewUrl(sh.id, lang)}`),
        },
        /* Права на каждый лист. Google показывает такие картинки
           со значком "лицензируемое" и ставит ссылку на владельца. */
        ...groups.flatMap((g) =>
          g.sheets.map((sh) => ({
            "@type": "ImageObject",
            contentUrl: `${SITE_URL}${previewUrl(sh.id, lang)}`,
            name: f.sheetTitle.replace("{name}", sh.name[lang] ?? sh.name.en!),
            creator: { "@type": "Person", name: AUTHORS.ricardo.name },
            copyrightNotice: `© ${new Date().getFullYear()} ${PUBLISHER}`,
            creditText: PUBLISHER,
            license: `${SITE_URL}${itemPath(lang, "coloring", slug)}`,
            acquireLicensePage: `${SITE_URL}${sectionPath(lang, "contact")}`,
          }))
        ),
        {
          "@type": "FAQPage",
          mainEntity: copy.faq.map((q) => ({
            "@type": "Question",
            name: q.q,
            acceptedAnswer: { "@type": "Answer", text: q.a },
          })),
        },
        breadcrumbs(lang, [
          { name: t.nav.coloringPages, path: sectionPath(lang, "coloring") },
          { name: copy.title, path: itemPath(lang, "coloring", slug) },
        ]),
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
            <div className={page.spread ? "sheets sheets--spread" : "sheets"}>
              {group.sheets.map((sh) => {
                const name = sh.name[lang] ?? sh.name.en!;
                return (
                  <figure className="sheet" key={sh.id}>
                    <a
                      className="sheet__link"
                      href={printableUrl(sh.id, lang === "es" ? "a4" : "letter", lang)}
                      download
                    >
                      <img
                        src={previewUrl(sh.id, lang)}
                        alt={(copy.sheetAlt ?? f.sheetAlt).replace("{name}", name)}
                        width={page.spread ? 1294 : 642}
                        height={page.spread ? 816 : 822}
                        loading="lazy"
                      />
                    </a>
                    <figcaption>
                      <h3>{(copy.sheetTitle ?? f.sheetTitle).replace("{name}", name)}</h3>
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
          <p className="rights">{f.rights}</p>

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
          publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
          datePublished: SITE_PUBLISHED,
          dateModified: SITE_UPDATED,
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
        breadcrumbs(lang, [
          { name: t.nav.method, path: sectionPath(lang, "method") },
          { name: copy.title, path: itemPath(lang, "method", slug) },
        ]),
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
  const video = bookVideo(book.id);
  const bookRevs = reviewsForBook(book.id, lang);
  const topicGroups = topicsForBook(book.id);
  const topicList = allTopics(topicGroups, lang);
  const editorial = editorialForBook(book.id);
  const bookAwards = awardsForBook(book.id);
  const freePage = coloringPageForBook(book.id);
  const freeSlug = freePage?.slug[lang];
  const freeSheets =
    freePage && freeSlug ? allSheets(freePage, lang).slice(0, freePage.spread ? 6 : 10) : [];
  // Сколько страниц реально можно распечатать. Разворот это две страницы.
  const freeSheetPages =
    freePage && freeSlug ? sheetCount(freePage, lang) * (freePage.spread ? 2 : 1) : 0;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        name: copy.title,
        author: { "@type": "Person", name: author.name },
        publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
        inLanguage: book.editionLang === "bilingual" ? ["en", "es"] : book.editionLang,
        isbn: bookIsbn13(book),
        numberOfPages: book.pages,
        /* Полный состав книги для машины. Нейросети читают его мгновенно
           и по нему рекомендуют книгу тому, кто спросил про конкретное
           животное или предмет. */
        about: topicList.length
          ? topicList.map((name) => ({ "@type": "Thing", name }))
          : undefined,
        /* Рецензия стороннего издания с ссылкой на первоисточник.
           Оценку не ставим: чужие оценки в разметке Google запрещает. */
        subjectOf: editorial
          ? {
              "@type": "Review",
              reviewBody: editorial.text[lang] ?? editorial.text.en,
              author: { "@type": "Person", name: "Pikasho Deka" },
              publisher: { "@type": "Organization", name: "Readers' Favorite" },
              url: editorial.url,
            }
          : undefined,
        datePublished: book.published,
        sameAs: wikidataUrl(book.id),
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
      breadcrumbs(lang, [
        { name: t.nav.books, path: sectionPath(lang, "books") },
        { name: copy.title, path: itemPath(lang, "books", slug) },
      ]),
      /* Видео отдельным объектом: так Google понимает, что на странице
         есть ролик, и может показать его в разделе видео. */
      ...(video
        ? [
            {
              "@type": "VideoObject",
              name: `${copy.title}. ${t.book.video}`,
              /* Развернутое описание кадров словами. Машина видео не
                 смотрит, доверие она строит на этом тексте. */
              description: video.description[lang] ?? video.description.en ?? t.book.videoLead,
              thumbnailUrl: `${SITE_URL}${video.poster}`,
              contentUrl: `${SITE_URL}${video.src}`,
              uploadDate: SITE_UPDATED,
              duration: `PT${video.seconds}S`,
              inLanguage: lang,
              isFamilyFriendly: true,
              /* Ключевые моменты. Google умеет показывать их отдельными
                 строками под ссылкой на страницу. */
              hasPart: video.chapters.map((c, i) => ({
                "@type": "Clip",
                name: c.text[lang] ?? c.text.en,
                startOffset: c.at,
                endOffset: video.chapters[i + 1]?.at ?? video.seconds,
                url: `${SITE_URL}${itemPath(lang, "books", slug)}#t=${c.at}`,
              })),
              about: { "@type": "Book", name: copy.title, isbn: bookIsbn13(book) },
              publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
            },
          ]
        : []),
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

            {/* Три факта до кнопки. Родитель решает за несколько секунд,
                и ему нужны факты, а не абзац. Остальные факты ниже. */}
            <ul className="quick-facts">
              {copy.inside.slice(0, 3).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            {/* Четыре главных числа сразу под фактами: возраст, страницы,
                язык и размер. Родитель за секунду понимает, подойдет ли
                книга его ребенку, и не листает вниз за характеристиками. */}
            <ul className="key-specs">
              <li>
                <span className="key-specs__label">{t.book.ageLabel}</span>
                <span className="key-specs__value">{t.catalog.ages[book.age]}</span>
              </li>
              {book.pages ? (
                <li>
                  <span className="key-specs__label">{t.book.pagesLabel}</span>
                  <span className="key-specs__value">{book.pages}</span>
                </li>
              ) : null}
              <li>
                <span className="key-specs__label">{t.book.languageLabel}</span>
                <span className="key-specs__value">
                  {book.editionLang === "bilingual"
                    ? t.book.langBoth
                    : book.editionLang === "es"
                      ? t.book.langEs
                      : t.book.langEn}
                </span>
              </li>
              <li>
                <span className="key-specs__label">{t.book.size}</span>
                <span className="key-specs__value">{book.size}</span>
              </li>
            </ul>

            {/* Цена и оценка стоят наверху. За пять секунд родитель должен
                узнать не только про книгу, но и сколько она стоит и что ее
                уже проверили другие. Сама кнопка покупки ниже, после того
                как он посмотрит, что внутри. */}
            <div className="top-trust">
              {paper ? (
                <p className="top-price">
                  <span className="top-price__value">{paper.price}</span>
                  <span className="top-price__label">{t.book.priceFrom}</span>
                </p>
              ) : null}
              {book.rating && paper ? (
                <RatingLink
                  rating={book.rating}
                  asin={paper.asin}
                  labelReviews={t.book.ratingReviews}
                  labelSource={t.book.ratingSource}
                  ariaLabel={t.book.ratingAria}
                />
              ) : null}
            </div>


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
          </div>
        </div>

        {/* Ниже страница раскрывается на всю ширину: широкие баннеры
            рисовались широкими, в узкой колонке они теряют силу. */}
        <div className="book-body">
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

          {/* Блок покупки стоит после баннеров: сначала человек видит,
              что внутри книги, и только потом принимает решение. */}
          <div className="buy-block">
            <BuyButtons book={book} lang={lang} />
            <p className="buy-note">
              {t.book.formatNote}
              {book.pdfUrl ? ` ${t.book.pdfNote}` : ""}
            </p>
          </div>


          {video ? (
            <>
              <h2 className="section">{t.book.video}</h2>
              {/* На экране только то, что нужно человеку: ролик, короткий
                  текст и кнопки. Описание кадров и секунды уходят в
                  служебную часть страницы, ее человек не видит. */}
              <div className="video-card">
                <video
                  className="video-card__media"
                  src={video.src}
                  poster={video.poster}
                  width={video.w}
                  height={video.h}
                  controls
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={copy.title}
                />
                <div className="video-card__text">
                  <p className="video-card__lead">{t.book.videoLead}</p>
                  <ul className="inside">
                    {t.book.videoPoints.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <BuyButtons book={book} lang={lang} />
                </div>
              </div>
            </>
          ) : null}

          {copy.inside.length > 3 ? (
            <>
              <h2 className="section">{t.book.inside}</h2>
              <ul className="inside">
                {copy.inside.slice(3).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          ) : null}

          {topicGroups.length ? (
            <>
              <h2 className="section">{t.book.topicsTitle}</h2>
              <p>{t.book.topicsLead}</p>
              {/* На экране только группы и несколько примеров: человек
                  решает за секунды. Полный список свернут, но лежит
                  на той же странице, поэтому его читают и поисковики. */}
              <ul className="topics">
                {topicGroups.map((g) => {
                  const items = g.items[lang] ?? g.items.en ?? [];
                  return (
                    <li key={g.id}>
                      <span className="topics__group">{g.title[lang] ?? g.title.en}</span>
                      <span className="topics__examples">
                        {items.slice(0, TOPIC_PREVIEW).join(" · ")}
                      </span>
                      <span className="topics__count">
                        {t.book.topicsCount.replace("{n}", String(items.length))}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <details className="topics-all">
                <summary>{t.book.topicsAll.replace("{n}", String(topicList.length))}</summary>
                <div className="topics-all__body">
                  {topicGroups.map((g) => (
                    <p key={g.id}>
                      <strong>{g.title[lang] ?? g.title.en}. </strong>
                      {(g.items[lang] ?? g.items.en ?? []).join(", ")}
                    </p>
                  ))}
                </div>
              </details>
            </>
          ) : null}

          <h2 className="section">{t.book.forWhom}</h2>
          <p>{copy.forWhom}</p>

          {freePage && freeSheets.length ? (
            <>
              <h2 className="section">{t.free.bookSheetsTitle}</h2>
              <p>
                {(freePage.copy[lang]?.bookSheetsLead ?? t.free.bookSheetsLead).replace(
                  "{n}",
                  String(freeSheetPages)
                )}
              </p>
              <div className={freePage.spread ? "fan fan--spread" : "fan"}>
                {freeSheets.map((sh, i) => (
                  <img
                    key={sh.id}
                    src={previewUrl(sh.id, lang)}
                    alt={(freePage.copy[lang]?.sheetAlt ?? t.free.sheetAlt).replace(
                      "{name}",
                      sh.name[lang] ?? sh.name.en!
                    )}
                    width={freePage.spread ? 1294 : 642}
                    height={freePage.spread ? 816 : 822}
                    loading="lazy"
                    style={{ ["--i" as string]: i }}
                  />
                ))}
              </div>
              <p style={{ marginBottom: "var(--gap-3)" }}>
                <Link className="btn btn--mint" href={itemPath(lang, "coloring", freeSlug!)}>
                  {t.free.bookSheetsCta.replace("{n}", String(freeSheetPages))}
                </Link>
              </p>
            </>
          ) : null}



          {bookRevs.length ? (
            <>
              <h2 className="section">{t.book.reviewsTitle}</h2>
              <div className="reviews reviews--book">
                {bookRevs.map((r) => (
                  <div className="review" key={r.who}>
                    <div className="stars">{"★".repeat(r.stars)}</div>
                    <p>{r.text}</p>
                    <span className="who">{r.who}</span>
                    {r.translated && t.home.reviewTranslated ? (
                      <span className="note">{t.home.reviewTranslated}</span>
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="reviews__source">{t.book.reviewsSource}</p>
            </>
          ) : null}

          {editorial ? (
            <p className="editorial">
              <span className="editorial__mark">{t.book.editorialTitle}</span>
              {editorial.text[lang] ?? editorial.text.en}
              <span className="editorial__who">
                {editorial.who}
                {editorial.url ? (
                  <>
                    {" · "}
                    <a href={editorial.url} rel="noopener" target="_blank">
                      {t.book.editorialSource}
                    </a>
                  </>
                ) : null}
              </span>
            </p>
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
              {book.pages ? (
                <>
                  <dt>{t.book.pagesLabel}</dt>
                  <dd>{book.pages}</dd>
                </>
              ) : null}
              <dt>{t.book.size}</dt>
              <dd>{book.size}</dd>
              {book.published ? (
                <>
                  <dt>{t.book.publishedLabel}</dt>
                  <dd>
                    {new Date(book.published).toLocaleDateString(
                      lang === "es" ? "es-ES" : "en-US",
                      { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
                    )}
                  </dd>
                </>
              ) : null}
              <dt>ISBN</dt>
              <dd>{bookIsbn13(book) ?? paper?.asin}</dd>
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
