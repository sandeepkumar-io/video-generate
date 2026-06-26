import {notFound} from "next/navigation";
import {SeoLandingPage} from "@/components/marketing/seo-page";
import {buildMetadata, getSeoPage} from "@/lib/video-options";

const page = getSeoPage("photo-to-video-maker");

export const metadata = page ? buildMetadata(page) : {};

export default function PhotoToVideoMakerPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
