import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { FoundationHeader } from "@/components/navigation/foundation-header";
import { ProjectCaseStudy } from "@/components/sections/project-case-study";
import { getProject, projects } from "@/content/projects";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  const t = await getTranslations({ locale, namespace: "Projects" });

  return {
    title: t(`items.${project.key}.title`),
    description: t(`items.${project.key}.summary`),
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages: {
        en: `/en/projects/${project.slug}`,
        vi: `/vi/projects/${project.slug}`,
      },
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <FoundationHeader />
      <main id="main-content">
        <ProjectCaseStudy project={project} />
      </main>
    </>
  );
}
