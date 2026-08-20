import type { MetadataRoute } from "next";
import { booksForLang } from "@/data/books";
import { pagesForLang } from "@/data/coloringPages";
import { guidesForLang } from "@/data/method";
import { articlesForLang } from "@/data/teacherArticles";
import { activeLangs } from "@/data/dictionaries";
import { SITE_URL, SITE_UPDATED } from "@/lib/site";
import { sectionPath, itemPath, homePath, sectionSlugs } from "@/lib/routes";
import type { Section } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  /* Дата последней правки. Поисковики и нейросети по ней понимают,
     что материал живой, а не заброшенный. */
  const lastModified = new Date(SITE_UPDATED);
  for (const lang of activeLangs) {
    out.push({ url: SITE_URL + homePath(lang), lastModified, priority: 1 });
    for (const s of Object.keys(sectionSlugs[lang]) as Section[]) {
      out.push({ url: SITE_URL + sectionPath(lang, s), lastModified, priority: 0.8 });
    }
    for (const b of booksForLang(lang)) {
      out.push({ url: SITE_URL + itemPath(lang, "books", b.slug[lang]!), lastModified, priority: 0.9 });
    }
    for (const p of pagesForLang(lang)) {
      out.push({ url: SITE_URL + itemPath(lang, "coloring", p.slug[lang]!), lastModified, priority: 0.7 });
    }
    for (const g of guidesForLang(lang)) {
      out.push({ url: SITE_URL + itemPath(lang, "method", g.slug[lang]!), lastModified, priority: 0.85 });
    }
    for (const a of articlesForLang(lang)) {
      out.push({ url: SITE_URL + itemPath(lang, "teachers", a.slug[lang]!), lastModified, priority: 0.85 });
    }
  }
  return out;
}
