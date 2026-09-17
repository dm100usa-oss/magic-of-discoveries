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
  Record<UiLang, { title: string; lead: string; seoTitle: string; seoDescription: string }>
> = {
  en: {
    title: "How to teach drawing",
    lead:
      "Five practical guides for parents and teachers: what changes between ages five and ten, what step-by-step drawing actually is, and how one book can cover a school year.",
    seoTitle: "How to Teach a Child to Draw: Guides by Age",
    seoDescription:
      "Practical guides on teaching drawing to children ages 5 to 10: simple shapes, tracing, independent practice, and step-by-step activities for home and the classroom.",
  },
  es: {
    title: "Cómo enseñar a dibujar",
    lead:
      "Cinco guías prácticas para familias y maestros: qué cambia entre los cinco y los diez años, qué es realmente el dibujo paso a paso y cómo un libro puede cubrir todo el año escolar.",
    seoTitle: "Cómo enseñar a dibujar a un niño: guías por edades",
    seoDescription:
      "Guías prácticas para enseñar a dibujar a niños de 5 a 10 años: formas sencillas, repaso punteado, práctica independiente y actividades paso a paso para casa y para clase.",
  },
  ru: {
    title: "Как научить рисовать",
    lead:
      "Пять практических статей для родителей и учителей: что меняется между пятью и десятью годами, что такое пошаговое рисование и как одна книга закрывает учебный год.",
    seoTitle: "Как научить ребенка рисовать: статьи по возрастам",
    seoDescription:
      "Как учить рисованию детей 5-10 лет: простые формы, обводка по пунктиру, самостоятельная практика и пошаговые задания для дома и для занятий в классе.",
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
];

export function drawingArticlesForLang(lang: UiLang): DrawingArticle[] {
  return drawingArticles.filter((a) => a.slug[lang] && a.copy[lang]);
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
