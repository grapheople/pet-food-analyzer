"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { uploadProviderImage } from "./actions";

const MAX_IMAGES = 5;
const MAX_SIZE_KB = 100;

/** Canvas를 이용해 이미지를 JPEG로 압축 (100KB 이하) → base64 반환 */
async function compressToBase64(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);

  const maxDim = 800;
  let w = bitmap.width;
  let h = bitmap.height;
  if (w > maxDim || h > maxDim) {
    const ratio = Math.min(maxDim / w, maxDim / h);
    w = Math.round(w * ratio);
    h = Math.round(h * ratio);
  }

  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, w, h);

  let quality = 0.8;
  let blob = await canvas.convertToBlob({ type: "image/jpeg", quality });

  while (blob.size > MAX_SIZE_KB * 1024 && quality > 0.1) {
    quality -= 0.1;
    blob = await canvas.convertToBlob({ type: "image/jpeg", quality });
  }

  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

interface Props {
  initialUrls?: string[];
  onChange: (urls: string[]) => void;
  pathPrefix: string;
}

export function ImageUploader({ initialUrls = [], onChange, pathPrefix }: Props) {
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const remaining = MAX_IMAGES - urls.length;
    const toUpload = files.slice(0, remaining);
    if (toUpload.length === 0) return;

    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of toUpload) {
        const base64 = await compressToBase64(file);
        const url = await uploadProviderImage(pathPrefix, base64);
        newUrls.push(url);
      }
      const updated = [...urls, ...newUrls];
      setUrls(updated);
      onChange(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove(index: number) {
    const updated = urls.filter((_, i) => i !== index);
    setUrls(updated);
    onChange(updated);
  }

  return (
    <div>
      <Label>프로필 이미지 (최대 {MAX_IMAGES}장)</Label>
      <div className="mt-1 flex flex-wrap gap-2">
        {urls.map((url, i) => (
          <div key={url} className="relative group">
            <img
              src={url}
              alt={`프로필 ${i + 1}`}
              className="size-20 rounded-md object-cover border"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute -top-1.5 -right-1.5 rounded-full bg-red-500 p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}
        {urls.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex size-20 items-center justify-center rounded-md border-2 border-dashed text-muted-foreground hover:text-foreground hover:border-foreground transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <ImagePlus className="size-5" />
            )}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />
    </div>
  );
}
