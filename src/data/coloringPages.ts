// Бесплатные раскраски для печати.
// Каждый лист = отдельная страница под запрос вида "распечатать раскраску единорог".
// Пока пусто. Структура готова: добавить лист = добавить одну запись.
import type { UiLang } from "./books";

export interface ColoringPage {
  id: string;
  /** id книги, из которой взят рисунок. Отсюда строится продажа под бесплатным листом. */
  fromBookId: string;
  /** Файл для печати, лежит в /public/printables/ */
  file: string;
  preview: string;
  slug: Partial<Record<UiLang, string>>;
  copy: Partial<Record<UiLang, { title: string; lead: string; tips: string[] }>>;
}

export const coloringPages: ColoringPage[] = [
  // Пример готовой записи. Раскомментировать, когда появится файл.
  // {
  //   id: "unicorn",
  //   fromBookId: "first-coloring-book-111-en",
  //   file: "/printables/unicorn.pdf",
  //   preview: "/printables/unicorn.png",
  //   slug: { en: "unicorn-coloring-page-printable", es: "dibujo-unicornio-para-colorear-imprimir" },
  //   copy: {
  //     en: {
  //       title: "Unicorn coloring page to print",
  //       lead: "A large unicorn with thick outlines, easy for a toddler. Print on any home printer.",
  //       tips: ["Print on A4 or Letter", "Thick lines, good for crayons and markers"],
  //     },
  //   },
  // },
];

export function pagesForLang(lang: UiLang) {
  return coloringPages.filter((p) => p.slug[lang] && p.copy[lang]);
}
