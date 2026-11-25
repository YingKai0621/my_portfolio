"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { type AppLocale, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Common");
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: AppLocale) {
    if (nextLocale === locale) {
      return;
    }

    startTransition(() => {
      const query = searchParams.toString();
      const hash = window.location.hash;
      const destination = `${pathname}${query ? `?${query}` : ""}${hash}`;

      router.replace(destination, { locale: nextLocale });
    });
  }

  return (
    <div
      aria-label={t("languageSwitcher")}
      className="inline-flex rounded-pill border border-border bg-surface p-1 shadow-soft"
      role="group"
    >
      {routing.locales.map((item) => {
        const isCurrent = item === locale;
        const label = item === "en" ? t("english") : t("vietnamese");

        return (
          <button
            aria-pressed={isCurrent}
            className={cn(
              "min-h-9 rounded-pill px-3.5 text-xs font-semibold tracking-[0.08em] uppercase transition ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
              isCurrent
                ? "bg-accent text-background"
                : "text-muted hover:bg-elevated hover:text-foreground",
            )}
            disabled={isPending}
            key={item}
            lang={item}
            onClick={() => switchLocale(item)}
            title={label}
            type="button"
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
