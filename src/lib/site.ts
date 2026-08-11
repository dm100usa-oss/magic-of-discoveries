import type { UiLang } from "@/data/books";

export const SITE_URL = "https://www.magicofdiscoveries.com";
export const SITE_NAME = "Magic of Discoveries";
export const PUBLISHER = "Magic of Discoveries LLC";
export const CONTACT_EMAIL = "magicofdiscoveries@gmail.com";

/** Когда сайт был опубликован. Дата стоит в разметке статей.
    Нейросети предпочитают материал с понятной датой. */
export const SITE_PUBLISHED = "2026-08-09";

/** Когда содержание правилось в последний раз.
    Эту дату нужно менять при каждом обновлении текстов. */
export const SITE_UPDATED = "2026-08-11";

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

export const SOCIAL = {
  instagram: "https://www.instagram.com/magic_of_discoveries",
  tiktok: "https://www.tiktok.com/@magic_of_discoveries",
  pinterest: "https://www.pinterest.com/magic_of_discoveries",
  youtube: "https://www.youtube.com/@magic_of_discoveries",
};

export const AUTHORS = {
  ricardo: {
    name: "Ricardo Demi",
    amazon: "https://www.amazon.com/stores/Ricardo-Demi/author/B0D3CQP21H",
  },
  maria: {
    name: "Maria Demi",
    amazon: "https://www.amazon.com/stores/Maria-Demi/author/B0DD5TGB1B",
  },
};

export const path = (lang: UiLang, ...parts: string[]) =>
  "/" + [lang, ...parts.filter(Boolean)].join("/");
