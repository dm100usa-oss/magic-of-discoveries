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
                          alt=""
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
