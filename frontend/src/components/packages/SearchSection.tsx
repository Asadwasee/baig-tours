// components/packages/SearchSection.tsx
'use client';

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
    <section className="-mt-8 xs:-mt-10 sm:-mt-12 relative z-20 mb-10 xs:mb-12 sm:mb-16">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl xs:rounded-3xl bg-white p-4 xs:p-5 sm:p-6 shadow-2xl ring-1 ring-gray-100">
          <div className="grid gap-4 xs:gap-5">

            <div>
              <label className="mb-1.5 xs:mb-2 block text-xs xs:text-sm font-semibold text-[#1E293B]">
                Search Tour
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 px-3 xs:px-4 py-2.5 xs:py-3 focus-within:border-[#0F766E]">
                <Search size={18} className="xs:w-[20px] xs:h-[20px] mr-2 xs:mr-3 text-[#0F766E]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by package or destination..."
                  className="w-full bg-transparent outline-none text-sm xs:text-base placeholder:text-sm xs:placeholder:text-base"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}