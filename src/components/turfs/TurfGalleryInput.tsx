"use client";

import { useState } from "react";
import { ImageIcon, Trash2Icon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

const TurfGalleryInput = ({
  images,
  onChange,
  maxImages = 5,
}: ImageUploadProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...images];
      newImages[index] = reader.result as string;
      onChange(newImages);
      setSelectedIndex(index);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    setSelectedIndex(Math.max(0, index - 1));
  };

  return (
    <div className="space-y-4">
      {/* Main preview */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
        {images[selectedIndex] ? (
          <>
            <Image
              src={images[selectedIndex]}
              alt={`Preview ${selectedIndex + 1}`}
              className="h-full w-full object-cover"
              width={512}
              height={512}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => handleDelete(selectedIndex)}
            >
              <Trash2Icon className="size-4" />
            </Button>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon className="size-8 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: maxImages }, (_, i) => (
          <div
            key={i}
            className={`relative aspect-square cursor-pointer overflow-hidden rounded-lg border ${
              selectedIndex === i
                ? "ring-2 ring-primary"
                : "border border-border"
            }`}
            onClick={() => images[i] && setSelectedIndex(i)}
          >
            {images[i] ? (
              <Image
                src={images[i]}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
                width={64}
                height={64}
              />
            ) : (
              <label className="flex h-full w-full cursor-pointer items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, i)}
                />
                <PlusIcon className="size-6 text-muted-foreground" />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TurfGalleryInput;
