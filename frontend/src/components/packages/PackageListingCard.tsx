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

import { TourPackage } from "@/types/package";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
  tour: TourPackage;
}

export default function PackageListingCard({ tour }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex flex-col md:flex-row">

        {/* Image */}

        <div className="relative h-56 md:h-auto md:w-[250px] flex-shrink-0 overflow-hidden">

          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category */}

          <span className="absolute left-4 top-4 rounded-full bg-[#0F766E] px-3 py-1 text-xs font-semibold text-white shadow">

            {tour.category}

          </span>

          {/* Discount */}

          {tour.discount && (
            <span className="absolute right-4 top-4 rounded-full bg-[#F97316] px-3 py-1 text-xs font-bold text-white shadow">

              {tour.discount}% OFF

            </span>
          )}

        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col justify-between p-5">

          {/* Top */}

          <div>

            <div className="flex items-start justify-between gap-4">

              <div>

                <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">

                  {tour.title}

                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">

                  <MapPin
                    size={16}
                    className="text-[#0F766E]"
                  />

                  <span>{tour.destination}</span>

                </div>

              </div>

              {tour.rating && (
                <div className="rounded-xl bg-[#F8FAFC] px-3 py-2 text-center shadow-sm">

                  <div className="flex items-center justify-center gap-1">

                    <Star
                      size={15}
                      fill="#FBBF24"
                      className="text-[#FBBF24]"
                    />

                    <span className="text-sm font-bold">

                      {tour.rating}

                    </span>

                  </div>

                  <p className="mt-1 text-[11px] text-gray-500">

                    {tour.totalReviews} Reviews

                  </p>

                </div>
              )}

            </div>

            {/* Info */}

            <div className="mt-5 grid gap-4 sm:grid-cols-3">

              <div className="flex items-center gap-2">

                <Clock3
                  size={17}
                  className="text-[#0F766E]"
                />

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-gray-400">

                    Duration

                  </p>

                  <p className="text-sm font-medium">

                    {tour.duration}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2">

                <CalendarDays
                  size={17}
                  className="text-[#0F766E]"
                />

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-gray-400">

                    Departure

                  </p>

                  <p className="text-sm font-medium">

                    {tour.departureDate}

                  </p>

                </div>

              </div>

              {tour.availableSeats && (
                <div className="flex items-center gap-2">

                  <Users
                    size={17}
                    className="text-[#16A34A]"
                  />

                  <div>

                    <p className="text-[11px] uppercase tracking-wide text-gray-400">

                      Seats

                    </p>

                    <p className="text-sm font-medium text-[#16A34A]">

                      {tour.availableSeats} Left

                    </p>

                  </div>

                </div>
              )}

            </div>

          </div>

          {/* Bottom */}

          <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-end sm:justify-between">

            {/* Price */}

            <div>

              {tour.originalPrice && (
                <p className="text-sm text-gray-400 line-through">

                  {formatCurrency(tour.originalPrice)}

                </p>
              )}

              <div className="flex items-end gap-2">

                <h3 className="font-[var(--font-poppins)] text-3xl font-bold text-[#F97316]">

                  {formatCurrency(tour.price)}

                </h3>

                <span className="pb-1 text-sm text-gray-500">

                  / person

                </span>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-3">

              <Link
                href={`/packages/${tour.id}`}
                className="rounded-xl border border-[#0F766E] px-5 py-2.5 text-sm font-semibold text-[#0F766E] transition hover:bg-[#0F766E] hover:text-white"
              >
                Details
              </Link>

              <Link
                href={`/booking/${tour.id}`}
                className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B5C56]"
              >
                Book Now

                <ArrowRight size={16} />

              </Link>

            </div>

          </div>

        </div>

      </div>

    </article>
  );
}