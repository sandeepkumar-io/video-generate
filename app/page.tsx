import type {Metadata} from "next";
import {Generator} from "@/components/video/generator";
import {Hero} from "@/components/hero";
import {FeatureBand} from "@/components/marketing/feature-band";
import {FAQSection} from "@/components/marketing/faq-section";
import {absoluteUrl} from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free Image to Video Generator - Convert Photos to MP4 Online",
  description: "Turn JPG, PNG, WEBP images into animated MP4 videos instantly. 19+ effects, no signup, no AI, no GPU. Create zoom, pan, slide, tilt, fade, and Ken Burns animations.",
  keywords: ["image to video", "photo to video", "video generator", "MP4 converter", "animation tool", "online video maker", "free video creator", "image animator"],
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    title: "Free Image to Video Generator - Convert Photos to MP4",
    description: "Create professional animated videos from still images with 19+ smooth motion effects. No signup, no AI.",
    url: absoluteUrl("/"),
    siteName: "Free Image to Video Generator",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to Video Generator",
    description: "Convert your photos to animated MP4 videos - 19+ effects, fast rendering, no signup needed"
  }
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Generator />
      <FeatureBand />
      <FAQSection />
    </>
  );
}
