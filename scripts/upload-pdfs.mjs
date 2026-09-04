/* ---------------------------------------------------------------------------
   Отправляет файлы книг в закрытую кладовку Vercel Blob.
   Запускается сам перед каждой сборкой сайта.

   Берет рукописи из knigi/<id>/rukopis/ и кладет их в кладовку под тем
   именем, которое покупатель увидит у себя в загрузках. Кладовка закрытая:
   публичного адреса у файла нет, забрать его может только сам сайт после
   проверки оплаты.

   Кладовка общая на два сайта, поэтому каждый сайт держит свои файлы
   в своей папке внутри нее. Имена файлов для покупателя на двух сайтах
   разные, и это единственная причина, по которой одна и та же книга
   лежит в кладовке дважды.

   Уже загруженное второй раз не отправляется: сначала спрашиваем у
   кладовки, что там есть.

   Скрипт устроен так, чтобы никогда не ронять сборку. Если папки knigi
   уже нет или кладовка недоступна, он говорит об этом и завершается
   спокойно: сборка сайта от этого не зависит.

   Это временный переселенец. Когда все книги окажутся в кладовке,
   а папка knigi будет убрана из хранилища, файл удаляется вместе
   с записью prebuild в package.json.
--------------------------------------------------------------------------- */

import { existsSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { list, put } from "@vercel/blob";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* Папка этого сайта внутри общей кладовки. */
const PREFIX = "magic-of-discoveries/";

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

/* Название файла для покупателя берем из каталога книг. Читаем его
   простым поиском по тексту: разбирать код сайта здесь нечем.
   Правило имен намеренно повторяет assetFileName в src/lib/pdfShop.ts. */
const catalog = readFileSync(join(root, "src/data/books.ts"), "utf8");

function slugOf(id) {
  const at = catalog.indexOf(`id: "${id}"`);
  if (at < 0) return id;
  const near = catalog.slice(at, at + 4000);
  const hit = near.match(/slug: \{\s*\n?\s*(?:en|es|ru): "([^"]+)"/);
  return hit ? hit[1] : id;
}

const fileNameOf = (id, format) =>
  `${slugOf(id)}-${format === "letter" ? "letter-8.5x11" : "a4"}.pdf`;

async function main() {
  if (!existsSync(join(root, "knigi"))) {
    console.log("  Папки knigi нет, отправлять нечего.");
    return;
  }

  let already;
  try {
    const found = await list({ prefix: PREFIX, limit: 1000 });
    already = new Set(found.blobs.map((b) => b.pathname));
  } catch (error) {
    console.warn(
      "\n  Не удалось заглянуть в кладовку, отправка пропущена.\n" +
        `  Причина: ${error?.message ?? error}\n`
    );
    return;
  }

  let sent = 0;
  let skipped = 0;
  const missing = [];
  const failed = [];

  for (const id of BOOKS) {
    for (const format of FORMATS) {
      const from = join(root, "knigi", id, "rukopis", `${id}-${format}.pdf`);
      if (!existsSync(from)) {
        missing.push(`${id}-${format}`);
        continue;
      }

      const pathname = PREFIX + fileNameOf(id, format);
      if (already.has(pathname)) {
        skipped += 1;
        continue;
      }

      try {
        await put(pathname, readFileSync(from), {
          access: "private",
          contentType: "application/pdf",
          addRandomSuffix: false,
          allowOverwrite: true,
          multipart: statSync(from).size > 8 * 1024 * 1024,
        });
        sent += 1;
        console.log(`  отправлено: ${pathname}`);
      } catch (error) {
        failed.push(`${pathname}: ${error?.message ?? error}`);
      }
    }
  }

  console.log(
    `\n  Кладовка: отправлено ${sent}, уже было ${skipped}, ` +
      `всего должно быть ${BOOKS.length * FORMATS.length}.`
  );
  if (missing.length) {
    console.warn("  Нет файла в папке knigi: " + missing.join(", "));
  }
  if (failed.length) {
    console.warn("  Не отправлены:\n    " + failed.join("\n    "));
  }
}

main().catch((error) => {
  console.warn(`\n  Отправка в кладовку не удалась: ${error?.message ?? error}\n`);
});
