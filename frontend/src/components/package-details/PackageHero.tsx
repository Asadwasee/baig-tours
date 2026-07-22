import Link from "next/link";
import {
  ChevronRight,
  Star,
  MapPin,
  CalendarDays,
  Clock3,
  Users,
} from "lucide-react";

export default function PackageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0F766E] to-[#0B5C56] py-24 text-white">

      {/* Background Decoration */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F97316]/20 blur-3xl" />

      </div>

      <div className="container-custom relative z-10">

        {/* Breadcrumb */}

        <div className="mb-8 flex items-center gap-2 text-sm text-white/80">

          <Link href="/" className="hover:text-[#FBBF24]">
            Home
          </Link>

          <ChevronRight size={16} />

          <Link href="/packages" className="hover:text-[#FBBF24]">
            Tour Packages
          </Link>

          <ChevronRight size={16} />

          <span className="text-[#FBBF24]">
            Hunza Valley Adventure
          </span>

        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-end">

          {/* Left */}

          <div>

            <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">

              Domestic Adventure Tour

            </span>

            <h1 className="mt-6 font-[var(--font-poppins)] text-5xl font-bold leading-tight md:text-6xl">

              Hunza Valley

              <span className="block text-[#FBBF24]">
                Adventure Tour
              </span>

            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">

              Experience Pakistan's most breathtaking valleys, crystal-clear
              lakes, snow-covered mountains and unforgettable road trips with
              our carefully planned premium tour.

            </p>

            {/* Quick Info */}

            <div className="mt-10 flex flex-wrap gap-6 text-white/90">

              <div className="flex items-center gap-2">

                <Clock3 size={18} />

                <span>7 Days</span>

              </div>

              <div className="flex items-center gap-2">

                <MapPin size={18} />

                <span>Hunza Valley</span>

              </div>

              <div className="flex items-center gap-2">

                <CalendarDays size={18} />

                <span>15 Aug 2026</span>

              </div>

              <div className="flex items-center gap-2">

                <Users size={18} />

                <span>8 Seats Left</span>

              </div>

            </div>

          </div>

          {/* Rating Card */}

          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-md">

            <div className="flex items-center gap-3">

              <Star
                fill="#FBBF24"
                className="text-[#FBBF24]"
              />

              <span className="text-4xl font-bold">

                4.9

              </span>

            </div>

            <p className="mt-2 text-white/80">

              Based on 124 Reviews

            </p>

            <div className="mt-8">

              <p className="text-sm text-white/70">

                Starting From

              </p>

              <h2 className="mt-2 text-4xl font-bold text-[#FBBF24]">

                PKR 65,000

              </h2>

              <p className="mt-1 text-sm text-white/70">

                Per Person

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}