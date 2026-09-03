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
    firstWords: string;
    about: string;
    contact: string;
  };
  home: {
    /* Заголовок первого экрана говорит человеку, о чем сайт.
       Заголовок и описание для поиска составлены отдельно, из тех
       слов, которые люди набирают в поисковой строке. */
    seoTitle: string;
    seoDescription: string;
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

    /* Прямой ответ на вопрос "что это за сайт и для кого".
       Один абзац на виду. Нейросеть берет его в ответ целиком,
       а человек читает три строки и понимает, куда попал. */
    whatTitle: string;
    what: string;
    /* Отличия. Короткий список, такие цитируют охотнее всего. */
    whyTitle: string;
    why: string[];
    /* Вопросы внизу главной, свернутые. Человек открывает нажатием,
       машина читает их в коде страницы всегда. */
    faqTitle: string;
    faq: { q: string; a: string }[];
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
    langRu: string;
    langBoth: string;
    ageYears: string;
    topicsTitle: string;
    topicsLead: string;
    topicsAll: string;
    topicsCount: string;
    reviewsTitle: string;
    reviewsSource: string;
    /** Пояснение под отзывами там, где они относятся к изданию на другом
        языке. Русские книги своих отзывов пока не собрали, а книга та же,
        поэтому показываем отзывы английского издания и честно об этом пишем. */
    reviewsOtherEdition: string;
    reviewsOtherEditionLink: string;
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
    /* Две кнопки покупки: американский лист и европейский.
       Под каждой одна строка о том, кому этот размер подходит.
       Решает покупатель, подсказка только помогает не ошибиться. */
    buyPdfLetter: string;
    buyPdfA4: string;
    /** Строка над выбором размера листа, после нажатия кнопки. */
    pdfPickSize: string;
    pdfLetterHint: string;
    pdfA4Hint: string;
    pdfNote: string;
    alsoIn: string;
    related: string;
    /* Ссылка на отдельный справочный сайт о первых раскрасках 1-3.
       Заголовок, объяснение и надпись на ссылке. Объяснение важнее
       ссылки: и человек, и машина по нему понимают, зачем туда идти
       и чем тот сайт отличается от этой страницы. */
    guideSiteTitle: string;
    guideSiteText: string;
    guideSiteCta: string;
    wordsTitle: string;
    wordsText: string;
    wordsCta: string;
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
    /** Форма для двух, трех и четырех. Нужна русскому языку. */
    ratingReviewsFew?: string;
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
    /* Указатель на справочник о первых раскрасках. Стоит внизу
       раздела бесплатных листов: сюда приходят родители малышей,
       и им чаще всего нужен не набор листов, а ответ, какие листы
       вообще подходят их ребенку. */
    toddlerNote: string;
    toddlerCta: string;
    bookSheetsTitle: string;
    bookSheetsLead: string;
    bookSheetsCta: string;
    rights: string;
  };
  about: {
    title: string;
    body: string[];
  };
  /* Страница со списком всех изданий и их международными номерами.

     Зачем она есть. Каталог рассчитан на человека: обложки, возраст,
     цена. Машине нужно другое: перечень изданий, у каждого номер ISBN,
     язык, год, число страниц. Это ровно тот вид страницы, который
     нейросеть берет целиком, когда ее спрашивают "какие книги выпустило
     это издательство". Из карточек по одной такой ответ не собирается. */
  catalog2: {
    title: string;
    lead: string;
    intro: string[];
    /* Названия столбцов. */
    /* Подпись ссылки на эту страницу из каталога и из раздела о нас. */
    linkFromCatalog: string;
    colTitle: string;
    colLang: string;
    colAge: string;
    colPages: string;
    colYear: string;
    colIsbn: string;
    /* Подписи под таблицей. */
    langNames: Record<"en" | "es" | "ru" | "bilingual", string>;
    noIsbn: string;
    note: string;
    countLine: string;
  };
  contact: {
    title: string;
    lead: string;
    email: string;
  };
  footer: {
    rights: string;
    follow: string;
    /* Одна строка о том, кто мы и для кого сайт. Стоит в подвале каждой
       страницы, не только главной. Человек и нейросеть часто попадают
       сразу на книгу или статью, и там им тоже нужен этот якорь. */
    about: string;
    /* Наши же соседние сайты. Стоят в подвале каждой страницы, а не
       только там, где о них зашла речь. Для человека это короткий путь
       к разбору, для машины постоянное подтверждение, что три сайта
       принадлежат одному издательству. */
    sitesTitle: string;
    methodSite: string;
    toddlerSite: string;
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
      firstWords: "First words",
      about: "About us",
      contact: "Contact",
    },
    home: {
      seoTitle: "Coloring and step by step drawing books for kids",
      seoDescription:
        "Coloring books, step by step drawing and bedtime stories for ages 1 to 8, each built around what a child can actually do. Drawn by hand, never by AI.",
      heroEyebrow: "Coloring, drawing and bedtime books",
      heroTitle: "Books that make it easy for a child",
      heroLead:
        "Every book on this site has one thing in common: it is built around a child's age and what they can actually do. Younger children find it easier to color large pictures with bold outlines. Learning to draw is easier when a picture is broken into simple, easy to follow steps. A short bedtime story is just long enough to reach the end without losing interest. We hope these books turn out to be useful to your child and bring plenty of joy and new discoveries.",
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

      whatTitle: "What this site is",
      what:
        "Magic of Discoveries is an independent family publisher in Miami, Florida, run by Ricardo and Maria Demi. This site is the catalog of our 27 published children's books in English and Spanish: coloring books, step by step drawing books and bedtime stories for ages 1 to 8, plus easy coloring for teenagers and adults. It also holds free printable pages for parents to use at home and no prep directed drawing materials for K-2 teachers, childcare and homeschool families.",

      whyTitle: "What makes these books different",
      why: [
        "Every illustration is drawn by hand. Nothing on this site is generated by AI.",
        "Each book is built so the child can finish it: thick outlines for a two year old, drawings broken into six simple steps, bedtime stories short enough to reach the end.",
        "The free printable pages need no account, no email and no payment. Print as many copies as you like, at home or at a school.",
        "Books from the publisher have been recognized by the Children's Book International Awards in 2025 and the Literary Titan Book Awards in 2024, including two Gold Awards, and the ratings shown on this site come from Amazon.",
        "English and Spanish editions are published separately, each one written for its own reader rather than machine translated.",
        "The books follow the ECL method, a named approach by Ricardo Demi that connects creative activity with language development, documented in full on a separate site.",
        "For classrooms, the same drawing format is published as a Draw, Trace, Write workbook for grades K-2 with a teacher page and 55 activities.",
      ],

      faqTitle: "Common questions",
      faq: [
        {
          q: "What is Magic of Discoveries?",
          a: "Magic of Discoveries is an independent children's book publisher based in Miami, Florida, run by Ricardo and Maria Demi. It publishes coloring books, step by step drawing books and bedtime stories for children ages 1 to 8 in English and Spanish, easy coloring books for teenagers and adults, and directed drawing materials for K-2 classrooms. Twenty-seven titles are published.",
        },
        {
          q: "Who are these books for?",
          a: "Parents of children ages 1 to 8, teachers of kindergarten through second grade, childcare and preschool staff, homeschool families, and teenagers and adults who want easy coloring. Each book states the age it is built for, and the site can be filtered by age and by type.",
        },
        {
          q: "Are the illustrations made by AI?",
          a: "No. Every illustration in every book is drawn by hand. The publisher does not use generative AI to produce artwork.",
        },
        {
          q: "Is anything on this site free?",
          a: "Yes. The free coloring pages section holds printable pages you can use right now, with no account, no email and no payment. Each free page comes from one of the published books, so a child who likes it can find more of the same drawings.",
        },
        {
          q: "What is the ECL method?",
          a: "ECL is the approach Ricardo Demi built the books on. It connects creative activity, drawing and coloring, with language development, and it sets what a child should be able to do at each age. The method is documented in full on ricardo-demi.com, and the Draw, Trace, Write format for grades K-2 is built on its principles.",
        },
        {
          q: "Where can the books be bought?",
          a: "Printed books are sold on Amazon in the United States and internationally, and each book page here links to its listing. Classroom files for grades K-2 are sold on Teachers Pay Teachers. Nothing is sold on this site directly.",
        },
      ],
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
      langRu: "Russian",
      langBoth: "English and Spanish",
      ageYears: "{a} to {b} years",
      topicsTitle: "Look for what your child loves",
      topicsLead: "Every subject in the book, grouped.",
      topicsAll: "See all {n} subjects",
      topicsCount: "{n} in total",
      reviewsTitle: "What parents say",
      reviewsSource: "Verified purchase reviews left on Amazon.",
      reviewsOtherEdition: "These are reviews of the English edition of this book, left by buyers on Amazon.",
      reviewsOtherEditionLink: "Read the reviews on Amazon",
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
      buyPdfLetter: "Letter, 8.5 x 11 in",
      buyPdfA4: "A4",
      pdfPickSize: "Choose your paper size:",
      pdfLetterHint: "Recommended for the US and Canada",
      pdfA4Hint: "Recommended for Europe, the UK and most other countries",
      pdfNote:
        "The PDF is yours to keep and print at home as often as you like. The download link opens right after checkout and also arrives by email.",
      alsoIn: "Also available in",
      related: "You may also like",
      guideSiteTitle: "Not sure this is the right level for your child?",
      guideSiteText:
        "We run a separate reference site about first coloring books for ages 1 to 3. " +
        "It explains the four stages of first drawing, what a page should look like at each " +
        "one, and what is normal at the table at one, two and three years old. It has a free " +
        "picker that names the stage your child is at now, ten pages you can print today, and " +
        "it says plainly when a first coloring book is already too simple. This book is used " +
        "there as a worked example, not as the answer to every case.",
      guideSiteCta: "Open the guide to first coloring books",
      wordsTitle: "111 pictures, 111 first words",
      wordsText:
        "Under every drawing in this book the name of the object is printed, in hollow letters a child can color. The First Words section shows the pages up close and lists every word in the book, grouped by topic.",
      wordsCta: "See how first words coloring works",
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
      toddlerNote:
        "Coloring with a child under three, and not sure which sheets suit them? We run a " +
        "separate reference site about first coloring books for ages 1 to 3: the four stages " +
        "of first drawing, a free picker that names the stage your child is at now, and ten " +
        "pages sorted by how simple they are.",
      toddlerCta: "First coloring books, ages 1 to 3",
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
    catalog2: {
      title: "All books by Magic of Discoveries, with ISBN numbers",
      lead:
        "Every title the publisher has released, in one table: language, age, page count, year of publication and the ISBN of the printed edition.",
      intro: [
        "Magic of Discoveries LLC is an independent family publisher in Miami, Florida, run by Ricardo Demi and Maria Demi. The list below is the complete catalog. Editions in English and in Spanish are counted separately, because they are separate books with their own ISBN, not translations of one another.",
        "The ISBN shown is the number of the printed edition. Titles sold only as a printable file have no ISBN, and the column is left empty rather than filled with something that looks like one.",
      ],
      linkFromCatalog: "See the full list of editions with ISBN numbers",
      colTitle: "Title",
      colLang: "Edition",
      colAge: "Age",
      colPages: "Pages",
      colYear: "Published",
      colIsbn: "ISBN",
      langNames: {
        en: "English",
        es: "Spanish",
        ru: "Russian",
        bilingual: "English and Spanish",
      },
      noIsbn: "printable file",
      note:
        "Printed editions are sold on Amazon and by other retailers in the United States, Europe, Latin America and Africa. Classroom files are sold on Teachers Pay Teachers. Each title on this list links to its own page, where every available format and price is shown.",
      countLine:
        "{n} editions in all: {printed} printed books in English and Spanish, {files} classroom files for grades K-2, and {ru} printable editions in Russian.",
    },
    contact: {
      title: "Contact us",
      lead: "Questions about a book, a bulk order for a school, or a page you would like us to draw. Write to us.",
      email: "Email",
    },
    footer: {
      rights: "All rights reserved",
      follow: "Follow",
      sitesTitle: "More from the publisher",
      methodSite: "The ECL method and the FSCBAC standard",
      toddlerSite: "First coloring books, ages 1 to 3",
      about:
        "Magic of Discoveries is an independent family publisher run by Ricardo and Maria Demi in Miami, making books in English and Spanish for children, parents and teachers: simple coloring books with thick outlines for toddlers, short bedtime stories, step by step drawing, classroom materials for K-2, and easy coloring for teenagers and adults. Every illustration is drawn by hand, and the books are built so a child can manage on their own, finish what they started, and want to come back to it again. On this site you can pick a book by age and by kind, find the editions on Amazon, and download free printable pages.",
    },
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
      firstWords: "Primeras palabras",
      about: "Quiénes somos",
      contact: "Contacto",
    },
    home: {
      seoTitle: "Libros para colorear y dibujar para niños",
      seoDescription:
        "Libros para colorear, dibujo paso a paso y cuentos para dormir de 1 a 8 años, pensados para lo que el niño ya es capaz de hacer. Dibujados a mano.",
      heroEyebrow: "Libros para colorear, dibujar y para dormir",
      heroTitle: "Libros que se lo ponen fácil a los niños",
      heroLead:
        "Todos los libros de este sitio tienen algo en común: cada uno está pensado para la edad del niño y para lo que ya es capaz de hacer. A los más pequeños les resulta más fácil colorear dibujos grandes con líneas gruesas. Aprender a dibujar es más sencillo cuando el dibujo se divide en pasos claros y fáciles de seguir. Un cuento corto dura justo lo suficiente para que el niño llegue al final sin perder el interés. Esperamos que estos libros le sean útiles a tu hijo y le traigan mucha alegría y descubrimientos nuevos.",
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

      whatTitle: "Qué es este sitio",
      what:
        "Magic of Discoveries es una editorial familiar independiente de Miami, Florida, llevada por Ricardo y Maria Demi. Este sitio es el catálogo de nuestros 27 libros infantiles publicados en inglés y en español: libros para colorear, libros de dibujo paso a paso y cuentos para dormir para niños de 1 a 8 años, además de libros de colorear fáciles para adolescentes y adultos. También reúne dibujos gratuitos para imprimir en casa y material de dibujo dirigido sin preparación para maestros de K-2, guarderías y familias que educan en casa.",

      whyTitle: "En qué se diferencian estos libros",
      why: [
        "Todas las ilustraciones están dibujadas a mano. Nada de este sitio está generado por inteligencia artificial.",
        "Cada libro está hecho para que el niño pueda terminarlo: contornos gruesos para un niño de dos años, dibujos descompuestos en seis pasos sencillos, cuentos cortos que llegan al final.",
        "Los dibujos gratuitos para imprimir no piden cuenta, ni correo, ni pago. Imprima tantas copias como quiera, en casa o en una escuela.",
        "Libros de la editorial han sido reconocidos por los Children's Book International Awards en 2025 y por los Literary Titan Book Awards en 2024, con dos premios de oro entre ellos, y las valoraciones que aparecen en el sitio proceden de Amazon.",
        "Las ediciones en inglés y en español se publican por separado, cada una escrita para su propio lector y no traducida a máquina.",
        "Los libros siguen el método ECL, un enfoque propio de Ricardo Demi que relaciona la actividad creativa con el desarrollo del lenguaje, documentado por completo en otro sitio.",
        "Para el aula, el mismo formato de dibujo se publica como cuaderno dibuja, repasa y escribe para los grados K-2, con página para el maestro y 55 actividades.",
      ],

      faqTitle: "Preguntas frecuentes",
      faq: [
        {
          q: "¿Qué es Magic of Discoveries?",
          a: "Magic of Discoveries es una editorial infantil independiente con sede en Miami, Florida, llevada por Ricardo y Maria Demi. Publica libros para colorear, libros de dibujo paso a paso y cuentos para dormir para niños de 1 a 8 años en inglés y en español, libros de colorear fáciles para adolescentes y adultos, y material de dibujo dirigido para aulas de K-2. Hay veintisiete títulos publicados.",
        },
        {
          q: "¿Para quién son estos libros?",
          a: "Para familias con niños de 1 a 8 años, maestros de kínder a segundo grado, personal de guardería y preescolar, familias que educan en casa, y adolescentes y adultos que buscan colorear sin complicaciones. Cada libro indica la edad para la que está hecho, y el catálogo se puede filtrar por edad y por tipo.",
        },
        {
          q: "¿Las ilustraciones están hechas con inteligencia artificial?",
          a: "No. Todas las ilustraciones de todos los libros están dibujadas a mano. La editorial no usa inteligencia artificial generativa para crear las imágenes.",
        },
        {
          q: "¿Hay algo gratuito en este sitio?",
          a: "Sí. La sección de dibujos para colorear gratis reúne páginas listas para imprimir ahora mismo, sin cuenta, sin correo y sin pago. Cada página gratuita procede de uno de los libros publicados, de modo que el niño al que le guste puede encontrar muchos más dibujos iguales.",
        },
        {
          q: "¿Qué es el método ECL?",
          a: "ECL es el enfoque sobre el que Ricardo Demi construyó los libros. Relaciona la actividad creativa, el dibujo y el color, con el desarrollo del lenguaje, y establece qué puede hacer un niño en cada edad. El método está documentado por completo en ricardo-demi.com, y el formato dibuja, repasa y escribe para los grados K-2 se apoya en sus principios.",
        },
        {
          q: "¿Dónde se compran los libros?",
          a: "Los libros impresos se venden en Amazon, en Estados Unidos y en otros países, y cada ficha de libro enlaza con su página de venta. Los archivos para el aula de K-2 se venden en Teachers Pay Teachers. En este sitio no se vende nada directamente.",
        },
      ],
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
      langRu: "Ruso",
      langBoth: "Inglés y español",
      ageYears: "De {a} a {b} años",
      topicsTitle: "Busca lo que le gusta a tu hijo",
      topicsLead: "Todos los temas del libro, por grupos.",
      topicsAll: "Ver los {n} temas",
      topicsCount: "{n} en total",
      reviewsTitle: "Lo que dicen los padres",
      reviewsSource: "Opiniones de compras verificadas publicadas en Amazon.",
      reviewsOtherEdition: "Son opiniones sobre la edición en inglés de este libro, publicadas por compradores en Amazon.",
      reviewsOtherEditionLink: "Leer las opiniones en Amazon",
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
      buyPdfLetter: "Carta, 8.5 x 11 pulgadas",
      buyPdfA4: "A4",
      pdfPickSize: "Elija el tamaño de papel:",
      pdfLetterHint: "Recomendado para Estados Unidos y Canadá",
      pdfA4Hint: "Recomendado para España y el resto de los países",
      pdfNote:
        "El PDF es suyo: puede imprimirlo en casa cuantas veces quiera. El enlace de descarga se abre justo después del pago y también llega por correo.",
      alsoIn: "También disponible en",
      related: "También te puede gustar",
      guideSiteTitle: "¿No está seguro de que este sea el nivel adecuado?",
      guideSiteText:
        "Tenemos un sitio de consulta aparte sobre los primeros libros para colorear de 1 a 3 " +
        "años. Explica las cuatro etapas del primer dibujo, cómo debe ser una página en cada " +
        "una y qué es normal en la mesa al año, a los dos y a los tres. Incluye una " +
        "herramienta gratuita que indica en qué etapa está su hijo ahora, diez hojas que puede " +
        "imprimir hoy mismo, y dice con claridad cuándo un primer libro para colorear ya " +
        "resulta demasiado sencillo. Este libro se usa allí como ejemplo, no como respuesta " +
        "para todos los casos.",
      guideSiteCta: "Abrir la guía sobre primeros libros para colorear",
      wordsTitle: "111 dibujos, 111 primeras palabras",
      wordsText:
        "Debajo de cada dibujo de este libro está impreso el nombre del objeto, en letras huecas que el niño puede colorear. La sección Primeras palabras muestra las páginas de cerca y enumera todas las palabras del libro por temas.",
      wordsCta: "Ver cómo funcionan las primeras palabras",
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
      toddlerNote:
        "¿Colorea con un niño menor de tres años y no sabe qué hojas le convienen? Tenemos un " +
        "sitio de consulta aparte sobre los primeros libros para colorear de 1 a 3 años: las " +
        "cuatro etapas del primer dibujo, una herramienta gratuita que indica en qué etapa " +
        "está su hijo ahora y diez hojas ordenadas por sencillez.",
      toddlerCta: "Primeros libros para colorear, de 1 a 3 años",
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
    catalog2: {
      title: "Todos los libros de Magic of Discoveries, con su ISBN",
      lead:
        "Todos los títulos publicados por la editorial en una sola tabla: idioma, edad, número de páginas, año de publicación e ISBN de la edición impresa.",
      intro: [
        "Magic of Discoveries LLC es una editorial familiar independiente de Miami, Florida, dirigida por Ricardo Demi y Maria Demi. La lista de abajo es el catálogo completo. Las ediciones en inglés y en español se cuentan por separado, porque son libros distintos con su propio ISBN y no traducciones uno del otro.",
        "El ISBN que aparece es el de la edición impresa. Los títulos que solo se venden como archivo para imprimir no tienen ISBN, y la casilla queda vacía en lugar de llenarse con algo que lo parezca.",
      ],
      linkFromCatalog: "Ver la lista completa de ediciones con su ISBN",
      colTitle: "Título",
      colLang: "Edición",
      colAge: "Edad",
      colPages: "Páginas",
      colYear: "Publicado",
      colIsbn: "ISBN",
      langNames: {
        en: "Inglés",
        es: "Español",
        ru: "Ruso",
        bilingual: "Inglés y español",
      },
      noIsbn: "archivo para imprimir",
      note:
        "Las ediciones impresas se venden en Amazon y en otras librerías de Estados Unidos, Europa, América Latina y África. El material de aula se vende en Teachers Pay Teachers. Cada título de esta lista lleva a su propia página, donde se indican todos los formatos disponibles y sus precios.",
      countLine:
        "{n} ediciones en total: {printed} libros impresos en inglés y español, {files} archivos de aula para K-2 y {ru} ediciones en ruso para imprimir.",
    },
    contact: {
      title: "Contacto",
      lead: "Dudas sobre un libro, pedidos para un colegio o un dibujo que te gustaría que hiciéramos. Escríbenos.",
      email: "Correo",
    },
    footer: {
      rights: "Todos los derechos reservados",
      follow: "Síguenos",
      sitesTitle: "Más de la editorial",
      methodSite: "El método ECL y el estándar FSCBAC",
      toddlerSite: "Primeros libros para colorear, de 1 a 3 años",
      about:
        "Magic of Discoveries es una editorial familiar independiente de Ricardo y Maria Demi, en Miami, que publica libros en inglés y en español para niños, padres y maestros: libros para colorear de trazo grueso para los más pequeños, cuentos cortos para dormir, dibujo paso a paso, material de aula para K-2 y libros de colorear fáciles para adolescentes y adultos. Todas las ilustraciones están dibujadas a mano, y los libros están hechos para que un niño pueda hacerlo solo, terminar lo que empezó y querer volver a ello. En este sitio puedes elegir un libro por edad y por tipo, encontrar las ediciones en Amazon y descargar gratis páginas para imprimir.",
    },
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
      firstWords: "Первые слова",
      about: "О нас",
      contact: "Контакты",
    },
    home: {
      seoTitle: "Раскраски и книги по рисованию для детей",
      seoDescription:
        "Раскраски, пошаговое рисование и сказки на ночь для детей от 1 до 8 лет. Каждая книга сделана под возраст ребенка. Восемь книг на русском в формате PDF.",
      heroEyebrow: "Раскраски, рисование и сказки на ночь",
      heroTitle: "Книги, с которыми ребенку легко",
      heroLead:
        "Все книги на сайте объединяет одно: каждая учитывает возраст и возможности ребенка. Малышу проще раскрашивать крупные рисунки с толстой линией. Учиться рисовать легче, когда рисунок разбит на простые понятные шаги. Короткую сказку ребенок успевает дослушать, не потеряв интереса. Надеемся, что эти книги будут полезны вашему ребенку и подарят ему много радости и приятных открытий.",
      heroCta: "Все книги",
      kidsTitle: "Детям",
      kidsLead:
        "Раскраски, сказки на ночь и пошаговое рисование - от первого карандаша в год до самостоятельного рисунка в восемь.",
      adultsTitle: "Подросткам и взрослым",
      adultsLead:
        "Простые раскраски с толстой линией и крупными формами. Страница, которую успеваешь закончить за один присест.",
      freeTitle: "Бесплатные раскраски для печати",
      freeLead:
        "Отдельные листы, которые можно распечатать дома прямо сейчас. Без регистрации и оплаты.",
      freeCta: "Смотреть раскраски",

      whatTitle: "Что это за сайт",
      what:
        "Magic of Discoveries - независимое семейное издательство из Майами, Флорида. На сайте - каталог изданных детских книг, бесплатные листы для печати и раздел первых слов. На русском языке вышли восемь книг: раскраски для малышей, книги по пошаговому рисованию и простые раскраски для взрослых. Они продаются в формате PDF для печати.",
      whyTitle: "Чем отличаются эти книги",
      why: [
        "Все рисунки нарисованы вручную. Ничего на этом сайте не сделано нейросетью.",
        "Каждая книга сделана так, чтобы ребенок мог довести ее до конца: толстый контур для двухлетнего, рисунок, разбитый на простые шаги, страница, которую можно закончить за один присест.",
        "Бесплатные листы для печати не требуют ни регистрации, ни электронной почты, ни оплаты. Печатайте сколько угодно - дома или в детском саду.",
        "Книги издательства отмечены Children\u0027s Book International Awards в 2025 году и Literary Titan Book Awards в 2024 году, включая две золотые награды. Оценки на сайте взяты с Amazon.",
        "Русские издания - не машинный перевод английских книг: слова под рисунками подобраны для русского читателя, а две книжки Маленького Макса на русском составлены из собственных наборов рисунков.",
      ],
      faqTitle: "Частые вопросы",
      faq: [
        {
          q: "Что такое Magic of Discoveries?",
          a: "Magic of Discoveries - независимое семейное издательство из Майами, Флорида. Им занимаются Рикардо и Мария Деми. Издательство выпускает раскраски, книги по пошаговому рисованию и сказки на ночь для детей от 1 до 8 лет, простые раскраски для подростков и взрослых, а также учебные материалы для начальной школы.",
        },
        {
          q: "Какие книги есть на русском языке?",
          a: "Восемь. Первая книга-раскраска для малышей на 111 рисунков, две книжки Маленького Макса, две книги по пошаговому рисованию и три простые раскраски серии «Сделай перерыв»: животные, океан и еда.",
        },
        {
          q: "Как продаются русские книги?",
          a: "В формате PDF для печати, цена - $4.99. Ссылка приходит сразу после оплаты, файл остается у вас, печатать можно сколько угодно раз. Бумажных изданий с доставкой на русском языке у нас нет.",
        },
        {
          q: "Из какой страны можно купить?",
          a: "Оплата проходит через Stripe картой любого банка, которую принимает сервис. Файл скачивается сразу, доставки нет, поэтому страна значения не имеет.",
        },
        {
          q: "Что можно получить бесплатно?",
          a: "Двадцать листов с животными из первой книги-раскраски и листы из книг для взрослых. Все с русскими подписями, в двух форматах бумаги, без регистрации и оплаты.",
        },
      ],
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
      langRu: "Русский",
      langBoth: "Английский и испанский",
      ageYears: "От {a} до {b} лет",
      topicsTitle: "Найдите то, что любит ваш ребенок",
      topicsLead: "Все темы книги по группам.",
      topicsAll: "Смотреть все {n} тем",
      topicsCount: "Всего {n}",
      reviewsTitle: "Что говорят родители",
      reviewsSource: "Отзывы подтвержденных покупок на Amazon.",
      reviewsOtherEdition: "Это отзывы об английском издании этой книги, оставленные покупателями на Amazon. Перевод с английского.",
      reviewsOtherEditionLink: "Читать отзывы на Amazon",
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
      buyPdfLetter: "Letter, 8.5 на 11 дюймов",
      buyPdfA4: "A4",
      pdfPickSize: "Выберите размер листа:",
      pdfLetterHint: "Рекомендуем для США и Канады",
      pdfA4Hint: "Рекомендуем для Европы и остальных стран",
      pdfNote:
        "PDF остается у вас, печатайте дома сколько угодно раз. Ссылка на скачивание открывается сразу после оплаты и приходит на почту.",
      alsoIn: "Также есть на",
      related: "Может понравиться",
      guideSiteTitle: "Не уверены, что это подходит вашему ребенку?",
      guideSiteText:
        "У нас есть отдельный справочный сайт о первых раскрасках для детей от года до трех. " +
        "Там разобраны четыре этапа первого рисования, показано, какой должна быть страница " +
        "на каждом из них и что считать нормальным в год, два и три. Есть бесплатный " +
        "подборщик, который определяет текущий этап ребенка, десять листов для печати и " +
        "прямой ответ на вопрос, когда первая раскраска ребенку уже слишком проста. " +
        "Эта книга приведена там как один из примеров, а не как универсальное решение.",
      guideSiteCta: "Открыть справочник о первых раскрасках",
      wordsTitle: "111 рисунков, 111 первых слов",
      wordsText:
        "Под каждым рисунком в этой книге написано название предмета полыми буквами, которые ребенок может раскрасить. В разделе о первых словах страницы показаны крупно, а все слова книги собраны по темам.",
      wordsCta: "Посмотреть, как устроены первые слова",
      detailsTitle: "О книге",
      drawings: "Рисунков",
      size: "Размер",
      ageLabel: "Возраст",
      publisher: "Издательство",
      author: "Автор",
      formatNote: "Цены устанавливает Amazon, они могут меняться.",
      ratingReviews: "оценок",
      ratingReviewsOne: "оценка",
      ratingReviewsFew: "оценки",
      ratingSource: "Читать отзывы на Amazon",
      ratingAria: "Читать отзывы покупателей на Amazon",
    },
    method: {
      title: "Книги, которые ребенок может закончить",
      lead:
        "Каждая наша книга сделана по одному принципу: у ребенка должно получиться. Законченная страница - та, после которой ребенок просит следующую.",
      ideaTitle: "Идея, на которой построены все книги",
      idea: [
        "Дети бросают рисовать и слушать не потому, что им неинтересно. Они бросают, когда результат не совпадает с тем, что они себе представляли. Тонкий контур, в который маленькой руке трудно попасть. Сказка длиннее, чем ребенок способен слушать. Шаг в рисовании слишком большой, чтобы его повторить. Итог один: книга закрывается.",
        "Поэтому мы начинаем с результата. Сначала смотрим, что ребенок уже умеет, и только потом определяем толщину линии, количество предметов на странице, длину сказки и число шагов в рисунке - немного ниже предела его возможностей. Получается книга, которую можно довести до конца, а именно это заставляет ребенка вернуться к ней на следующий день.",
        "Рикардо называет это подходом ECL: эмоции, творчество, язык. Они развиваются не по очереди, а вместе. Ребенок что-то чувствует, рисует это, затем находит слова, а слова помогают глубже понять чувство. Сказки на ночь, раскраски, пошаговое рисование и двуязычные издания - одна и та же идея на четырех стадиях.",
      ],
      ladderTitle: "Что меняется с возрастом",
      ladderLead:
        "Возраст на обложке описывает книгу, а не вашего ребенка. Используйте его как ориентир и смотрите прежде всего на то, что ребенок умеет сейчас.",
      ladder: [
        {
          age: "1-3 года",
          can: "Водит карандашом по рисунку, а не закрашивает точно. Слушает несколько минут. Называет знакомые предметы.",
          needs: "Толстый контур, один крупный предмет на странице, короткие повторяющиеся фразы, большие картинки.",
        },
        {
          age: "3-5 лет",
          can: "Примерно попадает в контур. Следит за короткой цепочкой событий. Спрашивает, что будет дальше.",
          needs: "Больше тем, несколько предметов на странице, сказка на пять-семь минут с одной понятной задачей.",
        },
        {
          age: "5-7 лет",
          can: "Закрашивает точнее. Понимает диалог. Начинает оценивать собственный рисунок.",
          needs: "Больше деталей, более длинные истории с понятными мотивами, рисование, разбитое на повторяемые шаги.",
        },
        {
          age: "7-10 лет",
          can: "Может дольше работать самостоятельно. Читает сам. Сравнивает свой результат с образцом.",
          needs: "Структурное рисование, истории с настоящим выбором, второй язык рядом со знакомым.",
        },
      ],
      guidesTitle: "Как выбрать книгу",
      guidesLead:
        "Короткие практические ответы на вопросы, которые родители задают на самом деле. Каждый заканчивается одной книгой.",
      awardsTitle: "Награды",
      awardsLead: "Награды отдельных изданий с названием премии, категорией и годом.",
      reviewsTitle: "Независимые рецензии",
      reviewsLead: "Рецензионные площадки, которые оценивают книги независимо от издательства.",
      retailTitle: "Где продаются наши книги",
      retailLead:
        "Наши издания продаются на четырех континентах. Если вы находитесь за пределами США, одна из этих площадок может доставить книгу.",
      regions: {
        us: "США",
        europe: "Европа и Великобритания",
        latam: "Латинская Америка",
        africa: "Африка",
        global: "Весь мир",
      },
      standardTitle: "Методика целиком",
      standardBody:
        "Полное описание системы с возрастными группами, картой навыков и параметрами для каждого типа книги опубликовано в открытом доступе.",
      standardLink: "Читать методику полностью",
      ageNote:
        "Возраст - это отправная точка, а не правило. Выбирайте книгу по тому, что ребенок умеет сегодня, а не только по цифре на обложке.",
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
      toddlerNote:
        "Раскрашиваете с ребенком младше трех лет и не знаете, какие листы ему подойдут? У нас " +
        "есть отдельный справочный сайт о первых раскрасках для детей от года до трех: четыре " +
        "этапа первого рисования, бесплатный подборщик, который определяет текущий этап " +
        "ребенка, и десять листов, разобранных по сложности.",
      toddlerCta: "Первые раскраски, от года до трех",
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
        "Мы - Рикардо и Мария. Рикардо - педагог, исследователь и писатель. Мария любит дизайн и рисунок. Мы делаем книги, которые помогают легко и без давления раскрывать то, что уже есть в ребенке.",
        "Мы верим, что у каждого ребенка есть скрытый потенциал, который можно развивать с самого раннего возраста.",
        "У нас есть любимый пес, английский кокер-спаниель Рокки, который стал героем собственных книг. Наша семья живет в солнечном Майами.",
      ],
    },
    catalog2: {
      title: "Все книги издательства Magic of Discoveries и их номера ISBN",
      lead:
        "Все выпущенные издания в одной таблице: язык, возраст, число страниц, год выхода и номер ISBN печатного издания.",
      intro: [
        "Magic of Discoveries LLC это независимое семейное издательство из Майами, штат Флорида. Им занимаются Рикардо Деми и Мария Деми. Ниже полный каталог. Английские и испанские издания считаются отдельно: это разные книги со своими номерами, а не переводы друг друга.",
        "Указан номер печатного издания. У книг, которые продаются только файлом для печати, номера ISBN нет, и мы оставляем клетку пустой, а не ставим туда что-то похожее на номер.",
      ],
      linkFromCatalog: "Посмотреть полный список изданий с номерами ISBN",
      colTitle: "Название",
      colLang: "Издание",
      colAge: "Возраст",
      colPages: "Страниц",
      colYear: "Год",
      colIsbn: "ISBN",
      langNames: {
        en: "английское",
        es: "испанское",
        ru: "русское",
        bilingual: "английское и испанское",
      },
      noIsbn: "файл для печати",
      note:
        "Печатные издания продаются на Amazon и в других магазинах США, Европы, Латинской Америки и Африки. Учебные материалы продаются на Teachers Pay Teachers. Каждое название в списке ведет на свою страницу, где перечислены все доступные форматы и цены.",
      countLine:
        "Всего {n} изданий: {printed} печатных книг на английском и испанском, {files} учебных файла для начальной школы и {ru} русских изданий в формате для печати.",
    },
    contact: {
      title: "Контакты",
      lead: "Вопросы о книге, заказ для школы или рисунок, который вы хотели бы получить? Напишите нам.",
      email: "Почта",
    },
    footer: {
      rights: "Все права защищены",
      follow: "Мы здесь",
      sitesTitle: "Другие наши сайты",
      methodSite: "Метод ECL и стандарт FSCBAC",
      toddlerSite: "Первые раскраски, от 1 до 3 лет",
      about:
        "Magic of Discoveries это независимое семейное издательство Рикардо и Марии Деми из Майами, создающее книги на английском, испанском и русском языках для детей, родителей и учителей: простые раскраски с толстыми контурами для малышей, короткие сказки на ночь, пошаговое рисование и учебные материалы для K-2, а также легкие раскраски для подростков и взрослых. Все иллюстрации нарисованы от руки, а задания и книги устроены так, чтобы ребенок мог справиться самостоятельно, довести начатое до конца и захотеть вернуться к нему снова. На сайте можно подобрать книгу по возрасту и типу, найти издания на Amazon и бесплатно скачать страницы для печати.",
    },
  },
};

export const uiLangs: UiLang[] = ["en", "es", "ru"];

/** Языки, которые сейчас показываются публично. */
export const activeLangs: UiLang[] = ["en", "es", "ru"];
