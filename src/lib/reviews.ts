// Отзывы покупателей, перенесенные со старого сайта. Только настоящие.
// Испанские версии это перевод, и на странице это честно помечено.
import type { UiLang } from "@/data/books";

export interface Review {
  text: string;
  who: string;
  stars: number;
  translated?: boolean;
}

const en: Review[] = [
  {
    text: "Pretty awesome book, may be a bit too much for a 3-year-old, but we're fine with waiting a bit. Lots of detailed step-by-step traceable drawings of all kinds of things, from sea animals to food. Looks like lots of fun.",
    who: "Dmitriy Parmenov, June 19, 2024, US",
    stars: 5,
  },
  {
    text: "This is our second coloring book from these guys. Well loved by our kids, these are light enough to take with when leaving the house. We occasionally cut a page or two out when done, to date and save for future memorabilia.",
    who: "Valentina Sh, May 24, 2024, US",
    stars: 5,
  },
  {
    text: "Good quality, lots of different pictures. For that price you get a lot of pictures to practice drawing, the book is quite thick. Bought it as a gift for my friend's child, age 3, and she was very happy about it.",
    who: "Danil, June 8, 2024, UK",
    stars: 5,
  },
  {
    text: "Great for a 3-year-old, he likes the large shapes and friendly faces. They are easy to color, and there's a great range of things to color, from a mermaid to a submarine to a donut.",
    who: "Anna, June 11, 2024, US",
    stars: 5,
  },
];

const es: Review[] = [
  {
    text: "Un libro estupendo. Quizá aún es un poco para mi hija de 3 años, pero no nos importa esperar un poco. Tiene muchísimos dibujos paso a paso para calcar, de todo tipo de cosas, desde animales marinos hasta comida. Promete mucha diversión.",
    who: "Dmitriy Parmenov, 19 de junio de 2024, EE. UU.",
    stars: 5,
    translated: true,
  },
  {
    text: "Es el segundo libro para colorear que compramos de ellos. A nuestros hijos les encanta, y pesan poco para llevarlos fuera de casa. A veces recortamos una o dos páginas ya terminadas, les ponemos la fecha y las guardamos de recuerdo.",
    who: "Valentina Sh, 24 de mayo de 2024, EE. UU.",
    stars: 5,
    translated: true,
  },
  {
    text: "Buena calidad y muchísimos dibujos distintos. Por ese precio tienes un montón de imágenes para practicar, el libro es bastante grueso. Lo compré de regalo para el hijo de una amiga, de 3 años, y le hizo mucha ilusión.",
    who: "Danil, 8 de junio de 2024, Reino Unido",
    stars: 5,
    translated: true,
  },
  {
    text: "Perfecto para un niño de 3 años. Le gustan las formas grandes y las caras simpáticas. Son fáciles de colorear y hay muchísima variedad, desde una sirena hasta un submarino o un donut.",
    who: "Anna, 11 de junio de 2024, EE. UU.",
    stars: 5,
    translated: true,
  },
];

const ru: Review[] = es.map((r, i) => ({ ...r, text: en[i].text }));

export const reviewsByLang: Record<UiLang, Review[]> = { en, es, ru };

/* ------------------------------------------------------------------ */
/*  Отзывы по конкретным книгам                                        */
/* ------------------------------------------------------------------ */

/* Отзывы покупателей с Amazon. Только настоящие, с именем и датой.
   На экране это цитаты, в машинную разметку они не идут: Google
   запрещает выдавать чужие оценки за собственные. */
const bookReviews: Record<string, { en: Review[]; es: Review[] }> = {
  "how-to-draw-111": {
    en: [
      {
        text:
          "My son is thrilled with the simplicity of the instructions, and he especially loves that he can color his masterpieces right away. I can see his confidence growing with each new drawing.",
        who: "Victor Borsci, September 7, 2024, US",
        stars: 5,
      },
      {
        text:
          "Tracing kept my little one occupied for longer than anticipated. The fun facts here and there are a nice touch.",
        who: "Valentina Sh, May 13, 2024, US",
        stars: 5,
      },
      {
        text:
          "My child is gaining new skills independently and loves displaying his artwork. My only wish is for more animal options, but all in all, it is a great book.",
        who: "Layla Saunders, November 1, 2024, US",
        stars: 5,
      },
    ],
    es: [
      {
        text:
          "Mi hijo está encantado con lo sencillas que son las instrucciones, y sobre todo le gusta poder colorear sus obras enseguida. Veo cómo gana confianza con cada dibujo nuevo.",
        who: "Victor Borsci, 7 de septiembre de 2024, EE. UU.",
        stars: 5,
        translated: true,
      },
      {
        text:
          "Calcar mantuvo entretenido a mi pequeño más tiempo del que esperaba. Los datos curiosos que aparecen aquí y allá son un detalle muy bonito.",
        who: "Valentina Sh, 13 de mayo de 2024, EE. UU.",
        stars: 5,
        translated: true,
      },
      {
        text:
          "Mi hijo está aprendiendo cosas nuevas por su cuenta y le encanta enseñar sus dibujos. Lo único que echo en falta son más animales, pero por lo demás es un libro estupendo.",
        who: "Layla Saunders, 1 de noviembre de 2024, EE. UU.",
        stars: 5,
        translated: true,
      },
    ],
  },
};

/** Отзывы для страницы книги. Английское и испанское издание одной
    книги показывают одни и те же отзывы, поэтому язык издания в ключе
    не участвует. */
export function reviewsForBook(bookId: string, lang: UiLang): Review[] {
  const key = bookId.replace(/-(en|es)$/, "");
  const set = bookReviews[key];
  if (!set) return [];
  return lang === "es" ? set.es : set.en;
}

/* Рецензия профессионального обозревателя. Это не отзыв покупателя,
   поэтому стоит отдельно и с указанием издания. */
export interface EditorialReview {
  text: Partial<Record<UiLang, string>>;
  who: string;
  url?: string;
}

const editorial: Record<string, EditorialReview> = {
  "how-to-draw-111": {
    text: {
      en: "With step-by-step instructions, this guide takes readers through a journey of wonder and beauty, by the end of which they will have a firm grasp on the fundamentals of drawing.",
      es: "Con instrucciones paso a paso, esta guía lleva al lector por un recorrido de asombro y belleza, al final del cual habrá asimilado los fundamentos del dibujo.",
    },
    who: "Pikasho Deka, Readers' Favorite",
    url:
      "https://readersfavorite.com/book-review/how-to-draw-111-amazing-and-cute-animals-" +
      "fairy-tale-characters-flowers-foods-gifts-and-other-themes-the-magic-of-creativity-for-kids",
  },
};

export function editorialForBook(bookId: string): EditorialReview | undefined {
  return editorial[bookId.replace(/-(en|es)$/, "")];
}
