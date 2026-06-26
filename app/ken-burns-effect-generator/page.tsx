import {notFound} from "next/navigation";
import {SeoLandingPage} from "@/components/marketing/seo-page";
import {buildMetadata, getSeoPage} from "@/lib/video-options";

const page = getSeoPage("ken-burns-effect-generator");

export const metadata = page ? buildMetadata(page) : {};

export default function KenBurnsEffectGeneratorPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
