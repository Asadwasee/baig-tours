// components/package-details/ItinerarySection.tsx
import { CalendarDays, MapPin } from "lucide-react";
import { Package } from "@/types/package";

interface ItinerarySectionProps {
  itinerary: Package['itinerary'];
}

export default function ItinerarySection({ itinerary }: ItinerarySectionProps) {
  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container-custom">
        {/* Heading */}
        <div className="max-w-3xl">
          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Journey Timeline
          </span>
          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Your {itinerary.length}-Day Adventure
          </h2>
          <p className="mt-5 leading-8 text-gray-600">
            Every day has been carefully planned so you can enjoy the best
            destinations, breathtaking landscapes, and unforgettable
            experiences without worrying about the logistics.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Vertical Line */}
          <div className="absolute left-5 top-2 hidden h-[95%] w-px bg-[#0F766E]/20 lg:block" />

          <div className="space-y-8">
            {itinerary.map((item) => (
              <div key={item.day} className="relative flex gap-6">
                {/* Timeline Circle */}
                <div className="relative z-10 hidden lg:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white border-2 border-[#0F766E] shadow-sm">
                  <CalendarDays size={18} className="text-[#0F766E]" />
                </div>

                {/* Card */}
                <div className="flex-1 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/20 hover:shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="rounded-full bg-[#F97316]/10 px-4 py-1.5 text-sm font-semibold text-[#F97316]">
                      Day {item.day}
                    </span>
                    <div className="flex items-center gap-2 rounded-full bg-[#0F766E]/10 px-3 py-1 text-sm font-medium text-[#0F766E]">
                      <MapPin size={15} />
                      {item.title}
                    </div>
                  </div>
                  <h3 className="mt-5 font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-7 text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}