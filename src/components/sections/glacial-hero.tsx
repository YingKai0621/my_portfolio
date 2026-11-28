import { getTranslations } from "next-intl/server";

import { GlacialHeroStage } from "./glacial-hero-stage";

export async function GlacialHero() {
  const t = await getTranslations("GlacialHero");

  return (
    <section className="awakening-hero" id="home" aria-labelledby="awakening-name">
      <div className="awakening-atmosphere" aria-hidden="true" />
      <div className="awakening-dither" aria-hidden="true" />
      <div className="awakening-ghost" aria-hidden="true">DUY.</div>
      <GlacialHeroStage />

      <div className="awakening-frame">
        <div className="awakening-copy">
          <p className="awakening-kicker">{t("kicker")}</p>
          <h1 className="awakening-name" id="awakening-name">
            <span>{t("nameFirst")}</span>
            <span>{t("nameMiddle")}</span>
            <span>{t("nameLast")}</span>
          </h1>
          <div className="awakening-identity">
            <p>{t("discipline")}</p>
            <p>{t("specialty")}</p>
          </div>
        </div>

        <div className="awakening-footer">
          <p className="awakening-statement">{t("statement")}</p>
          <nav className="awakening-links" aria-label={t("linksLabel")}>
            <a href="#work">{t("projects")} <span aria-hidden="true">↗</span></a>
            <a href="https://linkedin.com/in/duy-luong-909281356/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/YingKai0621" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </div>
    </section>
  );
}
