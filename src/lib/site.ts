import type { UiLang } from "@/data/books";

export const SITE_URL = "https://www.magicofdiscoveries.com";
export const SITE_NAME = "Magic of Discoveries";
export const PUBLISHER = "Magic of Discoveries LLC";
export const CONTACT_EMAIL = "magicofdiscoveries@gmail.com";

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
