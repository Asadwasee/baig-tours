"use client";

import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";
import GalleryCard from "./GalleryCard";
import { GalleryItem } from "@/constants/gallery";

interface Props {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: Props) {
  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-20 text-center shadow-lg">
        <h2 className="font-[var(--font-poppins)] text-3xl font-bold text-[#1E293B]">
          No Gallery Items Found
        </h2>

        <p className="mt-4 text-gray-600">
          Try selecting another category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <GalleryCard
            key={item.id}
            item={item}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>

      <GalleryLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}