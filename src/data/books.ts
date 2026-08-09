// Каталог Magic of Discoveries.
// Единый источник данных. Добавить книгу = добавить одну запись сюда.
// Страница книги, каталог, карта сайта и разметка для поисковиков строятся отсюда автоматически.

export type UiLang = "en" | "es" | "ru";

export type EditionLang = "en" | "es" | "bilingual";

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
  size: string;
  formats: BookFormat[];
  /** Прямая ссылка на карточку PDF в старом магазине. Пусто = цифровой версии нет. */
  pdfUrl?: string;
  /** Файл обложки в /public/covers/. Пусто = показываем название на цветном фоне. */
  cover?: string;
  rating?: AmazonRating;
  slug: Partial<Record<UiLang, string>>;
  copy: Partial<Record<UiLang, BookCopy>>;
}

const AMZ = "https://www.amazon.com/dp/";
export const amazonUrl = (asin: string) => AMZ + asin;
export const amazonReviewsUrl = (asin: string) => AMZ + asin + "#customerReviews";

const WIX = "https://dvchbooks.wixsite.com/website-13/product-page/";

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
    size: "8.5 x 11 in",
    cover: "/covers/first-coloring-book-111-en.jpg",
    formats: [{ kind: "paperback", asin: "1963328272", price: "$6.99" }],
    pdfUrl: WIX + "english-4",
    slug: { en: "first-coloring-book-toddlers-1-3-111-drawings" },
    copy: {
      en: {
        title: "First Coloring Book for Toddlers Ages 1-3",
        subtitle: "111 big, simple drawings with thick outlines. One drawing per page.",
        lead:
          "A first coloring book for a child who is still learning to hold a crayon. Every shape is large, rounded and drawn with a thick outline, so a one or two year old can stay roughly inside the lines and feel like it worked.",
        inside: [
          "111 drawings: animals, fairy-tale characters, flowers, food, gifts and everyday objects",
          "Thick outlines and large shapes sized for a toddler grip",
          "One drawing per page, printed on one side",
          "The word under each picture can be colored too, which turns coloring into first reading",
          "8.5 x 11 inches, comfortable to hold flat on a table or a car seat tray",
        ],
        forWhom:
          "Ages 1, 2 and 3. Good for a first coloring book, for preschool and daycare, and as a gift when you do not know the child well.",
        faq: [
          {
            q: "Is this too hard for a 1 year old?",
            a: "No. The drawings were made deliberately simple for the youngest end of the range. A one year old will scribble across the shape, a three year old will start staying inside it. The same book works through all three years.",
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
    size: "21.6 x 27.9 cm",
    cover: "/covers/first-coloring-book-111-es.jpg",
    formats: [{ kind: "paperback", asin: "1963328205", price: "$6.99" }],
    pdfUrl: WIX + "spanish-4",
    rating: { value: 4.9, count: 26 },
    slug: { es: "primer-libro-colorear-bebes-1-3-anos-111-dibujos" },
    copy: {
      es: {
        title: "El Primer Libro de Colorear para Bebés de 1 a 3 Años",
        subtitle: "111 dibujos grandes y sencillos con líneas gruesas. Un dibujo por página.",
        lead:
          "Un primer libro para colorear pensado para un niño que todavía está aprendiendo a sujetar el lápiz. Todas las formas son grandes, redondeadas y con líneas gruesas, para que un bebé de uno o dos años pueda mantenerse más o menos dentro del contorno y sentir que lo logró.",
        inside: [
          "111 dibujos: animales, personajes de cuentos, flores, alimentos, regalos y objetos cotidianos",
          "Líneas gruesas y formas grandes, pensadas para manos pequeñas",
          "Un dibujo por página, impreso por una sola cara",
          "La palabra debajo de cada dibujo también se puede colorear, y así colorear se convierte en primera lectura",
          "21.6 x 27.9 cm, cómodo sobre la mesa o sobre la bandeja del asiento del coche",
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
    size: "8.5 x 11 in",
    cover: "/covers/little-max-coloring-1-en.jpg",
    formats: [{ kind: "paperback", asin: "1963328566", price: "$6.99" }],
    pdfUrl: WIX + "english-5",
    rating: { value: 4.6, count: 3 },
    slug: { en: "little-max-first-coloring-book-toddlers-1-3" },
    copy: {
      en: {
        title: "First Coloring Book for Toddlers Ages 1-3 by Little Max",
        subtitle: "111 easy, big and cozy drawings, with the mouse Little Max as a guide.",
        lead:
          "The same easy, thick-lined drawings as our first coloring book, but this one is led by Little Max, the small mouse in a sailor shirt who appears throughout the Magic of Discoveries books. Children who already know Max from the bedtime stories recognise him instantly.",
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
    size: "21.6 x 27.9 cm",
    cover: "/covers/little-max-coloring-1-es.jpg",
    formats: [{ kind: "paperback", asin: "1963328590", price: "$6.99" }],
    pdfUrl: WIX + "el-primer-libro-de-colorear-para-bebés-de-1-3-años-de-pequeño-max",
    rating: { value: 5.0, count: 2 },
    slug: { es: "pequeno-max-primer-libro-colorear-bebes-1-3-anos" },
    copy: {
      es: {
        title: "El Primer Libro de Colorear de Pequeño Max, para Bebés de 1 a 3 Años",
        subtitle: "111 dibujos simples, grandes y acogedores, guiados por el ratoncito Pequeño Max.",
        lead:
          "Los mismos dibujos fáciles de línea gruesa que en nuestro primer libro para colorear, pero aquí el guía es Pequeño Max, el ratoncito con camiseta de marinero que aparece en toda la serie La Magia de los Descubrimientos. Los niños que ya conocen a Max por los cuentos lo reconocen enseguida.",
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
    size: "8.5 x 11 in",
    cover: "/covers/little-max-coloring-2-en.jpg",
    formats: [{ kind: "paperback", asin: "1963328450", price: "$6.99" }],
    pdfUrl: WIX + "копия-копия-копия-копия-шаблон-книги",
    rating: { value: 5.0, count: 1 },
    slug: { en: "little-max-coloring-book-toddlers-1-3-volume-2" },
    copy: {
      en: {
        title: "Little Max Coloring Book for Toddlers Ages 1-3, Volume 2",
        subtitle: "111 more easy drawings. The second book, for when the first one runs out.",
        lead:
          "A second volume of Little Max drawings, at the same easy level. Parents usually buy this one once the first book is full and the child asks for more of the same, which for a two year old matters more than variety.",
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
    size: "21.6 x 27.9 cm",
    cover: "/covers/little-max-coloring-2-es.jpg",
    formats: [{ kind: "paperback", asin: "1963328558", price: "$6.99" }],
    pdfUrl: WIX + "копия-копия-копия-копия-копия-шаблон-книги",
    slug: { es: "pequeno-max-libro-colorear-bebes-1-3-anos-volumen-2" },
    copy: {
      es: {
        title: "Libro de Colorear de Pequeño Max para Bebés de 1 a 3 Años, Volumen 2",
        subtitle: "111 dibujos más, igual de fáciles. El segundo libro, para cuando el primero se acaba.",
        lead:
          "Un segundo volumen de dibujos de Pequeño Max, con el mismo nivel de facilidad. Los padres suelen comprarlo cuando el primer libro ya está lleno y el niño pide más de lo mismo, algo que a los dos años importa más que la variedad.",
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
    formats: [
      { kind: "paperback", asin: "1963328434", price: "$12.99" },
      { kind: "kindle", asin: "B0DCPZPX6Z", price: "$2.99" },
    ],
    rating: { value: 4.8, count: 19 },
    slug: { en: "where-are-you-going-little-max-bedtime-book-toddlers" },
    copy: {
      en: {
        title: "Where Are You Going, Little Max?",
        subtitle: "A bedtime book for toddlers 1 to 3, with very short sentences.",
        lead:
          "A short bedtime book for the age when a child cannot yet sit through a story. Little Max sets off, meets someone, and comes home. Each page is one or two sentences, so a tired toddler reaches the end before losing interest, which is what makes a book become the one they ask for every night.",
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
    formats: [{ kind: "paperback", asin: "1963328469", price: "$12.99" }],
    rating: { value: 5.0, count: 2 },
    slug: { es: "a-donde-vas-pequeno-max-cuento-para-dormir-bebes" },
    copy: {
      es: {
        title: "¿A dónde vas, Pequeño Max?",
        subtitle: "Un cuento para dormir para niños de 1 a 3 años, con frases muy cortas.",
        lead:
          "Un cuento corto para la edad en la que el niño todavía no aguanta una historia entera. Pequeño Max sale, se encuentra con alguien y vuelve a casa. Cada página tiene una o dos frases, así que un niño cansado llega al final antes de perder el interés, y eso es lo que hace que un libro se convierta en el que pide cada noche.",
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
    size: "8.5 x 8.5 in",
    cover: "/covers/where-going-max-bilingual.jpg",
    formats: [
      { kind: "paperback", asin: "1963328876", price: "$12.99" },
      { kind: "kindle", asin: "B0DH3P9ZDR", price: "$2.99" },
    ],
    rating: { value: 4.9, count: 21 },
    slug: {
      en: "where-are-you-going-little-max-bilingual-english-spanish",
      es: "a-donde-vas-pequeno-max-bilingue-ingles-espanol",
    },
    copy: {
      en: {
        title: "Where Are You Going, Little Max? Bilingual English and Spanish",
        subtitle: "Both languages on the same page, for toddlers 1 to 3.",
        lead:
          "The bedtime book in both languages at once. Each page carries the English and the Spanish together, so a grandparent who speaks only Spanish and a parent who speaks only English can read the same book to the same child without swapping copies.",
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
        subtitle: "Los dos idiomas en la misma página, para niños de 1 a 3 años.",
        lead:
          "El cuento para dormir en los dos idiomas a la vez. Cada página lleva el inglés y el español juntos, así que una abuela que solo habla español y un padre que solo habla inglés pueden leer el mismo libro al mismo niño sin cambiar de ejemplar.",
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
    size: "8.5 x 8.5 in",
    formats: [
      { kind: "paperback", asin: "1963328582", price: "$12.99" },
      { kind: "kindle", asin: "B0DH3JSFF3", price: "$2.99" },
    ],
    rating: { value: 4.9, count: 9 },
    slug: { en: "where-have-you-been-little-max-bedtime-stories-toddlers" },
    copy: {
      en: {
        title: "Where Have You Been, Little Max?",
        subtitle: "Bedtime stories for toddlers 1 to 3. The second Little Max book.",
        lead:
          "Little Max comes back and tells where he has been. The sentences are still short, but this book asks the child to remember what happened a page ago, which is the next small step after a simple there-and-back story.",
        inside: [
          "Short sentences, one small event per page",
          "A gentle memory thread running through the book",
          "Full color illustrations",
          "Recognised finalist, Bedtime category, Children's Book International Awards 2025",
        ],
        forWhom:
          "Ages 1 to 3, and a natural second book after Where Are You Going, Little Max?",
        faq: [
          {
            q: "Do I need the first book to understand this one?",
            a: "No. Each book stands alone. Read together they work better, because the child recognises Max and the routine of leaving and coming home.",
          },
          {
            q: "How long does it take to read?",
            a: "Two to three minutes aloud, at a pace slow enough for a toddler.",
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
    size: "21.6 x 21.6 cm",
    formats: [
      { kind: "paperback", asin: "196332868X", price: "$12.99" },
      { kind: "kindle", asin: "B0DH3SBLWJ", price: "$2.99" },
    ],
    rating: { value: 5.0, count: 4 },
    slug: { es: "donde-has-estado-pequeno-max-cuentos-para-dormir-ninos" },
    copy: {
      es: {
        title: "¿Dónde Has Estado, Pequeño Max?",
        subtitle: "Cuentos para dormir para niños de 1 a 3 años. El segundo libro de Pequeño Max.",
        lead:
          "Pequeño Max vuelve y cuenta dónde ha estado. Las frases siguen siendo cortas, pero este libro pide al niño que recuerde lo que pasó una página antes, y ese es el siguiente paso después de un simple cuento de ida y vuelta.",
        inside: [
          "Frases cortas, un pequeño suceso por página",
          "Un hilo de memoria suave que recorre el libro",
          "Ilustraciones a todo color",
          "Finalista en la categoría Bedtime de los Children's Book International Awards 2025",
        ],
        forWhom: "De 1 a 3 años, y segundo libro natural después de ¿A dónde vas, Pequeño Max?",
        faq: [
          {
            q: "¿Necesito el primer libro para entender este?",
            a: "No. Cada libro se sostiene solo. Leídos juntos funcionan mejor, porque el niño reconoce a Max y la rutina de salir y volver a casa.",
          },
          {
            q: "¿Cuánto se tarda en leerlo?",
            a: "Dos o tres minutos en voz alta, a un ritmo lento para un niño pequeño.",
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
    size: "8.5 x 11 in",
    cover: "/covers/how-to-draw-111-en.jpg",
    formats: [
      { kind: "paperback", asin: "1963328140", price: "$14.99" },
      { kind: "kindle", asin: "B0DCQC5T9T", price: "$3.00" },
    ],
    rating: { value: 4.9, count: 36 },
    slug: { en: "how-to-draw-111-easy-step-by-step-drawings-for-kids" },
    copy: {
      en: {
        title: "How to Draw 111 Animals and Characters, Step by Step",
        subtitle: "Every drawing broken into four steps a child can follow alone.",
        lead:
          "The point of this book is the moment a child draws something recognisable without an adult helping. Each of the 111 subjects is broken into four steps, starting from a circle or an oval, so the child can copy step one, then step two, and arrive at a finished animal on their own.",
        inside: [
          "111 subjects: animals, fairy-tale characters, flowers, food, gifts and more",
          "Four steps per drawing, each step adding one simple shape",
          "Space beside each sequence to draw your own",
          "Finalist in the Educational category, Children's Book International Awards 2025",
          "8.5 x 11 inches",
        ],
        forWhom:
          "Roughly ages 4 to 8, depending on the child. For children who say they cannot draw, and for teachers who need a quiet independent activity.",
        faq: [
          {
            q: "Does a child need help from an adult?",
            a: "No, and that is deliberate. The steps are visual, so a child who cannot read yet can still follow them.",
          },
          {
            q: "How is this different from How to Draw Everything?",
            a: "This is the larger book with 111 subjects and more detail per drawing. How to Draw Everything is a shorter, simpler and cheaper introduction to the same method.",
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
    size: "21.6 x 27.9 cm",
    cover: "/covers/how-to-draw-111-es.jpg",
    formats: [
      { kind: "paperback", asin: "1963328175", price: "$14.99" },
      { kind: "kindle", asin: "B0DCR4W3YB", price: "$3.00" },
    ],
    rating: { value: 5.0, count: 16 },
    slug: { es: "como-dibujar-111-dibujos-faciles-paso-a-paso-para-ninos" },
    copy: {
      es: {
        title: "Cómo Dibujar 111 Animales y Personajes, Paso a Paso",
        subtitle: "Cada dibujo dividido en cuatro pasos que el niño puede seguir solo.",
        lead:
          "Lo importante de este libro es el momento en que un niño dibuja algo reconocible sin la ayuda de un adulto. Cada uno de los 111 temas se divide en cuatro pasos, empezando por un círculo o un óvalo, para que el niño copie el paso uno, luego el dos, y llegue solo a un animal terminado.",
        inside: [
          "111 temas: animales, personajes de cuentos, flores, alimentos, regalos y más",
          "Cuatro pasos por dibujo, cada paso añade una forma sencilla",
          "Espacio junto a cada secuencia para dibujar el propio",
          "Finalista en la categoría Educativa de los Children's Book International Awards 2025",
          "21.6 x 27.9 cm",
        ],
        forWhom:
          "Aproximadamente de 4 a 8 años, según el niño. Para quien dice que no sabe dibujar y para maestros que necesitan una actividad tranquila e independiente.",
        faq: [
          {
            q: "¿Necesita ayuda de un adulto?",
            a: "No, y es intencionado. Los pasos son visuales, así que un niño que todavía no lee puede seguirlos igual.",
          },
          {
            q: "¿En qué se diferencia de Cómo Dibujar Todo?",
            a: "Este es el libro grande, con 111 temas y más detalle por dibujo. Cómo Dibujar Todo es una introducción más corta, más simple y más barata al mismo método.",
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
    size: "8.5 x 11 in",
    cover: "/covers/how-to-draw-everything-en.jpg",
    formats: [{ kind: "paperback", asin: "1963328728", price: "$7.99" }],
    pdfUrl: WIX + "копия-копия-шаблон-книги",
    rating: { value: 5.0, count: 1 },
    slug: { en: "how-to-draw-everything-easy-drawings-for-kids" },
    copy: {
      en: {
        title: "How to Draw Everything: Easy Step-by-Step Drawings for Kids",
        subtitle: "The short, simple entry to step-by-step drawing.",
        lead:
          "A lighter version of the step-by-step method, at half the price. Same four-step logic, fewer lines per drawing. This is the one to try first if you are not sure the child will take to drawing at all.",
        inside: [
          "Step-by-step sequences for animals, food, plants and everyday objects",
          "Fewer lines per step than the larger 111 book",
          "Room to practise on the page",
          "8.5 x 11 inches",
        ],
        forWhom: "Ages 4 to 8, and a good first purchase before committing to the larger book.",
        faq: [
          {
            q: "Which drawing book should I start with?",
            a: "Start here if the child is younger or has not drawn much. Go straight to How to Draw 111 if they already draw regularly and want more subjects.",
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
    size: "21.6 x 27.9 cm",
    formats: [{ kind: "paperback", asin: "1963328752", price: "$7.99" }],
    pdfUrl: WIX + "копия-копия-копия-шаблон-книги",
    slug: { es: "como-dibujar-todo-dibujos-faciles-paso-a-paso-ninos" },
    copy: {
      es: {
        title: "Cómo Dibujar Todo: Dibujos Fáciles Paso a Paso para Niños",
        subtitle: "La entrada corta y sencilla al dibujo paso a paso.",
        lead:
          "Una versión más ligera del método paso a paso, a la mitad de precio. La misma lógica de cuatro pasos, con menos líneas por dibujo. Es el libro para probar primero si no sabes si al niño le va a gustar dibujar.",
        inside: [
          "Secuencias paso a paso de animales, comida, plantas y objetos cotidianos",
          "Menos líneas por paso que en el libro grande de 111",
          "Espacio para practicar en la misma página",
          "21.6 x 27.9 cm",
        ],
        forWhom: "De 4 a 8 años, y buena primera compra antes de pasar al libro grande.",
        faq: [
          {
            q: "¿Con qué libro de dibujo empiezo?",
            a: "Empieza por este si el niño es más pequeño o ha dibujado poco. Ve directo a Cómo Dibujar 111 si ya dibuja a menudo y quiere más temas.",
          },
          faqPaperOrDigital.es,
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
    size: "8.5 x 8.5 in",
    cover: "/covers/lucky-rocky-friendship-en.jpg",
    formats: [
      { kind: "paperback", asin: "1963328019", price: "$13.99" },
      { kind: "kindle", asin: "B0D2M74DG8", price: "$3.00" },
    ],
    rating: { value: 5.0, count: 22 },
    slug: { en: "adventures-of-lucky-rocky-magic-of-friendship-stories-kids" },
    copy: {
      en: {
        title: "The Adventures of Lucky Rocky: The Magic of Friendship",
        subtitle: "Short illustrated stories for children 3 and up.",
        lead:
          "Rocky is a real dog. He is the family's English Cocker Spaniel, and the stories started as things told about him at home before they became a book. Each story is short enough for one sitting and ends on something a child can talk about afterwards.",
        inside: [
          "Several short stories, each readable in one sitting",
          "Fully illustrated and colored throughout",
          "Simple sentences in large type, readable by a child who is starting to read alone",
          "Themes of making friends, sharing and sticking up for someone",
        ],
        forWhom:
          "Ages 3 and up for reading aloud. Ages 6 to 8 for reading alone, thanks to the large type and short sentences.",
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
    size: "21.6 x 21.6 cm",
    cover: "/covers/lucky-rocky-friendship-es.jpg",
    formats: [
      { kind: "paperback", asin: "1963328043", price: "$13.99" },
      { kind: "kindle", asin: "B0D2BPZ6NS", price: "$3.00" },
    ],
    rating: { value: 4.9, count: 24 },
    slug: { es: "aventuras-de-rocky-el-afortunado-magia-de-la-amistad-cuentos" },
    copy: {
      es: {
        title: "Las Aventuras de Rocky, el Afortunado: La Magia de la Amistad",
        subtitle: "Cuentos ilustrados cortos para niños de 3 años en adelante.",
        lead:
          "Rocky es un perro de verdad. Es el cocker spaniel inglés de la familia, y los cuentos empezaron siendo cosas que se contaban de él en casa antes de convertirse en libro. Cada cuento es lo bastante corto para leerlo de una vez y termina con algo de lo que el niño puede hablar después.",
        inside: [
          "Varios cuentos cortos, cada uno se lee de una sentada",
          "Totalmente ilustrado y a color",
          "Frases sencillas en letra grande, legibles para quien empieza a leer solo",
          "Temas de hacer amigos, compartir y defender a alguien",
        ],
        forWhom:
          "Desde los 3 años para leer en voz alta. De 6 a 8 años para leer solo, gracias a la letra grande y las frases cortas.",
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
    size: "8.5 x 8.5 in",
    cover: "/covers/lucky-rocky-kindness-en.jpg",
    formats: [
      { kind: "paperback", asin: "1963328698", price: "$13.99" },
      { kind: "kindle", asin: "B0DCVKSQTN", price: "$3.00" },
    ],
    rating: { value: 4.2, count: 5 },
    slug: { en: "adventures-of-lucky-rocky-magic-of-kindness-stories-kids" },
    copy: {
      en: {
        title: "The Adventures of Lucky Rocky: The Magic of Kindness",
        subtitle: "The second collection of Rocky stories, for children 3 and up.",
        lead:
          "The second book of Rocky stories. Where the first was about making friends, this one is about what you do when nobody is watching. The stories are slightly longer and the situations less obvious, which suits a child who has started to argue back.",
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
    size: "21.6 x 21.6 cm",
    cover: "/covers/lucky-rocky-kindness-es.jpg",
    formats: [
      { kind: "paperback", asin: "1963328620", price: "$12.99" },
      { kind: "kindle", asin: "B0DD5S79W1", price: "$3.00" },
    ],
    rating: { value: 5.0, count: 2 },
    slug: { es: "aventuras-de-rocky-el-afortunado-magia-de-la-bondad-cuentos" },
    copy: {
      es: {
        title: "Las Aventuras de Rocky, el Afortunado: La Magia de la Bondad",
        subtitle: "La segunda colección de cuentos de Rocky, para niños de 3 años en adelante.",
        lead:
          "El segundo libro de cuentos de Rocky. Si el primero trataba de hacer amigos, este trata de lo que uno hace cuando nadie mira. Los cuentos son algo más largos y las situaciones menos evidentes, lo que encaja con un niño que ya empieza a replicar.",
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
    size: "8.5 x 8.5 in",
    cover: "/covers/lucky-rocky-two-in-one-en.jpg",
    formats: [
      { kind: "hardcover", asin: "1963328981", price: "$28.25" },
      { kind: "kindle", asin: "B0DCVGV239", price: "$3.00" },
    ],
    rating: { value: 5.0, count: 9 },
    slug: { en: "adventures-of-lucky-rocky-two-in-one-hardcover-gift-edition" },
    copy: {
      en: {
        title: "The Adventures of Lucky Rocky: Two-in-One Hardcover Edition",
        subtitle: "Both Rocky books in one hardcover volume. The gift edition.",
        lead:
          "Winner in the Adventure category at the Children's Book International Awards 2025. Both Rocky collections bound together in hardcover. This is the edition to give rather than the one to buy for everyday reading, and the price reflects a sewn hardcover rather than a paperback.",
        inside: [
          "The Magic of Friendship and The Magic of Kindness in one volume",
          "Hardcover binding, made to survive being read every night",
          "Full color illustrations throughout",
          "Award winner, Adventure category, Children's Book International Awards 2025",
        ],
        forWhom:
          "Birthdays, christenings and Christmas. For families who already know Rocky and want the permanent copy.",
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
    size: "21.6 x 21.6 cm",
    cover: "/covers/lucky-rocky-two-in-one-es.jpg",
    formats: [
      { kind: "hardcover", asin: "1963328914", price: "$28.25" },
      { kind: "kindle", asin: "B0DD6M59PH", price: "$3.00" },
    ],
    rating: { value: 5.0, count: 5 },
    slug: { es: "aventuras-de-rocky-el-afortunado-edicion-dos-en-uno-tapa-dura" },
    copy: {
      es: {
        title: "Las Aventuras de Rocky, el Afortunado: Edición Dos en Uno en Tapa Dura",
        subtitle: "Los dos libros de Rocky en un solo volumen de tapa dura. La edición de regalo.",
        lead:
          "Ganador en la categoría Aventura de los Children's Book International Awards 2025. Las dos colecciones de Rocky encuadernadas juntas en tapa dura. Es la edición para regalar, no la del uso diario, y el precio corresponde a una tapa dura cosida y no a un libro de bolsillo.",
        inside: [
          "La Magia de la Amistad y La Magia de la Bondad en un volumen",
          "Encuadernación en tapa dura, hecha para aguantar la lectura de cada noche",
          "Ilustraciones a todo color",
          "Premio en la categoría Aventura, Children's Book International Awards 2025",
        ],
        forWhom:
          "Cumpleaños, bautizos y Navidad. Para familias que ya conocen a Rocky y quieren el ejemplar definitivo.",
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
    drawings: 50,
    size: "8.5 x 11 in",
    cover: "/covers/take-a-break-animals-en.jpg",
    formats: [{ kind: "paperback", asin: "1963328167", price: "$8.99" }],
    pdfUrl: WIX + "english-3",
    rating: { value: 5.0, count: 26 },
    slug: { en: "take-a-break-cute-animals-easy-coloring-book-adults" },
    copy: {
      en: {
        title: "Take a Break: Cute Animals. Easy Coloring Book for Adults",
        subtitle: "50 bold and simple hand-drawn designs. No fine detail, no eye strain.",
        lead:
          "An easy coloring book for adults, which is a smaller category than it should be. Most adult coloring books are dense mandalas that take an hour a page and leave you tense. These are 50 bold, open drawings you can finish in one sitting with a mug of tea.",
        inside: [
          "50 hand-drawn designs: animals, flowers, landscapes and plants",
          "Bold lines and open areas, comfortable for anyone whose eyes tire quickly",
          "One design per page, printed single-sided",
          "8.5 x 11 inches",
        ],
        forWhom:
          "Adults, teenagers, beginners and older colorists. Widely used for winding down in the evening and for shaky or tired hands.",
        faq: [
          {
            q: "Is this too easy if I already color a lot?",
            a: "Possibly. This book is deliberately simple. If you want intricate mandalas, this is not that book. If you want to finish something in twenty minutes, it is.",
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
    drawings: 50,
    size: "21.6 x 27.9 cm",
    cover: "/covers/take-a-break-animals-es.jpg",
    formats: [{ kind: "paperback", asin: "1963328264", price: "$8.99" }],
    pdfUrl: WIX + "spanish-2",
    rating: { value: 5.0, count: 11 },
    slug: { es: "tomate-un-descanso-animales-adorables-libro-colorear-adultos" },
    copy: {
      es: {
        title: "Tómate un Descanso: Animales Adorables. Libro de Colorear Fácil para Adultos",
        subtitle: "50 diseños grandes y sencillos, dibujados a mano. Sin detalle diminuto.",
        lead:
          "Un libro de colorear fácil para adultos, una categoría más pequeña de lo que debería. La mayoría de los libros para adultos son mandalas densos que exigen una hora por página y acaban cansando. Aquí hay 50 dibujos amplios y de línea gruesa que se terminan de una sentada con una taza de té.",
        inside: [
          "50 diseños dibujados a mano: animales, flores, paisajes y plantas",
          "Líneas gruesas y zonas amplias, cómodas para quien se cansa la vista",
          "Un diseño por página, impreso por una sola cara",
          "21.6 x 27.9 cm",
        ],
        forWhom:
          "Adultos, adolescentes, principiantes y personas mayores. Muy usado para desconectar por la noche y para manos cansadas o temblorosas.",
        faq: [
          {
            q: "¿Es demasiado fácil si ya coloreo mucho?",
            a: "Puede que sí. Este libro es sencillo a propósito. Si buscas mandalas complejos, no es este. Si quieres terminar algo en veinte minutos, sí lo es.",
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
    drawings: 50,
    size: "8.5 x 11 in",
    cover: "/covers/take-a-break-ocean-en.jpg",
    formats: [{ kind: "paperback", asin: "1963328299", price: "$7.99" }],
    pdfUrl: WIX + "english-1",
    rating: { value: 5.0, count: 7 },
    slug: { en: "take-a-break-ocean-easy-coloring-book-adults-kids" },
    copy: {
      en: {
        title: "Take a Break: Ocean. Easy Coloring Book for Adults and Kids",
        subtitle: "50 bold sea drawings: sea animals, fish, quiet beaches.",
        lead:
          "Sea animals, fish, shells and calm beaches, drawn in the same bold easy style. Ocean subjects suit this format particularly well, because water, sand and sky are large open areas that reward slow, unhurried coloring.",
        inside: [
          "50 hand-drawn ocean designs",
          "Bold lines, large open areas",
          "One design per page, single-sided",
          "8.5 x 11 inches",
        ],
        forWhom: "Adults, teenagers and children coloring alongside a parent.",
        faq: [
          {
            q: "Can a child use this book too?",
            a: "Yes. The designs are simple enough for a school-age child, which is why families often color from the same book together.",
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
    drawings: 50,
    size: "21.6 x 27.9 cm",
    cover: "/covers/take-a-break-ocean-es.jpg",
    formats: [{ kind: "paperback", asin: "1963328396", price: "$7.99" }],
    pdfUrl: WIX + "spanish-1",
    rating: { value: 5.0, count: 6 },
    slug: { es: "tomate-un-descanso-belleza-del-oceano-libro-colorear-facil" },
    copy: {
      es: {
        title: "Tómate un Descanso: Belleza del Océano. Libro de Colorear Fácil",
        subtitle: "50 dibujos marinos de línea gruesa: animales del mar, peces, playas tranquilas.",
        lead:
          "Animales marinos, peces, conchas y playas tranquilas, dibujados con el mismo trazo grueso y fácil. Los temas del mar encajan muy bien en este formato, porque el agua, la arena y el cielo son zonas amplias que se disfrutan coloreando sin prisa.",
        inside: [
          "50 diseños marinos dibujados a mano",
          "Líneas gruesas y zonas amplias",
          "Un diseño por página, por una sola cara",
          "21.6 x 27.9 cm",
        ],
        forWhom: "Adultos, adolescentes y niños que colorean junto a un adulto.",
        faq: [
          {
            q: "¿Puede usarlo también un niño?",
            a: "Sí. Los diseños son bastante simples para un niño en edad escolar, por eso muchas familias colorean del mismo libro.",
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
    drawings: 50,
    size: "8.5 x 11 in",
    cover: "/covers/take-a-break-food-en.jpg",
    formats: [{ kind: "paperback", asin: "1963328329", price: "$7.99" }],
    pdfUrl: WIX + "english-2",
    slug: { en: "take-a-break-food-and-snacks-easy-coloring-book" },
    copy: {
      en: {
        title: "Take a Break: Food and Snacks. Easy Coloring Book",
        subtitle: "50 bold drawings of food, drinks, desserts and fruit.",
        lead:
          "Coffee, cakes, fruit, sandwiches and desserts, in the same bold easy style. Food is the most popular theme in this series, probably because the colors are obvious and you can finish a page without deciding anything difficult.",
        inside: [
          "50 hand-drawn designs: foods, drinks, desserts, fruit",
          "Bold lines and open shapes",
          "One design per page, single-sided",
          "8.5 x 11 inches",
        ],
        forWhom: "Adults, teenagers and anyone who wants a page finished in one sitting.",
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
    drawings: 50,
    size: "21.6 x 27.9 cm",
    cover: "/covers/take-a-break-food-es.jpg",
    formats: [{ kind: "paperback", asin: "1963328426", price: "$7.99" }],
    pdfUrl: WIX + "spanish-3",
    slug: { es: "tomate-un-descanso-historias-deliciosas-libro-colorear" },
    copy: {
      es: {
        title: "Tómate un Descanso: Historias Deliciosas. Libro de Colorear Fácil",
        subtitle: "50 dibujos de línea gruesa con alimentos, bebidas, postres y fruta.",
        lead:
          "Café, pasteles, fruta, bocadillos y postres, con el mismo trazo grueso y fácil. La comida es el tema más popular de la serie, probablemente porque los colores son evidentes y se termina una página sin tener que decidir nada difícil.",
        inside: [
          "50 diseños dibujados a mano: alimentos, bebidas, postres, fruta",
          "Líneas gruesas y formas amplias",
          "Un diseño por página, por una sola cara",
          "21.6 x 27.9 cm",
        ],
        forWhom: "Adultos, adolescentes y cualquiera que quiera acabar una página de una sentada.",
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
];

/* ------------------------------------------------------------------ */
/*  Выборки                                                            */
/* ------------------------------------------------------------------ */

/** Книги, у которых есть страница на этом языке интерфейса. */
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
