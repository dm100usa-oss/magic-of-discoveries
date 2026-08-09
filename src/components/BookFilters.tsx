"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export interface CardItem {
  id: string;
  href: string;
  title: string;
  flag: string;
  ageLabel: string;
  age: string;
  type: string;
  price?: string;
}

interface Props {
  items: CardItem[];
  ages: { key: string; label: string }[];
  types: { key: string; label: string }[];
  labels: { age: string; type: string; all: string; empty: string };
}

export default function BookFilters({ items, ages, types, labels }: Props) {
  const [age, setAge] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  const list = useMemo(
    () => items.filter((i) => (!age || i.age === age) && (!type || i.type === type)),
    [items, age, type]
  );

  return (
    <>
      <div className="filters">
        <fieldset>
          <legend>{labels.age}</legend>
          <div className="chips">
            <button type="button" className="chip" aria-current={!age} onClick={() => setAge(null)}>
              {labels.all}
            </button>
            {ages.map((a) => (
              <button
                key={a.key}
                type="button"
                className="chip"
                aria-current={age === a.key}
                onClick={() => setAge(age === a.key ? null : a.key)}
              >
                {a.label}
              </button>
            ))}
          </div>
        </fieldset>

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
                  <span className="card__placeholder">{i.title}</span>
                </div>
                <p className="card__title">
                  <span className="flag" aria-hidden>
                    {i.flag}
                  </span>
                  {i.title}
                </p>
                <p className="card__meta">{i.ageLabel}</p>
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
