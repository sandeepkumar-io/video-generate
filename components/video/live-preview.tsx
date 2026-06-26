"use client";

import {motion} from "framer-motion";
import {Play} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getAspectRatioClass} from "@/lib/video-options";
import {useVideoStore} from "@/lib/video-store";
import {getPreviewMotion} from "@/components/video/preview-motion";

export function LivePreview() {
  const {imageSrc, animation, aspectRatio} = useVideoStore();
  const motionProps = getPreviewMotion(animation);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live preview</CardTitle>
        <CardDescription>Framer Motion preview of the selected export animation.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg border bg-slate-950 ${getAspectRatioClass(aspectRatio)}`}>
          {imageSrc ? (
            <motion.img
              key={`${imageSrc}-${animation}`}
              src={imageSrc}
              alt="Animated preview"
              className="absolute inset-0 h-full w-full object-cover"
              initial={motionProps.initial}
              animate={motionProps.animate}
              transition={motionProps.transition}
            />
          ) : (
            <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 text-white/70">
              <Play className="size-10" />
              <p className="text-sm">Upload an image to preview the animation</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
