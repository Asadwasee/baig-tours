// components/packages/PackageListingCard.tsx
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock3,
  CalendarDays,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

import { Package } from "@/types/package";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
  tour: Package;
}

export default function PackageListingCard({ tour }: Props) {
  // Logic to filter out video URLs and pick the first valid image
  const isVideo = (url: string) => /\.(mp4|webm|ogg|mov)$/i.test(url) || url.includes('/video/upload/');
  const firstImage = tour.images?.find((url) => !isVideo(url));
  const imageUrl = firstImage || '/images/placeholder.jpg';

  const discount = tour.discountPrice ? Math.round(((tour.price - tour.discountPrice) / tour.price) * 100) : 0;
  const displayPrice = tour.discountPrice || tour.price;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex flex-col md:flex-row">

        {/* Image */}
        <div className="relative h-48 xs:h-52 sm:h-56 md:h-auto md:w-[200px] lg:w-[250px] flex-shrink-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={tour.title}
            fill
            unoptimized={imageUrl.startsWith('http')}
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category */}
          <span className="absolute left-3 xs:left-4 top-3 xs:top-4 rounded-full bg-[#0F766E] px-2 xs:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs font-semibold text-white shadow">
            {tour.category}
          </span>

          {/* Discount */}
          {discount > 0 && (
            <span className="absolute right-3 xs:right-4 top-3 xs:top-4 rounded-full bg-[#F97316] px-2 xs:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs font-bold text-white shadow">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4 xs:p-5">

          {/* Top */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-[var(--font-poppins)] text-lg xs:text-xl sm:text-2xl font-bold text-[#1E293B] line-clamp-2">
                  {tour.title}
                </h2>
                <div className="mt-1 xs:mt-2 flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm text-gray-600">
                  <MapPin size={14} className="xs:w-[16px] xs:h-[16px] text-[#0F766E]" />
                  <span>{tour.destination}</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 xs:mt-5 grid gap-2 xs:gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
              <div className="flex items-center gap-1.5 xs:gap-2">
                <Clock3 size={15} className="xs:w-[17px] xs:h-[17px] text-[#0F766E]" />
                <div>
                  <p className="text-[10px] xs:text-[11px] uppercase tracking-wide text-gray-400">Duration</p>
                  <p className="text-xs xs:text-sm font-medium">{tour.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 xs:gap-2">
                <CalendarDays size={15} className="xs:w-[17px] xs:h-[17px] text-[#0F766E]" />
                <div>
                  <p className="text-[10px] xs:text-[11px] uppercase tracking-wide text-gray-400">Departure</p>
                  <p className="text-xs xs:text-sm font-medium">{tour.departureDate ? new Date(tour.departureDate).toLocaleDateString() : 'Upcoming'}</p>
                </div>
              </div>

              {tour.availableSeats && (
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <Users size={15} className="xs:w-[17px] xs:h-[17px] text-[#16A34A]" />
                  <div>
                    <p className="text-[10px] xs:text-[11px] uppercase tracking-wide text-gray-400">Seats</p>
                    <p className="text-xs xs:text-sm font-medium text-[#16A34A]">{tour.availableSeats} Left</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-4 xs:mt-5 sm:mt-6 flex flex-col gap-3 xs:gap-4 border-t border-gray-100 pt-4 xs:pt-5 sm:flex-row sm:items-end sm:justify-between">

            {/* Price */}
            <div>
              {tour.discountPrice && (
                <p className="text-xs xs:text-sm text-gray-400 line-through">
                  {formatCurrency(tour.price)}
                </p>
              )}
              <div className="flex items-end gap-1.5 xs:gap-2">
                <h3 className="font-[var(--font-poppins)] text-2xl xs:text-3xl font-bold text-[#F97316]">
                  {formatCurrency(displayPrice)}
                </h3>
                <span className="pb-0.5 xs:pb-1 text-xs xs:text-sm text-gray-500">/ person</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 xs:gap-3">
              <Link
                href={`/packages/${tour._id}`}
                className="rounded-xl border border-[#0F766E] px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 text-xs xs:text-sm font-semibold text-[#0F766E] transition hover:bg-[#0F766E] hover:text-white"
              >
                Details
              </Link>

              <Link
                href={`/booking?package=${tour._id}`}
                className="flex items-center gap-1 xs:gap-2 rounded-xl bg-[#F97316] px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 text-xs xs:text-sm font-semibold text-white transition hover:bg-[#0B5C56]"
              >
                Book Now
                <ArrowRight size={14} className="xs:w-[16px] xs:h-[16px]" />
              </Link>
            </div>

          </div>

        </div>

      </div>

    </article>
  );
}