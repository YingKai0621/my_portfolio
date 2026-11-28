import { getTranslations } from "next-intl/server";

import { GlacierExperience } from "./glacier-experience";

export async function ProjectGlacier() {
  const t = await getTranslations("ProjectGlacier");
  return (
    <section className="glacier" id="lab" aria-label={t("label")}>
      <GlacierExperience labels={{
        label: t("label"),
        loading: t("loading"),
        unavailable: t("unavailable"),
        skip: t("skip"),
        scroll: t("scroll"),
        scenes: [t("scenes.awakening"), t("scenes.assembly"), t("scenes.transformation"), t("scenes.horizon")],
      }} />
      <div className="glacier-end" id="glacier-end" tabIndex={-1} />
    </section>
  );
}
