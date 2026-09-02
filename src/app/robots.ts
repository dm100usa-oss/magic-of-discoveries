import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    /* Купленные файлы и страница после оплаты в поиске не нужны.
       Адреса файлов и так не угадать, но лишний повод на них наткнуться
       мы убираем. */
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/dl/", "/api/"] },
      // Явно пускаем сборщиков нейросетей: сайт должен цитироваться в ответах ИИ.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
