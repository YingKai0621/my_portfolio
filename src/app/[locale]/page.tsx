import { GlacialCinematic } from "@/components/sections/glacial-cinematic";
import { SelectedWorks } from "@/components/sections/selected-works";
import { EngineeringResearch } from "@/components/sections/engineering-research";
import { Journey } from "@/components/sections/journey";
import { FoundationHeader } from "@/components/navigation/foundation-header";

export default async function HomePage() {
  return (
    <>
      <FoundationHeader />
      <main id="main-content">
        <GlacialCinematic />
        <SelectedWorks />
        <EngineeringResearch />
        <Journey />
      </main>
    </>
  );
}
