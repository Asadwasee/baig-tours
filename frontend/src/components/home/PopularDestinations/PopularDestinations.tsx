import Link from "next/link";
import DestinationCard from "./DestinationCard";
import { destinations } from "@/constants/destinations";

export default function PopularDestinations() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom">

{/* Section Header */}

<div className="mx-auto mb-14 max-w-3xl text-center">

  <span className="font-semibold uppercase tracking-wider text-[#F97316]">
    Popular Destinations
  </span>

  <h2 className="mt-4 text-4xl font-bold text-[#1E293B]">
    Explore Pakistan & International Destinations
  </h2>

  <p className="mt-5 text-slate-600">
    From the breathtaking valleys of Northern Pakistan to world-renowned
    international destinations, discover carefully curated journeys
    designed for every traveler.
  </p>

</div>

        {/* Destination Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">

          <Link
            href="/packages"
            className="inline-flex items-center rounded-xl bg-[#F97316] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] hover:scale-105"
          >
            View All Destinations
          </Link>

        </div>

      </div>
    </section>
  );
}