"use client";

import { create } from "zustand";
import type { AnimationPreset, AspectRatioOption, DurationOption, ResolutionOption, VideoSettings } from "@/lib/video-options";
import { defaultSettings } from "@/lib/video-options";

export interface ImageItem {
  src: string;
  name: string;
}

type VideoStore = VideoSettings & {
  images: ImageItem[];           // ← Changed from single image
  isRendering: boolean;
  renderProgress: number;
  error: string | null;
  videoUrl: string | null;

  setImages: (updater: ImageItem[] | ((prev: ImageItem[]) => ImageItem[])) => void;
  setAnimation: (animation: AnimationPreset) => void;
  setDuration: (duration: DurationOption) => void;
  setResolution: (resolution: ResolutionOption) => void;
  setAspectRatio: (aspectRatio: AspectRatioOption) => void;
  setRendering: (isRendering: boolean) => void;
  setRenderProgress: (renderProgress: number | ((prev: number) => number)) => void;
  setError: (error: string | null) => void;
  setVideoUrl: (videoUrl: string | null) => void;
  reset: () => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  ...defaultSettings,

  images: [],                    // ← Changed
  isRendering: false,
  renderProgress: 0,
  error: null,
  videoUrl: null,

  setImages: (updater) =>
    set((state) => ({
      images: typeof updater === "function" ? updater(state.images) : updater,
      error: null,
      videoUrl: null,            // Clear previous video when images change
    })),

  setAnimation: (animation) => set({ animation, videoUrl: null }),
  setDuration: (duration) => set({ duration, videoUrl: null }),
  setResolution: (resolution) => set({ resolution, videoUrl: null }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio, videoUrl: null }),

  setRendering: (isRendering) => set({ isRendering }),
  setRenderProgress: (renderProgress) =>
    set((state) => ({
      renderProgress: typeof renderProgress === "function" ? renderProgress(state.renderProgress) : renderProgress,
    })),
  setError: (error) => set({ error }),
  setVideoUrl: (videoUrl) => set({ videoUrl }),

  reset: () =>
    set({
      ...defaultSettings,
      images: [],                 // ← Changed
      isRendering: false,
      renderProgress: 0,
      error: null,
      videoUrl: null,
    }),
}));