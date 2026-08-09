import type { Metadata } from "next";
import { PageHead } from "@/components/Chrome";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import type { UiLang } from "@/data/books";
import { SITE_URL, path, AUTHORS } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as UiLang];
  return {
    title: t.about.title,
    description: t.about.body[0],
    alternates: {
      canonical: path(lang as UiLang, "about"),
      languages: Object.fromEntries(activeLangs.map((l) => [l, `${SITE_URL}/${l}/about`])),
    },
  };
}

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as UiLang;
  const t = dictionaries[lang];
  return (
    <>
      <PageHead title={t.about.title} />
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
