import PackageListingCard from "./PackageListingCard";
import { TourPackage } from "@/types/package";

interface Props {
  packages: TourPackage[];
}

export default function PackageGrid({ packages }: Props) {
  if (packages.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-16 text-center shadow-md">
        <h3 className="text-2xl font-bold text-[#1E293B]">
          No Packages Found
        </h3>

        <p className="mt-3 text-gray-600">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {packages.map((tour) => (
        <PackageListingCard
          key={tour.id}
          tour={tour}
        />
      ))}
    </div>
  );
}