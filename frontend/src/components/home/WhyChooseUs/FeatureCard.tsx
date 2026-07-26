import { Feature } from "@/types/feature";

interface Props {
  feature: Feature;
}

export default function FeatureCard({ feature }: Props) {
  const Icon = feature.icon;

  return (
    <div className="group rounded-2xl bg-white p-6 xs:p-7 sm:p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="mb-4 xs:mb-5 sm:mb-6 flex h-14 w-14 xs:h-16 xs:w-16 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E] transition-colors duration-300 group-hover:bg-[#F97316] group-hover:text-white">
        <Icon size={24} className="xs:w-[30px] xs:h-[30px]" />
      </div>

      <h3 className="mb-2 xs:mb-2.5 sm:mb-3 text-lg xs:text-xl sm:text-xl font-semibold text-[#1E293B]">
        {feature.title}
      </h3>

      <p className="text-sm xs:text-base leading-6 xs:leading-7 text-slate-600">
        {feature.description}
      </p>

    </div>
  );
}