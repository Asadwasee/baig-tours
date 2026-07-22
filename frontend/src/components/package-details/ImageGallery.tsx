"use client";

import { useState } from "react";
import Image from "next/image";
import { Images, Maximize2 } from "lucide-react";

const images = [
  "/assets/images/packages/hunza.jpg",
  "/assets/images/packages/skardu.jpg",
  "/assets/images/packages/turkey.jpg",
  "/assets/images/packages/hunza.jpg",
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-6">
      {/* Main Gallery Card */}
      <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-xl">
        {/* Main Image */}
        <div className="relative h-[520px] overflow-hidden">
          <Image
            src={selectedImage}
            alt="Hunza Valley Tour"
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Gallery Counter */}
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 backdrop-blur-md shadow-lg">
            <Images className="h-4 w-4 text-[#0F766E]" />
            <span className="text-sm font-semibold text-[#1E293B]">
              {images.length} Photos
            </span>
          </div>

          {/* Fullscreen Button */}
          <button className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#1E293B] backdrop-blur-md shadow-lg transition hover:bg-white hover:text-[#0F766E]">
            <Maximize2 className="h-4 w-4" />
            View Full
          </button>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {images.map((image, index) => {
          const isActive = selectedImage === image;

          return (
            <button
              key={`${image}-${index}`}
              onClick={() => setSelectedImage(image)}
              className={`group relative h-28 overflow-hidden rounded-2xl transition-all duration-300 ${
                isActive
                  ? "ring-4 ring-[#F97316] scale-[1.02] shadow-lg"
                  : "ring-1 ring-gray-200 hover:ring-[#0F766E] hover:scale-[1.02] hover:shadow-md"
              }`}
            >
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Active Overlay */}
              {isActive && (
                <div className="absolute inset-0 bg-[#F97316]/10" />
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />
            </button>
          );
        })}
      </div>

      {/* Mobile Hint */}
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-[#F8FAFC] px-4 py-3 text-sm text-gray-600 lg:hidden">
        <Images className="h-4 w-4 text-[#0F766E]" />
        Tap any thumbnail to preview the image
      </div>
    </div>
  );
}