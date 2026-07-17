import Link from "next/link";
import UpcomingTourCard from "./UpcomingTourCard";
import { upcomingTours } from "@/constants/upcomingTours";

export default function UpcomingTours() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Upcoming Tours
          </span>

          <h2 className="mt-4 text-4xl font-bold text-[#1E293B]">
            Join Our Next Adventure
          </h2>

          <p className="mt-5 text-slate-600">
            Reserve your seat on our upcoming departures across Pakistan
            and exciting international destinations. Every journey is
            carefully planned to deliver unforgettable travel experiences.
          </p>

        </div>

        {/* Tours Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingTours.map((tour) => (
            <UpcomingTourCard
              key={tour.id}
              tour={tour}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center rounded-xl bg-[#F97316] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] hover:scale-105"
          >
            Explore All Tours
          </Link>
        </div>

      </div>
    </section>
  );
}