// Раздел для учителей. Классы K-2, США.
//
// Правило этой страницы: ничего, чего нельзя проверить, открыв книгу.
// Все числа взяты из готового PDF: 58 страниц, 55 заданий, восемь тем,
// страница для учителя, оглавление на два разворота.
//
// Directed drawing это общеизвестная школьная практика, мы ее не присваиваем.
// Нам принадлежит формат задания Draw, Trace, Write: структура страницы,
// порядок этапов и связка рисунка со словом.
//
// Награды относятся к другим книгам издательства, не к этому набору.
// Формулировка на странице разводит это прямо, чтобы учитель не прочел иначе.

import type { UiLang } from "./books";

export interface TeachersStep {
  n: string;
  title: string;
  text: string;
}

export interface TeachersTheme {
  name: string;
  count: number;
}

export interface TeachersImage {
  src: string;
  w: number;
  h: number;
  /** Что изображено. Нейросеть картинку не видит, она читает это. */
  alt: string;
  /** Подпись под картинкой. Видна человеку и тоже читается нейросетью. */
  caption: string;
}

export interface TeachersCard {
  kind: "free" | "paid";
  title: string;
  text: string;
  cta: string;
  /** Адрес карточки на площадке. Пустая строка прячет кнопку. */
  url: string;
  /* Тот же набор на нашем сайте. Номер книги в каталоге, а не адрес:
     адрес страницы собирается из каталога и меняется вместе с ним.
     Пусто значит своей страницы у набора нет.

     Учитель, который дочитал эту страницу, готов покупать. Раньше
     единственная кнопка уводила его на площадку, и наша доля от
     покупки уменьшалась. Теперь рядом стоит вторая, наша. */
  bookId?: string;
  /** Надпись на нашей кнопке. Цена подставляется сама. */
  siteCta?: string;
  cover: TeachersImage;
}

export interface TeachersCopy {
  title: string;
  lead: string;

  /** Определение одной фразой. Первое, что видит и человек, и нейросеть. */
  definition: string;

  originTitle: string;
  origin: string[];

  whyTitle: string;
  why: string[];

  stepsTitle: string;
  steps: TeachersStep[];
  stepsNote: string;
  /** Настоящий лист задания. Главное доказательство на странице. */
  sample: TeachersImage;
  /** Второй лист, другая тема. На широком экране стоит рядом с первым. */
  sample2: TeachersImage;

  skillsTitle: string;
  /** Главный термин, выносится отдельно и крупно. */
  skillsLead: string;
  skills: string[];

  fitTitle: string;
  fitLead: string;
  fit: string[];
  fitImage: TeachersImage;
  /** Второй баннер. На широком экране стоит рядом с первым. */
  fitImage2: TeachersImage;

  bookTitle: string;
  book: string[];
  themesTitle: string;
  themes: TeachersTheme[];
  themesImage: TeachersImage;

  methodTitle: string;
  method: string;
  methodLink: string;

  publisherTitle: string;
  publisher: string[];

  faqTitle: string;
  faq: { q: string; a: string }[];

  ctaTitle: string;
  ctaLead: string;
  cards: TeachersCard[];

  /** Те же задания на другом языке. Учитель двуязычного класса читает
      на своем языке и без этой ссылки вторую книгу просто не найдет:
      ему пришлось бы переключать язык сайта и искать раздел заново. */
  otherLang: { text: string; cta: string; url: string };
}

/* ------------------------------------------------------------------ */
/*  Адреса карточек на площадке                                        */
/*  Все четыре карточки проверены и открываются.                       */
/* ------------------------------------------------------------------ */

const TPT = {
  paidEn:
    "https://www.teacherspayteachers.com/Product/Directed-Drawing-Grades-K-2-55-No-Prep-Draw-Trace-Write-Worksheets-17437620",
  paidEs:
    "https://www.teacherspayteachers.com/Product/Spanish-Directed-Drawing-Grades-K-2-55-No-Prep-Dibujo-Dirigido-Worksheets-17437840",
  freeEn:
    "https://www.teacherspayteachers.com/Product/FREE-Directed-Drawing-Grades-K-2-8-No-Prep-Draw-Trace-Write-Worksheets-17431866",
  freeEs:
    "https://www.teacherspayteachers.com/Product/FREE-Spanish-Directed-Drawing-Grades-K-2-8-No-Prep-Dibujo-Dirigido-Worksheets-17437338",
};

export const METHOD_URL = "https://www.ricardo-demi.com/method";

export const teachers: Partial<Record<UiLang, TeachersCopy>> = {
  /* =================== АНГЛИЙСКИЙ =================== */
  en: {
    title: "Directed Drawing for K-2: The Draw, Trace, Write Format",
    lead: "Four stages on one page: follow the steps, trace, draw independently, write the word.",

    definition:
      "Directed drawing for grades K-2, ages 5 to 8, is an activity in which a student builds a picture from simple lines and shapes by following a step by step visual sequence, traces the finished outline, recreates the drawing independently, and then writes the matching word on primary ruled lines. All four stages fit on a single page and require no preparation: choose an activity, print it, and hand it out. The same draw and write format works in a kindergarten, first grade or second grade classroom and at a homeschool table.",

    originTitle: "Where this format comes from",
    origin: [
      "Directed drawing itself is a long-established classroom practice.",
      "Draw, Trace, Write is a format developed by Ricardo Demi for grades K-2 and built on principles of the ECL method. It brings together a specific page structure, a set order of stages, and a direct link between the drawing and the written word.",
    ],

    whyTitle: "Why a step-by-step model helps",
    why: [
      "For a student who is just beginning to draw, a blank page can be a demanding task. The student has to decide what to draw, where to start, and how to place the drawing on the page, all at once. A visual model breaks that task into small, clear actions.",
      "Tracing provides a bridge between following the visual model and drawing independently. The student first repeats the movement with a guide, then reproduces the shape without one. Handwriting practice follows a similar order: trace the word first, write it independently after.",
    ],

    stepsTitle: "The four stages",
    steps: [
      {
        n: "1",
        title: "Follow the steps",
        text: "A sequence of images shows how the drawing is built from simple shapes.",
      },
      {
        n: "2",
        title: "Trace",
        text: "The student traces the finished outline along a dashed guide.",
      },
      {
        n: "3",
        title: "Draw and color",
        text: "The student recreates the drawing in an open space and colors it.",
      },
      {
        n: "4",
        title: "Trace and write the word",
        text: "The student traces the word, then writes it on primary ruled lines.",
      },
    ],
    stepsNote:
      "Drawing, fine motor practice, handwriting, and vocabulary all come together in one activity.",
    sample: {
      src: "/teachers/sample-page-en.jpg",
      w: 1000,
      h: 1294,
      alt: "A directed drawing worksheet for grades K-2. A row of six numbered boxes shows a lion built up from a circle. Below it, a dashed lion outline to trace, an empty box to draw in, and primary ruled lines with the word Lion to trace and write.",
      caption:
        "Lion, from the Animals theme.",
    },
    sample2: {
      src: "/teachers/sample-page-2-en.jpg",
      w: 1000,
      h: 1294,
      alt: "A directed drawing worksheet for grades K-2. Six numbered boxes show a unicorn built up from simple curved shapes. Below them, a dashed unicorn outline to trace, an empty box to draw in, and primary ruled lines with the word Unicorn to trace and write.",
      caption: "Unicorn, from the Fantasy theme.",
    },

    skillsTitle: "What students practice",
    skillsLead: "Fine motor skills",
    skills: [
      "Pencil control",
      "Hand-eye coordination",
      "Spatial awareness on the page",
      "Following directions",
      "Following a visual sequence",
      "Working independently",
      "Letter formation",
      "Handwriting practice",
      "One new vocabulary word per page",
    ],

    fitTitle: "Where it fits in the school day",
    fitLead:
      "One page, no setup, and nothing to explain twice once the routine is familiar. The same no-prep page works in a classroom of twenty and at a kitchen table with one child.",
    fit: [
      "Morning work",
      "Morning basket at home",
      "Early finishers",
      "Writing centers",
      "Independent work",
      "Sub plans",
      "Learning centers",
      "Homeschool",
      "Special education",
    ],
    fitImage: {
      src: "/teachers/early-en.jpg",
      w: 900,
      h: 900,
      alt: "Four versions of the same lion drawing: a dashed outline to trace, a plain outline, a lion drawn independently, and a finished lion colored in with a tree, grass and a flower added around it.",
      caption:
        "Open space is left around each drawing on purpose. A student who finishes early can add a background and keep working independently.",
    },
    fitImage2: {
      src: "/teachers/print-en.jpg",
      w: 900,
      h: 900,
      alt: "Four printed directed drawing worksheets fanned out, showing a parrot, a zebra, an elephant and a lion, under a banner reading No Prep, Print and Go, 55 activities.",
      caption:
        "Nothing to cut, glue or assemble. Choose an activity, print it, and hand it out.",
    },

    bookTitle: "What is in the full book",
    book: [
      "55 full-page directed drawing activities, a teacher page explaining how the activities work, and a two-page illustrated table of contents. 58 pages, US Letter, black and white.",
      "55 activities are enough to use one a week for a full school year and still have pages left over.",
    ],
    themesTitle: "Eight themes",
    themes: [
      { name: "Animals", count: 20 },
      { name: "Sea Life", count: 8 },
      { name: "Fantasy", count: 5 },
      { name: "Vehicles", count: 4 },
      { name: "Sports and Hobbies", count: 4 },
      { name: "Things", count: 3 },
      { name: "Nature", count: 5 },
      { name: "Food", count: 6 },
    ],
    themesImage: {
      src: "/teachers/yearlong-en.jpg",
      w: 900,
      h: 900,
      alt: "Illustrated contents of the full book: eight themes listed with page ranges, then rows of small line drawings, each with its name and page number, including a lion, an elephant, a zebra, a parrot, a crocodile, a monkey, a kangaroo, a rhino, a mermaid, a unicorn, a dragon, a car, a helicopter and an airplane.",
      caption:
        "The illustrated table of contents. Every one of the 55 drawings is shown with its page number, so a teacher can find one in seconds.",
    },

    methodTitle: "About the method",
    method:
      "Draw, Trace, Write is built on principles of the Ricardo Demi ECL method that connect creative activity with language development. The full method is documented separately.",
    methodLink: "Read the ECL method",

    publisherTitle: "About the publisher",
    publisher: [
      "Magic of Discoveries LLC, Miami, Florida. Twenty-seven published children's titles in English and Spanish.",
      "Other books from the publisher have been recognized by the Children's Book International Awards in 2025 and the Literary Titan Book Awards in 2024, including two Gold Awards.",
    ],

    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is directed drawing appropriate for kindergarten?",
        a: "Yes. These activities are designed for grades K-2. Kindergarten students may rely more on the tracing stage, while second graders often move straight from the model to drawing on their own. The same page works at both levels.",
      },
      {
        q: "How long does one activity take?",
        a: "It depends on the grade and on whether students color the drawing. An activity can stay short as a warm-up, or run longer if students add a background of their own.",
      },
      {
        q: "Is any prep required?",
        a: "No. Print and hand out. There is nothing to cut, glue, or assemble.",
      },
      {
        q: "Can I use this for early finishers?",
        a: "Yes, this is one of the main uses. Open space is left around the finished drawing on purpose, so a student can add trees, grass, rocks, or the sun and turn a single figure into a scene. The small themed illustrations and the lettering on the page can also be colored. A student who finishes early has somewhere to keep working without interrupting the rest of the class or waiting on the teacher.",
      },
      {
        q: "How is this different from a coloring page?",
        a: "On a coloring page the student fills in someone else's drawing. Here the student draws the subject and then writes the word. The work involves pencil control, sequencing, and vocabulary, not color alone.",
      },
      {
        q: "What skills does directed drawing practice?",
        a: "Fine motor skills, handwriting, vocabulary, and following visual directions. Students control the pencil, place the drawing on the page, trace and write the target word, and work independently from the start of the activity to the end.",
      },
      {
        q: "Does this work for ESL and newcomer students?",
        a: "Yes. Each page focuses on one word connected to the picture. For a student who is still learning English, the visual guide makes the task clear without relying on lengthy verbal instructions.",
      },
      {
        q: "Is there a Spanish version?",
        a: "Yes. The same set of activities is published with Spanish vocabulary on every page, for Spanish classes and dual language classrooms. Both editions are linked at the bottom of this page, so a dual language teacher can use the same routine in both languages.",
      },
      {
        q: "Can I use this for homeschool?",
        a: "Yes. Nothing about the format assumes a classroom. The full book holds 55 activities, which is one a week for a full school year with pages left over, and a child works through a page alone once the routine is familiar. Many families use one page as part of morning basket or morning time, ages 5 to 8.",
      },
      {
        q: "Does this work in special education?",
        a: "Teachers use these pages with students who need a predictable routine and a clear model. Each page follows the same four stages in the same order, the drawing is broken into simple shapes, and a student who is not ready to draw independently can stay on the tracing stage as long as needed. Nothing on the page is timed.",
      },
      {
        q: "How is this different from a step by step drawing book?",
        a: "A drawing book stops at the picture. Here the page continues into handwriting: the student traces the finished outline, draws the subject independently, then traces and writes the matching word on primary ruled lines. Drawing and writing sit on the same sheet, which is why these are used in writing centers rather than only at an art table.",
      },
      {
        q: "What are good directed drawing subjects for a zoo or animal unit?",
        a: "The Animals theme holds 20 activities, among them a lion, an elephant, a zebra, a monkey, a rhino, a kangaroo and a flamingo, so a teacher can pull a matching page for a zoo unit. Sea Life adds 8 more. The illustrated table of contents shows every drawing with its page number.",
      },
    ],

    ctaTitle: "Try it in your classroom",
    ctaLead:
      "Start with the free sample. The full sets are available here as an instant download, and Volume 1 is also on Teachers Pay Teachers.",
    cards: [
      {
        kind: "free",
        title: "Free 8-activity sample",
        text: "One activity from each theme, with nothing shortened and no watermarks. 10 pages, PDF.",
        cta: "Get the free sample",
        url: TPT.freeEn,
        cover: {
          src: "/teachers/cover-free-en.jpg",
          w: 700,
          h: 700,
          alt: "Cover of the free 8-activity sample: an English directed drawing page with a lion, marked FREE, 8 ACTIVITIES, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
      {
        kind: "paid",
        title: "Full 55-activity resource",
        text: "The complete Volume 1 collection with a teacher page and an illustrated table of contents. 58 pages, PDF.",
        cta: "See the full resource",
        url: TPT.paidEn,
        bookId: "directed-drawing-k2-en",
        siteCta: "Buy the PDF here",
        cover: {
          src: "/teachers/cover-paid-en.jpg",
          w: 700,
          h: 700,
          alt: "Cover of the full English collection: a directed drawing page with a lion, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
      {
        kind: "paid",
        title: "Volume 2: 56 more activities",
        text: "A second full year in the same format, with all new subjects and a bugs section. 59 pages, PDF. Available here only.",
        cta: "",
        url: "",
        bookId: "directed-drawing-k2-2-en",
        siteCta: "Buy the PDF here",
        cover: {
          src: "/covers/directed-drawing-k2-2-en.jpg",
          w: 900,
          h: 900,
          alt: "Cover of Volume 2 in English: a directed drawing page with a bear, marked 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
    ],

    otherLang: {
      text: "Teaching a dual language or Spanish class? The same 55 activities are published with Spanish vocabulary on every page.",
      cta: "See the Spanish edition",
      url: TPT.paidEs,
    },
  },

  /* =================== ИСПАНСКИЙ =================== */
  es: {
    title: "Dibujo dirigido para K-2: el formato dibuja, repasa y escribe",
    lead: "Cuatro etapas en una sola hoja: sigue los pasos, repasa, dibuja solo y escribe la palabra.",

    definition:
      "El dibujo dirigido para los grados K-2, de 5 a 8 años, es una actividad en la que el alumno construye un dibujo a partir de líneas y formas sencillas siguiendo una secuencia visual paso a paso, repasa el contorno terminado, vuelve a dibujarlo por su cuenta y después escribe la palabra correspondiente sobre pauta de tres líneas. Las cuatro etapas caben en una sola hoja y no requieren preparación: elija la actividad, imprímala y repártala. El mismo formato de dibujar y escribir sirve en un aula de kínder, primero o segundo grado y en la mesa de una familia que educa en casa.",

    originTitle: "De dónde viene este formato",
    origin: [
      "El dibujo dirigido es una práctica escolar conocida desde hace mucho tiempo.",
      "Dibuja, repasa y escribe es un formato desarrollado por Ricardo Demi para los grados K-2 y construido sobre los principios del método ECL. Reúne una estructura de página determinada, un orden fijo de etapas y una relación directa entre el dibujo y la palabra escrita.",
    ],

    whyTitle: "Por qué ayuda un modelo paso a paso",
    why: [
      "Para un alumno que apenas empieza a dibujar, la hoja en blanco puede ser una tarea exigente. Tiene que decidir a la vez qué dibujar, por dónde empezar y cómo situar el dibujo en la página. Un modelo visual divide esa tarea en acciones pequeñas y claras.",
      "Repasar el contorno funciona como puente entre seguir el modelo y dibujar solo. El alumno primero repite el movimiento con una guía y después reproduce la forma sin ella. La escritura sigue un orden parecido: primero se repasa la palabra y después se escribe de forma independiente.",
    ],

    stepsTitle: "Las cuatro etapas",
    steps: [
      {
        n: "1",
        title: "Sigue los pasos",
        text: "Una secuencia de imágenes muestra cómo se construye el dibujo a partir de formas sencillas.",
      },
      {
        n: "2",
        title: "Repasa",
        text: "El alumno repasa el contorno terminado sobre la guia punteada.",
      },
      {
        n: "3",
        title: "Dibuja y colorea",
        text: "El alumno vuelve a dibujar la figura en un espacio libre y la colorea.",
      },
      {
        n: "4",
        title: "Repasa y escribe la palabra",
        text: "El alumno repasa la palabra y luego la escribe sobre pauta de tres líneas.",
      },
    ],
    stepsNote:
      "Dibujo, motricidad fina, escritura a mano y vocabulario se reúnen en una sola actividad.",
    sample: {
      src: "/teachers/sample-page-es.jpg",
      w: 1000,
      h: 1294,
      alt: "Hoja de dibujo dirigido para los grados K-2. Una fila de seis casillas numeradas muestra cómo se construye un león a partir de un círculo. Debajo, un contorno punteado para repasar, un recuadro vacío para dibujar y una pauta de tres líneas con la palabra León para repasar y escribir.",
      caption: "León, del tema Animales.",
    },
    sample2: {
      src: "/teachers/sample-page-2-es.jpg",
      w: 1000,
      h: 1294,
      alt: "Hoja de dibujo dirigido para los grados K-2. Seis casillas numeradas muestran cómo se construye un unicornio a partir de formas curvas sencillas. Debajo, el contorno punteado del unicornio para repasar, un recuadro vacío para dibujar y una pauta de tres líneas con la palabra Unicornio para repasar y escribir.",
      caption: "Unicornio, del tema Fantasía.",
    },

    skillsTitle: "Qué practica el alumno",
    skillsLead: "Motricidad fina",
    skills: [
      "Control del lápiz",
      "Orientación en la hoja",
      "Seguir instrucciones",
      "Coordinación ojo-mano",
      "Situar el dibujo en la página",
      "Seguir una secuencia visual",
      "Trabajo autónomo",
      "Trazado de letras",
      "Una palabra nueva por página",
    ],

    fitTitle: "Dónde encaja en la jornada escolar",
    fitLead:
      "Una hoja, sin preparación, y sin volver a explicar nada cuando la rutina ya es conocida. La misma hoja sirve en un aula de veinte alumnos y en la mesa de la cocina con un solo niño.",
    fit: [
      "Trabajo de la mañana",
      "Alumnos que terminan antes",
      "Centro de escritura",
      "Trabajo autónomo",
      "Clases con sustituto",
      "Centros de aprendizaje",
      "Educación en casa",
      "Educación especial",
    ],
    fitImage: {
      src: "/teachers/early-es.jpg",
      w: 900,
      h: 900,
      alt: "Cuatro versiones del mismo león: un contorno punteado para repasar, un contorno simple, un león dibujado por el alumno y un león coloreado con un árbol, hierba y una flor añadidos alrededor.",
      caption:
        "Alrededor de cada dibujo se deja espacio libre a propósito. El alumno que termina antes puede añadir un fondo y seguir trabajando por su cuenta.",
    },
    fitImage2: {
      src: "/teachers/print-es.jpg",
      w: 900,
      h: 900,
      alt: "Cuatro hojas de dibujo dirigido impresas y superpuestas, con un loro, una cebra, un elefante y un león, bajo un rótulo que dice sin preparación, imprime y reparte, 55 actividades.",
      caption:
        "No hay que recortar, pegar ni montar nada. Elija la actividad, imprímala y repártala.",
    },

    bookTitle: "Qué incluye el libro completo",
    book: [
      "55 actividades de dibujo dirigido a página completa, una página para el maestro que explica cómo funcionan y un índice ilustrado de dos páginas. 58 páginas, tamaño carta, blanco y negro.",
      "55 actividades alcanzan para usar una por semana durante todo el curso escolar y aún sobran páginas.",
    ],
    themesTitle: "Ocho temas",
    themes: [
      { name: "Animales", count: 20 },
      { name: "Vida marina", count: 8 },
      { name: "Fantasía", count: 5 },
      { name: "Vehículos", count: 4 },
      { name: "Deportes y pasatiempos", count: 4 },
      { name: "Cosas", count: 3 },
      { name: "Naturaleza", count: 5 },
      { name: "Comida", count: 6 },
    ],
    themesImage: {
      src: "/teachers/yearlong-es.jpg",
      w: 900,
      h: 900,
      alt: "Índice ilustrado del libro completo: los ocho temas con sus páginas y, debajo, filas de pequeños dibujos a línea con su nombre y su número de página, entre ellos un león, un elefante, una cebra, un loro, un cocodrilo, un mono, un canguro, un rinoceronte, una sirena, un unicornio, un dragón, un coche, un helicóptero y un avión.",
      caption:
        "El índice ilustrado. Muestra los 55 dibujos con su número de página, de modo que el maestro encuentra uno en segundos.",
    },

    methodTitle: "Sobre el método",
    method:
      "Dibuja, repasa y escribe se apoya en los principios del método ECL de Ricardo Demi, que relacionan la actividad creativa con el desarrollo del lenguaje. El método completo está documentado por separado.",
    methodLink: "Leer el método ECL",

    publisherTitle: "Sobre la editorial",
    publisher: [
      "Magic of Discoveries LLC, Miami, Florida. Veintisiete libros infantiles publicados en inglés y español.",
      "Otros libros de la editorial han sido reconocidos por los Children's Book International Awards en 2025 y los Literary Titan Book Awards en 2024, con dos premios de oro entre ellos.",
    ],

    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Sirve el dibujo dirigido para kindergarten?",
        a: "Sí. Las actividades están pensadas para los grados K-2. En kindergarten el alumno suele apoyarse más en la etapa de repasar, mientras que en segundo grado muchos pasan directamente del modelo al dibujo propio. La misma hoja funciona en ambos niveles.",
      },
      {
        q: "¿Cuánto dura una actividad?",
        a: "Depende del grado y de si el alumno colorea el dibujo. La actividad puede quedarse corta, como calentamiento, o alargarse si el alumno añade un fondo propio.",
      },
      {
        q: "¿Hay que preparar algo?",
        a: "No. Imprimir y repartir. No hay nada que recortar, pegar ni montar.",
      },
      {
        q: "¿Sirve para los alumnos que terminan antes?",
        a: "Sí, es uno de los usos principales. Alrededor del dibujo terminado se deja espacio libre a propósito, para que el alumno pueda añadir árboles, hierba, piedras o el sol y convertir una figura en una escena. Los dibujos pequeños y las letras de la hoja también se pueden colorear. Así el alumno que acaba antes tiene dónde seguir trabajando sin interrumpir al resto de la clase ni esperar al maestro.",
      },
      {
        q: "¿En qué se diferencia de una hoja para colorear?",
        a: "En una hoja para colorear el alumno rellena el dibujo de otra persona. Aquí el alumno dibuja la figura y después escribe la palabra. El trabajo pasa por el control del lápiz, la secuencia y el vocabulario, no solo por el color.",
      },
      {
        q: "¿Qué habilidades practica el dibujo dirigido?",
        a: "Motricidad fina, escritura a mano, vocabulario y seguimiento de instrucciones visuales. El alumno controla el lápiz, situa el dibujo en la página, repasa y escribe la palabra, y trabaja de forma autónoma de principio a fin.",
      },
      {
        q: "¿Funciona para alumnos que aprenden español?",
        a: "Sí. Cada página se centra en una palabra ligada a la imagen. Para un alumno que todavía está aprendiendo el idioma, la guia visual deja clara la tarea sin depender de instrucciones habladas largas.",
      },
      {
        q: "¿Hay versión en inglés?",
        a: "Sí. El mismo conjunto de actividades está publicado con vocabulario en inglés en cada página. Las dos ediciones están enlazadas al final de esta página, de modo que un maestro de clase bilingüe puede seguir la misma rutina en los dos idiomas.",
      },
      {
        q: "¿Sirve para educar en casa?",
        a: "Sí. El formato no da por supuesta un aula. El libro completo reúne 55 actividades, una por semana durante todo el curso y aún sobran páginas, y el niño resuelve una hoja solo en cuanto conoce la rutina. Muchas familias usan una hoja como parte de la rutina de la mañana, de 5 a 8 años.",
      },
      {
        q: "¿Funciona en educación especial?",
        a: "Los maestros usan estas hojas con alumnos que necesitan una rutina previsible y un modelo claro. Cada página sigue las mismas cuatro etapas en el mismo orden, el dibujo está descompuesto en formas sencillas, y el alumno que todavía no dibuja por su cuenta puede quedarse en la etapa de repasar el tiempo que haga falta. Nada en la página está cronometrado.",
      },
      {
        q: "¿En qué se diferencia de un libro de dibujo paso a paso?",
        a: "Un libro de dibujo termina en la imagen. Aquí la página continúa en la escritura: el alumno repasa el contorno terminado, dibuja la figura por su cuenta y después repasa y escribe la palabra sobre pauta de tres líneas. El dibujo y la escritura están en la misma hoja, y por eso estas páginas se usan en los centros de escritura y no solo en la mesa de arte.",
      },
      {
        q: "¿Qué dibujos sirven para una unidad de animales o del zoológico?",
        a: "El tema Animales reúne 20 actividades, entre ellas un león, un elefante, una cebra, un mono, un rinoceronte, un canguro y un flamenco, así que el maestro encuentra una página que acompañe la unidad. Vida marina añade 8 más. El índice ilustrado muestra todos los dibujos con su número de página.",
      },
    ],

    ctaTitle: "Pruébelo en su clase",
    ctaLead:
      "Empiece por la muestra gratuita. Las colecciones completas se descargan aquí mismo, y el volumen 1 también está en Teachers Pay Teachers.",
    cards: [
      {
        kind: "free",
        title: "Muestra gratuita de 8 actividades",
        text: "Una actividad de cada tema, sin recortes y sin marcas de agua. 10 páginas, PDF.",
        cta: "Descargar la muestra gratuita",
        url: TPT.freeEs,
        cover: {
          src: "/teachers/cover-free-es.jpg",
          w: 700,
          h: 700,
          alt: "Portada de la muestra gratuita de 8 actividades: una hoja de dibujo dirigido en español con un león, marcada FREE, 8 ACTIVITIES, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
      {
        kind: "paid",
        title: "Colección completa de 55 actividades",
        text: "El volumen 1 completo, con página para el maestro e índice ilustrado. 58 páginas, PDF.",
        cta: "Ver la colección completa",
        url: TPT.paidEs,
        bookId: "directed-drawing-k2-es",
        siteCta: "Comprar el PDF aquí",
        cover: {
          src: "/teachers/cover-paid-es.jpg",
          w: 700,
          h: 700,
          alt: "Portada de la colección completa en español: una hoja de dibujo dirigido con un león, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
      {
        kind: "paid",
        title: "Volumen 2: 56 actividades más",
        text: "Un segundo año completo con el mismo formato, con dibujos nuevos y un tema de insectos. 59 páginas, PDF. Solo aquí.",
        cta: "",
        url: "",
        bookId: "directed-drawing-k2-2-es",
        siteCta: "Comprar el PDF aquí",
        cover: {
          src: "/covers/directed-drawing-k2-2-es.jpg",
          w: 900,
          h: 900,
          alt: "Portada del volumen 2 en español: una hoja de dibujo dirigido con un oso, marcada 55 ACTIVITIES, YEAR-LONG, NO PREP, GRADES K-2.",
          caption: "",
        },
      },
    ],
  
    otherLang: {
      text: "¿Da clase en inglés o en un aula bilingüe? Las mismas 55 actividades están publicadas con vocabulario en inglés en cada página.",
      cta: "Ver la edición en inglés",
      url: TPT.paidEn,
    },
  },
};

export const teachersForLang = (lang: UiLang): TeachersCopy | undefined => teachers[lang];
