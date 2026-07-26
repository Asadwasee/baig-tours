// components/packages/PackageGrid.tsx
import PackageListingCard from "./PackageListingCard";
import { Package } from "@/types/package";

interface Props {
  packages: Package[];
}

export default function PackageGrid({ packages }: Props) {
  if (packages.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 xs:p-12 sm:p-16 text-center shadow-md">
        <h3 className="text-xl xs:text-2xl font-bold text-[#1E293B]">
          No Packages Found
        </h3>
        <p className="mt-2 xs:mt-3 text-sm xs:text-base text-gray-600">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 xs:space-y-5 sm:space-y-6">
      {packages.map((tour) => (
        <PackageListingCard
          key={tour._id}
          tour={tour}
        />
      ))}
    </div>
  );
}