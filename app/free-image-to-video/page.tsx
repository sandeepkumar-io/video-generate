import {notFound} from "next/navigation";
import {SeoLandingPage} from "@/components/marketing/seo-page";
import {buildMetadata, getSeoPage} from "@/lib/video-options";

const page = getSeoPage("free-image-to-video");

export const metadata = page ? buildMetadata(page) : {};

export default function FreeImageToVideoPage() {
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
