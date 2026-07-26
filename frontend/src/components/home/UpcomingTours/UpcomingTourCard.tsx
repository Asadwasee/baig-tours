// components/UpcomingTourCard.tsx
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import { Package } from "@/types/package";

interface Props {
  tour: Package;  // Changed from UpcomingTour to Package
}

export default function UpcomingTourCard({ tour }: Props) {
  const imageUrl = tour.images?.[0] || '/images/placeholder.jpg';

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Tour Image */}
      <div className="relative h-48 xs:h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Limited Seats Badge */}
        <div className="absolute left-3 top-3 xs:left-4 xs:top-4 rounded-full bg-[#F97316] px-2.5 py-1 xs:px-3 xs:py-1.5 text-[10px] xs:text-xs font-semibold text-white shadow">
          {tour.availableSeats <= 5 ? 'Only Few Seats Left' : 'Limited Seats'}
        </div>
      </div>

      {/* Card Content */}
      <div className="space-y-3 xs:space-y-4 p-4 xs:p-5 sm:p-6">

        <div>
          <h3 className="font-[var(--font-poppins)] text-lg xs:text-xl sm:text-2xl font-bold text-[#1E293B] line-clamp-2">
            {tour.title}
          </h3>

          <p className="mt-1 flex items-center gap-1.5 xs:gap-2 text-gray-600 text-sm xs:text-base">
            <MapPin size={14} className="xs:w-4 xs:h-4 text-[#0F766E] flex-shrink-0" />
            <span className="truncate">{tour.destination}</span>
          </p>
        </div>

        {/* Tour Info */}
        <div className="space-y-2 xs:space-y-2.5 text-xs xs:text-sm text-gray-600">

          <div className="flex items-center gap-1.5 xs:gap-2">
            <Clock3 size={14} className="xs:w-4 xs:h-4 text-[#0F766E] flex-shrink-0" />
            <span className="truncate">{tour.duration}</span>
          </div>

          <div className="flex items-center gap-1.5 xs:gap-2">
            <CalendarDays size={14} className="xs:w-4 xs:h-4 text-[#0F766E] flex-shrink-0" />
            <span className="truncate">Departure: {new Date(tour.departureDate).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-1.5 xs:gap-2">
            <Users size={14} className="xs:w-4 xs:h-4 text-[#0F766E] flex-shrink-0" />
            <span className="truncate">{tour.availableSeats} Seats Left</span>
          </div>

        </div>

        {/* Price */}
        <div className="border-t border-gray-200 pt-3 xs:pt-4">
          <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500">
            Starting From
          </p>
          <p className="mt-0.5 xs:mt-1 text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-bold text-[#F97316]">
            Rs. {tour.price.toLocaleString()}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 pt-2">
          <Link
            href={`/packages/${tour._id}`}
            className="w-full xs:flex-1 rounded-xl border border-[#0F766E] py-2.5 xs:py-3 text-center font-medium text-[#0F766E] transition-all duration-300 hover:bg-[#0F766E] hover:text-white text-sm xs:text-base"
          >
            View Details
          </Link>

          <Link
            href={`/booking?package=${tour._id}`}
            className="w-full xs:flex-1 rounded-xl bg-[#F97316] py-2.5 xs:py-3 text-center font-medium text-white transition-all duration-300 hover:bg-[#0B5C56] text-sm xs:text-base"
          >
            Book Now
          </Link>
        </div>

      </div>
    </div>
  );
}