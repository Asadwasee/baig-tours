// components/FeaturedPackages.tsx
'use client';  // Add this since we're using hooks

import { usePackages } from '@/hooks/usePackages';
import PackageCard from "./PackageCard";

interface FeaturedPackagesProps {
  packages?: any[];
  loading?: boolean;
}

export default function FeaturedPackages({ packages: propPackages, loading: propLoading }: FeaturedPackagesProps = {}) {
  // Fetch featured packages from API
  const hookData = usePackages({
    featured: true,
    limit: 6
  });

  const packages = propPackages ?? hookData.packages;
  const loading = propLoading ?? hookData.loading;

  if (loading) {
    return (
      <section className="bg-[#F8FAFC] py-14 sm:py-16 lg:py-20">
        <div className="container-custom">
          <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316]">
              Featured Packages
            </span>
            <h2 className="mt-3 font-[var(--font-poppins)] text-3xl font-bold text-[#1E293B] sm:text-4xl lg:text-5xl">
              Explore Our Most Popular Tours
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] animate-pulse rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F8FAFC] py-14 sm:py-16 lg:py-20">
      <div className="container-custom">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316]">
            Featured Packages
          </span>
          <h2 className="mt-3 font-[var(--font-poppins)] text-3xl font-bold text-[#1E293B] sm:text-4xl lg:text-5xl">
            Explore Our Most Popular Tours
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Discover carefully selected domestic and international tour
            packages designed to create unforgettable travel experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {packages.map((tour) => (
            <PackageCard
              key={tour._id}
              tour={tour}
            />
          ))}
        </div>

      </div>
    </section>
  );
}