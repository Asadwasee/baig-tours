"use client";

import { Search } from "lucide-react";

interface SearchSectionProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchSection({
  search,
  setSearch,
}: SearchSectionProps) {
  return (
    <section className="-mt-12 relative z-20 mb-16">
      <div className="container-custom">
        <div className="rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-gray-100">
          <div className="grid gap-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1E293B]">
                Search Tour
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 px-4 py-3 focus-within:border-[#0F766E]">

                <Search
                  size={20}
                  className="mr-3 text-[#0F766E]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by package or destination..."
                  className="w-full bg-transparent outline-none"
                />

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}