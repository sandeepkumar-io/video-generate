import Link from "next/link";
import {ArrowRight, PlayCircle, Sparkles} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="container relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1fr_0.82fr] lg:py-20">
        <div className="max-w-3xl">
          <Badge className="mb-5 border-primary/25 bg-primary/10 text-primary">
            <Sparkles className="mr-1 size-3.5" />
            No AI models, no GPU queue
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl">
            Convert Images to Animated Videos Instantly
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Transform your JPG, PNG, or WEBP photos into professional animated MP4 videos with 19+ stunning motion effects. Create zoom, pan, slide, tilt, fade, and Ken Burns animations in seconds. No signup, no AI, no GPU required — preview instantly and download ready-to-use videos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="#create">
                Create Video
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog/how-to-convert-image-to-video-for-free">
                <PlayCircle />
                Learn the workflow
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="overflow-hidden rounded-lg border bg-card shadow-soft">
            <div className="aspect-video bg-[linear-gradient(135deg,#0f766e,#f59e0b_52%,#111827)] p-6">
              <div className="flex h-full items-end justify-between rounded-md border border-white/20 bg-black/20 p-4 text-white backdrop-blur-sm">
                <div>
                  <p className="text-sm opacity-80">Live preview</p>
                  <p className="mt-1 text-2xl font-semibold">Ken Burns MP4</p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-full bg-white text-slate-950">
                  <PlayCircle className="size-7" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 border-t text-center text-sm">
              <div className="p-4">
                <p className="font-semibold">19+ effects</p>
                <p className="text-muted-foreground">Smooth animations</p>
              </div>
              <div className="border-x p-4">
                <p className="font-semibold">MP4 / 30fps</p>
                <p className="text-muted-foreground">Download</p>
              </div>
              <div className="p-4">
                <p className="font-semibold">720p - 1080p</p>
                <p className="text-muted-foreground">Quality export</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
