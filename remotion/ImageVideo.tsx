import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig} from "remotion";
import {getImageStyle} from "./animation";
import type {ImageVideoProps} from "./video-options";

export function ImageVideo({imageSrcs, animation}: ImageVideoProps) {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  const imageDurationFrames = durationInFrames / imageSrcs.length;
  const currentImageIndex = Math.floor(frame / imageDurationFrames);
  const frameInImage = frame % imageDurationFrames;

  const currentImageSrc = imageSrcs[currentImageIndex];
  const imageStyle = getImageStyle(animation, frameInImage, imageDurationFrames);

  return (
    <AbsoluteFill style={{backgroundColor: "#020617", overflow: "hidden"}}>
      {currentImageSrc ? (
        <Img src={currentImageSrc} style={imageStyle} />
      ) : (
        <AbsoluteFill style={{alignItems: "center", justifyContent: "center", color: "white", fontFamily: "sans-serif"}}>
          Upload images
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}
