// components/package-details/VideosSection.tsx
'use client';

import { Package } from "@/types/package";

interface VideosSectionProps {
  videos: string[];
}

export default function VideosSection({ videos }: VideosSectionProps) {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="container-custom">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Travel Memories
          </span>
          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Experience The Journey
          </h2>
          <p className="mt-5 leading-8 text-gray-600">
            Get a glimpse of the unforgettable experiences waiting for you.
            Watch highlights from previous tours and discover the beauty of
            Pakistan before your adventure begins.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {videos.map((videoUrl, index) => (
            <article
              key={index}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <video
                  className="h-full w-full transition duration-500 group-hover:scale-[1.02]"
                  src={videoUrl}
                  controls
                  poster="/images/video-placeholder.jpg"
                />
                <div className="pointer-events-none absolute inset-0 rounded-t-3xl ring-1 ring-black/5" />
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-[#0F766E]/10 px-3 py-1 text-sm font-semibold text-[#0F766E]">
                    Travel Film
                  </span>
                  <span className="rounded-full bg-[#F97316]/10 px-3 py-1 text-sm font-semibold text-[#F97316]">
                    Video {index + 1}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}