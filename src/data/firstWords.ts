// Раздел "Первые слова".
//
// Зачем он есть. В наших раскрасках для малышей под каждым рисунком
// написано слово. До сих пор это упоминалось одной строкой на странице
// книги. Раздел делает из этой особенности отдельную дверь на сайт:
// родитель ищет не "раскраску", а "первые слова для двухлетнего",
// и приходит сюда, а отсюда к книге.
//
// Правило раздела: ничего, чего нет в книгах. Все слова на страницах
// тем берутся из состава книги (bookTopics), рисунки взяты из нее же.
// Обещаний про развитие речи и обучение чтению не даем: мы описываем
// то, что взрослый делает с книгой, и не более.
//
// Страницы устроены короткими самостоятельными кусками: вопрос и
// законченный ответ на 40-80 слов. Так их читает человек и так же
// их берет нейросеть, когда собирает ответ на вопрос родителя.

import type { UiLang } from "./books";
import { topicsForBook, type TopicGroup } from "./bookTopics";

/* ------------------------------------------------------------------ */
/*  Книги раздела                                                      */
/* ------------------------------------------------------------------ */

/** Книги, где под каждым рисунком написано слово. Английские издания;
    испанские подтягиваются через пару, как везде на сайте. */
export const WORDS_BOOK_IDS = [
  "first-coloring-book-111-en",
  "little-max-coloring-1-en",
  "little-max-coloring-2-en",
] as const;

export const WORDS_BOOK_IDS_ES = [
  "first-coloring-book-111-es",
  "little-max-coloring-1-es",
  "little-max-coloring-2-es",
] as const;

export const wordsBookIds = (lang: UiLang): readonly string[] =>
  lang === "es" ? WORDS_BOOK_IDS_ES : WORDS_BOOK_IDS;

/* ------------------------------------------------------------------ */
/*  Строение страницы                                                  */
/* ------------------------------------------------------------------ */

export interface WordsStep {
  n: string;
  title: string;
  text: string;
}

export interface WordsCopy {
  /** Заголовок страницы и H1. Пишется под вопрос родителя. */
  title: string;
  /** Первый абзац: это то, что я ищу, да или нет. */
  lead: string;
  /** Законченный ответ на 40-80 слов. Его берет нейросеть. */
  definition: string;
  /** Подпись над тремя рисунками. */
  showcase: string;
  /** Заголовок списка слов. */
  wordsTitle: string;
  wordsLead: string;
  /** Заголовок и подводка к книгам. */
  booksTitle: string;
  booksLead: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export interface WordsPage {
  id: string;
  /** Имена рисунков в /public/words. Три штуки. */
  pictures: string[];
  /** Язык подписи на рисунках. Пусто значит язык страницы.
      Нужен страницам про слова другого языка. */
  pictureLang?: UiLang;
  /** Группы состава книги, из которых берется список слов. */
  groups: string[];
  /** Показывать слова парами, английское и испанское. */
  pairs?: boolean;
  slug: Partial<Record<UiLang, string>>;
  copy: Partial<Record<UiLang, WordsCopy>>;
}

/* ------------------------------------------------------------------ */
/*  Три действия. Одни и те же на всех страницах раздела               */
/* ------------------------------------------------------------------ */

export const wordsSteps: Record<UiLang, WordsStep[]> = {
  en: [
    {
      n: "1",
      title: "Color",
      text: "Hand the page over and let the child color. One object, thick outlines, nothing else on the sheet to get lost in.",
    },
    {
      n: "2",
      title: "Say",
      text: "Name what is on the page while they work. Cat. A cat says meow. Where are the cat's ears? Nothing to prepare, you already know the words.",
    },
    {
      n: "3",
      title: "Notice the word",
      text: "The word is printed under the picture in hollow letters, so it can be colored too. Point at it, read it out, move on. No drills, no testing.",
    },
  ],
  es: [
    {
      n: "1",
      title: "Colorea",
      text: "Deja que el niño coloree a su manera. Un solo objeto, líneas gruesas y una página sencilla, pensada para manos pequeñas.",
    },
    {
      n: "2",
      title: "Di la palabra",
      text: "Nombra lo que aparece en el dibujo mientras colorean. «Gato». «El gato hace miau». «¿Dónde están las orejas del gato?». No hace falta preparar ninguna actividad.",
    },
    {
      n: "3",
      title: "Mira la palabra",
      text: "Señala la palabra debajo del dibujo y léela en voz alta. Las letras también se pueden colorear. Sin ejercicios ni pruebas: solo colorear, mirar y hablar juntos.",
    },
  ],
  ru: [
    {
      n: "1",
      title: "Раскрась",
      text: "Дайте лист и не мешайте. Один предмет, толстые линии, на странице больше ничего.",
    },
    {
      n: "2",
      title: "Назови",
      text: "Называйте то, что нарисовано, пока ребенок раскрашивает. Кот. Кот говорит мяу. Где у кота уши?",
    },
    {
      n: "3",
      title: "Покажи слово",
      text: "Слово написано под рисунком полыми буквами, его тоже можно раскрасить. Покажите пальцем, прочитайте вслух и идите дальше.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Главная страница раздела                                           */
/* ------------------------------------------------------------------ */

export interface WordsHubTopic {
  /** Номер страницы темы в списке ниже. */
  page: string;
  title: string;
  text: string;
}

export interface WordsHubCopy {
  title: string;
  lead: string;
  definition: string;
  showcase: string;
  howTitle: string;
  topicsTitle: string;
  topicsLead: string;
  topics: WordsHubTopic[];
  booksTitle: string;
  booksLead: string;
  freeTitle: string;
  freeLead: string;
  freeCta: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export const wordsHub: Partial<Record<UiLang, WordsHubCopy>> = {
  en: {
    title: "First Words Coloring Pages for Toddlers",
    lead: "One big picture. One word underneath. Color it, say it out loud, and the word comes along with the coloring.",
    definition:
      "First words coloring pages pair a single familiar object with its name printed underneath. The child colors the picture; the adult names it. The word is set in hollow outline letters, so it can be colored in as well. There are no busy backgrounds and no second object on the page competing for attention.",
    showcase:
      "Three real pages, exactly as they are printed in the books: the drawing, and the word under it in hollow letters.",
    howTitle: "How to use them",
    topicsTitle: "First words by topic",
    topicsLead:
      "The words a small child meets first are the ones already around them: animals, food on the table, cars in the street. Each page below shows the drawings and lists every word in that group.",
    topics: [
      {
        page: "animals",
        title: "Animal first words",
        text: "55 animals, from cat and dog to lion, shark and butterfly.",
      },
      {
        page: "food",
        title: "Food first words",
        text: "14 foods a toddler already knows from the kitchen table.",
      },
      {
        page: "vehicles",
        title: "Vehicle first words",
        text: "8 things that move: car, airplane, rocket, ship.",
      },
      {
        page: "nature",
        title: "Nature first words",
        text: "10 flowers, leaves and plants from a walk in the park.",
      },
      {
        page: "objects",
        title: "Everyday object first words",
        text: "13 familiar things: a present, a camera, a beach hat.",
      },
      {
        page: "fairy",
        title: "Fairy tale first words",
        text: "11 storybook words: unicorn, dragon, mermaid, crown.",
      },
    ],
    booksTitle: "Where these pages come from",
    booksLead:
      "Every drawing on this page is a real page from one of our coloring books. Each book holds 111 pictures with 111 words, one per page, in English or in Spanish.",
    freeTitle: "Try a few free first",
    freeLead:
      "Twenty animal pages, the same big drawings with the word underneath, ready to print at home. See how your child takes to them before buying anything.",
    freeCta: "Get the free pages",
    faqTitle: "Questions parents ask",
    faq: [
      {
        q: "What are first words coloring pages?",
        a: "Coloring pages that show one familiar object with its name printed underneath. The child colors; the adult names the object and points at the word. The word itself is drawn in hollow letters, so it can be colored in too.",
      },
      {
        q: "Does my toddler need to read the word?",
        a: "No. The printed word is there for the adult to say out loud and for the child to look at while coloring. Recognition comes from seeing the same word beside the same picture, not from being asked to read it.",
      },
      {
        q: "Can a two year old learn words from coloring pages?",
        a: "A coloring page does not teach on its own. What it does is give the adult an easy, unforced reason to name something and talk about it while the child is busy and happy. The naming is what matters, and the page makes it effortless.",
      },
      {
        q: "Why only one picture on each page?",
        a: "A page with one object gives a small child a job they can finish. Two or three pictures on a sheet split attention and the page gets abandoned halfway. One object also means one word, with nothing to point at by mistake.",
      },
      {
        q: "Should the word be uppercase or lowercase?",
        a: "Ours are printed with a capital first letter and the rest lowercase, the way the word appears in a book. The letters are hollow and wide, so a child can color inside them long before they can write them.",
      },
      {
        q: "Are the pictures the same in the English and Spanish books?",
        a: "Yes. Same 111 drawings, same order, same page layout. Only the printed word changes: Cat in the English edition, Gato in the Spanish one.",
      },
      {
        q: "Can I print these at home?",
        a: "The free sample pages, yes, on ordinary printer paper. The full books are available as printed paperbacks and as printable PDF files in US Letter and A4.",
      },
    ],
  },
  es: {
    title: "Dibujos para colorear con primeras palabras",
    lead: "Un dibujo grande. Una palabra debajo. El niño colorea mientras el adulto nombra lo que aparece en la página.",
    definition:
      "Los dibujos para colorear con primeras palabras combinan un objeto fácil de reconocer con su nombre impreso debajo. Mientras el niño colorea, el adulto puede nombrar el dibujo y señalar la palabra. Las letras son huecas, por lo que también se pueden colorear. Una imagen, una palabra y ningún fondo recargado que distraiga.",
    showcase:
      "Tres páginas reales de nuestros libros: un dibujo grande y, debajo, su nombre en letras huecas para colorear.",
    howTitle: "Cómo se usan",
    topicsTitle: "Primeras palabras por tema",
    topicsLead:
      "Muchas de las primeras palabras que compartimos con un niño nombran cosas que ya forman parte de su mundo: animales, alimentos, vehículos y objetos cotidianos. Hemos agrupado los dibujos por temas para que sea fácil explorar los que más le interesan.",
    topics: [
      {
        page: "animals",
        title: "Animales",
        text: "55 animales, desde el gato y el perro hasta el león y la mariposa.",
      },
      {
        page: "food",
        title: "Comida",
        text: "14 alimentos representados con dibujos grandes y sencillos.",
      },
      {
        page: "vehicles",
        title: "Vehículos",
        text: "8 vehículos y medios de transporte, del avión al cohete.",
      },
      {
        page: "nature",
        title: "Naturaleza",
        text: "10 plantas, flores y otros elementos de la naturaleza.",
      },
      {
        page: "objects",
        title: "Objetos y juegos",
        text: "13 objetos de la casa, el juego y la vida cotidiana.",
      },
      {
        page: "fairy",
        title: "Cuentos",
        text: "11 personajes y objetos de fantasía: unicornio, dragón, sirena, corona y más.",
      },
    ],
    booksTitle: "De dónde salen estas páginas",
    booksLead:
      "Todos los dibujos que ves aquí aparecen realmente en nuestros libros para colorear. Cada libro reúne 111 dibujos y 111 palabras, una por página, con ediciones en español y en inglés.",
    freeTitle: "Prueba algunas páginas gratis",
    freeLead:
      "Descarga 20 páginas de animales para imprimir en casa. Son los mismos dibujos grandes y sencillos, con una palabra debajo de cada imagen. Pruébalas con tu hijo antes de elegir el libro completo.",
    freeCta: "Descargar páginas gratis",
    faqTitle: "Preguntas de los padres",
    faq: [
      {
        q: "¿Qué son los dibujos para colorear con primeras palabras?",
        a: "Son páginas que combinan un dibujo sencillo con el nombre del objeto impreso debajo. El niño colorea mientras el adulto puede nombrar el dibujo y señalar la palabra. Las letras son huecas y también se pueden colorear.",
      },
      {
        q: "¿Mi hijo tiene que saber leer?",
        a: "No. Estas páginas no están pensadas para enseñar a leer a un niño de uno, dos o tres años. La palabra impresa sirve para que el adulto pueda nombrar el dibujo y para que el niño vea que cada imagen también tiene un nombre escrito.",
      },
      {
        q: "¿Un niño de dos años puede usar estas páginas aunque todavía hable poco?",
        a: "Sí. No hace falta pedirle que lea, repita o memorice nada. El adulto puede simplemente nombrar el dibujo y hablar sobre él mientras el niño colorea.",
      },
      {
        q: "¿Por qué hay un solo dibujo en cada página?",
        a: "Porque queremos mantener la página sencilla: un objeto grande, una palabra y mucho espacio para colorear. Así, tanto el dibujo como la palabra son fáciles de identificar.",
      },
      {
        q: "¿Los dibujos son los mismos en las ediciones en inglés y en español?",
        a: "Sí. Las ediciones correspondientes utilizan los mismos 111 dibujos y la misma composición. Lo que cambia es la palabra impresa debajo: «Gato» en español y «Cat» en inglés.",
      },
      {
        q: "¿Qué variedad de español utiliza el libro?",
        a: "Utilizamos palabras sencillas y de uso común. El español varía entre países y algunos objetos pueden tener más de un nombre correcto. En esos casos elegimos una variante y la mantenemos de forma consistente dentro de la edición.",
      },
      {
        q: "¿Puedo imprimir las páginas en casa?",
        a: "Las páginas gratuitas, sí. Los libros completos existen en papel y también en formato PDF para imprimir en casa, en tamaño carta y A4.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Страницы тем                                                       */
/* ------------------------------------------------------------------ */

export const wordsPages: WordsPage[] = [
  /* ===== Животные ===== */
  {
    id: "animals",
    pictures: ["cat", "lion", "shark"],
    groups: ["land", "water"],
    slug: {
      en: "animal-first-words",
      es: "primeras-palabras-animales",
    },
    copy: {
      en: {
        title: "Animal First Words for Toddlers",
        lead: "55 animals, one on each page, with the name printed underneath in letters big enough to color.",
        definition:
          "Animal first words are the names of animals a small child already meets in daily life and in picture books: cat, dog, bear, lion. On a coloring page each animal gets a page to itself, drawn with thick outlines, with its name printed underneath. The adult names the animal while the child colors it.",
        showcase:
          "A cat from the everyday group, a lion from the zoo group, a shark from the water group. Real pages, at full size.",
        wordsTitle: "All 55 animal words",
        wordsLead:
          "The order is the order of the book. Everyday animals and zoo animals first, then the ones that live in water.",
        booksTitle: "Where these animals come from",
        booksLead:
          "All 55 animals are in our first coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions parents ask",
        faq: [
          {
            q: "Which animal words should a toddler learn first?",
            a: "The ones they can point at: cat, dog, cow, duck, bear. Animals they see at home, in the street or in a picture book are easier to name and easier to remember than an exotic animal they have no reason to think about.",
          },
          {
            q: "Are zoo animals too hard for a two year old?",
            a: "No, and they are usually the favorites. A lion or an elephant is easy to recognize because it looks like nothing else. What matters is the drawing being big and simple, not the animal being familiar.",
          },
          {
            q: "How many animals are in the book?",
            a: "39 land animals and 16 water animals, 55 in all. The rest of the 111 pictures are food, vehicles, nature, everyday objects and fairy tale characters.",
          },
          {
            q: "Can I get a few animal pages free?",
            a: "Yes. Twenty animal pages from the books are free to print at home, with the word under each drawing, the same as in the printed edition.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: animales",
        lead: "55 animales, uno por página, con dibujos grandes y sencillos y su nombre impreso debajo.",
        definition:
          "Los animales son una forma natural de empezar a nombrar lo que aparece en una página. Gato, perro, oso o león son imágenes fáciles de reconocer y dan pie a hablar sobre sonidos, colores, patas y orejas mientras el niño colorea. Cada animal ocupa una hoja entera y lleva su nombre impreso debajo, en letras huecas.",
        showcase:
          "Un gato, un león y un tiburón. Páginas reales, tal como aparecen en nuestros libros.",
        wordsTitle: "Las 55 palabras de animales",
        wordsLead:
          "En el mismo orden en que aparecen en el libro: primero los animales terrestres y después los que viven en el agua.",
        booksTitle: "De dónde salen estos animales",
        booksLead:
          "Los 55 animales forman parte de nuestros primeros libros para colorear, con un dibujo grande y una palabra en cada página.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Qué animales puedo nombrar primero?",
            a: "Empieza por los que tu hijo ya conoce o puede encontrar con facilidad: gato, perro, vaca, pato u oso. También puedes seguir simplemente sus intereses. Si le encantan los leones o los elefantes, empieza por ellos.",
          },
          {
            q: "¿Los animales del zoológico son demasiado difíciles para un niño pequeño?",
            a: "No es necesario limitarse a los animales que ve todos los días. Los libros y los cuentos también forman parte de su mundo. Un león, una jirafa o un elefante pueden ser tan divertidos de señalar y nombrar como un gato.",
          },
          {
            q: "¿Cuántos animales incluye el libro?",
            a: "Incluye 55 animales: 39 terrestres y 16 acuáticos. Los demás dibujos, hasta completar 111, pertenecen a otros temas: comida, vehículos, naturaleza, objetos y personajes de cuento.",
          },
          {
            q: "¿Hay páginas de animales gratis?",
            a: "Sí. Puedes imprimir gratis 20 páginas de animales tomadas de nuestros libros, cada una con el nombre debajo del dibujo.",
          },
        ],
      },
    },
  },

  /* ===== Еда ===== */
  {
    id: "food",
    pictures: ["cake", "icecream", "strawberry"],
    groups: ["food"],
    slug: {
      en: "food-first-words",
      es: "primeras-palabras-comida",
    },
    copy: {
      en: {
        title: "Food First Words for Toddlers",
        lead: "14 foods a small child already knows from the table, each with its name printed under the drawing.",
        definition:
          "Food first words are the names of things a child eats or sees being eaten: cake, orange, carrot, strawberry. They are easy words to practice because they come up several times a day, at every meal, without anyone having to arrange a lesson.",
        showcase:
          "Cake, ice cream and a strawberry, printed exactly as they appear in the book.",
        wordsTitle: "All 14 food words",
        wordsLead: "Sweets first, then fruit and vegetables.",
        booksTitle: "Where these pages come from",
        booksLead:
          "The food group is part of the 111 pictures in our first coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions parents ask",
        faq: [
          {
            q: "Why are food words good first words?",
            a: "Because they repeat. A child hears orange, banana or cake several times a day at the table, so the name and the object line up naturally, without anyone setting time aside to teach.",
          },
          {
            q: "Can I use the page at mealtimes?",
            a: "It works well. Color the carrot page in the afternoon, then hand a real carrot over at dinner and name it again. The page and the plate reinforce each other with no effort from you.",
          },
          {
            q: "Which foods are in the book?",
            a: "Cake, ice cream, watermelon, carrot, broccoli, orange, cherry, avocado, strawberry, pear, pineapple, lemon, pumpkin and a donut. Fourteen in all.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: comida",
        lead: "14 alimentos, cada uno representado con un dibujo grande y su nombre debajo.",
        definition:
          "La comida forma parte de la vida cotidiana del niño y ofrece muchas oportunidades para nombrar lo que ve. Estas páginas reúnen frutas, verduras y dulces que también aparecen en la mesa durante el día, así que la misma palabra se repite sin necesidad de convertirla en lección.",
        showcase: "Tres páginas reales del libro: torta, helado y fresa.",
        wordsTitle: "Las 14 palabras de comida",
        wordsLead: "Primero los dulces, después las frutas y las verduras.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Estos 14 dibujos forman parte de los 111 dibujos de nuestros primeros libros para colorear.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Por qué usar palabras relacionadas con la comida?",
            a: "Porque son fáciles de incorporar a una conversación cotidiana. Puedes colorear una naranja y volver a nombrarla más tarde, cuando aparezca una naranja de verdad en la cocina o en la mesa.",
          },
          {
            q: "¿Podemos relacionar el dibujo con alimentos reales?",
            a: "Claro. Si colorean una zanahoria, pueden buscar después una zanahoria en la cocina y volver a decir su nombre. No hace falta convertirlo en una lección.",
          },
          {
            q: "¿Qué alimentos aparecen en el libro?",
            a: "Torta, helado, sandía, zanahoria, brócoli, naranja, guinda, aguacate, fresa, pera, piña, limón, calabaza y buñuelo. Catorce en total.",
          },
        ],
      },
    },
  },

  /* ===== Транспорт ===== */
  {
    id: "vehicles",
    pictures: ["airplane", "helicopter", "rocket"],
    groups: ["vehicles"],
    slug: {
      en: "vehicle-first-words",
      es: "primeras-palabras-vehiculos",
    },
    copy: {
      en: {
        title: "Vehicle First Words for Toddlers",
        lead: "8 things that move, drawn big and simple, each with its name under the picture.",
        definition:
          "Vehicle first words are the names of things that carry people and move: car, airplane, ship, rocket. Children point at them from the stroller long before they can say them, which makes the word easy to attach to something the child already cares about.",
        showcase: "An airplane, a helicopter and a rocket, as printed in the book.",
        wordsTitle: "All 8 vehicle words",
        wordsLead: "On the road, in the air, on the water and beyond.",
        booksTitle: "Where these pages come from",
        booksLead:
          "The vehicles are part of the 111 pictures in our first coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions parents ask",
        faq: [
          {
            q: "Why do toddlers latch onto vehicle words?",
            a: "Because vehicles move and make noise, and a child notices them without being told to. A word attached to something a child already points at needs far less repetition than one they have no interest in.",
          },
          {
            q: "Are there trucks and trains in the book?",
            a: "Eight: car, helicopter, airplane, hot air balloon, ship, submarine, rocket and scooter. Trucks, trains and tractors appear in our directed drawing workbooks for older children.",
          },
          {
            q: "Is a rocket too abstract for a two year old?",
            a: "In practice it is one of the easiest shapes to recognize: a simple cone on a tube. A child does not need to understand space travel to name the picture.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: vehículos",
        lead: "8 vehículos y medios de transporte, dibujados con formas grandes y sencillas y con su nombre debajo.",
        definition:
          "Los vehículos llaman la atención de muchos niños porque aparecen en la calle, en los juguetes y en los cuentos. Estas páginas ofrecen una forma sencilla de nombrarlos mientras el niño colorea: un vehículo por hoja, con su nombre impreso debajo en letras huecas.",
        showcase: "Un avión, un helicóptero y un cohete, tal como aparecen en el libro.",
        wordsTitle: "Las 8 palabras de vehículos",
        wordsLead:
          "Vehículos que se desplazan por carretera, por aire, por agua e incluso por el espacio.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Los vehículos forman parte de los 111 dibujos de nuestros primeros libros para colorear.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Cómo puedo hablar de los vehículos mientras coloreamos?",
            a: "Puedes limitarte a nombrarlos o añadir algo que el niño ya conozca. «Avión». «El avión vuela». «Cohete». No hace falta pedirle que repita la palabra.",
          },
          {
            q: "¿Qué vehículos aparecen en el libro?",
            a: "Ocho: máquina, helicóptero, avión, globo, nave, submarino, cohete y scooter. Cada uno con su nombre impreso debajo del dibujo.",
          },
          {
            q: "¿Hay camiones y trenes?",
            a: "En este libro no. Los camiones, trenes y tractores aparecen en nuestros cuadernos de dibujo paso a paso, pensados para niños algo mayores.",
          },
          {
            q: "¿Un cohete es demasiado complicado para un niño pequeño?",
            a: "No hace falta que entienda cómo funciona. Puede simplemente reconocer el dibujo, colorearlo y escuchar su nombre, igual que con cualquier otro objeto de la página.",
          },
        ],
      },
    },
  },

  /* ===== Природа ===== */
  {
    id: "nature",
    pictures: ["sunflower", "mushroom", "cactus"],
    groups: ["nature"],
    slug: {
      en: "nature-first-words",
      es: "primeras-palabras-naturaleza",
    },
    copy: {
      en: {
        title: "Nature First Words for Toddlers",
        lead: "10 flowers, leaves and plants from an ordinary walk, each with its name under the drawing.",
        definition:
          "Nature first words are the names of things a child picks up outdoors: leaf, flower, mushroom, pine cone. They pair well with coloring because the same object can be found on a walk that afternoon and named again in the child's own hand.",
        showcase: "A sunflower, a mushroom and a cactus, as printed in the book.",
        wordsTitle: "All 10 nature words",
        wordsLead: "Leaves and flowers first, then the plants that grow indoors.",
        booksTitle: "Where these pages come from",
        booksLead:
          "The nature group is part of the 111 pictures in our first coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions parents ask",
        faq: [
          {
            q: "How do I use a nature page on a walk?",
            a: "Color the maple leaf page before going out, then look for a real leaf in the park and say the word again. The page gives the walk a small purpose and the word gets said twice without a lesson.",
          },
          {
            q: "Which plants are in the book?",
            a: "Maple leaf, rose, mushroom, clover, sunflower, pine cone, cactus, lily of the valley, lotus and tulip. Ten in all.",
          },
          {
            q: "Is a lotus a useful word for a small child?",
            a: "Less useful than leaf or flower, and that is fine. A book that only held the ten most common words would be finished in a week. The unusual pictures are what keeps a child turning pages.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: naturaleza",
        lead: "10 dibujos de plantas, flores y otros elementos de la naturaleza, cada uno con su nombre debajo.",
        definition:
          "Esta colección permite llevar la conversación más allá de la página. Algunas de estas formas se pueden encontrar durante un paseo, en un jardín o en casa, así que la palabra se dice una vez al colorear y otra vez al verla de verdad.",
        showcase: "Un girasol, una seta y un cacto, tal como aparecen en el libro.",
        wordsTitle: "Las 10 palabras de naturaleza",
        wordsLead:
          "Una pequeña colección de hojas, flores, plantas y otras formas de la naturaleza.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Los 10 dibujos forman parte de los 111 dibujos de nuestros primeros libros para colorear.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Cómo puedo usar estas páginas durante un paseo?",
            a: "Pueden colorear una hoja o una flor antes de salir y después buscar algo parecido durante el paseo. Si lo encuentran, basta con volver a nombrarlo juntos.",
          },
          {
            q: "¿Qué plantas y elementos de la naturaleza aparecen?",
            a: "Hoja de arce, rosa, seta, trébol, girasol, chichón, cacto, muguete, loto y tulipán. Diez en total.",
          },
          {
            q: "¿Todas estas palabras tienen que ser conocidas para un niño pequeño?",
            a: "No. Algunas serán familiares y otras serán nuevas. No es necesario aprenderlas todas: el niño puede elegir las páginas que más le gusten y descubrir el resto poco a poco.",
          },
        ],
      },
    },
  },

  /* ===== Предметы ===== */
  {
    id: "objects",
    pictures: ["present", "camera", "sunglasses"],
    groups: ["sports", "things"],
    slug: {
      en: "everyday-object-first-words",
      es: "primeras-palabras-objetos",
    },
    copy: {
      en: {
        title: "Everyday Object First Words for Toddlers",
        lead: "13 familiar things from around the house and the beach bag, each with its name under the drawing.",
        definition:
          "Everyday object first words are the names of things a child handles or watches an adult handle: a present, a camera, sunglasses, a ball. They are the easiest words of all to practice, because the real object is usually within reach while the coloring is going on.",
        showcase: "A present, a camera and sunglasses, as printed in the book.",
        wordsTitle: "All 13 object words",
        wordsLead: "Play and hobbies first, then things around the house.",
        booksTitle: "Where these pages come from",
        booksLead:
          "These objects are part of the 111 pictures in our first coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions parents ask",
        faq: [
          {
            q: "What makes object words easy to practice?",
            a: "The real thing is usually in the room. Color the sunglasses page, then put your own sunglasses on and say the word again. The child links the drawing, the word and the object in one go.",
          },
          {
            q: "Which objects are in the book?",
            a: "Skateboard, kite, badminton, American football, camera, drum, beach ball, sunglasses, beach umbrella, beach hat, globe, present and gamepad.",
          },
          {
            q: "My child is more interested in the ball than the page. Is that a problem?",
            a: "Not at all. The point of the page is to start the naming, not to hold attention for twenty minutes. If it ends with a ball on the floor and the word said out loud twice, it did its job.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: objetos y juegos",
        lead: "13 objetos relacionados con el juego, la casa y la vida cotidiana, cada uno con su nombre debajo.",
        definition:
          "Los objetos ofrecen muchas oportunidades para hablar mientras se colorea. Algunos están en casa y otros resultan familiares por los juegos, los deportes o las actividades de familia. Lo habitual es que el objeto de verdad esté cerca, y entonces el dibujo, la palabra y la cosa se juntan de una vez.",
        showcase: "Un regalo, una cámara y unas gafas, tal como aparecen en el libro.",
        wordsTitle: "Las 13 palabras de objetos y juegos",
        wordsLead:
          "Objetos relacionados con el juego, los deportes, las aficiones y la vida cotidiana.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Estos dibujos forman parte de los 111 dibujos de nuestros primeros libros para colorear.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Cómo puedo usar objetos reales junto con las páginas?",
            a: "Si el objeto está en casa, puedes mostrarlo después de colorear. Coloreen unas gafas y después busquen unas gafas de verdad. Basta con nombrarlas y dejar que el niño haga la conexión a su manera.",
          },
          {
            q: "¿Qué objetos aparecen en el libro?",
            a: "Monopatín, cometa, bádminton, fútbol americano, cámara, tambor, pelota de playa, gafas, sombrilla de playa, sombrero, globo, regalo y gamepads.",
          },
          {
            q: "¿Qué pasa si a mi hijo solo le interesan algunas páginas?",
            a: "No pasa nada. No es necesario completar las páginas en orden ni recorrer todas las palabras. Empieza por los dibujos que más le llamen la atención.",
          },
        ],
      },
    },
  },

  /* ===== Сказочные ===== */
  {
    id: "fairy",
    pictures: ["unicorn", "dragon", "mermaid"],
    groups: ["fantasy"],
    slug: {
      en: "fairy-tale-first-words",
      es: "primeras-palabras-cuentos",
    },
    copy: {
      en: {
        title: "Fairy Tale First Words for Toddlers",
        lead: "11 storybook characters and objects, each with its name printed under the drawing.",
        definition:
          "Fairy tale first words are the names of characters a child meets in stories before meeting them anywhere else: unicorn, dragon, mermaid, crown. They are worth coloring because the child already has a story attached to the picture, and a word attached to a story is remembered easily.",
        showcase: "A unicorn, a dragon and a mermaid, as printed in the book.",
        wordsTitle: "All 11 fairy tale words",
        wordsLead: "Characters first, then the objects that belong to them.",
        booksTitle: "Where these pages come from",
        booksLead:
          "The fairy tale group is part of the 111 pictures in our first coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions parents ask",
        faq: [
          {
            q: "Should first words be real things only?",
            a: "There is no rule saying so. A child who has heard about dragons at bedtime recognizes one instantly, and a word attached to a story they love takes hold faster than the name of an object they never think about.",
          },
          {
            q: "Which characters are in the book?",
            a: "Mermaid, unicorn, dragon, crown, dwarf, griffin, troll, fairy, magic cauldron, wizard's hat and magic potion.",
          },
          {
            q: "Are the drawings frightening for a small child?",
            a: "No. The dragon and the troll are drawn round and smiling, in the same style as the cat and the bunny. Nothing in the book is meant to be scary.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: cuentos",
        lead: "11 personajes y objetos de fantasía, cada uno con su nombre impreso debajo.",
        definition:
          "Las primeras palabras no tienen por qué limitarse a objetos cotidianos. Los cuentos también están llenos de imágenes que los niños reconocen y disfrutan: unicornios, dragones, sirenas, hadas y objetos mágicos. Si el niño ya tiene una historia unida al dibujo, la palabra le resulta más cercana.",
        showcase: "Un unicornio, un dragón y una sirena, tal como aparecen en el libro.",
        wordsTitle: "Las 11 palabras de cuentos",
        wordsLead:
          "Personajes de fantasía y algunos de los objetos mágicos que aparecen en sus historias.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Estos 11 dibujos forman parte de los 111 dibujos de nuestros primeros libros para colorear.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Las primeras palabras tienen que ser siempre cosas reales?",
            a: "No. Los cuentos también ofrecen muchas oportunidades para nombrar personajes y objetos. Si a tu hijo le gustan los dragones o los unicornios, pueden formar parte de la conversación igual que un gato o una pelota.",
          },
          {
            q: "¿Qué personajes y objetos aparecen?",
            a: "Sirena, unicornio, dragón, corona, gnomo, grifo, trole, hada, caldera mágica, sombrero de mago y poción mágica.",
          },
          {
            q: "¿Los dibujos dan miedo?",
            a: "No. Los personajes están dibujados con el mismo estilo amable y sencillo que el resto de la colección. Incluso el dragón y el trole tienen un aspecto simpático, pensado para niños pequeños.",
          },
        ],
      },
    },
  },

  /* ===== Английские слова ===== */
  {
    id: "english",
    pictures: ["cat", "dog", "cake"],
    pictureLang: "en",
    groups: ["land", "food", "vehicles"],
    pairs: true,
    slug: {
      en: "first-english-words-for-toddlers",
      es: "primeras-palabras-en-ingles",
    },
    copy: {
      en: {
        title: "First English Words for Toddlers",
        lead: "The English edition prints an English word under every picture. Here is what is inside, and how it lines up with the Spanish edition.",
        definition:
          "First English words for toddlers are the everyday nouns a child hears most: cat, dog, car, cake. In our English edition each of the 111 pictures carries its English name underneath, printed in hollow letters that can be colored. The Spanish edition uses the same 111 drawings with Spanish names.",
        showcase: "Cat, Dog and Cake, printed as they appear in the English edition.",
        wordsTitle: "English and Spanish side by side",
        wordsLead:
          "Same drawing, two editions, two words. Useful if there are two languages at home and you want to know exactly what each book says.",
        booksTitle: "The English editions",
        booksLead:
          "Three coloring books, 111 pictures and 111 English words in each, one per page.",
        faqTitle: "Questions parents ask",
        faq: [
          {
            q: "Is this a bilingual coloring book?",
            a: "No. Each book is in one language. The English edition prints Cat, the Spanish edition prints Gato, and the drawings are identical. Families who want both buy both, and the pages match up page for page.",
          },
          {
            q: "We speak Spanish at home and want English words. Which edition?",
            a: "The English edition. The pictures need no translation, so a Spanish-speaking parent can use it without reading English: point at the drawing, say the English word printed under it.",
          },
          {
            q: "Which English words should come first?",
            a: "The ones the child hears most: names of family pets, food on the table, things in the street. A word that comes up ten times a day needs no practice sheet at all, only something to point at.",
          },
        ],
      },
      es: {
        title: "Primeras palabras en inglés para niños",
        lead: "La edición en inglés incluye una palabra inglesa debajo de cada dibujo. Los mismos dibujos también están disponibles en la edición en español.",
        definition:
          "Las primeras palabras en inglés de esta colección son nombres de animales, alimentos, vehículos y objetos fáciles de representar: cat, dog, car, cake. Cada uno de los 111 dibujos lleva su nombre en inglés debajo, en letras huecas que también se pueden colorear.",
        showcase: "Cat, Dog y Cake, tal como aparecen en la edición inglesa.",
        wordsTitle: "Inglés y español, uno al lado del otro",
        wordsLead:
          "El mismo dibujo aparece en dos ediciones: una con la palabra en inglés y otra con la palabra en español. Así puedes ver exactamente qué palabra imprime cada libro.",
        booksTitle: "Las ediciones en inglés",
        booksLead:
          "Nuestros libros para colorear incluyen 111 dibujos y 111 palabras en inglés, una por página.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Es un libro bilingüe?",
            a: "No. Cada libro utiliza un solo idioma. La edición inglesa imprime «Cat» y la edición española imprime «Gato». Los dibujos son los mismos, página por página.",
          },
          {
            q: "En casa hablamos español. ¿Podemos elegir la edición en inglés?",
            a: "Sí. Los dibujos permiten identificar cada objeto aunque el idioma principal de la familia sea el español, y la palabra de debajo muestra cómo se escribe su nombre en inglés.",
          },
          {
            q: "¿Qué palabras en inglés conviene mirar primero?",
            a: "Empieza por las que correspondan a cosas que el niño ya reconoce: animales, alimentos, juguetes u objetos cotidianos. También puedes dejar que elija simplemente sus dibujos favoritos.",
          },
        ],
      },
    },
  },

  /* ===== Испанские слова ===== */
  {
    id: "spanish",
    pictures: ["cat", "dog", "cake"],
    pictureLang: "es",
    groups: ["land", "food", "vehicles"],
    pairs: true,
    slug: {
      en: "first-spanish-words-for-toddlers",
      es: "primeras-palabras-en-espanol",
    },
    copy: {
      en: {
        title: "First Spanish Words for Toddlers",
        lead: "The Spanish edition prints a Spanish word under every picture. Same 111 drawings, Spanish names.",
        definition:
          "First Spanish words for toddlers are the everyday nouns a Spanish-speaking child hears most: gato, perro, torta, helado. Our Spanish edition prints the Spanish name under each of the 111 drawings in hollow letters that can be colored. The English edition uses the same drawings with English names.",
        showcase: "Gato, Perro and Torta, printed as they appear in the Spanish edition.",
        wordsTitle: "Spanish and English side by side",
        wordsLead:
          "Same drawing, two editions, two words. Useful for a dual language home, and for seeing exactly which Spanish word each page prints.",
        booksTitle: "The Spanish editions",
        booksLead:
          "Three coloring books, 111 pictures and 111 Spanish words in each, one per page.",
        faqTitle: "Questions parents ask",
        faq: [
          {
            q: "Is this a bilingual coloring book?",
            a: "No. Each book is in one language. The Spanish edition prints Gato, the English edition prints Cat, and the drawings are identical, page for page.",
          },
          {
            q: "We speak English at home and want Spanish words. Which edition?",
            a: "The Spanish edition. You do not need to read Spanish to use it: the picture tells you what the object is, and the word underneath is the Spanish name for it.",
          },
          {
            q: "Which Spanish is used, Spain or Latin America?",
            a: "Everyday words that are understood on both sides, chosen so a page never depends on a regional term. Where two names are common, the book uses the one a small child is most likely to hear.",
          },
        ],
      },
      es: {
        title: "Primeras palabras en español para niños",
        lead: "La edición en español incluye una palabra en español debajo de cada dibujo. Los mismos dibujos también están disponibles en la edición en inglés.",
        definition:
          "La colección reúne 111 dibujos de animales, alimentos, vehículos, naturaleza, objetos y personajes de cuento. Debajo de cada dibujo aparece su nombre en español, en letras huecas que también se pueden colorear.",
        showcase: "Gato, Perro y Torta, tal como aparecen en la edición española.",
        wordsTitle: "Español e inglés, uno al lado del otro",
        wordsLead:
          "El mismo dibujo aparece en dos ediciones: una con la palabra en español y otra con la palabra en inglés. Así cada familia puede elegir el idioma que quiere tener impreso en las páginas.",
        booksTitle: "Las ediciones en español",
        booksLead:
          "Nuestros libros para colorear incluyen 111 dibujos y 111 palabras en español, una por página.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Es un libro bilingüe?",
            a: "No. Cada libro está publicado en un solo idioma. La edición española imprime «Gato» y la inglesa «Cat», utilizando los mismos dibujos.",
          },
          {
            q: "¿Qué variedad de español utiliza el libro?",
            a: "Utilizamos palabras sencillas y de uso común. El español varía entre países y algunos objetos pueden tener más de un nombre correcto. En esos casos elegimos una variante y la mantenemos de forma consistente dentro de la edición.",
          },
          {
            q: "¿Puede usarlo una familia que habla inglés?",
            a: "Sí. Los dibujos permiten identificar cada objeto y ver cómo se escribe su nombre en español, aunque en casa no se hable ese idioma.",
          },
        ],
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Выборки                                                            */
/* ------------------------------------------------------------------ */

export function wordsPagesForLang(lang: UiLang): WordsPage[] {
  return wordsPages.filter((p) => Boolean(p.slug[lang] && p.copy[lang]));
}

export function wordsPageBySlug(lang: UiLang, slug: string): WordsPage | undefined {
  return wordsPages.find((p) => p.slug[lang] === slug);
}

export function wordsPageById(id: string): WordsPage | undefined {
  return wordsPages.find((p) => p.id === id);
}

/** Адрес рисунка. Подпись на нем на языке страницы, если у страницы
    не задан свой язык подписей. */
export const wordPictureUrl = (name: string, lang: UiLang, page?: WordsPage) =>
  `/words/${name}-${page?.pictureLang ?? (lang === "es" ? "es" : "en")}.png`;

/** Группы состава книги, из которых страница берет слова. */
export function wordsGroups(page: WordsPage): TopicGroup[] {
  const all = topicsForBook("first-coloring-book-111");
  return page.groups
    .map((id) => all.find((g) => g.id === id))
    .filter(Boolean) as TopicGroup[];
}

/** Слова темы на языке страницы. */
export function wordsList(page: WordsPage, lang: UiLang): string[] {
  return wordsGroups(page).flatMap((g) => g.items[lang] ?? g.items.en ?? []);
}

/** Пары английское слово плюс испанское. Порядок в обоих списках
    одинаковый, поэтому пары собираются по номеру. */
export function wordPairs(page: WordsPage, limit = 24): [string, string][] {
  const out: [string, string][] = [];
  for (const g of wordsGroups(page)) {
    const en = g.items.en ?? [];
    const es = g.items.es ?? [];
    for (let i = 0; i < en.length && i < es.length; i++) out.push([en[i], es[i]]);
  }
  return out.slice(0, limit);
}
