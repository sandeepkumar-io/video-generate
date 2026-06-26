# Free Image to Video Generator

A production-oriented Next.js 15 app that converts one uploaded image into an animated MP4 without AI models or GPU inference. It uses Framer Motion for live previews and Remotion for deterministic video rendering.

## Features

- Drag-and-drop image upload for JPG, JPEG, PNG, and WEBP
- File size validation with preview
- Animation presets: Zoom In, Zoom Out, Pan Left, Pan Right, Pan Up, Pan Down, Rotate Slow, Fade In, Ken Burns Effect
- Duration options: 3s, 5s, 10s
- Resolution options: 720p, 1080p
- Aspect ratios: 16:9, 9:16, 1:1
- Live Framer Motion preview before export
- Remotion MP4 rendering through `/api/render`
- Downloadable MP4 with video preview
- Dark mode
- SEO pages with Open Graph and structured data
- Blog section with sample articles

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run typecheck
npm run build
```

Remotion Studio:

```bash
npm run remotion
```

Sample render from the Remotion entry:

```bash
npm run render:sample
```

## Vercel Deployment

1. Push the project to a Git repository.
2. Import the repository in Vercel.
3. Set `NEXT_PUBLIC_APP_URL` to the production URL, for example `https://your-domain.com`.
4. Deploy with the default Next.js build command:

```bash
npm run build
```

The included `/api/render` route uses Remotion server-side rendering. For short clips it can run in a Node runtime, but production traffic and longer renders are better served by Remotion Lambda or a dedicated render worker because serverless functions have execution time, memory, and Chromium constraints.

## Production Notes

- Keep upload limits conservative. The default client limit is 8MB.
- Use a queue or Remotion Lambda for sustained render volume.
- Store generated videos in object storage if downloads should persist beyond the current request.
- Set `NEXT_PUBLIC_APP_URL` so canonical URLs, Open Graph tags, and structured data use the production domain.

## Folder Structure

```text
app/
  api/render/route.ts
  blog/
  free-image-to-video/
  image-animation-tool/
  ken-burns-effect-generator/
  photo-to-video-maker/
components/
  marketing/
  ui/
  video/
lib/
  blog.ts
  utils.ts
  video-options.ts
  video-store.ts
remotion/
  ImageVideo.tsx
  Root.tsx
  animation.ts
  index.ts
  video-options.ts
```
