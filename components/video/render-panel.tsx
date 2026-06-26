"use client";

import {Download, Loader2, Wand2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {useVideoStore} from "@/lib/video-store";

export function RenderPanel() {
  const {
    imageSrc,
    animation,
    duration,
    resolution,
    aspectRatio,
    isRendering,
    renderProgress,
    error,
    videoUrl,
    setRendering,
    setRenderProgress,
    setError,
    setVideoUrl
  } = useVideoStore();

  async function renderVideo() {
    if (!imageSrc) {
      setError("Upload an image before rendering.");
      return;
    }

    try {
      setRendering(true);
      setRenderProgress(18);
      setError(null);
      setVideoUrl(null);

      const progressTimer = window.setInterval(() => {
        setRenderProgress(Math.min(92, useVideoStore.getState().renderProgress + 6));
      }, 900);

      const response = await fetch("/api/render", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({imageSrc, animation, duration, resolution, aspectRatio})
      });

      window.clearInterval(progressTimer);

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {error?: string} | null;
        throw new Error(payload?.error ?? "Video rendering failed.");
      }

      const blob = await response.blob();
      setVideoUrl(URL.createObjectURL(blob));
      setRenderProgress(100);
    } catch (renderError) {
      setError(renderError instanceof Error ? renderError.message : "Video rendering failed.");
      setRenderProgress(0);
    } finally {
      setRendering(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate MP4</CardTitle>
        <CardDescription>Render the uploaded image with Remotion and download the finished video.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {error ? <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</div> : null}
        <Button type="button" size="lg" className="w-full" disabled={isRendering || !imageSrc} onClick={renderVideo}>
          {isRendering ? <Loader2 className="animate-spin" /> : <Wand2 />}
          {isRendering ? "Generating video..." : "Generate downloadable MP4"}
        </Button>
        {isRendering ? (
          <div className="space-y-2">
            <Progress value={renderProgress} />
            <p className="text-sm text-muted-foreground">Rendering frames and encoding MP4.</p>
          </div>
        ) : null}
        {videoUrl ? (
          <div className="space-y-4">
            <video className="w-full rounded-lg border" src={videoUrl} controls playsInline />
            <Button asChild className="w-full" variant="secondary">
              <a href={videoUrl} download={`image-video-${animation}-${duration}s.mp4`}>
                <Download />
                Download video
              </a>
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
