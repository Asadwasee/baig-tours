import {
  ArrowDownUp,
  Grid3X3,
} from "lucide-react";

export default function SortBar() {
  return (
    <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-md lg:flex-row lg:items-center lg:justify-between">

      {/* Left Side */}

      <div>

        <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
          Explore Tour Packages
        </h2>

        <p className="mt-1 text-gray-600">
          Showing
          <span className="mx-1 font-semibold text-[#0F766E]">
            12
          </span>
          carefully selected domestic & international tours.
        </p>

      </div>

      {/* Right Side */}

      <div className="flex flex-wrap items-center gap-4">

        {/* Grid View */}

        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 text-[#0F766E] transition hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white">

          <Grid3X3 size={20} />

        </button>

        {/* Sort */}

        <div className="flex items-center gap-3">

          <ArrowDownUp
            size={18}
            className="text-[#0F766E]"
          />

          <span className="font-medium text-[#1E293B]">
            Sort By
          </span>

          <select className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-[#0F766E]">

            <option>Latest</option>

            <option>Lowest Price</option>

            <option>Highest Price</option>

            <option>Most Popular</option>

          </select>

        </div>

      </div>

    </div>
  );
}