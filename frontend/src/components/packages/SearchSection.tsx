"use client";

import { Search, MapPin, CalendarDays } from "lucide-react";

export default function SearchSection() {
  return (
    <section className="-mt-12 relative z-20 mb-16">
      <div className="container-custom">

        <div className="rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-gray-100">

          <div className="grid gap-5 lg:grid-cols-5">

            {/* Search */}

            <div className="lg:col-span-2">
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
                  placeholder="Destination or Package"
                  className="w-full bg-transparent outline-none"
                />

              </div>
            </div>

            {/* Destination */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1E293B]">
                Destination
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 px-4 py-3">

                <MapPin
                  size={20}
                  className="mr-3 text-[#0F766E]"
                />

                <select className="w-full bg-transparent outline-none">

                  <option>All Destinations</option>

                  <option>Hunza</option>

                  <option>Skardu</option>

                  <option>Swat</option>

                  <option>Turkey</option>

                  <option>Dubai</option>

                </select>

              </div>
            </div>

            {/* Departure */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1E293B]">
                Departure Date
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 px-4 py-3">

                <CalendarDays
                  size={20}
                  className="mr-3 text-[#0F766E]"
                />

                <input
                  type="date"
                  className="w-full bg-transparent outline-none"
                />

              </div>
            </div>

            {/* Search Button */}

            <div className="flex items-end">

              <button className="w-full rounded-xl bg-[#F97316] py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] hover:scale-[1.02]">

                Search Tours

              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}