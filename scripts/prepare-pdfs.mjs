/* ---------------------------------------------------------------------------
   Готовит файлы книг к продаже. Запускается сам перед каждой сборкой сайта.

   Берет рукописи из knigi/<id>/rukopis/ и раскладывает их в public/dl,
   каждую в свою папку со случайным на вид именем. Имя считается из
   тайного слова DOWNLOAD_SECRET, поэтому подобрать его нельзя,
   а при новой сборке оно остается тем же, и старые ссылки не ломаются.

   Папка public/dl в хранилище кода не попадает, она создается заново
   при каждой сборке.

   Список книг и правило имен намеренно повторяют src/lib/pdfShop.ts.
   Этот файл выполняется до сборки, когда читать код сайта еще нельзя.
   При добавлении книги дописать ее в оба места.
--------------------------------------------------------------------------- */

import { createHmac } from "node:crypto";
import { existsSync, mkdirSync, copyFileSync, rmSync } from "node:fs";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const BOOKS = [
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
  "directed-drawing-k2-en",
  "directed-drawing-k2-es",
  "directed-drawing-k2-2-en",
  "directed-drawing-k2-2-es",
  "first-coloring-book-111-ru",
  "little-max-coloring-1-ru",
  "little-max-coloring-2-ru",
  "how-to-draw-111-ru",
  "how-to-draw-everything-ru",
  "take-a-break-animals-ru",
  "take-a-break-ocean-ru",
  "take-a-break-food-ru",
];

const FORMATS = ["letter", "a4"];

const secret = process.env.DOWNLOAD_SECRET;
if (!secret || secret.length < 24) {
  console.error(
    "\n  Не задано тайное слово DOWNLOAD_SECRET.\n" +
      "  Без него файлы книг разложить нельзя: их адреса стало бы можно подобрать.\n" +
      "  Добавьте переменную DOWNLOAD_SECRET в настройках проекта.\n"
  );
  process.exit(1);
}

const folder = (id, format) =>
  createHmac("sha256", secret)
    .update(`asset:${id}:${format}`)
    .digest("hex")
    .slice(0, 32);

/* Название файла для покупателя берем из каталога книг. Читаем его
   простым поиском по тексту: разбирать код сайта здесь нечем. */
const catalog = readFileSync(join(root, "src/data/books.ts"), "utf8");

function slugOf(id) {
  const at = catalog.indexOf(`id: "${id}"`);
  if (at < 0) return id;
  const near = catalog.slice(at, at + 4000);
  const hit = near.match(/slug: \{\s*\n?\s*(?:en|es|ru): "([^"]+)"/);
  return hit ? hit[1] : id;
}

const outRoot = join(root, "public", "dl");
rmSync(outRoot, { recursive: true, force: true });

let done = 0;
const missing = [];

for (const id of BOOKS) {
  for (const format of FORMATS) {
    const from = join(root, "knigi", id, "rukopis", `${id}-${format}.pdf`);
    if (!existsSync(from)) {
      missing.push(`${id}-${format}`);
      continue;
    }
    const suffix = format === "letter" ? "letter-8.5x11" : "a4";
    const dir = join(outRoot, folder(id, format));
    mkdirSync(dir, { recursive: true });
    copyFileSync(from, join(dir, `${slugOf(id)}-${suffix}.pdf`));
    done += 1;
  }
}

if (missing.length) {
  console.error("\n  Не найдены файлы книг: " + missing.join(", ") + "\n");
  process.exit(1);
}

console.log(`  Книги готовы к продаже: ${done} файлов.`);
