import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { AboutCards } from "@/components/sections/about-cards";

export async function About() {
  const t = await getTranslations("About");

  const cards = ["explorer", "engineer", "builder"] as const;
  const pillars = ["engineering", "innovation", "research"] as const;

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <Container>
        <div className="about-kicker">
          <span>{t("label")}</span>
          <span className="about-kicker-rule" aria-hidden="true" />
        </div>

        <div className="about-composition">
          <div className="about-copy">
            <h2 className="about-title" id="about-title">
              <span>{t("headingFirst")}</span>
              <span>{t("headingSecond")}</span>
            </h2>
            <div className="about-introduction">
              <p>{t("introductionFirst")}</p>
              <p>{t("introductionSecond")}</p>
            </div>
            <p className="about-personal-note">
              {t("personalNoteFirst")}
              <em>{t("personalNoteEmphasis")}</em>
            </p>
          </div>

          <AboutCards
            label={t("cardsLabel")}
            cards={cards.map((key) => ({
              key,
              title: t(`cards.${key}.title`),
              description: t(`cards.${key}.description`),
            }))}
          />
        </div>

        <div className="about-experience" aria-labelledby="about-experience-title">
          <div className="about-experience-heading">
            <h3 id="about-experience-title">{t("experienceTitle")}</h3>
          </div>
          <div className="about-pillars">
            {pillars.map((key) => (
              <article className="about-pillar" key={key}>
                <h4>{t(`pillars.${key}.title`)}</h4>
                <p className="about-pillar-field">{t(`pillars.${key}.field`)}</p>
                <p className="about-pillar-description">
                  {t(`pillars.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
