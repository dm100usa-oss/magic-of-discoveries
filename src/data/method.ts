// Раздел "Метод".
// Здесь лежит то, что отличает нас от любой отдельной детской книги:
// названный подход, награды, независимые рецензии, мировая продажа.
// Каждая страница-руководство заканчивается одной конкретной книгой.

import type { UiLang } from "./books";

/* ------------------------------------------------------------------ */
/*  Награды и рецензии                                                 */
/* ------------------------------------------------------------------ */

export interface Award {
  /** id книги из каталога. Английское издание. */
  bookId: string;
  /** Парное издание на другом языке, если награда относится к обоим. */
  alsoBookId?: string;
  program: string;
  programUrl: string;
  year: number;
  result: Partial<Record<UiLang, string>>;
  category: Partial<Record<UiLang, string>>;
}

export const awards: Award[] = [
  {
    bookId: "lucky-rocky-two-in-one-en",
    alsoBookId: "lucky-rocky-two-in-one-es",
    program: "Children's Book International Awards",
    programUrl: "https://americanwritingawards.com",
    year: 2025,
    result: { en: "Winner", es: "Ganador", ru: "Победитель" },
    category: { en: "Adventure", es: "Aventura", ru: "Приключения" },
  },
  {
    bookId: "where-been-max-en",
    alsoBookId: "where-been-max-es",
    program: "Children's Book International Awards",
    programUrl: "https://americanwritingawards.com",
    year: 2025,
    result: { en: "Finalist", es: "Finalista", ru: "Финалист" },
    category: { en: "Bedtime Stories", es: "Cuentos para dormir", ru: "Сказки на ночь" },
  },
  {
    bookId: "how-to-draw-111-en",
    alsoBookId: "how-to-draw-111-es",
    program: "Children's Book International Awards",
    programUrl: "https://americanwritingawards.com",
    year: 2025,
    result: { en: "Finalist", es: "Finalista", ru: "Финалист" },
    category: { en: "Educational Books", es: "Libros educativos", ru: "Образовательные книги" },
  },
  {
    bookId: "lucky-rocky-two-in-one-en",
    alsoBookId: "lucky-rocky-two-in-one-es",
    program: "Literary Titan Book Awards",
    programUrl: "https://literarytitan.com/?s=The+Adventures+of+Lucky+Rocky",
    year: 2024,
    result: { en: "Gold Award", es: "Premio Oro", ru: "Золотая награда" },
    category: { en: "Children's Books", es: "Libros infantiles", ru: "Детские книги" },
  },
  {
    bookId: "where-going-max-en",
    alsoBookId: "where-going-max-es",
    program: "Literary Titan Book Awards",
    programUrl: "https://literarytitan.com/?s=Where+Are+You+Going%2C+Little+Max%3F",
    year: 2024,
    result: { en: "Gold Award", es: "Premio Oro", ru: "Золотая награда" },
    category: { en: "Children's Books", es: "Libros infantiles", ru: "Детские книги" },
  },
];

/** Все награды книги, включая те, что записаны на парное издание. */
export function awardsForBook(bookId: string): Award[] {
  return awards.filter((a) => a.bookId === bookId || a.alsoBookId === bookId);
}

export interface ReviewSource {
  name: string;
  url: string;
}

export const reviewSources: ReviewSource[] = [
  { name: "Readers' Favorite", url: "https://readersfavorite.com/rfreviews/search?search=Ricardo+Demi" },
  { name: "Literary Titan", url: "https://literarytitan.com/?s=Ricardo+Demi" },
];

/* ------------------------------------------------------------------ */
/*  Где книги продаются в мире                                         */
/* ------------------------------------------------------------------ */

export type RetailerRegion = "us" | "europe" | "latam" | "africa" | "global";

export interface Retailer {
  name: string;
  url: string;
  region: RetailerRegion;
}

export const retailers: Retailer[] = [
  { name: "Amazon", url: "https://www.amazon.com/stores/Ricardo-Demi/author/B0D3CQP21H", region: "us" },
  { name: "Barnes & Noble", url: "https://www.barnesandnoble.com/s/Ricardo%20Demi", region: "us" },
  { name: "ThriftBooks", url: "https://www.thriftbooks.com/a/ricardo-demi/11319271/", region: "us" },
  { name: "World of Books", url: "https://www.worldofbooks.com/en-gb/search?q=Ricardo%20Demi", region: "europe" },
  { name: "Alibris", url: "https://www.alibris.com/search/books/author/Ricardo-Demi", region: "europe" },
  { name: "Buscalibre", url: "https://www.buscalibre.com/libros/autor/ricardo-demi", region: "latam" },
  { name: "Takealot", url: "https://www.takealot.com/all?filter=Author:Ricardo+Demi", region: "africa" },
  { name: "Goodreads", url: "https://www.goodreads.com/author/show/49458093.Ricardo_Demi", region: "global" },
];

/* ------------------------------------------------------------------ */
/*  Страницы-руководства                                               */
/* ------------------------------------------------------------------ */

export interface GuideCopy {
  /** Заголовок под конкретный запрос родителя. */
  title: string;
  /** Одна строка: узнаваемая ситуация. */
  lead: string;
  /** Основной текст. Наблюдение, а не обещание. */
  body: string[];
  /** На что смотреть в книге. Проверяемые признаки, не реклама. */
  checklist: string[];
  /** Подводка к книге. */
  pick: string;
  faq: { q: string; a: string }[];
}

export interface Guide {
  id: string;
  /** Книга-решение. Английское издание. */
  bookId: string;
  /** Испанское издание той же книги, для испанской версии страницы. */
  bookIdEs?: string;
  slug: Partial<Record<UiLang, string>>;
  /** Соседние статьи по смыслу. Читатель идет дальше по теме,
      а поисковик видит, что раздел это единая связная тема,
      а не десять отдельных страниц. */
  related?: string[];
  copy: Partial<Record<UiLang, GuideCopy>>;
}

export const guides: Guide[] = [
  /* ===== 1. Как выбрать. Флагманская страница раздела ===== */
  {
    id: "how-to-choose",
    bookId: "little-max-coloring-1-en",
    bookIdEs: "little-max-coloring-1-es",
    slug: {
      en: "how-to-choose-a-coloring-book-for-your-child",
      es: "como-elegir-un-libro-para-colorear-para-tu-hijo",
    },
    related: ["what-to-look-for", "coloring-toddlers-1-3", "coloring-kids-4-8"],
    copy: {
      en: {
        title: "How to choose a coloring book for your child",
        lead: "The age printed on the cover describes the book, not your child. Here is what to look at instead.",
        body: [
          "Two children the same age are not the same child. One holds a crayon steadily at two and a half. Another is still learning at four. If you buy by the number on the cover, you will sometimes buy a book your child cannot finish, and a book a child cannot finish gets closed and forgotten.",
          "We build every book around one idea: the child has to succeed at it. That is the whole point. A page a child completes is a page that makes them ask for another one tomorrow. A page that defeats them ends the habit.",
          "So instead of asking how old your child is, ask what your child can already do. Three quick checks tell you almost everything.",
          "Does the crayon stay roughly inside the outline? If not, you need thick lines and one large object per page. Does your child stay with a page for more than two or three minutes? If not, you need fewer elements, not more. Does your child recognize what is on the page without asking? If not, pick everyday subjects first: a cat, an apple, a car, a house.",
          "When all three answers are yes, move up. More detail, more objects on the page, more themes. That is the moment for a fuller book, not before.",
        ],
        checklist: [
          "Thick outlines, wide enough that a wobbly crayon still lands inside",
          "One clear object per page for the youngest, several once control improves",
          "Single-sided printing, so a marker that bleeds only ruins the back of that sheet",
          "Everyday subjects the child can name",
          "Large page size, 8.5 x 11 inches, so small hands have room",
        ],
        pick: "If your child is at the very beginning, thick lines and one object per page, this is the book we would hand you first.",
        faq: [
          {
            q: "My child is four but colors like a two-year-old. Which book?",
            a: "Buy for what the child does, not for the birthday. The simplest book is not a step backward. It is the book that gets finished, and finishing is what builds the habit.",
          },
          {
            q: "Is a bigger book with more pages better value?",
            a: "Only if the drawings match your child. A hundred pages at the wrong level is a book that gets abandoned on page three.",
          },
        ],
      },
      es: {
        title: "Cómo elegir un libro para colorear para tu hijo",
        lead: "La edad impresa en la portada describe el libro, no a tu hijo. Esto es lo que conviene mirar.",
        body: [
          "Dos niños de la misma edad no son el mismo niño. Uno sostiene el crayón con firmeza a los dos años y medio. Otro sigue aprendiendo a los cuatro. Si compras por el número de la portada, a veces comprarás un libro que tu hijo no puede terminar, y un libro que no se termina se cierra y se olvida.",
          "Construimos cada libro alrededor de una sola idea: el niño tiene que lograrlo. Ese es todo el objetivo. Una página que el niño termina es una página que le hace pedir otra mañana. Una página que lo derrota termina con el hábito.",
          "Así que en lugar de preguntar qué edad tiene tu hijo, pregunta qué es capaz de hacer ya. Tres comprobaciones rápidas te dicen casi todo.",
          "¿El crayón se queda más o menos dentro del contorno? Si no, necesitas líneas gruesas y un solo objeto grande por página. ¿Tu hijo se queda con una página más de dos o tres minutos? Si no, necesitas menos elementos, no más. ¿Reconoce lo que hay en la página sin preguntar? Si no, elige primero objetos cotidianos: un gato, una manzana, un coche, una casa.",
          "Cuando las tres respuestas son sí, sube de nivel. Más detalle, más objetos por página, más temas. Ese es el momento para un libro más completo, no antes.",
        ],
        checklist: [
          "Contornos gruesos, lo bastante anchos para que un crayón tembloroso caiga dentro",
          "Un objeto claro por página para los más pequeños, varios cuando mejora el control",
          "Impresión a una sola cara, para que un marcador que traspase solo afecte al reverso de esa hoja",
          "Objetos cotidianos que el niño pueda nombrar",
          "Página grande, 8.5 x 11 pulgadas, para que quepan las manos pequeñas",
        ],
        pick: "Si tu hijo está en el mismísimo principio, líneas gruesas y un objeto por página, este es el libro que te daríamos primero.",
        faq: [
          {
            q: "Mi hijo tiene cuatro años pero colorea como uno de dos. ¿Qué libro elijo?",
            a: "Compra según lo que el niño hace, no según el cumpleaños. El libro más simple no es un paso atrás. Es el libro que se termina, y terminar es lo que crea el hábito.",
          },
          {
            q: "¿Un libro más grande con más páginas vale más la pena?",
            a: "Solo si los dibujos corresponden a tu hijo. Cien páginas del nivel equivocado son un libro abandonado en la página tres.",
          },
        ],
      },
    },
  },

  /* ===== 2. Раскраска для года-трех ===== */
  {
    id: "coloring-toddlers-1-3",
    bookId: "first-coloring-book-111-en",
    bookIdEs: "first-coloring-book-111-es",
    slug: {
      en: "coloring-books-for-toddlers-ages-1-3",
      es: "libros-para-colorear-para-bebes-de-1-a-3-anos",
    },
    related: ["how-to-choose", "what-to-look-for", "first-bedtime-book"],
    copy: {
      en: {
        title: "Coloring books for toddlers ages 1 to 3",
        lead: "A first coloring book has one job: the child finishes the page and wants another one.",
        body: [
          "At this age the hand is still learning where the crayon goes. The child sweeps rather than fills. That is normal, and it decides everything about the book you should buy.",
          "A thin outline punishes that sweep. The color lands outside, the page looks wrong to the child, and interest drops. A thick outline forgives it. The color lands roughly inside, the picture still reads as a cat, and the child feels it worked.",
          "The second thing that matters is how much is on the page. One large object is enough. A page with a whole scene on it often loses a toddler, because there is nowhere obvious to start.",
          "The third is the back of the sheet. Toddlers reach for markers. If the book is printed on both sides, one marker ruins two drawings. Single-sided printing costs the publisher more pages and saves the parent an argument.",
        ],
        checklist: [
          "Thick outlines",
          "One large object per page",
          "Single-sided printing, blank back",
          "Familiar subjects: animals, food, toys, weather, plants",
          "8.5 x 11 inches, room for a whole hand",
        ],
        pick: "This is the book we built to that exact description. 111 drawings, one per page, thick lines throughout.",
        faq: [
          {
            q: "Is one year old too early?",
            a: "For most children a first crayon lands somewhere between eighteen months and two years. Before that the book is still useful as a picture book you name things in.",
          },
          {
            q: "Crayons, pencils or markers?",
            a: "Thick crayons first. They need less pressure and less precision than pencils, which suits a hand that is still learning.",
          },
        ],
      },
      es: {
        title: "Libros para colorear para bebés de 1 a 3 años",
        lead: "Un primer libro para colorear tiene una sola tarea: que el niño termine la página y pida otra.",
        body: [
          "A esta edad la mano todavía está aprendiendo por dónde va el crayón. El niño barre en lugar de rellenar. Es normal, y decide todo lo demás sobre el libro que conviene comprar.",
          "Un contorno fino castiga ese barrido. El color cae fuera, la página le parece mal al niño y el interés baja. Un contorno grueso lo perdona. El color cae más o menos dentro, el dibujo sigue leyéndose como un gato, y el niño siente que le salió.",
          "Lo segundo que importa es cuánto hay en la página. Un objeto grande basta. Una página con una escena entera suele perder al niño pequeño, porque no hay un punto claro por donde empezar.",
          "Lo tercero es el reverso de la hoja. Los pequeños agarran marcadores. Si el libro está impreso por las dos caras, un marcador arruina dos dibujos. La impresión a una sola cara le cuesta más páginas al editor y le ahorra una discusión al padre.",
        ],
        checklist: [
          "Contornos gruesos",
          "Un objeto grande por página",
          "Impresión a una sola cara, reverso en blanco",
          "Temas familiares: animales, comida, juguetes, clima, plantas",
          "8.5 x 11 pulgadas, espacio para la mano entera",
        ],
        pick: "Este es el libro que construimos con esa descripción exacta. 111 dibujos, uno por página, líneas gruesas de principio a fin.",
        faq: [
          {
            q: "¿Un año es demasiado pronto?",
            a: "Para la mayoría de los niños el primer crayón llega entre los dieciocho meses y los dos años. Antes de eso el libro sirve igual como libro de imágenes para ir nombrando cosas.",
          },
          {
            q: "¿Crayones, lápices o marcadores?",
            a: "Crayones gruesos primero. Necesitan menos presión y menos precisión que los lápices, y eso le conviene a una mano que todavía está aprendiendo.",
          },
        ],
      },
    },
  },

  /* ===== 3. Раскраска для четырех-восьми ===== */
  {
    id: "coloring-kids-4-8",
    bookId: "little-max-coloring-2-en",
    bookIdEs: "little-max-coloring-2-es",
    slug: {
      en: "coloring-books-for-kids-ages-4-8",
      es: "libros-para-colorear-para-ninos-de-4-a-8-anos",
    },
    related: ["how-to-choose", "teach-child-to-draw", "what-to-look-for"],
    copy: {
      en: {
        title: "Coloring books for kids ages 4 to 8",
        lead: "The child now stays inside the line. The problem changes: boredom, not difficulty.",
        body: [
          "Once control arrives, a book of single simple shapes stops holding attention. The child finishes in a minute and asks what else there is. That is not a sign to jump straight to intricate patterns.",
          "What works at this stage is variety and a little more inside each drawing. Several elements on a page, recognizable scenes, themes that change often enough that the next page is a small surprise.",
          "Detail should grow, but slowly. Pages built from very fine lines and dense pattern belong to a different activity. A child who has to work for twenty minutes on one corner usually leaves the book.",
          "Themes matter more than parents expect. Animals hold nearly everyone. After that it splits: some children want vehicles and machines, some want fairy tale characters, some want food. A book that covers many themes lets the child find their own.",
        ],
        checklist: [
          "Clear lines, still comfortably thick",
          "Several elements per page, not a single shape",
          "Many themes, so the child can find a favorite",
          "Single-sided printing",
          "A page finishable in one sitting",
        ],
        pick: "A wider set of themes at the same forgiving line weight, for the child who has outgrown one object per page.",
        faq: [
          {
            q: "When is a child ready for detailed coloring?",
            a: "Watch for two signs together: the color stays inside the line without concentration, and the child chooses to keep going after finishing a page. Age alone is a poor guide.",
          },
          {
            q: "Are themed books better than mixed ones?",
            a: "A themed book is better once you know what the child loves. Before that, a mixed book tells you.",
          },
        ],
      },
      es: {
        title: "Libros para colorear para niños de 4 a 8 años",
        lead: "El niño ya se queda dentro de la línea. El problema cambia: es el aburrimiento, no la dificultad.",
        body: [
          "Cuando llega el control, un libro de figuras simples y sueltas deja de sostener la atención. El niño termina en un minuto y pregunta qué más hay. Eso no significa saltar directamente a los patrones intrincados.",
          "Lo que funciona en esta etapa es variedad y un poco más dentro de cada dibujo. Varios elementos por página, escenas reconocibles, temas que cambian lo bastante seguido para que la página siguiente sea una pequeña sorpresa.",
          "El detalle debe crecer, pero despacio. Las páginas construidas con líneas muy finas y patrón denso pertenecen a otra actividad. Un niño que tiene que trabajar veinte minutos en una esquina suele abandonar el libro.",
          "Los temas importan más de lo que los padres esperan. Los animales sostienen a casi todos. Después se divide: unos quieren vehículos y máquinas, otros personajes de cuento, otros comida. Un libro que cubre muchos temas deja que el niño encuentre el suyo.",
        ],
        checklist: [
          "Líneas claras, todavía cómodamente gruesas",
          "Varios elementos por página, no una sola figura",
          "Muchos temas, para que el niño encuentre su favorito",
          "Impresión a una sola cara",
          "Una página que se termina de una sentada",
        ],
        pick: "Un conjunto más amplio de temas con el mismo grosor de línea indulgente, para el niño que ya superó un objeto por página.",
        faq: [
          {
            q: "¿Cuándo está listo un niño para colorear con detalle?",
            a: "Busca dos señales juntas: el color se queda dentro de la línea sin concentrarse, y el niño elige seguir después de terminar una página. La edad sola es mala guía.",
          },
          {
            q: "¿Son mejores los libros temáticos que los mixtos?",
            a: "Un libro temático es mejor cuando ya sabes qué le encanta al niño. Antes de eso, un libro mixto te lo dice.",
          },
        ],
      },
    },
  },

  /* ===== 4. Первая книга на ночь ===== */
  {
    id: "first-bedtime-book",
    bookId: "where-going-max-en",
    bookIdEs: "where-going-max-es",
    slug: {
      en: "first-bedtime-books-for-toddlers",
      es: "primeros-cuentos-para-dormir-para-bebes",
    },
    related: ["bedtime-preschoolers", "coloring-toddlers-1-3", "how-to-choose"],
    copy: {
      en: {
        title: "First bedtime books for toddlers",
        lead: "A bedtime story only works if the child is still listening at the end of it.",
        body: [
          "Most bedtime books for very young children are too long. Not by much, but enough. The child drifts halfway, the parent speeds up, and the evening ends without the calm the ritual was supposed to produce.",
          "Length is only half of it. The other half is predictability. A one-year-old is not looking for surprise. The comfort comes from knowing what happens next, which is why the same book gets requested for the ninetieth time.",
          "That is why our first bedtime book repeats a simple pattern: someone goes somewhere and comes back. Leaving and returning, over and over, in short phrases. Children hear their own day in it.",
          "Practical details decide whether it gets used. Large type, so a tired parent reads without squinting. Large pictures, so a child in your lap can see. Short lines, so the story can be read slowly.",
        ],
        checklist: [
          "Short enough to finish in one sitting",
          "Short phrases, repeated patterns",
          "Large, easy to read type",
          "Large pictures that read from a lap",
          "A calm ending, nothing to startle at bedtime",
        ],
        pick: "Our first bedtime book, built on the simplest possible pattern: leaving and coming home.",
        faq: [
          {
            q: "How long should a bedtime story be for a toddler?",
            a: "Short enough that you finish it. If you regularly find yourself skipping pages to get to the end, the book is too long for the child right now.",
          },
          {
            q: "My child wants the same book every night. Is that a problem?",
            a: "It is the opposite of a problem. Repetition is where very young children get their sense of safety, and it is also where first words come from.",
          },
        ],
      },
      es: {
        title: "Primeros cuentos para dormir para bebés",
        lead: "Un cuento para dormir solo funciona si el niño sigue escuchando al final.",
        body: [
          "La mayoría de los cuentos para dormir dirigidos a niños muy pequeños son demasiado largos. No por mucho, pero lo suficiente. El niño se distrae a la mitad, el padre acelera, y la noche termina sin la calma que el ritual debía producir.",
          "La duración es solo la mitad. La otra mitad es la previsibilidad. Un niño de un año no busca sorpresa. La tranquilidad viene de saber qué pasa después, y por eso el mismo libro se pide por nonagésima vez.",
          "Por eso nuestro primer cuento para dormir repite un patrón simple: alguien se va a algún sitio y vuelve. Irse y regresar, una y otra vez, en frases cortas. Los niños oyen su propio día ahí dentro.",
          "Los detalles prácticos deciden si el libro se usa. Letra grande, para que un padre cansado lea sin forzar la vista. Ilustraciones grandes, para que el niño en el regazo las vea. Líneas cortas, para poder leer despacio.",
        ],
        checklist: [
          "Lo bastante corto para terminarlo de una sentada",
          "Frases cortas, patrones que se repiten",
          "Letra grande y fácil de leer",
          "Ilustraciones grandes que se ven desde el regazo",
          "Un final tranquilo, nada que sobresalte a la hora de dormir",
        ],
        pick: "Nuestro primer cuento para dormir, construido sobre el patrón más simple posible: irse y volver a casa.",
        faq: [
          {
            q: "¿Cuánto debe durar un cuento para dormir con un niño pequeño?",
            a: "Lo bastante poco para que lo termines. Si te descubres saltando páginas para llegar al final, el libro es demasiado largo para el niño en este momento.",
          },
          {
            q: "Mi hijo quiere el mismo libro cada noche. ¿Es un problema?",
            a: "Es justo lo contrario. La repetición es de donde los niños muy pequeños sacan su sensación de seguridad, y también de donde salen las primeras palabras.",
          },
        ],
      },
    },
  },

  /* ===== 5. Сказки для дошкольника ===== */
  {
    id: "bedtime-preschoolers",
    bookId: "lucky-rocky-friendship-en",
    bookIdEs: "lucky-rocky-friendship-es",
    slug: {
      en: "bedtime-stories-for-preschoolers",
      es: "cuentos-para-dormir-para-ninos-en-edad-preescolar",
    },
    related: ["first-bedtime-book", "bilingual-books", "book-gifts"],
    copy: {
      en: {
        title: "Bedtime stories for preschoolers",
        lead: "Around three, the pattern stops being enough. The child wants something to happen.",
        body: [
          "The book that worked at eighteen months starts to feel thin. The child has heard the pattern, learned it, and is now interested in the thing patterns are made of: what happens, why, and what happens next.",
          "But a real plot at bedtime has a catch. Tension wakes children up. A story with a genuine threat in it, read at eight in the evening, works against the thing you are trying to do.",
          "The size that fits is a small event with a soft resolution. Someone loses something and finds it. Someone is left out and gets included. Five to seven minutes, one clear problem, a warm ending, and the child can still fall asleep afterward.",
          "Stories about friendship carry particularly well at this age, because a preschooler is living exactly that question every day at nursery: who plays with me, and what happens when they do not.",
        ],
        checklist: [
          "Five to seven minutes per story",
          "One clear problem, resolved warmly",
          "Simple dialogue the child can follow",
          "No real threat, nothing to wake a child up",
          "Illustrations on most spreads",
        ],
        pick: "Short stories about a puppy and his friends. One problem each, all of them ending well.",
        faq: [
          {
            q: "How many stories in one evening?",
            a: "One is usually the right answer, and a second only if the child is genuinely still calm. More than that and bedtime turns into a negotiation.",
          },
          {
            q: "Can a five-year-old read these alone?",
            a: "Many can, with large type and short sentences. Reading to the child and having the child read to you are both useful, and they are not the same thing.",
          },
        ],
      },
      es: {
        title: "Cuentos para dormir para niños en edad preescolar",
        lead: "Cerca de los tres años el patrón deja de bastar. El niño quiere que pase algo.",
        body: [
          "El libro que funcionaba a los dieciocho meses empieza a quedarse corto. El niño ya oyó el patrón, lo aprendió, y ahora le interesa aquello de lo que están hechos los patrones: qué pasa, por qué, y qué pasa después.",
          "Pero una trama de verdad a la hora de dormir tiene una trampa. La tensión despierta a los niños. Una historia con una amenaza real, leída a las ocho de la noche, trabaja en contra de lo que estás intentando lograr.",
          "El tamaño que encaja es un suceso pequeño con una resolución suave. Alguien pierde algo y lo encuentra. Alguien queda fuera y lo incluyen. Cinco a siete minutos, un problema claro, un final cálido, y el niño todavía puede dormirse después.",
          "Las historias sobre amistad funcionan especialmente bien a esta edad, porque un preescolar vive exactamente esa pregunta cada día en la guardería: quién juega conmigo, y qué pasa cuando no lo hacen.",
        ],
        checklist: [
          "Cinco a siete minutos por cuento",
          "Un problema claro, resuelto con calidez",
          "Diálogo simple que el niño pueda seguir",
          "Sin amenaza real, nada que despierte al niño",
          "Ilustraciones en casi todas las páginas",
        ],
        pick: "Cuentos cortos sobre un cachorro y sus amigos. Un problema en cada uno, y todos terminan bien.",
        faq: [
          {
            q: "¿Cuántos cuentos en una noche?",
            a: "Uno suele ser la respuesta correcta, y un segundo solo si el niño sigue realmente tranquilo. Más que eso y la hora de dormir se convierte en una negociación.",
          },
          {
            q: "¿Puede un niño de cinco años leerlos solo?",
            a: "Muchos pueden, con letra grande y frases cortas. Leerle al niño y que el niño te lea a ti son dos cosas útiles, y no son la misma.",
          },
        ],
      },
    },
  },

  /* ===== 6. Как научить рисовать ===== */
  {
    id: "teach-child-to-draw",
    bookId: "how-to-draw-111-en",
    bookIdEs: "how-to-draw-111-es",
    slug: {
      en: "how-to-teach-a-child-to-draw",
      es: "como-ensenar-a-un-nino-a-dibujar",
    },
    related: ["coloring-kids-4-8", "how-to-choose", "book-gifts"],
    copy: {
      en: {
        title: "How to teach a child to draw",
        lead: "Most children do not stop drawing because they lack talent. They stop because the result does not match what they pictured.",
        body: [
          "Somewhere around six or seven, a child usually starts judging their own drawing. Before that, a lopsided horse is a horse. After that, a lopsided horse is a failure, and a lot of children quietly stop.",
          "What rescues them is not encouragement. It is a method. If the child can see how the horse was built, the gap between what they imagined and what appeared on paper stops being a verdict on their ability and becomes a set of steps they have not learned yet.",
          "A small number of steps is what makes this work. Too few and the jumps are too big to follow. Too many and the child loses the thread before the drawing appears. In our step by step book each drawing is broken into a handful of steps, more for the harder subjects, and they always go from whole shape to detail, never the reverse.",
          "The last step matters as much as the first. The child should be able to hold the finished drawing next to the page and see that they got there. That comparison is the reward, and it is what brings them back to the next one.",
        ],
        checklist: [
          "Every drawing broken into a small number of steps",
          "Steps that go from whole shape to detail",
          "Subjects the child actually wants to draw",
          "Enough drawings that the method becomes a habit",
          "Space to draw next to the example",
        ],
        pick: "111 subjects, each one broken into steps a child can follow alone.",
        faq: [
          {
            q: "At what age can a child follow step by step drawing?",
            a: "Usually from around five, once the child can copy a shape they are looking at. Before that, free drawing does more.",
          },
          {
            q: "Does copying steps hold back creativity?",
            a: "In practice it does the opposite. A child who can produce a recognizable animal has more to invent with, not less.",
          },
        ],
      },
      es: {
        title: "Cómo enseñar a un niño a dibujar",
        lead: "La mayoría de los niños no deja de dibujar por falta de talento. Deja de dibujar porque el resultado no se parece a lo que imaginaba.",
        body: [
          "Alrededor de los seis o siete años, el niño suele empezar a juzgar su propio dibujo. Antes de eso, un caballo torcido es un caballo. Después, un caballo torcido es un fracaso, y muchos niños dejan de dibujar en silencio.",
          "Lo que los rescata no es el ánimo. Es un método. Si el niño puede ver cómo se construyó el caballo, la distancia entre lo que imaginó y lo que apareció en el papel deja de ser un veredicto sobre su capacidad y se convierte en unos pasos que todavía no ha aprendido.",
          "Lo que hace que esto funcione es un número pequeño de pasos. Muy pocos, y los saltos son demasiado grandes para seguirlos. Demasiados, y el niño pierde el hilo antes de que aparezca el dibujo. En nuestro libro paso a paso cada dibujo se divide en unos pocos pasos, más en los temas difíciles, y siempre van de la forma entera al detalle, nunca al revés.",
          "El último paso importa tanto como el primero. El niño debe poder poner su dibujo terminado junto a la página y ver que llegó. Esa comparación es el premio, y es lo que lo trae de vuelta al siguiente.",
        ],
        checklist: [
          "Cada dibujo dividido en un número pequeño de pasos",
          "Pasos que van de la forma entera al detalle",
          "Temas que el niño realmente quiere dibujar",
          "Suficientes dibujos para que el método se vuelva hábito",
          "Espacio para dibujar junto al ejemplo",
        ],
        pick: "111 temas, cada uno dividido en pasos que un niño puede seguir solo.",
        faq: [
          {
            q: "¿A qué edad puede un niño seguir un dibujo paso a paso?",
            a: "Normalmente desde los cinco años, cuando el niño ya puede copiar una forma que está mirando. Antes de eso, el dibujo libre aporta más.",
          },
          {
            q: "¿Copiar pasos frena la creatividad?",
            a: "En la práctica ocurre lo contrario. Un niño capaz de producir un animal reconocible tiene más con lo que inventar, no menos.",
          },
        ],
      },
    },
  },

  /* ===== 7. Двуязычные книги ===== */
  {
    id: "bilingual-books",
    bookId: "where-going-max-bilingual",
    slug: {
      en: "bilingual-books-english-spanish-for-kids",
      es: "libros-bilingues-ingles-espanol-para-ninos",
    },
    related: ["bedtime-preschoolers", "first-bedtime-book", "book-gifts"],
    copy: {
      en: {
        title: "Bilingual books in English and Spanish for kids",
        lead: "A second language is easiest to add to a story the child already knows by heart.",
        body: [
          "The usual mistake with bilingual books is to introduce a new language and a new story at the same time. The child is working on two unknowns at once, and one of them gets dropped, usually the language.",
          "The reverse works better. Take a story the child has already heard many times, where they know what happens on the next page, and put the second language beside the first. Nothing is unfamiliar except the words, and the pictures explain those.",
          "Line by line is the layout that helps. English sentence, Spanish sentence, directly underneath, so the eye pairs them without effort. Page by page, English on the left and Spanish on the right, works too, but the pairing is looser.",
          "This is equally useful in both directions. Spanish speaking families in the United States use it to bring English in gently. English speaking families use it to start Spanish. Same book, same pages.",
        ],
        checklist: [
          "A story the child already likes, not a new one",
          "Line by line layout, both languages visible together",
          "Short sentences, everyday words",
          "Pictures that carry the meaning without translation",
          "The same book usable in either direction",
        ],
        pick: "The Little Max story in both languages, line beside line.",
        faq: [
          {
            q: "Will two languages confuse a toddler?",
            a: "Families raising children in two languages generally find the opposite. What helps most is that both languages are heard regularly, in ordinary situations, and without pressure.",
          },
          {
            q: "Should we finish the story in one language first?",
            a: "Many families read the whole page in the home language first and then repeat it in the second. That keeps the story flowing and still gives the second language a turn.",
          },
        ],
      },
      es: {
        title: "Libros bilingües en inglés y español para niños",
        lead: "Un segundo idioma entra más fácil en una historia que el niño ya se sabe de memoria.",
        body: [
          "El error habitual con los libros bilingües es presentar un idioma nuevo y una historia nueva al mismo tiempo. El niño trabaja con dos incógnitas a la vez, y una de las dos se cae, normalmente el idioma.",
          "Al revés funciona mejor. Toma una historia que el niño ya oyó muchas veces, en la que sabe qué pasa en la página siguiente, y pon el segundo idioma junto al primero. Nada resulta desconocido salvo las palabras, y las ilustraciones las explican.",
          "Línea por línea es la disposición que ayuda. Frase en inglés, frase en español justo debajo, para que el ojo las empareje sin esfuerzo. Página por página, inglés a la izquierda y español a la derecha, también sirve, pero el emparejamiento es más flojo.",
          "Esto es igual de útil en las dos direcciones. Las familias hispanohablantes en Estados Unidos lo usan para ir metiendo el inglés con suavidad. Las familias angloparlantes lo usan para empezar con el español. El mismo libro, las mismas páginas.",
        ],
        checklist: [
          "Una historia que al niño ya le gusta, no una nueva",
          "Disposición línea por línea, los dos idiomas visibles juntos",
          "Frases cortas, palabras cotidianas",
          "Ilustraciones que sostienen el significado sin traducción",
          "El mismo libro sirve en cualquiera de las dos direcciones",
        ],
        pick: "La historia de Pequeño Max en los dos idiomas, línea junto a línea.",
        faq: [
          {
            q: "¿Dos idiomas confunden a un niño pequeño?",
            a: "Las familias que crían en dos idiomas suelen ver lo contrario. Lo que más ayuda es que los dos idiomas se oigan con regularidad, en situaciones cotidianas y sin presión.",
          },
          {
            q: "¿Conviene terminar la historia primero en un idioma?",
            a: "Muchas familias leen la página entera en el idioma de casa y luego la repiten en el segundo. Así la historia fluye y el segundo idioma igual tiene su turno.",
          },
        ],
      },
    },
  },

  /* ===== 8. Подарок ===== */
  {
    id: "book-gifts",
    bookId: "lucky-rocky-two-in-one-en",
    bookIdEs: "lucky-rocky-two-in-one-es",
    slug: {
      en: "book-gifts-for-kids-ages-3-7",
      es: "libros-de-regalo-para-ninos-de-3-a-7-anos",
    },
    related: ["how-to-choose", "bedtime-preschoolers", "easy-coloring-adults"],
    copy: {
      en: {
        title: "Book gifts for kids ages 3 to 7",
        lead: "Buying for someone else's child means guessing the level. Here is how to guess well.",
        body: [
          "When you buy for your own child you know what they can do. As a gift, you rarely do, and the safe move is not the simplest book. It is the book that works across a wider range.",
          "Two things widen the range. A story that can be read to a child or by a child covers three years in one book. And a hardcover edition survives a household you know nothing about.",
          "Avoid pinning the gift to a narrow interest unless you are certain. Dinosaurs are a wonderful gift for a child who loves dinosaurs and a dead end for one who does not. A story about friendship lands almost everywhere.",
          "One more practical point. If the family speaks Spanish at home, a bilingual or Spanish edition is not a compromise, it is the better gift. It gets read aloud instead of shelved.",
        ],
        checklist: [
          "Works read aloud and read alone",
          "Hardcover if you want it to last",
          "A theme with wide appeal, not a narrow obsession",
          "The family's home language",
          "Age range that spans a few years, not one",
        ],
        pick: "Two story collections in one hardcover volume. Our most given book, and the one with the awards.",
        faq: [
          {
            q: "What if the child already has it?",
            a: "Both story collections also exist as separate paperbacks, so a family that owns one can still use the other.",
          },
          {
            q: "Paperback or hardcover as a gift?",
            a: "Hardcover for a gift, paperback for daily use. A gift gets handled by more people and usually stays on the shelf longer.",
          },
        ],
      },
      es: {
        title: "Libros de regalo para niños de 3 a 7 años",
        lead: "Comprar para el hijo de otra persona significa adivinar el nivel. Así se adivina bien.",
        body: [
          "Cuando compras para tu propio hijo sabes lo que puede hacer. Como regalo, rara vez lo sabes, y la jugada segura no es el libro más simple. Es el libro que funciona en un rango más amplio.",
          "Dos cosas amplían el rango. Una historia que se puede leer al niño o que el niño puede leer cubre tres años en un solo libro. Y una edición en tapa dura sobrevive a una casa que no conoces.",
          "Evita atar el regalo a un interés estrecho salvo que estés seguro. Los dinosaurios son un regalo maravilloso para un niño que ama los dinosaurios y un callejón sin salida para el que no. Una historia sobre amistad encaja casi en todas partes.",
          "Un punto práctico más. Si en la familia se habla español en casa, una edición bilingüe o en español no es una concesión, es el mejor regalo. Se lee en voz alta en lugar de quedarse en el estante.",
        ],
        checklist: [
          "Sirve leído en voz alta y leído solo",
          "Tapa dura si quieres que dure",
          "Un tema de interés amplio, no una obsesión estrecha",
          "El idioma que se habla en esa casa",
          "Un rango de edad de varios años, no de uno",
        ],
        pick: "Dos colecciones de cuentos en un solo volumen de tapa dura. Nuestro libro más regalado, y el que tiene los premios.",
        faq: [
          {
            q: "¿Y si el niño ya lo tiene?",
            a: "Las dos colecciones de cuentos existen además por separado en tapa blanda, así que una familia que tiene una puede aprovechar la otra.",
          },
          {
            q: "¿Tapa blanda o tapa dura para regalar?",
            a: "Tapa dura para regalo, tapa blanda para el uso diario. Un regalo pasa por más manos y suele quedarse más tiempo en el estante.",
          },
        ],
      },
    },
  },

  /* ===== 9. Раскраска для взрослого ===== */
  {
    id: "easy-coloring-adults",
    bookId: "take-a-break-animals-en",
    bookIdEs: "take-a-break-animals-es",
    slug: {
      en: "easy-coloring-books-for-adults",
      es: "libros-para-colorear-faciles-para-adultos",
    },
    related: ["what-to-look-for", "how-to-choose", "book-gifts"],
    copy: {
      en: {
        title: "Easy coloring books for adults",
        lead: "A child needs thick lines because they cannot do fine work yet. An adult often wants thick lines because they do not want to.",
        body: [
          "Adult coloring drifted toward the intricate. Dense mandalas, hairline detail, pages that take several evenings. For some people that is exactly the appeal. For a lot of others it is why the book stopped being relaxing.",
          "If you are coloring to unwind after work, the useful measure is not how impressive the page looks. It is whether you can finish it tonight. An unfinished page waiting on the table is one more open task, and open tasks are the thing you were trying to escape.",
          "Bold lines and open shapes give you the other version. Twenty minutes, a finished page, no eye strain, no magnifying glass, no fine-tip pens required. You can use whatever is in the drawer.",
          "This also makes the book shareable. A page with open shapes can be colored by a grandparent and a grandchild sitting at the same table, each doing their own, which is not true of a mandala.",
        ],
        checklist: [
          "Bold outlines, open shapes",
          "A page you can finish in one sitting",
          "Single-sided printing for markers",
          "No fine detail that needs special pens",
          "Large page, comfortable to work on",
        ],
        pick: "Fifty bold designs made to be finished in an evening.",
        faq: [
          {
            q: "Is this too simple for an adult?",
            a: "It is simpler to color, not simpler to look at. The choice of color does the work, and that is where the calm comes from.",
          },
          {
            q: "Can a child use the same book?",
            a: "Yes, and many families do exactly that. Older children handle these pages comfortably.",
          },
        ],
      },
      es: {
        title: "Libros para colorear fáciles para adultos",
        lead: "Un niño necesita líneas gruesas porque todavía no puede hacer trabajo fino. Un adulto muchas veces quiere líneas gruesas porque no le apetece hacerlo.",
        body: [
          "El colorear para adultos derivó hacia lo intrincado. Mandalas densos, detalle de línea finísima, páginas que ocupan varias noches. Para algunas personas ese es justamente el atractivo. Para muchas otras es la razón por la que el libro dejó de relajar.",
          "Si coloreas para desconectar después del trabajo, la medida útil no es lo impresionante que queda la página. Es si puedes terminarla esta noche. Una página a medias esperando en la mesa es una tarea abierta más, y las tareas abiertas son justo de lo que querías escapar.",
          "Las líneas marcadas y las formas abiertas te dan la otra versión. Veinte minutos, una página terminada, sin forzar la vista, sin lupa, sin necesidad de rotuladores de punta fina. Puedes usar lo que haya en el cajón.",
          "Esto además hace el libro compartible. Una página de formas abiertas la pueden colorear un abuelo y un nieto sentados a la misma mesa, cada uno la suya, y eso con un mandala no pasa.",
        ],
        checklist: [
          "Contornos marcados, formas abiertas",
          "Una página que puedes terminar de una sentada",
          "Impresión a una sola cara, pensada para marcadores",
          "Sin detalle fino que exija rotuladores especiales",
          "Página grande, cómoda para trabajar",
        ],
        pick: "Cincuenta diseños de línea marcada, hechos para terminarse en una noche.",
        faq: [
          {
            q: "¿No es demasiado simple para un adulto?",
            a: "Es más simple de colorear, no más simple de mirar. La elección del color hace el trabajo, y de ahí viene la calma.",
          },
          {
            q: "¿Puede usar el mismo libro un niño?",
            a: "Sí, y muchas familias hacen exactamente eso. Los niños mayores manejan estas páginas sin problema.",
          },
        ],
      },
    },
  },

  /* ===== 10. На что смотреть в раскраске ===== */
  {
    id: "what-to-look-for",
    bookId: "little-max-coloring-1-en",
    bookIdEs: "little-max-coloring-1-es",
    slug: {
      en: "what-to-look-for-in-a-coloring-book",
      es: "en-que-fijarse-al-comprar-un-libro-para-colorear",
    },
    related: ["how-to-choose", "coloring-toddlers-1-3", "easy-coloring-adults"],
    copy: {
      en: {
        title: "What to look for in a coloring book",
        lead: "Five things you can check before buying, none of which appear in the marketing copy.",
        body: [
          "Coloring books all describe themselves the same way. Fun, creative, perfect for little ones. None of that helps you compare two books, so here is what actually differs between them.",
          "Line weight. This is the single biggest factor for anyone under four, and almost nobody states it. Look at the sample images. If the outline looks like a pencil stroke, it is too thin for a toddler. It should look drawn with a marker.",
          "Printing. Single-sided or double-sided. Double-sided doubles the drawings for the same page count, which is why it is common, and it means one marker ruins two pictures. If a listing does not say, assume double-sided.",
          "Objects per page. One large object is a different book from a full scene, even if both are labeled for the same age. Count the elements in the sample.",
          "Page size. 8.5 x 11 inches is the comfortable size for a child's whole hand. Smaller travel formats are genuinely useful in a car and genuinely frustrating at a table.",
          "Subject range. A book of one theme is a gamble unless you already know the child loves it. A book with many themes lets the child show you what they like, and that tells you what to buy next.",
        ],
        checklist: [
          "Line weight: marker-thick, not pencil-thin",
          "Single-sided printing, blank reverse",
          "One object per page for the youngest",
          "8.5 x 11 inches",
          "Enough different themes to find a favorite",
        ],
        pick: "Every one of those five checks, in one book. That is the whole design brief.",
        faq: [
          {
            q: "How do I check line weight before buying?",
            a: "Open the sample images on the product page and look at the outline next to the text. If the outline is thinner than a printed letter, it is thin.",
          },
          {
            q: "Does paper thickness matter?",
            a: "Less than people expect, if the printing is single-sided. With single-sided pages, a marker that soaks through only marks a blank back.",
          },
        ],
      },
      es: {
        title: "En qué fijarse al comprar un libro para colorear",
        lead: "Cinco cosas que puedes comprobar antes de comprar, y ninguna aparece en el texto de venta.",
        body: [
          "Todos los libros para colorear se describen igual. Divertido, creativo, perfecto para los peques. Nada de eso te sirve para comparar dos libros, así que esto es lo que de verdad los diferencia.",
          "Grosor de línea. Es el factor más importante para cualquier niño menor de cuatro años, y casi nadie lo indica. Mira las imágenes de muestra. Si el contorno parece un trazo de lápiz, es demasiado fino para un niño pequeño. Debería parecer hecho con marcador.",
          "Impresión. A una cara o a dos. La impresión a dos caras duplica los dibujos con el mismo número de páginas, por eso es común, y significa que un marcador arruina dos dibujos. Si la ficha no lo dice, da por hecho que es a dos caras.",
          "Objetos por página. Un objeto grande es un libro distinto de una escena completa, aunque los dos digan la misma edad. Cuenta los elementos en la muestra.",
          "Tamaño de página. 8.5 x 11 pulgadas es el tamaño cómodo para la mano entera de un niño. Los formatos pequeños de viaje son realmente útiles en el coche y realmente frustrantes en una mesa.",
          "Variedad de temas. Un libro de un solo tema es una apuesta salvo que ya sepas que al niño le encanta. Un libro con muchos temas deja que el niño te enseñe qué le gusta, y eso te dice qué comprar después.",
        ],
        checklist: [
          "Grosor de línea: de marcador, no de lápiz",
          "Impresión a una sola cara, reverso en blanco",
          "Un objeto por página para los más pequeños",
          "8.5 x 11 pulgadas",
          "Bastantes temas distintos para encontrar un favorito",
        ],
        pick: "Las cinco comprobaciones, en un solo libro. Ese fue todo el encargo de diseño.",
        faq: [
          {
            q: "¿Cómo compruebo el grosor de línea antes de comprar?",
            a: "Abre las imágenes de muestra en la ficha del producto y mira el contorno al lado del texto. Si el contorno es más fino que una letra impresa, es fino.",
          },
          {
            q: "¿Importa el grosor del papel?",
            a: "Menos de lo que se cree, si la impresión es a una sola cara. Con páginas a una cara, un marcador que cala solo mancha un reverso en blanco.",
          },
        ],
      },
    },
  },
];

export function guidesForLang(lang: UiLang): Guide[] {
  return guides.filter((g) => g.slug[lang] && g.copy[lang]);
}

export function guideBySlug(lang: UiLang, slug: string): Guide | undefined {
  return guides.find((g) => g.slug[lang] === slug);
}

/** Книга-решение для этой страницы на этом языке. */
export function guideBookId(g: Guide, lang: UiLang): string {
  if (lang === "es" && g.bookIdEs) return g.bookIdEs;
  return g.bookId;
}

/** Соседние статьи, которые есть на этом языке. */
export function relatedGuides(guide: Guide, lang: UiLang): Guide[] {
  const ids = guide.related ?? [];
  return ids
    .map((id) => guides.find((g) => g.id === id))
    .filter((g): g is Guide => Boolean(g && g.slug[lang] && g.copy[lang]));
}
