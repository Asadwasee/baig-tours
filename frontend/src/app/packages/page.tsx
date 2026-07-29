// app/packages/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import PackagesHero from "@/components/packages/PackagesHero";
import SearchSection from "@/components/packages/SearchSection";
import FilterSidebar from "@/components/packages/FilterSidebar";
import SortBar from "@/components/packages/SortBar";
import PackageGrid from "@/components/packages/PackageGrid";
import { getPackages } from "@/services/packages";
import { Package } from "@/types/package";

function PackagesContent() {
  const searchParams = useSearchParams();

  // Get initial values from URL params
  const initialSearch = searchParams.get("package") || "";
  const initialDestination = searchParams.get("destination") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialDuration = searchParams.get("duration") || "";

  // State for filters
  const [search, setSearch] = useState(initialSearch);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    initialDestination ? [initialDestination] : []
  );
  const [category, setCategory] = useState(initialCategory);
  const [duration, setDuration] = useState(initialDuration);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [sortBy, setSortBy] = useState("Latest");

  // State for API data
  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch packages from API
  useEffect(() => {
    async function fetchPackages() {
      setLoading(true);
      setError(null);
      try {
        // Build query params
        const queryParams = new URLSearchParams();
        
        if (search) queryParams.append('search', search);
        if (selectedDestinations.length > 0) {
          queryParams.append('destination', selectedDestinations.join(','));
        }
        if (category) queryParams.append('category', category);
        if (duration) queryParams.append('duration', duration);
        if (maxPrice < 500000) queryParams.append('maxPrice', String(maxPrice));
        
        // Map sortBy to API sort values
        let sortValue = '';
        switch (sortBy) {
          case 'Lowest Price': sortValue = 'price'; break;
          case 'Highest Price': sortValue = '-price'; break;
          case 'Most Popular': sortValue = 'popular'; break;
          default: sortValue = 'latest'; break;
        }
        if (sortValue) queryParams.append('sort', sortValue);
        
        const query = queryParams.toString();
        const data = await getPackages(query ? `?${query}` : '');
        setAllPackages(data);
      } catch (err: any) {
        console.error('❌ Error fetching packages:', err);
        setError(err.message || 'Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPackages();
  }, [search, selectedDestinations, category, duration, maxPrice, sortBy]);

  return (
    <>
      {/* Search */}
      <SearchSection 
        search={search}
        setSearch={setSearch}
      />

      {/* Packages */}
      <section className="pb-16 xs:pb-20">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          
          {/* Mobile/Tablet: Filter Toggle + Content */}
          <div className="lg:hidden mb-4">
            <FilterSidebar
              selectedDestinations={selectedDestinations}
              setSelectedDestinations={setSelectedDestinations}
              category={category}
              setCategory={setCategory}
              duration={duration}
              setDuration={setDuration}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>

          <div className="grid gap-6 xs:gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">

            {/* Left Sidebar - Desktop only */}
            <aside className="hidden lg:block">
              <FilterSidebar
                selectedDestinations={selectedDestinations}
                setSelectedDestinations={setSelectedDestinations}
                category={category}
                setCategory={setCategory}
                duration={duration}
                setDuration={setDuration}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
            </aside>

            {/* Right Content */}
            <div>
              <SortBar
                totalPackages={allPackages.length}
                sortBy={sortBy}
                setSortBy={setSortBy}
                loading={loading}
              />

              {loading ? (
                <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 xs:h-44 sm:h-48 animate-pulse rounded-2xl bg-gray-200" />
                  ))}
                </div>
              ) : error ? (
                <div className="rounded-2xl bg-red-50 p-6 xs:p-8 text-center">
                  <p className="text-sm xs:text-base text-red-600">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-3 xs:mt-4 rounded-xl bg-[#0F766E] px-4 xs:px-6 py-2 xs:py-2.5 text-sm xs:text-base text-white hover:bg-[#0B5C56]"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <PackageGrid packages={allPackages} />
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <PackagesHero />

      <Suspense fallback={
        <div className="space-y-4 p-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl bg-gray-200" />
          ))}
        </div>
      }>
        <PackagesContent />
      </Suspense>
    </>
  );
}