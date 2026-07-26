// components/about/Experience.tsx
'use client';

import {
  CalendarClock,
  Users,
  MapPinned,
  Plane,
} from "lucide-react";

interface ExperienceStats {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
  color: string;
  bg: string;
}

interface ExperienceProps {
  stats?: ExperienceStats[];
}

const defaultStats: ExperienceStats[] = [
  {
    icon: <CalendarClock size={34} />,
    number: "10+",
    title: "Years of Experience",
    description: "Providing trusted travel services across Pakistan and internationally.",
    color: "text-[#0F766E]",
    bg: "bg-[#0F766E]/10",
  },
  {
    icon: <Users size={34} />,
    number: "15,000+",
    title: "Happy Travelers",
    description: "Thousands of satisfied customers have explored the world with us.",
    color: "text-[#F97316]",
    bg: "bg-[#F97316]/10",
  },
  {
    icon: <Plane size={34} />,
    number: "250+",
    title: "Tours Organized",
    description: "Domestic and international tours successfully completed every year.",
    color: "text-[#16A34A]",
    bg: "bg-[#16A34A]/10",
  },
  {
    icon: <MapPinned size={34} />,
    number: "25+",
    title: "Destinations",
    description: "Beautiful locations across Pakistan and around the globe.",
    color: "text-[#FBBF24]",
    bg: "bg-[#FBBF24]/15",
  },
];

export default function Experience({ stats = defaultStats }: ExperienceProps) {
  return (
    <section className="bg-white py-20">
      <div className="container-custom">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Our Experience
          </span>
          <h2 className="mt-4 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Trusted by Travelers for Years
          </h2>
          <p className="mt-5 leading-8 text-gray-600">
            Our passion for travel, commitment to quality, and dedication to
            customer satisfaction have helped us become a trusted name in the
            tourism industry.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-gray-100 bg-[#F8FAFC] p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#0F766E]/20 hover:shadow-xl"
            >
              <div className={`mx-auto flex h-18 w-18 items-center justify-center rounded-2xl ${item.bg}`}>
                <div className={item.color}>{item.icon}</div>
              </div>

              <h3 className="mt-6 font-[var(--font-poppins)] text-5xl font-bold text-[#1E293B]">
                {item.number}
              </h3>

              <h4 className="mt-3 text-lg font-semibold text-[#1E293B]">
                {item.title}
              </h4>

              <p className="mt-4 leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}