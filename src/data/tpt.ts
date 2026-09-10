/* Карточки книг на Teachers Pay Teachers.
 *
 * Там продаются только рабочие тетради по рисованию для K-2: площадка
 * рассчитана на американского учителя, а раскраски для малышей ему не
 * нужны. Поэтому список короткий и лежит отдельно, а не в общем файле
 * книг: у остальных изданий такой ссылки нет и не будет.
 *
 * На своем сайте продавец получает почти всю цену, на площадке
 * восемьдесят процентов. Поэтому ссылка стоит внизу страницы, после
 * вопросов и ответов, и подана как дополнительная возможность, а не
 * как кнопка покупки. Она для того, кто уже покупает на площадке или
 * тратит школьные деньги: такой человек все равно не купил бы здесь.
 */

export type TptListing = {
  /* Адрес самой книги на площадке. */
  url: string;
  /* Адрес набора из двух томов на том же языке. */
  bundleUrl: string;
};

const LISTINGS: Record<string, TptListing> = {
  "directed-drawing-k2-en": {
    url: "https://www.teacherspayteachers.com/Product/Directed-Drawing-Volume-1-55-No-Prep-Draw-Trace-Write-Worksheets-Grades-K-2-17437620",
    bundleUrl:
      "https://www.teacherspayteachers.com/Product/Directed-Drawing-Volumes-1-2-Bundle-110-No-Prep-Draw-Trace-Write-Worksheets-17624126",
  },
  "directed-drawing-k2-2-en": {
    url: "https://www.teacherspayteachers.com/Product/Directed-Drawing-Volume-2-55-No-Prep-Draw-Trace-Write-Worksheets-Grades-K-2-17622847",
    bundleUrl:
      "https://www.teacherspayteachers.com/Product/Directed-Drawing-Volumes-1-2-Bundle-110-No-Prep-Draw-Trace-Write-Worksheets-17624126",
  },
  "directed-drawing-k2-es": {
    url: "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Volume-1-55-No-Prep-Dibujo-Dirigido-Worksheets-K-2-17437840",
    bundleUrl:
      "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Volumes-1-2-Bundle-110-No-Prep-Dibujo-Worksheets-17624463",
  },
  "directed-drawing-k2-2-es": {
    url: "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Volume-2-55-No-Prep-Dibujo-Dirigido-Worksheets-K-2-17623087",
    bundleUrl:
      "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Volumes-1-2-Bundle-110-No-Prep-Dibujo-Worksheets-17624463",
  },
};

/* Магазин целиком: нужен на странице для учителей, где речь идет
   сразу обо всех тетрадях, а не об одной. */
export const TPT_STORE_URL =
  "https://www.teacherspayteachers.com/store/magic-of-discoveries";

/* Надписи лежат здесь, а не в общем словаре сайта, и это намеренно.
   Страницы этих четырех книг существуют только по-английски: их
   покупает американский учитель. Заводить ради одного блока три
   перевода значило бы держать в словаре строки, которые никогда не
   будут показаны. */
export const TPT_UI = {
  title: "Also on Teachers Pay Teachers",
  text:
    "This workbook is also listed on Teachers Pay Teachers, with the same file inside. Buy it there if your school pays through TPT or if that is where you keep your resources.",
  cta: "View on Teachers Pay Teachers",
  bundleCta: "Both volumes together, at a lower price",
} as const;

export function tptListing(bookId: string): TptListing | null {
  return LISTINGS[bookId] ?? null;
}
