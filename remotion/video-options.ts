export const fps = 30;

export const animationPresets = [
  "zoom-in",
  "zoom-out",
  "pan-left",
  "pan-right",
  "pan-up",
  "pan-down",
  "rotate-slow",
  "fade-in",
  "ken-burns"
] as const;

export const durations = [3, 5, 10] as const;
export const resolutions = ["720p", "1080p"] as const;
export const aspectRatios = ["16:9", "9:16", "1:1"] as const;

export type AnimationPreset = (typeof animationPresets)[number];
export type DurationOption = (typeof durations)[number];
export type ResolutionOption = (typeof resolutions)[number];
export type AspectRatioOption = (typeof aspectRatios)[number];

export type ImageVideoProps = {
  imageSrc: string;
  animation: AnimationPreset;
  duration: DurationOption;
  resolution: ResolutionOption;
  aspectRatio: AspectRatioOption;
};

export const defaultImageVideoProps: ImageVideoProps = {
  imageSrc: "",
  animation: "ken-burns",
  duration: 5,
  resolution: "720p",
  aspectRatio: "16:9"
};

export function getVideoDimensions(resolution: ResolutionOption, aspectRatio: AspectRatioOption) {
  const longEdge = resolution === "1080p" ? 1080 : 720;

  if (aspectRatio === "16:9") return {width: Math.round((longEdge * 16) / 9), height: longEdge};
  if (aspectRatio === "9:16") return {width: longEdge, height: Math.round((longEdge * 16) / 9)};
  return {width: longEdge, height: longEdge};
}
