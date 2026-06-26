import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

export const MAX_IMAGE_SIZE_MB = 8;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const durations = [3, 5, 10] as const;
export const resolutions = ["720p", "1080p"] as const;
export const aspectRatios = ["16:9", "9:16", "1:1"] as const;

export const animationPresets = [
  { id: "zoom-in", label: "Zoom In", description: "Smooth zoom toward the center." },
  { id: "zoom-out", label: "Zoom Out", description: "Smooth zoom away from center." },
  { id: "pan-left", label: "Pan Left", description: "Elegant leftward pan movement." },
  { id: "pan-right", label: "Pan Right", description: "Elegant rightward pan movement." },
  { id: "pan-up", label: "Pan Up", description: "Smooth upward slide motion." },
  { id: "pan-down", label: "Pan Down", description: "Smooth downward slide motion." },
  { id: "rotate-slow", label: "Rotate", description: "Subtle cinematic rotation effect." },
  { id: "fade-in", label: "Fade In", description: "Smooth fade-in appearance." },
  { id: "fade-out", label: "Fade Out", description: "Smooth fade-out disappearance." },
  { id: "slide-left", label: "Slide Left", description: "Dynamic left slide with fade." },
  { id: "slide-right", label: "Slide Right", description: "Dynamic right slide with fade." },
  { id: "slide-up", label: "Slide Up", description: "Dynamic upward slide with fade." },
  { id: "slide-down", label: "Slide Down", description: "Dynamic downward slide with fade." },
  { id: "tilt-left", label: "Tilt Left", description: "3D perspective tilt effect." },
  { id: "tilt-right", label: "Tilt Right", description: "3D perspective tilt effect." },
  { id: "tilt-up", label: "Tilt Up", description: "3D perspective tilt effect." },
  { id: "pulse-zoom", label: "Pulse Zoom", description: "Rhythmic pulse zoom effect." },
  { id: "elegant-pan", label: "Elegant Pan", description: "Smooth combined pan and zoom." },
  { id: "ken-burns", label: "Ken Burns", description: "Classic documentary-style motion." }
] as const;

export type AnimationPreset = (typeof animationPresets)[number]["id"];
export type DurationOption = (typeof durations)[number];
export type ResolutionOption = (typeof resolutions)[number];
export type AspectRatioOption = (typeof aspectRatios)[number];

export interface ImageItem {
  src: string;
  name: string;
}

export type VideoSettings = {
  animation: AnimationPreset;
  duration: DurationOption;
  resolution: ResolutionOption;
  aspectRatio: AspectRatioOption;
  fps: 30 | 60;           // Higher FPS = smoother video
};

export type RenderPayload = VideoSettings & {
  images: ImageItem[];     // Support for multiple images
};

export function getVideoDimensions(resolution: ResolutionOption, aspectRatio: AspectRatioOption) {
  const longEdge = resolution === "1080p" ? 1080 : 720;

  if (aspectRatio === "16:9") {
    return { width: Math.round((longEdge * 16) / 9), height: longEdge };
  }
  if (aspectRatio === "9:16") {
    return { width: longEdge, height: Math.round((longEdge * 16) / 9) };
  }
  return { width: longEdge, height: longEdge };
}

export function getAspectRatioClass(aspectRatio: AspectRatioOption) {
  if (aspectRatio === "9:16") return "aspect-[9/16]";
  if (aspectRatio === "1:1") return "aspect-square";
  return "aspect-video";
}

export function validateImageFile(file: File) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Upload a JPG, JPEG, PNG, or WEBP image.";
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return `Image must be ${MAX_IMAGE_SIZE_MB}MB or smaller.`;
  }
  return null;
}

export const defaultSettings: VideoSettings = {
  animation: "elegant-pan",
  duration: 3,
  resolution: "1080p",
  aspectRatio: "16:9",
  fps: 30,                    // 30fps for faster rendering
};

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  faqs: Array<{ question: string; answer: string }>;
};

export const seoPages: SeoPage[] = [
  {
    slug: "free-image-to-video",
    title: "Free Image to Video Generator - Create MP4 Videos Online",
    description: "Turn a JPG, PNG, or WEBP image into a polished animated MP4 video with zoom, pan, fade, rotate, and Ken Burns presets.",
    h1: "Free Image to Video Generator",
    intro: "Create a downloadable MP4 from a still image with browser-friendly motion presets and no AI model, GPU, or editing software required.",
    faqs: [
      { question: "Is the image to video generator free?", answer: "Yes. The app is designed to convert a photo into a short MP4 using deterministic animation presets without paid AI processing." },
      { question: "Which image formats are supported?", answer: "You can upload JPG, JPEG, PNG, and WEBP files up to the configured file size limit." },
      { question: "Can I download the finished video?", answer: "Yes. After rendering, the generated MP4 appears in the preview player with a download button." }
    ]
  },
  // ... (you can keep the other seo pages as they were)
  {
    slug: "photo-to-video-maker",
    title: "Photo to Video Maker - Animate Photos into MP4",
    description: "Use a simple photo to video maker to animate one image with cinematic movement and export an MP4 for social posts or websites.",
    h1: "Photo to Video Maker",
    intro: "Upload a single photo, pick a motion style, choose the aspect ratio, and render a short MP4 ready for sharing.",
    faqs: [
      { question: "Do I need video editing experience?", answer: "No. The maker uses preset movements, so you only choose the image, duration, resolution, and aspect ratio." },
      { question: "Can I create vertical videos?", answer: "Yes. Choose the 9:16 aspect ratio for short-form video platforms." },
      { question: "Does this use generative AI?", answer: "No. It animates the uploaded image with traditional transform, opacity, and camera movement effects." }
    ]
  },
  // Add the remaining seo pages if you want (they were duplicated before)
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function buildMetadata(page: SeoPage): Metadata {
  const url = absoluteUrl(`/${page.slug}`);

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url,
      siteName: "Free Image to Video Generator"
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description
    }
  };
}

export function faqSchema(page: SeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function softwareSchema(page: SeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.h1,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    description: page.description,
    url: absoluteUrl(`/${page.slug}`)
  };
}