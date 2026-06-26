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
    description: "Free online image to video converter. Create animated MP4 videos from JPG, PNG, WEBP images with professional motion effects.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/")}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Image to Video Generator",
    description: "Convert still images into animated MP4 videos with zoom, pan, fade, and professional animation effects. No signup required.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/"),
    image: absoluteUrl("/og-image.png"),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1200",
      bestRating: "5",
      worstRating: "1"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Script id="website-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>
        <Script id="software-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(softwareSchema)}
        </Script>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
