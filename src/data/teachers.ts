// Раздел для учителей. Классы K-2, США. Три языка.
//
// Порядок страницы: что это -> для каких задач -> что входит ->
// как выглядит лист -> бесплатно -> под мою тему -> полный указатель ->
// другое издание -> покупка -> вопросы -> автор -> статьи -> действие.
// Учитель выбирает материал, а не читает про методику.
//
// Правило: ничего, чего нельзя проверить, открыв книгу. Все числа взяты
// из готовых PDF и сверены лист за листом: том 1 это 58 страниц и
// 55 заданий, том 2 это 59 страниц и 56 заданий (55 плюс одно бонусное),
// вместе 111 рисунков без единого повтора.
//
// Про лицензию: внутри книг условий нет, страница для учителя их не
// описывает. Значит, текст на сайте это единственный источник, и он
// совпадает с обычными условиями площадки: один класс на покупку,
// отдельная лицензия каждому учителю, выкладывать можно только в
// закрытую паролем систему для своих учеников.
//
// Переключателя языка над карточками покупки нет намеренно. Он бы
// дублировал вторую языковую версию сайта и заставил бы две страницы
// соперничать в поиске. Вместо него отдельный блок про другое издание
// перед покупкой, со ссылкой на ту страницу.

import type { UiLang } from "./books";

export interface TeachersImage {
  src: string;
  w: number;
  h: number;
  /** Что изображено. Нейросеть картинку не видит, она читает это. */
  alt: string;
  /** Подпись под картинкой. Видна человеку и тоже читается нейросетью. */
  caption: string;
}

export interface TeachersFreeCard {
  title: string;
  text: string;
  file: string;
  cta: string;
  cover: TeachersImage;
}

/* Подборка по теме. Собрана не по разделам книг, а по тому, как учитель
   называет свою тему. Сумма всех подборок равна 111. */
export interface TeachersThemeGroup {
  name: string;
  count: number;
  where: string;
  examples: string;
  /** Куда ведет ссылка в карточке: нужный том в полном указателе. */
  anchor: string;
}

export interface TeachersSeason {
  name: string;
  items: string;
}

export interface TeachersBuyCard {
  id: string;
  name: string;
  meta: string;
  text: string;
  /** Наша покупка. У комплекта пусто: на сайте его пока нет. */
  bookId?: string;
  siteCta?: string;
  tptUrl: string;
  tptCta: string;
  /** Размер бумаги выбирают только при покупке у нас. */
  paperNote?: string;
  cover: TeachersImage;
  featured?: boolean;
  /** Экономия комплекта, отдельной строкой. */
  save?: string;
}

export interface TeachersCopy {
  title: string;
  lead: string;
  heroShort: string;
  heroBuyCta: string;
  heroFreeCta: string;
  heroNote: string;
  heroCovers: { label: string; img: TeachersImage }[];

  /** Определение одной фразой. Идет в разметку страницы, не в текст. */
  definition: string;

  /** Строка ссылок под первым экраном. Помогает и человеку, и поиску. */
  nav: { label: string; href: string }[];

  usesTitle: string;
  uses: { title: string; text: string }[];

  volumesTitle: string;
  volumes: { name: string; bullets: string[] }[];
  volumesNote: string;

  anatomyTitle: string;
  steps: { n: string; title: string; text: string }[];
  anatomyNote: string;
  sample: TeachersImage;
  sample2: TeachersImage;
  useImage: TeachersImage;

  freeTitle: string;
  freeLead: string;
  freeCards: TeachersFreeCard[];
  freeNote: string;
  freeOther: { text: string; url: string };

  themesTitle: string;
  themesLead: string;
  themeGroups: TeachersThemeGroup[];
  /** Подпись ссылки в карточках тем и сезонов. */
  seeLabel: string;

  seasonTitle: string;
  seasonLead: string;
  seasons: TeachersSeason[];

  catalogTitle: string;
  catalogLead: string;
  catalog: { vol: string; anchor: string; groups: { name: string; items: string }[] }[];

  otherTitle: string;
  otherText: string;
  otherPair: { label: string; img: TeachersImage }[];
  otherFreeCta: string;
  otherFreeUrl: string;
  otherPageCta: string;
  otherPageUrl: string;

  buyTitle: string;
  buyCards: TeachersBuyCard[];

  faqTitle: string;
  faq: { q: string; a: string }[];

  authorTitle: string;
  author: string;
  authorLink: string;
  updatedLabel: string;
  updated: string;

  articlesTitle: string;

  finalTitle: string;
  finalLead: string;
}

/* Адреса на площадке. Сверены с магазином 11.09.2026: десять товаров,
   отдельный том 4.99, комплект 7.99 вместо 9.98. */
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

  en: {
    title: "Directed Drawing and Writing Worksheets for Kindergarten, 1st and 2nd Grade",
    lead: "Two volumes of ready-to-print activities for morning work, independent work and early finishers. Every page holds step by step drawing, tracing, a space to draw, and practice writing one word.",
    heroShort: "111 different activities, no drawing repeated. English and Spanish editions.",
    heroBuyCta: "Choose a volume or the bundle · From $4.99",
    heroFreeCta: "Download free activities",
    heroNote: "Printable PDF. Black and white pages. No physical book is shipped.",
    heroCovers: [
      { label: "Volume 1", img: { src: "/covers/directed-drawing-k2-en.jpg", w: 900, h: 900, alt: "Cover of Volume 1: a directed drawing page with a lion, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" } },
      { label: "Volume 2", img: { src: "/covers/directed-drawing-k2-2-en.jpg", w: 900, h: 900, alt: "Cover of Volume 2: a directed drawing page with a bear, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" } },
    ],

    definition: "Directed drawing and handwriting worksheets for grades K-2, ages 5 to 8. On every page a student follows a step by step visual sequence to build the picture, traces the finished outline, draws it again in an open space, then traces and writes the matching word on primary ruled lines. All four stages sit on one printable sheet, in English or in Spanish. 111 activities across two volumes.",

    nav: [
      { label: "Classroom uses", href: "#uses" },
      { label: "What is included", href: "#volumes" },
      { label: "By theme", href: "#themes" },
      { label: "By season", href: "#seasons" },
      { label: "Free activities", href: "#free" },
      { label: "Spanish edition", href: "#other" },
      { label: "Buy", href: "#buy" },
    ],

    usesTitle: "Ready activities for the everyday classroom",
    uses: [
      { title: "To start the day", text: "One page with the same four stages that repeat in every activity." },
      { title: "For early finishers", text: "Room to draw, color, and add details or a background of their own." },
      { title: "For centers and independent work", text: "The steps and the working space are on one sheet. Nothing to cut, glue or assemble." },
      { title: "For sub plans", text: "Pages ready to print, and notes for the teacher in each volume." },
    ],

    volumesTitle: "Two volumes, 111 different activities",
    volumes: [
      { name: "Volume 1", bullets: ["55 activities.", "Eight themes.", "58 pages.", "Teacher notes and an illustrated contents page."] },
      { name: "Volume 2", bullets: ["55 activities plus one bonus.", "Nine themes, including bugs.", "59 pages.", "Teacher notes and an illustrated contents page."] },
    ],
    volumesNote: "The second volume extends the collection with drawings that do not appear in the first. Both are published with the word in English or in Spanish, and each language edition is sold separately.",

    anatomyTitle: "Four stages on one sheet",
    steps: [
      { n: "1", title: "Step by step drawing", text: "Numbered boxes show how the drawing is built." },
      { n: "2", title: "Trace the outline", text: "The finished drawing with a dashed line to trace." },
      { n: "3", title: "Draw and color", text: "A space to draw without the dashed guide, and to add color." },
      { n: "4", title: "Trace and write the word", text: "A word to trace and primary ruled lines to write on." },
    ],
    anatomyNote: "Every step is printed on the sheet itself and can be looked at again at any moment. No video and no projector are needed.",
    sample: { src: "/teachers/sample-page-en.jpg", w: 1000, h: 1294, alt: "A directed drawing worksheet for grades K-2. Six numbered boxes show a lion built up from a circle. Below them, a dashed lion outline to trace, an empty box to draw in, and primary ruled lines with the word Lion to trace and write.", caption: "Lion, Volume 1, page 4." },
    sample2: { src: "/teachers/sample-page-2-en.jpg", w: 1000, h: 1294, alt: "A directed drawing worksheet for grades K-2. Six numbered boxes show a unicorn built up from simple curved shapes, with a dashed outline to trace, an empty box to draw in, and the word Unicorn on primary ruled lines.", caption: "Unicorn, Volume 1, page 33." },
    useImage: { src: "/teachers/early-en.jpg", w: 900, h: 900, alt: "Four versions of the same lion: a dashed outline to trace, a plain outline, a lion drawn independently, and a finished lion colored in with a tree, grass and a flower added around it.", caption: "The sheet leaves room to add details and a background of their own." },

    freeTitle: "Download free activities from both volumes",
    freeLead: "See how the pages look in print and pick the material that suits your class.",
    freeCards: [
      { title: "Free sample from Volume 1", text: "8 activities, one from each theme. 10 pages, PDF.", file: "/free/directed-drawing-k2-en-free-sample.pdf", cta: "Download 8 free activities", cover: { src: "/teachers/cover-free-en.jpg", w: 700, h: 700, alt: "Cover of the free 8-activity sample: an English directed drawing page with a lion, marked FREE, 8 ACTIVITIES, NO PREP, GRADES K-2.", caption: "" } },
      { title: "Free sample from Volume 2", text: "9 activities, one from each theme. 11 pages, PDF.", file: "/free/directed-drawing-k2-2-en-free-sample.pdf", cta: "Download 9 free activities", cover: { src: "/teachers/cover-free-2-en.jpg", w: 700, h: 700, alt: "Cover of the free 9-activity sample from Volume 2: a directed drawing page with a fox, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" } },
    ],
    freeNote: "Direct download, with no sign-up, no email address and no watermarks. These are complete pages from the books and are counted in the total number of activities.",
    freeOther: { text: "Free activities in Spanish", url: "/es/maestros" },

    themesTitle: "Find drawings for the theme you are teaching",
    themesLead: "Each selection shows how many drawings it holds and which volumes they are in. These are examples.",
    seeLabel: "See the drawings and their page numbers",
    themeGroups: [
      { name: "Zoo and safari animals", count: 13, where: "Volume 1", anchor: "#vol1", examples: "Lion, elephant, zebra, giraffe, monkey, kangaroo, rhino, flamingo, koala, crocodile" },
      { name: "Farm and forest animals, and pets", count: 21, where: "Volumes 1 and 2", anchor: "#vol1", examples: "Cow, chicken, duck, goat, cat, dog, bunny, fox, bear, deer, squirrel, owl" },
      { name: "Water animals", count: 16, where: "Volumes 1 and 2", anchor: "#vol1", examples: "Shark, dolphin, whale, crab, octopus, jellyfish, sea turtle, seahorse, seal, manta ray" },
      { name: "Bugs and other small animals", count: 5, where: "Volume 2", anchor: "#vol2", examples: "Bee, butterfly, dragonfly, snail, mouse" },
      { name: "Plants and nature", count: 10, where: "Volumes 1 and 2", anchor: "#vol1", examples: "Sunflower, rose, tulip, maple leaf, clover, mushroom, pine cone, cactus" },
      { name: "Food", count: 14, where: "Volumes 1 and 2", anchor: "#vol1", examples: "Cake, ice cream, watermelon, carrot, broccoli, orange, cherry, strawberry, pumpkin" },
      { name: "Fantasy characters and magic objects", count: 11, where: "Volumes 1 and 2", anchor: "#vol1", examples: "Mermaid, unicorn, dragon, fairy, griffin, troll, wizard's hat, magic potion" },
      { name: "Vehicles", count: 8, where: "Volumes 1 and 2", anchor: "#vol1", examples: "Car, helicopter, airplane, hot air balloon, ship, submarine, rocket, scooter" },
      { name: "Sports, hobbies and objects", count: 13, where: "Volumes 1 and 2", anchor: "#vol1", examples: "Skateboard, kite, badminton, American football, camera, drum, globe, sunglasses, present" },
    ],

    seasonTitle: "Drawings for each time of year",
    seasonLead: "These drawings are already in the two volumes. There is no separate seasonal pack to buy.",
    seasons: [
      { name: "Fall", items: "Pumpkin, bat, maple leaf, mushroom, owl, hedgehog, squirrel, raccoon, deer, pine cone" },
      { name: "Animal drawings for winter topics", items: "Bear, fox, owl, deer, hedgehog, squirrel" },
      { name: "Spring", items: "Clover, kite, tulip, lily of the valley, butterfly, bee, dragonfly, snail, frog, duck" },
      { name: "End of the year and summer", items: "Beach umbrella, beach hat, beach ball, sunglasses, watermelon, ice cream, crab, dolphin" },
    ],

    catalogTitle: "Every drawing with its page number",
    catalogLead: "111 different drawings across the two volumes. No repeats.",
    catalog: [
      {
        vol: "Volume 1 · 55 activities",
        anchor: "vol1",
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
        anchor: "vol2",
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

    otherTitle: "Do you need pages with the word in Spanish?",
    otherText: "Both volumes are published in Spanish. The drawings, the page layout and the four stages are the same. Each page carries the matching word in Spanish. The English and Spanish bundles are sold separately.",
    otherPair: [
      { label: "English", img: { src: "/teachers/sample-page-en.jpg", w: 1000, h: 1294, alt: "The same lion worksheet with the word Lion in English on primary ruled lines.", caption: "" } },
      { label: "Español", img: { src: "/teachers/sample-page-es.jpg", w: 1000, h: 1294, alt: "The same lion worksheet with the word León in Spanish on primary ruled lines.", caption: "" } },
    ],
    otherFreeCta: "Download free activities in Spanish",
    otherFreeUrl: "/free/directed-drawing-k2-es-free-sample.pdf",
    otherPageCta: "See the Spanish edition",
    otherPageUrl: "/es/maestros",

    buyTitle: "Choose a volume or the full bundle",
    buyCards: [
      {
        id: "bundle", featured: true,
        name: "Full bundle: Volumes 1 and 2",
        meta: "110 activities plus one bonus · $7.99 instead of $9.98",
        save: "Save $1.99 against buying the two volumes separately.",
        text: "Both volumes, every drawing different, with teacher notes and illustrated contents in each.",
        tptUrl: TPT.bundleEn,
        tptCta: "Buy the English bundle on TPT · $7.99",
        cover: { src: "/covers/directed-drawing-k2-en.jpg", w: 900, h: 900, alt: "Cover of Volume 1: a directed drawing page with a lion, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" },
      },
      {
        id: "v1",
        name: "Volume 1",
        meta: "55 activities. Eight themes. 58 pages.",
        text: "Animals, sea life, fantasy, vehicles, sports and hobbies, things, nature and food.",
        bookId: "directed-drawing-k2-en",
        siteCta: "Buy the PDF here",
        tptUrl: TPT.v1En,
        tptCta: "Buy on TPT",
        paperNote: "Buying on this site, choose US Letter or A4.",
        cover: { src: "/covers/directed-drawing-k2-en.jpg", w: 900, h: 900, alt: "Cover of Volume 1: a directed drawing page with a lion, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" },
      },
      {
        id: "v2",
        name: "Volume 2",
        meta: "55 activities plus one bonus. Nine themes. 59 pages.",
        text: "Nine themes, including bugs. No drawing is repeated from the first volume.",
        bookId: "directed-drawing-k2-2-en",
        siteCta: "Buy the PDF here",
        tptUrl: TPT.v2En,
        tptCta: "Buy on TPT",
        paperNote: "Buying on this site, choose US Letter or A4.",
        cover: { src: "/covers/directed-drawing-k2-2-en.jpg", w: 900, h: 900, alt: "Cover of Volume 2: a directed drawing page with a bear, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" },
      },
    ],

    faqTitle: "Common questions",
    faq: [
      { q: "What will I receive?", a: "Printable PDF files. Volume 1 has 58 pages and Volume 2 has 59. These figures include the activities, the teacher notes and the illustrated contents. No physical book is shipped." },
      { q: "Do I need a color printer?", a: "No. Every page is black and white and can be printed or photocopied. Students color the drawings themselves." },
      { q: "Can I print the sheets on A4?", a: "Yes. Buying on this site, you can choose US Letter or A4. There is a version laid out for each paper size, so nothing is cut off at the edge." },
      { q: "Do I need to prepare anything?", a: "Print the sheets and have drawing and coloring materials ready. There is nothing to cut, glue or assemble. Every step is printed on the page." },
      { q: "Can students add their own details?", a: "Yes. The sheet leaves a space for students to draw on their own and add details or a background. It helps to say so before the first page, because some students want their drawing to look exactly like the example." },
      { q: "How are these different from a coloring page?", a: "Every sheet holds a step by step drawing, an outline to trace, a space to draw independently, and a word to trace and write. Along with drawing, the activity practises pencil control, following a sequence and vocabulary." },
      { q: "Can I share the files with other teachers?", a: "Each purchase covers use in one classroom. If several teachers are going to use them, each one needs their own licence. You may share the file with your own students on a password-protected platform such as Google Classroom." },
      { q: "Is there a Spanish edition?", a: "Yes. Both volumes are published with the word in Spanish. The drawings and the page layout are the same. The English and Spanish editions are sold separately." },
    ],

    authorTitle: "Materials made by Ricardo Demi",
    author: "I am a children's author and the publisher at Magic of Discoveries, in Miami, Florida. I taught at university level for twelve years. I drew every illustration in these books by hand and made all the materials shown here.",
    authorLink: "More about my work",
    updatedLabel: "Last updated:",
    updated: "2026-09-11",

    articlesTitle: "More ideas for using the sheets",

    finalTitle: "111 different activities in two volumes",
    finalLead: "Choose the English or the Spanish edition. The free samples let you see the material before buying.",
  },

  es: {
    title: "Fichas de dibujo dirigido y escritura para kínder, 1.º y 2.º grado",
    lead: "Dos volúmenes de actividades listas para imprimir, ideales para empezar el día, trabajar de forma autónoma o tener a mano para quienes terminan antes. Cada ficha incluye dibujo paso a paso, repaso del contorno, espacio para dibujar y práctica de escritura de una palabra.",
    heroShort: "111 actividades diferentes, sin dibujos repetidos. Ediciones en inglés y en español.",
    heroBuyCta: "Elegir un volumen o el pack · Desde $4.99",
    heroFreeCta: "Descargar actividades gratuitas",
    heroNote: "PDF para imprimir. Páginas en blanco y negro. No se envía ningún libro físico.",
    heroCovers: [
      { label: "Volumen 1", img: { src: "/covers/directed-drawing-k2-es.jpg", w: 900, h: 900, alt: "Portada del volumen 1: una ficha de dibujo dirigido con un león, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" } },
      { label: "Volumen 2", img: { src: "/covers/directed-drawing-k2-2-es.jpg", w: 900, h: 900, alt: "Portada del volumen 2: una ficha de dibujo dirigido con un oso, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" } },
    ],

    definition: "Fichas de dibujo dirigido y escritura para los grados K-2, de 5 a 8 años. En cada ficha el alumno sigue una secuencia visual paso a paso para construir el dibujo, repasa el contorno terminado, lo vuelve a dibujar en un espacio libre y después repasa y escribe la palabra correspondiente en una pauta con líneas de guía. Las cuatro etapas caben en una sola hoja imprimible, en español o en inglés. 111 actividades en dos volúmenes.",

    nav: [
      { label: "Usos en el aula", href: "#uses" },
      { label: "Qué incluyen", href: "#volumes" },
      { label: "Por temas", href: "#themes" },
      { label: "Por estaciones", href: "#seasons" },
      { label: "Actividades gratuitas", href: "#free" },
      { label: "Edición en inglés", href: "#other" },
      { label: "Comprar", href: "#buy" },
    ],

    usesTitle: "Actividades listas para el día a día en el aula",
    uses: [
      { title: "Para empezar el día", text: "Una ficha con cuatro etapas que se repiten en todas las actividades." },
      { title: "Para quienes terminan antes", text: "Espacio para dibujar, colorear y añadir detalles o un fondo propio." },
      { title: "Para rincones de trabajo y actividades autónomas", text: "Los pasos y el espacio de trabajo están en una sola hoja. No hay nada que recortar, pegar ni montar." },
      { title: "Para sustituciones", text: "Fichas listas para imprimir e indicaciones para el docente en cada volumen." },
    ],

    volumesTitle: "Dos volúmenes, 111 actividades diferentes",
    volumes: [
      { name: "Volumen 1", bullets: ["55 actividades.", "Ocho temas.", "58 páginas.", "Indicaciones para el docente e índice ilustrado."] },
      { name: "Volumen 2", bullets: ["55 actividades más una de regalo.", "Nueve temas, incluidos los insectos.", "59 páginas.", "Indicaciones para el docente e índice ilustrado."] },
    ],
    volumesNote: "El segundo volumen amplía la colección con dibujos que no aparecen en el primero. Ambos están disponibles con palabras en español o en inglés. Las ediciones de cada idioma se venden por separado.",

    anatomyTitle: "Cuatro etapas en una sola ficha",
    steps: [
      { n: "1", title: "Dibujo paso a paso", text: "Los recuadros numerados muestran cómo se construye el dibujo." },
      { n: "2", title: "Repaso del contorno", text: "Un dibujo completo con líneas de puntos para repasar." },
      { n: "3", title: "Dibujo libre y coloreado", text: "Un espacio para dibujar sin la guía de puntos y añadir color." },
      { n: "4", title: "Repaso y escritura de la palabra", text: "Una palabra para repasar y una pauta con líneas de guía para escribir." },
    ],
    anatomyNote: "Todos los pasos están impresos en la propia ficha y se pueden consultar de nuevo en cualquier momento. No hace falta vídeo ni proyector.",
    sample: { src: "/teachers/sample-page-es.jpg", w: 1000, h: 1294, alt: "Una ficha de dibujo dirigido para los grados K-2. Seis recuadros numerados muestran un león construido a partir de un círculo. Debajo, el contorno punteado del león para repasar, un recuadro vacío para dibujar y una pauta con la palabra León para repasar y escribir.", caption: "León, volumen 1, página 4." },
    sample2: { src: "/teachers/sample-page-2-es.jpg", w: 1000, h: 1294, alt: "Una ficha de dibujo dirigido para los grados K-2. Seis recuadros numerados muestran un unicornio construido a partir de formas curvas sencillas, con el contorno punteado para repasar, un recuadro vacío para dibujar y la palabra Unicornio en una pauta.", caption: "Unicornio, volumen 1, página 33." },
    useImage: { src: "/teachers/early-es.jpg", w: 900, h: 900, alt: "Cuatro versiones del mismo león: un contorno punteado para repasar, un contorno simple, un león dibujado por el alumno y un león coloreado con un árbol, hierba y una flor añadidos alrededor.", caption: "La ficha deja espacio para añadir detalles y un fondo propio." },

    freeTitle: "Descargue actividades gratuitas de ambos volúmenes",
    freeLead: "Vea cómo quedan las fichas impresas y elija el material que mejor se adapte a su clase.",
    freeCards: [
      { title: "Muestra gratuita del volumen 1", text: "8 actividades, una de cada tema. 10 páginas, PDF.", file: "/free/directed-drawing-k2-es-free-sample.pdf", cta: "Descargar 8 actividades gratuitas", cover: { src: "/teachers/cover-free-es.jpg", w: 700, h: 700, alt: "Portada de la muestra gratuita de 8 actividades: una ficha de dibujo dirigido en español con un león, marcada FREE, 8 ACTIVITIES, NO PREP, GRADES K-2.", caption: "" } },
      { title: "Muestra gratuita del volumen 2", text: "9 actividades, una de cada tema. 11 páginas, PDF.", file: "/free/directed-drawing-k2-2-es-free-sample.pdf", cta: "Descargar 9 actividades gratuitas", cover: { src: "/teachers/cover-free-2-es.jpg", w: 700, h: 700, alt: "Portada de la muestra gratuita de 9 actividades del volumen 2 en español: una ficha de dibujo dirigido con un zorro, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" } },
    ],
    freeNote: "Descarga directa, sin registro, sin necesidad de indicar un correo electrónico y sin marcas de agua. Son fichas completas de los libros y están incluidas en el total de actividades.",
    freeOther: { text: "Actividades gratuitas en inglés", url: "/en/teachers" },

    themesTitle: "Encuentre dibujos para el tema que está trabajando",
    themesLead: "Cada selección indica cuántos dibujos incluye y en qué volúmenes se encuentran. Estos son algunos ejemplos.",
    seeLabel: "Ver los dibujos y sus números de página",
    themeGroups: [
      { name: "Animales del zoo y de safari", count: 13, where: "Volumen 1", anchor: "#vol1", examples: "León, elefante, cebra, jirafa, mono, canguro, rinoceronte, flamenco, koala, cocodrilo" },
      { name: "Animales de granja y del bosque, y mascotas", count: 21, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Vaca, gallina, pato, cabra, gato, perro, conejo, zorro, oso, ciervo, ardilla, lechuza" },
      { name: "Animales acuáticos", count: 16, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Tiburón, delfín, ballena, cangrejo, pulpo, medusa, tortuga, hipocampo, foca, raya" },
      { name: "Insectos y otros animales pequeños", count: 5, where: "Volumen 2", anchor: "#vol2", examples: "Abeja, mariposa, libélula, caracol, ratón" },
      { name: "Plantas y naturaleza", count: 10, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Girasol, rosa, tulipán, hoja de arce, trébol, seta, piña, cacto" },
      { name: "Comida", count: 14, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Torta, helado, sandía, zanahoria, brócoli, naranja, guinda, fresa, calabaza" },
      { name: "Personajes fantásticos y objetos mágicos", count: 11, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Sirena, unicornio, dragón, hada, grifo, trol, sombrero de mago, poción mágica" },
      { name: "Vehículos", count: 8, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Coche, helicóptero, avión, globo, nave, submarino, cohete, scooter" },
      { name: "Deportes, aficiones y objetos", count: 13, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Monopatín, cometa, bádminton, fútbol americano, cámara, tambor, mapamundi, gafas, regalo" },
    ],

    seasonTitle: "Dibujos para cada época del año",
    seasonLead: "Estos dibujos ya están incluidos en los dos volúmenes. No es necesario comprar un pack de temporada aparte.",
    seasons: [
      { name: "Otoño", items: "Calabaza, murciélago, hoja de arce, seta, lechuza, erizo, ardilla, mapache, ciervo, piña" },
      { name: "Animales para actividades de invierno", items: "Oso, zorro, lechuza, ciervo, erizo, ardilla" },
      { name: "Primavera", items: "Trébol, cometa, tulipán, muguete, mariposa, abeja, libélula, caracol, rana, pato" },
      { name: "Fin de curso y verano", items: "Sombrilla de playa, sombrero, pelota de playa, gafas, sandía, helado, cangrejo, delfín" },
    ],

    catalogTitle: "Todos los dibujos con sus números de página",
    catalogLead: "111 dibujos diferentes entre los dos volúmenes. Sin repeticiones.",
    catalog: [
      {
        vol: "Volumen 1 · 55 actividades",
        anchor: "vol1",
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
        anchor: "vol2",
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

    otherTitle: "¿Necesita fichas con palabras en inglés?",
    otherText: "Ambos volúmenes están disponibles en inglés. Los dibujos, la distribución de la página y las cuatro etapas son los mismos. Cada ficha incluye la palabra correspondiente en inglés. Los packs en español y en inglés se venden por separado.",
    otherPair: [
      { label: "Español", img: { src: "/teachers/sample-page-es.jpg", w: 1000, h: 1294, alt: "La misma ficha del león con la palabra León en español en una pauta con líneas de guía.", caption: "" } },
      { label: "English", img: { src: "/teachers/sample-page-en.jpg", w: 1000, h: 1294, alt: "La misma ficha del león con la palabra Lion en inglés en una pauta con líneas de guía.", caption: "" } },
    ],
    otherFreeCta: "Descargar actividades gratuitas en inglés",
    otherFreeUrl: "/free/directed-drawing-k2-en-free-sample.pdf",
    otherPageCta: "Ver la edición en inglés",
    otherPageUrl: "/en/teachers",

    buyTitle: "Elija un volumen o el pack completo",
    buyCards: [
      {
        id: "bundle", featured: true,
        name: "Pack completo: volúmenes 1 y 2",
        meta: "110 actividades más una de regalo · $7.99 en lugar de $9.98",
        save: "Ahorre $1.99 respecto a la compra de los dos volúmenes por separado.",
        text: "Incluye ambos volúmenes, todos los dibujos diferentes, con indicaciones para el docente e índices ilustrados.",
        tptUrl: TPT.bundleEs,
        tptCta: "Comprar el pack en español en TPT · $7.99",
        cover: { src: "/covers/directed-drawing-k2-es.jpg", w: 900, h: 900, alt: "Portada del volumen 1: una ficha de dibujo dirigido con un león, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" },
      },
      {
        id: "v1",
        name: "Volumen 1",
        meta: "55 actividades. Ocho temas. 58 páginas.",
        text: "Animales, vida marina, fantasía, vehículos, deportes y pasatiempos, cosas, naturaleza y comida.",
        bookId: "directed-drawing-k2-es",
        siteCta: "Comprar el PDF aquí",
        tptUrl: TPT.v1Es,
        tptCta: "Comprar en TPT",
        paperNote: "Al comprar en esta web, elija entre los formatos US Letter y A4.",
        cover: { src: "/covers/directed-drawing-k2-es.jpg", w: 900, h: 900, alt: "Portada del volumen 1: una ficha de dibujo dirigido con un león, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" },
      },
      {
        id: "v2",
        name: "Volumen 2",
        meta: "55 actividades más una de regalo. Nueve temas. 59 páginas.",
        text: "Nueve temas, con insectos incluidos. Ningún dibujo se repite del primer volumen.",
        bookId: "directed-drawing-k2-2-es",
        siteCta: "Comprar el PDF aquí",
        tptUrl: TPT.v2Es,
        tptCta: "Comprar en TPT",
        paperNote: "Al comprar en esta web, elija entre los formatos US Letter y A4.",
        cover: { src: "/covers/directed-drawing-k2-2-es.jpg", w: 900, h: 900, alt: "Portada del volumen 2: una ficha de dibujo dirigido con un oso, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" },
      },
    ],

    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Qué recibiré?", a: "Archivos PDF para imprimir. El primer volumen tiene 58 páginas y el segundo, 59. Estas cifras incluyen las actividades, las indicaciones para el docente y el índice ilustrado. No se envía ningún libro físico." },
      { q: "¿Necesito una impresora en color?", a: "No. Todas las páginas están en blanco y negro y se pueden imprimir o fotocopiar. Los alumnos colorean los dibujos." },
      { q: "¿Puedo imprimir las fichas en A4?", a: "Sí. Al comprar en esta web, puede elegir entre US Letter y A4. Hay una versión maquetada para cada tamaño de papel, así que no se corta nada en el borde." },
      { q: "¿Tengo que preparar algo?", a: "Solo tiene que imprimir las fichas y preparar los materiales para dibujar y colorear. No hay nada que recortar, pegar ni montar. Todos los pasos están impresos en la hoja." },
      { q: "¿Pueden los alumnos añadir sus propios detalles?", a: "Sí. La ficha incluye un espacio para que dibujen por su cuenta y añadan detalles o un fondo propio. Conviene decirlo antes de la primera ficha, porque algunos alumnos quieren que su dibujo salga igual que el ejemplo." },
      { q: "¿En qué se diferencian estas fichas de una página para colorear?", a: "Cada ficha incluye un dibujo paso a paso, un contorno para repasar, espacio para dibujar de forma autónoma y una palabra para repasar y escribir. Además del dibujo, la actividad trabaja el control del lápiz, seguir una secuencia y el vocabulario." },
      { q: "¿Puedo compartir los archivos con otros docentes?", a: "Cada compra permite utilizar los materiales en una sola clase. Si varios docentes van a utilizarlos, cada uno necesita su propia licencia. Puede compartir el archivo con sus alumnos en una plataforma protegida con contraseña, como Google Classroom." },
      { q: "¿Hay una edición en inglés?", a: "Sí. Ambos volúmenes están disponibles con palabras en inglés. Los dibujos y el diseño de las fichas son los mismos. Las ediciones en español y en inglés se venden por separado." },
    ],

    authorTitle: "Materiales creados por Ricardo Demi",
    author: "Soy autor de libros infantiles y editor de Magic of Discoveries, en Miami, Florida. Durante doce años impartí clases en la universidad. He dibujado a mano todas las ilustraciones de estos libros y he creado todos los materiales que se presentan aquí.",
    authorLink: "Más sobre mi trabajo",
    updatedLabel: "Última actualización:",
    updated: "2026-09-11",

    articlesTitle: "Más ideas para utilizar las fichas",

    finalTitle: "111 actividades diferentes en dos volúmenes",
    finalLead: "Elija la edición en español o en inglés. Las muestras gratuitas le permiten conocer el material antes de comprar.",
  },

  ru: {
    title: "Рабочие листы по пошаговому рисованию и письму для подготовительного, первого и второго классов",
    lead: "Два сборника готовых заданий для утренней работы, самостоятельных занятий и тех, кто закончил раньше. На каждом листе: рисование по шагам, обводка, самостоятельный рисунок и написание слова.",
    heroShort: "111 разных заданий без повторов. Английское и испанское издания.",
    heroBuyCta: "Выбрать книгу или комплект · от $4.99",
    heroFreeCta: "Скачать бесплатные задания",
    heroNote: "PDF для печати. Черно-белые страницы. Печатная книга не отправляется.",
    heroCovers: [
      { label: "Том 1", img: { src: "/covers/directed-drawing-k2-en.jpg", w: 900, h: 900, alt: "Обложка первого тома: страница пошагового рисования со львом, пометки 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" } },
      { label: "Том 2", img: { src: "/covers/directed-drawing-k2-2-en.jpg", w: 900, h: 900, alt: "Обложка второго тома: страница пошагового рисования с медведем, пометки 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" } },
    ],

    definition: "Рабочие листы по пошаговому рисованию и письму для классов K-2, дети от 5 до 8 лет. На каждой странице ребенок идет по пошаговой схеме и строит изображение, обводит готовый контур, рисует сам в свободном поле, а потом обводит и пишет соответствующее слово на строке с направляющими линиями. Все четыре этапа помещаются на одном листе для печати, со словом на английском или на испанском. 111 заданий в двух томах.",

    nav: [
      { label: "Для каких занятий", href: "#uses" },
      { label: "Что входит", href: "#volumes" },
      { label: "По темам", href: "#themes" },
      { label: "По сезонам", href: "#seasons" },
      { label: "Бесплатные задания", href: "#free" },
      { label: "Испанское издание", href: "#other" },
      { label: "Купить", href: "#buy" },
    ],

    usesTitle: "Готовые задания для повседневной работы в классе",
    uses: [
      { title: "В начале учебного дня", text: "Готовый лист с четырьмя этапами, которые повторяются во всех заданиях." },
      { title: "Для тех, кто закончил раньше", text: "Место для самостоятельного рисунка, раскрашивания, дополнительных деталей и фона." },
      { title: "Для работы по станциям и самостоятельных занятий", text: "Все шаги и поле для работы на одном листе. Ничего не нужно вырезать, склеивать или собирать." },
      { title: "Для замещающего учителя", text: "Готовые страницы для печати и пояснения для учителя в каждом томе." },
    ],

    volumesTitle: "Два тома, 111 разных заданий",
    volumes: [
      { name: "Том 1", bullets: ["55 заданий.", "Восемь тем.", "58 страниц.", "Пояснения для учителя и иллюстрированное оглавление."] },
      { name: "Том 2", bullets: ["55 заданий и одно бонусное.", "Девять тем, включая насекомых.", "59 страниц.", "Пояснения для учителя и иллюстрированное оглавление."] },
    ],
    volumesNote: "Второй том продолжает коллекцию: рисунки из первого тома в нем не повторяются. Оба тома доступны со словами на английском или испанском языке. Издания на разных языках продаются отдельно.",

    anatomyTitle: "Четыре части на одном листе",
    steps: [
      { n: "1", title: "Рисование по шагам", text: "Пронумерованные окошки показывают последовательность построения рисунка." },
      { n: "2", title: "Обводка", text: "Готовое изображение с пунктирным контуром." },
      { n: "3", title: "Самостоятельный рисунок и раскрашивание", text: "Свободное поле для своей работы." },
      { n: "4", title: "Обводка и написание слова", text: "Слово и строки с направляющими линиями." },
    ],
    anatomyNote: "Все шаги напечатаны на странице. Можно снова посмотреть на любой из них. Для работы с листом не нужны видео или проектор.",
    sample: { src: "/teachers/sample-page-en.jpg", w: 1000, h: 1294, alt: "Рабочий лист по пошаговому рисованию для классов K-2. Шесть пронумерованных окошек показывают, как лев строится из круга. Ниже пунктирный контур льва для обводки, пустое поле для своего рисунка и строка с направляющими линиями со словом Lion.", caption: "Лев, том 1, страница 4." },
    sample2: { src: "/teachers/sample-page-2-en.jpg", w: 1000, h: 1294, alt: "Рабочий лист по пошаговому рисованию для классов K-2. Шесть окошек показывают, как единорог строится из простых округлых фигур, ниже пунктирный контур, пустое поле и слово Unicorn на строке с направляющими линиями.", caption: "Единорог, том 1, страница 33." },
    useImage: { src: "/teachers/early-en.jpg", w: 900, h: 900, alt: "Четыре варианта одного и того же льва: пунктирный контур для обводки, простой контур, лев, нарисованный ребенком самостоятельно, и раскрашенный лев с добавленными вокруг деревом, травой и цветком.", caption: "На листе остается место для собственных деталей и фона." },

    freeTitle: "Скачайте бесплатные задания из обоих томов",
    freeLead: "Посмотрите страницы в печати и выберите подходящий материал для своего класса.",
    freeCards: [
      { title: "Из первого тома", text: "8 заданий, по одному из каждой темы. 10 страниц, PDF.", file: "/free/directed-drawing-k2-en-free-sample.pdf", cta: "Скачать 8 бесплатных заданий", cover: { src: "/teachers/cover-free-en.jpg", w: 700, h: 700, alt: "Обложка бесплатного набора из 8 заданий: страница пошагового рисования со львом, пометки FREE, 8 ACTIVITIES, NO PREP, GRADES K-2.", caption: "" } },
      { title: "Из второго тома", text: "9 заданий, по одному из каждой темы. 11 страниц, PDF.", file: "/free/directed-drawing-k2-2-en-free-sample.pdf", cta: "Скачать 9 бесплатных заданий", cover: { src: "/teachers/cover-free-2-en.jpg", w: 700, h: 700, alt: "Обложка бесплатного набора из 9 заданий второго тома: страница пошагового рисования с лисой, пометки 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" } },
    ],
    freeNote: "Прямое скачивание без регистрации, электронной почты и водяных знаков. Это полноценные страницы из книг. Они входят в общее количество заданий.",
    freeOther: { text: "Бесплатные задания на испанском", url: "/es/maestros" },

    themesTitle: "Выберите рисунки к вашей теме",
    themesLead: "В каждой подборке указаны количество рисунков и тома, в которых они находятся. Ниже приведены примеры.",
    seeLabel: "Посмотреть рисунки и страницы",
    themeGroups: [
      { name: "Животные зоопарка и саванны", count: 13, where: "Том 1", anchor: "#vol1", examples: "Лев, слон, зебра, жираф, обезьяна, кенгуру, носорог, фламинго, коала, крокодил" },
      { name: "Животные фермы и леса, домашние питомцы", count: 21, where: "Тома 1 и 2", anchor: "#vol1", examples: "Корова, курица, утка, коза, кот, собака, кролик, лиса, медведь, олень, белка, сова" },
      { name: "Водные животные", count: 16, where: "Тома 1 и 2", anchor: "#vol1", examples: "Акула, дельфин, кит, краб, осьминог, медуза, черепаха, морской конек, тюлень, скат" },
      { name: "Насекомые и другие маленькие животные", count: 5, where: "Том 2", anchor: "#vol2", examples: "Пчела, бабочка, стрекоза, улитка, мышь" },
      { name: "Растения и природа", count: 10, where: "Тома 1 и 2", anchor: "#vol1", examples: "Подсолнух, роза, тюльпан, кленовый лист, клевер, гриб, шишка, кактус" },
      { name: "Еда", count: 14, where: "Тома 1 и 2", anchor: "#vol1", examples: "Торт, мороженое, арбуз, морковь, брокколи, апельсин, вишня, клубника, тыква" },
      { name: "Сказочные персонажи и волшебные предметы", count: 11, where: "Тома 1 и 2", anchor: "#vol1", examples: "Русалка, единорог, дракон, фея, грифон, тролль, шляпа волшебника, волшебное зелье" },
      { name: "Транспорт", count: 8, where: "Тома 1 и 2", anchor: "#vol1", examples: "Машина, вертолет, самолет, воздушный шар, корабль, подводная лодка, ракета, самокат" },
      { name: "Спорт, увлечения и предметы", count: 13, where: "Тома 1 и 2", anchor: "#vol1", examples: "Скейтборд, воздушный змей, бадминтон, американский футбол, фотоаппарат, барабан, глобус, очки, подарок" },
    ],

    seasonTitle: "Подборки для разных времен года",
    seasonLead: "Эти рисунки уже входят в два тома. Отдельный сезонный набор покупать не нужно.",
    seasons: [
      { name: "Осень", items: "Тыква, летучая мышь, кленовый лист, гриб, сова, еж, белка, енот, олень, шишка" },
      { name: "Животные для зимних занятий", items: "Медведь, лиса, сова, олень, еж, белка" },
      { name: "Весна", items: "Клевер, воздушный змей, тюльпан, ландыш, бабочка, пчела, стрекоза, улитка, лягушка, утка" },
      { name: "Конец учебного года и лето", items: "Пляжный зонт, панама, пляжный мяч, очки, арбуз, мороженое, краб, дельфин" },
    ],

    catalogTitle: "Все рисунки с номерами страниц",
    catalogLead: "111 разных рисунков в двух томах. Без повторов.",
    catalog: [
      {
        vol: "Том 1 · 55 заданий",
        anchor: "vol1",
        groups: [
          { name: "Животные (20)", items: "Лев 4, Слон 5, Зебра 6, Попугай 7, Крокодил 8, Обезьяна 9, Кенгуру 10, Носорог 11, Фламинго 12, Лемур 13, Колибри 14, Хамелеон 15, Жираф 16, Коала 17, Лягушка 18, Альпака 19, Кролик 20, Сова 21, Еж 22, Коза 23" },
          { name: "Море (8)", items: "Акула 24, Дельфин 25, Кит 26, Краб 27, Осьминог 28, Медуза 29, Черепаха 30, Рыба-ангел 31" },
          { name: "Фэнтези (5)", items: "Русалка 32, Единорог 33, Дракон 34, Корона 35, Гном 36" },
          { name: "Транспорт (4)", items: "Машина 37, Вертолет 38, Самолет 39, Воздушный шар 40" },
          { name: "Спорт и хобби (4)", items: "Скейтборд 41, Воздушный змей 42, Бадминтон 43, Американский футбол 44" },
          { name: "Предметы (3)", items: "Пляжный зонт 45, Панама 46, Глобус 47" },
          { name: "Природа (5)", items: "Кленовый лист 48, Роза 49, Гриб 50, Клевер 51, Подсолнух 52" },
          { name: "Еда (6)", items: "Торт 53, Мороженое 54, Арбуз 55, Морковь 56, Брокколи 57, Апельсин 58" },
        ],
      },
      {
        vol: "Том 2 · 55 заданий плюс одно бонусное",
        anchor: "vol2",
        groups: [
          { name: "Животные (14)", items: "Медведь 4, Лиса 5, Летучая мышь 6, Енот 7, Курица 8, Корова 9, Бобр 10, Орел 11, Хомяк 12, Кот 13, Собака 14, Белка 15, Утка 16, Олень 17" },
          { name: "Насекомые и мелкие существа (5)", items: "Мышь 18, Пчела 19, Стрекоза 20, Улитка 21, Бабочка 22" },
          { name: "Море (8)", items: "Морской конек 23, Тюлень 24, Рыба-клоун 25, Моллюск 26, Аксолотль 27, Рыба-еж 28, Креветка 29, Скат 30" },
          { name: "Фэнтези (6)", items: "Грифон 31, Тролль 32, Фея 33, Волшебный котел 34, Шляпа волшебника 35, Волшебное зелье 36" },
          { name: "Транспорт (4)", items: "Корабль 37, Подводная лодка 38, Ракета 39, Самокат 40" },
          { name: "Спорт и хобби (4)", items: "Фотоаппарат 41, Барабан 42, Пляжный мяч 43, Очки 44" },
          { name: "Предметы (2)", items: "Подарок 45, Геймпад 46" },
          { name: "Природа (5)", items: "Шишка 47, Кактус 48, Ландыш 49, Лотос 50, Тюльпан 51" },
          { name: "Еда (8)", items: "Вишня 52, Авокадо 53, Клубника 54, Груша 55, Ананас 56, Лимон 57, Тыква 58, Пончик 59" },
        ],
      },
    ],

    otherTitle: "Нужны задания со словами на испанском?",
    otherText: "Оба тома доступны в испанском издании. Те же рисунки, расположение элементов и четыре этапа. На каждой странице дано соответствующее слово на испанском. Английский и испанский комплекты продаются отдельно.",
    otherPair: [
      { label: "English", img: { src: "/teachers/sample-page-en.jpg", w: 1000, h: 1294, alt: "Тот же лист со львом и словом Lion на английском на строке с направляющими линиями.", caption: "" } },
      { label: "Español", img: { src: "/teachers/sample-page-es.jpg", w: 1000, h: 1294, alt: "Тот же лист со львом и словом León на испанском на строке с направляющими линиями.", caption: "" } },
    ],
    otherFreeCta: "Скачать бесплатные задания на испанском",
    otherFreeUrl: "/free/directed-drawing-k2-es-free-sample.pdf",
    otherPageCta: "Посмотреть испанское издание",
    otherPageUrl: "/es/maestros",

    buyTitle: "Выберите книгу или комплект",
    buyCards: [
      {
        id: "bundle", featured: true,
        name: "Комплект из двух томов",
        meta: "110 заданий и одно бонусное · $7.99 вместо $9.98",
        save: "Экономия $1.99 по сравнению с покупкой двух томов отдельно.",
        text: "Оба тома, все рисунки разные, с пояснениями для учителя и иллюстрированными оглавлениями.",
        tptUrl: TPT.bundleEn,
        tptCta: "Купить английский комплект на TPT · $7.99",
        cover: { src: "/covers/directed-drawing-k2-en.jpg", w: 900, h: 900, alt: "Обложка первого тома: страница пошагового рисования со львом, пометки 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" },
      },
      {
        id: "v1",
        name: "Том 1",
        meta: "55 заданий. Восемь тем. 58 страниц.",
        text: "Животные, море, фэнтези, транспорт, спорт и хобби, предметы, природа и еда.",
        bookId: "directed-drawing-k2-en",
        siteCta: "Купить PDF здесь",
        tptUrl: TPT.v1En,
        tptCta: "Купить на TPT",
        paperNote: "При покупке на сайте выберите формат US Letter или A4.",
        cover: { src: "/covers/directed-drawing-k2-en.jpg", w: 900, h: 900, alt: "Обложка первого тома: страница пошагового рисования со львом, пометки 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" },
      },
      {
        id: "v2",
        name: "Том 2",
        meta: "55 заданий и одно бонусное. Девять тем. 59 страниц.",
        text: "Девять тем, включая насекомых. Ни один рисунок не повторяется из первого тома.",
        bookId: "directed-drawing-k2-2-en",
        siteCta: "Купить PDF здесь",
        tptUrl: TPT.v2En,
        tptCta: "Купить на TPT",
        paperNote: "При покупке на сайте выберите формат US Letter или A4.",
        cover: { src: "/covers/directed-drawing-k2-2-en.jpg", w: 900, h: 900, alt: "Обложка второго тома: страница пошагового рисования с медведем, пометки 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.", caption: "" },
      },
    ],

    faqTitle: "Вопросы перед покупкой",
    faq: [
      { q: "Что я получу?", a: "Файлы PDF для печати. В первом томе 58 страниц, во втором 59, включая задания, пояснения для учителя и оглавление. Печатная книга не отправляется." },
      { q: "Нужен ли цветной принтер?", a: "Нет. Все страницы черно-белые. Их можно распечатать или скопировать. Раскрашивает ребенок." },
      { q: "Можно ли печатать на A4?", a: "Да. При покупке на сайте можно выбрать US Letter или A4. Для каждого размера подготовлена отдельная версия, поэтому по краям ничего не срезается." },
      { q: "Нужно ли что-то готовить?", a: "Распечатать страницы и подготовить материалы для рисования. Ничего не нужно вырезать, склеивать или собирать. Все шаги уже на листе." },
      { q: "Можно ли добавлять собственные детали?", a: "Да. Для самостоятельного рисунка и дополнительных деталей оставлено свободное поле. Об этом стоит сказать до первого листа, потому что некоторые дети хотят, чтобы получилось точно как в примере." },
      { q: "Чем это отличается от раскраски?", a: "На листе есть рисование по шагам, обводка, место для самостоятельного рисунка и написания слова. Кроме рисования, задание работает на владение карандашом, на последовательность действий и на словарь." },
      { q: "Можно ли делиться файлами с другими учителями?", a: "Одна покупка дает право использовать материалы в одном классе. Если ими пользуются несколько учителей, каждому нужна отдельная лицензия. Для своих учеников файл можно разместить на защищенной паролем платформе, например в Google Classroom." },
      { q: "Есть ли испанское издание?", a: "Да. Оба тома доступны со словами на испанском. Английское и испанское издания продаются отдельно." },
    ],

    authorTitle: "Материалы Рикардо Деми",
    author: "Я автор детских книг и издатель Magic of Discoveries в Майами, штат Флорида. Двенадцать лет преподавал в университете. Все рисунки в этих книгах нарисовал от руки. Представленные здесь материалы созданы мной.",
    authorLink: "Подробнее о моей работе",
    updatedLabel: "Обновлено:",
    updated: "2026-09-11",

    articlesTitle: "Подробнее о работе с материалами",

    finalTitle: "111 разных заданий в двух томах",
    finalLead: "Выберите английское или испанское издание. Бесплатные образцы помогут посмотреть материал перед покупкой.",
  },

};

export const teachersForLang = (lang: UiLang): TeachersCopy | undefined => teachers[lang];
