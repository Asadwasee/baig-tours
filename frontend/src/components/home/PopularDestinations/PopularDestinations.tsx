import Link from "next/link";
import DestinationCard from "./DestinationCard";
import { destinations } from "@/constants/destinations";

export default function PopularDestinations() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-10 xs:mb-12 sm:mb-14 max-w-3xl text-center">

          <span className="text-xs xs:text-sm sm:text-base font-semibold uppercase tracking-wider text-[#F97316]">
            Popular Destinations
          </span>

          <h2 className="mt-2 xs:mt-3 sm:mt-4 text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1E293B]">
            Explore Pakistan & International Destinations
          </h2>

          <p className="mt-3 xs:mt-4 sm:mt-5 text-sm xs:text-base text-slate-600 px-2 xs:px-4">
            From the breathtaking valleys of Northern Pakistan to world-renowned
            international destinations, discover carefully curated journeys
            designed for every traveler.
          </p>

        </div>

        {/* Destination Grid */}
        <div className="grid gap-4 xs:gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 xs:mt-12 sm:mt-14 text-center">

          <Link
            href="/packages"
            className="inline-flex items-center rounded-xl bg-[#F97316] px-6 xs:px-7 sm:px-8 py-3 xs:py-3.5 sm:py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] hover:scale-105 text-sm xs:text-base"
          >
            View All Destinations
          </Link>

        </div>

      </div>
    </section>
  );
}