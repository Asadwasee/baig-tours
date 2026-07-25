import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";

export default function PackageHero() {
  return (
    <section className="bg-[#F8FAFC] border-b border-gray-200">

      <div className="container-custom py-10">

        {/* Breadcrumb */}

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <Link
            href="/"
            className="hover:text-[#0F766E]"
          >
            Home
          </Link>

          <ChevronRight size={16} />

          <Link
            href="/packages"
            className="hover:text-[#0F766E]"
          >
            Tour Packages
          </Link>

          <ChevronRight size={16} />

          <span className="text-[#1E293B] font-medium">
            Hunza Valley Adventure
          </span>

        </div>

        {/* Heading */}

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <span className="rounded-full bg-[#0F766E]/10 px-4 py-2 text-sm font-semibold text-[#0F766E]">

              Domestic Tour

            </span>

            <h1 className="mt-5 font-[var(--font-poppins)] text-5xl font-bold text-[#1E293B]">

              Hunza Valley Adventure

            </h1>

            <p className="mt-4 max-w-2xl text-lg text-gray-600">

              Discover breathtaking valleys, crystal-clear lakes,
              majestic mountains, and unforgettable adventures
              through Northern Pakistan.

            </p>

          </div>

          {/* Rating */}

          <div className="rounded-2xl bg-white p-5 shadow-md">

            <div className="flex items-center gap-2">

              <Star
                size={20}
                fill="#FBBF24"
                className="text-[#FBBF24]"
              />

              <span className="text-2xl font-bold">

                4.9

              </span>

            </div>

            <p className="mt-1 text-gray-500">

              Based on 124 Reviews

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}