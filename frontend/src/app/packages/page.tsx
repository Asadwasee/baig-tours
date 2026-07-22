"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import PackagesHero from "@/components/packages/PackagesHero";
import SearchSection from "@/components/packages/SearchSection";
import FilterSidebar from "@/components/packages/FilterSidebar";
import SortBar from "@/components/packages/SortBar";
import PackageGrid from "@/components/packages/PackageGrid";
import { allPackages } from "@/constants/allPackages";

export default function PackagesPage() {

    const searchParams = useSearchParams();

const initialSearch = searchParams.get("package") || "";
const initialDestination = searchParams.get("destination") || "";
const initialCategory = searchParams.get("category") || "";
const initialDuration = searchParams.get("duration") || "";

const [search, setSearch] = useState(initialSearch);

const [selectedDestinations, setSelectedDestinations] =
  useState<string[]>(
    initialDestination ? [initialDestination] : []
  );

const [category, setCategory] = useState(initialCategory);

const [duration, setDuration] = useState(initialDuration);

const [maxPrice, setMaxPrice] = useState(500000);

const [sortBy, setSortBy] = useState("Latest");

    const filteredPackages = useMemo(() => {
  let packages = allPackages.filter((tour) => {

    // Search
    const keyword = search.toLowerCase();

    const matchesSearch =
      tour.title.toLowerCase().includes(keyword) ||
      tour.destination.toLowerCase().includes(keyword);

    // Destination
    const matchesDestination =
      selectedDestinations.length === 0 ||
      selectedDestinations.some((destination) =>
        tour.destination.toLowerCase().includes(destination.toLowerCase())
      );

    // Category
    const matchesCategory =
      category === "" || tour.category === category;

    // Duration
    const matchesDuration =
      duration === "" || tour.duration.startsWith(duration);

    // Price
    const matchesPrice =
      tour.price <= maxPrice;

    return (
      matchesSearch &&
      matchesDestination &&
      matchesCategory &&
      matchesDuration &&
      matchesPrice
    );
  });

  // Sorting
  switch (sortBy) {
    case "Lowest Price":
      packages.sort((a, b) => a.price - b.price);
      break;

    case "Highest Price":
      packages.sort((a, b) => b.price - a.price);
      break;

    case "Most Popular":
      packages.sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
      );
      break;

    default:
      break;
  }

  return packages;
}, [
  search,
  selectedDestinations,
  category,
  duration,
  maxPrice,
  sortBy,
]);

  return ( 
    <>
      {/* Hero */}
      <PackagesHero />

      {/* Search */}
      <SearchSection 
      search={search}
      setSearch={setSearch}/>

      {/* Packages */}
      <section className="pb-20">
        <div className="container-custom">

          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">

            {/* Left Sidebar */}
            <aside>
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
    totalPackages={filteredPackages.length}
    sortBy={sortBy}
    setSortBy={setSortBy}
/>

              <PackageGrid 
              packages={filteredPackages}/>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}