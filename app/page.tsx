import {Generator} from "@/components/video/generator";
import {Hero} from "@/components/hero";
import {FeatureBand} from "@/components/marketing/feature-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Generator />
      <FeatureBand />
    </>
  );
}
