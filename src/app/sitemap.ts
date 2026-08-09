import type { MetadataRoute } from "next";
import { booksForLang } from "@/data/books";
import { pagesForLang } from "@/data/coloringPages";
import { activeLangs } from "@/data/dictionaries";
import { SITE_URL } from "@/lib/site";
import { sectionPath, itemPath, homePath, sectionSlugs } from "@/lib/routes";
import type { Section } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const lang of activeLangs) {
    out.push({ url: SITE_URL + homePath(lang), priority: 1 });
    for (const s of Object.keys(sectionSlugs[lang]) as Section[]) {
      out.push({ url: SITE_URL + sectionPath(lang, s), priority: 0.8 });
    }
    for (const b of booksForLang(lang)) {
      out.push({ url: SITE_URL + itemPath(lang, "books", b.slug[lang]!), priority: 0.9 });
    }
    for (const p of pagesForLang(lang)) {
      out.push({ url: SITE_URL + itemPath(lang, "coloring", p.slug[lang]!), priority: 0.7 });
    }
  }
  return out;
}
