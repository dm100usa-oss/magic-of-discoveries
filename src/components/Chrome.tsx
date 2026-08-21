import Link from "next/link";
import type { Book, UiLang } from "@/data/books";
import { cheapestFormat } from "@/data/books";
import { dictionaries, activeLangs } from "@/data/dictionaries";
import { RatingMini } from "@/components/Rating";
import { SITE_NAME, SOCIAL } from "@/lib/site";
import { homePath, sectionPath, itemPath } from "@/lib/routes";

const BRAND = "MAGIC of DISCOVERIES";

/* Все три рисунка неба сделаны в том же ключе, что и название на сайте:
   у фигуры своя кромка чуть темнее заливки, дальше белая обводка, дальше
   бледно-розовая, и мягкая тень снизу. Плюс заливка не плоская, а с
   переходом, чтобы читался объем. */

/* Облако. Силуэт собран из кругов, поэтому каждый слой рисуется целиком:
   так внутренние стыки кругов не видны. Объем дают отдельные переливы
   на каждом коме, поэтому облако выглядит пухлым, а не плоским. */
function Cloud({ className, uid }: { className: string; uid: string }) {
  const shape = (
    <>
      <circle cx="104" cy="54" r="52" />
      <circle cx="50" cy="86" r="34" />
      <circle cx="154" cy="82" r="34" />
      <circle cx="26" cy="104" r="24" />
      <circle cx="178" cy="104" r="24" />
      <rect x="26" y="104" width="152" height="24" />
    </>
  );
  return (
    <svg className={className} viewBox="-2 -2 208 134" aria-hidden focusable="false">
      <defs>
        <radialGradient id={`puff-${uid}`} cx="38%" cy="26%" r="76%">
          <stop offset="0.58" stopColor="#ffffff" />
          <stop offset="0.86" stopColor="#f6fafe" />
          <stop offset="1" stopColor="#c7ddf2" />
        </radialGradient>
        <linearGradient
          id={`band-${uid}`}
          gradientUnits="userSpaceOnUse"
          x1="0" y1="70" x2="0" y2="128"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfe2f4" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <circle cx="104" cy="54" r="52" />
          <circle cx="50" cy="86" r="34" />
          <circle cx="154" cy="82" r="34" />
          <circle cx="26" cy="104" r="24" />
          <circle cx="178" cy="104" r="24" />
          <rect x="26" y="94" width="152" height="34" />
        </clipPath>
      </defs>
      <g fill="#fde1ea" stroke="#fde1ea" strokeWidth="9" strokeLinejoin="round">{shape}</g>
      <g fill="#ffffff" stroke="#ffffff" strokeWidth="5.5" strokeLinejoin="round">{shape}</g>
      <g fill="#a8cfee" stroke="#a8cfee" strokeWidth="2.6" strokeLinejoin="round">{shape}</g>
      <g clipPath={`url(#clip-${uid})`}>
        <rect x="26" y="70" width="152" height="58" fill={`url(#band-${uid})`} />
        <circle cx="104" cy="54" r="52" fill={`url(#puff-${uid})`} />
        <circle cx="154" cy="82" r="34" fill={`url(#puff-${uid})`} />
        <circle cx="50" cy="86" r="34" fill={`url(#puff-${uid})`} />
        <circle cx="178" cy="104" r="24" fill={`url(#puff-${uid})`} />
        <circle cx="26" cy="104" r="24" fill={`url(#puff-${uid})`} />
      </g>
    </svg>
  );
}

/* Солнце. Диск стоит на месте, лучи вращаются: они собраны в отдельную
   группу, ей и задан поворот. */
function Sun() {
  const rays = (
    <>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <rect x="96.25" y="9" width="7.5" height="36" rx="3.75" />
        </g>
      ))}
    </>
  );
  return (
    <svg className="sky__sun" viewBox="6 6 188 188" aria-hidden focusable="false">
      <defs>
        <radialGradient id="sunDisc" cx="34%" cy="30%" r="78%">
          <stop offset="0" stopColor="#ffd873" />
          <stop offset="0.45" stopColor="#ffb02e" />
          <stop offset="1" stopColor="#f07d0a" />
        </radialGradient>
        <linearGradient id="sunRay" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffc25a" />
          <stop offset="1" stopColor="#ff9c14" />
        </linearGradient>
      </defs>
      <g className="sky__rays">
        <g fill="#fde1ea" stroke="#fde1ea" strokeWidth="8" strokeLinejoin="round">{rays}</g>
        <g fill="#ffffff" stroke="#ffffff" strokeWidth="5" strokeLinejoin="round">{rays}</g>
        <g fill="url(#sunRay)" stroke="#e09a00" strokeWidth="1.8" strokeLinejoin="round">{rays}</g>
      </g>
      <circle cx="100" cy="100" r="48" fill="#fde1ea" stroke="#fde1ea" strokeWidth="9" />
      <circle cx="100" cy="100" r="48" fill="#ffffff" stroke="#ffffff" strokeWidth="5.5" />
      <circle cx="100" cy="100" r="48" fill="url(#sunDisc)" stroke="#e09a00" strokeWidth="2.4" />
    </svg>
  );
}

/* Птичка. Стоит в самом конце второй строки названия, поэтому она вписана
   в строку: так она держится за буквы и не уезжает при смене размера окна. */
function Bird() {
  const tail = "M74 44 C89 47 106 55 118 64 C116 67 113 68 110 67 C97 62 84 57 73 55 Z";
  const shape = (
    <>
      <path d={tail} />
      <circle cx="38" cy="30" r="17" />
      <ellipse cx="56" cy="46" rx="28" ry="19" />
    </>
  );
  return (
    <svg className="brand__bird" viewBox="0 6 122 90" aria-hidden focusable="false">
      <defs>
        <linearGradient
          id="birdBody"
          gradientUnits="userSpaceOnUse"
          x1="30" y1="12" x2="80" y2="66"
        >
          <stop offset="0" stopColor="#8fd8fd" />
          <stop offset="0.55" stopColor="#5cbcf6" />
          <stop offset="1" stopColor="#3ea2e2" />
        </linearGradient>
        <linearGradient
          id="birdWing"
          gradientUnits="userSpaceOnUse"
          x1="44" y1="36" x2="72" y2="60"
        >
          <stop offset="0" stopColor="#3d90e6" />
          <stop offset="1" stopColor="#1a63c4" />
        </linearGradient>
        <linearGradient
          id="birdTail"
          gradientUnits="userSpaceOnUse"
          x1="74" y1="44" x2="112" y2="68"
        >
          <stop offset="0" stopColor="#28539f" />
          <stop offset="1" stopColor="#132f6c" />
        </linearGradient>
      </defs>
      <g stroke="#f4741f" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M50 66 L47 87" />
        <path d="M47 87 L40 91" />
        <path d="M47 87 L54 91" />
        <path d="M47 87 L47 92" />
        <path d="M63 66 L67 87" />
        <path d="M67 87 L60 91" />
        <path d="M67 87 L74 91" />
        <path d="M67 87 L67 92" />
      </g>
      <g fill="#fde1ea" stroke="#fde1ea" strokeWidth="11" strokeLinejoin="round">{shape}</g>
      <g fill="#ffffff" stroke="#ffffff" strokeWidth="6.5" strokeLinejoin="round">{shape}</g>
      <g fill="#2f97cf" stroke="#2f97cf" strokeWidth="2.2" strokeLinejoin="round">{shape}</g>
      <path d={tail} fill="url(#birdTail)" />
      <g fill="url(#birdBody)">
        <circle cx="38" cy="30" r="17" />
        <ellipse cx="56" cy="46" rx="28" ry="19" />
      </g>
      <path
        d="M43 44 C51 37 68 36 76 44 C82 50 75 58 62 58 C51 58 40 52 43 44 Z"
        fill="url(#birdWing)"
      />
      <path
        d="M22 29 L4 35 L22 40 Z"
        fill="#f7931e"
        stroke="#e07a12"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="39" cy="26" r="3.6" fill="#2b3245" />
      <circle cx="40.2" cy="24.8" r="1.2" fill="#ffffff" />
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
          <Cloud className="sky__cloud sky__cloud--big" uid="a" />
          <Cloud className="sky__cloud sky__cloud--small" uid="b" />
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
      <p className="footer__about">{t.footer.about}</p>
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
