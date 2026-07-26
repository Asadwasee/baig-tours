// components/UpcomingTours.tsx
'use client';  // Add this

import Link from "next/link";
import { usePackages } from '@/hooks/usePackages';
import UpcomingTourCard from "./UpcomingTourCard";

export default function UpcomingTours() {
  // Fetch upcoming tours from API
  const { packages: tours, loading } = usePackages({
    upcoming: true,
    limit: 3
  });

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 xs:mb-12 sm:mb-14 max-w-3xl text-center">
            <span className="text-xs xs:text-sm sm:text-base font-semibold uppercase tracking-wider text-[#F97316]">
              Upcoming Tours
            </span>
            <h2 className="mt-2 xs:mt-3 sm:mt-4 text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1E293B]">
              Join Our Next Adventure
            </h2>
          </div>
          <div className="grid gap-4 xs:gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[450px] animate-pulse rounded-xl bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-10 xs:mb-12 sm:mb-14 max-w-3xl text-center">
          <span className="text-xs xs:text-sm sm:text-base font-semibold uppercase tracking-wider text-[#F97316]">
            Upcoming Tours
          </span>
          <h2 className="mt-2 xs:mt-3 sm:mt-4 text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1E293B]">
            Join Our Next Adventure
          </h2>
          <p className="mt-3 xs:mt-4 sm:mt-5 text-sm xs:text-base text-slate-600 px-2 xs:px-4">
            Reserve your seat on our upcoming departures across Pakistan
            and exciting international destinations. Every journey is
            carefully planned to deliver unforgettable travel experiences.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid gap-4 xs:gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <UpcomingTourCard
              key={tour._id}
              tour={tour}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 xs:mt-12 sm:mt-14 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center rounded-xl bg-[#F97316] px-6 xs:px-8 sm:px-8 py-3 xs:py-3.5 sm:py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] hover:scale-105 text-sm xs:text-base"
          >
            Explore All Tours
          </Link>
        </div>

      </div>
    </section>
  );
}