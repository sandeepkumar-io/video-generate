"use client";

import {useCallback, useRef, useState} from "react";
import {ImageUp, Upload, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB, validateImageFile} from "@/lib/video-options";
import {useVideoStore} from "@/lib/video-store";

export function UploadDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const {imageSrc, imageName, setImage, setError, reset} = useVideoStore();

  const readFile = useCallback(
    (file: File) => {
      const validationError = validateImageFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result, file.name);
        }
      };
      reader.onerror = () => setError("Could not read the image. Try a different file.");
      reader.readAsDataURL(file);
    },
    [setError, setImage]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload image</CardTitle>
        <CardDescription>Drag in a JPG, JPEG, PNG, or WEBP image up to {MAX_IMAGE_SIZE_MB}MB.</CardDescription>
      </CardHeader>
      <CardContent>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            const file = event.dataTransfer.files.item(0);
            if (file) readFile(file);
          }}
          className={`flex min-h-64 w-full flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition ${
            isDragging ? "border-primary bg-primary/10" : "border-border bg-muted/30 hover:bg-muted/50"
          }`}
        >
          {imageSrc ? (
            <span className="flex w-full flex-col items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc} alt="Uploaded preview" className="max-h-72 max-w-full rounded-md object-contain" />
              <span className="text-sm font-medium">{imageName}</span>
            </span>
          ) : (
            <>
              <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ImageUp className="size-7" />
              </span>
              <span className="text-base font-semibold">Drop your image here</span>
              <span className="mt-2 text-sm text-muted-foreground">or click to browse your device</span>
            </>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.item(0);
            if (file) readFile(file);
            event.currentTarget.value = "";
          }}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="button" onClick={() => inputRef.current?.click()} variant="secondary">
            <Upload />
            Choose image
          </Button>
          {imageSrc ? (
            <Button type="button" variant="outline" onClick={reset}>
              <X />
              Remove
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
