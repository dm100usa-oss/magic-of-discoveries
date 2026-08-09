import type { UiLang } from "./books";

export interface Dictionary {
  htmlLang: string;
  label: string;
  nav: {
    home: string;
    books: string;
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
    inside: string;
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
  };
  free: {
    title: string;
    lead: string;
    comingSoon: string;
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
      coloringPages: "Free coloring pages",
      about: "About us",
      contact: "Contact",
    },
    home: {
      heroEyebrow: "Coloring, drawing and bedtime books",
      heroTitle: "Books that a small child can finish",
      heroLead:
        "Thick outlines a two year old can follow. Bedtime stories short enough to reach the end. Drawing broken into four steps. Every book is made so the child succeeds at it, because that is what makes them come back tomorrow.",
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
      inside: "What is inside",
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
    },
    free: {
      title: "Free coloring pages to print",
      lead:
        "Pick a page, print it, colour it. Every page here is a real page from one of our books, so nothing is drawn worse because it is free.",
      comingSoon:
        "The first pages are being prepared. If you want one particular animal or theme, write to us and we will put it up.",
    },
    about: {
      title: "About us",
      body: [
        "Hi, we are Ricardo and Maria. Ricardo is an educator, researcher and writer. Maria loves design and drawing. We make books that help unlock what is already in a child, in a light and unforced way.",
        "We believe every child has hidden potential that can be developed from an early age. We do our best to bring something useful and something joyful to both children and their parents.",
        "We have a beloved dog, an English Cocker Spaniel called Rocky, who became the hero of his own books. Our family lives in sunny Miami, Florida, and the city's colour and pace feed most of what we make.",
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
      coloringPages: "Dibujos gratis",
      about: "Quiénes somos",
      contact: "Contacto",
    },
    home: {
      heroEyebrow: "Libros para colorear, dibujar y para dormir",
      heroTitle: "Libros que un niño pequeño sí termina",
      heroLead:
        "Líneas gruesas que un niño de dos años puede seguir. Cuentos cortos que llegan al final. Dibujo dividido en cuatro pasos. Cada libro está hecho para que el niño lo consiga, porque eso es lo que hace que mañana vuelva a pedirlo.",
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
      inside: "Qué contiene",
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
    },
    free: {
      title: "Dibujos gratis para imprimir",
      lead:
        "Elige una página, imprímela y coloréala. Cada página es una página real de uno de nuestros libros, así que nada está peor dibujado por ser gratis.",
      comingSoon:
        "Estamos preparando las primeras páginas. Si quieres un animal o un tema concreto, escríbenos y lo publicamos.",
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
      inside: "Что внутри",
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
    },
    free: {
      title: "Бесплатные раскраски для печати",
      lead: "Выберите лист, распечатайте, раскрасьте.",
      comingSoon: "Первые листы готовятся.",
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
