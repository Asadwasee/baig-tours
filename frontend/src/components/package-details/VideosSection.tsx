"use client";

import { Play } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Hunza Valley Adventure",
    duration: "3 min",
    description:
      "Experience breathtaking landscapes, crystal-clear lakes and unforgettable moments.",
    url: "https://www.youtube.com/embed/Scxs7L0vhZ4",
  },
  {
    id: 2,
    title: "Northern Pakistan Drone Tour",
    duration: "4 min",
    description:
      "Explore the majestic mountains and scenic beauty from above.",
    url: "https://www.youtube.com/embed/aqz-KE-bpKQ",
  },
];

export default function VideosSection() {
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

          {videos.map((video) => (

            <article
              key={video.id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="relative aspect-video overflow-hidden">

                <iframe
                  className="h-full w-full transition duration-500 group-hover:scale-[1.02]"
                  src={video.url}
                  title={video.title}
                  allowFullScreen
                />

                <div className="pointer-events-none absolute inset-0 rounded-t-3xl ring-1 ring-black/5" />

              </div>

              <div className="p-6">

                <div className="mb-4 flex items-center justify-between">

                  <span className="rounded-full bg-[#0F766E]/10 px-3 py-1 text-sm font-semibold text-[#0F766E]">
                    Travel Film
                  </span>

                  <span className="rounded-full bg-[#F97316]/10 px-3 py-1 text-sm font-semibold text-[#F97316]">
                    {video.duration}
                  </span>

                </div>

                <h3 className="font-[var(--font-poppins)] text-2xl font-semibold text-[#1E293B]">
                  {video.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {video.description}
                </p>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}