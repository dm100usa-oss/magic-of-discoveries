import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  books,
  booksForLang,
  ageOrder,
  cheapestFormat,
  bookById,
  type UiLang,
  type AgeGroup,
  type BookType,
} from "@/data/books";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { pagesForLang, sheetCount, previewUrl, groupsForLang } from "@/data/coloringPages";
import {
  awards,
  reviewSources,
  retailers,
  guidesForLang,
  type RetailerRegion,
} from "@/data/method";
import { teachersForLang, METHOD_URL } from "@/data/teachers";
import type { TeachersImage } from "@/data/teachers";
import { articlesForLang, articleUi } from "@/data/teacherArticles";
import { PageHead, BookCard } from "@/components/Chrome";
import BookFilters, { type CardItem } from "@/components/BookFilters";
import {
  SITE_URL,
  CONTACT_EMAIL,
  PUBLISHER,
  AUTHORS,
  SOCIAL,
  METHOD_REFERENCE_URL,
  ADDRESS,
  OG_IMAGE,
  toddlerSiteUrl,
  ORG_ID,
  RICARDO_ID,
  MARIA_ID,
  authorSameAs,
} from "@/lib/site";
import { sectionFromSlug, sectionSlugs, sectionPath, itemPath, type Section } from "@/lib/routes";
import { hasPdf, pdfPriceLabel } from "@/lib/pdfShop";
import {
  wordsHub,
  wordsSteps,
  wordsPagesForLang,
  wordsPageById,
  wordPictureUrl,
  pagePictures,
  wordsBookIds,
} from "@/data/firstWords";
import { langAlternates, breadcrumbs, orgNode, orgRef, ricardoNode } from "@/lib/schema";
import { bookIsbn13, bookAges } from "@/data/books";

const TYPES: BookType[] = ["coloring", "drawing", "bedtime", "bilingual"];

export function generateStaticParams() {
  const out: { lang: string; section: string }[] = [];
  for (const lang of activeLangs) {
    for (const s of Object.values(sectionSlugs[lang])) out.push({ lang, section: s });
  }
  return out;
}

function headingFor(lang: UiLang, s: Section) {
  const t = dictionaries[lang];
  switch (s) {
    case "books":
      return { title: t.catalog.title, lead: t.catalog.lead };
    case "method":
      return { title: t.method.title, lead: t.method.lead };
    case "teachers": {
      const tt = teachersForLang(lang);
      return { title: tt?.title ?? t.nav.teachers, lead: tt?.lead };
    }
    case "coloring":
      return { title: t.free.title, lead: t.free.lead };
    case "words": {
      const w = wordsHub[lang];
      return { title: w?.title ?? t.nav.firstWords, lead: w?.lead };
    }
    case "catalog":
      return { title: t.catalog2.title, lead: t.catalog2.lead };
    case "about":
      return { title: t.about.title, lead: undefined };
    case "contact":
      return { title: t.contact.title, lead: t.contact.lead };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}): Promise<Metadata> {
  const { lang: raw, section } = await params;
  /* Неизвестный язык в адресе, например /EN или /xx. Без этой проверки
     дальше берется словарь несуществующего языка и страница падает
     с ошибкой сервера. Поисковик считает ошибку сервера поводом реже
     заходить на весь сайт, поэтому отдаем обычное "страница не найдена". */
  if (!activeLangs.includes(raw as UiLang)) return {};
  const lang = raw as UiLang;
  const s = sectionFromSlug(lang, decodeURIComponent(section));
  if (!s) return {};
  const h = headingFor(lang, s);
  const languages = langAlternates(
    Object.fromEntries(activeLangs.map((l) => [l, `${SITE_URL}${sectionPath(l, s)}`]))
  );
  const description = h.lead ?? dictionaries[lang].about.body[0];
  return {
    title: h.title,
    description,
    alternates: { canonical: sectionPath(lang, s), languages },
    openGraph: {
      title: h.title,
      description,
      type: "website",
      url: `${SITE_URL}${sectionPath(lang, s)}`,
      images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height }],
    },
  };
}

/* Адрес нашей страницы набора для учителей.

   Тетради Directed Drawing стоят в английском каталоге: испанские
   тоже, потому что это тетради для американского класса, где учат
   испанские слова. Поэтому со страницы на любом языке ведем туда,
   где страница у книги действительно есть. */
function ownBookHref(bookId: string, lang: UiLang): string | null {
  const b = bookById(bookId);
  if (!b) return null;
  const at: UiLang = b.slug[lang] ? lang : "en";
  const slug = b.slug[at];
  return slug ? itemPath(at, "books", slug) : null;
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { lang: raw, section } = await params;
  if (!activeLangs.includes(raw as UiLang)) notFound();
  const lang = raw as UiLang;
  const s = sectionFromSlug(lang, decodeURIComponent(section));
  if (!s) notFound();

  const t = dictionaries[lang];
  const h = headingFor(lang, s);

  /* Путь по разделам. Google показывает его вместо голого адреса. */
  const crumbs = {
    "@context": "https://schema.org",
    ...breadcrumbs(lang, [{ name: h.title, path: sectionPath(lang, s) }]),
  };
  const Crumbs = () => (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
  );

  /* ---------- Каталог книг ---------- */
  if (s === "books") {
    const items: CardItem[] = booksForLang(lang).map((b) => ({
      id: b.id,
      href: itemPath(lang, "books", b.slug[lang]!),
      title: b.copy[lang]!.title,
      flag:
        b.editionLang === "en"
          ? "\u{1F1FA}\u{1F1F8}"
          : b.editionLang === "es"
            ? "\u{1F1EA}\u{1F1F8}"
            : b.editionLang === "ru"
              ? "\u{1F1F7}\u{1F1FA}"
              : "\u{1F1FA}\u{1F1F8}\u{1F1EA}\u{1F1F8}",
      ageLabel: t.catalog.ages[b.age],
      ages: bookAges(b),
      type: b.type,
      price: cheapestFormat(b)?.price ?? (hasPdf(b.id) ? pdfPriceLabel(b.id) : undefined),
      rating: b.rating,
      ratingNote: t.book.ratingNote,
      cover: b.cover,
    }));

    /* Каталог как список книг. Поисковик видит весь состав каталога,
       даже если фильтры на странице ничего еще не показали. */
    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: h.title,
      numberOfItems: items.length,
      itemListElement: booksForLang(lang).map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Book",
          name: b.copy[lang]!.title,
          url: `${SITE_URL}${itemPath(lang, "books", b.slug[lang]!)}`,
          isbn: bookIsbn13(b),
          author: { "@type": "Person", name: AUTHORS[b.author].name },
        },
      })),
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
        <Crumbs />
        <PageHead title={h.title} lead={h.lead} />
        <div className="wrap">
          <BookFilters
            items={items}
            ages={ageOrder.map((a: AgeGroup) => ({ key: a, label: t.catalog.ages[a] }))}
            types={TYPES.map((k: BookType) => ({ key: k, label: t.catalog.types[k] }))}
            labels={{
              age: t.catalog.filterAge,
              type: t.catalog.filterType,
              all: t.catalog.all,
              empty: t.catalog.empty,
            }}
          />
          {/* Список всех изданий с номерами. Человеку он нужен редко,
              машине постоянно, поэтому ссылка стоит внизу каталога,
              а не в меню. */}
          <p style={{ margin: "var(--gap-3) 0 0" }}>
            <Link href={sectionPath(lang, "catalog")}>
              {t.catalog2.linkFromCatalog}
            </Link>
          </p>
        </div>
      </>
    );
  }

  /* ---------- Учителям ---------- */
  if (s === "teachers") {
    const c = teachersForLang(lang);
    if (!c) notFound();
    const url = `${SITE_URL}${sectionPath(lang, s)}`;

    /* Вопросы отдельной разметкой: именно из нее нейросеть берет
       готовый абзац, когда отвечает на вопрос учителя. */
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    /* Сама страница как учебный материал: возраст, язык, автор, издатель.
       Строки про метод здесь нет: он не опора этой страницы. */
    const pageSchema = {
      "@context": "https://schema.org",
      "@graph": [
        orgNode(),
        ricardoNode(lang),
        {
          "@type": "LearningResource",
          name: c.title,
          url,
          description: c.definition,
          inLanguage: dictionaries[lang].htmlLang,
          educationalLevel: "Kindergarten, Grade 1, Grade 2",
          typicalAgeRange: "5-8",
          audience: [
            { "@type": "EducationalAudience", educationalRole: "teacher" },
            { "@type": "EducationalAudience", educationalRole: "parent" },
            { "@type": "EducationalAudience", educationalRole: "homeschooler" },
          ],
          learningResourceType: "Printable worksheet",
          author: { "@id": RICARDO_ID },
          publisher: { "@id": ORG_ID },
          dateModified: c.updated,
        },
      ],
    };

    const Fig = ({ img, small }: { img: TeachersImage; small?: boolean }) => (
      <figure className={`tfig${small ? " tfig--small" : ""}`}>
        <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" />
        {img.caption ? <figcaption>{img.caption}</figcaption> : null}
      </figure>
    );

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <Crumbs />
        <PageHead title={c.title} lead={c.lead} />

        {/* Первый экран: слева объяснение и кнопки, справа обе обложки.
            Заголовок, текст и книги должны быть видны сразу, без прокрутки. */}
        <section className="teach-block teach-block--top">
          <div className="teach teach--wide">
            <div className="thero">
              <div className="thero__text">
                <p className="thero__short">{c.heroShort}</p>
                <p className="thero__btns">
                  <a className="btn btn--pink" href="#buy">
                    {c.heroBuyCta}
                  </a>
                  <a className="btn btn--sky" href="#free">
                    {c.heroFreeCta}
                  </a>
                </p>
                <p className="thero__note">{c.heroNote}</p>
              </div>
              <div className="thero__covers">
                {c.heroCovers.map((cv) => (
                  <figure className="tfig tfig--cover" key={cv.label}>
                    <img
                      src={cv.img.src}
                      alt={cv.img.alt}
                      width={cv.img.w}
                      height={cv.img.h}
                      loading="eager"
                    />
                    <figcaption>{cv.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Строка ссылок по странице. Учитель с готовой задачей идет
            сразу в нужный блок, а поиск получает карту страницы. */}
        <nav className="teach-block teach-block--nav" aria-label={c.title}>
          <div className="teach">
            <ul className="tnav">
              {c.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Для каких занятий. Отвечает на вопрос, где пригодится покупка. */}
        <section className="band band--mint" id="uses">
          <div className="teach">
            <h2 className="section">{c.usesTitle}</h2>
            <div className="tneeds">
              {c.uses.map((u) => (
                <div className="tneed" key={u.title}>
                  <h3>{u.title}</h3>
                  <p>{u.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Что входит в два тома, до показа отдельного листа. */}
        <section className="teach-block" id="volumes">
          <div className="teach">
            <h2 className="section">{c.volumesTitle}</h2>
            <div className="tvols">
              {c.volumes.map((v) => (
                <div className="tvol" key={v.name}>
                  <h3>{v.name}</h3>
                  <ul>
                    {v.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="teach-p">{c.volumesNote}</p>
          </div>
        </section>

        {/* Как устроен лист. Крупный настоящий лист слева, этапы справа,
            ниже два примера поменьше: второй лист и работа с деталями. */}
        <section className="band band--cream">
          <div className="teach teach--wide">
            <h2 className="section">{c.anatomyTitle}</h2>
            <div className="tanat">
              <Fig img={c.sample} />
              <ol className="tsteps">
                {c.steps.map((st) => (
                  <li key={st.n}>
                    <b>
                      {st.n}. {st.title}
                    </b>
                    <span>{st.text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="buy-note">{c.anatomyNote}</p>
            <div className="tpair">
              <Fig img={c.sample2} small />
              <Fig img={c.useImage} small />
            </div>
          </div>
        </section>

        {/* Бесплатные образцы. Только наши файлы: учитель, пришедший за
            пробником, не должен уходить на чужую площадку. */}
        <section className="teach-block" id="free">
          <div className="teach">
            <h2 className="section">{c.freeTitle}</h2>
            <p className="teach-p">{c.freeLead}</p>
            <div className="tcards">
              {c.freeCards.map((card) => (
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
                    <a className="btn btn--sky" href={card.file} download>
                      {card.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="buy-note">
              {c.freeNote} <Link href={c.freeOther.url}>{c.freeOther.text}</Link>.
            </p>
          </div>
        </section>

        {/* Подборки по теме. Главный блок для того, кто пришел с темой
            урока. Сумма подборок равна 111, это проверено по книгам. */}
        <section className="band band--sun" id="themes">
          <div className="teach">
            <h2 className="section">{c.themesTitle}</h2>
            <p className="teach-p">{c.themesLead}</p>
            <div className="tgroups">
              {c.themeGroups.map((g) => (
                <div className="tgroup" key={g.name}>
                  <h3>
                    {g.name} <span className="tgroup__n">{g.count}</span>
                  </h3>
                  <p className="tgroup__where">{g.where}</p>
                  <p className="tgroup__ex">{g.examples}</p>
                  <p className="tgroup__link">
                    <a href={g.anchor}>{c.seeLabel}</a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Сезонные подборки из тех же рисунков. Зима названа честно:
            снеговика и пингвина в книгах нет. */}
        <section className="teach-block" id="seasons">
          <div className="teach">
            <h2 className="section">{c.seasonTitle}</h2>
            <p className="teach-p">{c.seasonLead}</p>
            <div className="tgroups tgroups--two">
              {c.seasons.map((se) => (
                <div className="tgroup" key={se.name}>
                  <h3>{se.name}</h3>
                  <p className="tgroup__ex">{se.items}</p>
                  <p className="tgroup__link">
                    <a href="#vol1">{c.seeLabel}</a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Полный указатель: все 111 названий с номерами страниц,
            свернуто по томам. Свернутый текст поиск читает, а покупку
            он не отодвигает на несколько экранов вниз. */}
        <section className="band band--cream">
          <div className="teach">
            <h2 className="section">{c.catalogTitle}</h2>
            <p className="teach-p">{c.catalogLead}</p>
            <div className="faq">
              {c.catalog.map((v) => (
                <details key={v.vol} id={v.anchor}>
                  <summary>{v.vol}</summary>
                  {v.groups.map((g) => (
                    <p className="tcat-row" key={`${v.vol}-${g.name}`}>
                      <b>{g.name}:</b> {g.items}
                    </p>
                  ))}
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Другое языковое издание, перед покупкой: язык выбирают до
            товара. Переключателя нет намеренно, вместо него ссылка на
            вторую версию сайта со своими карточками покупки. */}
        <section className="teach-block" id="other">
          <div className="teach">
            <h2 className="section">{c.otherTitle}</h2>
            <p className="teach-p">{c.otherText}</p>
            <div className="tpair tpair--langs">
              {c.otherPair.map((p2) => (
                <figure className="tfig tfig--small" key={p2.label}>
                  <img
                    src={p2.img.src}
                    alt={p2.img.alt}
                    width={p2.img.w}
                    height={p2.img.h}
                    loading="lazy"
                  />
                  <figcaption>{p2.label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="teach-cta">
              <a className="btn btn--sky" href={c.otherFreeUrl} download>
                {c.otherFreeCta}
              </a>{" "}
              <Link className="btn btn--pink" href={c.otherPageUrl}>
                {c.otherPageCta}
              </Link>
            </p>
          </div>
        </section>

        {/* Покупка. Три карточки в один ряд, комплект первым и выделен.
            Наша кнопка идет раньше площадки: с площадки мы получаем
            заметно меньше с той же продажи. */}
        <section className="band band--mint" id="buy">
          <div className="teach teach--wide">
            <h2 className="section">{c.buyTitle}</h2>
            <div className="tbuy">
              {c.buyCards.map((card) => (
                <div className={`tcard tcard--buy${card.featured ? " tcard--featured" : ""}`} key={card.id}>
                  <img
                    src={card.cover.src}
                    alt={card.cover.alt}
                    width={card.cover.w}
                    height={card.cover.h}
                    loading="lazy"
                  />
                  <div>
                    <h3>{card.name}</h3>
                    <p className="tcard-meta">{card.meta}</p>
                    <p>{card.text}</p>
                    {card.save ? <p className="tcard-save">{card.save}</p> : null}
                    {(() => {
                      const bookId = card.bookId;
                      const own = bookId ? ownBookHref(bookId, lang) : null;
                      return own && bookId && card.siteCta ? (
                        <Link className="btn btn--pink" href={own}>
                          {card.siteCta} · {pdfPriceLabel(bookId)}
                        </Link>
                      ) : null;
                    })()}
                    <a
                      className={`btn ${card.featured ? "btn--pink" : "btn--sky"}`}
                      href={card.tptUrl}
                      rel="nofollow sponsored noopener"
                      target="_blank"
                    >
                      {card.tptCta}
                    </a>
                    {/* Размер бумаги выбирают только у нас. */}
                    {card.paperNote ? <p className="buy-note">{card.paperNote}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Практические вопросы. Первые два открыты. */}
        <section className="teach-block">
          <div className="teach">
            <h2 className="section">{c.faqTitle}</h2>
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

        {/* Автор одним абзацем. Ссылка на метод стоит здесь и только
            здесь: это приглашение к разговору, а не доказательство. */}
        <section className="band band--cream">
          <div className="teach">
            <h2 className="section">{c.authorTitle}</h2>
            <p className="teach-p">{c.author}</p>
            <p className="teach-p">
              <a href={METHOD_URL} rel="noopener" target="_blank">
                {c.authorLink}
              </a>
            </p>
            <p className="buy-note">
              {c.updatedLabel} <time dateTime={c.updated}>{c.updated}</time>
            </p>
          </div>
        </section>

        {/* Статьи раздела. Полезны, но не товар, поэтому компактно и в
            самом низу: читать их для выбора и покупки не требуется. */}
        {(() => {
          const arts = articlesForLang(lang);
          return arts.length ? (
            <section className="teach-block">
              <div className="teach">
                <h2 className="section">{c.articlesTitle}</h2>
                <ul className="guide-next guide-next--tight">
                  {arts.map((a) =>
                    a.copy[lang] && a.slug[lang] ? (
                      <li key={a.id}>
                        <Link href={itemPath(lang, "teachers", a.slug[lang]!)}>
                          <b>{a.copy[lang]!.title}</b>
                        </Link>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            </section>
          ) : null;
        })()}

        {/* Последний экран: страница заканчивается понятным действием. */}
        <section className="band band--mint">
          <div className="teach">
            <h2 className="section">{c.finalTitle}</h2>
            <p className="teach-p">{c.finalLead}</p>
            <p className="teach-cta">
              <a className="btn btn--pink" href="#buy">
                {c.heroBuyCta}
              </a>{" "}
              <a className="btn btn--sky" href="#free">
                {c.heroFreeCta}
              </a>
            </p>
          </div>
        </section>
      </>
    );
  }



  /* ---------- Метод ---------- */
  if (s === "method") {
    const m = t.method;
    const list = guidesForLang(lang);
    const regionOrder: RetailerRegion[] = ["us", "europe", "latam", "africa", "global"];

    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: PUBLISHER,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      address: ADDRESS,
      sameAs: [
        SOCIAL.instagram,
        SOCIAL.tiktok,
        SOCIAL.pinterest,
        SOCIAL.youtube,
        ...authorSameAs("ricardo"),
        ...authorSameAs("maria"),
      ],
      founder: [
        { "@id": RICARDO_ID, "@type": "Person", name: AUTHORS.ricardo.name, sameAs: authorSameAs("ricardo") },
        { "@id": MARIA_ID, "@type": "Person", name: AUTHORS.maria.name, sameAs: authorSameAs("maria") },
      ],
      award: awards.map(
        (a) => `${a.result[lang] ?? a.result.en}, ${a.category[lang] ?? a.category.en}, ${a.program} ${a.year}`
      ),
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Crumbs />
        <PageHead title={h.title} lead={h.lead} />

        {/* Идея */}
        <div className="band band--cream">
          <div className="wrap prose">
            <h2 className="section">{m.ideaTitle}</h2>
            {m.idea.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>

        {/* Лестница по возрастам */}
        <div className="wrap" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}>
          <h2 className="section">{m.ladderTitle}</h2>
          <p className="lead">{m.ladderLead}</p>
          <div className="ladder">
            {m.ladder.map((step) => (
              <div className="ladder__step" key={step.age}>
                <p className="ladder__age">{step.age}</p>
                <p className="ladder__can">{step.can}</p>
                <p className="ladder__needs">{step.needs}</p>
              </div>
            ))}
          </div>
          <p className="buy-note">{m.ageNote}</p>
        </div>

        {/* Руководства */}
        {list.length ? (
          <div className="band band--mint">
            <div className="wrap">
              <h2 className="section">{m.guidesTitle}</h2>
              <p className="lead">{m.guidesLead}</p>
              <ul className="guides">
                {list.map((g) => (
                  <li key={g.id}>
                    <Link href={itemPath(lang, "method", g.slug[lang]!)}>{g.copy[lang]!.title}</Link>
                    <span>{g.copy[lang]!.lead}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {/* Награды и рецензии */}
        <div className="wrap" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}>
          <h2 className="section">{m.awardsTitle}</h2>
          <p className="lead">{m.awardsLead}</p>
          <ul className="awards">
            {awards.map((a) => {
              const book = bookById(a.bookId);
              const title = book?.copy[lang]?.title ?? book?.copy.en?.title ?? a.bookId;
              const href = book?.slug[lang] ? itemPath(lang, "books", book.slug[lang]!) : undefined;
              return (
                <li key={`${a.bookId}-${a.program}-${a.year}`}>
                  <strong>{a.result[lang] ?? a.result.en}</strong>
                  {" · "}
                  {a.category[lang] ?? a.category.en}
                  {" · "}
                  <a href={a.programUrl} rel="nofollow noopener" target="_blank">
                    {a.program}
                  </a>{" "}
                  {a.year}
                  <br />
                  {href ? <Link href={href}>{title}</Link> : title}
                </li>
              );
            })}
          </ul>

          <h2 className="section">{m.reviewsTitle}</h2>
          <p>{m.reviewsLead}</p>
          <p>
            {reviewSources.map((r, i) => (
              <span key={r.name}>
                {i > 0 ? " · " : ""}
                <a href={r.url} rel="nofollow noopener" target="_blank">
                  {r.name}
                </a>
              </span>
            ))}
          </p>
        </div>

        {/* Где продается */}
        <div className="band band--pink">
          <div className="wrap">
            <h2 className="section">{m.retailTitle}</h2>
            <p className="lead">{m.retailLead}</p>
            <dl className="retail">
              {regionOrder.map((region) => {
                const inRegion = retailers.filter((r) => r.region === region);
                if (!inRegion.length) return null;
                return (
                  <div key={region}>
                    <dt>{m.regions[region]}</dt>
                    <dd>
                      {inRegion.map((r, i) => (
                        <span key={r.name}>
                          {i > 0 ? " · " : ""}
                          <a href={r.url} rel="nofollow noopener" target="_blank">
                            {r.name}
                          </a>
                        </span>
                      ))}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>

        {/* Методика целиком */}
        <div className="wrap" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}>
          <h2 className="section">{m.standardTitle}</h2>
          <p>{m.standardBody}</p>
          <p>
            <a className="btn btn--ghost" href={METHOD_REFERENCE_URL} rel="noopener" target="_blank">
              {m.standardLink}
            </a>
          </p>
        </div>
      </>
    );
  }

  /* ---------- Бесплатные раскраски: список тем ---------- */
  /* ---------- Первые слова ---------- */
  if (s === "words") {
    const w = wordsHub[lang];
    if (!w) notFound();
    const pages = wordsPagesForLang(lang);
    const steps = wordsSteps[lang];
    const shelf = wordsBookIds(lang)
      .map((id) => bookById(id))
      .filter((b): b is NonNullable<typeof b> => Boolean(b));
    /* Бесплатные листы: страница с животными для малышей. Это верх
       воронки, отсюда человек уходит пробовать, а не покупать. */
    const freePage = pagesForLang(lang).find((x) => x.id === "toddler-animals");

    /* Машинная часть. Определение раздела, список страниц тем и
       вопросы с ответами. Нейросеть берет ответ отсюда целиком. */
    const wordsSchema = {
      "@context": "https://schema.org",
      "@graph": [
        /* Издательство целиком. Дальше по странице на него только ссылка. */
        orgNode(),
        {
          "@type": "WebPage",
          name: w.title,
          description: w.definition,
          inLanguage: lang,
          url: `${SITE_URL}${sectionPath(lang, "words")}`,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          publisher: { "@id": ORG_ID },
        },
        {
          "@type": "ItemList",
          name: w.topicsTitle,
          numberOfItems: pages.length,
          itemListElement: pages.map((pg, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: pg.copy[lang]!.title,
            url: `${SITE_URL}${itemPath(lang, "words", pg.slug[lang]!)}`,
          })),
        },
        {
          "@type": "FAQPage",
          mainEntity: w.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    };

    return (
      <>
        <Crumbs />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(wordsSchema) }}
        />
        <PageHead title={w.title} lead={w.lead} />

        {/* Короткий законченный ответ на вопрос "что это такое".
            Первое, что читает и человек, и машина. */}
        <section className="teach-block">
          <div className="teach">
            <p className="teach-def">{w.definition}</p>
          </div>
        </section>

        {/* Три настоящие страницы книги. Доказательство вместо описания. */}
        <section className="band band--cream">
          <div className="teach">
            <p className="teach-p">{w.showcase}</p>
            <div className="wordshelf">
              {["cat", "car", "apple"].map((name) => (
                <img
                  key={name}
                  className="wordshelf__pic"
                  src={wordPictureUrl(name, lang)}
                  alt={w.showcase}
                  width={700}
                  height={700}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Три действия: раскрась, назови, покажи слово. */}
        <section className="teach-block">
          <div className="teach">
            <h2 className="section">{w.howTitle}</h2>
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

        {/* Темы. Отсюда расходится весь раздел. */}
        <section className="band band--mint">
          <div className="teach">
            <h2 className="section">{w.topicsTitle}</h2>
            <p className="teach-p">{w.topicsLead}</p>
            <div className="themes">
              {pages.map((pg) => {
                const card = w.topics.find((x) => x.page === pg.id);
                const c = pg.copy[lang]!;
                return (
                  <Link
                    className="theme"
                    key={pg.id}
                    href={itemPath(lang, "words", pg.slug[lang]!)}
                  >
                    <div className="theme__strip">
                      {pagePictures(pg, lang).map((name) => (
                        <img
                          key={name}
                          src={wordPictureUrl(name, lang, pg)}
                          alt={c.showcase}
                          width={700}
                          height={700}
                          loading="lazy"
                        />
                      ))}
                    </div>
                    <p className="theme__title">{card?.title ?? c.title}</p>
                    {card ? <p className="theme__meta">{card.text}</p> : null}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Бесплатные листы: попробовать до покупки. */}
        {freePage ? (
          <section className="teach-block">
            <div className="teach">
              <h2 className="section">{w.freeTitle}</h2>
              <p className="teach-p">{w.freeLead}</p>
              <p className="teach-cta">
                <Link
                  className="btn btn--sky"
                  href={itemPath(lang, "coloring", freePage.slug[lang]!)}
                >
                  {w.freeCta}
                </Link>
              </p>
            </div>
          </section>
        ) : null}

        {/* Книги. Нижняя часть воронки. */}
        <section className="band band--pink">
          <div className="teach">
            <h2 className="section">{w.booksTitle}</h2>
            <p className="teach-p">{w.booksLead}</p>
          </div>
          <div className="wrap" style={{ paddingTop: "var(--gap-3)" }}>
            <div className="grid">
              {shelf.map((b) => (
                <BookCard key={b.id} book={b} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* Вопросы и ответы. Короткий вопрос, законченный ответ. */}
        <section className="teach-block">
          <div className="teach">
            <h2 className="section">{w.faqTitle}</h2>
            {w.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (s === "coloring") {
    const pages = pagesForLang(lang);
    return (
      <>
        <Crumbs />
        <PageHead title={h.title} lead={h.lead} />
        <div className="wrap" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}>
          {pages.length === 0 ? (
            <p className="lead">{t.free.comingSoon}</p>
          ) : (
            <div className="themes">
              {pages.map((p) => {
                const c = p.copy[lang]!;
                const first = groupsForLang(p, lang)[0].sheets.slice(0, 3);
                return (
                  <Link className="theme" key={p.id} href={itemPath(lang, "coloring", p.slug[lang]!)}>
                    <div className="theme__strip">
                      {first.map((sh) => (
                        <img
                          key={sh.id}
                          src={previewUrl(sh.id, lang)}
                          alt={(c.sheetAlt ?? t.free.sheetAlt).replace(
                            "{name}",
                            sh.name[lang] ?? sh.name.en!
                          )}
                          width={642}
                          height={822}
                          loading="lazy"
                        />
                      ))}
                    </div>
                    <p className="theme__title">{c.title}</p>
                    <p className="theme__meta">
                      {sheetCount(p, lang)} {t.free.countLabel}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Справочник о первых раскрасках.

              В этот раздел приходят за листами для печати, и заметная
              часть пришедших это родители малышей, которым нужен не
              набор картинок, а ответ, какие листы вообще подходят
              их ребенку. Ответ лежит на отдельном сайте, и до сих пор
              отсюда туда не вело ничего. */}
          <p className="lead" style={{ marginTop: "var(--gap-4)" }}>
            {t.free.toddlerNote}
          </p>
          <p>
            <a className="btn btn--ghost" href={toddlerSiteUrl(lang)} rel="noopener">
              {t.free.toddlerCta}
            </a>
          </p>
        </div>
      </>
    );
  }

  /* ---------- Список всех изданий с номерами ISBN ---------- */
  if (s === "catalog") {
    const c = t.catalog2;
    /* Здесь берем весь каталог, а не книги языка страницы.

       В обычном каталоге англичанин видит английские издания, испанец
       испанские, и это правильно: он выбирает, что купить. Но эта
       страница отвечает на другой вопрос, "что вообще издало это
       издательство", и ответ на него один для всех. Испанское издание
       это отдельная книга со своим номером, и в списке изданий она
       обязана стоять. */
    const rows = books
      .slice()
      /* Сначала свежие. Человек ищет новинку, машина берет первые строки. */
      .sort((a, b) => (b.published ?? "").localeCompare(a.published ?? ""));

    /* Адрес страницы книги. У испанского издания английской страницы нет,
       и наоборот, поэтому ведем туда, где страница у книги действительно
       есть: сначала язык читателя, потом язык самого издания, потом
       любой оставшийся. Без этого строки испанских книг на английской
       странице оставались без ссылки. */
    const rowHref = (b: (typeof rows)[number]) => {
      const order: UiLang[] = [
        lang,
        ...(b.editionLang === "bilingual" ? ["en", "es"] : [b.editionLang]) as UiLang[],
        "en",
        "es",
        "ru",
      ];
      for (const l of order) {
        const slug = b.slug[l];
        if (slug) return itemPath(l, "books", slug);
      }
      return null;
    };

    /* Название на языке читателя, если оно есть, иначе на языке самого
       издания. Испанскую книгу на английской странице показываем под
       ее настоящим испанским названием: под ним она и стоит в магазинах. */
    const rowTitle = (b: (typeof rows)[number]) =>
      b.copy[lang]?.title ??
      b.copy[b.editionLang === "bilingual" ? "en" : (b.editionLang as UiLang)]?.title ??
      b.copy.en?.title ??
      b.id;

    /* Числа для строки под заголовком.

       На сайте везде сказано "27 книг", а в этом списке строк тридцать
       девять, и без пояснения это выглядит как противоречие. Разница
       честная: двадцать семь печатных книг, четыре файла для класса
       без бумажного издания и восемь русских изданий, которые продаются
       только файлом. Считаем прямо здесь, чтобы числа не разъезжались
       с каталогом при добавлении книги. */
    const ruCount = rows.filter((b) => b.editionLang === "ru").length;
    const fileCount = rows.filter(
      (b) => b.editionLang !== "ru" && b.formats.length === 0,
    ).length;
    const printedCount = rows.length - ruCount - fileCount;

    /* Машинная часть: перечень изданий, у каждого свой номер.
       Это и есть то, ради чего страница существует. Нейросеть, которую
       спросили "что издает Magic of Discoveries", берет отсюда готовый
       список, а не собирает его из двадцати семи отдельных карточек. */
    const listSchema = {
      "@context": "https://schema.org",
      "@graph": [
        orgNode(),
        {
          "@type": "WebPage",
          name: c.title,
          description: c.lead,
          inLanguage: lang,
          url: `${SITE_URL}${sectionPath(lang, "catalog")}`,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          publisher: orgRef(),
        },
        {
          "@type": "ItemList",
          name: c.title,
          numberOfItems: rows.length,
          itemListElement: rows.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Book",
              name: rowTitle(b),
              url: `${SITE_URL}${rowHref(b)}`,
              author: { "@type": "Person", name: AUTHORS[b.author].name },
              publisher: orgRef(),
              isbn: bookIsbn13(b),
              numberOfPages: b.pages,
              datePublished: b.published,
              inLanguage:
                b.editionLang === "bilingual" ? ["en", "es"] : b.editionLang,
            },
          })),
        },
      ],
    };

    const langName = (b: (typeof rows)[number]) =>
      c.langNames[b.editionLang as keyof typeof c.langNames] ?? b.editionLang;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
        />
        <Crumbs />
        <PageHead title={h.title} lead={h.lead} />
        <div className="band band--cream">
          <div className="wrap prose">
            {c.intro.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
        <div className="wrap">
          <p className="booklist__count">
            {c.countLine
              .replace("{n}", String(rows.length))
              .replace("{printed}", String(printedCount))
              .replace("{files}", String(fileCount))
              .replace("{ru}", String(ruCount))}
          </p>
          <div className="booklist">
            <table>
              <thead>
                <tr>
                  <th>{c.colTitle}</th>
                  <th>{c.colLang}</th>
                  <th>{c.colAge}</th>
                  <th>{c.colPages}</th>
                  <th>{c.colYear}</th>
                  <th>{c.colIsbn}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((b) => {
                  const isbn = bookIsbn13(b);
                  return (
                    <tr key={b.id}>
                      <td>
                        <Link href={rowHref(b) ?? "#"}>
                          {rowTitle(b)}
                        </Link>
                      </td>
                      <td>{langName(b)}</td>
                      <td className="num">
                        {b.ageShown ?? t.catalog.ages[b.age]}
                      </td>
                      <td className="num">{b.pages ?? ""}</td>
                      <td className="num">{b.published?.slice(0, 4) ?? ""}</td>
                      <td className="isbn">
                        {isbn ?? <span>{c.noIsbn}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="lead" style={{ marginTop: "var(--gap-3)" }}>
            {c.note}
          </p>
        </div>
      </>
    );
  }

  /* ---------- О нас ---------- */
  if (s === "about") {
    /* Кто именно стоит за издательством. На странице это было написано
       словами, но машина не видела, что речь о конкретных людях. Теперь
       оба автора описаны отдельно, каждый со ссылкой на свою авторскую
       страницу Amazon, которую можно проверить. Это же описание Гугл
       и нейросети подтягивают, когда решают, доверять ли статьям. */
    const aboutSchema = {
      "@context": "https://schema.org",
      "@graph": [
        /* Издательство целиком. Дальше по странице на него только ссылка. */
        {
          ...orgNode(),
          founder: [{ "@id": RICARDO_ID }, { "@id": MARIA_ID }],
        },
        {
          "@type": "Person",
          "@id": RICARDO_ID,
          name: AUTHORS.ricardo.name,
          jobTitle: "Publisher and author",
          worksFor: { "@id": ORG_ID },
          url: `${SITE_URL}${sectionPath(lang, "about")}`,
          sameAs: [...authorSameAs("ricardo"), METHOD_REFERENCE_URL],
          knowsAbout: [
            "Children's book publishing",
            "Directed drawing",
            "Early literacy",
          ],
        },
        {
          "@type": "Person",
          "@id": MARIA_ID,
          name: AUTHORS.maria.name,
          jobTitle: "Author and illustrator",
          worksFor: { "@id": ORG_ID },
          url: `${SITE_URL}${sectionPath(lang, "about")}`,
          sameAs: authorSameAs("maria"),
          knowsAbout: ["Coloring books", "Illustration"],
        },
      ],
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
        />
        <Crumbs />
        <PageHead title={h.title} />
        <div className="band band--mint">
          <div className="wrap prose">
            {t.about.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p>
              <a href={AUTHORS.ricardo.amazon} rel="nofollow noopener" target="_blank">
                Ricardo Demi
              </a>
              {" · "}
              <a href={AUTHORS.maria.amazon} rel="nofollow noopener" target="_blank">
                Maria Demi
              </a>
            </p>
            <p>
              <Link href={sectionPath(lang, "catalog")}>
                {t.catalog2.linkFromCatalog}
              </Link>
            </p>
          </div>
        </div>
      </>
    );
  }

  /* ---------- Контакты ---------- */
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": ORG_ID,
            name: PUBLISHER,
            url: SITE_URL,
            address: ADDRESS,
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: CONTACT_EMAIL,
              /* Русский тоже: русские страницы и русские книги на сайте
                 есть, и письма на русском мы читаем. */
              availableLanguage: ["English", "Spanish", "Russian"],
            },
          }),
        }}
      />
      <Crumbs />
      <PageHead title={h.title} lead={h.lead} />
      <div className="wrap" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}>
        <p style={{ fontSize: "var(--t-lead)" }}>
          {t.contact.email}: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </>
  );
}
