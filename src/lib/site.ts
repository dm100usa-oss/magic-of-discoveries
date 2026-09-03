import type { UiLang } from "@/data/books";

export const SITE_URL = "https://www.magicofdiscoveries.com";

/* Постоянные опознаватели.

   В разметке издательство и авторы описаны на нескольких страницах:
   на главной, в разделе "О нас", на странице для учителей, в контактах.
   Без общего опознавателя машина видит не одно издательство, описанное
   в четырех местах, а четыре разные организации с одинаковым названием,
   и вес между ними не складывается. Эти строки связывают все описания
   в один объект. Адрес после решетки никуда не ведет, это просто имя. */
export const ORG_ID = `${SITE_URL}/#publisher`;
export const RICARDO_ID = `${SITE_URL}/#ricardo-demi`;
export const MARIA_ID = `${SITE_URL}/#maria-demi`;
export const SITE_NAME = "Magic of Discoveries";
export const PUBLISHER = "Magic of Discoveries LLC";
export const CONTACT_EMAIL = "magicofdiscoveries@gmail.com";

/** Когда сайт был опубликован. Дата стоит в разметке статей.
    Нейросети предпочитают материал с понятной датой. */
export const SITE_PUBLISHED = "2026-08-09";

/** Запасная дата правки. Ставится только тем страницам, у которых своей
    даты пока нет.

    Раньше эта дата была единственной на весь сайт и уходила во все сто
    с лишним страниц сразу, и в карту сайта тоже. Получалось заявление,
    что весь сайт переписан в один день, а при следующей правке все сто
    страниц разом объявляли себя свежими. Машины такому не верят.

    Теперь у страницы может быть своя дата, записанная рядом с ее
    текстом. Правим страницу, меняем ее дату, соседние стоят на месте. */
export const SITE_UPDATED = "2026-09-03";

/** Дата правки страницы: своя, если она есть, иначе общая. */
export const pageUpdated = (own?: string) => own ?? SITE_UPDATED;

/** Дата появления страницы: своя, если она есть, иначе день запуска. */
export const pagePublished = (own?: string) => own ?? SITE_PUBLISHED;

/** Где находится издательство. Улицу не публикуем, только город. */
export const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Miami",
  addressRegion: "FL",
  addressCountry: "US",
} as const;

/** Картинка для соцсетей и мессенджеров. Показывается, когда ссылку
    отправляют в чат или сохраняют в Pinterest. */
export const OG_IMAGE = {
  url: "/og-cover.png",
  width: 1200,
  height: 630,
} as const;

/** Справочник по методике. Отдельный сайт, подтверждает подход. */
export const METHOD_REFERENCE_URL = "https://www.ricardo-demi.com/method";

/* Отдельный справочный сайт о первых раскрасках для детей 1-3 лет.

   Это наш же проект, но не витрина, а справочник: четыре этапа первого
   рисования, разбор по возрастам, статьи, подборщик и бесплатные листы.
   Каталог отвечает на вопрос "что купить", справочник на вопрос
   "что подходит моему ребенку", и это разные вопросы.

   До сих пор из каталога на него не вело ни одной ссылки, хотя книга
   там та же самая. Для человека это лишний шаг через поиск, для машины
   это два несвязанных сайта одного издательства вместо одного целого. */
export const TODDLER_SITE = "https://www.toddlercoloringbook.com";

/** Адрес справочника на языке читателя. Русской витрины у каталога нет,
    но русские страницы на справочнике есть, поэтому язык передается. */
export const toddlerSiteUrl = (lang: UiLang) => `${TODDLER_SITE}/${lang}`;

export const SOCIAL = {
  instagram: "https://www.instagram.com/magic_of_discoveries",
  tiktok: "https://www.tiktok.com/@magic_of_discoveries",
  pinterest: "https://www.pinterest.com/magic_of_discoveries",
  youtube: "https://www.youtube.com/@magic_of_discoveries",
};

/* Внешние страницы авторов. Чем больше независимых мест, где машина
   находит того же самого человека, тем увереннее она о нем говорит.
   Страница на Goodreads до сих пор лежала в другом списке и в разметку
   авторов не попадала. */
export const AUTHORS = {
  ricardo: {
    name: "Ricardo Demi",
    amazon: "https://www.amazon.com/stores/Ricardo-Demi/author/B0D3CQP21H",
    goodreads: "https://www.goodreads.com/author/show/49458093.Ricardo_Demi",
  },
  maria: {
    name: "Maria Demi",
    amazon: "https://www.amazon.com/stores/Maria-Demi/author/B0DD5TGB1B",
  },
};

/** Все проверяемые адреса автора одной строкой. */
export const authorSameAs = (who: "ricardo" | "maria") => {
  const a = AUTHORS[who];
  return [a.amazon, "goodreads" in a ? a.goodreads : undefined].filter(
    Boolean,
  ) as string[];
};

export const path = (lang: UiLang, ...parts: string[]) =>
  "/" + [lang, ...parts.filter(Boolean)].join("/");
