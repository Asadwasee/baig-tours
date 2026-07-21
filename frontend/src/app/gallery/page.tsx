"use client";

import { useMemo, useState } from "react";

import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryFilter from "@/components/gallery/GalleryFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";

import { galleryItems } from "@/constants/gallery";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return galleryItems;
    }

    if (selectedCategory === "Videos") {
      return galleryItems.filter((item) => item.type === "video");
    }

    return galleryItems.filter(
      (item) => item.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <>
      <GalleryHero />

      <GalleryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <section className="pb-20 bg-[#F8FAFC]">

        <div className="container-custom">

          {/* Gallery Grid will come next */}

          <GalleryGrid items={filteredItems} />

        </div>

      </section>
    </>
  );
}