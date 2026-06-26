import {Film, Gauge, MonitorSmartphone, ShieldCheck} from "lucide-react";

const features = [
  {
    icon: Film,
    title: "Motion presets",
    description: "Zoom, pan, rotate, fade, and Ken Burns effects give a still image enough movement for polished video."
  },
  {
    icon: MonitorSmartphone,
    title: "Social formats",
    description: "Export horizontal, vertical, and square videos for websites, presentations, Reels, Shorts, and feed posts."
  },
  {
    icon: Gauge,
    title: "No GPU pipeline",
    description: "The app uses deterministic transforms and Remotion rendering rather than generative AI or model inference."
  },
  {
    icon: ShieldCheck,
    title: "Preview first",
    description: "Framer Motion previews make it easy to check framing and animation before committing to an MP4 render."
  }
];

export function FeatureBand() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-lg border bg-card p-6">
                <Icon className="size-6 text-primary" />
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
