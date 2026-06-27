import {randomUUID} from "node:crypto";
import {readFile, unlink} from "node:fs/promises";
import path from "node:path";
import os from "node:os";
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

async function getBundle() {
  if (bundlePromise) return bundlePromise;

  bundlePromise = (async () => {
    const {bundle} = await import("@remotion/bundler");

    // Determine the correct entry point path based on environment
    let entryPoint: string;

    if (process.env.REMOTION_ENTRY_POINT) {
      // Custom path from environment variable
      entryPoint = process.env.REMOTION_ENTRY_POINT;
    } else if (process.env.NODE_ENV === "production" && process.env.VERCEL) {
      // Vercel environment
      entryPoint = path.join(process.cwd(), "remotion", "index.ts");
    } else if (process.env.LAMBDA_TASK_ROOT) {
      // AWS Lambda environment
      entryPoint = path.join(process.env.LAMBDA_TASK_ROOT, "remotion", "index.ts");
    } else {
      // Default: local or other environments
      entryPoint = path.join(process.cwd(), "remotion", "index.ts");
    }

    console.log("📹 Remotion entry point:", entryPoint);

    return bundle({
      entryPoint,
      webpackOverride: (config) => config
    });
  })();

  return bundlePromise;
}

function parsePayload(payload: unknown): ImageVideoProps {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!animationPresets.includes(animation as any)) {
    throw new Error("Choose a valid animation preset.");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!durations.includes(duration as any)) {
    throw new Error("Choose a valid duration.");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!resolutions.includes(resolution as any)) {
    throw new Error("Choose a valid resolution.");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!aspectRatios.includes(aspectRatio as any)) {
    throw new Error("Choose a valid aspect ratio.");
  }

  return {
    imageSrcs,
    animation: animation as never,
    duration: duration as never,
    resolution: resolution as never,
    aspectRatio: aspectRatio as never
  };
}

export async function POST(request: Request) {
  let outputLocation: string | null = null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderer = (await import("@remotion/renderer")) as any;
    const inputProps = parsePayload(await request.json());
    const serveUrl = await getBundle();
    const composition = await renderer.selectComposition({
      serveUrl,
      id: "ImageVideo",
      inputProps
    });

    outputLocation = path.join(os.tmpdir(), `image-video-${randomUUID()}.mp4`);

    const chromiumOptions = process.env.REMOTION_CHROMIUM_EXECUTABLE
      ? {executablePath: process.env.REMOTION_CHROMIUM_EXECUTABLE}
      : undefined;

    await renderer.renderMedia({
      composition,
      serveUrl,
      codec: "h264",
      outputLocation,
      inputProps,
      crf: 26,
      pixelFormat: "yuv420p",
      chromiumOptions
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
