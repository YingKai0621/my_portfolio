"use client";

import { useState } from "react";

type Card = {
  key: "explorer" | "engineer" | "builder";
  title: string;
  description: string;
};

type AboutCardsProps = {
  label: string;
  cards: Card[];
};

export function AboutCards({ label, cards }: AboutCardsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="about-artwork" role="group" aria-label={label}>
      <div className="about-card-stage" data-expanded={activeIndex !== null}>
        {cards.map((card, index) => (
          <button
            aria-pressed={activeIndex === index}
            className={`about-card about-card-${card.key}`}
            data-active={activeIndex === index}
            key={card.key}
            onBlur={(event) => {
              if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                setActiveIndex(null);
              }
            }}
            onClick={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActiveIndex(index);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") setActiveIndex(null);
            }}
            type="button"
          >
            <span className={`about-card-art about-card-art-${card.key}`} aria-hidden="true">
              <span className="about-card-art-letter">
                {card.key === "explorer" ? "X" : card.key === "engineer" ? "E" : "B"}
              </span>
              <span className="about-card-art-form about-card-art-form-one" />
              <span className="about-card-art-form about-card-art-form-two" />
              <span className="about-card-art-form about-card-art-form-three" />
            </span>
            <span className="about-card-caption">
              <span className="about-card-title">{card.title}</span>
              <span className="about-card-description">{card.description}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
