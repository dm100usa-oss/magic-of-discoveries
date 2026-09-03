// Бесплатные раскраски для печати.
// Страница = тема. Внутри набор рисунков, у каждого свой заголовок и своя кнопка.
// Внизу страницы одна книга, из которой взяты рисунки. Это и есть решение.
//
// Почему тема, а не отдельная страница на каждый рисунок: сотня почти пустых
// страниц выглядит как штамповка и в поиск не идет. Страница темы полезна сама
// по себе и при этом находится по названию каждого животного внутри нее.

import type { UiLang } from "./books";

export interface Sheet {
  /** Короткое имя файла. Английский лист: <id>. Испанский: <id>-es.
      Пути: /printables/<file>-letter.pdf, -a4.pdf, /printables/<file>.png */
  id: string;
  /** Название на языке страницы. Подпись на самом рисунке на языке издания. */
  name: Partial<Record<UiLang, string>>;
  /** Лист есть только на этих языках. Пусто = на всех. */
  only?: UiLang[];
}

export interface SheetGroup {
  id: string;
  title: Partial<Record<UiLang, string>>;
  sheets: Sheet[];
}

export interface ColoringCopy {
  title: string;
  /** Подпись над кнопками листа. Пусто = общая из словаря ("Раскраска {name}"). */
  sheetTitle?: string;
  /** Описание картинки словами, для Google Картинок. Пусто = общее из словаря. */
  sheetAlt?: string;
  /** Строка над веером на странице книги. Пусто = общая из словаря. */
  bookSheetsLead?: string;
  lead: string;
  body: string[];
  /** Как печатать. Короткие практические строки. */
  howTo: string[];
  /** Подводка к книге под последним рисунком. */
  pickLead: string;
  pickTitle: string;
  pickPoints: string[];
  faq: { q: string; a: string }[];
}

export interface ColoringPage {
  id: string;
  /* Свои даты страницы. Пусто значит берем общие даты сайта.
     Меняем здесь всякий раз, когда правим текст этой страницы. */
  published?: string;
  updated?: string;
  /** id книги, из которой взяты рисунки. Английское издание. */
  fromBookId: string;
  /** Испанское издание той же книги. */
  fromBookIdEs?: string;
  /** Русское издание той же книги. */
  fromBookIdRu?: string;
  slug: Partial<Record<UiLang, string>>;
  /** Лист это разворот из двух страниц: слева шаги, справа практика.
      Превью широкое, поэтому сетка и веер показываются крупнее. */
  spread?: boolean;
  copy: Partial<Record<UiLang, ColoringCopy>>;
  groups: SheetGroup[];
}

const S = (id: string, en: string, es: string, ru: string): Sheet => ({
  id,
  name: { en, es, ru },
});

const coloringPagesBase: ColoringPage[] = [
  {
    id: "toddler-animals",
    published: "2026-08-09",
    updated: "2026-08-25",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    slug: {
      en: "free-coloring-pages-for-toddlers-1-3",
      es: "dibujos-para-colorear-gratis-ninos-1-3-anos",
    },
    groups: [
      {
        id: "wild",
        title: {
          en: "Zoo and safari animals",
          es: "Animales del zoo y de safari",
          ru: "Зоопарк и сафари",
        },
        sheets: [
          S("lion", "Lion", "León", "Лев"),
          S("elephant", "Elephant", "Elefante", "Слон"),
          S("giraffe", "Giraffe", "Jirafa", "Жираф"),
          S("zebra", "Zebra", "Cebra", "Зебра"),
          S("rhino", "Rhino", "Rinoceronte", "Носорог"),
          S("monkey", "Monkey", "Mono", "Обезьяна"),
          S("crocodile", "Crocodile", "Cocodrilo", "Крокодил"),
          S("kangaroo", "Kangaroo", "Canguro", "Кенгуру"),
        ],
      },
      {
        id: "forest",
        title: {
          en: "Forest and farm animals",
          es: "Animales del bosque y de la granja",
          ru: "Лес и ферма",
        },
        sheets: [
          S("bear", "Bear", "Oso", "Медведь"),
          S("fox", "Fox", "Zorro", "Лиса"),
          S("bunny", "Bunny", "Conejo", "Заяц"),
          S("hedgehog", "Hedgehog", "Erizo", "Еж"),
          S("raccoon", "Raccoon", "Mapache", "Енот"),
          S("frog", "Frog", "Rana", "Лягушка"),
          S("goat", "Goat", "Cabra", "Коза"),
          S("koala", "Koala", "Koala", "Коала"),
        ],
      },
      {
        id: "birds",
        title: { en: "Birds", es: "Pájaros", ru: "Птицы" },
        sheets: [
          S("owl", "Owl", "Búho", "Сова"),
          S("parrot", "Parrot", "Loro", "Попугай"),
          S("flamingo", "Flamingo", "Flamenco", "Фламинго"),
          S("hummingbird", "Hummingbird", "Colibrí", "Колибри"),
        ],
      },
    ],
    copy: {
      en: {
        title:
          "20 free printable coloring pages for toddlers ages 1-3. Big pictures, thick lines, easy to color",
        lead:
          "Hand drawn for a child's first coloring book. One animal per page, thick outlines, and the word underneath can be colored too.",
        body: [
          "At two, most children sweep the crayon rather than fill. Thick lines forgive that. The color lands roughly inside, the picture still looks like a lion, and the child feels it worked. That is the difference between a page a toddler finishes and a page they abandon.",
          "These twenty sheets are real pages from our printed book, not filler drawn for a website. Each one was drawn by hand for children aged one to three: one animal, centered, nothing small in the corners, plenty of open space to fill.",
          "The name under each animal is an outline as well, so a child can color the letters and hear the word while they do it. Coloring like this is one of the simplest ways to work on fine motor control at this age, and it costs nothing but a sheet of paper.",
          "Print as many as you like. Take them to a restaurant, a waiting room, a long car ride. There is no account to make and nothing to pay for.",
        ],
        howTo: [
          "Two file sizes: US Letter and A4. Pick whichever your printer takes",
          "Print single-sided on plain paper",
          "Thick crayons work best for the youngest hands",
          "For markers, slip a spare sheet underneath",
          "Print the same animal twice and color one together",
        ],
        pickLead: "If your child liked these twenty, there are 111 in the book they came from.",
        pickTitle: "The book these pages come from",
        pickPoints: [
          "111 hand drawn pictures with thick lines",
          "One drawing per page, blank on the back",
          "The name under each picture can be colored too, so new words come with it",
          "8.5 x 11 inches, room for a whole hand",
          "114 pages, made for ages 1 to 3",
        ],
        faq: [
          {
            q: "Are these really free?",
            a: "Yes. No account, no email, no payment. Print as many copies as you want, at home or at a school.",
          },
          {
            q: "Can I use them in my classroom or daycare?",
            a: "Yes, print them and hand them out freely. Please do not resell them or republish the files on another site.",
          },
          {
            q: "Which file do I print, Letter or A4?",
            a: "In the United States and Canada, choose Letter. In Europe and Latin America, choose A4. The drawing is the same, only the sheet size differs.",
          },
          {
            q: "What age are these for?",
            a: "They were drawn for ages one to three. An older child who is still learning to stay inside a line will use them happily too, and the age is a starting point rather than a rule.",
          },
        ],
      },
      es: {
        title:
          "20 dibujos para colorear gratis para imprimir, niños de 1 a 3 años. Dibujos grandes, trazos gruesos, fáciles de colorear",
        lead:
          "Dibujados a mano para el primer libro para colorear de un niño. Un animal por página, contornos gruesos, y la palabra de abajo también se puede colorear.",
        body: [
          "A los dos años, la mayoría de los niños barre con el crayón en lugar de rellenar. Los trazos gruesos perdonan eso. El color cae más o menos dentro, el dibujo sigue pareciendo un león, y el niño siente que le salió. Ahí está la diferencia entre una página que se termina y una que se abandona.",
          "Estas veinte láminas son páginas reales de nuestro libro impreso, no relleno dibujado para una web. Cada una se dibujó a mano para niños de uno a tres años: un animal, centrado, nada pequeño en las esquinas, y mucho espacio abierto para rellenar.",
          "El nombre debajo de cada animal también es un contorno, así que el niño puede colorear las letras y oír la palabra mientras lo hace. Con dos o tres años las primeras palabras entran así, sin lección y sin esfuerzo. Colorear de esta manera es una de las formas más sencillas de trabajar la motricidad fina a esta edad, y no cuesta más que una hoja de papel.",
          "Imprime las que quieras. Llévalas a un restaurante, a una sala de espera, a un viaje largo en coche. No hay que registrarse ni pagar nada.",
        ],
        howTo: [
          "Dos tamaños de archivo: A4 y Carta. Elige el que acepte tu impresora",
          "Imprime a una sola cara en papel normal",
          "Los crayones gruesos funcionan mejor en las manos más pequeñas",
          "Si usas marcadores, pon una hoja debajo",
          "Imprime el mismo animal dos veces y coloreen uno juntos",
        ],
        pickLead: "Si a tu hijo le gustaron estas veinte, en el libro del que salieron hay 111.",
        pickTitle: "El libro del que salen estas páginas",
        pickPoints: [
          "111 dibujos hechos a mano con trazos gruesos",
          "Un dibujo por página, reverso en blanco",
          "El nombre bajo cada dibujo también se colorea, y con él llegan palabras nuevas",
          "8.5 x 11 pulgadas, espacio para la mano entera",
          "114 páginas, para niños de 1 a 3 años",
        ],
        faq: [
          {
            q: "¿De verdad son gratis?",
            a: "Sí. Sin registro, sin correo, sin pago. Imprime las copias que quieras, en casa o en una escuela.",
          },
          {
            q: "¿Puedo usarlas en mi clase o en la guardería?",
            a: "Sí, imprímelas y repártelas con total libertad. Solo te pedimos que no las revendas ni publiques los archivos en otra web.",
          },
          {
            q: "¿Qué archivo imprimo, A4 o Carta?",
            a: "En España y América Latina, elige A4. En Estados Unidos y Canadá, elige Carta. El dibujo es el mismo, solo cambia el tamaño de la hoja.",
          },
          {
            q: "¿Para qué edad son?",
            a: "Se dibujaron para niños de uno a tres años. Un niño mayor que todavía esté aprendiendo a quedarse dentro de la línea también las aprovechará, y la edad es un punto de partida, no una regla.",
          },
        ],
      },
    },
  },

  /* ===== Пошаговое рисование, развороты из книги How to Draw 111 ===== */
  {
    id: "draw-animals-step-by-step",
    published: "2026-08-27",
    updated: "2026-08-27",
    fromBookId: "how-to-draw-111-en",
    fromBookIdEs: "how-to-draw-111-es",
    slug: {
      en: "free-printable-how-to-draw-animals-step-by-step-for-kids",
      es: "como-dibujar-animales-paso-a-paso-para-imprimir-gratis",
    },
    spread: true,
    groups: [
      {
        id: "safari",
        title: {
          en: "Big safari animals",
          es: "Grandes animales de safari",
          ru: "Крупные животные саванны",
        },
        sheets: [
          S("draw-lion", "Lion", "León", "Лев"),
          S("draw-elephant", "Elephant", "Elefante", "Слон"),
          S("draw-zebra", "Zebra", "Cebra", "Зебра"),
          S("draw-rhino", "Rhino", "Rinoceronte", "Носорог"),
        ],
      },
      {
        id: "jungle",
        title: {
          en: "Jungle and island animals",
          es: "Animales de la selva y de las islas",
          ru: "Джунгли и острова",
        },
        sheets: [
          S("draw-monkey", "Monkey", "Mono", "Обезьяна"),
          S("draw-crocodile", "Crocodile", "Cocodrilo", "Крокодил"),
          S("draw-kangaroo", "Kangaroo", "Canguro", "Кенгуру"),
          S("draw-lemur", "Lemur", "Lémur", "Лемур"),
        ],
      },
      {
        id: "birds",
        title: { en: "Birds", es: "Pájaros", ru: "Птицы" },
        sheets: [
          S("draw-parrot", "Parrot", "Loro", "Попугай"),
          S("draw-flamingo", "Flamingo", "Flamenco", "Фламинго"),
        ],
      },
    ],
    copy: {
      en: {
        title:
          "Free printable how to draw pages for kids. Ten animals, steps on one sheet and room to practice on the next",
        sheetTitle: "How to draw: {name}, step by step",
        sheetAlt:
          "Free printable {name} drawing pages: numbered steps on the left page, and on the right page a dotted outline to trace with a wide blank space to draw your own",
        bookSheetsLead:
          "Real spreads from the book, two pages each: the steps on one sheet, the practice page on the next. Ten of them are free to print, so you can try the method at your own table before you buy.",
        lead:
          "Every download is two pages. The first shows the animal built up shape by shape. The second has the same animal in a dotted outline to trace, and a wide empty space where the child draws their own.",
        body: [
          "A child who says they cannot draw usually means they cannot draw the whole animal at once. Nobody can. What they can do is copy a circle, then an oval, then two ears. Six small copies later there is a lion on the page, and it was theirs. That moment is the entire point of these sheets.",
          "These twenty pages are real pages from our printed book, drawn by hand. Print both sheets of an animal and set them side by side, the way they sit in the book. The child looks left and draws right.",
          "Tracing the dotted outline first is worth the extra minute. It teaches the hand the shape before the child has to produce it alone, and it is good practice for fine motor control. After that the blank space is not intimidating, because the hand already knows where it is going.",
          "Print as many as you like. No account, no email, nothing to pay.",
        ],
        howTo: [
          "Each animal is one file with two pages inside: the steps, then the practice sheet",
          "Print both pages single-sided and lay them side by side, not back to back",
          "Two file sizes: US Letter and A4. Pick whichever your printer takes",
          "A regular pencil first, so mistakes can be erased and the child keeps going",
          "Trace the dotted animal, then draw your own in the empty space",
        ],
        pickLead:
          "Loose sheets get lost by the end of the month. In the book the same pages are already bound in order, which is what turns them into a record.",
        pickTitle: "The book these pages come from",
        pickPoints: [
          "111 animals, fairy-tale characters, flowers, food and gifts, broken into simple steps",
          "Two kinds of practice for every drawing: a dotted outline to trace and a blank space to draw your own",
          "231 pages, so no extra paper is needed and nothing gets separated",
          "Every attempt stays in one place, in order, and years later you can open it and see how a child learned to draw",
          "Finalist in the Educational category, Children's Book International Awards 2025",
        ],
        faq: [
          {
            q: "Why are there two pages for each animal?",
            a: "Because that is how the book works. One page shows the steps, the facing page is where the child draws. Print both and put them next to each other and you have the spread from the book on your table.",
          },
          {
            q: "Are these really free?",
            a: "Yes. No account, no email, no payment. Print as many copies as you want, at home or at a school.",
          },
          {
            q: "Can I use them in my classroom or library?",
            a: "Yes, print them and hand them out freely. Please do not resell them or republish the files on another site.",
          },
          {
            q: "Which file do I print, Letter or A4?",
            a: "In the United States and Canada, choose Letter. In Europe and Latin America, choose A4. The drawing is the same, only the sheet size differs.",
          },
          {
            q: "What age are these for?",
            a: "Roughly four to eight, depending on the child. A younger child can trace the dotted outline and stop there, which is already an achievement at that age.",
          },
        ],
      },
      es: {
        title:
          "Dibujos paso a paso para imprimir gratis. Diez animales, los pasos en una hoja y sitio para practicar en la siguiente",
        sheetTitle: "Cómo dibujar: {name}, paso a paso",
        sheetAlt:
          "Láminas para dibujar {name} gratis para imprimir: los pasos numerados en la hoja izquierda y, en la derecha, la línea punteada para repasar y un espacio amplio en blanco para dibujar el propio",
        bookSheetsLead:
          "Dobles páginas reales del libro, dos hojas cada una: los pasos en una y la práctica en la siguiente. Diez se pueden imprimir gratis, para probar el método en casa antes de comprar.",
        lead:
          "Cada descarga son dos páginas. La primera muestra el animal construido forma a forma. La segunda trae el mismo animal en línea punteada para repasar y un espacio amplio en blanco donde el niño dibuja el suyo.",
        body: [
          "Cuando un niño dice que no sabe dibujar, casi siempre quiere decir que no sabe dibujar el animal entero de una vez. Nadie sabe. Lo que sí puede hacer es copiar un círculo, luego un óvalo, luego dos orejas. Seis copias pequeñas después hay un león en la hoja, y lo hizo él. Ese momento es todo el sentido de estas láminas.",
          "Estas veinte páginas son páginas reales de nuestro libro impreso, dibujadas a mano. Imprime las dos hojas de un animal y ponlas una al lado de la otra, como están en el libro. El niño mira a la izquierda y dibuja a la derecha.",
          "Vale la pena repasar primero la línea punteada. Enseña la forma a la mano antes de que el niño tenga que producirla solo, y es buena práctica de motricidad fina. Después el espacio en blanco ya no intimida, porque la mano sabe hacia dónde va.",
          "Imprime las que quieras. Sin registro, sin correo, sin pagar nada.",
        ],
        howTo: [
          "Cada animal es un archivo con dos páginas dentro: los pasos y luego la hoja de práctica",
          "Imprime las dos páginas a una sola cara y ponlas una junto a la otra, no por delante y por detrás",
          "Dos tamaños de archivo: A4 y Carta. Elige el que acepte tu impresora",
          "Primero un lápiz normal, así los errores se borran y el niño sigue adelante",
          "Repasa el animal punteado y después dibuja el tuyo en el espacio en blanco",
        ],
        pickLead:
          "Las hojas sueltas se pierden antes de que acabe el mes. En el libro esas mismas páginas ya están encuadernadas en orden, y eso es lo que las convierte en un recuerdo.",
        pickTitle: "El libro del que salen estas páginas",
        pickPoints: [
          "111 animales, personajes de cuentos, flores, alimentos y regalos, divididos en pasos sencillos",
          "Dos tipos de práctica en cada dibujo: una línea punteada para repasar y un espacio en blanco para dibujar el propio",
          "231 páginas, así no hace falta papel aparte y nada se separa del resto",
          "Cada intento se queda en un mismo sitio y en orden, y años después puedes abrirlo y ver cómo aprendió a dibujar",
          "Finalista en la categoría Educativa de los Children's Book International Awards 2025",
        ],
        faq: [
          {
            q: "¿Por qué hay dos páginas por animal?",
            a: "Porque así funciona el libro. Una página muestra los pasos y la de al lado es donde dibuja el niño. Imprime las dos y ponlas juntas: tendrás sobre la mesa la misma doble página del libro.",
          },
          {
            q: "¿De verdad son gratis?",
            a: "Sí. Sin registro, sin correo, sin pago. Imprime las copias que quieras, en casa o en una escuela.",
          },
          {
            q: "¿Puedo usarlas en mi clase o en la biblioteca?",
            a: "Sí, imprímelas y repártelas con total libertad. Solo te pedimos que no las revendas ni publiques los archivos en otra web.",
          },
          {
            q: "¿Qué archivo imprimo, A4 o Carta?",
            a: "En España y América Latina, elige A4. En Estados Unidos y Canadá, elige Carta. El dibujo es el mismo, solo cambia el tamaño de la hoja.",
          },
          {
            q: "¿Para qué edad son?",
            a: "Aproximadamente de cuatro a ocho años, según el niño. Uno más pequeño puede repasar la línea punteada y quedarse ahí, que a esa edad ya es un logro.",
          },
        ],
      },
    },
  },
  /* ===== Take a Break: Cute Animals, простые листы с толстой линией ===== */
  {
    id: "easy-adult-animals",
    published: "2026-08-10",
    updated: "2026-08-25",
    fromBookId: "take-a-break-animals-en",
    fromBookIdEs: "take-a-break-animals-es",
    slug: {
      en: "free-printable-easy-animal-coloring-pages-for-adults",
      es: "dibujos-de-animales-para-colorear-faciles-para-adultos-para-imprimir-gratis",
    },
    groups: [
      {
        id: "safari",
        title: {
          en: "Safari and jungle",
          es: "Sabana y selva",
          ru: "Сафари и джунгли",
        },
        sheets: [
          S("easy-lion", "Lion", "León", "Лев"),
          S("easy-elephant", "Elephant", "Elefante", "Слон"),
          S("easy-zebra", "Zebra", "Cebra", "Зебра"),
          S("easy-rhino", "Rhino", "Rinoceronte", "Носорог"),
          S("easy-monkey", "Monkey", "Mono", "Обезьяна"),
          S("easy-parrot", "Parrot", "Loro", "Попугай"),
        ],
      },
      {
        id: "woods-water",
        title: {
          en: "Woods, water and far places",
          es: "Bosque, agua y lugares lejanos",
          ru: "Лес, вода и дальние страны",
        },
        sheets: [
          S("easy-bear", "Bear", "Oso", "Медведь"),
          S("easy-raccoon", "Raccoon", "Mapache", "Енот"),
          S("easy-frog", "Frog", "Rana", "Лягушка"),
          S("easy-stork", "Stork", "Cigüeña", "Аист"),
          S("easy-crocodile", "Crocodile", "Cocodrilo", "Крокодил"),
          S("easy-kangaroo", "Kangaroo", "Canguro", "Кенгуру"),
        ],
      },
    ],
    copy: {
      en: {
        sheetTitle: "{name} coloring page",
        sheetAlt:
          "Free printable {name} coloring page for adults and kids, thick lines and big open shapes, one design per page",
        title:
          "12 free printable easy coloring pages for adults. Thick lines, big shapes, one page in one sitting",
        lead:
          "Real pages from our printed book. Bold outlines and open areas, nothing tiny to squint at, and easy enough that a child can color the same sheet next to you.",
        body: [
          "Most adult coloring pages you find for free are dense mandalas. They take an hour, they ask a lot of your eyes, and half of them get abandoned somewhere in the third ring. These are the opposite. One animal, drawn large, with room to fill and lines thick enough to stay inside without effort.",
          "That matters more than it sounds. A page you can finish is a page you come back to. These take about twenty minutes with a mug of tea, and at the end you have a whole picture rather than a corner of one.",
          "All twelve are pages from our printed book, drawn by hand, not clipart pulled together for a website. Print them single-sided and any pen you like will do, including markers.",
          "There is nothing to sign up for and nothing to pay. Print one, print all twelve, print the same one twice so two people can color it together.",
        ],
        howTo: [
          "Two file sizes: US Letter and A4. Pick whichever your printer takes",
          "Print single-sided on plain paper",
          "Plain copy paper is fine for pencils, slightly heavier paper is better for markers",
          "If you use markers, slip a spare sheet underneath",
          "Print the same page twice and color one with someone else",
        ],
        pickLead: "If these twelve went quickly, there are 50 more in the book they came from.",
        pickTitle: "The book these pages come from",
        pickPoints: [
          "50 hand drawn designs: animals, flowers, landscapes and plants",
          "Large print: thick lines and open areas, comfortable when your eyes tire quickly",
          "One design per page, printed on one side only, so markers do not spoil the next drawing",
          "8.5 x 11 inches, the same size as these sheets",
          "Easy enough for a child to color beside you, which is why the cover says adults and kids",
        ],
        faq: [
          {
            q: "Are these really free?",
            a: "Yes. No account, no email, no payment. Print as many copies as you like, at home or anywhere else.",
          },
          {
            q: "Which file do I print, Letter or A4?",
            a: "In the United States and Canada, choose Letter. In Europe and Latin America, choose A4. The drawing is the same, only the sheet size differs.",
          },
          {
            q: "Can children color these?",
            a: "Yes. The lines are thick and the shapes are large, which is exactly what a young hand needs. They were drawn for adults who want something easy, and that turns out to suit children too.",
          },
          {
            q: "Can I use them in a class or a care home?",
            a: "Yes, print them and hand them out freely. Please do not resell them or republish the files on another site.",
          },
        ],
      },
      es: {
        sheetTitle: "Dibujo de {name} para colorear",
        sheetAlt:
          "Dibujo de {name} para colorear gratis para imprimir, para adultos y niños, líneas gruesas y formas amplias, un diseño por página",
        title:
          "12 dibujos para colorear fáciles para adultos, gratis para imprimir. Trazos gruesos, formas grandes, una página de una sentada",
        lead:
          "Páginas reales de nuestro libro impreso. Contornos gruesos y zonas amplias, nada diminuto que forzar la vista, y tan sencillas que un niño puede colorear la misma hoja a tu lado.",
        body: [
          "Casi todos los dibujos gratis para adultos son mandalas muy cargados. Llevan una hora, exigen mucho a la vista, y la mitad se abandonan en el tercer anillo. Estos son lo contrario. Un animal, dibujado en grande, con espacio para rellenar y con trazos lo bastante gruesos para quedarse dentro sin esfuerzo.",
          "Eso importa más de lo que parece. Una página que se termina es una página a la que se vuelve. Estas llevan unos veinte minutos con una taza de té, y al final tienes un dibujo entero y no una esquina.",
          "Las doce son páginas de nuestro libro impreso, dibujadas a mano, no imágenes de archivo reunidas para una web. Imprímelas a una sola cara y sirve cualquier lápiz o rotulador.",
          "No hay que registrarse ni pagar nada. Imprime una, imprime las doce, o imprime la misma dos veces para colorearla con alguien.",
        ],
        howTo: [
          "Dos tamaños de archivo: A4 y Carta. Elige el que acepte tu impresora",
          "Imprime a una sola cara en papel normal",
          "El papel de copia va bien para lápices, y uno algo más grueso es mejor para rotuladores",
          "Si usas rotuladores, pon una hoja debajo",
          "Imprime la misma página dos veces y coloréala con alguien",
        ],
        pickLead: "Si estas doce se te han hecho cortas, en el libro del que salieron hay 50.",
        pickTitle: "El libro del que salen estas páginas",
        pickPoints: [
          "50 dibujos hechos a mano: animales, flores, paisajes y plantas",
          "Letra grande: trazos gruesos y zonas amplias, cómodo cuando la vista se cansa pronto",
          "Un dibujo por página, impreso a una sola cara, para que los rotuladores no estropeen el siguiente",
          "21.6 x 27.9 cm, el mismo tamaño que estas hojas",
          "Bastante fácil para que un niño coloree a tu lado, y por eso la portada dice adultos y niños",
        ],
        faq: [
          {
            q: "¿De verdad son gratis?",
            a: "Sí. Sin registro, sin correo, sin pago. Imprime las copias que quieras, en casa o donde sea.",
          },
          {
            q: "¿Qué archivo imprimo, A4 o Carta?",
            a: "En España y América Latina, elige A4. En Estados Unidos y Canadá, elige Carta. El dibujo es el mismo, solo cambia el tamaño de la hoja.",
          },
          {
            q: "¿Pueden colorearlas los niños?",
            a: "Sí. Los trazos son gruesos y las formas grandes, que es justo lo que necesita una mano pequeña. Se dibujaron para adultos que buscan algo fácil, y resulta que también les van bien a los niños.",
          },
          {
            q: "¿Puedo usarlas en una clase o en una residencia?",
            a: "Sí, imprímelas y repártelas con total libertad. Solo te pedimos que no las revendas ni publiques los archivos en otra web.",
          },
        ],
      },
    },
  },
  /* ===== Take a Break: Ocean, простые морские листы ===== */
  {
    id: "ocean-easy",
    published: "2026-08-10",
    updated: "2026-08-25",
    fromBookId: "take-a-break-ocean-en",
    fromBookIdEs: "take-a-break-ocean-es",
    slug: {
      en: "free-printable-ocean-coloring-pages-for-adults",
      es: "dibujos-del-oceano-para-colorear-para-adultos-para-imprimir-gratis",
    },
    groups: [
      {
        id: "sea-life",
        title: {
          en: "Sea life",
          es: "Vida marina",
          ru: "Морские обитатели",
        },
        sheets: [
          S("ocean-otter", "Sea otter", "Nutria marina", "Морская выдра"),
          S("ocean-walrus", "Walrus", "Morsa", "Морж"),
          S("ocean-jellyfish", "Jellyfish", "Medusas", "Медузы"),
          S("ocean-fish", "Tropical fish", "Pez tropical", "Тропическая рыба"),
          S("ocean-coral", "Coral", "Coral", "Коралл"),
        ],
      },
      {
        id: "beach",
        title: {
          en: "Beach, boats and shells",
          es: "Playa, barcos y conchas",
          ru: "Пляж, лодки и ракушки",
        },
        sheets: [
          S("ocean-beach", "Beach umbrella", "Sombrilla de playa", "Пляжный зонт"),
          S("ocean-island", "Palm island", "Isla con palmeras", "Остров с пальмами"),
          S("ocean-sailboat", "Sailboat", "Velero", "Парусник"),
          S("ocean-shells", "Shells and starfish", "Conchas y estrellas de mar", "Ракушки и морские звезды"),
          S("ocean-mermaid", "Mermaid", "Sirena", "Русалка"),
        ],
      },
    ],
    copy: {
      en: {
        sheetTitle: "{name} coloring page",
        sheetAlt:
          "Free printable {name} ocean coloring page for adults and kids, thick lines and wide open water, one design per page",
        title:
          "10 free printable ocean coloring pages for adults. Thick lines, wide open water, easy to finish",
        lead:
          "Real pages from our printed ocean book. Sea otters, jellyfish, a mermaid, shells and quiet beaches, drawn with bold outlines and plenty of open space to fill.",
        body: [
          "Water, sand and sky are the reason ocean subjects work so well as easy coloring. They are large open areas. You can lay down a wash of blue without chasing a hairline border, and the page still looks finished.",
          "Every one of these is a page from our printed book, drawn by hand. Nothing here is filler assembled for a website. The line is thick enough that a child can color the same sheet next to you.",
          "A page takes about twenty minutes. That is the whole idea: something you actually finish in one sitting, rather than a mandala you abandon in the third ring.",
          "There is nothing to sign up for and nothing to pay. Print one, print all ten, print the same one twice so two people can color it together.",
        ],
        howTo: [
          "Two file sizes: US Letter and A4. Pick whichever your printer takes",
          "Print single-sided on plain paper",
          "Plain copy paper is fine for pencils, slightly heavier paper is better for markers",
          "If you use markers, slip a spare sheet underneath",
          "Blues and greens go a long way here, so keep a few shades of each within reach",
        ],
        pickLead: "If these ten went quickly, there are 50 more in the book they came from.",
        pickTitle: "The book these pages come from",
        pickPoints: [
          "50 hand drawn ocean designs: sea animals, fish, shells, boats, beaches and a mermaid",
          "Large print: thick lines and wide open areas, comfortable when your eyes tire quickly",
          "One design per page, printed on one side only, so markers do not spoil the next drawing",
          "8.5 x 11 inches, the same size as these sheets",
          "Easy enough for a child to color beside you, which is why the cover says adults and kids",
        ],
        faq: [
          {
            q: "Are these really free?",
            a: "Yes. No account, no email, no payment. Print as many copies as you like, at home or anywhere else.",
          },
          {
            q: "Which file do I print, Letter or A4?",
            a: "In the United States and Canada, choose Letter. In Europe and Latin America, choose A4. The drawing is the same, only the sheet size differs.",
          },
          {
            q: "Can children color these?",
            a: "Yes. The shapes are large and the lines are thick, which is exactly what a young hand needs. They were drawn for adults who want something easy, and that turns out to suit children too.",
          },
          {
            q: "Can I use them in a class or a care home?",
            a: "Yes, print them and hand them out freely. Please do not resell them or republish the files on another site.",
          },
        ],
      },
      es: {
        sheetTitle: "Dibujo de {name} para colorear",
        sheetAlt:
          "Dibujo marino de {name} para colorear gratis para imprimir, para adultos y niños, líneas gruesas y mucho espacio abierto, un diseño por página",
        title:
          "10 dibujos del océano para colorear gratis para imprimir, para adultos. Trazos gruesos, agua abierta, fáciles de terminar",
        lead:
          "Páginas reales de nuestro libro marino impreso. Nutrias, medusas, una sirena, conchas y playas tranquilas, con contornos gruesos y mucho espacio abierto para rellenar.",
        body: [
          "El agua, la arena y el cielo son la razón de que los temas del mar funcionen tan bien como colorear fácil. Son zonas amplias. Puedes extender un azul sin perseguir un borde finísimo, y la página igual queda terminada.",
          "Cada una de estas láminas es una página de nuestro libro impreso, dibujada a mano. Aquí no hay relleno reunido para una web. El trazo es lo bastante grueso para que un niño coloree la misma hoja a tu lado.",
          "Una página lleva unos veinte minutos. Esa es toda la idea: algo que de verdad terminas de una sentada, y no un mandala que abandonas en el tercer anillo.",
          "No hay que registrarse ni pagar nada. Imprime una, imprime las diez, o imprime la misma dos veces para colorearla con alguien.",
        ],
        howTo: [
          "Dos tamaños de archivo: A4 y Carta. Elige el que acepte tu impresora",
          "Imprime a una sola cara en papel normal",
          "El papel de copia va bien para lápices, y uno algo más grueso es mejor para rotuladores",
          "Si usas rotuladores, pon una hoja debajo",
          "Aquí los azules y los verdes se usan mucho, así que ten varios tonos de cada uno a mano",
        ],
        pickLead: "Si estas diez se te han hecho cortas, en el libro del que salieron hay 50.",
        pickTitle: "El libro del que salen estas páginas",
        pickPoints: [
          "50 diseños marinos dibujados a mano: animales del mar, peces, conchas, barcos, playas y una sirena",
          "Letra grande: líneas gruesas y zonas amplias, cómodo cuando la vista se cansa pronto",
          "Un diseño por página, impreso a una sola cara, para que los rotuladores no estropeen el siguiente",
          "21.6 x 27.9 cm, el mismo tamaño que estas hojas",
          "Bastante fácil para que un niño coloree a tu lado, y por eso la portada dice adultos y niños",
        ],
        faq: [
          {
            q: "¿De verdad son gratis?",
            a: "Sí. Sin registro, sin correo, sin pago. Imprime las copias que quieras, en casa o donde sea.",
          },
          {
            q: "¿Qué archivo imprimo, A4 o Carta?",
            a: "En España y América Latina, elige A4. En Estados Unidos y Canadá, elige Carta. El dibujo es el mismo, solo cambia el tamaño de la hoja.",
          },
          {
            q: "¿Pueden colorearlas los niños?",
            a: "Sí. Las formas son grandes y los trazos gruesos, que es justo lo que necesita una mano pequeña. Se dibujaron para adultos que buscan algo fácil, y resulta que también les van bien a los niños.",
          },
          {
            q: "¿Puedo usarlas en una clase o en una residencia?",
            a: "Sí, imprímelas y repártelas con total libertad. Solo te pedimos que no las revendas ni publiques los archivos en otra web.",
          },
        ],
      },
    },
  },
  /* ===== Take a Break: Food and Snacks, простые листы с едой ===== */
  {
    id: "food-easy",
    published: "2026-08-11",
    updated: "2026-08-25",
    fromBookId: "take-a-break-food-en",
    fromBookIdEs: "take-a-break-food-es",
    slug: {
      en: "free-printable-food-coloring-pages-for-adults",
      es: "dibujos-de-comida-para-colorear-para-adultos-para-imprimir-gratis",
    },
    groups: [
      {
        id: "treats",
        title: {
          en: "Sweets and snacks",
          es: "Dulces y comida",
          ru: "Сладости и еда",
        },
        sheets: [
          S("food-cake", "Birthday cake", "Tarta de cumpleaños", "Торт"),
          S("food-icecream", "Ice cream bar", "Helado", "Мороженое"),
          S("food-pizza", "Pizza slice", "Porción de pizza", "Кусок пиццы"),
          S("food-burger", "Burger", "Hamburguesa", "Бургер"),
          S("food-lemonade", "Lemonade", "Limonada", "Лимонад"),
        ],
      },
      {
        id: "fruit",
        title: {
          en: "Fruit and vegetables",
          es: "Fruta y verdura",
          ru: "Фрукты и овощи",
        },
        sheets: [
          S("food-watermelon", "Watermelon", "Sandía", "Арбуз"),
          S("food-grapes", "Grapes", "Uvas", "Виноград"),
          S("food-pomegranate", "Pomegranate", "Granada", "Гранат"),
          S("food-tomatoes", "Tomatoes", "Tomates", "Помидоры"),
        ],
      },
    ],
    copy: {
      en: {
        sheetTitle: "{name} coloring page",
        sheetAlt:
          "Free printable {name} food coloring page for adults and kids, thick lines and big simple shapes, one design per page",
        title:
          "Free printable food coloring pages for adults. Thick lines, big simple shapes, easy to finish",
        lead:
          "Real pages from our printed food book. A birthday cake, pizza, a burger, lemonade, watermelon, grapes and more, drawn with bold outlines and plenty of open space to fill.",
        body: [
          "Food is the easiest subject to color, because you almost never have to decide what color anything should be. A watermelon is green outside and red inside, and that is the whole decision. The page fills up quickly and looks good while it does.",
          "Every one of these is a page from our printed book, drawn by hand. Nothing here is filler assembled for a website. The line is thick enough that a child can color the same sheet next to you.",
          "A page takes about twenty minutes. That is the whole idea: something you actually finish in one sitting, rather than a mandala you abandon in the third ring.",
          "There is nothing to sign up for and nothing to pay. Print one, print all of them, print the same one twice so two people can color it together.",
        ],
        howTo: [
          "Two file sizes: US Letter and A4. Pick whichever your printer takes",
          "Print single-sided on plain paper",
          "Plain copy paper is fine for pencils, slightly heavier paper is better for markers",
          "If you use markers, slip a spare sheet underneath",
          "Warm colors do most of the work here, so keep your reds, oranges and yellows within reach",
        ],
        pickLead: "If these went quickly, there are 50 more in the book they came from.",
        pickTitle: "The book these pages come from",
        pickPoints: [
          "50 hand drawn designs: foods, drinks, desserts, fruit and much more",
          "Large print: thick lines and open shapes, comfortable when your eyes tire quickly",
          "One design per page, printed on one side only, so markers do not spoil the next drawing",
          "8.5 x 11 inches, the same size as these sheets",
          "Easy enough for a child to color beside you, which is why the cover says adults and kids",
        ],
        faq: [
          {
            q: "Are these really free?",
            a: "Yes. No account, no email, no payment. Print as many copies as you like, at home or anywhere else.",
          },
          {
            q: "Which file do I print, Letter or A4?",
            a: "In the United States and Canada, choose Letter. In Europe and Latin America, choose A4. The drawing is the same, only the sheet size differs.",
          },
          {
            q: "Can children color these?",
            a: "Yes. The shapes are large and the lines are thick, which is exactly what a young hand needs. They were drawn for adults who want something easy, and that turns out to suit children too.",
          },
          {
            q: "Can I use them in a class or a care home?",
            a: "Yes, print them and hand them out freely. Please do not resell them or republish the files on another site.",
          },
        ],
      },
      es: {
        sheetTitle: "Dibujo de {name} para colorear",
        sheetAlt:
          "Dibujo de {name} para colorear gratis para imprimir, para adultos y niños, líneas gruesas y formas grandes, un diseño por página",
        title:
          "Dibujos de comida para colorear gratis para imprimir, para adultos. Trazos gruesos, formas grandes, fáciles de terminar",
        lead:
          "Páginas reales de nuestro libro de comida impreso. Una tarta de cumpleaños, pizza, una hamburguesa, limonada, sandía, uvas y más, con contornos gruesos y mucho espacio abierto para rellenar.",
        body: [
          "La comida es el tema más fácil de colorear, porque casi nunca hay que decidir de qué color va nada. Una sandía es verde por fuera y roja por dentro, y ahí acaba la decisión. La página se llena rápido y queda bien mientras se llena.",
          "Cada una de estas láminas es una página de nuestro libro impreso, dibujada a mano. Aquí no hay relleno reunido para una web. El trazo es lo bastante grueso para que un niño coloree la misma hoja a tu lado.",
          "Una página lleva unos veinte minutos. Esa es toda la idea: algo que de verdad terminas de una sentada, y no un mandala que abandonas en el tercer anillo.",
          "No hay que registrarse ni pagar nada. Imprime una, imprímelas todas, o imprime la misma dos veces para colorearla con alguien.",
        ],
        howTo: [
          "Dos tamaños de archivo: A4 y Carta. Elige el que acepte tu impresora",
          "Imprime a una sola cara en papel normal",
          "El papel de copia va bien para lápices, y uno algo más grueso es mejor para rotuladores",
          "Si usas rotuladores, pon una hoja debajo",
          "Aquí mandan los colores cálidos, así que ten a mano los rojos, los naranjas y los amarillos",
        ],
        pickLead: "Si estas se te han hecho cortas, en el libro del que salieron hay 50.",
        pickTitle: "El libro del que salen estas páginas",
        pickPoints: [
          "50 diseños dibujados a mano: alimentos, bebidas, postres, fruta y mucho más",
          "Letra grande: líneas gruesas y formas amplias, cómodo cuando la vista se cansa pronto",
          "Un diseño por página, impreso a una sola cara, para que los rotuladores no estropeen el siguiente",
          "21.6 x 27.9 cm, el mismo tamaño que estas hojas",
          "Bastante fácil para que un niño coloree a tu lado, y por eso la portada dice adultos y niños",
        ],
        faq: [
          {
            q: "¿De verdad son gratis?",
            a: "Sí. Sin registro, sin correo, sin pago. Imprime las copias que quieras, en casa o donde sea.",
          },
          {
            q: "¿Qué archivo imprimo, A4 o Carta?",
            a: "En España y América Latina, elige A4. En Estados Unidos y Canadá, elige Carta. El dibujo es el mismo, solo cambia el tamaño de la hoja.",
          },
          {
            q: "¿Pueden colorearlas los niños?",
            a: "Sí. Las formas son grandes y los trazos gruesos, que es justo lo que necesita una mano pequeña. Se dibujaron para adultos que buscan algo fácil, y resulta que también les van bien a los niños.",
          },
          {
            q: "¿Puedo usarlas en una clase o en una residencia?",
            a: "Sí, imprímelas y repártelas con total libertad. Solo te pedimos que no las revendas ni publiques los archivos en otra web.",
          },
        ],
      },
    },
  },
];

export function pagesForLang(lang: UiLang): ColoringPage[] {
  return coloringPages.filter((p) => p.slug[lang] && p.copy[lang]);
}

export function pageBySlug(lang: UiLang, slug: string): ColoringPage | undefined {
  return coloringPages.find((p) => p.slug[lang] === slug);
}

export function sheetCount(p: ColoringPage, lang: UiLang): number {
  return groupsForLang(p, lang).reduce((n, g) => n + g.sheets.length, 0);
}

/* ------------------------------------------------------------------ */
/*  Русские страницы бесплатных раскрасок                              */
/*                                                                     */
/*  Держим отдельно и подмешиваем к общему списку, чтобы не трогать    */
/*  английские и испанские блоки. Внизу каждой страницы стоит русское  */
/*  издание книги, а не английское.                                    */
/* ------------------------------------------------------------------ */

type RuColoringPage = { slug: string; fromBookIdRu: string; copy: ColoringCopy };

const RU_FREE: Record<string, RuColoringPage> = {
  "toddler-animals": {
    slug: "raskraski-dlya-malyshey-1-3-goda",
    fromBookIdRu: "first-coloring-book-111-ru",
    copy: {
      title:
        "20 бесплатных раскрасок для малышей 1-3 лет. Крупные рисунки, толстая линия, легко раскрашивать.",
      lead:
        "Они нарисованы от руки для первой книги-раскраски. Одно животное на странице, толстый контур, а слово под рисунком тоже можно раскрасить.",
      body: [
        "В два года ребенок скорее водит карандашом по рисунку, чем аккуратно закрашивает. Толстая линия это прощает. Цвет ложится примерно внутрь, рисунок все равно остается похож на льва, и ребенок чувствует, что у него получилось. В этом и разница между листом, который доводят до конца, и листом, который бросают.",
        "Эти двадцать листов - настоящие страницы напечатанной книги, а не картинки, дорисованные специально для сайта. Каждый рисунок создан от руки для детей от года до трех: одно животное по центру, никаких мелких деталей по углам, много свободного места для цвета.",
        "Название под каждым животным тоже набрано полыми буквами, поэтому ребенок может раскрашивать и буквы, а взрослый - называть слово вслух. Ничего готовить не нужно.",
        "Печатайте сколько угодно. Возьмите с собой в кафе, в поликлинику или в долгую дорогу. Регистрироваться и платить не нужно.",
      ],
      howTo: [
        "Два размера файла: Letter и A4. Выбирайте тот, который подходит вашему принтеру.",
        "Печатайте на одной стороне обычной бумаги.",
        "Малышам удобнее толстые восковые карандаши.",
        "Если раскрашиваете фломастерами, подложите запасной лист.",
        "Напечатайте одно животное дважды и раскрасьте один экземпляр вместе.",
      ],
      pickLead: "Если эти двадцать понравились, в книге, из которой они взяты, их 111.",
      pickTitle: "Книга, из которой эти страницы",
      pickPoints: [
        "111 рисунков, нарисованных от руки толстой линией",
        "Один рисунок на странице, оборот чистый",
        "Название под каждым рисунком тоже можно раскрасить, а вместе с ним ребенок знакомится со словами",
        "Лист 21.6 x 27.9 см, достаточно места даже для всей ладони",
        "114 страниц, для детей от 1 до 3 лет",
      ],
      faq: [
        {
          q: "Это правда бесплатно?",
          a: "Да. Ни регистрации, ни электронной почты, ни оплаты. Печатайте сколько нужно - дома или в детском саду.",
        },
        {
          q: "Можно раздавать их в группе или в саду?",
          a: "Да, печатайте и раздавайте свободно. Пожалуйста, не перепродавайте их и не выкладывайте сами файлы у себя на сайте.",
        },
        {
          q: "Какой файл печатать, Letter или A4?",
          a: "В США и Канаде выбирайте Letter, в Европе и Израиле - A4. Рисунок одинаковый, отличается только размер листа.",
        },
        {
          q: "На какой возраст это рассчитано?",
          a: "Рисунки сделаны для детей от года до трех. Ребенку постарше, который еще учится попадать в контур, они тоже подойдут: возраст - это отправная точка, а не жесткое правило.",
        },
      ],
    },
  },

  "draw-animals-step-by-step": {
    slug: "kak-risovat-zhivotnyh-po-shagam-dlya-pechati",
    fromBookIdRu: "how-to-draw-111-ru",
    copy: {
      title:
        "10 бесплатных листов: как нарисовать животных по шагам. Для печати дома.",
      lead:
        "Слева рисунок разобран на простые шаги, справа - место, чтобы попробовать самому. Это настоящие развороты из книги, а не картинки, сделанные специально для сайта.",
      body: [
        "Ребенок бросает рисовать не из-за лени, а когда шаг слишком большой и его невозможно повторить. Здесь каждый шаг маленький: сначала простая фигура, затем к ней добавляется одна деталь. Черная линия показывает, что делать сейчас, серая - то, что уже нарисовано.",
        "Рядом находится страница с пунктиром, по которому можно обвести рисунок, и чистое место для своей попытки. Так ребенок сначала повторяет, а потом пробует сам.",
        "Печатайте столько раз, сколько нужно. Один и тот же лист может понадобиться для нескольких попыток, и это нормально: рисунок почти ни у кого не получается идеально с первого раза.",
      ],
      howTo: [
        "Два размера файла: Letter и A4.",
        "Печатайте на одной стороне обычной бумаги.",
        "Простой карандаш и ластик удобнее фломастера: ошибку можно исправить.",
        "Напечатайте лист дважды, чтобы осталось место для второй попытки.",
        "Не торопите: один рисунок за один раз - нормальный темп.",
      ],
      pickLead: "Если эти десять пошли хорошо, в книге, откуда они взяты, их 111.",
      pickTitle: "Книга, из которой эти листы",
      pickPoints: [
        "111 рисунков, каждый разобран по шагам",
        "Страница с пунктиром для обводки рядом с каждым рисунком",
        "Пустое место для своей попытки",
        "Содержание с номерами страниц",
        "231 страница, для детей от 5 до 10 лет",
      ],
      faq: [
        {
          q: "С какого возраста это подходит?",
          a: "Примерно с пяти лет. Раньше ребенку сложнее удерживать последовательность шагов, поэтому он может бросить лист на середине.",
        },
        {
          q: "Нужны ли особые карандаши?",
          a: "Нет. Достаточно обычного простого карандаша и ластика. Цветные понадобятся потом, когда рисунок будет готов.",
        },
        {
          q: "Какой файл печатать, Letter или A4?",
          a: "В США и Канаде Letter, в Европе и Израиле A4. Содержание одинаковое.",
        },
      ],
    },
  },

  "easy-adult-animals": {
    slug: "prostye-raskraski-zhivotnye-dlya-vzroslyh",
    fromBookIdRu: "take-a-break-animals-ru",
    copy: {
      title:
        "12 простых раскрасок с животными для взрослых. Крупные рисунки, бесплатно для печати.",
      lead:
        "Толстая линия и крупные формы. Лист, который можно закончить за один присест, без мелких узоров и штриховки.",
      body: [
        "Во многих раскрасках для взрослых очень много мелких деталей, и один лист приходится раскрашивать несколько дней, если его вообще удается закончить. Здесь наоборот: крупная фигура, большие участки для цвета и понятный результат за один сеанс.",
        "Эти двенадцать листов - настоящие страницы книги серии «Сделай перерыв». Один рисунок на лист, оборот чистый.",
        "Печатайте сколько угодно - дома, в классе или в комнате отдыха. Ни регистрации, ни оплаты.",
      ],
      howTo: [
        "Два размера файла: Letter и A4",
        "Печатайте на одной стороне обычной бумаги",
        "Подойдут цветные карандаши, фломастеры и гелевые ручки",
        "Под фломастеры подкладывайте запасной лист",
        "Плотная бумага держит цвет лучше обычной",
      ],
      pickLead: "Если эти двенадцать понравились, в книге, откуда они взяты, их 50.",
      pickTitle: "Книга, из которой эти листы",
      pickPoints: [
        "50 рисунков, нарисованных от руки",
        "Толстая линия и много свободного места внутри фигуры",
        "Один рисунок на странице, оборот чистый",
        "Лист 21.6 на 27.9 см",
        "102 страницы, для взрослых и детей",
      ],
      faq: [
        {
          q: "Это правда бесплатно?",
          a: "Да. Ни регистрации, ни почты, ни оплаты. Печатайте сколько нужно.",
        },
        {
          q: "Подойдет ли пожилому человеку?",
          a: "Да. Именно для этого такие рисунки и сделаны: линия толстая, фигура крупная, мелкие детали разглядывать не нужно.",
        },
        {
          q: "Какой файл печатать, Letter или A4?",
          a: "В США и Канаде Letter, в Европе и Израиле A4. Рисунок одинаковый.",
        },
      ],
    },
  },

  "ocean-easy": {
    slug: "prostye-raskraski-okean-dlya-vzroslyh",
    fromBookIdRu: "take-a-break-ocean-ru",
    copy: {
      title:
        "10 простых раскрасок про океан для взрослых. Крупные рисунки, бесплатно для печати.",
      lead:
        "Морские животные, рыбки, ракушки и пляж. Толстая линия, крупные формы, лист можно закончить за один присест.",
      body: [
        "Самая спокойная тема серии: плавные формы, много открытого пространства и почти нет мелких деталей. Хорошо подходит для вечера, когда разбираться с мелким узором уже не хочется.",
        "Эти десять листов - настоящие страницы книги «Сделай перерыв: Красота океана». Один рисунок на лист, оборот чистый.",
        "Печатайте сколько угодно. Ни регистрации, ни оплаты.",
      ],
      howTo: [
        "Два размера файла: Letter и A4",
        "Печатайте на одной стороне обычной бумаги",
        "Синие и зеленые оттенки тут пригодятся больше всего",
        "Под фломастеры подкладывайте запасной лист",
        "Плотная бумага держит цвет лучше обычной",
      ],
      pickLead: "Если эти десять понравились, в книге, откуда они взяты, их 50.",
      pickTitle: "Книга, из которой эти листы",
      pickPoints: [
        "50 рисунков, нарисованных от руки",
        "Морские животные, рыбки, ракушки и пляжи",
        "Один рисунок на странице, оборот чистый",
        "Лист 21.6 на 27.9 см",
        "102 страницы, для взрослых и детей",
      ],
      faq: [
        {
          q: "Чем эта тема отличается от животных?",
          a: "Формы крупнее и спокойнее, мелких деталей почти нет. Если хочется чего-то простого и неторопливого, начинайте с океана.",
        },
        {
          q: "Какой файл печатать, Letter или A4?",
          a: "В США и Канаде Letter, в Европе и Израиле A4. Рисунок одинаковый.",
        },
      ],
    },
  },

  "food-easy": {
    slug: "prostye-raskraski-eda-dlya-vzroslyh",
    fromBookIdRu: "take-a-break-food-ru",
    copy: {
      title:
        "9 простых раскрасок с едой для взрослых. Крупные рисунки, бесплатно для печати.",
      lead:
        "Кофе и пирожные, фрукты, пицца и десерты. Толстая линия, крупные формы, готовый лист за один присест.",
      body: [
        "Самая простая тема серии: почти не приходится думать, какой цвет выбрать. Клубника красная, банан желтый, кофе коричневый - поэтому раскрашивание идет быстро.",
        "Эти девять листов - настоящие страницы книги «Сделай перерыв: Вкусные истории». Один рисунок на лист, оборот чистый.",
        "Печатайте сколько угодно. Ни регистрации, ни оплаты.",
      ],
      howTo: [
        "Два размера файла: Letter и A4",
        "Печатайте на одной стороне обычной бумаги",
        "Подойдут цветные карандаши, фломастеры и гелевые ручки",
        "Под фломастеры подкладывайте запасной лист",
        "Плотная бумага держит цвет лучше обычной",
      ],
      pickLead: "Если эти девять понравились, в книге, откуда они взяты, их 50.",
      pickTitle: "Книга, из которой эти листы",
      pickPoints: [
        "50 рисунков, нарисованных от руки",
        "Продукты, напитки, десерты и фрукты",
        "Один рисунок на странице, оборот чистый",
        "Лист 21.6 на 27.9 см",
        "102 страницы, для взрослых и детей",
      ],
      faq: [
        {
          q: "С какой темы серии начать?",
          a: "С еды. Она самая простая: цвет предмета обычно очевиден, поэтому лист заканчивается быстрее всего.",
        },
        {
          q: "Какой файл печатать, Letter или A4?",
          a: "В США и Канаде Letter, в Европе и Израиле A4. Рисунок одинаковый.",
        },
      ],
    },
  },
};

export const coloringPages: ColoringPage[] = coloringPagesBase.map((p) => {
  const ru = RU_FREE[p.id];
  if (!ru) return p;
  return {
    ...p,
    fromBookIdRu: ru.fromBookIdRu,
    slug: { ...p.slug, ru: ru.slug },
    copy: { ...p.copy, ru: ru.copy },
  };
});

/** Все листы подряд, для веера на странице книги. */
export function allSheets(p: ColoringPage, lang: UiLang): Sheet[] {
  return groupsForLang(p, lang).flatMap((g) => g.sheets);
}

/** Страница раскрасок, собранная из этой книги. */
export function coloringPageForBook(bookId: string): ColoringPage | undefined {
  return coloringPages.find((p) => p.fromBookId === bookId || p.fromBookIdEs === bookId);
}

/* Листы, у которых есть русский вариант. Это страницы первой книги
   для малышей: под рисунком напечатано слово, поэтому английский лист
   на русской странице не годится. На листах для взрослых слов нет,
   там русская страница показывает те же файлы. */
const RU_SHEETS = new Set([
  "lion", "elephant", "zebra", "parrot", "crocodile", "monkey", "kangaroo",
  "rhino", "flamingo", "hummingbird", "giraffe", "koala", "frog", "bunny",
  "owl", "hedgehog", "goat", "raccoon", "bear", "fox",
]);

/** Имя файла листа на этом языке. Испанские рисунки лежат с суффиксом -es,
    русские с суффиксом -ru там, где они есть. */
export const sheetFile = (id: string, lang: UiLang) =>
  lang === "es"
    ? `${id}-es`
    : lang === "ru" && RU_SHEETS.has(id)
      ? `${id}-ru`
      : id;

export const printableUrl = (id: string, size: "letter" | "a4", lang: UiLang) =>
  `/printables/${sheetFile(id, lang)}-${size}.pdf`;

export const previewUrl = (id: string, lang: UiLang) =>
  `/printables/${sheetFile(id, lang)}.png`;

/** Листы этой темы, доступные на этом языке. */
export function groupsForLang(p: ColoringPage, lang: UiLang): SheetGroup[] {
  return p.groups
    .map((g) => ({ ...g, sheets: g.sheets.filter((sh) => !sh.only || sh.only.includes(lang)) }))
    .filter((g) => g.sheets.length > 0);
}
