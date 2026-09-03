import { amazonReviewsUrl, type AmazonRating } from "@/data/books";

/** Пять звезд с дробным заполнением. Показываем ровно то, что стоит на Amazon. */
function Stars({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span className="stars-track" aria-hidden>
      <span className="stars-empty">★★★★★</span>
      <span className="stars-fill" style={{ width: `${pct}%` }}>
        ★★★★★
      </span>
    </span>
  );
}

export function RatingLink({
  rating,
  asin,
  labelReviews,
  labelReviewsOne,
  labelReviewsFew,
  labelSource,
  ariaLabel,
}: {
  rating: AmazonRating;
  asin: string;
  labelReviews: string;
  labelReviewsOne: string;
  /** Форма слова для двух, трех и четырех. Нужна русскому языку:
      одна оценка, три оценки, пять оценок. Пусто значит язык
      обходится двумя формами. */
  labelReviewsFew?: string;
  labelSource: string;
  ariaLabel: string;
}) {
  const n = rating.count;
  const last = n % 10;
  const teen = n % 100 >= 11 && n % 100 <= 14;
  const label =
    n === 1
      ? labelReviewsOne
      : labelReviewsFew && !teen && last >= 2 && last <= 4
        ? labelReviewsFew
        : labelReviews;
  return (
    <a
      className="rating"
      href={amazonReviewsUrl(asin)}
      rel="nofollow noopener"
      target="_blank"
      aria-label={ariaLabel}
    >
      <span className="rating__value">{rating.value.toFixed(1)}</span>
      <span className="rating__mid">
        <Stars value={rating.value} />
        <span className="rating__count">
          {rating.count} {label}
        </span>
      </span>
      <span className="rating__source">{labelSource}</span>
    </a>
  );
}

/** Компактный вариант для карточки в каталоге. */
export function RatingMini({ rating }: { rating: AmazonRating }) {
  return (
    <span className="rating-mini">
      <Stars value={rating.value} />
      <span>
        {rating.value.toFixed(1)} ({rating.count})
      </span>
    </span>
  );
}
