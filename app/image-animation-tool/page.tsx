import {notFound} from "next/navigation";
import {SeoLandingPage} from "@/components/marketing/seo-page";
import {buildMetadata, getSeoPage} from "@/lib/video-options";

const page = getSeoPage("image-animation-tool");

export const metadata = page ? buildMetadata(page) : {};

export default function ImageAnimationToolPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
