"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

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
  const reduceMotion = useReducedMotion();

  return (
    <div className="about-artwork" role="group" aria-label={label}>
      <div className="about-card-stage">
        {cards.map((card, index) => {
          const position = index - 1;
          const spread = activeIndex === null || reduceMotion ? 76 : 86;
          const lift = activeIndex === index && !reduceMotion ? -16 : 0;

          return (
            <motion.button
              aria-pressed={activeIndex === index}
              animate={{
                transform: `translateX(${position * spread}%) translateY(${lift}px) rotate(${position * 8}deg)`,
              }}
              className={`about-card about-card-${card.key}`}
              data-active={activeIndex === index}
              key={card.key}
              initial={false}
              onBlur={(event) => {
                if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                  setActiveIndex(null);
                }
              }}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
              type="button"
            >
              <span className={`about-card-graphic about-card-graphic-${card.key}`} aria-hidden="true">
                <span /><span /><span />
              </span>
              <span className="about-card-caption">
                <span className="about-card-title">{card.title}</span>
                <span className="about-card-description">{card.description}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
