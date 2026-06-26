import Link from "next/link";

const links = [
  {href: "/photo-to-video-maker", label: "Photo to Video Maker"},
  {href: "/ken-burns-effect-generator", label: "Ken Burns Generator"},
  {href: "/blog", label: "Blog"}
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>Built for deterministic image animation and MP4 export.</p>
        <nav className="flex flex-wrap gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
