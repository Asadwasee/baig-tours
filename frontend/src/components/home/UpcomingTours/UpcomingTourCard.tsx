import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

interface UpcomingTour {
  id: number;
  title: string;
  destination: string;
  duration: string;
  departure: string;
  price: number;
  seats: number;
  image: string;
}

interface Props {
  tour: UpcomingTour;
}

export default function UpcomingTourCard({ tour }: Props) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Tour Image */}
      <div className="relative h-60 overflow-hidden">

        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Limited Seats Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-[#F97316] px-4 py-2 text-xs font-semibold text-white shadow">
          Limited Seats
        </div>

      </div>

      {/* Card Content */}
      <div className="space-y-4 p-6">

        <div>
          <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
            {tour.title}
          </h3>

          <p className="mt-1 flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-[#0F766E]" />
            {tour.destination}
          </p>
        </div>

        {/* Tour Info */}
        <div className="space-y-3 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <Clock3 size={16} className="text-[#0F766E]" />
            {tour.duration}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-[#0F766E]" />
            Departure: {tour.departure}
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#0F766E]" />
            {tour.seats} Seats Left
          </div>

        </div>

        {/* Price */}
        <div className="border-t border-gray-200 pt-4">

          <p className="text-sm text-gray-500">
            Starting From
          </p>

          <p className="mt-1 text-3xl font-bold text-[#F97316]">
            Rs. {tour.price.toLocaleString()}
          </p>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">

          <Link
            href={`/packages/${tour.id}`}
            className="flex-1 rounded-xl border border-[#0F766E] py-3 text-center font-medium text-[#0F766E] transition-all duration-300 hover:bg-[#0F766E] hover:text-white"
          >
            View Details
          </Link>

          <Link
            href="/booking"
            className="flex-1 rounded-xl bg-[#F97316] py-3 text-center font-medium text-white transition-all duration-300 hover:bg-[#0B5C56]"
          >
            Book Now
          </Link>

        </div>

      </div>
    </div>
  );
}