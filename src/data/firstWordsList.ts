// Полный состав трех книг со словами под рисунками.
//
// Откуда взято: страницы самих книг. Слова здесь ровно такие, как они
// напечатаны под рисунками, а не такие, какими они должны быть по
// словарю. Если слово в книге неудачное, оно и здесь неудачное:
// страница сайта обязана совпадать с тем, что получит покупатель.
//
// Книги три, тем девять. Одна и та же тема собирается из всех трех книг,
// поэтому на странице темы видно, из какой книги какое слово, и человек
// понимает, что именно ему покупать.
//
// Порядок слов внутри книги это порядок страниц.

import type { UiLang } from "./books";

/** Слово под рисунком: английское издание и испанское. */
export type WordPair = { en: string; es: string };

/** Тема раздела. */
export type WordTheme =
  | "animals"
  | "food"
  | "vehicles"
  | "nature"
  | "clothes"
  | "toys"
  | "home"
  | "objects"
  | "fairy";

/** Книга: номер в каталоге без языка издания. */
export type WordBook =
  | "first-coloring-book-111"
  | "little-max-coloring-1"
  | "little-max-coloring-2";

export const wordBooks: WordBook[] = [
  "first-coloring-book-111",
  "little-max-coloring-1",
  "little-max-coloring-2",
];

/** Название книги, как оно стоит на странице темы. Короткое:
    полное название книги в списке слов только мешает читать. */
export const wordBookName: Record<WordBook, Partial<Record<UiLang, string>>> = {
  "first-coloring-book-111": {
    en: "First Coloring Book",
    es: "Primer libro para colorear",
    ru: "Первая раскраска",
  },
  "little-max-coloring-1": {
    en: "Little Max, Book 1",
    es: "Pequeño Max, libro 1",
    ru: "Маленький Макс, книга 1",
  },
  "little-max-coloring-2": {
    en: "Little Max, Book 2",
    es: "Pequeño Max, libro 2",
    ru: "Маленький Макс, книга 2",
  },
};

/** Номер книги в каталоге на нужном языке издания. */
export const wordBookId = (book: WordBook, lang: UiLang): string =>
  `${book}-${lang === "es" ? "es" : "en"}`;

export const WORDS: Record<WordBook, Partial<Record<WordTheme, WordPair[]>>> = {
  "first-coloring-book-111": {
    animals: [
      { en: "Lion", es: "León" }, { en: "Elephant", es: "Elefante" },
      { en: "Zebra", es: "Cebra" }, { en: "Parrot", es: "Loro" },
      { en: "Crocodile", es: "Cocodrilo" }, { en: "Monkey", es: "Mono" },
      { en: "Kangaroo", es: "Canguro" }, { en: "Rhino", es: "Rinoceronte" },
      { en: "Flamingo", es: "Flamenco" }, { en: "Lemur", es: "Lémur" },
      { en: "Hummingbird", es: "Colibrí" }, { en: "Giraffe", es: "Jirafa" },
      { en: "Koala", es: "Koala" }, { en: "Frog", es: "Rana" }, { en: "Alpaca", es: "Alpaca" },
      { en: "Bunny", es: "Conejo" }, { en: "Owl", es: "Lechuza" },
      { en: "Hedgehog", es: "Erizo" }, { en: "Goat", es: "Cabra" },
      { en: "Bat", es: "Murciélago" }, { en: "Raccoon", es: "Mapache" },
      { en: "Bear", es: "Oso" }, { en: "Fox", es: "Zorro" }, { en: "Chicken", es: "Gallina" },
      { en: "Chameleon", es: "Camaleón" }, { en: "Cow", es: "Vaca" },
      { en: "Beaver", es: "Castor" }, { en: "Eagle", es: "Águila" },
      { en: "Hamster", es: "Hámster" }, { en: "Cat", es: "Gato" }, { en: "Dog", es: "Perro" },
      { en: "Squirrel", es: "Ardilla" }, { en: "Duck", es: "Pato" },
      { en: "Deer", es: "Ciervo" }, { en: "Mouse", es: "Ratón" }, { en: "Bee", es: "Abeja" },
      { en: "Dragonfly", es: "Libélula" }, { en: "Snail", es: "Caracol" },
      { en: "Butterfly", es: "Mariposa" }, { en: "Shark", es: "Tiburón" },
      { en: "Dolphin", es: "Delfín" }, { en: "Whale", es: "Ballena" },
      { en: "Crab", es: "Cangrejo" }, { en: "Octopus", es: "Pulpo" },
      { en: "Jellyfish", es: "Medusa" }, { en: "Sea turtle", es: "Tortuga" },
      { en: "Angelfish", es: "Pez ángel" }, { en: "Seahorse", es: "Hipocampo" },
      { en: "Seal", es: "Foca" }, { en: "Clown fish", es: "Pez payaso" },
      { en: "Shellfish", es: "Molusco" }, { en: "Axolotl", es: "Ajolote" },
      { en: "Pufferfish", es: "Pez globo" }, { en: "Shrimp", es: "Camarón" },
      { en: "Manta ray", es: "Raya" }
    ],
    food: [
      { en: "Cake", es: "Torta" }, { en: "Ice cream", es: "Helado" },
      { en: "Watermelon", es: "Sandía" }, { en: "Carrot", es: "Zanahoria" },
      { en: "Broccoli", es: "Brócoli" }, { en: "Orange", es: "Naranja" },
      { en: "Cherry", es: "Guinda" }, { en: "Avocado", es: "Aguacate" },
      { en: "Strawberry", es: "Fresa" }, { en: "Pear", es: "Pera" },
      { en: "Pineapple", es: "Piña" }, { en: "Lemon", es: "Limón" },
      { en: "Pumpkin", es: "Calabaza" }, { en: "Donut", es: "Buñuelo" }
    ],
    vehicles: [
      { en: "Car", es: "Máquina" }, { en: "Helicopter", es: "Helicóptero" },
      { en: "Airplane", es: "Avión" }, { en: "Hot air balloon", es: "Globo" },
      { en: "Ship", es: "Nave" }, { en: "Submarine", es: "Submarino" },
      { en: "Rocket", es: "Cohete" }, { en: "Scooter", es: "Scooter" }
    ],
    nature: [
      { en: "Maple leaf", es: "Hoja de arce" }, { en: "Rose", es: "Rosa" },
      { en: "Mushroom", es: "Seta" }, { en: "Clover", es: "Trébol" },
      { en: "Sunflower", es: "Girasol" }, { en: "Pine cone", es: "Chichón" },
      { en: "Cactus", es: "Cacto" }, { en: "Lily of the valley", es: "Muguete" },
      { en: "Lotus", es: "Loto" }, { en: "Tulip", es: "Tulipán" }
    ],
    objects: [
      { en: "Skateboard", es: "Monopatín" }, { en: "Kite", es: "Cometa" },
      { en: "Badminton", es: "Bádminton" },
      { en: "American football", es: "Fútbol americano" }, { en: "Camera", es: "Cámara" },
      { en: "Drum", es: "Tambor" }, { en: "Beach ball", es: "Pelota de playa" },
      { en: "Sunglasses", es: "Gafas" }, { en: "Beach umbrella", es: "Sombrilla de playa" },
      { en: "Beach hat", es: "Sombrero" }, { en: "Globe", es: "Globo" },
      { en: "Present", es: "Regalo" }, { en: "Gamepad", es: "Gamepads" }
    ],
    fairy: [
      { en: "Mermaid", es: "Sirena" }, { en: "Unicorn", es: "Unicornio" },
      { en: "Dragon", es: "Dragón" }, { en: "Crown", es: "Corona" },
      { en: "Dwarf", es: "Gnomo" }, { en: "Griffin", es: "Grifo" },
      { en: "Troll", es: "Trole" }, { en: "Fairy", es: "Hada" },
      { en: "Magic cauldron", es: "Caldera mágica" },
      { en: "Wizard's hat", es: "Sombrero de mago" },
      { en: "Magic potion", es: "Poción mágica" }
    ],
  },
  "little-max-coloring-1": {
    animals: [
      { en: "Dog", es: "Perro" }, { en: "Cat", es: "Gato" }, { en: "Cow", es: "Vaca" },
      { en: "Horse", es: "Caballo" }, { en: "Pig", es: "Cerdo" }, { en: "Sheep", es: "Oveja" },
      { en: "Goat", es: "Cabra" }, { en: "Hen", es: "Gallina" },
      { en: "Rooster", es: "Gallo" }, { en: "Chick", es: "Pollito" },
      { en: "Duck", es: "Pato" }, { en: "Rabbit", es: "Conejo" }, { en: "Mouse", es: "Ratón" },
      { en: "Bear", es: "Oso" }, { en: "Lion", es: "León" },
      { en: "Elephant", es: "Elefante" }, { en: "Giraffe", es: "Jirafa" },
      { en: "Monkey", es: "Mono" }, { en: "Tiger", es: "Tigre" }, { en: "Zebra", es: "Cebra" },
      { en: "Fox", es: "Zorro" }, { en: "Squirrel", es: "Ardilla" },
      { en: "Deer", es: "Ciervo" }, { en: "Frog", es: "Rana" }, { en: "Bird", es: "Pájaro" },
      { en: "Owl", es: "Búho" }, { en: "Penguin", es: "Pingüino" }, { en: "Fish", es: "Pez" },
      { en: "Turtle", es: "Tortuga" }, { en: "Dolphin", es: "Delfín" },
      { en: "Crab", es: "Cangrejo" }, { en: "Octopus", es: "Pulpo" },
      { en: "Seal", es: "Foca" }, { en: "Butterfly", es: "Mariposa" },
      { en: "Bee", es: "Abeja" }, { en: "Snail", es: "Caracol" }
    ],
    food: [
      { en: "Apple", es: "Manzana" }, { en: "Banana", es: "Plátano" },
      { en: "Orange", es: "Naranja" }, { en: "Grapes", es: "Uvas" },
      { en: "Strawberry", es: "Fresa" }, { en: "Pear", es: "Pera" },
      { en: "Lemon", es: "Limón" }, { en: "Watermelon", es: "Sandía" },
      { en: "Cherry", es: "Cereza" }, { en: "Tomato", es: "Tomate" },
      { en: "Carrot", es: "Zanahoria" }, { en: "Bread", es: "Pan" },
      { en: "Cheese", es: "Queso" }, { en: "Egg", es: "Huevo" }, { en: "Milk", es: "Leche" },
      { en: "Cookie", es: "Galleta" }, { en: "Cake", es: "Pastel" },
      { en: "Ice cream", es: "Helado" }
    ],
    vehicles: [
      { en: "Car", es: "Coche" }, { en: "Bus", es: "Autobús" }, { en: "Train", es: "Tren" },
      { en: "Plane", es: "Avión" }, { en: "Boat", es: "Barco" },
      { en: "Bicycle", es: "Bicicleta" }, { en: "Truck", es: "Camión" },
      { en: "Tractor", es: "Tractor" }, { en: "Helicopter", es: "Helicóptero" },
      { en: "Rocket", es: "Cohete" }
    ],
    nature: [
      { en: "Sun", es: "Sol" }, { en: "Moon", es: "Luna" }, { en: "Star", es: "Estrella" },
      { en: "Cloud", es: "Nube" }, { en: "Snowflake", es: "Copo de nieve" },
      { en: "Tree", es: "Árbol" }, { en: "Flower", es: "Flor" },
      { en: "Sunflower", es: "Girasol" }, { en: "Leaf", es: "Hoja" }
    ],
    clothes: [
      { en: "T-shirt", es: "Camiseta" }, { en: "Pants", es: "Pantalones" },
      { en: "Dress", es: "Vestido" }, { en: "Socks", es: "Calcetines" },
      { en: "Shoes", es: "Zapatos" }, { en: "Boots", es: "Botas" }, { en: "Hat", es: "Gorro" },
      { en: "Coat", es: "Abrigo" }, { en: "Pajamas", es: "Pijama" },
      { en: "Glasses", es: "Gafas" }
    ],
    toys: [
      { en: "Ball", es: "Pelota" }, { en: "Balloon", es: "Globo" },
      { en: "Blocks", es: "Cubos" }, { en: "Book", es: "Libro" }, { en: "Doll", es: "Muñeca" },
      { en: "Teddy bear", es: "Osito" }, { en: "Bubbles", es: "Pompas de jabón" },
      { en: "Kite", es: "Cometa" }, { en: "Gift", es: "Regalo" }
    ],
    home: [
      { en: "Cup", es: "Taza" }, { en: "Spoon", es: "Cuchara" }, { en: "Fork", es: "Tenedor" },
      { en: "Plate", es: "Plato" }, { en: "Chair", es: "Silla" },
      { en: "Lamp", es: "Lámpara" }, { en: "Key", es: "Llave" },
      { en: "Phone", es: "Teléfono" }, { en: "Toothbrush", es: "Cepillo de dientes" },
      { en: "Pillow", es: "Almohada" }, { en: "Bed", es: "Cama" }, { en: "House", es: "Casa" }
    ],
    objects: [
      { en: "Bucket", es: "Cubo" }, { en: "Umbrella", es: "Paraguas" }
    ],
    fairy: [
      { en: "Unicorn", es: "Unicornio" }, { en: "Dragon", es: "Dragón" },
      { en: "Princess", es: "Princesa" }, { en: "Fairy", es: "Hada" },
      { en: "Dinosaur", es: "Dinosaurio" }
    ],
  },
  "little-max-coloring-2": {
    animals: [
      { en: "Lion", es: "León" }, { en: "Baby elephant", es: "Elefante bebé" },
      { en: "Panda", es: "Panda" }, { en: "Zebra", es: "Cebra" },
      { en: "Giraffe", es: "Jirafa" }, { en: "Monkey", es: "Mono" },
      { en: "Pony", es: "Poni" }, { en: "Parrot", es: "Loro" },
      { en: "Flamingo", es: "Flamenco" }, { en: "Owl", es: "Búho" },
      { en: "Peacock", es: "Pavo real" }, { en: "Toucan", es: "Tucán" },
      { en: "Turtle", es: "Tortuga" }, { en: "Fish", es: "Pez" },
      { en: "Dolphin", es: "Delfín" }, { en: "Crab", es: "Cangrejo" },
      { en: "Whale", es: "Ballena" }, { en: "Octopus", es: "Pulpo" },
      { en: "Jellyfish", es: "Medusa" }, { en: "Seahorse", es: "Caballito de mar" },
      { en: "Mollusk", es: "Molusco" }, { en: "Shrimp", es: "Gamba" },
      { en: "Starfish", es: "Estrella de mar" }
    ],
    food: [
      { en: "Pepper", es: "Pimiento" }, { en: "Broccoli", es: "Brócoli" },
      { en: "Pumpkin", es: "Calabaza" }, { en: "Onion", es: "Cebolla" },
      { en: "Garlic", es: "Ajo" }, { en: "Corn", es: "Maíz" },
      { en: "Pomegranate", es: "Granada" }, { en: "Kiwi", es: "Kiwi" },
      { en: "Pear", es: "Pera" }, { en: "Pineapple", es: "Piña" },
      { en: "Avocado", es: "Aguacate" }, { en: "Watermelon", es: "Sandía" },
      { en: "Melon", es: "Melón" }, { en: "Grapes", es: "Uvas" }, { en: "Coffee", es: "Café" },
      { en: "Sandwich", es: "Sándwich" }, { en: "Burger", es: "Hamburguesa" },
      { en: "Pizza", es: "Pizza" }, { en: "Bread", es: "Pan" },
      { en: "Chocolate", es: "Chocolate" }, { en: "Popcorn", es: "Palomitas" },
      { en: "Cotton candy", es: "Algodón de azúcar" }, { en: "Lollipop", es: "Piruleta" },
      { en: "Ice cream", es: "Helado" }, { en: "Honey", es: "Miel" },
      { en: "Caramel apple", es: "Manzana de caramelo" }, { en: "Juice", es: "Jugo" }
    ],
    vehicles: [
      { en: "Car", es: "Coche" }, { en: "Boat", es: "Barco" },
      { en: "Helicopter", es: "Helicóptero" },
      { en: "Hot air balloon", es: "Globo aerostático" }, { en: "Submarine", es: "Submarino" }
    ],
    nature: [
      { en: "Palm tree", es: "Palma" }, { en: "Leaf", es: "Hoja" },
      { en: "Acorn", es: "Bellota" }, { en: "Reed", es: "Junco" },
      { en: "Bamboo", es: "Bambú" }, { en: "Monstera", es: "Monstera" },
      { en: "Cactus", es: "Cactus" }, { en: "Seashells", es: "Concha" },
      { en: "Seaweed", es: "Algas" }, { en: "Corals", es: "Corales" },
      { en: "Crystals", es: "Cristales" }, { en: "Mountains", es: "Montañas" },
      { en: "Wave", es: "Ola" }, { en: "Mushroom", es: "Seta" },
      { en: "Hazelnut", es: "Avellana" },
      { en: "Lily of the valley", es: "Lirio de los valles" }, { en: "Iris", es: "Iris" },
      { en: "Orchid", es: "Orquídea" }, { en: "Lily", es: "Lirio" }
    ],
    clothes: [
      { en: "Cap", es: "Gorra" }, { en: "Top hat", es: "Sombrero de copa" },
      { en: "Sombrero", es: "Sombrero" }, { en: "Sandals", es: "Sandalias" },
      { en: "Flip-flops", es: "Chanclas" }, { en: "Tank top", es: "Camiseta sin mangas" }
    ],
    toys: [
      { en: "Balloons", es: "Globos" }, { en: "Soap bubbles", es: "Burbujas de jabón" },
      { en: "Swing", es: "Columpio" }
    ],
    home: [
      { en: "Pot", es: "Olla" }, { en: "Frying pan", es: "Sartén" },
      { en: "Kettle", es: "Tetera" }, { en: "Candle", es: "Vela" }
    ],
    objects: [
      { en: "Skateboard", es: "Skateboard" }, { en: "Rugby ball", es: "Balón de rugby" },
      { en: "Soccer ball", es: "Balón de fútbol" },
      { en: "Beach ball", es: "Pelota de playa" },
      { en: "Diving mask", es: "Máscara de buceo" }, { en: "Swim ring", es: "Flotador" },
      { en: "Surfboard", es: "Tabla de surf" }, { en: "Fishing rod", es: "Caña de pescar" },
      { en: "Camera", es: "Cámara" }, { en: "Microphone", es: "Micrófono" },
      { en: "Drum", es: "Tambor" }, { en: "Trumpet", es: "Trompeta" },
      { en: "Maracas", es: "Maracas" }, { en: "Tambourine", es: "Pandereta" },
      { en: "Speakers", es: "Altavoces" }, { en: "Small flag", es: "Bandera pequeña" },
      { en: "Net", es: "Red" }, { en: "Briefcase", es: "Maletín" },
      { en: "Basket", es: "Cesta" }, { en: "Bunting", es: "Guirnalda de banderas" },
      { en: "Anchor", es: "Ancla" }, { en: "Suitcase", es: "Maleta" },
      { en: "Compass", es: "Brújula" }, { en: "Barrel", es: "Barril" }
    ],
  },
};

/** Все слова темы, по книгам. Пустые книги отбрасываем. */
export function themeWords(
  theme: WordTheme,
): { book: WordBook; words: WordPair[] }[] {
  return wordBooks
    .map((book) => ({ book, words: WORDS[book][theme] ?? [] }))
    .filter((x) => x.words.length > 0);
}

/** Сколько всего слов в теме по всем трем книгам. */
export const themeCount = (theme: WordTheme): number =>
  wordBooks.reduce((n, b) => n + (WORDS[b][theme]?.length ?? 0), 0);

/** Слово на языке страницы. */
export const wordText = (p: WordPair, lang: UiLang): string =>
  lang === "es" ? p.es : p.en;
