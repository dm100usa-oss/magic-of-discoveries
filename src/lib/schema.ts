import { SITE_URL } from "./site";
import { homePath } from "./routes";
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
