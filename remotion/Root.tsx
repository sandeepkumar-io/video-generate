import {Composition} from "remotion";
import {ImageVideo} from "./ImageVideo";
import {defaultImageVideoProps, fps, getVideoDimensions} from "./video-options";
import type {ImageVideoProps} from "./video-options";

export function RemotionRoot() {
  return (
    <Composition
      id="ImageVideo"
      component={ImageVideo}
      durationInFrames={defaultImageVideoProps.duration * defaultImageVideoProps.imageSrcs.length * fps}
      fps={fps}
      width={1280}
      height={720}
      defaultProps={defaultImageVideoProps}
      calculateMetadata={({props}: {props: ImageVideoProps}) => {
        const dimensions = getVideoDimensions(props.resolution, props.aspectRatio);
        const totalDurationFrames = props.duration * props.imageSrcs.length * fps;
        return {
          durationInFrames: totalDurationFrames,
          fps,
          ...dimensions
        };
      }}
    />
  );
}
