// components/package-details/PackageHero.tsx
import Link from "next/link";
import {
  ChevronRight,
  Star,
  MapPin,
  CalendarDays,
  Clock3,
  Users,
} from "lucide-react";
import { Package } from "@/types/package";

interface PackageHeroProps {
  packageData: Package;
}

export default function PackageHero({ packageData }: PackageHeroProps) {
  // Safely access all properties with fallbacks
  const price = packageData?.price ?? 0;
  const discountPrice = packageData?.discountPrice ?? null;
  const displayPrice = discountPrice ?? price;
  
  const rating = 4.9;
  const reviewCount = 124;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0F766E] to-[#0B5C56] py-24 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F97316]/20 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="mb-8 flex items-center gap-2 text-sm text-white/80">
          <Link href="/" className="hover:text-[#FBBF24]">Home</Link>
          <ChevronRight size={16} />
          <Link href="/packages" className="hover:text-[#FBBF24]">Tour Packages</Link>
          <ChevronRight size={16} />
          <span className="text-[#FBBF24]">{packageData.title}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              {packageData.category} Tour
            </span>

            <h1 className="mt-6 font-[var(--font-poppins)] text-5xl font-bold leading-tight md:text-6xl">
              {packageData.title}
              <span className="block text-[#FBBF24]">{packageData.destination}</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
              {packageData.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Clock3 size={18} />
                <span>{packageData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{packageData.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                <span>{packageData.departureDate ? new Date(packageData.departureDate).toLocaleDateString() : 'Upcoming'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{packageData.availableSeats ?? 'Limited'} Seats Left</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Star fill="#FBBF24" className="text-[#FBBF24]" />
              <span className="text-4xl font-bold">{rating}</span>
            </div>
            <p className="mt-2 text-white/80">Based on {reviewCount} Reviews</p>

            <div className="mt-8">
              <p className="text-sm text-white/70">Starting From</p>
              <h2 className="mt-2 text-4xl font-bold text-[#FBBF24]">
                PKR {displayPrice.toLocaleString()}
              </h2>
              <p className="mt-1 text-sm text-white/70">Per Person</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}