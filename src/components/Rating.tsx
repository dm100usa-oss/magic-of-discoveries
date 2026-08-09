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
  labelSource,
  ariaLabel,
}: {
  rating: AmazonRating;
  asin: string;
  labelReviews: string;
  labelSource: string;
  ariaLabel: string;
}) {
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
          {rating.count} {labelReviews}
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
