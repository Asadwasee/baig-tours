// components/packages/SortBar.tsx
import {
  ArrowDownUp,
  Grid3X3,
} from "lucide-react";

interface Props {
  totalPackages: number;
  sortBy: string;
  setSortBy: (value: string) => void;
  loading?: boolean;
}

export default function SortBar({
  totalPackages,
  sortBy,
  setSortBy,
  loading = false,
}: Props) {
  return (
    <div className="mb-6 xs:mb-8 flex flex-col gap-4 xs:gap-5 rounded-2xl xs:rounded-3xl border border-gray-100 bg-white p-4 xs:p-5 sm:p-6 shadow-md lg:flex-row lg:items-center lg:justify-between">

      {/* Left Side */}
      <div>
        <h2 className="font-[var(--font-poppins)] text-lg xs:text-xl sm:text-2xl font-bold text-[#1E293B]">
          Explore Tour Packages
        </h2>
        <p className="mt-0.5 xs:mt-1 text-xs xs:text-sm text-gray-600">
          Showing
          <span className="mx-1 font-semibold text-[#0F766E]">
            {loading ? '...' : totalPackages}
          </span>
          carefully selected domestic & international tours.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-wrap items-center gap-3 xs:gap-4">

        {/* Grid View */}
        <button className="flex h-9 w-9 xs:h-10 xs:w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-gray-300 text-[#0F766E] transition hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white">
          <Grid3X3 size={16} className="xs:w-[18px] xs:h-[18px] sm:w-[20px] sm:h-[20px]" />
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2 xs:gap-3">
          <ArrowDownUp size={16} className="xs:w-[18px] xs:h-[18px] text-[#0F766E]" />
          <span className="text-xs xs:text-sm font-medium text-[#1E293B]">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 xs:px-4 py-1.5 xs:py-2 sm:py-2.5 text-xs xs:text-sm outline-none transition focus:border-[#0F766E]"
          >
            <option value="Latest">Latest</option>
            <option value="Lowest Price">Lowest Price</option>
            <option value="Highest Price">Highest Price</option>
            <option value="Most Popular">Most Popular</option>
          </select>
        </div>

      </div>

    </div>
  );
}