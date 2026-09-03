import {
  SITE_URL,
  PUBLISHER,
  ADDRESS,
  ORG_ID,
  RICARDO_ID,
  AUTHORS,
  authorSameAs,
  METHOD_REFERENCE_URL,
} from "./site";
import { homePath, sectionSlugs } from "./routes";
import { activeLangs, dictionaries } from "@/data/dictionaries";
import type { UiLang } from "@/data/books";

/** Ссылки на версии страницы на других языках.
    x-default это версия для посетителя из страны, языка которой у нас нет. */
export function langAlternates(urls: Partial<Record<UiLang, string>>) {
  const out: Record<string, string> = {};
  for (const l of activeLangs) {
    const u = urls[l];
    if (u) out[l] = u;
  }
  if (out.en) out["x-default"] = out.en;
  return out;
}

/** Путь по разделам, который Google показывает вместо голого адреса:
    Главная больше Книги больше Название книги. */
export function breadcrumbs(lang: UiLang, trail: { name: string; path: string }[]) {
  const t = dictionaries[lang];
  const all = [{ name: t.nav.home, path: homePath(lang) }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/* Издательство одним объектом и короткая ссылка на него.

   Полное описание достаточно поставить на странице один раз, дальше
   везде хватает ссылки: автор такой-то, издатель вот этот же самый.
   Так на всех страницах сайта получается одно издательство, а не по
   новой организации на каждой странице. */
export const orgNode = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: PUBLISHER,
  url: SITE_URL,
  address: ADDRESS,
});

export const orgRef = () => ({ "@id": ORG_ID });

/** Рикардо как автор материала. Тем же опознавателем, что и в разделе
    "О нас", чтобы это был один человек, а не однофамильцы. */
export const ricardoNode = (lang: UiLang) => ({
  "@type": "Person",
  "@id": RICARDO_ID,
  name: AUTHORS.ricardo.name,
  url: `${SITE_URL}/${lang}/${sectionSlugs[lang].about}`,
  sameAs: [...authorSameAs("ricardo"), METHOD_REFERENCE_URL],
  worksFor: orgRef(),
});
