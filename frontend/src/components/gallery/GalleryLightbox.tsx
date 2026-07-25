// components/gallery/GalleryLightbox.tsx
'use client';

import { useEffect } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";
import { GalleryMedia } from "@/types/gallery";

interface Props {
  item: GalleryMedia | null;
  onClose: () => void;
}

export default function GalleryLightbox({ item, onClose }: Props) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!item) return null;

  const isVideo = item.mediaType === 'video';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-3 xs:p-4 sm:p-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 xs:-top-12 sm:-top-14 right-0 rounded-full bg-white p-2 xs:p-2.5 sm:p-3 shadow-lg transition hover:rotate-90"
        >
          <X className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-[#1E293B]" />
        </button>

        {/* Media */}
        {!isVideo ? (
          <div className="relative h-[50vh] xs:h-[60vh] sm:h-[70vh] md:h-[75vh] overflow-hidden rounded-2xl xs:rounded-3xl">
            <Image
              src={item.mediaUrl}
              alt={item.title}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl xs:rounded-3xl bg-black">
            <video
              controls
              autoPlay
              className="h-[50vh] xs:h-[60vh] sm:h-[70vh] md:h-[75vh] w-full object-contain"
            >
              <source src={item.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        
        {/* Title overlay */}
        <div className="mt-3 xs:mt-4 text-center text-white px-2">
          <h3 className="text-base xs:text-xl sm:text-2xl font-bold">
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-1 xs:mt-2 text-sm xs:text-base text-white/80">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}