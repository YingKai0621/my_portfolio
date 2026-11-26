import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { SelectedWorks } from "@/components/sections/selected-works";
import { FoundationHeader } from "@/components/navigation/foundation-header";

export default async function HomePage() {
  return (
    <>
      <FoundationHeader />
      <main id="main-content">
        <Hero />
        <About />
        <SelectedWorks />
      </main>
    </>
  );
}
