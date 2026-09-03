import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Купленные файлы и служебные адреса в поиске не нужны.
   Адреса файлов и так не угадать, но лишний повод на них наткнуться
   мы убираем.

   Важно про устройство этого файла: робот читает только тот блок,
   который написан лично про него, и общий блок со звездочкой при этом
   не применяет вовсе. Поэтому раньше выходило наоборот задуманному:
   сборщикам нейросетей был открыт весь сайт, включая папку с
   оплаченными книгами, хотя всем остальным она закрыта. Теперь
   запрет повторен в каждом блоке. */
const CLOSED = ["/dl/", "/api/"];

/* Кого пускаем поименно. Два разных дела, и путать их не надо.

   Первые собирают страницы впрок, чтобы позже отвечать по ним.
   Вторые приходят прямо во время разговора с человеком: он задал
   вопрос, и робот в эту секунду открывает нашу страницу, чтобы
   ответить со ссылкой на нас. Для нашей задачи вторые важнее. */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: CLOSED },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: CLOSED,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
