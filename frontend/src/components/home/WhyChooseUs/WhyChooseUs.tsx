import FeatureCard from "./FeatureCard";
import { features } from "@/constants/features";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F8FAFC] py-12 xs:py-16 sm:py-20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">

        <div className="mx-auto mb-10 xs:mb-12 sm:mb-14 max-w-3xl text-center">

          <span className="text-xs xs:text-sm sm:text-base font-semibold uppercase tracking-wider text-[#F97316]">
            WHY CHOOSE BAIG TOURS
          </span>

          <h2 className="mt-2 xs:mt-3 sm:mt-4 text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1E293B]">
            Travel With Confidence
          </h2>

          <p className="mt-3 xs:mt-4 sm:mt-5 text-base xs:text-lg sm:text-lg text-slate-600 px-2 xs:px-4">
            We are committed to delivering memorable travel experiences through
            professional planning, exceptional service, and customer-focused
            support.
          </p>

        </div>

        <div className="grid gap-4 xs:gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>

      </div>
    </section>
  );
}