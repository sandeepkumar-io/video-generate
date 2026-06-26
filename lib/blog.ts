import type {Metadata} from "next";
import {absoluteUrl} from "@/lib/utils";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  sections: Array<{heading: string; body: string}>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-convert-image-to-video-for-free",
    title: "How to Convert Image to Video for Free",
    description: "A practical walkthrough for turning one still image into a short downloadable MP4 without AI models or a GPU.",
    publishedAt: "2026-06-24",
    readingTime: "4 min read",
    sections: [
      {
        heading: "Start with the right image",
        body: "Choose a sharp source photo with enough room around the subject. Zoom and pan effects need extra visual space so the frame can move without cutting off important details."
      },
      {
        heading: "Pick a motion preset",
        body: "Zoom works well for portraits and products, pan effects work well for landscapes, and Ken Burns is the safest all-purpose choice for editorial or slideshow videos."
      },
      {
        heading: "Export for your destination",
        body: "Use 16:9 for YouTube and website embeds, 9:16 for short-form social video, and 1:1 for feed posts where a square crop is useful."
      }
    ]
  },
  {
    slug: "best-photo-animation-effects",
    title: "Best Photo Animation Effects",
    description: "Compare zoom, pan, rotate, fade, and Ken Burns effects for animating still photos into polished videos.",
    publishedAt: "2026-06-24",
    readingTime: "3 min read",
    sections: [
      {
        heading: "Zoom effects",
        body: "Zoom in adds emphasis and attention. Zoom out gives context and works especially well when the viewer should discover more of the scene over time."
      },
      {
        heading: "Pan effects",
        body: "Horizontal and vertical pans create the feeling of a camera move. They are best when the photo has directional composition or a wide scene."
      },
      {
        heading: "Ken Burns effect",
        body: "The Ken Burns effect combines subtle zoom and pan, which makes it the most natural choice for storytelling, documentaries, and simple photo reels."
      }
    ]
  },
  {
    slug: "create-instagram-reels-from-photos",
    title: "Create Instagram Reels from Photos",
    description: "Use vertical aspect ratios, short durations, and animated photo movement to make simple Instagram Reels from still images.",
    publishedAt: "2026-06-24",
    readingTime: "4 min read",
    sections: [
      {
        heading: "Choose 9:16",
        body: "Vertical 9:16 video fills the phone screen and avoids awkward borders. Use it whenever the final destination is Reels, Shorts, or Stories."
      },
      {
        heading: "Keep motion readable",
        body: "Short videos benefit from clear motion. A 5-second Ken Burns animation or slow zoom often feels more polished than aggressive movement."
      },
      {
        heading: "Preview before export",
        body: "Check that faces, product details, and text remain visible throughout the animation. If the crop feels too tight, switch the preset or aspect ratio."
      }
    ]
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function buildBlogMetadata(post: BlogPost): Metadata {
  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: `${post.title} | Free Image to Video Generator`,
    description: post.description,
    alternates: {canonical: url},
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url,
      siteName: "Free Image to Video Generator"
    }
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Free Image to Video Generator"
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`)
  };
}
