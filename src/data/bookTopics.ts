// Состав книги по темам.
// Человеку на экране показываются только названия групп и несколько
// примеров: он решает за несколько секунд и полотно из ста слов не читает.
// Полный список стоит на той же странице, но свернут, и целиком уходит
// в машинную часть: нейросети читают его мгновенно и по нему рекомендуют
// книгу тому, кто спросил про конкретное животное.
import type { UiLang } from "@/data/books";

export interface TopicGroup {
  id: string;
  /** Название группы. */
  title: Partial<Record<UiLang, string>>;
  /** Все темы группы по порядку, как в книге. */
  items: Partial<Record<UiLang, string[]>>;
}

const howToDraw111: TopicGroup[] = [
  {
    id: "land",
    title: { en: "Land animals", es: "Animales terrestres", ru: "Животные суши" },
    items: {
      en: [
        "Lion", "Elephant", "Zebra", "Parrot", "Crocodile", "Monkey", "Kangaroo",
        "Rhino", "Flamingo", "Lemur", "Hummingbird", "Chameleon", "Giraffe", "Koala",
        "Frog", "Alpaca", "Bunny", "Owl", "Hedgehog", "Goat", "Bat", "Raccoon",
        "Bear", "Fox", "Chicken", "Cow", "Beaver", "Eagle", "Hamster", "Cat", "Dog",
        "Squirrel", "Duck", "Deer", "Mouse", "Bee", "Dragonfly", "Snail", "Butterfly",
      ],
      es: [
        "León", "Elefante", "Cebra", "Loro", "Cocodrilo", "Mono", "Canguro",
        "Rinoceronte", "Flamenco", "Lémur", "Colibrí", "Camaleón", "Jirafa", "Koala",
        "Rana", "Alpaca", "Conejo", "Lechuza", "Erizo", "Cabra", "Murciélago", "Mapache",
        "Oso", "Zorro", "Gallina", "Vaca", "Castor", "Águila", "Hámster", "Gato", "Perro",
        "Ardilla", "Pato", "Ciervo", "Ratón", "Abeja", "Libélula", "Caracol", "Mariposa",
      ],
    },
  },
  {
    id: "water",
    title: { en: "Water animals", es: "Animales acuáticos", ru: "Водные животные" },
    items: {
      en: [
        "Shark", "Dolphin", "Whale", "Crab", "Octopus", "Jellyfish", "Sea turtle",
        "Angelfish", "Seahorse", "Seal", "Clown fish", "Shellfish", "Axolotl",
        "Pufferfish", "Shrimp", "Manta ray",
      ],
      es: [
        "Tiburón", "Delfín", "Ballena", "Cangrejo", "Pulpo", "Medusa", "Tortuga de mar",
        "Pez ángel", "Caballito de mar", "Foca", "Pez payaso", "Molusco", "Ajolote",
        "Pez globo", "Gamba", "Mantarraya",
      ],
    },
  },
  {
    id: "fantasy",
    title: { en: "Fairy tale", es: "Personajes de cuentos", ru: "Сказочные герои и предметы" },
    items: {
      en: [
        "Mermaid", "Unicorn", "Dragon", "Crown", "Dwarf", "Griffin", "Troll", "Fairy",
        "Magic cauldron", "Wizard's hat", "Magic potion",
      ],
      es: [
        "Sirena", "Unicornio", "Dragón", "Corona", "Gnomo", "Grifo", "Trol", "Hada",
        "Caldera mágica", "Sombrero de mago", "Poción mágica",
      ],
    },
  },
  {
    id: "vehicles",
    title: { en: "Vehicles", es: "Vehículos", ru: "Транспорт" },
    items: {
      en: [
        "Car", "Helicopter", "Airplane", "Hot air balloon", "Ship", "Submarine",
        "Rocket", "Scooter",
      ],
      es: [
        "Coche", "Helicóptero", "Avión", "Globo aerostático", "Barco", "Submarino",
        "Cohete", "Patinete",
      ],
    },
  },
  {
    id: "sports",
    title: { en: "Sports and hobbies", es: "Deportes y aficiones", ru: "Спорт и хобби" },
    items: {
      en: ["Skateboard", "Kite", "Badminton", "Football", "Camera", "Drum", "Beach ball"],
      es: ["Monopatín", "Cometa", "Bádminton", "Fútbol americano", "Cámara", "Tambor", "Pelota de playa"],
    },
  },
  {
    id: "things",
    title: { en: "Everyday things", es: "Cosas", ru: "Вещи" },
    items: {
      en: ["Sunglasses", "Umbrella", "Beach hat", "Globe", "Present", "Gamepad"],
      es: ["Gafas de sol", "Sombrilla de playa", "Sombrero de playa", "Globo terráqueo", "Regalo", "Mando de videojuegos"],
    },
  },
  {
    id: "nature",
    title: { en: "Nature", es: "Naturaleza", ru: "Природа" },
    items: {
      en: [
        "Maple leaf", "Rose", "Mushroom", "Clover", "Sunflower", "Pine cone", "Cactus",
        "Lily", "Lotus", "Tulip",
      ],
      es: [
        "Hoja de arce", "Rosa", "Seta", "Trébol", "Girasol", "Piña de pino", "Cactus",
        "Lirio", "Loto", "Tulipán",
      ],
    },
  },
  {
    id: "food",
    title: { en: "Food", es: "Comida", ru: "Еда" },
    items: {
      en: [
        "Cake", "Ice cream", "Watermelon", "Carrot", "Broccoli", "Orange", "Cherry",
        "Avocado", "Strawberry", "Pear", "Pineapple", "Lemon", "Pumpkin", "Donut",
      ],
      es: [
        "Tarta", "Helado", "Sandía", "Zanahoria", "Brócoli", "Naranja", "Cerezas",
        "Aguacate", "Fresa", "Pera", "Piña", "Limón", "Calabaza", "Dónut",
      ],
    },
  },
];

/* Первая раскраска 1-3. Порядок такой же, как в книге: под каждым
   рисунком напечатано слово, оно же название темы. Испанские слова
   взяты из испанского издания серии, состав тем у этих книг совпадает. */
const firstColoring111: TopicGroup[] = [
  {
    id: "land",
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
        "Альпака", "Кролик", "Сова", "Ёж", "Коза", "Летучая мышь", "Енот", "Медведь",
        "Лиса", "Курица", "Хамелеон", "Корова", "Бобр", "Орёл", "Хомяк", "Кошка",
        "Собака", "Белка", "Утка", "Олень", "Мышь", "Пчела", "Стрекоза", "Улитка",
        "Бабочка",
      ]
    },
  },
  {
    id: "water",
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
        "Рыба-ангел", "Морской конёк", "Тюлень", "Рыба-клоун", "Моллюск", "Аксолотль",
        "Рыба-шар", "Креветка", "Скат",
      ]
    },
  },
  {
    id: "fantasy",
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

/** Сколько примеров из группы показываем человеку на экране. */
export const TOPIC_PREVIEW = 4;

const TOPICS: Record<string, TopicGroup[]> = {
  "how-to-draw-111": howToDraw111,
  "first-coloring-book-111": firstColoring111,
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
