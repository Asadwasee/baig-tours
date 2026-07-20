"use client";

import {
  MapPin,
  Clock3,
  CalendarDays,
  SlidersHorizontal,
  Tag,
  RotateCcw,
} from "lucide-react";

interface Props {
  selectedDestinations: string[];
  setSelectedDestinations: React.Dispatch<React.SetStateAction<string[]>>;

  category: string;
  setCategory: (value: string) => void;

  duration: string;
  setDuration: (value: string) => void;

  maxPrice: number;
  setMaxPrice: (value: number) => void;
}

export default function FilterSidebar({
  selectedDestinations,
  setSelectedDestinations,
  category,
  setCategory,
  duration,
  setDuration,
  maxPrice,
  setMaxPrice,
}: Props) {
  return (
    <aside className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-[#0F766E]/10 p-2">
          <SlidersHorizontal className="h-5 w-5 text-[#0F766E]" />
        </div>

        <div>

          <h3 className="font-[var(--font-poppins)] text-xl font-bold text-[#1E293B]">
            Filters
          </h3>

          <p className="text-sm text-gray-500">
            Refine your search
          </p>

        </div>

      </div>

      <div className="my-8 border-t" />

      {/* Destination */}

      <div className="mb-8">

        <div className="mb-4 flex items-center gap-2">

          <MapPin
            size={18}
            className="text-[#0F766E]"
          />

          <h4 className="font-semibold text-[#1E293B]">
            Destination
          </h4>

        </div>

        <div className="space-y-3">

          {[
            "Hunza",
            "Skardu",
            "Swat",
            "Fairy Meadows",
            "Turkey",
            "Dubai",
          ].map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition hover:bg-[#F8FAFC]"
            >
              <div className="flex items-center gap-3">

                <input
  type="checkbox"
  checked={selectedDestinations.includes(item)}
  onChange={() => {

    if (selectedDestinations.includes(item)) {
      setSelectedDestinations(
        selectedDestinations.filter(
          (destination) => destination !== item
        )
      );
    } else {
      setSelectedDestinations([
        ...selectedDestinations,
        item,
      ]);
    }

  }}
  className="h-4 w-4 accent-[#0F766E]"
/>

                <span className="text-gray-700">
                  {item}
                </span>

              </div>

            </label>
          ))}

        </div>

      </div>

      <div className="mb-8 border-t" />

      {/* Category */}

      <div className="mb-8">

        <div className="mb-4 flex items-center gap-2">

          <Tag
            size={18}
            className="text-[#0F766E]"
          />

          <h4 className="font-semibold text-[#1E293B]">
            Tour Category
          </h4>

        </div>

        <div className="space-y-3">

          {[
            "Family",
            "Adventure",
            "Honeymoon",
            "Group Tour",
          ].map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-[#F8FAFC]"
            >

              <input
    type="radio"
    name="category"
    checked={category === item}
    onChange={() => setCategory(item)}
    className="accent-[#0F766E]"
/>

              <span>{item}</span>

            </label>
          ))}

        </div>

      </div>

      <div className="mb-8 border-t" />

      {/* Duration */}

      <div className="mb-8">

        <label className="mb-3 flex items-center gap-2 font-semibold text-[#1E293B]">

          <Clock3
            size={18}
            className="text-[#0F766E]"
          />

          Duration

        </label>

        <select 
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-[#0F766E]">

          <option>Any Duration</option>

          <option>3 Days</option>

          <option>5 Days</option>

          <option>7 Days</option>

          <option>10+ Days</option>

        </select>

      </div>

      {/* Price */}

      <div className="mb-8">

        <label className="mb-4 block font-semibold text-[#1E293B]">
          Price Range
        </label>

        <input
    type="range"
    min={10000}
    max={500000}
    step={5000}
    value={maxPrice}
    onChange={(e) =>
        setMaxPrice(Number(e.target.value))
    }
    className="w-full accent-[#F97316]"
/>

        <div className="mt-3 flex items-center justify-between text-sm font-medium text-gray-500">

    <span>PKR 10k</span>

    <span className="font-semibold text-[#F97316]">
        PKR {maxPrice.toLocaleString()}
    </span>

</div>

      </div>

      {/* Departure */}

      <div className="mb-10">

        <label className="mb-3 flex items-center gap-2 font-semibold text-[#1E293B]">

          <CalendarDays
            size={18}
            className="text-[#0F766E]"
          />

          Departure Date

        </label>

        <input
          type="date"
          className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#0F766E]"
        />

      </div>

      {/* Buttons */}

      <div className="space-y-3">

        <button 
        onClick={() => {
        setSelectedDestinations([]);
        setCategory("");
        setDuration("");
        setMaxPrice(500000);
    }}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0F766E] py-3 font-semibold text-[#0F766E] transition hover:bg-[#0F766E] hover:text-white">

          <RotateCcw size={17} />

          Reset Filters

        </button>

      </div>

    </aside>
  );
}