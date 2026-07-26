// components/home/FeaturedPackages/PackageCard.tsx
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  CalendarDays,
  Clock3,
  ArrowRight,
} from "lucide-react";
import { Package } from "@/types/package";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
  tour: Package;
}

export default function PackageCard({ tour }: Props) {
  const imageUrl = tour.images?.[0] || '/images/placeholder.jpg';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden sm:h-60 lg:h-64">
        <Image
          src={imageUrl}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category */}
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
            tour.category === "Domestic Tour"
              ? "bg-teal-100 text-[#0F766E]"
              : "bg-orange-100 text-[#F97316]"
          }`}
        >
          {tour.category}
        </span>

        {/* Title */}
        <h3 className="mt-4 line-clamp-2 min-h-[56px] text-xl font-bold leading-7 text-[#1E293B]">
          {tour.title}
        </h3>

        {/* Info */}
        <div className="mt-5 space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin size={17} className="shrink-0 text-[#0F766E]" />
            <span className="truncate">{tour.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 size={17} className="shrink-0 text-[#0F766E]" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={17} className="shrink-0 text-[#0F766E]" />
            <span>{new Date(tour.departureDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t border-slate-100 pt-5">
            <div>
              <p className="text-xs text-slate-500">Starting From</p>
              <p className="text-2xl font-bold text-[#F97316]">
                {formatCurrency(tour.discountPrice || tour.price)}
              </p>
            </div>

            <Link
              href={`/packages/${tour._id}`}  // ✅ FIXED: Use tour._id, not tour.id
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-[#0F766E] transition hover:bg-[#0F766E]/10 hover:text-[#0B5C56]"
            >
              View
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}