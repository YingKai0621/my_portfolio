import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FoundationHeader } from "@/components/navigation/foundation-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { IconButton } from "@/components/ui/icon-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { TextLink } from "@/components/ui/text-link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("DesignPreview");

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

const palette = [
  {
    key: "background",
    token: "--background",
    value: "#0B1013",
    swatch: "bg-background",
  },
  {
    key: "surface",
    token: "--surface-primary",
    value: "#121C22",
    swatch: "bg-surface",
  },
  {
    key: "elevated",
    token: "--surface-elevated",
    value: "#1B2A32",
    swatch: "bg-elevated",
  },
  {
    key: "foreground",
    token: "--foreground",
    value: "#E8F3F6",
    swatch: "bg-foreground",
  },
  {
    key: "muted",
    token: "--text-muted",
    value: "#A6B9C2",
    swatch: "bg-muted",
  },
  {
    key: "accent",
    token: "--accent",
    value: "#1BA6CD",
    swatch: "bg-accent",
  },
  {
    key: "border",
    token: "--border",
    value: "#30434D",
    swatch: "bg-border",
  },
  {
    key: "focus",
    token: "--focus",
    value: "#70D9F4",
    swatch: "bg-focus",
  },
] as const;

export default async function DesignSystemPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const t = await getTranslations("DesignPreview");
  const common = await getTranslations("Common");

  return (
    <>
      <FoundationHeader />
      <main id="main-content">
        <Section className="border-b border-border/80">
          <Container>
            <div className="grid gap-10 desktop:grid-cols-12 desktop:items-end">
              <div className="desktop:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="accent">{common("developmentOnly")}</Badge>
                  <p className="type-caption text-muted">{t("eyebrow")}</p>
                </div>
                <h1 className="mt-8 type-display">{t("title")}</h1>
              </div>
              <div className="desktop:col-span-4 desktop:pb-2">
                <p className="type-body text-muted">{t("description")}</p>
                <TextLink className="mt-7" href="/">
                  {t("backHome")}
                </TextLink>
              </div>
            </div>
          </Container>
        </Section>

        <Section aria-labelledby="palette-heading">
          <Container>
            <SectionHeading
              description={t("palette.description")}
              eyebrow={t("palette.eyebrow")}
              title={t("palette.title")}
              titleId="palette-heading"
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 tablet:grid-cols-4">
              {palette.map((item) => (
                <Surface className="p-4 tablet:p-4" key={item.key}>
                  <div
                    aria-hidden="true"
                    className={`aspect-[4/3] rounded-card border border-border ${item.swatch}`}
                  />
                  <div className="mt-5">
                    <p className="font-semibold">
                      {t(`palette.items.${item.key}.label`)}
                    </p>
                    <p className="mt-1 type-supporting">
                      {t(`palette.items.${item.key}.usage`)}
                    </p>
                    <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-border pt-3 type-metadata text-muted">
                      <span>{item.token}</span>
                      <span>{item.value}</span>
                    </div>
                  </div>
                </Surface>
              ))}
            </div>
          </Container>
        </Section>

        <Divider />

        <Section aria-labelledby="typography-heading">
          <Container>
            <SectionHeading
              description={t("typography.description")}
              eyebrow={t("typography.eyebrow")}
              title={t("typography.title")}
              titleId="typography-heading"
            />
            <div className="mt-12 divide-y divide-border border-y border-border">
              <TypeSample label={t("typography.displayLabel")}>
                <p className="type-display">
                  {t("typography.displaySample")}
                </p>
              </TypeSample>
              <TypeSample label={t("typography.sectionLabel")}>
                <p className="type-section">
                  {t("typography.sectionSample")}
                </p>
              </TypeSample>
              <TypeSample label={t("typography.bodyLabel")}>
                <p className="max-w-copy type-body">
                  {t("typography.bodySample")}
                </p>
              </TypeSample>
              <TypeSample label={t("typography.supportingLabel")}>
                <p className="type-supporting">
                  {t("typography.supportingSample")}
                </p>
              </TypeSample>
              <TypeSample label={t("typography.captionLabel")}>
                <p className="type-caption text-accent">
                  {t("typography.captionSample")}
                </p>
              </TypeSample>
              <TypeSample label={t("typography.monoLabel")}>
                <p className="type-metadata">
                  {t("typography.monoSample")}
                </p>
              </TypeSample>
            </div>
          </Container>
        </Section>

        <Divider />

        <Section aria-labelledby="components-heading">
          <Container>
            <SectionHeading
              description={t("components.description")}
              eyebrow={t("components.eyebrow")}
              title={t("components.title")}
              titleId="components-heading"
            />
            <div className="mt-12 grid gap-6 desktop:grid-cols-12">
              <Surface className="desktop:col-span-7">
                <p className="type-caption text-muted">
                  {t("components.controlsLabel")}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button>{t("components.primaryButton")}</Button>
                  <Button variant="secondary">
                    {t("components.secondaryButton")}
                  </Button>
                  <Button disabled>{t("components.disabledButton")}</Button>
                  <IconButton label={t("components.iconButton")}>
                    <PlusIcon />
                  </IconButton>
                </div>
                <TextLink className="mt-8" href="#motion">
                  {t("components.textLink")}
                </TextLink>
              </Surface>
              <div className="grid gap-4 desktop:col-span-5">
                <Surface>
                  <Badge tone="accent">{t("components.badge")}</Badge>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.035em]">
                    {t("components.surfaceTitle")}
                  </h3>
                  <p className="mt-4 type-supporting">
                    {t("components.surfaceBody")}
                  </p>
                </Surface>
                <Surface level="elevated">
                  <p className="type-metadata text-focus">surface=elevated</p>
                </Surface>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        <Section aria-labelledby="layout-heading">
          <Container>
            <SectionHeading
              description={t("layout.description")}
              eyebrow={t("layout.eyebrow")}
              title={t("layout.title")}
              titleId="layout-heading"
            />
            <div className="mt-12 grid grid-cols-4 gap-3 tablet:grid-cols-6 desktop:grid-cols-12">
              {Array.from({ length: 12 }, (_, index) => (
                <div
                  aria-hidden="true"
                  className="h-24 rounded-control border border-accent/25 bg-accent/8"
                  key={index}
                />
              ))}
            </div>
            <div className="mt-10 grid gap-4 tablet:grid-cols-3">
              {[
                ["layout.compact", "p-4"],
                ["layout.comfortable", "p-6"],
                ["layout.spacious", "p-8 tablet:p-10"],
              ].map(([label, spacing]) => (
                <Surface className={spacing} key={label}>
                  <p className="font-semibold">{t(label)}</p>
                  <p className="mt-2 type-metadata text-muted">{spacing}</p>
                </Surface>
              ))}
            </div>
            <p className="mt-8 max-w-copy type-body text-muted">
              {t("layout.copyWidth")}
            </p>
          </Container>
        </Section>

        <Divider />

        <Section aria-labelledby="motion-heading" id="motion">
          <Container>
            <SectionHeading
              description={t("motion.description")}
              eyebrow={t("motion.eyebrow")}
              title={t("motion.title")}
              titleId="motion-heading"
            />
            <div className="mt-12 grid gap-6 desktop:grid-cols-2">
              <Surface className="group overflow-hidden">
                <div className="space-y-4">
                  {[
                    ["--motion-press", t("motion.fast"), "w-1/3"],
                    ["--motion-hover", t("motion.hover"), "w-1/2"],
                    ["--motion-standard", t("motion.standard"), "w-2/3"],
                    ["--motion-reveal", t("motion.reveal"), "w-full"],
                  ].map(([token, label, width]) => (
                    <div key={token}>
                      <div className="flex items-center justify-between gap-4 type-metadata text-muted">
                        <span>{label}</span>
                        <span>{token}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-pill bg-background">
                        <div
                          className={`motion-standard h-full rounded-pill bg-accent transition-transform group-hover:translate-x-2 ${width}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Surface>
              <Surface
                className="flex min-h-64 items-center justify-center border-accent/25 bg-surface-secondary text-center shadow-glow"
                level="secondary"
              >
                <div>
                  <div
                    aria-hidden="true"
                    className="motion-standard mx-auto size-16 rounded-full border border-accent/45 bg-accent/10 transition-transform hover:scale-105"
                  />
                  <Badge className="mt-6" tone="accent">
                    {t("motion.reduced")}
                  </Badge>
                </div>
              </Surface>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}

function TypeSample({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="grid gap-5 py-8 tablet:grid-cols-[10rem_1fr] tablet:py-10">
      <p className="type-metadata text-muted">{label}</p>
      <div>{children}</div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
    >
      <path
        d="M10 4.5v11M4.5 10h11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
