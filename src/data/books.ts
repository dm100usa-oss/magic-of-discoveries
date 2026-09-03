// Каталог Magic of Discoveries.
// Единый источник данных. Добавить книгу = добавить одну запись сюда.
// Страница книги, каталог, карта сайта и разметка для поисковиков строятся отсюда автоматически.

export type UiLang = "en" | "es" | "ru";

export type EditionLang = "en" | "es" | "ru" | "bilingual";

export type FormatKind = "paperback" | "hardcover" | "kindle";

export interface BookFormat {
  kind: FormatKind;
  asin: string;
  price: string;
}

/** Оценки покупателей на Amazon. Показываем глазам, в разметку не кладем:
    Google запрещает выдавать чужой рейтинг за собственный. */
export interface AmazonRating {
  value: number;
  count: number;
}

export type AgeGroup = "1-3" | "3-5" | "5-7" | "7-10" | "teens-adults";

export type BookType = "bedtime" | "coloring" | "drawing" | "bilingual";

export interface BookCopy {
  /** Заголовок страницы. Пишется под поисковый запрос родителя, не под имя автора. */
  title: string;
  /** Подзаголовок: возраст и суть одной строкой. */
  subtitle: string;
  /** Первый абзац. Отвечает на вопрос "это то, что я ищу?" за три секунды. */
  lead: string;
  /** Что внутри. Каждый пункт это факт, а не реклама. */
  inside: string[];
  /** Кому подходит. */
  forWhom: string;
  /** Вопросы, которые родители реально задают. Уходят в разметку FAQ. */
  faq: { q: string; a: string }[];
}

export interface Book {
  id: string;
  author: "ricardo" | "maria";
  editionLang: EditionLang;
  age: AgeGroup;
  type: BookType;
  series?: string;
  /** Парная книга на другом языке. Связывает издания между собой. */
  pairId?: string;
  drawings?: number;
  /** Возраст, который видит человек, вида "5-10". Уходит и в разметку.
      Поле age остается основной полкой каталога. */
  ageShown?: string;
  /** Дополнительные полки каталога. Дети развиваются по-разному:
      одна и та же книга может подходить и шестилетнему, и девятилетнему,
      поэтому она должна находиться в обоих фильтрах. */
  alsoAges?: AgeGroup[];
  /** Сколько страниц в печатном издании. Берется с карточки KDP. */
  pages?: number;
  /** Дата выхода печатного издания, вид 2024-08-08. */
  published?: string;
  size: string;
  formats: BookFormat[];
  /** Прямая ссылка на карточку PDF в старом магазине. Пусто = цифровой версии нет. */
  pdfUrl?: string;
  /** Файл обложки в /public/covers/. Пусто = показываем название на цветном фоне. */
  cover?: string;
  /** Настоящие пропорции файла обложки, чтобы браузер не дергал страницу при загрузке. */
  coverSize?: { w: number; h: number };
  /** Иллюстрации из книги. Показываются в блоке "что внутри". */
  artwork?: { file: string; w: number; h: number; alt: Partial<Record<UiLang, string>> }[];
  /** Широкая полоса вверху, сразу под кнопками покупки. */
  bannerLead?: { file: string; w: number; h: number; alt: Partial<Record<UiLang, string>> };
  /** Одна строка над блоком картинок. Объясняет человеку, зачем он на них смотрит,
      и дает поисковику текст рядом с картинками. Подписей под самими картинками нет. */
  showcaseLead?: Partial<Record<UiLang, string>>;
  /** Широкие полосы: темы книги, разворот, для кого. */
  banners?: { file: string; w: number; h: number; alt: Partial<Record<UiLang, string>> }[];
  rating?: AmazonRating;
  /** Код английского издания на Amazon. Стоит у русских изданий: своей
      карточки на Amazon у них нет, а оценка и отзывы у книги общие,
      поэтому и звезды, и отзывы ведут на страницу английского издания. */
  enEditionAsin?: string;
  slug: Partial<Record<UiLang, string>>;
  copy: Partial<Record<UiLang, BookCopy>>;
}

const AMZ = "https://www.amazon.com/dp/";
export const amazonUrl = (asin: string) => AMZ + asin;
export const amazonReviewsUrl = (asin: string) => AMZ + asin + "#customerReviews";

const WIX = "https://dvchbooks.wixsite.com/website-13/product-page/";

/* ------------------------------------------------------------------ */
/*  Международные номера книг                                          */
/* ------------------------------------------------------------------ */

/** У бумажных и твердых изданий код Amazon это и есть десятизначный ISBN.
    Проверяем контрольную цифру, чтобы случайный код не превратился в номер. */
function isIsbn10(code: string): boolean {
  if (code.length !== 10) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const c = code[i];
    const v = c === "X" ? 10 : c >= "0" && c <= "9" ? Number(c) : -1;
    if (v < 0) return false;
    sum += v * (10 - i);
  }
  return sum % 11 === 0;
}

/** Тринадцатизначный ISBN. Именно он стоит в книжных каталогах мира,
    по нему книгу опознают поисковики и нейросети. */
export function isbn13(code: string): string | undefined {
  if (!isIsbn10(code)) return undefined;
  const core = "978" + code.slice(0, 9);
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(core[i]) * (i % 2 === 0 ? 1 : 3);
  return core + String((10 - (sum % 10)) % 10);
}

/** ISBN печатного издания книги. */
export function bookIsbn13(book: Book): string | undefined {
  const paper = book.formats.find((f) => f.kind !== "kindle");
  return paper ? isbn13(paper.asin) : undefined;
}

/** Карточки книг в мировой базе знаний Wikidata.
    Ссылка на карточку подтверждает, что книга это реальный объект,
    а не название на сайте. Источник: каталог FSCBAC, ricardo-demi-books. */
const WIKIDATA: Record<string, string> = {
  "first-coloring-book-111-en": "Q137217801",
  /* Испанское издание той же книги. Запись существовала давно,
     но в каталоге ее не было, и разметка испанской страницы уходила
     без нее. */
  "first-coloring-book-111-es": "Q137261547",
  "little-max-coloring-1-en": "Q137275695",
  "little-max-coloring-1-es": "Q137279061",
  "where-going-max-en": "Q137219071",
  "where-been-max-en": "Q137263694",
  "how-to-draw-111-en": "Q137394644",
  "how-to-draw-111-es": "Q137394793",
  "lucky-rocky-friendship-en": "Q137319241",
  "lucky-rocky-friendship-es": "Q137321602",
  "lucky-rocky-kindness-en": "Q137394929",
  "lucky-rocky-kindness-es": "Q137394997",
  "lucky-rocky-two-in-one-en": "Q137442329",
  "take-a-break-animals-en": "Q137361877",
};

export const wikidataUrl = (bookId: string): string | undefined =>
  WIKIDATA[bookId] ? `https://www.wikidata.org/wiki/${WIKIDATA[bookId]}` : undefined;

/* ------------------------------------------------------------------ */
/*  Видео с перелистыванием книги                                      */
/* ------------------------------------------------------------------ */

/** Ролик показывает бумагу, размер и то, как рисунок собирается
    по шагам. Это снимает главное сомнение родителя перед покупкой:
    что там внутри на самом деле. */
export type BookVideo = {
  src: string;
  poster: string;
  seconds: number;
  /** Ширина и высота ролика, нужны браузеру, чтобы не дергать верстку. */
  w: number;
  h: number;
  /** Развернутое описание ролика словами. На экран не выводится.
      Поисковик и нейросети видео не смотрят, они читают этот текст. */
  description: Partial<Record<UiLang, string>>;
  /** Что происходит и на какой секунде. Тоже только для машины. */
  chapters: { at: number; text: Partial<Record<UiLang, string>> }[];
};

const VIDEOS: Record<string, BookVideo> = {
  "first-coloring-book-111-es": {
    src: "/video/first-coloring-111-es.mp4",
    poster: "/video/first-coloring-111-es-poster.jpg",
    seconds: 19,
    w: 608,
    h: 1024,
    description: {
      es:
        "Un recorrido sin cortes por la edición en español de El Primer Libro de Colorear para Bebés " +
        "de 1 a 3 Años. Se ve la portada y después una página tras otra: un dibujo grande por hoja, " +
        "impreso por una sola cara, con la palabra en español debajo en letras huecas, entre ellos " +
        "el loro, el tulipán, la torta, el bádminton, las gafas, el grifo, el trol, el cangrejo, el pulpo, " +
        "el perro, la ardilla, el zorro y la gallina. Diecinueve segundos, sin sonido.",
      en:
        "An unedited flip through of the Spanish edition of this book. The clip shows the cover and then " +
        "page after page: one large drawing per sheet, printed on one side, with the Spanish word for it " +
        "in outline letters underneath. Nineteen seconds, no sound.",
    },
    chapters: [
      { at: 0, text: { es: "La portada", en: "The cover" } },
      {
        at: 2,
        text: {
          es: "Página tras página: un dibujo grande por hoja, con la palabra debajo",
          en: "Page after page: one large drawing per sheet, with the word underneath",
        },
      },
      {
        at: 6,
        text: {
          es: "El reverso de la hoja, en blanco",
          en: "The back of the sheet, blank",
        },
      },
      {
        at: 8,
        text: {
          es: "Flores, comida, objetos y animales, uno en cada página",
          en: "Flowers, food, objects and animals, one on each page",
        },
      },
    ],
  },
  "first-coloring-book-111-en": {
    src: "/video/first-coloring-111.mp4",
    poster: "/video/first-coloring-111-poster.jpg",
    seconds: 46,
    w: 608,
    h: 1080,
    description: {
      en:
        "An unedited flip through of the paperback edition of First Coloring Book for Toddlers Ages 1-3, " +
        "filmed on a table. The clip shows the front cover, the back cover, the title page, and page after " +
        "page of the book: one large drawing per sheet, printed on one side, with the word for it in outline " +
        "letters underneath, among them broccoli, a lotus, a sunflower, a beach hat, a kite and a helicopter. " +
        "It ends on the page at the front where a child writes their name. Forty six seconds, no sound.",
      es:
        "Un recorrido sin cortes por la edición en rústica de El Primer Libro de Colorear para Bebés de 1 a 3 Años, " +
        "filmado sobre una mesa. Se ven la portada, la contraportada, la portadilla y una página tras otra: " +
        "un dibujo grande por hoja, impreso por una sola cara, con la palabra debajo en letras huecas, " +
        "entre ellos el brócoli, un loto, un girasol, un sombrero de playa, una cometa y un helicóptero. " +
        "Termina en la página del principio donde el niño escribe su nombre. Cuarenta y seis segundos, sin sonido.",
    },
    chapters: [
      { at: 0, text: { en: "The front cover", es: "La portada" } },
      {
        at: 8,
        text: {
          en: "The back cover and what the book promises",
          es: "La contraportada y lo que promete el libro",
        },
      },
      { at: 14, text: { en: "The title page", es: "La portadilla" } },
      {
        at: 16,
        text: {
          en: "Page after page: one large drawing per sheet, with the word underneath",
          es: "Página tras página: un dibujo grande por hoja, con la palabra debajo",
        },
      },
      {
        at: 35,
        text: {
          en: "The page at the front where the child writes their name",
          es: "La página del principio donde el niño escribe su nombre",
        },
      },
      { at: 41, text: { en: "Back to the front cover", es: "De vuelta a la portada" } },
    ],
  },
  "how-to-draw-111-en": {
    src: "/video/how-to-draw-111.mp4",
    poster: "/video/how-to-draw-111-poster.jpg",
    seconds: 33,
    w: 608,
    h: 1080,
    description: {
      en:
        "An unedited flip through of the paperback edition of How to Draw 111 Amazing and Cute, " +
        "filmed on a table with markers beside it. The clip shows the front cover held in a hand, " +
        "the back cover, the title page, a full spread where a unicorn is drawn in six numbered steps " +
        "with a dotted tracing page beside it, an empty practice page with one drawing per sheet, " +
        "and the index listing all 111 subjects. Thirty three seconds, no sound.",
      es:
        "Un recorrido sin cortes por la edición en rústica de Cómo dibujar 111 Sorprendentes y Adorables, " +
        "filmado sobre una mesa junto a los marcadores. Se ven la portada en la mano, la contraportada, " +
        "la portadilla, una doble página donde un unicornio se dibuja en seis pasos numerados con una hoja " +
        "punteada para calcar al lado, una hoja de práctica vacía con un dibujo por hoja, y el índice con " +
        "los 111 temas. Treinta y tres segundos, sin sonido.",
    },
    chapters: [
      { at: 0, text: { en: "The front cover, held in a hand", es: "La portada, en la mano" } },
      {
        at: 3,
        text: {
          en: "The back cover and what the book promises",
          es: "La contraportada y lo que promete el libro",
        },
      },
      { at: 9, text: { en: "The title page", es: "La portadilla" } },
      {
        at: 11,
        text: {
          en: "A unicorn drawn in six numbered steps, with a dotted tracing page beside it",
          es: "Un unicornio dibujado en seis pasos numerados, con una hoja punteada para calcar al lado",
        },
      },
      {
        at: 18,
        text: {
          en: "An empty practice page, one drawing per sheet",
          es: "Una hoja de práctica vacía, un dibujo por hoja",
        },
      },
      {
        at: 24,
        text: { en: "The index of all 111 subjects", es: "El índice de los 111 temas" },
      },
    ],
  },
};

export const bookVideo = (bookId: string): BookVideo | undefined => VIDEOS[bookId];


/* ------------------------------------------------------------------ */
/*  Повторяющиеся куски текста                                        */
/* ------------------------------------------------------------------ */

const faqPaperOrDigital = {
  en: {
    q: "Is this a printed book or a download?",
    a: "The book on this page is a printed paperback shipped by Amazon. Where a printable PDF edition also exists, you will see a separate download button below the buy button.",
  },
  es: {
    q: "¿Es un libro impreso o una descarga?",
    a: "El libro de esta página es un libro impreso que envía Amazon. Cuando además existe una edición en PDF para imprimir, verás un botón de descarga aparte debajo del botón de compra.",
  },
};

const faqBleed = {
  en: {
    q: "Will markers bleed through the page?",
    a: "Each drawing sits on its own page, so a marker that bleeds only affects the back of that sheet. Slip a spare sheet of paper underneath if you use alcohol markers.",
  },
  es: {
    q: "¿Los marcadores traspasan la página?",
    a: "Cada dibujo está en su propia página, así que si un marcador traspasa solo afecta al reverso de esa hoja. Coloca una hoja de papel debajo si usas marcadores con alcohol.",
  },
  ru: {
    q: "Не протекут ли фломастеры на следующий рисунок?",
    a: "Каждый рисунок находится на отдельной странице, поэтому фломастер может испачкать только оборот этого листа. Если раскрашиваете спиртовыми маркерами, подложите запасной лист.",
  },
};

/* Русские издания выходят только файлом для печати. Бумажной книги с
   доставкой на русском нет, и об этом надо сказать прямо на странице,
   а не оставлять человека догадываться. */
const faqPdfEditionRu = {
  q: "Это печатная книга или файл?",
  a: "Русское издание продается в формате PDF для печати. Ссылка приходит сразу после оплаты, файл остается у вас, печатать можно сколько угодно раз - дома или в копировальном центре. Бумажного издания с доставкой на русском языке у нас нет.",
};

const faqPaperSizeRu = {
  q: "Какой размер листа выбрать?",
  a: "Letter - американский формат бумаги, A4 - европейский. В США и Канаде выбирайте Letter, в Европе, Израиле и большинстве других стран - A4. Содержание файлов одинаковое, отличается только размер листа.",
};

/* ------------------------------------------------------------------ */
/*  Каталог                                                            */
/* ------------------------------------------------------------------ */

export const books: Book[] = [
  /* ===== Раскраски 1-3, серия "111 животных", лев на обложке ===== */
  {
    id: "first-coloring-book-111-en",
    author: "ricardo",
    editionLang: "en",
    age: "1-3",
    type: "coloring",
    pairId: "first-coloring-book-111-es",
    drawings: 111,
    pages: 114,
    published: "2024-04-22",
    size: "8.5 x 11 in",
    cover: "/covers/first-coloring-book-111-en.jpg",
    coverSize: { w: 900, h: 1165 },
    formats: [{ kind: "paperback", asin: "1963328272", price: "$6.99" }],
    pdfUrl: WIX + "english-4",
    rating: { value: 5.0, count: 19 },
    showcaseLead: {
      en: "Three things we checked on every page before it went into the book: the shape stays simple, the picture fills the sheet, and the animal looks friendly enough that a child wants to start.",
    },
    bannerLead: {
      file: "/art/first-coloring-111-header.png",
      w: 1941,
      h: 601,
      alt: {
        en: "First Coloring Book For Toddlers by Ricardo Demi, cover with a lion, ages 1 to 3",
      },
    },
    artwork: [
      {
        file: "/art/first-coloring-111-simple.png",
        w: 601,
        h: 601,
        alt: {
          en: "Simple: an outline turtle drawn with thick lines, one object on the page",
        },
      },
      {
        file: "/art/first-coloring-111-big.png",
        w: 601,
        h: 601,
        alt: {
          en: "Big: a cow drawing filling the page, colored in by a small child",
        },
      },
      {
        file: "/art/first-coloring-111-cute.png",
        w: 601,
        h: 601,
        alt: {
          en: "Cute: a smiling red car, one of the everyday objects in the book",
        },
      },
    ],
    banners: [
      {
        file: "/art/first-coloring-111-gift.png",
        w: 1941,
        h: 601,
        alt: {
          en: "The perfect gift for beginner artists, a doughnut drawing and colored pencils",
        },
      },
    ],
    slug: { en: "first-coloring-book-toddlers-1-3-111-drawings" },
    copy: {
      en: {
        title: "First Coloring Book for Toddlers Ages 1-3",
        subtitle: "A first coloring book for toddlers ages 1-3",
        lead:
          "111 big, simple pictures, hand drawn with thick lines, no small detail, one drawing per page. Animals, fairy-tale characters, flowers, foods and everyday objects keep every page new. The word under each picture can be colored too, so first words and letters come along with the coloring.",
        inside: [
          "111 drawings, all hand drawn by professional illustrators",
          "Thick outlines and large shapes, so your child stays inside the lines",
          "One drawing per page, so a marker cannot show through onto the next one",
          "The word under each picture can be colored too, which turns coloring into first reading",
          "Every picture sits in the center of the page, comfortable for a left or a right handed child",
          "Animals, sea creatures, fairy-tale characters, vehicles, flowers and food",
          "A page at the front where your child writes their name",
          "114 pages, 8.5 x 11 inches",
        ],
        forWhom:
          "Ages 1, 2 and 3. Good for a first coloring book, for preschool and daycare, and as a gift when you do not know the child well.",
        faq: [
          {
            q: "Is this too hard for a 1 year old?",
            a: "No. The drawings were made deliberately simple for the youngest end of the range. A one year old will scribble across the shape, a three year old will start staying inside it. The same book works through all three years.",
          },
          {
            q: "How thick is the paper?",
            a: "It is standard book paper, printed by Amazon, and a few parents have wished for something heavier. The book is built around that: each drawing sits on its own page with a blank back, so a marker that soaks through marks an empty sheet rather than a second picture. A spare sheet underneath solves it completely.",
          },
          faqPaperOrDigital.en,
          faqBleed.en,
        ],
      },
    },
  },
  {
    id: "first-coloring-book-111-es",
    author: "ricardo",
    editionLang: "es",
    age: "1-3",
    type: "coloring",
    pairId: "first-coloring-book-111-en",
    drawings: 111,
    pages: 114,
    published: "2024-04-29",
    size: "21.6 x 27.9 cm",
    cover: "/covers/first-coloring-book-111-es.jpg",
    coverSize: { w: 900, h: 1164 },
    formats: [{ kind: "paperback", asin: "1963328205", price: "$6.99" }],
    pdfUrl: WIX + "spanish-4",
    rating: { value: 4.9, count: 26 },
    showcaseLead: {
      es: "Tres cosas que comprobamos en cada página antes de que entrara en el libro: la forma se mantiene simple, el dibujo llena la hoja, y el animal resulta lo bastante simpático como para que el niño quiera empezar.",
    },
    bannerLead: {
      file: "/art/first-coloring-111-es-header.png",
      w: 1941,
      h: 601,
      alt: {
        es: "El Primer Libro de Colorear para Bebés de Ricardo Demi, portada con un león, de 1 a 3 años",
      },
    },
    artwork: [
      {
        file: "/art/first-coloring-111-es-simple.png",
        w: 601,
        h: 601,
        alt: {
          es: "Simples: una tortuga de contorno grueso, un solo objeto en la página",
        },
      },
      {
        file: "/art/first-coloring-111-es-big.png",
        w: 601,
        h: 601,
        alt: {
          es: "Grandes: una vaca que llena la hoja, coloreada por un niño pequeño",
        },
      },
      {
        file: "/art/first-coloring-111-es-cute.png",
        w: 601,
        h: 601,
        alt: {
          es: "Adorables: un coche rojo sonriente, uno de los objetos cotidianos del libro",
        },
      },
    ],
    banners: [
      {
        file: "/art/first-coloring-111-es-gift.png",
        w: 1941,
        h: 601,
        alt: {
          es: "Un maravilloso regalo para artistas novatos, una rosquilla y lápices de colores",
        },
      },
    ],
    slug: { es: "primer-libro-colorear-bebes-1-3-anos-111-dibujos" },
    copy: {
      es: {
        title: "El Primer Libro de Colorear para Bebés de 1 a 3 Años",
        subtitle: "El primer libro para colorear para niños de 1 a 3 años",
        lead:
          "111 dibujos simples y grandes, dibujados a mano con líneas gruesas, sin detalles pequeños y con un dibujo por página. Animales, personajes de cuento, flores, comidas y objetos cotidianos hacen que cada página sea nueva. La palabra debajo de cada dibujo también se puede colorear, y así llegan las primeras palabras y letras.",
        inside: [
          "111 dibujos, todos hechos a mano por ilustradores profesionales",
          "Líneas gruesas y formas grandes, para que el niño no se salga del contorno",
          "Un dibujo por página, para que el rotulador no traspase al siguiente",
          "La palabra debajo de cada dibujo también se puede colorear, y así colorear se convierte en primera lectura",
          "Cada dibujo está en el centro de la página, cómodo tanto para zurdos como para diestros",
          "Animales, animales marinos, personajes de cuentos, vehículos, flores y comida",
          "Una página al principio donde el niño escribe su nombre",
          "114 páginas, 21.6 x 27.9 cm",
        ],
        forWhom:
          "Para niños de 1, 2 y 3 años. Sirve como primer libro para colorear, para preescolar y guardería, y como regalo cuando no conoces bien al niño.",
        faq: [
          {
            q: "¿Es demasiado difícil para un bebé de 1 año?",
            a: "No. Los dibujos se hicieron a propósito muy simples para los más pequeños. Un bebé de un año rayará por encima de la figura y uno de tres empezará a quedarse dentro. El mismo libro acompaña los tres años.",
          },
          faqPaperOrDigital.es,
          faqBleed.es,
        ],
      },
    },
  },

  /* ===== Раскраски малыша Макса, синяя обложка ===== */
  {
    id: "little-max-coloring-1-en",
    author: "ricardo",
    editionLang: "en",
    age: "1-3",
    type: "coloring",
    series: "little-max",
    pairId: "little-max-coloring-1-es",
    drawings: 111,
    pages: 114,
    published: "2024-04-26",
    size: "8.5 x 11 in",
    cover: "/covers/little-max-coloring-1-en.jpg",
    coverSize: { w: 900, h: 1164 },
    formats: [{ kind: "paperback", asin: "1963328566", price: "$6.99" }],
    pdfUrl: WIX + "english-5",
    rating: { value: 4.6, count: 3 },
    showcaseLead: {
      en: "Three things worth seeing before you buy: how simple each shape is, how much of the page one drawing takes up, and the kind of subjects a toddler recognizes.",
    },
    bannerLead: {
      file: "/art/little-max-coloring-1-header.jpg",
      w: 1940,
      h: 600,
      alt: {
        en: "First Coloring Book for Toddlers by Little Max, cover with the mouse in a sailor shirt, beside a stack of colored pencils",
      },
    },
    artwork: [
      {
        file: "/art/little-max-coloring-1-simple.jpg",
        w: 600,
        h: 600,
        alt: {
          en: "Simple: a snail drawn with a few thick lines, one object on the page",
        },
      },
      {
        file: "/art/little-max-coloring-1-big.jpg",
        w: 600,
        h: 600,
        alt: {
          en: "Big: a raccoon filling the page, partly colored in with pencil by a small child",
        },
      },
      {
        file: "/art/little-max-coloring-1-cute.jpg",
        w: 600,
        h: 600,
        alt: {
          en: "Cute: a stacking ring toy, one of the everyday things a toddler already knows",
        },
      },
    ],
    banners: [
      {
        file: "/art/little-max-coloring-1-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "The book open at a dog and a bunny, one drawing per page with the word underneath, 8.5 by 11 inches",
        },
      },
      {
        file: "/art/little-max-coloring-1-themes.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Ten of the 111 drawings: sneakers, moon, mushroom, candy, caterpillar, tomato, fox, squirrel, strawberry and a baby goose",
        },
      },
      {
        file: "/art/little-max-coloring-1-gift.jpg",
        w: 1940,
        h: 600,
        alt: {
          en: "The perfect gift for beginner artists, a cupcake drawing, party flags and colored pencils",
        },
      },
    ],
    slug: { en: "little-max-first-coloring-book-toddlers-1-3" },
    copy: {
      en: {
        title: "First Coloring Book for Toddlers Ages 1-3 by Little Max",
        subtitle: "A first coloring book made for small hands",
        lead:
          "111 big pictures, hand drawn with thick lines, no small detail, one drawing per page. It is easier for a toddler to color on their own, to steady the hand and hold attention, and the word under each picture becomes one of the first they ever read. And Little Max, the cheerful mouse, turns first coloring into a small adventure.",
        inside: [
          "111 large drawings with thick, forgiving outlines",
          "Little Max appears through the book, so coloring becomes a small story",
          "One drawing per page, single-sided printing",
          "Cozy everyday subjects: animals, food, toys, weather, plants",
          "8.5 x 11 inches",
        ],
        forWhom:
          "Ages 1 to 3. Best if the child already knows Little Max, or if you plan to read the Little Max bedtime stories too.",
        faq: [
          {
            q: "How is this different from the other First Coloring Book?",
            a: "The drawing style and the difficulty are the same. This edition is built around the character Little Max and connects to the Little Max bedtime stories. Families who want both usually buy the lion-cover book first and this one second.",
          },
          faqPaperOrDigital.en,
          faqBleed.en,
        ],
      },
    },
  },
  {
    id: "little-max-coloring-1-es",
    author: "ricardo",
    editionLang: "es",
    age: "1-3",
    type: "coloring",
    series: "little-max",
    pairId: "little-max-coloring-1-en",
    drawings: 111,
    pages: 114,
    published: "2024-04-26",
    size: "21.6 x 27.9 cm",
    cover: "/covers/little-max-coloring-1-es.jpg",
    coverSize: { w: 900, h: 1164 },
    formats: [{ kind: "paperback", asin: "1963328590", price: "$6.99" }],
    pdfUrl: WIX + "el-primer-libro-de-colorear-para-bebés-de-1-3-años-de-pequeño-max",
    rating: { value: 5.0, count: 2 },
    showcaseLead: {
      es: "Tres cosas que vale la pena ver antes de comprar: lo sencilla que es cada forma, cuánto ocupa un dibujo en la página y el tipo de cosas que el niño ya reconoce.",
    },
    bannerLead: {
      file: "/art/little-max-coloring-1-es-header.jpg",
      w: 1940,
      h: 600,
      alt: {
        es: "El Primer Libro de Colorear para Bebés de Pequeño Max, portada con el ratón con camiseta de marinero, junto a unos lápices de colores",
      },
    },
    artwork: [
      {
        file: "/art/little-max-coloring-1-es-simple.jpg",
        w: 600,
        h: 600,
        alt: {
          es: "Simples: un caracol dibujado con unas pocas líneas gruesas, un solo objeto en la página",
        },
      },
      {
        file: "/art/little-max-coloring-1-es-big.jpg",
        w: 600,
        h: 600,
        alt: {
          es: "Grandes: un mapache que llena la página, coloreado en parte a lápiz por un niño pequeño",
        },
      },
      {
        file: "/art/little-max-coloring-1-es-cute.jpg",
        w: 600,
        h: 600,
        alt: {
          es: "Adorables: una pirámide de anillas, una de las cosas cotidianas que el niño ya conoce",
        },
      },
    ],
    banners: [
      {
        file: "/art/little-max-coloring-1-es-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "El libro abierto por un perro y una liebre, un dibujo por página con la palabra debajo, 21.6 x 28 cm",
        },
      },
      {
        file: "/art/little-max-coloring-1-es-themes.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Diez de los 111 dibujos: zapatillas, luna, hongo, caramelos, oruga, tomate, zorro, ardilla, fresa y un ganso",
        },
      },
      {
        file: "/art/little-max-coloring-1-es-gift.jpg",
        w: 1940,
        h: 600,
        alt: {
          es: "Un maravilloso regalo para artistas novatos, una magdalena, banderines de fiesta y lápices de colores",
        },
      },
    ],
    slug: { es: "pequeno-max-primer-libro-colorear-bebes-1-3-anos" },
    copy: {
      es: {
        title: "El Primer Libro de Colorear de Pequeño Max, para Bebés de 1 a 3 Años",
        subtitle: "El primer libro para colorear, hecho para manos pequeñas",
        lead:
          "111 dibujos simples y grandes, dibujados a mano con líneas gruesas, sin detalles pequeños y con un dibujo por página. Al pequeño le resulta más fácil colorear solo, ejercitar la mano y mantener la atención, y la palabra debajo de cada dibujo se convierte en una de las primeras que lee. Y el simpático ratoncito Pequeño Max convierte el primer contacto con los colores en una pequeña aventura.",
        inside: [
          "111 dibujos grandes con contornos gruesos y tolerantes",
          "Pequeño Max aparece a lo largo del libro y colorear se vuelve un pequeño relato",
          "Un dibujo por página, impresión por una sola cara",
          "Temas cotidianos y acogedores: animales, comida, juguetes, plantas",
          "21.6 x 27.9 cm",
        ],
        forWhom:
          "De 1 a 3 años. Ideal si el niño ya conoce a Pequeño Max o si además vais a leer sus cuentos para dormir.",
        faq: [
          {
            q: "¿En qué se diferencia del otro Primer Libro de Colorear?",
            a: "El estilo y la dificultad son los mismos. Esta edición gira en torno al personaje Pequeño Max y enlaza con sus cuentos para dormir. Las familias que quieren los dos suelen empezar por el de la portada del león.",
          },
          faqPaperOrDigital.es,
          faqBleed.es,
        ],
      },
    },
  },

  /* ===== Раскраски малыша Макса, зеленая обложка ===== */
  {
    id: "little-max-coloring-2-en",
    author: "ricardo",
    editionLang: "en",
    age: "1-3",
    type: "coloring",
    series: "little-max",
    pairId: "little-max-coloring-2-es",
    drawings: 111,
    pages: 114,
    published: "2024-09-05",
    size: "8.5 x 11 in",
    cover: "/covers/little-max-coloring-2-en.jpg",
    coverSize: { w: 900, h: 1164 },
    formats: [{ kind: "paperback", asin: "1963328450", price: "$6.99" }],
    pdfUrl: WIX + "копия-копия-копия-копия-шаблон-книги",
    rating: { value: 5.0, count: 1 },
    showcaseLead: {
      en: "Three things worth seeing before you buy: how simple each shape is, how much of the page one drawing takes up, and the kind of subjects a toddler recognizes.",
    },
    bannerLead: {
      file: "/art/little-max-coloring-2-header.jpg",
      w: 1940,
      h: 600,
      alt: {
        en: "Little Max Coloring Book for Toddlers, Volume 2, cover with the mouse in a cap, beside a stack of colored pencils",
      },
    },
    artwork: [
      {
        file: "/art/little-max-coloring-2-simple.jpg",
        w: 600,
        h: 600,
        alt: {
          en: "Simple: a fish drawn with a few thick lines, one object on the page",
        },
      },
      {
        file: "/art/little-max-coloring-2-big.jpg",
        w: 600,
        h: 600,
        alt: {
          en: "Big: an owl filling the page, partly colored in with pencil by a small child",
        },
      },
      {
        file: "/art/little-max-coloring-2-cute.jpg",
        w: 600,
        h: 600,
        alt: {
          en: "Cute: a toy drum with sticks, one of the everyday things a toddler already knows",
        },
      },
    ],
    banners: [
      {
        file: "/art/little-max-coloring-2-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "The book open at a baby elephant and a panda, one drawing per page with the word underneath, 8.5 by 11 inches",
        },
      },
      {
        file: "/art/little-max-coloring-2-themes.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Ten of the 111 drawings: palm tree, balloons, monkey, acorn, whale, toucan, giraffe, watermelon, helicopter and soccer ball",
        },
      },
      {
        file: "/art/little-max-coloring-2-gift.jpg",
        w: 1940,
        h: 600,
        alt: {
          en: "The perfect gift for beginner artists, a popcorn box, party flags and colored pencils",
        },
      },
    ],
    slug: { en: "little-max-coloring-book-toddlers-1-3-volume-2" },
    copy: {
      en: {
        title: "Little Max Coloring Book for Toddlers Ages 1-3, Volume 2",
        subtitle: "A coloring book for toddlers ages 1-3, with new drawings",
        lead:
          "111 new big pictures, hand drawn with thick lines, no small detail, one drawing per page. Along with the new pictures a toddler colors their names, learns new words and steadies the hand and attention. And Little Max, the cheerful mouse, is here again.",
        inside: [
          "111 new drawings, none repeated from the first volume",
          "Same thick outlines and large shapes, no step up in difficulty",
          "One drawing per page, single-sided printing",
          "8.5 x 11 inches",
        ],
        forWhom:
          "Ages 1 to 3, especially as a second book after the first Little Max coloring book.",
        faq: [
          {
            q: "Do the drawings repeat from volume one?",
            a: "No. The drawings are different. The difficulty deliberately stays the same, because at this age children want repetition of the format, not a harder challenge.",
          },
          faqPaperOrDigital.en,
          faqBleed.en,
        ],
      },
    },
  },
  {
    id: "little-max-coloring-2-es",
    author: "ricardo",
    editionLang: "es",
    age: "1-3",
    type: "coloring",
    series: "little-max",
    pairId: "little-max-coloring-2-en",
    drawings: 111,
    pages: 114,
    published: "2024-09-05",
    size: "21.6 x 27.9 cm",
    cover: "/covers/little-max-coloring-2-es.jpg",
    coverSize: { w: 900, h: 1164 },
    formats: [{ kind: "paperback", asin: "1963328558", price: "$6.99" }],
    pdfUrl: WIX + "копия-копия-копия-копия-копия-шаблон-книги",
    showcaseLead: {
      es: "Tres cosas que vale la pena ver antes de comprar: lo sencilla que es cada forma, cuánto ocupa un dibujo en la página y el tipo de cosas que el niño ya reconoce.",
    },
    bannerLead: {
      file: "/art/little-max-coloring-2-es-header.jpg",
      w: 1940,
      h: 600,
      alt: {
        es: "Libro de Colorear de Pequeño Max para Bebés, Volumen 2, portada con el ratón con gorra, junto a unos lápices de colores",
      },
    },
    artwork: [
      {
        file: "/art/little-max-coloring-2-es-simple.jpg",
        w: 600,
        h: 600,
        alt: {
          es: "Simples: un pez dibujado con unas pocas líneas gruesas, un solo objeto en la página",
        },
      },
      {
        file: "/art/little-max-coloring-2-es-big.jpg",
        w: 600,
        h: 600,
        alt: {
          es: "Grandes: una lechuza que llena la página, coloreada en parte a lápiz por un niño pequeño",
        },
      },
      {
        file: "/art/little-max-coloring-2-es-cute.jpg",
        w: 600,
        h: 600,
        alt: {
          es: "Adorables: un tambor de juguete con baquetas, una de las cosas cotidianas que el niño ya conoce",
        },
      },
    ],
    banners: [
      {
        file: "/art/little-max-coloring-2-es-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "El libro abierto por un elefante bebé y un panda, un dibujo por página con la palabra debajo, 21.6 x 28 cm",
        },
      },
      {
        file: "/art/little-max-coloring-2-es-themes.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Diez de los 111 dibujos: palma, globos, mono, bellota, ballena, tucán, jirafa, sandía, helicóptero y balón de fútbol",
        },
      },
      {
        file: "/art/little-max-coloring-2-es-gift.jpg",
        w: 1940,
        h: 600,
        alt: {
          es: "Un maravilloso regalo para artistas novatos, una caja de palomitas, banderines de fiesta y lápices de colores",
        },
      },
    ],
    slug: { es: "pequeno-max-libro-colorear-bebes-1-3-anos-volumen-2" },
    copy: {
      es: {
        title: "Libro de Colorear de Pequeño Max para Bebés de 1 a 3 Años, Volumen 2",
        subtitle: "Un libro para colorear para niños de 1 a 3 años, con dibujos nuevos",
        lead:
          "111 dibujos nuevos, simples y grandes, dibujados a mano con líneas gruesas, sin detalles pequeños y con un dibujo por página. Junto con los dibujos nuevos, el pequeño colorea sus nombres, aprende palabras nuevas y ejercita la mano y la atención. Y el simpático ratoncito Pequeño Max está de nuevo a su lado.",
        inside: [
          "111 dibujos nuevos, ninguno repetido del primer volumen",
          "Las mismas líneas gruesas y formas grandes, sin subir la dificultad",
          "Un dibujo por página, impresión por una sola cara",
          "21.6 x 27.9 cm",
        ],
        forWhom: "De 1 a 3 años, sobre todo como segundo libro después del primero de Pequeño Max.",
        faq: [
          {
            q: "¿Se repiten los dibujos del volumen uno?",
            a: "No. Los dibujos son distintos. La dificultad se mantiene a propósito, porque a esta edad los niños quieren repetir el formato, no un reto mayor.",
          },
          faqPaperOrDigital.es,
          faqBleed.es,
        ],
      },
    },
  },

  /* ===== Сказки на ночь: Куда ты идешь, малыш Макс ===== */
  {
    id: "where-going-max-en",
    author: "ricardo",
    editionLang: "en",
    age: "1-3",
    type: "bedtime",
    series: "little-max",
    pairId: "where-going-max-es",
    size: "8.5 x 8.5 in",
    cover: "/covers/where-going-max-en.jpg",
    coverSize: { w: 900, h: 909 },
    formats: [
      { kind: "paperback", asin: "1963328434", price: "$12.99" },
      { kind: "kindle", asin: "B0DCPZPX6Z", price: "$2.99" },
    ],
    rating: { value: 4.8, count: 19 },
    pages: 28,
    published: "2024-04-26",
    showcaseLead: {
      en: "Pages from inside: Max asking the hen for an egg, the cow for milk and the goose for a feather, each animal on its own spread.",
    },
    bannerLead: {
      file: "/art/where-going-max-header.jpg",
      w: 1940,
      h: 600,
      alt: {
        en: "Where Are You Going, Little Max? by Ricardo Demi, discoveries that help kids, cover with the mouse in a sailor shirt among daisies",
      },
    },
    artwork: [
      {
        file: "/art/where-going-max-hen.jpg",
        w: 591,
        h: 600,
        alt: {
          en: "An illustration from the book: Max talking to the hen and her two chicks on the farm path, a basket of eggs beside them",
        },
      },
      {
        file: "/art/where-going-max-cow.jpg",
        w: 591,
        h: 600,
        alt: {
          en: "An illustration from the book: Max carrying two jugs of milk away from the meadow where the cow is grazing",
        },
      },
      {
        file: "/art/where-going-max-goose.jpg",
        w: 591,
        h: 600,
        alt: {
          en: "An illustration from the book: Max riding on the goose across the pond, with two ducklings and water lilies around them",
        },
      },
    ],
    banners: [
      {
        file: "/art/where-going-max-inside.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Short and cute stories, hand drawn illustrations and happy moments for toddlers: a spread where Max sets off with his cart",
        },
      },
      {
        file: "/art/where-going-max-pages.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Four spreads from the book: Max asking the sheep, the hen and the cow, and the whole family at the table sharing the milk",
        },
      },
      {
        file: "/art/where-going-max-learning.jpg",
        w: 1940,
        h: 600,
        alt: {
          en: "What the child picks up along the way: simple tasks, new words, imagination, the world around them and memory",
        },
      },
    ],
    slug: { en: "where-are-you-going-little-max-bedtime-book-toddlers" },
    copy: {
      en: {
        title: "Where Are You Going, Little Max?",
        subtitle: "Bedtime stories for toddlers ages 1-3",
        lead:
          "A gentle story for toddlers ages 1 to 3 about Little Max the mouse and the farm animals he meets. Along with Max a child meets the cow, the hen, the sheep and the goose, hears the sound each one makes, and learns where milk, eggs, wool and feathers come from. In a simple, clear way the story introduces politeness, kindness and sharing, and the bright illustrations and short text suit reading together before bed.",
        inside: [
          "One or two sentences per page, written to be read aloud",
          "A simple there-and-back journey, the story shape toddlers understand first",
          "Warm illustrations in full color",
          "Ends at home, in bed, on purpose",
        ],
        forWhom:
          "Ages 1 to 3. For families starting a bedtime reading habit, and for children who still get up and walk away mid-story.",
        faq: [
          {
            q: "My child will not sit still for books. Will this work?",
            a: "That is the case it was written for. The whole book takes two or three minutes to read aloud. Children who cannot finish a longer story often finish this one, and finishing is what builds the habit.",
          },
          {
            q: "Is there a Spanish version?",
            a: "Yes, and there is also a bilingual English and Spanish edition with both languages on the page, for families raising a child in two languages.",
          },
        ],
      },
    },
  },
  {
    id: "where-going-max-es",
    author: "ricardo",
    editionLang: "es",
    age: "1-3",
    type: "bedtime",
    series: "little-max",
    pairId: "where-going-max-en",
    size: "21.6 x 21.6 cm",
    cover: "/covers/where-going-max-es.jpg",
    coverSize: { w: 900, h: 909 },
    formats: [{ kind: "paperback", asin: "1963328469", price: "$12.99" }],
    rating: { value: 5.0, count: 2 },
    pages: 28,
    published: "2024-04-25",
    showcaseLead: {
      es: "Páginas del interior: Max pidiéndole un huevo a la gallina, leche a la vaca y una pluma al ganso, cada animal en su propia doble página.",
    },
    bannerLead: {
      file: "/art/where-going-max-es-header.jpg",
      w: 1940,
      h: 600,
      alt: {
        es: "¿A dónde vas, pequeño Max? de Ricardo Demi, descubrimientos que ayudan a los niños, portada con el ratón con camiseta de marinero entre margaritas",
      },
    },
    artwork: [
      {
        file: "/art/where-going-max-es-hen.jpg",
        w: 591,
        h: 600,
        alt: {
          es: "Una ilustración del libro: Max hablando con la gallina y sus dos pollitos en el camino de la granja, con una cesta de huevos al lado",
        },
      },
      {
        file: "/art/where-going-max-es-cow.jpg",
        w: 591,
        h: 600,
        alt: {
          es: "Una ilustración del libro: Max llevándose dos jarras de leche del prado donde pasta la vaca",
        },
      },
      {
        file: "/art/where-going-max-es-goose.jpg",
        w: 591,
        h: 600,
        alt: {
          es: "Una ilustración del libro: Max montado en el ganso por el estanque, con dos patitos y nenúfares alrededor",
        },
      },
    ],
    banners: [
      {
        file: "/art/where-going-max-es-inside.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Historias cortas y lindas, ilustraciones dibujadas a mano y momentos felices: una doble página en la que Max sale con su carrito",
        },
      },
      {
        file: "/art/where-going-max-es-pages.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Cuatro dobles páginas del libro: Max pidiéndole a la oveja, a la gallina y a la vaca, y toda la familia en la mesa compartiendo la leche",
        },
      },
      {
        file: "/art/where-going-max-es-learning.jpg",
        w: 1940,
        h: 600,
        alt: {
          es: "Lo que el niño va aprendiendo por el camino: tareas sencillas, palabras nuevas, imaginación, el mundo que le rodea y memoria",
        },
      },
    ],
    slug: { es: "a-donde-vas-pequeno-max-cuento-para-dormir-bebes" },
    copy: {
      es: {
        title: "¿A dónde vas, Pequeño Max?",
        subtitle: "Cuentos para dormir para niños de 1 a 3 años",
        lead:
          "Una historia tierna para niños de 1 a 3 años sobre el ratoncito Pequeño Max y los animales de la granja que va conociendo. Junto a Max, el niño conoce a la vaca, la gallina, la oveja y el ganso, escucha el sonido que hace cada uno y descubre de dónde vienen la leche, los huevos, la lana y las plumas. De forma sencilla y clara, la historia le habla de la cortesía, la bondad y el saber compartir, y las ilustraciones vivas y el texto corto son perfectos para leer juntos antes de dormir.",
        inside: [
          "Una o dos frases por página, escritas para leer en voz alta",
          "Un viaje de ida y vuelta, la forma de historia que los niños pequeños entienden primero",
          "Ilustraciones cálidas a todo color",
          "Termina en casa y en la cama, a propósito",
        ],
        forWhom:
          "De 1 a 3 años. Para familias que empiezan la rutina de leer antes de dormir y para niños que aún se levantan a mitad del cuento.",
        faq: [
          {
            q: "Mi hijo no se queda quieto con los libros. ¿Servirá?",
            a: "Se escribió justo para ese caso. El libro entero se lee en dos o tres minutos. Los niños que no terminan un cuento largo suelen terminar este, y terminar es lo que crea el hábito.",
          },
          {
            q: "¿Existe una edición bilingüe?",
            a: "Sí. Hay una edición con inglés y español en la misma página, pensada para familias que crían al niño en dos idiomas.",
          },
        ],
      },
    },
  },
  {
    id: "where-going-max-bilingual",
    author: "ricardo",
    editionLang: "bilingual",
    age: "1-3",
    type: "bilingual",
    series: "little-max",
    size: "8.5 x 11 in",
    cover: "/covers/where-going-max-bilingual.jpg",
    coverSize: { w: 900, h: 1169 },
    pages: 28,
    published: "2024-09-04",
    formats: [
      { kind: "paperback", asin: "1963328876", price: "$12.99" },
      { kind: "kindle", asin: "B0DH3P9ZDR", price: "$2.99" },
    ],
    rating: { value: 4.9, count: 21 },
    showcaseLead: {
      en: "Pages from inside: Max asking the goose for a feather, the sheep for wool and the hen for an egg, each animal on its own spread.",
      es: "Páginas del interior: Max pidiéndole una pluma al ganso, lana a la oveja y un huevo a la gallina, cada animal en su propia doble página.",
    },
    bannerLead: {
      file: "/art/where-going-max-bilingual-header.jpg",
      w: 1940,
      h: 1200,
      alt: {
        en: "Where Are You Going, Little Max? by Ricardo Demi, bilingual stories in English and Spanish for kids, cover with the mouse and the cow",
        es: "¿A dónde vas, pequeño Max? de Ricardo Demi, historias bilingües en inglés y español para bebés, portada con el ratón y la vaca",
      },
    },
    artwork: [
      {
        file: "/art/where-going-max-bilingual-goose.jpg",
        w: 591,
        h: 600,
        alt: {
          en: "An illustration from the book: Max riding on the goose across the pond, with two ducklings and water lilies around them",
          es: "Una ilustración del libro: Max montado en el ganso por el estanque, con dos patitos y nenúfares alrededor",
        },
      },
      {
        file: "/art/where-going-max-bilingual-sheep.jpg",
        w: 591,
        h: 600,
        alt: {
          en: "An illustration from the book: Max thanking the sheep in a meadow of daisies, his cart already full of wool",
          es: "Una ilustración del libro: Max dándole las gracias a la oveja en un prado de margaritas, con el carrito ya lleno de lana",
        },
      },
      {
        file: "/art/where-going-max-bilingual-hen.jpg",
        w: 591,
        h: 600,
        alt: {
          en: "An illustration from the book: Max talking to the hen and her two chicks on the farm path, a basket of eggs beside them",
          es: "Una ilustración del libro: Max hablando con la gallina y sus dos pollitos en el camino de la granja, con una cesta de huevos al lado",
        },
      },
    ],
    banners: [
      {
        file: "/art/where-going-max-bilingual-inside.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Short stories, hand drawn illustrations and happy moments for toddlers: a spread with the English line above and the Spanish line below it",
          es: "Historias cortas, ilustraciones dibujadas a mano y momentos felices: una doble página con la frase en inglés arriba y la misma frase en español debajo",
        },
      },
      {
        file: "/art/where-going-max-bilingual-cow.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "A spread from the book: Max asks the cow for milk and says please, the same words printed in English in black and in Spanish in blue",
          es: "Una doble página del libro: Max le pide leche a la vaca y dice por favor, las mismas palabras impresas en inglés en negro y en español en azul",
        },
      },
      {
        file: "/art/where-going-max-bilingual-gift.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "The perfect gift for your little one: the last page, Max asleep in bed with the book beside him",
          es: "El regalo perfecto para tu pequeño: la última página, Max dormido en la cama con el libro al lado",
        },
      },
    ],
    slug: {
      en: "where-are-you-going-little-max-bilingual-english-spanish",
      es: "a-donde-vas-pequeno-max-bilingue-ingles-espanol",
    },
    copy: {
      en: {
        title: "Where Are You Going, Little Max? Bilingual English and Spanish",
        subtitle: "Bilingual bedtime stories for toddlers ages 1-3, English and Spanish",
        lead:
          "The favorite Little Max stories in English and Spanish at once, with side-by-side text on every page. Simple repetitive phrases help a toddler memorize first words and pick up a second language naturally while reading together. Short stories, bright illustrations and the two languages highlighted in different colors make the book easy to read at bedtime or any time with a parent.",
        inside: [
          "English and Spanish on every page",
          "One or two sentences per language, per page",
          "Same illustrations and same story as the single-language editions",
        ],
        forWhom:
          "Bilingual households, mixed-language families, and anyone raising a child in two languages from the start.",
        faq: [
          {
            q: "Which language comes first on the page?",
            a: "English is set above and Spanish below, in the same size. Neither is treated as the translation of the other.",
          },
          {
            q: "Should I buy this or the two separate books?",
            a: "One bilingual copy is simpler if both languages are spoken in the same home. Two separate books make more sense if the child spends time in two different homes.",
          },
        ],
      },
      es: {
        title: "¿A dónde vas, Pequeño Max? Edición bilingüe inglés y español",
        subtitle: "Cuentos bilingües para dormir, para niños de 1 a 3 años, en inglés y español",
        lead:
          "Las historias favoritas de Pequeño Max en inglés y español a la vez, con el texto uno al lado del otro en cada página. Las frases repetitivas ayudan al pequeño a memorizar sus primeras palabras y a acercarse al segundo idioma de forma natural mientras leen juntos. Las historias cortas, las ilustraciones vivas y los dos idiomas resaltados en diferentes colores hacen que el libro sea cómodo para leer antes de dormir o en cualquier momento con sus padres.",
        inside: [
          "Inglés y español en cada página",
          "Una o dos frases por idioma y por página",
          "Las mismas ilustraciones y la misma historia que las ediciones en un solo idioma",
        ],
        forWhom:
          "Hogares bilingües, familias de idiomas mezclados y quien cría a un niño en dos lenguas desde el principio.",
        faq: [
          {
            q: "¿Qué idioma va primero en la página?",
            a: "El inglés arriba y el español debajo, del mismo tamaño. Ninguno se trata como traducción del otro.",
          },
          {
            q: "¿Compro este o los dos libros por separado?",
            a: "Un ejemplar bilingüe es más sencillo si en casa se hablan los dos idiomas. Dos libros separados tienen más sentido si el niño pasa tiempo en dos casas distintas.",
          },
        ],
      },
    },
  },

  /* ===== Сказки на ночь: Где ты был, малыш Макс ===== */
  {
    id: "where-been-max-en",
    author: "ricardo",
    editionLang: "en",
    age: "1-3",
    type: "bedtime",
    series: "little-max",
    pairId: "where-been-max-es",
    pages: 52,
    published: "2024-09-03",
    size: "8.5 x 8.5 in",
    cover: "/covers/where-been-max-en.jpg",
    coverSize: { w: 900, h: 907 },
    formats: [
      { kind: "paperback", asin: "1963328582", price: "$12.99" },
      { kind: "kindle", asin: "B0DH3JSFF3", price: "$2.99" },
    ],
    rating: { value: 4.9, count: 9 },
    showcaseLead: {
      en: "Four places Max has been, and what he saw in each one: squirrels in the park, a steamboat out at sea, and a pony ride at the fair.",
    },
    bannerLead: {
      file: "/art/where-been-max-header.jpg",
      w: 1940,
      h: 600,
      alt: {
        en: "Where Have You Been, Little Max? by Ricardo Demi, bedtime stories for toddlers 1 to 3, cover with Max the mouse holding cotton candy",
      },
    },
    artwork: [
      {
        file: "/art/where-been-max-squirrels.jpg",
        w: 591,
        h: 600,
        alt: {
          en: "In the park: three red squirrels in an oak tree with soap bubbles floating past",
        },
      },
      {
        file: "/art/where-been-max-boat.jpg",
        w: 591,
        h: 600,
        alt: {
          en: "At the beach: a smiling steamboat sailing past an island, with seagulls and a hot air balloon",
        },
      },
      {
        file: "/art/where-been-max-pony.jpg",
        w: 591,
        h: 600,
        alt: {
          en: "At the fair: Max the mouse riding a pony past the striped tent",
        },
      },
    ],
    banners: [
      {
        file: "/art/where-been-max-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "A spread from the book: Max photographs a lion, a monkey and a giraffe at the zoo, with short hand lettered text on the left page",
        },
      },
      {
        file: "/art/where-been-max-scenes.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Three more spreads: an elephant showering Max with its trunk, dolphins watching him build a sand castle, and Max waving goodbye at the fair",
        },
      },
      {
        file: "/art/where-been-max-learning.jpg",
        w: 1940,
        h: 600,
        alt: {
          en: "What the stories give a toddler: new words, simple tasks, imagination, a picture of the world around them",
        },
      },
    ],
    slug: { en: "where-have-you-been-little-max-bedtime-stories-toddlers" },
    copy: {
      en: {
        title: "Where Have You Been, Little Max?",
        subtitle: "Bedtime stories for toddlers ages 1-3, new adventures",
        lead:
          "Short bedtime stories for toddlers ages 1 to 3 about Little Max's new discoveries. Along with him a child goes to the zoo, to the beach, to the fair and on a picnic in the park, and meets animals, sea creatures, new places and new words. Simple stories and colorful illustrations build curiosity, widen a child's vocabulary and help them make sense of the world around them.",
        inside: [
          "Four short stories: the zoo, the beach, the fair, the park",
          "Simple words and one thing happening per page, so a toddler keeps the thread",
          "Hand drawn illustrations on every spread, something to look at while listening",
          "Animals named as they appear: lion, giraffe, elephant, zebra, parrot, dolphins, squirrels",
          "52 pages, 8.5 x 8.5 inches",
          "Finalist in the Bedtime Stories category, Children's Book International Awards 2025",
        ],
        forWhom:
          "Ages 1 to 3, read aloud at bedtime. And for children who already know Max from Where Are You Going, Little Max? This is the second book about him, though the two can be read in either order.",
        faq: [
          {
            q: "Do I need the first book to understand this one?",
            a: "No. Each book stands on its own. Together they work better, because the child already knows Max and recognizes him.",
          },
          {
            q: "How long does it take to read aloud?",
            a: "One story takes two to three minutes at a toddler's pace. The whole book takes about ten.",
          },
          {
            q: "What does the child come away with?",
            a: "The names of animals they meet in the stories, and four familiar places described in words a one year old can follow: the zoo, the beach, the fair and the park.",
          },
        ],
      },
    },
  },
  {
    id: "where-been-max-es",
    author: "ricardo",
    editionLang: "es",
    age: "1-3",
    type: "bedtime",
    series: "little-max",
    pairId: "where-been-max-en",
    pages: 52,
    published: "2024-09-14",
    size: "21.6 x 21.6 cm",
    cover: "/covers/where-been-max-es.jpg",
    coverSize: { w: 900, h: 907 },
    formats: [
      { kind: "paperback", asin: "196332868X", price: "$12.99" },
      { kind: "kindle", asin: "B0DH3SBLWJ", price: "$2.99" },
    ],
    rating: { value: 5.0, count: 4 },
    showcaseLead: {
      es: "Cuatro sitios donde ha estado Max y lo que vio en cada uno: las ardillas del parque, un barco de vapor en el mar y un paseo a caballo en el mercadillo.",
    },
    bannerLead: {
      file: "/art/where-been-max-es-header.jpg",
      w: 1940,
      h: 600,
      alt: {
        es: "¿Dónde Has Estado, Pequeño Max? de Ricardo Demi, cuentos para dormir para niños de 1 a 3 años, portada con el ratoncito Max y un algodón de azúcar",
      },
    },
    artwork: [
      {
        file: "/art/where-been-max-squirrels.jpg",
        w: 591,
        h: 600,
        alt: {
          es: "En el parque: tres ardillas en un roble entre pompas de jabón",
        },
      },
      {
        file: "/art/where-been-max-boat.jpg",
        w: 591,
        h: 600,
        alt: {
          es: "En la playa: un barco de vapor sonriente pasa junto a una isla, con gaviotas y un globo aerostático",
        },
      },
      {
        file: "/art/where-been-max-pony.jpg",
        w: 591,
        h: 600,
        alt: {
          es: "En el mercadillo: el ratoncito Max montado a caballo delante de la carpa de rayas",
        },
      },
    ],
    banners: [
      {
        file: "/art/where-been-max-es-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Una página doble del libro: Max fotografía a un león, un mono y una jirafa en el zoológico, con un texto corto en la página de la izquierda",
        },
      },
      {
        file: "/art/where-been-max-es-scenes.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Tres páginas dobles más: un elefante que ducha a Max con la trompa, los delfines que miran su castillo de arena y Max diciendo adiós en el mercadillo",
        },
      },
      {
        file: "/art/where-been-max-es-learning.jpg",
        w: 1940,
        h: 600,
        alt: {
          es: "Lo que estas historias dan al niño: vocabulario nuevo, tareas simples, imaginación y comprensión del mundo que lo rodea",
        },
      },
    ],
    slug: { es: "donde-has-estado-pequeno-max-cuentos-para-dormir-ninos" },
    copy: {
      es: {
        title: "¿Dónde Has Estado, Pequeño Max?",
        subtitle: "Cuentos para dormir para niños de 1 a 3 años, nuevas historias",
        lead:
          "Cuentos cortos para la hora de dormir, para niños de 1 a 3 años, sobre los nuevos descubrimientos de Pequeño Max. Junto a él, el niño va al zoológico, a la playa, a la feria y de picnic al parque, y conoce animales, criaturas del mar, lugares nuevos y palabras nuevas. Las historias simples y las ilustraciones llenas de color despiertan la curiosidad, amplían el vocabulario y ayudan a descubrir el mundo que le rodea.",
        inside: [
          "Cuatro historias cortas: el zoológico, la playa, el mercadillo y el parque",
          "Palabras sencillas y una sola cosa por página, para que el niño no pierda el hilo",
          "Ilustraciones dibujadas a mano en cada página doble, algo que mirar mientras escucha",
          "Los animales aparecen con su nombre: león, jirafa, elefante, cebra, loro, delfines, ardillas",
          "52 páginas, 21.6 x 21.6 cm",
          "Finalista en la categoría Cuentos para dormir de los Children's Book International Awards 2025",
        ],
        forWhom:
          "De 1 a 3 años, para leer en voz alta antes de dormir. Y para los niños que ya conocen a Max por ¿A dónde vas, Pequeño Max? Este es el segundo libro sobre él, aunque se pueden leer en cualquier orden.",
        faq: [
          {
            q: "¿Necesito el primer libro para entender este?",
            a: "No. Cada libro se sostiene solo. Juntos funcionan mejor, porque el niño ya conoce a Max y lo reconoce.",
          },
          {
            q: "¿Cuánto se tarda en leerlo en voz alta?",
            a: "Una historia son dos o tres minutos al ritmo de un niño pequeño. El libro entero, unos diez.",
          },
          {
            q: "¿Qué se lleva el niño?",
            a: "Los nombres de los animales que aparecen en las historias y cuatro sitios conocidos contados con palabras que entiende un niño de un año: el zoológico, la playa, el mercadillo y el parque.",
          },
        ],
      },
    },
  },

  /* ===== Пошаговое рисование 111 ===== */
  {
    id: "how-to-draw-111-en",
    author: "ricardo",
    editionLang: "en",
    age: "5-7",
    type: "drawing",
    pairId: "how-to-draw-111-es",
    drawings: 111,
    ageShown: "5-10",
    alsoAges: ["7-10"],
    pages: 231,
    published: "2024-04-23",
    size: "8.5 x 11 in",
    cover: "/covers/how-to-draw-111-en.jpg",
    coverSize: { w: 900, h: 1165 },
    formats: [
      { kind: "paperback", asin: "1963328140", price: "$14.99" },
      { kind: "kindle", asin: "B0DCQC5T9T", price: "$3.00" },
    ],
    rating: { value: 4.9, count: 36 },
    showcaseLead: {
      en: "Three things worth seeing before you buy: how a drawing is broken down into shapes a child can copy, the blank space next to it where they try it themselves, and what the finished picture looks like once it is colored.",
    },
    bannerLead: {
      file: "/art/how-to-draw-111-header.png",
      w: 1940,
      h: 601,
      alt: {
        en: "How to Draw 111 by Ricardo Demi, the magic of creativity for kids, cover with step by step drawings and colored pencils",
      },
    },
    artwork: [
      {
        file: "/art/how-to-draw-111-steps.png",
        w: 600,
        h: 601,
        alt: {
          en: "Easy step by step: a teddy bear built up one simple shape at a time, starting from two circles",
        },
      },
      {
        file: "/art/how-to-draw-111-practice.png",
        w: 600,
        h: 601,
        alt: {
          en: "Space for practice: a baby seal outline with room beside it for the child to draw their own",
        },
      },
      {
        file: "/art/how-to-draw-111-results.png",
        w: 600,
        h: 601,
        alt: {
          en: "Excellent results: a monkey and a rose from the book, finished and colored in",
        },
      },
    ],
    banners: [
      {
        file: "/art/how-to-draw-111-gift.png",
        w: 1940,
        h: 601,
        alt: {
          en: "The perfect gift for beginner artists, a wrapped present and colored pencils",
        },
      },
    ],
    slug: { en: "how-to-draw-111-easy-step-by-step-drawings-for-kids" },
    copy: {
      en: {
        title: "How to Draw 111 Animals and Characters, Step by Step",
        subtitle: "Children draw it themselves, step by step, right in the book",
        lead:
          "A guide made by professionals for children. Every drawing is broken down into six steps, usually, and not one step more: the child repeats them and gets there alone. Then traces the dotted outline, with enough room beside it to try twice.\n\nNothing gets lost or scattered across loose sheets. It all stays in one book, which can be signed and taken out years later to see how they started.",
        inside: [
          "Two full spreads for every drawing",
          "231 pages, no extra paper needed",
          "111 drawings: animals, fairy-tale characters, flowers, food",
          "Each step adds one shape, the previous step stays gray",
          "A fun fact about every character",
          "Drawings can be colored in once they are finished",
          "Finalist in the Educational category, Children's Book International Awards 2025",
          "8.5 x 11 inches",
        ],
        forWhom:
          "Ages 5 to 10, depending on the child: one starts at six, another only wants to at nine, and the book works for both. For children who say they cannot draw, for teachers who need a quiet independent activity, and for adults learning alongside them.",
        faq: [
          {
            q: "Does a child need help from an adult?",
            a: "No, and that is deliberate. The steps are visual, so a child who cannot read yet can still follow them.",
          },
          {
            q: "How is this different from How to Draw Everything?",
            a: "This is the larger book with 111 subjects and more detail per drawing. How to Draw Everything is a shorter, simpler and cheaper introduction to the same method.",
          },
          {
            q: "Does the child need a separate sketchbook?",
            a: "No, and that is deliberate. Each drawing has its own practice page inside the book, so the finished attempts stay together in order instead of ending up on loose sheets that get thrown out.",
          },
        ],
      },
    },
  },
  {
    id: "how-to-draw-111-es",
    author: "ricardo",
    editionLang: "es",
    age: "5-7",
    type: "drawing",
    pairId: "how-to-draw-111-en",
    drawings: 111,
    ageShown: "5-10",
    alsoAges: ["7-10"],
    pages: 231,
    published: "2024-05-03",
    size: "21.6 x 27.9 cm",
    cover: "/covers/how-to-draw-111-es.jpg",
    coverSize: { w: 900, h: 1157 },
    formats: [
      { kind: "paperback", asin: "1963328175", price: "$14.99" },
      { kind: "kindle", asin: "B0DCR4W3YB", price: "$3.00" },
    ],
    rating: { value: 5.0, count: 16 },
    showcaseLead: {
      es: "Tres cosas que conviene ver antes de comprar: cómo se descompone un dibujo en formas que el niño puede copiar, el espacio en blanco de al lado donde lo intenta él mismo, y qué aspecto tiene el dibujo terminado una vez coloreado.",
    },
    bannerLead: {
      file: "/art/how-to-draw-111-es-header.png",
      w: 1941,
      h: 601,
      alt: {
        es: "Cómo Dibujar 111 de Ricardo Demi, la magia de la creatividad para niños, portada con dibujos paso a paso y lápices de colores",
      },
    },
    artwork: [
      {
        file: "/art/how-to-draw-111-es-steps.png",
        w: 601,
        h: 601,
        alt: {
          es: "Fácil paso a paso: un osito que se construye forma a forma, empezando por dos círculos",
        },
      },
      {
        file: "/art/how-to-draw-111-es-practice.png",
        w: 601,
        h: 601,
        alt: {
          es: "Espacio para practicar: una foca de contorno con sitio al lado para que el niño dibuje la suya",
        },
      },
      {
        file: "/art/how-to-draw-111-es-results.png",
        w: 601,
        h: 601,
        alt: {
          es: "Excelentes resultados: un mono y una rosa del libro, terminados y coloreados",
        },
      },
    ],
    banners: [
      {
        file: "/art/how-to-draw-111-es-gift.png",
        w: 1941,
        h: 601,
        alt: {
          es: "El regalo perfecto para artistas principiantes, un regalo y lápices de colores",
        },
      },
    ],
    slug: { es: "como-dibujar-111-dibujos-faciles-paso-a-paso-para-ninos" },
    copy: {
      es: {
        title: "Cómo Dibujar 111 Animales y Personajes, Paso a Paso",
        subtitle: "El niño dibuja solo, paso a paso, en el propio libro",
        lead:
          "Una guía profesional de dibujo hecha para niños. Cada dibujo se divide normalmente en seis pasos, ni uno más: el niño los repite y llega al resultado por su cuenta. Después repasa la línea punteada, y al lado tiene tanto sitio que puede intentarlo dos veces.\n\nNada se pierde ni acaba en hojas sueltas. Todo se queda en un mismo libro, que se puede firmar y sacar años después para ver cómo empezó.",
        inside: [
          "Dos páginas dobles por cada dibujo",
          "231 páginas, no hace falta papel aparte",
          "111 dibujos: animales, personajes de cuentos, flores, alimentos",
          "Cada paso añade una forma, el paso anterior queda en gris",
          "Un dato curioso sobre cada personaje",
          "Los dibujos se pueden colorear una vez terminados",
          "Finalista en la categoría Educativa de los Children's Book International Awards 2025",
          "21.6 x 27.9 cm",
        ],
        forWhom:
          "De 5 a 10 años, según el niño: uno empieza a los seis y otro solo quiere a los nueve, y el libro sirve para los dos. Para quien dice que no sabe dibujar, para maestros que necesitan una actividad tranquila e independiente, y para adultos que aprenden junto a ellos.",
        faq: [
          {
            q: "¿Necesita ayuda de un adulto?",
            a: "No, y es intencionado. Los pasos son visuales, así que un niño que todavía no lee puede seguirlos igual.",
          },
          {
            q: "¿En qué se diferencia de Cómo Dibujar Todo?",
            a: "Este es el libro grande, con 111 temas y más detalle por dibujo. Cómo Dibujar Todo es una introducción más corta, más simple y más barata al mismo método.",
          },
          {
            q: "¿Hace falta un cuaderno aparte?",
            a: "No, y es intencionado. Cada dibujo tiene dentro su propia página de práctica, así los intentos terminados se quedan juntos y en orden, en vez de acabar en hojas sueltas que se tiran.",
          },
        ],
      },
    },
  },

  /* ===== Пошаговое рисование, короткая версия ===== */
  {
    id: "how-to-draw-everything-en",
    author: "ricardo",
    editionLang: "en",
    age: "5-7",
    type: "drawing",
    pairId: "how-to-draw-everything-es",
    drawings: 111,
    ageShown: "5-8",
    alsoAges: ["7-10"],
    pages: 104,
    published: "2024-08-12",
    size: "8.5 x 11 in",
    cover: "/covers/how-to-draw-everything-en.jpg",
    coverSize: { w: 900, h: 1164 },
    formats: [{ kind: "paperback", asin: "1963328728", price: "$7.99" }],
    pdfUrl: WIX + "копия-копия-шаблон-книги",
    rating: { value: 5.0, count: 1 },
    showcaseLead: {
      en: "How one drawing is built up step by step, the space for practice beside it, and what the finished drawings look like colored in.",
    },
    bannerLead: {
      file: "/art/how-to-draw-everything-header.jpg",
      w: 1940,
      h: 600,
      alt: {
        en: "How to Draw Everything by Ricardo Demi, the magic of creativity for kids, cover with 111 easy step by step drawings",
      },
    },
    artwork: [
      {
        file: "/art/how-to-draw-everything-steps.jpg",
        w: 600,
        h: 600,
        alt: {
          en: "Easy step by step: a chick drawn in five steps, starting from one simple shape",
        },
      },
      {
        file: "/art/how-to-draw-everything-practice.jpg",
        w: 600,
        h: 600,
        alt: {
          en: "Space for practice: a squirrel outline with room beside it for the child to draw their own",
        },
      },
      {
        file: "/art/how-to-draw-everything-results.jpg",
        w: 600,
        h: 600,
        alt: {
          en: "Excellent results: a gift box, an ice cream cone and a strawberry from the book, finished and colored in",
        },
      },
    ],
    banners: [
      {
        file: "/art/how-to-draw-everything-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "A spread from the book: a dog and a snail step by step, with a dotted outline to trace at the bottom of each page",
        },
      },
      {
        file: "/art/how-to-draw-everything-drawings.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "111 cute drawings: butterfly, tree, bird, sailboat, shorts, umbrella, hat, hen, pillow, pie",
        },
      },
      {
        file: "/art/how-to-draw-everything-gift.jpg",
        w: 1940,
        h: 600,
        alt: {
          en: "The perfect gift for beginner artists, a frosted donut and paper flags",
        },
      },
    ],
    slug: { en: "how-to-draw-everything-easy-drawings-for-kids" },
    copy: {
      en: {
        title: "How to Draw Everything: Easy Step-by-Step Drawings for Kids",
        subtitle: "Can you learn to draw easily? Sure, you can!",
        lead:
          "Learning to draw is easy when the guide is clear. Every drawing here is broken into a few simple steps, and there are two ways to practice right on the page: trace the dotted outline, then draw your own beside it.\n\nNo extra paper needed, and the finished drawing can be colored in.",
        inside: [
          "111 cute drawings: animals, flowers, foods, gifts and more",
          "Two kinds of practice for every drawing",
          "Large drawings and simple steps, a teaching method recommended by real artists",
          "A fun fact about each character",
          "104 pages, 8.5 x 11 inches",
        ],
        forWhom:
          "Ages 5 and up. For beginner artists and their teachers, and for anyone who wants to draw. An easy gift for a birthday or a holiday.",
        faq: [
          {
            q: "How is this different from How to Draw 111?",
            a: "Same method and the same kinds of subjects. This one is shorter, 104 pages instead of 231, and costs half as much.",
          },
          {
            q: "Does the child need an adult nearby?",
            a: "No. The steps are shown in pictures, so a child who cannot read yet can follow them.",
          },
          faqPaperOrDigital.en,
        ],
      },
    },
  },
  {
    id: "how-to-draw-everything-es",
    author: "ricardo",
    editionLang: "es",
    age: "5-7",
    type: "drawing",
    pairId: "how-to-draw-everything-en",
    drawings: 111,
    ageShown: "5-8",
    alsoAges: ["7-10"],
    pages: 104,
    published: "2024-08-29",
    size: "21.6 x 27.9 cm",
    cover: "/covers/how-to-draw-everything-es.jpg",
    coverSize: { w: 900, h: 1164 },
    formats: [{ kind: "paperback", asin: "1963328752", price: "$7.99" }],
    pdfUrl: WIX + "копия-копия-копия-шаблон-книги",
    showcaseLead: {
      es: "Cómo se construye un dibujo paso a paso, el espacio para practicar que hay al lado y qué aspecto tienen los dibujos ya coloreados.",
    },
    bannerLead: {
      file: "/art/how-to-draw-everything-es-header.jpg",
      w: 1940,
      h: 600,
      alt: {
        es: "Cómo Dibujar Todo de Ricardo Demi, la magia de la creatividad para niños, portada con 111 dibujos fáciles paso a paso",
      },
    },
    artwork: [
      {
        file: "/art/how-to-draw-everything-es-steps.jpg",
        w: 600,
        h: 600,
        alt: {
          es: "Fácil paso a paso: un pollito dibujado en cinco pasos, a partir de una forma sencilla",
        },
      },
      {
        file: "/art/how-to-draw-everything-es-practice.jpg",
        w: 600,
        h: 600,
        alt: {
          es: "Espacio para practicar: una ardilla de contorno con sitio al lado para que el niño dibuje la suya",
        },
      },
      {
        file: "/art/how-to-draw-everything-es-results.jpg",
        w: 600,
        h: 600,
        alt: {
          es: "Excelentes resultados: un regalo, un helado y una fresa del libro, terminados y coloreados",
        },
      },
    ],
    banners: [
      {
        file: "/art/how-to-draw-everything-es-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Una página doble del libro: un perro y un caracol paso a paso, con un contorno de puntos para repasar al final de cada página",
        },
      },
      {
        file: "/art/how-to-draw-everything-es-drawings.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "111 dibujos lindos: mariposa, árbol, pájaro, velero, pantalones, paraguas, gorro, gallina, almohada, tarta",
        },
      },
      {
        file: "/art/how-to-draw-everything-es-gift.jpg",
        w: 1940,
        h: 600,
        alt: {
          es: "El regalo perfecto para artistas principiantes, un donut glaseado y banderines",
        },
      },
    ],
    slug: { es: "como-dibujar-todo-dibujos-faciles-paso-a-paso-ninos" },
    copy: {
      es: {
        title: "Cómo Dibujar Todo: Dibujos Fáciles Paso a Paso para Niños",
        subtitle: "¿Es posible aprender a dibujar fácilmente? ¡Por supuesto!",
        lead:
          "Aprender a dibujar es fácil cuando el manual se entiende. Aquí cada dibujo se divide en unos pocos pasos sencillos, y hay dos formas de practicar en la misma página: repasar el contorno de puntos y dibujar el tuyo al lado.\n\nNo hace falta papel aparte, y el dibujo terminado se puede colorear.",
        inside: [
          "111 dibujos adorables: animales, flores, alimentos, regalos y más",
          "Dos tipos de práctica para cada dibujo",
          "Dibujos grandes y pasos sencillos, un método de enseñanza recomendado por verdaderos artistas",
          "Mucho espacio para practicar",
          "104 páginas, 21.6 x 27.9 cm",
        ],
        forWhom:
          "A partir de 5 años. Para artistas principiantes y sus maestros, y para cualquiera que quiera dibujar. Un buen regalo de cumpleaños o de fiestas.",
        faq: [
          {
            q: "¿En qué se diferencia de Cómo Dibujar 111?",
            a: "Mismo método y el mismo tipo de temas. Este es más corto, 104 páginas en vez de 231, y cuesta la mitad.",
          },
          {
            q: "¿Hace falta un adulto al lado?",
            a: "No. Los pasos se muestran con dibujos, así que un niño que todavía no lee puede seguirlos.",
          },
          faqPaperOrDigital.es,
        ],
      },
    },
  },

  /* ===== Directed Drawing K-2: тетради для американских учителей =====

     Четыре тетради, два тома в двух изданиях. На бумаге они не выходили
     и на Amazon их нет: это рабочие листы, которые учитель печатает сам.
     Поэтому кнопка покупки здесь одна, наша.

     Испанские тома стоят в английском каталоге намеренно. Это тетради
     для американского класса, где учат испанские слова: страница для
     учителя написана по-английски, а задания и слова внутри испанские.
     Испаноязычному родителю такая книга не адресована. */
  {
    id: "directed-drawing-k2-en",
    author: "ricardo",
    editionLang: "en",
    age: "5-7",
    type: "drawing",
    series: "directed-drawing-k2",
    pairId: "directed-drawing-k2-es",
    drawings: 55,
    ageShown: "5-8",
    pages: 58,
    size: "8.5 x 11 in",
    cover: "/covers/directed-drawing-k2-en.jpg",
    coverSize: { w: 900, h: 900 },
    formats: [],
    slug: { en: "directed-drawing-worksheets-grades-k-2" },
    copy: {
      en: {
        title: "Directed Drawing Worksheets for Grades K-2: Draw, Trace, Write",
        subtitle: "55 no-prep activities. Choose a page, print, and go.",
        lead:
          "Four stages on one page. The student follows six numbered steps to build the drawing, traces the finished outline, draws it independently in the open box, then traces and writes the word on primary ruled lines.\n\nNothing to cut, glue, or prepare. Every activity is one black-and-white page that prints on a classroom copier.",
        inside: [
          "55 full-page activities: animals, sea life, fantasy, vehicles, sports and hobbies, everyday things, nature, food",
          "Six numbered steps, a dotted outline to trace, an open box to draw in, and ruled lines for the word",
          "A teacher page explaining how the activities work and an illustrated table of contents",
          "Small themed pictures on every page for early finishers to color",
          "58 pages, black and white, US Letter and A4 both included",
        ],
        forWhom:
          "Kindergarten, first and second grade, ages 5 to 8. For classroom teachers, art and sub folders, homeschool, morning work, centers, and early finishers.",
        faq: [
          {
            q: "Is this a printed book or a download?",
            a: "A download. You get one PDF that you print yourself, as many copies as your class needs. There is no paperback edition.",
          },
          {
            q: "Which paper size do I get?",
            a: "Both. You choose US Letter or A4 at checkout, and the file is laid out for that size.",
          },
          {
            q: "Can I print copies for my whole class?",
            a: "Yes. One purchase covers one teacher and that teacher's students. A separate copy is needed for each additional teacher.",
          },
          {
            q: "How is this different from Volume 2?",
            a: "Same format and the same page layout, different subjects. Volume 1 opens with zoo and safari animals, Volume 2 with forest and farm animals and adds a bugs section.",
          },
          {
            q: "Do students need to read to use it?",
            a: "No. The steps are shown in pictures. The word at the bottom is traced first and written second, so a beginning writer can do the page independently.",
          },
        ],
      },
    },
  },
  {
    id: "directed-drawing-k2-es",
    author: "ricardo",
    editionLang: "es",
    age: "5-7",
    type: "drawing",
    series: "directed-drawing-k2",
    pairId: "directed-drawing-k2-en",
    drawings: 55,
    ageShown: "5-8",
    pages: 58,
    size: "8.5 x 11 in",
    cover: "/covers/directed-drawing-k2-es.jpg",
    coverSize: { w: 900, h: 900 },
    formats: [],
    slug: { en: "spanish-directed-drawing-worksheets-grades-k-2" },
    copy: {
      en: {
        title: "Spanish Directed Drawing Worksheets for Grades K-2: Dibujo Dirigido",
        subtitle: "55 no-prep activities. Every word is written in Spanish.",
        lead:
          "The same four stages as our English set, with the vocabulary in Spanish. The student follows six numbered steps, traces the outline, draws independently, then traces and writes the Spanish word on primary ruled lines.\n\nBuilt for Spanish class, dual language and bilingual classrooms. The teacher page is in English so you can hand the set to any colleague; every student instruction and every word on the activity pages is in Spanish.",
        inside: [
          "55 full-page activities: animales, vida marina, fantasía, vehículos, deportes, objetos, naturaleza, comida",
          "Six numbered steps, a dotted outline to trace, an open box to draw in, and ruled lines for the Spanish word",
          "Student instructions in Spanish on every page",
          "A teacher page in English and an illustrated table of contents",
          "58 pages, black and white, US Letter and A4 both included",
        ],
        forWhom:
          "Spanish class, dual language and bilingual classrooms, kindergarten through second grade, ages 5 to 8. Also for Spanish-speaking families teaching writing at home.",
        faq: [
          {
            q: "Are the drawings the same as in the English set?",
            a: "Yes. Same 55 drawings and the same page layout. Only the language of the words and instructions is different.",
          },
          {
            q: "Is this a bilingual resource?",
            a: "No. Each set is in one language. The activity pages here are entirely in Spanish; the English edition is sold separately.",
          },
          {
            q: "Is this a printed book or a download?",
            a: "A download. You get one PDF that you print yourself, as many copies as your class needs.",
          },
          {
            q: "Which paper size do I get?",
            a: "Both. You choose US Letter or A4 at checkout, and the file is laid out for that size.",
          },
          {
            q: "Can I print copies for my whole class?",
            a: "Yes. One purchase covers one teacher and that teacher's students. A separate copy is needed for each additional teacher.",
          },
        ],
      },
    },
  },
  {
    id: "directed-drawing-k2-2-en",
    author: "ricardo",
    editionLang: "en",
    age: "5-7",
    type: "drawing",
    series: "directed-drawing-k2",
    pairId: "directed-drawing-k2-2-es",
    drawings: 56,
    ageShown: "5-8",
    pages: 59,
    size: "8.5 x 11 in",
    cover: "/covers/directed-drawing-k2-2-en.jpg",
    coverSize: { w: 900, h: 900 },
    formats: [],
    slug: { en: "directed-drawing-worksheets-grades-k-2-volume-2" },
    copy: {
      en: {
        title: "Directed Drawing Worksheets for Grades K-2, Volume 2: Draw, Trace, Write",
        subtitle: "55 no-prep activities plus a bonus page. All new subjects.",
        lead:
          "A second full year of directed drawing in the same format: follow six numbered steps, trace the outline, draw it independently, then trace and write the word.\n\nEvery subject is new. Volume 2 starts with forest and farm animals and adds a bugs and little creatures section that the first set does not have.",
        inside: [
          "56 full-page activities: animals, bugs and little creatures, sea life, fantasy, vehicles, sports and hobbies, things, nature, food",
          "Six numbered steps, a dotted outline to trace, an open box to draw in, and ruled lines for the word",
          "A teacher page explaining how the activities work and an illustrated table of contents",
          "Small themed pictures on every page for early finishers to color",
          "59 pages, black and white, US Letter and A4 both included",
        ],
        forWhom:
          "Kindergarten, first and second grade, ages 5 to 8. For teachers who have finished Volume 1 and for anyone starting here.",
        faq: [
          {
            q: "Do the subjects repeat from Volume 1?",
            a: "No. All 56 subjects are new. The two sets together give a teacher 111 activities.",
          },
          {
            q: "Do I need Volume 1 first?",
            a: "No. Each set stands on its own and the page format is identical.",
          },
          {
            q: "Is this a printed book or a download?",
            a: "A download. You get one PDF that you print yourself, as many copies as your class needs.",
          },
          {
            q: "Which paper size do I get?",
            a: "Both. You choose US Letter or A4 at checkout, and the file is laid out for that size.",
          },
          {
            q: "Can I print copies for my whole class?",
            a: "Yes. One purchase covers one teacher and that teacher's students. A separate copy is needed for each additional teacher.",
          },
        ],
      },
    },
  },
  {
    id: "directed-drawing-k2-2-es",
    author: "ricardo",
    editionLang: "es",
    age: "5-7",
    type: "drawing",
    series: "directed-drawing-k2",
    pairId: "directed-drawing-k2-2-en",
    drawings: 56,
    ageShown: "5-8",
    pages: 59,
    size: "8.5 x 11 in",
    cover: "/covers/directed-drawing-k2-2-es.jpg",
    coverSize: { w: 900, h: 900 },
    formats: [],
    slug: { en: "spanish-directed-drawing-worksheets-grades-k-2-volume-2" },
    copy: {
      en: {
        title: "Spanish Directed Drawing Worksheets for Grades K-2, Volume 2: Dibujo Dirigido",
        subtitle: "55 no-prep activities plus a bonus page, all in Spanish.",
        lead:
          "A second set of Spanish vocabulary activities in the same four-stage format: follow the steps, trace, draw independently, then trace and write the Spanish word.\n\nAll 56 subjects are new, including a bugs and little creatures section that the first set does not have.",
        inside: [
          "56 full-page activities: animales, insectos, vida marina, fantasía, vehículos, deportes, objetos, naturaleza, comida",
          "Six numbered steps, a dotted outline to trace, an open box to draw in, and ruled lines for the Spanish word",
          "Student instructions in Spanish on every page",
          "A teacher page in English and an illustrated table of contents",
          "59 pages, black and white, US Letter and A4 both included",
        ],
        forWhom:
          "Spanish class, dual language and bilingual classrooms, kindergarten through second grade, ages 5 to 8.",
        faq: [
          {
            q: "Do the subjects repeat from Volume 1?",
            a: "No. All 56 subjects are new. The two Spanish sets together give a teacher 111 activities.",
          },
          {
            q: "Are the drawings the same as in the English Volume 2?",
            a: "Yes. Same 56 drawings and the same page layout. Only the language of the words and instructions is different.",
          },
          {
            q: "Is this a bilingual resource?",
            a: "No. The activity pages here are entirely in Spanish; the English edition is sold separately.",
          },
          {
            q: "Is this a printed book or a download?",
            a: "A download. You get one PDF that you print yourself, as many copies as your class needs.",
          },
          {
            q: "Which paper size do I get?",
            a: "Both. You choose US Letter or A4 at checkout, and the file is laid out for that size.",
          },
        ],
      },
    },
  },

  /* ===== Лаки Рокки: Дружба ===== */
  {
    id: "lucky-rocky-friendship-en",
    author: "ricardo",
    editionLang: "en",
    age: "3-5",
    type: "bedtime",
    series: "lucky-rocky",
    pairId: "lucky-rocky-friendship-es",
    ageShown: "3-8",
    alsoAges: ["5-7"],
    pages: 40,
    published: "2024-04-21",
    size: "8.5 x 11 in",
    cover: "/covers/lucky-rocky-friendship-en.jpg",
    coverSize: { w: 900, h: 1160 },
    showcaseLead: {
      en: "Characters from the stories: the bee with her honey buckets, Granny Owl opening her door in the rain, and Little Max the mouse in his captain's cap.",
    },
    bannerLead: {
      file: "/art/rocky-friendship-en-slogan.jpg",
      w: 1920,
      h: 600,
      alt: {
        en: "Discoveries that help kids: The Adventures of Lucky Rocky, The Magic of Friendship, illustrated short stories for children ages 3 and up",
      },
    },
    artwork: [
      {
        file: "/art/rocky-friendship-en-bee.jpg",
        w: 600,
        h: 600,
        alt: { en: "A bee carrying two small buckets of honey across a flower meadow, an illustration from The Magic of Friendship" },
      },
      {
        file: "/art/rocky-friendship-en-owl.jpg",
        w: 600,
        h: 600,
        alt: { en: "Granny Owl in glasses opens her door with a lantern to let Rocky in out of the rain" },
      },
      {
        file: "/art/rocky-friendship-en-mouse.jpg",
        w: 600,
        h: 600,
        alt: { en: "Little Max the mouse in a sailor shirt and captain's cap holding on to a leafy branch" },
      },
    ],
    banners: [
      {
        file: "/art/rocky-friendship-en-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "A spread from the book: large print on the left page, a full color illustration of Rocky, Penny and Brisket meeting Little Max on the right",
        },
      },
      {
        file: "/art/rocky-friendship-en-scenes.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Scenes from the stories: the mouse sailing a paper boat, a beehive on a branch, jars of honey, Grandpa Jose looking for his glasses, the village shop and a beaver by his house",
        },
      },
      {
        file: "/art/rocky-friendship-en-themes.jpg",
        w: 1920,
        h: 600,
        alt: { en: "Kindness, friendship, curiosity, respect and creativity: what the Lucky Rocky stories are about" },
      },
    ],
    formats: [
      { kind: "paperback", asin: "1963328019", price: "$13.99" },
      { kind: "kindle", asin: "B0D2M74DG8", price: "$3.00" },
    ],
    rating: { value: 5.0, count: 22 },
    slug: { en: "adventures-of-lucky-rocky-magic-of-friendship-stories-kids" },
    copy: {
      en: {
        title: "The Adventures of Lucky Rocky: The Magic of Friendship",
        subtitle: "Short bedtime stories for children ages 3-8",
        lead:
          "Warm, gentle stories about Rocky the puppy for a cozy evening read before sleep. This is the first book of Rocky's adventures. Children ages 3 to 5 enjoy it read aloud with a parent, and the large, simple text helps children ages 6 to 8 take their first steps in reading on their own. Rocky's cheerful adventures are about friendship, kindness and curiosity.",
        inside: [
          "Short stories, each one read in a single sitting",
          "Beautiful hand drawn illustrations that capture attention",
          "Simple sentences printed in large font for easy reading",
          "The basics of friendship, kindness, mutual assistance and respect, taught in a fun and easy way",
          "Funny incidents and clever plotlines children come back to again and again",
        ],
        forWhom:
          "Ages 3 and up. A good fit for first-time readers, new parents and primary school teachers, and a perfect gift for a birthday or a holiday.",
        faq: [
          {
            q: "Is Rocky a real dog?",
            a: "Yes. Rocky is the family's English Cocker Spaniel, living in Miami with the authors.",
          },
          {
            q: "Is there a version with both Rocky books?",
            a: "Yes. The Two-in-One Edition collects the Friendship and Kindness stories in one hardcover volume.",
          },
        ],
      },
    },
  },
  {
    id: "lucky-rocky-friendship-es",
    author: "ricardo",
    editionLang: "es",
    age: "3-5",
    type: "bedtime",
    series: "lucky-rocky",
    pairId: "lucky-rocky-friendship-en",
    ageShown: "3-8",
    alsoAges: ["5-7"],
    pages: 40,
    published: "2024-04-21",
    size: "21.6 x 27.9 cm",
    cover: "/covers/lucky-rocky-friendship-es.jpg",
    coverSize: { w: 900, h: 1160 },
    showcaseLead: {
      es: "Personajes de los cuentos: la abeja con sus cubos de miel, la abuelita Lechuza abriendo la puerta bajo la lluvia y Pequeño Max con su gorro de capitán.",
    },
    bannerLead: {
      file: "/art/rocky-friendship-es-slogan.jpg",
      w: 1920,
      h: 600,
      alt: {
        es: "Descubrimientos que ayudan a los niños: Las Aventuras de Rocky, el Afortunado, La Magia de la Amistad, cuentos cortos ilustrados para niños de 3 años en adelante",
      },
    },
    artwork: [
      {
        file: "/art/rocky-friendship-en-bee.jpg",
        w: 600,
        h: 600,
        alt: { es: "Una abeja lleva dos cubos de miel sobre un prado de flores, ilustración de La Magia de la Amistad" },
      },
      {
        file: "/art/rocky-friendship-en-owl.jpg",
        w: 600,
        h: 600,
        alt: { es: "La abuelita Lechuza, con gafas y un farol, abre la puerta para que Rocky entre y no se moje" },
      },
      {
        file: "/art/rocky-friendship-en-mouse.jpg",
        w: 600,
        h: 600,
        alt: { es: "Pequeño Max, el ratoncito con camiseta de marinero y gorro de capitán, agarrado a una rama con hojas" },
      },
    ],
    banners: [
      {
        file: "/art/rocky-friendship-es-spread.jpg",
        w: 2331,
        h: 1442,
        alt: {
          es: "Páginas interiores del libro: Rocky y sus amigos conocen a Pequeño Max, con texto en letra grande y una ilustración a color en la página opuesta",
        },
      },
      {
        file: "/art/rocky-friendship-es-scenes.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Escenas de los cuentos: el ratoncito navegando en un barco de papel, una colmena en una rama, tarros de miel, el abuelo José buscando sus gafas, la tienda del pueblo y un castor junto a su casa",
        },
      },
      {
        file: "/art/rocky-friendship-es-print.jpg",
        w: 3179,
        h: 993,
        alt: {
          es: "Historias en letra grande que facilitan la lectura, con la abuelita Lechuza y los cachorros frente a su casa en el árbol",
        },
      },
      {
        file: "/art/rocky-friendship-es-ages.jpg",
        w: 2880,
        h: 900,
        alt: {
          es: "Para leer antes de dormir a niños de 3 a 5 años y para reforzar la lectura en niños de 6 a 8 años",
        },
      },
      {
        file: "/art/rocky-friendship-es-themes.jpg",
        w: 1920,
        h: 600,
        alt: {
          es: "Amistad, bondad, curiosidad, respeto y creatividad: de esto tratan los cuentos de Rocky el Afortunado",
        },
      },
    ],
    formats: [
      { kind: "paperback", asin: "1963328043", price: "$13.99" },
      { kind: "kindle", asin: "B0D2BPZ6NS", price: "$3.00" },
    ],
    rating: { value: 4.9, count: 24 },
    slug: { es: "aventuras-de-rocky-el-afortunado-magia-de-la-amistad-cuentos" },
    copy: {
      es: {
        title: "Las Aventuras de Rocky, el Afortunado: La Magia de la Amistad",
        subtitle: "Cuentos cortos para la hora de dormir, para niños de 3 a 8 años",
        lead:
          "Historias tiernas y tranquilas sobre el cachorro Rocky para una lectura acogedora antes de dormir. Este es el primer libro de las aventuras de Rocky. A los niños de 3 a 5 años les gusta escucharlo junto a sus padres, y la letra grande y las frases simples ayudan a los niños de 6 a 8 años a dar sus primeros pasos en la lectura independiente. Las divertidas aventuras de Rocky hablan de amistad, bondad y curiosidad.",
        inside: [
          "Cuentos cortos, cada uno se lee de una sentada",
          "Hermosas ilustraciones dibujadas a mano que captan la atención",
          "Frases simples impresas en letra grande para facilitar la lectura",
          "Los fundamentos de la amistad, la bondad, la ayuda mutua y el respeto, de manera fácil e interesante",
          "Situaciones divertidas e historias inteligentes a las que el niño querrá volver una y otra vez",
        ],
        forWhom:
          "De 3 años en adelante. Útil para primeros lectores, nuevos padres y maestros de primaria, y un regalo perfecto para un cumpleaños o una fiesta.",
        faq: [
          {
            q: "¿Rocky es un perro real?",
            a: "Sí. Rocky es el cocker spaniel inglés de la familia, y vive en Miami con los autores.",
          },
          {
            q: "¿Hay una edición con los dos libros de Rocky?",
            a: "Sí. La Edición Dos en Uno reúne los cuentos de la Amistad y de la Bondad en un solo volumen de tapa dura.",
          },
        ],
      },
    },
  },

  /* ===== Лаки Рокки: Доброта ===== */
  {
    id: "lucky-rocky-kindness-en",
    author: "ricardo",
    editionLang: "en",
    age: "5-7",
    type: "bedtime",
    series: "lucky-rocky",
    pairId: "lucky-rocky-kindness-es",
    ageShown: "3-8",
    alsoAges: ["3-5"],
    pages: 42,
    published: "2024-08-12",
    size: "8.5 x 11 in",
    cover: "/covers/lucky-rocky-kindness-en.jpg",
    coverSize: { w: 900, h: 1160 },
    formats: [
      { kind: "paperback", asin: "1963328698", price: "$13.99" },
      { kind: "kindle", asin: "B0DCVKSQTN", price: "$3.00" },
    ],
    rating: { value: 4.2, count: 5 },
    showcaseLead: {
      en: "A few pages from inside: the oak where Grandma Owl lives, the yard where the chickens get a fright, and the caterpillar in her room full of toys.",
    },
    bannerLead: {
      file: "/art/lucky-rocky-kindness-header.jpg",
      w: 1940,
      h: 606,
      alt: {
        en: "The Adventures of Lucky Rocky, the Magic of Kindness by Ricardo Demi, cover with the puppy Rocky and a hen, discoveries that help kids",
      },
    },
    artwork: [
      {
        file: "/art/lucky-rocky-kindness-tree.jpg",
        w: 1200,
        h: 1200,
        alt: {
          en: "An illustration from the book: the old oak with a door and a window where Grandma Owl lives, a path leading up to it",
        },
      },
      {
        file: "/art/lucky-rocky-kindness-chickens.jpg",
        w: 1200,
        h: 1200,
        alt: {
          en: "An illustration from the book: the cat up a tree and three startled hens running from a tipped over bucket in the yard",
        },
      },
      {
        file: "/art/lucky-rocky-kindness-caterpillar.jpg",
        w: 1200,
        h: 1200,
        alt: {
          en: "An illustration from the book: the caterpillar showing her drawing in a room scattered with blocks, puzzles and a drum",
        },
      },
    ],
    banners: [
      {
        file: "/art/lucky-rocky-kindness-values.jpg",
        w: 1940,
        h: 606,
        alt: {
          en: "What the stories are about: friendship, kindness, curiosity, respect and creativity, with Grandma Beatrice bringing cookies out to the puppies",
        },
      },
      {
        file: "/art/lucky-rocky-kindness-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "The book open at a spread: short story on the left page, a full color illustration of the yard on the right",
        },
      },
      {
        file: "/art/lucky-rocky-kindness-art.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Twelve illustrations from the book: the puppies, the cat, the birds, the ants, the caterpillar and a cup of milk with a muffin",
        },
      },
    ],
    slug: { en: "adventures-of-lucky-rocky-magic-of-kindness-stories-kids" },
    copy: {
      en: {
        title: "The Adventures of Lucky Rocky: The Magic of Kindness",
        subtitle: "Stories about kindness and caring for children ages 3-8",
        lead:
          "Rocky the puppy's adventures continue, with new short stories about friendship, kindness, helping each other and respect. Children ages 3 to 5 enjoy them read aloud at bedtime, and the large print and simple sentences suit children ages 6 to 8 who are starting to read on their own.",
        inside: [
          "Several short illustrated stories",
          "Slightly longer than the Friendship book",
          "Large type, full color",
          "Situations with no single right answer, meant to be discussed",
        ],
        forWhom: "Ages 3 and up read aloud, 6 to 8 reading alone.",
        faq: [
          {
            q: "Which Rocky book comes first?",
            a: "The Magic of Friendship. But the books do not depend on each other, and either one can be read first.",
          },
          {
            q: "Is there a hardcover?",
            a: "The Two-in-One Edition, which contains both Rocky books, is available in hardcover.",
          },
        ],
      },
    },
  },
  {
    id: "lucky-rocky-kindness-es",
    author: "ricardo",
    editionLang: "es",
    age: "5-7",
    type: "bedtime",
    series: "lucky-rocky",
    pairId: "lucky-rocky-kindness-en",
    ageShown: "3-8",
    alsoAges: ["3-5"],
    pages: 42,
    published: "2024-08-14",
    size: "21.6 x 27.9 cm",
    cover: "/covers/lucky-rocky-kindness-es.jpg",
    coverSize: { w: 900, h: 1160 },
    formats: [
      { kind: "paperback", asin: "1963328620", price: "$12.99" },
      { kind: "kindle", asin: "B0DD5S79W1", price: "$3.00" },
    ],
    rating: { value: 5.0, count: 2 },
    showcaseLead: {
      es: "Algunas páginas del interior: el roble donde vive la Abuela Búho, el patio donde las gallinas se llevan un susto y la oruga en su cuarto lleno de juguetes.",
    },
    bannerLead: {
      file: "/art/lucky-rocky-kindness-es-header.jpg",
      w: 1940,
      h: 606,
      alt: {
        es: "Las Aventuras de Rocky el Afortunado, la Magia de la Bondad, de Ricardo Demi, portada con el perrito Rocky y una gallina, descubrimientos que ayudan a los niños",
      },
    },
    artwork: [
      {
        file: "/art/lucky-rocky-kindness-es-tree.jpg",
        w: 1200,
        h: 1200,
        alt: {
          es: "Una ilustración del libro: el viejo roble con una puerta y una ventana donde vive la Abuela Búho, con un camino que llega hasta ella",
        },
      },
      {
        file: "/art/lucky-rocky-kindness-es-chickens.jpg",
        w: 1200,
        h: 1200,
        alt: {
          es: "Una ilustración del libro: el gato subido a un árbol y tres gallinas asustadas que huyen de un cubo volcado en el patio",
        },
      },
      {
        file: "/art/lucky-rocky-kindness-es-caterpillar.jpg",
        w: 1200,
        h: 1200,
        alt: {
          es: "Una ilustración del libro: la oruga enseñando su dibujo en un cuarto lleno de bloques, rompecabezas y un tambor",
        },
      },
    ],
    banners: [
      {
        file: "/art/lucky-rocky-kindness-es-values.jpg",
        w: 1940,
        h: 606,
        alt: {
          es: "De qué tratan los cuentos: amistad, bondad, curiosidad, respeto y creatividad, con la Abuela Beatriz sacando galletas a los perritos",
        },
      },
      {
        file: "/art/lucky-rocky-kindness-es-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "El libro abierto por una doble página: el cuento corto a la izquierda y una ilustración a todo color del patio a la derecha",
        },
      },
      {
        file: "/art/lucky-rocky-kindness-es-art.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Doce ilustraciones del libro: los perritos, el gato, los pájaros, las hormigas, la oruga y una taza de leche con un bizcocho",
        },
      },
    ],
    slug: { es: "aventuras-de-rocky-el-afortunado-magia-de-la-bondad-cuentos" },
    copy: {
      es: {
        title: "Las Aventuras de Rocky, el Afortunado: La Magia de la Bondad",
        subtitle: "Cuentos sobre la bondad y el cuidado, para niños de 3 a 8 años",
        lead:
          "Continúan las aventuras del cachorro Rocky, con nuevos cuentos cortos sobre la amistad, la bondad, la ayuda mutua y el respeto. A los niños de 3 a 5 años les gusta escucharlos junto a sus padres antes de dormir, y la letra grande y las frases simples son adecuadas para los niños de 6 a 8 años que empiezan a leer solos.",
        inside: [
          "Varios cuentos cortos ilustrados",
          "Algo más largos que los del libro de la Amistad",
          "Letra grande, a todo color",
          "Situaciones sin una única respuesta correcta, pensadas para conversar",
        ],
        forWhom: "Desde los 3 años en voz alta, de 6 a 8 para leer solo.",
        faq: [
          {
            q: "¿Qué libro de Rocky va primero?",
            a: "La Magia de la Amistad. Pero los libros no dependen uno del otro y se puede empezar por cualquiera.",
          },
          {
            q: "¿Hay tapa dura?",
            a: "La Edición Dos en Uno, que contiene los dos libros de Rocky, está en tapa dura.",
          },
        ],
      },
    },
  },

  /* ===== Лаки Рокки: Два в одном, твердая обложка ===== */
  {
    id: "lucky-rocky-two-in-one-en",
    author: "ricardo",
    editionLang: "en",
    age: "5-7",
    type: "bedtime",
    series: "lucky-rocky",
    pairId: "lucky-rocky-two-in-one-es",
    ageShown: "3-8",
    alsoAges: ["3-5"],
    pages: 78,
    published: "2024-08-11",
    size: "8.5 x 8.5 in",
    cover: "/covers/lucky-rocky-two-in-one-en.jpg",
    coverSize: { w: 900, h: 1162 },
    formats: [
      { kind: "hardcover", asin: "1963328981", price: "$28.25" },
      { kind: "kindle", asin: "B0DCVGV239", price: "$3.00" },
    ],
    rating: { value: 5.0, count: 9 },
    showcaseLead: {
      en: "Scenes from the two books: the forest where Rocky and his friends spend their days, tea at Grandma Owl's, and the caterpillar who dreams of becoming a butterfly.",
    },
    bannerLead: {
      file: "/art/lucky-rocky-two-in-one-header.jpg",
      w: 1940,
      h: 606,
      alt: {
        en: "The Adventures of Lucky Rocky, Two-in-One Edition by Ricardo Demi, hardcover gift edition, short stories for kids ages 3 and up",
      },
    },
    artwork: [
      {
        file: "/art/lucky-rocky-two-in-one-forest.jpg",
        w: 1200,
        h: 1200,
        alt: {
          en: "An illustration from the book: an otter by a tree stump talking to a bluebird on a branch",
        },
      },
      {
        file: "/art/lucky-rocky-two-in-one-tea.jpg",
        w: 1200,
        h: 1200,
        alt: {
          en: "An illustration from the book: Rocky, Penny and Brisket at the table with Grandma Owl, a pie and a red teapot",
        },
      },
      {
        file: "/art/lucky-rocky-two-in-one-caterpillar.jpg",
        w: 1200,
        h: 1200,
        alt: {
          en: "An illustration from the book: a caterpillar asleep on a leaf, dreaming of the butterflies it will fly with",
        },
      },
    ],
    banners: [
      {
        file: "/art/lucky-rocky-two-in-one-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "A spread from the book: large print on the left page, a full color illustration of the cat and the runaway chickens on the right",
        },
      },
      {
        file: "/art/lucky-rocky-two-in-one-values.jpg",
        w: 1940,
        h: 606,
        alt: {
          en: "What the stories are about: friendship, kindness, curiosity, respect, creativity. Rocky and his friends walking with Grandma Owl",
        },
      },
      {
        file: "/art/lucky-rocky-two-in-one-set.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Two books in one: The Magic of Friendship and The Magic of Kindness together in the hardcover gift edition",
        },
      },
    ],
    slug: { en: "adventures-of-lucky-rocky-two-in-one-hardcover-gift-edition" },
    copy: {
      en: {
        title: "The Adventures of Lucky Rocky: Two-in-One Hardcover Edition",
        subtitle: "A large hardcover gift collection for children ages 3-8",
        lead:
          "Two Rocky books in one hardcover gift edition, the full collection of his warm and cheerful adventures. For children ages 3 to 5 it is a big book of stories to share at bedtime, and the large print suits children ages 6 to 8 taking their first steps in reading on their own. Bright illustrations and a favorite character make it a gift that comes back off the shelf again and again.",
        inside: [
          "The Magic of Friendship and The Magic of Kindness in one volume",
          "Beautiful illustrations that capture attention",
          "Engaging stories that children will want to read to the end",
          "Simple sentences printed in large font for easy reading",
          "The basics of friendship, kindness, mutual assistance and respect, taught in a fun and easy way",
          "Hardcover binding, made to survive being read every night",
          "Award winner, Adventure category, Children's Book International Awards 2025",
        ],
        forWhom:
          "Ages 3 and up. A good fit for first-time readers, new parents and primary school teachers. A perfect gift for birthdays, holidays or any other important event, and for families who already know Rocky and want the permanent copy.",
        faq: [
          {
            q: "Why is this so much more than the paperbacks?",
            a: "It is a hardcover containing two complete books. Buying both paperbacks separately costs less but gives you two softcover volumes instead of one bound gift edition.",
          },
          {
            q: "Is there a cheaper way to read both stories?",
            a: "Yes. Both books are available separately in paperback, and both are on Kindle for a few dollars each.",
          },
        ],
      },
    },
  },
  {
    id: "lucky-rocky-two-in-one-es",
    author: "ricardo",
    editionLang: "es",
    age: "5-7",
    type: "bedtime",
    series: "lucky-rocky",
    pairId: "lucky-rocky-two-in-one-en",
    ageShown: "3-8",
    alsoAges: ["3-5"],
    pages: 78,
    published: "2024-08-14",
    size: "21.6 x 21.6 cm",
    cover: "/covers/lucky-rocky-two-in-one-es.jpg",
    coverSize: { w: 900, h: 1157 },
    formats: [
      { kind: "hardcover", asin: "1963328914", price: "$28.25" },
      { kind: "kindle", asin: "B0DD6M59PH", price: "$3.00" },
    ],
    rating: { value: 5.0, count: 5 },
    showcaseLead: {
      es: "Escenas de los dos libros: el bosque donde Rocky y sus amigos pasan los días, la merienda en casa de la abuela búho y la oruga que sueña con volar entre mariposas.",
    },
    bannerLead: {
      file: "/art/lucky-rocky-two-in-one-es-header.jpg",
      w: 1940,
      h: 606,
      alt: {
        es: "Las Aventuras de Rocky, el Afortunado, Edición Dos-en-Uno de Ricardo Demi, edición de regalo en tapa dura, cuentos en español para niños de 3 años en adelante",
      },
    },
    artwork: [
      {
        file: "/art/lucky-rocky-two-in-one-forest.jpg",
        w: 1200,
        h: 1200,
        alt: {
          es: "Una ilustración del libro: una nutria junto a un tocón habla con un pájaro azul posado en una rama",
        },
      },
      {
        file: "/art/lucky-rocky-two-in-one-tea.jpg",
        w: 1200,
        h: 1200,
        alt: {
          es: "Una ilustración del libro: Rocky, Penny y Brisket a la mesa con la abuela búho, una tarta y una tetera roja",
        },
      },
      {
        file: "/art/lucky-rocky-two-in-one-caterpillar.jpg",
        w: 1200,
        h: 1200,
        alt: {
          es: "Una ilustración del libro: una oruga dormida sobre una hoja sueña con las mariposas con las que volará",
        },
      },
    ],
    banners: [
      {
        file: "/art/lucky-rocky-two-in-one-es-spread.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Una página doble del libro: letra grande en la página izquierda y una ilustración a todo color del gato y las gallinas asustadas en la derecha",
        },
      },
      {
        file: "/art/lucky-rocky-two-in-one-es-values.jpg",
        w: 1940,
        h: 606,
        alt: {
          es: "De qué tratan las historias: amistad, bondad, curiosidad, respeto, creatividad. Rocky y sus amigos paseando con la abuela búho",
        },
      },
      {
        file: "/art/lucky-rocky-two-in-one-es-set.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Dos libros en uno: La Magia de la Amistad y La Magia de la Bondad juntos en la edición de regalo en tapa dura",
        },
      },
    ],
    slug: { es: "aventuras-de-rocky-el-afortunado-edicion-dos-en-uno-tapa-dura" },
    copy: {
      es: {
        title: "Las Aventuras de Rocky, el Afortunado: Edición Dos en Uno en Tapa Dura",
        subtitle: "Un gran libro de regalo en tapa dura, para niños de 3 a 8 años",
        lead:
          "Dos libros de Rocky en una edición de regalo en tapa dura, la colección completa de sus aventuras tiernas y divertidas. Para los niños de 3 a 5 años es un gran libro de cuentos para leer juntos antes de dormir, y la letra grande es adecuada para los niños de 6 a 8 años que dan sus primeros pasos en la lectura independiente. Las ilustraciones a todo color y un personaje querido lo convierten en un regalo al que se vuelve una y otra vez.",
        inside: [
          "La Magia de la Amistad y La Magia de la Bondad en un volumen",
          "Hermosas ilustraciones que captan la atención",
          "Historias envolventes que los niños querrán leer hasta el final",
          "Frases simples impresas en letra grande para facilitar la lectura",
          "Los fundamentos de la amistad, la bondad, la ayuda mutua y el respeto, de manera fácil e interesante",
          "Encuadernación en tapa dura, hecha para aguantar la lectura de cada noche",
          "Premio en la categoría Aventura, Children's Book International Awards 2025",
        ],
        forWhom:
          "De 3 años en adelante. Útil para primeros lectores, nuevos padres y maestros de primaria. El regalo perfecto para un cumpleaños, una fiesta o cualquier evento importante, y para las familias que ya conocen a Rocky y quieren el ejemplar definitivo.",
        faq: [
          {
            q: "¿Por qué cuesta bastante más que los de bolsillo?",
            a: "Es una tapa dura que contiene dos libros completos. Comprar los dos de bolsillo por separado sale más barato, pero te quedan dos volúmenes blandos en lugar de una edición de regalo encuadernada.",
          },
          {
            q: "¿Hay una forma más barata de leer las dos historias?",
            a: "Sí. Los dos libros están sueltos en tapa blanda, y los dos están en Kindle por unos pocos dólares.",
          },
        ],
      },
    },
  },

  /* ===== Maria Demi: Take a Break ===== */
  {
    id: "take-a-break-animals-en",
    author: "maria",
    editionLang: "en",
    age: "teens-adults",
    type: "coloring",
    series: "take-a-break",
    pairId: "take-a-break-animals-es",
    ageShown: "10-18",
    pages: 102,
    published: "2024-08-10",
    drawings: 50,
    size: "8.5 x 11 in",
    cover: "/covers/take-a-break-animals-en.jpg",
    coverSize: { w: 900, h: 1162 },
    formats: [{ kind: "paperback", asin: "1963328167", price: "$8.99" }],
    pdfUrl: WIX + "english-3",
    rating: { value: 5.0, count: 26 },
    showcaseLead: {
      en: "Four things worth seeing before you buy: how thick the lines are, how much open space each design has, how the pages are printed, and the range of subjects inside.",
    },
    bannerLead: {
      file: "/art/take-a-break-animals-header.png",
      w: 1940,
      h: 1201,
      alt: {
        en: "Take a Break: Cute Animals, an easy large print coloring book for adults and kids, cover with a sleeping leopard and colored pencils",
      },
    },
    banners: [
      {
        file: "/art/take-a-break-animals-lines.png",
        w: 1940,
        h: 1201,
        alt: {
          en: "Three pages from the book: strawberries, a monkey under a palm tree and a deer by a stream, all drawn with thick lines",
        },
      },
      {
        file: "/art/take-a-break-animals-size.png",
        w: 1940,
        h: 1201,
        alt: {
          en: "The book open at a duck among reeds, showing the 8.5 by 11 inch page and designs printed on one side only",
        },
      },
      {
        file: "/art/take-a-break-animals-themes.png",
        w: 1940,
        h: 1201,
        alt: {
          en: "Six more designs from the book: a snail, a parrot, a fox, a giraffe, acorns and a panda in bamboo",
        },
      },
      {
        file: "/art/take-a-break-animals-gift.png",
        w: 1940,
        h: 1201,
        alt: {
          en: "A wrapped present and colored pencils, the book as a gift for yourself or someone you love",
        },
      },
    ],
    slug: { en: "take-a-break-cute-animals-easy-coloring-book-adults" },
    copy: {
      en: {
        title: "Take a Break: Cute Animals. Easy Coloring Book for Adults and Kids",
        subtitle: "50 large print hand-drawn designs. No fine detail, no eye strain, one page finished in one sitting.",
        lead:
          "An easy coloring book for adults, which is a smaller category than it should be. Most adult coloring books are dense mandalas that take an hour a page and leave you tense. These are 50 bold, open drawings you can finish in one sitting with a mug of tea. The lines are thick enough that a child can color the same page beside you, which is why the cover says adults and kids.",
        inside: [
          "50 hand-drawn designs: animals, flowers, landscapes and plants",
          "Large print: thick lines and open areas, comfortable for anyone whose eyes tire quickly",
          "One design per page, printed single-sided, so markers do not spoil the next drawing",
          "8.5 x 11 inches",
        ],
        forWhom:
          "Adults, teenagers, children coloring alongside a grown-up, beginners and older colorists. Two things come up again and again from readers: they color a page in the evening to let go of a hard workday, and they buy it as a gift and then keep it for themselves.",
        faq: [
          {
            q: "Is this too easy if I already color a lot?",
            a: "Possibly. This book is deliberately simple. If you want intricate mandalas, this is not that book. If you want to finish something in twenty minutes, it is.",
          },
          {
            q: "Can children color in it too?",
            a: "Yes. The shapes are large and the lines are thick, so children color these pages without help. The subjects are cute animals and plants rather than anything aimed only at grown-ups.",
          },
          faqBleed.en,
        ],
      },
    },
  },
  {
    id: "take-a-break-animals-es",
    author: "maria",
    editionLang: "es",
    age: "teens-adults",
    type: "coloring",
    series: "take-a-break",
    pairId: "take-a-break-animals-en",
    ageShown: "10-18",
    pages: 102,
    published: "2024-08-15",
    drawings: 50,
    size: "21.6 x 27.9 cm",
    cover: "/covers/take-a-break-animals-es.jpg",
    coverSize: { w: 900, h: 1164 },
    formats: [{ kind: "paperback", asin: "1963328264", price: "$8.99" }],
    pdfUrl: WIX + "spanish-2",
    rating: { value: 5.0, count: 11 },
    showcaseLead: {
      es: "Cuatro cosas que conviene ver antes de comprar: el grosor de la línea, el espacio libre de cada dibujo, cómo están impresas las páginas y la variedad de temas.",
    },
    bannerLead: {
      file: "/art/take-a-break-animals-es-header.png",
      w: 1940,
      h: 1201,
      alt: {
        es: "Tómate un Descanso: Animales Adorables, libro de colorear fácil para adultos y niños, portada con un leopardo dormido y lápices de colores",
      },
    },
    banners: [
      {
        file: "/art/take-a-break-animals-es-lines.png",
        w: 1940,
        h: 1201,
        alt: {
          es: "Tres páginas del libro: fresas, un mono bajo una palmera y un ciervo junto a un arroyo, dibujados con líneas gruesas",
        },
      },
      {
        file: "/art/take-a-break-animals-es-size.png",
        w: 1940,
        h: 1201,
        alt: {
          es: "El libro abierto por un patito entre juncos, con la página de 21,6 por 27,9 cm y los dibujos impresos por una sola cara",
        },
      },
      {
        file: "/art/take-a-break-animals-es-themes.png",
        w: 1940,
        h: 1201,
        alt: {
          es: "Seis dibujos más del libro: un caracol, un loro, un zorro, una jirafa, bellotas y un panda entre bambú",
        },
      },
      {
        file: "/art/take-a-break-animals-es-gift.png",
        w: 1940,
        h: 1201,
        alt: {
          es: "Un regalo envuelto y lápices de colores, el libro como regalo para ti o para alguien querido",
        },
      },
    ],
    slug: { es: "tomate-un-descanso-animales-adorables-libro-colorear-adultos" },
    copy: {
      es: {
        title: "Tómate un Descanso: Animales Adorables. Libro de Colorear Fácil para Adultos y Niños",
        subtitle: "50 diseños de línea gruesa, dibujados a mano. Sin detalle diminuto y una página se termina de una sentada.",
        lead:
          "Un libro de colorear fácil para adultos, una categoría más pequeña de lo que debería. La mayoría de los libros para adultos son mandalas densos que exigen una hora por página y acaban cansando. Aquí hay 50 dibujos amplios y de línea gruesa que se terminan de una sentada con una taza de té. La línea es tan gruesa que un niño puede colorear la misma página a tu lado, y por eso la portada dice adultos y niños.",
        inside: [
          "50 diseños dibujados a mano: animales, flores, paisajes y plantas",
          "Impresión grande: líneas gruesas y zonas amplias, cómodas para quien se cansa la vista",
          "Un diseño por página, impreso por una sola cara, para que los marcadores no estropeen el dibujo siguiente",
          "21.6 x 27.9 cm",
        ],
        forWhom:
          "Adultos, adolescentes, niños que colorean junto a un adulto, principiantes y personas mayores. Dos cosas se repiten en los comentarios de los lectores: colorean una página por la noche para soltar la tensión del día de trabajo, y lo compran como regalo y acaban quedándoselo.",
        faq: [
          {
            q: "¿Es demasiado fácil si ya coloreo mucho?",
            a: "Puede que sí. Este libro es sencillo a propósito. Si buscas mandalas complejos, no es este. Si quieres terminar algo en veinte minutos, sí lo es.",
          },
          {
            q: "¿Pueden colorearlo también los niños?",
            a: "Sí. Las formas son grandes y las líneas gruesas, así que los niños colorean estas páginas sin ayuda. Los temas son animales tiernos y plantas, nada pensado solo para adultos.",
          },
          faqBleed.es,
        ],
      },
    },
  },
  {
    id: "take-a-break-ocean-en",
    author: "maria",
    editionLang: "en",
    age: "teens-adults",
    type: "coloring",
    series: "take-a-break",
    pairId: "take-a-break-ocean-es",
    ageShown: "10-18",
    pages: 102,
    published: "2024-08-10",
    drawings: 50,
    size: "8.5 x 11 in",
    cover: "/covers/take-a-break-ocean-en.jpg",
    coverSize: { w: 900, h: 1168 },
    formats: [{ kind: "paperback", asin: "1963328299", price: "$7.99" }],
    pdfUrl: WIX + "english-1",
    rating: { value: 5.0, count: 7 },
    showcaseLead: {
      en: "Four things worth seeing before you buy: how thick the lines are, the range of sea subjects inside, the page size, and how the pages are printed.",
    },
    bannerLead: {
      file: "/art/take-a-break-ocean-header.png",
      w: 1940,
      h: 1200,
      alt: {
        en: "Take a Break: Ocean, an easy large print coloring book for adults and kids, cover with a sea otter floating on its back among shells and starfish",
      },
    },
    banners: [
      {
        file: "/art/take-a-break-ocean-lines.png",
        w: 1940,
        h: 1200,
        alt: {
          en: "Three pages from the book: a submarine among seaweed, a group of shells and starfish, and a betta fish, all drawn with thick lines",
        },
      },
      {
        file: "/art/take-a-break-ocean-themes.png",
        w: 1940,
        h: 1200,
        alt: {
          en: "Six more designs from the book: a school of fish, a shark, a treasure chest, a whale, a spiral shell and a mermaid on a rock",
        },
      },
      {
        file: "/art/take-a-break-ocean-size.png",
        w: 1940,
        h: 1200,
        alt: {
          en: "The book open at a beach umbrella and a ball, showing the 8.5 by 11 inch page and designs printed on one side only",
        },
      },
      {
        file: "/art/take-a-break-ocean-gift.png",
        w: 1940,
        h: 1200,
        alt: {
          en: "A wrapped present and colored pencils, the book as a gift for yourself or someone you love",
        },
      },
    ],
    slug: { en: "take-a-break-ocean-easy-coloring-book-adults-kids" },
    copy: {
      en: {
        title: "Take a Break: Ocean. Easy Coloring Book for Adults and Kids",
        subtitle: "50 large print sea drawings. Thick lines, wide open water, one page finished in one sitting.",
        lead:
          "Sea animals, fish, shells and quiet beaches, drawn in the same bold easy style as the rest of the series. Ocean subjects suit this format particularly well: water, sand and sky are large open areas, and there is nothing fiddly to squint at. The lines are thick enough that a child can color the same page beside you, which is why the cover says adults and kids.",
        inside: [
          "50 hand-drawn ocean designs: sea animals, fish, shells, boats, beaches and a mermaid",
          "Large print: thick lines and wide open areas, comfortable for anyone whose eyes tire quickly",
          "One design per page, printed single-sided, so markers do not spoil the next drawing",
          "8.5 x 11 inches",
        ],
        forWhom:
          "Adults, teenagers, children coloring alongside a grown-up, beginners and anyone who wants something calm at the end of the day. It is also an easy gift: the subjects are gentle and nothing in the book is aimed at one age only.",
        faq: [
          {
            q: "Is this too easy if I already color a lot?",
            a: "Possibly. This book is deliberately simple. If you want intricate mandalas, this is not that book. If you want to finish a page in twenty minutes, it is.",
          },
          {
            q: "Can a child use this book too?",
            a: "Yes. The shapes are large and the lines are thick, so a school-age child colors these pages without help. Families often work through the same book together.",
          },
          {
            q: "How is this different from the Cute Animals book in the series?",
            a: "Same format, same line weight, different subjects. Cute Animals is land animals, flowers and plants. Ocean is sea life, shells, boats and beaches. Many readers own both.",
          },
          faqBleed.en,
        ],
      },
    },
  },
  {
    id: "take-a-break-ocean-es",
    author: "maria",
    editionLang: "es",
    age: "teens-adults",
    type: "coloring",
    series: "take-a-break",
    pairId: "take-a-break-ocean-en",
    ageShown: "10-18",
    pages: 102,
    published: "2024-08-14",
    drawings: 50,
    size: "21.6 x 27.9 cm",
    cover: "/covers/take-a-break-ocean-es.jpg",
    coverSize: { w: 900, h: 1164 },
    formats: [{ kind: "paperback", asin: "1963328396", price: "$7.99" }],
    pdfUrl: WIX + "spanish-1",
    rating: { value: 5.0, count: 6 },
    showcaseLead: {
      es: "Cuatro cosas que conviene ver antes de comprar: el grosor del trazo, la variedad de temas marinos, el tamaño de la página y cómo están impresos los dibujos.",
    },
    bannerLead: {
      file: "/art/take-a-break-ocean-es-header.png",
      w: 1940,
      h: 1200,
      alt: {
        es: "Tómate un Descanso: Belleza del Océano, libro de colorear fácil de letra grande para adultos y niños, portada con una nutria marina flotando entre conchas y estrellas de mar",
      },
    },
    banners: [
      {
        file: "/art/take-a-break-ocean-es-lines.png",
        w: 1940,
        h: 1200,
        alt: {
          es: "Tres páginas del libro: un submarino entre algas, un grupo de conchas y estrellas de mar, y un pez betta, todos dibujados con líneas gruesas",
        },
      },
      {
        file: "/art/take-a-break-ocean-es-themes.png",
        w: 1940,
        h: 1200,
        alt: {
          es: "Seis diseños más del libro: un banco de peces, un tiburón, un cofre del tesoro, una ballena, una caracola y una sirena sobre una roca",
        },
      },
      {
        file: "/art/take-a-break-ocean-es-size.png",
        w: 1940,
        h: 1200,
        alt: {
          es: "El libro abierto en una sombrilla de playa y una pelota, con la página de 21,59 por 27,94 cm y los dibujos impresos por una sola cara",
        },
      },
      {
        file: "/art/take-a-break-ocean-es-gift.png",
        w: 1940,
        h: 1200,
        alt: {
          es: "Un regalo envuelto y lápices de colores, el libro como regalo para ti o para alguien a quien quieres",
        },
      },
    ],
    slug: { es: "tomate-un-descanso-belleza-del-oceano-libro-colorear-facil" },
    copy: {
      es: {
        title: "Tómate un Descanso: Belleza del Océano. Libro de Colorear Fácil",
        subtitle: "50 dibujos marinos de letra grande. Trazo grueso, agua abierta, una página terminada de una sentada.",
        lead:
          "Animales marinos, peces, conchas y playas tranquilas, dibujados con el mismo trazo grueso y fácil que el resto de la serie. Los temas del mar encajan muy bien en este formato: el agua, la arena y el cielo son zonas amplias y no hay nada diminuto que forzar la vista. El trazo es lo bastante grueso para que un niño coloree la misma página a tu lado, y por eso la portada dice adultos y niños.",
        inside: [
          "50 diseños marinos dibujados a mano: animales del mar, peces, conchas, barcos, playas y una sirena",
          "Letra grande: líneas gruesas y zonas amplias, cómodo cuando la vista se cansa pronto",
          "Un diseño por página, impreso por una sola cara, para que los rotuladores no estropeen el siguiente",
          "21.6 x 27.9 cm",
        ],
        forWhom:
          "Adultos, adolescentes, niños que colorean junto a un adulto, principiantes y cualquiera que quiera algo tranquilo al final del día. También es un regalo fácil: los temas son amables y nada en el libro apunta a una sola edad.",
        faq: [
          {
            q: "¿Es demasiado fácil si ya coloreo mucho?",
            a: "Puede que sí. Este libro es sencillo a propósito. Si buscas mandalas complejos, no es este. Si quieres terminar una página en veinte minutos, sí lo es.",
          },
          {
            q: "¿Puede usarlo también un niño?",
            a: "Sí. Las formas son grandes y las líneas gruesas, así que un niño en edad escolar colorea estas páginas sin ayuda. Muchas familias van coloreando el mismo libro juntas.",
          },
          {
            q: "¿En qué se diferencia del libro de Animales Adorables de la misma serie?",
            a: "Mismo formato, mismo grosor de línea, temas distintos. Animales Adorables trae animales de tierra, flores y plantas. Belleza del Océano trae vida marina, conchas, barcos y playas. Mucha gente tiene los dos.",
          },
          faqBleed.es,
        ],
      },
    },
  },
  {
    id: "take-a-break-food-en",
    author: "maria",
    editionLang: "en",
    age: "teens-adults",
    type: "coloring",
    series: "take-a-break",
    pairId: "take-a-break-food-es",
    ageShown: "10-18",
    pages: 102,
    published: "2024-08-10",
    drawings: 50,
    size: "8.5 x 11 in",
    cover: "/covers/take-a-break-food-en.jpg",
    coverSize: { w: 900, h: 1162 },
    formats: [{ kind: "paperback", asin: "1963328329", price: "$7.99" }],
    pdfUrl: WIX + "english-2",
    showcaseLead: {
      en: "Four things worth seeing before you buy: how thick the lines are, the page size and how the pages are printed, the range of subjects inside, and the book as a gift.",
    },
    bannerLead: {
      file: "/art/take-a-break-food-header.jpg",
      w: 1940,
      h: 1200,
      alt: {
        en: "Take a Break: Food and Snacks, an easy large print coloring book for adults and kids, cover with a cup of coffee and a cupcake",
      },
    },
    banners: [
      {
        file: "/art/take-a-break-food-lines.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Three pages from the book: a hot dog, cookies and a watermelon, all drawn with thick lines",
        },
      },
      {
        file: "/art/take-a-break-food-size.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "The book open at a stack of pancakes with strawberries, showing the 8.5 by 11 inch page and designs printed on one side only",
        },
      },
      {
        file: "/art/take-a-break-food-themes.jpg",
        w: 1940,
        h: 1200,
        alt: {
          en: "Six more designs from the book: a pomegranate, grapes, a milkshake, a donut, a birthday cake and a slice of pizza",
        },
      },
      {
        file: "/art/take-a-break-food-gift.jpg",
        w: 1940,
        h: 1199,
        alt: {
          en: "A wrapped present and colored pencils, the book as a gift for yourself or someone you love",
        },
      },
    ],
    slug: { en: "take-a-break-food-and-snacks-easy-coloring-book" },
    copy: {
      en: {
        title: "Take a Break: Food and Snacks. Easy Coloring Book",
        subtitle: "Take a short break!",
        lead:
          "Wonderful illustrations that are easy and fun to color. Sit back and give yourself some time for creativity.\n\nCoffee, cakes, fruit, pizza and desserts, drawn with thick lines so a page can be finished in one sitting.",
        inside: [
          "50 big, bold and unique illustrations: foods, drinks, desserts, fruit and much more",
          "All illustrations are hand-drawn",
          "Simple drawings, easy to color for adults, teens, beginning artists and seniors",
          "A perfect size, 8.5 x 11 inches",
          "One illustration per page, printed on one side to prevent bleed-through",
        ],
        forWhom:
          "Adults, teens, beginning artists and seniors. A perfect gift for any occasion.",
        faq: [
          {
            q: "Which Take a Break book should I start with?",
            a: "Food is the easiest to pick up, because you rarely have to think about what color anything should be. Animals has the most variety, and Ocean is the calmest.",
          },
          faqBleed.en,
        ],
      },
    },
  },
  {
    id: "take-a-break-food-es",
    author: "maria",
    editionLang: "es",
    age: "teens-adults",
    type: "coloring",
    series: "take-a-break",
    pairId: "take-a-break-food-en",
    ageShown: "10-18",
    pages: 102,
    published: "2024-08-14",
    drawings: 50,
    size: "21.6 x 27.9 cm",
    cover: "/covers/take-a-break-food-es.jpg",
    coverSize: { w: 900, h: 1164 },
    formats: [{ kind: "paperback", asin: "1963328426", price: "$7.99" }],
    pdfUrl: WIX + "spanish-3",
    showcaseLead: {
      es: "Cuatro cosas que conviene ver antes de comprar: el grosor del trazo, el tamaño de la página y cómo están impresos los dibujos, la variedad de temas y el libro como regalo.",
    },
    bannerLead: {
      file: "/art/take-a-break-food-es-header.jpg",
      w: 1940,
      h: 1200,
      alt: {
        es: "Tómate un Descanso: Historias Deliciosas, libro de colorear fácil para adultos y niños, portada con una taza de café y una magdalena",
      },
    },
    banners: [
      {
        file: "/art/take-a-break-food-es-lines.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Tres páginas del libro: un perrito caliente, unas galletas y una sandía, dibujados con líneas gruesas",
        },
      },
      {
        file: "/art/take-a-break-food-es-size.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "El libro abierto por unas tortitas con fresas, con la página de 21,6 por 27,9 cm y los dibujos impresos por una sola cara",
        },
      },
      {
        file: "/art/take-a-break-food-es-themes.jpg",
        w: 1940,
        h: 1200,
        alt: {
          es: "Seis dibujos más del libro: una granada, unas uvas, un batido, un donut, una tarta de cumpleaños y una porción de pizza",
        },
      },
      {
        file: "/art/take-a-break-food-es-gift.jpg",
        w: 1940,
        h: 1199,
        alt: {
          es: "Un regalo envuelto y lápices de colores, el libro como regalo para ti o para alguien querido",
        },
      },
    ],
    slug: { es: "tomate-un-descanso-historias-deliciosas-libro-colorear" },
    copy: {
      es: {
        title: "Tómate un Descanso: Historias Deliciosas. Libro de Colorear Fácil",
        subtitle: "¡Tómate un pequeño descanso!",
        lead:
          "Maravillosas ilustraciones que son fáciles y divertidas de colorear. Ponte cómodo y regálate un poco de tiempo para la creatividad.\n\nCafé, pasteles, fruta, pizza y postres, dibujados con línea gruesa para que una página se termine de una sentada.",
        inside: [
          "50 diseños únicos, grandes y de línea gruesa: alimentos, bebidas, postres, fruta y mucho más",
          "Todas las ilustraciones están dibujadas a mano",
          "Dibujos sencillos, fáciles de colorear para adultos, adolescentes, artistas principiantes y personas mayores",
          "Un tamaño ideal, 21,6 x 27,9 cm",
          "Una ilustración por página, impresa por una sola cara para evitar que traspase",
        ],
        forWhom:
          "Adultos, adolescentes, artistas principiantes y personas mayores. El regalo perfecto para cualquier ocasión.",
        faq: [
          {
            q: "¿Por cuál de los Tómate un Descanso empiezo?",
            a: "Historias Deliciosas es el más fácil de empezar, porque casi nunca hay que pensar de qué color va algo. Animales tiene más variedad y Océano es el más tranquilo.",
          },
          faqBleed.es,
        ],
      },
    },
  },

  /* ================================================================== */
  /*  Русские издания                                                    */
  /*                                                                     */
  /*  Восемь книг, изданных на русском языке. Продаются только файлом    */
  /*  PDF для печати: бумажного издания с доставкой на русском нет,      */
  /*  поэтому у них пустой список форматов и нет кодов Amazon.           */
  /*                                                                     */
  /*  Названия, состав и подписи взяты со страниц самих книг и с         */
  /*  обложек, а не переведены с английских изданий. Две книжки          */
  /*  Маленького Макса на русском это другие книги: набор рисунков в     */
  /*  них не совпадает с английским и испанским изданием, поэтому пары   */
  /*  у них не указано.                                                  */
  /* ================================================================== */

  {
    id: "first-coloring-book-111-ru",
    author: "ricardo",
    editionLang: "ru",
    age: "1-3",
    type: "coloring",
    pairId: "first-coloring-book-111-en",
    drawings: 111,
    pages: 114,
    size: "21.6 x 27.9 см",
    cover: "/covers/first-coloring-book-111-ru.jpg",
    coverSize: { w: 900, h: 1165 },
    formats: [],
    enEditionAsin: "1963328272",
    rating: { value: 5.0, count: 19 },
    slug: { ru: "pervaya-kniga-raskraska-dlya-malyshey-1-3-goda" },
    copy: {
      ru: {
        title: "Первая книга-раскраска для малышей от 1 до 3 лет",
        subtitle: "111 крупных рисунков толстой линией, по одному на странице",
        lead:
          "111 простых и крупных рисунков, нарисованных от руки толстой линией, без мелких деталей, по одному на странице. Животные, морские жители, сказочные герои, транспорт, цветы и еда - на каждой странице что-то новое. Под каждым рисунком - его название, набранное полыми буквами: его тоже можно раскрасить. Так вместе с рисованием ребенок знакомится с первыми словами и буквами.",
        inside: [
          "111 рисунков, все нарисованы от руки",
          "Толстый контур и крупные формы, чтобы малышу было легче попадать внутрь контура",
          "Один рисунок на странице, оборот листа чистый",
          "Под каждым рисунком - его название полыми буквами, его тоже можно раскрасить",
          "Рисунок расположен в центре страницы - удобно и правше, и левше",
          "Животные, морские жители, сказочные герои, транспорт, цветы и еда",
          "В начале книги есть страница, где ребенок пишет свое имя",
          "114 страниц, лист 21.6 x 27.9 см",
        ],
        forWhom:
          "Детям 1, 2 и 3 лет. Подходит как самая первая раскраска, для занятий дома и в детском саду, а также в качестве подарка, когда вы плохо знаете ребенка.",
        faq: [
          {
            q: "Не рано ли давать раскраску в год?",
            a: "Нет. Рисунки специально сделаны предельно простыми. В год ребенок будет водить карандашом по фигуре, в два начнет попадать в контур, в три - закрашивать заметно точнее. Одна и та же книга подходит ребенку на всех трех этапах.",
          },
          {
            q: "Зачем слово под рисунком?",
            a: "Ребенок раскрашивает не только предмет, но и его название. Буквы крупные и полые, поэтому их хорошо видно и постепенно запоминается форма слова. Взрослый называет слово вслух, и рисование незаметно превращается в знакомство с чтением.",
          },
          faqPdfEditionRu,
          faqPaperSizeRu,
        ],
      },
    },
  },

  {
    id: "little-max-coloring-1-ru",
    author: "ricardo",
    editionLang: "ru",
    age: "1-3",
    type: "coloring",
    series: "little-max-ru",
    drawings: 111,
    pages: 114,
    size: "21.6 x 27.9 см",
    cover: "/covers/little-max-coloring-1-ru.jpg",
    coverSize: { w: 900, h: 1165 },
    formats: [],
    enEditionAsin: "1963328566",
    rating: { value: 4.6, count: 3 },
    slug: { ru: "malenkiy-maks-pervaya-knizhka-raskraska-kniga-1" },
    copy: {
      ru: {
        title: "Маленький Макс. Первая книжка-раскраска, книга 1",
        subtitle: "111 рисунков для малышей от 1 до 3 лет",
        lead:
          "Мышонок Макс зовет малыша раскрасить 111 простых рисунков. Толстый контур, крупная фигура почти на всю страницу, под каждым рисунком - его название полыми буквами. Домашние и лесные животные, бабочки и жуки, цветы и деревья, овощи, фрукты и сладости, игрушки, одежда и вещи из дома.",
        inside: [
          "111 рисунков, по одному на странице",
          "Толстый контур и большие простые формы",
          "Под каждым рисунком - его название полыми буквами, его тоже можно раскрасить",
          "Домашние и лесные животные, насекомые, растения, овощи и фрукты, еда, игрушки, одежда и вещи из дома",
          "Оборот листа чистый, поэтому фломастер не портит следующий рисунок",
          "В начале книги есть страница, где ребенок пишет свое имя",
          "114 страниц, лист 21.6 x 27.9 см",
        ],
        forWhom:
          "Детям 1, 2 и 3 лет. Подходит как первая раскраска и как вторая книга после того, как первая закончилась.",
        faq: [
          {
            q: "Чем книга 1 отличается от книги 2?",
            a: "Это два разных набора рисунков, ни один не повторяется. В первой книге больше домашних животных, еды и вещей из дома, во второй - звери зоопарка и моря, спорт, музыка и дорога. Начинать можно с любой.",
          },
          {
            q: "Это то же самое, что английское издание Little Max?",
            a: "Нет. Русская книжка Макса составлена из собственного набора рисунков. Если у вас уже есть английское издание, русское его не повторит.",
          },
          faqPdfEditionRu,
          faqPaperSizeRu,
        ],
      },
    },
  },

  {
    id: "little-max-coloring-2-ru",
    author: "ricardo",
    editionLang: "ru",
    age: "1-3",
    type: "coloring",
    series: "little-max-ru",
    drawings: 111,
    pages: 114,
    size: "21.6 x 27.9 см",
    cover: "/covers/little-max-coloring-2-ru.jpg",
    coverSize: { w: 900, h: 1165 },
    formats: [],
    enEditionAsin: "1963328450",
    rating: { value: 5.0, count: 1 },
    slug: { ru: "malenkiy-maks-pervaya-knizhka-raskraska-kniga-2" },
    copy: {
      ru: {
        title: "Маленький Макс. Первая книжка-раскраска, книга 2",
        subtitle: "111 рисунков для малышей от 1 до 3 лет",
        lead:
          "Вторая книжка Макса, и ни один рисунок в ней не повторяет первую. Лев, панда, тукан и павлин, морские жители, пальмы и ракушки, фрукты и сладости, мячи и музыкальные инструменты, шляпы и чемодан. Толстый контур, один рисунок на странице, под каждым - его название полыми буквами.",
        inside: [
          "111 рисунков, ни один не повторяет первую книгу",
          "Толстый контур и большие простые формы",
          "Под каждым рисунком - его название полыми буквами, его тоже можно раскрасить",
          "Звери зоопарка и моря, растения, фрукты и сладости, спорт, музыка, одежда и дорожные вещи",
          "Оборот листа чистый, поэтому фломастер не портит следующий рисунок",
          "В начале книги есть страница, где ребенок пишет свое имя",
          "114 страниц, лист 21.6 x 27.9 см",
        ],
        forWhom:
          "Детям 1, 2 и 3 лет. Хорошо подходит после первой книги Макса или любой другой простой раскраски.",
        faq: [
          {
            q: "Обязательно ли начинать с первой книги?",
            a: "Нет. Книги одинаковы по сложности и не связаны сюжетом - это просто два разных набора рисунков. Выбирайте ту, чьи темы ближе ребенку.",
          },
          faqPdfEditionRu,
          faqPaperSizeRu,
        ],
      },
    },
  },

  {
    id: "how-to-draw-111-ru",
    author: "ricardo",
    editionLang: "ru",
    age: "5-7",
    type: "drawing",
    pairId: "how-to-draw-111-en",
    drawings: 111,
    ageShown: "5-10",
    alsoAges: ["7-10"],
    pages: 231,
    size: "21.6 x 27.9 см",
    cover: "/covers/how-to-draw-111-ru.jpg",
    coverSize: { w: 900, h: 1165 },
    formats: [],
    enEditionAsin: "1963328140",
    rating: { value: 4.9, count: 36 },
    slug: { ru: "kak-narisovat-111-poshagovoe-risovanie-dlya-detey" },
    copy: {
      ru: {
        title: "Как нарисовать. 111 рисунков шаг за шагом",
        subtitle: "Пошаговое рисование для детей от 5 лет",
        lead:
          "Каждый рисунок разобран на простые шаги, которые ребенок может повторить сам. Рядом - страница с пунктиром для обводки и чистое место, чтобы попробовать нарисовать самостоятельно. 111 тем: животные, водные обитатели, сказочные герои, транспорт, цветы и еда. Продолжение первой книги-раскраски: те же герои, только теперь ребенок учится их рисовать.",
        inside: [
          "111 рисунков, каждый разобран по шагам",
          "Страница с пунктиром, по которому ребенок обводит рисунок",
          "Пустое место для собственной попытки рядом с образцом",
          "Короткий интересный факт рядом с рисунком",
          "Содержание с номерами страниц, чтобы быстро найти нужное",
          "Письмо автора начинающему художнику в начале книги",
          "231 страница, лист 21.6 x 27.9 см",
        ],
        forWhom:
          "Детям от 5 до 10 лет. Подходит для занятий дома, в кружке и на уроке рисования, а также тем, кто уже перерос обычные раскраски.",
        faq: [
          {
            q: "Ребенок совсем не умеет рисовать, справится?",
            a: "Да, книга сделана именно для этого. Первый шаг - простая фигура вроде круга или овала, затем к ней добавляется по одной детали. Черная линия показывает текущий шаг, серая - то, что уже нарисовано, поэтому ребенок не теряет место.",
          },
          faqPdfEditionRu,
          faqPaperSizeRu,
        ],
      },
    },
  },

  {
    id: "how-to-draw-everything-ru",
    author: "ricardo",
    editionLang: "ru",
    age: "5-7",
    type: "drawing",
    pairId: "how-to-draw-everything-en",
    drawings: 111,
    ageShown: "5-8",
    alsoAges: ["7-10"],
    pages: 104,
    size: "21.6 x 27.9 см",
    cover: "/covers/how-to-draw-everything-ru.jpg",
    coverSize: { w: 900, h: 1165 },
    formats: [],
    enEditionAsin: "1963328728",
    rating: { value: 5.0, count: 1 },
    slug: { ru: "kak-narisovat-vse-na-svete-legko-shag-za-shagom" },
    copy: {
      ru: {
        title: "Как нарисовать все на свете. Легко, шаг за шагом",
        subtitle: "111 рисунков для детей от 5 лет",
        lead:
          "111 рисунков, собранных по семи темам: животные, цветы, элементы природы, продукты, подарки, одежда и другие темы. Каждый рисунок вырастает из простой формы за несколько шагов, а рядом остается место для практики. Книга тоньше и легче большого пошагового пособия и хорошо подходит для начала.",
        inside: [
          "111 рисунков в семи темах",
          "Черная линия - текущий шаг, серая - то, что уже нарисовано",
          "Место для практики на каждом развороте",
          "Содержание и указатель тем по алфавиту",
          "104 страницы, лист 21.6 x 27.9 см",
        ],
        forWhom:
          "Детям от 5 до 8 лет и всем, кто только начинает рисовать. Подходит для дома, детского сада и в качестве подарка.",
        faq: [
          {
            q: "Чем эта книга отличается от книги «Как нарисовать»?",
            a: "Здесь тоже 111 рисунков, но книга вдвое тоньше: шаги расположены плотнее, а места для практики меньше. Если ребенок только пробует рисовать, начните с нее. Если он рисует давно и хочет подробно разбирать каждый рисунок, выбирайте большое пособие.",
          },
          faqPdfEditionRu,
          faqPaperSizeRu,
        ],
      },
    },
  },

  {
    id: "take-a-break-animals-ru",
    author: "ricardo",
    editionLang: "ru",
    age: "teens-adults",
    type: "coloring",
    series: "take-a-break",
    pairId: "take-a-break-animals-en",
    ageShown: "10-18",
    drawings: 50,
    pages: 102,
    size: "21.6 x 27.9 см",
    cover: "/covers/take-a-break-animals-ru.jpg",
    coverSize: { w: 900, h: 1165 },
    formats: [],
    enEditionAsin: "1963328167",
    rating: { value: 5.0, count: 26 },
    slug: { ru: "sdelay-pereryv-milye-zhivotnye-prostaya-raskraska" },
    copy: {
      ru: {
        title: "Сделай перерыв: Милые животные. Простая раскраска",
        subtitle: "50 крупных рисунков толстой линией, для взрослых и детей",
        lead:
          "50 крупных рисунков, нарисованных толстой линией: звери, птицы, цветы и пейзажи. Страницу можно закончить за один присест, а мелких деталей, из-за которых раскраску часто бросают на середине, здесь нет.",
        inside: [
          "50 рисунков, все нарисованы от руки",
          "Толстая линия и много свободного места внутри фигуры",
          "Один рисунок на странице, оборот чистый",
          "Крупный лист 21.6 x 27.9 см",
          "Подходит и новичку, и тому, кто раскрашивает давно",
        ],
        forWhom:
          "Взрослым, подросткам, начинающим и пожилым людям. Простой и понятный подарок на любой случай.",
        faq: [
          {
            q: "С какой из трех книг серии начать?",
            a: "«Вкусные истории» - самая простая: почти не приходится думать, какого цвета должен быть предмет. В «Милых животных» больше разнообразия, а «Красота океана» - самая спокойная.",
          },
          faqBleed.ru,
          faqPdfEditionRu,
          faqPaperSizeRu,
        ],
      },
    },
  },

  {
    id: "take-a-break-ocean-ru",
    author: "ricardo",
    editionLang: "ru",
    age: "teens-adults",
    type: "coloring",
    series: "take-a-break",
    pairId: "take-a-break-ocean-en",
    ageShown: "10-18",
    drawings: 50,
    pages: 102,
    size: "21.6 x 27.9 см",
    cover: "/covers/take-a-break-ocean-ru.jpg",
    coverSize: { w: 900, h: 1165 },
    formats: [],
    enEditionAsin: "1963328299",
    rating: { value: 5.0, count: 7 },
    slug: { ru: "sdelay-pereryv-krasota-okeana-prostaya-raskraska" },
    copy: {
      ru: {
        title: "Сделай перерыв: Красота океана. Простая раскраска",
        subtitle: "50 крупных рисунков толстой линией, для взрослых и детей",
        lead:
          "50 крупных рисунков толстой линией: морские животные и рыбки, медузы и черепахи, ракушки и уютные пляжи. Самая спокойная книга серии: почти в каждом рисунке крупные плавные формы и много места для цвета.",
        inside: [
          "50 рисунков, все нарисованы от руки",
          "Морские животные, рыбки, ракушки и пляжи",
          "Толстая линия и много свободного места внутри фигуры",
          "Один рисунок на странице, оборот чистый",
          "Крупный лист 21.6 x 27.9 см",
        ],
        forWhom:
          "Взрослым, подросткам, начинающим и пожилым людям. Простой и понятный подарок на любой случай.",
        faq: [
          {
            q: "Чем эта книга отличается от других в серии?",
            a: "Темой и настроением. Здесь только море: рыбы, медузы, черепахи, ракушки и пляжи. Формы крупнее и спокойнее, чем в книге про животных.",
          },
          faqBleed.ru,
          faqPdfEditionRu,
          faqPaperSizeRu,
        ],
      },
    },
  },

  {
    id: "take-a-break-food-ru",
    author: "ricardo",
    editionLang: "ru",
    age: "teens-adults",
    type: "coloring",
    series: "take-a-break",
    pairId: "take-a-break-food-en",
    ageShown: "10-18",
    drawings: 50,
    pages: 102,
    size: "21.6 x 27.9 см",
    cover: "/covers/take-a-break-food-ru.jpg",
    coverSize: { w: 900, h: 1165 },
    formats: [],
    enEditionAsin: "1963328329",
    slug: { ru: "sdelay-pereryv-vkusnye-istorii-prostaya-raskraska" },
    copy: {
      ru: {
        title: "Сделай перерыв: Вкусные истории. Простая раскраска",
        subtitle: "50 крупных рисунков толстой линией, для взрослых и детей",
        lead:
          "50 крупных рисунков толстой линией: кофе и пирожные, фрукты и ягоды, пицца, бургеры и десерты. Самая простая книга серии: почти не приходится думать, какого цвета должен быть предмет, поэтому страницу можно закончить быстро.",
        inside: [
          "50 рисунков, все нарисованы от руки",
          "Продукты, напитки, десерты и фрукты",
          "Толстая линия и много свободного места внутри фигуры",
          "Один рисунок на странице, оборот чистый",
          "Крупный лист 21.6 x 27.9 см",
        ],
        forWhom:
          "Взрослым, подросткам, начинающим и пожилым людям. Простой и понятный подарок на любой случай.",
        faq: [
          {
            q: "Это книга для взрослых или для детей?",
            a: "И для тех, и для других. Линия толстая, рисунки крупные, поэтому раскрашивать ее может и школьник, и взрослый, который давно не брал в руки карандаш.",
          },
          faqBleed.ru,
          faqPdfEditionRu,
          faqPaperSizeRu,
        ],
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Выборки                                                            */
/* ------------------------------------------------------------------ */

/** Книги, у которых есть страница на этом языке интерфейса. */
/** Все возрастные полки книги: основная плюс дополнительные.
    Дети развиваются по-разному, одна книга может подходить
    и шестилетнему, и девятилетнему. */
export const bookAges = (b: Book): AgeGroup[] => [b.age, ...(b.alsoAges ?? [])];

export function booksForLang(lang: UiLang): Book[] {
  return books.filter((b) => Boolean(b.slug[lang] && b.copy[lang]));
}

export function bookBySlug(lang: UiLang, slug: string): Book | undefined {
  return books.find((b) => b.slug[lang] === slug);
}

export function bookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

export const ageOrder: AgeGroup[] = ["1-3", "3-5", "5-7", "7-10", "teens-adults"];

export function cheapestFormat(b: Book): BookFormat | undefined {
  const order: FormatKind[] = ["paperback", "hardcover", "kindle"];
  for (const kind of order) {
    const f = b.formats.find((x) => x.kind === kind);
    if (f) return f;
  }
  return b.formats[0];
}
