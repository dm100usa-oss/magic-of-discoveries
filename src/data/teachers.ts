// Раздел для учителей. Классы K-2, США. Три языка.
//
// Страница идет от общего к частному и за несколько секунд отвечает
// учителю: что это, для кого, на какой срок. Сразу под этим книги:
// английское и испанское издание, в каждом том 1, том 2 и набор.
// Ниже три-четыре строки о том, кому и когда это нужно, бесплатные
// задания, короткие вопросы и автор.
//
// Все подробности о книге (описание, крупные листы, два уровня, все
// рисунки, вопросы про книгу) живут на странице самой книги, см.
// src/data/teacherBooks.ts. Эта страница их не повторяет.
//
// Кому и когда: взято из того, что отмечено у книг на площадке
// (классы K-2, предметы, метки, срок 1 учебный год) и со страницы для
// учителя внутри книг (Perfect For, Skills Practiced).
//
// Про лицензию: текст совпадает с условиями площадки. Один учитель
// и его ученики, каждому следующему учителю нужна своя копия.

import type { UiLang } from "./books";
import type { TeacherEdition } from "./teacherBooks";

export interface TeachersImage {
  src: string;
  w: number;
  h: number;
  /** Что изображено. Нейросеть картинку не видит, она читает это. */
  alt: string;
  /** Подпись под картинкой. Видна человеку и тоже читается нейросетью. */
  caption: string;
}

export interface TeachersCopy {
  title: string;
  lead: string;
  /** Определение одной фразой. Идет в разметку страницы, не в текст. */
  definition: string;

  heroStats: string;
  heroChooseCta: string;
  heroFreeCta: string;
  heroNote: string;
  /** Один и тот же рисунок на двух уровнях. */
  heroPair: TeachersImage[];

  booksTitle: string;
  booksLead: string;
  rowTitle: Record<TeacherEdition, string>;
  rowNote: Record<TeacherEdition, string>;
  /** Подписи карточек на языке страницы, по номеру товара. */
  cards: Record<string, { name: string; line: string }>;
  btnDetails: string;
  btnPreview: string;
  /** {price} заменяется ценой. */
  btnBuy: string;
  btnBuyTpt: string;
  saveLabel: string;

  aboutTitle: string;
  about: { label: string; text: string }[];

  freeTitle: string;
  freeLead: string;
  freeItems: { label: string; url: string; cover: TeachersImage }[];
  freeCta: string;

  faqTitle: string;
  faq: { q: string; a: string }[];

  authorTitle: string;
  author: string;
  authorLink: string;
  updatedLabel: string;
  updated: string;

  articlesTitle: string;
}

export const METHOD_URL = "https://www.ricardo-demi.com/method";

const pageImg = (src: string, alt: string, caption: string): TeachersImage => ({
  src, w: 1000, h: 1295, alt, caption,
});
const freeCover = (src: string, alt: string): TeachersImage => ({
  src, w: 700, h: 700, alt, caption: "",
});

const FREE = {
  en1: "/free/directed-drawing-k2-en-free-sample.pdf",
  en2: "/free/directed-drawing-k2-2-en-free-sample.pdf",
  es1: "/free/directed-drawing-k2-es-free-sample.pdf",
  es2: "/free/directed-drawing-k2-2-es-free-sample.pdf",
};

export const teachers: Partial<Record<UiLang, TeachersCopy>> = {

  en: {
    title: "Directed Drawing and Writing Worksheets for K-2, Ready for the Whole School Year",
    lead: "Step-by-step drawing and handwriting activities for kindergarten, 1st and 2nd grade, ages 5 to 8. Choose a drawing, print the level you need and hand it out.",
    definition: "Year-long directed drawing and handwriting worksheets for grades K-2, ages 5 to 8, in English and in Spanish. On every page a student builds a picture step by step, traces it, draws it on their own, then traces and writes the matching word. Every drawing comes at two levels of difficulty: Level 1 in four steps with a light gray starting shape, Level 2 in five to eight steps with an empty drawing box. 111 drawings and 222 worksheets in two volumes.",

    heroStats: "111 drawings · 2 levels · 222 worksheets · English and Spanish",
    heroChooseCta: "Choose a book",
    heroFreeCta: "Download free activities",
    heroNote: "Printable PDF, black and white. No physical book is shipped.",
    heroPair: [
      pageImg("/teachers/level-1-en.jpg", "Level 1 worksheet: four numbered boxes build a lion, with a light gray starting shape in the drawing box and the word Lion to trace and write.", "Level 1"),
      pageImg("/teachers/sample-page-2-en.jpg", "Level 2 worksheet: the same lion built in six steps, with an empty drawing box and the word Lion to trace and write.", "Level 2"),
    ],

    booksTitle: "Choose a book",
    booksLead: "Two volumes and a bundle in each language. The drawings and the two levels are the same in both editions; only the words change.",
    rowTitle: { en: "English edition", es: "Spanish edition · Dibujo Dirigido" },
    rowNote: {
      en: "Words and directions in English.",
      es: "Every word and direction on the student pages is in Spanish. Teacher page in English.",
    },
    cards: {
      "en-v1": { name: "Volume 1", line: "55 drawings · 110 worksheets" },
      "en-v2": { name: "Volume 2", line: "55 + 1 bonus · 112 worksheets" },
      "en-bundle": { name: "Bundle: Volumes 1 and 2", line: "111 drawings · 222 worksheets" },
      "es-v1": { name: "Volume 1", line: "55 drawings · 110 worksheets" },
      "es-v2": { name: "Volume 2", line: "55 + 1 bonus · 112 worksheets" },
      "es-bundle": { name: "Bundle: Volumes 1 and 2", line: "111 drawings · 222 worksheets" },
    },
    btnDetails: "Details",
    btnPreview: "Preview",
    btnBuy: "Buy · {price}",
    btnBuyTpt: "Buy on TPT · {price}",
    saveLabel: "Save $2",

    aboutTitle: "Who it is for and how it helps",
    about: [
      { label: "Who it is for", text: "Kindergarten, 1st and 2nd grade teachers, ESL and newcomer support, Spanish class, dual language and immersion classrooms, art teachers and homeschool families." },
      { label: "What students practice", text: "Handwriting and new vocabulary in English or Spanish, fine motor skills, hand-eye coordination, following step-by-step directions, independent work and confidence in drawing." },
      { label: "When to use it", text: "Morning work, centers, independent work, early finishers, sub plans and the first weeks of school." },
      { label: "Why it is easy", text: "Four stages on one page: draw step by step, trace, draw on your own, write the word. Every drawing comes at two levels, so the whole class draws the same picture and each student gets the version that fits. Black and white, nothing to cut or prepare." },
    ],

    freeTitle: "Try it free",
    freeLead: "Complete pages from the books at both levels. No sign-up, no email, no watermarks.",
    freeItems: [
      { label: "English, Volume 1: 8 activities", url: FREE.en1, cover: freeCover("/teachers/cover-free-en.jpg", "Cover of the free English Volume 1 sample with a lion, marked FREE 8 ACTIVITIES, 2 LEVELS, 16 WORKSHEETS.") },
      { label: "English, Volume 2: 9 activities", url: FREE.en2, cover: freeCover("/teachers/cover-free-2-en.jpg", "Cover of the free English Volume 2 sample with a fox, marked FREE 9 ACTIVITIES, 2 LEVELS, 18 WORKSHEETS.") },
      { label: "Spanish, Volume 1: 8 activities", url: FREE.es1, cover: freeCover("/teachers/cover-free-es.jpg", "Cover of the free Spanish Volume 1 sample with a lion and the word León, marked FREE 8 ACTIVITIES, 2 LEVELS, 16 WORKSHEETS.") },
      { label: "Spanish, Volume 2: 9 activities", url: FREE.es2, cover: freeCover("/teachers/cover-free-2-es.jpg", "Cover of the free Spanish Volume 2 sample with a fox and the word Zorro, marked FREE 9 ACTIVITIES, 2 LEVELS, 18 WORKSHEETS.") },
    ],
    freeCta: "Download",

    faqTitle: "Common questions",
    faq: [
      { q: "Which book should I start with?", a: "Either volume works on its own. Volume 1 opens with zoo and safari animals, Volume 2 with farm and forest animals and bugs. For the whole school year take the bundle: 111 drawings with no repeats." },
      { q: "How are the English and Spanish editions different?", a: "The drawings, the two levels and the page layout are the same. In the Spanish edition every word and direction on the student pages is in Spanish; the teacher page is in English." },
      { q: "What will I receive?", a: "A printable PDF for each volume: 113 pages in Volume 1 and 115 in Volume 2, black and white. No physical book is shipped." },
      { q: "Can I print on A4 paper?", a: "Yes. Buying on this site, you choose US Letter or A4, and the file is laid out for that size." },
      { q: "Can I share the files with other teachers?", a: "One purchase covers one teacher and that teacher's students. Each additional teacher needs their own copy." },
    ],

    authorTitle: "Materials made by Ricardo Demi",
    author: "I am a children's author and the publisher at Magic of Discoveries, in Miami, Florida. I taught at university level for twelve years. I drew every illustration in these books by hand and made all the materials shown here.",
    authorLink: "More about my work",
    updatedLabel: "Last updated:",
    updated: "2026-09-16",

    articlesTitle: "More ideas for using the worksheets",
  },

  es: {
    title: "Fichas de dibujo dirigido y escritura para K-2, listas para todo el curso",
    lead: "Actividades de dibujo paso a paso y escritura para kínder, 1.º y 2.º grado, de 5 a 8 años. Elija un dibujo, imprima el nivel que necesita y repártalo.",
    definition: "Fichas de dibujo dirigido y escritura para todo el curso, grados K-2, de 5 a 8 años, en español y en inglés. En cada ficha el alumno construye un dibujo paso a paso, lo repasa, lo dibuja por su cuenta y después repasa y escribe la palabra. Cada dibujo viene en dos niveles: el nivel 1 en cuatro pasos con una forma inicial en gris claro, el nivel 2 en cinco a ocho pasos con el espacio de dibujo vacío. 111 dibujos y 222 fichas en dos volúmenes.",

    heroStats: "111 dibujos · 2 niveles · 222 fichas · español e inglés",
    heroChooseCta: "Elegir un libro",
    heroFreeCta: "Descargar actividades gratuitas",
    heroNote: "PDF para imprimir, en blanco y negro. No se envía ningún libro físico.",
    heroPair: [
      pageImg("/teachers/level-1-es.jpg", "Ficha de nivel 1: cuatro recuadros numerados construyen un león, con una forma inicial en gris claro en el espacio de dibujo y la palabra León para repasar y escribir.", "Nivel 1"),
      pageImg("/teachers/sample-page-2-es.jpg", "Ficha de nivel 2: el mismo león en seis pasos, con el espacio de dibujo vacío y la palabra León para repasar y escribir.", "Nivel 2"),
    ],

    booksTitle: "Elija un libro",
    booksLead: "Dos volúmenes y un pack en cada idioma. Los dibujos y los dos niveles son los mismos en ambas ediciones; solo cambian las palabras.",
    rowTitle: { es: "Edición en español · Dibujo Dirigido", en: "Edición en inglés" },
    rowNote: {
      es: "Todas las palabras e instrucciones de las fichas están en español. La página para el docente está en inglés.",
      en: "Palabras e instrucciones en inglés.",
    },
    cards: {
      "es-v1": { name: "Volumen 1", line: "55 dibujos · 110 fichas" },
      "es-v2": { name: "Volumen 2", line: "55 + 1 de regalo · 112 fichas" },
      "es-bundle": { name: "Pack: volúmenes 1 y 2", line: "111 dibujos · 222 fichas" },
      "en-v1": { name: "Volumen 1", line: "55 dibujos · 110 fichas" },
      "en-v2": { name: "Volumen 2", line: "55 + 1 de regalo · 112 fichas" },
      "en-bundle": { name: "Pack: volúmenes 1 y 2", line: "111 dibujos · 222 fichas" },
    },
    btnDetails: "Detalles",
    btnPreview: "Vista previa",
    btnBuy: "Comprar · {price}",
    btnBuyTpt: "Comprar en TPT · {price}",
    saveLabel: "Ahorre $2",

    aboutTitle: "Para quién es y en qué ayuda",
    about: [
      { label: "Para quién", text: "Docentes de kínder, 1.º y 2.º grado, clases de español, aulas de lenguaje dual e inmersión, apoyo a alumnos que aprenden inglés y recién llegados, docentes de arte y familias que educan en casa." },
      { label: "Qué practican los alumnos", text: "Escritura y vocabulario nuevo en español o en inglés, motricidad fina, coordinación ojo-mano, seguir instrucciones paso a paso, trabajo autónomo y confianza al dibujar." },
      { label: "Cuándo usarlas", text: "Trabajo de la mañana, centros, trabajo autónomo, para quienes terminan antes, sustituciones y las primeras semanas del curso." },
      { label: "Por qué es fácil", text: "Cuatro etapas en una ficha: dibujar paso a paso, repasar, dibujar por su cuenta y escribir la palabra. Cada dibujo viene en dos niveles, así toda la clase dibuja lo mismo y cada alumno recibe la versión que le corresponde. En blanco y negro, sin nada que recortar ni preparar." },
    ],

    freeTitle: "Pruébelas gratis",
    freeLead: "Fichas completas de los libros en los dos niveles. Sin registro, sin correo electrónico y sin marcas de agua.",
    freeItems: [
      { label: "Español, volumen 1: 8 actividades", url: FREE.es1, cover: freeCover("/teachers/cover-free-es.jpg", "Portada de la muestra gratuita del volumen 1 en español con un león, marcada FREE 8 ACTIVITIES, 2 LEVELS, 16 WORKSHEETS.") },
      { label: "Español, volumen 2: 9 actividades", url: FREE.es2, cover: freeCover("/teachers/cover-free-2-es.jpg", "Portada de la muestra gratuita del volumen 2 en español con un zorro, marcada FREE 9 ACTIVITIES, 2 LEVELS, 18 WORKSHEETS.") },
      { label: "Inglés, volumen 1: 8 actividades", url: FREE.en1, cover: freeCover("/teachers/cover-free-en.jpg", "Portada de la muestra gratuita del volumen 1 en inglés con un león, marcada FREE 8 ACTIVITIES, 2 LEVELS, 16 WORKSHEETS.") },
      { label: "Inglés, volumen 2: 9 actividades", url: FREE.en2, cover: freeCover("/teachers/cover-free-2-en.jpg", "Portada de la muestra gratuita del volumen 2 en inglés con un zorro, marcada FREE 9 ACTIVITIES, 2 LEVELS, 18 WORKSHEETS.") },
    ],
    freeCta: "Descargar",

    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Con qué libro empiezo?", a: "Cualquiera de los dos volúmenes funciona por sí solo. El volumen 1 empieza con animales del zoo y de safari; el volumen 2, con animales de granja y del bosque e insectos. Para todo el curso, elija el pack: 111 dibujos sin repeticiones." },
      { q: "¿En qué se diferencian las ediciones en español y en inglés?", a: "Los dibujos, los dos niveles y el diseño de las fichas son los mismos. En la edición en español todas las palabras e instrucciones de las fichas están en español; la página para el docente está en inglés." },
      { q: "¿Qué recibiré?", a: "Un PDF para imprimir por cada volumen: 113 páginas el volumen 1 y 115 el volumen 2, en blanco y negro. No se envía ningún libro físico." },
      { q: "¿Puedo imprimir en A4?", a: "Sí. Al comprar en esta web, elija US Letter o A4, y el archivo viene maquetado para ese tamaño." },
      { q: "¿Puedo compartir los archivos con otros docentes?", a: "Cada compra es para un docente y sus alumnos. Cada docente adicional necesita su propia copia." },
    ],

    authorTitle: "Materiales creados por Ricardo Demi",
    author: "Soy autor de libros infantiles y editor de Magic of Discoveries, en Miami, Florida. Durante doce años impartí clases en la universidad. He dibujado a mano todas las ilustraciones de estos libros y he creado todos los materiales que se presentan aquí.",
    authorLink: "Más sobre mi trabajo",
    updatedLabel: "Última actualización:",
    updated: "2026-09-16",

    articlesTitle: "Más ideas para utilizar las fichas",
  },

  ru: {
    title: "Рабочие листы по пошаговому рисованию и письму для K-2 на весь учебный год",
    lead: "Готовые задания по рисованию и письму для подготовительного, первого и второго классов, дети 5–8 лет. Выберите рисунок, распечатайте нужный уровень и раздайте.",
    definition: "Рабочие листы по пошаговому рисованию и письму на весь учебный год для классов K-2, дети от 5 до 8 лет, со словами на английском или на испанском. На каждом листе ребенок строит рисунок по шагам, обводит его, рисует сам, а потом обводит и пишет слово. Каждый рисунок дан на двух уровнях: первый в четыре шага со светло-серой заготовкой, второй в пять–восемь шагов с пустым полем. 111 рисунков и 222 листа в двух томах.",

    heroStats: "111 рисунков · 2 уровня · 222 листа · английский и испанский",
    heroChooseCta: "Выбрать книгу",
    heroFreeCta: "Скачать бесплатные задания",
    heroNote: "PDF для печати, черно-белый. Печатная книга не отправляется.",
    heroPair: [
      pageImg("/teachers/level-1-en.jpg", "Лист первого уровня: четыре окошка строят льва, в поле для рисунка светло-серая заготовка, внизу слово Lion для обводки и письма.", "Первый уровень"),
      pageImg("/teachers/sample-page-2-en.jpg", "Лист второго уровня: тот же лев в шесть шагов, поле для рисунка пустое, внизу слово Lion.", "Второй уровень"),
    ],

    booksTitle: "Выберите книгу",
    booksLead: "В каждом издании два тома и набор. Рисунки и два уровня в обоих изданиях одинаковые, меняются только слова.",
    rowTitle: { en: "Английское издание", es: "Испанское издание · Dibujo Dirigido" },
    rowNote: {
      en: "Слова и задания на английском.",
      es: "Все слова и задания на листах на испанском. Страница для учителя на английском.",
    },
    cards: {
      "en-v1": { name: "Том 1", line: "55 рисунков · 110 листов" },
      "en-v2": { name: "Том 2", line: "55 + 1 бонусный · 112 листов" },
      "en-bundle": { name: "Набор: тома 1 и 2", line: "111 рисунков · 222 листа" },
      "es-v1": { name: "Том 1", line: "55 рисунков · 110 листов" },
      "es-v2": { name: "Том 2", line: "55 + 1 бонусный · 112 листов" },
      "es-bundle": { name: "Набор: тома 1 и 2", line: "111 рисунков · 222 листа" },
    },
    btnDetails: "Подробнее",
    btnPreview: "Превью",
    btnBuy: "Купить · {price}",
    btnBuyTpt: "Купить на TPT · {price}",
    saveLabel: "Экономия $2",

    aboutTitle: "Кому это нужно и чем помогает",
    about: [
      { label: "Кому", text: "Учителям подготовительного, первого и второго классов, учителям английского для детей, которые только учат язык, и для новичков, учителям испанского, двуязычных классов и классов с погружением, учителям рисования, семьям на домашнем обучении." },
      { label: "Что развивает", text: "Письмо и новые слова на английском или испанском, мелкую моторику, координацию «глаз–рука», умение идти по шагам, самостоятельность и уверенность в рисовании." },
      { label: "Когда использовать", text: "Утренняя работа, работа по станциям, самостоятельная работа, для тех, кто закончил раньше, замена учителя, первые недели учебного года." },
      { label: "Почему удобно", text: "Четыре этапа на одном листе: рисуй по шагам, обведи, нарисуй сам, напиши слово. Каждый рисунок на двух уровнях, поэтому весь класс рисует одно и то же, а каждый ребенок получает свой вариант. Черно-белая печать, ничего не нужно вырезать и готовить." },
    ],

    freeTitle: "Попробуйте бесплатно",
    freeLead: "Настоящие страницы из книг на обоих уровнях. Без регистрации, без почты, без водяных знаков.",
    freeItems: [
      { label: "Английский, том 1: 8 заданий", url: FREE.en1, cover: freeCover("/teachers/cover-free-en.jpg", "Обложка бесплатного образца английского первого тома со львом, пометки FREE 8 ACTIVITIES, 2 LEVELS, 16 WORKSHEETS.") },
      { label: "Английский, том 2: 9 заданий", url: FREE.en2, cover: freeCover("/teachers/cover-free-2-en.jpg", "Обложка бесплатного образца английского второго тома с лисой, пометки FREE 9 ACTIVITIES, 2 LEVELS, 18 WORKSHEETS.") },
      { label: "Испанский, том 1: 8 заданий", url: FREE.es1, cover: freeCover("/teachers/cover-free-es.jpg", "Обложка бесплатного образца испанского первого тома со львом и словом León, пометки FREE 8 ACTIVITIES, 2 LEVELS, 16 WORKSHEETS.") },
      { label: "Испанский, том 2: 9 заданий", url: FREE.es2, cover: freeCover("/teachers/cover-free-2-es.jpg", "Обложка бесплатного образца испанского второго тома с лисой и словом Zorro, пометки FREE 9 ACTIVITIES, 2 LEVELS, 18 WORKSHEETS.") },
    ],
    freeCta: "Скачать",

    faqTitle: "Вопросы перед покупкой",
    faq: [
      { q: "С какой книги начать?", a: "Каждый том самостоятельный. Первый начинается с животных зоопарка и саванны, второй с животных фермы и леса и насекомых. На весь учебный год берите набор: 111 рисунков без повторов." },
      { q: "Чем отличаются английское и испанское издания?", a: "Рисунки, два уровня и расположение на листе одинаковые. В испанском издании все слова и задания на листах на испанском, страница для учителя на английском." },
      { q: "Что я получу?", a: "PDF для печати на каждый том: в первом 113 страниц, во втором 115, черно-белые. Печатная книга не отправляется." },
      { q: "Можно ли печатать на A4?", a: "Да. При покупке на сайте выберите US Letter или A4, файл сверстан под этот размер." },
      { q: "Можно ли делиться файлами с другими учителями?", a: "Одна покупка для одного учителя и его учеников. Каждому следующему учителю нужна своя копия." },
    ],

    authorTitle: "Материалы Рикардо Деми",
    author: "Я автор детских книг и издатель Magic of Discoveries в Майами, штат Флорида. Двенадцать лет преподавал в университете. Все рисунки в этих книгах нарисовал от руки. Представленные здесь материалы созданы мной.",
    authorLink: "Подробнее о моей работе",
    updatedLabel: "Обновлено:",
    updated: "2026-09-16",

    articlesTitle: "Подробнее о работе с материалами",
  },

};

export const teachersForLang = (lang: UiLang): TeachersCopy | undefined => teachers[lang];
