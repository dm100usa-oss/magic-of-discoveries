import type { Metadata } from "next";
import { PageHead } from "@/components/Chrome";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import type { UiLang } from "@/data/books";
import { SITE_URL, path, CONTACT_EMAIL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as UiLang];
  return {
    title: t.contact.title,
    description: t.contact.lead,
    alternates: {
      canonical: path(lang as UiLang, "contact"),
      languages: Object.fromEntries(activeLangs.map((l) => [l, `${SITE_URL}/${l}/contact`])),
    },
  };
}

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as UiLang;
  const t = dictionaries[lang];
  return (
    <>
      <PageHead title={t.contact.title} lead={t.contact.lead} />
      <div className="wrap" style={{ padding: "44px 0 70px" }}>
        <p style={{ fontSize: 19 }}>
          {t.contact.email}:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </>
  );
}
