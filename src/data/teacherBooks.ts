// Страницы тетрадей для учителей: четыре тома и два набора.
//
// Раздел «Учителям» только объясняет, что это, и ведет к книгам.
// Подробности живут здесь, на странице каждой книги: описание, крупные
// листы, превью, все рисунки, вопросы. Так у каждой книги своя страница
// со своим текстом, и поисковик с нейросетью видят ее как отдельный
// источник по своей теме.
//
// Страницы на английском: книги покупает американский учитель, и
// страница для учителя внутри испанских томов тоже английская.
// Тексты написаны по описаниям с Teachers Pay Teachers, своими словами,
// чтобы сайт и площадка не повторяли друг друга дословно.
//
// Все числа сверены с готовыми PDF 16.09.2026. Номер страницы первого
// уровня N, второго N+55 в первом томе и N+56 во втором.

export type TeacherEdition = "en" | "es";

export interface TeacherImage {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
}

export interface TeacherProduct {
  id: string;
  kind: "volume" | "bundle";
  edition: TeacherEdition;
  /** Том: номер книги в каталоге, по нему идет покупка на сайте. */
  bookId?: string;
  /** Адрес страницы в разделе книг. У тома совпадает с адресом книги. */
  slug: string;
  /** Короткое имя для карточки. */
  short: string;
  title: string;
  /** Для кого, одной строкой под заголовком. */
  forWhom: string;
  /** Состав одной строкой. */
  stats: string;
  price: string;
  priceCents: number;
  /** У набора: цена двух томов по отдельности. */
  fullPrice?: string;
  save?: string;
  cover: TeacherImage;
  preview: string;
  free: { url: string; label: string }[];
  tptUrl: string;
  about: string[];
  levels: TeacherImage[];
  inside: TeacherImage[];
  included: string[];
  drawings: { vol: string; groups: { name: string; items: string }[] }[];
  faq: { q: string; a: string }[];
  /** Соседние книги: второй том, набор, другой язык. */
  related: string[];
}

const TPT = {
  v1En: "https://www.teacherspayteachers.com/Product/Directed-Drawing-Volume-1-55-No-Prep-Draw-Trace-Write-Worksheets-Grades-K-2-17437620",
  v2En: "https://www.teacherspayteachers.com/Product/Directed-Drawing-Volume-2-55-No-Prep-Draw-Trace-Write-Worksheets-Grades-K-2-17622847",
  bundleEn: "https://www.teacherspayteachers.com/Product/Directed-Drawing-Volumes-1-2-Bundle-110-No-Prep-Draw-Trace-Write-Worksheets-17624126",
  v1Es: "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Volume-1-55-No-Prep-Dibujo-Dirigido-Worksheets-K-2-17437840",
  v2Es: "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Volume-2-55-No-Prep-Dibujo-Dirigido-Worksheets-K-2-17623087",
  bundleEs: "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Volumes-1-2-Bundle-110-No-Prep-Dibujo-Worksheets-17624463",
};

export const TPT_STORE = "https://www.teacherspayteachers.com/store/magic-of-discoveries";

const FREE = {
  en1: "/free/directed-drawing-k2-en-free-sample.pdf",
  en2: "/free/directed-drawing-k2-2-en-free-sample.pdf",
  es1: "/free/directed-drawing-k2-es-free-sample.pdf",
  es2: "/free/directed-drawing-k2-2-es-free-sample.pdf",
};

const page = (src: string, alt: string, caption: string): TeacherImage => ({
  src, w: 1000, h: 1295, alt, caption,
});
const square = (src: string, alt: string): TeacherImage => ({
  src, w: 900, h: 900, alt, caption: "",
});

/* Крупные листы одного тома: страница для учителя и первая страница
   оглавления. Листы двух уровней лежат отдельно, в levels. */
function insidePages(v: 1 | 2, ed: TeacherEdition): TeacherImage[] {
  const vol = `Volume ${v}`;
  const lang = ed === "es" ? "Spanish " : "";
  return [
    page(`/teachers/inside-v${v}-${ed}-1.jpg`, `Teacher page of the ${lang}${vol}: how the two levels work, the four stages of every activity, where to use it and the skills practiced.`, "Teacher page"),
    page(`/teachers/inside-v${v}-${ed}-2.jpg`, `Illustrated contents of the ${lang}${vol}: every drawing with two page numbers, one for each level.`, "Illustrated contents"),
  ];
}

function levelPages(v: 1 | 2, ed: TeacherEdition): TeacherImage[] {
  const word = v === 1 ? (ed === "es" ? "León" : "Lion") : ed === "es" ? "Zorro" : "Fox";
  const animal = v === 1 ? "lion" : "fox";
  const p1 = v === 1 ? 4 : 5;
  const p2 = v === 1 ? 59 : 61;
  return [
    page(`/teachers/inside-v${v}-${ed}-4.jpg`, `Level 1 worksheet: four numbered boxes build the ${animal}, and a light gray starting shape is printed in the drawing box. The word ${word} is traced and written at the bottom.`, `${word}, Level 1, page ${p1}`),
    page(`/teachers/inside-v${v}-${ed}-5.jpg`, `Level 2 worksheet: the same ${animal} built in more steps, with an empty drawing box. The word ${word} is traced and written at the bottom.`, `${word}, Level 2, page ${p2}`),
  ];
}

const V1_DRAWINGS_EN = [
      { name: "Animals (20)", items: "Lion 4 · 59, Elephant 5 · 60, Zebra 6 · 61, Parrot 7 · 62, Crocodile 8 · 63, Monkey 9 · 64, Kangaroo 10 · 65, Rhino 11 · 66, Flamingo 12 · 67, Lemur 13 · 68, Hummingbird 14 · 69, Chameleon 15 · 70, Giraffe 16 · 71, Koala 17 · 72, Frog 18 · 73, Alpaca 19 · 74, Bunny 20 · 75, Owl 21 · 76, Hedgehog 22 · 77, Goat 23 · 78" },
      { name: "Sea life (8)", items: "Shark 24 · 79, Dolphin 25 · 80, Whale 26 · 81, Crab 27 · 82, Octopus 28 · 83, Jellyfish 29 · 84, Sea turtle 30 · 85, Angelfish 31 · 86" },
      { name: "Fantasy (5)", items: "Mermaid 32 · 87, Unicorn 33 · 88, Dragon 34 · 89, Crown 35 · 90, Dwarf 36 · 91" },
      { name: "Vehicles (4)", items: "Car 37 · 92, Helicopter 38 · 93, Airplane 39 · 94, Hot air balloon 40 · 95" },
      { name: "Sports and hobbies (4)", items: "Skateboard 41 · 96, Kite 42 · 97, Badminton 43 · 98, American football 44 · 99" },
      { name: "Things (3)", items: "Beach umbrella 45 · 100, Beach hat 46 · 101, Globe 47 · 102" },
      { name: "Nature (5)", items: "Maple leaf 48 · 103, Rose 49 · 104, Mushroom 50 · 105, Clover 51 · 106, Sunflower 52 · 107" },
      { name: "Food (6)", items: "Cake 53 · 108, Ice cream 54 · 109, Watermelon 55 · 110, Carrot 56 · 111, Broccoli 57 · 112, Orange 58 · 113" },
];
const V2_DRAWINGS_EN = [
      { name: "Animals (14)", items: "Bear 4 · 60, Fox 5 · 61, Bat 6 · 62, Raccoon 7 · 63, Chicken 8 · 64, Cow 9 · 65, Beaver 10 · 66, Eagle 11 · 67, Hamster 12 · 68, Cat 13 · 69, Dog 14 · 70, Squirrel 15 · 71, Duck 16 · 72, Deer 17 · 73" },
      { name: "Bugs and little creatures (5)", items: "Mouse 18 · 74, Bee 19 · 75, Dragonfly 20 · 76, Snail 21 · 77, Butterfly 22 · 78" },
      { name: "Sea life (8)", items: "Seahorse 23 · 79, Seal 24 · 80, Clown fish 25 · 81, Shellfish 26 · 82, Axolotl 27 · 83, Pufferfish 28 · 84, Shrimp 29 · 85, Manta ray 30 · 86" },
      { name: "Fantasy (6)", items: "Griffin 31 · 87, Troll 32 · 88, Fairy 33 · 89, Magic cauldron 34 · 90, Wizard's hat 35 · 91, Magic potion 36 · 92" },
      { name: "Vehicles (4)", items: "Ship 37 · 93, Submarine 38 · 94, Rocket 39 · 95, Scooter 40 · 96" },
      { name: "Sports and hobbies (4)", items: "Camera 41 · 97, Drum 42 · 98, Beach ball 43 · 99, Sunglasses 44 · 100" },
      { name: "Things (2)", items: "Present 45 · 101, Gamepad 46 · 102" },
      { name: "Nature (5)", items: "Pine cone 47 · 103, Cactus 48 · 104, Lily of the valley 49 · 105, Lotus 50 · 106, Tulip 51 · 107" },
      { name: "Food (8)", items: "Cherry 52 · 108, Avocado 53 · 109, Strawberry 54 · 110, Pear 55 · 111, Pineapple 56 · 112, Lemon 57 · 113, Pumpkin 58 · 114, Donut 59 · 115" },
];
const V1_DRAWINGS_ES = [
      { name: "Animals (20)", items: "León 4 · 59, Elefante 5 · 60, Cebra 6 · 61, Loro 7 · 62, Cocodrilo 8 · 63, Mono 9 · 64, Canguro 10 · 65, Rinoceronte 11 · 66, Flamenco 12 · 67, Lémur 13 · 68, Colibrí 14 · 69, Camaleón 15 · 70, Jirafa 16 · 71, Koala 17 · 72, Rana 18 · 73, Alpaca 19 · 74, Conejo 20 · 75, Lechuza 21 · 76, Erizo 22 · 77, Cabra 23 · 78" },
      { name: "Sea life (8)", items: "Tiburón 24 · 79, Delfín 25 · 80, Ballena 26 · 81, Cangrejo 27 · 82, Pulpo 28 · 83, Medusa 29 · 84, Tortuga 30 · 85, Pez ángel 31 · 86" },
      { name: "Fantasy (5)", items: "Sirena 32 · 87, Unicornio 33 · 88, Dragón 34 · 89, Corona 35 · 90, Gnomo 36 · 91" },
      { name: "Vehicles (4)", items: "Carro 37 · 92, Helicóptero 38 · 93, Avión 39 · 94, Globo 40 · 95" },
      { name: "Sports and hobbies (4)", items: "Patineta 41 · 96, Cometa 42 · 97, Bádminton 43 · 98, Fútbol americano 44 · 99" },
      { name: "Things (3)", items: "Sombrilla de playa 45 · 100, Sombrero 46 · 101, Mapamundi 47 · 102" },
      { name: "Nature (5)", items: "Hoja de arce 48 · 103, Rosa 49 · 104, Hongo 50 · 105, Trébol 51 · 106, Girasol 52 · 107" },
      { name: "Food (6)", items: "Pastel 53 · 108, Helado 54 · 109, Sandía 55 · 110, Zanahoria 56 · 111, Brócoli 57 · 112, Naranja 58 · 113" },
];
const V2_DRAWINGS_ES = [
      { name: "Animals (14)", items: "Oso 4 · 60, Zorro 5 · 61, Murciélago 6 · 62, Mapache 7 · 63, Gallina 8 · 64, Vaca 9 · 65, Castor 10 · 66, Águila 11 · 67, Hámster 12 · 68, Gato 13 · 69, Perro 14 · 70, Ardilla 15 · 71, Pato 16 · 72, Ciervo 17 · 73" },
      { name: "Bugs and little creatures (5)", items: "Ratón 18 · 74, Abeja 19 · 75, Libélula 20 · 76, Caracol 21 · 77, Mariposa 22 · 78" },
      { name: "Sea life (8)", items: "Hipocampo 23 · 79, Foca 24 · 80, Pez payaso 25 · 81, Molusco 26 · 82, Ajolote 27 · 83, Pez globo 28 · 84, Camarón 29 · 85, Raya 30 · 86" },
      { name: "Fantasy (6)", items: "Grifo 31 · 87, Trol 32 · 88, Hada 33 · 89, Caldera mágica 34 · 90, Sombrero de mago 35 · 91, Poción mágica 36 · 92" },
      { name: "Vehicles (4)", items: "Nave 37 · 93, Submarino 38 · 94, Cohete 39 · 95, Motoneta 40 · 96" },
      { name: "Sports and hobbies (4)", items: "Cámara 41 · 97, Tambor 42 · 98, Pelota de playa 43 · 99, Lentes 44 · 100" },
      { name: "Things (2)", items: "Regalo 45 · 101, Control 46 · 102" },
      { name: "Nature (5)", items: "Piña de pino 47 · 103, Cacto 48 · 104, Muguete 49 · 105, Loto 50 · 106, Tulipán 51 · 107" },
      { name: "Food (8)", items: "Cereza 52 · 108, Aguacate 53 · 109, Fresa 54 · 110, Pera 55 · 111, Piña 56 · 112, Limón 57 · 113, Calabaza 58 · 114, Buñuelo 59 · 115" },
];

/* Подборки по темам и сезонам. Считаны по обоим томам, сумма 111. */
export const THEME_GROUPS = [
  { name: "Zoo and safari animals", count: 13, where: "Volume 1", examples: "Lion, elephant, zebra, giraffe, monkey, kangaroo, rhino, flamingo, koala, crocodile" },
  { name: "Farm and forest animals, and pets", count: 21, where: "Volumes 1 and 2", examples: "Cow, chicken, duck, goat, cat, dog, bunny, fox, bear, deer, squirrel, owl" },
  { name: "Water animals", count: 16, where: "Volumes 1 and 2", examples: "Shark, dolphin, whale, crab, octopus, jellyfish, sea turtle, seahorse, seal, manta ray" },
  { name: "Bugs and other small animals", count: 5, where: "Volume 2", examples: "Bee, butterfly, dragonfly, snail, mouse" },
  { name: "Plants and nature", count: 10, where: "Volumes 1 and 2", examples: "Sunflower, rose, tulip, maple leaf, clover, mushroom, pine cone, cactus" },
  { name: "Food", count: 14, where: "Volumes 1 and 2", examples: "Cake, ice cream, watermelon, carrot, broccoli, orange, cherry, strawberry, pumpkin" },
  { name: "Fantasy characters and magic objects", count: 11, where: "Volumes 1 and 2", examples: "Mermaid, unicorn, dragon, fairy, griffin, troll, wizard's hat, magic potion" },
  { name: "Vehicles", count: 8, where: "Volumes 1 and 2", examples: "Car, helicopter, airplane, hot air balloon, ship, submarine, rocket, scooter" },
  { name: "Sports, hobbies and objects", count: 13, where: "Volumes 1 and 2", examples: "Skateboard, kite, badminton, American football, camera, drum, globe, sunglasses, present" },
];
export const SEASONS = [
  { name: "Fall", items: "Pumpkin, bat, maple leaf, mushroom, owl, hedgehog, squirrel, raccoon, deer, pine cone" },
  { name: "Animal drawings for winter topics", items: "Bear, fox, owl, deer, hedgehog, squirrel" },
  { name: "Spring", items: "Clover, kite, tulip, lily of the valley, butterfly, bee, dragonfly, snail, frog, duck" },
  { name: "End of the year and summer", items: "Beach umbrella, beach hat, beach ball, sunglasses, watermelon, ice cream, crab, dolphin" },
];

const STAGES_EN =
  "Every worksheet takes a student through four stages on one page: follow the numbered steps to build the picture, trace the finished picture, draw and color it on their own, then trace and write the word.";
const LEVELS_TEXT =
  "Every drawing comes at two levels. Level 1 builds the picture in four steps: the part already drawn is light gray and the new lines are black, and a light gray starting shape waits in the drawing box. Level 2 builds the same picture in five to eight steps and leaves the drawing box empty, so students draw the whole picture on their own.";
const LEVELS_USE =
  "The whole class can draw the same picture while you give each student the level that fits. Many teachers start the year with Level 1 and move to Level 2 as students grow more confident. Each worksheet is marked Level 1 or Level 2 in the top right corner, so printed pages are easy to sort.";

const faqCommon = (pages: string): { q: string; a: string }[] => [
  { q: "What will I receive?", a: `A printable PDF file: ${pages}. No physical book is shipped.` },
  { q: "What is the difference between Level 1 and Level 2?", a: "Level 1 shows the drawing in four steps and prints a light gray starting shape in the drawing box. Level 2 shows the same drawing in five to eight steps and leaves the box empty. Use them together in one class, or start with Level 1 and move to Level 2 during the year." },
  { q: "Do I need a color printer or any prep?", a: "No. Every page is black and white and copies well. Choose a drawing, print the level you need and hand it out. Students need a pencil and colored pencils or crayons." },
  { q: "Can I print on A4 paper?", a: "Yes. Buying on this site, you choose US Letter or A4, and each file is laid out for its paper size so nothing is cut off at the edge." },
  { q: "Can I share the file with other teachers?", a: "One purchase covers one teacher and that teacher's students, including printing for the class year after year. Each additional teacher needs their own copy. You may share pages with your own students on a password-protected platform such as Google Classroom." },
];

export const teacherProducts: TeacherProduct[] = [
  /* ---------------- Английский, том 1 ---------------- */
  {
    id: "en-v1",
    kind: "volume",
    edition: "en",
    bookId: "directed-drawing-k2-en",
    slug: "directed-drawing-worksheets-grades-k-2",
    short: "Volume 1",
    title: "Directed Drawing and Writing K-2, Volume 1: Year-Long Trace and Write Worksheets",
    forWhom: "For kindergarten, 1st and 2nd grade, ages 5 to 8. Classroom teachers, ESL and newcomer support, art teachers and homeschool.",
    stats: "55 drawings · 2 levels · 110 worksheets · 113 pages",
    price: "$5.99",
    priceCents: 599,
    cover: square("/covers/directed-drawing-k2-en.jpg", "Cover of Directed Drawing Volume 1: a worksheet with a lion, marked 55 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 110 WORKSHEETS."),
    preview: "/previews/EN-book-1-PREVIEW.pdf",
    free: [{ url: FREE.en1, label: "8 free activities" }],
    tptUrl: TPT.v1En,
    about: [
      "Volume 1 is a year-long set of step-by-step drawing and handwriting worksheets for kindergarten, first grade and second grade. It holds 55 different drawings, and every drawing is printed at two levels of difficulty, so you get 110 ready-to-print worksheets.",
      STAGES_EN + " Drawing builds creativity and fine motor control, and tracing the picture and the word adds handwriting practice. Students learn to focus, improve hand-eye coordination and grow confident in both drawing and writing.",
      LEVELS_TEXT,
      "The drawings cover eight themes: animals, sea life, fantasy, vehicles, sports and hobbies, things, nature and food. They range from simple to more detailed, so you can pick what suits your class. With 55 different pictures, students do not meet the same drawing twice.",
    ],
    levels: levelPages(1, "en"),
    inside: insidePages(1, "en"),
    included: [
      "55 different drawings, each at two levels: 110 worksheets",
      "113 pages: the worksheets, a teacher page and a two-page illustrated contents with page numbers for both levels",
      "Eight themes: Animals 20, Sea Life 8, Fantasy 5, Vehicles 4, Sports and Hobbies 4, Things 3, Nature 5, Food 6",
      "Black and white, US Letter or A4",
    ],
    drawings: [{ vol: "Volume 1", groups: V1_DRAWINGS_EN }],
    faq: [
      ...faqCommon("113 pages with 110 worksheets, a teacher page and a two-page illustrated contents"),
      { q: "How is Volume 1 different from Volume 2?", a: "Same format and the same two levels, different drawings. Volume 1 opens with zoo and safari animals. Volume 2 adds 55 new drawings plus a bonus, with farm and forest animals and a bugs section. No drawing repeats between the two." },
    ],
    related: ["en-v2", "en-bundle", "es-v1"],
  },

  /* ---------------- Английский, том 2 ---------------- */
  {
    id: "en-v2",
    kind: "volume",
    edition: "en",
    bookId: "directed-drawing-k2-2-en",
    slug: "directed-drawing-worksheets-grades-k-2-volume-2",
    short: "Volume 2",
    title: "Directed Drawing and Writing K-2, Volume 2: Trace and Write Worksheets",
    forWhom: "For kindergarten, 1st and 2nd grade, ages 5 to 8. Classroom teachers, ESL and newcomer support, art teachers and homeschool.",
    stats: "55 drawings + 1 bonus · 2 levels · 112 worksheets · 115 pages",
    price: "$5.99",
    priceCents: 599,
    cover: square("/covers/directed-drawing-k2-2-en.jpg", "Cover of Directed Drawing Volume 2: a worksheet with a fox, marked 55+1 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 112 WORKSHEETS."),
    preview: "/previews/EN-book-2-PREVIEW.pdf",
    free: [{ url: FREE.en2, label: "9 free activities" }],
    tptUrl: TPT.v2En,
    about: [
      "Volume 2 continues the collection with 55 completely new drawings plus one bonus. None of them repeat Volume 1, so together the two volumes give you 111 different activities. Every drawing is printed at two levels of difficulty: 112 ready-to-print worksheets.",
      STAGES_EN + " The same routine as in Volume 1, so students already know what to do and you can switch between the books at any time.",
      LEVELS_TEXT,
      "The drawings cover nine themes: animals, bugs and little creatures, sea life, fantasy, vehicles, sports and hobbies, things, nature and food. Farm and forest animals, a fox, a squirrel, a bee and a pumpkin make it easy to match the pages to fall and spring topics.",
    ],
    levels: levelPages(2, "en"),
    inside: insidePages(2, "en"),
    included: [
      "55 new drawings plus 1 bonus, each at two levels: 112 worksheets",
      "115 pages: the worksheets, a teacher page and a two-page illustrated contents with page numbers for both levels",
      "Nine themes: Animals 14, Bugs and Little Creatures 5, Sea Life 8, Fantasy 6, Vehicles 4, Sports and Hobbies 4, Things 2, Nature 5, Food 8",
      "Black and white, US Letter or A4",
    ],
    drawings: [{ vol: "Volume 2", groups: V2_DRAWINGS_EN }],
    faq: [
      ...faqCommon("115 pages with 112 worksheets, a teacher page and a two-page illustrated contents"),
      { q: "Do I need Volume 1 first?", a: "No. Each volume stands on its own. The page layout and the two levels are the same, and no drawing repeats, so the volumes work in any order." },
    ],
    related: ["en-v1", "en-bundle", "es-v2"],
  },

  /* ---------------- Английский набор ---------------- */
  {
    id: "en-bundle",
    kind: "bundle",
    edition: "en",
    slug: "directed-drawing-worksheets-grades-k-2-bundle-volumes-1-2",
    short: "Bundle: Volumes 1 and 2",
    title: "Directed Drawing and Writing K-2 Bundle, Volumes 1 and 2: 111 Drawings at Two Levels",
    forWhom: "A full school year and more for kindergarten, 1st and 2nd grade, ages 5 to 8.",
    stats: "111 drawings · 2 levels · 222 worksheets · 228 pages",
    price: "$9.98",
    priceCents: 998,
    fullPrice: "$11.98",
    save: "Save $2 against buying the two volumes separately",
    cover: square("/teachers/bundle-en.jpg", "Cover of the English bundle: Volumes 1 and 2 side by side, marked 111 ACTIVITIES × 2 LEVELS, NO PREP, GRADES K-2, TWO VOLUMES COMPLETE SET."),
    preview: "/previews/EN-bundle-PREVIEW.pdf",
    free: [
      { url: FREE.en1, label: "8 free activities, Volume 1" },
      { url: FREE.en2, label: "9 free activities, Volume 2" },
    ],
    tptUrl: TPT.bundleEn,
    about: [
      "The bundle brings both volumes together: 111 different drawings with no repeats, each printed at two levels of difficulty. That is 222 ready-to-print worksheets, enough for the whole school year with room to spare.",
      STAGES_EN,
      LEVELS_TEXT + " " + LEVELS_USE,
      "Volume 1 covers eight themes and Volume 2 adds a ninth, bugs and little creatures. The pictures below are grouped by the topics teachers plan around, so you can see what fits your units and seasons.",
    ],
    levels: levelPages(1, "en"),
    inside: [...insidePages(1, "en"), ...insidePages(2, "en")],
    included: [
      "Volume 1: 55 drawings at two levels, 110 worksheets, 113 pages",
      "Volume 2: 55 drawings plus 1 bonus at two levels, 112 worksheets, 115 pages",
      "In total: 111 drawings, 222 worksheets, 228 pages",
      "Each volume has a teacher page and a two-page illustrated contents",
      "Black and white, US Letter or A4",
    ],
    drawings: [
      { vol: "Volume 1", groups: V1_DRAWINGS_EN },
      { vol: "Volume 2", groups: V2_DRAWINGS_EN },
    ],
    faq: [
      ...faqCommon("two files, Volume 1 with 113 pages and Volume 2 with 115 pages"),
      { q: "Where can I buy the bundle?", a: "The bundle is sold on Teachers Pay Teachers for $9.98 instead of $11.98. On this site each volume is sold separately for $5.99." },
    ],
    related: ["en-v1", "en-v2", "es-bundle"],
  },

  /* ---------------- Испанский, том 1 ---------------- */
  {
    id: "es-v1",
    kind: "volume",
    edition: "es",
    bookId: "directed-drawing-k2-es",
    slug: "spanish-directed-drawing-worksheets-grades-k-2",
    short: "Volume 1",
    title: "Spanish Directed Drawing K-2, Volume 1: Dibujo Dirigido Draw and Write Worksheets",
    forWhom: "For Spanish class, dual language and immersion classrooms, kindergarten to 2nd grade, ages 5 to 8.",
    stats: "55 drawings · 2 levels · 110 worksheets · 113 pages",
    price: "$5.99",
    priceCents: 599,
    cover: square("/covers/directed-drawing-k2-es.jpg", "Cover of Spanish Directed Drawing Volume 1: a worksheet with a lion and the word León, marked 55 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 110 WORKSHEETS."),
    preview: "/previews/ES-book-1-PREVIEW.pdf",
    free: [{ url: FREE.es1, label: "8 free activities" }],
    tptUrl: TPT.v1Es,
    about: [
      "Volume 1 is a year-long set of step-by-step drawing and handwriting worksheets in Spanish for kindergarten, first grade and second grade. Every word and every direction on the student pages is in Spanish, with no English text. The teacher page is in English.",
      "The activities are highly visual, so students understand what to do from the pictures and the drawing steps, even while their Spanish is still growing. That makes the set useful for Spanish class, dual language and immersion classrooms, Spanish-speaking students and newcomers.",
      "Each worksheet follows four stages: Sigue los pasos (follow the steps), Repasa (trace), Dibuja tú solo (draw on your own) and Repasa y escribe (trace and write the Spanish word). Students practice fine motor control, handwriting and Spanish vocabulary on one page.",
      LEVELS_TEXT + " With 55 drawings at two levels you get 110 ready-to-print worksheets.",
    ],
    levels: levelPages(1, "es"),
    inside: insidePages(1, "es"),
    included: [
      "55 different drawings, each at two levels: 110 worksheets",
      "113 pages: the worksheets, a teacher page in English and a two-page illustrated contents",
      "Eight themes: animales, animales marinos, fantasía, transporte, deportes y pasatiempos, objetos, naturaleza, comida",
      "Student pages entirely in Spanish, black and white, US Letter or A4",
    ],
    drawings: [{ vol: "Volume 1", groups: V1_DRAWINGS_ES }],
    faq: [
      ...faqCommon("113 pages with 110 worksheets, a teacher page in English and a two-page illustrated contents"),
      { q: "Is there any English on the student pages?", a: "No. The words, the step directions and the labels students read are all in Spanish. Only the teacher page and the Level 1 and Level 2 marks are in English." },
      { q: "Is this a bilingual resource?", a: "No. The Spanish and English editions are separate books with the same drawings and the same two levels. The English edition is sold separately." },
    ],
    related: ["es-v2", "es-bundle", "en-v1"],
  },

  /* ---------------- Испанский, том 2 ---------------- */
  {
    id: "es-v2",
    kind: "volume",
    edition: "es",
    bookId: "directed-drawing-k2-2-es",
    slug: "spanish-directed-drawing-worksheets-grades-k-2-volume-2",
    short: "Volume 2",
    title: "Spanish Directed Drawing K-2, Volume 2: Dibujo Dirigido Draw and Write Worksheets",
    forWhom: "For Spanish class, dual language and immersion classrooms, kindergarten to 2nd grade, ages 5 to 8.",
    stats: "55 drawings + 1 bonus · 2 levels · 112 worksheets · 115 pages",
    price: "$5.99",
    priceCents: 599,
    cover: square("/covers/directed-drawing-k2-2-es.jpg", "Cover of Spanish Directed Drawing Volume 2: a worksheet with a fox and the word Zorro, marked 55+1 ACTIVITIES, NO PREP, GRADES K-2, EARLY FINISHERS, 2 LEVELS, 112 WORKSHEETS."),
    preview: "/previews/ES-book-2-PREVIEW.pdf",
    free: [{ url: FREE.es2, label: "9 free activities" }],
    tptUrl: TPT.v2Es,
    about: [
      "Volume 2 adds 55 completely new drawings plus one bonus, all in Spanish. None of them repeat Volume 1, so together the two Spanish volumes give you 111 different activities, each at two levels: 112 worksheets in this book.",
      "Every word and direction on the student pages is in Spanish, and the pictures carry the instructions, so students who are still learning Spanish can work on their own. The teacher page is in English.",
      "Each worksheet follows the same four stages as Volume 1: Sigue los pasos, Repasa, Dibuja tú solo, Repasa y escribe. Students practice fine motor control, handwriting and Spanish vocabulary on one page.",
      LEVELS_TEXT,
    ],
    levels: levelPages(2, "es"),
    inside: insidePages(2, "es"),
    included: [
      "55 new drawings plus 1 bonus, each at two levels: 112 worksheets",
      "115 pages: the worksheets, a teacher page in English and a two-page illustrated contents",
      "Nine themes, including insectos y animalitos",
      "Student pages entirely in Spanish, black and white, US Letter or A4",
    ],
    drawings: [{ vol: "Volume 2", groups: V2_DRAWINGS_ES }],
    faq: [
      ...faqCommon("115 pages with 112 worksheets, a teacher page in English and a two-page illustrated contents"),
      { q: "Is there any English on the student pages?", a: "No. The words, the step directions and the labels students read are all in Spanish. Only the teacher page and the Level 1 and Level 2 marks are in English." },
      { q: "Do I need Volume 1 first?", a: "No. Each volume stands on its own, and no drawing repeats between them." },
    ],
    related: ["es-v1", "es-bundle", "en-v2"],
  },

  /* ---------------- Испанский набор ---------------- */
  {
    id: "es-bundle",
    kind: "bundle",
    edition: "es",
    slug: "spanish-directed-drawing-worksheets-grades-k-2-bundle-volumes-1-2",
    short: "Bundle: Volumes 1 and 2",
    title: "Spanish Directed Drawing K-2 Bundle, Volumes 1 and 2: Dibujo Dirigido, 111 Drawings at Two Levels",
    forWhom: "A full school year for Spanish class, dual language and immersion classrooms, kindergarten to 2nd grade.",
    stats: "111 drawings · 2 levels · 222 worksheets · 228 pages",
    price: "$9.98",
    priceCents: 998,
    fullPrice: "$11.98",
    save: "Save $2 against buying the two volumes separately",
    cover: square("/teachers/bundle-es.jpg", "Cover of the Spanish bundle: Volumes 1 and 2 side by side, marked 111 ACTIVITIES × 2 LEVELS, NO PREP, GRADES K-2, TWO VOLUMES COMPLETE SET."),
    preview: "/previews/ES-bundle-PREVIEW.pdf",
    free: [
      { url: FREE.es1, label: "8 free activities, Volume 1" },
      { url: FREE.es2, label: "9 free activities, Volume 2" },
    ],
    tptUrl: TPT.bundleEs,
    about: [
      "The Spanish bundle brings both volumes together: 111 different drawings with no repeats, each at two levels. That is 222 ready-to-print worksheets with every word and direction in Spanish, enough for the whole school year.",
      "The pictures carry the instructions, so students who are still learning Spanish can work on their own. The four stages are Sigue los pasos, Repasa, Dibuja tú solo and Repasa y escribe. The teacher pages are in English.",
      LEVELS_TEXT + " " + LEVELS_USE,
    ],
    levels: levelPages(1, "es"),
    inside: [...insidePages(1, "es"), ...insidePages(2, "es")],
    included: [
      "Volume 1: 55 drawings at two levels, 110 worksheets, 113 pages",
      "Volume 2: 55 drawings plus 1 bonus at two levels, 112 worksheets, 115 pages",
      "In total: 111 drawings, 222 worksheets, 228 pages",
      "Student pages entirely in Spanish, black and white, US Letter or A4",
    ],
    drawings: [
      { vol: "Volume 1", groups: V1_DRAWINGS_ES },
      { vol: "Volume 2", groups: V2_DRAWINGS_ES },
    ],
    faq: [
      ...faqCommon("two files, Volume 1 with 113 pages and Volume 2 with 115 pages"),
      { q: "Where can I buy the bundle?", a: "The bundle is sold on Teachers Pay Teachers for $9.98 instead of $11.98. On this site each volume is sold separately for $5.99." },
    ],
    related: ["es-v1", "es-v2", "en-bundle"],
  },
];

export const teacherProductById = (id: string) =>
  teacherProducts.find((p) => p.id === id);
export const teacherProductBySlug = (slug: string) =>
  teacherProducts.find((p) => p.slug === slug);
export const teacherProductByBook = (bookId: string) =>
  teacherProducts.find((p) => p.bookId === bookId);
export const teacherBundles = teacherProducts.filter((p) => p.kind === "bundle");

/** Ряды на странице раздела: издание, затем тома и набор. */
export const teacherRows = (first: TeacherEdition): TeacherEdition[] =>
  first === "es" ? ["es", "en"] : ["en", "es"];
export const productsOf = (ed: TeacherEdition) =>
  teacherProducts.filter((p) => p.edition === ed);

/** Адрес страницы книги. Все страницы живут в английском разделе книг. */
export const teacherProductPath = (p: TeacherProduct) => `/en/books/${p.slug}`;
