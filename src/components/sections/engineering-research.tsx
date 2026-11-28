import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { CapabilityExplorer } from "@/components/sections/capability-explorer";
import { TechnologyLogos } from "@/components/sections/technology-logos";
import { expertiseGroups, expertiseMarks, researchMarks } from "@/content/expertise";

export async function EngineeringResearch() {
  const t = await getTranslations("ExpertiseResearch");
  const capabilities = expertiseGroups.map(({ key, marks }) => ({
    key,
    marks,
    name: t(`capabilities.${key}.name`),
  }));

  return (
    <section className="engineering-research" id="expertise" aria-labelledby="engineering-research-title">
      <Container className="engineering-research-container">
        <CapabilityExplorer
          items={capabilities}
          allMarks={expertiseMarks}
          introduction={{
            headingFirst: t("headingFirst"),
            headingSecond: t("headingSecond"),
            heading: t("primaryHeading"),
            description: t("primaryDescription"),
            evidence: t("primaryEvidence"),
          }}
          inventoryHeading={t("inventoryHeading")}
          labels={{
            cloud: t("cloudLabel"),
            cloudKeyboard: t("cloudKeyboard"),
            pause: t("pauseCloud"),
            resume: t("resumeCloud"),
          }}
        />

        <aside className="expertise-research" id="research" aria-labelledby="expertise-research-title">
          <h3 id="expertise-research-title">{t("research.heading")}</h3>
          <div className="expertise-research-copy">
            <p>{t("research.description")}</p>
            <p className="expertise-research-status">{t("research.status")}</p>
            <TechnologyLogos marks={researchMarks} />
          </div>
        </aside>
      </Container>
    </section>
  );
}
