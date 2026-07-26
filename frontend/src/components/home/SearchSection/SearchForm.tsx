"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchField from "./SearchField";

import {
  destinations,
  categories,
  durations,
  priceRanges,
} from "@/constants/search";

export default function SearchForm() {
    
    const router = useRouter();

    const [destination, setDestination] = useState("");
    const [packageName, setPackageName] = useState("");
    const [category, setCategory] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [duration, setDuration] = useState("");

    const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();

  const params = new URLSearchParams();

  if (destination)
    params.set("destination", destination);

  if (packageName)
    params.set("package", packageName);

  if (category)
    params.set("category", category);

  if (departureDate)
    params.set("date", departureDate);

  if (priceRange)
    params.set("price", priceRange);

  if (duration)
    params.set("duration", duration);

  router.push(`/packages?${params.toString()}`);
};

  return (
    <form 
    onSubmit={handleSearch}
    className="rounded-3xl bg-white p-5 shadow-lg sm:p-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {/* Destination */}
        <SearchField
          label="Destination"
          options={destinations}
          value={destination}
          onChange={setDestination}
        />

        {/* Package Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1E293B]">
            Package Name
          </label>

          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)} 
            placeholder="Search package..."
            className="w-full rounded-xl border border-[#E2E8F0] px-4 py-3 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
          />
        </div>

        {/* Category */}
        <SearchField
          label="Tour Category"
          options={categories}
          value={category}
          onChange={setCategory}
        />

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1E293B]">
            Departure Date
          </label>

          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] px-4 py-3 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
          />
        </div>

        {/* Price */}
        <SearchField
          label="Price Range"
          options={priceRanges}
          value={priceRange}
          onChange={setPriceRange}
        />

        {/* Duration */}
        <SearchField
          label="Duration"
          options={durations}
          value={duration}
          onChange={setDuration}
        />

      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 font-semibold text-white transition hover:bg-[#0B5C56] sm:w-auto sm:px-10"
        >
          <Search size={20} />
          Search Tours
        </button>
      </div>
    </form>
  );
}