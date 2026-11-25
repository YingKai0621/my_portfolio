import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Preserve the starter kit's AGENTS.md; Next.js dev would append managed rules.
  agentRules: false,
};

export default withNextIntl(nextConfig);
