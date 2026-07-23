import { Feature } from "@/types/feature";

interface Props {
  feature: Feature;
}

export default function FeatureCard({ feature }: Props) {
  const Icon = feature.icon;

  return (
    <div className="group rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E] transition-colors duration-300 group-hover:bg-[#F97316] group-hover:text-white">
        <Icon size={30} />
      </div>

      <h3 className="mb-3 text-xl font-semibold text-[#1E293B]">
        {feature.title}
      </h3>

      <p className="leading-7 text-slate-600">
        {feature.description}
      </p>

    </div>
  );
}