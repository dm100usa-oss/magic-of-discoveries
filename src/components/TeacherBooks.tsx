import Link from "next/link";
import type { TeachersCopy } from "@/data/teachers";
import {
  productsOf,
  teacherRows,
  teacherProductPath,
  type TeacherEdition,
  type TeacherProduct,
} from "@/data/teacherBooks";

/* Книги для учителей: два ряда, английское и испанское издание.
   В каждом ряду том 1, том 2 и набор. Одни и те же карточки стоят на
   странице раздела, внизу статей и на страницах самих книг. */
export default function TeacherBookRows({
  c,
  first,
  headingLevel = "h3",
}: {
  c: TeachersCopy;
  first: TeacherEdition;
  headingLevel?: "h2" | "h3";
}) {
  const RowHeading = headingLevel;
  const cardHeading = headingLevel === "h2" ? "h3" : "h4";
  return (
    <div className="tbooks">
      {teacherRows(first).map((ed) => (
        <div className="tbooks__row" key={ed}>
          <RowHeading className="tbooks__title">{c.rowTitle[ed]}</RowHeading>
          <p className="tbooks__note">{c.rowNote[ed]}</p>
          <div className="tbooks__grid">
            {productsOf(ed).map((p) => (
              <TeacherBookCard key={p.id} p={p} c={c} heading={cardHeading} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Одна карточка книги.

   Три кнопки одного размера: подробнее, превью, купить. Покупка тома
   ведет к блоку покупки на странице книги, потому что там выбирается
   размер листа. Набор на сайте не продается, его кнопка ведет на
   площадку. */
export function TeacherBookCard({
  p,
  c,
  heading = "h3",
  withEdition = false,
}: {
  p: TeacherProduct;
  c: TeachersCopy;
  heading?: "h3" | "h4";
  /** Добавить к названию издание: рядом стоят книги на разных языках. */
  withEdition?: boolean;
}) {
  const CardHeading = heading;
  const label = c.cards[p.id];
  const href = teacherProductPath(p);
  const isBundle = p.kind === "bundle";
  return (
    <article className={`tbook${isBundle ? " tbook--bundle" : ""}`}>
      <Link href={href} className="tbook__cover">
        <img src={p.cover.src} alt={p.cover.alt} width={p.cover.w} height={p.cover.h} loading="lazy" />
      </Link>
      <CardHeading className="tbook__name">
        <Link href={href}>
          {withEdition ? `${p.edition === "es" ? "Spanish" : "English"}, ` : ""}
          {label?.name ?? p.short}
        </Link>
      </CardHeading>
      <p className="tbook__line">{label?.line ?? p.stats}</p>
      <p className="tbook__price">
        <b>{p.price}</b>
        {p.fullPrice ? <s>{p.fullPrice}</s> : null}
        {isBundle ? <span className="tbook__save">{c.saveLabel}</span> : null}
      </p>
      <div className="tbtns">
        <Link className="btn btn--ghost" href={href}>
          {c.btnDetails}
        </Link>
        <a className="btn btn--sky" href={p.preview} target="_blank" rel="noopener">
          {c.btnPreview}
        </a>
        {isBundle ? (
          <a className="btn btn--pink" href={p.tptUrl} target="_blank" rel="nofollow sponsored noopener">
            {c.btnBuyTpt.replace("{price}", p.price)}
          </a>
        ) : (
          <Link className="btn btn--pink" href={`${href}#buy`}>
            {c.btnBuy.replace("{price}", p.price)}
          </Link>
        )}
      </div>
    </article>
  );
}
