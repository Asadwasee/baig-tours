import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { featuredPackages } from "@/constants/packages";
import { formatCurrency } from "@/utils/formatCurrency";

export default function RelatedPackages() {
  return (
    <section className="bg-[#F8FAFC] py-20">

      <div className="container-custom">

        {/* Heading */}

        <div className="mb-14 text-center">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Recommended Tours
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            You May Also Like
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-gray-600">
            Explore more domestic and international tours carefully selected
            for travelers like you.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {featuredPackages.slice(0, 3).map((tour) => (

            <article
              key={tour.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Image */}

              <div className="relative h-60 overflow-hidden">

                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-[#0F766E] px-3 py-1 text-sm font-semibold text-white">

                  {tour.category}

                </span>

              </div>

              {/* Content */}

              <div className="p-6">

                <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">

                  {tour.title}

                </h3>

                <div className="mt-3 flex items-center gap-2 text-gray-600">

                  <MapPin
                    size={18}
                    className="text-[#0F766E]"
                  />

                  {tour.destination}

                </div>

                {/* Rating */}

                <div className="mt-5 flex items-center gap-1">

                  <Star
                    size={18}
                    fill="#FBBF24"
                    className="text-[#FBBF24]"
                  />

                  <span className="font-semibold">

                    {tour.rating}

                  </span>

                  <span className="text-gray-500">

                    ({tour.totalReviews})

                  </span>

                </div>

                {/* Price */}

                <div className="mt-6 flex items-end justify-between">

                  <div>

                    <p className="text-sm text-gray-400 line-through">

                      {tour.originalPrice &&
                        formatCurrency(tour.originalPrice)}

                    </p>

                    <h3 className="text-3xl font-bold text-[#F97316]">

                      {formatCurrency(tour.price)}

                    </h3>

                  </div>

                  {tour.discount && (

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-[#16A34A]">

                      {tour.discount}% OFF

                    </span>

                  )}

                </div>

                <Link
                  href={`/packages/${tour.id}`}
                  className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] py-3 font-semibold text-white transition hover:bg-[#0B5C56]"
                >

                  View Details

                  <ArrowRight size={18} />

                </Link>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}