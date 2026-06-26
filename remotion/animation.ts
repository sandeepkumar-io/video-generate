import {Easing, interpolate} from "remotion";
import type {AnimationPreset} from "./video-options";

export function getImageStyle(animation: AnimationPreset, frame: number, durationInFrames: number): React.CSSProperties {
  const easeInOut = Easing.inOut(Easing.bezier(0.34, 1.56, 0.64, 1));
  const easeSmooth = Easing.bezier(0.25, 0.46, 0.45, 0.94);

  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeSmooth
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
      return {...base, transform: `scale(${lerp(1, 1.25)})`, opacity: 1};
    case "zoom-out":
      return {...base, transform: `scale(${lerp(1.25, 1)})`, opacity: 1};
    case "pan-left":
      return {...base, transform: `scale(1.2) translateX(${lerp(8, -8)}%)`, opacity: 1};
    case "pan-right":
      return {...base, transform: `scale(1.2) translateX(${lerp(-8, 8)})%`, opacity: 1};
    case "pan-up":
      return {...base, transform: `scale(1.2) translateY(${lerp(8, -8)}%)`, opacity: 1};
    case "pan-down":
      return {...base, transform: `scale(1.2) translateY(${lerp(-8, 8)}%)`, opacity: 1};
    case "rotate-slow":
      return {...base, transform: `scale(1.15) rotate(${lerp(-3, 3)}deg)`, opacity: 1};
    case "fade-in":
      return {...base, opacity: lerp(0, 1), transform: "scale(1.05)"};
    case "fade-out":
      return {...base, opacity: lerp(1, 0), transform: "scale(1.05)"};
    case "slide-left":
      return {...base, transform: `translateX(${lerp(100, -100)}%) scale(1.1)`, opacity: lerp(0, 1)};
    case "slide-right":
      return {...base, transform: `translateX(${lerp(-100, 100)}%) scale(1.1)`, opacity: lerp(0, 1)};
    case "slide-up":
      return {...base, transform: `translateY(${lerp(100, -100)}%) scale(1.1)`, opacity: lerp(0, 1)};
    case "slide-down":
      return {...base, transform: `translateY(${lerp(-100, 100)}%) scale(1.1)`, opacity: lerp(0, 1)};
    case "tilt-left":
      return {...base, transform: `perspective(1000px) rotateY(${lerp(15, -15)}deg) scale(1.08)`, opacity: 1};
    case "tilt-right":
      return {...base, transform: `perspective(1000px) rotateY(${lerp(-15, 15)}deg) scale(1.08)`, opacity: 1};
    case "tilt-up":
      return {...base, transform: `perspective(1000px) rotateX(${lerp(-15, 15)}deg) scale(1.08)`, opacity: 1};
    case "pulse-zoom":
      return {...base, transform: `scale(${lerp(0.9, 1.2)})`, opacity: 1};
    case "elegant-pan":
      return {...base, transform: `scale(${lerp(1, 1.15)}) translate(${lerp(-5, 5)}%, ${lerp(5, -5)}%)`, opacity: 1};
    case "ken-burns":
    default:
      return {...base, transform: `scale(${lerp(1.05, 1.25)}) translate(${lerp(-3, 4)}%, ${lerp(2, -3)}%)`, opacity: 1};
  }
}
