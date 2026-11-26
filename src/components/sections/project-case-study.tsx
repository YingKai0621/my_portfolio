import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { ProjectArtwork } from "@/components/sections/project-artwork";
import type { Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";

export async function ProjectCaseStudy({ project }: { project: Project }) {
  const t = await getTranslations("Projects");
  const key = project.key;

  return (
    <article className="case-study">
      <Container>
        <Link className="case-study-back" href="/#work">{t("backToWorks")}</Link>
        <header className="case-study-header">
          <div>
            <p className="case-study-category">{t(`items.${key}.category`)}</p>
            <h1>{t(`items.${key}.title`)}</h1>
          </div>
          <div className="case-study-header-meta">
            <p>{t(`items.${key}.role`)}</p>
            <p>{t(`items.${key}.period`)}</p>
          </div>
        </header>
      </Container>

      <figure className="case-study-artwork">
        <ProjectArtwork slug={project.slug} />
        <figcaption>{t("artworkNote")}</figcaption>
      </figure>

      <Container>
        <div className="case-study-lead">
          <h2>{t("detail.overview")}</h2>
          <p>{t(`items.${key}.overview`)}</p>
        </div>

        <div className="case-study-columns">
          <section aria-labelledby="case-context">
            <h2 id="case-context">{t("detail.context")}</h2>
            <p>{t(`items.${key}.context`)}</p>
          </section>
          <section aria-labelledby="case-role">
            <h2 id="case-role">{t("detail.role")}</h2>
            <ul>
              <li>{t(`items.${key}.responsibility1`)}</li>
              <li>{t(`items.${key}.responsibility2`)}</li>
              <li>{t(`items.${key}.responsibility3`)}</li>
            </ul>
          </section>
        </div>

        <section className="case-study-architecture" aria-labelledby="case-architecture">
          <h2 id="case-architecture">{t("detail.architecture")}</h2>
          <div>
            <p>{t(`items.${key}.architecture`)}</p>
            <p className="case-study-caveat">{t("detail.architectureNote")}</p>
          </div>
        </section>

        <div className="case-study-columns case-study-engineering">
          <section aria-labelledby="case-challenges">
            <h2 id="case-challenges">{t("detail.challenges")}</h2>
            <ul>
              <li>{t(`items.${key}.challenge1`)}</li>
              <li>{t(`items.${key}.challenge2`)}</li>
            </ul>
          </section>
          <section aria-labelledby="case-decisions">
            <h2 id="case-decisions">{t("detail.decisions")}</h2>
            <ul>
              <li>{t(`items.${key}.decision1`)}</li>
              <li>{t(`items.${key}.decision2`)}</li>
            </ul>
          </section>
        </div>

        <section className="case-study-outcomes" aria-labelledby="case-results">
          <h2 id="case-results">{t("detail.results")}</h2>
          <div>
            <p>{t(`items.${key}.results`)}</p>
            <p className="case-study-caveat">{t("detail.resultsNote")}</p>
          </div>
        </section>

        <div className="case-study-bottom">
          <section aria-labelledby="case-lessons">
            <h2 id="case-lessons">{t("detail.lessons")}</h2>
            <p>{t(`items.${key}.lessons`)}</p>
          </section>
          <section aria-labelledby="case-technology">
            <h2 id="case-technology">{t("detail.technology")}</h2>
            <p>{project.technologies.join(" · ")}</p>
          </section>
        </div>
        <Link className="case-study-back case-study-end-link" href="/#work">{t("backToWorks")}</Link>
      </Container>
    </article>
  );
}
