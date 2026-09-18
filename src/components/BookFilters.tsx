"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RatingMini } from "@/components/Rating";

export interface CardItem {
  id: string;
  href: string;
  title: string;
  flag: string;
  ageLabel: string;
  /** Все полки, на которых стоит книга. Одна книга может подходить
      и шестилетнему, и девятилетнему, поэтому полок может быть две. */
  ages: string[];
  type: string;
  price?: string;
  rating?: { value: number; count: number };
  /* Чей это рейтинг, если он взят у издания на другом языке. */
  ratingNote?: string;
  cover?: string;
  /** Строка «что внутри» под названием, как на всех карточках сайта. */
  line?: string;
}

interface Props {
  items: CardItem[];
  ages: { key: string; label: string }[];
  types: { key: string; label: string }[];
  labels: { age: string; type: string; all: string; empty: string };
}

/* Фильтр по возрасту убран: возраст на книгах примерный, и родитель
   выбирает сам. Остался только тип книги. */
export default function BookFilters({ items, types, labels }: Props) {
  const [type, setType] = useState<string | null>(null);

  const list = useMemo(
    () => items.filter((i) => !type || i.type === type),
    [items, type]
  );

  return (
    <>
      <div className="filters filters--one">
        <fieldset>
          <legend>{labels.type}</legend>
          <div className="chips">
            <button type="button" className="chip" aria-current={!type} onClick={() => setType(null)}>
              {labels.all}
            </button>
            {types.map((k) => (
              <button
                key={k.key}
                type="button"
                className="chip"
                aria-current={type === k.key}
                onClick={() => setType(type === k.key ? null : k.key)}
              >
                {k.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {list.length ? (
        <div className="grid" style={{ paddingBottom: "var(--gap-5)" }}>
          {list.map((i) => (
            <Link className="card" key={i.id} href={i.href}>
              <div className="card__frame">
                <div className="card__cover">
                  {i.cover ? (
                    <img src={i.cover} alt={i.title} loading="lazy" width={900} height={1160} />
                  ) : (
                    <span className="card__placeholder">{i.title}</span>
                  )}
                </div>
                <p className="card__title">
                  <span className="flag" aria-hidden>
                    {i.flag}
                  </span>
                  {i.title}
                </p>
                {i.line ? <p className="card__line">{i.line}</p> : null}
                <p className="card__meta">{i.ageLabel}</p>
                {i.rating ? (
                  <RatingMini rating={i.rating} note={i.ratingNote} />
                ) : null}
                {i.price ? <p className="card__price">{i.price}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="lead">{labels.empty}</p>
      )}
    </>
  );
}
