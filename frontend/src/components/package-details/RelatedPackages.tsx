import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";

import { featuredPackages } from "@/constants/packages";
import { formatCurrency } from "@/utils/formatCurrency";

export default function RelatedPackages() {
  return (
    <section className="bg-[#F8FAFC] py-20">

      <div className="container-custom">

        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="font-semibold uppercase tracking-[0.18em] text-[#F97316]">
            More Adventures
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            You May Also Like
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Discover more carefully selected domestic and international tours
            loved by our travelers.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {featuredPackages.slice(0, 3).map((tour) => (

            <article
              key={tour.id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/30 hover:shadow-xl"
            >

              {/* Image */}

              <div className="relative h-56 overflow-hidden">

                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-[#0F766E] px-3 py-1 text-xs font-semibold text-white">

                  {tour.category}

                </span>

              </div>

              {/* Content */}

              <div className="p-6">

                <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">

                  {tour.title}

                </h3>

                <div className="mt-3 flex items-center gap-2 text-gray-500">

                  <MapPin
                    size={17}
                    className="text-[#0F766E]"
                  />

                  <span>{tour.destination}</span>

                </div>

                {/* Rating */}

                <div className="mt-5 flex items-center gap-2">

                  <Star
                    size={16}
                    fill="#FBBF24"
                    className="text-[#FBBF24]"
                  />

                  <span className="font-semibold">
                    {tour.rating}
                  </span>

                  <span className="text-gray-500">
                    ({tour.totalReviews} Reviews)
                  </span>

                </div>

                {/* Price */}

                <div className="mt-6 flex items-end justify-between">

                  <div>

                    {tour.originalPrice && (

                      <p className="text-sm text-gray-400 line-through">

                        {formatCurrency(tour.originalPrice)}

                      </p>

                    )}

                    <h4 className="text-3xl font-bold text-[#F97316]">

                      {formatCurrency(tour.price)}

                    </h4>

                  </div>

                  {tour.discount && (

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-[#16A34A]">

                      {tour.discount}% OFF

                    </span>

                  )}

                </div>

                <div className="my-6 border-t border-gray-200" />

                <Link
                  href={`/packages/${tour.id}`}
                  className="flex items-center justify-between font-semibold text-[#0F766E] transition hover:text-[#F97316]"
                >

                  View Details

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />

                </Link>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}