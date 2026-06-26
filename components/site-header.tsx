import Link from "next/link";
import {Clapperboard} from "lucide-react";
import {ThemeToggle} from "@/components/theme-toggle";
import {Button} from "@/components/ui/button";

const navItems = [
  {href: "/free-image-to-video", label: "Generator"},
  {href: "/image-animation-tool", label: "Effects"},
  {href: "/blog", label: "Blog"}
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Clapperboard className="size-5" />
          </span>
          <span className="hidden sm:inline">Free Image to Video Generator</span>
          <span className="sm:hidden">Image2Video</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <Link href="/free-image-to-video#create">Create Video</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
