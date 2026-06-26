import type {Metadata} from "next";
import {absoluteUrl} from "@/lib/utils";

export const MAX_IMAGE_SIZE_MB = 8;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const durations = [3, 5, 10] as const;
export const resolutions = ["720p", "1080p"] as const;
export const aspectRatios = ["16:9", "9:16", "1:1"] as const;

export const animationPresets = [
  {id: "zoom-in", label: "Zoom In", description: "Slowly pushes toward the center of the image."},
  {id: "zoom-out", label: "Zoom Out", description: "Starts close and eases back to reveal the frame."},
  {id: "pan-left", label: "Pan Left", description: "Moves the image left across the canvas."},
  {id: "pan-right", label: "Pan Right", description: "Moves the image right across the canvas."},
  {id: "pan-up", label: "Pan Up", description: "Slides the image upward for vertical motion."},
  {id: "pan-down", label: "Pan Down", description: "Slides the image downward for vertical motion."},
  {id: "rotate-slow", label: "Rotate Slow", description: "Adds a restrained cinematic rotation."},
  {id: "fade-in", label: "Fade In", description: "Reveals the photo with a smooth opacity ramp."},
  {id: "ken-burns", label: "Ken Burns Effect", description: "Combines slow zoom and pan for documentary-style motion."}
] as const;

export type AnimationPreset = (typeof animationPresets)[number]["id"];
export type DurationOption = (typeof durations)[number];
export type ResolutionOption = (typeof resolutions)[number];
export type AspectRatioOption = (typeof aspectRatios)[number];

export type VideoSettings = {
  animation: AnimationPreset;
  duration: DurationOption;
  resolution: ResolutionOption;
  aspectRatio: AspectRatioOption;
};

export type RenderPayload = VideoSettings & {
  imageSrc: string;
};

export function getVideoDimensions(resolution: ResolutionOption, aspectRatio: AspectRatioOption) {
  const longEdge = resolution === "1080p" ? 1080 : 720;

  if (aspectRatio === "16:9") {
    return {width: Math.round((longEdge * 16) / 9), height: longEdge};
  }

  if (aspectRatio === "9:16") {
    return {width: longEdge, height: Math.round((longEdge * 16) / 9)};
  }

  return {width: longEdge, height: longEdge};
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
  animation: "ken-burns",
  duration: 5,
  resolution: "720p",
  aspectRatio: "16:9"
};

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  faqs: Array<{question: string; answer: string}>;
};

export const seoPages: SeoPage[] = [
  {
    slug: "free-image-to-video",
    title: "Free Image to Video Generator - Create MP4 Videos Online",
    description: "Turn a JPG, PNG, or WEBP image into a polished animated MP4 video with zoom, pan, fade, rotate, and Ken Burns presets.",
    h1: "Free Image to Video Generator",
    intro: "Create a downloadable MP4 from a still image with browser-friendly motion presets and no AI model, GPU, or editing software required.",
    faqs: [
      {
        question: "Is the image to video generator free?",
        answer: "Yes. The app is designed to convert a photo into a short MP4 using deterministic animation presets without paid AI processing."
      },
      {
        question: "Which image formats are supported?",
        answer: "You can upload JPG, JPEG, PNG, and WEBP files up to the configured file size limit."
      },
      {
        question: "Can I download the finished video?",
        answer: "Yes. After rendering, the generated MP4 appears in the preview player with a download button."
      }
    ]
  },
  {
    slug: "photo-to-video-maker",
    title: "Photo to Video Maker - Animate Photos into MP4",
    description: "Use a simple photo to video maker to animate one image with cinematic movement and export an MP4 for social posts or websites.",
    h1: "Photo to Video Maker",
    intro: "Upload a single photo, pick a motion style, choose the aspect ratio, and render a short MP4 ready for sharing.",
    faqs: [
      {
        question: "Do I need video editing experience?",
        answer: "No. The maker uses preset movements, so you only choose the image, duration, resolution, and aspect ratio."
      },
      {
        question: "Can I create vertical videos?",
        answer: "Yes. Choose the 9:16 aspect ratio for short-form video platforms."
      },
      {
        question: "Does this use generative AI?",
        answer: "No. It animates the uploaded image with traditional transform, opacity, and camera movement effects."
      }
    ]
  },
  {
    slug: "image-animation-tool",
    title: "Image Animation Tool - Add Zoom, Pan, Rotate, and Fade",
    description: "Animate still images with zoom, pan, rotate, fade, and Ken Burns effects, then export the result as an MP4 video.",
    h1: "Image Animation Tool",
    intro: "Use focused image animation controls to add motion to still photos and preview the effect before export.",
    faqs: [
      {
        question: "What animation effects are included?",
        answer: "The app includes zoom in, zoom out, pan directions, slow rotate, fade in, and Ken Burns effect presets."
      },
      {
        question: "Can I preview the animation?",
        answer: "Yes. The live preview uses the selected preset and updates before you render the final video."
      },
      {
        question: "What video formats are generated?",
        answer: "The export pipeline renders MP4 videos."
      }
    ]
  },
  {
    slug: "ken-burns-effect-generator",
    title: "Ken Burns Effect Generator - Animate Photos Online",
    description: "Create a Ken Burns effect from any photo with slow zoom and pan movement, then download the result as an MP4.",
    h1: "Ken Burns Effect Generator",
    intro: "Apply the classic slow zoom and pan treatment to a still image for cinematic slideshows, reels, and story videos.",
    faqs: [
      {
        question: "What is the Ken Burns effect?",
        answer: "It is a slow zoom and pan animation applied to a still image to create a sense of camera movement."
      },
      {
        question: "Can I use it for Instagram Reels?",
        answer: "Yes. Choose 9:16 and render a vertical MP4 suited to short-form social video."
      },
      {
        question: "Does it alter the original image?",
        answer: "No. The render applies motion to the video frame while keeping the uploaded image content intact."
      }
    ]
  }
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function buildMetadata(page: SeoPage): Metadata {
  const url = absoluteUrl(`/${page.slug}`);

  return {
    title: page.title,
    description: page.description,
    alternates: {canonical: url},
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
