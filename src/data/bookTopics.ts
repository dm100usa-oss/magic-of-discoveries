// Состав книги по темам.
// Человеку на экране показываются только названия групп и несколько
// примеров: он решает за несколько секунд и полотно из ста слов не читает.
// Полный список стоит на той же странице, но свернут, и целиком уходит
// в машинную часть: нейросети читают его мгновенно и по нему рекомендуют
// книгу тому, кто спросил про конкретное животное.
import type { UiLang } from "@/data/books";

export interface TopicGroup {
  id: string;
  /** Номер первого рисунка группы в книге. Рисунки идут подряд, поэтому
      по нему и порядку внутри группы находится файл каждой картинки.
      Заполняется только у книг, картинки которых лежат в /public/drawings. */
  firstDrawing?: number;
  /** Название группы. */
  title: Partial<Record<UiLang, string>>;
  /** Все темы группы по порядку, как в книге. */
  items: Partial<Record<UiLang, string[]>>;
}

/* Первая раскраска 1-3. Порядок такой же, как в книге: под каждым
   рисунком напечатано слово, оно же название темы. Испанские слова
   взяты из испанского издания серии, состав тем у этих книг совпадает. */
const firstColoring111: TopicGroup[] = [
  {
    id: "land",
    firstDrawing: 1,
    title: { en: "Land animals", es: "Animales terrestres", ru: "Животные суши" },
    items: {
      en: [
        "Lion", "Elephant", "Zebra", "Parrot", "Crocodile", "Monkey", "Kangaroo",
        "Rhino", "Flamingo", "Lemur", "Hummingbird", "Giraffe", "Koala", "Frog",
        "Alpaca", "Bunny", "Owl", "Hedgehog", "Goat", "Bat", "Raccoon", "Bear",
        "Fox", "Chicken", "Chameleon", "Cow", "Beaver", "Eagle", "Hamster", "Cat",
        "Dog", "Squirrel", "Duck", "Deer", "Mouse", "Bee", "Dragonfly", "Snail",
        "Butterfly",
      ],
      es: [
        "León", "Elefante", "Cebra", "Loro", "Cocodrilo", "Mono", "Canguro",
        "Rinoceronte", "Flamenco", "Lémur", "Colibrí", "Jirafa", "Koala", "Rana",
        "Alpaca", "Conejo", "Lechuza", "Erizo", "Cabra", "Murciélago", "Mapache", "Oso",
        "Zorro", "Gallina", "Camaleón", "Vaca", "Castor", "Águila", "Hámster", "Gato",
        "Perro", "Ardilla", "Pato", "Ciervo", "Ratón", "Abeja", "Libélula", "Caracol",
        "Mariposa",
      ],
      ru: [
        "Лев", "Слон", "Зебра", "Попугай", "Крокодил", "Обезьяна", "Кенгуру",
        "Носорог", "Фламинго", "Лемур", "Колибри", "Жираф", "Коала", "Лягушка",
        "Альпака", "Кролик", "Сова", "Еж", "Коза", "Летучая мышь", "Енот", "Медведь",
        "Лиса", "Курица", "Хамелеон", "Корова", "Бобр", "Орел", "Хомяк", "Кошка",
        "Собака", "Белка", "Утка", "Олень", "Мышь", "Пчела", "Стрекоза", "Улитка",
        "Бабочка",
      ]
    },
  },
  {
    id: "water",
    firstDrawing: 40,
    title: { en: "Water animals", es: "Animales acuáticos", ru: "Водные животные" },
    items: {
      en: [
        "Shark", "Dolphin", "Whale", "Crab", "Octopus", "Jellyfish", "Sea turtle",
        "Angelfish", "Seahorse", "Seal", "Clown fish", "Shellfish", "Axolotl",
        "Pufferfish", "Shrimp", "Manta ray",
      ],
      es: [
        "Tiburón", "Delfín", "Ballena", "Cangrejo", "Pulpo", "Medusa", "Tortuga",
        "Pez ángel", "Hipocampo", "Foca", "Pez payaso", "Molusco", "Ajolote", "Pez globo",
        "Camarón", "Raya",
      ],
      ru: ["Акула", "Дельфин", "Кит", "Краб", "Осьминог", "Медуза", "Морская черепаха",
        "Рыба-ангел", "Морской конек", "Тюлень", "Рыба-клоун", "Моллюск", "Аксолотль",
        "Рыба-шар", "Креветка", "Скат",
      ]
    },
  },
  {
    id: "fantasy",
    firstDrawing: 56,
    title: { en: "Fairy tale", es: "Personajes de cuentos", ru: "Сказочные" },
    items: {
      en: [
        "Mermaid", "Unicorn", "Dragon", "Crown", "Dwarf", "Griffin", "Troll", "Fairy",
        "Magic cauldron", "Wizard's hat", "Magic potion",
      ],
      es: [
        "Sirena", "Unicornio", "Dragón", "Corona", "Gnomo", "Grifo", "Trole", "Hada",
        "Caldera mágica", "Sombrero de mago", "Poción mágica",
      ],
      ru: ["Русалка", "Единорог", "Дракон", "Корона", "Гном", "Грифон", "Тролль", "Фея",
        "Волшебный котел", "Шляпа волшебника", "Волшебное зелье",
      ]
    },
  },
  {
    id: "vehicles",
    firstDrawing: 67,
    title: { en: "Vehicles", es: "Vehículos", ru: "Транспорт" },
    items: {
      en: [
        "Car", "Helicopter", "Airplane", "Hot air balloon", "Ship", "Submarine",
        "Rocket", "Scooter",
      ],
      es: [
        "Máquina", "Helicóptero", "Avión", "Globo", "Nave", "Submarino",
        "Cohete", "Scooter",
      ],
      ru: ["Машина", "Вертолет", "Самолет", "Воздушный шар", "Корабль", "Подводная лодка",
        "Ракета", "Скутер",
      ]
    },
  },
  {
    id: "sports",
    firstDrawing: 75,
    title: { en: "Sports and hobbies", es: "Deportes y aficiones", ru: "Спорт и хобби" },
    items: {
      en: [
        "Skateboard", "Kite", "Badminton", "American football", "Camera", "Drum",
        "Beach ball",
      ],
      es: [
        "Monopatín", "Cometa", "Bádminton", "Fútbol americano", "Cámara", "Tambor",
        "Pelota de playa",
      ],
      ru: ["Скейтборд", "Воздушный змей", "Бадминтон", "Американский футбол", "Камера",
        "Барабан", "Пляжный мяч",
      ]
    },
  },
  {
    id: "things",
    firstDrawing: 82,
    title: { en: "Everyday things", es: "Cosas", ru: "Вещи" },
    items: {
      en: ["Sunglasses", "Beach umbrella", "Beach hat", "Globe", "Present", "Gamepad"],
      es: [
        "Gafas", "Sombrilla de playa", "Sombrero", "Globo", "Regalo", "Gamepads",
      ],
      ru: ["Очки", "Пляжный зонт", "Шляпа", "Глобус", "Подарок", "Геймпад",
      ]
    },
  },
  {
    id: "nature",
    firstDrawing: 88,
    title: { en: "Nature", es: "Naturaleza", ru: "Природа" },
    items: {
      en: [
        "Maple leaf", "Rose", "Mushroom", "Clover", "Sunflower", "Pine cone", "Cactus",
        "Lily of the valley", "Lotus", "Tulip",
      ],
      es: [
        "Hoja de arce", "Rosa", "Seta", "Trébol", "Girasol", "Chichón", "Cacto", "Muguete",
        "Loto", "Tulipán",
      ],
      ru: ["Кленовый лист", "Роза", "Гриб", "Клевер", "Подсолнух", "Шишка", "Кактус",
        "Ландыш", "Лотос", "Тюльпан",
      ]
    },
  },
  {
    id: "food",
    firstDrawing: 98,
    title: { en: "Food", es: "Comida", ru: "Еда" },
    items: {
      en: [
        "Cake", "Ice cream", "Watermelon", "Carrot", "Broccoli", "Orange", "Cherry",
        "Avocado", "Strawberry", "Pear", "Pineapple", "Lemon", "Pumpkin", "Donut",
      ],
      es: [
        "Torta", "Helado", "Sandía", "Zanahoria", "Brócoli", "Naranja", "Guinda",
        "Aguacate", "Fresa", "Pera", "Piña", "Limón", "Calabaza", "Buñuelo",
      ],
      ru: ["Торт", "Мороженое", "Арбуз", "Морковь", "Брокколи", "Апельсин", "Вишня",
        "Авокадо", "Клубника", "Груша", "Ананас", "Лимон", "Тыква", "Пончик",
      ]
    },
  },
];

/* "Как нарисовать все на свете". Состав взят из оглавления самой книги,
   английского и испанского изданий. Порядок как в книге. Еда в книге
   стоит двумя блоками, здесь она собрана в одну группу. Русские
   названия подобраны нами: русского издания в печати нет. */
const howToDrawEverything: TopicGroup[] = [
  {
    id: "animals",
    title: { en: "Animals", es: "Animales", ru: "Животные" },
    items: {
      en: [
        "Raccoon", "Cat", "Goose", "Baby goose", "Dog", "Snail", "Sheep", "Bunny",
        "Chicken", "Chick", "Squirrel", "Donkey", "Piggy", "Cow", "Fox", "Bird",
        "Caterpillar", "Frog", "Butterfly", "Dragonfly", "Bumblebee", "Ladybug",
      ],
      es: [
        "Mapache", "Gato", "Ganso", "Cría de ganso", "Perro", "Caracol", "Corderito",
        "Liebre", "Gallina", "Pollito", "Ardilla", "Burrito", "Cerdito", "Vaca", "Zorro",
        "Ave", "Oruga", "Rana", "Mariposa", "Libélula", "Abejorro", "Mariquita",
      ],
      ru: [
        "Енот", "Кошка", "Гусь", "Гусенок", "Собака", "Улитка", "Овечка", "Зайчик",
        "Курица", "Цыпленок", "Белка", "Ослик", "Поросенок", "Корова", "Лиса", "Птичка",
        "Гусеница", "Лягушка", "Бабочка", "Стрекоза", "Шмель", "Божья коровка",
      ],
    },
  },
  {
    id: "flowers",
    title: { en: "Flowers", es: "Flores", ru: "Цветы" },
    items: {
      en: ["Sunflower", "Potted plant", "Flower", "Flowers in a vase", "Lotus", "Mushroom"],
      es: ["Girasol", "Planta en maceta", "Flor", "Jarrón con flores", "Loto", "Seta"],
      ru: ["Подсолнух", "Растение в горшке", "Цветок", "Букет в вазе", "Лотос", "Гриб"],
    },
  },
  {
    id: "nature",
    title: { en: "Natural elements", es: "Elementos naturales", ru: "Природа" },
    items: {
      en: ["Leaf", "Star", "Cloud", "Sun", "Moon", "Snowflake", "Rainbow", "Christmas tree", "Tree"],
      es: ["Hoja", "Estrella", "Nube", "Sol", "Luna", "Copo de nieve", "Arco iris", "Abeto", "Árbol"],
      ru: ["Листик", "Звезда", "Облако", "Солнце", "Луна", "Снежинка", "Радуга", "Елка", "Дерево"],
    },
  },
  {
    id: "food",
    title: { en: "Foods", es: "Alimentos", ru: "Еда" },
    items: {
      en: [
        "Donut", "Cupcake", "Pie", "Cake", "Jam", "Ice cream", "Lemonade", "Fried egg",
        "Toast", "Cheese", "Cabbage", "Tomato", "Carrot", "Cucumber", "Apple", "Orange",
        "Banana", "Strawberry", "Cherry", "Raspberry", "Cookies", "Candy",
      ],
      es: [
        "Donut", "Bizcocho", "Pastel", "Tarta", "Mermelada", "Helado", "Limonada",
        "Huevos revueltos", "Tostadas", "Queso", "Col", "Tomate", "Zanahoria", "Pepino",
        "Manzana", "Naranja", "Plátano", "Fresa", "Cereza", "Frambuesa", "Galletas", "Caramelos",
      ],
      ru: [
        "Пончик", "Кекс", "Пирог", "Торт", "Варенье", "Мороженое", "Лимонад", "Яичница",
        "Тост", "Сыр", "Капуста", "Помидор", "Морковь", "Огурец", "Яблоко", "Апельсин",
        "Банан", "Клубника", "Вишня", "Малина", "Печенье", "Конфеты",
      ],
    },
  },
  {
    id: "gifts",
    title: { en: "Gifts", es: "Regalos", ru: "Подарки и игрушки" },
    items: {
      en: [
        "Gift", "Kite", "Unicorn", "Rocket", "Ship", "Bus", "Teddy bear", "Car",
        "Bucket and shovel", "Pyramid", "Ball", "Cubes", "Pencils", "Pinwheel", "Puzzles",
      ],
      es: [
        "Regalo", "Cometa", "Unicornio", "Cohete", "Barquito", "Autobús", "Oso de peluche",
        "Coche", "Cubo con pala", "Pirámide", "Pelota", "Cubos", "Lápices", "Molinillo",
        "Rompecabezas",
      ],
      ru: [
        "Подарок", "Воздушный змей", "Единорог", "Ракета", "Кораблик", "Автобус",
        "Плюшевый мишка", "Машина", "Ведерко с лопаткой", "Пирамидка", "Мяч", "Кубики",
        "Карандаши", "Вертушка", "Пазлы",
      ],
    },
  },
  {
    id: "clothing",
    title: { en: "Clothing", es: "Ropa", ru: "Одежда" },
    items: {
      en: ["Shorts", "Hat", "Cap", "Sneakers", "Dress", "Bucket hat", "T-shirt", "Mittens", "Socks", "Skirt"],
      es: ["Pantalón corto", "Gorro", "Gorra", "Zapatillas", "Vestido", "Sombrero panamá", "Camiseta", "Manoplas", "Calcetines", "Falda"],
      ru: ["Шорты", "Шапка", "Фуражка", "Кроссовки", "Платье", "Панама", "Футболка", "Варежки", "Носки", "Юбка"],
    },
  },
  {
    id: "other",
    title: { en: "Other themes", es: "Otros temas", ru: "Разное" },
    items: {
      en: [
        "Bow", "Glasses", "Book", "Umbrella", "Alarm clock", "Lamp", "Flashlight",
        "Lantern", "Mill", "Lighthouse", "Fence", "Bench", "House", "Jug", "Mug", "Fork",
        "Spoon", "Comb", "Telephone", "Envelope", "Ball of wool", "Threads", "Buttons",
        "Scissors", "Needle and thread", "Feather", "Pillow",
      ],
      es: [
        "Arco", "Gafas", "Libro", "Paraguas", "Despertador", "Lámpara", "Linterna",
        "Farola", "Molino", "Faro", "Valla", "Banco", "Casa", "Jarra", "Taza", "Tenedor",
        "Cuchara", "Peine", "Teléfono", "Sobre", "Ovillo de lana", "Hilos", "Botones",
        "Tijeras", "Aguja e hilo", "Pluma", "Almohada",
      ],
      ru: [
        "Бант", "Очки", "Книга", "Зонтик", "Будильник", "Лампа", "Фонарик", "Фонарь",
        "Мельница", "Маяк", "Забор", "Скамейка", "Домик", "Кувшин", "Кружка", "Вилка",
        "Ложка", "Расческа", "Телефон", "Конверт", "Клубок", "Нитки", "Пуговицы",
        "Ножницы", "Иголка с ниткой", "Перо", "Подушка",
      ],
    },
  },
];

/** Сколько примеров из группы показываем человеку на экране. */
/** Файл рисунка по его номеру в книге. Рисунки лежат в /public/drawings
    под номерами из трех цифр. */
export const drawingFile = (n: number) =>
  `/drawings/${String(n).padStart(3, "0")}.webp`;

/** Страница книги целиком, вместе со словом контурными буквами.
    Слово в книге на каждом языке свое, поэтому и файл свой. Такие
    страницы стоят наверху: по ним сразу видно, что слово под рисунком
    тоже раскрашивается. Сделаны не для всех рисунков, а для тех,
    что перечислены в bookPages. */
export const pageFile = (n: number, lang: UiLang) =>
  `/pages/${lang}/${String(n).padStart(3, "0")}.webp`;

/** Номера рисунков, для которых есть снятая страница книги.
    Восемнадцать штук, и число выбрано не случайно: оно делится
    на два, три и шесть, поэтому ряд никогда не остается рваным
    и на телефоне видно ровно столько же, сколько на компьютере. */
export const bookPages: number[] = [
  1, 23, 22, 24, 16, 29,
  34, 9, 41, 48, 47, 46,
  26, 67, 69, 72, 111, 106,
];

export const TOPIC_PREVIEW = 4;

const TOPICS: Record<string, TopicGroup[]> = {
  /* У книги "Как нарисовать 111" те же рисунки, что в первой
     раскраске, и тот же порядок: состав берется оттуда. */
  "how-to-draw-111": firstColoring111,
  "first-coloring-book-111": firstColoring111,
  "how-to-draw-everything": howToDrawEverything,
};

/** Состав книги. Издания одной книги на разных языках имеют одинаковый
    состав, поэтому язык издания в ключе не участвует. Группы, у которых
    нет списка на нужном языке, не показываем: лучше пусто, чем
    английские слова на русской странице. */
export function topicsForBook(bookId: string, lang: UiLang = "en"): TopicGroup[] {
  const groups = TOPICS[bookId.replace(/-(en|es|ru)$/, "")] ?? [];
  return groups.filter((g) => Boolean(g.items[lang]?.length));
}

/** Все темы одной строкой, для машинной части страницы. */
export function allTopics(groups: TopicGroup[], lang: UiLang): string[] {
  return groups.flatMap((g) => g.items[lang] ?? g.items.en ?? []);
}

/* Готовые рисунки для сетки на странице книги, у которой нет
   нумерованных картинок в /public/drawings. Вырезаны из страниц самой
   книги: последний шаг каждого рисунка. Надписей на них нет, поэтому
   картинки одни на все языки. */
export interface FeaturedDrawing {
  file: string;
  name: Partial<Record<UiLang, string>>;
}

const FEATURED: Record<string, FeaturedDrawing[]> = {
  "how-to-draw-everything": [
    { file: "/drawings/how-to-draw-everything/dog.webp", name: { en: "Dog", es: "Perro", ru: "Собака" } },
    { file: "/drawings/how-to-draw-everything/cat.webp", name: { en: "Cat", es: "Gato", ru: "Кошка" } },
    { file: "/drawings/how-to-draw-everything/raccoon.webp", name: { en: "Raccoon", es: "Mapache", ru: "Енот" } },
    { file: "/drawings/how-to-draw-everything/sheep.webp", name: { en: "Sheep", es: "Corderito", ru: "Овечка" } },
    { file: "/drawings/how-to-draw-everything/sunflower.webp", name: { en: "Sunflower", es: "Girasol", ru: "Подсолнух" } },
    { file: "/drawings/how-to-draw-everything/flower.webp", name: { en: "Flower", es: "Flor", ru: "Цветок" } },
    { file: "/drawings/how-to-draw-everything/rainbow.webp", name: { en: "Rainbow", es: "Arco iris", ru: "Радуга" } },
    { file: "/drawings/how-to-draw-everything/snowflake.webp", name: { en: "Snowflake", es: "Copo de nieve", ru: "Снежинка" } },
    { file: "/drawings/how-to-draw-everything/cupcake.webp", name: { en: "Cupcake", es: "Bizcocho", ru: "Кекс" } },
    { file: "/drawings/how-to-draw-everything/cake.webp", name: { en: "Cake", es: "Tarta", ru: "Торт" } },
    { file: "/drawings/how-to-draw-everything/ice-cream.webp", name: { en: "Ice cream", es: "Helado", ru: "Мороженое" } },
    { file: "/drawings/how-to-draw-everything/rocket.webp", name: { en: "Rocket", es: "Cohete", ru: "Ракета" } },
    { file: "/drawings/how-to-draw-everything/car.webp", name: { en: "Car", es: "Coche", ru: "Машина" } },
    { file: "/drawings/how-to-draw-everything/teddy-bear.webp", name: { en: "Teddy bear", es: "Oso de peluche", ru: "Плюшевый мишка" } },
    { file: "/drawings/how-to-draw-everything/house.webp", name: { en: "House", es: "Casa", ru: "Домик" } },
    { file: "/drawings/how-to-draw-everything/lighthouse.webp", name: { en: "Lighthouse", es: "Faro", ru: "Маяк" } },
    { file: "/drawings/how-to-draw-everything/umbrella.webp", name: { en: "Umbrella", es: "Paraguas", ru: "Зонтик" } },
    { file: "/drawings/how-to-draw-everything/dress.webp", name: { en: "Dress", es: "Vestido", ru: "Платье" } },
  ],
};

export function featuredForBook(bookId: string): FeaturedDrawing[] {
  return FEATURED[bookId.replace(/-(en|es|ru)$/, "")] ?? [];
}
