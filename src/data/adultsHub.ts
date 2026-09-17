// Раздел простых раскрасок для взрослых.
//
// Три книги серии "Сделай перерыв" стояли внутри детского каталога,
// и со стороны сайт выглядел исключительно детским: нейросети так его
// и описывали. Эта страница дает линейке собственный адрес, собственный
// заголовок и собственные поисковые слова, а три книги получают с нее
// ссылки. Человеку здесь нужен быстрый ответ, поэтому текста немного:
// подробности живут на страницах книг.
import type { UiLang } from "@/data/books";

export interface AdultsHub {
  /** Заголовок страницы. Пишется словами покупателя. */
  title: string;
  /** Одна строка под заголовком. */
  lead: string;
  /** Название страницы в выдаче поиска. */
  seoTitle: string;
  /** Описание страницы в выдаче поиска. */
  seoDescription: string;
  /** Два-три абзаца о том, чем эти раскраски отличаются. */
  intro: string[];
  /** Чем эта серия отличается от обычных взрослых раскрасок. */
  whatTitle: string;
  what: string[];
  /** Заголовок над карточками книг. */
  booksTitle: string;
  /** Вопросы покупателя. Уходят в разметку FAQ. */
  faq: { q: string; a: string }[];
  /** Слова, по которым ищут такие раскраски. Уходят в разметку. */
  keywords: string[];
}

export const adultsHub: Partial<Record<UiLang, AdultsHub>> = {
  en: {
    title: "Easy coloring books for adults",
    lead: "Bold lines, large open shapes, and one drawing per page, so you can finish a page in one sitting.",
    seoTitle: "Easy Coloring Books for Adults | Bold and Easy, Large Print",
    seoDescription:
      "Three easy large print coloring books for adults and teens: 50 hand-drawn drawings in each, thick lines and open shapes. Animals, ocean and food. One page per sitting.",
    intro: [
      "Many coloring books for adults are filled with intricate patterns and mandalas: hundreds of tiny areas, an hour or more per page, and books that often end up half-finished on a shelf. This series takes the opposite approach.",
      "Each of the three books includes 50 hand-drawn illustrations on 8.5 x 11-inch pages, with thick outlines and large open areas. A drawing takes about twenty to thirty minutes, so you can start and finish the same page in one evening.",
    ],
    whatTitle: "What makes these different",
    what: [
      "Thick outlines and large shapes that are easy to see and color",
      "One drawing per page, with no other images competing for space",
      "Every drawing made by hand, with no artificial intelligence at any stage",
      "Colored pencils, gel pens, crayons or markers all work",
      "Suitable for beginners, teens, and experienced colorists alike",
      "Each book is available as a paperback and a printable PDF",
      "Suitable for older adults and for group activities in libraries and senior living communities",
    ],
    booksTitle: "The three books",
    faq: [
      {
        q: "Which book should I start with?",
        a: "Food and Snacks is the easiest to pick up, because you rarely have to decide what color anything should be. Cute Animals has the most variety, and Ocean is the calmest of the three.",
      },
      {
        q: "What does bold and easy mean?",
        a: "Thick outlines and large open areas instead of fine pattern work. Every shape is big enough to fill in without a fine-tipped pen and without leaning close to the page.",
      },
      {
        q: "How long does one page take?",
        a: "About twenty to thirty minutes at an unhurried pace, which is the point of the series: one drawing started and finished in a single sitting.",
      },
      {
        q: "Are these coloring books suitable for teenagers?",
        a: "Yes. The subjects are cute animals, sea life and food rather than anything aimed at one age, and the designs work equally well for teens and adults.",
      },
      {
        q: "Can a child color in them too?",
        a: "Yes. The shapes are large and the lines thick, so a school-age child can color a page alone. They also work well for families who want to color together.",
      },
      {
        q: "Are the drawings AI-generated?",
        a: "No. All 150 drawings across the three books are drawn by hand by our own illustrator, which is why the lines stay clean and the style is the same on every page.",
      },
      {
        q: "Is this a good gift?",
        a: "Yes. They make an easy gift for anyone from a teenager to a grandparent, and the first page can be finished the same evening the gift is opened.",
      },
      {
        q: "Is this a good coloring book for seniors?",
        a:
          "Yes. The drawings are large, the outlines are thick, and there is one subject per page with no small details, so there is no need to look closely or work with tiny details. A page can be finished in one short sitting.",
      },
      {
        q: "Can a senior living community, library, or adult day program use it?",
        a:
          "Yes. The paperback works well for individual use, and the printable PDF lets a group use the same drawing, so an activity leader can give everyone the same page.",
      },
    ],
    keywords: [
      "easy coloring books for adults",
      "bold and easy coloring book",
      "large print coloring book for adults",
      "simple coloring book for beginners",
      "cozy coloring book",
      "stress relief coloring book easy",
      "coloring books for teens",
      "thick line coloring book",
      "hand drawn coloring book",
      "coloring book gift",
    ],
  },

  es: {
    title: "Libros para colorear fáciles para adultos",
    lead: "Trazos gruesos, formas amplias y un dibujo por página: puedes terminar una página en una sola sesión.",
    seoTitle: "Libros para Colorear Fáciles para Adultos | Trazos Gruesos",
    seoDescription:
      "Tres libros para colorear fáciles para adultos y adolescentes: 50 dibujos hechos a mano en cada uno, con trazo grueso y formas amplias. Animales, océano y comida.",
    intro: [
      "Muchos libros para colorear para adultos están llenos de patrones detallados y mandalas: cientos de espacios pequeños, más de una hora por página y libros que muchas veces quedan a medio terminar. Esta serie propone justo lo contrario.",
      "Cada uno de los tres libros tiene 50 dibujos hechos a mano en un formato de 21,6 por 27,9 cm, con contornos gruesos y amplias zonas para colorear. Un dibujo lleva entre veinte y treinta minutos, así que puedes empezar y terminar una página en una sola sesión.",
    ],
    whatTitle: "En qué se diferencian",
    what: [
      "Contornos gruesos y formas grandes, cómodos cuando cuesta ver los detalles pequeños",
      "Un dibujo por página, sin nada más que lo acompañe",
      "Todos los dibujos hechos a mano, sin inteligencia artificial en ninguna fase",
      "Se pueden usar lápices de colores, bolígrafos de gel, crayones o marcadores",
      "Son adecuados tanto para principiantes y adolescentes como para quienes llevan años coloreando",
      "Cada libro está disponible en edición de tapa blanda y como archivo imprimible",
      "Adecuados para personas mayores y para actividades de grupo en bibliotecas y residencias para mayores",
    ],
    booksTitle: "Los tres libros",
    faq: [
      {
        q: "¿Con cuál conviene empezar?",
        a: "Con Historias Deliciosas: casi nunca hay que decidir de qué color va cada cosa. Animales Adorables es el más variado y Belleza del Océano es el más tranquilo de los tres.",
      },
      {
        q: "¿Qué significa trazo grueso y dibujo sencillo?",
        a: "Contornos gruesos y zonas amplias en lugar de patrones diminutos. Cada forma es lo bastante grande para rellenarla sin punta fina y sin acercarse a la página.",
      },
      {
        q: "¿Cuánto se tarda en una página?",
        a: "Entre veinte y treinta minutos sin prisa, y esa es la idea de la serie: un dibujo empezado y terminado en una sola sesión.",
      },
      {
        q: "¿Son adecuados para adolescentes?",
        a: "Sí. Los temas son animales tiernos, vida marina y comida, nada pensado para una sola edad, y los diseños funcionan igual de bien para adolescentes y adultos.",
      },
      {
        q: "¿Pueden colorearlos también los niños?",
        a: "Sí. Las formas son grandes y las líneas gruesas, así que un niño en edad escolar pueda colorear una página por su cuenta. También es una buena opción para que adultos y niños coloreen juntos.",
      },
      {
        q: "¿Los dibujos están hechos con inteligencia artificial?",
        a: "No. Los 150 dibujos de los tres libros están hechos a mano por nuestro propio ilustrador, y por eso las líneas son limpias y el estilo se mantiene en todas las páginas.",
      },
      {
        q: "¿Sirven como regalo?",
        a: "Sí. Son adecuados tanto para adolescentes como para adultos mayores, y la primera página se puede terminar la misma tarde en que se abre el regalo.",
      },
      {
        q: "¿Es un buen libro para colorear para personas mayores?",
        a:
          "Sí. Los dibujos son grandes, los contornos son gruesos y hay un solo motivo por página, sin detalles pequeños. No hace falta acercarse mucho a la página ni trabajar con detalles diminutos, y una página se puede terminar en poco tiempo.",
      },
      {
        q: "¿Pueden usarlo residencias para mayores, bibliotecas o centros de día?",
        a:
          "Sí. El libro en papel funciona bien para uso individual, y el archivo imprimible permite usar el mismo dibujo con todo el grupo, de modo que quien dirige la actividad entrega la misma página a todos.",
      },
    ],
    keywords: [
      "libros para colorear faciles para adultos",
      "libro para colorear trazos gruesos",
      "libro para colorear con dibujos grandes",
      "libro para colorear para principiantes",
      "libro de colorear antiestres lineas gruesas",
      "libro para colorear relajante",
      "libros para colorear para adolescentes",
      "dibujado a mano",
      "regalo para colorear",
      "libro para pintar para relajarse",
    ],
  },

  ru: {
    title: "Простые раскраски для взрослых",
    lead: "Толстый контур, крупные формы и один рисунок на странице: одну страницу можно закончить за один вечер.",
    seoTitle: "Простые раскраски для взрослых: толстый контур, крупные рисунки",
    seoDescription:
      "Три простые раскраски для взрослых и подростков: по 50 рисунков вручную в каждой, толстый контур и крупные формы. Милые животные, океан и еда. Страница за один вечер.",
    intro: [
      "Многие раскраски для взрослых заполнены сложными узорами и мандалами: сотни мелких участков, больше часа на одну страницу и книга, брошенная на середине. Эта серия сделана наоборот.",
      "В каждой из трех книг 50 рисунков, нарисованных вручную, лист 21,6 на 27,9 см, толстый контур и крупные свободные участки для раскрашивания. На рисунок уходит двадцать-тридцать минут, поэтому страницу начинают и заканчивают за один вечер.",
    ],
    whatTitle: "Чем эти книги отличаются",
    what: [
      "Толстый контур и крупные формы, удобно, когда мелкие детали видно плохо",
      "Один рисунок на странице, ничего лишнего рядом",
      "Все рисунки нарисованы вручную, без нейросетей на любом этапе",
      "Подходят цветные карандаши, гелевые ручки, восковые мелки и фломастеры",
      "Одинаково годятся новичку, подростку и тому, кто раскрашивает давно",
      "Каждая книга есть в бумаге и файлом для печати",
      "Подходят пожилым людям, в том числе для групповых занятий в библиотеках, центрах дневного пребывания и домах престарелых",
    ],
    booksTitle: "Три книги серии",
    faq: [
      {
        q: "С какой книги начать?",
        a: "С «Вкусных историй»: там почти не нужно решать, какого цвета предмет. В «Милых животных» больше разнообразия, а «Красота океана» самая спокойная из трех.",
      },
      {
        q: "Что значит толстый контур и простой рисунок?",
        a: "Это крупные формы и широкие свободные участки вместо мелкого узора. Для раскрашивания не нужны тонкие карандаши или фломастеры, а мелкие детали не приходится рассматривать вблизи.",
      },
      {
        q: "Сколько времени уходит на одну страницу?",
        a: "Двадцать-тридцать минут в спокойном темпе. В этом и смысл серии: рисунок начинают и заканчивают за один раз.",
      },
      {
        q: "Подходят ли эти раскраски подросткам?",
        a: "Да. Темы - милые животные, море и еда, ничего, что подходило бы только одному возрасту, и рисунки одинаково хорошо подходят подросткам и взрослым.",
      },
      {
        q: "Может ли раскрашивать ребенок?",
        a: "Да. Формы крупные, линия толстая, поэтому школьник справляется со страницей сам. Это и хороший вариант, чтобы раскрашивать вместе со взрослым.",
      },
      {
        q: "Рисунки сделаны нейросетью?",
        a: "Нет. Все 150 рисунков в трех книгах нарисованы вручную нашим художником, поэтому линии чистые, а стиль одинаковый на каждой странице.",
      },
      {
        q: "Подходят ли книги в подарок?",
        a: "Да. Они одинаково подходят и подростку, и пожилому человеку, а первую страницу можно закончить в тот же вечер, когда подарок открыли.",
      },
      {
        q: "Подойдет ли эта раскраска пожилому человеку?",
        a:
          "Да. Рисунки крупные, контур толстый, на странице один предмет и никаких мелких деталей, поэтому не приходится всматриваться в мелкие детали, а одну страницу можно закончить за короткое время.",
      },
      {
        q: "Можно ли использовать книгу в доме престарелых, библиотеке или центре дневного пребывания?",
        a:
          "Да. Бумажная книга рассчитана на одного человека, а файл для печати позволяет распечатать один и тот же рисунок на всю группу, поэтому ведущий занятия выдает одинаковую страницу всем участникам.",
      },
    ],
    keywords: [
      "простые раскраски для взрослых",
      "раскраска антистресс с толстым контуром",
      "раскраска крупные рисунки",
      "легкая раскраска для начинающих",
      "раскраска для подростков",
      "раскраска для пожилых крупные линии",
      "спокойная раскраска",
      "нарисовано вручную",
      "раскраска в подарок",
      "раскраска для печати pdf",
    ],
  },
};
