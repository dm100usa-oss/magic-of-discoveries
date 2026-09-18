// Статьи раздела "Как научить рисовать".
//
// Пять статей под пять разных групп запросов:
//   1. рисование в 5-6 лет,
//   2. рисование в 7-8 лет,
//   3. рисование в 9-10 лет,
//   4. что такое пошаговое рисование,
//   5. рисование в классе на весь учебный год.
//
// Правило то же, что и в учительских статьях: ничего, чего нельзя
// проверить, открыв книгу. Все числа взяты из издания "Как нарисовать.
// 111 рисунков шаг за шагом": 111 сюжетов, 231 страница, обычно шесть
// шагов на рисунок, новые линии черные, предыдущие серые, на каждый
// сюжет полный разворот с пунктиром и местом для практики.
//
// Каждая статья устроена одинаково: прямой ответ первым абзацем, затем
// объяснение, затем короткий список, затем вопросы с ответами. Первый
// абзац и вопросы это то, что нейросеть берет в свой ответ целиком.

import type { UiLang } from "./books";
import type { TeacherArticleCopy } from "./teacherArticles";

export interface DrawingArticle {
  id: string;
  published: string;
  updated: string;
  slug: Partial<Record<UiLang, string>>;
  /** Соседние статьи: читатель идет дальше по теме. */
  related: string[];
  /** Книга, о которой статья, без языка издания. Пусто = "how-to-draw-111".
      По нему кнопка в конце статьи ведет на нужную книгу, а страница
      книги показывает только свои статьи. */
  book?: string;
  /** Страница бесплатных листов для кнопки в конце статьи.
      Пусто = "draw-animals-step-by-step". */
  freePage?: string;
  copy: Partial<Record<UiLang, TeacherArticleCopy>>;
}

/** Подписи вокруг текста статьи в этом разделе. */
export const drawingArticleUi: Partial<
  Record<
    UiLang,
    { faq: string; related: string; back: string; by: string; published: string; updated: string }
  >
> = {
  en: {
    faq: "Frequently asked questions",
    related: "Read next",
    back: "Back to how to teach drawing",
    by: "By",
    published: "Published",
    updated: "Updated",
  },
  es: {
    faq: "Preguntas frecuentes",
    related: "Seguir leyendo",
    back: "Volver a cómo enseñar a dibujar",
    by: "Por",
    published: "Publicado",
    updated: "Actualizado",
  },
  ru: {
    faq: "Частые вопросы",
    related: "Читать дальше",
    back: "Вернуться в раздел «Как научить рисовать»",
    by: "Автор",
    published: "Опубликовано",
    updated: "Обновлено",
  },
};

/** Заголовок и вступление раздела. */
export const drawingHub: Partial<
  Record<
    UiLang,
    { title: string; lead: string; seoTitle: string; seoDescription: string; booksTitle: string }
  >
> = {
  en: {
    title: "How to teach drawing",
    lead:
      "Ten practical guides for parents and teachers: what changes between ages five and ten, what step-by-step drawing actually is, how one book can cover a school year, what to draw when a child has no idea, and how to start from zero.",
    seoTitle: "How to Teach a Child to Draw: Guides by Age",
    seoDescription:
      "Practical guides on teaching drawing to children ages 5 to 10: simple shapes, tracing, independent practice, and step-by-step activities for home and the classroom.",
    booksTitle: "Drawing books",
  },
  es: {
    title: "Cómo enseñar a dibujar",
    lead:
      "Diez guías prácticas para familias y maestros: qué cambia entre los cinco y los diez años, qué es realmente el dibujo paso a paso, cómo un libro puede cubrir todo el año escolar, qué dibujar cuando el niño no tiene idea y cómo empezar desde cero.",
    seoTitle: "Cómo enseñar a dibujar a un niño: guías por edades",
    seoDescription:
      "Guías prácticas para enseñar a dibujar a niños de 5 a 10 años: formas sencillas, repaso punteado, práctica independiente y actividades paso a paso para casa y para clase.",
    booksTitle: "Libros de dibujo",
  },
  ru: {
    title: "Как научить рисовать",
    lead:
      "Десять практических статей для родителей и учителей: что меняется между пятью и десятью годами, что такое пошаговое рисование, как одна книга закрывает учебный год, что нарисовать, если нет идеи, и как начать с нуля.",
    seoTitle: "Как научить ребенка рисовать: статьи по возрастам",
    seoDescription:
      "Как учить рисованию детей 5-10 лет: простые формы, обводка по пунктиру, самостоятельная практика и пошаговые задания для дома и для занятий в классе.",
    booksTitle: "Книги по рисованию",
  },
};

export const drawingArticles: DrawingArticle[] = [
  /* ===== 1. Рисование в 5-6 лет ===== */
  {
    id: "draw-5-6",
    published: "2026-09-17",
    updated: "2026-09-17",
    slug: {
      en: "how-to-teach-a-5-year-old-to-draw",
      es: "como-ensenar-a-dibujar-a-un-nino-de-5-anos",
      ru: "kak-nauchit-rebenka-risovat-v-5-6-let",
    },
    related: ["draw-7-8", "step-by-step-drawing"],
    copy: {
      ru: {
        title:
          "Как научить ребенка рисовать в 5-6 лет: от обводки к первому самостоятельному рисунку",
        lead:
          "В пять лет ребенку нужен не красивый образец, а понятный следующий шаг. Метод из четырех действий, который мы использовали в 111 заданиях книги.",
        answer:
          "Начинайте не с копирования сложной готовой картинки, а с простых форм и одного понятного действия за раз. Дайте ребенку сначала увидеть последовательность, затем обвести рисунок по пунктиру и только после этого повторить его самостоятельно. Не требуйте точного сходства с образцом: в начале важнее понять принцип и закончить собственный рисунок.",
        body: [
          {
            h: "В 5-6 лет ребенку нужен не красивый образец, а понятный следующий шаг",
            p: [
              "Если показать пятилетнему ребенку готового льва и сказать: «Нарисуй такого же», задача может оказаться слишком большой. Ребенок видит гриву, морду, лапы и хвост одновременно. Он не понимает, с какой линии начинать.",
              "Мы пришли к другому принципу, когда создавали книгу «Как нарисовать. 111 рисунков шаг за шагом»: ребенку не обязательно сразу понимать, как нарисовать льва. Ему достаточно понимать, что нарисовать сейчас. Сначала круг. Потом еще одна простая форма. Затем две линии. Еще одна деталь. Через несколько понятных действий на странице появляется целый рисунок.",
            ],
          },
          {
            h: "Метод из четырех действий: посмотреть, обвести, нарисовать, раскрасить",
            p: [
              "При разработке 111 заданий мы использовали одну и ту же последовательность. Ребенок видит, как строится рисунок, от первой простой формы до готового изображения. Затем обводит готовый рисунок по пунктиру, и рука проходит по тем линиям, которые скоро придется повторить. Затем рисует тот же объект самостоятельно на свободном месте рядом. И наконец раскрашивает.",
              "Получается короткая цепочка: увидел, обвел, повторил сам, закончил рисунок. В книге все четыре действия находятся на одном развороте. Для маленького ребенка это проще, чем смотреть инструкцию в одном месте, а рисовать на отдельном листе.",
            ],
          },
          {
            h: "Почему предыдущие шаги становятся серыми",
            p: [
              "В каждом следующем шаге новые линии остаются черными, а уже нарисованные становятся серыми. Это сделано не ради оформления.",
              "Если на шестом этапе все линии одинаково черные, ребенку приходится самому искать глазами, что изменилось между пятой и шестой картинкой. В нашей системе ответ виден сразу: черным показано только то, что нужно добавить сейчас. Инструкция должна не просто показывать правильный результат, а снимать лишнюю работу там, где она не относится к рисованию.",
            ],
          },
          {
            h: "С чего начинать",
            p: [
              "Для первых занятий лучше выбирать знакомые предметы и персонажей с хорошо различимой формой: кота, собаку, рыбку, цветок. Не нужно начинать с самого эффектного рисунка в книге: первый успех важнее сложности.",
              "Хорошее занятие в этом возрасте занимает 15-20 минут. Если ребенок хочет продолжать и раскрашивать, прекрасно. Если устал после одного рисунка, этого достаточно. 111 рисунков нужны не для того, чтобы пройти книгу быстрее, а чтобы возвращаться к рисованию регулярно и каждый раз выбирать что-то новое.",
            ],
          },
          {
            h: "Нужно ли исправлять неправильный рисунок",
            p: [
              "Мы бы не превращали первое рисование в проверку на точность. Если получился лев с огромной головой или жираф с короткой шеей, рисунок все равно выполнил свою задачу: ребенок прошел последовательность от простых форм до собственного изображения. Образец нужен как опора, а не как экзаменационный стандарт.",
              "Эти работы стоит сохранить. Поэтому в нашей книге практика находится прямо на страницах, а не на отдельных листах: все рисунки остаются вместе, и через несколько месяцев разница между ранними и поздними работами становится видна сама.",
            ],
          },
        ],
        listTitle: "Что нужно для занятия",
        list: [
          "Книга и обычный карандаш, для раскрашивания цветные карандаши или фломастеры",
          "Отдельный альбом не нужен: место для практики есть внутри книги",
          "Ничего не надо распечатывать заранее",
          "Не надо каждый раз придумывать, что сегодня рисовать",
          "15-20 минут на один рисунок, без раскрашивания",
        ],
        faq: [
          {
            q: "Как научить ребенка 5-6 лет рисовать с нуля?",
            a: "Начните не с готового сложного рисунка, а с одной простой формы. Ребенку легче нарисовать круг, овал или несколько линий, а затем постепенно добавить детали. Именно по этому принципу построены 111 рисунков в нашей книге: каждый сложный объект разбирается на последовательность простых действий.",
          },
          {
            q: "Что лучше для начинающего: обводить или сразу рисовать самому?",
            a: "Мы используем оба действия последовательно: сначала обвести, потом нарисовать самостоятельно. Обводка знакомит ребенка с формой и движением линии, а свободное место рядом позволяет сразу попробовать воспроизвести тот же рисунок без пунктира.",
          },
          {
            q: "Может ли ребенок 5-6 лет заниматься пошаговым рисованием самостоятельно?",
            a: "Да, если инструкция полностью визуальная и каждый новый шаг хорошо виден. В нашей книге новые линии показаны черным, а предыдущие становятся серыми, поэтому ребенку не нужно читать объяснения или самостоятельно искать различия между двумя этапами.",
          },
          {
            q: "Какие рисунки проще всего для ребенка 5-6 лет?",
            a: "Для начала лучше выбирать знакомые объекты с хорошо различимой формой: кота, собаку, рыбку, цветок или простое животное. После первых законченных рисунков можно постепенно переходить к более сложным животным, сказочным персонажам, транспорту и другим темам.",
          },
          {
            q: "Сколько должно длиться занятие рисованием в 5-6 лет?",
            a: "Для одного пошагового рисунка обычно достаточно 15-20 минут, не считая дополнительного времени на раскрашивание. Не обязательно заканчивать несколько заданий подряд: регулярное возвращение к рисованию важнее скорости прохождения книги.",
          },
          {
            q: "Нужно ли ребенку уметь читать, чтобы учиться рисовать по шагам?",
            a: "Нет, если последовательность показана картинками. В книге «Как нарисовать. 111 рисунков шаг за шагом» сами инструкции по рисованию визуальные, поэтому ребенок может понять, какую линию добавить следующей, без чтения текстового объяснения.",
          },
          {
            q: "Что делать, если ребенок говорит: «Я не умею рисовать»?",
            a: "Уменьшите задачу. Вместо «нарисуй льва» предложите начать с первой простой формы и думать только об одном следующем шаге. Пошаговый метод как раз превращает большой готовый рисунок в последовательность небольших понятных действий.",
          },
        ],
        ctaTitle: "Попробуйте метод бесплатно",
        ctaLead:
          "Десять разворотов из книги можно распечатать бесплатно, без регистрации и почты: на одном листе шаги, на другом пунктир и место для своего рисунка. Если подойдет, в книге таких разворотов 111.",
      },
      en: {
        title:
          "How to Teach a 5- or 6-Year-Old to Draw: From Tracing to Their First Independent Drawing",
        lead:
          "At five, a child does not need a perfect picture to copy. They need to know what to do next. The four-part method behind 111 activities.",
        answer:
          "Start with simple shapes instead of asking the child to copy a complicated finished picture. Let them see the sequence first, trace the completed drawing, and then try it independently. At this stage, understanding the process and completing a drawing matters more than making an exact copy of the example.",
        body: [
          {
            h: "At age 5 or 6, a child does not need a perfect picture to copy",
            p: [
              "Show a five-year-old a finished drawing of a lion and say, \"Draw one like this,\" and the task can suddenly feel enormous. The child sees the mane, face, legs, paws, and tail all at once. The problem is not necessarily that they cannot draw a lion. Often, they simply do not know where to begin.",
              "When we created How to Draw 111, we worked from a different idea: a child does not need to know how to draw an entire lion yet. They only need to understand what to draw right now. First a circle. Then another simple shape. Next a couple of lines. Then one more detail. A few clear steps later, those simple shapes have become a complete drawing.",
            ],
          },
          {
            h: "Our four-part method: look, trace, draw, color",
            p: [
              "While developing the 111 activities in our book, we used the same basic sequence. The child sees how the drawing is built, from the first simple shape to the finished picture. Then they trace the completed picture, so their hand has already followed the lines they will soon reproduce. Then they draw the same subject independently in the space right beside it. Finally they color it.",
              "The sequence is simple: look, trace, draw independently, color. In our book, all four parts are kept together on the same two-page spread. For a young child, that is easier than studying instructions in one place and then moving somewhere else to practice.",
            ],
          },
          {
            h: "Why previous steps turn gray",
            p: [
              "At each new stage, the new lines are black while the lines from previous steps turn gray. We did not do this just to make the page look nice.",
              "Imagine a child reaches Step 6 and every line is black. To figure out what to draw, they have to compare Step 5 with Step 6 and search for the difference. In our system the answer is visible immediately: the black lines show exactly what to add now. A good instruction should not only show the correct result. It should remove work that has nothing to do with drawing.",
            ],
          },
          {
            h: "What should a 5- or 6-year-old draw first",
            p: [
              "For the first few activities, choose familiar subjects with clear shapes: a cat, a dog, a fish, a flower. There is no need to begin with the most impressive drawing in the book. Early success matters more than difficulty.",
              "A session at this age can be as short as 15 to 20 minutes. If the child wants to keep going and color the picture, great. If one drawing is enough for the day, that is fine too. The purpose of 111 drawings is not to finish the book quickly. It is to come back to drawing regularly and still have something new to choose each time.",
            ],
          },
          {
            h: "Should you correct a drawing that does not look like the example",
            p: [
              "We would not turn a child's first drawing experiences into a test of accuracy. If the lion ends up with an enormous head or the giraffe has a very short neck, the activity still did its job: the child moved from a few simple shapes to a complete picture of their own. The example should be a guide, not an exam.",
              "Those early drawings are worth keeping. That is one reason we put the practice directly inside the book instead of relying on loose sheets. The drawings stay together, and over time the book becomes a collection of a child's earliest artwork.",
            ],
          },
        ],
        listTitle: "What you need to get started",
        list: [
          "The book and an ordinary pencil, plus colored pencils or markers for coloring",
          "No separate sketchbook: the practice space is inside the book",
          "Nothing to print before a session",
          "No need to decide from scratch what to draw today",
          "About 15 to 20 minutes for one drawing, before coloring",
        ],
        faq: [
          {
            q: "How do you teach a 5- or 6-year-old to draw from scratch?",
            a: "Start with one simple shape rather than a complicated finished picture. A child can draw a circle, oval, or a few lines first and then add details one at a time. This is the principle behind the 111 drawings in How to Draw 111: each finished picture is broken into a sequence of manageable actions.",
          },
          {
            q: "Should a beginner trace first or draw independently?",
            a: "Both help when they happen in sequence: trace first, then draw independently. In our book, children trace the completed dotted picture and then immediately try the same subject in the blank space beside it.",
          },
          {
            q: "Can a 5-year-old follow a step-by-step drawing activity independently?",
            a: "A young child can follow a well-designed visual sequence without reading instructions. In our system, new lines are black and previous lines turn gray, so the child can immediately see what needs to be added next.",
          },
          {
            q: "What are easy things for a 5- or 6-year-old to draw?",
            a: "Familiar subjects with recognizable shapes are a good starting point: a cat, dog, fish, flower, or simple animal. Once children are comfortable with the process, they can move on to more detailed animals, fantasy characters, vehicles, food, and other subjects.",
          },
          {
            q: "How long should a drawing activity be for a 5- or 6-year-old?",
            a: "A single step-by-step drawing usually fits into about 15 to 20 minutes, with more time if the child wants to color it. There is no need to complete several drawings at once; the book is designed to be returned to over time.",
          },
          {
            q: "Does a child need to know how to read to use a step-by-step drawing book?",
            a: "Not if the drawing instructions are visual. The sequences in How to Draw 111 show each change in pictures, so beginning readers and children who are not reading yet can follow the process.",
          },
          {
            q: "What should I do when my child says, \"I can't draw\"?",
            a: "Make the task smaller. Instead of asking the child to draw a lion, ask them to begin with the first simple shape and focus only on the next step. Step-by-step drawing turns one intimidating picture into a series of smaller actions.",
          },
        ],
        ctaTitle: "Try the method for free",
        ctaLead:
          "Ten spreads from the book are free to print, with no registration and no email: the steps on one sheet, the dotted outline and practice space on the next. If it works for your child, the book has 111 of them.",
      },
      es: {
        title:
          "Cómo enseñar a dibujar a un niño de 5 a 6 años: del trazo guiado a su primer dibujo independiente",
        lead:
          "A los cinco años, un niño no necesita un dibujo perfecto como modelo: necesita saber cuál es el siguiente paso. El método de cuatro acciones detrás de 111 ejercicios.",
        answer:
          "En lugar de pedirle que copie una imagen completa y complicada, conviene comenzar con formas sencillas y una acción clara a la vez. Primero puede observar la secuencia, después repasar el dibujo por las líneas punteadas y finalmente intentar hacerlo por su cuenta. Al principio, comprender el proceso y terminar su propio dibujo es más importante que copiar el modelo con exactitud.",
        body: [
          {
            h: "A los 5 o 6 años, lo que hace falta es saber cuál es el siguiente paso",
            p: [
              "Si le mostramos a un niño de cinco años el dibujo terminado de un león y le decimos: «Dibuja uno igual», la tarea puede parecer demasiado difícil. Ve la melena, la cara, las patas y la cola al mismo tiempo. Muchas veces el problema no es que no pueda dibujarlo: simplemente no sabe por dónde empezar.",
              "Al crear Cómo dibujar. 111 dibujos paso a paso, partimos de una idea diferente: el niño no necesita saber desde el principio cómo dibujar un león completo. Solo necesita entender qué debe dibujar ahora. Primero un círculo. Después otra forma sencilla. Luego un par de líneas. Más tarde un nuevo detalle.",
            ],
          },
          {
            h: "Nuestro método de cuatro acciones: mirar, repasar, dibujar y colorear",
            p: [
              "Al desarrollar los 111 ejercicios utilizamos la misma secuencia. El niño mira cómo se construye el dibujo, desde la primera forma sencilla hasta la imagen terminada. Después repasa el dibujo por las líneas punteadas, de modo que su mano ya ha recorrido las formas que tendrá que repetir. Luego dibuja el mismo objeto por su cuenta en el espacio que está al lado. Y al final lo colorea.",
              "La secuencia es sencilla: mirar, repasar, dibujar por su cuenta, colorear. En el libro, las cuatro acciones están reunidas en una misma página doble. Para un niño pequeño, esto resulta más fácil que mirar las instrucciones en un lugar y dibujar en una hoja aparte.",
            ],
          },
          {
            h: "Por qué los pasos anteriores aparecen en gris",
            p: [
              "En cada nuevo paso, las líneas nuevas aparecen en negro y las anteriores pasan a gris. No lo hicimos solo por estética.",
              "Si en el sexto paso todas las líneas fueran negras, el niño tendría que comparar la quinta y la sexta imagen para descubrir qué cambió. Con nuestro sistema, la respuesta se ve de inmediato: las líneas negras muestran exactamente qué hay que agregar. Una buena instrucción no solo muestra el resultado correcto, también evita dificultades que no forman parte del dibujo.",
            ],
          },
          {
            h: "Con qué dibujos conviene comenzar",
            p: [
              "Para las primeras actividades es mejor elegir objetos conocidos y con formas fáciles de reconocer: un gato, un perro, un pez o una flor. No es necesario empezar con el dibujo más impresionante del libro. Al principio, terminar un dibujo importa más que elegir el más difícil.",
              "Una actividad puede durar unos 15 o 20 minutos. Si el niño quiere seguir y colorear, perfecto. Si después de un dibujo ya está cansado, también está bien. Los 111 dibujos no están pensados para terminar el libro rápido, sino para volver a dibujar con regularidad y elegir algo diferente cada vez.",
            ],
          },
          {
            h: "¿Hay que corregir un dibujo que no se parece al modelo?",
            p: [
              "No recomendamos convertir las primeras experiencias de dibujo en una prueba de precisión. Si el león tiene una cabeza enorme o la jirafa termina con el cuello demasiado corto, el ejercicio sigue teniendo valor: el niño pasó de unas formas sencillas a una imagen creada por él mismo.",
              "Vale la pena conservar esos primeros dibujos. Por eso la práctica se hace directamente en las páginas del libro y no en hojas sueltas: los dibujos permanecen juntos y, con el tiempo, el libro se convierte en un álbum de los primeros trabajos del niño.",
            ],
          },
        ],
        listTitle: "Qué se necesita para empezar",
        list: [
          "El libro y un lápiz; lápices de colores o marcadores para colorear",
          "No hace falta un cuaderno aparte: el espacio para practicar está dentro del libro",
          "No hay que imprimir nada antes de cada sesión",
          "No hay que pensar cada vez qué dibujar",
          "Unos 15 a 20 minutos por dibujo, sin contar el coloreado",
        ],
        faq: [
          {
            q: "¿Cómo enseñar a dibujar desde cero a un niño de 5 o 6 años?",
            a: "Conviene comenzar con una forma sencilla en lugar de pedirle que copie una imagen complicada. Un círculo, un óvalo o unas cuantas líneas pueden convertirse poco a poco en un dibujo completo. Este es el principio que utilizamos en los 111 dibujos del libro.",
          },
          {
            q: "¿Es mejor repasar primero o dibujar directamente por su cuenta?",
            a: "Las dos actividades se complementan: primero repasar y después dibujar por su cuenta. En nuestro libro, el niño sigue el contorno punteado y enseguida intenta hacer el mismo dibujo en el espacio en blanco que está al lado.",
          },
          {
            q: "¿Un niño de 5 años puede seguir un dibujo paso a paso sin ayuda?",
            a: "Puede hacerlo si la secuencia es visual y muestra claramente qué cambia en cada paso. En nuestro sistema, las líneas nuevas aparecen en negro y las anteriores pasan a gris, para que el niño vea de inmediato qué debe agregar.",
          },
          {
            q: "¿Qué dibujos son fáciles para niños de 5 a 6 años?",
            a: "Para comenzar funcionan bien objetos conocidos con formas fáciles de reconocer, como un gato, un perro, un pez, una flor o un animal sencillo. Después se puede avanzar hacia animales con más detalles, personajes de fantasía, vehículos y otros temas.",
          },
          {
            q: "¿Cuánto debe durar una actividad de dibujo para un niño de 5 o 6 años?",
            a: "Un dibujo paso a paso puede realizarse normalmente en unos 15 a 20 minutos, más el tiempo que el niño quiera dedicar a colorearlo. No es necesario hacer varios dibujos en una sola sesión.",
          },
          {
            q: "¿Es necesario saber leer para aprender a dibujar paso a paso?",
            a: "No, siempre que las instrucciones sean visuales. En Cómo dibujar. 111 dibujos paso a paso, la secuencia se entiende por medio de imágenes y no depende de instrucciones escritas.",
          },
          {
            q: "¿Qué hacer cuando un niño dice «No sé dibujar»?",
            a: "Hay que hacer la tarea más pequeña. En lugar de pedirle que dibuje un león completo, puede comenzar con la primera forma y concentrarse únicamente en el siguiente paso.",
          },
        ],
        ctaTitle: "Pruebe el método gratis",
        ctaLead:
          "Diez dobles páginas del libro se pueden imprimir gratis, sin registro y sin correo: los pasos en una hoja y, en la siguiente, el contorno punteado y el espacio para dibujar. Si funciona, el libro tiene 111.",
      },
    },
  },
  /* ===== 2. Рисование в 7-8 лет ===== */
  {
    id: "draw-7-8",
    published: "2026-09-17",
    updated: "2026-09-17",
    slug: {
      en: "how-to-teach-a-7-year-old-to-draw",
      es: "como-ensenar-a-dibujar-a-un-nino-de-7-anos",
      ru: "kak-nauchit-rebenka-risovat-v-7-8-let",
    },
    related: ["draw-5-6", "draw-9-10"],
    copy: {
      ru: {
        title: "Как научить ребенка рисовать в 7-8 лет: когда копирования уже недостаточно",
        lead:
          "В семь лет появляется вопрос «почему у меня не похоже». Как удержать баланс между интересным результатом и понятным путем к нему.",
        answer:
          "Давайте ребенку рисунки, которые выглядят интересными, но разбиты на простые понятные этапы. После повторения по образцу обязательно оставляйте место для самостоятельной попытки. Лучше заниматься регулярно по 15-20 минут и менять темы, чем редко проводить длинные занятия.",
        body: [
          {
            h: "В 7-8 лет меняется главный вопрос",
            p: [
              "Пятилетний ребенок часто спрашивает: «Как это нарисовать?» В семь-восемь лет появляется другой вопрос: «Почему у меня не похоже?» Ребенок уже замечает пропорции и детали и сравнивает свою работу с образцом гораздо внимательнее.",
              "Поэтому слишком простой рисунок быстро становится скучным, а слишком сложный может снова привести к фразе «я не умею». При работе над 111 рисунками мы старались удержать именно этот баланс: итоговый рисунок должен выглядеть интересным, но путь к нему должен оставаться понятным.",
            ],
          },
          {
            h: "Сложный рисунок не требует сложных шагов",
            p: [
              "Жираф целиком кажется непростым. Но ребенку не нужно рисовать «жирафа». Сейчас он рисует одну форму. Потом шею. Потом голову. Потом ноги. Потом детали.",
              "Пошаговое рисование разбивает не сам объект, а решение задачи на небольшие части. Поэтому ребенок делает рисунок, который в готовом виде выглядит сложнее его отдельных этапов. В книге большинство изображений строится примерно за шесть шагов, и на каждом этапе новые линии выделены черным, а предыдущие становятся серыми.",
            ],
          },
          {
            h: "Нужна самостоятельная попытка",
            p: [
              "Просто повторить линии по инструкции уже недостаточно. Поэтому после пошагового примера идут два разных упражнения: сначала ребенок обводит весь рисунок по пунктиру, затем рядом рисует его самостоятельно.",
              "Это не одно и то же задание. При обводке форма уже существует. При самостоятельном рисунке ребенку приходится самому решать, где начать линию, насколько большой сделать голову, где разместить лапы или хвост. Именно поэтому место для собственной работы стоит прямо рядом с обводкой.",
            ],
          },
          {
            h: "Два-три рисунка в неделю вместо гонки по книге",
            p: [
              "В книге 111 рисунков. Три задания в неделю закрывают учебный год целиком, двух хватает на год с запасом. То есть книгу не обязательно проходить за месяц, а лишние рисунки дают ребенку выбор, а не обязанность.",
              "Темы при этом меняются: сегодня животное, в следующий раз морской обитатель, потом дракон, ракета, спортивный предмет или мороженое. Техника остается знакомой, а содержание новое. Все предыдущие работы остаются рядом, и ребенок листает собственную практику назад.",
            ],
          },
          {
            h: "Что говорить, если получилось не похоже",
            p: [
              "Вместо «здесь неправильно» полезнее вернуться к конкретному шагу: «Посмотри, с какой формы начинается голова» или «Что добавилось на этом шаге?» Так внимание возвращается к действию, которое ребенок может понять и повторить, а сам рисунок остается его рисунком.",
              "К каждому из 111 рисунков мы добавили короткий интересный факт. Ребенок пришел рисовать дельфина или жирафа, но вместе с рисунком получает маленький кусочек знания. Занятие не превращается в урок энциклопедии, но и не остается механическим повторением линий.",
            ],
          },
        ],
        listTitle: "Как выглядит регулярная практика",
        list: [
          "Два-три коротких занятия в неделю вместо ежедневных",
          "15-20 минут на рисунок, раскрашивание по желанию",
          "Каждый раз новая тема при том же порядке действий",
          "После обводки обязательно своя попытка рядом",
          "Все работы остаются в книге по порядку",
        ],
        faq: [
          {
            q: "Как научить ребенка 7-8 лет рисовать лучше?",
            a: "Полезно сочетать образец с самостоятельной практикой. Ребенок сначала видит, как рисунок строится из простых форм, затем обводит готовый контур и после этого повторяет изображение самостоятельно.",
          },
          {
            q: "Нужно ли ребенку 7-8 лет продолжать рисовать поэтапно?",
            a: "Да. В этом возрасте пошаговая схема может показывать не только что нарисовать, но и как сложный рисунок строится из простых частей. Это позволяет перейти от повторения отдельных линий к пониманию всей последовательности.",
          },
          {
            q: "Почему ребенок умеет обводить рисунок, но не может нарисовать его сам?",
            a: "Это две разные задачи. При обводке линия уже существует, а при самостоятельном рисунке ребенку приходится самому выбирать ее начало, направление, длину и расположение. Поэтому в нашей книге после обводки предусмотрено отдельное место для самостоятельной попытки.",
          },
          {
            q: "Как часто ребенку 7-8 лет заниматься рисованием?",
            a: "Не обязательно рисовать каждый день. Два-три коротких занятия в неделю делают практику регулярной и разнообразной. При таком темпе 111 рисунков дают материал на весь учебный год.",
          },
          {
            q: "Как заинтересовать ребенка, если ему быстро становится скучно?",
            a: "Меняйте темы, сохраняя знакомый формат задания. В книге после животного можно выбрать морского обитателя, сказочного героя, транспорт, еду или природу: метод остается понятным, а рисунки меняются.",
          },
          {
            q: "Нужно ли исправлять рисунок, если он не похож на образец?",
            a: "Лучше указать на конкретный этап, а не оценивать весь рисунок как неправильный. Например: «Посмотри, с какой формы начинается голова» или «Что добавилось на следующем шаге?»",
          },
        ],
        ctaTitle: "Попробуйте бесплатно",
        ctaLead:
          "Десять разворотов из книги можно распечатать бесплатно и посмотреть, подойдет ли уровень: на одном листе шаги, на другом пунктир и место для своего рисунка.",
      },
      en: {
        title: "How to Teach a 7- or 8-Year-Old to Draw: When Copying Is No Longer Enough",
        lead:
          "At seven, a new question appears: why doesn't mine look like that? How to balance an interesting result with a path that stays clear.",
        answer:
          "Choose pictures that look interesting but are broken into clear, manageable steps. After following the example, give the child space to try the drawing independently. Short, regular drawing sessions with varied subjects are easier to sustain than occasional long lessons.",
        body: [
          {
            h: "At age 7 or 8, the question begins to change",
            p: [
              "A five-year-old may ask, \"How do I draw this?\" At seven or eight, another question appears: \"Why doesn't mine look like that?\" Children at this age notice proportions and details more clearly and compare their own work with the example more carefully.",
              "A drawing that is too simple may no longer hold their attention, while one that feels too complicated can quickly bring back the familiar \"I can't draw.\" When we developed 111 step-by-step drawings, we worked to keep those two sides in balance.",
            ],
          },
          {
            h: "A complicated-looking drawing does not need complicated steps",
            p: [
              "Look at a finished giraffe and the shape can seem difficult. But the child does not have to draw a giraffe all at once. Right now they draw one shape. Next comes the neck. Then the head. Then the legs. Then the details.",
              "Step-by-step drawing does not simply divide a picture into smaller pictures. It divides the problem into smaller decisions a child can handle one at a time. Most drawings in our book are built in about six steps, and at each stage the new lines are black while the previous lines turn gray.",
            ],
          },
          {
            h: "Independent practice matters",
            p: [
              "Following a sequence should not be the end of the activity. That is why our method includes two different forms of practice: first the child traces the complete dotted drawing, then draws the same subject independently beside it.",
              "Those are not the same exercise. When tracing, the shape already exists. When drawing independently, the child decides where a line begins, how large to make the head, and where to place the legs, ears, or tail.",
            ],
          },
          {
            h: "Two or three drawings a week, not a race through the book",
            p: [
              "The book contains 111 drawings. Three a week covers a full school year, and two a week covers it with room to spare. There is no reason to race through the book in a month, and the extra drawings give a child choice rather than an obligation.",
              "The subjects keep changing: an animal today, sea life next time, then a dragon, a rocket, a sports item, or an ice cream cone. The method stays familiar while the content is new, and all the earlier work stays in the book.",
            ],
          },
          {
            h: "What to say when the drawing does not look right",
            p: [
              "Instead of saying \"that's wrong,\" return to something specific: \"Look at the shape the head starts with,\" or \"What new line was added in this step?\" That moves attention back to an action the child can repeat, and the finished picture still belongs to them.",
              "Each of the 111 drawings includes a short fun fact. A child opens the page to draw a dolphin or a giraffe and discovers something about it along the way. The activity does not become an encyclopedia lesson, but it is more than copying lines.",
            ],
          },
        ],
        listTitle: "What regular practice looks like",
        list: [
          "Two or three short sessions a week rather than daily drawing",
          "15 to 20 minutes per drawing, coloring optional",
          "A new subject each time within the same familiar format",
          "Always an independent attempt after the tracing",
          "All the work stays in the book, in order",
        ],
        faq: [
          {
            q: "How can I help my 7- or 8-year-old get better at drawing?",
            a: "Combine a clear example with independent practice. Let the child see how a picture is built from simple forms, trace the completed picture, and then try drawing the same subject independently.",
          },
          {
            q: "Is step-by-step drawing still useful for 7- and 8-year-olds?",
            a: "Yes. At this age a sequence can show not only what to draw, but how a more complicated picture is constructed from simpler parts. The sequence becomes a way to understand the drawing rather than simply copy it.",
          },
          {
            q: "Why can my child trace a picture but struggle to draw it independently?",
            a: "Tracing and independent drawing require different decisions. When tracing, the line already exists. When drawing independently, the child has to decide where the line starts, where it goes, how long it should be, and how it relates to the rest of the picture.",
          },
          {
            q: "How often should a 7- or 8-year-old practice drawing?",
            a: "Drawing does not have to happen every day. Two or three short sessions per week create a regular routine while keeping the activities varied. With 111 drawings, that pace provides activities throughout a school year.",
          },
          {
            q: "How do you keep drawing interesting for a 7- or 8-year-old?",
            a: "Change the subject while keeping the activity structure familiar. Children can move from animals to sea life, fantasy characters, vehicles, food, and nature without learning a new set of instructions each time.",
          },
          {
            q: "Should I correct my child's drawing if it doesn't match the example?",
            a: "Instead of labeling the whole drawing as wrong, return to a specific step. Ask what shape the head started with or what new line appeared at a particular stage. That gives the child something concrete to look at and try again.",
          },
        ],
        ctaTitle: "Try it for free",
        ctaLead:
          "Ten spreads from the book are free to print, so you can see whether the level fits: the steps on one sheet, the dotted outline and practice space on the next.",
      },
      es: {
        title: "Cómo enseñar a dibujar a niños de 7 a 8 años: cuando copiar ya no es suficiente",
        lead:
          "A los siete años aparece otra pregunta: ¿por qué el mío no se parece? Cómo mantener el equilibrio entre un resultado interesante y un camino claro.",
        answer:
          "Conviene elegir dibujos que resulten interesantes, pero que estén divididos en pasos sencillos y fáciles de identificar. Después de seguir el modelo, es importante dejar espacio para que el niño intente hacerlo por su cuenta. Las sesiones cortas y regulares, con temas variados, suelen ser más fáciles de mantener que actividades largas y ocasionales.",
        body: [
          {
            h: "A los 7 u 8 años cambia la pregunta",
            p: [
              "Un niño de cinco años suele preguntar: «¿Cómo dibujo esto?» A los siete u ocho aparece otra pregunta: «¿Por qué el mío no se parece?» A esta edad los niños prestan más atención a las proporciones y comparan su trabajo con el modelo de manera más consciente.",
              "Por eso un dibujo demasiado sencillo puede dejar de interesarles, mientras que uno demasiado complicado puede hacer que vuelvan a pensar «no sé dibujar». Al desarrollar 111 dibujos paso a paso buscamos precisamente ese equilibrio.",
            ],
          },
          {
            h: "Un dibujo complejo no necesita pasos complejos",
            p: [
              "Una jirafa terminada puede parecer difícil. Pero el niño no tiene que dibujar una jirafa de una sola vez. Ahora dibuja una forma. Después el cuello. Luego la cabeza. Más tarde las patas y los detalles.",
              "El dibujo paso a paso divide el problema en pequeñas decisiones que el niño puede resolver una por una. En nuestro libro la mayoría de los dibujos se construyen en unos seis pasos, y en cada uno las líneas nuevas aparecen en negro y las anteriores pasan a gris.",
            ],
          },
          {
            h: "Hace falta un intento independiente",
            p: [
              "Seguir las líneas de una instrucción ya no debería ser toda la actividad. Por eso incluimos dos ejercicios distintos: primero el niño repasa el dibujo completo por las líneas punteadas y después lo dibuja por su cuenta.",
              "No son el mismo ejercicio. Al repasar, la forma ya existe. Al dibujar solo, el niño decide dónde comienza una línea, qué tamaño tendrá la cabeza y dónde colocar las patas, las orejas o la cola.",
            ],
          },
          {
            h: "Dos o tres dibujos por semana",
            p: [
              "El libro contiene 111 dibujos. Tres por semana cubren todo el año escolar y dos por semana lo cubren con margen. No hace falta terminar el libro en un mes, y los dibujos restantes dan al niño la posibilidad de elegir.",
              "Los temas van cambiando: hoy un animal, la próxima vez un animal marino, después un dragón, un cohete o un helado. El sistema de trabajo sigue siendo conocido y el contenido es nuevo. Además, todos los trabajos anteriores permanecen en el libro.",
            ],
          },
          {
            h: "Qué decir cuando el dibujo no se parece",
            p: [
              "En lugar de decir «eso está mal», es más útil regresar a una acción concreta: «Mira con qué forma empieza la cabeza» o «¿Qué línea nueva apareció en este paso?» Así la atención vuelve a algo que el niño puede observar y repetir, y el dibujo sigue siendo suyo.",
              "Con cada uno de los 111 dibujos incluimos un dato curioso. El niño llega para dibujar un delfín o una jirafa y, junto con el dibujo, descubre algo sobre ese animal.",
            ],
          },
        ],
        listTitle: "Cómo es una práctica regular",
        list: [
          "Dos o tres sesiones cortas por semana en lugar de dibujar a diario",
          "De 15 a 20 minutos por dibujo, colorear si hay tiempo",
          "Un tema nuevo cada vez dentro del mismo formato",
          "Después de repasar, siempre un intento propio al lado",
          "Todos los trabajos quedan en el libro y en orden",
        ],
        faq: [
          {
            q: "¿Cómo ayudar a un niño de 7 u 8 años a dibujar mejor?",
            a: "Conviene combinar un modelo claro con práctica independiente. El niño puede observar cómo se construye el dibujo, repasar el contorno completo y después intentar hacerlo por su cuenta.",
          },
          {
            q: "¿El dibujo paso a paso sigue siendo útil a los 7 u 8 años?",
            a: "Sí. A esta edad la secuencia puede mostrar no solo qué dibujar, sino cómo una imagen más compleja se construye a partir de formas sencillas.",
          },
          {
            q: "¿Por qué mi hijo puede repasar un dibujo pero le cuesta hacerlo solo?",
            a: "Son dos tareas diferentes. Al repasar, la línea ya está marcada. Al dibujar por su cuenta, el niño debe decidir dónde comienza, hacia dónde va, cuánto mide y dónde se coloca respecto a las demás partes.",
          },
          {
            q: "¿Con qué frecuencia debe practicar dibujo un niño de 7 u 8 años?",
            a: "No es necesario dibujar todos los días. Dos o tres sesiones cortas por semana permiten mantener una práctica regular. Con 111 dibujos, ese ritmo ofrece actividades para todo un año escolar.",
          },
          {
            q: "¿Cómo evitar que un niño se aburra de las actividades de dibujo?",
            a: "Se pueden cambiar los temas sin cambiar el sistema de trabajo. Animales, vida marina, personajes de fantasía, vehículos, comida y naturaleza ofrecen variedad mientras la estructura paso a paso sigue siendo familiar.",
          },
          {
            q: "¿Hay que corregir un dibujo que no se parece al modelo?",
            a: "Es mejor volver a un paso concreto que decir que todo el dibujo está mal. Se puede preguntar: «¿Con qué forma empieza la cabeza?» o «¿Qué línea nueva aparece aquí?»",
          },
        ],
        ctaTitle: "Pruébelo gratis",
        ctaLead:
          "Diez dobles páginas del libro se pueden imprimir gratis para comprobar si el nivel encaja: los pasos en una hoja y, al lado, el contorno punteado y el espacio para dibujar.",
      },
    },
  },
  /* ===== 3. Рисование в 9-10 лет ===== */
  {
    id: "draw-9-10",
    published: "2026-09-17",
    updated: "2026-09-17",
    slug: {
      en: "drawing-for-9-and-10-year-olds",
      es: "dibujo-para-ninos-de-9-y-10-anos",
      ru: "risovanie-dlya-detey-9-10-let",
    },
    related: ["draw-7-8", "step-by-step-drawing"],
    copy: {
      ru: {
        title: "Рисование для детей 9-10 лет: как перейти от пошагового рисунка к самостоятельному",
        lead:
          "Пошаговая схема в этом возрасте работает иначе: не как инструкция «рисуй за мной», а как разбор того, из чего построен рисунок.",
        answer:
          "Используйте пошаговые рисунки не только для копирования, а для разбора конструкции изображения. После выполнения задания предложите нарисовать объект самостоятельно, по памяти или с измененными деталями. Цель постепенно смещается от точного повторения образца к пониманию того, как рисунок построен.",
        body: [
          {
            h: "В девять лет пошаговое рисование не становится слишком простым",
            p: [
              "Иногда считают, что пошаговые рисунки нужны только дошкольникам. Все зависит от того, что происходит после последнего шага. Если ребенок только механически копирует шесть картинок, возможности действительно ограничены.",
              "Но пошаговая схема может работать иначе: как разбор того, из каких простых частей построен готовый рисунок. Для ребенка 9-10 лет это уже способ увидеть конструкцию изображения, а не только инструкция «рисуй за мной».",
            ],
          },
          {
            h: "Сначала повторить, потом попробовать без подсказки",
            p: [
              "В книге упражнение не заканчивается последней картинкой инструкции. После нее ребенок обводит готовый рисунок, а затем получает свободное место для собственной попытки.",
              "Для более старшего ребенка можно пойти дальше: сначала пройти шаги, затем закрыть их и попробовать нарисовать объект еще раз. Не обязательно воспроизводить его идеально. Задача меняется: теперь ребенок пытается вспомнить логику построения.",
            ],
          },
          {
            h: "Простые формы никуда не исчезают",
            p: [
              "Круги, овалы и линии это не «рисование для малышей», а строительные элементы рисунка. Когда ребенок начинает замечать их внутри более сложных изображений, он получает инструмент, который можно переносить на другие задачи.",
              "Именно поэтому наши 111 рисунков начинаются не с готового контура, который нужно скопировать, а с простой основы, к которой постепенно добавляются детали.",
            ],
          },
          {
            h: "Разрешите менять образец",
            p: [
              "В девять-десять лет не обязательно требовать точного повторения. Если ребенок хочет изменить выражение мордочки, добавить деталь или раскрасить персонажа иначе, это уже не ошибка. Пошаговая инструкция дала ему каркас, дальше он использует его как отправную точку.",
              "В этом возрасте особенно видна разница между образцом как ответом и образцом как инструментом. Мы делали книгу именно как инструмент.",
            ],
          },
          {
            h: "Не выбрасывайте старые работы",
            p: [
              "Прогресс трудно увидеть по памяти, но легко увидеть, открыв страницы, нарисованные несколько месяцев назад. Отдельные листы расходятся по папкам, холодильникам и мусорным корзинам, а в рабочей книге рисунки остаются в хронологическом порядке.",
              "В книге 231 страница и 111 рисунков. Если ребенок действительно работает на страницах, двух одинаковых экземпляров в конце не существует: печатная книга постепенно превращается в его книгу.",
            ],
          },
        ],
        listTitle: "Что меняется в этом возрасте",
        list: [
          "Шаги используются как разбор конструкции, а не только для копирования",
          "После задания полезна попытка по памяти",
          "Менять детали образца можно и нужно",
          "Одни и те же простые формы встречаются в разных рисунках",
          "Практика остается в книге и показывает прогресс",
        ],
        faq: [
          {
            q: "Подходит ли пошаговое рисование детям 9-10 лет?",
            a: "Да, если использовать его не только для копирования. В этом возрасте пошаговая схема помогает увидеть, из каких простых форм и последовательных действий построен более сложный рисунок.",
          },
          {
            q: "Как перейти от рисования по образцу к самостоятельному?",
            a: "После выполнения пошагового рисунка предложите ребенку повторить его без инструкции или изменить отдельные детали. Так образец постепенно становится не готовым ответом, а основой для собственного рисунка.",
          },
          {
            q: "Не слишком ли просты круги и овалы для ребенка 9-10 лет?",
            a: "Нет. Простые геометрические формы остаются строительными элементами более сложных изображений. Важно уже не просто уметь нарисовать овал, а научиться замечать, где подобная форма скрывается внутри животного, предмета или персонажа.",
          },
          {
            q: "Что делать, если ребенок хочет изменить рисунок из инструкции?",
            a: "Позволить изменить его. Другие цвета, выражение мордочки или собственная деталь могут стать естественным переходом от повторения к самостоятельному творчеству.",
          },
          {
            q: "Как ребенку увидеть собственный прогресс в рисовании?",
            a: "Сохраняйте ранние работы и сравнивайте их с более поздними. В книге с практикой прямо на страницах рисунки остаются в последовательности, поэтому ребенок может открыть работу нескольких месяцев назад и увидеть изменения сам.",
          },
          {
            q: "Зачем ребенку 111 разных рисунков?",
            a: "Большое количество разных объектов позволяет снова встречать знакомые формы в новых комбинациях. Ребенок начинает замечать, что одни и те же базовые элементы используются при построении совершенно разных изображений.",
          },
        ],
        ctaTitle: "Посмотрите, как устроен разворот",
        ctaLead:
          "Десять разворотов из книги можно распечатать бесплатно: шаги, пунктир и место для собственного рисунка. Это и есть та конструкция, о которой идет речь в статье.",
      },
      en: {
        title: "Drawing for 9- and 10-Year-Olds: Moving From Step-by-Step Drawing to Independent Art",
        lead:
          "At this age a sequence works differently: not as \"copy what I do,\" but as a way to see how a picture is built.",
        answer:
          "Use step-by-step examples not only for copying but also for understanding how a picture is constructed. After completing the sequence, have the child try the drawing independently, from memory, or with details of their own. The goal can gradually shift from reproducing an example to understanding and reusing the structure behind it.",
        body: [
          {
            h: "At age 9, step-by-step drawing does not have to be too easy",
            p: [
              "Step-by-step drawing is sometimes treated as something only younger children need. But that depends on what happens after the final step. If a child simply copies six pictures mechanically, the learning opportunity is limited.",
              "A sequence can do something more useful: show how a finished picture is constructed from simpler parts. For a 9- or 10-year-old it becomes a way to understand the structure behind a drawing.",
            ],
          },
          {
            h: "Follow the steps first, then try without them",
            p: [
              "In How to Draw 111 the activity does not end with the final instructional picture. After following the sequence, the child traces the completed drawing and then gets blank space to draw it independently.",
              "With an older child you can go further: follow the sequence once, then cover the steps and try drawing the same subject again. The goal is not perfect reproduction. Now the child is trying to remember how the drawing was built.",
            ],
          },
          {
            h: "Simple shapes are not just for little kids",
            p: [
              "Circles, ovals, curves, and lines do not disappear as drawing becomes more advanced. They are building blocks. Once children recognize these forms inside more complicated pictures, they have a tool they can carry into other drawings.",
              "That is why our 111 drawings do not begin with a finished outline to copy. They begin with a simple foundation and build from it.",
            ],
          },
          {
            h: "Let the child change the example",
            p: [
              "At nine or ten, an exact copy does not always need to be the goal. If a child changes a facial expression, adds a detail, or colors a character differently, that does not mean the activity went wrong. The steps provided a structure, and that structure becomes a starting point.",
              "There is an important difference between an example as the correct answer and an example as a tool. We designed the book to become a tool.",
            ],
          },
          {
            h: "Do not throw away the early drawings",
            p: [
              "Progress is difficult to see from memory, but easy to see when you open a page completed several months ago. Loose drawings migrate to folders, refrigerators, backpacks and eventually the trash. Inside a practice book, the drawings stay together and in order.",
              "There are 231 pages and 111 drawings in the book. Once a child actually works on those pages, no two finished copies are the same anymore: the printed book gradually becomes their book.",
            ],
          },
        ],
        listTitle: "What changes at this age",
        list: [
          "Steps are used to analyze structure, not only to copy",
          "An attempt from memory is worth adding after the activity",
          "Changing details of the example is welcome",
          "The same simple shapes reappear across different subjects",
          "Practice stays in the book and shows progress",
        ],
        faq: [
          {
            q: "Is step-by-step drawing too easy for a 9- or 10-year-old?",
            a: "Not necessarily. For older children, step-by-step drawing can be used to understand how a picture is constructed rather than simply to copy it. The sequence becomes a model that can later be reused or changed.",
          },
          {
            q: "How can a child move from copying to independent drawing?",
            a: "After completing the guided drawing, have the child try it again without looking at every step, or encourage them to change some details. The example gradually becomes a starting point rather than a finished answer.",
          },
          {
            q: "Are circles and ovals too basic for 9- and 10-year-olds?",
            a: "No. Simple shapes remain building blocks in more complex drawings. The more advanced skill is recognizing where those shapes appear inside animals, objects, and characters and learning how they work together.",
          },
          {
            q: "Should children change a step-by-step drawing?",
            a: "They can. Changing colors, expressions, or individual details can turn guided practice into a starting point for more independent artwork.",
          },
          {
            q: "How can kids see their progress in drawing?",
            a: "Keep earlier work available for comparison. When practice is completed directly in a drawing book, children can flip back several months and compare their earlier drawings with newer ones.",
          },
          {
            q: "Why practice with 111 different drawings?",
            a: "A large variety of subjects lets children encounter familiar shapes in different combinations. Over time they recognize recurring building blocks instead of treating every new drawing as an unrelated problem.",
          },
        ],
        ctaTitle: "See how one spread is built",
        ctaLead:
          "Ten spreads from the book are free to print: the steps, the dotted outline, and space for the child's own drawing. That is exactly the structure this article is about.",
      },
      es: {
        title: "Dibujo para niños de 9 a 10 años: cómo pasar del paso a paso al dibujo independiente",
        lead:
          "A esta edad la secuencia funciona de otra manera: no como «haz lo mismo que yo», sino como una forma de ver cómo está construida una imagen.",
        answer:
          "Los dibujos paso a paso pueden utilizarse no solo para copiar, sino para entender cómo se construye una imagen. Después de completar la secuencia, el niño puede intentar dibujar el mismo objeto por su cuenta, de memoria o cambiando algunos detalles. Poco a poco, el objetivo pasa de copiar el modelo a comprender y reutilizar su estructura.",
        body: [
          {
            h: "A los nueve años el dibujo paso a paso no tiene por qué ser demasiado fácil",
            p: [
              "A veces se piensa que los dibujos paso a paso son únicamente para niños pequeños. Todo depende de qué sucede después del último paso. Si el niño solo copia mecánicamente una serie de imágenes, las posibilidades son limitadas.",
              "Pero una secuencia también puede enseñar algo diferente: cómo está construido un dibujo a partir de formas más sencillas. Para un niño de 9 o 10 años puede convertirse en una manera de analizar la estructura de una imagen.",
            ],
          },
          {
            h: "Primero seguir los pasos, después intentarlo sin ayuda",
            p: [
              "En Cómo dibujar. 111 dibujos paso a paso el ejercicio no termina con la última imagen. Después, el niño repasa el dibujo completo y dispone de un espacio para hacerlo por su cuenta.",
              "Con los niños mayores se puede avanzar más: primero siguen los pasos, después los cubren e intentan dibujar el mismo objeto otra vez. No hace falta reproducirlo perfectamente; la tarea ahora es recordar cómo se construía.",
            ],
          },
          {
            h: "Las formas sencillas no son solo para niños pequeños",
            p: [
              "Los círculos, óvalos y líneas no desaparecen cuando un niño aprende más. Son elementos básicos con los que se construyen dibujos más complejos. Cuando el niño empieza a reconocer esas formas dentro de diferentes imágenes, adquiere una herramienta que puede utilizar en otras situaciones.",
              "Por eso nuestros 111 dibujos no comienzan con un contorno terminado que hay que copiar, sino con una base sencilla a la que se añaden detalles poco a poco.",
            ],
          },
          {
            h: "Deje que el niño cambie el modelo",
            p: [
              "A los nueve o diez años no siempre tiene sentido exigir una copia exacta. Si el niño quiere cambiar una expresión, añadir un detalle o usar colores diferentes, no está cometiendo un error. La secuencia le dio una estructura y ahora puede utilizarla como punto de partida.",
              "Aquí aparece una diferencia importante entre el modelo como respuesta correcta y el modelo como herramienta. Diseñamos el libro para que fuera una herramienta.",
            ],
          },
          {
            h: "No tire los dibujos anteriores",
            p: [
              "Es difícil ver el progreso de memoria y mucho más fácil abrir una página que el niño completó varios meses antes. Las hojas sueltas terminan repartidas entre carpetas, el refrigerador y la basura; en un libro de práctica los dibujos permanecen juntos y en orden.",
              "El libro tiene 231 páginas y 111 dibujos. Cuando el niño trabaja realmente en ellas, al terminar ya no existen dos ejemplares iguales: el libro impreso se convierte poco a poco en su propio libro.",
            ],
          },
        ],
        listTitle: "Qué cambia a esta edad",
        list: [
          "Los pasos sirven para analizar la estructura, no solo para copiar",
          "Después del ejercicio conviene un intento de memoria",
          "Cambiar detalles del modelo es bienvenido",
          "Las mismas formas sencillas reaparecen en dibujos distintos",
          "La práctica queda en el libro y muestra el progreso",
        ],
        faq: [
          {
            q: "¿El dibujo paso a paso es demasiado fácil para niños de 9 o 10 años?",
            a: "No necesariamente. A esta edad puede utilizarse para comprender cómo está construida una imagen, en lugar de limitarse a copiarla. La secuencia se convierte en una estructura que después puede reutilizarse o modificarse.",
          },
          {
            q: "¿Cómo pasar de copiar un modelo a dibujar de manera independiente?",
            a: "Después de completar el dibujo guiado, el niño puede intentar repetirlo sin consultar cada paso o cambiar algunos detalles. Poco a poco, el modelo deja de ser una respuesta que debe copiarse y se convierte en un punto de partida.",
          },
          {
            q: "¿Los círculos y óvalos son demasiado sencillos para niños de 9 o 10 años?",
            a: "No. Las formas básicas siguen siendo elementos de dibujos más complejos. La habilidad consiste en empezar a reconocer dónde aparecen esas formas dentro de animales, objetos y personajes.",
          },
          {
            q: "¿Puede un niño cambiar el dibujo de una instrucción paso a paso?",
            a: "Sí. Cambiar los colores, una expresión o algunos detalles puede ser una manera natural de pasar de la práctica guiada a un dibujo más personal.",
          },
          {
            q: "¿Cómo puede un niño ver su progreso al dibujar?",
            a: "Conviene conservar los trabajos anteriores para compararlos. Cuando la práctica se hace dentro del libro, el niño puede volver a páginas de meses anteriores y observar por sí mismo cómo han cambiado sus dibujos.",
          },
          {
            q: "¿Para qué sirven 111 dibujos diferentes?",
            a: "Una gran variedad permite encontrar las mismas formas básicas en combinaciones distintas. Con el tiempo, el niño reconoce elementos que se repiten en lugar de considerar cada nuevo dibujo como un problema completamente diferente.",
          },
        ],
        ctaTitle: "Vea cómo es una doble página",
        ctaLead:
          "Diez dobles páginas del libro se pueden imprimir gratis: los pasos, el contorno punteado y el espacio para el dibujo propio. Esa es exactamente la estructura de la que habla este artículo.",
      },
    },
  },
  /* ===== 4. Что такое пошаговое рисование ===== */
  {
    id: "step-by-step-drawing",
    published: "2026-09-17",
    updated: "2026-09-17",
    slug: {
      en: "what-is-step-by-step-drawing-for-kids",
      es: "que-es-el-dibujo-paso-a-paso-para-ninos",
      ru: "chto-takoe-poshagovoe-risovanie",
    },
    related: ["draw-5-6", "drawing-school-year"],
    copy: {
      ru: {
        title: "Что такое пошаговое рисование и почему ребенку проще учиться именно так",
        lead:
          "Качество инструкции определяется не числом этапов, а тем, понимает ли ребенок, что именно он должен сделать сейчас.",
        answer:
          "Пошаговое рисование это способ обучения, при котором готовое изображение разбивается на последовательность простых действий. Для начинающего ребенка особенно важно, чтобы на каждом этапе было ясно видно новую линию или форму. Наиболее полная практика получается, когда после просмотра шагов ребенок сначала обводит готовый рисунок, а затем повторяет его самостоятельно.",
        body: [
          {
            h: "Это не шесть уменьшенных картинок",
            p: [
              "Обычно пошаговым рисованием называют инструкцию, где готовый рисунок разбит на несколько этапов. Но качество такой инструкции определяется не количеством этапов. Главный вопрос другой: понимает ли ребенок, что именно он должен сделать сейчас.",
              "Когда мы создавали 111 рисунков, это стало одним из основных правил всей книги. Каждый следующий этап должен добавлять понятную часть рисунка, а изменение должно быть видно сразу.",
            ],
          },
          {
            h: "Один шаг, одно понятное изменение",
            p: [
              "Представьте шесть почти одинаковых картинок, на каждой из которых все линии черные. Взрослый быстро найдет различие, а ребенку приходится сравнивать две картинки целиком.",
              "Поэтому предыдущие линии становятся серыми, а новые остаются черными: взгляд сразу идет туда, где произошло изменение. Это кажется мелкой деталью оформления, но именно из таких деталей складывается понятная детская инструкция.",
            ],
          },
          {
            h: "Почему рисунок начинается с геометрии",
            p: [
              "Ребенок может не знать, как нарисовать коалу, но знает, как попытаться нарисовать овал. Может не знать, как нарисовать кита, но способен провести простую изогнутую линию.",
              "Поэтому задача «нарисуй кита» и задача «нарисуй эту форму» выглядят совершенно по-разному. Пошаговый метод заменяет один большой неизвестный результат последовательностью знакомых действий.",
            ],
          },
          {
            h: "Одной инструкции мало",
            p: [
              "Здесь многие книги останавливаются: показывают пять или шесть шагов, а дальше предлагают взять отдельный лист и как-нибудь повторить увиденное.",
              "Мы добавили промежуточный этап. После инструкции ребенок сначала обводит полный рисунок по пунктиру, а только потом рисует его самостоятельно рядом. Получилась последовательность: посмотреть, обвести, нарисовать самому, раскрасить. Это основа всех 111 упражнений.",
            ],
          },
          {
            h: "Почему место для рисования внутри книги",
            p: [
              "Можно было оставить только инструкции и поместить больше рисунков на меньшее количество страниц. Мы сделали наоборот: 231 страница на 111 рисунков, практически каждому объекту отдан целый разворот.",
              "Инструкция без места для действия это половина занятия. Ребенку не нужно искать альбом, родителю давать бумагу, учителю собирать листы. Открыл разворот, и все необходимое перед глазами.",
            ],
          },
          {
            h: "Что мы поняли после 111 рисунков",
            p: [
              "Самая сложная часть хорошего пошагового рисунка не нарисовать красивый финальный объект, а правильно разобрать его назад. Нужно решить, какая форма появится первой, какие детали объединить в один этап, где шаг становится слишком большим.",
              "Поэтому качественное пошаговое рисование это прежде всего проектирование последовательности, а уже потом иллюстрация. Английское издание книги стало финалистом Children's Book International Awards 2025 в образовательной категории.",
            ],
          },
        ],
        listTitle: "Признаки хорошей пошаговой инструкции",
        list: [
          "Видно, что изменилось на каждом этапе",
          "Первый шаг это простая форма, а не готовый контур",
          "Шаги показаны картинками, без текста",
          "После шагов есть обводка и место для своего рисунка",
          "Обычно около шести шагов на рисунок",
        ],
        faq: [
          {
            q: "Что такое пошаговое рисование для детей?",
            a: "Это способ построить готовое изображение через последовательность простых действий. Ребенок не пытается сразу скопировать весь объект, а добавляет по одной форме или детали на каждом этапе.",
          },
          {
            q: "Чем хорошая пошаговая инструкция отличается от обычного образца?",
            a: "Хорошая инструкция показывает не только конечный результат, но и что именно изменилось на каждом этапе. В нашей системе новая линия черная, а уже выполненные линии становятся серыми, поэтому следующий шаг виден сразу.",
          },
          {
            q: "Почему пошаговое рисование начинается с простых форм?",
            a: "Потому что задача «нарисовать овал» понятнее начинающему ребенку, чем задача «нарисовать коалу». Несколько знакомых форм постепенно складываются в объект, который в готовом виде кажется значительно сложнее.",
          },
          {
            q: "Зачем обводить рисунок после пошаговой инструкции?",
            a: "Обводка создает промежуточный этап между наблюдением и самостоятельным рисунком. Ребенок уже не просто смотрит на форму, а проходит ее карандашом, после чего пытается воспроизвести самостоятельно.",
          },
          {
            q: "Чем эта система отличается от обычной книги «как рисовать»?",
            a: "Мы не заканчиваем упражнение последним шагом инструкции. Каждый рисунок получает полный разворот: пошаговая схема, пунктир для обводки, место для самостоятельной попытки и возможность раскрасить готовую работу.",
          },
          {
            q: "Почему в книге 231 страница всего для 111 рисунков?",
            a: "Потому что мы сознательно оставили место для практики. Цель книги не показать максимальное количество маленьких инструкций, а дать ребенку возможность сразу выполнить упражнение непосредственно в книге.",
          },
          {
            q: "Как устроены 111 заданий в книге?",
            a: "Основная последовательность одна и та же: посмотреть, обвести, нарисовать самостоятельно, раскрасить. Структура задания повторяется, но меняются животные, морские обитатели, сказочные персонажи, транспорт, предметы, природа и еда.",
          },
        ],
        ctaTitle: "Проверьте метод на своих детях",
        ctaLead:
          "Десять разворотов книги можно распечатать бесплатно и пройти всю последовательность целиком, от первой формы до раскрашенного рисунка.",
      },
      en: {
        title: "What Is Step-by-Step Drawing for Kids, and Why Does It Make Drawing Easier to Learn?",
        lead:
          "The quality of an instruction is not set by the number of steps, but by whether the child can tell what to do next.",
        answer:
          "Step-by-step drawing is a way of teaching drawing by breaking a finished picture into a sequence of manageable actions. For beginners, it is especially helpful when each stage makes the new line or shape immediately clear. A more complete practice sequence is to first study the steps, then trace the finished picture, and finally draw it independently.",
        body: [
          {
            h: "It is more than six little pictures in a row",
            p: [
              "Step-by-step drawing usually means taking a finished picture and breaking it into several stages. But the quality of the instruction is not determined by how many steps it contains. The more important question is whether the child can immediately tell what to do next.",
              "When we developed 111 drawings for Magic of Discoveries, this became one of the main rules behind the book. Every stage needed to add a manageable part of the picture, and the change needed to be immediately visible.",
            ],
          },
          {
            h: "One step, one clear change",
            p: [
              "Imagine six nearly identical pictures, all made with black lines. An adult can quickly compare them and find the difference. A child has to search two entire pictures to figure out what changed.",
              "That is why previous lines turn gray while the new lines stay black. The eye is immediately drawn to the change. It may sound like a small design decision, but clear instructions are built from small decisions like this.",
            ],
          },
          {
            h: "Why the drawings begin with simple shapes",
            p: [
              "A child may not know how to draw a koala, but they can try to draw an oval. They may not know how to draw a whale, but they can make a curved line.",
              "For a beginner, \"draw a whale\" and \"draw this shape\" are very different tasks. Step-by-step drawing replaces one large, unfamiliar result with a sequence of smaller, more familiar actions.",
            ],
          },
          {
            h: "Showing the steps is only half the activity",
            p: [
              "This is where many drawing instructions stop. They show five or six stages and then expect the child to find a separate piece of paper and reproduce what they just saw.",
              "We added an intermediate stage. After studying the sequence, the child first traces the complete picture along dotted lines, and only then draws the same subject independently. The sequence became: look, trace, draw independently, color. That is the foundation of all 111 activities.",
            ],
          },
          {
            h: "Why the practice space is inside the book",
            p: [
              "We could have included only the instructions and fit more drawings onto fewer pages. We chose the opposite: 231 pages for 111 drawings, with almost every subject getting a complete two-page spread.",
              "Instructions without a place to practice are only half an activity. The child does not need to find a sketchbook, a parent does not need another sheet of paper, a teacher does not need to print a worksheet. Open the spread and the activity is there.",
            ],
          },
          {
            h: "What we learned from designing 111 sequences",
            p: [
              "The hardest part is not creating an attractive finished picture. The harder part is taking that picture apart correctly: deciding which shape comes first, which details can be introduced together, and when a step becomes too large.",
              "That is why good step-by-step drawing is partly an illustration problem and largely a sequence-design problem. The English edition was a finalist in the Educational category of the Children's Book International Awards 2025.",
            ],
          },
        ],
        listTitle: "What a good step-by-step instruction looks like",
        list: [
          "You can see what changed at every stage",
          "The first step is a simple shape, not a finished outline",
          "The steps are shown in pictures, with no text",
          "After the steps there is tracing and space to draw",
          "Usually about six steps per drawing",
        ],
        faq: [
          {
            q: "What is step-by-step drawing for kids?",
            a: "Step-by-step drawing is a method that builds a finished picture through a sequence of manageable actions. Instead of copying the entire subject at once, the child adds one shape or detail at a time.",
          },
          {
            q: "What makes a good step-by-step drawing instruction?",
            a: "A good sequence makes it immediately clear what changed from one step to the next. In our system, new lines are black while previously drawn lines turn gray, so children can see exactly what to add.",
          },
          {
            q: "Why do step-by-step drawings start with simple shapes?",
            a: "Because \"draw an oval\" is a much smaller task for a beginner than \"draw a koala.\" Familiar shapes are combined gradually until they become a finished picture that looked much more complicated at the beginning.",
          },
          {
            q: "Why trace a picture after following the drawing steps?",
            a: "Tracing creates a bridge between looking and drawing independently. The child physically follows the complete shapes and lines before trying to reproduce them without the dotted outline.",
          },
          {
            q: "How is this different from a typical how-to-draw book?",
            a: "Our activity does not end with the last instructional step. Each subject gets a full two-page spread with the drawing sequence, a dotted picture to trace, blank space for an independent attempt, and room to color the result.",
          },
          {
            q: "Why does a 111-drawing book have 231 pages?",
            a: "Because we deliberately made room for practice. The goal is not to fit the largest possible number of tiny tutorials into the book. The child can actually practice directly on the pages.",
          },
          {
            q: "What is the four-part drawing method used in the book?",
            a: "The sequence is look, trace, draw independently, color. The activity structure stays familiar across 111 different subjects, while the pictures themselves keep changing.",
          },
        ],
        ctaTitle: "Test the method at your own table",
        ctaLead:
          "Ten spreads from the book are free to print, so a child can run through the whole sequence, from the first shape to a colored drawing.",
      },
      es: {
        title: "Qué es el dibujo paso a paso y por qué facilita el aprendizaje de los niños",
        lead:
          "La calidad de una instrucción no depende del número de pasos, sino de si el niño entiende qué tiene que hacer ahora.",
        answer:
          "Es un método en el que una imagen completa se divide en una secuencia de acciones sencillas. Para un niño que está empezando, es especialmente importante poder identificar con claridad qué línea o forma se añade en cada etapa. La práctica se completa observando los pasos, repasando el dibujo y finalmente haciéndolo por su cuenta.",
        body: [
          {
            h: "No consiste simplemente en mostrar seis imágenes pequeñas",
            p: [
              "Normalmente llamamos dibujo paso a paso a una instrucción en la que una imagen terminada se divide en varias etapas. Pero la calidad de una buena secuencia no depende del número de pasos. La pregunta más importante es si el niño puede entender inmediatamente qué tiene que hacer.",
              "Cuando desarrollamos 111 dibujos para Magic of Discoveries, esta se convirtió en una de las reglas principales del libro. Cada etapa debía añadir una parte comprensible y el cambio tenía que ser fácil de identificar.",
            ],
          },
          {
            h: "Un paso, un cambio claro",
            p: [
              "Imagine seis imágenes casi iguales en las que todas las líneas son negras. Un adulto encuentra rápidamente la diferencia; un niño tiene que comparar dos dibujos completos.",
              "Por eso las líneas anteriores pasan a gris y las nuevas permanecen en negro. La mirada va directamente hacia el cambio. Parece un pequeño detalle de diseño, pero una instrucción fácil de seguir se construye a partir de decisiones como esta.",
            ],
          },
          {
            h: "Por qué comenzamos con formas sencillas",
            p: [
              "Un niño quizá no sepa cómo dibujar un koala, pero sabe intentar dibujar un óvalo. Tal vez no sepa dibujar una ballena, pero puede hacer una línea curva.",
              "Por eso «dibuja una ballena» y «dibuja esta forma» son dos tareas completamente diferentes para alguien que empieza. El dibujo paso a paso sustituye un resultado grande y desconocido por una secuencia de acciones pequeñas y comprensibles.",
            ],
          },
          {
            h: "Mostrar los pasos no es suficiente",
            p: [
              "Aquí es donde muchas instrucciones terminan: muestran cinco o seis etapas y después el niño tiene que buscar una hoja aparte e intentar reproducir lo que vio.",
              "Nosotros añadimos una etapa intermedia. Después de observar la secuencia, el niño primero repasa el dibujo completo por las líneas punteadas y solo después lo dibuja por su cuenta. La secuencia completa es: mirar, repasar, dibujar por su cuenta, colorear.",
            ],
          },
          {
            h: "Por qué el espacio para dibujar está dentro del libro",
            p: [
              "Podríamos haber incluido solo las instrucciones y colocar más dibujos en menos páginas. Elegimos lo contrario: 231 páginas para 111 dibujos, y prácticamente cada dibujo tiene una página doble completa.",
              "Una instrucción sin espacio para practicar es solo la mitad de la actividad. El niño no tiene que buscar un cuaderno, el padre no necesita otra hoja y el maestro no tiene que imprimir nada.",
            ],
          },
          {
            h: "Lo que aprendimos al desarrollar 111 secuencias",
            p: [
              "La parte más difícil no es hacer una bonita ilustración final, sino desarmarla correctamente: decidir qué forma aparece primero, qué detalles se añaden juntos y cuándo un paso se vuelve demasiado grande.",
              "Por eso crear una buena actividad de dibujo paso a paso consiste primero en diseñar una secuencia comprensible. La edición en inglés fue finalista en la categoría educativa de los Children's Book International Awards 2025.",
            ],
          },
        ],
        listTitle: "Cómo se reconoce una buena secuencia",
        list: [
          "Se ve qué cambió en cada etapa",
          "El primer paso es una forma sencilla, no un contorno terminado",
          "Los pasos se muestran con imágenes, sin texto",
          "Después de los pasos hay repaso y espacio para dibujar",
          "Normalmente unos seis pasos por dibujo",
        ],
        faq: [
          {
            q: "¿Qué es el dibujo paso a paso para niños?",
            a: "Es un método que construye una imagen mediante una secuencia de acciones sencillas. En lugar de intentar copiar todo el dibujo de una vez, el niño agrega una forma o un detalle en cada etapa.",
          },
          {
            q: "¿Qué debe tener una buena instrucción de dibujo paso a paso?",
            a: "Debe mostrar claramente qué cambió de un paso al siguiente. En nuestro sistema, las líneas nuevas son negras y las anteriores pasan a gris, de modo que el niño identifica inmediatamente qué debe añadir.",
          },
          {
            q: "¿Por qué los dibujos paso a paso comienzan con formas sencillas?",
            a: "Porque «dibuja un óvalo» es una tarea mucho más concreta para un principiante que «dibuja un koala». Las formas conocidas se combinan poco a poco hasta convertirse en una imagen que al principio parecía complicada.",
          },
          {
            q: "¿Para qué sirve repasar el dibujo después de seguir los pasos?",
            a: "Repasar crea un puente entre observar y dibujar de manera independiente. El niño sigue físicamente las formas del dibujo completo antes de intentar reproducirlo sin el contorno punteado.",
          },
          {
            q: "¿En qué se diferencia este sistema de un libro común para aprender a dibujar?",
            a: "La actividad no termina con el último paso. Cada dibujo tiene una página doble con la secuencia, un contorno punteado para repasar y espacio para intentar el dibujo por cuenta propia.",
          },
          {
            q: "¿Por qué un libro con 111 dibujos tiene 231 páginas?",
            a: "Porque dejamos espacio deliberadamente para practicar. El objetivo no es incluir el mayor número posible de tutoriales pequeños, sino permitir que el niño dibuje directamente en el libro.",
          },
          {
            q: "¿Cuál es el método de cuatro partes del libro?",
            a: "La secuencia es mirar, repasar, dibujar por su cuenta y colorear. La estructura se mantiene en los 111 ejercicios, mientras cambian los temas y los dibujos.",
          },
        ],
        ctaTitle: "Compruebe el método en casa",
        ctaLead:
          "Diez dobles páginas del libro se pueden imprimir gratis y recorrer toda la secuencia, desde la primera forma hasta el dibujo coloreado.",
      },
    },
  },
  /* ===== 5. Рисование в школе на весь учебный год ===== */
  {
    id: "drawing-school-year",
    published: "2026-09-17",
    updated: "2026-09-17",
    slug: {
      en: "drawing-activities-for-the-school-year",
      es: "actividades-de-dibujo-para-todo-el-ano-escolar",
      ru: "risovanie-v-shkole-na-uchebnyy-god",
    },
    related: ["step-by-step-drawing", "draw-7-8"],
    copy: {
      ru: {
        title: "Рисование в начальной школе на весь учебный год: 111 заданий без стопки распечаток",
        lead:
          "Сложно не найти одно хорошее задание, а найти следующее и повторять это весь год. 111 заданий в одной книге у каждого ученика.",
        answer:
          "111 разных рисунков закрывают учебный год при трех занятиях в неделю, а при двух остается запас. Если каждый ученик работает в собственной книге с пошаговой инструкцией, обводкой и местом для самостоятельного рисунка, учителю не нужно каждую неделю печатать, раздавать, собирать и хранить новые рабочие листы.",
        body: [
          {
            h: "Проблема не в том, чтобы найти одно хорошее задание",
            p: [
              "Учителю несложно найти рисунок кота на понедельник. Сложнее найти следующий на четверг, потом еще один на следующую неделю. Распечатать, раздать, собрать, решить, куда складывать законченные листы. И повторять это весь учебный год.",
              "Главное преимущество книги как школьного ресурса не в одном конкретном рисунке, а в том, что 111 готовых занятий находятся в одной системе и в одном месте.",
            ],
          },
          {
            h: "Сколько занятий получается из 111 рисунков",
            p: [
              "Три рисунка в неделю закрывают учебный год целиком, около 37 недель. Два рисунка в неделю закрывают год с запасом, и оставшиеся задания дают учителю выбор, а не обязанность пройти все.",
              "Соблюдать жесткий порядок не нужно. Рисунки можно выбирать по теме урока, времени года, интересам класса или просто дать детям выбрать самим.",
            ],
          },
          {
            h: "Как выглядит одно занятие",
            p: [
              "Для каждого рисунка ребенок получает полный разворот. Сначала он видит последовательность построения, обычно около шести шагов: новые линии черные, предыдущие серые, поэтому не нужно объяснять всему классу, какая линия появилась.",
              "Затем ребенок обводит готовый рисунок по пунктиру, после этого рисует его самостоятельно на свободном месте, а если время позволяет, раскрашивает. Один формат повторяется снова и снова, поэтому детям не приходится каждый раз разбираться в новом задании.",
            ],
          },
          {
            h: "Почему индивидуальная книга удобнее отдельных листов",
            p: [
              "Рабочий лист хорош для одного занятия, но за учебный год десятки листов превращаются в отдельную организационную задачу. С индивидуальной книгой схема другая: взял, открыл задание, выполнил, закрыл, вернул на место.",
              "Ничего не нужно собирать в папку после каждого рисунка, работы не перемешиваются между учениками, а в конце года ребенок получает не пачку листов, а свою книгу со всеми рисунками в последовательности.",
            ],
          },
          {
            h: "Где использовать 15-20 минут рисования",
            p: [
              "Не каждое занятие должно становиться полноценным уроком искусства. Пошаговое рисование подходит для начала дня, для времени после основной работы, для учеников, закончивших задание раньше, для творческого центра или как часть урока рисования.",
              "Инструкция визуальная, читать ее не нужно, поэтому задание одинаково работает у начинающих читателей и у детей с разным уровнем чтения. А короткий факт рядом с рисунком дает учителю естественный повод на минуту поговорить о животном.",
            ],
          },
          {
            h: "Одна книга это история целого года",
            p: [
              "Откройте в мае страницу, которую ребенок заполнял в сентябре: рядом находятся месяцы его собственных работ. Для учителя это история практики, для ребенка возможность увидеть свои старые рисунки, для родителей готовая книга, которую можно забрать домой.",
              "В начале года это книга с 111 заданиями. В конце года это уже книга конкретного ребенка.",
            ],
          },
        ],
        listTitle: "Что дает книга классу",
        list: [
          "111 разных заданий в одной системе",
          "15-20 минут на занятие, без подготовки учителя",
          "Ничего не нужно печатать, раздавать и собирать",
          "Визуальная инструкция работает при разном уровне чтения",
          "В конце года у каждого своя книга с работами по порядку",
        ],
        faq: [
          {
            q: "Сколько заданий по рисованию нужно на учебный год?",
            a: "При трех занятиях в неделю на 37 учебных недель требуется 111 заданий. Именно столько разных рисунков находится в нашей книге. При двух занятиях в неделю материала хватает на год с запасом.",
          },
          {
            q: "Как использовать пошаговое рисование в начальной школе?",
            a: "Одно задание можно использовать как короткое самостоятельное занятие примерно на 15-20 минут, а раскрашивание оставить как продолжение. Формат подходит для творческих занятий, самостоятельной работы и коротких пауз между основными заданиями.",
          },
          {
            q: "Что удобнее для класса: рабочие листы или индивидуальная книга?",
            a: "Для разового задания рабочий лист удобен. При регулярной работе индивидуальная книга избавляет от необходимости каждую неделю распечатывать, раздавать, собирать и хранить новые листы. Все рисунки одного ученика остаются вместе.",
          },
          {
            q: "Подойдет ли пошаговое рисование детям с разным уровнем чтения?",
            a: "Визуальная инструкция меньше зависит от уровня чтения, потому что ребенок видит следующий этап непосредственно на картинке. В нашей книге новые линии выделены черным, а предыдущие серым.",
          },
          {
            q: "Подходит ли книга для кружка или художественной школы?",
            a: "Да. Занятие не требует подготовки и укладывается в 15-20 минут, а 111 сюжетов позволяют вести группу весь год, не повторяя задания и не докупая материалы.",
          },
          {
            q: "Что делать ученику, который закончил основную работу раньше?",
            a: "Короткое пошаговое рисование хорошо работает как задание для тех, кто закончил раньше: ребенок берет свою книгу и самостоятельно выполняет следующее задание, не требуя от учителя новой распечатки.",
          },
          {
            q: "Почему индивидуальная книга удобна в конце учебного года?",
            a: "Потому что работы не разбросаны по отдельным листам. В конце года ученик получает книгу, заполненную собственными рисунками в том порядке, в котором он их выполнял.",
          },
        ],
        ctaTitle: "Проверьте на классе бесплатно",
        ctaLead:
          "Десять разворотов из книги можно распечатать и раздать детям бесплатно, без регистрации: так видно, как задание работает в вашем классе.",
      },
      en: {
        title: "Drawing Activities for the Entire School Year: 111 Ideas Without a Stack of Worksheets",
        lead:
          "The hard part is not finding one activity. It is finding the next one, and repeating that all year. 111 activities in one book per student.",
        answer:
          "With 111 different drawings there are enough activities for a full school year at three drawings per week, and a comfortable margin at two per week. When each student works in an individual book that includes step-by-step instructions, tracing practice, and space for independent drawing, teachers do not have to continually print, distribute, collect, and organize new worksheets.",
        body: [
          {
            h: "The hard part is not finding one drawing activity",
            p: [
              "A teacher can find a cat drawing online for Monday. The harder part is finding another for Thursday, then another next week. Then printing it, passing it out, collecting it, and figuring out what to do with all the finished pages. And doing it again all year.",
              "As an elementary classroom resource, the biggest advantage of How to Draw 111 is not any single drawing. It is that 111 ready-to-use activities are organized in one system and kept in one place.",
            ],
          },
          {
            h: "How long 111 activities actually last",
            p: [
              "Three drawings a week covers a full school year, about 37 weeks. Two a week covers the year with room to spare, and the remaining drawings give a teacher choice rather than an obligation to use every one.",
              "There is no need to follow the book in strict order. Drawings can be selected to match a classroom theme, a season, student interests, or simply to give children a choice.",
            ],
          },
          {
            h: "What one activity looks like",
            p: [
              "Each subject gets a full two-page spread. First the student sees how the picture is built, usually in about six steps. New lines are black and previous lines are gray, so students see what changed without the teacher explaining every line to the class.",
              "Next the student traces the finished drawing along dotted lines, then draws the same subject independently in the space provided, and colors it if time allows. The format repeats throughout the book, so students do not learn a new activity structure every time.",
            ],
          },
          {
            h: "Why an individual book beats loose worksheets",
            p: [
              "One worksheet is easy to manage. Dozens of worksheets over a school year become another organization task. With an individual book the routine changes: get the book, open the activity, draw, close the book, put it away.",
              "There is no page to file after every session, student work does not get mixed together, and at the end of the year each child takes home a book filled with their own drawings in the order they made them.",
            ],
          },
          {
            h: "Where 15 to 20 minutes of drawing fits",
            p: [
              "Not every drawing activity needs to become a full art lesson. Step-by-step drawing works for morning work, early finishers, independent art time, classroom art centers, homeschool activities, or part of an elementary art lesson.",
              "The instructions are visual, so students do not need to read a paragraph before they start. This is especially useful in early grades, with beginning readers, and in classrooms where students have different levels of English proficiency.",
            ],
          },
          {
            h: "One book can tell the story of a year",
            p: [
              "In May, open a page a student completed in September. Around it are months of that child's own drawings. For a teacher it is a record of practice, for the student a chance to look back, for the family a finished book that goes home.",
              "At the beginning of the year it is a book with 111 activities. By the end of the year it has become that child's book.",
            ],
          },
        ],
        listTitle: "What the book gives a classroom",
        list: [
          "111 different activities in one system",
          "15 to 20 minutes per session, with no teacher prep",
          "Nothing to print, distribute, or collect",
          "Visual instructions work across reading levels",
          "Each student ends the year with their own book in order",
        ],
        faq: [
          {
            q: "How many drawing activities do you need for a full school year?",
            a: "At three drawing activities per week for 37 weeks, you need 111 activities. That is exactly how many different drawings are included in our book. At two activities per week, 111 drawings cover the year with room to spare.",
          },
          {
            q: "How can teachers use step-by-step drawing in an elementary classroom?",
            a: "One drawing works as a short independent activity of about 15 to 20 minutes, with coloring added when more time is available. It fits morning work, independent art time, art centers, or other openings in the school day.",
          },
          {
            q: "Are drawing worksheets or individual drawing books better for regular classroom use?",
            a: "A worksheet works well for a one-time activity. For regular drawing throughout the year, an individual book eliminates repeated printing, distributing, collecting, and organizing. Each student's drawings stay together in one place.",
          },
          {
            q: "Can visual drawing activities work with different reading levels?",
            a: "Visual drawing instructions do not require students to read a paragraph before beginning. In our book, each new line is shown in black while previous lines are gray, allowing students to identify the next action visually.",
          },
          {
            q: "What is a good screen-free early-finisher activity?",
            a: "A self-contained step-by-step drawing works well for early finishers because the student can begin independently and complete a finished piece of artwork without needing a new worksheet. The instructions, tracing practice, and drawing space are all on the same spread.",
          },
          {
            q: "Why use an individual drawing book instead of loose printables?",
            a: "An individual book keeps months of student work together. At the end of the year, students can look back at earlier drawings and take home one completed book rather than a stack of separate pages.",
          },
        ],
        ctaTitle: "Try it with your class for free",
        ctaLead:
          "Ten spreads from the book are free to print and hand out, with no registration, so you can see how the activity works in your own classroom.",
      },
      es: {
        title: "Dibujo en primaria durante todo el año escolar: 111 actividades sin montones de hojas impresas",
        lead:
          "Lo difícil no es encontrar una actividad, sino la siguiente, y repetirlo todo el año. 111 actividades en un libro para cada alumno.",
        answer:
          "Con 111 dibujos diferentes hay actividades para todo un año escolar a un ritmo de tres por semana, y con margen a dos por semana. Si cada alumno trabaja en su propio libro con instrucciones paso a paso, un dibujo para repasar y espacio para hacerlo por su cuenta, el maestro no necesita imprimir, repartir, recoger y organizar hojas cada semana.",
        body: [
          {
            h: "El problema no es encontrar una buena actividad para un día",
            p: [
              "Para un maestro no es difícil encontrar un dibujo de un gato para el lunes. Lo difícil es encontrar otro para el jueves, y otro la semana siguiente. Después hay que imprimirlos, repartirlos, recogerlos y decidir qué hacer con las hojas terminadas.",
              "Como recurso para el salón de clases, la principal ventaja del libro no es un dibujo en particular: es que 111 actividades listas para usar están reunidas en un mismo sistema y en un solo lugar.",
            ],
          },
          {
            h: "Cuántas actividades ofrecen realmente 111 dibujos",
            p: [
              "Tres dibujos por semana cubren todo el año escolar, unas 37 semanas. Dos por semana lo cubren con margen, y los dibujos restantes dan al maestro la posibilidad de elegir en lugar de la obligación de usarlos todos.",
              "Tampoco es necesario seguir un orden rígido: se puede elegir un dibujo por tema, por época del año, por los intereses de la clase o dejar que los niños escojan.",
            ],
          },
          {
            h: "Cómo funciona una actividad",
            p: [
              "Cada dibujo tiene una página doble. Primero el niño ve cómo se construye la imagen, normalmente en unos seis pasos: las líneas nuevas en negro y las anteriores en gris, de manera que no hay que explicar individualmente qué línea se añadió.",
              "Después repasa el dibujo terminado, a continuación lo dibuja por su cuenta en el espacio disponible y, si hay tiempo, lo colorea. El mismo formato se repite en todo el libro.",
            ],
          },
          {
            h: "Por qué un libro individual es más práctico que las hojas sueltas",
            p: [
              "Una hoja funciona bien para una actividad aislada, pero decenas de hojas a lo largo del año crean otra tarea. Con un libro individual el proceso cambia: tomar el libro, abrir la actividad, dibujar, cerrarlo y guardarlo.",
              "No hay que archivar un papel después de cada sesión, los trabajos no se mezclan y al final del año cada niño se lleva su propio libro con todos sus dibujos en orden.",
            ],
          },
          {
            h: "Dónde encajan 15 o 20 minutos de dibujo",
            p: [
              "No todas las actividades necesitan ser una clase completa de arte. El dibujo paso a paso sirve como trabajo de la mañana, para quienes terminan temprano, en un momento de trabajo independiente, en un centro de arte o dentro de la clase de arte en primaria.",
              "Las instrucciones son visuales, así que el alumno no necesita leer un párrafo para empezar. Esto es especialmente práctico en los primeros grados, con lectores principiantes y en salones donde los alumnos tienen distintos niveles de inglés.",
            ],
          },
          {
            h: "Un libro puede contar la historia de todo un año",
            p: [
              "En mayo, abra una página que el niño completó en septiembre: a su alrededor estarán meses de sus propios dibujos. Para el maestro es un registro de práctica, para el alumno una forma de mirar hacia atrás y para la familia un libro terminado que puede conservar.",
              "Al principio del año es un libro con 111 actividades. Al final del año ya es el libro de ese niño.",
            ],
          },
        ],
        listTitle: "Qué aporta el libro al salón de clases",
        list: [
          "111 actividades diferentes en un mismo sistema",
          "De 15 a 20 minutos por sesión, sin preparación",
          "Nada que imprimir, repartir ni recoger",
          "Instrucciones visuales para distintos niveles de lectura",
          "Cada alumno termina el año con su propio libro en orden",
        ],
        faq: [
          {
            q: "¿Cuántas actividades de dibujo se necesitan para todo un año escolar?",
            a: "Con tres actividades por semana durante 37 semanas se necesitan 111 actividades. Esa es exactamente la cantidad de dibujos diferentes que contiene nuestro libro. Con dos por semana, el material cubre el año con margen.",
          },
          {
            q: "¿Cómo utilizar el dibujo paso a paso en primaria?",
            a: "Un dibujo puede funcionar como una actividad independiente de unos 15 a 20 minutos. Si hay más tiempo, se añade el coloreado. También sirve como trabajo de la mañana o para quienes terminan temprano.",
          },
          {
            q: "¿Qué es más práctico: hojas sueltas o un libro individual?",
            a: "Una hoja funciona bien para una actividad aislada. Para trabajar regularmente durante el año, un libro individual evita imprimir, repartir, recoger y organizar nuevas hojas cada semana. Los trabajos de cada alumno permanecen juntos.",
          },
          {
            q: "¿Las actividades visuales sirven para alumnos con distintos niveles de lectura?",
            a: "Sí, porque el alumno no necesita leer un párrafo antes de comenzar. En nuestro libro, las líneas nuevas aparecen en negro y las anteriores en gris, de modo que el siguiente paso puede identificarse visualmente.",
          },
          {
            q: "¿Qué actividad sin pantallas puede hacer un alumno que termina temprano?",
            a: "Un dibujo paso a paso funciona bien porque el alumno puede comenzar por su cuenta y terminar un trabajo concreto sin pedir al maestro una nueva hoja. Las instrucciones, el repaso y el espacio para dibujar están en la misma página doble.",
          },
          {
            q: "¿Por qué usar un libro individual en lugar de hojas impresas?",
            a: "Porque mantiene juntos meses de trabajo del mismo alumno. Al final del año, el niño puede revisar sus primeros dibujos y llevarse a casa un libro completo en lugar de una pila de hojas.",
          },
        ],
        ctaTitle: "Pruébelo gratis con su clase",
        ctaLead:
          "Diez dobles páginas del libro se pueden imprimir y repartir gratis, sin registro, para ver cómo funciona la actividad en su salón.",
      },
    },
  },
  /* ===== "Как нарисовать все на свете": пять статей под пять разных
     групп запросов. Тексты владельца: сама книга, начальная школа,
     что нарисовать, занятие без экрана, рисование с нуля. ===== */
  {
    id: "everything-parents",
    published: "2026-09-17",
    updated: "2026-09-17",
    book: "how-to-draw-everything",
    freePage: "draw-everything-easy",
    slug: {
      en: "how-to-draw-everything-easy-drawing-book-for-kids",
      es: "como-aprender-a-dibujar-paso-a-paso-ninos",
      ru: "kak-nauchit-rebenka-risovat-s-nulya",
    },
    related: [
      "everything-what-to-draw",
      "everything-beginners",
    ],
    copy: {
      ru: {
        title: "Как научить ребенка рисовать с нуля: простые пошаговые рисунки",
        seoTitle: "Как научить ребенка рисовать с нуля: 111 пошаговых рисунков",
        seoDescription: "Как научить ребенка рисовать поэтапно? 111 простых пошаговых рисунков животных, цветов, еды, подарков и других предметов для начинающих.",
        lead: "Как научить ребенка рисовать поэтапно? 111 простых пошаговых рисунков животных, цветов, еды, подарков и других предметов для начинающих.",
        answer: "Многие дети любят рисовать, но не всегда знают, с чего начать. Ребенок берет карандаш, смотрит на чистый лист и говорит: «Я не знаю, что нарисовать». Или выбирает понравившуюся картинку, но не понимает, как самостоятельно получить такой результат. В этом случае помогает поэтапное рисование.",
        body: [
          {
            h: "111 идей для рисования",
            p: [
              "Книга «Как нарисовать все на свете. 111 простых рисунков шаг за шагом» предлагает ребенку 111 разных рисунков, которые можно выполнять шаг за шагом.",
              "В книге собраны милые животные, цветы, еда, подарки и другие темы.",
              "Ребенку не обязательно заниматься только одним видом рисунков.",
              "Сегодня можно выбрать животное. Завтра цветок. В следующий раз еду, подарок или совершенно другой предмет.",
              "Так у ребенка всегда остается выбор, что попробовать нарисовать дальше.",
            ],
          },
          {
            h: "Пошаговое рисование для начинающих",
            p: [
              "Чтобы начать заниматься по книге, ребенку не нужно уже уметь хорошо рисовать.",
              "Каждый рисунок сопровождается простой и понятной пошаговой инструкцией. Книга рассчитана в том числе на начинающих юных художников.",
              "Вместо того чтобы сразу пытаться скопировать готовую картинку, ребенок двигается постепенно.",
              "Сначала один этап. Потом следующий. И шаг за шагом получается законченный рисунок.",
            ],
          },
          {
            h: "Возможность потренироваться",
            p: [
              "Посмотреть на готовый пример недостаточно. Важно попробовать нарисовать самому.",
              "Поэтому для каждого рисунка в книге предусмотрены два вида практики, а также место для самостоятельной работы.",
              "Ребенок может выполнить рисунок, потренироваться и попробовать еще раз.",
              "А готовую работу можно раскрасить.",
            ],
          },
          {
            h: "Творческое занятие без гаджетов",
            p: [
              "Рисование - один из простых вариантов занятия, для которого не нужны телефон, планшет или компьютер.",
              "Ребенок может выбрать понравившуюся картинку и рисовать в собственном темпе.",
              "Книгу можно использовать дома после школы, в выходной день, на каникулах или просто тогда, когда хочется спокойно порисовать.",
            ],
          },
          {
            h: "Для какого возраста подходит книга?",
            p: [
              "Книга предназначена для начинающих юных художников. В описании издателя она рекомендуется детям от 5 лет.",
              "Поскольку каждый рисунок выполняется поэтапно, ребенок может заниматься в удобном для себя темпе.",
            ],
          },
          {
            h: "Книга, к которой можно возвращаться",
            p: [
              "Необязательно выполнять все 111 рисунков подряд.",
              "Можно листать книгу и выбирать то, что хочется нарисовать именно сегодня.",
              "А через некоторое время вернуться к уже знакомому рисунку и попробовать сделать его еще раз.",
              "Поэтому на простой детский вопрос «Что мне нарисовать?» в книге есть сразу 111 возможных ответов.",
            ],
          },
        ],
        listTitle: "Что в книге",
        list: [
          "111 пошаговых рисунков в семи темах: животные, цветы, природа, еда, подарки, одежда и разное",
          "Два вида практики для каждого рисунка: пунктир для обводки и свободное место для своего рисунка",
          "Черная линия показывает текущий шаг, серая то, что уже нарисовано",
          "Готовые рисунки можно раскрасить",
          "104 страницы, для детей от 5 лет",
        ],
        faq: [
          {
            q: "С какого возраста можно учить ребенка рисовать поэтапно?",
            a: "Книга рассчитана на начинающих юных художников. Издатель рекомендует ее детям от 5 лет.",
          },
          {
            q: "Подойдет ли книга ребенку, который совсем не умеет рисовать?",
            a: "Да. Рисунки сопровождаются простыми и понятными пошаговыми инструкциями, а сама книга рассчитана в том числе на начинающих.",
          },
          {
            q: "Что ребенок сможет научиться рисовать?",
            a: "В книге собрано 111 рисунков разных тематик: милые животные, цветы, еда, подарки и другие предметы. Ребенок может самостоятельно выбирать интересующую его тему.",
          },
          {
            q: "Как работает пошаговое рисование для детей?",
            a: "Вместо попытки сразу повторить готовую картинку ребенок выполняет рисунок последовательно, переходя от одного этапа к следующему. Так большая задача превращается в несколько более понятных действий.",
          },
          {
            q: "Есть ли в книге место для самостоятельной практики?",
            a: "Да. Для каждого рисунка предусмотрены два вида практики и место, где ребенок может самостоятельно рисовать.",
          },
        ],
        ctaTitle: "Попробуйте бесплатно",
        ctaLead: "Десять страниц из книги можно распечатать бесплатно, без регистрации и почты: вверху шаги, ниже обводка и место для своего рисунка. Если подойдет, в книге таких рисунков 111.",
      },
      en: {
        title: "How to Draw Everything: An Easy Step-by-Step Drawing Book for Kids",
        seoTitle: "How to Draw Everything for Kids: 111 Easy Step-by-Step Drawing Ideas",
        seoDescription: "Looking for an easy drawing book for kids? Discover 111 step-by-step drawings of animals, food, flowers, gifts, and more, with plenty of room to practice.",
        lead: "Looking for an easy drawing book for kids? Discover 111 step-by-step drawings of animals, food, flowers, gifts, and more, with plenty of room to practice.",
        answer: "Some kids know exactly what they want to draw. Others sit down with a pencil and ask the same question: \"What should I draw?\" A drawing book with many different themes can help with both.",
        body: [
          {
            h: "111 Things to Learn How to Draw",
            p: [
              "How to Draw Everything: 111 Easy Step-by-Step Drawings for Kids gives young artists a large collection of simple drawing ideas in one book. Instead of focusing on just animals, food, flowers, or other individual themes, children can explore many different subjects and choose what they feel like drawing that day.",
              "The book includes 111 step-by-step drawings covering cute animals, flowers, foods, gifts, and other familiar and fun subjects.",
              "That variety matters for children who enjoy drawing but quickly lose interest when every page follows the same theme.",
              "One day they can draw an animal. Another day they can choose food, a flower, or something completely different.",
              "There is always another drawing to try.",
            ],
          },
          {
            h: "Easy Step-by-Step Drawing for Beginners",
            p: [
              "Children do not need to know how to draw before opening the book.",
              "Each picture is broken down into simple steps that show how the drawing develops from beginning to end. The book was created for beginning artists and uses large, easy-to-follow drawings.",
              "Instead of asking a child to copy a finished picture all at once, step-by-step drawing gives them a clear place to begin and shows them what comes next.",
              "This can make drawing feel much more approachable.",
            ],
          },
          {
            h: "More Than One Chance to Practice",
            p: [
              "Learning to draw usually takes more than looking at an example once.",
              "That is why the book includes two types of practice for each drawing, along with space where children can work on their own.",
              "Children can follow the example, practice the drawing, and then try again.",
              "They can also color their finished pictures.",
              "This turns each activity into more than a quick drawing exercise.",
            ],
          },
          {
            h: "Drawing Without a Screen",
            p: [
              "Drawing is also an easy screen-free activity.",
              "A child needs only the book and basic drawing supplies to get started. There is no video to follow, app to open, or device to charge.",
              "Children can choose a picture, work through the steps at their own pace, and spend time creating something themselves.",
              "That makes the book useful for quiet afternoons at home, weekends, vacations, travel, or any time a child asks for something to do.",
            ],
          },
          {
            h: "What Age Is This Drawing Book For?",
            p: [
              "The book is designed for children who are beginning to draw. The publisher describes it as suitable for children ages 5 and older.",
              "Because the drawings are taught step by step, children can move through the book at their own pace rather than needing to complete activities in a particular order.",
            ],
          },
          {
            h: "A Drawing Book Kids Can Keep Coming Back To",
            p: [
              "With 111 different drawing ideas, children do not have to finish the book from beginning to end.",
              "They can flip through the pages and choose whatever interests them.",
              "Today it might be a cute animal.",
              "Tomorrow it might be food or a flower.",
              "Later they can return to an earlier drawing and see if they can draw it again.",
              "That freedom is part of what makes a large collection of drawing ideas useful: the question \"What can I draw?\" already has 111 possible answers.",
            ],
          },
        ],
        listTitle: "What is in the book",
        list: [
          "111 step-by-step drawings in seven themes: animals, flowers, nature, foods, gifts, clothing, and more",
          "Two kinds of practice for every drawing: a dotted outline to trace and blank space to draw your own",
          "The black line shows the current step, the gray line what is already drawn",
          "Finished drawings can be colored in",
          "104 pages, for ages 5 and up",
        ],
        faq: [
          {
            q: "What is a good drawing book for kids who are beginners?",
            a: "A good beginner drawing book shows children how to build a picture one step at a time instead of asking them to copy a finished image. How to Draw Everything includes 111 easy step-by-step drawings across different themes.",
          },
          {
            q: "What age is How to Draw Everything for Kids for?",
            a: "The book is designed for beginning young artists. The publisher describes it as suitable for ages 5 and older.",
          },
          {
            q: "Does a child need drawing experience to use this book?",
            a: "No. The drawings are presented with simple, clear step-by-step guidance intended for beginning artists, so children can start without previous drawing experience.",
          },
          {
            q: "What can kids learn to draw in How to Draw Everything?",
            a: "Kids can choose from 111 drawings covering cute animals, flowers, foods, gifts, and other themes. This gives them different types of subjects to explore instead of focusing on only one category.",
          },
          {
            q: "Can kids practice the drawings more than once?",
            a: "Yes. The book provides two types of practice for each drawing, along with space for children to practice what they have learned.",
          },
        ],
        ctaTitle: "Try it before you buy",
        ctaLead: "Ten pages from the book are free to print, with no account and no email: the steps at the top, tracing and practice below. If they work for your child, the book has 111.",
      },
      es: {
        title: "Cómo Aprender a Dibujar Paso a Paso: Un Libro Fácil para Niños",
        seoTitle: "Cómo Aprender a Dibujar Paso a Paso: 111 Dibujos Fáciles para Niños",
        seoDescription: "¿Buscas un libro de dibujo fácil para niños? Descubre 111 dibujos paso a paso de animales, flores, comida, regalos y muchos otros temas para practicar.",
        lead: "¿Buscas un libro de dibujo fácil para niños? Descubre 111 dibujos paso a paso de animales, flores, comida, regalos y muchos otros temas para practicar.",
        answer: "A algunos niños les encanta dibujar, pero no siempre saben por dónde empezar. Otros toman un lápiz, miran la hoja en blanco y hacen una pregunta muy sencilla: \"¿Qué puedo dibujar?\" Un libro con muchos temas diferentes puede ayudar en ambos casos.",
        body: [
          {
            h: "111 cosas diferentes para aprender a dibujar",
            p: [
              "Cómo Dibujar Todo: 111 dibujos fáciles paso a paso para niños reúne 111 dibujos paso a paso para que los pequeños artistas puedan elegir qué quieren aprender a dibujar.",
              "El libro incluye animales tiernos, flores, comida, regalos y muchos otros temas.",
              "Esta variedad permite que el niño no tenga que dibujar siempre el mismo tipo de imagen.",
              "Un día puede elegir un animal. Otro día, una flor. Después puede probar con comida, un regalo u otro dibujo que le llame la atención.",
              "Siempre hay algo diferente para intentar.",
            ],
          },
          {
            h: "Dibujos paso a paso para principiantes",
            p: [
              "El niño no necesita saber dibujar antes de comenzar.",
              "Cada dibujo se presenta mediante una secuencia sencilla y clara que muestra cómo avanzar hasta completar la imagen. El libro está pensado para pequeños artistas que están comenzando.",
              "En lugar de intentar copiar una ilustración terminada de una sola vez, el niño puede concentrarse en una parte a la vez.",
              "Primero un paso. Después el siguiente. Y poco a poco aparece el dibujo completo.",
            ],
          },
          {
            h: "Más oportunidades para practicar",
            p: [
              "Aprender a dibujar no consiste solamente en mirar cómo se hace. También hay que intentarlo.",
              "Por eso, el libro ofrece dos tipos de práctica para cada dibujo y espacio para que los niños trabajen en sus propias imágenes.",
              "Pueden seguir el ejemplo, practicar y volver a intentarlo.",
              "Después también pueden colorear el dibujo terminado.",
            ],
          },
          {
            h: "Una actividad creativa sin pantallas",
            p: [
              "Dibujar también puede ser una actividad sencilla para pasar un rato lejos del celular, la tableta o la televisión.",
              "No hace falta abrir una aplicación ni buscar un nuevo video cada vez.",
              "El niño puede elegir un dibujo, seguir los pasos y trabajar a su propio ritmo.",
              "Es una opción para una tarde en casa, un fin de semana, un viaje o simplemente un momento tranquilo.",
            ],
          },
          {
            h: "¿Para qué edad es este libro de dibujo?",
            p: [
              "El libro está pensado para niños que están comenzando a dibujar. La descripción del editor indica que es apropiado a partir de los 5 años.",
              "Como los dibujos se presentan paso a paso, cada niño puede avanzar a su propio ritmo.",
            ],
          },
          {
            h: "Un libro al que pueden volver una y otra vez",
            p: [
              "Los 111 dibujos no tienen que hacerse en orden.",
              "Los niños pueden hojear el libro y elegir lo que quieran dibujar en ese momento.",
              "Hoy puede ser un animal. Mañana, algo completamente diferente.",
              "Y más adelante pueden regresar a un dibujo anterior y volver a intentarlo.",
              "Así, la pregunta \"¿Qué puedo dibujar?\" tiene 111 posibles respuestas.",
            ],
          },
        ],
        listTitle: "Qué hay en el libro",
        list: [
          "111 dibujos paso a paso en siete temas: animales, flores, naturaleza, alimentos, regalos, ropa y más",
          "Dos tipos de práctica para cada dibujo: un contorno de puntos para repasar y espacio libre para dibujar el propio",
          "La línea negra muestra el paso actual, la gris lo que ya está dibujado",
          "Los dibujos terminados se pueden colorear",
          "104 páginas, a partir de 5 años",
        ],
        faq: [
          {
            q: "¿Cuál es un buen libro de dibujo para niños principiantes?",
            a: "Un buen libro para principiantes muestra cómo crear un dibujo poco a poco, en lugar de pedirle al niño que copie una imagen terminada. Cómo Dibujar Todo incluye 111 dibujos paso a paso de diferentes temas.",
          },
          {
            q: "¿Para qué edad es Cómo Dibujar Todo?",
            a: "El libro está pensado para pequeños artistas que están comenzando. El editor lo recomienda a partir de los 5 años.",
          },
          {
            q: "¿Un niño necesita saber dibujar antes de usar este libro?",
            a: "No. Los dibujos se presentan mediante instrucciones sencillas y claras, paso a paso, pensadas para niños que están comenzando a dibujar.",
          },
          {
            q: "¿Qué pueden aprender a dibujar los niños con este libro?",
            a: "Pueden elegir entre 111 dibujos de diferentes temas, como animales tiernos, flores, comida, regalos y mucho más.",
          },
          {
            q: "¿El libro permite practicar los dibujos?",
            a: "Sí. Cada dibujo ofrece dos tipos de práctica y espacio para que el niño pueda trabajar y volver a intentarlo.",
          },
        ],
        ctaTitle: "Pruébalo antes de comprar",
        ctaLead: "Diez páginas del libro se pueden imprimir gratis, sin registro y sin correo: los pasos arriba, el repaso y la práctica abajo. Si le funcionan a tu hijo, en el libro hay 111.",
      },
    },
  },
  {
    id: "everything-teachers",
    published: "2026-09-17",
    updated: "2026-09-17",
    book: "how-to-draw-everything",
    freePage: "draw-everything-easy",
    slug: {
      en: "easy-drawing-activities-for-elementary-students",
      es: "actividades-de-dibujo-faciles-para-primaria",
      ru: "prostye-zadaniya-po-risovaniyu-dlya-nachalnoy-shkoly",
    },
    related: [
      "everything-screen-free",
      "everything-parents",
    ],
    copy: {
      ru: {
        title: "Пошаговое рисование для детей в начальной школе",
        seoTitle: "Пошаговое рисование для детей: простые задания для начальной школы",
        seoDescription: "Простые задания по пошаговому рисованию для детей начальной школы: 111 рисунков для самостоятельной работы, творческих занятий и свободного времени.",
        lead: "Простые задания по пошаговому рисованию для детей начальной школы: 111 рисунков для самостоятельной работы, творческих занятий и свободного времени.",
        answer: "В школе и на дополнительных занятиях бывают ситуации, когда детям нужно предложить понятную творческую работу, которую они смогут выполнять самостоятельно. Один ученик закончил основное задание раньше остальных. Нужно организовать спокойную творческую паузу. Появилось свободное время. Или педагог хочет предложить детям самостоятельное рисование. Для таких ситуаций можно использовать пошаговые рисунки.",
        body: [
          {
            h: "Понятный способ начать рисовать",
            p: [
              "В книге «Как нарисовать все на свете» собрано 111 разных рисунков, включая милых животных, цветы, еду, подарки и другие темы.",
              "Чистый лист бумаги иногда ставит начинающего художника в тупик. Что рисовать? С чего начать?",
              "Пошаговая схема дает ребенку отправную точку.",
              "Вместо копирования сразу всей готовой картинки ученик следует последовательности и наблюдает, как постепенно появляется законченный рисунок.",
              "Книга содержит простые и понятные пошаговые инструкции и рассчитана на начинающих.",
            ],
          },
          {
            h: "111 разных вариантов",
            p: [
              "Не всем детям интересно рисовать одно и то же.",
              "Кому-то нравятся животные. Другому ребенку хочется нарисовать цветок или еду. Третий выберет совершенно другую тему.",
              "Коллекция из 111 рисунков дает детям возможность выбирать и пробовать разные сюжеты.",
            ],
          },
          {
            h: "Задание для тех, кто закончил работу раньше",
            p: [
              "Дети редко заканчивают школьные задания одновременно.",
              "Рисование может стать дополнительным творческим занятием для ребенка, который уже справился с основной работой.",
              "Он может выбрать новый рисунок и самостоятельно следовать этапам.",
            ],
          },
          {
            h: "Спокойная самостоятельная работа",
            p: [
              "Пошаговое рисование можно использовать и тогда, когда детям требуется спокойное индивидуальное занятие.",
              "Каждый работает со своим рисунком и продвигается в удобном темпе.",
              "После завершения рисунок можно раскрасить.",
            ],
          },
          {
            h: "Практика рисования",
            p: [
              "Книга предусматривает два вида практики для каждого рисунка и место для самостоятельной работы ребенка.",
              "Поэтому ученик может не только посмотреть последовательность действий, но и самостоятельно попробовать воспроизвести рисунок.",
            ],
          },
          {
            h: "Ресурс, к которому можно возвращаться",
            p: [
              "Нет необходимости проходить книгу от первой страницы до последней.",
              "Педагог или сам ребенок может выбрать подходящий рисунок тогда, когда требуется творческое задание.",
              "А 111 разных вариантов позволяют многократно возвращаться к книге в течение учебного процесса.",
            ],
          },
        ],
        listTitle: "Что в книге",
        list: [
          "111 пошаговых рисунков в семи темах: животные, цветы, природа, еда, подарки, одежда и разное",
          "Два вида практики для каждого рисунка: пунктир для обводки и свободное место для своего рисунка",
          "Черная линия показывает текущий шаг, серая то, что уже нарисовано",
          "Готовые рисунки можно раскрасить",
          "104 страницы, для детей от 5 лет",
        ],
        faq: [
          {
            q: "Какие простые задания по рисованию подойдут детям начальной школы?",
            a: "Пошаговые рисунки удобны тем, что ребенок получает понятную последовательность действий. Он видит, с чего начать и что добавить на следующем этапе.",
          },
          {
            q: "Можно ли использовать пошаговое рисование для самостоятельной работы?",
            a: "Да. Ребенок может выбрать рисунок и самостоятельно следовать последовательности этапов. В книге «Как нарисовать все на свете» собрано 111 разных рисунков, поэтому задания можно менять.",
          },
          {
            q: "Чем занять ученика, который закончил задание раньше остальных?",
            a: "Можно предложить ему самостоятельное пошаговое рисование. Ребенок выбирает изображение, выполняет его по этапам, а затем при желании раскрашивает готовую работу.",
          },
          {
            q: "Подходит ли книга для начинающих школьников?",
            a: "Да. В книге используются простые и понятные пошаговые инструкции, а среди ее читателей прямо названы начинающие юные художники.",
          },
          {
            q: "Можно ли использовать книгу не только на уроках рисования?",
            a: "Да. Пошаговые задания можно предлагать как самостоятельную творческую работу, дополнительное задание или спокойное занятие в свободное время.",
          },
        ],
        ctaTitle: "Попробуйте бесплатно",
        ctaLead: "Десять страниц из книги можно распечатать бесплатно, без регистрации и почты: вверху шаги, ниже обводка и место для своего рисунка. Если подойдет, в книге таких рисунков 111.",
      },
      en: {
        title: "Easy Step-by-Step Drawing Activities for Elementary Students",
        seoTitle: "Easy Drawing Activities for Elementary Students: 111 Step-by-Step Ideas",
        seoDescription: "Looking for easy drawing activities for elementary students? Discover 111 step-by-step drawings for early finishers, indoor recess, quiet time, and independent art.",
        lead: "Looking for easy drawing activities for elementary students? Discover 111 step-by-step drawings for early finishers, indoor recess, quiet time, and independent art.",
        answer: "Teachers often need simple activities students can work on independently. A student finishes an assignment early. Rain keeps everyone inside for recess. The class needs a quiet transition between lessons. Or students simply have some time for a creative activity. Step-by-step drawing can be useful in all of these situations.",
        body: [
          {
            h: "A Simple Way to Get Students Drawing",
            p: [
              "How to Draw Everything: 111 Easy Step-by-Step Drawings for Kids gives young artists 111 different drawings to choose from, including cute animals, flowers, foods, gifts, and other themes.",
              "For a beginning artist, the hardest part can be knowing where to start.",
              "Instead of presenting only a finished picture, step-by-step drawing breaks the process into smaller stages.",
              "Students follow the sequence and gradually build the complete picture.",
              "The book was designed for beginning young artists and uses simple, clear step-by-step guidance.",
            ],
          },
          {
            h: "111 Different Drawing Choices",
            p: [
              "Children do not always want to draw the same subject.",
              "One student may choose an animal while another wants to draw food, a flower, or something completely different.",
              "With 111 drawings across multiple themes, students can explore different subjects instead of repeating one category throughout the book.",
              "That variety also gives teachers many activities to choose from.",
            ],
          },
          {
            h: "Early Finishers",
            p: [
              "Students rarely finish classroom work at exactly the same time.",
              "A drawing activity can give early finishers something creative to work on while other students complete their assignments.",
              "Instead of asking, \"What should I do now?\" a student can choose another picture and begin drawing.",
            ],
          },
          {
            h: "Indoor Recess and Quiet Time",
            p: [
              "Bad weather sometimes means recess has to move indoors.",
              "Drawing requires little setup and can be done quietly at a desk.",
              "The same approach can work during quiet time, classroom transitions, or other moments when students need an independent activity.",
            ],
          },
          {
            h: "Art Centers and Independent Work",
            p: [
              "The book can also be available as one option in an art center or independent-work area.",
              "Students can choose a drawing, follow the steps, practice it, and color their finished picture.",
              "The book provides two types of practice for each drawing and space for children to work.",
            ],
          },
          {
            h: "A Drawing Resource Students Can Return To",
            p: [
              "A book with 111 different subjects does not need to be completed in order.",
              "Students can return to it whenever drawing fits into the classroom day and choose something new.",
              "For teachers looking for a collection of easy step-by-step drawing activities for elementary students, that flexibility may be just as useful as the drawings themselves.",
            ],
          },
        ],
        listTitle: "What is in the book",
        list: [
          "111 step-by-step drawings in seven themes: animals, flowers, nature, foods, gifts, clothing, and more",
          "Two kinds of practice for every drawing: a dotted outline to trace and blank space to draw your own",
          "The black line shows the current step, the gray line what is already drawn",
          "Finished drawings can be colored in",
          "104 pages, for ages 5 and up",
        ],
        faq: [
          {
            q: "What are easy drawing activities for elementary students?",
            a: "Step-by-step drawing is an easy way to give elementary students a structured art activity. Students follow the drawing in stages and gradually create the complete picture instead of starting from a blank page without guidance.",
          },
          {
            q: "Can step-by-step drawing be used for early finishers?",
            a: "Yes. Step-by-step drawing can be offered as an independent activity when students finish their regular work early. They can choose a picture and work through the steps at their own pace.",
          },
          {
            q: "What are good screen-free activities for indoor recess?",
            a: "Drawing is a simple screen-free option for indoor recess because students can work at their desks with basic drawing supplies. A collection of different drawing ideas also gives students a choice of what they want to create.",
          },
          {
            q: "Can a drawing book be used for independent classroom work?",
            a: "Yes. A step-by-step drawing book can be used for independent work because students have a visual sequence to follow. How to Draw Everything contains 111 different drawings and includes practice space for young artists.",
          },
          {
            q: "Is step-by-step drawing suitable for beginning elementary students?",
            a: "Yes. Step-by-step drawing breaks a complete picture into smaller stages, which makes the process easier to follow for beginners. How to Draw Everything was specifically created with beginning young artists in mind.",
          },
        ],
        ctaTitle: "Try it before you buy",
        ctaLead: "Ten pages from the book are free to print, with no account and no email: the steps at the top, tracing and practice below. If they work for your child, the book has 111.",
      },
      es: {
        title: "Actividades de Dibujo Paso a Paso para Estudiantes de Primaria",
        seoTitle: "Actividades de Dibujo Fáciles para Niños de Primaria Paso a Paso",
        seoDescription: "Descubre 111 actividades de dibujo paso a paso para estudiantes de primaria, ideales para quienes terminan temprano, recreo bajo techo y trabajo independiente.",
        lead: "Descubre 111 actividades de dibujo paso a paso para estudiantes de primaria, ideales para quienes terminan temprano, recreo bajo techo y trabajo independiente.",
        answer: "En el salón de clases hay momentos en los que una actividad sencilla e independiente puede ser especialmente útil. Un estudiante termina su trabajo antes que los demás. El mal tiempo obliga a hacer el recreo bajo techo. La clase necesita una actividad tranquila entre dos tareas. O simplemente hay tiempo para hacer algo creativo. El dibujo paso a paso puede adaptarse a muchas de estas situaciones.",
        body: [
          {
            h: "Una manera sencilla de empezar a dibujar",
            p: [
              "Cómo Dibujar Todo ofrece 111 dibujos diferentes, entre ellos animales tiernos, flores, comida, regalos y otros temas.",
              "Para algunos estudiantes, una hoja completamente en blanco puede ser difícil. No saben qué dibujar ni cómo comenzar.",
              "Una guía paso a paso les proporciona un punto de partida.",
              "En lugar de copiar toda la imagen terminada, los estudiantes siguen una secuencia y ven cómo el dibujo se va formando poco a poco.",
              "El libro utiliza instrucciones visuales sencillas y claras y está pensado para artistas principiantes.",
            ],
          },
          {
            h: "111 opciones diferentes",
            p: [
              "No todos los estudiantes quieren dibujar lo mismo.",
              "A uno puede interesarle un animal. Otro puede preferir una flor, comida o algún otro objeto.",
              "Una colección con 111 dibujos de diferentes temas permite que los estudiantes tengan opciones y exploren distintos tipos de imágenes.",
            ],
          },
          {
            h: "Una actividad para quienes terminan temprano",
            p: [
              "Los estudiantes no siempre terminan sus tareas al mismo tiempo.",
              "El dibujo puede convertirse en una opción creativa para quienes terminan antes.",
              "En lugar de preguntar qué deben hacer después, pueden elegir otro dibujo y comenzar a seguir los pasos.",
            ],
          },
          {
            h: "Recreo bajo techo y momentos tranquilos",
            p: [
              "Cuando el clima no permite salir al recreo, dibujar puede ser una actividad tranquila que los estudiantes pueden hacer en sus escritorios.",
              "También puede utilizarse durante momentos de trabajo independiente o cuando se necesita una transición tranquila entre actividades.",
            ],
          },
          {
            h: "Centros de arte y trabajo independiente",
            p: [
              "El libro también puede utilizarse como una opción dentro de un centro de arte o espacio de trabajo independiente.",
              "Los estudiantes pueden elegir un dibujo, seguir los pasos, practicar y después colorear su creación.",
              "Cada dibujo ofrece dos tipos de práctica y espacio para trabajar.",
            ],
          },
          {
            h: "Un recurso al que los estudiantes pueden regresar",
            p: [
              "Los 111 dibujos no tienen que completarse en un orden determinado.",
              "Los estudiantes pueden regresar al libro cuando haya tiempo para una actividad artística y elegir un nuevo tema.",
              "Para un maestro que busca actividades de dibujo fáciles para estudiantes de primaria, esta flexibilidad puede resultar especialmente práctica.",
            ],
          },
        ],
        listTitle: "Qué hay en el libro",
        list: [
          "111 dibujos paso a paso en siete temas: animales, flores, naturaleza, alimentos, regalos, ropa y más",
          "Dos tipos de práctica para cada dibujo: un contorno de puntos para repasar y espacio libre para dibujar el propio",
          "La línea negra muestra el paso actual, la gris lo que ya está dibujado",
          "Los dibujos terminados se pueden colorear",
          "104 páginas, a partir de 5 años",
        ],
        faq: [
          {
            q: "¿Cuáles son algunas actividades de dibujo fáciles para niños de primaria?",
            a: "El dibujo paso a paso es una actividad sencilla porque muestra a los estudiantes cómo construir una imagen por etapas. Pueden seguir la secuencia y completar el dibujo a su propio ritmo.",
          },
          {
            q: "¿Se puede usar el dibujo paso a paso con estudiantes que terminan temprano?",
            a: "Sí. Los estudiantes que terminan su trabajo antes pueden elegir un dibujo y trabajar de manera independiente mientras sus compañeros completan otras actividades.",
          },
          {
            q: "¿Qué actividad artística se puede usar durante el recreo bajo techo?",
            a: "El dibujo puede ser una opción sencilla para el recreo bajo techo porque los estudiantes pueden trabajar en sus escritorios con materiales básicos y elegir entre diferentes temas.",
          },
          {
            q: "¿Un libro de dibujo puede utilizarse para trabajo independiente en el salón?",
            a: "Sí. Las instrucciones visuales paso a paso permiten que los estudiantes sigan una secuencia por sí mismos. Cómo Dibujar Todo contiene 111 dibujos diferentes y espacio para practicar.",
          },
          {
            q: "¿El dibujo paso a paso es apropiado para estudiantes principiantes?",
            a: "Sí. Dividir una imagen en etapas hace que el proceso sea más fácil de seguir. El libro fue creado pensando en pequeños artistas que están comenzando.",
          },
        ],
        ctaTitle: "Pruébalo antes de comprar",
        ctaLead: "Diez páginas del libro se pueden imprimir gratis, sin registro y sin correo: los pasos arriba, el repaso y la práctica abajo. Si le funcionan a tu hijo, en el libro hay 111.",
      },
    },
  },
  {
    id: "everything-what-to-draw",
    published: "2026-09-17",
    updated: "2026-09-17",
    book: "how-to-draw-everything",
    freePage: "draw-everything-easy",
    slug: {
      en: "easy-things-to-draw-for-kids",
      es: "dibujos-faciles-para-ninos-que-dibujar",
      ru: "chto-narisovat-rebenku-legko",
    },
    related: [
      "everything-parents",
      "everything-screen-free",
    ],
    copy: {
      ru: {
        title: "Что нарисовать ребенку: простые идеи для начинающих",
        seoTitle: "Что легко нарисовать ребенку: животные, еда, цветы и другие идеи",
        seoDescription: "Что нарисовать ребенку легко и красиво? Простые пошаговые идеи: животные, цветы, еда, подарки и множество других рисунков для начинающих.",
        lead: "Что нарисовать ребенку легко и красиво? Простые пошаговые идеи: животные, цветы, еда, подарки и множество других рисунков для начинающих.",
        answer: "«Что мне нарисовать?» Этот вопрос знаком многим родителям. Ребенок хочет рисовать, перед ним лежат карандаши и бумага, но идеи нет. В такой ситуации можно не придумывать за него конкретную картинку, а предложить несколько разных тем и позволить выбрать самостоятельно.",
        body: [
          {
            h: "Начать со знакомых предметов",
            p: [
              "Начинающему художнику необязательно сразу браться за сложные композиции.",
              "Можно выбрать знакомый и интересный ребенку предмет: животное, цветок, еду, подарок.",
              "В книге «Как нарисовать все на свете» собрано 111 пошаговых рисунков разных тематик.",
            ],
          },
          {
            h: "Как нарисовать животное поэтапно",
            p: [
              "Готовая картинка может показаться начинающему ребенку сложной.",
              "Пошаговый вариант позволяет не пытаться воспроизвести все сразу.",
              "Ребенок выполняет один этап, затем добавляет следующий и постепенно получает целое изображение.",
              "Так перед ним находится не одна большая задача, а понятная последовательность действий.",
            ],
          },
          {
            h: "Не только животные",
            p: [
              "Даже если ребенок любит рисовать животных, ему может захотеться разнообразия.",
              "Сегодня можно выбрать цветок. Завтра что-нибудь из еды. Потом подарок или другой предмет.",
              "Разные темы позволяют каждый раз находить новую идею.",
            ],
          },
          {
            h: "Один рисунок, несколько попыток",
            p: [
              "Первый результат не обязательно должен быть единственным.",
              "К одному и тому же рисунку можно вернуться еще раз.",
              "В книге предусмотрены два вида практики для каждого изображения и место для самостоятельной работы.",
              "Ребенок может попробовать снова и сравнить свои рисунки.",
            ],
          },
          {
            h: "Нарисовать, а потом раскрасить",
            p: [
              "Когда основной рисунок закончен, работа может продолжиться.",
              "Ребенок выбирает цвета и раскрашивает получившееся изображение. Такая возможность предусмотрена самой книгой.",
            ],
          },
          {
            h: "111 ответов на вопрос «Что нарисовать?»",
            p: [
              "Иногда ребенку не нужен новый урок рисования. Ему просто нужна интересная идея.",
              "Выбрать рисунок. Посмотреть первый этап. Продолжить шаг за шагом. Закончить. Раскрасить.",
              "А в следующий раз выбрать что-нибудь новое.",
            ],
          },
        ],
        listTitle: "Что в книге",
        list: [
          "111 пошаговых рисунков в семи темах: животные, цветы, природа, еда, подарки, одежда и разное",
          "Два вида практики для каждого рисунка: пунктир для обводки и свободное место для своего рисунка",
          "Черная линия показывает текущий шаг, серая то, что уже нарисовано",
          "Готовые рисунки можно раскрасить",
          "104 страницы, для детей от 5 лет",
        ],
        faq: [
          {
            q: "Что можно легко нарисовать ребенку?",
            a: "Для начала можно выбрать знакомые и интересные ребенку темы: животных, цветы, еду, подарки и другие предметы. Если рисунок показан поэтапно, ребенку не приходится сразу копировать всю готовую картинку.",
          },
          {
            q: "Что предложить ребенку, если он не знает, что нарисовать?",
            a: "Можно дать ему несколько разных тем и позволить выбрать самостоятельно. В книге «Как нарисовать все на свете» собрано 111 идей для рисования, поэтому ребенок может просто пролистать книгу и найти понравившийся вариант.",
          },
          {
            q: "Как ребенку научиться рисовать животных поэтапно?",
            a: "Вместо того чтобы сразу копировать готовое животное, ребенок последовательно добавляет новые части рисунка. Шаг за шагом отдельные элементы превращаются в законченное изображение.",
          },
          {
            q: "Что можно рисовать кроме животных?",
            a: "Можно рисовать цветы, еду, подарки и множество других предметов. Разные темы позволяют ребенку менять сюжеты и каждый раз выбирать что-нибудь новое.",
          },
          {
            q: "Можно ли раскрашивать готовые рисунки?",
            a: "Да. После завершения пошагового рисунка ребенок может его раскрасить. Такая возможность предусмотрена в самой книге.",
          },
        ],
        ctaTitle: "Попробуйте бесплатно",
        ctaLead: "Десять страниц из книги можно распечатать бесплатно, без регистрации и почты: вверху шаги, ниже обводка и место для своего рисунка. Если подойдет, в книге таких рисунков 111.",
      },
      en: {
        title: "Easy Things to Draw for Kids When They Don't Know What to Draw",
        seoTitle: "Easy Things to Draw for Kids: Animals, Food, Flowers and More",
        seoDescription: "Looking for easy things for kids to draw? Find simple step-by-step ideas including cute animals, food, flowers, gifts, and many other fun subjects.",
        lead: "Looking for easy things for kids to draw? Find simple step-by-step ideas including cute animals, food, flowers, gifts, and many other fun subjects.",
        answer: "\"I want to draw something, but I don't know what.\" It is a familiar problem. Children may enjoy drawing but still need an idea to get started. One solution is to give them a variety of simple subjects rather than choosing the picture for them.",
        body: [
          {
            h: "Start With Something Familiar",
            p: [
              "Beginning artists do not necessarily need complicated scenes.",
              "They can start with subjects they already recognize and enjoy.",
              "Animals, flowers, foods, gifts, and other familiar objects can all become drawing ideas.",
              "How to Draw Everything collects 111 different step-by-step drawings from several themes in one book.",
            ],
          },
          {
            h: "Easy Animals to Draw",
            p: [
              "Animals are a natural place to start for many children.",
              "Instead of trying to copy a detailed realistic animal, a young artist can follow a simplified drawing one stage at a time.",
              "The goal is not to make every line perfect. The child has a clear sequence to follow and can see how separate parts eventually become a complete picture.",
            ],
          },
          {
            h: "Food, Flowers, Gifts and More",
            p: [
              "Not every child wants to draw animals every day.",
              "That is why variety can matter.",
              "A child might choose a flower today and food tomorrow. On another day, a gift or another object may look more interesting.",
              "A collection containing different categories gives children a simple answer to the question: \"What can I draw today?\"",
            ],
          },
          {
            h: "Follow the Drawing One Step at a Time",
            p: [
              "A finished illustration can look difficult to a beginner.",
              "Breaking it into steps changes the task.",
              "The child only needs to look at what happens next and add that part to the drawing.",
              "The book uses simple and clear step-by-step guidance intended for young beginning artists.",
            ],
          },
          {
            h: "Try the Drawing Again",
            p: [
              "The first attempt does not have to be the last.",
              "Children can practice the same subject again and see how their second drawing differs from their first.",
              "The book includes two types of practice for each drawing and space for children to work.",
            ],
          },
          {
            h: "Add Color",
            p: [
              "Finishing the outline does not have to end the activity.",
              "Children can color the pictures they have drawn and make their versions different from the examples. The book specifically encourages children to color their completed drawings.",
            ],
          },
          {
            h: "111 Answers to \"What Should I Draw?\"",
            p: [
              "Sometimes children do not need another lesson.",
              "They simply need an idea.",
              "With 111 different subjects, there is plenty to browse until something catches their attention.",
              "Choose one. Follow the steps. Draw it. Color it.",
              "And when it is time to draw again, choose something different.",
            ],
          },
        ],
        listTitle: "What is in the book",
        list: [
          "111 step-by-step drawings in seven themes: animals, flowers, nature, foods, gifts, clothing, and more",
          "Two kinds of practice for every drawing: a dotted outline to trace and blank space to draw your own",
          "The black line shows the current step, the gray line what is already drawn",
          "Finished drawings can be colored in",
          "104 pages, for ages 5 and up",
        ],
        faq: [
          {
            q: "What are some easy things for kids to draw?",
            a: "Kids can start with familiar subjects such as animals, flowers, foods, gifts, and everyday objects. Simple subjects are especially approachable when the finished picture is broken into smaller drawing steps.",
          },
          {
            q: "What should a child draw when they don't know what to draw?",
            a: "Give the child several different types of subjects and let them choose. How to Draw Everything contains 111 drawing ideas across multiple themes, so children can browse until they find something that interests them.",
          },
          {
            q: "How can kids learn to draw cute animals step by step?",
            a: "Instead of trying to copy the complete animal at once, children can follow a sequence that adds one part of the picture at a time. This makes a more complicated finished drawing easier for a beginner to approach.",
          },
          {
            q: "What other things can kids draw besides animals?",
            a: "Children can draw flowers, foods, gifts, and many other subjects. A drawing collection with different themes lets children switch subjects whenever they want something new to draw.",
          },
          {
            q: "Can children color their step-by-step drawings?",
            a: "Yes. After completing a drawing, children can color their finished picture. How to Draw Everything specifically includes coloring as part of the creative experience.",
          },
        ],
        ctaTitle: "Try it before you buy",
        ctaLead: "Ten pages from the book are free to print, with no account and no email: the steps at the top, tracing and practice below. If they work for your child, the book has 111.",
      },
      es: {
        title: "Dibujos Fáciles para Niños Cuando No Saben Qué Dibujar",
        seoTitle: "Dibujos Fáciles para Niños: Animales, Comida, Flores y Más",
        seoDescription: "¿Buscas dibujos fáciles para niños? Encuentra ideas paso a paso de animales tiernos, comida, flores, regalos y muchos otros temas divertidos.",
        lead: "¿Buscas dibujos fáciles para niños? Encuentra ideas paso a paso de animales tiernos, comida, flores, regalos y muchos otros temas divertidos.",
        answer: "\"Quiero dibujar algo, pero no sé qué.\" A muchos niños les pasa. Les gusta dibujar, tienen lápices y papel, pero necesitan una idea para comenzar. Una solución sencilla es ofrecerles distintos tipos de dibujos y dejar que ellos elijan.",
        body: [
          {
            h: "Empezar con algo conocido",
            p: [
              "Un niño que está aprendiendo no necesita comenzar con escenas complicadas.",
              "Puede elegir objetos y personajes que reconozca y que le resulten interesantes.",
              "Animales, flores, comida y regalos pueden convertirse en buenos puntos de partida.",
              "Cómo Dibujar Todo reúne 111 dibujos paso a paso de diferentes temas.",
            ],
          },
          {
            h: "Animales fáciles de dibujar",
            p: [
              "Los animales son uno de los temas que muchos niños disfrutan.",
              "En lugar de intentar copiar una imagen detallada de una sola vez, pueden seguir una secuencia sencilla.",
              "Cada nueva parte se añade a la anterior hasta completar el dibujo.",
              "Así, el niño no tiene que pensar en toda la imagen al mismo tiempo.",
            ],
          },
          {
            h: "Comida, flores, regalos y mucho más",
            p: [
              "No todos los días tienen que dibujar animales.",
              "Hoy puede ser una flor. Mañana, algo de comida. Después, un regalo u otro objeto.",
              "Tener diferentes categorías permite que el niño cambie de tema cuando quiera probar algo nuevo.",
            ],
          },
          {
            h: "Dibujar un paso a la vez",
            p: [
              "Una imagen terminada puede parecer complicada para alguien que está empezando.",
              "Cuando esa misma imagen se divide en pasos, la tarea resulta más fácil de seguir.",
              "El niño mira qué debe añadir a continuación y continúa hasta completar el dibujo.",
              "El libro utiliza instrucciones paso a paso sencillas y claras para pequeños artistas principiantes.",
            ],
          },
          {
            h: "Volver a intentarlo",
            p: [
              "El primer dibujo no tiene que ser el último.",
              "Los niños pueden practicar el mismo tema nuevamente y comparar sus diferentes intentos.",
              "El libro incluye dos tipos de práctica para cada dibujo y espacio para trabajar.",
            ],
          },
          {
            h: "Dibujar y después colorear",
            p: [
              "Cuando el dibujo está terminado, la actividad puede continuar.",
              "Los niños pueden elegir los colores y completar su propia versión de la imagen. El libro incluye expresamente la posibilidad de colorear los dibujos realizados.",
            ],
          },
          {
            h: "111 respuestas a \"¿Qué puedo dibujar?\"",
            p: [
              "A veces un niño no necesita otra explicación. Solo necesita una idea.",
              "Puede elegir un dibujo. Seguir los pasos. Practicar. Colorearlo.",
              "Y la próxima vez puede elegir algo completamente diferente.",
            ],
          },
        ],
        listTitle: "Qué hay en el libro",
        list: [
          "111 dibujos paso a paso en siete temas: animales, flores, naturaleza, alimentos, regalos, ropa y más",
          "Dos tipos de práctica para cada dibujo: un contorno de puntos para repasar y espacio libre para dibujar el propio",
          "La línea negra muestra el paso actual, la gris lo que ya está dibujado",
          "Los dibujos terminados se pueden colorear",
          "104 páginas, a partir de 5 años",
        ],
        faq: [
          {
            q: "¿Qué cosas fáciles pueden dibujar los niños?",
            a: "Los niños pueden comenzar con temas conocidos, como animales, flores, comida, regalos y otros objetos. Una guía paso a paso les permite trabajar con una parte del dibujo a la vez.",
          },
          {
            q: "¿Qué puede dibujar un niño cuando no sabe qué dibujar?",
            a: "Puede hojear diferentes temas y elegir el que más le interese. Cómo Dibujar Todo reúne 111 ideas, por lo que el niño tiene muchas opciones sin necesidad de buscar un nuevo dibujo cada vez.",
          },
          {
            q: "¿Cómo pueden los niños aprender a dibujar animales paso a paso?",
            a: "En lugar de intentar copiar todo el animal de una sola vez, pueden seguir una secuencia que añade nuevas partes poco a poco hasta completar el dibujo.",
          },
          {
            q: "¿Qué pueden dibujar los niños además de animales?",
            a: "Pueden dibujar flores, comida, regalos y muchos otros temas. La variedad permite cambiar de tema cuando el niño quiere probar algo diferente.",
          },
          {
            q: "¿Los niños pueden colorear los dibujos después de terminarlos?",
            a: "Sí. Después de seguir los pasos y completar el dibujo, pueden colorear su creación y elegir sus propios colores.",
          },
        ],
        ctaTitle: "Pruébalo antes de comprar",
        ctaLead: "Diez páginas del libro se pueden imprimir gratis, sin registro y sin correo: los pasos arriba, el repaso y la práctica abajo. Si le funcionan a tu hijo, en el libro hay 111.",
      },
    },
  },
  {
    id: "everything-screen-free",
    published: "2026-09-17",
    updated: "2026-09-17",
    book: "how-to-draw-everything",
    freePage: "draw-everything-easy",
    slug: {
      en: "screen-free-activities-for-kids-drawing",
      es: "actividades-para-ninos-sin-pantallas-dibujo",
      ru: "chem-zanyat-rebenka-bez-gadzhetov-risovanie",
    },
    related: [
      "everything-what-to-draw",
      "everything-teachers",
    ],
    copy: {
      ru: {
        title: "Чем занять ребенка без гаджетов: простая идея для творчества",
        seoTitle: "Чем занять ребенка без телефона и планшета: пошаговое рисование",
        seoDescription: "Чем занять ребенка без гаджетов? Пошаговое рисование - простое творческое занятие для дома, выходных, поездок и спокойного свободного времени.",
        lead: "Чем занять ребенка без гаджетов? Пошаговое рисование - простое творческое занятие для дома, выходных, поездок и спокойного свободного времени.",
        answer: "Телефон, планшет или телевизор позволяют быстро занять свободное время ребенка. Но иногда родители хотят предложить другое занятие: без экрана, без приложения, без необходимости каждый раз искать новое видео. Один из самых простых вариантов - рисование. Для начала достаточно книги, карандаша и, при желании, материалов для раскрашивания.",
        body: [
          {
            h: "Ребенок создает рисунок сам",
            p: [
              "При рисовании ребенок не просто наблюдает за готовым изображением.",
              "Он сам проводит линии и постепенно создает собственную работу.",
              "При пошаговом рисовании ребенок смотрит на очередной этап, повторяет его и переходит к следующему.",
              "В книге «Как нарисовать все на свете» собрано 111 пошаговых рисунков для юных художников.",
            ],
          },
          {
            h: "Не нужно каждый раз придумывать новое занятие",
            p: [
              "У чистого листа есть один недостаток: нужно решить, что на нем нарисовать.",
              "Большая коллекция рисунков решает эту проблему.",
              "Ребенок может пролистать разные темы: животных, цветы, еду, подарки и другие изображения, и самостоятельно выбрать понравившийся вариант.",
            ],
          },
          {
            h: "Спокойное занятие дома",
            p: [
              "Рисовать можно после школы, вечером, в выходной или во время каникул.",
              "Нет необходимости выполнять определенное количество рисунков или проходить книгу по порядку.",
              "Ребенок выбирает то, что ему интересно сейчас.",
            ],
          },
          {
            h: "Книга для поездки",
            p: [
              "Книгу для рисования удобно взять с собой туда, где ребенку предстоит провести некоторое время. Например, в поездку или путешествие.",
              "Вместо необходимости каждый раз искать новое цифровое развлечение у ребенка уже есть большой выбор рисунков в одной книге.",
            ],
          },
          {
            h: "Рисование и раскрашивание",
            p: [
              "Работа не обязательно заканчивается после выполнения последнего этапа рисунка.",
              "В книге предусмотрены два вида практики, а готовые изображения можно раскрашивать.",
              "Поэтому один выбранный сюжет можно использовать для нескольких последовательных действий.",
            ],
          },
          {
            h: "111 идей для творчества без экрана",
            p: [
              "Чтобы предложить ребенку занятие без гаджетов, необязательно придумывать что-то сложное.",
              "Иногда достаточно карандаша, интересной картинки и понятной последовательности.",
              "Выбрать. Нарисовать. Попрактиковаться. Раскрасить. А потом открыть следующую страницу.",
            ],
          },
        ],
        listTitle: "Что в книге",
        list: [
          "111 пошаговых рисунков в семи темах: животные, цветы, природа, еда, подарки, одежда и разное",
          "Два вида практики для каждого рисунка: пунктир для обводки и свободное место для своего рисунка",
          "Черная линия показывает текущий шаг, серая то, что уже нарисовано",
          "Готовые рисунки можно раскрасить",
          "104 страницы, для детей от 5 лет",
        ],
        faq: [
          {
            q: "Чем можно занять ребенка дома без телефона и планшета?",
            a: "Рисование, раскрашивание, чтение, конструкторы, пазлы и поделки позволяют организовать свободное время без экрана. Для пошагового рисования достаточно книги, карандаша и, при желании, материалов для раскрашивания.",
          },
          {
            q: "Подходит ли рисование для самостоятельного тихого занятия?",
            a: "Да. Ребенок может выбрать рисунок, следовать показанным этапам в своем темпе, а после завершения продолжить работу и раскрасить картинку.",
          },
          {
            q: "Что предложить ребенку вместо мультиков и игр на планшете?",
            a: "Можно предложить занятие, в котором ребенок сам что-то создает: рисование, раскрашивание, чтение, конструктор, пазлы или поделки. Пошаговое рисование дополнительно дает ребенку готовую идею и понятную последовательность действий.",
          },
          {
            q: "Подойдет ли книга для рисования в дорогу и путешествие?",
            a: "Да. Книгу можно взять в поездку или путешествие как вариант спокойного занятия. Для рисования не требуется электронное устройство.",
          },
          {
            q: "Как заинтересовать ребенка рисованием без гаджетов?",
            a: "Дайте ему возможность самому выбирать тему. В книге 111 разных рисунков, включая животных, цветы, еду, подарки и другие сюжеты, поэтому ребенок не ограничен одним видом заданий.",
          },
        ],
        ctaTitle: "Попробуйте бесплатно",
        ctaLead: "Десять страниц из книги можно распечатать бесплатно, без регистрации и почты: вверху шаги, ниже обводка и место для своего рисунка. Если подойдет, в книге таких рисунков 111.",
      },
      en: {
        title: "A Simple Screen-Free Activity for Kids Who Like to Create",
        seoTitle: "Screen-Free Activities for Kids: Learn to Draw Step by Step",
        seoDescription: "Need a screen-free activity for kids? Step-by-step drawing gives children something creative to do at home, while traveling, on weekends, or during quiet time.",
        lead: "Need a screen-free activity for kids? Step-by-step drawing gives children something creative to do at home, while traveling, on weekends, or during quiet time.",
        answer: "Tablets and phones make it easy to fill spare time. But sometimes parents want an activity their child can do without watching another screen. Drawing is one of the simplest options. A pencil, some coloring supplies, and a drawing book can be enough to get started.",
        body: [
          {
            h: "Drawing Gives Kids Something to Do With Their Hands",
            p: [
              "A drawing activity is active rather than something children simply watch.",
              "They have to make the lines themselves.",
              "With step-by-step drawing, children can look at each stage and reproduce it on the page until their picture is complete.",
              "How to Draw Everything contains 111 step-by-step drawings for young artists.",
            ],
          },
          {
            h: "No Need to Search for a New Idea Every Time",
            p: [
              "One problem with an open sheet of paper is deciding what to put on it.",
              "A large drawing collection solves that problem.",
              "Children can browse animals, flowers, foods, gifts, and other themes until they find something they want to draw.",
              "Tomorrow they can choose something else.",
            ],
          },
          {
            h: "A Quiet Activity at Home",
            p: [
              "Drawing can fit naturally into different parts of the day.",
              "A child can draw after school, during a quiet afternoon, on a weekend, or while other family members are busy.",
              "There is no need to complete a certain number of pages or follow the drawings in order.",
            ],
          },
          {
            h: "Something to Take on a Trip",
            p: [
              "Drawing can also be a practical travel activity.",
              "A physical drawing book can go into a backpack for a road trip, flight, vacation, or visit to relatives.",
              "Instead of searching online for another activity, the child already has many drawing ideas collected in one place.",
            ],
          },
          {
            h: "Practice and Then Add Color",
            p: [
              "The activity can continue after the basic drawing is finished.",
              "The book offers two types of practice for each drawing, and children can also color the pictures they create.",
              "That means one drawing idea can become several stages of activity rather than something that is over after a few lines.",
            ],
          },
          {
            h: "111 Screen-Free Drawing Ideas in One Book",
            p: [
              "A screen-free activity does not have to be complicated.",
              "Sometimes children just need something interesting in front of them and the freedom to create it themselves.",
              "With 111 different step-by-step drawings, they can keep choosing, drawing, practicing, and coloring.",
            ],
          },
        ],
        listTitle: "What is in the book",
        list: [
          "111 step-by-step drawings in seven themes: animals, flowers, nature, foods, gifts, clothing, and more",
          "Two kinds of practice for every drawing: a dotted outline to trace and blank space to draw your own",
          "The black line shows the current step, the gray line what is already drawn",
          "Finished drawings can be colored in",
          "104 pages, for ages 5 and up",
        ],
        faq: [
          {
            q: "What are good screen-free activities for kids at home?",
            a: "Drawing, coloring, reading, puzzles, crafts, and building activities can all give children something to do away from screens. Step-by-step drawing is especially simple because a child can begin with a book, a pencil, and basic coloring supplies.",
          },
          {
            q: "Is drawing a good independent quiet-time activity for kids?",
            a: "Yes. Once children understand how to follow the visual steps, they can work through a drawing at their own pace. They can then practice the picture again or color their finished drawing.",
          },
          {
            q: "What can kids do instead of watching a tablet or TV?",
            a: "Children can draw, color, read, build, make crafts, play puzzles, or create their own stories. A step-by-step drawing book combines a structured activity with room for children to create something themselves.",
          },
          {
            q: "Is a drawing book good for road trips and travel?",
            a: "A physical drawing book can be a convenient screen-free activity for road trips, flights, vacations, restaurants, and waiting times. Children need only simple drawing supplies to begin.",
          },
          {
            q: "How do I keep a child interested in a screen-free drawing activity?",
            a: "Offer variety and let the child choose what to draw. How to Draw Everything contains 111 drawings across different themes, allowing children to move from one type of subject to another instead of repeating the same activity.",
          },
        ],
        ctaTitle: "Try it before you buy",
        ctaLead: "Ten pages from the book are free to print, with no account and no email: the steps at the top, tracing and practice below. If they work for your child, the book has 111.",
      },
      es: {
        title: "Una Actividad Creativa para Niños Sin Pantallas",
        seoTitle: "Actividades para Niños Sin Pantallas: Aprender a Dibujar Paso a Paso",
        seoDescription: "¿Buscas actividades para niños sin pantallas? El dibujo paso a paso es una opción creativa para casa, viajes, fines de semana y momentos tranquilos.",
        lead: "¿Buscas actividades para niños sin pantallas? El dibujo paso a paso es una opción creativa para casa, viajes, fines de semana y momentos tranquilos.",
        answer: "Es fácil llenar el tiempo libre con una tableta, un celular o la televisión. Pero a veces las familias buscan algo diferente: una actividad que el niño pueda hacer con sus propias manos y sin depender de una pantalla. Dibujar es una de las opciones más sencillas. Un libro, un lápiz y algunos materiales para colorear pueden ser suficientes para empezar.",
        body: [
          {
            h: "Una actividad que el niño hace por sí mismo",
            p: [
              "Cuando un niño dibuja, no se limita a mirar lo que sucede. Tiene que crear las líneas.",
              "En el dibujo paso a paso, observa una etapa y la reproduce antes de continuar con la siguiente.",
              "Cómo Dibujar Todo ofrece 111 dibujos paso a paso para pequeños artistas.",
            ],
          },
          {
            h: "No hay que buscar una idea nueva cada vez",
            p: [
              "Una hoja en blanco ofrece libertad, pero también plantea una pregunta: \"¿Y ahora qué dibujo?\"",
              "Una colección amplia de dibujos ayuda a resolver ese problema.",
              "El niño puede hojear animales, flores, comida, regalos y otros temas hasta encontrar algo que le interese.",
            ],
          },
          {
            h: "Una actividad tranquila para hacer en casa",
            p: [
              "El dibujo puede adaptarse fácilmente a diferentes momentos del día: después de la escuela, durante una tarde tranquila, un fin de semana o mientras otros miembros de la familia están ocupados.",
              "No es necesario completar el libro en orden. Cada niño puede elegir el dibujo que quiera hacer.",
            ],
          },
          {
            h: "Una actividad para llevar de viaje",
            p: [
              "Un libro de dibujo también puede acompañar a la familia durante un viaje.",
              "Puede llevarse en una mochila para usarlo durante un viaje por carretera, un vuelo, unas vacaciones o un tiempo de espera.",
              "En lugar de buscar constantemente algo nuevo en una pantalla, el niño ya tiene muchas ideas para dibujar en un solo lugar.",
            ],
          },
          {
            h: "Practicar y colorear",
            p: [
              "La actividad no tiene que terminar cuando aparece el dibujo completo.",
              "Cada dibujo ofrece dos tipos de práctica, y los niños también pueden colorear sus creaciones.",
              "De esta manera, una sola idea puede convertirse en varias etapas de actividad.",
            ],
          },
          {
            h: "111 ideas creativas lejos de las pantallas",
            p: [
              "Una actividad sin pantallas no tiene que ser complicada.",
              "A veces basta con ofrecerle al niño una idea interesante y dejar que la cree por sí mismo.",
              "Con 111 dibujos diferentes, puede elegir, dibujar, practicar y colorear una y otra vez.",
            ],
          },
        ],
        listTitle: "Qué hay en el libro",
        list: [
          "111 dibujos paso a paso en siete temas: animales, flores, naturaleza, alimentos, regalos, ropa y más",
          "Dos tipos de práctica para cada dibujo: un contorno de puntos para repasar y espacio libre para dibujar el propio",
          "La línea negra muestra el paso actual, la gris lo que ya está dibujado",
          "Los dibujos terminados se pueden colorear",
          "104 páginas, a partir de 5 años",
        ],
        faq: [
          {
            q: "¿Qué actividades sin pantallas pueden hacer los niños en casa?",
            a: "Dibujar, colorear, leer, hacer rompecabezas y crear manualidades son algunas opciones. El dibujo paso a paso es especialmente sencillo porque se puede comenzar con un libro, un lápiz y materiales para colorear.",
          },
          {
            q: "¿Dibujar es una buena actividad independiente para momentos tranquilos?",
            a: "Sí. Cuando el niño entiende cómo seguir la secuencia visual, puede avanzar a su propio ritmo, practicar el dibujo y después colorearlo.",
          },
          {
            q: "¿Qué puede hacer un niño en lugar de usar la tableta o el celular?",
            a: "Puede dibujar, colorear, leer, construir, hacer manualidades o resolver rompecabezas. Un libro de dibujo paso a paso le ofrece una actividad guiada en la que él mismo crea el resultado.",
          },
          {
            q: "¿Un libro de dibujo es una buena actividad para viajes?",
            a: "Sí. Puede llevarse en una mochila para usarlo durante viajes por carretera, vuelos, vacaciones o tiempos de espera. Solo hacen falta materiales básicos para dibujar.",
          },
          {
            q: "¿Cómo mantener a un niño interesado en una actividad sin pantallas?",
            a: "Una buena estrategia es ofrecer variedad y permitirle elegir. Cómo Dibujar Todo contiene 111 dibujos de diferentes temas, por lo que el niño puede cambiar de tema cuando quiera probar algo nuevo.",
          },
        ],
        ctaTitle: "Pruébalo antes de comprar",
        ctaLead: "Diez páginas del libro se pueden imprimir gratis, sin registro y sin correo: los pasos arriba, el repaso y la práctica abajo. Si le funcionan a tu hijo, en el libro hay 111.",
      },
    },
  },
  {
    id: "everything-beginners",
    published: "2026-09-17",
    updated: "2026-09-17",
    book: "how-to-draw-everything",
    freePage: "draw-everything-easy",
    slug: {
      en: "how-can-a-beginner-learn-to-draw",
      es: "aprender-a-dibujar-desde-cero-ninos",
      ru: "ya-ne-umeyu-risovat-kak-nachat-poetapno",
    },
    related: [
      "everything-parents",
      "everything-what-to-draw",
    ],
    copy: {
      ru: {
        title: "«Я не умею рисовать»: как начать рисовать поэтапно с нуля",
        seoTitle: "«Я не умею рисовать»: как ребенку начать рисовать поэтапно с нуля",
        seoDescription: "Как научить ребенка рисовать с нуля? Пошаговый метод помогает начинающему двигаться от первого элемента к готовому рисунку и самостоятельно практиковаться.",
        lead: "Как научить ребенка рисовать с нуля? Пошаговый метод помогает начинающему двигаться от первого элемента к готовому рисунку и самостоятельно практиковаться.",
        answer: "Когда ребенок говорит «Я не умею рисовать», проблема иногда заключается не в самом рисовании. Он просто не понимает, с чего начать. Перед ним готовая картинка. Рядом чистый лист. А что должно произойти между ними, непонятно. Пошаговое рисование показывает этот путь.",
        body: [
          {
            h: "Не начинать сразу со всей картинки",
            p: [
              "Представьте, что начинающему художнику предлагают сразу скопировать готовое изображение.",
              "Нужно одновременно следить за множеством разных деталей.",
              "При пошаговом подходе задача выглядит иначе.",
              "Не нужно рисовать все сразу. Нужно выполнить только следующий этап.",
            ],
          },
          {
            h: "Рисунок появляется постепенно",
            p: [
              "Пошаговая схема показывает последовательность создания изображения.",
              "Ребенок добавляет одну часть. Потом следующую. И продолжает, пока отдельные элементы не превращаются в законченный рисунок.",
              "Книга «Как нарисовать все на свете» рассчитана в том числе на начинающих юных художников и содержит простые и понятные пошаговые инструкции.",
            ],
          },
          {
            h: "Пусть ребенок выбирает сам",
            p: [
              "Учиться рисовать не означает каждый раз получать готовое задание от взрослого.",
              "Возможность выбора тоже важна.",
              "В книге 111 разных рисунков: милые животные, цветы, еда, подарки и другие темы.",
              "Ребенок может начать именно с того изображения, которое ему понравилось.",
            ],
          },
          {
            h: "Зачем повторять рисунок",
            p: [
              "Посмотреть, как создается картинка, и самостоятельно ее нарисовать - не одно и то же. Нужна практика.",
              "Для каждого рисунка книга предлагает два вида практики и место для самостоятельной работы.",
              "К уже выполненному рисунку можно вернуться позже и попробовать еще раз.",
            ],
          },
          {
            h: "Рисунок не обязан точно повторять образец",
            p: [
              "Пошаговая схема показывает, как построить изображение.",
              "Но детская работа не обязана выглядеть как точная копия примера.",
              "После выполнения основных этапов ребенок может раскрасить рисунок и сделать свою версию.",
            ],
          },
          {
            h: "Начинать лучше с понятной задачи",
            p: [
              "Для первого знакомства с рисованием необязательно изучать сложные художественные приемы.",
              "Выберите рисунок. Выполните первый этап. Затем второй. Дойдите до готовой картинки. Попробуйте еще раз.",
              "А потом выберите следующую из 111 идей для рисования.",
            ],
          },
        ],
        listTitle: "Что в книге",
        list: [
          "111 пошаговых рисунков в семи темах: животные, цветы, природа, еда, подарки, одежда и разное",
          "Два вида практики для каждого рисунка: пунктир для обводки и свободное место для своего рисунка",
          "Черная линия показывает текущий шаг, серая то, что уже нарисовано",
          "Готовые рисунки можно раскрасить",
          "104 страницы, для детей от 5 лет",
        ],
        faq: [
          {
            q: "Как научить ребенка рисовать с нуля?",
            a: "Начните с простого пошагового рисунка. Ребенку не нужно сразу воспроизводить всю готовую картинку: он выполняет один этап, затем переходит к следующему и постепенно получает законченное изображение.",
          },
          {
            q: "Что делать, если ребенок говорит: «Я не умею рисовать»?",
            a: "Можно предложить ему не начинать с самостоятельного изображения на чистом листе, а попробовать понятную пошаговую схему. Она показывает, с чего начать и что рисовать дальше.",
          },
          {
            q: "Подходит ли поэтапное рисование для начинающих?",
            a: "Да. Книга «Как нарисовать все на свете» рассчитана в том числе на начинающих юных художников и содержит простые и понятные пошаговые инструкции.",
          },
          {
            q: "Зачем ребенку повторно рисовать один и тот же предмет?",
            a: "Повторная попытка дает возможность еще раз пройти уже знакомую последовательность самостоятельно. В книге для каждого рисунка предусмотрены два вида практики и место для работы.",
          },
          {
            q: "Должен ли детский рисунок точно повторять образец?",
            a: "Нет. Пошаговый образец показывает последовательность создания изображения, но готовая работа ребенка не обязана быть точной копией. После выполнения рисунка ребенок может раскрасить его по своему выбору.",
          },
        ],
        ctaTitle: "Попробуйте бесплатно",
        ctaLead: "Десять страниц из книги можно распечатать бесплатно, без регистрации и почты: вверху шаги, ниже обводка и место для своего рисунка. Если подойдет, в книге таких рисунков 111.",
      },
      en: {
        title: "How Can a Beginner Learn to Draw? Start One Step at a Time",
        seoTitle: "How Can a Beginner Learn to Draw? Easy Step-by-Step Drawing for Kids",
        seoDescription: "Want to help a child learn how to draw? See how simple step-by-step drawings can help beginners start with familiar subjects and practice at their own pace.",
        lead: "Want to help a child learn how to draw? See how simple step-by-step drawings can help beginners start with familiar subjects and practice at their own pace.",
        answer: "When children say they cannot draw, they may simply not know how to begin. They see the finished picture. They see their blank page. And the distance between the two looks enormous. Step-by-step drawing makes that distance smaller.",
        body: [
          {
            h: "Don't Start With the Finished Picture",
            p: [
              "Imagine asking a beginning artist to draw an entire animal from a completed illustration.",
              "There are ears, eyes, legs, a body and many other details to think about at once.",
              "Now break that same picture into a sequence.",
              "The task changes.",
              "Instead of drawing everything, the child only needs to complete the next step.",
            ],
          },
          {
            h: "Build the Drawing Gradually",
            p: [
              "Step-by-step drawing shows how a picture develops.",
              "The child adds one part and then another until the separate lines and shapes become a recognizable object.",
              "How to Draw Everything was created for beginning young artists and contains simple, clear step-by-step guides for its drawings.",
            ],
          },
          {
            h: "Let Children Choose What Interests Them",
            p: [
              "Learning does not mean every child has to draw the same subject.",
              "Choice can make drawing more enjoyable.",
              "The book contains 111 different drawings, including animals, flowers, foods, gifts, and other themes.",
              "A child can start with whichever picture looks interesting.",
            ],
          },
          {
            h: "Practice Matters",
            p: [
              "Seeing how something is drawn and actually drawing it are different things.",
              "Children need an opportunity to try.",
              "The book provides two types of practice for each drawing and space for children to work on their pictures.",
              "They can also return to a drawing later and try it again.",
            ],
          },
          {
            h: "Don't Make Every Drawing Look the Same",
            p: [
              "The example provides a guide, not a requirement that every child's picture be identical.",
              "A child can change details and choose colors for the finished drawing.",
              "The book specifically allows children to color the pictures they create.",
            ],
          },
          {
            h: "Keep Drawing Manageable",
            p: [
              "For a beginning artist, learning to draw does not need to start with complicated techniques.",
              "Start with one picture. Follow one step. Then the next. Finish the drawing. Practice it again.",
              "Then choose another of the 111 things to draw.",
              "That is a much less intimidating way to approach a blank page.",
            ],
          },
        ],
        listTitle: "What is in the book",
        list: [
          "111 step-by-step drawings in seven themes: animals, flowers, nature, foods, gifts, clothing, and more",
          "Two kinds of practice for every drawing: a dotted outline to trace and blank space to draw your own",
          "The black line shows the current step, the gray line what is already drawn",
          "Finished drawings can be colored in",
          "104 pages, for ages 5 and up",
        ],
        faq: [
          {
            q: "How can I teach my child to draw step by step?",
            a: "Start with a simple picture and divide the drawing process into smaller stages. Let the child complete one stage before moving to the next instead of asking them to reproduce the entire finished picture at once.",
          },
          {
            q: "How can a child learn to draw without getting frustrated?",
            a: "Begin with manageable drawings and focus on following one step at a time rather than making the picture perfect. Repeating a drawing also gives children another opportunity to practice without treating the first attempt as a final result.",
          },
          {
            q: "Is step-by-step drawing good for absolute beginners?",
            a: "Yes. Step-by-step drawing gives beginners a clear starting point and shows them what to add next. How to Draw Everything uses simple, clear drawing guidance and was created for beginning young artists.",
          },
          {
            q: "Why is practice important when children learn to draw?",
            a: "Practice lets children repeat the process rather than simply look at an example. How to Draw Everything includes two types of practice for each drawing and space for children to work on their own versions.",
          },
          {
            q: "Should children copy a drawing exactly when learning?",
            a: "No. A step-by-step example can show children how a picture is constructed, but their finished drawing does not have to be identical. Once the basic picture is complete, children can add their own details or colors.",
          },
        ],
        ctaTitle: "Try it before you buy",
        ctaLead: "Ten pages from the book are free to print, with no account and no email: the steps at the top, tracing and practice below. If they work for your child, the book has 111.",
      },
      es: {
        title: "Cómo Aprender a Dibujar Desde Cero: Un Paso a la Vez",
        seoTitle: "Cómo Aprender a Dibujar Desde Cero: Dibujos Paso a Paso para Principiantes",
        seoDescription: "¿Quieres ayudar a un niño a aprender a dibujar? Descubre cómo los dibujos paso a paso permiten a los principiantes empezar poco a poco y practicar a su ritmo.",
        lead: "¿Quieres ayudar a un niño a aprender a dibujar? Descubre cómo los dibujos paso a paso permiten a los principiantes empezar poco a poco y practicar a su ritmo.",
        answer: "Cuando un niño dice \"no sé dibujar\", muchas veces el verdadero problema es que no sabe por dónde empezar. Ve el dibujo terminado. Después mira su hoja en blanco. Y no sabe cómo pasar de una cosa a la otra. El dibujo paso a paso hace que ese proceso sea más claro.",
        body: [
          {
            h: "No empezar por toda la imagen",
            p: [
              "Pedirle a un principiante que copie directamente una ilustración completa puede resultar difícil. Hay muchas partes que observar al mismo tiempo.",
              "Con una secuencia paso a paso, la tarea cambia.",
              "El niño no tiene que dibujarlo todo de una vez. Solo tiene que concentrarse en lo que sigue.",
            ],
          },
          {
            h: "Construir el dibujo poco a poco",
            p: [
              "El método paso a paso permite observar cómo se va formando una imagen.",
              "El niño añade una parte. Después otra. Y continúa hasta que las diferentes líneas forman el dibujo completo.",
              "Cómo Dibujar Todo fue creado para pequeños artistas principiantes y utiliza guías paso a paso sencillas y claras.",
            ],
          },
          {
            h: "Dejar que el niño elija",
            p: [
              "Aprender a dibujar no significa que todos los niños tengan que trabajar con el mismo tema.",
              "Poder elegir también forma parte de la experiencia.",
              "El libro contiene 111 dibujos diferentes, entre ellos animales, flores, comida, regalos y otros temas.",
              "El niño puede comenzar con el dibujo que más le interese.",
            ],
          },
          {
            h: "Practicar el mismo dibujo",
            p: [
              "Ver cómo se hace un dibujo y hacerlo uno mismo son cosas diferentes. Por eso es importante tener la oportunidad de practicar.",
              "El libro ofrece dos tipos de práctica para cada dibujo y espacio para que los niños trabajen en sus propias imágenes.",
              "También pueden regresar más adelante y volver a intentar un dibujo que ya hicieron.",
            ],
          },
          {
            h: "No todos los dibujos tienen que quedar iguales",
            p: [
              "El ejemplo sirve como guía. No significa que el resultado de cada niño tenga que ser idéntico.",
              "Después de completar la estructura básica, puede elegir colores y hacer su propia versión del dibujo.",
            ],
          },
          {
            h: "Empezar de una manera sencilla",
            p: [
              "Aprender a dibujar no tiene que comenzar con técnicas complicadas.",
              "Elige una imagen. Sigue el primer paso. Después el siguiente. Completa el dibujo. Practícalo otra vez.",
              "Y cuando quieras continuar, elige otra de las 111 cosas que puedes aprender a dibujar.",
            ],
          },
        ],
        listTitle: "Qué hay en el libro",
        list: [
          "111 dibujos paso a paso en siete temas: animales, flores, naturaleza, alimentos, regalos, ropa y más",
          "Dos tipos de práctica para cada dibujo: un contorno de puntos para repasar y espacio libre para dibujar el propio",
          "La línea negra muestra el paso actual, la gris lo que ya está dibujado",
          "Los dibujos terminados se pueden colorear",
          "104 páginas, a partir de 5 años",
        ],
        faq: [
          {
            q: "¿Cómo enseñar a dibujar paso a paso a un niño desde cero?",
            a: "Empieza con una imagen sencilla y deja que el niño siga una etapa a la vez. Así no tiene que intentar reproducir todo el dibujo terminado de una sola vez.",
          },
          {
            q: "¿Cómo ayudar a un niño a aprender a dibujar sin frustrarse?",
            a: "Es mejor comenzar con dibujos accesibles y concentrarse en un paso a la vez, sin exigir que el resultado sea perfecto. También puede volver a practicar el mismo dibujo cuando quiera.",
          },
          {
            q: "¿El dibujo paso a paso sirve para niños que nunca han dibujado?",
            a: "Sí. Les ofrece un punto de partida claro y les muestra qué añadir después. Cómo Dibujar Todo utiliza instrucciones sencillas y claras pensadas para pequeños artistas principiantes.",
          },
          {
            q: "¿Por qué es importante practicar cuando un niño aprende a dibujar?",
            a: "Porque mirar un ejemplo y hacerlo uno mismo son experiencias diferentes. El libro ofrece dos tipos de práctica para cada dibujo y espacio para que el niño trabaje en sus propias imágenes.",
          },
          {
            q: "¿El dibujo del niño tiene que quedar exactamente igual al ejemplo?",
            a: "No. El ejemplo sirve como guía para entender cómo construir la imagen. Después, el niño puede hacer su propia versión y elegir cómo colorear el dibujo terminado.",
          },
        ],
        ctaTitle: "Pruébalo antes de comprar",
        ctaLead: "Diez páginas del libro se pueden imprimir gratis, sin registro y sin correo: los pasos arriba, el repaso y la práctica abajo. Si le funcionan a tu hijo, en el libro hay 111.",
      },
    },
  },
];

export function drawingArticlesForLang(lang: UiLang): DrawingArticle[] {
  return drawingArticles.filter((a) => a.slug[lang] && a.copy[lang]);
}

/** Статьи об одной книге. bookId можно передать с языком издания. */
export function drawingArticlesForBook(bookId: string, lang: UiLang): DrawingArticle[] {
  const base = bookId.replace(/-(en|es|ru)$/, "");
  return drawingArticlesForLang(lang).filter((a) => (a.book ?? "how-to-draw-111") === base);
}

export function drawingArticleBySlug(
  lang: UiLang,
  slug: string,
): DrawingArticle | undefined {
  return drawingArticles.find((a) => a.slug[lang] === slug);
}

export function relatedDrawingArticles(
  a: DrawingArticle,
  lang: UiLang,
): DrawingArticle[] {
  return a.related
    .map((id) => drawingArticles.find((x) => x.id === id))
    .filter((x): x is DrawingArticle => !!x && !!x.slug[lang] && !!x.copy[lang]);
}
