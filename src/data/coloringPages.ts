// Бесплатные раскраски для печати.
//
// Два вида страниц.
//
// Тема. Внутри набор рисунков, у каждого свой заголовок и своя кнопка.
// Внизу одна книга, из которой взяты рисунки.
//
// Один объект. Ровно один лист, и вся страница про него: лев, единорог,
// машина. Такая страница отвечает на запрос, который человек набирает
// целиком, слово в слово, и потому находится там, где страница темы
// не находится.
//
// Раньше здесь было записано, что отдельных страниц на каждый рисунок
// делать не надо: сотня почти пустых страниц выглядит как штамповка.
// Это остается верным для пустых страниц. Страница одного объекта пустой
// не является: на ней проверяемые цифры книги, честный разбор кому
// подходит и кому нет, полный состав темы, к которой относится рисунок,
// и переход к книге. Таких страниц будет около полутора десятков, а не
// сотня, и каждая делается под конкретный живой запрос.
//
// Почему это работает именно у нас. Библиотеки бесплатных раскрасок
// держат по восемьдесят листов на тему и выигрывают объемом, но у них
// на странице нет ни одной цифры и ни слова о том, какому ребенку лист
// подходит. Наш ход не объем, а проверяемость: настоящая страница
// изданной книги, толщина контура, доля листа, возраст, номер ISBN.

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
  /** Только для страницы одного объекта.
      Честный разбор: кому этот лист подходит, а кому уже нет. Ровно то,
      из чего нейросеть строит осмысленную рекомендацию вместо "подойдет
      всем". У библиотек бесплатных раскрасок такого блока нет ни у кого. */
  /** Заголовок блока. Вопрос, а не утверждение: родитель так и
      спрашивает, и по такому заголовку страницу берут блок быстрого
      ответа Google и нейросети. */
  fitTitle?: string;
  /** Подпись над первым списком. Пусто = списка без подписи. */
  fitYesTitle?: string;
  fitYes?: string[];
  /** Заголовок второго списка. У большинства листов это "может быть
      слишком простым", но у более подробных рисунков наоборот
      "может быть слишком сложным". Пусто = общий из словаря. */
  fitNoTitle?: string;
  fitNo?: string[];
  /** Заголовок и подводка блока с полным составом темы, к которой
      относится этот рисунок. Числа подставляются: {n} сколько в теме,
      {total} сколько в книге. */
  themeTitle?: string;
  themeLead?: string;
  /** Пометка у бесплатного рисунка внутри списка темы. */
  themeFreeMark?: string;
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
  /** Страница про один объект. Внутри ровно один лист, и вся страница
      написана под запрос про него. */
  single?: boolean;
  /** Для страницы одного объекта: к какой теме книги относится рисунок.
      Полный состав темы берется из bookTopics, здесь только ссылка на
      него. Один факт живет в одном месте. */
  themeId?: string;
  copy: Partial<Record<UiLang, ColoringCopy>>;
  groups: SheetGroup[];
}

const S = (id: string, en: string, es: string, ru: string): Sheet => ({
  id,
  name: { en, es, ru },
});

const coloringPagesBase: ColoringPage[] = [
  /* --------------------------------------------------------------
     Страница одного объекта. Образец, по которому дальше делаются
     остальные: собака, кошка, машина, единорог и так далее.

     Целимся не в запрос "раскраска лев", там стоят библиотеки с
     восемьюдесятью листами и чужими персонажами. Целимся в запрос
     родителя малыша: простой лев, толстый контур, для двух лет.
     Такой страницы у библиотек нет ни одной.
     -------------------------------------------------------------- */
  {
    id: "lion-toddler",
    published: "2026-09-07",
    updated: "2026-09-07",
    single: true,
    themeId: "land",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    fromBookIdRu: "first-coloring-book-111-ru",
    slug: {
      en: "lion-coloring-page-for-toddlers",
      es: "dibujo-de-leon-para-colorear-ninos-pequenos",
      ru: "raskraska-lev-dlya-malyshey",
    },
    groups: [
      {
        id: "sheet",
        title: { en: "The page", es: "La lámina", ru: "Лист" },
        sheets: [S("lion", "Lion", "León", "Лев")],
      },
    ],
    copy: {
      en: {
        title:
          "Lion coloring page for toddlers ages 1-3. Free to print, big picture, thick outline",
        lead:
          "One large lion, a thick outline, and the word underneath that can be colored too. A real page from a printed book, free to print in US Letter or A4.",
        body: [
          "This lion is drawn for a child who has just picked up a crayon. The outline measures 2.4 to 4.8 mm, about as thick as the crayon itself, so a stroke that lands slightly outside still reads as part of the lion. The picture fills roughly 70 to 82 percent of the page, and it sits in the center, which works the same for a left-handed and a right-handed child.",
          "There is nothing else on the sheet. No border, no scenery, no small details in the corners. A toddler holds attention for a few minutes, and a page with several things on it usually ends before it starts because there is nowhere obvious to begin.",
          "Under the lion is the word LION in large outline letters. A child can color the letters as well, and hear the word while doing it. That is how first words arrive at this age: with an object in front of the child, not as a lesson.",
          "This is not a drawing made for a website. It is page one of a printed book, 8.5 by 11 inches, ISBN 9781963328271, and you can check everything on this page against the book itself.",
        ],
        howTo: [
          "Two file sizes: US Letter and A4. Pick whichever your printer takes",
          "Thick crayons work best for the youngest hands",
          "For markers, slip a spare sheet underneath",
          "Print it twice and color one together",
        ],
        fitTitle: "Is this page right for your child?",
        fitYesTitle: "It is a good fit if:",
        fitYes: [
          "The child is between one and three, or older and just starting to color",
          "The crayon still goes outside the outline more often than inside",
          "Detailed pages get abandoned after a minute",
          "You want the child to name what is on the page, not just fill it",
        ],
        fitNo: [
          "The child already colors confidently inside simple outlines",
          "They ask for scenes with several things happening",
          "They want to draw the picture themselves rather than fill one in",
        ],
        themeTitle: "The lion is one of {n} land animals in the book",
        themeLead:
          "Only the lion is free here. The rest of the land animals are in the book, which holds {total} drawings in all, each with its word underneath.",
        themeFreeMark: "free on this page",
        pickLead:
          "This page is one of {total}. Same size, same outline weight, same one word underneath, from the first page to the last.",
        pickTitle: "The book this page comes from",
        pickPoints: [
          "111 hand drawn pictures, none of them repeated",
          "One large subject per page, nothing small in the corners",
          "The word under each picture can be colored too, so first words come with it",
          "8.5 x 11 inches, 114 pages, for ages 1 to 3",
          "Five stars from Readers' Favorite, an independent book review site",
        ],
        faq: [
          {
            q: "Is this really free?",
            a: "Yes. No account, no email, no payment. Print as many copies as you want, at home or at a school.",
          },
          {
            q: "Can I use it in my classroom or daycare?",
            a: "Yes, print it and hand it out freely. Please do not resell it or republish the file on another site.",
          },
          {
            q: "Which file do I print, Letter or A4?",
            a: "In the United States and Canada, choose Letter. In Europe and Latin America, choose A4. The drawing is the same, only the sheet size differs.",
          },
          {
            q: "What should my child color it with?",
            a: "Thick crayons are easiest for the youngest hands: they leave a clear mark without much pressure. Colored pencils need a more precise grip, which comes later. Markers give bright color but can soak through ordinary paper, so slip a spare sheet underneath.",
          },
          {
            q: "My child scribbles over the whole lion. Is that a problem?",
            a: "No, that is what this age looks like. At one and two a child makes a mark on purpose and repeats the movement to watch it happen, and the target is the sheet rather than the picture on it. Staying inside the outline comes later, and a thick outline is what makes the difference visible when it does.",
          },
          {
            q: "Are there more free pages?",
            a: "Yes. Ten real pages from the same book are free to print on this site, and the book itself holds 111.",
          },
        ],
      },
      es: {
        title:
          "Dibujo de león para colorear para niños de 1 a 3 años. Gratis para imprimir, dibujo grande y contorno grueso",
        lead:
          "Un solo león grande, un contorno grueso y la palabra debajo, que también se puede colorear. Es una página real de un libro impreso, gratis para imprimir en A4 o Carta.",
        body: [
          "Este león está dibujado para un niño que acaba de coger una cera. El contorno mide entre 2,4 y 4,8 mm, más o menos el grosor de la propia cera, así que un trazo que se salga un poco sigue leyéndose como parte del león. El dibujo ocupa entre el 70 y el 82 % de la página y está centrado, algo que funciona igual para un niño diestro y para uno zurdo.",
          "En la hoja no hay nada más. Ni marco, ni paisaje, ni detalles pequeños en las esquinas. Un niño de esta edad aguanta unos pocos minutos, y una página con varias cosas a la vez suele terminar antes de empezar, porque no hay un sitio claro por donde comenzar.",
          "Debajo del león está la palabra LEÓN en letras grandes de contorno. El niño puede colorear también las letras y oír la palabra mientras lo hace. Así llegan las primeras palabras a esta edad: con el objeto delante, no como una lección.",
          "No es un dibujo hecho para una web. Es una página de un libro impreso, de 21,6 por 27,9 cm, ISBN 9781963328271, y todo lo que dice esta página se puede comprobar en el propio libro.",
        ],
        howTo: [
          "Dos tamaños de archivo: A4 y Carta. Elige el que acepte tu impresora",
          "Las ceras gruesas funcionan mejor en las manos más pequeñas",
          "Si usas rotuladores, pon una hoja debajo",
          "Imprímelo dos veces y coloread uno juntos",
        ],
        fitTitle: "¿Es esta lámina adecuada para tu hijo?",
        fitYesTitle: "Encaja si:",
        fitYes: [
          "El niño tiene entre uno y tres años, o es mayor y empieza ahora a colorear",
          "La cera todavía se sale del contorno más veces de las que se queda dentro",
          "Las láminas con muchos detalles se abandonan al minuto",
          "Quieres que el niño nombre lo que ve, no solo que rellene",
        ],
        fitNo: [
          "El niño ya colorea con seguridad dentro de contornos sencillos",
          "Pide escenas con varias cosas ocurriendo a la vez",
          "Prefiere dibujar él mismo antes que rellenar un dibujo hecho",
        ],
        themeTitle: "El león es uno de los {n} animales terrestres del libro",
        themeLead:
          "Aquí solo el león es gratuito. Los demás animales terrestres están en el libro, que reúne {total} dibujos en total, cada uno con su palabra debajo.",
        themeFreeMark: "gratis en esta página",
        pickLead:
          "Esta lámina es una de {total}. El mismo tamaño, el mismo grosor de contorno y la misma palabra debajo, de la primera página a la última.",
        pickTitle: "El libro del que sale esta página",
        pickPoints: [
          "111 dibujos hechos a mano, ninguno repetido",
          "Un solo objeto grande por página, sin detalles pequeños en las esquinas",
          "La palabra bajo cada dibujo también se colorea, y con ella llegan las primeras palabras",
          "21,6 x 27,9 cm, 114 páginas, para niños de 1 a 3 años",
          "Cinco estrellas de Readers' Favorite, un sitio independiente de reseñas",
        ],
        faq: [
          {
            q: "¿De verdad es gratis?",
            a: "Sí. Sin registro, sin correo, sin pago. Imprime las copias que quieras, en casa o en una escuela.",
          },
          {
            q: "¿Puedo usarla en mi clase o en la guardería?",
            a: "Sí, imprímela y repártela libremente. Por favor, no la revendas ni publiques el archivo en otra web.",
          },
          {
            q: "¿Qué archivo imprimo, Carta o A4?",
            a: "En España y en Latinoamérica, elige A4. En Estados Unidos y Canadá, elige Carta. El dibujo es el mismo, solo cambia el tamaño de la hoja.",
          },
          {
            q: "¿Con qué conviene colorearlo?",
            a: "Las ceras gruesas son lo más cómodo para las manos más pequeñas: dejan un trazo visible sin apretar. Los lápices de colores requieren un agarre más preciso, que llega más adelante. Los rotuladores dan colores intensos, pero pueden traspasar el papel corriente, así que conviene poner una hoja debajo.",
          },
          {
            q: "Mi hijo garabatea sobre todo el león. ¿Es un problema?",
            a: "No, así es esta edad. Al año y a los dos años el niño hace una marca a propósito y repite el movimiento para verla aparecer, y su objetivo es la hoja más que el dibujo que hay en ella. Quedarse dentro del contorno llega después, y un contorno grueso es lo que hace visible la diferencia cuando llega.",
          },
          {
            q: "¿Hay más láminas gratuitas?",
            a: "Sí. En esta web hay diez páginas reales del mismo libro, gratis para imprimir, y el libro completo reúne 111.",
          },
        ],
      },
      ru: {
        title:
          "Раскраска лев для малышей 1-3 лет. Распечатать бесплатно, крупный рисунок, толстый контур",
        lead:
          "Один крупный лев, толстый контур и слово под рисунком, которое тоже можно раскрасить. Настоящая страница из изданной книги, бесплатно для печати в двух размерах листа.",
        body: [
          "Этот лев нарисован для ребенка, который только взял в руки мелок. Толщина контура 2,4-4,8 мм, примерно как сам мелок, поэтому штрих, ушедший немного за линию, все равно читается как часть льва. Рисунок занимает примерно 70-82 % листа и стоит по центру, что одинаково удобно правше и левше.",
          "На листе больше ничего нет. Ни рамки, ни пейзажа, ни мелких деталей по углам. Малыш удерживает внимание несколько минут, и страница, на которой сразу несколько предметов, обычно заканчивается, не начавшись: непонятно, с чего начать.",
          "Под львом написано слово LION крупными контурными буквами. Ребенок может раскрасить и буквы, а взрослый в это время назовет слово вслух. Так первые слова и приходят в этом возрасте: когда предмет перед глазами, а не в виде урока.",
          "Это не картинка, нарисованная для сайта. Это страница изданной книги формата 21,6 на 27,9 см, ISBN 9781963328271, и все, что написано на этой странице, можно проверить по самой книге.",
        ],
        howTo: [
          "Два размера файла: Letter и A4. Выбирайте тот, который подходит вашему принтеру",
          "Малышам удобнее толстые восковые мелки",
          "Если раскрашиваете фломастерами, подложите запасной лист",
          "Напечатайте два экземпляра и раскрасьте один вместе",
        ],
        fitTitle: "Подойдет ли этот лист вашему ребенку?",
        fitYesTitle: "Лист подходит, если:",
        fitYes: [
          "Ребенку от одного до трех лет, или он старше и только начинает раскрашивать",
          "Мелок пока чаще уходит за контур, чем остается внутри",
          "Рисунки с мелкими деталями забрасываются через минуту",
          "Вам хочется, чтобы ребенок называл нарисованное, а не только закрашивал",
        ],
        fitNo: [
          "Ребенок уже уверенно раскрашивает внутри простого контура",
          "Он просит картинки, где происходит сразу несколько вещей",
          "Ему интереснее рисовать самому, чем закрашивать готовое",
        ],
        themeTitle: "Лев это один из {n} наземных животных книги",
        themeLead:
          "Здесь бесплатен только лев. Остальные наземные животные есть в книге, а всего в ней {total} рисунков, и под каждым написано его слово.",
        themeFreeMark: "бесплатно на этой странице",
        pickLead:
          "Этот лист один из {total}. Тот же размер, та же толщина контура, то же одно слово под рисунком, от первой страницы до последней.",
        pickTitle: "Книга, из которой этот лист",
        pickPoints: [
          "111 рисунков от руки, ни один не повторяется",
          "Один крупный предмет на странице, ничего мелкого по углам",
          "Слово под каждым рисунком тоже можно раскрасить, вместе с ним приходят первые слова",
          "21,6 x 27,9 см, 114 страниц, для детей от 1 до 3 лет",
          "Пять звезд от Readers' Favorite, независимого сайта книжных рецензий",
        ],
        faq: [
          {
            q: "Это правда бесплатно?",
            a: "Да. Без регистрации, без почты, без оплаты. Печатайте столько копий, сколько нужно, дома или в детском саду.",
          },
          {
            q: "Можно использовать в детском саду или в группе?",
            a: "Да, печатайте и раздавайте свободно. Просим только не перепродавать лист и не выкладывать файл на других сайтах.",
          },
          {
            q: "Какой файл печатать, Letter или A4?",
            a: "В США и Канаде выбирайте Letter, в Европе и Латинской Америке A4. Рисунок одинаковый, отличается только размер листа.",
          },
          {
            q: "Чем лучше раскрашивать?",
            a: "Для самых маленьких удобнее толстые восковые мелки: они оставляют заметный след без сильного нажима. Цветные карандаши требуют более точного хвата, он появляется позже. Фломастеры дают яркий цвет, но могут пройти сквозь обычную бумагу, поэтому подложите запасной лист.",
          },
          {
            q: "Ребенок черкает поверх всего льва. Это плохо?",
            a: "Нет, так и выглядит этот возраст. В год и в два ребенок делает след намеренно и повторяет движение, чтобы посмотреть, как он появляется, и целью для него служит лист, а не рисунок на нем. Попадать внутрь контура он начнет позже, и толстый контур как раз делает эту перемену заметной.",
          },
          {
            q: "Есть еще бесплатные листы?",
            a: "Да. На сайте бесплатно доступны десять настоящих страниц из этой же книги, а всего в книге 111 рисунков.",
          },
        ],
      },
    },
  },
  /* --------------------------------------------------------------
     Единорог. Самый крупный запрос среди сказочных героев.
     -------------------------------------------------------------- */
  {
    id: "unicorn-toddler",
    published: "2026-09-08",
    updated: "2026-09-08",
    single: true,
    themeId: "fantasy",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    fromBookIdRu: "first-coloring-book-111-ru",
    slug: {
      en: "unicorn-coloring-page-for-toddlers",
      es: "dibujo-de-unicornio-para-colorear-ninos-pequenos",
      ru: "raskraska-edinorog-dlya-malyshey",
    },
    groups: [
      {
        id: "sheet",
        title: { en: "", es: "", ru: "" },
        sheets: [S("unicorn", "Unicorn", "Unicornio", "Единорог")],
      },
    ],
    copy: {
      ru: {
        title: "Раскраска единорог для малышей 1-3 лет - распечатать бесплатно",
        lead:
          "Крупная раскраска с единорогом для малышей: один рисунок без фона, толстый контур и слово «ЕДИНОРОГ» под картинкой, которое тоже можно раскрасить. Это настоящая страница из изданной книги. Можно бесплатно распечатать на Letter или A4 без регистрации.",
        body: [
          "У единорога несколько крупных областей: туловище, голова, грива и хвост. Гриву и хвост удобно раскрашивать широкими движениями и делать разными цветами. Мелких деталей немного. Даже полоски на роге необязательно раскрашивать отдельно: ребенок, который только начинает, может закрасить весь рог одним цветом.",
          "Основной контур имеет толщину 2,4-4,8 мм, а рисунок занимает примерно 70-82 % страницы и расположен по центру. Вокруг нет фона, рамки и других предметов, поэтому все внимание остается на одном крупном единороге.",
          "Под рисунком крупными контурными буквами написано слово «ЕДИНОРОГ». Буквы тоже можно раскрасить, а взрослый может назвать изображение вслух и показать ребенку написанное слово.",
        ],
        howTo: [
          "Выберите Letter или A4 в зависимости от бумаги вашего принтера",
          "Для первых попыток удобны толстые восковые мелки",
          "Если ребенок раскрашивает фломастерами, подложите дополнительный лист бумаги",
          "Можно распечатать несколько экземпляров и попробовать раскрасить единорога разными цветами",
        ],
        fitTitle: "Подойдет ли эта раскраска вашему ребенку?",
        fitYesTitle: "Раскраска подходит, если:",
        fitYes: [
          "Ребенку 1-3 года или он старше, но только начинает раскрашивать",
          "Он пока часто выходит за контур",
          "Ему проще один крупный рисунок, чем страница с множеством мелких деталей",
          "Ему нравится раскрашивать отдельные крупные части разными цветами",
        ],
        fitNoTitle: "Раскраска может быть слишком простой, если:",
        fitNo: [
          "Ребенок уже уверенно раскрашивает небольшие участки внутри контура",
          "Он сам просит более сложные картинки с большим количеством деталей",
          "Ему интереснее рисовать самостоятельно, чем раскрашивать готовый рисунок",
        ],
        themeTitle: "Единорог - один из {n} сказочных героев книги",
        themeLead:
          "Эта бесплатная раскраска взята из книги «Первая книга-раскраска для малышей от 1 до 3 лет», ISBN 978-1-963328-36-3. Единорог входит в тему сказочных героев: в книге их {n}, а всего в ней {total} разных рисунков.",
        themeFreeMark: "бесплатно на этой странице",
        pickLead:
          "В книге сохраняется тот же принцип: один крупный рисунок на странице, толстый контур и слово крупными контурными буквами под картинкой. Всего 114 страниц, формат 21,6 x 27,9 см. Рисунки нарисованы от руки и не повторяются. Книга получила оценку пять звезд от Readers' Favorite.",
        pickTitle: "Книга, из которой этот лист",
        pickPoints: [],
        faq: [
          {
            q: "Можно ли распечатать раскраску с единорогом бесплатно?",
            a: "Да. Этот лист можно бесплатно распечатать без регистрации, электронной почты и оплаты. Доступны размеры Letter и A4.",
          },
          {
            q: "Подойдет ли раскраска с единорогом ребенку 2 лет?",
            a: "Если ребенок только начинает раскрашивать, этот рисунок удобен крупными областями и небольшим количеством мелких деталей. Необязательно стараться точно оставаться внутри каждой линии: этот навык появляется постепенно.",
          },
          {
            q: "Нужно ли отдельно раскрашивать полоски на роге?",
            a: "Нет. Рог можно закрасить целиком одним цветом. Позже этот же лист можно распечатать снова и попробовать раскрасить отдельные части.",
          },
          {
            q: "Чем лучше раскрашивать?",
            a: "Для самых маленьких удобны толстые восковые мелки. Цветные карандаши требуют более точных движений руки. При использовании фломастеров лучше подложить дополнительный лист бумаги.",
          },
          {
            q: "Есть ли еще бесплатные раскраски для малышей?",
            a: "Да. На сайте бесплатно доступны десять настоящих страниц из этой же книги. Всего в книге 111 разных рисунков.",
          },
        ],
      },
      en: {
        title: "Unicorn coloring page for toddlers ages 1-3, free to print",
        lead:
          "A big unicorn coloring page for toddlers: one picture with no background, a thick outline, and the word UNICORN underneath that can be colored too. It is a real page from a printed book. Free to print in US Letter or A4, with no sign-up.",
        body: [
          "The unicorn is built from a few large areas: the body, the head, the mane and the tail. The mane and the tail take wide strokes and can each have their own color. There is little fine detail. Even the stripes on the horn do not have to be colored one by one, a child who is just starting can fill the whole horn with a single color.",
          "The main outline measures 2.4 to 4.8 mm, and the picture fills roughly 70 to 82 percent of the page and sits in the center. There is no background, no frame and nothing else around it, so all the attention stays on one large unicorn.",
          "Under the picture is the word UNICORN in large outline letters. The letters can be colored too, and an adult can say the word out loud and point to it while the child colors.",
        ],
        howTo: [
          "Choose Letter or A4, whichever your printer takes",
          "Thick crayons are easiest for first attempts",
          "If your child uses markers, slip a spare sheet underneath",
          "Print a few copies and try the unicorn in different colors",
        ],
        fitTitle: "Is this page right for your child?",
        fitYesTitle: "It is a good fit if:",
        fitYes: [
          "Your child is 1 to 3, or older and just starting to color",
          "They still go outside the line often",
          "One big picture is easier for them than a page full of small detail",
          "They like giving each large part its own color",
        ],
        fitNoTitle: "The page may be too simple if:",
        fitNo: [
          "Your child already colors small areas confidently inside the line",
          "They ask for busier pictures with more detail",
          "They would rather draw a picture themselves than fill in a finished one",
        ],
        themeTitle: "The unicorn is one of {n} fairy tale characters in the book",
        themeLead:
          "This free page comes from First Coloring Book for Toddlers Ages 1-3, ISBN 978-1-963328-27-1. The unicorn belongs to the fairy tale theme: the book has {n} of them, and {total} different pictures in all.",
        themeFreeMark: "free on this page",
        pickLead:
          "The same principle runs through the book: one large picture per page, a thick outline, and the word underneath in large outline letters. 114 pages, 8.5 x 11 inches. Every picture is drawn by hand and none is repeated. The book has a five star review from Readers' Favorite.",
        pickTitle: "The book this page comes from",
        pickPoints: [],
        faq: [
          {
            q: "Is this unicorn coloring page really free to print?",
            a: "Yes. No account, no email and no payment. Two sizes are available, Letter and A4.",
          },
          {
            q: "Is this unicorn page right for a two year old?",
            a: "If your child is just starting to color, the large areas and the small amount of detail make it comfortable. Staying neatly inside every line is not expected yet, that comes gradually.",
          },
          {
            q: "Do the stripes on the horn have to be colored separately?",
            a: "No. The horn can be filled with one color. Later the same page can be printed again and the parts colored separately.",
          },
          {
            q: "What is best for coloring it?",
            a: "Thick crayons are easiest for the youngest hands. Colored pencils call for steadier movements. With markers, slip a spare sheet underneath.",
          },
          {
            q: "Are there more free coloring pages for toddlers?",
            a: "Yes. Ten real pages from the same book are free to print on this site. The book itself holds 111 different pictures.",
          },
        ],
      },
      es: {
        title: "Unicornio para colorear para niños de 1 a 3 años - imprimir gratis",
        lead:
          "Un unicornio grande para colorear, pensado para los más pequeños: un solo dibujo sin fondo, contorno grueso y la palabra UNICORNIO debajo, que también se puede colorear. Esta lámina pertenece a un libro publicado y se puede imprimir gratis en A4 o Carta, sin registro.",
        body: [
          "El unicornio se compone de unas pocas zonas grandes: el cuerpo, la cabeza, la crin y la cola. La crin y la cola se pueden colorear con trazos amplios y cada una puede llevar un color distinto. Hay pocos detalles pequeños. Ni siquiera hace falta colorear una a una las rayas del cuerno: un niño que empieza puede pintar el cuerno entero de un solo color.",
          "El contorno principal mide entre 2,4 y 4,8 mm. El dibujo ocupa aproximadamente entre el 70 % y el 82 % de la página y está centrado. Alrededor no hay fondo, marco ni otros objetos, así que toda la atención queda en un solo unicornio grande.",
          "Debajo del dibujo aparece la palabra UNICORNIO en letras grandes de contorno. Las letras también se pueden colorear, y el adulto puede decir la palabra en voz alta y señalarla mientras el niño colorea.",
        ],
        howTo: [
          "Elige A4 o Carta según el papel de tu impresora",
          "Para los primeros intentos van mejor las ceras gruesas",
          "Si el niño usa rotuladores, pon una hoja de papel debajo",
          "Puedes imprimir varias copias y colorear el unicornio de distintas maneras",
        ],
        fitTitle: "¿Es esta lámina adecuada para tu hijo?",
        fitYesTitle: "Esta lámina encaja si:",
        fitYes: [
          "Tu hijo tiene entre 1 y 3 años, o es mayor y empieza ahora a colorear",
          "Todavía se sale del contorno a menudo",
          "Un dibujo grande le resulta más fácil que una página llena de pequeños detalles",
          "Le gusta dar un color distinto a las partes grandes del dibujo",
        ],
        fitNoTitle: "La lámina puede quedarse corta si:",
        fitNo: [
          "Ya colorea con seguridad zonas pequeñas dentro del contorno",
          "Pide dibujos más difíciles y con más detalles",
          "Prefiere dibujar él mismo antes que colorear un dibujo ya hecho",
        ],
        themeTitle: "El unicornio es uno de los {n} personajes de cuentos del libro",
        themeLead:
          "Esta lámina gratuita pertenece a El Primer Libro de Colorear para Bebés de 1 a 3 Años, ISBN 978-1-963328-20-2. El unicornio forma parte del tema de los personajes de cuentos: en el libro hay {n}, y {total} dibujos distintos en total.",
        themeFreeMark: "gratis en esta página",
        pickLead:
          "El libro sigue el mismo principio: un dibujo grande por página, contorno grueso y una palabra debajo en letras grandes de contorno que también se puede colorear. Tiene 114 páginas y un formato de 21,6 x 27,9 cm. Todos los dibujos están hechos a mano y ninguno se repite. El libro ha recibido cinco estrellas de Readers' Favorite.",
        pickTitle: "El libro del que sale esta página",
        pickPoints: [],
        faq: [
          {
            q: "¿De verdad se puede imprimir gratis este unicornio para colorear?",
            a: "Sí. Se puede imprimir sin registro, sin correo electrónico y sin pagar. Hay dos tamaños disponibles: A4 y Carta.",
          },
          {
            q: "¿Le viene bien este unicornio a un niño de dos años?",
            a: "Si está empezando a colorear, las zonas grandes y los pocos detalles hacen que este dibujo resulte más sencillo. No pasa nada si todavía se sale del contorno a menudo: aprender a controlar mejor el movimiento lleva tiempo.",
          },
          {
            q: "¿Hay que colorear las rayas del cuerno por separado?",
            a: "No. El cuerno se puede pintar entero de un solo color. Más adelante se puede imprimir la misma lámina otra vez y colorear las partes por separado.",
          },
          {
            q: "¿Con qué conviene colorearlo?",
            a: "Para las manos más pequeñas, lo más cómodo son las ceras gruesas. Los lápices de colores requieren movimientos más precisos. Si se usan rotuladores, conviene poner una hoja de papel debajo.",
          },
          {
            q: "¿Hay más láminas gratuitas para los más pequeños?",
            a: "Sí. En esta web hay diez páginas del mismo libro que se pueden imprimir gratis. El libro completo reúne 111 dibujos distintos.",
          },
        ],
      },
    },
  },

  /* --------------------------------------------------------------
     Русалка. Два уровня сложности на одном листе: хвост целиком
     или чешуя по отдельности.
     -------------------------------------------------------------- */
  {
    id: "mermaid-toddler",
    published: "2026-09-08",
    updated: "2026-09-08",
    single: true,
    themeId: "fantasy",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    fromBookIdRu: "first-coloring-book-111-ru",
    slug: {
      en: "mermaid-coloring-page-for-toddlers",
      es: "dibujo-de-sirena-para-colorear-ninos-pequenos",
      ru: "raskraska-rusalka-dlya-malyshey",
    },
    groups: [
      {
        id: "sheet",
        title: { en: "", es: "", ru: "" },
        sheets: [S("mermaid", "Mermaid", "Sirena", "Русалка")],
      },
    ],
    copy: {
      ru: {
        title: "Раскраска русалка для малышей 1-3 лет - распечатать бесплатно",
        lead:
          "Крупная раскраска с русалкой для малышей: одна русалка без сложного фона, толстый контур и слово «РУСАЛКА» под рисунком, которое тоже можно раскрасить. Это настоящая страница из изданной книги. Можно бесплатно распечатать на Letter или A4 без регистрации.",
        body: [
          "Большую часть рисунка занимают крупные области: длинные волосы и хвост. Их ребенок может раскрашивать широкими движениями. На хвосте есть небольшие элементы чешуи, поэтому один и тот же рисунок можно использовать на двух уровнях сложности.",
          "Ребенок, который только начинает, может просто закрасить хвост целиком, не стараясь раскрашивать каждый элемент чешуи отдельно. Позже этот же лист можно распечатать снова и попробовать работать с небольшими деталями.",
          "Основной контур имеет толщину 2,4-4,8 мм, а русалка занимает примерно 70-82 % страницы и расположена по центру. На листе нет моря, рыб, растений, рамки и других фоновых элементов, только одна крупная русалка.",
          "Под рисунком крупными контурными буквами написано слово «РУСАЛКА». Его тоже можно раскрасить, а взрослый может назвать изображение вслух и показать ребенку написанное слово.",
        ],
        howTo: [
          "Выберите Letter или A4 в зависимости от бумаги вашего принтера",
          "Для крупных областей удобны толстые восковые мелки",
          "Элементы чешуи необязательно раскрашивать отдельно",
          "Если используете фломастеры, подложите дополнительный лист бумаги",
        ],
        fitTitle: "Подойдет ли эта раскраска вашему ребенку?",
        fitYesTitle: "Раскраска подходит, если:",
        fitYes: [
          "Ребенок только начинает раскрашивать и ему удобнее большие открытые области",
          "Он пока часто выходит за контур",
          "Он уже начинает интересоваться небольшими деталями",
          "Вы хотите рисунок, который позже можно распечатать снова и раскрасить более подробно",
        ],
        fitNoTitle: "Раскраска может быть слишком простой, если:",
        fitNo: [
          "Ребенок легко справляется с небольшими участками",
          "Он просит более сложные картинки с большим количеством деталей",
          "Ему интереснее целые сцены с фоном и несколькими персонажами",
          "Он предпочитает рисовать самостоятельно",
        ],
        themeTitle: "Русалка - один из {n} сказочных героев книги",
        themeLead:
          "Эта бесплатная русалка взята из книги «Первая книга-раскраска для малышей от 1 до 3 лет», ISBN 978-1-963328-36-3. Русалка входит в тему сказочных героев: в книге их {n}, а всего в ней {total} разных рисунков.",
        themeFreeMark: "бесплатно на этой странице",
        pickLead:
          "В книге на каждой странице находится один крупный рисунок с хорошо заметным контуром и слово под ним, которое тоже можно раскрасить. Всего 114 страниц, формат 21,6 x 27,9 см. Все 111 рисунков нарисованы от руки и не повторяются. Книга получила оценку пять звезд от Readers' Favorite.",
        pickTitle: "Книга, из которой этот лист",
        pickPoints: [],
        faq: [
          {
            q: "Можно ли распечатать раскраску с русалкой бесплатно?",
            a: "Да. Этот лист можно бесплатно распечатать без регистрации, электронной почты и оплаты. Доступны размеры Letter и A4.",
          },
          {
            q: "Подойдет ли раскраска с русалкой ребенку 2 лет?",
            a: "Если ребенок только учится раскрашивать, здесь есть большие области, прежде всего волосы и хвост. Небольшие элементы чешуи необязательно раскрашивать отдельно.",
          },
          {
            q: "Нужно ли раскрашивать каждую деталь чешуи отдельно?",
            a: "Нет. Начинающий ребенок может закрасить хвост целиком. Позже тот же рисунок можно распечатать снова и попробовать раскрасить небольшие элементы отдельно.",
          },
          {
            q: "Какой размер выбрать, Letter или A4?",
            a: "Letter обычно используется в США и Канаде, A4 в большинстве других стран. Сам рисунок в обоих вариантах одинаковый.",
          },
          {
            q: "Есть ли другие бесплатные раскраски для малышей?",
            a: "Да. На сайте бесплатно доступны десять настоящих страниц из этой же книги. Всего в книге 111 разных рисунков.",
          },
        ],
      },
      en: {
        title: "Mermaid coloring page for toddlers ages 1-3, free to print",
        lead:
          "A big mermaid coloring page for toddlers: one mermaid with no busy background, a thick outline, and the word MERMAID underneath that can be colored too. It is a real page from a printed book. Free to print in US Letter or A4, with no sign-up.",
        body: [
          "Most of the picture is taken up by two large areas, the long hair and the tail. A child can fill them with wide strokes. The tail carries small scale markings, so the same page works at two levels of difficulty.",
          "A child who is just starting can simply color the tail as one shape, without trying to fill each scale. Later the same page can be printed again and the small parts colored separately.",
          "The main outline measures 2.4 to 4.8 mm, and the mermaid fills roughly 70 to 82 percent of the page and sits in the center. There is no sea, no fish, no plants and no frame around her, only one large mermaid.",
          "Under the picture is the word MERMAID in large outline letters. It can be colored too, and an adult can say the word out loud and point to it while the child colors.",
        ],
        howTo: [
          "Choose Letter or A4, whichever your printer takes",
          "Thick crayons work well on the large areas",
          "The scales do not have to be colored separately",
          "If you use markers, slip a spare sheet underneath",
        ],
        fitTitle: "Is this page right for your child?",
        fitYesTitle: "It is a good fit if:",
        fitYes: [
          "Your child is just starting to color and does better with large open areas",
          "They still go outside the line often",
          "They are beginning to take an interest in smaller parts",
          "You want a page you can print again later and color in more detail",
        ],
        fitNoTitle: "The page may be too simple if:",
        fitNo: [
          "Your child handles small areas easily",
          "They ask for busier pictures with more detail",
          "They would rather color whole scenes with a background and several characters",
          "They would rather draw a picture themselves",
        ],
        themeTitle: "The mermaid is one of {n} fairy tale characters in the book",
        themeLead:
          "This free mermaid comes from First Coloring Book for Toddlers Ages 1-3, ISBN 978-1-963328-27-1. The mermaid belongs to the fairy tale theme: the book has {n} of them, and {total} different pictures in all.",
        themeFreeMark: "free on this page",
        pickLead:
          "Every page of the book holds one large picture with a clearly visible outline and a word underneath that can be colored too. 114 pages, 8.5 x 11 inches. All 111 pictures are drawn by hand and none is repeated. The book has a five star review from Readers' Favorite.",
        pickTitle: "The book this page comes from",
        pickPoints: [],
        faq: [
          {
            q: "Is this mermaid coloring page really free to print?",
            a: "Yes. No account, no email and no payment. Two sizes are available, Letter and A4.",
          },
          {
            q: "Is this mermaid page right for a two year old?",
            a: "If your child is learning to color, there are large areas here, above all the hair and the tail. The small scale markings do not have to be colored separately.",
          },
          {
            q: "Does every scale have to be colored on its own?",
            a: "No. A beginner can color the tail as one shape. Later the same picture can be printed again and the small parts colored separately.",
          },
          {
            q: "Which size should I choose, Letter or A4?",
            a: "Letter is the usual size in the United States and Canada, A4 in most other countries. The drawing itself is the same in both.",
          },
          {
            q: "Are there more free coloring pages for toddlers?",
            a: "Yes. Ten real pages from the same book are free to print on this site. The book itself holds 111 different pictures.",
          },
        ],
      },
      es: {
        title: "Sirena para colorear para niños de 1 a 3 años - imprimir gratis",
        lead:
          "Una sirena grande para colorear, pensada para los más pequeños: un solo dibujo sin fondo recargado, contorno grueso y la palabra SIRENA debajo, que también se puede colorear. Esta lámina pertenece a un libro publicado y se puede imprimir gratis en A4 o Carta, sin registro.",
        body: [
          "La mayor parte del dibujo la ocupan dos zonas grandes: el pelo largo y la cola. El niño puede colorearlas con trazos amplios. En la cola hay pequeños elementos que representan las escamas, por lo que la misma lámina se puede colorear de dos maneras: una más sencilla y otra con más detalle.",
          "Un niño que empieza puede colorear la cola entera sin intentar rellenar cada escama por separado. Más adelante se puede imprimir la misma lámina otra vez y trabajar las partes pequeñas de forma individual.",
          "El contorno principal mide entre 2,4 y 4,8 mm. La sirena ocupa aproximadamente entre el 70 % y el 82 % de la página y está centrada. No hay mar, peces, plantas ni marco alrededor: solo una sirena grande.",
          "Debajo del dibujo aparece la palabra SIRENA en letras grandes de contorno. También se puede colorear, y el adulto puede decir la palabra en voz alta y señalarla mientras el niño colorea.",
        ],
        howTo: [
          "Elige A4 o Carta según el papel de tu impresora",
          "Para las zonas grandes van bien las ceras gruesas",
          "No hace falta colorear las escamas por separado",
          "Si se usan rotuladores, conviene poner una hoja de papel debajo",
        ],
        fitTitle: "¿Es esta lámina adecuada para tu hijo?",
        fitYesTitle: "Esta lámina encaja si:",
        fitYes: [
          "Tu hijo empieza a colorear y le resulta más fácil trabajar con zonas grandes y amplias",
          "Todavía se sale del contorno a menudo",
          "Ya empieza a fijarse en las partes pequeñas",
          "Buscas una lámina que pueda volver a colorear más adelante con mayor detalle",
        ],
        fitNoTitle: "La lámina puede quedarse corta si:",
        fitNo: [
          "Tu hijo ya se maneja con soltura en zonas pequeñas",
          "Pide dibujos más difíciles y con más detalles",
          "Prefiere escenas completas con fondo y varios personajes",
          "Prefiere dibujar él mismo",
        ],
        themeTitle: "La sirena es uno de los {n} personajes de cuentos del libro",
        themeLead:
          "Esta lámina gratuita pertenece a El Primer Libro de Colorear para Bebés de 1 a 3 Años, ISBN 978-1-963328-20-2. La sirena forma parte del tema de los personajes de cuentos: en el libro hay {n}, y {total} dibujos distintos en total.",
        themeFreeMark: "gratis en esta página",
        pickLead:
          "Cada página del libro tiene un dibujo grande con un contorno bien visible y una palabra debajo que también se puede colorear. Tiene 114 páginas y un formato de 21,6 x 27,9 cm. Los 111 dibujos están hechos a mano y ninguno se repite. El libro ha recibido cinco estrellas de Readers' Favorite.",
        pickTitle: "El libro del que sale esta página",
        pickPoints: [],
        faq: [
          {
            q: "¿De verdad se puede imprimir gratis esta sirena para colorear?",
            a: "Sí. Se puede imprimir sin registro, sin correo electrónico y sin pagar. Hay dos tamaños disponibles: A4 y Carta.",
          },
          {
            q: "¿Le viene bien esta sirena a un niño de dos años?",
            a: "Si está aprendiendo a colorear, aquí encontrará zonas grandes, sobre todo el pelo y la cola. No hace falta colorear las pequeñas escamas por separado.",
          },
          {
            q: "¿Hay que colorear cada escama por separado?",
            a: "No. Un niño que empieza puede colorear la cola entera. Más adelante se puede imprimir la misma lámina otra vez y trabajar las partes pequeñas por separado.",
          },
          {
            q: "¿Qué tamaño elijo, A4 o Carta?",
            a: "El formato Carta es el habitual en Estados Unidos y Canadá, mientras que el A4 se utiliza en la mayoría de los demás países. El dibujo es el mismo en ambos formatos.",
          },
          {
            q: "¿Hay más láminas gratuitas para los más pequeños?",
            a: "Sí. En esta web hay diez páginas del mismo libro que se pueden imprimir gratis. El libro completo reúne 111 dibujos distintos.",
          },
        ],
      },
    },
  },

  /* --------------------------------------------------------------
     Фея. Единственный из бесплатных листов, который мы честно
     называем шагом вперед, а не первым листом.
     -------------------------------------------------------------- */
  {
    id: "fairy-toddler",
    published: "2026-09-08",
    updated: "2026-09-08",
    single: true,
    themeId: "fantasy",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    fromBookIdRu: "first-coloring-book-111-ru",
    slug: {
      en: "fairy-coloring-page-for-toddlers",
      es: "dibujo-de-hada-para-colorear-ninos-pequenos",
      ru: "raskraska-feya-dlya-malyshey",
    },
    groups: [
      {
        id: "sheet",
        title: { en: "", es: "", ru: "" },
        sheets: [S("fairy", "Fairy", "Hada", "Фея")],
      },
    ],
    copy: {
      ru: {
        title: "Раскраска фея для малышей 1-3 лет - распечатать бесплатно",
        lead:
          "Бесплатная раскраска с феей для малышей: одна крупная фея без фона, толстый контур и слово «ФЕЯ» под рисунком, которое тоже можно раскрасить. Это настоящая страница из изданной книги. Можно бесплатно распечатать на Letter или A4 без регистрации.",
        body: [
          "У феи есть крупные области, которые удобно раскрашивать широкими движениями, но есть и более узкие части. Поэтому этот рисунок немного сложнее льва или единорога и лучше подходит ребенку, который уже пробовал раскрашивать самые простые картинки.",
          "Необязательно аккуратно раскрашивать каждую часть отдельно. Если небольшие участки пока сложны, их можно закрасить вместе. Позже эту же страницу можно распечатать снова и попробовать использовать разные цвета для отдельных частей.",
          "Основной контур имеет толщину 2,4-4,8 мм, а фея занимает примерно 70-82 % страницы и расположена по центру. Фона, рамки и окружающих предметов нет, поэтому рисунок остается понятным и не перегруженным.",
          "Под ним крупными контурными буквами написано слово «ФЕЯ». Буквы тоже можно раскрасить, а взрослый может назвать изображение вслух и показать ребенку написанное слово.",
        ],
        howTo: [
          "Выберите Letter или A4 в зависимости от бумаги вашего принтера",
          "Для крупных областей удобны толстые восковые мелки",
          "Небольшие участки необязательно раскрашивать отдельно",
          "При использовании фломастеров подложите дополнительный лист бумаги",
          "Если рисунок пока оказался сложным, его можно распечатать снова позже",
        ],
        fitTitle: "Подойдет ли эта раскраска вашему ребенку?",
        fitYesTitle: "Раскраска подходит, если:",
        fitYes: [
          "Ребенок уже пробовал раскрашивать простые крупные картинки",
          "Он старается оставаться внутри контура хотя бы на больших участках",
          "Ему нравится использовать несколько цветов в одном рисунке",
          "Самые простые раскраски уже кажутся ему слишком легкими",
        ],
        fitNoTitle: "Раскраска может быть пока слишком сложной, если:",
        fitNo: [
          "Ребенок впервые берет мелок и раскрашивает только широкими движениями",
          "Небольшие и узкие участки пока вызывают трудности",
          "Ему проще работать с одним большим открытым контуром. В таком случае можно сначала попробовать бесплатную раскраску со львом или единорогом, а к фее вернуться позже",
        ],
        themeTitle: "Фея - один из {n} сказочных героев книги",
        themeLead:
          "Эта бесплатная фея взята из книги «Первая книга-раскраска для малышей от 1 до 3 лет», ISBN 978-1-963328-36-3. Фея входит в тему сказочных героев: в книге их {n}, а всего в ней {total} разных рисунков.",
        themeFreeMark: "бесплатно на этой странице",
        pickLead:
          "В книге есть как совсем простые крупные картинки для первых попыток, так и рисунки с большим количеством отдельных участков. На каждой странице один рисунок и слово под ним, которое тоже можно раскрасить. Всего 114 страниц, формат 21,6 x 27,9 см. Рисунки нарисованы от руки и не повторяются. Книга получила оценку пять звезд от Readers' Favorite.",
        pickTitle: "Книга, из которой этот лист",
        pickPoints: [],
        faq: [
          {
            q: "Можно ли распечатать раскраску с феей бесплатно?",
            a: "Да. Этот лист можно бесплатно распечатать без регистрации, электронной почты и оплаты. Доступны размеры Letter и A4.",
          },
          {
            q: "Подойдет ли раскраска с феей ребенку 2 лет?",
            a: "Это зависит не только от возраста, но и от того, как ребенок раскрашивает сейчас. Если он только начинает и делает широкие движения, проще сначала выбрать льва или единорога. Если уже пытается оставаться внутри контура, можно попробовать фею.",
          },
          {
            q: "Нужно ли раскрашивать небольшие части разными цветами?",
            a: "Нет. Ребенок может раскрасить их так, как ему удобно. Позже этот же лист можно распечатать снова и попробовать раскрасить отдельные участки более точно.",
          },
          {
            q: "Есть ли более простые бесплатные раскраски?",
            a: "Да. Среди десяти бесплатных страниц есть более простые рисунки с крупными открытыми областями. Например, можно начать со льва или единорога.",
          },
        ],
      },
      en: {
        title: "Fairy coloring page for toddlers ages 1-3, free to print",
        lead:
          "A free fairy coloring page for toddlers: one large fairy with no background, a thick outline, and the word FAIRY underneath that can be colored too. It is a real page from a printed book. Free to print in US Letter or A4, with no sign-up.",
        body: [
          "The fairy has large areas that take wide strokes, but it also has narrower parts. That makes this page a little harder than the lion or the unicorn, and better suited to a child who has already tried the simplest pictures.",
          "There is no need to color every part neatly on its own. If the small areas are still hard, they can be filled together. Later the same page can be printed again and the separate parts given different colors.",
          "The main outline measures 2.4 to 4.8 mm, and the fairy fills roughly 70 to 82 percent of the page and sits in the center. There is no background, no frame and nothing around her, so the picture stays clear and uncluttered.",
          "Under it is the word FAIRY in large outline letters. The letters can be colored too, and an adult can say the word out loud and point to it while the child colors.",
        ],
        howTo: [
          "Choose Letter or A4, whichever your printer takes",
          "Thick crayons work well on the large areas",
          "The small parts do not have to be colored separately",
          "If you use markers, slip a spare sheet underneath",
          "If the page turns out to be too hard for now, print it again later",
        ],
        fitTitle: "Is this page right for your child?",
        fitYesTitle: "It is a good fit if:",
        fitYes: [
          "Your child has already tried simple, large pictures",
          "They try to stay inside the line, at least on the bigger areas",
          "They like using several colors in one picture",
          "The simplest pages already feel too easy to them",
        ],
        fitNoTitle: "The page may be too hard for now if:",
        fitNo: [
          "Your child is holding a crayon for the first time and only makes wide strokes",
          "Small, narrow areas still cause trouble",
          "One large open shape is easier for them. In that case start with the free lion or unicorn page and come back to the fairy later",
        ],
        themeTitle: "The fairy is one of {n} fairy tale characters in the book",
        themeLead:
          "This free fairy comes from First Coloring Book for Toddlers Ages 1-3, ISBN 978-1-963328-27-1. The fairy belongs to the fairy tale theme: the book has {n} of them, and {total} different pictures in all.",
        themeFreeMark: "free on this page",
        pickLead:
          "The book holds both very simple large pictures for first attempts and drawings with more separate areas. Every page has one picture and a word underneath that can be colored too. 114 pages, 8.5 x 11 inches. The pictures are drawn by hand and none is repeated. The book has a five star review from Readers' Favorite.",
        pickTitle: "The book this page comes from",
        pickPoints: [],
        faq: [
          {
            q: "Is this fairy coloring page really free to print?",
            a: "Yes. No account, no email and no payment. Two sizes are available, Letter and A4.",
          },
          {
            q: "Is this fairy page right for a two year old?",
            a: "It depends less on age than on how your child colors right now. If they are just starting and only make wide strokes, the lion or the unicorn is an easier place to begin. If they already try to stay inside the line, the fairy is worth a try.",
          },
          {
            q: "Do the small parts have to be different colors?",
            a: "No. Your child can color them however they like. Later the same page can be printed again and the separate areas colored more precisely.",
          },
          {
            q: "Are there easier free coloring pages?",
            a: "Yes. Among the ten free pages there are simpler drawings with large open areas. The lion or the unicorn is a good place to start.",
          },
        ],
      },
      es: {
        title: "Hada para colorear para niños de 1 a 3 años - imprimir gratis",
        lead:
          "Una lámina gratuita de un hada para los más pequeños: un hada grande sin fondo, contorno grueso y la palabra HADA debajo, que también se puede colorear. Esta lámina pertenece a un libro publicado y se puede imprimir gratis en A4 o Carta, sin registro.",
        body: [
          "El hada tiene zonas grandes que se pueden colorear con trazos amplios, pero también incluye partes más estrechas. Por eso esta lámina es algo más difícil que el león o el unicornio y resulta más adecuada para un niño que ya ha probado dibujos más sencillos.",
          "No hace falta colorear cada parte por separado. Si las zonas pequeñas todavía le resultan difíciles, no es necesario colorearlas de forma individual. Más adelante se puede imprimir la misma página otra vez y utilizar distintos colores para cada parte.",
          "El contorno principal mide entre 2,4 y 4,8 mm. El hada ocupa aproximadamente entre el 70 % y el 82 % de la página y está centrada. No hay fondo, marco ni objetos alrededor, así que el dibujo queda limpio y despejado.",
          "Debajo aparece la palabra HADA en letras grandes de contorno. Las letras también se pueden colorear, y el adulto puede decir la palabra en voz alta y señalarla mientras el niño colorea.",
        ],
        howTo: [
          "Elige A4 o Carta según el papel de tu impresora",
          "Para las zonas grandes van bien las ceras gruesas",
          "No hace falta colorear las partes pequeñas por separado",
          "Si se usan rotuladores, conviene poner una hoja de papel debajo",
          "Si esta lámina todavía resulta difícil, se puede imprimir de nuevo más adelante",
        ],
        fitTitle: "¿Es esta lámina adecuada para tu hijo?",
        fitYesTitle: "Esta lámina encaja si:",
        fitYes: [
          "Tu hijo ya ha probado dibujos sencillos y grandes",
          "Intenta mantenerse dentro del contorno, al menos en las zonas grandes",
          "Le gusta utilizar varios colores en un mismo dibujo",
          "Las láminas más sencillas ya le parecen demasiado fáciles",
        ],
        fitNoTitle: "La lámina puede resultar todavía difícil si:",
        fitNo: [
          "Tu hijo coge la cera por primera vez y solo hace trazos amplios",
          "Las zonas pequeñas y estrechas todavía le cuestan",
          "Se maneja mejor con una sola zona grande y abierta. En ese caso, puede empezar por la lámina gratuita del león o del unicornio y volver al hada más adelante",
        ],
        themeTitle: "El hada es uno de los {n} personajes de cuentos del libro",
        themeLead:
          "Esta lámina gratuita pertenece a El Primer Libro de Colorear para Bebés de 1 a 3 Años, ISBN 978-1-963328-20-2. El hada forma parte del tema de los personajes de cuentos: en el libro hay {n}, y {total} dibujos distintos en total.",
        themeFreeMark: "gratis en esta página",
        pickLead:
          "En el libro hay dibujos muy sencillos y grandes para los primeros intentos y otros con más zonas separadas. Cada página tiene un dibujo y una palabra debajo que también se puede colorear. Tiene 114 páginas y un formato de 21,6 x 27,9 cm. Los dibujos están hechos a mano y ninguno se repite. El libro ha recibido cinco estrellas de Readers' Favorite.",
        pickTitle: "El libro del que sale esta página",
        pickPoints: [],
        faq: [
          {
            q: "¿De verdad se puede imprimir gratis esta hada para colorear?",
            a: "Sí. Se puede imprimir sin registro, sin correo electrónico y sin pagar. Hay dos tamaños disponibles: A4 y Carta.",
          },
          {
            q: "¿Le viene bien esta hada a un niño de dos años?",
            a: "Depende más de cómo colorea ahora mismo que de su edad. Si está empezando y solo hace trazos amplios, es más fácil comenzar por el león o el unicornio. Si ya intenta mantenerse dentro del contorno, puede probar con esta lámina del hada.",
          },
          {
            q: "¿Hay que colorear las partes pequeñas de distintos colores?",
            a: "No. El niño puede pintarlas como le resulte más cómodo. Más adelante se puede imprimir la misma lámina otra vez y colorear cada zona con mayor precisión.",
          },
          {
            q: "¿Hay láminas gratuitas más sencillas?",
            a: "Sí. Entre las diez páginas gratuitas hay dibujos más sencillos con zonas grandes y abiertas. El león o el unicornio son un buen punto de partida.",
          },
        ],
      },
    },
  },

  /* --------------------------------------------------------------
     Собака. Единственное из десяти животных, которое ребенок видит
     в жизни, а не только в книжке.
     -------------------------------------------------------------- */
  {
    id: "dog-toddler",
    published: "2026-09-08",
    updated: "2026-09-08",
    single: true,
    themeId: "land",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    fromBookIdRu: "first-coloring-book-111-ru",
    slug: {
      en: "dog-coloring-page-for-toddlers",
      es: "dibujo-de-perro-para-colorear-ninos-pequenos",
      ru: "raskraska-sobaka-dlya-malyshey",
    },
    groups: [
      {
        id: "sheet",
        title: { en: "", es: "", ru: "" },
        sheets: [S("dog", "Dog", "Perro", "Собака")],
      },
    ],
    copy: {
      ru: {
        title: "Раскраска собака для малышей 1-3 лет - распечатать бесплатно",
        lead:
          "Крупная раскраска с собакой для малышей: один рисунок без фона, толстый контур и слово «СОБАКА» под картинкой, которое тоже можно раскрасить. Это настоящая страница из изданной книги. Можно бесплатно распечатать на Letter или A4 без регистрации.",
        body: [
          "Собака нарисована крупно и просто: большое туловище, голова с висячим ухом, хвост и четыре лапы. Мелких деталей почти нет, поэтому ребенок может закрасить всю собаку одним цветом или выбрать отдельные цвета для уха, лап и хвоста.",
          "У этой раскраски есть еще одна особенность: собака это знакомое многим детям животное, которое они могут видеть дома или на прогулке. Ребенок может узнать на рисунке собаку, назвать ее и выбрать для нее цвет.",
          "Основной контур имеет толщину 2,4-4,8 мм, а рисунок занимает примерно 70-82 % страницы и расположен по центру. Вокруг нет фона, будки, поводка и других предметов, только одна крупная собака.",
          "Под рисунком крупными контурными буквами написано слово «СОБАКА». Его тоже можно раскрасить, а взрослый может назвать изображение вслух и показать ребенку написанное слово.",
        ],
        howTo: [
          "Выберите Letter или A4 в зависимости от бумаги вашего принтера",
          "Для первых попыток удобны толстые восковые мелки",
          "Если ребенок раскрашивает фломастерами, подложите дополнительный лист бумаги",
          "Можно распечатать несколько экземпляров и раскрасить собаку разными цветами",
        ],
        fitTitle: "Подойдет ли эта раскраска вашему ребенку?",
        fitYesTitle: "Раскраска подходит, если:",
        fitYes: [
          "Ребенку 1-3 года или он старше, но только начинает раскрашивать",
          "Он пока часто выходит за контур",
          "Ему проще один крупный рисунок, чем страница с множеством мелких деталей",
          "Он узнает собак дома, на улице или в книгах и любит их рассматривать",
        ],
        fitNoTitle: "Раскраска может быть слишком простой, если:",
        fitNo: [
          "Ребенок уже уверенно раскрашивает небольшие участки внутри контура",
          "Он просит более подробные рисунки с большим количеством деталей",
          "Ему интереснее рисовать самостоятельно, чем раскрашивать готовый рисунок",
        ],
        themeTitle: "Собака - один из {n} животных книги",
        themeLead:
          "Эта бесплатная раскраска взята из книги «Первая книга-раскраска для малышей от 1 до 3 лет», ISBN 978-1-963328-36-3. Собака входит в тему животных: в книге их {n}, а всего в ней {total} разных рисунков.",
        themeFreeMark: "бесплатно на этой странице",
        pickLead:
          "В книге сохраняется тот же принцип: один крупный рисунок на странице, толстый контур и слово крупными контурными буквами под картинкой. Всего 114 страниц, формат 21,6 x 27,9 см. Рисунки нарисованы от руки и не повторяются. Книга получила оценку пять звезд от Readers' Favorite.",
        pickTitle: "Книга, из которой этот лист",
        pickPoints: [],
        faq: [
          {
            q: "Можно ли распечатать раскраску с собакой бесплатно?",
            a: "Да. Этот лист можно бесплатно распечатать без регистрации, электронной почты и оплаты. Доступны размеры Letter и A4.",
          },
          {
            q: "Подойдет ли раскраска с собакой ребенку 2 лет?",
            a: "Если ребенок только начинает раскрашивать, этот рисунок подходит благодаря крупным областям и небольшому количеству деталей. Необязательно точно оставаться внутри контура: этот навык развивается постепенно.",
          },
          {
            q: "Какой породы собака на раскраске?",
            a: "Собака нарисована обобщенно, без выраженных признаков конкретной породы.",
          },
          {
            q: "Чем лучше раскрашивать?",
            a: "Для самых маленьких удобны толстые восковые мелки. Цветные карандаши требуют более точных движений руки. При использовании фломастеров лучше подложить дополнительный лист бумаги.",
          },
          {
            q: "Есть ли еще бесплатные раскраски для малышей?",
            a: "Да. На сайте бесплатно доступны десять настоящих страниц из этой же книги. Всего в книге 111 разных рисунков.",
          },
        ],
      },
      en: {
        title: "Dog coloring page for toddlers ages 1-3, free to print",
        lead:
          "A big dog coloring page for toddlers: one picture with no background, a thick outline, and the word DOG underneath that can be colored too. It is a real page from a printed book. Free to print in US Letter or A4, with no sign-up.",
        body: [
          "The dog is drawn large and simple: a big body, a head with a floppy ear, a tail and four legs. There is almost no fine detail, so a child can fill the whole dog with one color or give the ear, the legs and the tail their own.",
          "This page has one more thing going for it. A dog is an animal many children see in real life, at home or on a walk. A child often recognizes it, names it, and picks a color for it right away.",
          "The main outline measures 2.4 to 4.8 mm, and the picture fills roughly 70 to 82 percent of the page and sits in the center. There is no background, no kennel, no leash and nothing else around it, only one large dog.",
          "Under the picture is the word DOG in large outline letters. It can be colored too, and an adult can say the word out loud and point to it while the child colors.",
        ],
        howTo: [
          "Choose Letter or A4, whichever your printer takes",
          "Thick crayons are easiest for first attempts",
          "If your child uses markers, slip a spare sheet underneath",
          "Print a few copies and try the dog in different colors",
        ],
        fitTitle: "Is this page right for your child?",
        fitYesTitle: "It is a good fit if:",
        fitYes: [
          "Your child is 1 to 3, or older and just starting to color",
          "They still go outside the line often",
          "One big picture is easier for them than a page full of small detail",
          "They recognize dogs at home, on the street or in books and like looking at them",
        ],
        fitNoTitle: "The page may be too simple if:",
        fitNo: [
          "Your child already colors small areas confidently inside the line",
          "They ask for more detailed drawings with fur, a collar and other extras",
          "They would rather draw a picture themselves than fill in a finished one",
        ],
        themeTitle: "The dog is one of {n} animals in the book",
        themeLead:
          "This free page comes from First Coloring Book for Toddlers Ages 1-3, ISBN 978-1-963328-27-1. The dog belongs to the animal theme: the book has {n} of them, and {total} different pictures in all.",
        themeFreeMark: "free on this page",
        pickLead:
          "The same principle runs through the book: one large picture per page, a thick outline, and the word underneath in large outline letters. 114 pages, 8.5 x 11 inches. Every picture is drawn by hand and none is repeated. The book has a five star review from Readers' Favorite.",
        pickTitle: "The book this page comes from",
        pickPoints: [],
        faq: [
          {
            q: "Is this dog coloring page really free to print?",
            a: "Yes. No account, no email and no payment. Two sizes are available, Letter and A4.",
          },
          {
            q: "Is this dog page right for a two year old?",
            a: "If your child is just starting to color, the large areas and the small amount of detail make it a comfortable page. Staying exactly inside the line is not expected, that comes gradually.",
          },
          {
            q: "What breed is the dog?",
            a: "The dog is drawn in a general way, without the marks of any particular breed.",
          },
          {
            q: "What is best for coloring it?",
            a: "Thick crayons are easiest for the youngest hands. Colored pencils call for steadier movements. With markers, slip a spare sheet underneath.",
          },
          {
            q: "Are there more free coloring pages for toddlers?",
            a: "Yes. Ten real pages from the same book are free to print on this site. The book itself holds 111 different pictures.",
          },
        ],
      },
      es: {
        title: "Perro para colorear para niños de 1 a 3 años - imprimir gratis",
        lead:
          "Un perro grande para colorear, pensado para los más pequeños: un solo dibujo sin fondo, contorno grueso y la palabra PERRO debajo, que también se puede colorear. Esta lámina pertenece a un libro publicado y se puede imprimir gratis en A4 o Carta, sin registro.",
        body: [
          "El perro está dibujado de forma grande y sencilla: un cuerpo amplio, la cabeza con una oreja caída, la cola y cuatro patas. Casi no hay detalles pequeños, así que el niño puede pintar el perro entero de un color o utilizar colores distintos para la oreja, las patas y la cola.",
          "El perro es un animal familiar para muchos niños, que pueden verlo en casa, por la calle o en los libros. Al reconocer el animal del dibujo, también pueden aprender o repetir su nombre mientras colorean.",
          "El contorno principal mide entre 2,4 y 4,8 mm. El dibujo ocupa aproximadamente entre el 70 % y el 82 % de la página y está centrado. Alrededor no hay fondo, caseta, correa ni otros objetos: solo un perro grande.",
          "Debajo del dibujo aparece la palabra PERRO en letras grandes de contorno. También se puede colorear, y el adulto puede decir la palabra en voz alta y señalarla mientras el niño colorea.",
        ],
        howTo: [
          "Elige A4 o Carta según el papel de tu impresora",
          "Para los primeros intentos van mejor las ceras gruesas",
          "Si el niño usa rotuladores, pon una hoja de papel debajo",
          "Puedes imprimir varias copias y colorear el perro de distintas maneras",
        ],
        fitTitle: "¿Es esta lámina adecuada para tu hijo?",
        fitYesTitle: "Esta lámina encaja si:",
        fitYes: [
          "Tu hijo tiene entre 1 y 3 años, o es mayor y empieza ahora a colorear",
          "Todavía se sale del contorno a menudo",
          "Un dibujo grande le resulta más fácil que una página llena de pequeños detalles",
          "Reconoce a los perros en casa, por la calle o en los libros",
        ],
        fitNoTitle: "La lámina puede quedarse corta si:",
        fitNo: [
          "Ya colorea con seguridad zonas pequeñas dentro del contorno",
          "Pide dibujos más detallados, con pelo, collar u otros elementos",
          "Prefiere dibujar él mismo antes que colorear un dibujo ya hecho",
        ],
        themeTitle: "El perro es uno de los {n} animales del libro",
        themeLead:
          "Esta lámina gratuita pertenece a El Primer Libro de Colorear para Bebés de 1 a 3 Años, ISBN 978-1-963328-20-2. El perro forma parte del tema de los animales: en el libro hay {n}, y {total} dibujos distintos en total.",
        themeFreeMark: "gratis en esta página",
        pickLead:
          "El libro sigue el mismo principio: un dibujo grande por página, contorno grueso y una palabra debajo en letras grandes de contorno que también se puede colorear. Tiene 114 páginas y un formato de 21,6 x 27,9 cm. Todos los dibujos están hechos a mano y ninguno se repite. El libro ha recibido cinco estrellas de Readers' Favorite.",
        pickTitle: "El libro del que sale esta página",
        pickPoints: [],
        faq: [
          {
            q: "¿De verdad se puede imprimir gratis este perro para colorear?",
            a: "Sí. Se puede imprimir sin registro, sin correo electrónico y sin pagar. Hay dos tamaños disponibles: A4 y Carta.",
          },
          {
            q: "¿Le viene bien este perro a un niño de dos años?",
            a: "Si está empezando a colorear, las zonas grandes y los pocos detalles hacen que este dibujo resulte más sencillo. No pasa nada si todavía se sale del contorno a menudo: aprender a controlar mejor el movimiento lleva tiempo.",
          },
          {
            q: "¿De qué raza es el perro?",
            a: "El perro está dibujado de forma general, sin rasgos propios de una raza concreta.",
          },
          {
            q: "¿Con qué conviene colorearlo?",
            a: "Para las manos más pequeñas, lo más cómodo son las ceras gruesas. Los lápices de colores requieren movimientos más precisos. Si se usan rotuladores, conviene poner una hoja de papel debajo.",
          },
          {
            q: "¿Hay más láminas gratuitas para los más pequeños?",
            a: "Sí. En esta web hay diez páginas del mismo libro que se pueden imprimir gratis. El libro completo reúne 111 dibujos distintos.",
          },
        ],
      },
    },
  },

  /* --------------------------------------------------------------
     Бабочка. Крылья разбиты на отдельные полосы, рисунок
     симметричный. Шаг вперед, а не первый лист.
     -------------------------------------------------------------- */
  {
    id: "butterfly-toddler",
    published: "2026-09-08",
    updated: "2026-09-08",
    single: true,
    themeId: "land",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    fromBookIdRu: "first-coloring-book-111-ru",
    slug: {
      en: "butterfly-coloring-page-for-toddlers",
      es: "dibujo-de-mariposa-para-colorear-ninos-pequenos",
      ru: "raskraska-babochka-dlya-malyshey",
    },
    groups: [
      {
        id: "sheet",
        title: { en: "", es: "", ru: "" },
        sheets: [S("butterfly", "Butterfly", "Mariposa", "Бабочка")],
      },
    ],
    copy: {
      ru: {
        title: "Раскраска бабочка для малышей 1-3 лет - распечатать бесплатно",
        lead:
          "Крупная раскраска с бабочкой для малышей: одна бабочка без фона, толстый контур и слово «БАБОЧКА» под картинкой, которое тоже можно раскрасить. Это настоящая страница из изданной книги. Можно бесплатно распечатать на Letter или A4 без регистрации.",
        body: [
          "Крылья бабочки разделены на несколько отдельных областей. Поэтому здесь можно использовать больше цветов, чем в самых простых раскрасках с одной большой сплошной областью.",
          "Раскрашивать каждую часть отдельно необязательно. Ребенок, который только начинает, может закрасить каждое крыло целиком. Позже этот же лист можно распечатать снова и попробовать использовать разные цвета для отдельных участков.",
          "Бабочка симметрична: рисунок на левом и правом крыле повторяется. Поэтому крылья можно раскрашивать одинаково, повторяя цвета с одной стороны на другой, или специально выбирать для них разные сочетания.",
          "Основной контур имеет толщину 2,4-4,8 мм, а бабочка занимает примерно 70-82 % страницы и расположена по центру. Вокруг нет цветов, травы, рамки и других фоновых деталей.",
          "Под рисунком крупными контурными буквами написано слово «БАБОЧКА». Его тоже можно раскрасить, а взрослый может назвать изображение вслух и показать ребенку написанное слово.",
        ],
        howTo: [
          "Выберите Letter или A4 в зависимости от бумаги вашего принтера",
          "Для крупных областей удобны толстые восковые мелки",
          "Отдельные участки на крыльях необязательно раскрашивать разными цветами",
          "При использовании фломастеров подложите дополнительный лист бумаги",
          "Можно распечатать два экземпляра и раскрасить крылья разными сочетаниями цветов",
        ],
        fitTitle: "Подойдет ли эта раскраска вашему ребенку?",
        fitYesTitle: "Раскраска подходит, если:",
        fitYes: [
          "Ребенок уже пробовал раскрашивать простые крупные картинки",
          "Ему нравится использовать несколько цветов в одном рисунке",
          "Он начинает интересоваться отдельными небольшими участками",
          "Самые простые раскраски с одной большой областью уже кажутся ему слишком легкими",
        ],
        fitNoTitle: "Раскраска может быть пока слишком сложной, если:",
        fitNo: [
          "Ребенок впервые берет мелок и раскрашивает только широкими движениями",
          "Ему пока трудно работать с отдельными небольшими участками",
          "Ему проще раскрашивать один большой открытый контур. В таком случае можно сначала попробовать бесплатную раскраску со слоном или львом, а к бабочке вернуться позже",
        ],
        themeTitle: "Бабочка - одна из {n} животных книги",
        themeLead:
          "Эта бесплатная раскраска взята из книги «Первая книга-раскраска для малышей от 1 до 3 лет», ISBN 978-1-963328-36-3. Бабочка входит в тему животных: в книге их {n}, а всего в ней {total} разных рисунков.",
        themeFreeMark: "бесплатно на этой странице",
        pickLead:
          "В книге есть как совсем простые крупные картинки для первых попыток, так и рисунки с большим количеством отдельных областей. На каждой странице один рисунок и слово под ним, которое тоже можно раскрасить. Всего 114 страниц, формат 21,6 x 27,9 см. Рисунки нарисованы от руки и не повторяются. Книга получила оценку пять звезд от Readers' Favorite.",
        pickTitle: "Книга, из которой этот лист",
        pickPoints: [],
        faq: [
          {
            q: "Можно ли распечатать раскраску с бабочкой бесплатно?",
            a: "Да. Этот лист можно бесплатно распечатать без регистрации, электронной почты и оплаты. Доступны размеры Letter и A4.",
          },
          {
            q: "Подойдет ли раскраска с бабочкой ребенку 2 лет?",
            a: "Это зависит от того, как ребенок раскрашивает сейчас. Если он только начинает, можно не обращать внимания на отдельные участки и закрасить каждое крыло целиком. Если ребенок уже старается работать с небольшими областями, их можно раскрашивать разными цветами.",
          },
          {
            q: "Нужно ли раскрашивать отдельные части крыльев разными цветами?",
            a: "Нет. Крыло можно закрасить одним цветом. Позже этот же лист можно распечатать снова и попробовать раскрасить отдельные участки по-разному.",
          },
          {
            q: "Почему рисунок бабочки сложнее слона или льва?",
            a: "У бабочки крылья разделены на большее количество отдельных областей. У слона и льва крупные сплошные участки, поэтому ими проще начинать.",
          },
          {
            q: "Есть ли более простые бесплатные раскраски?",
            a: "Да. Среди десяти бесплатных страниц есть рисунки с более крупными открытыми областями. Например, можно начать со слона или льва.",
          },
        ],
      },
      en: {
        title: "Butterfly coloring page for toddlers ages 1-3, free to print",
        lead:
          "A big butterfly coloring page for toddlers: one butterfly with no background, a thick outline, and the word BUTTERFLY underneath that can be colored too. It is a real page from a printed book. Free to print in US Letter or A4, with no sign-up.",
        body: [
          "The wings are divided into several separate areas. That leaves room for more colors than the simplest pages, where the whole picture is one solid shape.",
          "There is no need to color each part on its own. A child who is just starting can fill each wing as one shape. Later the same page can be printed again and the separate areas given different colors.",
          "The butterfly is symmetrical: the left wing and the right wing carry the same pattern. The wings can be colored to match, repeating the colors from one side on the other, or deliberately given different combinations.",
          "The main outline measures 2.4 to 4.8 mm, and the butterfly fills roughly 70 to 82 percent of the page and sits in the center. There are no flowers, no grass, no frame and no other background around it.",
          "Under the picture is the word BUTTERFLY in large outline letters. It can be colored too, and an adult can say the word out loud and point to it while the child colors.",
        ],
        howTo: [
          "Choose Letter or A4, whichever your printer takes",
          "Thick crayons work well on the large areas",
          "The separate areas on the wings do not have to be different colors",
          "If you use markers, slip a spare sheet underneath",
          "Print two copies and try the wings in different color combinations",
        ],
        fitTitle: "Is this page right for your child?",
        fitYesTitle: "It is a good fit if:",
        fitYes: [
          "Your child has already tried simple, large pictures",
          "They like using several colors in one picture",
          "They are beginning to take an interest in smaller separate areas",
          "The simplest pages with one big shape already feel too easy to them",
        ],
        fitNoTitle: "The page may be too hard for now if:",
        fitNo: [
          "Your child is holding a crayon for the first time and only makes wide strokes",
          "Working in small separate areas is still difficult for them",
          "One large open shape is easier for them. In that case start with the free elephant or lion page and come back to the butterfly later",
        ],
        themeTitle: "The butterfly is one of {n} animals in the book",
        themeLead:
          "This free page comes from First Coloring Book for Toddlers Ages 1-3, ISBN 978-1-963328-27-1. The butterfly belongs to the animal theme: the book has {n} of them, and {total} different pictures in all.",
        themeFreeMark: "free on this page",
        pickLead:
          "The book holds both very simple large pictures for first attempts and drawings with more separate areas. Every page has one picture and a word underneath that can be colored too. 114 pages, 8.5 x 11 inches. The pictures are drawn by hand and none is repeated. The book has a five star review from Readers' Favorite.",
        pickTitle: "The book this page comes from",
        pickPoints: [],
        faq: [
          {
            q: "Is this butterfly coloring page really free to print?",
            a: "Yes. No account, no email and no payment. Two sizes are available, Letter and A4.",
          },
          {
            q: "Is this butterfly page right for a two year old?",
            a: "It depends on how your child colors right now. If they are just starting, they can ignore the separate areas and fill each wing as one shape. If they are already working in smaller areas, those can each take their own color.",
          },
          {
            q: "Do the parts of the wings have to be different colors?",
            a: "No. A wing can be filled with one color. Later the same page can be printed again and the separate areas colored differently.",
          },
          {
            q: "Why is the butterfly harder than the elephant or the lion?",
            a: "The butterfly wings are divided into more separate areas. The elephant and the lion are large solid shapes, which makes them easier to start with.",
          },
          {
            q: "Are there easier free coloring pages?",
            a: "Yes. Among the ten free pages there are drawings with larger open areas. The elephant or the lion is a good place to start.",
          },
        ],
      },
      es: {
        title: "Mariposa para colorear para niños de 1 a 3 años - imprimir gratis",
        lead:
          "Una mariposa grande para colorear, pensada para los más pequeños: una sola mariposa sin fondo, contorno grueso y la palabra MARIPOSA debajo, que también se puede colorear. Esta lámina pertenece a un libro publicado y se puede imprimir gratis en A4 o Carta, sin registro.",
        body: [
          "Las alas están divididas en varias zonas separadas. Por eso se pueden utilizar más colores que en las láminas más sencillas, donde predominan las zonas grandes y abiertas.",
          "No hace falta colorear cada parte por separado. Un niño que empieza puede pintar cada ala entera. Más adelante se puede imprimir la misma lámina otra vez y utilizar distintos colores para cada zona.",
          "La mariposa es simétrica: el ala izquierda y la derecha tienen el mismo dibujo. Se pueden colorear igual, repitiendo los colores de un lado en el otro, o utilizar combinaciones diferentes.",
          "El contorno principal mide entre 2,4 y 4,8 mm. La mariposa ocupa aproximadamente entre el 70 % y el 82 % de la página y está centrada. Alrededor no hay flores, hierba, marco ni otros elementos de fondo.",
          "Debajo del dibujo aparece la palabra MARIPOSA en letras grandes de contorno. También se puede colorear, y el adulto puede decir la palabra en voz alta y señalarla mientras el niño colorea.",
        ],
        howTo: [
          "Elige A4 o Carta según el papel de tu impresora",
          "Para las zonas grandes van bien las ceras gruesas",
          "Las distintas zonas de las alas no tienen que llevar colores diferentes",
          "Si se usan rotuladores, conviene poner una hoja de papel debajo",
          "Puedes imprimir dos copias y probar distintas combinaciones de colores",
        ],
        fitTitle: "¿Es esta lámina adecuada para tu hijo?",
        fitYesTitle: "Esta lámina encaja si:",
        fitYes: [
          "Tu hijo ya ha probado dibujos sencillos y grandes",
          "Le gusta utilizar varios colores en un mismo dibujo",
          "Empieza a fijarse en las zonas pequeñas por separado",
          "Las láminas más sencillas, con grandes zonas abiertas, ya le parecen demasiado fáciles",
        ],
        fitNoTitle: "La lámina puede resultar todavía difícil si:",
        fitNo: [
          "Tu hijo coge la cera por primera vez y solo hace trazos amplios",
          "Todavía le cuesta trabajar con zonas pequeñas por separado",
          "Se maneja mejor con una zona grande y abierta. En ese caso, puede empezar por la lámina gratuita del elefante o del león y volver a la mariposa más adelante",
        ],
        themeTitle: "La mariposa es uno de los {n} animales del libro",
        themeLead:
          "Esta lámina gratuita pertenece a El Primer Libro de Colorear para Bebés de 1 a 3 Años, ISBN 978-1-963328-20-2. La mariposa forma parte del tema de los animales: en el libro hay {n}, y {total} dibujos distintos en total.",
        themeFreeMark: "gratis en esta página",
        pickLead:
          "En el libro hay dibujos muy sencillos y grandes para los primeros intentos y otros con más zonas separadas. Cada página tiene un dibujo y una palabra debajo que también se puede colorear. Tiene 114 páginas y un formato de 21,6 x 27,9 cm. Los dibujos están hechos a mano y ninguno se repite. El libro ha recibido cinco estrellas de Readers' Favorite.",
        pickTitle: "El libro del que sale esta página",
        pickPoints: [],
        faq: [
          {
            q: "¿De verdad se puede imprimir gratis esta mariposa para colorear?",
            a: "Sí. Se puede imprimir sin registro, sin correo electrónico y sin pagar. Hay dos tamaños disponibles: A4 y Carta.",
          },
          {
            q: "¿Le viene bien esta mariposa a un niño de dos años?",
            a: "Depende de cómo colorea ahora mismo. Si está empezando, puede colorear cada ala entera sin preocuparse por las zonas interiores. Si ya se maneja bien con zonas pequeñas, puede utilizar un color distinto para cada una.",
          },
          {
            q: "¿Hay que pintar las zonas de las alas de colores distintos?",
            a: "No. Cada ala se puede pintar de un solo color. Más adelante se puede imprimir la misma lámina otra vez y colorear las distintas zonas por separado.",
          },
          {
            q: "¿Por qué la mariposa es más difícil que el elefante o el león?",
            a: "Las alas de la mariposa están divididas en más zonas separadas. El elefante y el león tienen zonas grandes y continuas, por lo que resultan más sencillos para empezar.",
          },
          {
            q: "¿Hay láminas gratuitas más sencillas?",
            a: "Sí. Entre las diez páginas gratuitas hay dibujos con zonas más grandes y abiertas. El elefante o el león son un buen punto de partida.",
          },
        ],
      },
    },
  },

  /* --------------------------------------------------------------
     Слон. Самая большая сплошная площадь из десяти листов, самый
     первый лист набора.
     -------------------------------------------------------------- */
  {
    id: "elephant-toddler",
    published: "2026-09-08",
    updated: "2026-09-08",
    single: true,
    themeId: "land",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    fromBookIdRu: "first-coloring-book-111-ru",
    slug: {
      en: "elephant-coloring-page-for-toddlers",
      es: "dibujo-de-elefante-para-colorear-ninos-pequenos",
      ru: "raskraska-slon-dlya-malyshey",
    },
    groups: [
      {
        id: "sheet",
        title: { en: "", es: "", ru: "" },
        sheets: [S("elephant", "Elephant", "Elefante", "Слон")],
      },
    ],
    copy: {
      ru: {
        title: "Раскраска слон для малышей 1-3 лет - распечатать бесплатно",
        lead:
          "Крупная раскраска со слоном для малышей: один слон без фона, толстый контур и слово «СЛОН» под картинкой, которое тоже можно раскрасить. Это настоящая страница из изданной книги. Можно бесплатно распечатать на Letter или A4 без регистрации.",
        body: [
          "У слона самая большая сплошная область среди десяти бесплатных раскрасок. Большое туловище, круглое ухо и хобот занимают почти весь рисунок, поэтому здесь много места для широких движений мелком.",
          "Мелких участков почти нет. Ребенку, который только начинает раскрашивать, не приходится работать с множеством небольших деталей. Можно закрасить слона целиком одним цветом или выбрать отдельный цвет для большого уха.",
          "Основной контур имеет толщину 2,4-4,8 мм, а слон занимает примерно 70-82 % страницы и расположен по центру. Вокруг нет фона, травы, деревьев, рамки и других предметов, только один крупный слон.",
          "Под рисунком крупными контурными буквами написано слово «СЛОН». Его тоже можно раскрасить, а взрослый может назвать изображение вслух и показать ребенку написанное слово.",
        ],
        howTo: [
          "Выберите Letter или A4 в зависимости от бумаги вашего принтера",
          "Для большой открытой области особенно удобны толстые восковые мелки",
          "Если ребенок раскрашивает фломастерами, подложите дополнительный лист бумаги",
          "Можно распечатать несколько экземпляров и попробовать разные цвета",
        ],
        fitTitle: "Подойдет ли эта раскраска вашему ребенку?",
        fitYesTitle: "Раскраска подходит, если:",
        fitYes: [
          "Ребенок впервые берет в руки мелки или карандаши",
          "Это одна из его первых раскрасок",
          "Он пока раскрашивает широкими движениями и часто выходит за контур",
          "Ему проще большая сплошная область, чем множество небольших деталей",
        ],
        fitNoTitle: "Раскраска может быть слишком простой, если:",
        fitNo: [
          "Ребенок уже уверенно раскрашивает небольшие участки внутри контура",
          "Он сам просит картинки с большим количеством деталей",
          "Ему интереснее раскрашивать рисунки с несколькими отдельными областями",
          "Он предпочитает рисовать самостоятельно",
        ],
        themeTitle: "Слон - один из {n} животных книги",
        themeLead:
          "Эта бесплатная раскраска взята из книги «Первая книга-раскраска для малышей от 1 до 3 лет», ISBN 978-1-963328-36-3. Слон входит в тему животных: в книге их {n}, а всего в ней {total} разных рисунков.",
        themeFreeMark: "бесплатно на этой странице",
        pickLead:
          "В книге сохраняется тот же принцип: один крупный рисунок на странице, толстый контур и слово крупными контурными буквами под картинкой. Всего 114 страниц, формат 21,6 x 27,9 см. Рисунки нарисованы от руки и не повторяются. Книга получила оценку пять звезд от Readers' Favorite.",
        pickTitle: "Книга, из которой этот лист",
        pickPoints: [],
        faq: [
          {
            q: "Можно ли распечатать раскраску со слоном бесплатно?",
            a: "Да. Этот лист можно бесплатно распечатать без регистрации, электронной почты и оплаты. Доступны размеры Letter и A4.",
          },
          {
            q: "Подойдет ли раскраска со слоном ребенку 1 года?",
            a: "Если ребенок уже берет мелок и оставляет им следы на бумаге, можно попробовать. В этом возрасте не нужно ожидать, что он будет аккуратно раскрашивать внутри контура. Большая открытая область позволяет просто делать первые широкие движения поверх рисунка.",
          },
          {
            q: "Подойдет ли раскраска со слоном ребенку 2 лет?",
            a: "Да, особенно если ребенок только начинает раскрашивать. У слона большая сплошная область и почти нет мелких деталей, поэтому ему не приходится работать с множеством небольших участков.",
          },
          {
            q: "С какой из десяти бесплатных раскрасок лучше начать?",
            a: "Если ребенку проще большие открытые области, слон один из самых простых вариантов. Среди десяти бесплатных листов у него самая большая сплошная область.",
          },
          {
            q: "Есть ли еще бесплатные раскраски для малышей?",
            a: "Да. На сайте бесплатно доступны десять настоящих страниц из этой же книги. Всего в книге 111 разных рисунков.",
          },
        ],
      },
      en: {
        title: "Elephant coloring page for toddlers ages 1-3, free to print",
        lead:
          "A big elephant coloring page for toddlers: one elephant with no background, a thick outline, and the word ELEPHANT underneath that can be colored too. It is a real page from a printed book. Free to print in US Letter or A4, with no sign-up.",
        body: [
          "The elephant has the largest solid area of all ten free pages. The big body, the round ear and the trunk take up almost the whole drawing, so there is plenty of room for wide strokes.",
          "There is almost nothing small to work around. A child who is just starting to color does not have to deal with a lot of little parts. The elephant can be filled with one color, or the big ear can take a color of its own.",
          "The main outline measures 2.4 to 4.8 mm, and the elephant fills roughly 70 to 82 percent of the page and sits in the center. There is no background, no grass, no trees and no frame around it, only one large elephant.",
          "Under the picture is the word ELEPHANT in large outline letters. It can be colored too, and an adult can say the word out loud and point to it while the child colors.",
        ],
        howTo: [
          "Choose Letter or A4, whichever your printer takes",
          "Thick crayons are the easiest thing for one big open area",
          "If your child uses markers, slip a spare sheet underneath",
          "Print a few copies and try different colors",
        ],
        fitTitle: "Is this page right for your child?",
        fitYesTitle: "It is a good fit if:",
        fitYes: [
          "Your child is picking up crayons or pencils for the first time",
          "This is one of their first coloring pages",
          "They still color with wide strokes and often go outside the line",
          "One large solid area is easier for them than a lot of small parts",
        ],
        fitNoTitle: "The page may be too simple if:",
        fitNo: [
          "Your child already colors small areas confidently inside the line",
          "They ask for pictures with more detail",
          "They would rather color drawings made of several separate areas",
          "They would rather draw a picture themselves",
        ],
        themeTitle: "The elephant is one of {n} animals in the book",
        themeLead:
          "This free page comes from First Coloring Book for Toddlers Ages 1-3, ISBN 978-1-963328-27-1. The elephant belongs to the animal theme: the book has {n} of them, and {total} different pictures in all.",
        themeFreeMark: "free on this page",
        pickLead:
          "The same principle runs through the book: one large picture per page, a thick outline, and the word underneath in large outline letters. 114 pages, 8.5 x 11 inches. Every picture is drawn by hand and none is repeated. The book has a five star review from Readers' Favorite.",
        pickTitle: "The book this page comes from",
        pickPoints: [],
        faq: [
          {
            q: "Is this elephant coloring page really free to print?",
            a: "Yes. No account, no email and no payment. Two sizes are available, Letter and A4.",
          },
          {
            q: "Is this elephant page right for a one year old?",
            a: "If your child already holds a crayon and leaves marks on paper, it is worth a try. At this age there is no need to expect neat coloring inside the line. One big open area lets them simply make their first wide strokes across the picture.",
          },
          {
            q: "Is this elephant page right for a two year old?",
            a: "Yes, especially if your child is just starting to color. The elephant is one large solid area with almost no small parts, so there is nothing fiddly to work around.",
          },
          {
            q: "Which of the ten free pages should we start with?",
            a: "If large open areas are easier for your child, the elephant is one of the simplest. It has the largest solid area of the ten free pages.",
          },
          {
            q: "Are there more free coloring pages for toddlers?",
            a: "Yes. Ten real pages from the same book are free to print on this site. The book itself holds 111 different pictures.",
          },
        ],
      },
      es: {
        title: "Elefante para colorear para niños de 1 a 3 años - imprimir gratis",
        lead:
          "Un elefante grande para colorear, pensado para los más pequeños: un solo elefante sin fondo, contorno grueso y la palabra ELEFANTE debajo, que también se puede colorear. Esta lámina pertenece a un libro publicado y se puede imprimir gratis en A4 o Carta, sin registro.",
        body: [
          "El elefante tiene la zona continua más grande de las diez láminas gratuitas. El cuerpo, la oreja redonda y la trompa ocupan casi todo el dibujo, así que hay mucho espacio para colorear con trazos amplios.",
          "Casi no hay partes pequeñas. Un niño que empieza a colorear no tiene que trabajar con muchos detalles a la vez. Puede pintar el elefante entero de un solo color o elegir otro color para la oreja grande.",
          "El contorno principal mide entre 2,4 y 4,8 mm. El elefante ocupa aproximadamente entre el 70 % y el 82 % de la página y está centrado. Alrededor no hay fondo, hierba, árboles ni marco: solo un elefante grande.",
          "Debajo del dibujo aparece la palabra ELEFANTE en letras grandes de contorno. También se puede colorear, y el adulto puede decir la palabra en voz alta y señalarla mientras el niño colorea.",
        ],
        howTo: [
          "Elige A4 o Carta según el papel de tu impresora",
          "Para las zonas grandes y abiertas van especialmente bien las ceras gruesas",
          "Si el niño usa rotuladores, pon una hoja de papel debajo",
          "Puedes imprimir varias copias y probar colores distintos",
        ],
        fitTitle: "¿Es esta lámina adecuada para tu hijo?",
        fitYesTitle: "Esta lámina encaja si:",
        fitYes: [
          "Tu hijo coge las ceras o los lápices por primera vez",
          "Es una de sus primeras láminas para colorear",
          "Todavía colorea con trazos amplios y se sale del contorno a menudo",
          "Una zona grande y continua le resulta más fácil que muchas partes pequeñas",
        ],
        fitNoTitle: "La lámina puede quedarse corta si:",
        fitNo: [
          "Ya colorea con seguridad zonas pequeñas dentro del contorno",
          "Pide dibujos con más detalles",
          "Prefiere dibujos formados por varias zonas separadas",
          "Prefiere dibujar él mismo",
        ],
        themeTitle: "El elefante es uno de los {n} animales del libro",
        themeLead:
          "Esta lámina gratuita pertenece a El Primer Libro de Colorear para Bebés de 1 a 3 Años, ISBN 978-1-963328-20-2. El elefante forma parte del tema de los animales: en el libro hay {n}, y {total} dibujos distintos en total.",
        themeFreeMark: "gratis en esta página",
        pickLead:
          "El libro sigue el mismo principio: un dibujo grande por página, contorno grueso y una palabra debajo en letras grandes de contorno que también se puede colorear. Tiene 114 páginas y un formato de 21,6 x 27,9 cm. Todos los dibujos están hechos a mano y ninguno se repite. El libro ha recibido cinco estrellas de Readers' Favorite.",
        pickTitle: "El libro del que sale esta página",
        pickPoints: [],
        faq: [
          {
            q: "¿De verdad se puede imprimir gratis este elefante para colorear?",
            a: "Sí. Se puede imprimir sin registro, sin correo electrónico y sin pagar. Hay dos tamaños disponibles: A4 y Carta.",
          },
          {
            q: "¿Le viene bien este elefante a un niño de un año?",
            a: "Si ya coge la cera y empieza a hacer sus primeros trazos sobre el papel, se puede probar. A esta edad no hay que esperar que coloree con cuidado dentro del contorno. La gran zona abierta del dibujo permite hacer trazos amplios sin tener que trabajar con pequeños detalles.",
          },
          {
            q: "¿Le viene bien este elefante a un niño de dos años?",
            a: "Sí, sobre todo si está empezando a colorear. El elefante tiene una gran zona continua y casi no hay partes pequeñas, por lo que resulta más sencillo para los primeros intentos.",
          },
          {
            q: "¿Con cuál de las diez láminas gratuitas conviene empezar?",
            a: "Si a tu hijo le resultan más fáciles las zonas grandes y abiertas, el elefante es una de las opciones más sencillas. Entre las diez láminas gratuitas, es el dibujo con la zona continua más grande.",
          },
          {
            q: "¿Hay más láminas gratuitas para los más pequeños?",
            a: "Sí. En esta web hay diez páginas del mismo libro que se pueden imprimir gratis. El libro completo reúne 111 dibujos distintos.",
          },
        ],
      },
    },
  },

  /* --------------------------------------------------------------
     Жираф. Единственный лист, где мелкие участки разбросаны по
     всему рисунку.
     -------------------------------------------------------------- */
  {
    id: "giraffe-toddler",
    published: "2026-09-08",
    updated: "2026-09-08",
    single: true,
    themeId: "land",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    fromBookIdRu: "first-coloring-book-111-ru",
    slug: {
      en: "giraffe-coloring-page-for-toddlers",
      es: "dibujo-de-jirafa-para-colorear-ninos-pequenos",
      ru: "raskraska-zhiraf-dlya-malyshey",
    },
    groups: [
      {
        id: "sheet",
        title: { en: "", es: "", ru: "" },
        sheets: [S("giraffe", "Giraffe", "Jirafa", "Жираф")],
      },
    ],
    copy: {
      ru: {
        title: "Раскраска жираф для малышей 1-3 лет - распечатать бесплатно",
        lead:
          "Крупная раскраска с жирафом для малышей: один жираф без фона, толстый контур и слово «ЖИРАФ» под картинкой, которое тоже можно раскрасить. Это настоящая страница из изданной книги. Можно бесплатно распечатать на Letter или A4 без регистрации.",
        body: [
          "Жираф покрыт пятнами, и их довольно много. Это единственная из десяти бесплатных раскрасок, где небольшие участки расположены по всему рисунку, а не собраны в одном месте.",
          "Раскрашивать каждое пятно отдельно необязательно. Ребенок, который только начинает, может закрасить жирафа целиком одним цветом, не обращая внимания на пятна. Позже этот же лист можно распечатать снова и попробовать раскрасить пятна отдельно.",
          "Шея и ноги у жирафа узкие, поэтому они требуют более точных движений, чем крупные области на слоне или медведе. Это делает жирафа хорошим следующим шагом после самых простых раскрасок.",
          "Основной контур имеет толщину 2,4-4,8 мм, а жираф занимает примерно 70-82 % страницы и расположен по центру. Вокруг нет фона, деревьев, рамки и других предметов.",
          "Под рисунком крупными контурными буквами написано слово «ЖИРАФ». Его тоже можно раскрасить, а взрослый может назвать изображение вслух и показать ребенку написанное слово.",
        ],
        howTo: [
          "Выберите Letter или A4 в зависимости от бумаги вашего принтера",
          "Для крупных областей удобны толстые восковые мелки",
          "Пятна необязательно раскрашивать по отдельности",
          "Для отдельных пятен можно использовать цветные карандаши",
          "При использовании фломастеров подложите дополнительный лист бумаги",
        ],
        fitTitle: "Подойдет ли эта раскраска вашему ребенку?",
        fitYesTitle: "Раскраска подходит, если:",
        fitYes: [
          "Ребенок уже пробовал раскрашивать простые крупные картинки",
          "Ему нравится использовать несколько цветов в одном рисунке",
          "Он начинает интересоваться небольшими отдельными участками",
          "Вы хотите рисунок, который позже можно распечатать снова и раскрасить более подробно",
        ],
        fitNoTitle: "Раскраска может быть пока слишком сложной, если:",
        fitNo: [
          "Ребенок впервые берет мелок и раскрашивает только широкими движениями",
          "Ему пока трудно раскрашивать узкие участки",
          "Ему проще работать с одной большой открытой областью. В таком случае можно сначала попробовать бесплатную раскраску со слоном или медведем, а к жирафу вернуться позже",
        ],
        themeTitle: "Жираф - один из {n} животных книги",
        themeLead:
          "Эта бесплатная раскраска взята из книги «Первая книга-раскраска для малышей от 1 до 3 лет», ISBN 978-1-963328-36-3. Жираф входит в тему животных: в книге их {n}, а всего в ней {total} разных рисунков.",
        themeFreeMark: "бесплатно на этой странице",
        pickLead:
          "В книге есть как совсем простые крупные картинки для первых попыток, так и рисунки с большим количеством отдельных участков. На каждой странице один рисунок и слово под ним, которое тоже можно раскрасить. Всего 114 страниц, формат 21,6 x 27,9 см. Рисунки нарисованы от руки и не повторяются. Книга получила оценку пять звезд от Readers' Favorite.",
        pickTitle: "Книга, из которой этот лист",
        pickPoints: [],
        faq: [
          {
            q: "Можно ли распечатать раскраску с жирафом бесплатно?",
            a: "Да. Этот лист можно бесплатно распечатать без регистрации, электронной почты и оплаты. Доступны размеры Letter и A4.",
          },
          {
            q: "Нужно ли раскрашивать пятна отдельно?",
            a: "Нет. Жирафа можно закрасить целиком, не выделяя каждое пятно. Позже этот же лист можно распечатать снова и попробовать раскрасить пятна другим цветом.",
          },
          {
            q: "Подойдет ли раскраска с жирафом ребенку 2 лет?",
            a: "Да. Если ребенок только начинает, необязательно раскрашивать каждое пятно отдельно. Жирафа можно закрасить целиком, а к пятнам и узким участкам вернуться позже.",
          },
          {
            q: "Почему жираф немного сложнее слона или медведя?",
            a: "У жирафа много отдельных пятен, а шея и ноги довольно узкие. Слон и медведь состоят в основном из более крупных открытых областей, поэтому с них проще начинать.",
          },
          {
            q: "Есть ли более простые бесплатные раскраски?",
            a: "Да. Среди десяти бесплатных страниц есть рисунки с крупными открытыми областями. Например, можно начать со слона или медведя.",
          },
        ],
      },
      en: {
        title: "Giraffe coloring page for toddlers ages 1-3, free to print",
        lead:
          "A big giraffe coloring page for toddlers: one giraffe with no background, a thick outline, and the word GIRAFFE underneath that can be colored too. It is a real page from a printed book. Free to print in US Letter or A4, with no sign-up.",
        body: [
          "The giraffe is covered in spots, and there are quite a few of them. It is the only one of the ten free pages where the small areas are spread across the whole drawing instead of sitting in one place.",
          "There is no need to color each spot on its own. A child who is just starting can fill the giraffe with one color and pay no attention to the spots. Later the same page can be printed again and the spots colored separately.",
          "The neck and the legs are narrow, so they call for steadier movements than the large areas on the elephant or the bear. That makes the giraffe a good next step after the simplest pages.",
          "The main outline measures 2.4 to 4.8 mm, and the giraffe fills roughly 70 to 82 percent of the page and sits in the center. There is no background, no trees, no frame and nothing else around it.",
          "Under the picture is the word GIRAFFE in large outline letters. It can be colored too, and an adult can say the word out loud and point to it while the child colors.",
        ],
        howTo: [
          "Choose Letter or A4, whichever your printer takes",
          "Thick crayons work well on the large areas",
          "The spots do not have to be colored one by one",
          "Colored pencils are handy for the individual spots",
          "If you use markers, slip a spare sheet underneath",
        ],
        fitTitle: "Is this page right for your child?",
        fitYesTitle: "It is a good fit if:",
        fitYes: [
          "Your child has already tried simple, large pictures",
          "They like using several colors in one picture",
          "They are beginning to take an interest in small separate areas",
          "You want a page you can print again later and color in more detail",
        ],
        fitNoTitle: "The page may be too hard for now if:",
        fitNo: [
          "Your child is holding a crayon for the first time and only makes wide strokes",
          "Narrow areas are still difficult for them",
          "One large open area is easier for them. In that case start with the free elephant or bear page and come back to the giraffe later",
        ],
        themeTitle: "The giraffe is one of {n} animals in the book",
        themeLead:
          "This free page comes from First Coloring Book for Toddlers Ages 1-3, ISBN 978-1-963328-27-1. The giraffe belongs to the animal theme: the book has {n} of them, and {total} different pictures in all.",
        themeFreeMark: "free on this page",
        pickLead:
          "The book holds both very simple large pictures for first attempts and drawings with more separate areas. Every page has one picture and a word underneath that can be colored too. 114 pages, 8.5 x 11 inches. The pictures are drawn by hand and none is repeated. The book has a five star review from Readers' Favorite.",
        pickTitle: "The book this page comes from",
        pickPoints: [],
        faq: [
          {
            q: "Is this giraffe coloring page really free to print?",
            a: "Yes. No account, no email and no payment. Two sizes are available, Letter and A4.",
          },
          {
            q: "Do the spots have to be colored separately?",
            a: "No. The giraffe can be filled in without picking out each spot. Later the same page can be printed again and the spots given another color.",
          },
          {
            q: "Is this giraffe page right for a two year old?",
            a: "Yes. If your child is just starting, there is no need to color each spot on its own. They can fill the giraffe in and leave the spots and the narrow areas for later.",
          },
          {
            q: "Why is the giraffe a little harder than the elephant or the bear?",
            a: "The giraffe has many separate spots, and the neck and the legs are fairly narrow. The elephant and the bear are made mostly of larger open areas, which makes them easier to start with.",
          },
          {
            q: "Are there easier free coloring pages?",
            a: "Yes. Among the ten free pages there are drawings with large open areas. The elephant or the bear is a good place to start.",
          },
        ],
      },
      es: {
        title: "Jirafa para colorear para niños de 1 a 3 años - imprimir gratis",
        lead:
          "Una jirafa grande para colorear, pensada para los más pequeños: una sola jirafa sin fondo, contorno grueso y la palabra JIRAFA debajo, que también se puede colorear. Esta lámina pertenece a un libro publicado y se puede imprimir gratis en A4 o Carta, sin registro.",
        body: [
          "La jirafa está cubierta de manchas, y son bastantes. Es la única de las diez láminas gratuitas en la que las zonas pequeñas están repartidas por todo el dibujo en lugar de concentrarse en una sola parte.",
          "No hace falta colorear cada mancha por separado. Un niño que empieza puede pintar la jirafa entera de un solo color sin prestar atención a las manchas. Más adelante se puede imprimir la misma lámina otra vez y probar a colorear las manchas por separado.",
          "El cuello y las patas son estrechos, por lo que requieren movimientos algo más precisos que las zonas grandes del elefante o del oso. Por eso la jirafa puede ser un buen paso después de los dibujos más sencillos.",
          "El contorno principal mide entre 2,4 y 4,8 mm. La jirafa ocupa aproximadamente entre el 70 % y el 82 % de la página y está centrada. Alrededor no hay fondo, árboles, marco ni otros objetos.",
          "Debajo del dibujo aparece la palabra JIRAFA en letras grandes de contorno. También se puede colorear, y el adulto puede decir la palabra en voz alta y señalarla mientras el niño colorea.",
        ],
        howTo: [
          "Elige A4 o Carta según el papel de tu impresora",
          "Para las zonas grandes van bien las ceras gruesas",
          "No hace falta colorear las manchas por separado",
          "Para las manchas se pueden utilizar lápices de colores",
          "Si se usan rotuladores, conviene poner una hoja de papel debajo",
        ],
        fitTitle: "¿Es esta lámina adecuada para tu hijo?",
        fitYesTitle: "Esta lámina encaja si:",
        fitYes: [
          "Tu hijo ya ha probado dibujos sencillos y grandes",
          "Le gusta utilizar varios colores en un mismo dibujo",
          "Empieza a fijarse en zonas pequeñas por separado",
          "Buscas una lámina que pueda volver a colorear más adelante con mayor detalle",
        ],
        fitNoTitle: "La lámina puede resultar todavía difícil si:",
        fitNo: [
          "Tu hijo coge la cera por primera vez y solo hace trazos amplios",
          "Todavía le cuesta colorear zonas estrechas",
          "Se maneja mejor con una sola zona grande y abierta. En ese caso, puede empezar por la lámina gratuita del elefante o del oso y volver a la jirafa más adelante",
        ],
        themeTitle: "La jirafa es uno de los {n} animales del libro",
        themeLead:
          "Esta lámina gratuita pertenece a El Primer Libro de Colorear para Bebés de 1 a 3 Años, ISBN 978-1-963328-20-2. La jirafa forma parte del tema de los animales: en el libro hay {n}, y {total} dibujos distintos en total.",
        themeFreeMark: "gratis en esta página",
        pickLead:
          "En el libro hay dibujos muy sencillos y grandes para los primeros intentos y otros con más zonas separadas. Cada página tiene un dibujo y una palabra debajo que también se puede colorear. Tiene 114 páginas y un formato de 21,6 x 27,9 cm. Los dibujos están hechos a mano y ninguno se repite. El libro ha recibido cinco estrellas de Readers' Favorite.",
        pickTitle: "El libro del que sale esta página",
        pickPoints: [],
        faq: [
          {
            q: "¿De verdad se puede imprimir gratis esta jirafa para colorear?",
            a: "Sí. Se puede imprimir sin registro, sin correo electrónico y sin pagar. Hay dos tamaños disponibles: A4 y Carta.",
          },
          {
            q: "¿Hay que colorear las manchas por separado?",
            a: "No. Se puede colorear la jirafa entera sin diferenciar cada mancha. Más adelante se puede imprimir la misma lámina otra vez y probar a colorear las manchas de otro color.",
          },
          {
            q: "¿Le viene bien esta jirafa a un niño de dos años?",
            a: "Sí. Si está empezando, no hace falta colorear cada mancha por separado. Puede pintar la jirafa entera y dejar las manchas y las zonas estrechas para más adelante.",
          },
          {
            q: "¿Por qué la jirafa es un poco más difícil que el elefante o el oso?",
            a: "La jirafa tiene muchas manchas separadas, y el cuello y las patas son bastante estrechos. El elefante y el oso tienen zonas más grandes y abiertas, por lo que resultan más sencillos para empezar.",
          },
          {
            q: "¿Hay láminas gratuitas más sencillas?",
            a: "Sí. Entre las diez páginas gratuitas hay dibujos con zonas grandes y abiertas. El elefante o el oso son un buen punto de partida.",
          },
        ],
      },
    },
  },

  /* --------------------------------------------------------------
     Медведь. Все части круглые, ни одного узкого места.
     -------------------------------------------------------------- */
  {
    id: "bear-toddler",
    published: "2026-09-08",
    updated: "2026-09-08",
    single: true,
    themeId: "land",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    fromBookIdRu: "first-coloring-book-111-ru",
    slug: {
      en: "bear-coloring-page-for-toddlers",
      es: "dibujo-de-oso-para-colorear-ninos-pequenos",
      ru: "raskraska-medved-dlya-malyshey",
    },
    groups: [
      {
        id: "sheet",
        title: { en: "", es: "", ru: "" },
        sheets: [S("bear", "Bear", "Oso", "Медведь")],
      },
    ],
    copy: {
      ru: {
        title: "Раскраска медведь для малышей 1-3 лет - распечатать бесплатно",
        lead:
          "Крупная раскраска с медведем для малышей: один медведь без фона, толстый контур и слово «МЕДВЕДЬ» под картинкой, которое тоже можно раскрасить. Это настоящая страница из изданной книги. Можно бесплатно распечатать на Letter или A4 без регистрации.",
        body: [
          "Медведь состоит из крупных округлых частей: круглая голова, круглые уши, широкое туловище и большие лапы. Мелких и узких участков почти нет, поэтому крупные части удобно раскрашивать широкими движениями.",
          "Медведь сидит лицом вперед, а левая и правая стороны рисунка почти симметричны. Его можно закрасить целиком одним цветом или выбрать отдельные цвета для ушей и лап.",
          "Основной контур имеет толщину 2,4-4,8 мм, а медведь занимает примерно 70-82 % страницы и расположен по центру. Вокруг нет фона, леса, рамки и других предметов.",
          "Под рисунком крупными контурными буквами написано слово «МЕДВЕДЬ». Его тоже можно раскрасить, а взрослый может назвать изображение вслух и показать ребенку написанное слово.",
        ],
        howTo: [
          "Выберите Letter или A4 в зависимости от бумаги вашего принтера",
          "Для первых попыток удобны толстые восковые мелки",
          "Если ребенок раскрашивает фломастерами, подложите дополнительный лист бумаги",
          "Можно распечатать несколько экземпляров и попробовать разные цвета",
        ],
        fitTitle: "Подойдет ли эта раскраска вашему ребенку?",
        fitYesTitle: "Раскраска подходит, если:",
        fitYes: [
          "Ребенок впервые берет в руки мелки или карандаши",
          "Это одна из его первых раскрасок",
          "Он пока раскрашивает широкими движениями",
          "Ему проще крупные округлые области, чем небольшие и узкие участки",
        ],
        fitNoTitle: "Раскраска может быть слишком простой, если:",
        fitNo: [
          "Ребенок уже уверенно раскрашивает небольшие участки внутри контура",
          "Он сам просит картинки с большим количеством деталей",
          "Ему интереснее раскрашивать рисунки с несколькими небольшими областями",
          "Он предпочитает рисовать самостоятельно",
        ],
        themeTitle: "Медведь - один из {n} животных книги",
        themeLead:
          "Эта бесплатная раскраска взята из книги «Первая книга-раскраска для малышей от 1 до 3 лет», ISBN 978-1-963328-36-3. Медведь входит в тему животных: в книге их {n}, а всего в ней {total} разных рисунков.",
        themeFreeMark: "бесплатно на этой странице",
        pickLead:
          "В книге сохраняется тот же принцип: один крупный рисунок на странице, толстый контур и слово крупными контурными буквами под картинкой. Всего 114 страниц, формат 21,6 x 27,9 см. Рисунки нарисованы от руки и не повторяются. Книга получила оценку пять звезд от Readers' Favorite.",
        pickTitle: "Книга, из которой этот лист",
        pickPoints: [],
        faq: [
          {
            q: "Можно ли распечатать раскраску с медведем бесплатно?",
            a: "Да. Этот лист можно бесплатно распечатать без регистрации, электронной почты и оплаты. Доступны размеры Letter и A4.",
          },
          {
            q: "Подойдет ли раскраска с медведем ребенку 2 лет?",
            a: "Да, особенно если ребенок только начинает раскрашивать. У медведя крупные округлые части и почти нет небольших и узких участков. Его можно закрасить целиком одним цветом.",
          },
          {
            q: "Почему медведь подходит для первых раскрасок?",
            a: "Большую часть рисунка занимают крупные округлые области. На странице нет фона и множества мелких деталей, поэтому ребенку не приходится работать сразу с большим количеством небольших участков.",
          },
          {
            q: "Чем лучше раскрашивать?",
            a: "Для самых маленьких удобны толстые восковые мелки. Цветные карандаши требуют более точных движений руки. При использовании фломастеров лучше подложить дополнительный лист бумаги.",
          },
          {
            q: "Есть ли еще бесплатные раскраски для малышей?",
            a: "Да. На сайте бесплатно доступны десять настоящих страниц из этой же книги. Всего в книге 111 разных рисунков.",
          },
        ],
      },
      en: {
        title: "Bear coloring page for toddlers ages 1-3, free to print",
        lead:
          "A big bear coloring page for toddlers: one bear with no background, a thick outline, and the word BEAR underneath that can be colored too. It is a real page from a printed book. Free to print in US Letter or A4, with no sign-up.",
        body: [
          "The bear is made of large rounded parts: a round head, round ears, a wide body and big paws. There is almost nothing small or narrow, so the large parts take wide strokes comfortably.",
          "The bear is sitting and facing forward, and the left and the right side are nearly the same. It can be filled with one color, or the ears and the paws can take colors of their own.",
          "The main outline measures 2.4 to 4.8 mm, and the bear fills roughly 70 to 82 percent of the page and sits in the center. There is no background, no forest, no frame and nothing else around it.",
          "Under the picture is the word BEAR in large outline letters. It can be colored too, and an adult can say the word out loud and point to it while the child colors.",
        ],
        howTo: [
          "Choose Letter or A4, whichever your printer takes",
          "Thick crayons are easiest for first attempts",
          "If your child uses markers, slip a spare sheet underneath",
          "Print a few copies and try different colors",
        ],
        fitTitle: "Is this page right for your child?",
        fitYesTitle: "It is a good fit if:",
        fitYes: [
          "Your child is picking up crayons or pencils for the first time",
          "This is one of their first coloring pages",
          "They still color with wide strokes",
          "Large rounded areas are easier for them than small, narrow ones",
        ],
        fitNoTitle: "The page may be too simple if:",
        fitNo: [
          "Your child already colors small areas confidently inside the line",
          "They ask for pictures with more detail",
          "They would rather color drawings made of several small areas",
          "They would rather draw a picture themselves",
        ],
        themeTitle: "The bear is one of {n} animals in the book",
        themeLead:
          "This free page comes from First Coloring Book for Toddlers Ages 1-3, ISBN 978-1-963328-27-1. The bear belongs to the animal theme: the book has {n} of them, and {total} different pictures in all.",
        themeFreeMark: "free on this page",
        pickLead:
          "The same principle runs through the book: one large picture per page, a thick outline, and the word underneath in large outline letters. 114 pages, 8.5 x 11 inches. Every picture is drawn by hand and none is repeated. The book has a five star review from Readers' Favorite.",
        pickTitle: "The book this page comes from",
        pickPoints: [],
        faq: [
          {
            q: "Is this bear coloring page really free to print?",
            a: "Yes. No account, no email and no payment. Two sizes are available, Letter and A4.",
          },
          {
            q: "Is this bear page right for a two year old?",
            a: "Yes, especially if your child is just starting to color. The bear is made of large rounded parts with almost nothing small or narrow, and it can be filled with a single color.",
          },
          {
            q: "Why does the bear suit first coloring pages?",
            a: "Most of the drawing is large rounded areas. There is no background and no crowd of small details, so a child does not have to deal with many little areas at once.",
          },
          {
            q: "What is best for coloring it?",
            a: "Thick crayons are easiest for the youngest hands. Colored pencils call for steadier movements. With markers, slip a spare sheet underneath.",
          },
          {
            q: "Are there more free coloring pages for toddlers?",
            a: "Yes. Ten real pages from the same book are free to print on this site. The book itself holds 111 different pictures.",
          },
        ],
      },
      es: {
        title: "Oso para colorear para niños de 1 a 3 años - imprimir gratis",
        lead:
          "Un oso grande para colorear, pensado para los más pequeños: un solo oso sin fondo, contorno grueso y la palabra OSO debajo, que también se puede colorear. Esta lámina pertenece a un libro publicado y se puede imprimir gratis en A4 o Carta, sin registro.",
        body: [
          "El oso está formado por partes grandes y redondeadas: la cabeza redonda, las orejas redondas, un cuerpo ancho y unas patas grandes. Casi no hay zonas pequeñas ni estrechas, por lo que las partes grandes se pueden colorear con trazos amplios.",
          "El oso está sentado de frente, y el lado izquierdo y el derecho son casi simétricos. Se puede pintar entero de un solo color o utilizar colores distintos para las orejas y las patas.",
          "El contorno principal mide entre 2,4 y 4,8 mm. El oso ocupa aproximadamente entre el 70 % y el 82 % de la página y está centrado. Alrededor no hay fondo, bosque, marco ni otros objetos.",
          "Debajo del dibujo aparece la palabra OSO en letras grandes de contorno. También se puede colorear, y el adulto puede decir la palabra en voz alta y señalarla mientras el niño colorea.",
        ],
        howTo: [
          "Elige A4 o Carta según el papel de tu impresora",
          "Para los primeros intentos van mejor las ceras gruesas",
          "Si el niño usa rotuladores, pon una hoja de papel debajo",
          "Puedes imprimir varias copias y probar colores distintos",
        ],
        fitTitle: "¿Es esta lámina adecuada para tu hijo?",
        fitYesTitle: "Esta lámina encaja si:",
        fitYes: [
          "Tu hijo coge las ceras o los lápices por primera vez",
          "Es una de sus primeras láminas para colorear",
          "Todavía colorea con trazos amplios",
          "Las zonas grandes y redondeadas le resultan más fáciles que las partes pequeñas y estrechas",
        ],
        fitNoTitle: "La lámina puede quedarse corta si:",
        fitNo: [
          "Ya colorea con seguridad zonas pequeñas dentro del contorno",
          "Pide dibujos con más detalles",
          "Prefiere dibujos con varias zonas pequeñas separadas",
          "Prefiere dibujar él mismo",
        ],
        themeTitle: "El oso es uno de los {n} animales del libro",
        themeLead:
          "Esta lámina gratuita pertenece a El Primer Libro de Colorear para Bebés de 1 a 3 Años, ISBN 978-1-963328-20-2. El oso forma parte del tema de los animales: en el libro hay {n}, y {total} dibujos distintos en total.",
        themeFreeMark: "gratis en esta página",
        pickLead:
          "El libro sigue el mismo principio: un dibujo grande por página, contorno grueso y una palabra debajo en letras grandes de contorno que también se puede colorear. Tiene 114 páginas y un formato de 21,6 x 27,9 cm. Todos los dibujos están hechos a mano y ninguno se repite. El libro ha recibido cinco estrellas de Readers' Favorite.",
        pickTitle: "El libro del que sale esta página",
        pickPoints: [],
        faq: [
          {
            q: "¿De verdad se puede imprimir gratis este oso para colorear?",
            a: "Sí. Se puede imprimir sin registro, sin correo electrónico y sin pagar. Hay dos tamaños disponibles: A4 y Carta.",
          },
          {
            q: "¿Le viene bien este oso a un niño de dos años?",
            a: "Sí, sobre todo si está empezando a colorear. El oso tiene partes grandes y redondeadas y casi no hay zonas pequeñas ni estrechas. Se puede pintar entero de un solo color.",
          },
          {
            q: "¿Por qué el oso es adecuado para empezar a colorear?",
            a: "La mayor parte del dibujo está formada por zonas grandes y redondeadas. No hay fondo ni muchos detalles pequeños, por lo que el niño no tiene que trabajar con muchas zonas pequeñas a la vez.",
          },
          {
            q: "¿Con qué conviene colorearlo?",
            a: "Para las manos más pequeñas, lo más cómodo son las ceras gruesas. Los lápices de colores requieren movimientos más precisos. Si se usan rotuladores, conviene poner una hoja de papel debajo.",
          },
          {
            q: "¿Hay más láminas gratuitas para los más pequeños?",
            a: "Sí. En esta web hay diez páginas del mismo libro que se pueden imprimir gratis. El libro completo reúne 111 dibujos distintos.",
          },
        ],
      },
    },
  },

  /* --------------------------------------------------------------
     Лиса. Несколько крупных частей, которые сами просятся в разные
     цвета.
     -------------------------------------------------------------- */
  {
    id: "fox-toddler",
    published: "2026-09-08",
    updated: "2026-09-08",
    single: true,
    themeId: "land",
    fromBookId: "first-coloring-book-111-en",
    fromBookIdEs: "first-coloring-book-111-es",
    fromBookIdRu: "first-coloring-book-111-ru",
    slug: {
      en: "fox-coloring-page-for-toddlers",
      es: "dibujo-de-zorro-para-colorear-ninos-pequenos",
      ru: "raskraska-lisa-dlya-malyshey",
    },
    groups: [
      {
        id: "sheet",
        title: { en: "", es: "", ru: "" },
        sheets: [S("fox", "Fox", "Zorro", "Лиса")],
      },
    ],
    copy: {
      ru: {
        title: "Раскраска лиса для малышей 1-3 лет - распечатать бесплатно",
        lead:
          "Крупная раскраска с лисой для малышей: одна лиса без фона, толстый контур и слово «ЛИСА» под картинкой, которое тоже можно раскрасить. Это настоящая страница из изданной книги. Можно бесплатно распечатать на Letter или A4 без регистрации.",
        body: [
          "У лисы несколько крупных частей, которые удобно раскрашивать разными цветами: туловище, большой пушистый хвост и отделенный линией кончик хвоста. Мордочка тоже отделена линией, поэтому ее можно выделить другим цветом.",
          "Такой рисунок подойдет ребенку, который уже пробует использовать несколько цветов, но пока предпочитает крупные области без множества мелких деталей. Отдельных частей здесь немного, и все они достаточно крупные.",
          "При этом лису можно раскрасить целиком одним цветом, отдельные части необязательно выделять. Позже этот же лист можно распечатать снова и попробовать другое сочетание цветов.",
          "Основной контур имеет толщину 2,4-4,8 мм, а лиса занимает примерно 70-82 % страницы и расположена по центру. Вокруг нет фона, леса, рамки и других предметов.",
          "Под рисунком крупными контурными буквами написано слово «ЛИСА». Его тоже можно раскрасить, а взрослый может назвать изображение вслух и показать ребенку написанное слово.",
        ],
        howTo: [
          "Выберите Letter или A4 в зависимости от бумаги вашего принтера",
          "Для первых попыток удобны толстые восковые мелки",
          "Отдельные части необязательно раскрашивать разными цветами",
          "Если ребенок раскрашивает фломастерами, подложите дополнительный лист бумаги",
          "Можно распечатать два экземпляра и попробовать разные сочетания цветов",
        ],
        fitTitle: "Подойдет ли эта раскраска вашему ребенку?",
        fitYesTitle: "Раскраска подходит, если:",
        fitYes: [
          "Ребенку 1-3 года или он старше, но только начинает раскрашивать",
          "Он пока часто выходит за контур",
          "Он начинает использовать несколько цветов в одном рисунке",
          "Ему проще несколько крупных областей, чем множество мелких деталей",
        ],
        fitNoTitle: "Раскраска может быть слишком простой, если:",
        fitNo: [
          "Ребенок уже уверенно раскрашивает небольшие участки внутри контура",
          "Он просит более подробные рисунки с большим количеством деталей",
          "Ему интереснее раскрашивать сложные картинки с фоном и несколькими объектами",
          "Он предпочитает рисовать самостоятельно",
        ],
        themeTitle: "Лиса - один из {n} животных книги",
        themeLead:
          "Эта бесплатная раскраска взята из книги «Первая книга-раскраска для малышей от 1 до 3 лет», ISBN 978-1-963328-36-3. Лиса входит в тему животных: в книге их {n}, а всего в ней {total} разных рисунков.",
        themeFreeMark: "бесплатно на этой странице",
        pickLead:
          "В книге сохраняется тот же принцип: один крупный рисунок на странице, толстый контур и слово крупными контурными буквами под картинкой. Всего 114 страниц, формат 21,6 x 27,9 см. Рисунки нарисованы от руки и не повторяются. Книга получила оценку пять звезд от Readers' Favorite.",
        pickTitle: "Книга, из которой этот лист",
        pickPoints: [],
        faq: [
          {
            q: "Можно ли распечатать раскраску с лисой бесплатно?",
            a: "Да. Этот лист можно бесплатно распечатать без регистрации, электронной почты и оплаты. Доступны размеры Letter и A4.",
          },
          {
            q: "Подойдет ли раскраска с лисой ребенку 2 лет?",
            a: "Да. В рисунке немного отдельных частей, и все они достаточно крупные. Если ребенок только начинает, лису можно закрасить целиком одним цветом.",
          },
          {
            q: "Обязательно ли раскрашивать кончик хвоста другим цветом?",
            a: "Нет. Это только один из вариантов. Лису можно раскрасить целиком одним цветом или использовать разные цвета для туловища, хвоста, его кончика и мордочки.",
          },
          {
            q: "Почему эта раскраска подходит для нескольких цветов?",
            a: "Туловище, хвост, кончик хвоста и мордочка разделены линиями на несколько крупных областей. Их можно раскрасить разными цветами, не работая с множеством мелких деталей.",
          },
          {
            q: "Есть ли еще бесплатные раскраски для малышей?",
            a: "Да. На сайте бесплатно доступны десять настоящих страниц из этой же книги. Всего в книге 111 разных рисунков.",
          },
        ],
      },
      en: {
        title: "Fox coloring page for toddlers ages 1-3, free to print",
        lead:
          "A big fox coloring page for toddlers: one fox with no background, a thick outline, and the word FOX underneath that can be colored too. It is a real page from a printed book. Free to print in US Letter or A4, with no sign-up.",
        body: [
          "The fox has several large parts that take colors of their own: the body, the big bushy tail, and the tip of the tail, which is marked off by a line. The muzzle is outlined as well, so it can be given another color.",
          "That suits a child who is starting to use more than one color but still does better with large areas and few small details. There are only a handful of separate parts here, and all of them are big.",
          "The fox can also be filled with a single color, there is no need to pick out the parts. Later the same page can be printed again and tried with a different combination.",
          "The main outline measures 2.4 to 4.8 mm, and the fox fills roughly 70 to 82 percent of the page and sits in the center. There is no background, no forest, no frame and nothing else around it.",
          "Under the picture is the word FOX in large outline letters. It can be colored too, and an adult can say the word out loud and point to it while the child colors.",
        ],
        howTo: [
          "Choose Letter or A4, whichever your printer takes",
          "Thick crayons are easiest for first attempts",
          "The separate parts do not have to be different colors",
          "If your child uses markers, slip a spare sheet underneath",
          "Print two copies and try different color combinations",
        ],
        fitTitle: "Is this page right for your child?",
        fitYesTitle: "It is a good fit if:",
        fitYes: [
          "Your child is 1 to 3, or older and just starting to color",
          "They still go outside the line often",
          "They are beginning to use several colors in one picture",
          "A few large areas are easier for them than a lot of small detail",
        ],
        fitNoTitle: "The page may be too simple if:",
        fitNo: [
          "Your child already colors small areas confidently inside the line",
          "They ask for more detailed drawings",
          "They would rather color busier pictures with a background and several objects",
          "They would rather draw a picture themselves",
        ],
        themeTitle: "The fox is one of {n} animals in the book",
        themeLead:
          "This free page comes from First Coloring Book for Toddlers Ages 1-3, ISBN 978-1-963328-27-1. The fox belongs to the animal theme: the book has {n} of them, and {total} different pictures in all.",
        themeFreeMark: "free on this page",
        pickLead:
          "The same principle runs through the book: one large picture per page, a thick outline, and the word underneath in large outline letters. 114 pages, 8.5 x 11 inches. Every picture is drawn by hand and none is repeated. The book has a five star review from Readers' Favorite.",
        pickTitle: "The book this page comes from",
        pickPoints: [],
        faq: [
          {
            q: "Is this fox coloring page really free to print?",
            a: "Yes. No account, no email and no payment. Two sizes are available, Letter and A4.",
          },
          {
            q: "Is this fox page right for a two year old?",
            a: "Yes. There are only a few separate parts and all of them are large. If your child is just starting, the fox can be filled with a single color.",
          },
          {
            q: "Does the tip of the tail have to be a different color?",
            a: "No. That is only one option. The fox can be filled with one color, or the body, the tail, its tip and the muzzle can each take their own.",
          },
          {
            q: "Why does this page work well for several colors?",
            a: "The body, the tail, the tip of the tail and the muzzle are marked off by lines into a few large areas. They can each take a different color without any small detail to work around.",
          },
          {
            q: "Are there more free coloring pages for toddlers?",
            a: "Yes. Ten real pages from the same book are free to print on this site. The book itself holds 111 different pictures.",
          },
        ],
      },
      es: {
        title: "Zorro para colorear para niños de 1 a 3 años - imprimir gratis",
        lead:
          "Un zorro grande para colorear, pensado para los más pequeños: un solo zorro sin fondo, contorno grueso y la palabra ZORRO debajo, que también se puede colorear. Esta lámina pertenece a un libro publicado y se puede imprimir gratis en A4 o Carta, sin registro.",
        body: [
          "El zorro tiene varias partes grandes que se pueden colorear con colores distintos: el cuerpo, la cola grande y esponjosa y la punta de la cola, separada por una línea. El hocico también está delimitado, por lo que se puede colorear de otro tono.",
          "Esta distribución resulta adecuada para un niño que ya empieza a utilizar varios colores, pero todavía se maneja mejor con zonas grandes y pocos detalles pequeños. Hay pocas partes separadas y todas son bastante grandes.",
          "También se puede pintar el zorro entero de un solo color: no es necesario diferenciar cada parte. Más adelante se puede imprimir la misma lámina otra vez y probar otra combinación de colores.",
          "El contorno principal mide entre 2,4 y 4,8 mm. El zorro ocupa aproximadamente entre el 70 % y el 82 % de la página y está centrado. Alrededor no hay fondo, bosque, marco ni otros objetos.",
          "Debajo del dibujo aparece la palabra ZORRO en letras grandes de contorno. También se puede colorear, y el adulto puede decir la palabra en voz alta y señalarla mientras el niño colorea.",
        ],
        howTo: [
          "Elige A4 o Carta según el papel de tu impresora",
          "Para los primeros intentos van bien las ceras gruesas",
          "No hace falta colorear cada parte de un color distinto",
          "Si el niño usa rotuladores, pon una hoja de papel debajo",
          "Puedes imprimir dos copias y probar distintas combinaciones de colores",
        ],
        fitTitle: "¿Es esta lámina adecuada para tu hijo?",
        fitYesTitle: "Esta lámina encaja si:",
        fitYes: [
          "Tu hijo tiene entre 1 y 3 años, o es mayor y empieza ahora a colorear",
          "Todavía se sale del contorno a menudo",
          "Empieza a utilizar varios colores en un mismo dibujo",
          "Se maneja mejor con unas pocas zonas grandes que con muchos detalles pequeños",
        ],
        fitNoTitle: "La lámina puede quedarse corta si:",
        fitNo: [
          "Ya colorea con seguridad zonas pequeñas dentro del contorno",
          "Pide dibujos más detallados",
          "Prefiere dibujos más complejos, con fondo y varios objetos",
          "Prefiere dibujar él mismo",
        ],
        themeTitle: "El zorro es uno de los {n} animales del libro",
        themeLead:
          "Esta lámina gratuita pertenece a El Primer Libro de Colorear para Bebés de 1 a 3 Años, ISBN 978-1-963328-20-2. El zorro forma parte del tema de los animales: en el libro hay {n}, y {total} dibujos distintos en total.",
        themeFreeMark: "gratis en esta página",
        pickLead:
          "El libro sigue el mismo principio: un dibujo grande por página, contorno grueso y una palabra debajo en letras grandes de contorno que también se puede colorear. Tiene 114 páginas y un formato de 21,6 x 27,9 cm. Todos los dibujos están hechos a mano y ninguno se repite. El libro ha recibido cinco estrellas de Readers' Favorite.",
        pickTitle: "El libro del que sale esta página",
        pickPoints: [],
        faq: [
          {
            q: "¿De verdad se puede imprimir gratis este zorro para colorear?",
            a: "Sí. Se puede imprimir sin registro, sin correo electrónico y sin pagar. Hay dos tamaños disponibles: A4 y Carta.",
          },
          {
            q: "¿Le viene bien este zorro a un niño de dos años?",
            a: "Sí. El dibujo tiene pocas partes separadas y todas son bastante grandes. Si está empezando, puede pintar el zorro entero de un solo color.",
          },
          {
            q: "¿Hay que pintar la punta de la cola de otro color?",
            a: "No. Es solo una posibilidad. Se puede pintar el zorro entero de un solo color o utilizar colores distintos para el cuerpo, la cola, la punta y el hocico.",
          },
          {
            q: "¿Por qué esta lámina permite utilizar varios colores fácilmente?",
            a: "El cuerpo, la cola, la punta de la cola y el hocico están separados por líneas y forman varias zonas grandes. Se pueden utilizar distintos colores sin tener que trabajar con muchos detalles pequeños.",
          },
          {
            q: "¿Hay más láminas gratuitas para los más pequeños?",
            a: "Sí. En esta web hay diez páginas del mismo libro que se pueden imprimir gratis. El libro completo reúne 111 dibujos distintos.",
          },
        ],
      },
    },
  },

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
    /* Ровно десять листов, и это те десять, которые ищут чаще всего.
       На тематические группы не делим: человек пришел за бесплатными
       страницами, и они идут одним рядом, без перегородок. Порядок
       внутри ряда по силе запроса.
       Кошка и заяц из набора убраны по решению издателя. */
    groups: [
      {
        id: "all",
        title: { en: "", es: "", ru: "" },
        sheets: [
          S("unicorn", "Unicorn", "Unicornio", "Единорог"),
          S("mermaid", "Mermaid", "Sirena", "Русалка"),
          S("fairy", "Fairy", "Hada", "Фея"),
          S("butterfly", "Butterfly", "Mariposa", "Бабочка"),
          S("dog", "Dog", "Perro", "Собака"),
          S("lion", "Lion", "León", "Лев"),
          S("elephant", "Elephant", "Elefante", "Слон"),
          S("giraffe", "Giraffe", "Jirafa", "Жираф"),
          S("bear", "Bear", "Oso", "Медведь"),
          S("fox", "Fox", "Zorro", "Лиса"),
        ],
      },
    ],
    copy: {
      en: {
        title:
          "10 free printable coloring pages for toddlers ages 1-3. Big pictures, thick lines, easy to color",
        lead:
          "Hand drawn for a child's first coloring book. One animal per page, thick outlines, and the word underneath can be colored too.",
        body: [
          "At two, most children sweep the crayon rather than fill. Thick lines forgive that. The color lands roughly inside, the picture is still recognizable, and the child feels it worked. That is the difference between a page a toddler finishes and a page they abandon.",
          "These ten sheets are real pages from our printed book, not filler drawn for a website. Each one was drawn by hand for children aged one to three: one animal, centered, nothing small in the corners, plenty of open space to fill.",
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
        pickLead: "If your child liked these ten, there are 111 in the book they came from.",
        pickTitle: "The book these pages come from",
        pickPoints: [
          "111 hand drawn pictures with thick lines",
          "One drawing per page, nothing small in the corners",
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
          "10 dibujos para colorear gratis para imprimir, niños de 1 a 3 años. Dibujos grandes, trazos gruesos, fáciles de colorear",
        lead:
          "Dibujados a mano para el primer libro para colorear de un niño. Un animal por página, contornos gruesos, y la palabra de abajo también se puede colorear.",
        body: [
          "A los dos años, la mayoría de los niños barre con el crayón en lugar de rellenar. Los trazos gruesos perdonan eso. El color cae más o menos dentro, el dibujo se sigue reconociendo, y el niño siente que le salió. Ahí está la diferencia entre una página que se termina y una que se abandona.",
          "Estas diez láminas son páginas reales de nuestro libro impreso, no relleno dibujado para una web. Cada una se dibujó a mano para niños de uno a tres años: un animal, centrado, nada pequeño en las esquinas, y mucho espacio abierto para rellenar.",
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
        pickLead: "Si a tu hijo le gustaron estas diez, en el libro del que salieron hay 111.",
        pickTitle: "El libro del que salen estas páginas",
        pickPoints: [
          "111 dibujos hechos a mano con trazos gruesos",
          "Un dibujo por página, sin detalles pequeños en las esquinas",
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
        "10 бесплатных раскрасок для малышей 1-3 лет. Крупные рисунки, толстая линия, легко раскрашивать.",
      lead:
        "Они нарисованы от руки для первой книги-раскраски. Одно животное на странице, толстый контур, а слово под рисунком тоже можно раскрасить.",
      body: [
        "В два года ребенок скорее водит карандашом по рисунку, чем аккуратно закрашивает. Толстая линия это прощает. Цвет ложится примерно внутрь, рисунок все равно остается узнаваемым, и ребенок чувствует, что у него получилось. В этом и разница между листом, который доводят до конца, и листом, который бросают.",
        "Эти десять листов - настоящие страницы напечатанной книги, а не картинки, дорисованные специально для сайта. Каждый рисунок создан от руки для детей от года до трех: одно животное по центру, никаких мелких деталей по углам, много свободного места для цвета.",
        "Название под каждым животным тоже набрано контурными буквами, поэтому ребенок может раскрашивать и буквы, а взрослый - называть слово вслух. Ничего готовить не нужно.",
        "Печатайте сколько угодно. Возьмите с собой в кафе, в поликлинику или в долгую дорогу. Регистрироваться и платить не нужно.",
      ],
      howTo: [
        "Два размера файла: Letter и A4. Выбирайте тот, который подходит вашему принтеру.",
        "Печатайте на одной стороне обычной бумаги.",
        "Малышам удобнее толстые восковые карандаши.",
        "Если раскрашиваете фломастерами, подложите запасной лист.",
        "Напечатайте одно животное дважды и раскрасьте один экземпляр вместе.",
      ],
      pickLead: "Если эти десять понравились, в книге, из которой они взяты, их 111.",
      pickTitle: "Книга, из которой эти страницы",
      pickPoints: [
        "111 рисунков, нарисованных от руки толстой линией",
        "Один рисунок на странице, ничего мелкого по углам",
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
  /* Страницы одного объекта пропускаем: на них ровно один лист, и блок
     на странице книги показывал бы одного льва и звал "распечатать 1
     лист". Книге нужна страница темы, где лежат все бесплатные листы. */
  return coloringPages.find(
    (p) =>
      !p.single &&
      (p.fromBookId === bookId ||
        p.fromBookIdEs === bookId ||
        p.fromBookIdRu === bookId),
  );
}

/* Листы, у которых есть русский вариант. Это страницы первой книги
   для малышей: под рисунком напечатано слово, поэтому английский лист
   на русской странице не годится. На листах для взрослых слов нет,
   там русская страница показывает те же файлы. */
const RU_SHEETS = new Set([
  "lion", "elephant", "zebra", "parrot", "crocodile", "monkey", "kangaroo",
  "rhino", "flamingo", "hummingbird", "giraffe", "koala", "frog", "bunny",
  "owl", "hedgehog", "goat", "raccoon", "bear", "fox",
  "cat", "dog", "butterfly", "unicorn", "dragon",
  "fairy", "mermaid", "dolphin",
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

/** Отдельная страница этого листа, если она есть.
    Название под картинкой на общей странице ведет сюда, а кнопки печати
    остаются прямым действием: кто пришел просто распечатать, лишнего
    перехода не получает. */
export function singlePageForSheet(
  sheetId: string,
  lang: UiLang,
): string | undefined {
  const page = coloringPages.find(
    (p) => p.single && p.groups.some((g) => g.sheets.some((sh) => sh.id === sheetId)),
  );
  return page?.slug[lang];
}

/** Листы этой темы, доступные на этом языке. */
export function groupsForLang(p: ColoringPage, lang: UiLang): SheetGroup[] {
  return p.groups
    .map((g) => ({ ...g, sheets: g.sheets.filter((sh) => !sh.only || sh.only.includes(lang)) }))
    .filter((g) => g.sheets.length > 0);
}
