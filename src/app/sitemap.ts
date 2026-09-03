import type { MetadataRoute } from "next";
import { booksForLang } from "@/data/books";
import { pagesForLang } from "@/data/coloringPages";
import { guidesForLang } from "@/data/method";
import { articlesForLang } from "@/data/teacherArticles";
import { wordsPagesForLang } from "@/data/firstWords";
import { activeLangs } from "@/data/dictionaries";
import { SITE_URL, SITE_UPDATED, pageUpdated } from "@/lib/site";
import { sectionPath, itemPath, homePath, sectionsForLang } from "@/lib/routes";

/* Карта сайта.

   Дата правки у каждой страницы своя. Раньше во всех ста с лишним
   строках стояло одно и то же число, и при любой мелкой правке весь
   сайт разом объявлял себя обновленным. Поисковик на это перестает
   реагировать вовсе. Теперь он видит, какие именно страницы изменились,
   и заходит перепроверять только их. */
export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  const site = new Date(SITE_UPDATED);
  const on = (own?: string) => new Date(pageUpdated(own));

  for (const lang of activeLangs) {
    out.push({ url: SITE_URL + homePath(lang), lastModified: site, priority: 1 });
    for (const s of sectionsForLang(lang)) {
      out.push({ url: SITE_URL + sectionPath(lang, s), lastModified: site, priority: 0.8 });
    }
    for (const b of booksForLang(lang)) {
      out.push({
        url: SITE_URL + itemPath(lang, "books", b.slug[lang]!),
        lastModified: site,
        priority: 0.9,
      });
    }
    for (const p of pagesForLang(lang)) {
      out.push({
        url: SITE_URL + itemPath(lang, "coloring", p.slug[lang]!),
        lastModified: on(p.updated),
        priority: 0.7,
      });
    }
    for (const g of guidesForLang(lang)) {
      out.push({
        url: SITE_URL + itemPath(lang, "method", g.slug[lang]!),
        lastModified: on(g.updated),
        priority: 0.85,
      });
    }
    for (const a of articlesForLang(lang)) {
      out.push({
        url: SITE_URL + itemPath(lang, "teachers", a.slug[lang]!),
        lastModified: new Date(a.updated),
        priority: 0.85,
      });
    }
    for (const w of wordsPagesForLang(lang)) {
      out.push({
        url: SITE_URL + itemPath(lang, "words", w.slug[lang]!),
        lastModified: on(w.updated),
        priority: 0.85,
      });
    }
  }
  return out;
}
