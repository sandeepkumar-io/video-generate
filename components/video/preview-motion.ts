"use client";

import type {AnimationPreset} from "@/lib/video-options";

export function getPreviewMotion(animation: AnimationPreset) {
  const transition = {duration: 4, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const};

  switch (animation) {
    case "zoom-in":
      return {initial: {scale: 1}, animate: {scale: 1.18}, transition};
    case "zoom-out":
      return {initial: {scale: 1.18}, animate: {scale: 1}, transition};
    case "pan-left":
      return {initial: {scale: 1.12, x: "4%"}, animate: {scale: 1.12, x: "-4%"}, transition};
    case "pan-right":
      return {initial: {scale: 1.12, x: "-4%"}, animate: {scale: 1.12, x: "4%"}, transition};
    case "pan-up":
      return {initial: {scale: 1.12, y: "4%"}, animate: {scale: 1.12, y: "-4%"}, transition};
    case "pan-down":
      return {initial: {scale: 1.12, y: "-4%"}, animate: {scale: 1.12, y: "4%"}, transition};
    case "rotate-slow":
      return {initial: {scale: 1.12, rotate: -2}, animate: {scale: 1.12, rotate: 2}, transition};
    case "fade-in":
      return {initial: {opacity: 0.35, scale: 1.04}, animate: {opacity: 1, scale: 1.04}, transition};
    case "ken-burns":
    default:
      return {initial: {scale: 1.03, x: "-2%", y: "1%"}, animate: {scale: 1.2, x: "3%", y: "-2%"}, transition};
  }
}
