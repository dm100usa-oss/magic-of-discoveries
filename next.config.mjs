/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Перебросы со старых адресов Wix.

     Список составлен не на глаз: старый сайт еще жив по служебному адресу
     dvchbooks.wixsite.com/website-13, я прошел его целиком и переписал
     каждый адрес. Меню, все семь разделов магазина и все четырнадцать
     карточек товаров. Каждая карточка ведет на страницу той самой книги,
     а не в общий каталог: старый товар был набором страниц для печати
     из конкретной книги, и на новом сайте у этой книги есть своя страница.

     Пометка permanent говорит поисковику, что переезд навсегда, и вес
     старого адреса переходит на новый. Порядок важен: срабатывает первое
     совпадение. Кириллические адреса записаны дважды, обычными буквами
     и в том виде, в каком их присылает браузер.

     Чего в списке нет, того на старом сайте не было. Такие адреса честно
     отвечают "страницы нет" и показывают двуязычную страницу 404. */
  async redirects() {
    return [
      /* --- карточки товаров, каждая на свою книгу --- */
      /* First Coloring Pages for Toddlers 1-3 */
      { source: "/product-page/english-4", destination: "/en/books/first-coloring-book-toddlers-1-3-111-drawings", permanent: true },
      /* Primeras paginas para colorear 1-3 */
      { source: "/product-page/spanish-4", destination: "/es/libros/primer-libro-colorear-bebes-1-3-anos-111-dibujos", permanent: true },
      /* Little Max (1) */
      { source: "/product-page/english-5", destination: "/en/books/little-max-first-coloring-book-toddlers-1-3", permanent: true },
      /* Pequeno Max (1) */
      { source: "/product-page/el-primer-libro-de-colorear-para-bebés-de-1-3-años-de-pequeño-max", destination: "/es/libros/pequeno-max-primer-libro-colorear-bebes-1-3-anos", permanent: true },
      { source: "/product-page/el-primer-libro-de-colorear-para-beb%C3%A9s-de-1-3-a%C3%B1os-de-peque%C3%B1o-max", destination: "/es/libros/pequeno-max-primer-libro-colorear-bebes-1-3-anos", permanent: true },
      /* Little Max (2) */
      { source: "/product-page/копия-копия-копия-копия-шаблон-книги", destination: "/en/books/little-max-coloring-book-toddlers-1-3-volume-2", permanent: true },
      { source: "/product-page/%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8", destination: "/en/books/little-max-coloring-book-toddlers-1-3-volume-2", permanent: true },
      /* Pequeno Max (2) */
      { source: "/product-page/копия-копия-копия-копия-копия-шаблон-книги", destination: "/es/libros/pequeno-max-libro-colorear-bebes-1-3-anos-volumen-2", permanent: true },
      { source: "/product-page/%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8", destination: "/es/libros/pequeno-max-libro-colorear-bebes-1-3-anos-volumen-2", permanent: true },
      /* How to Draw */
      { source: "/product-page/копия-копия-шаблон-книги", destination: "/en/books/how-to-draw-111-easy-step-by-step-drawings-for-kids", permanent: true },
      { source: "/product-page/%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8", destination: "/en/books/how-to-draw-111-easy-step-by-step-drawings-for-kids", permanent: true },
      /* Como dibujar */
      { source: "/product-page/копия-копия-копия-шаблон-книги", destination: "/es/libros/como-dibujar-111-dibujos-faciles-paso-a-paso-para-ninos", permanent: true },
      { source: "/product-page/%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8", destination: "/es/libros/como-dibujar-111-dibujos-faciles-paso-a-paso-para-ninos", permanent: true },
      /* Take a Break Animals */
      { source: "/product-page/english-3", destination: "/en/books/take-a-break-cute-animals-easy-coloring-book-adults", permanent: true },
      /* Tomate un Descanso Animales */
      { source: "/product-page/spanish-2", destination: "/es/libros/tomate-un-descanso-animales-adorables-libro-colorear-adultos", permanent: true },
      /* Take a Break Ocean */
      { source: "/product-page/english-1", destination: "/en/books/take-a-break-ocean-easy-coloring-book-adults-kids", permanent: true },
      /* Tomate un Descanso Oceano */
      { source: "/product-page/spanish-1", destination: "/es/libros/tomate-un-descanso-belleza-del-oceano-libro-colorear-facil", permanent: true },
      /* Take a Break Food and Snacks */
      { source: "/product-page/english-2", destination: "/en/books/take-a-break-food-and-snacks-easy-coloring-book", permanent: true },
      /* Tomate un Descanso Historias Deliciosas */
      { source: "/product-page/spanish-3", destination: "/es/libros/tomate-un-descanso-historias-deliciosas-libro-colorear", permanent: true },

      /* --- разделы меню старого магазина --- */
      /* SHOP */
      { source: "/shop", destination: "/en/books", permanent: true },
      /* SHOP ALL */
      { source: "/shop-all", destination: "/en/books", permanent: true },
      /* NEW */
      { source: "/new", destination: "/en/books", permanent: true },
      /* FOR KIDS */
      { source: "/for-kids", destination: "/en/books", permanent: true },
      /* FOR TEENS & ADULTS */
      { source: "/for-adults", destination: "/en/books", permanent: true },
      /* SALE */
      { source: "/sale", destination: "/en/books", permanent: true },
      /* ENGLISH */
      { source: "/english", destination: "/en/books", permanent: true },
      /* SPANISH */
      { source: "/spanish", destination: "/es/libros", permanent: true },
      /* ABOUT */
      { source: "/about-1", destination: "/en/about-us", permanent: true },
      /* ABOUT, запасной адрес */
      { source: "/about", destination: "/en/about-us", permanent: true },
      /* CONTACT */
      { source: "/contact", destination: "/en/contact", permanent: true },
    ];
  },

  // Страницы обновляются часто, поэтому браузер должен проверять свежесть,
  // а не показывать сохраненную копию.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/:file(covers|art)/:name*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com" }],
  },
};
export default nextConfig;
