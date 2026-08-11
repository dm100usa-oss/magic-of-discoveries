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
    title: { en: "Fairy tale", es: "Personajes de cuentos", ru: "Сказочные" },
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

/** Сколько примеров из группы показываем человеку на экране. */
export const TOPIC_PREVIEW = 4;

const TOPICS: Record<string, TopicGroup[]> = {
  "how-to-draw-111": howToDraw111,
};

/** Состав книги. Английское и испанское издание одной книги имеют
    одинаковый состав, поэтому язык издания в ключе не участвует. */
export function topicsForBook(bookId: string): TopicGroup[] {
  return TOPICS[bookId.replace(/-(en|es)$/, "")] ?? [];
}

/** Все темы одной строкой, для машинной части страницы. */
export function allTopics(groups: TopicGroup[], lang: UiLang): string[] {
  return groups.flatMap((g) => g.items[lang] ?? g.items.en ?? []);
}
