import type { UiLang } from "@/data/books";

export const SITE_URL = "https://www.magicofdiscoveries.com";
export const SITE_NAME = "Magic of Discoveries";
export const PUBLISHER = "Magic of Discoveries LLC";
export const CONTACT_EMAIL = "magicofdiscoveries@gmail.com";

export const SOCIAL = {
  instagram: "https://www.instagram.com/magic_of_discoveries",
  tiktok: "https://www.tiktok.com/@ricardo_maria_demi",
  pinterest: "http://www.pinterest.com/magic_of_discoveries",
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
