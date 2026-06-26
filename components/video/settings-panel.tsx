"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {aspectRatios, durations, resolutions} from "@/lib/video-options";
import type {AspectRatioOption, DurationOption, ResolutionOption} from "@/lib/video-options";
import {useVideoStore} from "@/lib/video-store";

export function SettingsPanel() {
  const {duration, resolution, aspectRatio, setDuration, setResolution, setAspectRatio} = useVideoStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video settings</CardTitle>
        <CardDescription>Configure length, export quality, and format.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <OptionGroup
          label="Duration"
          value={`${duration}s`}
          options={durations.map((item) => ({label: `${item}s`, value: item}))}
          activeValue={duration}
          onSelect={(value) => setDuration(value as DurationOption)}
        />
        <OptionGroup
          label="Resolution"
          value={resolution}
          options={resolutions.map((item) => ({label: item, value: item}))}
          activeValue={resolution}
          onSelect={(value) => setResolution(value as ResolutionOption)}
        />
        <OptionGroup
          label="Aspect ratio"
          value={aspectRatio}
          options={aspectRatios.map((item) => ({label: item, value: item}))}
          activeValue={aspectRatio}
          onSelect={(value) => setAspectRatio(value as AspectRatioOption)}
        />
      </CardContent>
    </Card>
  );
}

function OptionGroup<T extends string | number>({
  label,
  value,
  options,
  activeValue,
  onSelect
}: {
  label: string;
  value: string;
  options: Array<{label: string; value: T}>;
  activeValue: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <Label>{label}</Label>
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => {
          const active = option.value === activeValue;
          return (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`h-10 rounded-md border px-3 text-sm font-medium transition ${
                active ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
