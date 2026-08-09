import type { Metadata } from "next";
import { PageHead } from "@/components/Chrome";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { pagesForLang } from "@/data/coloringPages";
import type { UiLang } from "@/data/books";
import { SITE_URL, path } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as UiLang];
  return {
    title: t.free.title,
    description: t.free.lead,
    alternates: {
      canonical: path(lang as UiLang, "coloring-pages"),
      languages: Object.fromEntries(
        activeLangs.map((l) => [l, `${SITE_URL}/${l}/coloring-pages`])
      ),
    },
  };
}

export default async function FreePages({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as UiLang;
  const t = dictionaries[lang];
  const pages = pagesForLang(lang);

  return (
    <>
      <PageHead title={t.free.title} lead={t.free.lead} />
      <div className="wrap" style={{ padding: "40px 0 70px" }}>
        {pages.length === 0 ? (
          <p className="lead">{t.free.comingSoon}</p>
        ) : (
          <div className="grid">
            {pages.map((p) => (
              <a className="card" key={p.id} href={path(lang, "coloring-pages", p.slug[lang]!)}>
                <div className="card__frame">
                  <div className="card__cover">
                    <span className="card__placeholder">{p.copy[lang]!.title}</span>
                  </div>
                  <p className="card__title">{p.copy[lang]!.title}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
