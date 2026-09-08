import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  bookBySlug,
  bookById,
  booksForLang,
  amazonUrl,
  amazonReviewsUrl,
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
  relatedGuides,
  awardsForBook,
  retailers,
} from "@/data/method";
import {
  articlesForLang,
  articleBySlug,
  relatedArticles,
  articleUi,
} from "@/data/teacherArticles";
import { teachersForLang } from "@/data/teachers";
import {
  wordsPagesForLang,
  wordsPageBySlug,
  wordsSteps,
  wordPictureUrl,
  pageWords,
  pagePictures,
  wordOf,
  wordBookName,
  wordBookId,
  wordsBookIds,
  WORDS_BOOK_IDS,
  WORDS_BOOK_IDS_ES,
} from "@/data/firstWords";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { BookCard, PageHead } from "@/components/Chrome";
import { RatingLink } from "@/components/Rating";
import {
  SITE_URL,
  PUBLISHER,
  AUTHORS,
  ADDRESS,
  SITE_PUBLISHED,
  SITE_UPDATED,
  pagePublished,
  pageUpdated,
  OG_IMAGE,
  METHOD_REFERENCE_URL,
  toddlerSiteUrl,
} from "@/lib/site";
import {
  sectionFromSlug,
  sectionSlugs,
  itemPath,
  sectionPath,
} from "@/lib/routes";
import {
  langAlternates,
  breadcrumbs,
  orgNode,
  orgRef,
  ricardoNode,
  authorNode,
  authorRef,
  bookId as bookId2,
  pageId,
} from "@/lib/schema";
import { hasPdf, pdfPriceLabel, pdfPriceCents } from "@/lib/pdfShop";

/* Дата словами, на языке страницы. В коде остается машинная запись,
   человеку показываем привычную. */
function fmtDate(iso: string, lang: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(
    lang === "es" ? "es-ES" : "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
  );
}
import { reviewsForBook, editorialForBook } from "@/lib/reviews";
import {
  topicsForBook,
  allTopics,
  pageFile,
  bookPages,
  TOPIC_PREVIEW,
} from "@/data/bookTopics";
import BookDrawings from "@/components/BookDrawings";

export function generateStaticParams() {
  const out: { lang: string; section: string; slug: string }[] = [];
  for (const lang of activeLangs) {
    for (const b of booksForLang(lang)) {
      out.push({
        lang,
        section: sectionSlugs[lang].books,
        slug: b.slug[lang]!,
      });
    }
    for (const p of pagesForLang(lang)) {
      out.push({
        lang,
        section: sectionSlugs[lang].coloring,
        slug: p.slug[lang]!,
      });
    }
    for (const g of guidesForLang(lang)) {
      out.push({
        lang,
        section: sectionSlugs[lang].method,
        slug: g.slug[lang]!,
      });
    }
    for (const a of articlesForLang(lang)) {
      out.push({
        lang,
        section: sectionSlugs[lang].teachers,
        slug: a.slug[lang]!,
      });
    }
    for (const w of wordsPagesForLang(lang)) {
      out.push({
        lang,
        section: sectionSlugs[lang].words,
        slug: w.slug[lang]!,
      });
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
  /* Неизвестный язык в адресе, например /EN или /xx. Без этой проверки
     дальше берется словарь несуществующего языка и страница падает
     с ошибкой сервера. Поисковик считает ошибку сервера поводом реже
     заходить на весь сайт. */
  if (!activeLangs.includes(raw as UiLang)) return {};
  const lang = raw as UiLang;
  const s = sectionFromSlug(lang, decodeURIComponent(section));
  const slug = decodeURIComponent(rawSlug);

  if (s === "books") {
    const book = bookBySlug(lang, slug);
    const copy = book?.copy[lang];
    if (!book || !copy) return {};
    // Английское и испанское издание это одна книга на двух языках.
    // Связываем страницы пары, иначе поисковик считает их разными
    // книгами и может решить, что одна дублирует другую.
    const pair = book.pairId ? bookById(book.pairId) : undefined;
    const editions = [book, ...(pair ? [pair] : [])];
    const languages = langAlternates(
      Object.fromEntries(
        activeLangs.flatMap((l) => {
          const ed = editions.find((b) => b.slug[l]);
          return ed
            ? [[l, `${SITE_URL}${itemPath(l, "books", ed.slug[l]!)}`]]
            : [];
        }),
      ),
    );
    return {
      title: copy.title,
      description: copy.subtitle,
      alternates: { canonical: itemPath(lang, "books", slug), languages },
      openGraph: {
        title: copy.title,
        description: copy.lead,
        type: "article",
        images: book.cover
          ? [{ url: book.cover, width: 900, height: 1160 }]
          : undefined,
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
          .map((l) => [
            l,
            `${SITE_URL}${itemPath(l, "coloring", page.slug[l]!)}`,
          ]),
      ),
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

  if (s === "teachers") {
    const art = articleBySlug(lang, slug);
    const c = art?.copy[lang];
    if (!art || !c) return {};
    const languages = langAlternates(
      Object.fromEntries(
        activeLangs
          .filter((l) => art.slug[l])
          .map((l) => [l, `${SITE_URL}${itemPath(l, "teachers", art.slug[l]!)}`]),
      ),
    );
    return {
      title: c.title,
      description: c.answer.slice(0, 300),
      alternates: { canonical: itemPath(lang, "teachers", slug), languages },
    };
  }

  if (s === "words") {
    const page = wordsPageBySlug(lang, slug);
    const copy = page?.copy[lang];
    if (!page || !copy) return {};
    const languages = langAlternates(
      Object.fromEntries(
        activeLangs
          .filter((l) => page.slug[l])
          .map((l) => [l, `${SITE_URL}${itemPath(l, "words", page.slug[l]!)}`]),
      ),
    );
    return {
      title: copy.title,
      description: copy.lead,
      alternates: { canonical: itemPath(lang, "words", slug), languages },
      openGraph: {
        title: copy.title,
        description: copy.definition,
        type: "article",
        images: [{ url: wordPictureUrl(pagePictures(page, lang)[0], lang, page) }],
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
          .map((l) => [
            l,
            `${SITE_URL}${itemPath(l, "method", guide.slug[l]!)}`,
          ]),
      ),
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
        images: [
          { url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height },
        ],
      },
    };
  }
  return {};
}

function BuyButtons({ book, lang }: { book: Book; lang: UiLang }) {
  const t = dictionaries[lang].book;
  const label = {
    paperback: t.buyPaperback,
    hardcover: t.buyHardcover,
    kindle: t.buyKindle,
  } as const;
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
      {hasPdf(book.id) ? <PdfButtons book={book} lang={lang} /> : null}
    </div>
  );
}

/* Покупка печатного PDF прямо здесь.

   Кнопка одна, и цена на ней одна: два размера листа это не два товара,
   а один и тот же файл под разную бумагу. Показывать две кнопки с ценой
   рядом означало бы намекать, что платить надо дважды.

   Размер выбирается после нажатия. Подсказка о том, кому какой лист
   подходит, стоит внутри самой кнопки второй строкой: отдельной строкой
   под кнопкой она разбивала блок на слишком много кусков.

   Раскрытие сделано без скриптов, поэтому работает всегда, а поисковик
   видит обе покупки как понятные действия. */
function PdfButtons({ book, lang }: { book: Book; lang: UiLang }) {
  const t = dictionaries[lang].book;
  const back = itemPath(lang, "books", book.slug[lang] ?? "");

  return (
    <details className="buy-pdf">
      <summary className="btn btn--sky">
        <span className="buy-pdf__label">
          {t.buyPdf} · {pdfPriceLabel(book.id)}
        </span>
        {/* Вторая строка: сколько рисунков в файле. Выше на странице
            показаны восемнадцать страниц книги, и без этой строки
            человек решает, что платит именно за них. */}
        {book.drawings ? (
          <span className="buy-pdf__whole">
            {t.pdfWhole.replace("{n}", String(book.drawings))}
          </span>
        ) : null}
      </summary>
      <div className="buy-pdf__pick">
        <p className="buy-pdf__lead">{t.pdfPickSize}</p>
        {(["letter", "a4"] as const).map((format) => (
          <form key={format} action="/api/checkout" method="post">
            <input type="hidden" name="book" value={book.id} />
            <input type="hidden" name="format" value={format} />
            <input type="hidden" name="lang" value={lang} />
            <input type="hidden" name="back" value={back} />
            <button type="submit" className="btn buy-pdf__size">
              <span className="buy-pdf__name">
                {format === "letter" ? t.buyPdfLetter : t.buyPdfA4}
              </span>
              <span className="buy-pdf__hint">
                {format === "letter" ? t.pdfLetterHint : t.pdfA4Hint}
              </span>
            </button>
          </form>
        ))}
        {/* Пояснение о том, что покупатель получает, стоит здесь, а не
            под всем блоком кнопок: снаружи оно читалось как примечание
            и к покупке на Amazon тоже, хотя относится только к файлу. */}
        <p className="buy-pdf__note">{t.pdfNote}</p>
      </div>
    </details>
  );
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>;
}) {
  const { lang: raw, section, slug: rawSlug } = await params;
  if (!activeLangs.includes(raw as UiLang)) notFound();
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
    const bookId =
      lang === "es" && page.fromBookIdEs
        ? page.fromBookIdEs
        : lang === "ru" && page.fromBookIdRu
          ? page.fromBookIdRu
          : page.fromBookId;
    const pick = bookById(bookId);
    const pickCopy = pick?.copy[lang];
    const pickSlug = pick?.slug[lang];
    const total = sheetCount(page, lang);
    const groups = groupsForLang(page, lang);

    /* Для страницы одного объекта: состав темы, к которой относится
       рисунок, и сколько рисунков в книге всего. Числа берутся из
       состава книги, а не переписываются в текст руками, поэтому
       разойтись с книгой они не могут. */
    const themeGroups = pick ? topicsForBook(pick.id, lang) : [];
    const theme = page.themeId
      ? themeGroups.find((g) => g.id === page.themeId)
      : undefined;
    const themeItems = theme ? (theme.items[lang] ?? theme.items.en ?? []) : [];
    const bookTotal = allTopics(themeGroups, lang).length;
    /* Имя единственного рисунка страницы, чтобы отметить его в списке темы. */
    const soleSheet = page.single ? groups[0]?.sheets[0] : undefined;
    const soleName = soleSheet
      ? (soleSheet.name[lang] ?? soleSheet.name.en ?? "")
      : "";
    const fill = (text: string) =>
      text
        .replace("{total}", String(bookTotal || total))
        .replace("{n}", String(page.single ? themeItems.length : total));

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        /* Издательство целиком. Дальше по странице на него только ссылка. */
        orgNode(),
        /* Автор целиком, тем же опознавателем, что и на страницах книг:
           один человек на весь сайт, а не однофамильцы. */
        ...(pick ? [authorNode(pick.author, lang)] : []),
        {
          "@type": "Article",
          headline: copy.title,
          description: copy.lead,
          inLanguage: lang,
          author: orgRef(),
          publisher: orgRef(),
          datePublished: pagePublished(page.published),
          dateModified: pageUpdated(page.updated),
          mainEntityOfPage: `${SITE_URL}${itemPath(lang, "coloring", slug)}`,
          image: groups
            .flatMap((g) => g.sheets)
            .slice(0, 6)
            .map((sh) => `${SITE_URL}${previewUrl(sh.id, lang)}`),
        },
        /* Права на каждый лист. Google показывает такие картинки
           со значком "лицензируемое" и ставит ссылку на владельца.

           Сюда же добавлена связь с книгой: этот рисунок часть вот
           этого произведения. Без нее нейросеть, показывая наш лист,
           не может назвать книгу, из которой он взят, и цепочка от
           бесплатного к покупке обрывается. */
        ...groups.flatMap((g) =>
          g.sheets.map((sh) => ({
            "@type": "ImageObject",
            contentUrl: `${SITE_URL}${previewUrl(sh.id, lang)}`,
            name: f.sheetTitle.replace("{name}", sh.name[lang] ?? sh.name.en!),
            creator: pick ? authorRef(pick.author) : undefined,
            copyrightNotice: `© ${new Date().getFullYear()} ${PUBLISHER}`,
            creditText: PUBLISHER,
            license: `${SITE_URL}${itemPath(lang, "coloring", slug)}`,
            acquireLicensePage: `${SITE_URL}${sectionPath(lang, "contact")}`,
            isPartOf: pick ? { "@id": bookId2(pick.id) } : undefined,
          })),
        ),
        /* Сама книга. Полное описание живет на ее странице, здесь
           короткая запись с тем же опознавателем: машина понимает,
           что это одна и та же книга, а не однофамилица. */
        ...(pick && pickCopy && pickSlug
          ? [
              {
                "@type": "Book",
                "@id": bookId2(pick.id),
                name: pickCopy.title,
                author: authorRef(pick.author),
                publisher: orgRef(),
                isbn: bookIsbn13(pick),
                numberOfPages: pick.pages,
                typicalAgeRange:
                  pick.ageShown ??
                  (pick.age === "teens-adults" ? "13-" : pick.age),
                url: `${SITE_URL}${itemPath(lang, "books", pickSlug)}`,
                /* Полный состав книги. По нему нейросеть отвечает
                   тому, кто спросил про конкретное животное. */
                about: allTopics(themeGroups, lang).map((name) => ({
                  "@type": "Thing",
                  name,
                })),
              },
            ]
          : []),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <PageHead title={copy.title} lead={copy.lead} />

        {/* Человек пришел за листом, а не за объяснением. Поэтому сначала
            сам рисунок и кнопки печати, и только под ними разбор, почему
            он нарисован именно так. Коробка "как печатать" остается рядом
            с кнопками: это инструкция к действию, а не объяснение метода.

            На странице одного объекта заголовок группы не показываем:
            лист там ровно один, и строка "Лист" только отодвигает
            картинку вниз. */}
        {groups.map((group) => (
          <section className="wrap" key={group.id}>
            {page.single || !(group.title[lang] ?? group.title.en) ? null : (
              <h2 className="section">{group.title[lang] ?? group.title.en}</h2>
            )}
            <div
              className={
                page.spread
                  ? "sheets sheets--spread"
                  : page.single
                    ? "sheets sheets--single"
                    : "sheets"
              }
            >
              {group.sheets.map((sh) => {
                const name = sh.name[lang] ?? sh.name.en!;
                return (
                  <figure className="sheet" key={sh.id}>
                    <a
                      className="sheet__link"
                      href={printableUrl(
                        sh.id,
                        lang === "es" ? "a4" : "letter",
                        lang,
                      )}
                      download
                    >
                      <img
                        src={previewUrl(sh.id, lang)}
                        alt={(copy.sheetAlt ?? f.sheetAlt).replace(
                          "{name}",
                          name,
                        )}
                        width={page.spread ? 1294 : 642}
                        height={page.spread ? 816 : 822}
                        loading="lazy"
                      />
                    </a>
                    <figcaption>
                      <h3>
                        {(copy.sheetTitle ?? f.sheetTitle).replace(
                          "{name}",
                          name,
                        )}
                      </h3>
                      <p className="sheet__links">
                        <a
                          className="btn btn--pink"
                          href={printableUrl(sh.id, "letter", lang)}
                          download
                        >
                          {f.printLetter}
                        </a>
                        <a
                          className="btn btn--ghost"
                          href={printableUrl(sh.id, "a4", lang)}
                          download
                        >
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

        {/* Честный разбор: кому этот лист подходит, а кому уже нет.
            Стоит до блока книги: человек сначала понимает, его ли это
            уровень, и только потом видит книгу. Нейросеть берет отсюда
            основание для рекомендации. */}
        {copy.fitTitle && copy.fitYes?.length && copy.fitNo?.length ? (
          <section className="wrap">
            <h2 className="section">{copy.fitTitle}</h2>
            <div className="sheets-intro">
              <div className="prose">
                <ul className="inside">
                  {copy.fitYes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="howto">
                <p className="howto__title">{f.fitNoTitle}</p>
                <ul>
                  {copy.fitNo.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {/* Состав темы, к которой относится рисунок. Человек видит, что
            взял один лист из целой темы, и что тема это часть книги. */}
        {copy.themeTitle && themeItems.length ? (
          <section className="wrap">
            <h2 className="section">{fill(copy.themeTitle)}</h2>
            {copy.themeLead ? <p className="lead">{fill(copy.themeLead)}</p> : null}
            <div className="topics-all__body">
            <p>
              {themeItems.map((item, i) => (
                <span key={item}>
                  {i > 0 ? ", " : ""}
                  {item === soleName && copy.themeFreeMark ? (
                    <strong>
                      {item} ({copy.themeFreeMark})
                    </strong>
                  ) : (
                    item
                  )}
                </span>
              ))}
            </p>
            </div>
          </section>
        ) : null}

        {/* Решение: книга, из которой взяты рисунки */}
        {pick && pickCopy && pickSlug ? (
          <div className="band band--cream">
            <div className="wrap">
              <h2 className="section">{copy.pickTitle}</h2>
              <p className="lead">
                {fill(copy.pickLead)}
              </p>
              <div className="pick">
                <Link
                  href={itemPath(lang, "books", pickSlug)}
                  className="pick__cover"
                >
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
                    <Link href={itemPath(lang, "books", pickSlug)}>
                      {pickCopy.title}
                    </Link>
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
                      asin={
                        (
                          pick.formats.find((x) => x.kind !== "kindle") ??
                          pick.formats[0]
                        )?.asin ??
                        pick.enEditionAsin ??
                        ""
                      }
                      labelReviews={t.book.ratingReviews}
                      labelReviewsOne={t.book.ratingReviewsOne}
                      labelReviewsFew={t.book.ratingReviewsFew}
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

        <div
          className="wrap"
          style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}
        >
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
  /* ---------- Статья раздела для учителей ---------- */
  if (s === "teachers") {
    const art = articleBySlug(lang, slug);
    const c = art?.copy[lang];
    const hub = teachersForLang(lang);
    const ui = articleUi[lang];
    if (!art || !c || !hub || !ui) notFound();
    const related = relatedArticles(art, lang);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        /* Издательство целиком. Дальше по странице на него только ссылка. */
        orgNode(),
        {
          "@type": "Article",
          headline: c.title,
          description: c.lead,
          /* Прямой ответ первым абзацем. Его нейросеть берет целиком. */
          abstract: c.answer,
          inLanguage: lang,
          /* Автор статьи это человек с именем, а не компания. Поисковик
             и нейросеть заметно больше доверяют тексту с живым автором,
             которого можно проверить по внешней ссылке. */
          author: ricardoNode(lang),
          publisher: orgRef(),
          /* Свои даты у каждой статьи, а не одна общая на весь сайт. */
          datePublished: art.published,
          dateModified: art.updated,
          mainEntityOfPage: `${SITE_URL}${itemPath(lang, "teachers", slug)}`,
          about: { "@type": "Thing", name: "Directed drawing" },
          audience: [
            { "@type": "EducationalAudience", educationalRole: "teacher" },
            { "@type": "EducationalAudience", educationalRole: "parent" },
            { "@type": "EducationalAudience", educationalRole: "homeschooler" },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: c.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        breadcrumbs(lang, [
          { name: t.nav.teachers, path: sectionPath(lang, "teachers") },
          { name: c.title, path: itemPath(lang, "teachers", slug) },
        ]),
      ],
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <PageHead title={c.title} lead={c.lead} />

        {/* Подпись автора и даты. Видны человеку, а не только машине:
            читатель должен знать, кто написал и когда, до того как начнет
            доверять тексту. Имя ведет на страницу об издательстве. */}
        <section className="teach-block">
          <div className="teach">
            <p className="byline">
              {ui.by}{" "}
              <Link href={sectionPath(lang, "about")}>Ricardo Demi</Link>
              {" · "}
              {ui.published}{" "}
              <time dateTime={art.published}>{fmtDate(art.published, lang)}</time>
              {art.updated !== art.published ? (
                <>
                  {" · "}
                  {ui.updated}{" "}
                  <time dateTime={art.updated}>{fmtDate(art.updated, lang)}</time>
                </>
              ) : null}
            </p>
          </div>
        </section>

        {/* Прямой ответ. Первый абзац страницы. */}
        <section className="teach-block">
          <div className="teach">
            <p className="teach-def">{c.answer}</p>
          </div>
        </section>

        {c.body.map((part, i) => (
          <section
            key={part.h}
            className={i % 2 === 0 ? "band band--cream" : "teach-block"}
          >
            <div className="teach">
              <h2 className="section">{part.h}</h2>
              {part.p.map((para) => (
                <p className="teach-p" key={para.slice(0, 24)}>
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Короткий список. Его нейросети тоже цитируют охотно. */}
        <section className="band band--mint">
          <div className="teach">
            <h2 className="section">{c.listTitle}</h2>
            <ul className="teach-list">
              {c.list.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="teach-block">
          <div className="teach">
            <h2 className="section">{ui.faq}</h2>
            <div className="faq faq--two">
              {c.faq.map((f, i) => (
                <details key={f.q} open={i < 2}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Те же две книги, что и на главной странице раздела. */}
        <section className="band band--mint">
          <div className="teach">
            <h2 className="section">{c.ctaTitle}</h2>
            <p className="teach-p">{c.ctaLead}</p>
            <div className="tcards">
              {hub.cards.map((card) => (
                <div className="tcard" key={card.title}>
                  <img
                    src={card.cover.src}
                    alt={card.cover.alt}
                    width={card.cover.w}
                    height={card.cover.h}
                    loading="lazy"
                  />
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    {card.url ? (
                      <a
                        className={`btn ${card.kind === "free" ? "btn--sky" : "btn--pink"}`}
                        href={card.url}
                        rel="nofollow sponsored noopener"
                        target="_blank"
                      >
                        {card.cta}
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Соседние статьи и возврат в раздел: три страницы должны
            выглядеть одной темой, а не тремя отдельными листами. */}
        <section className="teach-block">
          <div className="teach">
            {related.length ? (
              <>
                <h2 className="section">{ui.related}</h2>
                <ul className="guide-next">
                  {related.map((a) => (
                    <li key={a.id}>
                      <Link href={itemPath(lang, "teachers", a.slug[lang]!)}>
                        <b>{a.copy[lang]!.title}</b>
                        <span>{a.copy[lang]!.lead}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <p className="teach-p" style={{ marginTop: "var(--gap-3)" }}>
              <Link href={sectionPath(lang, "teachers")}>{ui.back}</Link>
            </p>
          </div>
        </section>
      </>
    );
  }

  if (s === "method") {
    const guide = guideBySlug(lang, slug);
    const copy = guide?.copy[lang];
    if (!guide || !copy) notFound();
    const m = t.method;
    const pick = bookById(guideBookId(guide, lang));
    const related = relatedGuides(guide, lang);
    const pickCopy = pick?.copy[lang];
    const pickSlug = pick?.slug[lang];

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        /* Издательство целиком. Дальше по странице на него только ссылка. */
        orgNode(),
        {
          "@type": "Article",
          headline: copy.title,
          description: copy.lead,
          inLanguage: lang,
          author: orgRef(),
          publisher: orgRef(),
          datePublished: pagePublished(guide.published),
          dateModified: pageUpdated(guide.updated),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
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
                <Link
                  href={itemPath(lang, "books", pickSlug)}
                  className="pick__cover"
                >
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
                    <Link href={itemPath(lang, "books", pickSlug)}>
                      {pickCopy.title}
                    </Link>
                  </p>
                  <p>{pickCopy.subtitle}</p>
                  <BuyButtons book={pick} lang={lang} />
                  {pick.rating ? (
                    <RatingLink
                      rating={pick.rating}
                      asin={
                        (
                          pick.formats.find((f) => f.kind !== "kindle") ??
                          pick.formats[0]
                        )?.asin ??
                        pick.enEditionAsin ??
                        ""
                      }
                      labelReviews={t.book.ratingReviews}
                      labelReviewsOne={t.book.ratingReviewsOne}
                      labelReviewsFew={t.book.ratingReviewsFew}
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

          {related.length ? (
            <>
              <h2 className="section">{m.guideRelated}</h2>
              <ul className="guide-next">
                {related.map((g) => (
                  <li key={g.id}>
                    <Link href={itemPath(lang, "method", g.slug[lang]!)}>
                      <b>{g.copy[lang]!.title}</b>
                      <span>{g.copy[lang]!.lead}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <p style={{ padding: "var(--gap-4) 0 var(--band-y)" }}>
            <Link href={sectionPath(lang, "method")}>{m.guideBack}</Link>
          </p>
        </div>
      </>
    );
  }

  /* ---------- Первые слова: страница темы ---------- */
  if (s === "words") {
    const page = wordsPageBySlug(lang, slug);
    const wc = page?.copy[lang];
    if (!page || !wc) notFound();
    const steps = wordsSteps[lang];
    const shelf = wordsBookIds(lang)
      .map((id) => bookById(id))
      .filter((b): b is Book => Boolean(b));
    const others = wordsPagesForLang(lang).filter((x) => x.id !== page.id);
    /* Слова темы, разложенные по книгам. Человеку так понятно, какую
       книгу покупать, а машине достается полный состав каждой. */
    const byBook = pageWords(page, lang);
    const list = byBook.flatMap((b) => b.words.map((x) => wordOf(x, lang)));
    const hubTitle = dictionaries[lang].nav.firstWords;

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        /* Издательство целиком. Дальше по странице на него только ссылка. */
        orgNode(),
        {
          "@type": "WebPage",
          name: wc.title,
          description: wc.definition,
          inLanguage: lang,
          url: `${SITE_URL}${itemPath(lang, "words", slug)}`,
          publisher: orgRef(),
          datePublished: pagePublished(page.published),
          dateModified: pageUpdated(page.updated),
          /* Полный состав темы для машины. По нему нейросеть находит
             страницу, когда спрашивают про конкретное слово. */
          about: list.map((name) => ({ "@type": "Thing", name })),
        },
        {
          "@type": "FAQPage",
          mainEntity: wc.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        breadcrumbs(lang, [
          { name: hubTitle, path: sectionPath(lang, "words") },
          { name: wc.title, path: itemPath(lang, "words", slug) },
        ]),
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <PageHead title={wc.title} lead={wc.lead} />

        <section className="teach-block">
          <div className="teach">
            <p className="wordsub">{wc.subtitle}</p>
            <p className="teach-def">{wc.definition}</p>
          </div>
        </section>

        {/* Три настоящих рисунка со словом. */}
        <section className="band band--cream">
          <div className="teach">
            <p className="teach-p">{wc.showcase}</p>
            <div className="wordshelf">
              {pagePictures(page, lang).map((name) => (
                <img
                  key={name}
                  className="wordshelf__pic"
                  src={wordPictureUrl(name, lang, page)}
                  alt={wc.showcase}
                  width={700}
                  height={700}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Все слова темы. Человеку это список, машине состав книги. */}
        <section className="teach-block">
          <div className="teach">
            <h2 className="section">{wc.wordsTitle}</h2>
            <p className="teach-p">{wc.wordsLead}</p>
            {page.pairs ? (
              /* Страницы про языки: слово из английского издания рядом
                 со словом из испанского. Видно, что рисунок один. */
              <ul className="wordpairs">
                {byBook
                  .flatMap((b) => b.words)
                  .slice(0, 40)
                  .map((x) => (
                    <li key={x.en}>
                      <span className="wordpairs__a">{x.en}</span>
                      <span className="wordpairs__b">{x.es}</span>
                    </li>
                  ))}
              </ul>
            ) : null}
            {!page.pairs && byBook.map(({ book, words }) => {
              const b = bookById(wordBookId(book, lang));
              const bSlug = b?.slug[lang] ?? b?.slug.en;
              const bLang: UiLang = b?.slug[lang] ? lang : "en";
              const name = wordBookName[book][lang] ?? wordBookName[book].en;
              return (
                <div key={book}>
                  <h3 className="wordgroup">
                    {bSlug ? (
                      <Link href={itemPath(bLang, "books", bSlug)}>{name}</Link>
                    ) : (
                      name
                    )}{" "}
                    <span className="wordgroup__count">{words.length}</span>
                  </h3>
                  <ul className="wordlist">
                    {words.map((x) => (
                      <li key={wordOf(x, lang)}>{wordOf(x, lang)}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Три действия. */}
        <section className="band band--mint">
          <div className="teach">
            <h2 className="section">{dictionaries[lang].nav.firstWords}</h2>
            <ol className="ladder">
              {steps.map((st) => (
                <li className="ladder__step" key={st.n}>
                  <p className="ladder__age">{st.n}</p>
                  <p className="ladder__can">{st.title}</p>
                  <p className="ladder__needs">{st.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Книги. */}
        <section className="teach-block">
          <div className="teach">
            <h2 className="section">{wc.booksTitle}</h2>
            <p className="teach-p">{wc.booksLead}</p>
          </div>
          <div className="wrap" style={{ paddingTop: "var(--gap-3)" }}>
            <div className="grid">
              {shelf.map((b) => (
                <BookCard key={b.id} book={b} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* Вопросы и ответы. */}
        <section className="band band--pink">
          <div className="teach">
            <h2 className="section">{wc.faqTitle}</h2>
            {wc.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Другие темы раздела. Без этих ссылок страницы стоят
            островами и поисковик обходит их поодиночке. */}
        <section className="teach-block">
          <div className="teach">
            <h2 className="section">{hubTitle}</h2>
            <ul className="wordlist wordlist--links">
              {others.map((o) => (
                <li key={o.id}>
                  <Link href={itemPath(lang, "words", o.slug[lang]!)}>
                    {o.copy[lang]!.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="teach-cta">
              <Link className="btn btn--sky" href={sectionPath(lang, "words")}>
                {hubTitle}
              </Link>
            </p>
          </div>
        </section>
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
    .filter(
      (b) =>
        b.id !== book.id && (b.series === book.series || b.age === book.age),
    )
    .slice(0, 4);

  /* Раскраска для самых маленьких. Только у таких книг внизу стоит
     ссылка на справочник о первых раскрасках: он про этот возраст
     и про этот тип книги, и ставить его у книги для семилетнего
     значило бы отправлять человека не туда. */
  const isToddlerColoring = book.age === "1-3" && book.type === "coloring";

  /* Книги, где под каждым рисунком написано слово. Только у них внизу
     стоит ссылка на раздел о первых словах: у остальных раскрасок
     слов нет, и обещать их было бы обманом. */
  const hasFirstWords = ([
    ...WORDS_BOOK_IDS,
    ...WORDS_BOOK_IDS_ES,
  ] as readonly string[]).includes(book.id);

  const paper =
    book.formats.find((f) => f.kind !== "kindle") ?? book.formats[0];
  const video = bookVideo(book.id);
  const bookRevs = reviewsForBook(book.id, lang);
  /* Код английского издания на Amazon: по нему строится ссылка на
     первоисточник отзывов на странице русского издания. */
  const enAsin =
    book.enEditionAsin ?? pair?.formats.find((f) => f.kind !== "kindle")?.asin;
  /* Возраст, который видит человек: с Amazon, если он задан,
     иначе группа каталога. */
  /* Вводный текст состоит из коротких абзацев. В описание страницы
     для поисковика они уходят одной строкой. */
  const whyParts = copy.lead.split("\n\n");
  /* Возраст на странице книги пишем коротко, "1-3": рядом уже стоит
     подпись "Возраст", слово "годы" только удлиняет строку. В каталоге
     и в фильтре подписи рядом нет, там остается полная форма. */
  const ageText = book.ageShown
    ? book.ageShown
    : book.age === "teens-adults"
      ? t.catalog.ages[book.age]
      : book.age;
  const topicGroups = topicsForBook(book.id, lang);
  const topicList = allTopics(topicGroups, lang);

  /* Восемнадцать страниц книги для показа наверху. Это не просто
     рисунки, а снятые страницы вместе со словом контурными буквами:
     по ним сразу видно, что слово тоже раскрашивается. Показываем
     только там, где у книги есть такие страницы. */
  /* Книга показана целиком: наверху рисунки, полный состав и связное
     описание. Значит нижние блоки с тем же содержанием не нужны. */
  const hasFullBook = Boolean(copy.about?.length) && topicGroups.some((g) => g.firstDrawing);

  const featuredPages = topicGroups.some((g) => g.firstDrawing)
    ? bookPages.map((n) => {
        let name = "";
        for (const g of topicGroups) {
          const items = g.items[lang] ?? g.items.en ?? [];
          const first = g.firstDrawing;
          if (first && n >= first && n < first + items.length) {
            name = items[n - first];
          }
        }
        return { n, name };
      })
    : [];
  const editorial = editorialForBook(book.id);
  const bookAwards = awardsForBook(book.id);
  const freePage = coloringPageForBook(book.id);
  const freeSlug = freePage?.slug[lang];
  const freeSheets =
    freePage && freeSlug
      ? allSheets(freePage, lang).slice(0, freePage.spread ? 6 : 10)
      : [];
  // Сколько страниц реально можно распечатать. Разворот это две страницы.
  const freeSheetPages =
    freePage && freeSlug
      ? sheetCount(freePage, lang) * (freePage.spread ? 2 : 1)
      : 0;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
        /* Издательство целиком. Дальше по странице на него только ссылка. */
        orgNode(),
        /* Автор целиком, с постоянным опознавателем. Дальше по странице
           на него тоже только ссылка. */
        authorNode(book.author, lang),
        /* Сама страница, отдельно от книги. Страница это адрес, по
           которому лежит рассказ о книге; книга это произведение,
           которое существует и на бумаге, и на других сайтах. Пока они
           слиты в один объект, машине нечем связать между собой издания
           одной книги. */
        {
          "@type": "WebPage",
          "@id": pageId(itemPath(lang, "books", slug)),
          url: `${SITE_URL}${itemPath(lang, "books", slug)}`,
          name: copy.title,
          inLanguage: lang,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          datePublished: pagePublished(),
          dateModified: pageUpdated(),
          mainEntity: { "@id": bookId2(book.id) },
          publisher: orgRef(),
        },
      {
        "@type": "Book",
        "@id": bookId2(book.id),
        name: copy.title,
        author: authorRef(book.author),
        publisher: orgRef(),
        inLanguage:
          book.editionLang === "bilingual" ? ["en", "es"] : book.editionLang,
        isbn: bookIsbn13(book),
        numberOfPages: book.pages,
        /* Полный состав книги для машины. Нейросети читают его мгновенно
           и по нему рекомендуют книгу тому, кто спросил про конкретное
           животное или предмет. */
        about: topicList.length
          ? topicList.map((name) => ({ "@type": "Thing", name }))
          : undefined,
        /* Полное описание книги одним куском. То же самое, что человек
           видит в свернутом блоке на странице. Нейросеть берет его
           готовым, не разбирая верстку. */
        abstract: copy.about?.length ? copy.about.join(" ") : undefined,
        /* Рецензия стороннего издания с ссылкой на первоисточник.
           Оценку не ставим: чужие оценки в разметке Google запрещает.

           Имя рецензента раньше стояло одно на все книги, и у каждой
           книги, кроме одной, в разметку уходило чужое имя. Теперь оно
           берется из самой рецензии. Запись вида "Имя, Издание" делится
           на человека и издание, запись из одного названия это издание
           без автора. */
        subjectOf: editorial
          ? (() => {
              const [first, ...rest] = editorial.who.split(",");
              const outlet = rest.join(",").trim();
              return {
                "@type": "Review",
                reviewBody: editorial.text[lang] ?? editorial.text.en,
                author: outlet
                  ? { "@type": "Person", name: first.trim() }
                  : { "@type": "Organization", name: first.trim() },
                publisher: {
                  "@type": "Organization",
                  name: outlet || first.trim(),
                },
                url: editorial.url,
              };
            })()
          : undefined,
        datePublished: book.published,
        /* Внешние адреса, по которым машина опознает эту книгу.

           Раньше здесь стоял один адрес, запись в Викиданных, и он
           уходил в разметку как строка. Теперь это список: к записи
           в Викиданных добавляется наш справочный сайт о первых
           раскрасках, там у книги есть своя развернутая страница.

           Смысл поля sameAs именно в этом: не "похожие ссылки",
           а "это та же самая вещь, вот где еще она описана". Для
           нейросети два независимых описания одной книги весят
           заметно больше, чем одно. */
        sameAs: (() => {
          const out = [
            wikidataUrl(book.id),
            isToddlerColoring ? toddlerSiteUrl(lang) : undefined,
          ].filter(Boolean);
          /* Пусто значит поля нет вовсе. Пустой список в разметке
             читается как "мы искали и не нашли ничего", а это не то,
             что мы хотим сказать о книге. */
          return out.length ? out : undefined;
        })(),
        /* Вид издания. У тетрадей для учителей бумажного издания нет,
           продается только файл, и называть их мягкой обложкой нельзя. */
        bookFormat: paper
          ? paper.kind === "hardcover"
            ? "https://schema.org/Hardcover"
            : "https://schema.org/Paperback"
          : "https://schema.org/EBook",
        description: copy.lead.replace(/\s+/g, " "),
        image: book.cover ? `${SITE_URL}${book.cover}` : undefined,
        typicalAgeRange:
          book.ageShown ?? (book.age === "teens-adults" ? "13-" : book.age),
        /* Где книгу можно купить. Раньше при наличии бумажного издания
           машина видела только цену Amazon, а наш файл для печати не
           видела вовсе, хотя человеку он на странице показан. Теперь оба
           предложения стоят рядом. Цена файла берется из того же места,
           откуда сайт берет ее для оплаты, поэтому разойтись они не могут. */
        offers: (() => {
          const paperOffers = book.formats.map((f) => ({
            "@type": "Offer",
            price: f.price.replace("$", ""),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: amazonUrl(f.asin),
          }));
          const pdfOffer = hasPdf(book.id)
            ? [
                {
                  "@type": "Offer",
                  price: (pdfPriceCents(book.id) / 100).toFixed(2),
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  itemCondition: "https://schema.org/NewCondition",
                  url: `${SITE_URL}${itemPath(lang, "books", slug)}`,
                  seller: orgRef(),
                },
              ]
            : [];
          const all = [...paperOffers, ...pdfOffer];
          return all.length ? all : undefined;
        })(),
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
              description:
                video.description[lang] ??
                video.description.en ??
                t.book.videoLead,
              thumbnailUrl: `${SITE_URL}${video.poster}`,
              contentUrl: `${SITE_URL}${video.src}`,
              /* Когда ролик появился на сайте, а не когда мы в последний
                 раз правили тексты. Прежняя дата была просто неверной. */
              uploadDate: pagePublished(video.published),
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
              about: {
                "@type": "Book",
                name: copy.title,
                isbn: bookIsbn13(book),
              },
              publisher: orgRef(),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
            {/* Либо связный текст рядом с обложкой, либо старый разбор
                на подзаголовок, три факта списком и абзац. Второй способ
                повторял одно и то же четырьмя способами, поэтому там,
                где написан текст, показываем только его. */}
            {copy.intro?.length ? (
              <ul className="quick-facts quick-facts--intro">
                {copy.intro.map((line) => (
                  <li key={line.slice(0, 24)}>{line}</li>
                ))}
              </ul>
            ) : (
              <>
                <p className="subtitle">{copy.subtitle}</p>
                <ul className="quick-facts">
                  {copy.inside.slice(0, 3).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                {whyParts.map((part) => (
                  <p className="why-text" key={part.slice(0, 24)}>
                    {part}
                  </p>
                ))}
              </>
            )}

            {/* Сначала то, ради чего человек листает: цена, оценка,
                награда. На телефоне это первое, что видно под обложкой. */}
            <div className="top-trust">
              {paper ? (
                <p className="top-price">
                  <span className="top-price__value">{paper.price}</span>
                  <span className="top-price__label">
                    {paper.kind === "hardcover"
                      ? t.book.priceFromHardcover
                      : t.book.priceFrom}
                  </span>
                </p>
              ) : null}
              {book.rating && (paper || book.enEditionAsin) ? (
                <RatingLink
                  rating={book.rating}
                  asin={paper ? paper.asin : book.enEditionAsin!}
                  labelReviews={t.book.ratingReviews}
                  labelReviewsOne={t.book.ratingReviewsOne}
                      labelReviewsFew={t.book.ratingReviewsFew}
                  labelSource={t.book.ratingSource}
                  ariaLabel={t.book.ratingAria}
                />
              ) : null}
            </div>

            {bookAwards.length ? (
              <ul className="award-list">
                {bookAwards.map((a) => (
                  <li key={`${a.program}-${a.year}`}>
                    <span className="award-list__tag">
                      {t.method.bookAward}
                    </span>{" "}
                    {a.result[lang] ?? a.result.en} ·{" "}
                    {a.category[lang] ?? a.category.en} ·{" "}
                    <a
                      href={a.programUrl}
                      rel="nofollow noopener"
                      target="_blank"
                    >
                      {a.program}
                    </a>{" "}
                    {a.year}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Возраст, страницы, язык, размер. Подойдет ли книга ребенку. */}
            <ul className="key-specs">
              <li>
                <span className="key-specs__label">{t.book.ageLabel}</span>
                <span className="key-specs__value">{ageText}</span>
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
                      : book.editionLang === "ru"
                        ? t.book.langRu
                        : t.book.langEn}
                </span>
              </li>
              <li>
                <span className="key-specs__label">{t.book.size}</span>
                <span className="key-specs__value">{book.size}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ниже страница раскрывается на всю ширину: широкие баннеры
            рисовались широкими, в узкой колонке они теряют силу. */}
        <div className="book-body">
          {/* Порядок здесь такой: сначала рисунки из книги, затем полный
             состав и только потом кнопки. Человек пришел посмотреть, что
             внутри, и решение принимает после того, как увидел. Баннеры
             идут ниже.

             У книг, где рядом с обложкой стоит список главного, вводная
             фраза не нужна: все сказано выше. У остальных она остается. */}
          {(book.showcaseLead?.[lang] ?? book.showcaseLead?.en) &&
          !copy.intro?.length ? (
            <p className="showcase__lead">
              {book.showcaseLead[lang] ?? book.showcaseLead.en}
            </p>
          ) : null}

          {featuredPages.length ? (
            <>
              <h2 className="section">{t.book.drawingsTitle}</h2>
              <ul className="thumbs thumbs--pages">
                {featuredPages.map((d) => (
                  <li key={d.n}>
                    <img
                      src={pageFile(d.n, lang)}
                      alt={d.name}
                      width={480}
                      height={620}
                      loading="lazy"
                    />
                  </li>
                ))}
              </ul>
              <BookDrawings
                groups={topicGroups}
                lang={lang}
                label={t.book.drawingsAll.replace(
                  "{n}",
                  String(topicList.length),
                )}
              />
              <div className="buy-block">
                <BuyButtons book={book} lang={lang} />
              </div>

              {/* Одна фраза о том, кому книга, сразу под кнопками.
                  Развернутый разбор на два списка стоит ниже: здесь
                  человеку нужен быстрый ответ, а не пятнадцать пунктов. */}
              <h2 className="section">{t.book.forWhom}</h2>
              <p>{copy.forWhom}</p>
            </>
          ) : null}

          {book.bannerLead || book.artwork?.length || book.banners?.length ? (
            <div className="showcase">
              {book.bannerLead ? (
                <img
                  className="theme-banner"
                  src={book.bannerLead.file}
                  alt={
                    book.bannerLead.alt[lang] ??
                    book.bannerLead.alt.en ??
                    copy.title
                  }
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

          {/* Список "Что внутри" и разбор по темам показываем не всегда.
              У первой раскраски выше на странице уже стоят рисунки, полный
              состав из ста одиннадцати названий и связное описание книги:
              эти два блока повторяли бы то, что человек только что прочитал.
              У остальных книг ничего этого нет, и там блоки остаются. */}
          {!hasFullBook && copy.inside.length > (copy.intro?.length ? 0 : 3) ? (
            <>
              <h2 className="section">{t.book.inside}</h2>
              <ul className="inside">
                {copy.inside
                  .slice(copy.intro?.length ? 0 : 3)
                  .map((line) => (
                    <li key={line}>{line}</li>
                  ))}
              </ul>
            </>
          ) : null}

          {!hasFullBook && topicGroups.length ? (
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
                      <span className="topics__group">
                        {g.title[lang] ?? g.title.en}
                      </span>
                      <span className="topics__examples">
                        {items.slice(0, TOPIC_PREVIEW).join(" · ")}
                      </span>
                      <span className="topics__count">
                        {t.book.topicsCount.replace(
                          "{n}",
                          String(items.length),
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {/* Полный состав с картинками стоит выше, сразу под сеткой
                  рисунков. Второй раз его здесь не показываем: список
                  из ста одиннадцати названий дважды на одной странице
                  ничего не добавляет ни человеку, ни поисковику. */}
              {featuredPages.length ? null : (
                <BookDrawings
                  groups={topicGroups}
                  lang={lang}
                  label={t.book.topicsAll.replace(
                    "{n}",
                    String(topicList.length),
                  )}
                />
              )}
            </>
          ) : null}

          {/* Полное описание книги стоит открытым разделом, как и разбор
              "подойдет ли книга". Свернутым его почти никто не открывал,
              а это главный связный текст страницы: именно из него берут
              факты поисковики и нейросети.

              Рассказ автора остается свернутым: он про то, как делалась
              книга, и человеку, который выбирает, нужен не в первую
              очередь. В коде страницы он лежит всегда, поэтому машины
              читают его и в свернутом виде. */}
          {copy.about?.length ? (
            <>
              <h2 className="section">{t.book.aboutTitle}</h2>
              {copy.about.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </>
          ) : null}

          {copy.story?.length ? (
            <div className="faq">
              <details>
                <summary>{t.book.storyTitle}</summary>
                {copy.story.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </details>
            </div>
          ) : null}

          {copy.fitYes?.length || copy.fitNo?.length ? (
            <>
              <h2 className="section">{t.book.fitTitle}</h2>
              {copy.fitLead ? <p>{copy.fitLead}</p> : null}
              {copy.fitYes?.length ? (
                <>
                  <h3>{t.book.fitYes}</h3>
                  <ul>
                    {copy.fitYes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {copy.fitNo?.length ? (
                <>
                  <h3>{t.book.fitNo}</h3>
                  <ul>
                    {copy.fitNo.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </>
          ) : null}


          {freePage && freeSheets.length ? (
            <>
              <h2 className="section">{t.free.bookSheetsTitle}</h2>
              <p>
                {(
                  freePage.copy[lang]?.bookSheetsLead ?? t.free.bookSheetsLead
                ).replace("{n}", String(freeSheetPages))}
              </p>
              <div className={freePage.spread ? "fan fan--spread" : "fan"}>
                {freeSheets.map((sh, i) => (
                  <img
                    key={sh.id}
                    src={previewUrl(sh.id, lang)}
                    alt={(
                      freePage.copy[lang]?.sheetAlt ?? t.free.sheetAlt
                    ).replace("{name}", sh.name[lang] ?? sh.name.en!)}
                    width={freePage.spread ? 1294 : 642}
                    height={freePage.spread ? 816 : 822}
                    loading="lazy"
                    style={{ ["--i" as string]: i }}
                  />
                ))}
              </div>
              <p style={{ marginBottom: "var(--gap-3)" }}>
                <Link
                  className="btn btn--mint"
                  href={itemPath(lang, "coloring", freeSlug!)}
                >
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
              {/* Русские издания своих отзывов пока не собрали. Книга та же,
                  поэтому показываем отзывы английского издания, прямо об этом
                  пишем и даем ссылку на первоисточник. */}
              {book.editionLang === "ru" ? (
                <p className="reviews__source">
                  {t.book.reviewsOtherEdition}
                  {enAsin ? (
                    <>
                      {" "}
                      <a
                        href={amazonReviewsUrl(enAsin)}
                        rel="noopener nofollow"
                        target="_blank"
                      >
                        {t.book.reviewsOtherEditionLink}
                      </a>
                    </>
                  ) : null}
                </p>
              ) : (
                <p className="reviews__source">{t.book.reviewsSource}</p>
              )}
            </>
          ) : null}

          {editorial ? (
            <p className="editorial">
              <span className="editorial__mark">{t.book.editorialTitle}</span>
              {editorial.text[lang] ?? editorial.text.en}
              <span className="editorial__who">
                {editorial.who}
                {/* Рецензия написана по-английски. Там, где мы показываем
                    ее перевод, об этом сказано прямо, как и у отзывов
                    покупателей. */}
                {lang !== "en" && editorial.text[lang] && t.home.reviewTranslated
                  ? ` · ${t.home.reviewTranslated}`
                  : null}
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
              <dd>{ageText}</dd>
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
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      },
                    )}
                  </dd>
                </>
              ) : null}
              {bookIsbn13(book) ?? paper?.asin ? (
                <>
                  <dt>ISBN</dt>
                  <dd>{bookIsbn13(book) ?? paper?.asin}</dd>
                </>
              ) : null}
              <dt>{t.book.author}</dt>
              <dd>
                <a href={author.amazon} rel="nofollow noopener" target="_blank">
                  {author.name}
                </a>
              </dd>
              <dt>{t.book.publisher}</dt>
              <dd>{PUBLISHER}</dd>
            </dl>

            {/* Три служебные строки раньше висели под панелью по
                отдельности, каждая своей длины, и выглядели как обрывки.
                Теперь они внутри той же панели, за тонкой линией: это
                продолжение данных о книге, а не отдельные абзацы. */}
            <div className="specs__more">
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
            </div>
          </div>

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

          {/* Справочный сайт о первых раскрасках.

              Стоит только у раскрасок для 1-3 лет: у книги для семи лет
              ссылка на справочник о первых раскрасках была бы обманом.

              Стоит после вопросов, а не среди кнопок покупки, и это
              намеренно. Человек, который дочитал до сюда, не купил
              сразу, значит сомневается, подходит ли книга. Ему нужен
              не еще один призыв купить, а место, где можно проверить.

              Ссылка идет с объяснением в несколько строк, а не голой
              кнопкой. Кнопка сообщает машине только свое название,
              текст рядом объясняет, что за сайт на том конце и чем он
              отличается от этой страницы. */}
          {/* Раздел о первых словах. Стоит только у книг, где слово
              действительно написано под рисунком. */}
          {hasFirstWords ? (
            <>
              <h2 className="section" style={{ marginTop: "var(--gap-4)" }}>
                {t.book.wordsTitle}
              </h2>
              <p>{t.book.wordsText}</p>
              <p>
                <Link className="btn btn--ghost" href={sectionPath(lang, "words")}>
                  {t.book.wordsCta}
                </Link>
              </p>
            </>
          ) : null}

          {isToddlerColoring ? (
            <>
              <h2 className="section" style={{ marginTop: "var(--gap-4)" }}>
                {t.book.guideSiteTitle}
              </h2>
              <p>{t.book.guideSiteText}</p>
              <p>
                <a
                  className="btn btn--ghost"
                  href={toddlerSiteUrl(lang)}
                  rel="noopener"
                >
                  {t.book.guideSiteCta}
                </a>
              </p>
            </>
          ) : null}
        </div>

        {related.length ? (
          <section
            style={{ padding: "0 clamp(1rem, 4vw, 2rem) var(--band-y)" }}
          >
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
