import Link from "next/link";
import type { Metadata } from "next";
import { booksForLang, ageOrder, type UiLang, type AgeGroup, type BookType } from "@/data/books";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { BookCard, PageHead } from "@/components/Chrome";
import { SITE_URL, path } from "@/lib/site";

const TYPES: BookType[] = ["coloring", "drawing", "bedtime", "bilingual"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as UiLang];
  return {
    title: t.catalog.title,
    description: t.catalog.lead,
    alternates: {
      canonical: path(lang as UiLang, "books"),
      languages: Object.fromEntries(activeLangs.map((l) => [l, `${SITE_URL}/${l}/books`])),
    },
  };
}

export default async function Catalog({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ age?: string; type?: string }>;
}) {
  const { lang: raw } = await params;
  const { age, type } = await searchParams;
  const lang = raw as UiLang;
  const t = dictionaries[lang];

  let list = booksForLang(lang);
  if (age) list = list.filter((b) => b.age === age);
  if (type) list = list.filter((b) => b.type === type);

  const link = (patch: { age?: string; type?: string }) => {
    const next = { age, type, ...patch };
    const qs = Object.entries(next)
      .filter(([, v]) => Boolean(v))
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
    return path(lang, "books") + (qs ? `?${qs}` : "");
  };

  return (
    <>
      <PageHead title={t.catalog.title} lead={t.catalog.lead} />
      <div className="wrap">
        <div className="filters">
          <fieldset>
            <legend>{t.catalog.filterAge}</legend>
            <div className="chips">
              <Link className="chip" href={link({ age: undefined })} aria-current={!age}>
                {t.catalog.all}
              </Link>
              {ageOrder.map((a: AgeGroup) => (
                <Link key={a} className="chip" href={link({ age: a })} aria-current={age === a}>
                  {t.catalog.ages[a]}
                </Link>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>{t.catalog.filterType}</legend>
            <div className="chips">
              <Link className="chip" href={link({ type: undefined })} aria-current={!type}>
                {t.catalog.all}
              </Link>
              {TYPES.map((k) => (
                <Link key={k} className="chip" href={link({ type: k })} aria-current={type === k}>
                  {t.catalog.types[k]}
                </Link>
              ))}
            </div>
          </fieldset>
        </div>

        {list.length ? (
          <div className="grid" style={{ paddingBottom: 50 }}>
            {list.map((b) => (
              <BookCard key={b.id} book={b} lang={lang} />
            ))}
          </div>
        ) : (
          <p style={{ padding: "20px 0 60px" }}>{t.catalog.empty}</p>
        )}
      </div>
    </>
  );
}
