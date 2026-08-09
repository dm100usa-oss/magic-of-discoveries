import Link from "next/link";
import type { Book, UiLang } from "@/data/books";
import { cheapestFormat } from "@/data/books";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { RatingMini } from "@/components/Rating";
import { SITE_NAME, SOCIAL } from "@/lib/site";
import { homePath, sectionPath, itemPath } from "@/lib/routes";

const BRAND = "MAGIC of DISCOVERIES";

export function Brand() {
  return (
    <p className="brand" aria-label={SITE_NAME}>
      {BRAND.split("").map((ch, i) =>
        ch === " " ? " " : <span key={i}>{ch}</span>
      )}
    </p>
  );
}

export function Header({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang];
  const items: [string, string][] = [
    [homePath(lang), t.nav.home],
    [sectionPath(lang, "books"), t.nav.books],
    [sectionPath(lang, "coloring"), t.nav.coloringPages],
    [sectionPath(lang, "about"), t.nav.about],
    [sectionPath(lang, "contact"), t.nav.contact],
  ];
  return (
    <header>
      <div className="topbar" />
      <div className="masthead">
        <Link href={homePath(lang)} style={{ textDecoration: "none" }}>
          <Brand />
        </Link>
        <p className="byline">Ricardo &amp; Maria Demi</p>
        <div className="langbar">
          {activeLangs.map((l) => (
            <Link key={l} href={homePath(l)} aria-current={l === lang}>
              {dictionaries[l].label}
            </Link>
          ))}
        </div>
      </div>
      <nav className="nav" aria-label="Main">
        <ul>
          {items.map(([href, label]) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function Footer({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang];
  return (
    <footer className="footer">
      <p style={{ margin: "0 0 8px" }}>
        <a href={SOCIAL.instagram}>Instagram</a> · <a href={SOCIAL.tiktok}>TikTok</a> ·{" "}
        <a href={SOCIAL.pinterest}>Pinterest</a> · <a href={SOCIAL.youtube}>YouTube</a>
      </p>
      <p style={{ margin: 0 }}>
        © 2024–{new Date().getFullYear()} {SITE_NAME} — {t.footer.rights}
      </p>
    </footer>
  );
}

export function PageHead({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="pagehead">
      <h1>{title}</h1>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}

const flagOf = (b: Book) =>
  b.editionLang === "en" ? "🇺🇸" : b.editionLang === "es" ? "🇪🇸" : "🇺🇸🇪🇸";

export function BookCard({ book, lang }: { book: Book; lang: UiLang }) {
  const t = dictionaries[lang];
  const copy = book.copy[lang];
  const slug = book.slug[lang];
  if (!copy || !slug) return null;
  const price = cheapestFormat(book)?.price;
  return (
    <Link className="card" href={itemPath(lang, "books", slug)}>
      <div className="card__frame">
        <div className="card__cover">
          {book.cover ? (
            <img src={book.cover} alt={copy.title} loading="lazy" width={900} height={1160} />
          ) : (
            <span className="card__placeholder">{copy.title}</span>
          )}
        </div>
        <p className="card__title">
          <span className="flag" aria-hidden>
            {flagOf(book)}
          </span>
          {copy.title}
        </p>
        <p className="card__meta">{t.catalog.ages[book.age]}</p>
        {book.rating ? <RatingMini rating={book.rating} /> : null}
        {price ? <p className="card__price">{price}</p> : null}
      </div>
    </Link>
  );
}
