"use client";

import { useCallback, useRef, useState } from "react";
import { ImageUp, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB, validateImageFile } from "@/lib/video-options";
import { useVideoStore } from "@/lib/video-store";

export function UploadDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Get multiple images support from store
  const { images, setImages, setError, reset } = useVideoStore();

  const readFile = useCallback((file: File) => {
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImages((prev) => [...prev, { src: reader.result as string, name: file.name }]);
      }
    };
    reader.onerror = () => setError("Could not read the image. Try a different file.");
    reader.readAsDataURL(file);
  }, [setError, setImages]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      readFile(file);
    });
  }, [readFile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload images</CardTitle>
        <CardDescription>
          Drag in JPG, JPEG, PNG, or WEBP images up to {MAX_IMAGE_SIZE_MB}MB each. You can upload multiple images.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`flex min-h-64 w-full flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition ${
            isDragging ? "border-primary bg-primary/10" : "border-border bg-muted/30 hover:bg-muted/50"
          }`}
        >
          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.name}
                    className="w-full aspect-square object-cover rounded-md border"
                  />
                  <div className="absolute bottom-1 left-1 right-1 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded truncate">
                    {img.name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ImageUp className="size-7" />
              </span>
              <span className="text-base font-semibold">Drop your images here</span>
              <span className="mt-2 text-sm text-muted-foreground">or click to browse your device</span>
            </>
          )}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          multiple // ← Important
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.currentTarget.value = ""; // reset input
          }}
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="button" onClick={() => inputRef.current?.click()} variant="secondary">
            <Upload />
            Choose images
          </Button>

          {images.length > 0 && (
            <Button type="button" variant="outline" onClick={reset}>
              <X />
              Remove all
            </Button>
          )}
        </div>

        {images.length > 0 && (
          <p className="mt-3 text-sm text-muted-foreground text-center">
            {images.length} image{images.length > 1 ? "s" : ""} uploaded
          </p>
        )}
      </CardContent>
    </Card>
  );
}