import Link from "next/link";
import Script from "next/script";
import {ArrowRight, CheckCircle2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Generator} from "@/components/video/generator";
import type {SeoPage} from "@/lib/video-options";
import {faqSchema, softwareSchema} from "@/lib/video-options";

export function SeoLandingPage({page}: {page: SeoPage}) {
  return (
    <>
      <Script id={`${page.slug}-faq-schema`} type="application/ld+json">
        {JSON.stringify(faqSchema(page))}
      </Script>
      <Script id={`${page.slug}-software-schema`} type="application/ld+json">
        {JSON.stringify(softwareSchema(page))}
      </Script>
      <section className="border-b bg-muted/25 py-16">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Online MP4 Creator</p>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-normal sm:text-5xl">{page.h1}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="#create">
                  Create Video
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">Read guides</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-soft">
            <h2 className="text-xl font-semibold">What you can create</h2>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              {[
                "Animated MP4 videos from one uploaded image",
                "Horizontal, vertical, and square video formats",
                "Zoom, pan, rotate, fade, and Ken Burns movement",
                "Previewable effects before export"
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Generator />
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-normal">Frequently asked questions</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
