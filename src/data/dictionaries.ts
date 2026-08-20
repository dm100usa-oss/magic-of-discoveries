import type { UiLang } from "./books";

export interface Dictionary {
  htmlLang: string;
  label: string;
  nav: {
    home: string;
    books: string;
    method: string;
    teachers: string;
    coloringPages: string;
    about: string;
    contact: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    heroCta: string;
    kidsTitle: string;
    kidsLead: string;
    adultsTitle: string;
    adultsLead: string;
    freeTitle: string;
    freeLead: string;
    freeCta: string;
    reviewsTitle: string;
    reviewTranslated: string;
    browseAll: string;
  };
  catalog: {
    title: string;
    lead: string;
    filterAge: string;
    filterType: string;
    all: string;
    ages: Record<string, string>;
    types: Record<string, string>;
    empty: string;
  };
  book: {
    video: string;
    videoLead: string;
    videoPoints: string[];
    pagesLabel: string;
    publishedLabel: string;
    priceFrom: string;
    priceFromHardcover: string;
    whyTitle: string;
    languageLabel: string;
    langEn: string;
    langEs: string;
    langBoth: string;
    ageYears: string;
    topicsTitle: string;
    topicsLead: string;
    topicsAll: string;
    topicsCount: string;
    reviewsTitle: string;
    reviewsSource: string;
    editorialTitle: string;
    editorialSource: string;
    inside: string;
    artwork: string;
    forWhom: string;
    faq: string;
    buyPaperback: string;
    buyHardcover: string;
    buyKindle: string;
    buyPdf: string;
    pdfNote: string;
    alsoIn: string;
    related: string;
    detailsTitle: string;
    drawings: string;
    size: string;
    ageLabel: string;
    publisher: string;
    author: string;
    formatNote: string;
    ratingReviews: string;
    /** Форма для одного голоса: "1 rating", а не "1 ratings". */
    ratingReviewsOne: string;
    ratingSource: string;
    ratingAria: string;
  };
  method: {
    title: string;
    lead: string;
    ideaTitle: string;
    idea: string[];
    ladderTitle: string;
    ladderLead: string;
    ladder: { age: string; can: string; needs: string }[];
    guidesTitle: string;
    guidesLead: string;
    awardsTitle: string;
    awardsLead: string;
    reviewsTitle: string;
    reviewsLead: string;
    retailTitle: string;
    retailLead: string;
    regions: Record<string, string>;
    standardTitle: string;
    standardBody: string;
    standardLink: string;
    ageNote: string;
    guideCheck: string;
    guidePick: string;
    guideFaq: string;
    guideRelated: string;
    guideBack: string;
    bookAward: string;
    bookRetail: string;
    bookMethod: string;
  };
  free: {
    title: string;
    lead: string;
    comingSoon: string;
    howToTitle: string;
    sheetTitle: string;
    sheetAlt: string;
    printLetter: string;
    printA4: string;
    faqTitle: string;
    countLabel: string;
    bookSheetsTitle: string;
    bookSheetsLead: string;
    bookSheetsCta: string;
    rights: string;
  };
  about: {
    title: string;
    body: string[];
  };
  contact: {
    title: string;
    lead: string;
    email: string;
  };
  footer: {
    rights: string;
    follow: string;
  };
}

export const dictionaries: Record<UiLang, Dictionary> = {
  en: {
    htmlLang: "en",
    label: "English",
    nav: {
      home: "Home",
      books: "Books",
      method: "The method",
      teachers: "For teachers",
      coloringPages: "Free coloring pages",
      about: "About us",
      contact: "Contact",
    },
    home: {
      heroEyebrow: "Coloring, drawing and bedtime books",
      heroTitle: "Books that a small child can finish",
      heroLead:
        "Thick outlines a two year old can follow. Bedtime stories short enough to reach the end. Drawing broken into simple steps. Every book is made so the child succeeds at it, because that is what makes them come back tomorrow.",
      heroCta: "See all books",
      kidsTitle: "For children",
      kidsLead:
        "Coloring books, bedtime stories and step by step drawing, from first crayon at one year old to drawing alone at eight.",
      adultsTitle: "For teenagers and adults",
      adultsLead:
        "Easy coloring with bold lines and open shapes. A page you can finish in one sitting, not a mandala that takes an hour.",
      freeTitle: "Free coloring pages to print",
      freeLead:
        "Single pages you can print at home right now. No account, no payment. Each one comes from one of our books, so if your child likes it, you know where to find a hundred more.",
      freeCta: "Browse printable pages",
      reviewsTitle: "Parents are loving it",
      reviewTranslated: "",
      browseAll: "See all books",
    },
    catalog: {
      title: "All books",
      lead: "Every book has its own page with what is inside, who it suits and where to buy it.",
      filterAge: "Age",
      filterType: "Kind of book",
      all: "All",
      ages: {
        "1-3": "1 to 3 years",
        "3-5": "3 to 5 years",
        "5-7": "5 to 7 years",
        "7-10": "7 to 10 years",
        "teens-adults": "Teens and adults",
      },
      types: {
        coloring: "Coloring",
        drawing: "Step by step drawing",
        bedtime: "Bedtime stories",
        bilingual: "Bilingual",
      },
      empty: "Nothing matches that combination yet.",
    },
    book: {
      video: "See the book in your hands",
      videoLead:
        "A page by page flip through the real book, so you can see the paper, the size and how the drawings build up before you buy.",
      videoPoints: [
        "Filmed on a table at home, so the paper and the size you see are the real ones.",
        "You can watch one drawing grow from a simple shape into a finished character.",
        "This is the same book that arrives in the box.",
      ],
      pagesLabel: "Pages",
      publishedLabel: "Published",
      priceFrom: "Paperback on Amazon",
      priceFromHardcover: "Hardcover on Amazon",
      whyTitle: "Why this book",
      languageLabel: "Language",
      langEn: "English",
      langEs: "Spanish",
      langBoth: "English and Spanish",
      ageYears: "{a} to {b} years",
      topicsTitle: "Look for what your child loves",
      topicsLead: "Every subject in the book, grouped.",
      topicsAll: "See all {n} subjects",
      topicsCount: "{n} in total",
      reviewsTitle: "What parents say",
      reviewsSource: "Verified purchase reviews left on Amazon.",
      editorialTitle: "Reviewed by",
      editorialSource: "Read the full review",
      inside: "What is inside",
      artwork: "Pictures from the book",
      forWhom: "Who it is for",
      faq: "Questions parents ask",
      buyPaperback: "Buy the paperback on Amazon",
      buyHardcover: "Buy the hardcover on Amazon",
      buyKindle: "Read on Kindle",
      buyPdf: "Download the printable PDF",
      pdfNote: "The PDF opens in our print shop and is sent to your email after checkout.",
      alsoIn: "Also available in",
      related: "You may also like",
      detailsTitle: "Book details",
      drawings: "Drawings",
      size: "Size",
      ageLabel: "Age",
      publisher: "Publisher",
      author: "Author",
      formatNote: "Prices are set by Amazon and may change.",
      ratingReviews: "ratings",
      ratingReviewsOne: "rating",
      ratingSource: "Read the reviews on Amazon",
      ratingAria: "Read customer reviews on Amazon",
    },
    method: {
      title: "Books built so a child can finish them",
      lead:
        "Every book we publish is made to one idea: the child has to succeed at it. A page a child completes is a page that makes them ask for another one tomorrow.",
      ideaTitle: "The idea behind every book",
      idea: [
        "Children do not give up on drawing or reading because they lack interest. They give up when the result does not match what they pictured. A thin outline a small hand cannot follow, a story that runs longer than the child can listen, a drawing lesson with steps too big to copy. Each one ends the same way: the book closes.",
        "So we design backwards from the finish. First we ask what the child can already do, then we set the line weight, the number of objects on the page, the length of the story and the number of drawing steps to sit just inside that. What comes out is a book that gets completed, and completion is what brings the child back.",
        "Ricardo calls this the ECL approach, for emotional, creative and linguistic. The three grow together rather than in turn. A child feels something, draws it, and then finds the words for it, and the words deepen the feeling. Our bedtime stories, coloring books, drawing guides and bilingual editions are the same idea at four different stages.",
      ],
      ladderTitle: "What changes with age",
      ladderLead:
        "The age on a cover describes the book, not your child. Use this as a map, then check it against what your child actually does.",
      ladder: [
        {
          age: "1 to 3 years",
          can: "Sweeps a crayon rather than fills. Listens for a few minutes. Names familiar things.",
          needs: "Thick outlines, one large object per page, short repeated phrases, large pictures.",
        },
        {
          age: "3 to 5 years",
          can: "Stays roughly inside the line. Follows a short sequence of events. Asks what happens next.",
          needs: "More themes, several elements per page, a five to seven minute story with one clear problem.",
        },
        {
          age: "5 to 7 years",
          can: "Colors accurately. Follows dialogue. Starts judging their own drawing.",
          needs: "More detail, longer stories with motives, drawing broken into steps that can be copied.",
        },
        {
          age: "7 to 10 years",
          can: "Works independently for longer. Reads alone. Compares their result to the example.",
          needs: "Structured drawing, stories with real choices in them, a second language alongside a familiar one.",
        },
      ],
      guidesTitle: "Choosing a book",
      guidesLead:
        "Short, practical answers to the questions parents actually ask, each ending in the one book we would hand you.",
      awardsTitle: "Awards",
      awardsLead: "Recognition for individual titles, with the program, category and year.",
      reviewsTitle: "Independent reviews",
      reviewsLead: "Editorial review platforms that assess books independently of the publisher.",
      retailTitle: "Where our books are sold",
      retailLead:
        "Our titles are carried by retailers on four continents. If you are outside the United States, one of these will ship to you.",
      regions: {
        us: "United States",
        europe: "Europe and United Kingdom",
        latam: "Latin America",
        africa: "Africa",
        global: "Worldwide",
      },
      standardTitle: "The method in full",
      standardBody:
        "The full framework, including the age groups, the skill map and the parameters used for each kind of book, is published openly and can be read in its complete form.",
      standardLink: "Read the full methodology",
      ageNote:
        "Ages are a starting point, not a rule. Buy for what your child does today, not for the number on the cover.",
      guideCheck: "What to look for",
      guidePick: "The book we would pick",
      guideFaq: "Questions parents ask",
      guideRelated: "Read next",
      guideBack: "All guides",
      bookAward: "Awarded",
      bookRetail: "Also sold at",
      bookMethod: "How this book is built",
    },
    free: {
      title: "Free coloring pages to print",
      lead:
        "Pick a page, print it, color it. Every page here is a real page from one of our books, so nothing is drawn worse because it is free.",
      comingSoon:
        "The first pages are being prepared. If you want one particular animal or theme, write to us and we will put it up.",
      howToTitle: "Printing them",
      sheetTitle: "{name} coloring page",
      sheetAlt: "Free printable {name} coloring page for toddlers, thick outlines, one animal per page",
      printLetter: "Print · US Letter",
      printA4: "Print · A4",
      faqTitle: "Questions parents ask",
      countLabel: "printable pages",
      bookSheetsTitle: "A few pages from inside",
      bookSheetsLead:
        "These are real pages from the book. You can print {n} of them free and see the line weight for yourself before you buy.",
      bookSheetsCta: "Print {n} pages free",
      rights:
        "Drawings by Ricardo Demi, published by Magic of Discoveries LLC. Print as many copies as you like for home, school or daycare. Please do not resell them, republish the files, or use them in a book or product of your own.",
    },
    about: {
      title: "About us",
      body: [
        "Hi, we are Ricardo and Maria. Ricardo is an educator, researcher and writer. Maria loves design and drawing. We make books that help unlock what is already in a child, in a light and unforced way.",
        "We believe every child has hidden potential that can be developed from an early age. We do our best to bring something useful and something joyful to both children and their parents.",
        "We have a beloved dog, an English Cocker Spaniel called Rocky, who became the hero of his own books. Our family lives in sunny Miami, Florida, and the city's color and pace feed most of what we make.",
      ],
    },
    contact: {
      title: "Contact us",
      lead: "Questions about a book, a bulk order for a school, or a page you would like us to draw. Write to us.",
      email: "Email",
    },
    footer: { rights: "All rights reserved", follow: "Follow" },
  },

  es: {
    htmlLang: "es",
    label: "Español",
    nav: {
      home: "Inicio",
      books: "Libros",
      method: "El método",
      teachers: "Para maestros",
      coloringPages: "Dibujos gratis",
      about: "Quiénes somos",
      contact: "Contacto",
    },
    home: {
      heroEyebrow: "Libros para colorear, dibujar y para dormir",
      heroTitle: "Libros que un niño pequeño sí termina",
      heroLead:
        "Líneas gruesas que un niño de dos años puede seguir. Cuentos cortos que llegan al final. Dibujo dividido en pasos sencillos. Cada libro está hecho para que el niño lo consiga, porque eso es lo que hace que mañana vuelva a pedirlo.",
      heroCta: "Ver todos los libros",
      kidsTitle: "Para niños",
      kidsLead:
        "Libros para colorear, cuentos para dormir y dibujo paso a paso, desde el primer lápiz al año hasta dibujar solo a los ocho.",
      adultsTitle: "Para adolescentes y adultos",
      adultsLead:
        "Colorear fácil, con líneas gruesas y formas amplias. Una página que se termina de una sentada, no un mandala de una hora.",
      freeTitle: "Dibujos gratis para imprimir",
      freeLead:
        "Páginas sueltas que puedes imprimir en casa ahora mismo. Sin registro y sin pagar. Cada una sale de uno de nuestros libros, así que si le gusta a tu hijo, ya sabes dónde hay cien más.",
      freeCta: "Ver dibujos para imprimir",
      reviewsTitle: "Lo que dicen los padres",
      reviewTranslated: "Traducido del inglés",
      browseAll: "Ver todos los libros",
    },
    catalog: {
      title: "Todos los libros",
      lead: "Cada libro tiene su propia página con lo que contiene, para quién es y dónde comprarlo.",
      filterAge: "Edad",
      filterType: "Tipo de libro",
      all: "Todos",
      ages: {
        "1-3": "De 1 a 3 años",
        "3-5": "De 3 a 5 años",
        "5-7": "De 5 a 7 años",
        "7-10": "De 7 a 10 años",
        "teens-adults": "Adolescentes y adultos",
      },
      types: {
        coloring: "Para colorear",
        drawing: "Dibujo paso a paso",
        bedtime: "Cuentos para dormir",
        bilingual: "Bilingüe",
      },
      empty: "Todavía no hay nada con esa combinación.",
    },
    book: {
      video: "El libro en tus manos",
      videoLead:
        "Un recorrido página por página del libro real, para que veas el papel, el tamaño y cómo se construyen los dibujos antes de comprarlo.",
      videoPoints: [
        "Grabado sobre una mesa en casa, así que el papel y el tamaño que ves son los reales.",
        "Puedes ver cómo un dibujo crece desde una forma simple hasta un personaje terminado.",
        "Es el mismo libro que llega en la caja.",
      ],
      pagesLabel: "Páginas",
      publishedLabel: "Publicado",
      priceFrom: "Tapa blanda en Amazon",
      priceFromHardcover: "Tapa dura en Amazon",
      whyTitle: "Por qué este libro",
      languageLabel: "Idioma",
      langEn: "Inglés",
      langEs: "Español",
      langBoth: "Inglés y español",
      ageYears: "De {a} a {b} años",
      topicsTitle: "Busca lo que le gusta a tu hijo",
      topicsLead: "Todos los temas del libro, por grupos.",
      topicsAll: "Ver los {n} temas",
      topicsCount: "{n} en total",
      reviewsTitle: "Lo que dicen los padres",
      reviewsSource: "Opiniones de compras verificadas publicadas en Amazon.",
      editorialTitle: "Reseñado por",
      editorialSource: "Leer la reseña completa",
      inside: "Qué contiene",
      artwork: "Ilustraciones del libro",
      forWhom: "Para quién es",
      faq: "Preguntas de los padres",
      buyPaperback: "Comprar en tapa blanda en Amazon",
      buyHardcover: "Comprar en tapa dura en Amazon",
      buyKindle: "Leer en Kindle",
      buyPdf: "Descargar el PDF para imprimir",
      pdfNote: "El PDF se abre en nuestra tienda de impresión y se envía por correo tras la compra.",
      alsoIn: "También disponible en",
      related: "También te puede gustar",
      detailsTitle: "Ficha del libro",
      drawings: "Dibujos",
      size: "Tamaño",
      ageLabel: "Edad",
      publisher: "Editorial",
      author: "Autor",
      formatNote: "Los precios los fija Amazon y pueden cambiar.",
      ratingReviews: "valoraciones",
      ratingReviewsOne: "valoración",
      ratingSource: "Leer las opiniones en Amazon",
      ratingAria: "Leer las opiniones de los clientes en Amazon",
    },
    method: {
      title: "Libros hechos para que un niño pueda terminarlos",
      lead:
        "Cada libro que publicamos responde a una sola idea: el niño tiene que lograrlo. Una página que el niño termina es una página que le hace pedir otra mañana.",
      ideaTitle: "La idea detrás de cada libro",
      idea: [
        "Los niños no abandonan el dibujo ni la lectura por falta de interés. Abandonan cuando el resultado no se parece a lo que imaginaban. Un contorno fino que una mano pequeña no puede seguir, un cuento más largo de lo que el niño aguanta escuchando, una lección de dibujo con pasos demasiado grandes para copiar. Todas terminan igual: el libro se cierra.",
        "Por eso diseñamos empezando por el final. Primero preguntamos qué es capaz de hacer ya el niño, y después fijamos el grosor de línea, el número de objetos por página, la duración del cuento y el número de pasos de dibujo justo por debajo de ese límite. Lo que sale es un libro que se termina, y terminarlo es lo que hace volver al niño.",
        "Ricardo llama a esto el enfoque ECL, por emocional, creativo y lingüístico. Los tres crecen juntos, no por turnos. El niño siente algo, lo dibuja, y luego encuentra las palabras, y las palabras profundizan lo que siente. Nuestros cuentos para dormir, libros para colorear, guías de dibujo y ediciones bilingües son la misma idea en cuatro etapas distintas.",
      ],
      ladderTitle: "Qué cambia con la edad",
      ladderLead:
        "La edad de una portada describe el libro, no a tu hijo. Usa esto como mapa y después contrástalo con lo que tu hijo hace de verdad.",
      ladder: [
        {
          age: "1 a 3 años",
          can: "Barre con el crayón en lugar de rellenar. Escucha unos minutos. Nombra cosas familiares.",
          needs: "Contornos gruesos, un objeto grande por página, frases cortas que se repiten, ilustraciones grandes.",
        },
        {
          age: "3 a 5 años",
          can: "Se queda más o menos dentro de la línea. Sigue una secuencia corta de sucesos. Pregunta qué pasa después.",
          needs: "Más temas, varios elementos por página, un cuento de cinco a siete minutos con un problema claro.",
        },
        {
          age: "5 a 7 años",
          can: "Colorea con precisión. Sigue diálogos. Empieza a juzgar su propio dibujo.",
          needs: "Más detalle, cuentos más largos con motivaciones, dibujo dividido en pasos que se pueden copiar.",
        },
        {
          age: "7 a 10 años",
          can: "Trabaja solo durante más rato. Lee por su cuenta. Compara su resultado con el ejemplo.",
          needs: "Dibujo estructurado, cuentos con decisiones reales, un segundo idioma junto a uno conocido.",
        },
      ],
      guidesTitle: "Cómo elegir un libro",
      guidesLead:
        "Respuestas cortas y prácticas a las preguntas que los padres hacen de verdad, y cada una termina en el libro que te daríamos.",
      awardsTitle: "Premios",
      awardsLead: "Reconocimientos a títulos concretos, con el programa, la categoría y el año.",
      reviewsTitle: "Reseñas independientes",
      reviewsLead: "Plataformas editoriales que valoran los libros de forma independiente del editor.",
      retailTitle: "Dónde se venden nuestros libros",
      retailLead:
        "Nuestros títulos están en librerías de cuatro continentes. Si estás fuera de Estados Unidos, alguna de estas te envía.",
      regions: {
        us: "Estados Unidos",
        europe: "Europa y Reino Unido",
        latam: "América Latina",
        africa: "África",
        global: "Todo el mundo",
      },
      standardTitle: "El método completo",
      standardBody:
        "El marco completo, con los grupos de edad, el mapa de habilidades y los parámetros usados para cada tipo de libro, está publicado de forma abierta y puede leerse entero.",
      standardLink: "Leer la metodología completa",
      ageNote:
        "Las edades son un punto de partida, no una regla. Compra según lo que tu hijo hace hoy, no según el número de la portada.",
      guideCheck: "En qué fijarse",
      guidePick: "El libro que elegiríamos",
      guideFaq: "Preguntas que hacen los padres",
      guideRelated: "Sigue leyendo",
      guideBack: "Todas las guías",
      bookAward: "Premiado",
      bookRetail: "También a la venta en",
      bookMethod: "Cómo está construido este libro",
    },
    free: {
      title: "Dibujos gratis para imprimir",
      lead:
        "Elige una página, imprímela y coloréala. Cada página es una página real de uno de nuestros libros, así que nada está peor dibujado por ser gratis.",
      comingSoon:
        "Estamos preparando las primeras páginas. Si quieres un animal o un tema concreto, escríbenos y lo publicamos.",
      howToTitle: "Cómo imprimirlas",
      sheetTitle: "Dibujo de {name} para colorear",
      sheetAlt: "Dibujo de {name} para colorear gratis para imprimir, contornos gruesos, un animal por página, con el nombre en español",
      printLetter: "Imprimir · Carta",
      printA4: "Imprimir · A4",
      faqTitle: "Preguntas que hacen los padres",
      countLabel: "láminas para imprimir",
      bookSheetsTitle: "Algunas páginas de dentro",
      bookSheetsLead:
        "Son páginas reales del libro. Puedes imprimir {n} gratis y comprobar tú mismo el grosor de la línea antes de comprar.",
      bookSheetsCta: "Imprimir {n} láminas gratis",
      rights:
        "Dibujos de Ricardo Demi, editados por Magic of Discoveries LLC. Imprime las copias que quieras para casa, la escuela o la guardería. Por favor no las revendas, no publiques los archivos ni las uses en un libro o producto propio.",
    },
    about: {
      title: "Quiénes somos",
      body: [
        "Hola, somos Ricardo y Maria. Ricardo es educador, investigador y escritor. A Maria le encantan el diseño y el dibujo. Hacemos libros que ayudan a sacar lo que el niño ya lleva dentro, de forma ligera y sin forzar.",
        "Creemos que cada niño tiene un potencial escondido que se puede desarrollar desde muy pronto. Intentamos aportar algo útil y algo alegre, tanto a los niños como a sus padres.",
        "Tenemos un perro muy querido, un cocker spaniel inglés que se llama Rocky y que acabó siendo el protagonista de sus propios libros. Nuestra familia vive en Miami, Florida, y el color y el ritmo de la ciudad alimentan casi todo lo que hacemos.",
      ],
    },
    contact: {
      title: "Contacto",
      lead: "Dudas sobre un libro, pedidos para un colegio o un dibujo que te gustaría que hiciéramos. Escríbenos.",
      email: "Correo",
    },
    footer: { rights: "Todos los derechos reservados", follow: "Síguenos" },
  },

  ru: {
    htmlLang: "ru",
    label: "Русский",
    nav: {
      home: "Главная",
      books: "Книги",
      method: "Метод",
      teachers: "Учителям",
      coloringPages: "Бесплатные раскраски",
      about: "О нас",
      contact: "Контакты",
    },
    home: {
      heroEyebrow: "Раскраски, рисование и книги на ночь",
      heroTitle: "Книги, которые маленький ребенок доводит до конца",
      heroLead:
        "Толстые линии, по которым попадает двухлетний. Сказки, которые успевают закончиться. Рисование, разбитое на четыре шага. Каждая книга сделана так, чтобы у ребенка получилось, потому что именно из-за этого он возвращается к ней завтра.",
      heroCta: "Все книги",
      kidsTitle: "Детям",
      kidsLead:
        "Раскраски, сказки на ночь и пошаговое рисование, от первого карандаша в год до самостоятельного рисунка в восемь.",
      adultsTitle: "Подросткам и взрослым",
      adultsLead:
        "Простые раскраски с толстой линией и крупными формами. Страница, которую успеваешь закончить за один присест.",
      freeTitle: "Бесплатные раскраски для печати",
      freeLead:
        "Отдельные листы, которые можно распечатать дома прямо сейчас. Без регистрации и без оплаты.",
      freeCta: "Смотреть раскраски",
      reviewsTitle: "Что говорят родители",
      reviewTranslated: "Перевод с английского",
      browseAll: "Все книги",
    },
    catalog: {
      title: "Все книги",
      lead: "У каждой книги своя страница: что внутри, кому подходит и где купить.",
      filterAge: "Возраст",
      filterType: "Тип книги",
      all: "Все",
      ages: {
        "1-3": "1-3 года",
        "3-5": "3-5 лет",
        "5-7": "5-7 лет",
        "7-10": "7-10 лет",
        "teens-adults": "Подростки и взрослые",
      },
      types: {
        coloring: "Раскраски",
        drawing: "Пошаговое рисование",
        bedtime: "Сказки на ночь",
        bilingual: "Двуязычные",
      },
      empty: "Пока ничего не подходит под этот выбор.",
    },
    book: {
      video: "Книга в руках",
      videoLead:
        "Пролистывание настоящей книги страница за страницей: видно бумагу, размер и то, как рисунок собирается по шагам.",
      videoPoints: [
        "Снято на столе дома, поэтому бумага и размер настоящие.",
        "Видно, как рисунок вырастает из простой формы в готового персонажа.",
        "Это та же книга, которая приезжает в коробке.",
      ],
      pagesLabel: "Страниц",
      publishedLabel: "Издана",
      priceFrom: "Мягкая обложка на Amazon",
      priceFromHardcover: "Твердая обложка на Amazon",
      whyTitle: "Почему именно эта книга",
      languageLabel: "Язык",
      langEn: "Английский",
      langEs: "Испанский",
      langBoth: "Английский и испанский",
      ageYears: "От {a} до {b} лет",
      topicsTitle: "Найдите то, что любит ваш ребенок",
      topicsLead: "Все темы книги, по группам.",
      topicsAll: "Смотреть все {n} тем",
      topicsCount: "всего {n}",
      reviewsTitle: "Что говорят родители",
      reviewsSource: "Отзывы подтвержденных покупок на Amazon.",
      editorialTitle: "Рецензия",
      editorialSource: "Читать рецензию целиком",
      inside: "Что внутри",
      artwork: "Иллюстрации из книги",
      forWhom: "Кому подходит",
      faq: "Вопросы родителей",
      buyPaperback: "Купить в мягкой обложке на Amazon",
      buyHardcover: "Купить в твердой обложке на Amazon",
      buyKindle: "Читать на Kindle",
      buyPdf: "Скачать PDF для печати",
      pdfNote: "PDF открывается в нашем магазине печати и приходит на почту после оплаты.",
      alsoIn: "Также есть на",
      related: "Может понравиться",
      detailsTitle: "О книге",
      drawings: "Рисунков",
      size: "Размер",
      ageLabel: "Возраст",
      publisher: "Издательство",
      author: "Автор",
      formatNote: "Цены устанавливает Amazon, они могут меняться.",
      ratingReviews: "оценок",
      ratingReviewsOne: "оценка",
      ratingSource: "Читать отзывы на Amazon",
      ratingAria: "Читать отзывы покупателей на Amazon",
    },
    method: {
      title: "Книги, которые ребенок может закончить",
      lead:
        "Каждая наша книга сделана по одному принципу: у ребенка должно получиться. Законченная страница это та, после которой ребенок просит следующую.",
      ideaTitle: "Идея, на которой построены все книги",
      idea: [
        "Дети бросают рисовать и слушать не от отсутствия интереса. Они бросают, когда результат не совпадает с тем, что они себе представляли. Тонкий контур, в который маленькая рука не попадает. Сказка длиннее, чем ребенок может слушать. Шаг в рисовании, слишком большой, чтобы повторить. Итог всегда один: книга закрывается.",
        "Поэтому мы проектируем от конца. Сначала смотрим, что ребенок уже умеет, и только потом задаем толщину линии, число предметов на странице, длину сказки и количество шагов в рисунке, чуть ниже его предела. Получается книга, которую доводят до конца, а именно это возвращает ребенка назавтра.",
        "Рикардо называет это подходом ECL: эмоции, творчество, язык. Они растут не по очереди, а вместе. Ребенок что то чувствует, рисует это, потом находит слова, и слова углубляют чувство. Сказки на ночь, раскраски, пошаговое рисование и двуязычные издания это одна и та же идея на четырех стадиях.",
      ],
      ladderTitle: "Что меняется с возрастом",
      ladderLead:
        "Возраст на обложке описывает книгу, а не вашего ребенка. Пользуйтесь этим как картой и сверяйте с тем, что ребенок делает на самом деле.",
      ladder: [
        {
          age: "1-3 года",
          can: "Мажет карандашом, а не закрашивает. Слушает несколько минут. Называет знакомые предметы.",
          needs: "Толстый контур, один крупный предмет на странице, короткие повторяющиеся фразы, большие картинки.",
        },
        {
          age: "3-5 лет",
          can: "Примерно попадает в контур. Следит за короткой цепочкой событий. Спрашивает, что дальше.",
          needs: "Больше тем, несколько предметов на странице, сказка на пять семь минут с одной понятной задачей.",
        },
        {
          age: "5-7 лет",
          can: "Закрашивает точно. Понимает диалог. Начинает оценивать свой рисунок.",
          needs: "Больше деталей, длиннее истории с мотивами, рисование, разбитое на повторяемые шаги.",
        },
        {
          age: "7-10 лет",
          can: "Работает самостоятельно дольше. Читает сам. Сравнивает свой результат с образцом.",
          needs: "Структурное рисование, истории с настоящим выбором, второй язык рядом со знакомым.",
        },
      ],
      guidesTitle: "Как выбрать книгу",
      guidesLead:
        "Короткие практические ответы на вопросы, которые родители задают на самом деле. Каждый заканчивается одной книгой.",
      awardsTitle: "Награды",
      awardsLead: "Награды отдельным изданиям, с названием премии, категорией и годом.",
      reviewsTitle: "Независимые рецензии",
      reviewsLead: "Рецензионные площадки, которые оценивают книги независимо от издательства.",
      retailTitle: "Где продаются наши книги",
      retailLead:
        "Наши издания продаются на четырех континентах. Если вы за пределами США, одна из этих площадок доставит.",
      regions: {
        us: "США",
        europe: "Европа и Великобритания",
        latam: "Латинская Америка",
        africa: "Африка",
        global: "Весь мир",
      },
      standardTitle: "Методика целиком",
      standardBody:
        "Полное описание системы, с возрастными группами, картой навыков и параметрами для каждого типа книги, опубликовано открыто и доступно целиком.",
      standardLink: "Читать методику полностью",
      ageNote:
        "Возраст это отправная точка, а не правило. Покупайте по тому, что ребенок умеет сегодня, а не по цифре на обложке.",
      guideCheck: "На что смотреть",
      guidePick: "Книга, которую мы бы выбрали",
      guideFaq: "Вопросы родителей",
      guideRelated: "Читать дальше",
      guideBack: "Все руководства",
      bookAward: "Награды",
      bookRetail: "Также продается в",
      bookMethod: "Как построена эта книга",
    },
    free: {
      title: "Бесплатные раскраски для печати",
      lead: "Выберите лист, распечатайте, раскрасьте.",
      comingSoon: "Первые листы готовятся.",
      howToTitle: "Как печатать",
      sheetTitle: "Раскраска {name}",
      sheetAlt: "Бесплатная раскраска {name} для печати, толстый контур, одно животное на листе",
      printLetter: "Печать · Letter",
      printA4: "Печать · A4",
      faqTitle: "Вопросы родителей",
      countLabel: "листов для печати",
      bookSheetsTitle: "Несколько страниц изнутри",
      bookSheetsLead:
        "Это настоящие страницы книги. {n} можно распечатать бесплатно и своими глазами оценить толщину линии до покупки.",
      bookSheetsCta: "Распечатать {n} листов бесплатно",
      rights:
        "Рисунки Рикардо Деми, издательство Magic of Discoveries LLC. Печатайте сколько угодно для дома, школы и детского сада. Пожалуйста, не перепродавайте их, не выкладывайте файлы у себя и не используйте в своей книге или товаре.",
    },
    about: {
      title: "О нас",
      body: [
        "Мы Рикардо и Мария. Рикардо педагог, исследователь и писатель. Мария любит дизайн и рисунок. Мы делаем книги, которые помогают раскрыть то, что в ребенке уже есть, легко и без нажима.",
        "Мы верим, что у каждого ребенка есть скрытый потенциал, который можно развивать с самого раннего возраста.",
        "У нас есть любимый пес, английский кокер-спаниель Рокки, который стал героем собственных книг. Наша семья живет в солнечном Майами.",
      ],
    },
    contact: {
      title: "Контакты",
      lead: "Вопросы о книге, заказ для школы или рисунок, который вы хотели бы получить. Напишите нам.",
      email: "Почта",
    },
    footer: { rights: "Все права защищены", follow: "Мы здесь" },
  },
};

export const uiLangs: UiLang[] = ["en", "es", "ru"];

/** Языки, которые сейчас показываются публично. Русский включим, когда будут русские книги. */
export const activeLangs: UiLang[] = ["en", "es"];
