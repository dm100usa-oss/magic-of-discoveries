import { createHmac, timingSafeEqual } from "node:crypto";
import { bookById, type UiLang } from "@/data/books";

/* ---------------------------------------------------------------------------
   Продажа печатных PDF со своего сайта.

   Раньше кнопка PDF вела в магазин на Wix, где оплата не проходила.
   Теперь деньги принимаются здесь, через Stripe, а файл выдается по
   ссылке, которая подписана и живет ограниченное время.

   Сами файлы лежат в папке knigi и в открытый доступ не попадают.
   Перед сборкой сайта скрипт scripts/prepare-pdfs.mjs раскладывает их
   в public/dl под именами, которые невозможно угадать: имя папки
   считается из тайного слова DOWNLOAD_SECRET. Прямой ссылки на них
   нигде нет, в карту сайта они не попадают, роботам закрыты.
--------------------------------------------------------------------------- */

/** Цена одной книги в центах. Едина для всех изданий. */
export const PDF_PRICE_CENTS = 499;

/* Налоговая категория товара по справочнику Stripe.

   Точное название категории: Digital Books, downloaded, non subscription,
   with permanent rights. То есть книга в электронном виде, которую
   покупатель скачивает себе и пользуется бессрочно, без подписки.
   Это ровно наш случай.

   Указывать категорию обязательно: Stripe взял на себя роль продавца
   и сам платит налоги, а ставка налога на книги во многих странах
   ниже обычной. Без категории он отказывается принимать заказ. */
export const PDF_TAX_CODE = "txcd_10302000";

/** Цена, как ее видит покупатель. */
export const PDF_PRICE_LABEL = "$4.99";

/** Размер листа. letter это американский формат, a4 европейский. */
export type PdfFormat = "letter" | "a4";

export const pdfFormats: PdfFormat[] = ["letter", "a4"];

/** Книги, у которых есть готовый файл на продажу.
    Порядок повторяет каталог. Добавить книгу = дописать сюда строку
    и положить два файла в knigi/<id>/rukopis/. */
export const pdfBookIds = [
  "first-coloring-book-111-en",
  "first-coloring-book-111-es",
  "little-max-coloring-1-en",
  "little-max-coloring-1-es",
  "little-max-coloring-2-en",
  "little-max-coloring-2-es",
  "how-to-draw-everything-en",
  "how-to-draw-everything-es",
  "take-a-break-animals-en",
  "take-a-break-animals-es",
  "take-a-break-ocean-en",
  "take-a-break-ocean-es",
  "take-a-break-food-en",
  "take-a-break-food-es",
] as const;

export type PdfBookId = (typeof pdfBookIds)[number];

/** Книги, которые покупают маленькому ребенку. В письме к ним обращаемся
    через малыша. Остальные, раскраски "Передышка" и пошаговое рисование,
    покупают чаще себе или ребенку постарше, и там говорить о малыше
    было бы невпопад. */
const kidsBooks = new Set<string>([
  "first-coloring-book-111-en",
  "first-coloring-book-111-es",
  "little-max-coloring-1-en",
  "little-max-coloring-1-es",
  "little-max-coloring-2-en",
  "little-max-coloring-2-es",
]);

export const isForLittleOnes = (id: string) => kidsBooks.has(id);

export function hasPdf(id: string): id is PdfBookId {
  return (pdfBookIds as readonly string[]).includes(id);
}

/* ---------------------------------------------------------------------------
   Тайное слово. Из него считаются и адреса файлов, и подписи ссылок.
   Если его нет, сборка должна упасть заметно, а не тихо выдать всем
   одинаковые угадываемые адреса.
--------------------------------------------------------------------------- */
function secret(): string {
  const value = process.env.DOWNLOAD_SECRET;
  if (!value || value.length < 24) {
    throw new Error(
      "DOWNLOAD_SECRET не задан или слишком короткий. " +
        "Без него ссылки на файлы можно подобрать."
    );
  }
  return value;
}

/** Имя папки, в которой лежит файл. Угадать нельзя. */
export function assetFolder(id: PdfBookId, format: PdfFormat): string {
  return createHmac("sha256", secret())
    .update(`asset:${id}:${format}`)
    .digest("hex")
    .slice(0, 32);
}

/** Имя файла, которое покупатель увидит у себя в загрузках. */
export function assetFileName(id: PdfBookId, format: PdfFormat): string {
  const book = bookById(id);
  const base =
    book?.slug.en ?? book?.slug.es ?? book?.slug.ru ?? String(id);
  const suffix = format === "letter" ? "letter-8.5x11" : "a4";
  return `${base}-${suffix}.pdf`;
}

/** Адрес файла внутри сайта. Наружу не показывается. */
export function assetPath(id: PdfBookId, format: PdfFormat): string {
  return `/dl/${assetFolder(id, format)}/${assetFileName(id, format)}`;
}

/* ---------------------------------------------------------------------------
   Подписанная ссылка на скачивание.

   Внутри ссылки лежит номер книги, размер листа и срок годности.
   Подпись считается тайным словом, поэтому подделать содержимое нельзя:
   любая правка ломает подпись, и файл не отдается.
--------------------------------------------------------------------------- */

/* Сколько ссылка живет и сколько раз по ней можно скачать.

   Тридцать дней и пять скачиваний. Такой запас выбран не случайно:
   на крупных площадках вроде Etsy купленный файл лежит в личном
   кабинете покупателя вечно и качается сколько угодно раз, и люди
   к этому привыкли. Кабинета у нас нет, заводить его ради книги за
   пять долларов значит отпугнуть часть покупателей паролями.

   Пять скачиваний покрывают все обычные случаи: оборвалась связь,
   не нашел файл в загрузках, купил с телефона а печатает с компьютера.
   А раздать ссылку знакомым дальше пятого уже не выйдет. */
export const DOWNLOAD_TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const DOWNLOAD_LIMIT = 5;

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString("base64url");

export function signDownload(
  id: PdfBookId,
  format: PdfFormat,
  /** Номер заказа в Stripe. По нему ведется счет скачиваний. */
  session: string,
  expiresAt = Date.now() + DOWNLOAD_TTL_MS
): string {
  const payload = b64url(
    JSON.stringify({ i: id, f: format, s: session, e: expiresAt })
  );
  const mac = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${mac}`;
}

export type DownloadClaim = {
  id: PdfBookId;
  format: PdfFormat;
  session: string;
};

export function verifyDownload(token: string): DownloadClaim | null {
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;

  const expected = createHmac("sha256", secret())
    .update(payload)
    .digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.e !== "number" || Date.now() > data.e) return null;
    if (!hasPdf(data.i)) return null;
    if (data.f !== "letter" && data.f !== "a4") return null;
    return { id: data.i, format: data.f, session: String(data.s ?? "") };
  } catch {
    return null;
  }
}

/** Готовая ссылка на скачивание, которую можно положить в письмо. */
export const downloadUrl = (
  origin: string,
  id: PdfBookId,
  format: PdfFormat,
  session: string
) => `${origin}/api/download?t=${signDownload(id, format, session)}`;

/** Название товара в чеке Stripe и в письме. */
export function pdfProductName(id: PdfBookId, lang: UiLang): string {
  const book = bookById(id);
  const copy = book?.copy[lang] ?? book?.copy.en ?? book?.copy.es;
  return copy?.title ?? String(id);
}
