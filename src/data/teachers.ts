// Раздел для учителей. Классы K-2, США.
//
// Правило этой страницы: ничего, чего нельзя проверить, открыв книгу.
// Все числа взяты из готовых PDF и сверены лист за листом:
// том 1 это 58 страниц и 55 заданий, том 2 это 59 страниц и 56 заданий
// (55 плюс одно бонусное), вместе 111 рисунков без единого повтора.
//
// Роль страницы: не объяснять учителю, как преподавать, а показать
// готовые материалы, разложенные так, чтобы он нашел свой лист за
// несколько секунд. Педагогика остается ровно там, где помогает
// понять сам товар.
//
// Directed drawing это общеизвестная школьная практика, мы ее не присваиваем.
// Нам принадлежит формат задания Draw, Trace, Write: структура страницы,
// порядок этапов и связка рисунка со словом. Метод ECL на этой странице
// опорой не является: ссылка на него стоит в блоке об авторе как
// приглашение к разговору, а не как доказательство.
//
// Награды относятся к другим книгам издательства, не к этому набору,
// поэтому на этой странице их нет вообще.

import type { UiLang } from "./books";

export interface TeachersStep {
  n: string;
  title: string;
  text: string;
}

export interface TeachersImage {
  src: string;
  w: number;
  h: number;
  /** Что изображено. Нейросеть картинку не видит, она читает это. */
  alt: string;
  /** Подпись под картинкой. Видна человеку и тоже читается нейросетью. */
  caption: string;
}

/** Карточка бесплатного набора. Скачивание только с нашего сайта. */
export interface TeachersFreeCard {
  title: string;
  text: string;
  file: string;
  cta: string;
  cover: TeachersImage;
}

/* Подборка по теме. Собрана не по разделам книг, а по тому, как
   учитель спрашивает: зоопарк, океан, насекомые. Поэтому животные
   книги разделены на зоопарк и на ферму с лесом, а мелкие разделы
   сведены вместе. Сумма всех подборок равна 111. */
export interface TeachersThemeGroup {
  name: string;
  count: number;
  where: string;
  examples: string;
}

/** Подборка к сезону. Собрана из существующих рисунков, ничего не придумано. */
export interface TeachersSeason {
  name: string;
  items: string;
}

/** Карточка покупки. Комплект стоит первым. */
export interface TeachersBuyCard {
  id: string;
  name: string;
  meta: string;
  text: string;
  /** Наша покупка. Пусто у комплекта: у нас его пока нет. */
  bookId?: string;
  siteCta?: string;
  /** Покупка на площадке. Вторая строка, кроме комплекта. */
  tptUrl: string;
  tptCta: string;
  /** Размер бумаги выбирают только при покупке у нас. */
  paperNote?: string;
  cover: TeachersImage;
  featured?: boolean;
}

export interface TeachersCopy {
  title: string;
  lead: string;
  heroNote: string;
  heroFreeCta: string;
  heroBuyCta: string;

  /** Определение одной фразой. Идет в разметку страницы, не в текст. */
  definition: string;

  anatomyTitle: string;
  steps: TeachersStep[];
  anatomyNote: string;
  sample: TeachersImage;
  sample2: TeachersImage;

  freeTitle: string;
  freeCards: TeachersFreeCard[];
  freeNote: string;
  freeHonest: string;
  freeOther: { text: string; url: string };

  themesTitle: string;
  themesLead: string;
  themeGroups: TeachersThemeGroup[];

  seasonTitle: string;
  seasonLead: string;
  seasons: TeachersSeason[];

  useTitle: string;
  uses: { title: string; text: string }[];
  useImage: TeachersImage;

  catalogTitle: string;
  catalogLead: string;
  catalog: { vol: string; groups: { name: string; items: string }[] }[];

  buyTitle: string;
  buyCards: TeachersBuyCard[];

  spanishTitle: string;
  spanishText: string;
  spanishCta: string;
  spanishUrl: string;

  faqTitle: string;
  faq: { q: string; a: string }[];

  authorTitle: string;
  author: string;
  authorLink: string;

  finalTitle: string;
  finalLead: string;

  updated: string;
}

/* ------------------------------------------------------------------ */
/*  Адреса на площадке. Сверены с магазином 11.09.2026: десять товаров, */
/*  отдельный том 4.99, комплект 7.99 вместо 9.98.                     */
/* ------------------------------------------------------------------ */

const TPT = {
  v1En: "https://www.teacherspayteachers.com/Product/Directed-Drawing-Volume-1-55-No-Prep-Draw-Trace-Write-Worksheets-Grades-K-2-17437620",
  v2En: "https://www.teacherspayteachers.com/Product/Directed-Drawing-Volume-2-55-No-Prep-Draw-Trace-Write-Worksheets-Grades-K-2-17622847",
  bundleEn: "https://www.teacherspayteachers.com/Product/Directed-Drawing-Volumes-1-2-Bundle-110-No-Prep-Draw-Trace-Write-Worksheets-17624126",
  v1Es: "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Volume-1-55-No-Prep-Dibujo-Dirigido-Worksheets-K-2-17437840",
  v2Es: "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Volume-2-55-No-Prep-Dibujo-Dirigido-Worksheets-K-2-17623087",
  bundleEs: "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Volumes-1-2-Bundle-110-No-Prep-Dibujo-Worksheets-17624463",
};

export const METHOD_URL = "https://www.ricardo-demi.com/method";

export const teachers: Partial<Record<UiLang, TeachersCopy>> = {

  /* =================== АНГЛИЙСКИЙ =================== */
  en: {
    title: "Directed Drawing Worksheets for Kindergarten, 1st and 2nd Grade",
    lead: "Print-and-go pages that put drawing, handwriting and one new word together on a single sheet. 111 different activities across two volumes, in English and in Spanish.",
    heroNote: "PDF download. Black and white. US Letter and A4. Nothing is shipped.",
    heroFreeCta: "Download free worksheets",
    heroBuyCta: "See both volumes · $7.99",

    definition:
      "Directed drawing worksheets for grades K-2, ages 5 to 8. On every page a student follows a step by step visual sequence to build the picture, traces the finished outline, draws it again in an open space, then traces and writes the matching word on primary ruled lines. All four stages sit on one printable sheet, in English or in Spanish.",

    anatomyTitle: "What is on every page",
    steps: [
      { n: "1", title: "Follow the steps", text: "Numbered boxes show how the drawing is built from simple shapes." },
      { n: "2", title: "Trace", text: "A dashed outline of the finished drawing." },
      { n: "3", title: "Draw and color", text: "An open space, with room left around the drawing." },
      { n: "4", title: "Trace and write the word", text: "The word on primary ruled lines." },
    ],
    anatomyNote:
      "The steps are printed on the sheet itself, so a student can look back at any step and no projector or video is needed. The same four stages appear on every page in both volumes.",
    sample: {
      src: "/teachers/sample-page-en.jpg",
      w: 1000,
      h: 1294,
      alt: "A directed drawing worksheet for grades K-2. A row of six numbered boxes shows a lion built up from a circle. Below it, a dashed lion outline to trace, an empty box to draw in, and primary ruled lines with the word Lion to trace and write.",
      caption: "Lion, Volume 1, page 4.",
    },
    sample2: {
      src: "/teachers/sample-page-2-en.jpg",
      w: 1000,
      h: 1294,
      alt: "A directed drawing worksheet for grades K-2. Six numbered boxes show a unicorn built up from simple curved shapes. Below them, a dashed unicorn outline to trace, an empty box to draw in, and primary ruled lines with the word Unicorn to trace and write.",
      caption: "Unicorn, Volume 1, page 33.",
    },

    freeTitle: "Try the worksheets",
    freeCards: [
      {
        title: "Free sample, Volume 1",
        text: "8 activities, one from each theme. 10 pages, PDF.",
        file: "/free/directed-drawing-k2-en-free-sample.pdf",
        cta: "Download 8 free activities",
        cover: {
          src: "/teachers/cover-free-en.jpg",
          w: 700,
          h: 700,
          alt: "Cover of the free 8-activity sample: an English directed drawing page with a lion, marked FREE, 8 ACTIVITIES, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
      {
        title: "Free sample, Volume 2",
        text: "9 activities, one from each theme. 11 pages, PDF.",
        file: "/free/directed-drawing-k2-2-en-free-sample.pdf",
        cta: "Download 9 free activities",
        cover: {
          src: "/teachers/cover-free-2-en.jpg",
          w: 700,
          h: 700,
          alt: "Cover of the free 9-activity sample from Volume 2: a directed drawing page with a fox, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
    ],
    freeNote: "Both samples download from this page. No sign-up, no email address, no watermarks.",
    freeHonest: "These are complete pages taken from the books, not extra worksheets.",
    freeOther: { text: "Spanish samples are here", url: "/es/teachers" },

    themesTitle: "Find a page for what you are teaching",
    themesLead:
      "The 111 drawings, grouped the way a unit is usually named. Page numbers for every drawing are further down.",
    themeGroups: [
      { name: "Zoo and safari animals", count: 13, where: "Volume 1", examples: "Lion, elephant, zebra, giraffe, monkey, kangaroo, rhino, flamingo, koala, crocodile" },
      { name: "Farm, forest and pets", count: 21, where: "Volumes 1 and 2", examples: "Cow, chicken, duck, goat, cat, dog, bunny, fox, bear, deer, squirrel, owl" },
      { name: "Ocean and sea life", count: 16, where: "Volumes 1 and 2", examples: "Shark, dolphin, whale, crab, octopus, jellyfish, sea turtle, seahorse, seal, manta ray" },
      { name: "Bugs and little creatures", count: 5, where: "Volume 2", examples: "Bee, butterfly, dragonfly, snail, mouse" },
      { name: "Plants and nature", count: 10, where: "Volumes 1 and 2", examples: "Sunflower, rose, tulip, maple leaf, clover, mushroom, pine cone, cactus" },
      { name: "Food", count: 14, where: "Volumes 1 and 2", examples: "Cake, ice cream, watermelon, carrot, broccoli, orange, cherry, strawberry, pumpkin" },
      { name: "Fantasy", count: 11, where: "Volumes 1 and 2", examples: "Mermaid, unicorn, dragon, fairy, griffin, troll, wizard's hat, magic potion" },
      { name: "Vehicles", count: 8, where: "Volumes 1 and 2", examples: "Car, helicopter, airplane, hot air balloon, ship, submarine, rocket, scooter" },
      { name: "Sports, hobbies and things", count: 13, where: "Volumes 1 and 2", examples: "Skateboard, kite, badminton, American football, camera, drum, globe, sunglasses, present" },
    ],

    seasonTitle: "Pages that fit the season",
    seasonLead: "Made up from the drawings above, nothing separate to buy.",
    seasons: [
      { name: "Fall", items: "Pumpkin, bat, maple leaf, mushroom, owl, hedgehog, squirrel, raccoon, deer, pine cone" },
      { name: "Animal drawings for winter topics", items: "Bear, fox, owl, deer, hedgehog, squirrel" },
      { name: "Spring", items: "Clover, kite, tulip, lily of the valley, butterfly, bee, dragonfly, snail, frog, duck" },
      { name: "End of the year and summer", items: "Beach umbrella, beach hat, beach ball, sunglasses, watermelon, ice cream, crab, dolphin" },
    ],

    useTitle: "Where teachers use these",
    uses: [
      { title: "Morning work", text: "One page, no setup, the same four stages every time." },
      { title: "Early finishers", text: "Open space is left around each drawing on purpose, so there is somewhere to keep going." },
      { title: "Centers and independent work", text: "One sheet per student. Nothing to cut, glue or assemble." },
      { title: "Sub plans", text: "Print a stack and leave them with the teacher page from the book." },
    ],
    useImage: {
      src: "/teachers/early-en.jpg",
      w: 900,
      h: 900,
      alt: "Four versions of the same lion drawing: a dashed outline to trace, a plain outline, a lion drawn independently, and a finished lion colored in with a tree, grass and a flower added around it.",
      caption:
        "A drawing does not have to match the model. Students change details and add a background of their own in the open space.",
    },

    catalogTitle: "Every drawing, with its page number",
    catalogLead: "111 drawings, none repeated between the two books.",
    catalog: [
      {
        vol: "Volume 1 · 55 activities",
        groups: [
          { name: "Animals (20)", items: "Lion 4, Elephant 5, Zebra 6, Parrot 7, Crocodile 8, Monkey 9, Kangaroo 10, Rhino 11, Flamingo 12, Lemur 13, Hummingbird 14, Chameleon 15, Giraffe 16, Koala 17, Frog 18, Alpaca 19, Bunny 20, Owl 21, Hedgehog 22, Goat 23" },
          { name: "Sea life (8)", items: "Shark 24, Dolphin 25, Whale 26, Crab 27, Octopus 28, Jellyfish 29, Sea turtle 30, Angelfish 31" },
          { name: "Fantasy (5)", items: "Mermaid 32, Unicorn 33, Dragon 34, Crown 35, Dwarf 36" },
          { name: "Vehicles (4)", items: "Car 37, Helicopter 38, Airplane 39, Hot air balloon 40" },
          { name: "Sports and hobbies (4)", items: "Skateboard 41, Kite 42, Badminton 43, American football 44" },
          { name: "Things (3)", items: "Beach umbrella 45, Beach hat 46, Globe 47" },
          { name: "Nature (5)", items: "Maple leaf 48, Rose 49, Mushroom 50, Clover 51, Sunflower 52" },
          { name: "Food (6)", items: "Cake 53, Ice cream 54, Watermelon 55, Carrot 56, Broccoli 57, Orange 58" },
        ],
      },
      {
        vol: "Volume 2 · 55 activities plus 1 bonus",
        groups: [
          { name: "Animals (14)", items: "Bear 4, Fox 5, Bat 6, Raccoon 7, Chicken 8, Cow 9, Beaver 10, Eagle 11, Hamster 12, Cat 13, Dog 14, Squirrel 15, Duck 16, Deer 17" },
          { name: "Bugs and little creatures (5)", items: "Mouse 18, Bee 19, Dragonfly 20, Snail 21, Butterfly 22" },
          { name: "Sea life (8)", items: "Seahorse 23, Seal 24, Clown fish 25, Shellfish 26, Axolotl 27, Pufferfish 28, Shrimp 29, Manta ray 30" },
          { name: "Fantasy (6)", items: "Griffin 31, Troll 32, Fairy 33, Magic cauldron 34, Wizard's hat 35, Magic potion 36" },
          { name: "Vehicles (4)", items: "Ship 37, Submarine 38, Rocket 39, Scooter 40" },
          { name: "Sports and hobbies (4)", items: "Camera 41, Drum 42, Beach ball 43, Sunglasses 44" },
          { name: "Things (2)", items: "Present 45, Gamepad 46" },
          { name: "Nature (5)", items: "Pine cone 47, Cactus 48, Lily of the valley 49, Lotus 50, Tulip 51" },
          { name: "Food (8)", items: "Cherry 52, Avocado 53, Strawberry 54, Pear 55, Pineapple 56, Lemon 57, Pumpkin 58, Donut 59" },
        ],
      },
    ],

    buyTitle: "Get the worksheets",
    buyCards: [
      {
        id: "bundle",
        name: "Volumes 1 and 2 Bundle",
        meta: "110 activities plus 1 bonus · $7.99 instead of $9.98",
        text: "Both books in one set, with no drawing repeated between them. A teacher page and an illustrated table of contents in each volume. 58 and 59 pages.",
        tptUrl: TPT.bundleEn,
        tptCta: "Buy the bundle on TPT · $7.99",
        featured: true,
        cover: {
          src: "/teachers/cover-paid-en.jpg",
          w: 700,
          h: 700,
          alt: "Cover of the full English collection: a directed drawing page with a lion, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
      {
        id: "v1",
        name: "Volume 1",
        meta: "55 activities · $4.99",
        text: "Eight themes: animals, sea life, fantasy, vehicles, sports and hobbies, things, nature, food. 58 pages.",
        bookId: "directed-drawing-k2-en",
        siteCta: "Buy the PDF here",
        tptUrl: TPT.v1En,
        tptCta: "Or on TPT",
        paperNote: "Choose US Letter or A4 at checkout.",
        cover: {
          src: "/covers/directed-drawing-k2-en.jpg",
          w: 900,
          h: 900,
          alt: "Cover of Volume 1 in English: a directed drawing page with a lion, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
      {
        id: "v2",
        name: "Volume 2",
        meta: "55 activities plus 1 bonus · $4.99",
        text: "Nine themes, including bugs. All new subjects, none of them repeated from Volume 1. 59 pages.",
        bookId: "directed-drawing-k2-2-en",
        siteCta: "Buy the PDF here",
        tptUrl: TPT.v2En,
        tptCta: "Or on TPT",
        paperNote: "Choose US Letter or A4 at checkout.",
        cover: {
          src: "/covers/directed-drawing-k2-2-en.jpg",
          w: 900,
          h: 900,
          alt: "Cover of Volume 2 in English: a directed drawing page with a bear, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
    ],

    spanishTitle: "The same pages in Spanish",
    spanishText:
      "Same drawings, same layout, same four stages. Only the word changes. Both volumes are published with Spanish vocabulary on every page. The English and Spanish sets are sold separately.",
    spanishCta: "Buy the Spanish bundle on TPT · $7.99",
    spanishUrl: TPT.bundleEs,

    faqTitle: "Questions before you choose",
    faq: [
      {
        q: "What will I receive?",
        a: "Printable PDF files. Volume 1 is 58 pages and Volume 2 is 59 pages, including the activities, the teacher page and the illustrated table of contents. This is a digital resource. Nothing is shipped.",
      },
      {
        q: "Does this print in black and white?",
        a: "Yes. Every page is black and white and prints on a plain office copier. No color ink is needed. Students add the color themselves.",
      },
      {
        q: "Will these print on A4 paper?",
        a: "Yes. Buying here, you choose US Letter or A4 at checkout, and the file is laid out for that size rather than scaled down, so nothing is cut off at the edge.",
      },
      {
        q: "Do I need to prepare anything?",
        a: "Print the pages and have pencils and coloring materials ready. There is nothing to cut, glue or assemble, and the steps are on the sheet, so no projector or video is needed.",
      },
      {
        q: "Can students add their own ideas to the drawing?",
        a: "Yes, and the page is laid out for it. The model is a starting point, not something a drawing has to match. There is open space around the finished drawing, and students often change details or add a background. It helps to say so before the first page, because some students want their drawing to look exactly like the example.",
      },
      {
        q: "How is this different from a coloring page?",
        a: "On a coloring page the student fills in a drawing that is already there. Here the student draws the subject and then writes the word, so the page also involves pencil control, sequencing and vocabulary.",
      },
      {
        q: "Can I share these with other teachers?",
        a: "One purchase is for one classroom. For a whole grade level, buy a licence for each teacher. You may put the file on a password-protected platform such as Google Classroom for your own students.",
      },
      {
        q: "Is there a Spanish version?",
        a: "Yes. Both volumes are published with Spanish vocabulary on every page, with the same drawings and the same layout. The English and Spanish sets are sold separately.",
      },
    ],

    authorTitle: "Made by Ricardo Demi",
    author:
      "I am a children's author and the publisher at Magic of Discoveries, in Miami, Florida. I taught at university level for twelve years, and I drew every page in these books by hand. Everything published under this name is made by me.",
    authorLink: "More about my work",

    finalTitle: "111 drawings. One routine. Two languages.",
    finalLead: "Print a free page first, then pick the set you need.",

    updated: "2026-09-11",
  },

  /* =================== ИСПАНСКИЙ =================== */
  es: {
    title: "Hojas de dibujo dirigido para kínder, 1.º y 2.º grado",
    lead: "Hojas listas para imprimir que reúnen el dibujo, la escritura a mano y una palabra nueva en una sola página. 111 actividades distintas en dos volúmenes, en español y en inglés.",
    heroNote: "Descarga en PDF. En blanco y negro. Formato carta (US Letter) y A4. No se envía ningún libro físico.",
    heroFreeCta: "Descargar hojas gratis",
    heroBuyCta: "Ver los dos volúmenes · $7.99",

    definition:
      "Hojas de dibujo dirigido para los grados K-2, de 5 a 8 años. En cada página el alumno sigue una secuencia visual paso a paso para construir el dibujo, repasa el contorno terminado, lo vuelve a dibujar en un espacio libre y después repasa y escribe la palabra correspondiente en una pauta de tres líneas. Las cuatro etapas caben en una sola hoja imprimible, en español o en inglés.",

    anatomyTitle: "Qué hay en cada hoja",
    steps: [
      { n: "1", title: "Sigue los pasos", text: "Unos recuadros numerados muestran cómo se construye el dibujo a partir de formas sencillas." },
      { n: "2", title: "Repasa", text: "El contorno del dibujo terminado, con líneas de puntos para repasar." },
      { n: "3", title: "Dibuja y colorea", text: "Un espacio libre, con sitio alrededor del dibujo." },
      { n: "4", title: "Repasa y escribe la palabra", text: "La palabra en una pauta de tres líneas." },
    ],
    anatomyNote:
      "Los pasos están impresos en la propia hoja, así que el alumno puede volver a mirar cualquier paso y no hace falta proyector ni vídeo. Las mismas cuatro etapas aparecen en todas las páginas de los dos volúmenes.",
    sample: {
      src: "/teachers/sample-page-es.jpg",
      w: 1000,
      h: 1294,
      alt: "Una hoja de dibujo dirigido para los grados K-2. Una fila de seis recuadros numerados muestra un león construido a partir de un círculo. Debajo, el contorno punteado del león para repasar, un recuadro vacío para dibujar y una pauta de tres líneas con la palabra León para repasar y escribir.",
      caption: "León, volumen 1, página 4.",
    },
    sample2: {
      src: "/teachers/sample-page-2-es.jpg",
      w: 1000,
      h: 1294,
      alt: "Una hoja de dibujo dirigido para los grados K-2. Seis recuadros numerados muestran un unicornio construido a partir de formas curvas sencillas. Debajo, el contorno punteado para repasar, un recuadro vacío para dibujar y una pauta de tres líneas con la palabra Unicornio para repasar y escribir.",
      caption: "Unicornio, volumen 1, página 33.",
    },

    freeTitle: "Pruebe las hojas",
    freeCards: [
      {
        title: "Muestra gratuita, volumen 1",
        text: "8 actividades, una de cada tema. 10 páginas, PDF.",
        file: "/free/directed-drawing-k2-es-free-sample.pdf",
        cta: "Descargar 8 actividades gratis",
        cover: {
          src: "/teachers/cover-free-es.jpg",
          w: 700,
          h: 700,
          alt: "Portada de la muestra gratuita de 8 actividades: una hoja de dibujo dirigido en español con un león, marcada FREE, 8 ACTIVITIES, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
      {
        title: "Muestra gratuita, volumen 2",
        text: "9 actividades, una de cada tema. 11 páginas, PDF.",
        file: "/free/directed-drawing-k2-2-es-free-sample.pdf",
        cta: "Descargar 9 actividades gratis",
        cover: {
          src: "/teachers/cover-free-2-es.jpg",
          w: 700,
          h: 700,
          alt: "Portada de la muestra gratuita de 9 actividades del volumen 2 en español: una hoja de dibujo dirigido con un zorro, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
    ],
    freeNote: "Las dos muestras se descargan desde esta misma página. Sin registro, sin correo electrónico y sin marcas de agua.",
    freeHonest: "Son páginas completas tomadas de los libros, no hojas adicionales.",
    freeOther: { text: "Las muestras en inglés están aquí", url: "/en/teachers" },

    themesTitle: "Encuentre una hoja para el tema que está trabajando",
    themesLead:
      "Los 111 dibujos, agrupados por temas. Más abajo encontrará la lista completa con los números de página.",
    themeGroups: [
      { name: "Animales de zoológico y de safari", count: 13, where: "Volumen 1", examples: "León, elefante, cebra, jirafa, mono, canguro, rinoceronte, flamenco, koala, cocodrilo" },
      { name: "Granja, bosque y mascotas", count: 21, where: "Volúmenes 1 y 2", examples: "Vaca, gallina, pato, cabra, gato, perro, conejo, zorro, oso, ciervo, ardilla, lechuza" },
      { name: "Océano y vida marina", count: 16, where: "Volúmenes 1 y 2", examples: "Tiburón, delfín, ballena, cangrejo, pulpo, medusa, tortuga, hipocampo, foca, raya" },
      { name: "Insectos y animalitos", count: 5, where: "Volumen 2", examples: "Abeja, mariposa, libélula, caracol, ratón" },
      { name: "Plantas y naturaleza", count: 10, where: "Volúmenes 1 y 2", examples: "Girasol, rosa, tulipán, hoja de arce, trébol, seta, piña, cacto" },
      { name: "Comida", count: 14, where: "Volúmenes 1 y 2", examples: "Torta, helado, sandía, zanahoria, brócoli, naranja, guinda, fresa, calabaza" },
      { name: "Fantasía", count: 11, where: "Volúmenes 1 y 2", examples: "Sirena, unicornio, dragón, hada, grifo, trol, sombrero de mago, poción mágica" },
      { name: "Vehículos", count: 8, where: "Volúmenes 1 y 2", examples: "Coche, helicóptero, avión, globo, nave, submarino, cohete, scooter" },
      { name: "Deportes, pasatiempos y cosas", count: 13, where: "Volúmenes 1 y 2", examples: "Monopatín, cometa, bádminton, fútbol americano, cámara, tambor, mapamundi, gafas, regalo" },
    ],

    seasonTitle: "Hojas que encajan con la época del año",
    seasonLead: "Estas selecciones reúnen dibujos de los dos volúmenes. No es necesario comprar material adicional.",
    seasons: [
      { name: "Otoño", items: "Calabaza, murciélago, hoja de arce, seta, lechuza, erizo, ardilla, mapache, ciervo, piña" },
      { name: "Animales para temas de invierno", items: "Oso, zorro, lechuza, ciervo, erizo, ardilla" },
      { name: "Primavera", items: "Trébol, cometa, tulipán, muguete, mariposa, abeja, libélula, caracol, rana, pato" },
      { name: "Fin de curso y verano", items: "Sombrilla de playa, sombrero, pelota de playa, gafas, sandía, helado, cangrejo, delfín" },
    ],

    useTitle: "Dónde las usan los maestros",
    uses: [
      { title: "Actividades para empezar el día", text: "Una hoja, sin preparación, las mismas cuatro etapas siempre." },
      { title: "Para quienes terminan antes", text: "Alrededor de cada dibujo se deja espacio libre a propósito, para que haya dónde seguir trabajando." },
      { title: "Centros y rincones de trabajo autónomo", text: "Una hoja por alumno. Nada que recortar, pegar ni montar." },
      { title: "Material para sustituciones", text: "Imprima varias y déjelas junto con la página para el maestro del libro." },
    ],
    useImage: {
      src: "/teachers/early-es.jpg",
      w: 900,
      h: 900,
      alt: "Cuatro versiones del mismo león: un contorno punteado para repasar, un contorno simple, un león dibujado por el alumno y un león coloreado con un árbol, hierba y una flor añadidos alrededor.",
      caption:
        "El dibujo no tiene que ser exactamente igual al modelo. Los alumnos pueden cambiar detalles y añadir su propio fondo.",
    },

    catalogTitle: "Todos los dibujos, con su número de página",
    catalogLead: "111 dibujos, ninguno repetido entre los dos libros.",
    catalog: [
      {
        vol: "Volumen 1 · 55 actividades",
        groups: [
          { name: "Animales (20)", items: "León 4, Elefante 5, Cebra 6, Loro 7, Cocodrilo 8, Mono 9, Canguro 10, Rinoceronte 11, Flamenco 12, Lémur 13, Colibrí 14, Camaleón 15, Jirafa 16, Koala 17, Rana 18, Alpaca 19, Conejo 20, Lechuza 21, Erizo 22, Cabra 23" },
          { name: "Vida marina (8)", items: "Tiburón 24, Delfín 25, Ballena 26, Cangrejo 27, Pulpo 28, Medusa 29, Tortuga 30, Pez ángel 31" },
          { name: "Fantasía (5)", items: "Sirena 32, Unicornio 33, Dragón 34, Corona 35, Gnomo 36" },
          { name: "Vehículos (4)", items: "Coche 37, Helicóptero 38, Avión 39, Globo 40" },
          { name: "Deportes y pasatiempos (4)", items: "Monopatín 41, Cometa 42, Bádminton 43, Fútbol americano 44" },
          { name: "Cosas (3)", items: "Sombrilla de playa 45, Sombrero 46, Mapamundi 47" },
          { name: "Naturaleza (5)", items: "Hoja de arce 48, Rosa 49, Seta 50, Trébol 51, Girasol 52" },
          { name: "Comida (6)", items: "Torta 53, Helado 54, Sandía 55, Zanahoria 56, Brócoli 57, Naranja 58" },
        ],
      },
      {
        vol: "Volumen 2 · 55 actividades más 1 extra",
        groups: [
          { name: "Animales (14)", items: "Oso 4, Zorro 5, Murciélago 6, Mapache 7, Gallina 8, Vaca 9, Castor 10, Águila 11, Hámster 12, Gato 13, Perro 14, Ardilla 15, Pato 16, Ciervo 17" },
          { name: "Insectos y animalitos (5)", items: "Ratón 18, Abeja 19, Libélula 20, Caracol 21, Mariposa 22" },
          { name: "Vida marina (8)", items: "Hipocampo 23, Foca 24, Pez payaso 25, Molusco 26, Ajolote 27, Pez globo 28, Camarón 29, Raya 30" },
          { name: "Fantasía (6)", items: "Grifo 31, Trol 32, Hada 33, Caldera mágica 34, Sombrero de mago 35, Poción mágica 36" },
          { name: "Vehículos (4)", items: "Nave 37, Submarino 38, Cohete 39, Scooter 40" },
          { name: "Deportes y pasatiempos (4)", items: "Cámara 41, Tambor 42, Pelota de playa 43, Gafas 44" },
          { name: "Cosas (2)", items: "Regalo 45, Mando 46" },
          { name: "Naturaleza (5)", items: "Piña 47, Cacto 48, Muguete 49, Loto 50, Tulipán 51" },
          { name: "Comida (8)", items: "Guinda 52, Aguacate 53, Fresa 54, Pera 55, Ananás 56, Limón 57, Calabaza 58, Buñuelo 59" },
        ],
      },
    ],

    buyTitle: "Elija sus materiales",
    buyCards: [
      {
        id: "bundle",
        name: "Pack completo: volúmenes 1 y 2",
        meta: "110 actividades más 1 extra · $7.99 en vez de $9.98",
        text: "Los dos libros en un solo pack, sin ningún dibujo repetido entre ellos. Una página para el maestro y un índice ilustrado en cada volumen. 58 y 59 páginas.",
        tptUrl: TPT.bundleEs,
        tptCta: "Comprar el pack en TPT · $7.99",
        featured: true,
        cover: {
          src: "/teachers/cover-paid-es.jpg",
          w: 700,
          h: 700,
          alt: "Portada de la colección completa en español: una hoja de dibujo dirigido con un león, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
      {
        id: "v1",
        name: "Volumen 1",
        meta: "55 actividades · $4.99",
        text: "Ocho temas: animales, vida marina, fantasía, vehículos, deportes y pasatiempos, cosas, naturaleza y comida. 58 páginas.",
        bookId: "directed-drawing-k2-es",
        siteCta: "Comprar el PDF aquí",
        tptUrl: TPT.v1Es,
        tptCta: "O en TPT",
        paperNote: "Elija formato carta (US Letter) o A4 al pagar.",
        cover: {
          src: "/covers/directed-drawing-k2-es.jpg",
          w: 900,
          h: 900,
          alt: "Portada del volumen 1 en español: una hoja de dibujo dirigido con un león, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
      {
        id: "v2",
        name: "Volumen 2",
        meta: "55 actividades más 1 extra · $4.99",
        text: "Nueve temas, con insectos incluidos. Dibujos nuevos, ninguno repetido del volumen 1. 59 páginas.",
        bookId: "directed-drawing-k2-2-es",
        siteCta: "Comprar el PDF aquí",
        tptUrl: TPT.v2Es,
        tptCta: "O en TPT",
        paperNote: "Elija formato carta (US Letter) o A4 al pagar.",
        cover: {
          src: "/covers/directed-drawing-k2-2-es.jpg",
          w: 900,
          h: 900,
          alt: "Portada del volumen 2 en español: una hoja de dibujo dirigido con un oso, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
    ],

    spanishTitle: "Las mismas hojas en inglés",
    spanishText:
      "Los mismos dibujos, la misma hoja, las mismas cuatro etapas. Solo cambia la palabra. Los dos volúmenes están publicados con vocabulario en inglés en cada página. Los packs en español y en inglés se venden por separado.",
    spanishCta: "Comprar el pack en inglés en TPT · $7.99",
    spanishUrl: TPT.bundleEn,

    faqTitle: "Preguntas antes de elegir",
    faq: [
      {
        q: "¿Qué voy a recibir?",
        a: "Archivos PDF listos para imprimir. El volumen 1 tiene 58 páginas y el volumen 2 tiene 59, con las actividades, la página para el maestro y el índice ilustrado. Es un recurso digital: no se envía ningún libro físico.",
      },
      {
        q: "¿Se imprimen en blanco y negro?",
        a: "Sí. Todas las páginas están en blanco y negro y se pueden imprimir o fotocopiar. No hace falta tinta de color. El color lo pone el alumno.",
      },
      {
        q: "¿Se imprimen en papel A4?",
        a: "Sí. Al comprar aquí, puede elegir entre formato carta (US Letter) y A4. Cada versión está maquetada para el tamaño de papel correspondiente, así que no se corta nada en el borde.",
      },
      {
        q: "¿Hay que preparar algo?",
        a: "Imprimir las hojas y tener lápices y material para colorear. No hay nada que recortar, pegar ni armar, y los pasos están en la hoja, así que no hace falta proyector ni vídeo.",
      },
      {
        q: "¿Pueden los alumnos añadir sus propias ideas al dibujo?",
        a: "Sí, y la hoja está pensada para eso. El modelo es un punto de partida: el dibujo no tiene que ser exactamente igual al modelo. Hay espacio libre alrededor del dibujo terminado, y los alumnos suelen cambiar detalles o añadir un fondo propio. Conviene decirlo antes de la primera hoja, porque algunos alumnos quieren que su dibujo salga igual que el ejemplo.",
      },
      {
        q: "¿En qué se diferencia de una página para colorear?",
        a: "En una página para colorear el alumno rellena un dibujo que ya está hecho. Aquí el alumno dibuja la figura y después escribe la palabra, así que la actividad también permite practicar el control del lápiz, seguir una secuencia y trabajar el vocabulario.",
      },
      {
        q: "¿Puedo compartirlas con otros maestros?",
        a: "Una compra es para un aula. Para que las utilicen todos los docentes de un mismo curso, hay que comprar una licencia por maestro. Sí puede subir el archivo a una plataforma protegida con contraseña, como Google Classroom, para sus propios alumnos.",
      },
      {
        q: "¿Hay versión en inglés?",
        a: "Sí. Los dos volúmenes están publicados con vocabulario en inglés en cada página, con los mismos dibujos y la misma hoja. Los packs en español y en inglés se venden por separado.",
      },
    ],

    authorTitle: "Hecho por Ricardo Demi",
    author:
      "Soy autor de libros infantiles y editor de Magic of Discoveries, en Miami, Florida. Enseñé doce años en la universidad y dibujé a mano todas las páginas de estos libros. Todos estos materiales están creados por mí.",
    authorLink: "Más sobre mi trabajo",

    finalTitle: "111 dibujos. Una sola rutina. Dos idiomas.",
    finalLead: "Imprima primero una hoja gratis y después elija el pack que necesita.",

    updated: "2026-09-11",
  },
};

export const teachersForLang = (lang: UiLang): TeachersCopy | undefined => teachers[lang];
