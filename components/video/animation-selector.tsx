"use client";

import {Check} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {animationPresets} from "@/lib/video-options";
import {useVideoStore} from "@/lib/video-store";

export function AnimationSelector() {
  const {animation, setAnimation} = useVideoStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Animation options</CardTitle>
        <CardDescription>Choose a deterministic motion preset for the exported MP4.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {animationPresets.map((preset) => {
            const active = preset.id === animation;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setAnimation(preset.id)}
                className={`min-h-28 rounded-lg border p-4 text-left transition ${
                  active ? "border-primary bg-primary/10" : "hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{preset.label}</span>
                  {active ? <Check className="size-4 text-primary" /> : null}
                </span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{preset.description}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
