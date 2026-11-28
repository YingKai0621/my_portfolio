import { getTranslations } from "next-intl/server";

import { GlacialCinematicStage } from "./glacial-cinematic-stage";

export async function GlacialCinematic() {
  const hero = await getTranslations("GlacialHero");
  const t = await getTranslations("GlacialCinematic");
  const about = await getTranslations("About");
  const cards = ["explorer", "engineer", "builder"] as const;
  const pillars = ["engineering", "innovation", "research"] as const;

  return (
    <GlacialCinematicStage
      label={t("label")}
      skipLabel={t("skip")}
      scrollLabel={t("scroll")}
      ghostWords={[hero("nameLast"), t("ghostTwo"), t("ghostThree"), t("ghostFour")]}
      previewIdentity={{
        label: hero("portfolioLabel"),
        name: hero("previewName"),
        career: `${hero("discipline")} · ${hero("specialty")}`,
      }}
    >
      <div className="awakening-frame cinematic-chapter cinematic-chapter-identity">
        <div className="awakening-copy">
          <p className="awakening-kicker">{hero("kicker")}</p>
          <h1 className="awakening-name" id="awakening-name">
            <span>{hero("nameFirst")}</span>
            <span>{hero("nameMiddle")}</span>
            <span>{hero("nameLast")}</span>
          </h1>
          <div className="awakening-identity">
            <p>{hero("discipline")}</p>
            <p>{hero("specialty")}</p>
          </div>
        </div>
        <div className="awakening-footer">
          <p className="awakening-statement">{hero("statement")}</p>
          <nav className="awakening-links" aria-label={hero("linksLabel")}>
            <a href="#work">{hero("projects")} <span aria-hidden="true">↗</span></a>
            <a href="https://linkedin.com/in/duy-luong-909281356/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/YingKai0621" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </div>

      <div className="cinematic-chapter cinematic-chapter-awakening">
        <div className="cinematic-chapter-content">
          <p className="cinematic-chapter-marker">{t("chapterTwo")}</p>
          <h2>{t("awakening")}</h2>
          <p className="cinematic-chapter-support">{hero("specialty")}</p>
        </div>
      </div>

      <div className="cinematic-chapter cinematic-chapter-transformation">
        <div className="cinematic-chapter-content">
          <p className="cinematic-chapter-marker">{t("chapterThree")}</p>
          <h2>{t("transformation")}</h2>
          <p className="cinematic-chapter-support">{hero("discipline")}</p>
        </div>
      </div>

      <div className="cinematic-chapter cinematic-chapter-closeup">
        <div className="cinematic-chapter-content">
          <p className="cinematic-chapter-marker">{t("chapterThree")}</p>
          <h2>{about("cards.explorer.title")}.</h2>
          <p className="cinematic-chapter-support">{about("cards.explorer.description")}</p>
        </div>
      </div>

      <div className="cinematic-chapter cinematic-chapter-behind">
        <div className="cinematic-chapter-content">
          <p className="cinematic-chapter-marker">{t("chapterFour")}</p>
          <h2 className="cinematic-behind-title">{t("digitalWorld")}</h2>
          <p className="cinematic-behind-intro">{t("digitalWorldIntro")}</p>
        </div>
      </div>

      <div className="cinematic-chapter cinematic-chapter-performance">
        <div className="cinematic-chapter-content">
          <p className="cinematic-chapter-marker">{about("cardsLabel")}</p>
          <div className="cinematic-traits">
            {cards.map((key) => (
              <div key={key}>
                <h2>{about(`cards.${key}.title`)}</h2>
                <p>{about(`cards.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cinematic-chapter cinematic-chapter-about" id="about">
        <div className="cinematic-chapter-content">
          <p className="cinematic-chapter-marker">{about("label")}</p>
          <h2 id="about-title"><span>{about("headingFirst")}</span><span>{about("headingSecond")}</span></h2>
          <div className="cinematic-about-copy">
            <p>{about("introductionFirst")}</p>
            <p>{about("introductionSecond")}</p>
            <p className="cinematic-about-note">{about("personalNoteFirst")}<em>{about("personalNoteEmphasis")}</em></p>
          </div>
        </div>
      </div>

      <div className="cinematic-chapter cinematic-chapter-experience">
        <div className="cinematic-chapter-content">
          <p className="cinematic-chapter-marker">{about("label")}</p>
          <h2>{about("experienceTitle")}</h2>
          <div className="cinematic-experience-list">
            {pillars.map((key) => (
              <article key={key}>
                <h3>{about(`pillars.${key}.title`)}</h3>
                <div><p>{about(`pillars.${key}.field`)}</p><p>{about(`pillars.${key}.description`)}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>

    </GlacialCinematicStage>
  );
}
