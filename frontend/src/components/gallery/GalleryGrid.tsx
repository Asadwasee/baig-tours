// components/gallery/GalleryGrid.tsx
'use client';

import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";
import GalleryCard from "./GalleryCard";
import { GalleryMedia } from "@/types/gallery";

interface Props {
  items: GalleryMedia[];
  loading?: boolean;
}

export default function GalleryGrid({ items, loading = false }: Props) {
  const [selectedItem, setSelectedItem] = useState<GalleryMedia | null>(null);

  if (loading) {
    return (
      <div className="grid gap-4 xs:gap-5 sm:gap-6 md:gap-8 grid-cols-1 xs:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-72 xs:h-80 sm:h-88 md:h-96 animate-pulse rounded-2xl xs:rounded-3xl bg-gray-200" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl xs:rounded-3xl bg-white p-12 xs:p-16 sm:p-20 text-center shadow-lg">
        <h2 className="font-[var(--font-poppins)] text-2xl xs:text-3xl font-bold text-[#1E293B]">
          No Gallery Items Found
        </h2>
        <p className="mt-3 xs:mt-4 text-sm xs:text-base text-gray-600">
          Try selecting another category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 xs:gap-5 sm:gap-6 md:gap-8 grid-cols-1 xs:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <GalleryCard
            key={item._id}
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