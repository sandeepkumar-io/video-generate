import Link from "next/link";

const tools = [
  {href: "/free-image-to-video", label: "Free Image to Video"},
  {href: "/photo-to-video-maker", label: "Photo to Video Maker"},
  {href: "/image-animation-tool", label: "Image Animation Tool"},
  {href: "/ken-burns-effect-generator", label: "Ken Burns Generator"}
];

const resources = [
  {href: "/blog", label: "Blog & Guides"},
  {href: "/blog/how-to-convert-image-to-video-for-free", label: "How to Convert Images"},
  {href: "/blog/create-instagram-reels-from-photos", label: "Create Instagram Reels"},
  {href: "/blog/best-photo-animation-effects", label: "Animation Effects Guide"}
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-foreground">About</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Free Image to Video Generator - Convert photos to MP4 videos with 19+ animation effects. No signup, no AI, no GPU required.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Tools</h3>
            <nav className="mt-3 flex flex-col gap-2">
              {tools.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Resources</h3>
            <nav className="mt-3 flex flex-col gap-2">
              {resources.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Free Image to Video Generator. All rights reserved.</p>
          <p className="mt-2">
            Built with <span className="text-primary">Remotion</span> • Open source video rendering
          </p>
        </div>
      </div>
    </footer>
  );
}
