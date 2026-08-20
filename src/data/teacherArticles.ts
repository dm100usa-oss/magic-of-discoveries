// Статьи раздела для учителей.
//
// Три статьи, по одной на каждую группу запросов, которую не закрывает
// главная страница раздела:
//   1. рисование вместе с письмом (draw and write),
//   2. как встроить в день класса (morning work, early finishers, sub plans),
//   3. навыки и особые случаи (мелкая моторика, ESL, особое образование, дом).
//
// Правило то же, что и на главной странице раздела: ничего, чего нельзя
// проверить, открыв книгу. Все числа взяты из готового PDF: 58 страниц,
// 55 заданий, восемь тем, шесть шагов построения на листе.
//
// Каждая статья устроена одинаково: прямой ответ первым абзацем, затем
// объяснение, затем короткий список, затем вопросы с ответами. Первый
// абзац и вопросы это то, что нейросеть берет в свой ответ целиком.

import type { UiLang } from "./books";

export interface TeacherArticleCopy {
  title: string;
  lead: string;
  /** Прямой ответ одним абзацем. Первое, что читает и человек, и машина. */
  answer: string;
  body: { h: string; p: string[] }[];
  /** Короткий список. Проверяемые признаки, не реклама. */
  listTitle: string;
  list: string[];
  faq: { q: string; a: string }[];
  /** Подводка к двум карточкам в конце. */
  ctaTitle: string;
  ctaLead: string;
}

export interface TeacherArticle {
  id: string;
  slug: Partial<Record<UiLang, string>>;
  /** Соседние статьи. Читатель идет дальше по теме, а поисковик видит
      связный раздел, а не три отдельные страницы. */
  related: string[];
  copy: Partial<Record<UiLang, TeacherArticleCopy>>;
}

/** Подписи вокруг текста статьи. Держим здесь, чтобы не трогать общий
    словарь сайта: они нужны только этим трем страницам. */
export const articleUi: Partial<
  Record<UiLang, { faq: string; related: string; back: string }>
> = {
  en: {
    faq: "Frequently asked questions",
    related: "Read next",
    back: "Back to directed drawing for K-2",
  },
  es: {
    faq: "Preguntas frecuentes",
    related: "Seguir leyendo",
    back: "Volver a dibujo dirigido para K-2",
  },
};

export const teacherArticles: TeacherArticle[] = [
  /* ================================================================
     1. Рисование вместе с письмом
     ================================================================ */
  {
    id: "draw-and-write",
    slug: {
      en: "directed-drawing-and-writing-k-2",
      es: "dibujo-dirigido-y-escritura-k-2",
    },
    related: ["classroom-routines", "skills-and-special-cases"],
    copy: {
      en: {
        title: "Directed drawing and writing for K-2",
        lead: "Why the drawing and the word belong on the same sheet, and what changes when they do.",

        answer:
          "Directed drawing and writing is a draw and write routine for grades K-2, ages 5 to 8, in which a student builds a picture from simple shapes by following a step by step visual sequence, traces the finished outline, draws the subject independently, and then traces and writes the matching word on primary ruled lines. Drawing and handwriting happen on one page, in that order, so the word a child writes names the picture the child has just drawn.",

        body: [
          {
            h: "Why the order matters",
            p: [
              "A blank page asks a young student three questions at once: what to draw, where to start, and how big to make it. Most children answer the first two badly and give up on the third. A visual sequence removes all three questions. The student is not inventing, the student is following, and following is a skill that can be practiced on Monday and used on Friday.",
              "Tracing sits in the middle on purpose. It is the bridge between copying a model and working without one. The hand repeats a movement it has just seen, then repeats it again with nothing to lean on. Handwriting instruction has used the same order for a century: trace the letter, then write it. Here the drawing follows that order first, and the word follows the drawing.",
            ],
          },
          {
            h: "What the writing line is doing there",
            p: [
              "A word written under a drawing is not decoration and it is not a spelling test. It is the moment the picture becomes language. The student has spent four or five minutes looking closely at a lion, so the letters L, i, o, n are attached to something specific rather than to a flashcard.",
              "The lines are primary ruled, the three line format used in most K-2 classrooms, with a dashed midline. The word is traced first and written second, which means a kindergarten student who cannot yet form letters from memory still finishes the page, and a second grader who can writes it twice without being held back.",
            ],
          },
          {
            h: "Where this fits in a literacy block",
            p: [
              "These pages are used in writing centers more often than at an art table, and that is the point. The page produces one drawing, one traced word, and one written word, which is enough to display, enough to send home, and short enough that it does not eat the block.",
              "Teachers who want more writing extend the page rather than replace it: the student adds a sentence about the drawing on the back, or the class writes the same word on a chart. The printed page does not ask for that, and does not prevent it.",
            ],
          },
        ],

        listTitle: "What one page contains",
        list: [
          "Six numbered steps that build the subject from circles, curves and straight lines",
          "A dashed outline of the finished subject to trace",
          "An open box to draw the subject independently and color it",
          "The matching word on primary ruled lines, traced once and written once",
          "Open space around the drawing for students who finish early",
        ],

        faq: [
          {
            q: "What is directed drawing and writing?",
            a: "It is a routine that pairs step by step drawing with handwriting practice on a single sheet. The student follows a visual sequence to draw a subject, traces the outline, draws it independently, then traces and writes the word that names it on primary ruled lines. It is used in grades K-2 for fine motor practice, letter formation and vocabulary at the same time.",
          },
          {
            q: "Is this handwriting practice or art?",
            a: "Both, in that order. The drawing comes first and takes most of the page, the writing closes it. Teachers usually count it as literacy work rather than art, because the page ends in a written word on primary ruled lines.",
          },
          {
            q: "Can kindergarten students write the word?",
            a: "Yes, because the word is traced before it is written. A student who cannot yet form letters from memory traces the dashed word and still finishes the page. Second graders write it independently and often add a sentence of their own.",
          },
          {
            q: "Do students need to be able to draw already?",
            a: "No. Every subject is broken into circles, curves and straight lines across six steps, and the fourth stage still shows the finished outline to trace. A student who does not consider themselves good at drawing finishes with a drawing that looks like the model.",
          },
          {
            q: "How long does one page take?",
            a: "It depends on the grade and on whether students color. As a warm-up it stays short. With coloring and a background added around the drawing it fills a longer independent block.",
          },
        ],

        ctaTitle: "Try the format",
        ctaLead:
          "One free activity from each theme, or the full year-long collection. Both on Teachers Pay Teachers.",
      },

      es: {
        title: "Dibujo dirigido y escritura para K-2",
        lead: "Por qué el dibujo y la palabra van en la misma hoja, y qué cambia cuando van juntos.",

        answer:
          "El dibujo dirigido con escritura es una rutina de dibujar y escribir para los grados K-2, de 5 a 8 años, en la que el alumno construye un dibujo a partir de formas sencillas siguiendo una secuencia visual paso a paso, repasa el contorno terminado, dibuja la figura por su cuenta y después repasa y escribe la palabra correspondiente sobre pauta de tres líneas. El dibujo y la escritura ocurren en una sola hoja y en ese orden, de modo que la palabra que el niño escribe nombra el dibujo que acaba de hacer.",

        body: [
          {
            h: "Por qué importa el orden",
            p: [
              "La hoja en blanco le hace al alumno pequeño tres preguntas a la vez: qué dibujar, por dónde empezar y de qué tamaño. La mayoría responde mal las dos primeras y abandona en la tercera. Una secuencia visual elimina las tres. El alumno no inventa, sigue, y seguir instrucciones es una destreza que se practica el lunes y sirve el viernes.",
              "Repasar el contorno está en medio a propósito. Es el puente entre copiar un modelo y trabajar sin él. La mano repite un movimiento que acaba de ver y después lo repite sin apoyo. La enseñanza de la escritura lleva un siglo usando ese mismo orden: repasar la letra y después escribirla. Aquí el dibujo sigue ese orden primero, y la palabra sigue al dibujo.",
            ],
          },
          {
            h: "Qué hace ahí la pauta de escritura",
            p: [
              "Una palabra escrita debajo de un dibujo no es adorno ni es un examen de ortografía. Es el momento en que la imagen se vuelve lenguaje. El alumno ha pasado cuatro o cinco minutos mirando de cerca un león, así que las letras quedan unidas a algo concreto y no a una tarjeta de vocabulario.",
              "La pauta es de tres líneas, el formato habitual en las aulas de K-2, con la línea central discontinua. La palabra se repasa primero y se escribe después, de modo que un alumno de kínder que todavía no forma las letras de memoria termina la hoja igualmente, y uno de segundo que sí puede la escribe dos veces sin quedarse esperando.",
            ],
          },
          {
            h: "Dónde encaja dentro del bloque de lectoescritura",
            p: [
              "Estas hojas se usan más en los centros de escritura que en la mesa de arte, y esa es la idea. La hoja produce un dibujo, una palabra repasada y una palabra escrita: suficiente para exponer, suficiente para enviar a casa, y lo bastante corto para no comerse el bloque.",
              "El maestro que quiere más escritura amplía la hoja en vez de sustituirla: el alumno añade una frase sobre el dibujo al dorso, o la clase escribe la misma palabra en un cartel. La hoja impresa no lo pide y tampoco lo impide.",
            ],
          },
        ],

        listTitle: "Qué contiene una hoja",
        list: [
          "Seis pasos numerados que construyen la figura con círculos, curvas y líneas rectas",
          "El contorno punteado de la figura terminada para repasar",
          "Un recuadro libre para dibujar la figura por su cuenta y colorearla",
          "La palabra correspondiente sobre pauta de tres líneas, repasada una vez y escrita una vez",
          "Espacio libre alrededor del dibujo para quien termina antes",
        ],

        faq: [
          {
            q: "¿Qué es el dibujo dirigido con escritura?",
            a: "Es una rutina que une el dibujo paso a paso con la práctica de la escritura en una sola hoja. El alumno sigue una secuencia visual para dibujar una figura, repasa el contorno, la dibuja por su cuenta y después repasa y escribe la palabra que la nombra sobre pauta de tres líneas. Se usa en los grados K-2 para trabajar a la vez motricidad fina, formación de letras y vocabulario.",
          },
          {
            q: "¿Esto es escritura o es arte?",
            a: "Las dos cosas, en ese orden. El dibujo va primero y ocupa la mayor parte de la hoja, la escritura la cierra. Los maestros suelen contarla como trabajo de lectoescritura y no como arte, porque la hoja termina en una palabra escrita sobre pauta.",
          },
          {
            q: "¿Un alumno de kínder puede escribir la palabra?",
            a: "Sí, porque la palabra se repasa antes de escribirse. El alumno que todavía no forma las letras de memoria repasa la palabra punteada y termina la hoja igualmente. En segundo grado la escriben solos y muchas veces añaden una frase propia.",
          },
          {
            q: "¿Hace falta que ya sepan dibujar?",
            a: "No. Cada figura está descompuesta en círculos, curvas y líneas rectas a lo largo de seis pasos, y la cuarta etapa todavía muestra el contorno terminado para repasar. Un alumno que no se considera bueno dibujando termina con un dibujo parecido al modelo.",
          },
          {
            q: "¿Cuánto dura una hoja?",
            a: "Depende del grado y de si colorean. Como actividad de entrada es corta. Con color y con un fondo añadido alrededor del dibujo llena un bloque de trabajo independiente más largo.",
          },
        ],

        ctaTitle: "Pruebe el formato",
        ctaLead:
          "Una actividad gratuita de cada tema, o la colección completa para todo el año. Las dos en Teachers Pay Teachers.",
      },
    },
  },

  /* ================================================================
     2. Как встроить в день класса
     ================================================================ */
  {
    id: "classroom-routines",
    slug: {
      en: "no-prep-directed-drawing-morning-work-early-finishers",
      es: "dibujo-dirigido-sin-preparacion-rutinas-de-clase",
    },
    related: ["draw-and-write", "skills-and-special-cases"],
    copy: {
      en: {
        title: "No prep directed drawing for morning work and early finishers",
        lead: "Five places a single printed page earns its keep, and what makes a page work without an adult standing over it.",

        answer:
          "A no prep directed drawing page works as morning work, as an early finisher activity, in writing centers, in learning centers and in sub plans, for grades K-2. There is nothing to cut, glue or assemble: choose an activity, print it and hand it out. Because all four stages are printed on the sheet, a student can start and finish without an adult explaining anything once the routine is familiar.",

        body: [
          {
            h: "Morning work",
            p: [
              "Morning work has to survive the worst conditions in the school day. Students arrive at different times, half of them are still unpacking, and the teacher is taking attendance and talking to a parent at the door. Anything that needs an explanation fails.",
              "A page whose instructions are pictures does not need one. A student who arrives at 8:05 and a student who arrives at 8:20 both start at step one and both produce a finished page. At home the same slot is morning basket or morning time, and the page behaves the same way.",
            ],
          },
          {
            h: "Early finishers",
            p: [
              "The problem with early finishers is not filling time, it is filling it without creating a second lesson to manage. A page that ends in a hard stop sends the student back with nothing to do two minutes later.",
              "Open space is left around each drawing on purpose. A student who finishes the four stages adds trees, grass, rocks or a sun and turns one figure into a scene. The small themed illustrations and the lettering on the page can be colored too. The work expands to fit the time available instead of running out.",
            ],
          },
          {
            h: "Writing centers and learning centers",
            p: [
              "In a center the page is the whole station: no cards to sort, no pieces to lose, no laminating. One printed sheet and a pencil. Because the page ends in a written word, it counts as literacy work rather than as something to keep hands busy.",
              "Teachers running a rotation usually print one theme for the week so the center has a subject rather than a pile of unrelated animals.",
            ],
          },
          {
            h: "Sub plans",
            p: [
              "Sub plans are written for someone who does not know the class. A page that explains itself in pictures is the safest thing to leave: the substitute hands it out, and the instructions are on the sheet rather than in a paragraph the substitute has to read aloud correctly.",
              "The illustrated table of contents makes this easier. Every drawing in the book is shown with its page number, so a plan can say print page 24 rather than describe which animal to look for.",
            ],
          },
        ],

        listTitle: "What makes a page work unsupervised",
        list: [
          "Instructions are pictures, not sentences a student has to decode first",
          "The same four stages in the same order on every page, so the routine is learned once",
          "Nothing to cut, glue, laminate or assemble",
          "US Letter, black and white, prints on a school copier",
          "Room around the drawing so finishing early does not mean stopping",
        ],

        faq: [
          {
            q: "What is a no prep activity?",
            a: "A no prep activity is one that goes from printer to student with nothing in between. These pages need no cutting, glue, laminating or assembly, and no materials beyond a pencil. Coloring is optional.",
          },
          {
            q: "Are these good for morning work in kindergarten?",
            a: "Yes. Morning work has to be startable by a student arriving alone, and the instructions on these pages are pictures rather than sentences. Students who arrive at different times all begin at step one and all finish a page.",
          },
          {
            q: "What do early finishers do when they are done?",
            a: "Open space is left around the finished drawing on purpose, so a student can add a background of trees, grass, rocks or a sun and keep working independently. The themed illustrations and the lettering can also be colored. Nothing needs to be handed out a second time.",
          },
          {
            q: "Can I leave these for a substitute?",
            a: "Yes, this is one of the common uses. The instructions are on the sheet, so the substitute only has to hand out the page. The illustrated table of contents lets a plan name a page number instead of describing the activity.",
          },
          {
            q: "How many pages do I need for a year?",
            a: "The full book holds 55 activities. Used once a week, that covers a school year with pages left over. Teachers who use them more often, as morning work several days a week, usually pair them with the themes they are already teaching.",
          },
        ],

        ctaTitle: "Print one and see",
        ctaLead:
          "The free sample is eight full activities, one from each theme. The full collection is 55 activities and a teacher page.",
      },

      es: {
        title: "Dibujo dirigido sin preparación para la rutina de la mañana y para quien termina antes",
        lead: "Cinco momentos en los que una sola hoja impresa se gana su sitio, y qué hace que funcione sin un adulto al lado.",

        answer:
          "Una hoja de dibujo dirigido sin preparación sirve para la rutina de la mañana, para los alumnos que terminan antes, para los centros de escritura, para los centros de aprendizaje y para las clases con sustituto, en los grados K-2. No hay nada que recortar, pegar ni montar: elija la actividad, imprímala y repártala. Como las cuatro etapas están impresas en la hoja, el alumno empieza y termina sin que ningún adulto tenga que explicar nada una vez conocida la rutina.",

        body: [
          {
            h: "La rutina de la mañana",
            p: [
              "El trabajo de la mañana tiene que sobrevivir a las peores condiciones del día. Los alumnos llegan a distintas horas, la mitad todavía está guardando la mochila, y el maestro pasa lista y habla con un padre en la puerta. Cualquier cosa que necesite explicación fracasa.",
              "Una hoja cuyas instrucciones son imágenes no la necesita. El que llega a las 8:05 y el que llega a las 8:20 empiezan los dos en el paso uno y los dos terminan la hoja. En casa ese mismo momento es la rutina de la mañana, y la hoja se comporta igual.",
            ],
          },
          {
            h: "Los que terminan antes",
            p: [
              "El problema con quien termina antes no es llenar el tiempo, es llenarlo sin crear una segunda clase que atender. Una hoja que acaba en seco devuelve al alumno sin nada que hacer dos minutos después.",
              "Alrededor de cada dibujo se deja espacio libre a propósito. El alumno que termina las cuatro etapas añade árboles, hierba, piedras o un sol y convierte una figura en una escena. Las pequeñas ilustraciones del tema y las letras de la hoja también se pueden colorear. El trabajo se estira hasta el tiempo disponible en vez de agotarse.",
            ],
          },
          {
            h: "Centros de escritura y de aprendizaje",
            p: [
              "En un centro la hoja es la estación entera: no hay tarjetas que ordenar, ni piezas que perder, ni nada que plastificar. Una hoja impresa y un lápiz. Como la hoja termina en una palabra escrita, cuenta como trabajo de lectoescritura y no como algo para tener las manos ocupadas.",
              "Quien organiza rotaciones suele imprimir un tema para toda la semana, así el centro tiene un asunto y no un montón de animales sin relación.",
            ],
          },
          {
            h: "Clases con sustituto",
            p: [
              "Los planes para el sustituto se escriben para alguien que no conoce a la clase. Una hoja que se explica sola con imágenes es lo más seguro que se puede dejar: el sustituto la reparte, y las instrucciones están en la hoja y no en un párrafo que tenga que leer en voz alta correctamente.",
              "El índice ilustrado lo facilita. Todos los dibujos del libro aparecen con su número de página, así que el plan puede decir imprima la página 24 en lugar de describir qué animal buscar.",
            ],
          },
        ],

        listTitle: "Qué hace que una hoja funcione sin supervisión",
        list: [
          "Las instrucciones son imágenes, no frases que el alumno tenga que descifrar primero",
          "Las mismas cuatro etapas en el mismo orden en todas las hojas: la rutina se aprende una vez",
          "Nada que recortar, pegar, plastificar ni montar",
          "Tamaño carta, blanco y negro, se imprime en la copiadora de la escuela",
          "Espacio alrededor del dibujo, para que terminar antes no signifique parar",
        ],

        faq: [
          {
            q: "¿Qué es una actividad sin preparación?",
            a: "Es la que pasa de la impresora al alumno sin nada en medio. Estas hojas no exigen recortar, pegar, plastificar ni montar, y no hacen falta más materiales que un lápiz. Colorear es opcional.",
          },
          {
            q: "¿Sirven para la rutina de la mañana en kínder?",
            a: "Sí. El trabajo de la mañana tiene que poder empezarlo un alumno que llega solo, y aquí las instrucciones son imágenes y no frases. Los que llegan a distintas horas empiezan todos en el paso uno y todos terminan una hoja.",
          },
          {
            q: "¿Qué hacen los que terminan antes?",
            a: "Alrededor del dibujo terminado se deja espacio libre a propósito, así el alumno añade un fondo de árboles, hierba, piedras o un sol y sigue trabajando por su cuenta. Las ilustraciones del tema y las letras también se pueden colorear. No hay que repartir nada por segunda vez.",
          },
          {
            q: "¿Puedo dejarlas para un sustituto?",
            a: "Sí, es uno de los usos habituales. Las instrucciones están en la hoja, así que el sustituto solo tiene que repartirla. El índice ilustrado permite indicar un número de página en lugar de describir la actividad.",
          },
          {
            q: "¿Cuántas hojas hacen falta para un curso?",
            a: "El libro completo reúne 55 actividades. A razón de una por semana cubre el curso escolar y aún sobran páginas. Quien las usa más a menudo, varios días por semana, suele combinarlas con los temas que ya está trabajando.",
          },
        ],

        ctaTitle: "Imprima una y compruébelo",
        ctaLead:
          "La muestra gratuita son ocho actividades completas, una de cada tema. La colección completa son 55 actividades y una página para el maestro.",
      },
    },
  },

  /* ================================================================
     3. Навыки и особые случаи
     ================================================================ */
  {
    id: "skills-and-special-cases",
    slug: {
      en: "directed-drawing-fine-motor-following-directions-esl",
      es: "dibujo-dirigido-motricidad-fina-instrucciones-esl",
    },
    related: ["draw-and-write", "classroom-routines"],
    copy: {
      en: {
        title: "Fine motor skills, following directions, ESL and special education",
        lead: "What a directed drawing page actually practices, and why it holds up with students who need a predictable routine.",

        answer:
          "Directed drawing practices fine motor control, spatial awareness on the page, following directions, letter formation and vocabulary at the same time, for students in grades K-2. Because the instructions are pictures rather than sentences, the same page works for English learners and newcomers, and because every page follows the same four stages in the same order, it holds up with students who need a predictable routine.",

        body: [
          {
            h: "Fine motor control",
            p: [
              "Fine motor work is not one skill, it is several. Holding a pencil at a workable angle, keeping pressure steady, stopping a line where it should stop, and drawing a curve without rotating the whole arm. Breaking a subject into circles, curves and straight lines gives a student short, repeated attempts at each of those instead of one long attempt at everything.",
              "Tracing a dashed outline adds something a free drawing cannot: the hand practices a movement that is already correct. That is the same reason handwriting programs trace letters before writing them.",
            ],
          },
          {
            h: "Spatial awareness on the page",
            p: [
              "Deciding where a drawing goes is a real difficulty for five and six year olds, and it is invisible until you see the drawing crammed into a corner. Each page gives a defined box for the independent drawing, which sets the size and the position without an adult saying anything.",
              "That skill transfers directly. A student who can place a lion inside a box is closer to placing letters on a line.",
            ],
          },
          {
            h: "Following directions",
            p: [
              "Following directions is on almost every K-2 report card and is hard to practice on purpose. A six step sequence is a small, self-checking exercise in it: a student who skips step three sees it, because the drawing stops matching the model.",
              "The feedback comes from the page rather than from an adult, which is why the activity survives in a class of twenty.",
            ],
          },
          {
            h: "English learners and newcomers",
            p: [
              "A newcomer who cannot yet follow spoken instructions can still complete a page, because the instructions are drawings. That matters in the first weeks, when the alternative is sitting through work that cannot be started.",
              "Each page carries exactly one word, attached to a picture the student has just spent minutes on. The same collection is published with Spanish vocabulary on every page, so a dual language teacher can run the same routine in both languages, and a newcomer can meet the word in the language they already have.",
            ],
          },
          {
            h: "Special education and homeschool",
            p: [
              "Teachers use these pages with students who need a predictable routine and a clear model. Every page repeats the same four stages in the same order, so the format is learned once and never re-explained. A student who is not ready to draw independently can stay on the tracing stage as long as needed, and nothing on the page is timed.",
              "At home the same properties matter for a different reason: a parent teaching two children of different ages can hand the same page to both and let each work at the stage they are ready for, ages 5 to 8.",
            ],
          },
        ],

        listTitle: "What one page practices",
        list: [
          "Pencil control and hand-eye coordination",
          "Spatial awareness: placing a drawing inside a defined space",
          "Following directions and a visual sequence, with feedback from the page itself",
          "Letter formation on primary ruled lines, traced then written",
          "One vocabulary word, attached to an image rather than to a list",
        ],

        faq: [
          {
            q: "How does directed drawing help fine motor skills?",
            a: "It breaks a complex figure into circles, curves and straight lines, so a student makes many short controlled strokes instead of one long uncertain one. Tracing a dashed outline then rehearses a movement that is already correct, which is the same principle handwriting instruction uses when it traces letters before writing them.",
          },
          {
            q: "Does this work for special education?",
            a: "Teachers use these pages with students who need a predictable routine and a clear model. The four stages repeat in the same order on every page, the subject is broken into simple shapes, and a student who is not ready to draw independently can stay on the tracing stage. Nothing on the page is timed.",
          },
          {
            q: "Does this work for ESL and newcomer students?",
            a: "Yes. The instructions on the page are pictures, so a student who cannot yet follow spoken directions can still start and finish. Each page carries one word tied to the image just drawn, and the same activities are published with Spanish vocabulary for dual language classrooms.",
          },
          {
            q: "Is it good for practicing following directions?",
            a: "Yes, and it is self-checking. A six step sequence shows the student immediately when a step has been skipped, because the drawing stops matching the model. The correction comes from the page rather than from an adult.",
          },
          {
            q: "Can I use this for homeschool?",
            a: "Yes. Nothing about the format assumes a classroom. Children ages 5 to 8 work through a page alone once the routine is familiar, and the full book holds 55 activities, which is one a week for a full school year with pages left over.",
          },
        ],

        ctaTitle: "See a real page",
        ctaLead:
          "The free sample is eight complete activities with nothing shortened and no watermarks.",
      },

      es: {
        title: "Motricidad fina, seguir instrucciones, ESL y educación especial",
        lead: "Qué practica de verdad una hoja de dibujo dirigido, y por qué funciona con alumnos que necesitan una rutina previsible.",

        answer:
          "El dibujo dirigido practica a la vez el control del lápiz, la orientación en la hoja, el seguir instrucciones, la formación de letras y el vocabulario, en alumnos de los grados K-2. Como las instrucciones son imágenes y no frases, la misma hoja sirve para alumnos que aprenden el idioma y para recién llegados, y como todas las hojas siguen las mismas cuatro etapas en el mismo orden, funciona con alumnos que necesitan una rutina previsible.",

        body: [
          {
            h: "Control del lápiz",
            p: [
              "La motricidad fina no es una sola destreza, son varias. Sujetar el lápiz en un ángulo utilizable, mantener la presión, detener una línea donde debe detenerse y trazar una curva sin girar todo el brazo. Descomponer la figura en círculos, curvas y líneas rectas da intentos cortos y repetidos de cada una de esas cosas en lugar de un intento largo de todas juntas.",
              "Repasar un contorno punteado añade algo que el dibujo libre no puede dar: la mano practica un movimiento que ya es correcto. Es la misma razón por la que los programas de escritura repasan las letras antes de escribirlas.",
            ],
          },
          {
            h: "Orientación en la hoja",
            p: [
              "Decidir dónde va el dibujo es una dificultad real a los cinco y seis años, y no se ve hasta que aparece el dibujo apretado en una esquina. Cada hoja da un recuadro definido para el dibujo independiente, que fija el tamaño y la posición sin que un adulto diga nada.",
              "Esa destreza se transfiere directamente. El alumno que sabe colocar un león dentro de un recuadro está más cerca de colocar las letras sobre la línea.",
            ],
          },
          {
            h: "Seguir instrucciones",
            p: [
              "Seguir instrucciones aparece en casi todos los boletines de K-2 y es difícil de practicar a propósito. Una secuencia de seis pasos es un ejercicio pequeño y que se corrige solo: el alumno que se salta el paso tres lo ve, porque el dibujo deja de parecerse al modelo.",
              "La corrección viene de la hoja y no de un adulto, y por eso la actividad sobrevive en un aula de veinte.",
            ],
          },
          {
            h: "Alumnos que aprenden el idioma",
            p: [
              "Un alumno recién llegado que todavía no sigue instrucciones habladas puede terminar la hoja igualmente, porque las instrucciones son dibujos. Eso importa en las primeras semanas, cuando la alternativa es estar sentado ante un trabajo que no puede ni empezar.",
              "Cada hoja lleva exactamente una palabra, unida a una imagen a la que el alumno acaba de dedicar varios minutos. La misma colección está publicada con vocabulario en inglés en cada página, de modo que un maestro bilingüe puede seguir la misma rutina en los dos idiomas.",
            ],
          },
          {
            h: "Educación especial y educación en casa",
            p: [
              "Los maestros usan estas hojas con alumnos que necesitan una rutina previsible y un modelo claro. Todas las hojas repiten las mismas cuatro etapas en el mismo orden, así que el formato se aprende una vez y no hay que volver a explicarlo. El alumno que todavía no dibuja por su cuenta puede quedarse en la etapa de repasar el tiempo que haga falta, y nada en la hoja está cronometrado.",
              "En casa esas mismas propiedades importan por otro motivo: un padre que enseña a dos hijos de edades distintas puede darles la misma hoja y dejar que cada uno trabaje en la etapa que le corresponde, de 5 a 8 años.",
            ],
          },
        ],

        listTitle: "Qué practica una hoja",
        list: [
          "Control del lápiz y coordinación entre la mano y la vista",
          "Orientación en la hoja: colocar el dibujo dentro de un espacio definido",
          "Seguir instrucciones y una secuencia visual, con la corrección en la propia hoja",
          "Formación de letras sobre pauta de tres líneas, primero repasadas y después escritas",
          "Una palabra de vocabulario, unida a una imagen y no a una lista",
        ],

        faq: [
          {
            q: "¿Cómo ayuda el dibujo dirigido a la motricidad fina?",
            a: "Descompone una figura compleja en círculos, curvas y líneas rectas, de modo que el alumno hace muchos trazos cortos y controlados en lugar de uno largo e inseguro. Repasar el contorno punteado ensaya además un movimiento que ya es correcto, el mismo principio que usa la enseñanza de la escritura cuando repasa las letras antes de escribirlas.",
          },
          {
            q: "¿Funciona en educación especial?",
            a: "Los maestros usan estas hojas con alumnos que necesitan una rutina previsible y un modelo claro. Las cuatro etapas se repiten en el mismo orden en todas las hojas, la figura está descompuesta en formas sencillas y el alumno que todavía no dibuja solo puede quedarse en la etapa de repasar. Nada en la hoja está cronometrado.",
          },
          {
            q: "¿Sirve para alumnos que están aprendiendo el idioma?",
            a: "Sí. Las instrucciones de la hoja son imágenes, así que un alumno que todavía no sigue indicaciones habladas puede empezar y terminar. Cada hoja lleva una palabra unida a la imagen que acaba de dibujar, y las mismas actividades están publicadas con vocabulario en inglés para las aulas bilingües.",
          },
          {
            q: "¿Sirve para practicar el seguir instrucciones?",
            a: "Sí, y se corrige solo. Una secuencia de seis pasos le muestra al alumno enseguida que se ha saltado uno, porque el dibujo deja de parecerse al modelo. La corrección viene de la hoja y no del adulto.",
          },
          {
            q: "¿Puedo usarlo para educar en casa?",
            a: "Sí. El formato no da por supuesta un aula. Los niños de 5 a 8 años resuelven una hoja solos en cuanto conocen la rutina, y el libro completo reúne 55 actividades, una por semana durante todo el curso y aún sobran páginas.",
          },
        ],

        ctaTitle: "Vea una hoja real",
        ctaLead:
          "La muestra gratuita son ocho actividades completas, sin recortes y sin marcas de agua.",
      },
    },
  },
];

export function articlesForLang(lang: UiLang): TeacherArticle[] {
  return teacherArticles.filter((a) => a.slug[lang] && a.copy[lang]);
}

export function articleBySlug(lang: UiLang, slug: string): TeacherArticle | undefined {
  return teacherArticles.find((a) => a.slug[lang] === slug);
}

export function relatedArticles(a: TeacherArticle, lang: UiLang): TeacherArticle[] {
  return a.related
    .map((id) => teacherArticles.find((x) => x.id === id))
    .filter((x): x is TeacherArticle => !!x && !!x.slug[lang] && !!x.copy[lang]);
}
