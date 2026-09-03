import type { UiLang } from "@/data/books";

/** Разделы сайта. Адрес каждого пишется на языке посетителя. */
export type Section =
  | "books"
  | "method"
  | "teachers"
  | "coloring"
  | "words"
  | "catalog"
  | "about"
  | "contact";

export const sectionSlugs: Record<UiLang, Record<Section, string>> = {
  en: {
    books: "books",
    method: "method",
    teachers: "teachers",
    coloring: "free-coloring-pages",
    words: "first-words",
    catalog: "book-list",
    about: "about-us",
    contact: "contact",
  },
  es: {
    books: "libros",
    method: "metodo",
    teachers: "maestros",
    coloring: "dibujos-para-colorear-gratis",
    words: "primeras-palabras",
    catalog: "catalogo-de-libros",
    about: "quienes-somos",
    contact: "contacto",
  },
  ru: {
    books: "knigi",
    method: "metod",
    teachers: "uchitelyam",
    coloring: "raskraski-dlya-pechati",
    words: "pervye-slova",
    catalog: "spisok-knig",
    about: "o-nas",
    contact: "kontakty",
  },
};

/** Разделы, которые показываются на этом языке. Раздел для учителей
    есть только на английском и испанском: он про американский класс K-2,
    русскому родителю он не нужен, а пустая страница вредна. */
export const sectionsForLang = (lang: UiLang): Section[] =>
  (Object.keys(sectionSlugs[lang]) as Section[]).filter(
    (s) => !(lang === "ru" && s === "teachers"),
  );

export function sectionFromSlug(lang: UiLang, slug: string): Section | undefined {
  const map = sectionSlugs[lang];
  return (Object.keys(map) as Section[]).find((k) => map[k] === slug);
}

export const sectionPath = (lang: UiLang, s: Section) => `/${lang}/${sectionSlugs[lang][s]}`;

export const itemPath = (lang: UiLang, s: Section, slug: string) =>
  `${sectionPath(lang, s)}/${slug}`;

export const homePath = (lang: UiLang) => `/${lang}`;
