"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { animationPresets } from "@/lib/video-options";
import { Layers, ChevronDown, X } from "lucide-react";
import Link from "next/link";

export function EffectsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Layers className="size-4" />
        Effects
        <ChevronDown className="size-4" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Panel */}
          <div className="absolute top-full right-0 z-50 mt-2 w-80 rounded-lg border bg-background shadow-lg">
            <div className="space-y-4 p-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Layers className="size-4" />
                  Animation Effects
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Effects Grid */}
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {animationPresets.map((animation) => (
                  <Link
                    key={animation.id}
                    href={`/free-image-to-video?animation=${animation.id}`}
                    onClick={() => setIsOpen(false)}
                    className="group rounded-lg border p-3 transition hover:border-primary hover:bg-muted"
                  >
                    <div className="font-medium text-sm group-hover:text-primary">
                      {animation.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {animation.description}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t pt-3">
                <Link
                  href="/free-image-to-video"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Create Video with Effects →
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
