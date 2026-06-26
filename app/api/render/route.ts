import {randomUUID} from "node:crypto";
import {readFile, unlink} from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import {bundle} from "@remotion/bundler";
import {renderMedia, selectComposition} from "@remotion/renderer";
import {
  animationPresets,
  aspectRatios,
  durations,
  resolutions,
  type ImageVideoProps
} from "@/remotion/video-options";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

let bundlePromise: Promise<string> | null = null;

function getBundle() {
  bundlePromise ??= bundle({
    entryPoint: path.join(process.cwd(), "remotion", "index.ts"),
    webpackOverride: (config) => config
  });

  return bundlePromise;
}

function parsePayload(payload: unknown): ImageVideoProps {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid render payload.");
  }

  const candidate = payload as Partial<ImageVideoProps>;

  if (typeof candidate.imageSrc !== "string" || !candidate.imageSrc.startsWith("data:image/")) {
    throw new Error("Upload a valid image before rendering.");
  }

  if (!animationPresets.includes(candidate.animation as ImageVideoProps["animation"])) {
    throw new Error("Choose a valid animation preset.");
  }

  if (!durations.includes(candidate.duration as ImageVideoProps["duration"])) {
    throw new Error("Choose a valid duration.");
  }

  if (!resolutions.includes(candidate.resolution as ImageVideoProps["resolution"])) {
    throw new Error("Choose a valid resolution.");
  }

  if (!aspectRatios.includes(candidate.aspectRatio as ImageVideoProps["aspectRatio"])) {
    throw new Error("Choose a valid aspect ratio.");
  }

  return candidate as ImageVideoProps;
}

export async function POST(request: Request) {
  let outputLocation: string | null = null;

  try {
    const inputProps = parsePayload(await request.json());
    const serveUrl = await getBundle();
    const composition = await selectComposition({
      serveUrl,
      id: "ImageVideo",
      inputProps
    });

    outputLocation = path.join(os.tmpdir(), `image-video-${randomUUID()}.mp4`);

    await renderMedia({
      composition,
      serveUrl,
      codec: "h264",
      outputLocation,
      inputProps,
      chromiumOptions: process.env.REMOTION_CHROMIUM_EXECUTABLE
        ? {executablePath: process.env.REMOTION_CHROMIUM_EXECUTABLE}
        : undefined
    });

    const videoBuffer = await readFile(outputLocation);

    return new Response(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": String(videoBuffer.byteLength),
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return Response.json(
      {error: error instanceof Error ? error.message : "Unable to render video."},
      {status: 400}
    );
  } finally {
    if (outputLocation) {
      await unlink(outputLocation).catch(() => undefined);
    }
  }
}
