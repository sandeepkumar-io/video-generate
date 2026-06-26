import {Easing, interpolate} from "remotion";
import type {AnimationPreset} from "./video-options";

export function getImageStyle(animation: AnimationPreset, frame: number, durationInFrames: number): React.CSSProperties {
  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease)
  });

  const lerp = (from: number, to: number) => from + (to - from) * progress;
  const base: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transformOrigin: "center center"
  };

  switch (animation) {
    case "zoom-in":
      return {...base, transform: `scale(${lerp(1, 1.18)})`};
    case "zoom-out":
      return {...base, transform: `scale(${lerp(1.18, 1)})`};
    case "pan-left":
      return {...base, transform: `scale(1.14) translateX(${lerp(4, -4)}%)`};
    case "pan-right":
      return {...base, transform: `scale(1.14) translateX(${lerp(-4, 4)}%)`};
    case "pan-up":
      return {...base, transform: `scale(1.14) translateY(${lerp(4, -4)}%)`};
    case "pan-down":
      return {...base, transform: `scale(1.14) translateY(${lerp(-4, 4)}%)`};
    case "rotate-slow":
      return {...base, transform: `scale(1.12) rotate(${lerp(-2.5, 2.5)}deg)`};
    case "fade-in":
      return {...base, opacity: lerp(0, 1), transform: "scale(1.04)"};
    case "ken-burns":
    default:
      return {...base, transform: `scale(${lerp(1.03, 1.2)}) translate(${lerp(-2, 3)}%, ${lerp(1, -2)}%)`};
  }
}
