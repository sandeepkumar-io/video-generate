import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig} from "remotion";
import {getImageStyle} from "./animation";
import type {ImageVideoProps} from "./video-options";

export function ImageVideo({imageSrc, animation}: ImageVideoProps) {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const imageStyle = getImageStyle(animation, frame, durationInFrames);

  return (
    <AbsoluteFill style={{backgroundColor: "#020617", overflow: "hidden"}}>
      {imageSrc ? (
        <Img src={imageSrc} style={imageStyle} />
      ) : (
        <AbsoluteFill style={{alignItems: "center", justifyContent: "center", color: "white", fontFamily: "sans-serif"}}>
          Upload an image
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}
