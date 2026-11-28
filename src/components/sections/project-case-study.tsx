import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { ProjectArtwork } from "@/components/sections/project-artwork";
import { TechnologyLogos } from "@/components/sections/technology-logos";
import { projects, type Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";

export async function ProjectCaseStudy({ project }: { project: Project }) {
  const t = await getTranslations("Projects");
  const key = project.key;
  const currentIndex = projects.findIndex(({ slug }) => slug === project.slug);
  const nextProject = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : null;

  return (
    <article className="case-study">
      <Container>
        <Link className="case-study-back" href="/#work">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 12H4m0 0 7-7m-7 7 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>{t("backToWorks")}</span>
        </Link>
        <header className="case-study-header">
          <p className="case-study-category">{t(`items.${key}.category`)}</p>
          <h1>{t(`items.${key}.displayName`)}</h1>
          <p className="case-study-subtitle">{t(`items.${key}.title`)}</p>
        </header>
        <dl className="case-study-header-meta">
          <div><dt>{t("detail.role")}</dt><dd>{t(`items.${key}.role`)}</dd></div>
          <div><dt>{t("detail.period")}</dt><dd>{t(`items.${key}.period`)}</dd></div>
          <div><dt>{t("detail.team")}</dt><dd>{t("detail.teamSize", { count: project.teamSize })}</dd></div>
        </dl>
      </Container>

      <figure className="case-study-artwork">
        <ProjectArtwork slug={project.slug} />
        <figcaption>{t("artworkNote")}</figcaption>
      </figure>

      <Container>
        <section className="case-study-lead" aria-labelledby="case-overview">
          <h2 id="case-overview">{t("detail.overview")}</h2>
          <p>{t(`items.${key}.overview`)}</p>
        </section>

        <div className="case-study-columns">
          <section aria-labelledby="case-context">
            <h2 id="case-context">{t("detail.context")}</h2>
            <p>{t(`items.${key}.context`)}</p>
          </section>
          <section aria-labelledby="case-role">
            <h2 id="case-role">{t("detail.responsibilities")}</h2>
            <ul>
              <li>{t(`items.${key}.responsibility1`)}</li>
              <li>{t(`items.${key}.responsibility2`)}</li>
              <li>{t(`items.${key}.responsibility3`)}</li>
            </ul>
          </section>
        </div>

        <section className="case-study-technologies" aria-labelledby="case-technologies">
          <h2 id="case-technologies">{t("detail.builtWith")}</h2>
          <div className="case-study-technology-groups">
            {project.technologyGroups.map((group) => (
              <div className="case-study-technology-group" key={group.key}>
                <h3>{t(`technologyGroups.${group.key}`)}</h3>
                <TechnologyLogos marks={group.marks} />
              </div>
            ))}
          </div>
          <p className="case-study-integration"><span>{t("detail.integration")}</span> VNPay</p>
        </section>

        <section className="case-study-engineering" aria-labelledby="case-challenges">
          <h2 id="case-challenges">{t("detail.challenges")}</h2>
          {[1, 2].map((number) => (
            <div className="case-study-tradeoff" key={number}>
              <div>
                <span className="case-study-tradeoff-index">0{number} / {t("detail.challenge")}</span>
                <h3>{t(`items.${key}.challenge${number}`)}</h3>
              </div>
              <div>
                <span className="case-study-tradeoff-index">{t("detail.decision")}</span>
                <p>{t(`items.${key}.decision${number}`)}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="case-study-outcomes" aria-labelledby="case-results">
          <h2 id="case-results">{t("detail.results")}</h2>
          <dl className="case-study-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.key}>
                <dt><span className="case-study-metric-scope">{t(`detail.${metric.scope}`)}</span>{t(`items.${key}.${metric.key}`)}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        {nextProject && (
          <nav className="case-study-next" aria-label={t("detail.nextProject")}>
            <Link href={`/projects/${nextProject.slug}`}>
              <span className="case-study-next-copy">
                <span className="case-study-next-label">{t("detail.nextProject")}</span>
                <span className="case-study-next-name">{t(`items.${nextProject.key}.displayName`)}</span>
              </span>
              <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M5 24h37m0 0L26 8m16 16L26 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </nav>
        )}
      </Container>
    </article>
  );
}
