import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { JourneyZipper } from "@/components/sections/journey-zipper";
import { journeyArtwork } from "@/content/journey";

export async function Journey() {
  const t = await getTranslations("Journey");

  return (
    <section className="journey" id="journey" aria-label={t("heading")}>
      <JourneyZipper
        heading={t("heading")}
        scrollCue={t("scrollCue")}
        overlayPeriod={t("overlayPeriod")}
        overlayLine={t("overlayLine")}
        photoNote={t("photoNote")}
      />

      <div className="journey-story">
        <Container className="journey-story-container">
          <div className="journey-story-intro">
            <p className="journey-story-index">{t("storyIndex")}</p>
            <div>
              <p className="journey-story-introduction">{t("storyIntroduction")}</p>
              <p className="sr-only">{t("photoNote")}</p>
            </div>
          </div>

          <article className="journey-chapter journey-chapter-education">
            <figure className="journey-chapter-figure">
              <div className="journey-chapter-image">
                <Image src={journeyArtwork.education} width={1200} height={900} alt="" sizes="(max-width: 700px) 100vw, 56vw" />
              </div>
            </figure>
            <div className="journey-chapter-copy">
              <p className="journey-chapter-period">{t("chapters.education.period")}</p>
              <h3>{t("chapters.education.title")}</h3>
              <p className="journey-chapter-lede">{t("chapters.education.description")}</p>
              <p className="journey-chapter-detail">{t("chapters.education.detail")}</p>
            </div>
          </article>

          <article className="journey-competition">
            <div className="journey-competition-lead">
              <div>
                <p className="journey-chapter-period">{t("chapters.innovation.period")}</p>
                <h3>{t("chapters.innovation.title")}</h3>
              </div>
              <p>{t("chapters.innovation.description")}</p>
            </div>
            <figure className="journey-competition-figure">
              <Image src={journeyArtwork.innovation} width={1600} height={900} alt="" sizes="(max-width: 700px) 100vw, 90vw" />
            </figure>
            <div className="journey-achievements">
              <div className="journey-achievement">
                <p className="journey-achievement-rank">{t("achievements.seal.rank")}</p>
                <div>
                  <h4>{t("achievements.seal.title")}</h4>
                  <p>{t("achievements.seal.context")}</p>
                </div>
              </div>
              <div className="journey-achievement">
                <p className="journey-achievement-rank">{t("achievements.nasa.rank")}</p>
                <div>
                  <h4>{t("achievements.nasa.title")}</h4>
                  <p>{t("achievements.nasa.context")}</p>
                </div>
              </div>
            </div>
          </article>

          <article className="journey-research">
            <div className="journey-research-copy">
              <p className="journey-chapter-period">{t("chapters.research.period")}</p>
              <h3>{t("chapters.research.title")}</h3>
              <p className="journey-chapter-lede">{t("chapters.research.description")}</p>
              <p className="journey-chapter-detail">{t("chapters.research.detail")}</p>
            </div>
            <figure className="journey-research-figure">
              <Image src={journeyArtwork.research} width={1200} height={900} alt="" sizes="(max-width: 700px) 100vw, 40vw" />
            </figure>
          </article>

          <div className="journey-closing">
            <span className="journey-closing-index">{t("closingIndex")}</span>
            <p className="journey-closing-line">{t("closingFirst")}<br />{t("closingSecond")}</p>
          </div>
        </Container>
      </div>
    </section>
  );
}
