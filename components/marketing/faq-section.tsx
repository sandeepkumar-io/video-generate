"use client";

import {ChevronDown} from "lucide-react";
import {useState} from "react";
import Script from "next/script";

const faqs = [
  {
    question: "Is the image to video generator really free?",
    answer: "Yes, completely free! No signup required, no hidden fees, no watermarks. Create unlimited videos without any limitations. We believe video creation tools should be accessible to everyone."
  },
  {
    question: "What image formats are supported?",
    answer: "We support JPG, JPEG, PNG, and WEBP formats. Images can be up to 8MB in size. The tool works with any image resolution, automatically scaling to your chosen export dimensions."
  },
  {
    question: "What video formats and resolutions can I export?",
    answer: "Export MP4 videos in 720p or 1080p resolution. Choose from multiple aspect ratios: 16:9 (horizontal), 9:16 (vertical), and 1:1 (square). Perfect for YouTube, Instagram Reels, TikTok, and websites."
  },
  {
    question: "Can I upload multiple images?",
    answer: "Yes! Upload up to 6 or more images and create a slideshow. Each image will play with your chosen animation for the specified duration. Perfect for creating photo montages and presentations."
  },
  {
    question: "How many animation effects are available?",
    answer: "Choose from 19+ professional motion presets including Zoom, Pan, Slide, Tilt, Pulse, Fade, Rotate, Ken Burns, and more. All animations are smooth and optimized for fast rendering."
  },
  {
    question: "How long does it take to render a video?",
    answer: "Rendering is fast! A 3-second video typically renders in under 10 seconds. Rendering speed depends on your video duration, resolution, and browser capabilities. No queue, no waiting."
  },
  {
    question: "Do I need to install any software?",
    answer: "No! Everything happens in your browser. No downloads, no installation, no setup required. Works on Windows, Mac, Linux, and any device with a modern web browser."
  },
  {
    question: "Is this tool mobile-friendly?",
    answer: "Yes, the tool is fully responsive and works on mobile devices. Upload images, preview animations, and download videos from your smartphone or tablet."
  },
  {
    question: "Does it use AI or require a GPU?",
    answer: "No AI models, no GPU required. The tool uses deterministic animation transforms processed through Remotion rendering. All processing happens locally without any external API calls."
  },
  {
    question: "Can I use the videos commercially?",
    answer: "Yes! You own the videos you create. Use them for personal projects, commercial work, social media, websites, presentations, and more without any restrictions."
  }
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <section className="py-16">
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      <div className="container max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about our free image to video converter
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-lg border bg-card"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenId(openId === idx ? null : idx)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold hover:bg-muted/50"
              >
                <span itemProp="name">{faq.question}</span>
                <ChevronDown
                  className={`size-5 transition-transform ${
                    openId === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openId === idx && (
                <div
                  className="border-t px-6 py-4 text-muted-foreground"
                  itemProp="acceptedAnswer"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
