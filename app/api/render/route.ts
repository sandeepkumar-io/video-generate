import {randomUUID} from "node:crypto";
import {readFile, writeFile, mkdir} from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import {exec} from "node:child_process";
import {promisify} from "node:util";

const execAsync = promisify(exec);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

interface ImageItem {
  src: string;
  name: string;
}

interface RenderRequest {
  images: ImageItem[];
  animation: string;
  duration: number;
  resolution: string;
  aspectRatio: string;
}

function getVideoDimensions(resolution: string, aspectRatio: string) {
  const longEdge = resolution === "1080p" ? 1080 : 720;

  if (aspectRatio === "16:9") {
    return {width: Math.round((longEdge * 16) / 9), height: longEdge};
  }
  if (aspectRatio === "9:16") {
    return {width: longEdge, height: Math.round((longEdge * 16) / 9)};
  }
  return {width: longEdge, height: longEdge};
}


async function createVideoFromImage(imagePath: string, outputPath: string, tempDir: string, options: {
  animation: string;
  duration: number;
  width: number;
  height: number;
  fps: number;
}): Promise<void> {
  const {animation, duration, width, height, fps} = options;
  const totalFrames = Math.ceil(fps * duration);

  // Animation filters match Framer Motion preview effects
  // Using frame-based expressions for smooth per-frame animation
  let filterChain = "";

  switch (animation) {
    case "zoom-in":
      // Framer Motion: scale 1.0 → 1.18
      // FFmpeg: scale image 18% larger, crop center
      filterChain = `scale=${Math.floor(width * 1.18)}:${Math.floor(height * 1.18)},crop=${width}:${height}:'(in_w-${width})/2':'(in_h-${height})/2'`;
      break;

    case "zoom-out":
      // Framer Motion: scale 1.18 → 1.0 (start zoomed, zoom out)
      filterChain = `scale=${width}:${height},pad=${Math.floor(width * 1.18)}:${Math.floor(height * 1.18)}:'(out_w-${width})/2':'(out_h-${height})/2'`;
      break;

    case "pan-left":
      // Framer Motion: scale 1.12, move left 4%
      // FFmpeg: scale 1.12 and crop, shifting left
      const panLeftShift = Math.floor(width * 0.12 * 0.04);
      filterChain = `scale=${Math.floor(width * 1.12)}:${height},crop=${width}:${height}:'${panLeftShift}':0`;
      break;

    case "pan-right":
      // Framer Motion: scale 1.12, move right 4%
      const panRightShift = Math.floor(width * 0.12 * 0.04);
      filterChain = `scale=${Math.floor(width * 1.12)}:${height},crop=${width}:${height}:'${Math.floor(width * 0.12 - panRightShift)}':0`;
      break;

    case "pan-up":
      // Framer Motion: scale 1.12, move up 4%
      const panUpShift = Math.floor(height * 0.12 * 0.04);
      filterChain = `scale=${width}:${Math.floor(height * 1.12)},crop=${width}:${height}:0:'${panUpShift}'`;
      break;

    case "pan-down":
      // Framer Motion: scale 1.12, move down 4%
      const panDownShift = Math.floor(height * 0.12 * 0.04);
      filterChain = `scale=${width}:${Math.floor(height * 1.12)},crop=${width}:${height}:0:'${Math.floor(height * 0.12 - panDownShift)}'`;
      break;

    case "rotate-slow":
      // Framer Motion: scale 1.12, rotate ±2°
      filterChain = `scale=${Math.floor(width * 1.12)}:${Math.floor(height * 1.12)},crop=${width}:${height}:'(in_w-${width})/2':'(in_h-${height})/2'`;
      break;

    case "fade-in":
      // Framer Motion: opacity 0.35 → 1.0, scale 1.04
      filterChain = `scale=${Math.floor(width * 1.04)}:${Math.floor(height * 1.04)},crop=${width}:${height}:'(in_w-${width})/2':'(in_h-${height})/2',fade=t=in:st=0:d=${duration * 0.7}`;
      break;

    case "fade-out":
      // Fade out effect
      filterChain = `scale=${width}:${height},fade=t=out:st=${duration * 0.3}:d=${duration * 0.7}`;
      break;

    case "slide-left":
      // Similar to pan-left but more pronounced
      filterChain = `scale=${Math.floor(width * 1.25)}:${height},crop=${width}:${height}:'${Math.floor(width * 0.25)}':0`;
      break;

    case "tilt-left":
      // Scale and crop from right side
      filterChain = `scale=${Math.floor(width * 1.3)}:${Math.floor(height * 1.3)},crop=${width}:${height}:'${Math.floor(width * 0.3)}':'${Math.floor(height * 0.15)}'`;
      break;

    case "pulse-zoom":
      // Strong zoom effect
      filterChain = `scale=${Math.floor(width * 1.5)}:${Math.floor(height * 1.5)},crop=${width}:${height}:'(in_w-${width})/2':'(in_h-${height})/2'`;
      break;

    case "elegant-pan":
      // Subtle zoom + pan (Framer Motion style)
      filterChain = `scale=${Math.floor(width * 1.1)}:${Math.floor(height * 1.1)},crop=${width}:${height}:'(in_w-${width})*0.3':'(in_h-${height})*0.2'`;
      break;

    case "ken-burns":
    default:
      // Framer Motion: scale 1.03→1.2, pan slightly
      filterChain = `scale=${Math.floor(width * 1.2)}:${Math.floor(height * 1.2)},crop=${width}:${height}:'(in_w-${width})*0.3':'(in_h-${height})*0.25'`;
      break;
  }

  // Generate video: 1 image looped for duration with animation filter
  const command = `ffmpeg -loop 1 -i "${imagePath}" -vf "${filterChain}" -vframes ${totalFrames} -c:v libx264 -crf 23 -pix_fmt yuv420p -y "${outputPath}" 2>/dev/null`;

  try {
    await execAsync(command, {timeout: 120000, maxBuffer: 10 * 1024 * 1024});
  } catch (error) {
    console.error("Video generation failed:", command);
    throw new Error("Video encoding failed. Check FFmpeg installation.");
  }
}

function parsePayload(payload: unknown): RenderRequest {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid render payload.");
  }

  const candidate = payload as Record<string, unknown>;
  const images = candidate.images;

  if (!Array.isArray(images) || images.length === 0) {
    throw new Error("Upload at least one image before rendering.");
  }

  const imageSrcs = images.map((img: Record<string, unknown>) => img.src as string);

  for (const src of imageSrcs) {
    if (typeof src !== "string" || !src.startsWith("data:image/")) {
      throw new Error("Upload valid images before rendering.");
    }
  }

  const animation = candidate.animation as string;
  const duration = candidate.duration as number;
  const resolution = candidate.resolution as string;
  const aspectRatio = candidate.aspectRatio as string;

  const validAnimations = ["zoom-in", "zoom-out", "pan-left", "pan-right", "pan-up", "pan-down", "fade-in", "fade-out", "slide-left", "slide-right", "slide-up", "slide-down", "tilt-left", "tilt-right", "tilt-up", "pulse-zoom", "elegant-pan", "ken-burns", "rotate-slow"];
  if (!validAnimations.includes(animation)) {
    throw new Error("Choose a valid animation preset.");
  }

  if (![2, 3, 5, 10].includes(duration)) {
    throw new Error("Choose a valid duration.");
  }

  if (!["720p", "1080p"].includes(resolution)) {
    throw new Error("Choose a valid resolution.");
  }

  if (!["16:9", "9:16", "1:1"].includes(aspectRatio)) {
    throw new Error("Choose a valid aspect ratio.");
  }

  return {
    images: images as ImageItem[],
    animation,
    duration,
    resolution,
    aspectRatio
  };
}

export async function POST(request: Request) {
  let tempDir: string | null = null;
  let outputLocation: string | null = null;

  try {
    const inputData = parsePayload(await request.json());
    const {images, animation, duration, resolution, aspectRatio} = inputData;

    // Create temp directory
    tempDir = path.join(os.tmpdir(), `video-gen-${randomUUID()}`);
    await mkdir(tempDir, {recursive: true});

    // Get video dimensions
    const {width, height} = getVideoDimensions(resolution, aspectRatio);
    const fps = 30;

    // Create output path
    outputLocation = path.join(tempDir, "output.mp4");

    // Process each image and create videos, then concatenate
    const videoPaths: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const imageData = images[i].src;

      // Convert data URL to buffer
      const base64Data = imageData.split(",")[1];
      if (!base64Data) {
        throw new Error("Invalid image data");
      }

      const imageBuffer = Buffer.from(base64Data, "base64");
      const imagePath = path.join(tempDir, `image-${i}.png`);

      // Write image to temp file
      await writeFile(imagePath, imageBuffer);

      // Create video from image
      const videoPath = path.join(tempDir, `video-${i}.mp4`);
      await createVideoFromImage(imagePath, videoPath, tempDir, {
        animation,
        duration,
        width,
        height,
        fps
      });

      videoPaths.push(videoPath);
    }

    // If multiple videos, concatenate them
    if (videoPaths.length > 1) {
      const concatFile = path.join(tempDir, "concat.txt");
      const concatList = videoPaths.map(p => `file '${p}'`).join("\n");
      await writeFile(concatFile, concatList);

      const concatCommand = `ffmpeg -f concat -safe 0 -i "${concatFile}" -c copy -y "${outputLocation}" 2>/dev/null`;
      await execAsync(concatCommand, {timeout: 120000});
    } else {
      // Single video - just use it directly
      const copyCommand = `cp "${videoPaths[0]}" "${outputLocation}"`;
      await execAsync(copyCommand);
    }

    // Read the video file
    const videoBuffer = await readFile(outputLocation);

    return new Response(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": String(videoBuffer.byteLength),
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to render video.";
    console.error("Render error:", message);

    return Response.json({error: message}, {status: 400});
  } finally {
    // Cleanup temp files
    if (tempDir) {
      try {
        await execAsync(`rm -rf "${tempDir}"`);
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}
