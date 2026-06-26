import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import Script from "next/script";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {absoluteUrl} from "@/lib/utils";
import "./globals.css";

const inter = Inter({subsets: ["latin"], display: "swap"});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: "Free Image to Video Generator",
    template: "%s | Free Image to Video Generator"
  },
  description: "Convert a still image into an animated MP4 with zoom, pan, fade, rotate, and Ken Burns effects.",
  alternates: {canonical: absoluteUrl("/")},
  openGraph: {
    title: "Free Image to Video Generator",
    description: "Create animated MP4 videos from JPG, PNG, and WEBP images without AI models or GPUs.",
    url: absoluteUrl("/"),
    siteName: "Free Image to Video Generator",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "#ffffff"},
    {media: "(prefers-color-scheme: dark)", color: "#111827"}
  ]
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Free Image to Video Generator",
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/blog")}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Script id="website-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
