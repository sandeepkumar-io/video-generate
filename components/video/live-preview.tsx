"use client";

import { motion } from "framer-motion";
import { Play, Images } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAspectRatioClass } from "@/lib/video-options";
import { useVideoStore } from "@/lib/video-store";
import { getPreviewMotion } from "@/components/video/preview-motion";
import { useEffect, useState } from "react";

export function LivePreview() {
  const { images, animation, aspectRatio } = useVideoStore();
  const motionProps = getPreviewMotion(animation);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];

  // Auto-cycle images when multiple are uploaded
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500); // Change image every 2.5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live preview</CardTitle>
        <CardDescription>
          Framer Motion preview • Cycling through {images.length} image{images.length > 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg border bg-slate-950 ${getAspectRatioClass(aspectRatio)}`}>
          {currentImage ? (
            <motion.img
              key={`${currentImage.src}-${animation}-${currentIndex}`} // Important: key forces re-animation
              src={currentImage.src}
              alt={currentImage.name}
              className="absolute inset-0 h-full w-full object-cover"
              initial={motionProps.initial}
              animate={motionProps.animate}
              transition={motionProps.transition}
            />
          ) : (
            <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 text-white/70">
              <Play className="size-10" />
              <p className="text-sm">Upload images to preview the animation</p>
            </div>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded bg-black/70 px-3 py-1 text-xs text-white">
              <Images className="size-4" />
              <span>{currentIndex + 1} / {images.length}</span>
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 overflow-hidden rounded border-2 transition ${
                  idx === currentIndex ? "border-primary" : "border-transparent"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.name}
                  className="h-16 w-16 object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}