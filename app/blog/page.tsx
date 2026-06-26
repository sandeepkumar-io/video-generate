import type {Metadata} from "next";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {blogPosts} from "@/lib/blog";
import {absoluteUrl} from "@/lib/utils";

export const metadata: Metadata = {
  title: "Image to Video Blog - Guides, Tips & Tutorials | Free Video Generator",
  description: "Learn how to convert photos to videos, choose the best animation effects, and create social-media-ready MP4s. Expert guides on video creation.",
  keywords: ["image to video guide", "animation tutorial", "video creation tips", "photo animation", "MP4 converter guide"],
  alternates: {canonical: absoluteUrl("/blog")},
  openGraph: {
    title: "Image to Video Blog - Guides & Tutorials",
    description: "Practical guides on converting photos into animated videos, choosing motion effects, and exporting social-ready MP4 files.",
    url: absoluteUrl("/blog"),
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Image to Video Blog",
    description: "Learn image to video conversion, animation tips, and best practices"
  }
};

export default function BlogPage() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Guides</p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal">Image to video blog</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Practical notes on converting photos into animated videos, picking motion effects, and exporting social-ready
            MP4 files.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-lg border bg-card p-6 transition hover:border-primary/50">
              <Badge>{post.readingTime}</Badge>
              <h2 className="mt-5 text-xl font-semibold">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read article
                <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
