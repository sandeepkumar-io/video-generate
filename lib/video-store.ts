"use client";

import {create} from "zustand";
import type {AnimationPreset, AspectRatioOption, DurationOption, ResolutionOption, VideoSettings} from "@/lib/video-options";
import {defaultSettings} from "@/lib/video-options";

type VideoStore = VideoSettings & {
  imageSrc: string | null;
  imageName: string | null;
  isRendering: boolean;
  renderProgress: number;
  error: string | null;
  videoUrl: string | null;
  setImage: (imageSrc: string, imageName: string) => void;
  setAnimation: (animation: AnimationPreset) => void;
  setDuration: (duration: DurationOption) => void;
  setResolution: (resolution: ResolutionOption) => void;
  setAspectRatio: (aspectRatio: AspectRatioOption) => void;
  setRendering: (isRendering: boolean) => void;
  setRenderProgress: (renderProgress: number) => void;
  setError: (error: string | null) => void;
  setVideoUrl: (videoUrl: string | null) => void;
  reset: () => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  ...defaultSettings,
  imageSrc: null,
  imageName: null,
  isRendering: false,
  renderProgress: 0,
  error: null,
  videoUrl: null,
  setImage: (imageSrc, imageName) => set({imageSrc, imageName, error: null, videoUrl: null}),
  setAnimation: (animation) => set({animation, videoUrl: null}),
  setDuration: (duration) => set({duration, videoUrl: null}),
  setResolution: (resolution) => set({resolution, videoUrl: null}),
  setAspectRatio: (aspectRatio) => set({aspectRatio, videoUrl: null}),
  setRendering: (isRendering) => set({isRendering}),
  setRenderProgress: (renderProgress) => set({renderProgress}),
  setError: (error) => set({error}),
  setVideoUrl: (videoUrl) => set({videoUrl}),
  reset: () =>
    set({
      ...defaultSettings,
      imageSrc: null,
      imageName: null,
      isRendering: false,
      renderProgress: 0,
      error: null,
      videoUrl: null
    })
}));
