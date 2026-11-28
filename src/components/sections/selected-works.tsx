import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { ProjectExhibition } from "@/components/sections/project-exhibition";
import { projects } from "@/content/projects";

export async function SelectedWorks() {
  const t = await getTranslations("Projects");
  const items = projects.map((project) => ({
    slug: project.slug,
    displayName: t(`items.${project.key}.displayName`),
    title: t(`items.${project.key}.title`),
    category: t(`items.${project.key}.category`),
    role: t(`items.${project.key}.role`),
    summary: t(`items.${project.key}.summary`),
    technologyMarks: project.technologyMarks,
  }));

  return (
    <section className="selected-works" id="work" aria-labelledby="selected-works-title">
      <Container className="selected-works-container">
        <div className="selected-works-intro">
          <h2 id="selected-works-title"><span>{t("headingFirst")}</span>{" "}<span>{t("headingSecond")}</span></h2>
        </div>
        <ProjectExhibition
          items={items}
          labels={{
            explore: t("explore"),
            caseStudy: t("caseStudy"),
            artworkNote: t("artworkNote"),
            selection: t("selection"),
            techStack: t("techStack"),
            pauseTechStack: t("pauseTechStack"),
            resumeTechStack: t("resumeTechStack"),
          }}
        />
      </Container>
    </section>
  );
}
