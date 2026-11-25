import { getTranslations } from "next-intl/server";

import { HeroCubes } from "@/components/sections/hero-cubes";
import { PosterReveal } from "@/components/sections/poster-reveal";

export async function Hero() {
  const t = await getTranslations("PosterHero");

  return (
      <section className="poster-hero" id="home" aria-labelledby="poster-name">
        <HeroCubes />
        <PosterReveal replayLabel={t("replay")}>
          <div className="poster-name-layer">
            <h1 className="poster-name" id="poster-name">
              <span>{t("nameFirst")}</span>{" "}
              <span>{t("nameMiddle")}</span>{" "}
              <span>{t("nameLast")}</span>
            </h1>
          </div>

          <div className="poster-portrait-layer" />

          <div className="poster-information">
            <div className="poster-profile">
              <p>{t("roleStudent")}</p>
              <p>{t("roleBackend")}</p>
              <p>{t("roleResearch")}</p>
              <p className="poster-location">{t("location")}</p>
            </div>
            <nav className="poster-links" aria-label={t("linksLabel")}>
              <a href="https://github.com/YingKai0621" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/duy-luong-909281356/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </nav>
          </div>
        </PosterReveal>
      </section>
  );
}
