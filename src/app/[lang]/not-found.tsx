import Link from "next/link";

/* Страница для адресов, которых на сайте нет.
   Раньше здесь была голая заглушка движка: черный текст на белом, без шапки
   и без единой ссылки, тупик для гостя. Теперь это обычная страница сайта,
   внутри общего каркаса, с шапкой, меню и подвалом, и с нее есть куда пойти.

   Язык гостя тут неизвестен: адреса-то не существует, и по нему ничего не
   определить. Поэтому страница двуязычная, английский блок и испанский,
   и гость выбирает сам. Это важно: именно сюда попадают карточки старого
   магазина, язык которых по адресу угадать нельзя.

   Поисковикам показывать эту страницу в выдаче незачем, отсюда noindex. */

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="band">
      <div className="wrap nf">
        <p className="script-title">Page not found · Página no encontrada</p>
        <h1 className="hero">This page has moved</h1>
        <p className="lead">
          The address you followed is from an older version of this site. That page is gone, but the
          books, the free printable pages and the classroom materials are all still here.
        </p>
        <div className="nf__links">
          <Link className="btn btn--pink" href="/en/books">
            All books
          </Link>
          <Link className="btn btn--sun" href="/en/free-coloring-pages">
            Free coloring pages
          </Link>
          <Link className="btn" href="/en/teachers">
            For teachers
          </Link>
          <Link className="btn" href="/en">
            Home
          </Link>
        </div>

        <p className="lead" style={{ marginTop: "2rem" }}>
          La dirección que seguiste es de una versión anterior de este sitio. Esa página ya no
          existe, pero los libros, las páginas gratis para imprimir y el material para el aula
          siguen aquí.
        </p>
        <div className="nf__links">
          <Link className="btn btn--pink" href="/es/libros">
            Todos los libros
          </Link>
          <Link className="btn btn--sun" href="/es/dibujos-para-colorear-gratis">
            Dibujos gratis
          </Link>
          <Link className="btn" href="/es/maestros">
            Para maestros
          </Link>
          <Link className="btn" href="/es">
            Inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
