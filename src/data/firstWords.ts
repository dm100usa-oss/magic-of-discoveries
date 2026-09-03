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
import {
  themeWords,
  themeCount,
  wordBookName,
  wordBookId,
  wordText,
  type WordTheme,
  type WordPair,
} from "./firstWordsList";

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

export const WORDS_BOOK_IDS_RU = [
  "first-coloring-book-111-ru",
  "little-max-coloring-1-ru",
  "little-max-coloring-2-ru",
] as const;

export const wordsBookIds = (lang: UiLang): readonly string[] =>
  lang === "es"
    ? WORDS_BOOK_IDS_ES
    : lang === "ru"
      ? WORDS_BOOK_IDS_RU
      : WORDS_BOOK_IDS;

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
  /** Вторая строка под заголовком. Живая, не поисковая. */
  subtitle: string;
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
  /* Свои даты страницы. Пусто значит берем общие даты сайта.
     Меняем здесь всякий раз, когда правим текст этой страницы. */
  published?: string;
  updated?: string;
  /** Тема состава книг. По ней собирается список слов из трех книг. */
  theme: WordTheme;
  /** Имена рисунков в /public/words. Три штуки. */
  pictures: string[];
  /** Свои рисунки для русской страницы. Нужны там, где в русских
      книгах таких предметов нет: поезда, куклы, ключа, принцессы.
      Пусто значит берем общий список. */
  picturesRu?: string[];
  /** Язык подписи на рисунках. Пусто значит язык страницы.
      Нужен страницам про слова другого языка. */
  pictureLang?: UiLang;
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
      "A toddler's world is already full of words: animals in picture books, food on the table, buses outside the window, socks on the floor. Pick a topic your child already loves and start there. Every page shows real drawings and lists all 333 words, book by book.",
    topics: [
      {
        page: "animals",
        title: "Animal First Words",
        text: "114 animals, from familiar cats and dogs to lions, pandas and butterflies.",
      },
      {
        page: "food",
        title: "Food First Words",
        text: "59 foods, from apples and bananas to bread, cheese and pizza.",
      },
      {
        page: "vehicles",
        title: "Vehicle First Words",
        text: "23 things that go: bus, train, truck, tractor, plane and more.",
      },
      {
        page: "nature",
        title: "Nature First Words",
        text: "38 pictures from outdoors: sun, moon, tree, flower and leaves.",
      },
      {
        page: "clothes",
        title: "Clothes First Words",
        text: "16 pieces of clothing you name every single morning.",
      },
      {
        page: "toys",
        title: "Toy First Words",
        text: "12 toys that are probably on the floor right now.",
      },
      {
        page: "home",
        title: "Home First Words",
        text: "16 everyday things from around the house: cup, spoon, lamp, bed.",
      },
      {
        page: "objects",
        title: "Objects and Play",
        text: "39 things from play, sport and music, including a few surprises.",
      },
      {
        page: "fairy",
        title: "Fairy Tale First Words",
        text: "16 storybook favorites: unicorn, dragon, mermaid, princess.",
      },
    ],
    booksTitle: "Where these pages come from",
    booksLead:
      "Every drawing on this page is a real page from one of our coloring books. Three books, 111 pictures and 111 words in each, one per page, in English or in Spanish.",
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
      "El mundo de un niño pequeño ya está lleno de palabras: animales de los cuentos, comida en la mesa, autobuses en la calle, calcetines por el suelo. Elige el tema que más le gusta y empieza por ahí. Cada página muestra dibujos reales y enumera las 333 palabras, libro por libro.",
    topics: [
      {
        page: "animals",
        title: "Animales",
        text: "114 animales, del gato y el perro al león, el panda y la mariposa.",
      },
      {
        page: "food",
        title: "Comida",
        text: "59 alimentos, de la manzana y el plátano al pan, el queso y la pizza.",
      },
      {
        page: "vehicles",
        title: "Vehículos",
        text: "23 cosas que se mueven: autobús, tren, camión, tractor, avión y más.",
      },
      {
        page: "nature",
        title: "Naturaleza",
        text: "38 dibujos del exterior: sol, luna, árbol, flor y hojas.",
      },
      {
        page: "clothes",
        title: "Ropa",
        text: "16 prendas que nombras cada mañana.",
      },
      {
        page: "toys",
        title: "Juguetes",
        text: "12 juguetes que seguramente están ahora por el suelo.",
      },
      {
        page: "home",
        title: "La casa",
        text: "16 cosas de todos los días: taza, cuchara, lámpara, cama.",
      },
      {
        page: "objects",
        title: "Objetos y juegos",
        text: "39 cosas del juego, el deporte y la música, con alguna sorpresa.",
      },
      {
        page: "fairy",
        title: "Cuentos",
        text: "16 personajes de cuento: unicornio, dragón, sirena, princesa.",
      },
    ],
    booksTitle: "De dónde salen estas páginas",
    booksLead:
      "Todos los dibujos que ves aquí aparecen realmente en nuestros libros para colorear. Son tres libros, 111 dibujos y 111 palabras en cada uno, una por página, con ediciones en español y en inglés.",
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

  ru: {
    title: "Первые слова: раскраски со словами под рисунком",
    lead: "Один крупный рисунок. Одно слово под ним. Раскрасили, назвали вслух - и слово запоминается вместе с рисунком.",
    definition:
      "Раскраска с первыми словами - это страница, где нарисован один знакомый предмет, а под ним напечатано его название. Ребенок раскрашивает, взрослый называет. Слово набрано полыми буквами, поэтому его тоже можно раскрасить. На листе нет фона и второго предмета, который отвлекал бы внимание.",
    showcase:
      "Три настоящие страницы - ровно такие, как они напечатаны в книгах: рисунок и слово под ним полыми буквами.",
    howTitle: "Что с этим делать",
    topicsTitle: "Первые слова по темам",
    topicsLead:
      "Мир малыша уже полон слов: звери в книжках, еда на столе, автобус за окном, носки на полу. Выберите тему, которую ребенок уже любит, и начните с нее. Здесь собраны настоящие рисунки из книг и все 333 слова - книга за книгой.",
    topics: [
      {
        page: "animals",
        title: "Животные",
        text: "100 животных: от домашней кошки и собаки до льва, панды и бабочки.",
      },
      {
        page: "food",
        title: "Еда",
        text: "63 продукта: фрукты и ягоды, овощи, хлеб, сыр, пицца и сладости.",
      },
      {
        page: "vehicles",
        title: "Транспорт",
        text: "16 машин, кораблей и самолетов - все, что едет, плывет и летит.",
      },
      {
        page: "nature",
        title: "Природа",
        text: "44 рисунка о природе: солнце, луна, дерево, цветок, гриб и ракушка.",
      },
      {
        page: "clothes",
        title: "Одежда",
        text: "18 вещей, названия которых вы произносите каждое утро.",
      },
      {
        page: "toys",
        title: "Игрушки",
        text: "15 игрушек, которые прямо сейчас могут лежать на полу.",
      },
      {
        page: "home",
        title: "Дом",
        text: "20 домашних вещей: кружка, ложка, лампа, подушка, будильник.",
      },
      {
        page: "objects",
        title: "Предметы, спорт и музыка",
        text: "46 предметов: барабан и труба, мячи и удочка, чемодан и компас.",
      },
      {
        page: "fairy",
        title: "Сказка",
        text: "11 сказочных героев и предметов: единорог, дракон, русалка, фея и гном.",
      },
    ],
    booksTitle: "Откуда эти страницы",
    booksLead:
      "Каждый рисунок на этой странице - настоящая страница одной из наших раскрасок. Три книги, по 111 рисунков и 111 русских слов в каждой, по одному рисунку на лист.",
    freeTitle: "Сначала попробуйте бесплатно",
    freeLead:
      "Несколько страниц с животными - те же крупные рисунки со словом под ними. Их можно распечатать дома. Посмотрите, как пойдет у ребенка, прежде чем что-то покупать.",
    freeCta: "Открыть бесплатные раскраски",
    faqTitle: "Вопросы родителей",
    faq: [
      {
        q: "Что такое раскраска с первыми словами?",
        a: "Это страница, где нарисован один знакомый предмет, а под ним напечатано его название. Ребенок раскрашивает, взрослый называет предмет и показывает слово. Само слово набрано полыми буквами, поэтому его тоже можно раскрасить.",
      },
      {
        q: "Ребенок должен уметь читать это слово?",
        a: "Нет. Напечатанное слово нужно для того, чтобы взрослый произнес его вслух, а ребенок увидел его рядом с рисунком. Узнавание приходит через повторение, а не через проверки.",
      },
      {
        q: "Почему на странице только один рисунок?",
        a: "Страница с одним предметом дает маленькому ребенку работу, которую он может закончить. Два или три рисунка на листе делят внимание, и такой лист чаще бросают на середине. Один предмет - это еще и одно слово, поэтому невозможно показать пальцем не на то.",
      },
      {
        q: "Слово написано заглавными или строчными буквами?",
        a: "Первая буква заглавная, остальные строчные - так, как слово обычно выглядит в книге. Буквы полые и широкие, поэтому ребенок может раскрашивать их внутри задолго до того, как научится писать.",
      },
      {
        q: "Русские книги те же самые, что английские?",
        a: "Первая книга-раскраска - да: те же 111 рисунков в том же порядке, меняется только напечатанное слово. Две книжки Маленького Макса на русском составлены из собственных наборов рисунков и не совпадают с английским изданием.",
      },
      {
        q: "Это можно распечатать дома?",
        a: "Да. Бесплатные страницы можно печатать на обычной бумаге для принтера. Русские книги целиком продаются в формате PDF для печати в размерах Letter и A4.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Страницы тем                                                       */
/* ------------------------------------------------------------------ */

const wordsPagesBase: WordsPage[] = [
  {
    id: "animals",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "animals",
    pictures: ["cat", "dog", "lion"],
    slug: {
      en: "animal-first-words",
      es: "primeras-palabras-animales",
    },
    copy: {
      en: {
        title: "Animal First Words for Toddlers",
        subtitle: "From “meow” to “roar”",
        lead: "114 animals across our three coloring books, each on its own page with a big, simple drawing and its name underneath.",
        definition:
          "Animal first words are the names of animals a small child already meets at home, at the park and in picture books: cat, dog, cow, bear, lion. On a coloring page each animal gets a full page to itself, drawn with thick outlines, with its name printed below in hollow letters that can be colored too.",
        showcase: "A cat, a dog and a lion, exactly as they appear inside the books.",
        wordsTitle: "Every animal, book by book",
        wordsLead:
          "Pick an animal. Color it together. Say its name. Make the sound if you know it. Sometimes “meow” is all the conversation you need.",
        booksTitle: "Where these animals come from",
        booksLead:
          "Every animal here is a real page from one of our coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions Parents Ask",
        faq: [
          {
            q: "Which animal words should we start with?",
            a: "Start with whatever your child already notices. Maybe it is the family dog. Maybe a duck at the park. Maybe, for reasons known only to toddlers, an elephant. There is no required order.",
          },
          {
            q: "Are zoo animals too difficult for a two-year-old?",
            a: "They do not have to be. A child does not need to meet a lion in real life to enjoy pointing at one. Picture books, toys and stories are part of a toddler's world too.",
          },
          {
            q: "Can we try some animal pages for free?",
            a: "Yes. Twenty animal pages from the books are free to print at home, with the same big drawings and words underneath.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: animales",
        subtitle: "Del «miau» al «rugido»",
        lead: "114 animales repartidos en nuestros tres libros para colorear, cada uno en su propia página con un dibujo grande y su nombre debajo.",
        definition:
          "Las primeras palabras de animales son los nombres que un niño pequeño ya encuentra en casa, en el parque y en los cuentos: gato, perro, vaca, oso, león. Cada animal ocupa una hoja entera, dibujado con líneas gruesas, y lleva su nombre impreso debajo en letras huecas que también se pueden colorear.",
        showcase: "Un gato, un perro y un león, tal como aparecen dentro de los libros.",
        wordsTitle: "Todos los animales, libro por libro",
        wordsLead:
          "Elige un animal. Coloréalo con tu hijo. Di su nombre. Haz el sonido si lo sabes. A veces un «miau» es toda la conversación que hace falta.",
        booksTitle: "De dónde salen estos animales",
        booksLead:
          "Cada animal de esta página es una página real de uno de nuestros libros para colorear, un dibujo por hoja con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Con qué animales conviene empezar?",
            a: "Empieza por los que tu hijo ya nota. Puede ser el perro de casa. Puede ser un pato del parque. Puede ser, por razones que solo él conoce, un elefante. No hay un orden obligatorio.",
          },
          {
            q: "¿Los animales del zoológico son difíciles a los dos años?",
            a: "No tienen por qué. Un niño no necesita ver un león de verdad para disfrutar señalándolo. Los cuentos, los juguetes y las historias también forman parte de su mundo.",
          },
          {
            q: "¿Hay páginas de animales gratis?",
            a: "Sí. Veinte páginas de animales de los libros se pueden imprimir gratis en casa, con los mismos dibujos grandes y la palabra debajo.",
          },
        ],
      },
    },
  },
  {
    id: "food",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "food",
    pictures: ["apple", "cake", "icecream"],
    slug: {
      en: "food-first-words",
      es: "primeras-palabras-comida",
    },
    copy: {
      en: {
        title: "Food First Words for Toddlers",
        subtitle: "Words from the kitchen table",
        lead: "59 foods across the three books, from apples and bananas to bread, cheese and a slice of pizza.",
        definition:
          "Food first words are the names of things a child eats or watches being eaten: apple, banana, bread, cake. They are the easiest words to practice because they come up several times a day at the table, so the name and the object line up without anyone arranging a lesson.",
        showcase: "An apple, a cake and an ice cream, exactly as they appear inside the books.",
        wordsTitle: "Every food word, book by book",
        wordsLead:
          "Color an orange in the afternoon. Find a real one at dinner. Say the word again. That is the whole method.",
        booksTitle: "Where these pages come from",
        booksLead:
          "These food pages come from our three coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions Parents Ask",
        faq: [
          {
            q: "Why are food words good first words?",
            a: "Because they repeat. A child hears apple, banana or milk several times a day, so the word attaches itself to something already in front of them.",
          },
          {
            q: "Can we connect the page with real food?",
            a: "Of course. Color a carrot, then hand over a real carrot at dinner and name it again. Keep it playful; it does not need to become a lesson.",
          },
          {
            q: "Is there an apple in the books?",
            a: "Yes, in Little Max Book 1, along with banana, grapes, bread, cheese, egg and milk. The other two books add fruit, vegetables and treats.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: comida",
        subtitle: "Palabras de la mesa de la cocina",
        lead: "59 alimentos en los tres libros, desde la manzana y el plátano hasta el pan, el queso y un trozo de pizza.",
        definition:
          "Las primeras palabras de comida son los nombres de lo que el niño come o ve comer: manzana, plátano, pan, torta. Son las más fáciles de practicar porque aparecen varias veces al día en la mesa, así que la palabra y la cosa se juntan solas.",
        showcase: "Una manzana, un pastel y un helado, tal como aparecen dentro de los libros.",
        wordsTitle: "Todas las palabras de comida, libro por libro",
        wordsLead:
          "Colorea una naranja por la tarde. Encuentra una de verdad en la cena. Repite la palabra. Ese es todo el método.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Estas páginas de comida vienen de nuestros tres libros para colorear, un dibujo por hoja con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Por qué la comida funciona tan bien?",
            a: "Porque se repite. El niño oye manzana, plátano o leche varias veces al día, así que la palabra se pega a algo que ya tiene delante.",
          },
          {
            q: "¿Podemos unir la página con comida de verdad?",
            a: "Claro. Colorea una zanahoria y en la cena dale una zanahoria de verdad y vuelve a nombrarla. Sin convertirlo en lección.",
          },
          {
            q: "¿Hay manzana en los libros?",
            a: "Sí, en Pequeño Max libro 1, junto con plátano, uvas, pan, queso, huevo y leche. Los otros dos libros añaden frutas, verduras y dulces.",
          },
        ],
      },
    },
  },
  {
    id: "vehicles",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "vehicles",
    pictures: ["bus", "train", "truck"],
    slug: {
      en: "vehicle-first-words",
      es: "primeras-palabras-vehiculos",
    },
    copy: {
      en: {
        title: "Vehicle First Words for Toddlers",
        subtitle: "Things that go",
        lead: "23 vehicles across the three books: bus, train, truck, tractor, plane, boat and more, each drawn big and simple.",
        definition:
          "Vehicle first words are the names of things that move and carry people: car, bus, train, plane. Children point at them from the stroller long before they can say them, so the word attaches to something the child already cares about.",
        showcase: "A bus, a train and a truck, exactly as they appear inside the books.",
        wordsTitle: "Every vehicle, book by book",
        wordsLead:
          "Keep it simple. “Bus.” “The bus is big.” “Train.” No need to ask your child to repeat anything.",
        booksTitle: "Where these pages come from",
        booksLead:
          "The vehicles come from our three coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions Parents Ask",
        faq: [
          {
            q: "Why do toddlers latch onto vehicle words?",
            a: "Because vehicles move and make noise, and a child notices them without being told to. A word attached to something they already point at needs far less repetition.",
          },
          {
            q: "Are there trucks and trains in the books?",
            a: "Yes. Little Max Book 1 has bus, train, truck, tractor, bicycle and boat. The First Coloring Book adds car, helicopter, airplane, ship, submarine and rocket.",
          },
          {
            q: "Is a rocket too complicated for a two-year-old?",
            a: "Your child does not need to understand space travel. They can color the picture, hear its name and make their own rocket sound. That is more than enough.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: vehículos",
        subtitle: "Cosas que se mueven",
        lead: "23 vehículos en los tres libros: autobús, tren, camión, tractor, avión, barco y más, todos con formas grandes y sencillas.",
        definition:
          "Las primeras palabras de vehículos son los nombres de lo que se mueve y lleva gente: coche, autobús, tren, avión. Los niños los señalan desde el carrito mucho antes de saber decirlos, así que la palabra se pega a algo que ya les interesa.",
        showcase: "Un autobús, un tren y un camión, tal como aparecen dentro de los libros.",
        wordsTitle: "Todos los vehículos, libro por libro",
        wordsLead:
          "Hazlo sencillo. «Autobús». «El autobús es grande». «Tren». No hace falta pedirle que repita nada.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Los vehículos vienen de nuestros tres libros para colorear, un dibujo por hoja con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Por qué los niños se enganchan a los vehículos?",
            a: "Porque se mueven y hacen ruido, y el niño se fija en ellos sin que nadie se lo pida. Una palabra pegada a algo que ya señala necesita mucha menos repetición.",
          },
          {
            q: "¿Hay camiones y trenes en los libros?",
            a: "Sí. Pequeño Max libro 1 trae autobús, tren, camión, tractor, bicicleta y barco. El primer libro para colorear añade helicóptero, avión, nave, submarino y cohete.",
          },
          {
            q: "¿Un cohete no es demasiado para un niño de dos años?",
            a: "No necesita entender los viajes espaciales. Puede colorear el dibujo, oír su nombre e inventar su propio sonido de cohete. Con eso basta.",
          },
        ],
      },
    },
  },
  {
    id: "nature",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "nature",
    pictures: ["sun", "tree", "sunflower"],
    slug: {
      en: "nature-first-words",
      es: "primeras-palabras-naturaleza",
    },
    copy: {
      en: {
        title: "Nature First Words for Toddlers",
        subtitle: "Words to take on a walk",
        lead: "38 pictures from outdoors: sun, moon, star, cloud, tree, flower, leaf and more, each with its name underneath.",
        definition:
          "Nature first words are the names of things a child sees or picks up outdoors: sun, tree, flower, leaf. They pair well with coloring because the same thing can be found on a walk that afternoon and named again, with no lesson involved.",
        showcase: "The sun, a tree and a sunflower, exactly as they appear inside the books.",
        wordsTitle: "Every nature word, book by book",
        wordsLead:
          "Color a leaf today and look for one outside tomorrow. If you find it, say the word again. That is enough.",
        booksTitle: "Where these pages come from",
        booksLead:
          "These nature pages come from our three coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions Parents Ask",
        faq: [
          {
            q: "How do we use a nature page on a walk?",
            a: "Color a leaf or a flower before you go out, then look for something similar in the park. No scavenger hunt required. A little noticing is enough.",
          },
          {
            q: "Does my toddler need to know every one of these words?",
            a: "No. Some will be familiar, some completely new. Let your child pick what looks interesting. There is no list they have to finish.",
          },
          {
            q: "Which are the easiest to start with?",
            a: "Sun, moon, star, cloud, tree and flower. They are in Little Max Book 1 and a child sees all of them on an ordinary day.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: naturaleza",
        subtitle: "Palabras para llevar de paseo",
        lead: "38 dibujos del exterior: sol, luna, estrella, nube, árbol, flor, hoja y más, cada uno con su nombre debajo.",
        definition:
          "Las primeras palabras de naturaleza son los nombres de lo que el niño ve o recoge al aire libre: sol, árbol, flor, hoja. Van muy bien con el color porque la misma cosa se puede encontrar esa tarde en un paseo y volver a nombrarla, sin ninguna lección.",
        showcase: "El sol, un árbol y un girasol, tal como aparecen dentro de los libros.",
        wordsTitle: "Todas las palabras de naturaleza, libro por libro",
        wordsLead:
          "Colorea una hoja hoy y busca una fuera mañana. Si la encontráis, repite la palabra. Con eso basta.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Estas páginas vienen de nuestros tres libros para colorear, un dibujo por hoja con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Cómo se usa una página de naturaleza en un paseo?",
            a: "Colorea una hoja o una flor antes de salir y luego busca algo parecido en el parque. No hace falta una búsqueda del tesoro: basta con fijarse un poco.",
          },
          {
            q: "¿Mi hijo tiene que conocer todas estas palabras?",
            a: "No. Algunas le sonarán y otras serán nuevas. Deja que elija lo que le llame la atención. No hay ninguna lista que terminar.",
          },
          {
            q: "¿Cuáles son las más fáciles para empezar?",
            a: "Sol, luna, estrella, nube, árbol y flor. Están en Pequeño Max libro 1 y el niño las ve en un día cualquiera.",
          },
        ],
      },
    },
  },
  {
    id: "clothes",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "clothes",
    pictures: ["socks", "dress", "boots"],
    slug: {
      en: "clothes-first-words",
      es: "primeras-palabras-ropa",
    },
    copy: {
      en: {
        title: "Clothes First Words for Toddlers",
        subtitle: "Words you say every morning",
        lead: "16 pieces of clothing: socks, shoes, boots, hat, coat, dress, pajamas and more, each with its name underneath.",
        definition:
          "Clothes first words are the names of the things a child puts on every day: socks, shoes, hat, coat. They are said out loud several times a day already, during dressing and undressing, so a coloring page simply gives the same word a picture to sit next to.",
        showcase: "Socks, a dress and a pair of boots, exactly as they appear inside the books.",
        wordsTitle: "Every clothing word, book by book",
        wordsLead:
          "Color the socks in the morning, then name the real ones at bedtime. The page and the drawer say the same word.",
        booksTitle: "Where these pages come from",
        booksLead:
          "The clothes come from Little Max Book 1 and Book 2, one drawing per page with the word underneath.",
        faqTitle: "Questions Parents Ask",
        faq: [
          {
            q: "Why are clothes useful first words?",
            a: "Because getting dressed happens twice a day, every day. The word is already being said out loud; the page just gives it a picture.",
          },
          {
            q: "Which clothes are in the books?",
            a: "Socks, shoes, boots, hat, coat, pajamas, glasses, T-shirt, pants and dress in Book 1. Book 2 adds a cap, a top hat, a sombrero, sandals, flip-flops and a tank top.",
          },
          {
            q: "My child will not sit still to color. Is that a problem?",
            a: "Not at all. If the page lasts two minutes and the word gets said twice, it did its job.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: ropa",
        subtitle: "Palabras que dices cada mañana",
        lead: "16 prendas: calcetines, zapatos, botas, gorro, abrigo, vestido, pijama y más, cada una con su nombre debajo.",
        definition:
          "Las primeras palabras de ropa son los nombres de lo que el niño se pone cada día: calcetines, zapatos, gorro, abrigo. Ya se dicen en voz alta varias veces al día, al vestirse y al desvestirse, así que la página solo le pone un dibujo al lado a una palabra que ya suena en casa.",
        showcase: "Unos calcetines, un vestido y unas botas, tal como aparecen dentro de los libros.",
        wordsTitle: "Todas las palabras de ropa, libro por libro",
        wordsLead:
          "Colorea los calcetines por la mañana y nombra los de verdad por la noche. La hoja y el cajón dicen la misma palabra.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "La ropa viene de Pequeño Max libro 1 y libro 2, un dibujo por hoja con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Por qué la ropa sirve como primeras palabras?",
            a: "Porque vestirse pasa dos veces al día, todos los días. La palabra ya se dice en voz alta; la página solo le pone un dibujo.",
          },
          {
            q: "¿Qué prendas hay en los libros?",
            a: "Calcetines, zapatos, botas, gorro, abrigo, pijama, gafas, camiseta, pantalones y vestido en el libro 1. El libro 2 añade gorra, sombrero de copa, sombrero, sandalias, chanclas y camiseta sin mangas.",
          },
          {
            q: "Mi hijo no se queda quieto coloreando. ¿Es un problema?",
            a: "En absoluto. Si la hoja dura dos minutos y la palabra se dice dos veces, ya cumplió.",
          },
        ],
      },
    },
  },
  {
    id: "toys",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "toys",
    pictures: ["teddy", "doll", "ball"],
    slug: {
      en: "toy-first-words",
      es: "primeras-palabras-juguetes",
    },
    copy: {
      en: {
        title: "Toy First Words for Toddlers",
        subtitle: "Words already lying on the floor",
        lead: "12 toys: ball, balloon, blocks, book, doll, teddy bear, bubbles, kite and a present, each with its name underneath.",
        definition:
          "Toy first words are the names of the things a child already holds: ball, doll, teddy bear, blocks. The real object is usually within reach while the coloring is going on, so the drawing, the spoken word and the toy itself come together in one moment.",
        showcase: "A teddy bear, a doll and a ball, exactly as they appear inside the books.",
        wordsTitle: "Every toy word, book by book",
        wordsLead:
          "Color the teddy bear, then go and find the real one. Say its name once. Nothing else required.",
        booksTitle: "Where these pages come from",
        booksLead:
          "The toys come from Little Max Book 1 and Book 2, one drawing per page with the word underneath.",
        faqTitle: "Questions Parents Ask",
        faq: [
          {
            q: "Why do toy words work so well?",
            a: "Because the toy is in the room. Color it, then hold it. The child links the drawing, the word and the thing itself without any explanation.",
          },
          {
            q: "Which toys are in the books?",
            a: "Ball, balloon, blocks, book, doll, teddy bear, bubbles, kite and a present in Book 1. Book 2 adds balloons, soap bubbles and a swing.",
          },
          {
            q: "My child wants the toy, not the page. Is that a problem?",
            a: "No. The page exists to open a small moment of conversation, not to keep a child at a table for twenty minutes.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: juguetes",
        subtitle: "Palabras que ya están por el suelo",
        lead: "12 juguetes: pelota, globo, cubos, libro, muñeca, osito, pompas, cometa y un regalo, cada uno con su nombre debajo.",
        definition:
          "Las primeras palabras de juguetes son los nombres de lo que el niño ya tiene en las manos: pelota, muñeca, osito, cubos. El objeto de verdad suele estar cerca mientras se colorea, así que el dibujo, la palabra dicha y el juguete se juntan en el mismo momento.",
        showcase: "Un osito, una muñeca y una pelota, tal como aparecen dentro de los libros.",
        wordsTitle: "Todas las palabras de juguetes, libro por libro",
        wordsLead:
          "Colorea el osito y luego id a buscar el de verdad. Di su nombre una vez. No hace falta más.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Los juguetes vienen de Pequeño Max libro 1 y libro 2, un dibujo por hoja con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Por qué funcionan tan bien los juguetes?",
            a: "Porque el juguete está en la habitación. Coloréalo y luego cógelo. El niño une el dibujo, la palabra y la cosa sin ninguna explicación.",
          },
          {
            q: "¿Qué juguetes hay en los libros?",
            a: "Pelota, globo, cubos, libro, muñeca, osito, pompas de jabón, cometa y un regalo en el libro 1. El libro 2 añade globos, burbujas de jabón y un columpio.",
          },
          {
            q: "Mi hijo quiere el juguete, no la hoja. ¿Es un problema?",
            a: "No. La página existe para abrir un pequeño rato de conversación, no para tener al niño sentado veinte minutos.",
          },
        ],
      },
    },
  },
  {
    id: "home",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "home",
    pictures: ["cup", "lamp", "key"],
    slug: {
      en: "home-first-words",
      es: "primeras-palabras-casa",
    },
    copy: {
      en: {
        title: "Home First Words for Toddlers",
        subtitle: "Words from around the house",
        lead: "16 everyday things from home: cup, spoon, plate, chair, lamp, key, phone, bed and more, each with its name underneath.",
        definition:
          "Home first words are the names of the things a child sees an adult use all day: cup, spoon, plate, bed. They are among the first words most children say, because the object is right there and the word is repeated without anyone planning it.",
        showcase: "A cup, a lamp and a key, exactly as they appear inside the books.",
        wordsTitle: "Every home word, book by book",
        wordsLead:
          "Color the cup, then drink from a real one. The word gets said twice and nobody had to prepare a thing.",
        booksTitle: "Where these pages come from",
        booksLead:
          "These pages come from Little Max Book 1 and Book 2, one drawing per page with the word underneath.",
        faqTitle: "Questions Parents Ask",
        faq: [
          {
            q: "Why start with things from the house?",
            a: "Because they are the words a child hears most. Cup, spoon and bed come up dozens of times a day with no effort from anyone.",
          },
          {
            q: "Which things are in the books?",
            a: "Cup, spoon, fork, plate, chair, lamp, key, phone, toothbrush, pillow, bed and a house in Book 1. Book 2 adds a pot, a frying pan, a kettle and a candle.",
          },
          {
            q: "Can we use the real object with the page?",
            a: "Yes, and it works better than anything else. Color it, then hold it, then name it. That is the whole idea.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: la casa",
        subtitle: "Palabras de todos los días",
        lead: "16 cosas de casa: taza, cuchara, plato, silla, lámpara, llave, teléfono, cama y más, cada una con su nombre debajo.",
        definition:
          "Las primeras palabras de la casa son los nombres de lo que el niño ve usar al adulto todo el día: taza, cuchara, plato, cama. Están entre las primeras que dicen casi todos los niños, porque el objeto está delante y la palabra se repite sin que nadie lo planee.",
        showcase: "Una taza, una lámpara y una llave, tal como aparecen dentro de los libros.",
        wordsTitle: "Todas las palabras de la casa, libro por libro",
        wordsLead:
          "Colorea la taza y luego bebe de una de verdad. La palabra se dice dos veces y nadie tuvo que preparar nada.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Estas páginas vienen de Pequeño Max libro 1 y libro 2, un dibujo por hoja con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Por qué empezar por las cosas de casa?",
            a: "Porque son las palabras que el niño más oye. Taza, cuchara y cama aparecen decenas de veces al día sin ningún esfuerzo.",
          },
          {
            q: "¿Qué cosas hay en los libros?",
            a: "Taza, cuchara, tenedor, plato, silla, lámpara, llave, teléfono, cepillo de dientes, almohada, cama y una casa en el libro 1. El libro 2 añade olla, sartén, tetera y vela.",
          },
          {
            q: "¿Podemos usar el objeto de verdad con la página?",
            a: "Sí, y funciona mejor que ninguna otra cosa. Coloréalo, cógelo y nómbralo. Esa es toda la idea.",
          },
        ],
      },
    },
  },
  {
    id: "objects",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "objects",
    pictures: ["drum", "camera", "trumpet"],
    slug: {
      en: "everyday-object-first-words",
      es: "primeras-palabras-objetos",
    },
    copy: {
      en: {
        title: "Everyday Object and Play First Words",
        subtitle: "Words from play, sport and music",
        lead: "39 things from playtime and everyday life: a drum, a camera, a present, a ball, an umbrella and more.",
        definition:
          "These are the names of objects a child meets in play and in family life: a drum, a camera, a beach ball, an umbrella. They are less predictable than food or clothes, which is exactly why children enjoy them: every page is a small surprise.",
        showcase: "A drum, a camera and a trumpet, exactly as they appear inside the books.",
        wordsTitle: "Every object, book by book",
        wordsLead:
          "Some of these are in your house right now. Color the page, then go and find the real one.",
        booksTitle: "Where these pages come from",
        booksLead:
          "These objects come from all three coloring books, one drawing per page with the word underneath.",
        faqTitle: "Questions Parents Ask",
        faq: [
          {
            q: "Why include instruments and sports gear?",
            a: "Because a book of only cats and apples runs out fast. The unusual pages are the ones a child comes back to.",
          },
          {
            q: "Which objects are in the books?",
            a: "Skateboard, kite, camera, drum, beach ball, sunglasses, globe, present and gamepad in the First Coloring Book. Book 2 adds a trumpet, maracas, a tambourine, a fishing rod, an anchor, a compass and more.",
          },
          {
            q: "Are these words too hard for a toddler?",
            a: "Some are longer than others, and that is fine. Nobody is being tested. Say it once, color it, move on.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: objetos y juegos",
        subtitle: "Palabras del juego, el deporte y la música",
        lead: "39 cosas del juego y de la vida diaria: un tambor, una cámara, un regalo, una pelota, un paraguas y más.",
        definition:
          "Son los nombres de los objetos que el niño encuentra jugando y en la vida de familia: un tambor, una cámara, una pelota de playa, un paraguas. Son menos previsibles que la comida o la ropa, y por eso mismo gustan: cada página es una pequeña sorpresa.",
        showcase: "Un tambor, una cámara y una trompeta, tal como aparecen dentro de los libros.",
        wordsTitle: "Todos los objetos, libro por libro",
        wordsLead:
          "Algunos están en tu casa ahora mismo. Colorea la página y luego id a buscar el de verdad.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Estos objetos vienen de los tres libros para colorear, un dibujo por hoja con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Por qué incluir instrumentos y cosas de deporte?",
            a: "Porque un libro de solo gatos y manzanas se acaba enseguida. Las páginas poco corrientes son a las que el niño vuelve.",
          },
          {
            q: "¿Qué objetos hay en los libros?",
            a: "Monopatín, cometa, cámara, tambor, pelota de playa, gafas, globo, regalo y gamepads en el primer libro. El libro 2 añade trompeta, maracas, pandereta, caña de pescar, ancla, brújula y más.",
          },
          {
            q: "¿No son palabras demasiado difíciles?",
            a: "Algunas son más largas que otras, y no pasa nada. Nadie está examinando a nadie. Se dice una vez, se colorea y se sigue.",
          },
        ],
      },
    },
  },
  {
    id: "fairy",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "fairy",
    pictures: ["unicorn", "dragon", "princess"],
    slug: {
      en: "fairy-tale-first-words",
      es: "primeras-palabras-cuentos",
    },
    copy: {
      en: {
        title: "Fairy Tale First Words for Toddlers",
        subtitle: "A few words from make-believe",
        lead: "16 storybook characters and magical things: unicorn, dragon, mermaid, fairy, princess, dinosaur and more.",
        definition:
          "Fairy tale first words are the names of characters a child meets in stories before meeting them anywhere else: unicorn, dragon, mermaid, princess. A word attached to a story a child already loves takes hold faster than the name of something they never think about.",
        showcase: "A unicorn, a dragon and a princess, exactly as they appear inside the books.",
        wordsTitle: "Every storybook word, book by book",
        wordsLead:
          "Some are characters, some are magical objects. All of them belong in a good bedtime story.",
        booksTitle: "Where these pages come from",
        booksLead:
          "These pages come from the First Coloring Book and Little Max Book 1, one drawing per page with the word underneath.",
        faqTitle: "Questions Parents Ask",
        faq: [
          {
            q: "Do first words have to be real things?",
            a: "Not at all. A toddler's world includes stories. If your child loves dragons or unicorns, there is every reason to name them while coloring.",
          },
          {
            q: "Which characters are in the books?",
            a: "Mermaid, unicorn, dragon, crown, dwarf, griffin, troll, fairy, magic cauldron, wizard's hat and magic potion in the First Coloring Book. Little Max Book 1 adds a princess and a dinosaur.",
          },
          {
            q: "Are the drawings scary?",
            a: "No. Our dragon and troll belong to the same friendly world as our cat and bunny. Even our monsters know how to smile.",
          },
        ],
      },
      es: {
        title: "Primeras palabras: cuentos",
        subtitle: "Unas cuantas palabras de fantasía",
        lead: "16 personajes y objetos de cuento: unicornio, dragón, sirena, hada, princesa, dinosaurio y más.",
        definition:
          "Las primeras palabras de cuento son los nombres de personajes que el niño conoce antes en las historias que en ningún otro sitio: unicornio, dragón, sirena, princesa. Una palabra unida a una historia que ya le gusta se fija antes que el nombre de algo en lo que nunca piensa.",
        showcase: "Un unicornio, un dragón y una princesa, tal como aparecen dentro de los libros.",
        wordsTitle: "Todas las palabras de cuento, libro por libro",
        wordsLead:
          "Unos son personajes y otros objetos mágicos. Todos caben en un buen cuento de antes de dormir.",
        booksTitle: "De dónde salen estas páginas",
        booksLead:
          "Estas páginas vienen del primer libro para colorear y de Pequeño Max libro 1, un dibujo por hoja con la palabra debajo.",
        faqTitle: "Preguntas de los padres",
        faq: [
          {
            q: "¿Las primeras palabras tienen que ser cosas reales?",
            a: "En absoluto. El mundo de un niño incluye los cuentos. Si le gustan los dragones o los unicornios, hay todos los motivos para nombrarlos mientras colorea.",
          },
          {
            q: "¿Qué personajes hay en los libros?",
            a: "Sirena, unicornio, dragón, corona, gnomo, grifo, trole, hada, caldera mágica, sombrero de mago y poción mágica en el primer libro. Pequeño Max libro 1 añade una princesa y un dinosaurio.",
          },
          {
            q: "¿Los dibujos dan miedo?",
            a: "No. Nuestro dragón y nuestro trol pertenecen al mismo mundo amable que el gato y el conejo. Hasta nuestros monstruos saben sonreír.",
          },
        ],
      },
    },
  },
  {
    id: "english",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "animals",
    pictures: ["cat", "dog", "apple"],
    pictureLang: "en",
    pairs: true,
    slug: {
      en: "first-english-words-for-toddlers",
      es: "primeras-palabras-en-ingles",
    },
    copy: {
      en: {
        title: "First English Words for Toddlers",
        subtitle: "Familiar pictures, English words underneath",
        lead: "Cat. Dog. Apple. Cake. The English edition prints one English word under every picture, 333 of them across three books.",
        definition: "First English words for toddlers are the everyday nouns a child hears most: cat, dog, apple, car. In our English editions each of the 111 drawings in each book carries its English name underneath, printed in large hollow letters that can be colored in. The Spanish editions use the same drawings with Spanish names.",
        showcase: "Cat, Dog and Apple, exactly as they appear in the English editions.",
        wordsTitle: "The same picture in English and Spanish",
        wordsLead: "One book prints Cat. The other prints Gato. Same drawing, same page, different word. Useful when there are two languages at home.",
        booksTitle: "The English editions",
        booksLead: "Three coloring books, 111 pictures and 111 English words in each, one on every page.",
        faqTitle: "Questions Parents Ask",
        faq: [
          { q: "Is this a bilingual coloring book?", a: "No. Each book is published in one language. The English edition prints Cat, the Spanish edition prints Gato, and the drawings are identical, page for page." },
          { q: "We speak Spanish at home. Can we choose the English edition?", a: "Yes. The pictures need no translation, so a Spanish-speaking parent can use the book without reading English: point at the drawing, say the English word printed under it." },
          { q: "Which English words should we start with?", a: "Start with pictures your child already loves. A pet, a favorite food, a bus. Or forget the order and let your child pick the next page." },
        ],
      },
      es: {
        title: "Primeras palabras en inglés para niños",
        subtitle: "Los mismos dibujos, con la palabra en inglés",
        lead: "Cat. Dog. Apple. Cake. La edición inglesa lleva una palabra en inglés debajo de cada dibujo, 333 en los tres libros.",
        definition: "Las primeras palabras en inglés son los sustantivos de cada día: cat, dog, apple, car. En nuestras ediciones inglesas cada uno de los 111 dibujos de cada libro lleva su nombre en inglés debajo, en letras huecas que también se colorean. Las ediciones españolas usan los mismos dibujos con nombres en español.",
        showcase: "Cat, Dog y Apple, tal como aparecen en las ediciones inglesas.",
        wordsTitle: "El mismo dibujo en inglés y en español",
        wordsLead: "Un libro imprime Cat. El otro imprime Gato. El mismo dibujo, la misma página, otra palabra. Útil en una casa de dos idiomas.",
        booksTitle: "Las ediciones en inglés",
        booksLead: "Tres libros para colorear, 111 dibujos y 111 palabras en inglés en cada uno, una por página.",
        faqTitle: "Preguntas de los padres",
        faq: [
          { q: "¿Es un libro bilingüe?", a: "No. Cada libro está publicado en un solo idioma. La edición inglesa imprime Cat y la española Gato, con dibujos idénticos, página por página." },
          { q: "En casa hablamos español. ¿Podemos elegir la edición inglesa?", a: "Sí. Los dibujos no necesitan traducción: señala el dibujo y di la palabra en inglés que está impresa debajo." },
          { q: "¿Por qué palabras conviene empezar?", a: "Por los dibujos que a tu hijo ya le gustan. Una mascota, una comida favorita, un autobús. O deja que elija él la página siguiente." },
        ],
      },
    },
  },
  {
    id: "spanish",
    published: "2026-09-02",
    updated: "2026-09-02",
    theme: "animals",
    pictures: ["cat", "dog", "apple"],
    pictureLang: "es",
    pairs: true,
    slug: {
      en: "first-spanish-words-for-toddlers",
      es: "primeras-palabras-en-espanol",
    },
    copy: {
      en: {
        title: "First Spanish Words for Toddlers",
        subtitle: "Familiar pictures, Spanish words underneath",
        lead: "Gato. Perro. Manzana. Torta. The Spanish edition prints one Spanish word under every picture, 333 of them across three books.",
        definition: "First Spanish words for toddlers are the everyday nouns a Spanish-speaking child hears most: gato, perro, manzana, coche. Our Spanish editions print the Spanish name under each of the 111 drawings in each book, in hollow letters that can be colored in. The English editions use the same drawings with English names.",
        showcase: "Gato, Perro and Manzana, exactly as they appear in the Spanish editions.",
        wordsTitle: "The same picture in Spanish and English",
        wordsLead: "One book prints Gato. The other prints Cat. Same drawing, same page, different word.",
        booksTitle: "The Spanish editions",
        booksLead: "Three coloring books, 111 pictures and 111 Spanish words in each, one on every page.",
        faqTitle: "Questions Parents Ask",
        faq: [
          { q: "Is this a bilingual coloring book?", a: "No. Each book is published in one language. The Spanish edition prints Gato, the English edition prints Cat, using the same drawings." },
          { q: "We speak English at home. Can we choose the Spanish edition?", a: "Yes. The picture tells you what the object is, and the word underneath is its Spanish name. You do not need to read Spanish to use it." },
          { q: "Which variety of Spanish does the book use?", a: "Spanish varies from country to country, and some everyday objects have more than one perfectly correct name. Our books use simple, familiar words and keep the chosen vocabulary consistent throughout each edition." },
        ],
      },
      es: {
        title: "Primeras palabras en español para niños",
        subtitle: "Los mismos dibujos, con la palabra en español",
        lead: "Gato. Perro. Manzana. Torta. La edición española lleva una palabra en español debajo de cada dibujo, 333 en los tres libros.",
        definition: "Las primeras palabras en español son los sustantivos de cada día: gato, perro, manzana, coche. Nuestras ediciones españolas imprimen el nombre debajo de cada uno de los 111 dibujos de cada libro, en letras huecas que también se colorean. Las ediciones inglesas usan los mismos dibujos con nombres en inglés.",
        showcase: "Gato, Perro y Manzana, tal como aparecen en las ediciones españolas.",
        wordsTitle: "El mismo dibujo en español y en inglés",
        wordsLead: "Un libro imprime Gato. El otro imprime Cat. El mismo dibujo, la misma página, otra palabra.",
        booksTitle: "Las ediciones en español",
        booksLead: "Tres libros para colorear, 111 dibujos y 111 palabras en español en cada uno, una por página.",
        faqTitle: "Preguntas de los padres",
        faq: [
          { q: "¿Es un libro bilingüe?", a: "No. Cada libro está publicado en un solo idioma. La edición española imprime Gato y la inglesa Cat, con los mismos dibujos." },
          { q: "¿Qué variedad de español usa el libro?", a: "El español cambia de un país a otro y algunos objetos tienen más de un nombre correcto. Usamos palabras sencillas y de uso común, y mantenemos el mismo criterio dentro de cada edición." },
          { q: "¿Sirve para una familia que habla inglés?", a: "Sí. El dibujo dice qué es el objeto y la palabra de debajo es su nombre en español." },
        ],
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Русские страницы тем                                               */
/*                                                                     */
/*  Держим отдельно и подмешиваем к общему списку. Так английские и    */
/*  испанские блоки остаются нетронутыми, а русский текст читается     */
/*  целиком, в одном месте.                                            */
/*                                                                     */
/*  Числа в текстах это состав русских изданий, посчитанный по         */
/*  спискам слов, а не переведенные английские цифры: набор рисунков   */
/*  в русских книжках Макса другой.                                    */
/* ------------------------------------------------------------------ */

type RuWordsPage = { slug: string; pictures?: string[]; copy: WordsCopy };

const RU_PAGES: Record<string, RuWordsPage> = {
  animals: {
    slug: "pervye-slova-zhivotnye",
    copy: {
      title: "Первые слова: животные",
      subtitle: "От кошки во дворе до льва из книжки",
      lead: "100 животных в трех наших раскрасках, каждое на своей странице: крупный рисунок и его название под ним.",
      definition:
        "Первые слова о животных - это названия зверей, птиц и насекомых, которых малыш встречает дома, на прогулке и в книжках с картинками: кошка, собака, корова, медведь, лев. На странице раскраски животное занимает почти весь лист, нарисовано толстой линией, а под ним стоит название полыми буквами, которые тоже можно раскрасить.",
      showcase: "Кошка, собака и лев - ровно так, как они напечатаны в книгах.",
      wordsTitle: "Все животные, книга за книгой",
      wordsLead:
        "Выберите зверя. Раскрасьте вместе. Назовите его вслух. Изобразите звук, если знаете его. Иногда «мяу» - весь нужный разговор.",
      booksTitle: "Откуда эти животные",
      booksLead:
        "Каждое животное здесь это настоящая страница одной из наших раскрасок: один рисунок на лист и слово под ним.",
      faqTitle: "Вопросы родителей",
      faq: [
        {
          q: "С каких животных начать?",
          a: "С тех, кого ребенок уже замечает сам. Может быть, это домашняя собака. Может быть, утка в парке. А может быть, по причинам, известным только малышу, слон. Обязательного порядка нет.",
        },
        {
          q: "Не сложны ли звери из зоопарка для двухлетнего?",
          a: "Не обязательно. Чтобы с удовольствием ткнуть пальцем в льва, необязательно видеть льва вживую. Книжки, игрушки и сказки - тоже часть мира малыша.",
        },
        {
          q: "Можно попробовать несколько страниц бесплатно?",
          a: "Да. Часть страниц с животными можно распечатать дома бесплатно, с теми же крупными рисунками и словом под ними.",
        },
      ],
    },
  },
  food: {
    slug: "pervye-slova-eda",
    copy: {
      title: "Первые слова: еда",
      subtitle: "Все, что ребенок видит на столе",
      lead: "63 продукта в трех наших раскрасках: фрукты и ягоды, овощи, хлеб и сладости, каждый на своей странице со словом под рисунком.",
      definition:
        "Первые слова о еде - это названия того, что ребенок видит каждый день: яблоко, банан, морковь, хлеб, торт. Такие слова легче входят в речь, потому что предмет можно потрогать и попробовать. На странице раскраски продукт нарисован крупно и просто, а его название стоит под рисунком полыми буквами.",
      showcase: "Яблоко, торт и мороженое - ровно так, как они напечатаны в книгах.",
      wordsTitle: "Вся еда, книга за книгой",
      wordsLead:
        "Раскрасьте яблоко перед обедом, а потом покажите настоящее. Так слово со страницы связывается с предметом в руках.",
      booksTitle: "Откуда эти страницы",
      booksLead:
        "Каждый рисунок здесь взят из наших раскрасок: один предмет на лист и его название под ним.",
      faqTitle: "Вопросы родителей",
      faq: [
        {
          q: "Ребенок отказывается есть овощи. Поможет раскраска?",
          a: "Раскраска не заставит ребенка есть, и мы такого не обещаем. Но нарисованная морковь дает повод спокойно поговорить о ней без давления за столом, а это уже неплохо.",
        },
        {
          q: "Почему в одной книге есть слово, а в другой нет?",
          a: "Книги собраны из разных рисунков и не повторяют друг друга. Поэтому на странице темы видно, из какой книги какое слово, и понятно, что именно покупать.",
        },
      ],
    },
  },
  vehicles: {
    slug: "pervye-slova-transport",
    pictures: ["bus", "car", "rocket"],
    copy: {
      title: "Первые слова: транспорт",
      subtitle: "Все, что едет, плывет и летит",
      lead: "16 машин, кораблей и самолетов в трех наших раскрасках, каждый на своей странице со словом под рисунком.",
      definition:
        "Первые слова о транспорте - это названия того, что ребенок видит за окном и в небе: машина, автобус, самолет, корабль, ракета. Слова короткие, а предметы узнаваемые, поэтому многие из них появляются в речи довольно рано. В книге каждый предмет нарисован крупно, толстой линией, с названием под рисунком.",
      showcase: "Автобус, машина и ракета - ровно так, как они напечатаны в книгах.",
      wordsTitle: "Весь транспорт, книга за книгой",
      wordsLead:
        "Назовите машину, которая только что проехала за окном, и найдите ее на странице. Так слово из книги связывается с настоящей улицей.",
      booksTitle: "Откуда эти страницы",
      booksLead:
        "Каждый рисунок здесь взят из наших раскрасок: один предмет на лист и его название под ним.",
      faqTitle: "Вопросы родителей",
      faq: [
        {
          q: "Почему транспорта меньше, чем животных?",
          a: "Потому что так составлены книги: зверей в них больше всего. Если ребенок особенно любит машины, посмотрите также темы предметов и игрушек - там есть кораблик, скейтборд и воздушный шар.",
        },
        {
          q: "Есть ли поезд?",
          a: "В русских изданиях поезда нет. Есть машина, автобус, самолет, вертолет, корабль, лодка, подводная лодка, ракета, скутер и воздушный шар.",
        },
      ],
    },
  },
  nature: {
    slug: "pervye-slova-priroda",
    copy: {
      title: "Первые слова: природа",
      subtitle: "Солнце, дерево, цветок и все, что вокруг",
      lead: "44 рисунка о природе в трех наших раскрасках: солнце и луна, деревья и цветы, грибы и ракушки, каждый со словом под рисунком.",
      definition:
        "Первые слова о природе - это названия того, что ребенок видит на прогулке и из окна: солнце, дерево, цветок, листок, облако. Такие слова удобно называть по дороге, потому что предметы постоянно перед глазами. В книге каждый нарисован крупно и просто, с названием под рисунком полыми буквами.",
      showcase: "Солнце, дерево и подсолнух - ровно так, как они напечатаны в книгах.",
      wordsTitle: "Вся природа, книга за книгой",
      wordsLead:
        "Раскрасьте лист, а на прогулке найдите настоящий и сравните. Простая игра помогает связать слово с предметом.",
      booksTitle: "Откуда эти страницы",
      booksLead:
        "Каждый рисунок здесь взят из наших раскрасок: один предмет на лист и его название под ним.",
      faqTitle: "Вопросы родителей",
      faq: [
        {
          q: "Годится ли эта тема для занятий по временам года?",
          a: "Да. В книгах есть снежинка, ёлка, шишка, лист, облако, радуга и солнце - из них легко подобрать страницы к нужному времени года.",
        },
      ],
    },
  },
  clothes: {
    slug: "pervye-slova-odezhda",
    copy: {
      title: "Первые слова: одежда",
      subtitle: "Слова, которые вы говорите каждое утро",
      lead: "18 предметов одежды в наших раскрасках: шапка, носки, платье, кеды и другие вещи, которые ребенок надевает каждый день.",
      definition:
        "Первые слова об одежде - это названия вещей, которые ребенок надевает каждый день: шапка, носки, футболка, платье, ботинки. Эти слова взрослый и так произносит много раз в день, поэтому они легко закрепляются. В книге каждая вещь нарисована отдельно на своей странице, с названием под рисунком.",
      showcase: "Носки, платье и кеды - ровно так, как они напечатаны в книгах.",
      wordsTitle: "Вся одежда, книга за книгой",
      wordsLead:
        "Раскрасьте носки, а потом найдите такие же в ящике. Утренние сборы после этого идут заметно веселее.",
      booksTitle: "Откуда эти страницы",
      booksLead:
        "Каждый рисунок здесь взят из наших раскрасок: один предмет на лист и его название под ним.",
      faqTitle: "Вопросы родителей",
      faq: [
        {
          q: "В какой книге больше одежды?",
          a: "В первой книжке Маленького Макса: там двенадцать вещей, от шапки и варежек до платья и кед. Во второй книге к ним добавляются шляпы и летняя обувь.",
        },
      ],
    },
  },
  toys: {
    slug: "pervye-slova-igrushki",
    pictures: ["teddy", "ball", "pyramid"],
    copy: {
      title: "Первые слова: игрушки",
      subtitle: "То, что прямо сейчас лежит на полу",
      lead: "15 игрушек в наших раскрасках: мишка, мяч, пирамидка, кубики, пазлы и мыльные пузыри.",
      definition:
        "Первые слова об игрушках - это названия вещей, которые ребенок чаще всего держит в руках: мяч, мишка, кубики, пирамидка. Слово запоминается быстрее, когда предмет можно принести и положить рядом с раскрашенной страницей. В книге каждая игрушка нарисована крупно, с названием под рисунком.",
      showcase: "Мишка, мяч и пирамидка - ровно так, как они напечатаны в книгах.",
      wordsTitle: "Все игрушки, книга за книгой",
      wordsLead:
        "Раскрасьте мяч и принесите настоящий. Положите рядом. Дальше ребенок обычно все делает сам.",
      booksTitle: "Откуда эти страницы",
      booksLead:
        "Каждый рисунок здесь взят из наших раскрасок: один предмет на лист и его название под ним.",
      faqTitle: "Вопросы родителей",
      faq: [
        {
          q: "Почему игрушек так мало?",
          a: "Потому что многое из того, что ребенок считает игрушкой, находится в других темах: кораблик и машина - в транспорте, мячи и сачок - в предметах, единорог и дракон - в сказке.",
        },
      ],
    },
  },
  home: {
    slug: "pervye-slova-dom",
    pictures: ["cup", "lamp", "pot"],
    copy: {
      title: "Первые слова: дом",
      subtitle: "Кружка, ложка, лампа и подушка",
      lead: "20 домашних вещей в наших раскрасках: посуда, лампа, будильник, ножницы и другие предметы, которые ребенок видит дома каждый день.",
      definition:
        "Первые слова о доме - это названия вещей, которые окружают ребенка в комнате и на кухне: кружка, ложка, вилка, лампа, подушка. Их удобно называть по ходу дела, не устраивая специальных занятий. В книге каждая вещь нарисована отдельно, крупно, с названием под рисунком полыми буквами.",
      showcase: "Кружка, лампа и кастрюля - ровно так, как они напечатаны в книгах.",
      wordsTitle: "Все домашние вещи, книга за книгой",
      wordsLead:
        "Раскрасили ложку, пошли на кухню и нашли такую же. Так слово на странице связывается с настоящим предметом.",
      booksTitle: "Откуда эти страницы",
      booksLead:
        "Каждый рисунок здесь взят из наших раскрасок: один предмет на лист и его название под ним.",
      faqTitle: "Вопросы родителей",
      faq: [
        {
          q: "Есть ли опасные предметы вроде ножниц и иголки?",
          a: "Ножницы, иголка с ниткой и пуговицы в книге нарисованы потому, что ребенок видит их дома. Это повод назвать предмет и заодно объяснить, что брать его может только взрослый.",
        },
      ],
    },
  },
  objects: {
    slug: "pervye-slova-predmety",
    copy: {
      title: "Первые слова: предметы, спорт и музыка",
      subtitle: "Барабан, фотоаппарат, мяч и еще сорок вещей",
      lead: "46 предметов в трех наших раскрасках: музыкальные инструменты, спортивные мячи, дорожные вещи и другие знакомые предметы.",
      definition:
        "Эта тема собирает все, что не вошло в остальные: барабан и труба, фотоаппарат и микрофон, мячи и удочка, чемодан, компас и якорь. Такие слова длиннее и обычно появляются позже самых простых, но именно они постепенно расширяют словарный запас. В книге каждый предмет нарисован отдельно, с названием под рисунком.",
      showcase: "Барабан, фотоаппарат и труба - ровно так, как они напечатаны в книгах.",
      wordsTitle: "Все предметы, книга за книгой",
      wordsLead:
        "Здесь удобно играть со звуками: раскрасили барабан - постучали по столу, раскрасили трубу - погудели. Слово запоминается вместе со звуком.",
      booksTitle: "Откуда эти страницы",
      booksLead:
        "Каждый рисунок здесь взят из наших раскрасок: один предмет на лист и его название под ним.",
      faqTitle: "Вопросы родителей",
      faq: [
        {
          q: "Не сложные ли это слова для двухлетнего?",
          a: "Некоторые сложнее самых первых слов. Выбирайте то, что ребенок уже видел: барабан и мяч знакомы почти всем, а компас и якорь могут подождать.",
        },
      ],
    },
  },
  fairy: {
    slug: "pervye-slova-skazka",
    pictures: ["unicorn", "dragon", "mermaid"],
    copy: {
      title: "Первые слова: сказка",
      subtitle: "Единорог, дракон, русалка и волшебное зелье",
      lead: "11 сказочных слов в первой книге-раскраске: русалка, единорог, дракон, фея, гном, грифон, тролль и волшебные предметы.",
      definition:
        "Первые слова о сказках - это названия героев, которых ребенок встречает в книжках и мультфильмах: единорог, дракон, русалка, фея. Их нельзя показать на улице, зато о них легко разговаривать: кто это, где живет, что умеет. В книге каждый герой нарисован крупно и дружелюбно, без страшных деталей, с названием под рисунком.",
      showcase: "Единорог, дракон и русалка - ровно так, как они напечатаны в книгах.",
      wordsTitle: "Все сказочные слова",
      wordsLead:
        "Придумайте про дракона одно предложение, пока ребенок его раскрашивает. Этого достаточно, чтобы слово лучше запомнилось.",
      booksTitle: "Откуда эти страницы",
      booksLead:
        "Все сказочные рисунки собраны в первой книге-раскраске: один рисунок на лист и слово под ним.",
      faqTitle: "Вопросы родителей",
      faq: [
        {
          q: "Дракон не напугает малыша?",
          a: "Он нарисован добрым и круглым, без зубов и огня, похожим на игрушку. Все сказочные герои в книге специально сделаны спокойными.",
        },
      ],
    },
  },
};

export const wordsPages: WordsPage[] = wordsPagesBase.map((p) => {
  const ru = RU_PAGES[p.id];
  if (!ru) return p;
  return {
    ...p,
    ...(ru.pictures ? { picturesRu: ru.pictures } : {}),
    slug: { ...p.slug, ru: ru.slug },
    copy: { ...p.copy, ru: ru.copy },
  };
});

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
  `/words/${name}-${
    page?.pictureLang ?? (lang === "es" ? "es" : lang === "ru" ? "ru" : "en")
  }.png`;

/** Рисунки страницы на языке посетителя. */
export const pagePictures = (page: WordsPage, lang: UiLang): string[] =>
  lang === "ru" && page.picturesRu ? page.picturesRu : page.pictures;

/** Слова темы, разложенные по книгам. */
export const pageWords = (page: WordsPage, lang: UiLang = "en") =>
  themeWords(page.theme, lang);

/** Сколько всего слов на странице темы. */
export const pageWordCount = (page: WordsPage, lang: UiLang = "en") =>
  themeCount(page.theme, lang);

/** Слово на языке страницы. */
export const wordOf = (p: WordPair, lang: UiLang) => wordText(p, lang);

export { wordBookName, wordBookId };
