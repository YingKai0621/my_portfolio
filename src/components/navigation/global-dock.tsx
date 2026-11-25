"use client";

import { IconBrandGithub, IconBrandLinkedin, IconHome } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";

import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";

export function GlobalDock() {
  const locale = useLocale();
  const t = useTranslations("Dock");

  const items: DockItem[] = [
    { title: t("home"), icon: <IconHome size={22} stroke={1.7} />, href: `/${locale}#home`, active: true },
    { title: t("github"), icon: <IconBrandGithub size={22} stroke={1.7} />, href: "https://github.com/YingKai0621", external: true },
    { title: t("linkedin"), icon: <IconBrandLinkedin size={22} stroke={1.7} />, href: "https://linkedin.com/in/duy-luong-909281356/", external: true },
  ];

  return (
    <nav className="global-dock" aria-label={t("label")}>
      <FloatingDock items={items} menuLabel={t("menu")} unavailableLabel={t("unavailable")} />
    </nav>
  );
}
