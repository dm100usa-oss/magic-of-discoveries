import Link from "next/link";
import type { Metadata } from "next";
import { booksForLang, type UiLang } from "@/data/books";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { BookCard } from "@/components/Chrome";
import { reviewsByLang } from "@/lib/reviews";
import { SITE_NAME, SITE_URL, PUBLISHER, SOCIAL } from "@/lib/site";
import { homePath, sectionPath } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as UiLang];
  return {
    title: t.home.heroTitle,
    description: t.home.heroLead,
    alternates: {
      canonical: homePath(lang as UiLang),
      languages: Object.fromEntries(activeLangs.map((l) => [l, `${SITE_URL}/${l}`])),
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw as UiLang;
  const t = dictionaries[lang];
  const all = booksForLang(lang);
  const revs = reviewsByLang[lang];
  const kids = all.filter((b) => b.age !== "teens-adults");
  const adults = all.filter((b) => b.age === "teens-adults");

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: PUBLISHER,
    url: SITE_URL,
    sameAs: Object.values(SOCIAL),
    founder: [
      { "@type": "Person", name: "Ricardo Demi" },
      { "@type": "Person", name: "Maria Demi" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Блок 1: обещание */}
      <section className="band">
        <div className="wrap">
          <p className="script-title" style={{ fontSize: "clamp(1.3rem, 1rem + 1.4vw, 1.9rem)", margin: "0 0 0.3rem" }}>
            {t.home.heroEyebrow}
          </p>
          <h1 className="hero">{t.home.heroTitle}</h1>
          <p className="lead">{t.home.heroLead}</p>
          <Link className="btn btn--pink" href={sectionPath(lang, "books")}>
            {t.home.heroCta}
          </Link>
        </div>
      </section>

      {/* Блок 2: детям */}
      <section className="band band--mint">
        <div className="wrap">
          <h2 className="section">{t.home.kidsTitle}</h2>
          <p className="lead">{t.home.kidsLead}</p>
          <div className="grid">
            {kids.map((b) => (
              <BookCard key={b.id} book={b} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Блок 3: взрослым */}
      <section className="band">
        <div className="wrap">
          <h2 className="section">{t.home.adultsTitle}</h2>
          <p className="lead">{t.home.adultsLead}</p>
          <div className="grid">
            {adults.map((b) => (
              <BookCard key={b.id} book={b} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Блок 4: бесплатные раскраски. Вход из поиска. */}
      <section className="band band--cream">
        <div className="wrap">
          <h2 className="section">{t.home.freeTitle}</h2>
          <p className="lead">{t.home.freeLead}</p>
          <Link className="btn btn--sun" href={sectionPath(lang, "coloring")}>
            {t.home.freeCta}
          </Link>
        </div>
      </section>

      {/* Блок 5: отзывы */}
      <section className="band">
        <div className="wrap">
          <p className="script-title">{t.home.reviewsTitle}</p>
          <div className="reviews">
            {revs.map((r) => (
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
        </div>
      </section>
    </>
  );
}
