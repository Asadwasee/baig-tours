"use client";

import { Search } from "lucide-react";

import SearchField from "./SearchField";

import {
  destinations,
  categories,
  durations,
  priceRanges,
} from "@/constants/search";

export default function SearchForm() {
  return (
    <form className="rounded-2xl bg-white p-8 shadow-xl">
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Destination */}
        <SearchField
          label="Destination"
          options={destinations}
        />

        {/* Package Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1E293B]">
            Package Name
          </label>

          <input
            type="text"
            placeholder="Search package..."
            className="w-full rounded-xl border border-[#E2E8F0] px-4 py-3 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
          />
        </div>

        {/* Category */}
        <SearchField
          label="Tour Category"
          options={categories}
        />

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1E293B]">
            Departure Date
          </label>

          <input
            type="date"
            className="w-full rounded-xl border border-[#E2E8F0] px-4 py-3 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
          />
        </div>

        {/* Price */}
        <SearchField
          label="Price Range"
          options={priceRanges}
        />

        {/* Duration */}
        <SearchField
          label="Duration"
          options={durations}
        />

      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-[#F97316] px-10 py-4 font-semibold text-white transition hover:bg-[#0B5C56]"
        >
          <Search size={20} />
          Search Tours
        </button>
      </div>
    </form>
  );
}