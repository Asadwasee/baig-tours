import PackageCard from "./PackageCard";
import { featuredPackages } from "@/constants/packages";

export default function FeaturedPackages() {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container-custom">

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Featured Packages
          </span>

          <h2 className="mt-4 text-4xl font-bold text-[#1E293B]">
            Explore Our Most Popular Tours
          </h2>

          <p className="mt-5 text-slate-600">
            Discover carefully selected domestic and international tour
            packages designed to create unforgettable travel experiences.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredPackages.map((tour) => (
            <PackageCard
              key={tour.id}
              tour={tour}
            />
          ))}
        </div>

      </div>
    </section>
  );
}