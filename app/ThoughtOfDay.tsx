"use client";

import { useEffect, useState } from "react";

type ThoughtCard = {
  id: string;
  alt: string;
  image: string;
  kind: "wide" | "wide-crop" | "square-crop" | "sprite";
  column?: number;
  row?: number;
};

const SOURCE = "/assets/thoughts-current";
const SHEET = `${SOURCE}/thought-sheet.png`;

const cards: ThoughtCard[] = [
  { id: "dance", image: `${SOURCE}/dance-together.png`, kind: "wide-crop", alt: "Иногда лучший способ подвести итоги — просто танцевать вместе." },
  { id: "move-plan", image: `${SOURCE}/move-plan.png`, kind: "wide-crop", alt: "Порядок — это когда даже переезд выглядит как план." },
  { id: "party-bags", image: `${SOURCE}/party-bags.png`, kind: "wide-crop", alt: "Готовность к празднику измеряется не отчётами, а пакетами." },
  { id: "gloves", image: `${SOURCE}/gloves.png`, kind: "wide-crop", alt: "В любой непонятной ситуации сохраняй улыбку и рабочие перчатки." },
  { id: "knitted-project", image: `${SOURCE}/knitted-project.png`, kind: "wide-crop", alt: "Любой большой проект сначала выглядит как вязаная фантазия." },
  { id: "spin", image: `${SOURCE}/spin-around.png`, kind: "wide-crop", alt: "Когда от количества задач голова кругом — попробуй покружиться в другую сторону." },
  { id: "bedbugs", image: `${SOURCE}/bedbugs.png`, kind: "square-crop", alt: "Красные клопы приходят и уходят. Согласование остаётся." },
  { id: "people-nearby", image: `${SOURCE}/people-nearby.png`, kind: "wide", alt: "Работа — это не только офис. Иногда самое ценное — это люди рядом." },
  ...[
    "Если работа идёт по кругу — возможно, это уже корпоративная хореография.",
    "Если задача срочная уже неделю — возможно, она просто очень эмоциональная.",
    "Любую проблему можно решить. Или создать по ней рабочую комиссию.",
    "Главное в многозадачности — паниковать сразу по всем направлениям.",
    "Если инвентаризация сошлась с первого раза — проверь, точно ли ты на работе.",
    "Если задача кажется бессмысленной — подожди. Сейчас появится ещё одна.",
    "Если тебе сказали: «Там работы на пять минут» — освободи вторую половину дня.",
    "Если работа идёт по кругу — не мешай. Возможно, это утверждённый маршрут.",
    "Если процесс невозможно понять — назови его регламентом.",
    "Если красных клопов не нашли — это ещё не повод закрывать рабочую группу.",
    "Коробки не разбирай. Мы ещё не знаем, окончательный ли это кабинет.",
    "Настоящий опыт — это когда надпись «СРОЧНО!!!» больше не влияет на пульс.",
    "СРОЧНО!!! — это не срок. Это эмоциональное состояние руководителя.",
    "Если поставить пять восклицательных знаков, задача автоматически становится стратегической.",
    "Когда задачи ходят по кругу, главное — попасть в ритм."
  ].map((alt, index) => ({
    id: `sheet-${index + 1}`,
    image: SHEET,
    kind: "sprite" as const,
    column: index % 3,
    row: Math.floor(index / 3),
    alt
  }))
];

const TOTAL = cards.length;
const STORAGE_KEY = "saby-thoughts-current-viewed";

function randomIndex(except?: number) {
  if (TOTAL < 2) return 0;
  let next = Math.floor(Math.random() * TOTAL);
  while (next === except) next = Math.floor(Math.random() * TOTAL);
  return next;
}

export default function ThoughtOfDay({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState(() => randomIndex());
  const [viewed, setViewed] = useState<number[]>([]);
  const [switching, setSwitching] = useState(false);
  const [notice, setNotice] = useState(false);
  const card = cards[current];

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as number[];
      const next = Array.from(new Set([...saved, current])).filter(n => n >= 0 && n < TOTAL);
      setViewed(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch { setViewed([current]); }
  }, [current]);

  const another = () => {
    if (switching) return;
    setSwitching(true);
    window.setTimeout(() => {
      setCurrent(previous => randomIndex(previous));
      setSwitching(false);
    }, 230);
  };

  const postpone = () => {
    setNotice(true);
    window.setTimeout(onClose, 1100);
  };

  return <div className="thought-overlay" role="presentation">
    <section className="thought-modal" aria-label="Мысль дня">
      <header><span className="thought-spark">✧</span><h1>Мысль дня</h1><button onClick={onClose} aria-label="Закрыть">×</button></header>
      <div className={'thought-image-wrap '+(switching?'switching':'')}>
        <div className={`thought-card ${card.kind}`} role="img" aria-label={card.alt} style={card.kind === "sprite" ? { backgroundImage: `url(${card.image})`, backgroundPosition: `${(card.column || 0) * 50}% ${(card.row || 0) * 25}%` } : undefined}>
          {card.kind !== "sprite" && <img src={card.image} alt={card.alt} />}
        </div>
        <button className="thought-hotspot postpone" onClick={postpone} aria-label="Сегодня отдыхаю" />
        <button className="thought-hotspot go" onClick={another} aria-label="Погнали — другая мысль" />
      </div>
      <div className="thought-footer"><span>{viewed.length >= TOTAL ? "Корпоративная мудрость освоена полностью ✓" : `Мудростей освоено: ${viewed.length} / ${TOTAL}`}</span><div><button onClick={another}>Другая мысль</button><button onClick={onClose}>Закрыть</button></div></div>
      {notice && <div className="thought-notice">Решение принято. Мысль отложена до следующего раза.</div>}
    </section>
  </div>;
}
