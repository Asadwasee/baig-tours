// components/package-details/RelatedPackages.tsx
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { getPackages } from "@/services/packages";
import { Package } from "@/types/package";
import { formatCurrency } from "@/utils/formatCurrency";

interface RelatedPackagesProps {
  currentPackageId: string;
  category?: string;
}

export default function RelatedPackages({ currentPackageId, category }: RelatedPackagesProps) {
  const [relatedPackages, setRelatedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const query = new URLSearchParams();
        if (category) query.append('category', category);
        query.append('limit', '3');
        const data = await getPackages(`?${query.toString()}`);
        // Filter out current package
        const filtered = data.filter(pkg => pkg._id !== currentPackageId);
        setRelatedPackages(filtered.slice(0, 3));
      } catch (error) {
        console.error('Error fetching related packages:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRelated();
  }, [currentPackageId, category]);

  if (loading) {
    return (
      <section className="bg-[#F8FAFC] py-20">
        <div className="container-custom">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="font-semibold uppercase tracking-[0.18em] text-[#F97316]">
              More Adventures
            </span>
            <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
              You May Also Like
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-3xl bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedPackages.length === 0) {
    return null;
  }

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
          {relatedPackages.map((tour) => (
            <article
              key={tour._id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/30 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={tour.images?.[0] || '/images/placeholder.jpg'}
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
                  <MapPin size={17} className="text-[#0F766E]" />
                  <span>{tour.destination}</span>
                </div>

                {/* Price */}
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    {tour.discountPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        {formatCurrency(tour.price)}
                      </p>
                    )}
                    <h4 className="text-3xl font-bold text-[#F97316]">
                      {formatCurrency(tour.discountPrice || tour.price)}
                    </h4>
                  </div>
                  {tour.discountPrice && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-[#16A34A]">
                      {Math.round(((tour.price - tour.discountPrice) / tour.price) * 100)}% OFF
                    </span>
                  )}
                </div>

                <div className="my-6 border-t border-gray-200" />
                <Link
                  href={`/packages/${tour._id}`}
                  className="flex items-center justify-between font-semibold text-[#0F766E] transition hover:text-[#F97316]"
                >
                  View Details
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}