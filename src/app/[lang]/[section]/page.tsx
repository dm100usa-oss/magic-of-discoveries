import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  booksForLang,
  ageOrder,
  cheapestFormat,
  type UiLang,
  type AgeGroup,
  type BookType,
} from "@/data/books";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { pagesForLang } from "@/data/coloringPages";
import { PageHead } from "@/components/Chrome";
import BookFilters, { type CardItem } from "@/components/BookFilters";
import { SITE_URL, CONTACT_EMAIL, AUTHORS } from "@/lib/site";
import { sectionFromSlug, sectionSlugs, sectionPath, itemPath, type Section } from "@/lib/routes";

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
  const languages = Object.fromEntries(
    activeLangs.map((l) => [l, `${SITE_URL}${sectionPath(l, s)}`])
  );
  return {
    title: h.title,
    description: h.lead ?? dictionaries[lang].about.body[0],
    alternates: { canonical: sectionPath(lang, s), languages },
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

  /* ---------- Каталог книг ---------- */
  if (s === "books") {
    const items: CardItem[] = booksForLang(lang).map((b) => ({
      id: b.id,
      href: itemPath(lang, "books", b.slug[lang]!),
      title: b.copy[lang]!.title,
      flag: b.editionLang === "en" ? "\u{1F1FA}\u{1F1F8}" : b.editionLang === "es" ? "\u{1F1EA}\u{1F1F8}" : "\u{1F1FA}\u{1F1F8}\u{1F1EA}\u{1F1F8}",
      ageLabel: t.catalog.ages[b.age],
      age: b.age,
      type: b.type,
      price: cheapestFormat(b)?.price,
      rating: b.rating,
    }));

    return (
      <>
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

  /* ---------- Бесплатные раскраски ---------- */
  if (s === "coloring") {
    const pages = pagesForLang(lang);
    return (
      <>
        <PageHead title={h.title} lead={h.lead} />
        <div className="wrap" style={{ padding: "var(--band-y) 0" }}>
          {pages.length === 0 ? (
            <p className="lead">{t.free.comingSoon}</p>
          ) : (
            <div className="grid">
              {pages.map((p) => (
                <Link className="card" key={p.id} href={itemPath(lang, "coloring", p.slug[lang]!)}>
                  <div className="card__frame">
                    <div className="card__cover">
                      <span className="card__placeholder">{p.copy[lang]!.title}</span>
                    </div>
                    <p className="card__title">{p.copy[lang]!.title}</p>
                  </div>
                </Link>
              ))}
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
      <PageHead title={h.title} lead={h.lead} />
      <div className="wrap" style={{ padding: "var(--band-y) 0" }}>
        <p style={{ fontSize: "var(--t-lead)" }}>
          {t.contact.email}: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </>
  );
}
