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
      text: "Dele la hoja y deje que coloree. Un solo objeto, líneas gruesas y nada más en la página que lo distraiga.",
    },
    {
      n: "2",
      title: "Dilo",
      text: "Nombre lo que hay en la página mientras colorea. Gato. El gato hace miau. ¿Dónde están las orejas del gato? No hay que preparar nada.",
    },
    {
      n: "3",
      title: "Mira la palabra",
      text: "La palabra está impresa debajo del dibujo en letras huecas, así que también se colorea. Señálela, léala en voz alta y siga. Sin ejercicios y sin examen.",
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
    lead: "Un dibujo grande. Una palabra debajo. El niño colorea, el adulto la dice en voz alta, y la palabra llega junto con el color.",
    definition:
      "Los dibujos para colorear con primeras palabras muestran un solo objeto conocido con su nombre impreso debajo. El niño colorea el dibujo y el adulto lo nombra. La palabra está escrita en letras huecas, así que también se puede colorear. No hay fondos cargados ni un segundo objeto que compita por la atención.",
    showcase:
      "Tres páginas reales, tal como están impresas en los libros: el dibujo y, debajo, la palabra en letras huecas.",
    howTitle: "Cómo se usan",
    topicsTitle: "Primeras palabras por tema",
    topicsLead:
      "Las primeras palabras de un niño pequeño son las que ya tiene alrededor: los animales, la comida de la mesa, los coches de la calle. Cada página de abajo muestra los dibujos y enumera todas las palabras del grupo.",
    topics: [
      {
        page: "animals",
        title: "Animales",
        text: "55 animales, desde el gato y el perro hasta el león y la mariposa.",
      },
      {
        page: "food",
        title: "Comida",
        text: "14 alimentos que el niño ya conoce de la mesa.",
      },
      {
        page: "vehicles",
        title: "Vehículos",
        text: "8 cosas que se mueven: coche, avión, cohete, nave.",
      },
      {
        page: "nature",
        title: "Naturaleza",
        text: "10 flores, hojas y plantas de un paseo por el parque.",
      },
      {
        page: "objects",
        title: "Objetos",
        text: "13 cosas de todos los días: un regalo, una cámara, un sombrero.",
      },
      {
        page: "fairy",
        title: "Cuentos",
        text: "11 palabras de cuento: unicornio, dragón, sirena, corona.",
      },
    ],
    booksTitle: "De dónde salen estas páginas",
    booksLead:
      "Cada dibujo de esta página es una página real de uno de nuestros libros para colorear. Cada libro tiene 111 dibujos y 111 palabras, una por página, en español o en inglés.",
    freeTitle: "Pruebe algunas gratis",
    freeLead:
      "Veinte páginas de animales, los mismos dibujos grandes con la palabra debajo, listas para imprimir en casa. Vea cómo le sientan a su hijo antes de comprar nada.",
    freeCta: "Descargar las páginas gratis",
    faqTitle: "Preguntas de los padres",
    faq: [
      {
        q: "¿Qué son los dibujos para colorear con primeras palabras?",
        a: "Son dibujos que muestran un solo objeto conocido con su nombre impreso debajo. El niño colorea; el adulto nombra el objeto y señala la palabra. La palabra está dibujada en letras huecas, así que también se colorea.",
      },
      {
        q: "¿Mi hijo tiene que saber leer la palabra?",
        a: "No. La palabra impresa está ahí para que el adulto la diga en voz alta y para que el niño la mire mientras colorea. El reconocimiento llega de ver siempre la misma palabra junto al mismo dibujo, no de que le pidan leerla.",
      },
      {
        q: "¿Un niño de dos años aprende palabras coloreando?",
        a: "La página no enseña por sí sola. Lo que hace es dar al adulto un motivo fácil y natural para nombrar algo y hablar de ello mientras el niño está entretenido. Lo que cuenta es ese rato de hablar, y la página lo hace sencillo.",
      },
      {
        q: "¿Por qué solo un dibujo en cada página?",
        a: "Una página con un solo objeto le da al niño un trabajo que puede terminar. Dos o tres dibujos reparten la atención y la hoja se abandona a medias. Un solo objeto también significa una sola palabra que señalar.",
      },
      {
        q: "¿Los dibujos son los mismos en el libro en inglés y en el de español?",
        a: "Sí. Los mismos 111 dibujos, en el mismo orden y con la misma composición. Solo cambia la palabra impresa: Gato en la edición española, Cat en la inglesa.",
      },
      {
        q: "¿Puedo imprimirlos en casa?",
        a: "Las páginas de muestra, sí, en papel de impresora normal. Los libros completos existen en papel y también como archivo PDF para imprimir, en tamaño carta y A4.",
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
        lead: "55 animales, uno por página, con el nombre impreso debajo en letras grandes para colorear.",
        definition:
          "Las primeras palabras de animales son los nombres que un niño pequeño ya encuentra cada día y en los cuentos: gato, perro, oso, león. En estas páginas cada animal ocupa una hoja entera, dibujado con líneas gruesas y con su nombre debajo. El adulto lo nombra mientras el niño colorea.",
        showcase:
          "Un gato del grupo de cada día, un león del grupo del zoológico y un tiburón del grupo del agua. Páginas reales, a tamaño completo.",
        wordsTitle: "Las 55 palabras de animales",
        wordsLead:
          "En el mismo orden que el libro. Primero los animales de casa y del zoológico, después los que viven en el agua.",
        booksTitle: "De dónde salen estos animales",
        booksLead:
          "Los 55 animales están en nuestros primeros libros para colorear, un dibujo por página con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Qué animales conviene nombrar primero?",
            a: "Los que el niño puede señalar: gato, perro, vaca, pato, oso. Los animales que ve en casa, en la calle o en un cuento son más fáciles de nombrar y de recordar que uno exótico en el que no tiene motivo para pensar.",
          },
          {
            q: "¿Los animales del zoológico son difíciles a los dos años?",
            a: "No, y suelen ser los favoritos. Un león o un elefante se reconocen enseguida porque no se parecen a nada más. Lo que importa es que el dibujo sea grande y sencillo.",
          },
          {
            q: "¿Cuántos animales trae el libro?",
            a: "39 animales de tierra y 16 de agua, 55 en total. Los demás dibujos, hasta 111, son comida, vehículos, naturaleza, objetos y personajes de cuento.",
          },
          {
            q: "¿Hay páginas de animales gratis?",
            a: "Sí. Veinte páginas de animales de los libros se pueden imprimir gratis en casa, con la palabra debajo de cada dibujo, igual que en la edición impresa.",
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
        lead: "14 alimentos que el niño ya conoce de la mesa, cada uno con su nombre impreso debajo del dibujo.",
        definition:
          "Las primeras palabras de comida son los nombres de lo que el niño come o ve comer: torta, naranja, zanahoria, fresa. Son palabras fáciles de practicar porque aparecen varias veces al día, en cada comida, sin que nadie tenga que preparar una lección.",
        showcase:
          "Torta, helado y fresa, impresos tal como aparecen en el libro.",
        wordsTitle: "Las 14 palabras de comida",
        wordsLead: "Primero los dulces, después las frutas y las verduras.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "El grupo de comida forma parte de los 111 dibujos de nuestros primeros libros para colorear, un dibujo por página con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Por qué la comida funciona bien como primeras palabras?",
            a: "Porque se repite. El niño oye naranja, plátano o torta varias veces al día en la mesa, así que el nombre y el objeto se juntan solos, sin apartar un rato para enseñar.",
          },
          {
            q: "¿Se puede usar la página a la hora de comer?",
            a: "Funciona muy bien. Coloreen la zanahoria por la tarde y en la cena déle una zanahoria de verdad y vuelva a nombrarla. La hoja y el plato se refuerzan sin esfuerzo.",
          },
          {
            q: "¿Qué alimentos trae el libro?",
            a: "Torta, helado, sandía, zanahoria, brócoli, naranja, guinda, aguacate, fresa, pera, piña, limón, calabaza y un buñuelo. Catorce en total.",
          },
        ],
      },
    },
  },

  /* ===== Транспорт ===== */
  {
    id: "vehicles",
    pictures: ["car", "airplane", "rocket"],
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
        showcase: "A car, an airplane and a rocket, as printed in the book.",
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
            a: "The first coloring book has car, helicopter, airplane, hot air balloon, ship, submarine, rocket and scooter. Trucks, trains and tractors appear in our directed drawing workbooks for older children.",
          },
          {
            q: "Is a rocket too abstract for a two year old?",
            a: "In practice it is one of the easiest shapes to recognize: a simple cone on a tube. A child does not need to understand space travel to name the picture.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: vehículos",
        lead: "8 cosas que se mueven, dibujadas grandes y sencillas, cada una con su nombre debajo.",
        definition:
          "Las primeras palabras de vehículos son los nombres de lo que lleva gente y se mueve: coche, avión, nave, cohete. Los niños los señalan desde el carrito mucho antes de saber decirlos, y por eso la palabra se pega a algo que al niño ya le interesa.",
        showcase: "Un coche, un avión y un cohete, tal como están en el libro.",
        wordsTitle: "Las 8 palabras de vehículos",
        wordsLead: "Por la carretera, por el aire, por el agua y más allá.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Los vehículos forman parte de los 111 dibujos de nuestros primeros libros para colorear, un dibujo por página con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Por qué los niños se enganchan a los vehículos?",
            a: "Porque se mueven y hacen ruido, y el niño se fija en ellos sin que nadie se lo pida. Una palabra pegada a algo que el niño ya señala necesita mucha menos repetición.",
          },
          {
            q: "¿Hay camiones y trenes en el libro?",
            a: "El primer libro para colorear trae coche, helicóptero, avión, globo, nave, submarino, cohete y scooter. Los camiones, trenes y tractores están en nuestros cuadernos de dibujo paso a paso para niños mayores.",
          },
          {
            q: "¿Un cohete no es demasiado abstracto a los dos años?",
            a: "En la práctica es de las formas más fáciles de reconocer: un cono sobre un tubo. El niño no necesita entender los viajes espaciales para nombrar el dibujo.",
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
        lead: "10 flores, hojas y plantas de un paseo cualquiera, cada una con su nombre debajo del dibujo.",
        definition:
          "Las primeras palabras de naturaleza son los nombres de lo que el niño recoge al aire libre: hoja, flor, seta, piña. Van muy bien con el color porque el mismo objeto se puede encontrar esa tarde en el parque y volver a nombrarlo.",
        showcase: "Un girasol, una seta y un cacto, tal como están en el libro.",
        wordsTitle: "Las 10 palabras de naturaleza",
        wordsLead: "Primero las hojas y las flores, después las plantas de casa.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "El grupo de naturaleza forma parte de los 111 dibujos de nuestros primeros libros para colorear, un dibujo por página con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Cómo se usa una página de naturaleza en un paseo?",
            a: "Coloreen la hoja de arce antes de salir y después busquen una hoja de verdad en el parque y repitan la palabra. El paseo gana un pequeño objetivo y la palabra se dice dos veces sin lección.",
          },
          {
            q: "¿Qué plantas trae el libro?",
            a: "Hoja de arce, rosa, seta, trébol, girasol, piña, cacto, muguete, loto y tulipán. Diez en total.",
          },
          {
            q: "¿Sirve una palabra como loto a esta edad?",
            a: "Menos que hoja o flor, y no pasa nada. Un libro con solo las diez palabras más comunes se acabaría en una semana. Los dibujos poco corrientes son los que hacen que el niño siga pasando páginas.",
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
        title: "Primeras palabras: objetos",
        lead: "13 cosas conocidas de la casa y de la bolsa de playa, cada una con su nombre debajo del dibujo.",
        definition:
          "Las primeras palabras de objetos son los nombres de las cosas que el niño toca o ve usar al adulto: un regalo, una cámara, unas gafas, una pelota. Son las más fáciles de practicar, porque el objeto de verdad suele estar al alcance mientras se colorea.",
        showcase: "Un regalo, una cámara y unas gafas, tal como están en el libro.",
        wordsTitle: "Las 13 palabras de objetos",
        wordsLead: "Primero el juego y las aficiones, después las cosas de casa.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Estos objetos forman parte de los 111 dibujos de nuestros primeros libros para colorear, un dibujo por página con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Por qué son fáciles las palabras de objetos?",
            a: "Porque la cosa de verdad suele estar en la habitación. Coloreen las gafas y después póngase las suyas y repita la palabra. El niño une el dibujo, la palabra y el objeto de una vez.",
          },
          {
            q: "¿Qué objetos trae el libro?",
            a: "Monopatín, cometa, bádminton, fútbol americano, cámara, tambor, pelota de playa, gafas, sombrilla, sombrero, globo terráqueo, regalo y mando de videojuegos.",
          },
          {
            q: "A mi hijo le interesa más la pelota que la hoja. ¿Es un problema?",
            a: "En absoluto. La página sirve para empezar a nombrar, no para retener la atención veinte minutos. Si acaba con la pelota por el suelo y la palabra dicha dos veces, ya cumplió.",
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
        lead: "11 personajes y objetos de cuento, cada uno con su nombre impreso debajo del dibujo.",
        definition:
          "Las primeras palabras de cuento son los nombres de personajes que el niño conoce antes en las historias que en ningún otro sitio: unicornio, dragón, sirena, corona. Valen la pena porque el niño ya tiene una historia unida al dibujo, y una palabra unida a una historia se recuerda sola.",
        showcase: "Un unicornio, un dragón y una sirena, tal como están en el libro.",
        wordsTitle: "Las 11 palabras de cuento",
        wordsLead: "Primero los personajes, después los objetos que les pertenecen.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "El grupo de cuentos forma parte de los 111 dibujos de nuestros primeros libros para colorear, un dibujo por página con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Las primeras palabras deben ser solo de cosas reales?",
            a: "No hay ninguna regla que lo diga. Un niño que ha oído hablar de dragones al acostarse reconoce uno enseguida, y una palabra unida a una historia que le gusta se fija antes que el nombre de un objeto en el que nunca piensa.",
          },
          {
            q: "¿Qué personajes trae el libro?",
            a: "Sirena, unicornio, dragón, corona, gnomo, grifo, trol, hada, caldera mágica, sombrero de mago y poción mágica.",
          },
          {
            q: "¿Los dibujos dan miedo?",
            a: "No. El dragón y el trol están dibujados redondos y sonrientes, con el mismo estilo que el gato y el conejo. Nada en el libro pretende asustar.",
          },
        ],
      },
    },
  },

  /* ===== Английские слова ===== */
  {
    id: "english",
    pictures: ["cat", "dog", "car"],
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
        showcase: "Cat, Dog and Car, printed as they appear in the English edition.",
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
        lead: "La edición en inglés lleva una palabra inglesa debajo de cada dibujo. Aquí está lo que contiene y cómo se corresponde con la edición española.",
        definition:
          "Las primeras palabras en inglés para niños pequeños son los sustantivos de cada día: cat, dog, car, cake. En nuestra edición inglesa cada uno de los 111 dibujos lleva su nombre en inglés debajo, en letras huecas que se pueden colorear. La edición española usa los mismos 111 dibujos con nombres en español.",
        showcase: "Cat, Dog y Car, tal como aparecen en la edición inglesa.",
        wordsTitle: "Inglés y español, uno al lado del otro",
        wordsLead:
          "El mismo dibujo, dos ediciones, dos palabras. Útil si en casa se hablan dos idiomas y quiere saber exactamente qué dice cada libro.",
        booksTitle: "Las ediciones en inglés",
        booksLead:
          "Tres libros para colorear, 111 dibujos y 111 palabras en inglés en cada uno, una por página.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Es un libro bilingüe?",
            a: "No. Cada libro está en un solo idioma. La edición inglesa imprime Cat y la española Gato, con los mismos dibujos. Quien quiera los dos compra los dos, y las páginas se corresponden una a una.",
          },
          {
            q: "En casa hablamos español y queremos palabras en inglés. ¿Qué edición?",
            a: "La inglesa. Los dibujos no necesitan traducción, así que un padre que habla español puede usarla sin saber inglés: señale el dibujo y diga la palabra impresa debajo.",
          },
          {
            q: "¿Qué palabras en inglés conviene primero?",
            a: "Las que el niño oye más: los animales de casa, la comida de la mesa, las cosas de la calle. Una palabra que aparece diez veces al día no necesita ficha, solo algo que señalar.",
          },
        ],
      },
    },
  },

  /* ===== Испанские слова ===== */
  {
    id: "spanish",
    pictures: ["cat", "dog", "car"],
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
          "First Spanish words for toddlers are the everyday nouns a Spanish-speaking child hears most: gato, perro, coche, torta. Our Spanish edition prints the Spanish name under each of the 111 drawings in hollow letters that can be colored. The English edition uses the same drawings with English names.",
        showcase: "Gato, Perro and Coche, printed as they appear in the Spanish edition.",
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
        lead: "La edición española lleva una palabra en español debajo de cada dibujo. Los mismos 111 dibujos, con nombres en español.",
        definition:
          "Las primeras palabras en español para niños pequeños son los sustantivos de cada día: gato, perro, coche, torta. Nuestra edición española imprime el nombre debajo de cada uno de los 111 dibujos, en letras huecas que se pueden colorear. La edición inglesa usa los mismos dibujos con nombres en inglés.",
        showcase: "Gato, Perro y Coche, tal como aparecen en la edición española.",
        wordsTitle: "Español e inglés, uno al lado del otro",
        wordsLead:
          "El mismo dibujo, dos ediciones, dos palabras. Útil en una casa de dos idiomas y para ver exactamente qué palabra imprime cada página.",
        booksTitle: "Las ediciones en español",
        booksLead:
          "Tres libros para colorear, 111 dibujos y 111 palabras en español en cada uno, una por página.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Es un libro bilingüe?",
            a: "No. Cada libro está en un solo idioma. La edición española imprime Gato y la inglesa Cat, con dibujos idénticos, página por página.",
          },
          {
            q: "¿Qué español se usa, de España o de América?",
            a: "Palabras de uso diario que se entienden a ambos lados, elegidas para que ninguna página dependa de un término regional. Cuando hay dos nombres comunes, el libro usa el que un niño pequeño oye con más probabilidad.",
          },
          {
            q: "¿Sirve para una familia que habla inglés?",
            a: "Sí. No hace falta leer español: el dibujo dice qué es el objeto y la palabra de debajo es su nombre en español.",
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
