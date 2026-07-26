import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  bgColor,
  textColor,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h2>

          <p className="mt-3 text-sm font-medium text-green-600">
            {change}
          </p>
        </div>

        <div className={`rounded-2xl p-4 ${bgColor} ${textColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}