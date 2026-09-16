// Раздел для учителей. Классы K-2, США. Три языка.
//
// Порядок страницы: что это -> для каких задач -> что входит ->
// как выглядит лист -> бесплатно -> под мою тему -> полный указатель ->
// другое издание -> покупка -> вопросы -> автор -> статьи -> действие.
// Учитель выбирает материал, а не читает про методику.
//
// Правило: ничего, чего нельзя проверить, открыв книгу. Все числа взяты
// из готовых PDF издания с двумя уровнями и сверены с их оглавлением:
// том 1 это 55 рисунков, 110 листов и 113 страниц, том 2 это 56 рисунков
// (55 плюс одно бонусное), 112 листов и 115 страниц. Вместе 111 рисунков
// без единого повтора и 222 листа. Каждый рисунок стоит в книге дважды:
// первый уровень на странице N, второй на странице N+55 в первом томе
// и N+56 во втором.
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
  useImage: TeachersImage;

  /** Два уровня одного рисунка: пара настоящих листов и пояснение к каждому. */
  levelsTitle: string;
  levelsLead: string;
  levels: { name: string; text: string; img: TeachersImage }[];
  levelsNote: string;

  /** Страницы из превью книги: лист для учителя, оглавление, один рисунок
      на двух уровнях. Учитель видит книгу изнутри до покупки. */
  insideTitle: string;
  insideLead: string;
  inside: { vol: string; pages: TeachersImage[] }[];

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

/* Адреса на площадке. Номер товара в конце адреса не меняется, когда
   меняется название, поэтому адреса прежние. 16.09.2026 все десять
   товаров заменены изданием с двумя уровнями: отдельный том 5.99,
   комплект 9.98 вместо 11.98. На своем сайте том стоит столько же. */
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
    lead: "Two volumes of ready-to-print activities for morning work, centers, independent work and early finishers. Every drawing comes at two levels of difficulty, and every page holds step by step drawing, tracing, a space to draw, and practice writing one word.",
    heroShort: "111 different drawings, each at two levels: 222 worksheets, no drawing repeated. English and Spanish editions.",
    heroBuyCta: "Choose a volume or the bundle · From $5.99",
    heroFreeCta: "Download free activities",
    heroNote: "Printable PDF. Black and white pages. No physical book is shipped.",
    heroCovers: [
      { label: "Volume 1", img: { src: "/covers/directed-drawing-k2-en.jpg", w: 900, h: 900, alt: "Cover of Volume 1: a directed drawing page with a lion, marked 55 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 110 WORKSHEETS.", caption: "" } },
      { label: "Volume 2", img: { src: "/covers/directed-drawing-k2-2-en.jpg", w: 900, h: 900, alt: "Cover of Volume 2: a directed drawing page with a fox, marked 55+1 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 112 WORKSHEETS.", caption: "" } },
    ],

    definition: "Directed drawing and handwriting worksheets for grades K-2, ages 5 to 8. On every page a student follows a step by step visual sequence to build the picture, traces the finished outline, draws it again in an open space, then traces and writes the matching word on primary ruled lines. Every drawing comes at two levels: Level 1 has four steps and a light gray starting shape in the drawing space, Level 2 has five to eight steps and an empty drawing space. All four stages sit on one printable sheet, in English or in Spanish. 111 drawings and 222 worksheets across two volumes.",

    nav: [
      { label: "Classroom uses", href: "#uses" },
      { label: "What is included", href: "#volumes" },
      { label: "Look inside", href: "#inside" },
      { label: "Two levels", href: "#levels" },
      { label: "By theme", href: "#themes" },
      { label: "By season", href: "#seasons" },
      { label: "Free activities", href: "#free" },
      { label: "Spanish edition", href: "#other" },
      { label: "Buy", href: "#buy" },
    ],

    usesTitle: "Ready activities for the everyday classroom",
    uses: [
      { title: "Morning work", text: "The same four stages on every page, so students know what to do from the first day." },
      { title: "For early finishers", text: "Room to draw, color, and add details or a background of their own." },
      { title: "Centers, independent work and sub plans", text: "The steps and the working space are on one sheet. Nothing to cut, glue or assemble." },
      { title: "Mixed skill levels", text: "The whole class draws the same picture, and each student gets the level that fits." },
    ],

    volumesTitle: "Two volumes, 111 different activities",
    volumes: [
      { name: "Volume 1", bullets: ["55 drawings, each at two levels: 110 worksheets.", "Eight themes.", "113 pages.", "A teacher page and a two-page illustrated contents with page numbers for both levels."] },
      { name: "Volume 2", bullets: ["55 drawings plus one bonus, each at two levels: 112 worksheets.", "Nine themes, including bugs.", "115 pages.", "A teacher page and a two-page illustrated contents with page numbers for both levels."] },
    ],
    volumesNote: "The second volume extends the collection with drawings that do not appear in the first. Both are published with the word in English or in Spanish, and each language edition is sold separately.",

    anatomyTitle: "Four stages on one sheet",
    steps: [
      { n: "1", title: "Step by step drawing", text: "Numbered boxes show how the drawing is built: four at Level 1, five to eight at Level 2." },
      { n: "2", title: "Trace the outline", text: "The finished drawing with a dashed line to trace." },
      { n: "3", title: "Draw and color", text: "A space to draw without the dashed guide, and to add color. At Level 1 it holds a light gray starting shape." },
      { n: "4", title: "Trace and write the word", text: "A word to trace and primary ruled lines to write on." },
    ],
    anatomyNote: "Every step is printed on the sheet itself and can be looked at again at any moment. No video and no projector are needed.",
    sample: { src: "/teachers/sample-page-en.jpg", w: 1000, h: 1295, alt: "A Level 2 directed drawing worksheet for grades K-2. Six numbered boxes show a crab built up from an oval. Below them, a dashed crab outline to trace, an empty box to draw in, and primary ruled lines with the word Crab to trace and write.", caption: "Crab, Level 2, Volume 1, page 82." },
    levelsTitle: "Two levels of the same drawing",
    levelsLead: "Every drawing appears twice in the book. The picture is the same, only the amount of support changes.",
    levels: [
      { name: "Level 1", text: "Four steps. The part already drawn is light gray and the new lines are black. The drawing space holds a light gray starting shape, so the student continues the picture and adds the rest.", img: { src: "/teachers/level-1-en.jpg", w: 1000, h: 1295, alt: "A Level 1 worksheet: four numbered boxes build a lion, and a light gray lion head is already printed in the drawing space.", caption: "Lion, Level 1, Volume 1, page 4." } },
      { name: "Level 2", text: "Five to eight steps, depending on the drawing. Students start from the simplest shapes and add the details. The drawing space is empty, so the whole picture is their own.", img: { src: "/teachers/sample-page-2-en.jpg", w: 1000, h: 1295, alt: "A Level 2 worksheet: six numbered boxes build the same lion from a circle, and the drawing space is empty.", caption: "Lion, Level 2, Volume 1, page 59." } },
    ],
    levelsNote: "Many teachers start the year with Level 1 and move to Level 2 as students grow more confident. Every worksheet is marked Level 1 or Level 2 in the top right corner, so printed pages are easy to sort.",

    insideTitle: "Look inside each volume",
    insideLead: "Pages from the books: the teacher page, the illustrated contents, and one drawing at both levels. Click a page to see it larger.",
    inside: [
      { vol: "Volume 1", pages: [
        { src: "/teachers/inside-v1-en-1.jpg", w: 700, h: 906, alt: "Teacher page of Volume 1: how the two levels work, the four stages of each activity, classroom uses and the skills practised.", caption: "Teacher page" },
        { src: "/teachers/inside-v1-en-2.jpg", w: 700, h: 906, alt: "First page of the illustrated contents of Volume 1: every drawing with two page numbers, one for each level.", caption: "Contents" },
        { src: "/teachers/inside-v1-en-3.jpg", w: 700, h: 906, alt: "Second page of the illustrated contents of Volume 1.", caption: "Contents, continued" },
        { src: "/teachers/inside-v1-en-4.jpg", w: 700, h: 906, alt: "The elephant worksheet at Level 1, marked PREVIEW.", caption: "Elephant, Level 1" },
        { src: "/teachers/inside-v1-en-5.jpg", w: 700, h: 906, alt: "The elephant worksheet at Level 2, marked PREVIEW.", caption: "Elephant, Level 2" },
      ] },
      { vol: "Volume 2", pages: [
        { src: "/teachers/inside-v2-en-1.jpg", w: 700, h: 906, alt: "Teacher page of Volume 2: how the two levels work, the four stages of each activity, classroom uses and the skills practised.", caption: "Teacher page" },
        { src: "/teachers/inside-v2-en-2.jpg", w: 700, h: 906, alt: "First page of the illustrated contents of Volume 2: every drawing with two page numbers, one for each level.", caption: "Contents" },
        { src: "/teachers/inside-v2-en-3.jpg", w: 700, h: 906, alt: "Second page of the illustrated contents of Volume 2.", caption: "Contents, continued" },
        { src: "/teachers/inside-v2-en-4.jpg", w: 700, h: 906, alt: "The fox worksheet at Level 1, marked PREVIEW.", caption: "Fox, Level 1" },
        { src: "/teachers/inside-v2-en-5.jpg", w: 700, h: 906, alt: "The fox worksheet at Level 2, marked PREVIEW.", caption: "Fox, Level 2" },
      ] },
    ],

    useImage: { src: "/teachers/early-en.jpg", w: 900, h: 900, alt: "Four versions of the same lion: a dashed outline to trace, a plain outline, a lion drawn independently, and a finished lion colored in with a tree, grass and a flower added around it.", caption: "The sheet leaves room to add details and a background of their own." },

    freeTitle: "Download free activities from both volumes",
    freeLead: "See how the pages look in print and pick the material that suits your class.",
    freeCards: [
      { title: "Free sample from Volume 1", text: "8 drawings, one from each theme, at both levels: 16 worksheets. 18 pages, PDF.", file: "/free/directed-drawing-k2-en-free-sample.pdf", cta: "Download 8 free activities", cover: { src: "/teachers/cover-free-en.jpg", w: 700, h: 700, alt: "Cover of the free Volume 1 sample: an English directed drawing page with a lion, marked FREE 8 ACTIVITIES, NO PREP, GRADES K-2, 2 LEVELS, 16 WORKSHEETS.", caption: "" } },
      { title: "Free sample from Volume 2", text: "9 drawings, one from each theme, at both levels: 18 worksheets. 20 pages, PDF.", file: "/free/directed-drawing-k2-2-en-free-sample.pdf", cta: "Download 9 free activities", cover: { src: "/teachers/cover-free-2-en.jpg", w: 700, h: 700, alt: "Cover of the free Volume 2 sample: an English directed drawing page with a fox, marked FREE 9 ACTIVITIES, NO PREP, GRADES K-2, 2 LEVELS, 18 WORKSHEETS.", caption: "" } },
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

    catalogTitle: "Every drawing with its page numbers",
    catalogLead: "111 different drawings across the two volumes. No repeats. The first page number is Level 1, the second is Level 2.",
    catalog: [
      {
        vol: "Volume 1 · 55 drawings, 110 worksheets",
        anchor: "vol1",
        groups: [
          { name: "Animals (20)", items: "Lion 4 · 59, Elephant 5 · 60, Zebra 6 · 61, Parrot 7 · 62, Crocodile 8 · 63, Monkey 9 · 64, Kangaroo 10 · 65, Rhino 11 · 66, Flamingo 12 · 67, Lemur 13 · 68, Hummingbird 14 · 69, Chameleon 15 · 70, Giraffe 16 · 71, Koala 17 · 72, Frog 18 · 73, Alpaca 19 · 74, Bunny 20 · 75, Owl 21 · 76, Hedgehog 22 · 77, Goat 23 · 78" },
          { name: "Sea life (8)", items: "Shark 24 · 79, Dolphin 25 · 80, Whale 26 · 81, Crab 27 · 82, Octopus 28 · 83, Jellyfish 29 · 84, Sea turtle 30 · 85, Angelfish 31 · 86" },
          { name: "Fantasy (5)", items: "Mermaid 32 · 87, Unicorn 33 · 88, Dragon 34 · 89, Crown 35 · 90, Dwarf 36 · 91" },
          { name: "Vehicles (4)", items: "Car 37 · 92, Helicopter 38 · 93, Airplane 39 · 94, Hot air balloon 40 · 95" },
          { name: "Sports and hobbies (4)", items: "Skateboard 41 · 96, Kite 42 · 97, Badminton 43 · 98, American football 44 · 99" },
          { name: "Things (3)", items: "Beach umbrella 45 · 100, Beach hat 46 · 101, Globe 47 · 102" },
          { name: "Nature (5)", items: "Maple leaf 48 · 103, Rose 49 · 104, Mushroom 50 · 105, Clover 51 · 106, Sunflower 52 · 107" },
          { name: "Food (6)", items: "Cake 53 · 108, Ice cream 54 · 109, Watermelon 55 · 110, Carrot 56 · 111, Broccoli 57 · 112, Orange 58 · 113" },
        ],
      },
      {
        vol: "Volume 2 · 55 drawings plus 1 bonus, 112 worksheets",
        anchor: "vol2",
        groups: [
          { name: "Animals (14)", items: "Bear 4 · 60, Fox 5 · 61, Bat 6 · 62, Raccoon 7 · 63, Chicken 8 · 64, Cow 9 · 65, Beaver 10 · 66, Eagle 11 · 67, Hamster 12 · 68, Cat 13 · 69, Dog 14 · 70, Squirrel 15 · 71, Duck 16 · 72, Deer 17 · 73" },
          { name: "Bugs and little creatures (5)", items: "Mouse 18 · 74, Bee 19 · 75, Dragonfly 20 · 76, Snail 21 · 77, Butterfly 22 · 78" },
          { name: "Sea life (8)", items: "Seahorse 23 · 79, Seal 24 · 80, Clown fish 25 · 81, Shellfish 26 · 82, Axolotl 27 · 83, Pufferfish 28 · 84, Shrimp 29 · 85, Manta ray 30 · 86" },
          { name: "Fantasy (6)", items: "Griffin 31 · 87, Troll 32 · 88, Fairy 33 · 89, Magic cauldron 34 · 90, Wizard's hat 35 · 91, Magic potion 36 · 92" },
          { name: "Vehicles (4)", items: "Ship 37 · 93, Submarine 38 · 94, Rocket 39 · 95, Scooter 40 · 96" },
          { name: "Sports and hobbies (4)", items: "Camera 41 · 97, Drum 42 · 98, Beach ball 43 · 99, Sunglasses 44 · 100" },
          { name: "Things (2)", items: "Present 45 · 101, Gamepad 46 · 102" },
          { name: "Nature (5)", items: "Pine cone 47 · 103, Cactus 48 · 104, Lily of the valley 49 · 105, Lotus 50 · 106, Tulip 51 · 107" },
          { name: "Food (8)", items: "Cherry 52 · 108, Avocado 53 · 109, Strawberry 54 · 110, Pear 55 · 111, Pineapple 56 · 112, Lemon 57 · 113, Pumpkin 58 · 114, Donut 59 · 115" },
        ],
      },
    ],

    otherTitle: "Do you need pages with the word in Spanish?",
    otherText: "Both volumes are published in Spanish. The drawings, the two levels, the page layout and the four stages are the same. Each page carries the matching word in Spanish. The English and Spanish bundles are sold separately.",
    otherPair: [
      { label: "English", img: { src: "/teachers/sample-page-en.jpg", w: 1000, h: 1294, alt: "The Level 2 crab worksheet with the word Crab in English on primary ruled lines.", caption: "" } },
      { label: "Español", img: { src: "/teachers/sample-page-es.jpg", w: 1000, h: 1294, alt: "The same crab worksheet with the word Cangrejo in Spanish on primary ruled lines.", caption: "" } },
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
        meta: "111 drawings at two levels, 222 worksheets · $9.98 instead of $11.98",
        save: "Save $2 against buying the two volumes separately.",
        text: "Both volumes, every drawing different and each at two levels, with a teacher page and illustrated contents in each.",
        tptUrl: TPT.bundleEn,
        tptCta: "Buy the English bundle on TPT · $9.98",
        cover: { src: "/teachers/bundle-en.jpg", w: 900, h: 900, alt: "Cover of the English bundle: Volumes 1 and 2 of Directed Drawing side by side, marked 111 ACTIVITIES × 2 LEVELS, NO PREP, GRADES K-2, TWO VOLUMES COMPLETE SET.", caption: "" },
      },
      {
        id: "v1",
        name: "Volume 1",
        meta: "55 drawings at two levels. 110 worksheets. 113 pages.",
        text: "Animals, sea life, fantasy, vehicles, sports and hobbies, things, nature and food.",
        bookId: "directed-drawing-k2-en",
        siteCta: "Buy the PDF here",
        tptUrl: TPT.v1En,
        tptCta: "Buy on TPT",
        paperNote: "Buying on this site, choose US Letter or A4.",
        cover: { src: "/covers/directed-drawing-k2-en.jpg", w: 900, h: 900, alt: "Cover of Volume 1: a directed drawing page with a lion, marked 55 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 110 WORKSHEETS.", caption: "" },
      },
      {
        id: "v2",
        name: "Volume 2",
        meta: "55 drawings plus one bonus at two levels. 112 worksheets. 115 pages.",
        text: "Nine themes, including bugs. No drawing is repeated from the first volume.",
        bookId: "directed-drawing-k2-2-en",
        siteCta: "Buy the PDF here",
        tptUrl: TPT.v2En,
        tptCta: "Buy on TPT",
        paperNote: "Buying on this site, choose US Letter or A4.",
        cover: { src: "/covers/directed-drawing-k2-2-en.jpg", w: 900, h: 900, alt: "Cover of Volume 2: a directed drawing page with a fox, marked 55+1 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 112 WORKSHEETS.", caption: "" },
      },
    ],

    faqTitle: "Common questions",
    faq: [
      { q: "What will I receive?", a: "Printable PDF files. Volume 1 has 113 pages and Volume 2 has 115: the worksheets at both levels, a teacher page and a two-page illustrated contents. No physical book is shipped." },
      { q: "What is the difference between the two levels?", a: "Level 1 shows the drawing in four steps and prints a light gray starting shape in the drawing space. Level 2 shows the same drawing in five to eight steps and leaves the drawing space empty. The whole class can work on the same picture while each student gets the level that fits." },
      { q: "Do I need a color printer?", a: "No. Every page is black and white and can be printed or photocopied. Students color the drawings themselves." },
      { q: "Can I print the sheets on A4?", a: "Yes. Buying on this site, you can choose US Letter or A4. There is a version laid out for each paper size, so nothing is cut off at the edge." },
      { q: "Do I need to prepare anything?", a: "Print the sheets and have drawing and coloring materials ready. There is nothing to cut, glue or assemble. Every step is printed on the page." },
      { q: "Can students add their own details?", a: "Yes. The sheet leaves a space for students to draw on their own and add details or a background. It helps to say so before the first page, because some students want their drawing to look exactly like the example." },
      { q: "How are these different from a coloring page?", a: "Every sheet holds a step by step drawing, an outline to trace, a space to draw independently, and a word to trace and write. Along with drawing, the activity practises pencil control, following a sequence and vocabulary." },
      { q: "Can I share the files with other teachers?", a: "Each purchase covers use in one classroom. If several teachers are going to use them, each one needs their own licence. You may share the file with your own students on a password-protected platform such as Google Classroom." },
      { q: "Is there a Spanish edition?", a: "Yes. Both volumes are published with the word in Spanish. The drawings, the two levels and the page layout are the same. The English and Spanish editions are sold separately." },
    ],

    authorTitle: "Materials made by Ricardo Demi",
    author: "I am a children's author and the publisher at Magic of Discoveries, in Miami, Florida. I taught at university level for twelve years. I drew every illustration in these books by hand and made all the materials shown here.",
    authorLink: "More about my work",
    updatedLabel: "Last updated:",
    updated: "2026-09-16",

    articlesTitle: "More ideas for using the sheets",

    finalTitle: "111 different drawings at two levels, in two volumes",
    finalLead: "Choose the English or the Spanish edition. The free samples let you see the material before buying.",
  },

  es: {
    title: "Fichas de dibujo dirigido y escritura para kínder, 1.º y 2.º grado",
    lead: "Dos volúmenes de actividades listas para imprimir, ideales para empezar el día, los centros de aprendizaje, el trabajo autónomo o para quienes terminan antes. Cada dibujo viene en dos niveles de dificultad, y cada ficha incluye dibujo paso a paso, repaso del contorno, espacio para dibujar y práctica de escritura de una palabra.",
    heroShort: "111 dibujos diferentes, cada uno en dos niveles: 222 fichas, sin dibujos repetidos. Ediciones en inglés y en español.",
    heroBuyCta: "Elegir un volumen o el pack · Desde $5.99",
    heroFreeCta: "Descargar actividades gratuitas",
    heroNote: "PDF para imprimir. Páginas en blanco y negro. No se envía ningún libro físico.",
    heroCovers: [
      { label: "Volumen 1", img: { src: "/covers/directed-drawing-k2-es.jpg", w: 900, h: 900, alt: "Portada del volumen 1 en español: una ficha de dibujo dirigido con un león, marcada 55 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 110 WORKSHEETS.", caption: "" } },
      { label: "Volumen 2", img: { src: "/covers/directed-drawing-k2-2-es.jpg", w: 900, h: 900, alt: "Portada del volumen 2 en español: una ficha de dibujo dirigido con un zorro, marcada 55+1 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 112 WORKSHEETS.", caption: "" } },
    ],

    definition: "Fichas de dibujo dirigido y escritura para los grados K-2, de 5 a 8 años. En cada ficha el alumno sigue una secuencia visual paso a paso para construir el dibujo, repasa el contorno terminado, lo vuelve a dibujar en un espacio libre y después repasa y escribe la palabra correspondiente en una pauta con líneas de guía. Cada dibujo viene en dos niveles: el nivel 1 tiene cuatro pasos y una forma inicial en gris claro en el espacio de dibujo, el nivel 2 tiene de cinco a ocho pasos y el espacio de dibujo vacío. Las cuatro etapas caben en una sola hoja imprimible, en español o en inglés. 111 dibujos y 222 fichas en dos volúmenes.",

    nav: [
      { label: "Usos en el aula", href: "#uses" },
      { label: "Qué incluyen", href: "#volumes" },
      { label: "Vistazo al interior", href: "#inside" },
      { label: "Dos niveles", href: "#levels" },
      { label: "Por temas", href: "#themes" },
      { label: "Por estaciones", href: "#seasons" },
      { label: "Actividades gratuitas", href: "#free" },
      { label: "Edición en inglés", href: "#other" },
      { label: "Comprar", href: "#buy" },
    ],

    usesTitle: "Actividades listas para el día a día en el aula",
    uses: [
      { title: "Para empezar el día", text: "Las mismas cuatro etapas en cada ficha, así los alumnos saben qué hacer desde el primer día." },
      { title: "Para quienes terminan antes", text: "Espacio para dibujar, colorear y añadir detalles o un fondo propio." },
      { title: "Para centros, trabajo autónomo y sustituciones", text: "Los pasos y el espacio de trabajo están en una sola hoja. No hay nada que recortar, pegar ni montar." },
      { title: "Para grupos con distintos niveles", text: "Toda la clase dibuja lo mismo y cada alumno recibe el nivel que le corresponde." },
    ],

    volumesTitle: "Dos volúmenes, 111 actividades diferentes",
    volumes: [
      { name: "Volumen 1", bullets: ["55 dibujos, cada uno en dos niveles: 110 fichas.", "Ocho temas.", "113 páginas.", "Una página para el docente y un índice ilustrado de dos páginas con los números de página de ambos niveles."] },
      { name: "Volumen 2", bullets: ["55 dibujos más uno de regalo, cada uno en dos niveles: 112 fichas.", "Nueve temas, incluidos los insectos.", "115 páginas.", "Una página para el docente y un índice ilustrado de dos páginas con los números de página de ambos niveles."] },
    ],
    volumesNote: "El segundo volumen amplía la colección con dibujos que no aparecen en el primero. Ambos están disponibles con palabras en español o en inglés. Las ediciones de cada idioma se venden por separado.",

    anatomyTitle: "Cuatro etapas en una sola ficha",
    steps: [
      { n: "1", title: "Dibujo paso a paso", text: "Los recuadros numerados muestran cómo se construye el dibujo: cuatro en el nivel 1, de cinco a ocho en el nivel 2." },
      { n: "2", title: "Repaso del contorno", text: "Un dibujo completo con líneas de puntos para repasar." },
      { n: "3", title: "Dibujo libre y coloreado", text: "Un espacio para dibujar sin la guía de puntos y añadir color. En el nivel 1 incluye una forma inicial en gris claro." },
      { n: "4", title: "Repaso y escritura de la palabra", text: "Una palabra para repasar y una pauta con líneas de guía para escribir." },
    ],
    anatomyNote: "Todos los pasos están impresos en la propia ficha y se pueden consultar de nuevo en cualquier momento. No hace falta vídeo ni proyector.",
    sample: { src: "/teachers/sample-page-es.jpg", w: 1000, h: 1295, alt: "Una ficha de dibujo dirigido de nivel 2 para los grados K-2. Seis recuadros numerados muestran un cangrejo construido a partir de un óvalo. Debajo, el contorno punteado del cangrejo para repasar, un recuadro vacío para dibujar y una pauta con la palabra Cangrejo para repasar y escribir.", caption: "Cangrejo, nivel 2, volumen 1, página 82." },
    levelsTitle: "Dos niveles del mismo dibujo",
    levelsLead: "Cada dibujo aparece dos veces en el libro. El dibujo es el mismo, solo cambia la cantidad de apoyo.",
    levels: [
      { name: "Nivel 1", text: "Cuatro pasos. La parte ya dibujada aparece en gris claro y las líneas nuevas, en negro. El espacio de dibujo incluye una forma inicial en gris claro, así el alumno continúa el dibujo y completa el resto.", img: { src: "/teachers/level-1-es.jpg", w: 1000, h: 1295, alt: "Una ficha de nivel 1: cuatro recuadros numerados construyen un león, y en el espacio de dibujo ya está impresa en gris claro la cabeza del león.", caption: "León, nivel 1, volumen 1, página 4." } },
      { name: "Nivel 2", text: "De cinco a ocho pasos, según el dibujo. Los alumnos empiezan por las formas más sencillas y van añadiendo detalles. El espacio de dibujo está vacío, así que todo el dibujo es suyo.", img: { src: "/teachers/sample-page-2-es.jpg", w: 1000, h: 1295, alt: "Una ficha de nivel 2: seis recuadros numerados construyen el mismo león a partir de un círculo, y el espacio de dibujo está vacío.", caption: "León, nivel 2, volumen 1, página 59." } },
    ],
    levelsNote: "Muchos docentes empiezan el curso con el nivel 1 y pasan al nivel 2 a medida que los alumnos ganan confianza. Cada ficha lleva la marca Level 1 o Level 2 en la esquina superior derecha, así las hojas impresas se ordenan con facilidad.",

    insideTitle: "Vistazo al interior de cada volumen",
    insideLead: "Páginas de los libros: la página para el docente, el índice ilustrado y un dibujo en los dos niveles. La página para el docente y el índice están en inglés, pensados para maestros de Estados Unidos. Pulse una página para verla más grande.",
    inside: [
      { vol: "Volumen 1", pages: [
        { src: "/teachers/inside-v1-es-1.jpg", w: 700, h: 906, alt: "Página para el docente del volumen 1 en español: cómo funcionan los dos niveles, las cuatro etapas de cada actividad, usos en el aula y habilidades que se practican.", caption: "Página para el docente" },
        { src: "/teachers/inside-v1-es-2.jpg", w: 700, h: 906, alt: "Primera página del índice ilustrado del volumen 1: cada dibujo con dos números de página, uno para cada nivel.", caption: "Índice" },
        { src: "/teachers/inside-v1-es-3.jpg", w: 700, h: 906, alt: "Segunda página del índice ilustrado del volumen 1.", caption: "Índice, continuación" },
        { src: "/teachers/inside-v1-es-4.jpg", w: 700, h: 906, alt: "La ficha del elefante en el nivel 1, marcada PREVIEW.", caption: "Elefante, nivel 1" },
        { src: "/teachers/inside-v1-es-5.jpg", w: 700, h: 906, alt: "La ficha del elefante en el nivel 2, marcada PREVIEW.", caption: "Elefante, nivel 2" },
      ] },
      { vol: "Volumen 2", pages: [
        { src: "/teachers/inside-v2-es-1.jpg", w: 700, h: 906, alt: "Página para el docente del volumen 2 en español: cómo funcionan los dos niveles, las cuatro etapas de cada actividad, usos en el aula y habilidades que se practican.", caption: "Página para el docente" },
        { src: "/teachers/inside-v2-es-2.jpg", w: 700, h: 906, alt: "Primera página del índice ilustrado del volumen 2: cada dibujo con dos números de página, uno para cada nivel.", caption: "Índice" },
        { src: "/teachers/inside-v2-es-3.jpg", w: 700, h: 906, alt: "Segunda página del índice ilustrado del volumen 2.", caption: "Índice, continuación" },
        { src: "/teachers/inside-v2-es-4.jpg", w: 700, h: 906, alt: "La ficha del zorro en el nivel 1, marcada PREVIEW.", caption: "Zorro, nivel 1" },
        { src: "/teachers/inside-v2-es-5.jpg", w: 700, h: 906, alt: "La ficha del zorro en el nivel 2, marcada PREVIEW.", caption: "Zorro, nivel 2" },
      ] },
    ],

    useImage: { src: "/teachers/early-es.jpg", w: 900, h: 900, alt: "Cuatro versiones del mismo león: un contorno punteado para repasar, un contorno simple, un león dibujado por el alumno y un león coloreado con un árbol, hierba y una flor añadidos alrededor.", caption: "La ficha deja espacio para añadir detalles y un fondo propio." },

    freeTitle: "Descargue actividades gratuitas de ambos volúmenes",
    freeLead: "Vea cómo quedan las fichas impresas y elija el material que mejor se adapte a su clase.",
    freeCards: [
      { title: "Muestra gratuita del volumen 1", text: "8 dibujos, uno de cada tema, en los dos niveles: 16 fichas. 18 páginas, PDF.", file: "/free/directed-drawing-k2-es-free-sample.pdf", cta: "Descargar 8 actividades gratuitas", cover: { src: "/teachers/cover-free-es.jpg", w: 700, h: 700, alt: "Portada de la muestra gratuita del volumen 1: una ficha de dibujo dirigido en español con un león, marcada FREE 8 ACTIVITIES, NO PREP, GRADES K-2, 2 LEVELS, 16 WORKSHEETS.", caption: "" } },
      { title: "Muestra gratuita del volumen 2", text: "9 dibujos, uno de cada tema, en los dos niveles: 18 fichas. 20 páginas, PDF.", file: "/free/directed-drawing-k2-2-es-free-sample.pdf", cta: "Descargar 9 actividades gratuitas", cover: { src: "/teachers/cover-free-2-es.jpg", w: 700, h: 700, alt: "Portada de la muestra gratuita del volumen 2: una ficha de dibujo dirigido en español con un zorro, marcada FREE 9 ACTIVITIES, NO PREP, GRADES K-2, 2 LEVELS, 18 WORKSHEETS.", caption: "" } },
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
      { name: "Plantas y naturaleza", count: 10, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Girasol, rosa, tulipán, hoja de arce, trébol, hongo, piña de pino, cacto" },
      { name: "Comida", count: 14, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Pastel, helado, sandía, zanahoria, brócoli, naranja, cereza, fresa, calabaza" },
      { name: "Personajes fantásticos y objetos mágicos", count: 11, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Sirena, unicornio, dragón, hada, grifo, trol, sombrero de mago, poción mágica" },
      { name: "Vehículos", count: 8, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Carro, helicóptero, avión, globo, nave, submarino, cohete, motoneta" },
      { name: "Deportes, aficiones y objetos", count: 13, where: "Volúmenes 1 y 2", anchor: "#vol1", examples: "Patineta, cometa, bádminton, fútbol americano, cámara, tambor, mapamundi, lentes, regalo" },
    ],

    seasonTitle: "Dibujos para cada época del año",
    seasonLead: "Estos dibujos ya están incluidos en los dos volúmenes. No es necesario comprar un pack de temporada aparte.",
    seasons: [
      { name: "Otoño", items: "Calabaza, murciélago, hoja de arce, hongo, lechuza, erizo, ardilla, mapache, ciervo, piña de pino" },
      { name: "Animales para actividades de invierno", items: "Oso, zorro, lechuza, ciervo, erizo, ardilla" },
      { name: "Primavera", items: "Trébol, cometa, tulipán, muguete, mariposa, abeja, libélula, caracol, rana, pato" },
      { name: "Fin de curso y verano", items: "Sombrilla de playa, sombrero, pelota de playa, lentes, sandía, helado, cangrejo, delfín" },
    ],

    catalogTitle: "Todos los dibujos con sus números de página",
    catalogLead: "111 dibujos diferentes entre los dos volúmenes. Sin repeticiones. El primer número de página corresponde al nivel 1 y el segundo, al nivel 2.",
    catalog: [
      {
        vol: "Volumen 1 · 55 dibujos, 110 fichas",
        anchor: "vol1",
        groups: [
          { name: "Animales (20)", items: "León 4 · 59, Elefante 5 · 60, Cebra 6 · 61, Loro 7 · 62, Cocodrilo 8 · 63, Mono 9 · 64, Canguro 10 · 65, Rinoceronte 11 · 66, Flamenco 12 · 67, Lémur 13 · 68, Colibrí 14 · 69, Camaleón 15 · 70, Jirafa 16 · 71, Koala 17 · 72, Rana 18 · 73, Alpaca 19 · 74, Conejo 20 · 75, Lechuza 21 · 76, Erizo 22 · 77, Cabra 23 · 78" },
          { name: "Vida marina (8)", items: "Tiburón 24 · 79, Delfín 25 · 80, Ballena 26 · 81, Cangrejo 27 · 82, Pulpo 28 · 83, Medusa 29 · 84, Tortuga 30 · 85, Pez ángel 31 · 86" },
          { name: "Fantasía (5)", items: "Sirena 32 · 87, Unicornio 33 · 88, Dragón 34 · 89, Corona 35 · 90, Gnomo 36 · 91" },
          { name: "Vehículos (4)", items: "Carro 37 · 92, Helicóptero 38 · 93, Avión 39 · 94, Globo 40 · 95" },
          { name: "Deportes y pasatiempos (4)", items: "Patineta 41 · 96, Cometa 42 · 97, Bádminton 43 · 98, Fútbol americano 44 · 99" },
          { name: "Cosas (3)", items: "Sombrilla de playa 45 · 100, Sombrero 46 · 101, Mapamundi 47 · 102" },
          { name: "Naturaleza (5)", items: "Hoja de arce 48 · 103, Rosa 49 · 104, Hongo 50 · 105, Trébol 51 · 106, Girasol 52 · 107" },
          { name: "Comida (6)", items: "Pastel 53 · 108, Helado 54 · 109, Sandía 55 · 110, Zanahoria 56 · 111, Brócoli 57 · 112, Naranja 58 · 113" },
        ],
      },
      {
        vol: "Volumen 2 · 55 dibujos más 1 extra, 112 fichas",
        anchor: "vol2",
        groups: [
          { name: "Animales (14)", items: "Oso 4 · 60, Zorro 5 · 61, Murciélago 6 · 62, Mapache 7 · 63, Gallina 8 · 64, Vaca 9 · 65, Castor 10 · 66, Águila 11 · 67, Hámster 12 · 68, Gato 13 · 69, Perro 14 · 70, Ardilla 15 · 71, Pato 16 · 72, Ciervo 17 · 73" },
          { name: "Insectos y animalitos (5)", items: "Ratón 18 · 74, Abeja 19 · 75, Libélula 20 · 76, Caracol 21 · 77, Mariposa 22 · 78" },
          { name: "Vida marina (8)", items: "Hipocampo 23 · 79, Foca 24 · 80, Pez payaso 25 · 81, Molusco 26 · 82, Ajolote 27 · 83, Pez globo 28 · 84, Camarón 29 · 85, Raya 30 · 86" },
          { name: "Fantasía (6)", items: "Grifo 31 · 87, Trol 32 · 88, Hada 33 · 89, Caldera mágica 34 · 90, Sombrero de mago 35 · 91, Poción mágica 36 · 92" },
          { name: "Vehículos (4)", items: "Nave 37 · 93, Submarino 38 · 94, Cohete 39 · 95, Motoneta 40 · 96" },
          { name: "Deportes y pasatiempos (4)", items: "Cámara 41 · 97, Tambor 42 · 98, Pelota de playa 43 · 99, Lentes 44 · 100" },
          { name: "Cosas (2)", items: "Regalo 45 · 101, Control 46 · 102" },
          { name: "Naturaleza (5)", items: "Piña de pino 47 · 103, Cacto 48 · 104, Muguete 49 · 105, Loto 50 · 106, Tulipán 51 · 107" },
          { name: "Comida (8)", items: "Cereza 52 · 108, Aguacate 53 · 109, Fresa 54 · 110, Pera 55 · 111, Piña 56 · 112, Limón 57 · 113, Calabaza 58 · 114, Buñuelo 59 · 115" },
        ],
      },
    ],

    otherTitle: "¿Necesita fichas con palabras en inglés?",
    otherText: "Ambos volúmenes están disponibles en inglés. Los dibujos, los dos niveles, la distribución de la página y las cuatro etapas son los mismos. Cada ficha incluye la palabra correspondiente en inglés. Los packs en español y en inglés se venden por separado.",
    otherPair: [
      { label: "Español", img: { src: "/teachers/sample-page-es.jpg", w: 1000, h: 1294, alt: "La ficha del cangrejo de nivel 2 con la palabra Cangrejo en español en una pauta con líneas de guía.", caption: "" } },
      { label: "English", img: { src: "/teachers/sample-page-en.jpg", w: 1000, h: 1294, alt: "La misma ficha del cangrejo con la palabra Crab en inglés en una pauta con líneas de guía.", caption: "" } },
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
        meta: "111 dibujos en dos niveles, 222 fichas · $9.98 en lugar de $11.98",
        save: "Ahorre $2 respecto a la compra de los dos volúmenes por separado.",
        text: "Incluye ambos volúmenes, todos los dibujos diferentes y cada uno en dos niveles, con una página para el docente e índice ilustrado en cada volumen.",
        tptUrl: TPT.bundleEs,
        tptCta: "Comprar el pack en español en TPT · $9.98",
        cover: { src: "/teachers/bundle-es.jpg", w: 900, h: 900, alt: "Portada del pack en español: los volúmenes 1 y 2 de dibujo dirigido uno al lado del otro, marcada 111 ACTIVITIES × 2 LEVELS, NO PREP, GRADES K-2, TWO VOLUMES COMPLETE SET.", caption: "" },
      },
      {
        id: "v1",
        name: "Volumen 1",
        meta: "55 dibujos en dos niveles. 110 fichas. 113 páginas.",
        text: "Animales, vida marina, fantasía, vehículos, deportes y pasatiempos, cosas, naturaleza y comida.",
        bookId: "directed-drawing-k2-es",
        siteCta: "Comprar el PDF aquí",
        tptUrl: TPT.v1Es,
        tptCta: "Comprar en TPT",
        paperNote: "Al comprar en esta web, elija entre los formatos US Letter y A4.",
        cover: { src: "/covers/directed-drawing-k2-es.jpg", w: 900, h: 900, alt: "Portada del volumen 1 en español: una ficha de dibujo dirigido con un león, marcada 55 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 110 WORKSHEETS.", caption: "" },
      },
      {
        id: "v2",
        name: "Volumen 2",
        meta: "55 dibujos más uno de regalo, en dos niveles. 112 fichas. 115 páginas.",
        text: "Nueve temas, con insectos incluidos. Ningún dibujo se repite del primer volumen.",
        bookId: "directed-drawing-k2-2-es",
        siteCta: "Comprar el PDF aquí",
        tptUrl: TPT.v2Es,
        tptCta: "Comprar en TPT",
        paperNote: "Al comprar en esta web, elija entre los formatos US Letter y A4.",
        cover: { src: "/covers/directed-drawing-k2-2-es.jpg", w: 900, h: 900, alt: "Portada del volumen 2 en español: una ficha de dibujo dirigido con un zorro, marcada 55+1 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 112 WORKSHEETS.", caption: "" },
      },
    ],

    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Qué recibiré?", a: "Archivos PDF para imprimir. El primer volumen tiene 113 páginas y el segundo, 115: las fichas en los dos niveles, una página para el docente y un índice ilustrado de dos páginas. No se envía ningún libro físico." },
      { q: "¿En qué se diferencian los dos niveles?", a: "El nivel 1 muestra el dibujo en cuatro pasos e incluye una forma inicial en gris claro en el espacio de dibujo. El nivel 2 muestra el mismo dibujo en cinco a ocho pasos y deja el espacio de dibujo vacío. Toda la clase puede trabajar con el mismo dibujo mientras cada alumno recibe el nivel que le corresponde." },
      { q: "¿Necesito una impresora en color?", a: "No. Todas las páginas están en blanco y negro y se pueden imprimir o fotocopiar. Los alumnos colorean los dibujos." },
      { q: "¿Puedo imprimir las fichas en A4?", a: "Sí. Al comprar en esta web, puede elegir entre US Letter y A4. Hay una versión maquetada para cada tamaño de papel, así que no se corta nada en el borde." },
      { q: "¿Tengo que preparar algo?", a: "Solo tiene que imprimir las fichas y preparar los materiales para dibujar y colorear. No hay nada que recortar, pegar ni montar. Todos los pasos están impresos en la hoja." },
      { q: "¿Pueden los alumnos añadir sus propios detalles?", a: "Sí. La ficha incluye un espacio para que dibujen por su cuenta y añadan detalles o un fondo propio. Conviene decirlo antes de la primera ficha, porque algunos alumnos quieren que su dibujo salga igual que el ejemplo." },
      { q: "¿En qué se diferencian estas fichas de una página para colorear?", a: "Cada ficha incluye un dibujo paso a paso, un contorno para repasar, espacio para dibujar de forma autónoma y una palabra para repasar y escribir. Además del dibujo, la actividad trabaja el control del lápiz, seguir una secuencia y el vocabulario." },
      { q: "¿Puedo compartir los archivos con otros docentes?", a: "Cada compra permite utilizar los materiales en una sola clase. Si varios docentes van a utilizarlos, cada uno necesita su propia licencia. Puede compartir el archivo con sus alumnos en una plataforma protegida con contraseña, como Google Classroom." },
      { q: "¿Hay una edición en inglés?", a: "Sí. Ambos volúmenes están disponibles con palabras en inglés. Los dibujos, los dos niveles y el diseño de las fichas son los mismos. Las ediciones en español y en inglés se venden por separado." },
    ],

    authorTitle: "Materiales creados por Ricardo Demi",
    author: "Soy autor de libros infantiles y editor de Magic of Discoveries, en Miami, Florida. Durante doce años impartí clases en la universidad. He dibujado a mano todas las ilustraciones de estos libros y he creado todos los materiales que se presentan aquí.",
    authorLink: "Más sobre mi trabajo",
    updatedLabel: "Última actualización:",
    updated: "2026-09-16",

    articlesTitle: "Más ideas para utilizar las fichas",

    finalTitle: "111 dibujos diferentes en dos niveles, en dos volúmenes",
    finalLead: "Elija la edición en español o en inglés. Las muestras gratuitas le permiten conocer el material antes de comprar.",
  },

  ru: {
    title: "Рабочие листы по пошаговому рисованию и письму для подготовительного, первого и второго классов",
    lead: "Два тома готовых заданий для утренней работы, станций, самостоятельных занятий и тех, кто закончил раньше. Каждый рисунок дан на двух уровнях сложности. На каждом листе: рисование по шагам, обводка, самостоятельный рисунок и написание слова.",
    heroShort: "111 разных рисунков, каждый на двух уровнях: 222 листа без повторов. Английское и испанское издания.",
    heroBuyCta: "Выбрать книгу или комплект · от $5.99",
    heroFreeCta: "Скачать бесплатные задания",
    heroNote: "PDF для печати. Черно-белые страницы. Печатная книга не отправляется.",
    heroCovers: [
      { label: "Том 1", img: { src: "/covers/directed-drawing-k2-en.jpg", w: 900, h: 900, alt: "Обложка первого тома: страница пошагового рисования со львом, пометки 55 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 110 WORKSHEETS.", caption: "" } },
      { label: "Том 2", img: { src: "/covers/directed-drawing-k2-2-en.jpg", w: 900, h: 900, alt: "Обложка второго тома: страница пошагового рисования с лисой, пометки 55+1 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 112 WORKSHEETS.", caption: "" } },
    ],

    definition: "Рабочие листы по пошаговому рисованию и письму для классов K-2, дети от 5 до 8 лет. На каждой странице ребенок идет по пошаговой схеме и строит изображение, обводит готовый контур, рисует сам в свободном поле, а потом обводит и пишет соответствующее слово на строке с направляющими линиями. Каждый рисунок дан на двух уровнях: на первом четыре шага и светло-серая заготовка в поле для рисунка, на втором от пяти до восьми шагов и пустое поле. Все четыре этапа помещаются на одном листе для печати, со словом на английском или на испанском. 111 рисунков и 222 листа в двух томах.",

    nav: [
      { label: "Для каких занятий", href: "#uses" },
      { label: "Что входит", href: "#volumes" },
      { label: "Страницы из книги", href: "#inside" },
      { label: "Два уровня", href: "#levels" },
      { label: "По темам", href: "#themes" },
      { label: "По сезонам", href: "#seasons" },
      { label: "Бесплатные задания", href: "#free" },
      { label: "Испанское издание", href: "#other" },
      { label: "Купить", href: "#buy" },
    ],

    usesTitle: "Готовые задания для повседневной работы в классе",
    uses: [
      { title: "В начале учебного дня", text: "На каждом листе одни и те же четыре этапа, поэтому дети с первого дня знают, что делать." },
      { title: "Для тех, кто закончил раньше", text: "Место для самостоятельного рисунка, раскрашивания, дополнительных деталей и фона." },
      { title: "Для станций, самостоятельной работы и замены учителя", text: "Все шаги и поле для работы на одном листе. Ничего не нужно вырезать, склеивать или собирать." },
      { title: "Для класса с разным уровнем", text: "Весь класс рисует одно и то же, а каждый ребенок получает подходящий ему уровень." },
    ],

    volumesTitle: "Два тома, 111 разных заданий",
    volumes: [
      { name: "Том 1", bullets: ["55 рисунков, каждый на двух уровнях: 110 листов.", "Восемь тем.", "113 страниц.", "Страница для учителя и иллюстрированное оглавление на двух страницах с номерами для обоих уровней."] },
      { name: "Том 2", bullets: ["55 рисунков и один бонусный, каждый на двух уровнях: 112 листов.", "Девять тем, включая насекомых.", "115 страниц.", "Страница для учителя и иллюстрированное оглавление на двух страницах с номерами для обоих уровней."] },
    ],
    volumesNote: "Второй том продолжает коллекцию: рисунки из первого тома в нем не повторяются. Оба тома доступны со словами на английском или испанском языке. Издания на разных языках продаются отдельно.",

    anatomyTitle: "Четыре части на одном листе",
    steps: [
      { n: "1", title: "Рисование по шагам", text: "Пронумерованные окошки показывают, как строится рисунок: четыре шага на первом уровне, от пяти до восьми на втором." },
      { n: "2", title: "Обводка", text: "Готовое изображение с пунктирным контуром." },
      { n: "3", title: "Самостоятельный рисунок и раскрашивание", text: "Свободное поле для своей работы. На первом уровне в нем напечатана светло-серая заготовка." },
      { n: "4", title: "Обводка и написание слова", text: "Слово и строки с направляющими линиями." },
    ],
    anatomyNote: "Все шаги напечатаны на странице. Можно снова посмотреть на любой из них. Для работы с листом не нужны видео или проектор.",
    sample: { src: "/teachers/sample-page-en.jpg", w: 1000, h: 1295, alt: "Рабочий лист второго уровня для классов K-2. Шесть пронумерованных окошек показывают, как краб строится из овала. Ниже пунктирный контур краба для обводки, пустое поле для своего рисунка и строка с направляющими линиями со словом Crab.", caption: "Краб, второй уровень, том 1, страница 82." },
    levelsTitle: "Два уровня одного рисунка",
    levelsLead: "Каждый рисунок стоит в книге дважды. Картинка одна и та же, меняется только количество подсказок.",
    levels: [
      { name: "Первый уровень", text: "Четыре шага. Уже нарисованная часть показана светло-серым, новые линии черным. В поле для рисунка напечатана светло-серая заготовка: ребенок продолжает рисунок и дорисовывает остальное.", img: { src: "/teachers/level-1-en.jpg", w: 1000, h: 1295, alt: "Лист первого уровня: четыре пронумерованных окошка строят льва, а в поле для рисунка уже напечатана светло-серая голова льва.", caption: "Лев, первый уровень, том 1, страница 4." } },
      { name: "Второй уровень", text: "От пяти до восьми шагов, в зависимости от рисунка. Ребенок начинает с самых простых фигур и постепенно добавляет детали. Поле для рисунка пустое, весь рисунок он делает сам.", img: { src: "/teachers/sample-page-2-en.jpg", w: 1000, h: 1295, alt: "Лист второго уровня: шесть пронумерованных окошек строят того же льва из круга, поле для рисунка пустое.", caption: "Лев, второй уровень, том 1, страница 59." } },
    ],
    levelsNote: "Многие учителя начинают год с первого уровня и переходят ко второму, когда дети становятся увереннее. На каждом листе в правом верхнем углу стоит пометка Level 1 или Level 2, поэтому распечатки легко разложить.",

    insideTitle: "Страницы из книги",
    insideLead: "Так выглядят тома изнутри: страница для учителя, иллюстрированное оглавление и один рисунок на двух уровнях. Книги на английском языке. Нажмите на страницу, чтобы увидеть ее крупнее.",
    inside: [
      { vol: "Том 1", pages: [
        { src: "/teachers/inside-v1-en-1.jpg", w: 700, h: 906, alt: "Страница для учителя в первом томе: как устроены два уровня, четыре этапа задания, где пригодится и какие навыки тренирует.", caption: "Страница для учителя" },
        { src: "/teachers/inside-v1-en-2.jpg", w: 700, h: 906, alt: "Первая страница иллюстрированного оглавления первого тома: каждый рисунок с двумя номерами страниц, по одному на уровень.", caption: "Оглавление" },
        { src: "/teachers/inside-v1-en-3.jpg", w: 700, h: 906, alt: "Вторая страница иллюстрированного оглавления первого тома.", caption: "Оглавление, продолжение" },
        { src: "/teachers/inside-v1-en-4.jpg", w: 700, h: 906, alt: "Лист со слоном на первом уровне, с пометкой PREVIEW.", caption: "Слон, первый уровень" },
        { src: "/teachers/inside-v1-en-5.jpg", w: 700, h: 906, alt: "Лист со слоном на втором уровне, с пометкой PREVIEW.", caption: "Слон, второй уровень" },
      ] },
      { vol: "Том 2", pages: [
        { src: "/teachers/inside-v2-en-1.jpg", w: 700, h: 906, alt: "Страница для учителя во втором томе: как устроены два уровня, четыре этапа задания, где пригодится и какие навыки тренирует.", caption: "Страница для учителя" },
        { src: "/teachers/inside-v2-en-2.jpg", w: 700, h: 906, alt: "Первая страница иллюстрированного оглавления второго тома: каждый рисунок с двумя номерами страниц, по одному на уровень.", caption: "Оглавление" },
        { src: "/teachers/inside-v2-en-3.jpg", w: 700, h: 906, alt: "Вторая страница иллюстрированного оглавления второго тома.", caption: "Оглавление, продолжение" },
        { src: "/teachers/inside-v2-en-4.jpg", w: 700, h: 906, alt: "Лист с лисой на первом уровне, с пометкой PREVIEW.", caption: "Лиса, первый уровень" },
        { src: "/teachers/inside-v2-en-5.jpg", w: 700, h: 906, alt: "Лист с лисой на втором уровне, с пометкой PREVIEW.", caption: "Лиса, второй уровень" },
      ] },
    ],

    useImage: { src: "/teachers/early-en.jpg", w: 900, h: 900, alt: "Четыре варианта одного и того же льва: пунктирный контур для обводки, простой контур, лев, нарисованный ребенком самостоятельно, и раскрашенный лев с добавленными вокруг деревом, травой и цветком.", caption: "На листе остается место для собственных деталей и фона." },

    freeTitle: "Скачайте бесплатные задания из обоих томов",
    freeLead: "Посмотрите страницы в печати и выберите подходящий материал для своего класса.",
    freeCards: [
      { title: "Из первого тома", text: "8 рисунков, по одному из каждой темы, на двух уровнях: 16 листов. 18 страниц, PDF.", file: "/free/directed-drawing-k2-en-free-sample.pdf", cta: "Скачать 8 бесплатных заданий", cover: { src: "/teachers/cover-free-en.jpg", w: 700, h: 700, alt: "Обложка бесплатного образца первого тома: страница пошагового рисования со львом, пометки FREE 8 ACTIVITIES, NO PREP, GRADES K-2, 2 LEVELS, 16 WORKSHEETS.", caption: "" } },
      { title: "Из второго тома", text: "9 рисунков, по одному из каждой темы, на двух уровнях: 18 листов. 20 страниц, PDF.", file: "/free/directed-drawing-k2-2-en-free-sample.pdf", cta: "Скачать 9 бесплатных заданий", cover: { src: "/teachers/cover-free-2-en.jpg", w: 700, h: 700, alt: "Обложка бесплатного образца второго тома: страница пошагового рисования с лисой, пометки FREE 9 ACTIVITIES, NO PREP, GRADES K-2, 2 LEVELS, 18 WORKSHEETS.", caption: "" } },
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
    catalogLead: "111 разных рисунков в двух томах. Без повторов. Первый номер страницы относится к первому уровню, второй ко второму.",
    catalog: [
      {
        vol: "Том 1 · 55 рисунков, 110 листов",
        anchor: "vol1",
        groups: [
          { name: "Животные (20)", items: "Лев 4 · 59, Слон 5 · 60, Зебра 6 · 61, Попугай 7 · 62, Крокодил 8 · 63, Обезьяна 9 · 64, Кенгуру 10 · 65, Носорог 11 · 66, Фламинго 12 · 67, Лемур 13 · 68, Колибри 14 · 69, Хамелеон 15 · 70, Жираф 16 · 71, Коала 17 · 72, Лягушка 18 · 73, Альпака 19 · 74, Кролик 20 · 75, Сова 21 · 76, Еж 22 · 77, Коза 23 · 78" },
          { name: "Море (8)", items: "Акула 24 · 79, Дельфин 25 · 80, Кит 26 · 81, Краб 27 · 82, Осьминог 28 · 83, Медуза 29 · 84, Черепаха 30 · 85, Рыба-ангел 31 · 86" },
          { name: "Фэнтези (5)", items: "Русалка 32 · 87, Единорог 33 · 88, Дракон 34 · 89, Корона 35 · 90, Гном 36 · 91" },
          { name: "Транспорт (4)", items: "Машина 37 · 92, Вертолет 38 · 93, Самолет 39 · 94, Воздушный шар 40 · 95" },
          { name: "Спорт и хобби (4)", items: "Скейтборд 41 · 96, Воздушный змей 42 · 97, Бадминтон 43 · 98, Американский футбол 44 · 99" },
          { name: "Предметы (3)", items: "Пляжный зонт 45 · 100, Панама 46 · 101, Глобус 47 · 102" },
          { name: "Природа (5)", items: "Кленовый лист 48 · 103, Роза 49 · 104, Гриб 50 · 105, Клевер 51 · 106, Подсолнух 52 · 107" },
          { name: "Еда (6)", items: "Торт 53 · 108, Мороженое 54 · 109, Арбуз 55 · 110, Морковь 56 · 111, Брокколи 57 · 112, Апельсин 58 · 113" },
        ],
      },
      {
        vol: "Том 2 · 55 рисунков и один бонусный, 112 листов",
        anchor: "vol2",
        groups: [
          { name: "Животные (14)", items: "Медведь 4 · 60, Лиса 5 · 61, Летучая мышь 6 · 62, Енот 7 · 63, Курица 8 · 64, Корова 9 · 65, Бобр 10 · 66, Орел 11 · 67, Хомяк 12 · 68, Кот 13 · 69, Собака 14 · 70, Белка 15 · 71, Утка 16 · 72, Олень 17 · 73" },
          { name: "Насекомые и мелкие существа (5)", items: "Мышь 18 · 74, Пчела 19 · 75, Стрекоза 20 · 76, Улитка 21 · 77, Бабочка 22 · 78" },
          { name: "Море (8)", items: "Морской конек 23 · 79, Тюлень 24 · 80, Рыба-клоун 25 · 81, Моллюск 26 · 82, Аксолотль 27 · 83, Рыба-еж 28 · 84, Креветка 29 · 85, Скат 30 · 86" },
          { name: "Фэнтези (6)", items: "Грифон 31 · 87, Тролль 32 · 88, Фея 33 · 89, Волшебный котел 34 · 90, Шляпа волшебника 35 · 91, Волшебное зелье 36 · 92" },
          { name: "Транспорт (4)", items: "Корабль 37 · 93, Подводная лодка 38 · 94, Ракета 39 · 95, Самокат 40 · 96" },
          { name: "Спорт и хобби (4)", items: "Фотоаппарат 41 · 97, Барабан 42 · 98, Пляжный мяч 43 · 99, Очки 44 · 100" },
          { name: "Предметы (2)", items: "Подарок 45 · 101, Геймпад 46 · 102" },
          { name: "Природа (5)", items: "Шишка 47 · 103, Кактус 48 · 104, Ландыш 49 · 105, Лотос 50 · 106, Тюльпан 51 · 107" },
          { name: "Еда (8)", items: "Вишня 52 · 108, Авокадо 53 · 109, Клубника 54 · 110, Груша 55 · 111, Ананас 56 · 112, Лимон 57 · 113, Тыква 58 · 114, Пончик 59 · 115" },
        ],
      },
    ],

    otherTitle: "Нужны задания со словами на испанском?",
    otherText: "Оба тома доступны в испанском издании. Те же рисунки, два уровня, расположение элементов и четыре этапа. На каждой странице дано соответствующее слово на испанском. Английский и испанский комплекты продаются отдельно.",
    otherPair: [
      { label: "English", img: { src: "/teachers/sample-page-en.jpg", w: 1000, h: 1294, alt: "Лист второго уровня с крабом и словом Crab на английском на строке с направляющими линиями.", caption: "" } },
      { label: "Español", img: { src: "/teachers/sample-page-es.jpg", w: 1000, h: 1294, alt: "Тот же лист с крабом и словом Cangrejo на испанском на строке с направляющими линиями.", caption: "" } },
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
        meta: "111 рисунков на двух уровнях, 222 листа · $9.98 вместо $11.98",
        save: "Экономия $2 по сравнению с покупкой двух томов отдельно.",
        text: "Оба тома, все рисунки разные и каждый на двух уровнях, в каждом томе страница для учителя и иллюстрированное оглавление.",
        tptUrl: TPT.bundleEn,
        tptCta: "Купить английский комплект на TPT · $9.98",
        cover: { src: "/teachers/bundle-en.jpg", w: 900, h: 900, alt: "Обложка английского комплекта: первый и второй тома рядом, пометки 111 ACTIVITIES × 2 LEVELS, NO PREP, GRADES K-2, TWO VOLUMES COMPLETE SET.", caption: "" },
      },
      {
        id: "v1",
        name: "Том 1",
        meta: "55 рисунков на двух уровнях. 110 листов. 113 страниц.",
        text: "Животные, море, фэнтези, транспорт, спорт и хобби, предметы, природа и еда.",
        bookId: "directed-drawing-k2-en",
        siteCta: "Купить PDF здесь",
        tptUrl: TPT.v1En,
        tptCta: "Купить на TPT",
        paperNote: "При покупке на сайте выберите формат US Letter или A4.",
        cover: { src: "/covers/directed-drawing-k2-en.jpg", w: 900, h: 900, alt: "Обложка первого тома: страница пошагового рисования со львом, пометки 55 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 110 WORKSHEETS.", caption: "" },
      },
      {
        id: "v2",
        name: "Том 2",
        meta: "55 рисунков и один бонусный, на двух уровнях. 112 листов. 115 страниц.",
        text: "Девять тем, включая насекомых. Ни один рисунок не повторяется из первого тома.",
        bookId: "directed-drawing-k2-2-en",
        siteCta: "Купить PDF здесь",
        tptUrl: TPT.v2En,
        tptCta: "Купить на TPT",
        paperNote: "При покупке на сайте выберите формат US Letter или A4.",
        cover: { src: "/covers/directed-drawing-k2-2-en.jpg", w: 900, h: 900, alt: "Обложка второго тома: страница пошагового рисования с лисой, пометки 55+1 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 112 WORKSHEETS.", caption: "" },
      },
    ],

    faqTitle: "Вопросы перед покупкой",
    faq: [
      { q: "Что я получу?", a: "Файлы PDF для печати. В первом томе 113 страниц, во втором 115: листы обоих уровней, страница для учителя и оглавление на двух страницах. Печатная книга не отправляется." },
      { q: "Чем отличаются два уровня?", a: "На первом уровне рисунок разбит на четыре шага, а в поле для рисунка напечатана светло-серая заготовка. На втором тот же рисунок разбит на пять–восемь шагов, и поле пустое. Весь класс может работать с одной картинкой, а каждый ребенок получает свой уровень." },
      { q: "Нужен ли цветной принтер?", a: "Нет. Все страницы черно-белые. Их можно распечатать или скопировать. Раскрашивает ребенок." },
      { q: "Можно ли печатать на A4?", a: "Да. При покупке на сайте можно выбрать US Letter или A4. Для каждого размера подготовлена отдельная версия, поэтому по краям ничего не срезается." },
      { q: "Нужно ли что-то готовить?", a: "Распечатать страницы и подготовить материалы для рисования. Ничего не нужно вырезать, склеивать или собирать. Все шаги уже на листе." },
      { q: "Можно ли добавлять собственные детали?", a: "Да. Для самостоятельного рисунка и дополнительных деталей оставлено свободное поле. Об этом стоит сказать до первого листа, потому что некоторые дети хотят, чтобы получилось точно как в примере." },
      { q: "Чем это отличается от раскраски?", a: "На листе есть рисование по шагам, обводка, место для самостоятельного рисунка и написания слова. Кроме рисования, задание работает на владение карандашом, на последовательность действий и на словарь." },
      { q: "Можно ли делиться файлами с другими учителями?", a: "Одна покупка дает право использовать материалы в одном классе. Если ими пользуются несколько учителей, каждому нужна отдельная лицензия. Для своих учеников файл можно разместить на защищенной паролем платформе, например в Google Classroom." },
      { q: "Есть ли испанское издание?", a: "Да. Оба тома доступны со словами на испанском, с теми же двумя уровнями. Английское и испанское издания продаются отдельно." },
    ],

    authorTitle: "Материалы Рикардо Деми",
    author: "Я автор детских книг и издатель Magic of Discoveries в Майами, штат Флорида. Двенадцать лет преподавал в университете. Все рисунки в этих книгах нарисовал от руки. Представленные здесь материалы созданы мной.",
    authorLink: "Подробнее о моей работе",
    updatedLabel: "Обновлено:",
    updated: "2026-09-16",

    articlesTitle: "Подробнее о работе с материалами",

    finalTitle: "111 разных рисунков на двух уровнях, в двух томах",
    finalLead: "Выберите английское или испанское издание. Бесплатные образцы помогут посмотреть материал перед покупкой.",
  },

};

export const teachersForLang = (lang: UiLang): TeachersCopy | undefined => teachers[lang];
