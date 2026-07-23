import PackageListingCard from "./PackageListingCard";
import { featuredPackages } from "@/constants/packages";

export default function PackageGrid() {
  return (
    <div className="space-y-6">

      {featuredPackages.map((tour) => (
        <PackageListingCard
          key={tour.id}
          tour={tour}
        />
      ))}

    </div>
  );
}