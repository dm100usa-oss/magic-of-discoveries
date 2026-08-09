import type { MetadataRoute } from "next";
import { booksForLang } from "@/data/books";
import { pagesForLang } from "@/data/coloringPages";
import { activeLangs } from "@/data/dictionaries";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const lang of activeLangs) {
    out.push({ url: `${SITE_URL}/${lang}`, priority: 1 });
    for (const p of ["books", "coloring-pages", "about", "contact"]) {
      out.push({ url: `${SITE_URL}/${lang}/${p}`, priority: 0.8 });
    }
    for (const b of booksForLang(lang)) {
      out.push({ url: `${SITE_URL}/${lang}/books/${b.slug[lang]}`, priority: 0.9 });
    }
    for (const p of pagesForLang(lang)) {
      out.push({ url: `${SITE_URL}/${lang}/coloring-pages/${p.slug[lang]}`, priority: 0.7 });
    }
  }
  return out;
}
