import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { ProjectArtwork } from "@/components/sections/project-artwork";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";

export async function SelectedWorks() {
  const t = await getTranslations("Projects");

  return (
    <section className="selected-works" id="work" aria-labelledby="selected-works-title">
      <Container>
        <div className="selected-works-intro">
          <h2 id="selected-works-title"><span>{t("headingFirst")}</span><span>{t("headingSecond")}</span></h2>
        </div>
        <div className="selected-works-list">
          {projects.map((project) => (
            <article className="project-feature" key={project.slug}>
              <FollowerPointerCard className="project-artwork-frame" title={t("explore")}>
                <Link className="project-artwork-link" href={`/projects/${project.slug}`} aria-label={`${t("explore")}: ${t(`items.${project.key}.title`)}`}>
                  <ProjectArtwork slug={project.slug} />
                  <span className="project-artwork-note">{t("artworkNote")}</span>
                </Link>
              </FollowerPointerCard>
              <div className="project-feature-copy">
                <h3>{t(`items.${project.key}.displayName`)}</h3>
                <div className="project-feature-details">
                  <p className="project-feature-role">{t(`items.${project.key}.role`)}</p>
                  <p>{t(`items.${project.key}.summary`)}</p>
                  <p className="project-feature-stack">{project.technologies.slice(0, 4).join(" / ")}</p>
                  <Link className="project-feature-link" href={`/projects/${project.slug}`}>{t("caseStudy")}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
