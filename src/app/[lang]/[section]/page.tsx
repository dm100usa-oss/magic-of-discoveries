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
import { PageHead } from "@/components/Chrome";
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
} from "@/lib/site";
import { sectionFromSlug, sectionSlugs, sectionPath, itemPath, type Section } from "@/lib/routes";
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

export default async function SectionPage({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { lang: raw, section } = await params;
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
      price: cheapestFormat(b)?.price,
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
      learningResourceType: "Lesson format",
      teaches: [c.skillsLead, ...c.skills],
      author: { "@type": "Person", name: AUTHORS.ricardo.name, sameAs: METHOD_URL },
      publisher: { "@type": "Organization", name: PUBLISHER, url: SITE_URL, address: ADDRESS },
      isBasedOn: { "@type": "CreativeWork", name: "Ricardo Demi ECL Method", url: METHOD_URL },
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <Crumbs />
        <PageHead title={c.title} lead={c.lead} />

        {/* Определение. Первый абзац страницы, его берет нейросеть. */}
        <div className="wrap prose" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem) 0" }}>
          <p className="lead">{c.definition}</p>
        </div>

        {/* Чей это формат */}
        <div className="band band--cream">
          <div className="wrap prose">
            <h2 className="section">{c.originTitle}</h2>
            {c.origin.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>

        {/* Почему помогает */}
        <div className="wrap prose" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}>
          <h2 className="section">{c.whyTitle}</h2>
          {c.why.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>

        {/* Четыре этапа */}
        <div className="band band--mint">
          <div className="wrap">
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
        </div>

        {/* Навыки. Мелкая моторика вынесена отдельно. */}
        <div className="wrap" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}>
          <h2 className="section">{c.skillsTitle}</h2>
          <p className="script-title" style={{ fontSize: "clamp(1.3rem, 1rem + 1.4vw, 1.9rem)" }}>
            {c.skillsLead}
          </p>
          <div className="chips">
            {c.skills.map((sk) => (
              <span className="chip" key={sk}>
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Где встает в дне класса */}
        <div className="band band--pink">
          <div className="wrap">
            <h2 className="section">{c.fitTitle}</h2>
            <p className="lead">{c.fitLead}</p>
            <div className="chips">
              {c.fit.map((f) => (
                <span className="chip" key={f}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Состав книги и темы */}
        <div className="wrap prose" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}>
          <h2 className="section">{c.bookTitle}</h2>
          {c.book.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <h2 className="section">{c.themesTitle}</h2>
          <div className="chips">
            {c.themes.map((th) => (
              <span className="chip" key={th.name}>
                {th.name} {th.count}
              </span>
            ))}
          </div>
        </div>

        {/* Метод и издательство. Два разных доказательства, поэтому врозь. */}
        <div className="band band--cream">
          <div className="wrap prose">
            <h2 className="section">{c.methodTitle}</h2>
            <p>{c.method}</p>
            <p>
              <a href={METHOD_URL} rel="noopener" target="_blank">
                {c.methodLink}
              </a>
            </p>
            <h2 className="section">{c.publisherTitle}</h2>
            {c.publisher.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>

        {/* Вопросы и ответы */}
        <div className="wrap" style={{ padding: "var(--band-y) clamp(1rem, 4vw, 2rem)" }}>
          <h2 className="section">{c.faqTitle}</h2>
          <div className="faq">
            {c.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Две карточки. Человек прочитал объяснение и сразу видит, что делать. */}
        <div className="band band--mint">
          <div className="wrap">
            <h2 className="section">{c.ctaTitle}</h2>
            <p className="lead">{c.ctaLead}</p>
            <div className="guides">
              {c.cards.map((card) => (
                <div key={card.title}>
                  <strong>{card.title}</strong>
                  <span>{card.text}</span>
                  {card.url ? (
                    <div className="buys" style={{ marginTop: "0.9rem" }}>
                      <a
                        className={`btn ${card.kind === "free" ? "btn--sky" : "btn--pink"}`}
                        href={card.url}
                        rel="nofollow sponsored noopener"
                        target="_blank"
                      >
                        {card.cta}
                      </a>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
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
        </div>
      </>
    );
  }

  /* ---------- О нас ---------- */
  if (s === "about") {
    return (
      <>
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
