import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { Link } from "@/i18n/navigation";

export async function FoundationHeader() {
  const t = await getTranslations("Common");

  return (
    <header className="identity-bar">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <Link
          className="identity-wordmark"
          href="/"
        >
          {t("wordmark")}
        </Link>
        <Suspense fallback={<LocaleSwitcherFallback />}>
          <LocaleSwitcher />
        </Suspense>
      </Container>
    </header>
  );
}

function LocaleSwitcherFallback() {
  return (
    <div
      aria-hidden="true"
      className="inline-flex min-h-11 min-w-28 rounded-pill border border-border bg-surface p-1 shadow-soft"
    />
  );
}
