import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
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
} from "@/lib/site";
import { sectionFromSlug, sectionSlugs, sectionPath, itemPath, type Section } from "@/lib/routes";
import { hasPdf, PDF_PRICE_LABEL } from "@/lib/pdfShop";
import {
  wordsHub,
  wordsSteps,
  wordsPagesForLang,
  wordsPageById,
  wordPictureUrl,
  wordsBookIds,
} from "@/data/firstWords";
import { langAlternates, breadcrumbs } from "@/lib/schema";
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
      flag: b.editionLang === "en" ? "\u{1F1FA}\u{1F1F8}" : b.editionLang === "es" ? "\u{1F1EA}\u{1F1F8}" : "\u{1F1FA}\u{1F1F8}\u{1F1EA}\u{1F1F8}",
      ageLabel: t.catalog.ages[b.age],
      ages: bookAges(b),
      type: b.type,
      price: cheapestFormat(b)?.price ?? (hasPdf(b.id) ? PDF_PRICE_LABEL : undefined),
      rating: b.rating,
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
        </div>
      </>
    );
  }

  /* ---------- Учителям ---------- */
  if (s === "teachers") {
    const c = teachersForLang(lang);
    if (!c) notFound();
    const url = `${SITE_URL}${sectionPath(lang, s)}`;
    /* Бесплатный набор нужен дважды: кнопка сразу под листами задания
       и карточка в конце. Учитель убеждается на середине страницы,
       и ему должно быть куда нажать, не долистывая до низа. */
    const free = c.cards.find((card) => card.kind === "free");

    /* Вопросы и ответы отдельной разметкой. Именно ее читают нейросети
       и именно из нее берут готовый абзац в свой ответ. */
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
       Так поисковик понимает, для кого это, не читая текст. */
    const pageSchema = {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: c.title,
      url,
      description: c.definition,
      inLanguage: dictionaries[lang].htmlLang,
      educationalLevel: "Kindergarten, Grade 1, Grade 2",
      typicalAgeRange: "5-8",
      /* Кому адресовано. Раньше стоял только уровень образования,
         и по разметке выходило, что материал только для школы. */
      audience: [
        { "@type": "EducationalAudience", educationalRole: "teacher" },
        { "@type": "EducationalAudience", educationalRole: "parent" },
        { "@type": "EducationalAudience", educationalRole: "homeschooler" },
      ],
      learningResourceType: "Lesson format",
      teaches: [c.skillsLead, ...c.skills],
      author: { "@type": "Person", name: AUTHORS.ricardo.name, sameAs: METHOD_URL },
      publisher: { "@type": "Organization", name: PUBLISHER, url: SITE_URL, address: ADDRESS },
      isBasedOn: { "@type": "CreativeWork", name: "Ricardo Demi ECL Method", url: METHOD_URL },
    };

    /* Картинка с подписью. Подпись видна человеку и читается нейросетью. */
    const Fig = ({ img }: { img: typeof c.sample }) => (
      <figure className="tfig">
        <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" />
        <figcaption>{img.caption}</figcaption>
      </figure>
    );

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <Crumbs />
        <PageHead title={c.title} lead={c.lead} />

        {/* Обе книги сразу под заголовком: обложка, название, кнопка.
            Тот же выбор повторен внизу, там с полным описанием.
            Вверху описание убрано, иначе блок отодвигает объяснение
            и первый абзац уходит с экрана. */}
        <section className="teach-block teach-block--top">
          <div className="teach">
            <div className="tcards tcards--top">
              {c.cards.map((card) => (
                <div className="tcard" key={`top-${card.title}`}>
                  <img
                    src={card.cover.src}
                    alt={card.cover.alt}
                    width={card.cover.w}
                    height={card.cover.h}
                  />
                  <div>
                    <p className="tcard-title">{card.title}</p>
                    {card.url ? (
                      /* Адрес внутри сайта это наш файл, и помечать его
                         как рекламную ссылку на площадку нельзя. */
                      <a
                        className={`btn ${card.kind === "free" ? "btn--sky" : "btn--pink"}`}
                        href={card.url}
                        {...(card.url.startsWith("/")
                          ? { download: true }
                          : { rel: "nofollow sponsored noopener", target: "_blank" })}
                      >
                        {card.cta}
                      </a>
                    ) : null}
                    {/* Покупка у нас. Стоит второй, когда набор есть и
                        на площадке, и первой, когда он только у нас. */}
                    {(() => {
                      const own = card.bookId
                        ? ownBookHref(card.bookId, lang)
                        : null;
                      return own && card.siteCta ? (
                        <Link className="btn btn--sky" href={own}>
                          {card.siteCta} · {PDF_PRICE_LABEL}
                        </Link>
                      ) : null;
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Определение. Первый абзац страницы, его берет нейросеть. */}
        <section className="teach-block">
          <div className="teach">
            <p className="teach-def">{c.definition}</p>
          </div>
        </section>

        {/* Чей это формат */}
        <section className="band band--cream">
          <div className="teach">
            <h2 className="section">{c.originTitle}</h2>
            {c.origin.map((para) => (
              <p className="teach-p" key={para.slice(0, 24)}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Почему помогает */}
        <section className="teach-block">
          <div className="teach">
            <h2 className="section">{c.whyTitle}</h2>
            {c.why.map((para) => (
              <p className="teach-p" key={para.slice(0, 24)}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Четыре этапа и два настоящих листа рядом */}
        <section className="band band--mint">
          <div className="teach">
            <h2 className="section">{c.stepsTitle}</h2>
            <ol className="ladder">
              {c.steps.map((st) => (
                <li className="ladder__step" key={st.n}>
                  <p className="ladder__age">{st.n}</p>
                  <p className="ladder__can">{st.title}</p>
                  <p className="ladder__needs">{st.text}</p>
                </li>
              ))}
            </ol>
            <p className="buy-note">{c.stepsNote}</p>
          </div>
          <div className="teach teach--wide">
            <div className="tpair tpair--pages">
              <Fig img={c.sample} />
              <Fig img={c.sample2} />
            </div>
            {free?.url ? (
              <p className="teach-cta">
                <a className="btn btn--sky" href={free.url} rel="nofollow sponsored noopener" target="_blank">
                  {free.cta}
                </a>
              </p>
            ) : null}
          </div>
        </section>

        {/* Навыки. Мелкая моторика вынесена отдельно. */}
        <section className="teach-block">
          <div className="teach">
            <h2 className="section">{c.skillsTitle}</h2>
            <p className="script-title teach-script">{c.skillsLead}</p>
            <div className="chips">
              {c.skills.map((sk) => (
                <span className="chip" key={sk}>
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Где встает в дне класса. Два баннера рядом. */}
        <section className="band band--pink">
          <div className="teach">
            <h2 className="section">{c.fitTitle}</h2>
            <p className="teach-p">{c.fitLead}</p>
            <div className="chips">
              {c.fit.map((f) => (
                <span className="chip" key={f}>
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="teach teach--wide">
            <div className="tpair">
              <Fig img={c.fitImage} />
              <Fig img={c.fitImage2} />
            </div>
          </div>
        </section>

        {/* Состав книги и темы */}
        <section className="teach-block">
          <div className="teach">
            <h2 className="section">{c.bookTitle}</h2>
            {c.book.map((para) => (
              <p className="teach-p" key={para.slice(0, 24)}>
                {para}
              </p>
            ))}
            <h2 className="section">{c.themesTitle}</h2>
            <div className="chips">
              {c.themes.map((th) => (
                <span className="chip" key={th.name}>
                  {th.name} {th.count}
                </span>
              ))}
            </div>
            <Fig img={c.themesImage} />
          </div>
        </section>

        {/* Метод и издательство. Два разных доказательства, поэтому врозь. */}
        <section className="band band--cream">
          <div className="teach">
            <h2 className="section">{c.methodTitle}</h2>
            <p className="teach-p">{c.method}</p>
            <p className="teach-p">
              <a href={METHOD_URL} rel="noopener" target="_blank">
                {c.methodLink}
              </a>
            </p>
            <h2 className="section">{c.publisherTitle}</h2>
            {c.publisher.map((para) => (
              <p className="teach-p" key={para.slice(0, 24)}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Вопросы и ответы. На широком экране в две колонки.
            Первые два открыты: иначе виден только ряд плюсиков. */}
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

        {/* Две карточки. Человек прочитал объяснение и сразу видит, что делать. */}
        <section className="band band--mint">
          <div className="teach">
            <h2 className="section">{c.ctaTitle}</h2>
            <p className="teach-p">{c.ctaLead}</p>
            <div className="tcards">
              {c.cards.map((card) => (
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
                      /* Адрес внутри сайта это наш файл, и помечать его
                         как рекламную ссылку на площадку нельзя. */
                      <a
                        className={`btn ${card.kind === "free" ? "btn--sky" : "btn--pink"}`}
                        href={card.url}
                        {...(card.url.startsWith("/")
                          ? { download: true }
                          : { rel: "nofollow sponsored noopener", target: "_blank" })}
                      >
                        {card.cta}
                      </a>
                    ) : null}
                    {/* Покупка у нас. Стоит второй, когда набор есть и
                        на площадке, и первой, когда он только у нас. */}
                    {(() => {
                      const own = card.bookId
                        ? ownBookHref(card.bookId, lang)
                        : null;
                      return own && card.siteCta ? (
                        <Link className="btn btn--sky" href={own}>
                          {card.siteCta} · {PDF_PRICE_LABEL}
                        </Link>
                      ) : null;
                    })()}
                  </div>
                </div>
              ))}
            </div>

            {/* Три статьи раздела. Одна страница отвечает на один вопрос,
                четыре страницы делают раздел темой, а не одиноким листом. */}
            {(() => {
              const arts = articlesForLang(lang);
              const ui = articleUi[lang];
              return arts.length && ui ? (
                <>
                  <h2 className="section" style={{ marginTop: "var(--gap-4)" }}>
                    {ui.related}
                  </h2>
                  <ul className="guide-next">
                    {arts.map((a) => (
                      <li key={a.id}>
                        <Link href={itemPath(lang, "teachers", a.slug[lang]!)}>
                          <b>{a.copy[lang]!.title}</b>
                          <span>{a.copy[lang]!.lead}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null;
            })()}

            {/* Та же книга на другом языке. Учитель двуязычного класса
                читает страницу на своем языке, и без этой строки он
                вторую книгу не найдет: пришлось бы переключать язык
                сайта и искать раздел заново. */}
            {c.otherLang?.url ? (
              <p className="teach-other">
                <span>{c.otherLang.text}</span>
                <a
                  className="btn btn--sun"
                  href={c.otherLang.url}
                  rel="nofollow sponsored noopener"
                  target="_blank"
                >
                  {c.otherLang.cta}
                </a>
              </p>
            ) : null}
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
      name: PUBLISHER,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      address: ADDRESS,
      sameAs: [
        SOCIAL.instagram,
        SOCIAL.tiktok,
        SOCIAL.pinterest,
        SOCIAL.youtube,
        AUTHORS.ricardo.amazon,
        AUTHORS.maria.amazon,
      ],
      founder: [
        { "@type": "Person", name: AUTHORS.ricardo.name, sameAs: AUTHORS.ricardo.amazon },
        { "@type": "Person", name: AUTHORS.maria.name, sameAs: AUTHORS.maria.amazon },
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
        {
          "@type": "WebPage",
          name: w.title,
          description: w.definition,
          inLanguage: lang,
          url: `${SITE_URL}${sectionPath(lang, "words")}`,
          isPartOf: { "@type": "WebSite", name: PUBLISHER, url: SITE_URL },
          publisher: { "@type": "Organization", name: PUBLISHER, address: ADDRESS },
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
                      {pg.pictures.map((name) => (
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
        {
          "@type": "Organization",
          name: PUBLISHER,
          url: SITE_URL,
          address: ADDRESS,
          founder: [
            {
              "@type": "Person",
              name: AUTHORS.ricardo.name,
              jobTitle: "Publisher and author",
              sameAs: [AUTHORS.ricardo.amazon, METHOD_REFERENCE_URL],
            },
            {
              "@type": "Person",
              name: AUTHORS.maria.name,
              jobTitle: "Author and illustrator",
              sameAs: [AUTHORS.maria.amazon],
            },
          ],
        },
        {
          "@type": "Person",
          name: AUTHORS.ricardo.name,
          jobTitle: "Publisher and author",
          worksFor: { "@type": "Organization", name: PUBLISHER },
          url: `${SITE_URL}${sectionPath(lang, "about")}`,
          sameAs: [AUTHORS.ricardo.amazon, METHOD_REFERENCE_URL],
          knowsAbout: [
            "Children's book publishing",
            "Directed drawing",
            "Early literacy",
          ],
        },
        {
          "@type": "Person",
          name: AUTHORS.maria.name,
          jobTitle: "Author and illustrator",
          worksFor: { "@type": "Organization", name: PUBLISHER },
          url: `${SITE_URL}${sectionPath(lang, "about")}`,
          sameAs: [AUTHORS.maria.amazon],
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
            name: PUBLISHER,
            url: SITE_URL,
            address: ADDRESS,
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: CONTACT_EMAIL,
              availableLanguage: ["English", "Spanish"],
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
