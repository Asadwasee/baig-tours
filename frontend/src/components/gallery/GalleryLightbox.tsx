"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";
import { GalleryItem } from "@/constants/gallery";

interface Props {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function GalleryLightbox({
  item,
  onClose,
}: Props) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl"
      >
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 rounded-full bg-white p-3 shadow-lg transition hover:rotate-90"
        >
          <X className="h-6 w-6 text-[#1E293B]" />
        </button>

        {item.type === "image" ? (
          <div className="relative h-[75vh] overflow-hidden rounded-3xl">
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-contain"
            />
          </div>
        ) : (
  <div className="overflow-hidden rounded-3xl bg-black">
    <video
      controls
      autoPlay
      className="h-[75vh] w-full object-contain"
    >
      <source src={item.src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}
      </div>
    </div>
  );
}