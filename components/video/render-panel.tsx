"use client";

import { Download, Loader2, Wand2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useVideoStore } from "@/lib/video-store";

export function RenderPanel() {
  const {
    images,
    animation,
    duration,
    resolution,
    aspectRatio,
    fps,
    isRendering,
    renderProgress,
    error,
    videoUrl,
    setRendering,
    setRenderProgress,
    setError,
    setVideoUrl,
  } = useVideoStore();

  async function renderVideo() {
    if (images.length === 0) {
      setError("Please upload at least one image before rendering.");
      return;
    }

    try {
      setRendering(true);
      setRenderProgress(10);
      setError(null);
      setVideoUrl(null);

      const progressTimer = window.setInterval(() => {
        setRenderProgress((prev) => Math.min(92, prev + 6));
      }, 800);

      const payload = {
        images,           // ← Send all images
        animation,
        duration,
        resolution,
        aspectRatio,
        fps,              // ← Added for smoother video
      };

      const response = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      window.clearInterval(progressTimer);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Video rendering failed.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setVideoUrl(url);
      setRenderProgress(100);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Video rendering failed.";
      setError(message);
      setRenderProgress(0);
    } finally {
      setRendering(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate MP4</CardTitle>
        <CardDescription>
          Render {images.length} image{images.length > 1 ? "s" : ""} with selected animation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {error && (
          <div className="flex items-start gap-3 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="button"
          size="lg"
          className="w-full"
          disabled={isRendering || images.length === 0}
          onClick={renderVideo}
        >
          {isRendering ? <Loader2 className="animate-spin" /> : <Wand2 />}
          {isRendering ? "Rendering Video..." : `Generate MP4 (${images.length} image${images.length > 1 ? "s" : ""})`}
        </Button>

        {isRendering && (
          <div className="space-y-2">
            <Progress value={renderProgress} />
            <p className="text-sm text-muted-foreground text-center">
              Creating smooth animation • This may take a few seconds...
            </p>
          </div>
        )}

        {videoUrl && (
          <div className="space-y-4">
            <video
              className="w-full rounded-lg border"
              src={videoUrl}
              controls
              playsInline
              autoPlay
              muted
            />
            <Button asChild className="w-full" variant="secondary">
              <a
                href={videoUrl}
                download={`animated-video-${animation}-${duration}s.mp4`}
              >
                <Download className="mr-2" />
                Download Video
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                URL.revokeObjectURL(videoUrl);
                setVideoUrl(null);
              }}
            >
              Clear Preview
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}