// components/packages/FilterSidebar.tsx
'use client';

import { useState } from "react";
import {
  MapPin,
  Clock3,
  CalendarDays,
  SlidersHorizontal,
  Tag,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Filter,
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#0F766E]/10 p-2">
              <Filter className="h-5 w-5 text-[#0F766E]" />
            </div>
            <div className="text-left">
              <h3 className="font-[var(--font-poppins)] font-semibold text-[#1E293B]">
                Filters
              </h3>
              <p className="text-sm text-gray-500">
                {selectedDestinations.length > 0 || category || duration || maxPrice < 500000
                  ? "Active filters applied"
                  : "Refine your search"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Active filter count badge */}
            {(
              selectedDestinations.length > 0 || 
              category || 
              duration || 
              maxPrice < 500000
            ) && (
              <span className="rounded-full bg-[#F97316] px-2.5 py-0.5 text-xs font-bold text-white">
                {selectedDestinations.length + (category ? 1 : 0) + (duration ? 1 : 0) + (maxPrice < 500000 ? 1 : 0)}
              </span>
            )}
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </button>
      </div>

      {/* Filter Content - Mobile: collapsible, Desktop: always visible */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-[2000px] lg:opacity-100'
        }`}
      >
        <aside className="rounded-2xl xs:rounded-3xl border border-gray-100 bg-white p-4 xs:p-5 sm:p-6 shadow-lg">

          {/* Header */}
          <div className="flex items-center gap-2 xs:gap-3">
            <div className="rounded-xl bg-[#0F766E]/10 p-1.5 xs:p-2">
              <SlidersHorizontal className="h-4 w-4 xs:h-5 xs:w-5 text-[#0F766E]" />
            </div>
            <div>
              <h3 className="font-[var(--font-poppins)] text-base xs:text-xl font-bold text-[#1E293B]">
                Filters
              </h3>
              <p className="text-xs xs:text-sm text-gray-500">Refine your search</p>
            </div>
          </div>

          <div className="my-5 xs:my-6 sm:my-8 border-t" />

          {/* Destination */}
          <div className="mb-5 xs:mb-6 sm:mb-8">
            <div className="mb-3 xs:mb-4 flex items-center gap-2">
              <MapPin size={16} className="xs:w-[18px] xs:h-[18px] text-[#0F766E]" />
              <h4 className="text-sm xs:text-base font-semibold text-[#1E293B]">Destination</h4>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 xs:gap-2">
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
                  className="flex cursor-pointer items-center gap-2 xs:gap-3 rounded-xl px-2 xs:px-3 py-1.5 xs:py-2 transition hover:bg-[#F8FAFC]"
                >
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
                    className="h-3.5 w-3.5 xs:h-4 xs:w-4 accent-[#0F766E]"
                  />
                  <span className="text-xs xs:text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5 xs:mb-6 sm:mb-8 border-t" />

          {/* Category */}
          <div className="mb-5 xs:mb-6 sm:mb-8">
            <div className="mb-3 xs:mb-4 flex items-center gap-2">
              <Tag size={16} className="xs:w-[18px] xs:h-[18px] text-[#0F766E]" />
              <h4 className="text-sm xs:text-base font-semibold text-[#1E293B]">Tour Category</h4>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-2 gap-1 xs:gap-2">
              {[
                "Family",
                "Adventure",
                "Honeymoon",
                "Group Tour",
              ].map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-2 xs:gap-3 rounded-xl px-2 xs:px-3 py-1.5 xs:py-2 transition hover:bg-[#F8FAFC]"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={category === item}
                    onChange={() => setCategory(item)}
                    className="h-3.5 w-3.5 xs:h-4 xs:w-4 accent-[#0F766E]"
                  />
                  <span className="text-xs xs:text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5 xs:mb-6 sm:mb-8 border-t" />

          {/* Duration */}
          <div className="mb-5 xs:mb-6 sm:mb-8">
            <label className="mb-2 xs:mb-3 flex items-center gap-2 text-sm xs:text-base font-semibold text-[#1E293B]">
              <Clock3 size={16} className="xs:w-[18px] xs:h-[18px] text-[#0F766E]" />
              Duration
            </label>

            <select 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white p-2.5 xs:p-3 text-sm xs:text-base outline-none transition focus:border-[#0F766E]"
            >
              <option>Any Duration</option>
              <option>3 Days</option>
              <option>5 Days</option>
              <option>7 Days</option>
              <option>10+ Days</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-5 xs:mb-6 sm:mb-8">
            <label className="mb-3 xs:mb-4 block text-sm xs:text-base font-semibold text-[#1E293B]">
              Price Range
            </label>

            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#F97316]"
            />

            <div className="mt-2 xs:mt-3 flex items-center justify-between text-xs xs:text-sm font-medium text-gray-500">
              <span>PKR 10k</span>
              <span className="font-semibold text-[#F97316]">
                PKR {maxPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Departure */}
          <div className="mb-6 xs:mb-8 sm:mb-10">
            <label className="mb-2 xs:mb-3 flex items-center gap-2 text-sm xs:text-base font-semibold text-[#1E293B]">
              <CalendarDays size={16} className="xs:w-[18px] xs:h-[18px] text-[#0F766E]" />
              Departure Date
            </label>
            <input
              type="date"
              className="w-full rounded-xl border border-gray-300 p-2.5 xs:p-3 text-sm xs:text-base outline-none transition focus:border-[#0F766E]"
            />
          </div>

          {/* Buttons */}
          <div className="space-y-2 xs:space-y-3">
            <button 
              onClick={() => {
                setSelectedDestinations([]);
                setCategory("");
                setDuration("");
                setMaxPrice(500000);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0F766E] py-2.5 xs:py-3 text-sm xs:text-base font-semibold text-[#0F766E] transition hover:bg-[#0F766E] hover:text-white"
            >
              <RotateCcw size={15} className="xs:w-[17px] xs:h-[17px]" />
              Reset Filters
            </button>
          </div>

        </aside>
      </div>
    </>
  );
}