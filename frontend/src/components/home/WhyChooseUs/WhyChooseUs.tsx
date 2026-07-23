import FeatureCard from "./FeatureCard";
import { features } from "@/constants/features";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container-custom">

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            WHY CHOOSE BAIG TOURS
          </span>

          <h2 className="mt-4 text-4xl font-bold text-[#1E293B]">
            Travel With Confidence
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            We are committed to delivering memorable travel experiences through
            professional planning, exceptional service, and customer-focused
            support.
          </p>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
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