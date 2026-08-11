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
  "where-going-max-bilingual": {
    en: [
      {
        text:
          "Such a nice presentation, sure to hold the attention of 1 to 3 year olds. The graphics, both colors and characters, are wonderfully done and the animals depicted are adorable and cuddly. The bilingual element here is brief and simple, geared to the intended age group.",
        who: "DWG38, December 3, 2024, US",
        stars: 5,
      },
      {
        text:
          "Gift for a 1 and a half year old who is learning Spanish as a first language and English as a second. This is a great book for learning.",
        who: "Katt, January 3, 2026, US",
        stars: 5,
      },
      {
        text:
          "My son needed a book for winter break to practice Spanish while away from his Spanish school. I do not read or speak Spanish, so this was perfect to keep track of his reading and understanding.",
        who: "Eva B., December 29, 2024, US",
        stars: 5,
      },
    ],
    es: [
      {
        text:
          "Una presentación preciosa, que sin duda mantiene la atención de los niños de 1 a 3 años. Los dibujos, tanto los colores como los personajes, están maravillosamente hechos, y los animales resultan adorables. La parte bilingüe es breve y sencilla, pensada para esa edad.",
        who: "DWG38, 3 de diciembre de 2024, EE. UU.",
        stars: 5,
        translated: true,
      },
      {
        text:
          "Un regalo para un niño de año y medio que aprende español como primera lengua e inglés como segunda. Es un libro estupendo para aprender.",
        who: "Katt, 3 de enero de 2026, EE. UU.",
        stars: 5,
        translated: true,
      },
      {
        text:
          "Mi hijo necesitaba un libro para las vacaciones de invierno, para practicar español fuera de su escuela en español. Yo no leo ni hablo español, así que fue perfecto para seguir su lectura y ver si entendía.",
        who: "Eva B., 29 de diciembre de 2024, EE. UU.",
        stars: 5,
        translated: true,
      },
    ],
  },
  "where-been-max": {
    en: [
      {
        text:
          "This book has a few great stories about fun adventures that Max goes on. The pictures are great! Readers will be inspired to plan their next adventure, perhaps to the beach or a nice picnic in the park.",
        who: "Latia T Smith, September 15, 2024, US",
        stars: 5,
      },
      {
        text:
          "A darling, educational book of adventures with Max the mouse. These bedtime stories are perfect for younger children. The illustrations are adorable too.",
        who: "P. Shumway, September 29, 2024, US",
        stars: 5,
      },
      {
        text:
          "We loved this little book. The illustrations were calming and the stories were easy enough to read for my kindergartner. Well done.",
        who: "D. Baker, September 19, 2024, US",
        stars: 5,
      },
      {
        text:
          "Little Max has a number of adventures including a trip to the zoo, a picnic and others. The book is nicely illustrated to capture the eye of children. A cute story.",
        who: "Jeff Peck, September 22, 2024, US",
        stars: 5,
      },
      {
        text:
          "This book has four parts, featuring little Max experiencing a day in different scenarios like the zoo, the beach, a fair, a picnic. The illustrations are a delight and the story is simple and cute. Really lovely!",
        who: "CJWReader, September 26, 2024, UK",
        stars: 5,
      },
    ],
    es: [
      {
        text:
          "El ratón Max es un aventurero, tiene todo tipo de amigos. Estos cuentos son muy divertidos, entretienen a mi hijo antes de ir a dormir.",
        who: "Lupe, 24 de septiembre de 2024, EE. UU.",
        stars: 5,
      },
      {
        text:
          "Es un libro encantador, con ilustraciones coloridas y vibrantes que capturan la atención de los niños. Las historias son entretenidas y fáciles de seguir, y ayudan a los pequeños a recordar palabras nuevas mientras disfrutan de las imágenes. A mi hijo de 2 años le fascinaron especialmente los animales.",
        who: "Josh L., 19 de septiembre de 2024, EE. UU.",
        stars: 5,
      },
      {
        text:
          "Un libro precioso y muy bien ilustrado sobre Pequeño Max y sus aventuras. Estoy mejorando mi español y este cuento sencillo, corto y fácil me ha ayudado muchísimo. Espero con ganas más libros de la serie.",
        who: "Results Designed, 26 de septiembre de 2024, EE. UU.",
        stars: 5,
        translated: true,
      },
      {
        text:
          "Compré varios libros en español para mi hijo, que va a un jardín de infancia en español, alemán e inglés. Los usamos para practicar el acento y para leer las palabras en voz alta. Es una herramienta estupenda para él. Historia bonita e ilustraciones muy buenas.",
        who: "Megan DeVere, 16 de septiembre de 2024, EE. UU.",
        stars: 5,
        translated: true,
      },
    ],
  },
  "where-going-max": {
    en: [
      {
        text:
          "I liked that this book had the repetition little ones need. The illustrations were adorable and the story was fun and engaging for toddlers. Smooth reading experience.",
        who: "Susan M, August 24, 2024, US",
        stars: 5,
      },
      {
        text:
          "This cute story follows little Max and his adventures asking different animals for things his family can use. The illustrations are phenomenal and will easily keep young children engaged. Children will learn from both the pictures of the animals and their sounds.",
        who: "Shawna Brim, August 23, 2024, US",
        stars: 5,
      },
      {
        text:
          "This book has become a favorite in our home. The stories are short but very interesting, and the illustrations are simply delightful. My child and I read it every day, and we enjoy it every time.",
        who: "ABT, September 5, 2024, US",
        stars: 5,
      },
    ],
    es: [
      {
        text:
          "Un libro infantil encantador que ha capturado la imaginación de mi pequeño desde la primera página. El texto está escrito de manera sencilla pero evocadora, ideal para niños en edad preescolar. Las ilustraciones son absolutamente hermosas.",
        who: "Ekaterina Eliseeva Garcia, 21 de mayo de 2024, España",
        stars: 5,
      },
      {
        text:
          "Me gustó que el libro tenga la repetición que los más pequeños necesitan. Las ilustraciones son adorables y la historia es divertida y entretenida para niños pequeños. Se lee con mucha fluidez.",
        who: "Susan M, 24 de agosto de 2024, EE. UU.",
        stars: 5,
        translated: true,
      },
      {
        text:
          "Este libro se ha convertido en el favorito de casa. Los cuentos son cortos pero muy interesantes, y las ilustraciones son sencillamente encantadoras. Mi hijo y yo lo leemos cada día y siempre lo disfrutamos.",
        who: "ABT, 5 de septiembre de 2024, EE. UU.",
        stars: 5,
        translated: true,
      },
    ],
  },
  /* Испанские отзывы здесь настоящие, написаны по-испански покупателями
     испанского издания, поэтому пометки о переводе у них нет. */
  "first-coloring-book-111": {
    en: [
      {
        text:
          "My oldest kids have more advanced coloring books but my 1 year old needed something just for her. The shapes in the pages are simplistic and not overly complicated for her to draw all over. The line work is thick so it is easier for her.",
        who: "Adam Smith, September 30, 2024, US",
        stars: 5,
      },
      {
        text:
          "My 22 month old son adores this book, loves to flip through the pages and ask about each animal. They are cute cartoons but have enough detail he can tell them all apart.",
        who: "TeriyakiChicken, September 30, 2024, US",
        stars: 5,
      },
      {
        text:
          "Simple and large pictures are perfect for toddlers who are just starting to use crayons. There are many themes in the book which makes coloring exciting. We enjoy coloring together.",
        who: "Ilia M, September 24, 2024, US",
        stars: 5,
      },
    ],
    es: [
      {
        text:
          "Me encanta, se lo he comprado a mi bebé de 13 meses junto con las ceras de colores y ha estado súper entretenido. Vienen muchas hojas de diferentes tipos, frutas, animales, con el dibujo bien grande y la palabra debajo.",
        who: "Marta Pintado, 7 de diciembre de 2025, España",
        stars: 5,
      },
      {
        text:
          "Compramos este libro para nuestro hijo de dos años. Se ha entusiasmado mucho con colorear animales y flores. El libro es perfecto para su edad.",
        who: "Keith, 3 de septiembre de 2024, EE. UU.",
        stars: 5,
      },
      {
        text:
          "El libro es perfecto para los pequeños artistas. Lo regalamos en un cumpleaños, y al niño le encantó.",
        who: "Javi, 17 de septiembre de 2024, EE. UU.",
        stars: 5,
      },
    ],
  },
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
  "where-been-max": {
    text: {
      en: "The beautiful illustrations complement the story, making the book visually appealing to young readers.",
      es: "Las hermosas ilustraciones acompañan la historia y hacen del libro algo muy atractivo para los pequeños lectores.",
    },
    who: "Doreen Chombu, Readers' Favorite",
  },
  "where-going-max": {
    text: {
      en: "Demi cleverly introduces a range of farm animals, seamlessly incorporating the sounds they make, which adds an extra layer of fun for little ones.",
      es: "Demi presenta con habilidad a varios animales de granja e incorpora con naturalidad los sonidos que hacen, lo que añade una capa más de diversión para los más pequeños.",
    },
    who: "Literary Titan",
    url: "https://literarytitan.com/?s=Where+Are+You+Going%2C+Little+Max%3F",
  },
  "first-coloring-book-111": {
    text: {
      en: "Each picture is thoughtfully placed in the center of the page, and features bold and curved outlines, helping little ones color within the boundaries.",
      es: "Cada dibujo está colocado con cuidado en el centro de la página, con contornos gruesos y redondeados que ayudan a los pequeños a colorear dentro de los bordes.",
    },
    who: "Maalin Ogaja, Readers' Favorite",
    url: "https://readersfavorite.com/book-review/first-coloring-book-for-toddlers-ages-1-3",
  },
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
