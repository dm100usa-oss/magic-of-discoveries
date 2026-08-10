// Бесплатные раскраски для печати.
// Страница = тема. Внутри набор рисунков, у каждого свой заголовок и своя кнопка.
// Внизу страницы одна книга, из которой взяты рисунки. Это и есть решение.
//
// Почему тема, а не отдельная страница на каждый рисунок: сотня почти пустых
// страниц выглядит как штамповка и в поиск не идет. Страница темы полезна сама
// по себе и при этом находится по названию каждого животного внутри нее.

import type { UiLang } from "./books";

export interface Sheet {
  /** Короткое имя файла. Английский лист: <id>. Испанский: <id>-es.
      Пути: /printables/<file>-letter.pdf, -a4.pdf, /printables/<file>.png */
  id: string;
  /** Название на языке страницы. Подпись на самом рисунке на языке издания. */
  name: Partial<Record<UiLang, string>>;
  /** Лист есть только на этих языках. Пусто = на всех. */
  only?: UiLang[];
}

export interface SheetGroup {
  id: string;
  title: Partial<Record<UiLang, string>>;
  sheets: Sheet[];
}

export interface ColoringCopy {
  title: string;
  lead: string;
  body: string[];
  /** Как печатать. Короткие практические строки. */
  howTo: string[];
  /** Подводка к книге под последним рисунком. */
  pickLead: string;
  pickTitle: string;
  pickPoints: string[];
  faq: { q: string; a: string }[];
}

export interface ColoringPage {
  id: string;
  /** id книги, из которой взяты рисунки. Английское издание. */
  fromBookId: string;
  /** Испанское издание той же книги. */
  fromBookIdEs?: string;
  slug: Partial<Record<UiLang, string>>;
  copy: Partial<Record<UiLang, ColoringCopy>>;
  groups: SheetGroup[];
}

const S = (id: string, en: string, es: string, ru: string): Sheet => ({
  id,
  name: { en, es, ru },
});

export const coloringPages: ColoringPage[] = [
  {
    id: "toddler-animals",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    slug: {
      en: "free-coloring-pages-for-toddlers-1-3",
      es: "dibujos-para-colorear-gratis-ninos-1-3-anos",
    },
    groups: [
      {
        id: "wild",
        title: {
          en: "Zoo and safari animals",
          es: "Animales del zoo y de safari",
          ru: "Зоопарк и сафари",
        },
        sheets: [
          S("lion", "Lion", "León", "Лев"),
          S("elephant", "Elephant", "Elefante", "Слон"),
          S("giraffe", "Giraffe", "Jirafa", "Жираф"),
          S("zebra", "Zebra", "Cebra", "Зебра"),
          S("rhino", "Rhino", "Rinoceronte", "Носорог"),
          S("monkey", "Monkey", "Mono", "Обезьяна"),
          S("crocodile", "Crocodile", "Cocodrilo", "Крокодил"),
          S("kangaroo", "Kangaroo", "Canguro", "Кенгуру"),
        ],
      },
      {
        id: "forest",
        title: {
          en: "Forest and farm animals",
          es: "Animales del bosque y de la granja",
          ru: "Лес и ферма",
        },
        sheets: [
          S("bear", "Bear", "Oso", "Медведь"),
          S("fox", "Fox", "Zorro", "Лиса"),
          S("bunny", "Bunny", "Conejo", "Заяц"),
          S("hedgehog", "Hedgehog", "Erizo", "Еж"),
          S("raccoon", "Raccoon", "Mapache", "Енот"),
          S("frog", "Frog", "Rana", "Лягушка"),
          S("goat", "Goat", "Cabra", "Коза"),
          S("koala", "Koala", "Koala", "Коала"),
        ],
      },
      {
        id: "birds",
        title: { en: "Birds", es: "Pájaros", ru: "Птицы" },
        sheets: [
          S("owl", "Owl", "Búho", "Сова"),
          S("parrot", "Parrot", "Loro", "Попугай"),
          S("flamingo", "Flamingo", "Flamenco", "Фламинго"),
          S("hummingbird", "Hummingbird", "Colibrí", "Колибри"),
        ],
      },
    ],
    copy: {
      en: {
        title:
          "20 free printable coloring pages for toddlers ages 1-3. Big pictures, thick lines, easy to color",
        lead:
          "Hand drawn for a child's first coloring book. One animal per page, thick outlines, and the word underneath can be colored too.",
        body: [
          "At two, most children sweep the crayon rather than fill. Thick lines forgive that. The color lands roughly inside, the picture still looks like a lion, and the child feels it worked. That is the difference between a page a toddler finishes and a page they abandon.",
          "These twenty sheets are real pages from our printed book, not filler drawn for a website. Each one was drawn by hand for children aged one to three: one animal, centered, nothing small in the corners, plenty of open space to fill.",
          "The name under each animal is an outline as well, so a child can color the letters and hear the word while they do it. Coloring like this is one of the simplest ways to work on fine motor control at this age, and it costs nothing but a sheet of paper.",
          "Print as many as you like. Take them to a restaurant, a waiting room, a long car ride. There is no account to make and nothing to pay for.",
        ],
        howTo: [
          "Two file sizes: US Letter and A4. Pick whichever your printer takes",
          "Print single-sided on plain paper",
          "Thick crayons work best for the youngest hands",
          "For markers, slip a spare sheet underneath",
          "Print the same animal twice and color one together",
        ],
        pickLead: "If your child liked these twenty, there are 111 in the book they came from.",
        pickTitle: "The book these pages come from",
        pickPoints: [
          "111 hand drawn pictures with thick lines",
          "One drawing per page, blank on the back",
          "The name under each picture can be colored too, so new words come with it",
          "8.5 x 11 inches, room for a whole hand",
          "114 pages, made for ages 1 to 3",
        ],
        faq: [
          {
            q: "Are these really free?",
            a: "Yes. No account, no email, no payment. Print as many copies as you want, at home or at a school.",
          },
          {
            q: "Can I use them in my classroom or daycare?",
            a: "Yes, print them and hand them out freely. Please do not resell them or republish the files on another site.",
          },
          {
            q: "Which file do I print, Letter or A4?",
            a: "In the United States and Canada, choose Letter. In Europe and Latin America, choose A4. The drawing is the same, only the sheet size differs.",
          },
          {
            q: "What age are these for?",
            a: "They were drawn for ages one to three. An older child who is still learning to stay inside a line will use them happily too, and the age is a starting point rather than a rule.",
          },
        ],
      },
      es: {
        title:
          "20 dibujos para colorear gratis para imprimir, niños de 1 a 3 años. Dibujos grandes, trazos gruesos, fáciles de colorear",
        lead:
          "Dibujados a mano para el primer libro para colorear de un niño. Un animal por página, contornos gruesos, y la palabra de abajo también se puede colorear.",
        body: [
          "A los dos años, la mayoría de los niños barre con el crayón en lugar de rellenar. Los trazos gruesos perdonan eso. El color cae más o menos dentro, el dibujo sigue pareciendo un león, y el niño siente que le salió. Ahí está la diferencia entre una página que se termina y una que se abandona.",
          "Estas veinte láminas son páginas reales de nuestro libro impreso, no relleno dibujado para una web. Cada una se dibujó a mano para niños de uno a tres años: un animal, centrado, nada pequeño en las esquinas, y mucho espacio abierto para rellenar.",
          "El nombre debajo de cada animal también es un contorno, así que el niño puede colorear las letras y oír la palabra mientras lo hace. Con dos o tres años las primeras palabras entran así, sin lección y sin esfuerzo. Colorear de esta manera es una de las formas más sencillas de trabajar la motricidad fina a esta edad, y no cuesta más que una hoja de papel.",
          "Imprime las que quieras. Llévalas a un restaurante, a una sala de espera, a un viaje largo en coche. No hay que registrarse ni pagar nada.",
        ],
        howTo: [
          "Dos tamaños de archivo: A4 y Carta. Elige el que acepte tu impresora",
          "Imprime a una sola cara en papel normal",
          "Los crayones gruesos funcionan mejor en las manos más pequeñas",
          "Si usas marcadores, pon una hoja debajo",
          "Imprime el mismo animal dos veces y coloreen uno juntos",
        ],
        pickLead: "Si a tu hijo le gustaron estas veinte, en el libro del que salieron hay 111.",
        pickTitle: "El libro del que salen estas páginas",
        pickPoints: [
          "111 dibujos hechos a mano con trazos gruesos",
          "Un dibujo por página, reverso en blanco",
          "El nombre bajo cada dibujo también se colorea, y con él llegan palabras nuevas",
          "8.5 x 11 pulgadas, espacio para la mano entera",
          "114 páginas, para niños de 1 a 3 años",
        ],
        faq: [
          {
            q: "¿De verdad son gratis?",
            a: "Sí. Sin registro, sin correo, sin pago. Imprime las copias que quieras, en casa o en una escuela.",
          },
          {
            q: "¿Puedo usarlas en mi clase o en la guardería?",
            a: "Sí, imprímelas y repártelas con total libertad. Solo te pedimos que no las revendas ni publiques los archivos en otra web.",
          },
          {
            q: "¿Qué archivo imprimo, A4 o Carta?",
            a: "En España y América Latina, elige A4. En Estados Unidos y Canadá, elige Carta. El dibujo es el mismo, solo cambia el tamaño de la hoja.",
          },
          {
            q: "¿Para qué edad son?",
            a: "Se dibujaron para niños de uno a tres años. Un niño mayor que todavía esté aprendiendo a quedarse dentro de la línea también las aprovechará, y la edad es un punto de partida, no una regla.",
          },
        ],
      },
    },
  },
];

export function pagesForLang(lang: UiLang): ColoringPage[] {
  return coloringPages.filter((p) => p.slug[lang] && p.copy[lang]);
}

export function pageBySlug(lang: UiLang, slug: string): ColoringPage | undefined {
  return coloringPages.find((p) => p.slug[lang] === slug);
}

export function sheetCount(p: ColoringPage, lang: UiLang): number {
  return groupsForLang(p, lang).reduce((n, g) => n + g.sheets.length, 0);
}

/** Все листы подряд, для веера на странице книги. */
export function allSheets(p: ColoringPage, lang: UiLang): Sheet[] {
  return groupsForLang(p, lang).flatMap((g) => g.sheets);
}

/** Страница раскрасок, собранная из этой книги. */
export function coloringPageForBook(bookId: string): ColoringPage | undefined {
  return coloringPages.find((p) => p.fromBookId === bookId || p.fromBookIdEs === bookId);
}

/** Имя файла листа на этом языке. Испанские рисунки лежат с суффиксом -es. */
export const sheetFile = (id: string, lang: UiLang) => (lang === "es" ? `${id}-es` : id);

export const printableUrl = (id: string, size: "letter" | "a4", lang: UiLang) =>
  `/printables/${sheetFile(id, lang)}-${size}.pdf`;

export const previewUrl = (id: string, lang: UiLang) =>
  `/printables/${sheetFile(id, lang)}.png`;

/** Листы этой темы, доступные на этом языке. */
export function groupsForLang(p: ColoringPage, lang: UiLang): SheetGroup[] {
  return p.groups
    .map((g) => ({ ...g, sheets: g.sheets.filter((sh) => !sh.only || sh.only.includes(lang)) }))
    .filter((g) => g.sheets.length > 0);
}
