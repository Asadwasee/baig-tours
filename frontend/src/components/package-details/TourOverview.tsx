// components/package-details/TourOverview.tsx
import {
  MapPin,
  BedDouble,
  Bus,
  UtensilsCrossed,
  Mountain,
  Clock3,
} from "lucide-react";
import { Package } from "@/types/package";

interface TourOverviewProps {
  packageData: Package;
}

export default function TourOverview({ packageData }: TourOverviewProps) {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container-custom">
        {/* Heading */}
        <div className="max-w-3xl">
          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Tour Overview
          </span>
          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Everything You Need To Know
          </h2>
          <p className="mt-5 leading-8 text-gray-600">
            {packageData.description}
          </p>
        </div>

        {/* Overview Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <InfoCard icon={<Mountain size={22} />} title="Tour Type" value={packageData.category} />
          <InfoCard icon={<MapPin size={22} />} title="Destination" value={packageData.destination} />
          <InfoCard icon={<Clock3 size={22} />} title="Duration" value={packageData.duration} />
          <InfoCard icon={<BedDouble size={22} />} title="Accommodation" value={packageData.hotelInfo || "Standard Hotels"} />
          <InfoCard icon={<Bus size={22} />} title="Transport" value={packageData.transportDetails || "Luxury Transport"} />
          <InfoCard icon={<UtensilsCrossed size={22} />} title="Meals" value={packageData.mealsIncluded ? "Breakfast & Dinner" : "Not Included"} />
        </div>

        {/* Full Description */}
        <div className="mt-14 rounded-3xl bg-white p-8 shadow-md">
          <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
            About This Tour
          </h3>
          <p className="mt-6 leading-8 text-gray-600">{packageData.description}</p>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/20 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
        {icon}
      </div>
      <p className="mt-5 text-sm text-gray-500">{title}</p>
      <h4 className="mt-1 font-semibold text-[#1E293B]">{value}</h4>
    </div>
  );
}