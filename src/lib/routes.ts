import type { UiLang } from "@/data/books";

/** Разделы сайта. Адрес каждого пишется на языке посетителя. */
export type Section = "books" | "coloring" | "about" | "contact";

export const sectionSlugs: Record<UiLang, Record<Section, string>> = {
  en: {
    books: "books",
    coloring: "free-coloring-pages",
    about: "about-us",
    contact: "contact",
  },
  es: {
    books: "libros",
    coloring: "dibujos-para-colorear-gratis",
    about: "quienes-somos",
    contact: "contacto",
  },
  ru: {
    books: "knigi",
    coloring: "raskraski-dlya-pechati",
    about: "o-nas",
    contact: "kontakty",
  },
};

export function sectionFromSlug(lang: UiLang, slug: string): Section | undefined {
  const map = sectionSlugs[lang];
  return (Object.keys(map) as Section[]).find((k) => map[k] === slug);
}

export const sectionPath = (lang: UiLang, s: Section) => `/${lang}/${sectionSlugs[lang][s]}`;

export const itemPath = (lang: UiLang, s: Section, slug: string) =>
  `${sectionPath(lang, s)}/${slug}`;

export const homePath = (lang: UiLang) => `/${lang}`;
