// app/gallery/page.tsx
'use client';

import { useMemo, useState } from "react";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryFilter from "@/components/gallery/GalleryFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { useGallery } from "@/hooks/useGallery";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Map frontend filter to API category
  const getApiCategory = (filter: string) => {
    if (filter === 'all' || filter === 'videos') return undefined;
    return filter as 'domestic' | 'international' | 'customer-memories';
  };
  
  // Get media type filter
  const getMediaType = (filter: string) => {
    if (filter === 'videos') return 'video';
    return undefined;
  };

  // Fetch gallery data
  const { media, stats, loading, error } = useGallery({
    category: getApiCategory(selectedCategory),
    mediaType: getMediaType(selectedCategory),
    limit: 24,
  });

  return (
    <>
      <GalleryHero />

      <GalleryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        stats={stats || undefined}
      />

      <section className="pb-12 xs:pb-16 sm:pb-20 bg-[#F8FAFC]">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {error ? (
            <div className="rounded-2xl xs:rounded-3xl bg-red-50 p-8 xs:p-12 sm:p-16 text-center">
              <p className="text-sm xs:text-base text-red-600">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-3 xs:mt-4 rounded-xl bg-[#0F766E] px-4 xs:px-6 py-2 xs:py-2.5 text-sm xs:text-base text-white hover:bg-[#0B5C56]"
              >
                Try Again
              </button>
            </div>
          ) : (
            <GalleryGrid items={media} loading={loading} />
          )}
        </div>
      </section>
    </>
  );
}