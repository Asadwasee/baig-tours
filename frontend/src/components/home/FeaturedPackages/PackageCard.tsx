import Link from "next/link";
import { MapPin, CalendarDays, Clock3, ArrowRight } from "lucide-react";

import { TourPackage } from "@/types/package";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
  tour: TourPackage;
}

export default function PackageCard({ tour }: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">

        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            tour.category === "Domestic Tour"
              ? "bg-teal-100 text-[#0F766E]"
              : "bg-orange-100 text-[#F97316]"
          }`}
        >
          {tour.category}
        </span>

        <h3 className="mt-4 text-xl font-bold text-[#1E293B]">
          {tour.title}
        </h3>

        <div className="mt-5 space-y-3 text-sm text-slate-600">

          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-[#0F766E]" />
            {tour.destination}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={18} className="text-[#0F766E]" />
            {tour.duration}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-[#0F766E]" />
            {tour.departureDate}
          </div>

        </div>

        <div className="mt-6 flex items-center justify-between">

          <span className="text-2xl font-bold text-[#F97316]">
            {formatCurrency(tour.price)}
          </span>

          <Link
            href={`/packages/${tour.id}`}
            className="flex items-center gap-2 font-semibold text-[#0F766E] transition hover:text-[#F97316]"
          >
            View Details
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </div>
  );
}