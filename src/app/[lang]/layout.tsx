import type { Metadata } from "next";
import "../globals.css";
import { Header, Footer } from "@/components/Chrome";
import { activeLangs, dictionaries } from "@/data/dictionaries";
import type { UiLang } from "@/data/books";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME}. Books by Ricardo & Maria Demi`, template: `%s | ${SITE_NAME}` },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
};

export function generateStaticParams() {
  return activeLangs.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  /* Неизвестный первый кусок адреса это не повод обрывать страницу.
     Каркас собирается на английском, а сама страница внутри него покажет
     "страницы нет" и вернет нужный код ответа. Так гость видит шапку, меню
     и ссылки, а не голую заглушку движка. */
  const l = (activeLangs.includes(lang as UiLang) ? lang : "en") as UiLang;
  /* Язык стоит на самой странице: так его читают поисковики,
     переводчики и голосовые помощники. */
  return (
    <html lang={dictionaries[l].htmlLang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Caveat+Brush&family=Nunito:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header lang={l} />
        <main>{children}</main>
        <Footer lang={l} />
      </body>
    </html>
  );
}
