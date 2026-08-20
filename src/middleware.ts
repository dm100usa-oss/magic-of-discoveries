import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Языки, на которых сайт открыт для посетителей. Порядок важен:
   при равных условиях побеждает тот, что стоит выше.
   Список продублирован здесь намеренно: этот файл выполняется до загрузки
   сайта, и тянуть в него весь словарь текстов было бы расточительно.
   Когда включим русский, добавить сюда "ru". */
const OPEN_LANGS = ["es", "en"] as const;
const FALLBACK = "en";

/** Разбирает список языков, который браузер присылает вместе с запросом,
    и выбирает первый, на котором у нас есть сайт. */
function pickLang(header: string): string {
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const weight = params.find((p) => p.trim().startsWith("q="));
      return {
        tag: tag.trim().toLowerCase(),
        q: weight ? Number(weight.split("=")[1]) : 1,
      };
    })
    .filter((item) => item.tag && !Number.isNaN(item.q))
    .sort((a, b) => b.q - a.q);

  for (const item of wanted) {
    const hit = OPEN_LANGS.find((lang) => item.tag.startsWith(lang));
    if (hit) return hit;
  }
  return FALLBACK;
}

/** Голый адрес сайта отправляем на версию того языка, на котором говорит гость.
    Переброс намеренно временный: ответ у каждого гостя свой, запоминать его
    навсегда нельзя. Внутренние страницы не перебрасываются никогда,
    выбранный язык остается за гостем. */
export function middleware(request: NextRequest) {
  const lang = pickLang(request.headers.get("accept-language") ?? "");
  const response = NextResponse.redirect(new URL(`/${lang}`, request.url));
  /* Ответ зависит от языка гостя, поэтому раздавать всем один и тот же нельзя. */
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = { matcher: "/" };
