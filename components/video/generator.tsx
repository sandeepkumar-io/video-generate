"use client";

import {AnimationSelector} from "@/components/video/animation-selector";
import {LivePreview} from "@/components/video/live-preview";
import {RenderPanel} from "@/components/video/render-panel";
import {SettingsPanel} from "@/components/video/settings-panel";
import {UploadDropzone} from "@/components/video/upload-dropzone";

export function Generator() {
  return (
    <section id="create" className="bg-muted/25 py-16">
      <div className="container">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Create Video</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal">Upload, preview, export</h2>
          <p className="mt-3 text-muted-foreground">
            The workflow stays deterministic: your image is animated with transform effects and rendered into MP4.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="space-y-6">
            <UploadDropzone />
            <AnimationSelector />
          </div>
          <div className="space-y-6">
            <LivePreview />
            <SettingsPanel />
            <RenderPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
