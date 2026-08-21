import Link from "next/link";
import type { Book, UiLang } from "@/data/books";
import { cheapestFormat } from "@/data/books";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { RatingMini } from "@/components/Rating";
import { SITE_NAME, SOCIAL } from "@/lib/site";
import { homePath, sectionPath, itemPath } from "@/lib/routes";

const BRAND = "MAGIC of DISCOVERIES";

/* Облако. Нарисовано двумя слоями: снизу тот же силуэт голубым и с толстой
   обводкой, сверху он же белым. Голубой выглядывает по краю ровной каймой,
   а все внутренние стыки кружков закрыты белым. */
function Cloud({ className }: { className: string }) {
  const bumps = (
    <>
      <circle cx="124" cy="60" r="48" />
      <circle cx="72" cy="86" r="30" />
      <circle cx="180" cy="84" r="28" />
      <circle cx="40" cy="102" r="22" />
      <circle cx="211" cy="105" r="19" />
    </>
  );
  return (
    <svg className={className} viewBox="8 4 228 128" aria-hidden focusable="false">
      <g fill="#4da3e8" stroke="#4da3e8" strokeWidth="5" strokeLinejoin="round">
        {bumps}
        <rect x="40" y="104" width="171" height="20" />
      </g>
      <g fill="#ffffff" stroke="#ffffff" strokeWidth="1.4" strokeLinejoin="round">
        {bumps}
        <rect x="40" y="96" width="171" height="28" />
      </g>
    </svg>
  );
}

/* Солнце. Диск стоит на месте, лучи вращаются: они собраны в отдельную
   группу, ей и задан поворот. */
function Sun() {
  const ray = <rect x="93" y="12" width="14" height="32" rx="7" />;
  return (
    <svg className="sky__sun" viewBox="8 8 184 184" aria-hidden focusable="false">
      <defs>
        <linearGradient id="sunFill" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#ffb93f" />
          <stop offset="0.55" stopColor="#ff9d1a" />
          <stop offset="1" stopColor="#f0790a" />
        </linearGradient>
      </defs>
      <g className="sky__rays" fill="#ffa726">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 100 100)`}>
            {ray}
          </g>
        ))}
      </g>
      <circle cx="100" cy="100" r="50" fill="url(#sunFill)" />
    </svg>
  );
}

/* Птичка. Стоит в самом конце второй строки названия, поэтому она вписана
   в строку: так она держится за буквы и не уезжает при смене размера окна. */
function Bird() {
  const body = (
    <>
      <path d="M76 50 C92 53 110 61 122 70 C119 74 116 75 112 74 C99 69 86 63 75 61 Z" />
      <circle cx="40" cy="32" r="20" />
      <ellipse cx="57" cy="50" rx="30" ry="23" />
    </>
  );
  return (
    <svg className="brand__bird" viewBox="0 0 126 96" aria-hidden focusable="false">
      <g stroke="#f4741f" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M50 70 L47 88" />
        <path d="M47 88 L39 92" />
        <path d="M47 88 L54 92" />
        <path d="M47 88 L47 93" />
        <path d="M64 70 L68 88" />
        <path d="M68 88 L60 92" />
        <path d="M68 88 L75 92" />
        <path d="M68 88 L68 93" />
      </g>
      <g fill="#ffffff" stroke="#ffffff" strokeWidth="7" strokeLinejoin="round">
        {body}
      </g>
      <path
        d="M76 50 C92 53 110 61 122 70 C119 74 116 75 112 74 C99 69 86 63 75 61 Z"
        fill="#173a86"
      />
      <g fill="#5cbcf6">
        <circle cx="40" cy="32" r="20" />
        <ellipse cx="57" cy="50" rx="30" ry="23" />
      </g>
      <path d="M42 48 C52 38 74 37 84 48 C91 56 82 67 66 67 C52 67 39 58 42 48 Z" fill="#1e73d8" />
      <path d="M23 31 L3 37 L23 43 Z" fill="#f7931e" />
      <circle cx="41" cy="27" r="4" fill="#2b3245" />
      <circle cx="42.3" cy="25.7" r="1.3" fill="#ffffff" />
    </svg>
  );
}

export function Brand() {
  const paint = (text: string, offset = 0) =>
    text.split("").map((ch, i) =>
      ch === " " ? " " : <span key={`${offset}-${i}`}>{ch}</span>
    );

  return (
    <p className="brand" aria-label={SITE_NAME}>
      <span className="brand__line">{paint("MAGIC of")}</span>
      <span className="brand__line">
        {paint("DISCOVERIES", 8)}
        <Bird />
      </span>
    </p>
  );
}

export function Header({ lang }: { lang: UiLang }) {
  const t = dictionaries[lang];
  const items: [string, string][] = [
    [homePath(lang), t.nav.home],
    [sectionPath(lang, "books"), t.nav.books],
    [sectionPath(lang, "method"), t.nav.method],
    [sectionPath(lang, "teachers"), t.nav.teachers],
    [sectionPath(lang, "coloring"), t.nav.coloringPages],
    [sectionPath(lang, "about"), t.nav.about],
    [sectionPath(lang, "contact"), t.nav.contact],
  ];
  return (
    <header>
      <div className="masthead">
        <div className="sky" aria-hidden>
          <Cloud className="sky__cloud sky__cloud--big" />
          <Cloud className="sky__cloud sky__cloud--small" />
          <Sun />
        </div>
        <div className="masthead__inner">
          <img
            className="balloon"
            src="/balloon.png"
            alt=""
            aria-hidden
            width={520}
            height={745}
          />
          <Link href={homePath(lang)} style={{ textDecoration: "none" }}>
            <Brand />
          </Link>
        </div>
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
        © 2024-{new Date().getFullYear()} {SITE_NAME}. {t.footer.rights}
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
            <img src={book.cover} alt={copy.title} loading="lazy" width={book.coverSize?.w ?? 900} height={book.coverSize?.h ?? 1160} />
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
