"use client";

import { useState } from "react";
import { drawingFile, type TopicGroup } from "@/data/bookTopics";
import type { UiLang } from "@/data/books";

/* Полный состав книги: все рисунки по темам, под каждым его название.

   Названия лежат в коде страницы всегда, и в свернутом виде тоже.
   Именно по ним страницу находит поиск и по ним нейросеть отвечает
   на вопрос про конкретного зверя или предмет.

   Картинки подставляются только после того, как человек раскрыл блок.
   Сто одиннадцать картинок сразу это полторы сотни обращений к серверу
   в первые секунды: на быстром интернете незаметно, на медленном
   страница открывается долго. Для поиска при этом ничего не меняется,
   он читает названия, а не картинки.

   Подпись здесь обычным шрифтом, а не контурными буквами из книги.
   Наверху страницы человек уже увидел настоящие страницы со словом,
   и здесь важнее другое: быстро найти нужного зверя. */

export default function BookDrawings({
  groups,
  lang,
  label,
}: {
  groups: TopicGroup[];
  lang: UiLang;
  label: string;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <details
      className="topics-all"
      onToggle={(e) => {
        if ((e.currentTarget as HTMLDetailsElement).open) setOpened(true);
      }}
    >
      <summary>{label}</summary>
      <div className="topics-all__body">
        {groups.map((g) => {
          const items = g.items[lang] ?? g.items.en ?? [];
          const first = g.firstDrawing;
          return (
            <section key={g.id}>
              <h3 className="topics-all__group">
                {g.title[lang] ?? g.title.en}
              </h3>
              {first ? (
                <ul className="thumbs thumbs--small">
                  {items.map((name, i) => (
                    <li key={name}>
                      {opened ? (
                        <img
                          src={drawingFile(first + i)}
                          alt={name}
                          width={420}
                          height={420}
                          loading="lazy"
                        />
                      ) : null}
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{items.join(", ")}</p>
              )}
            </section>
          );
        })}
      </div>
    </details>
  );
}
