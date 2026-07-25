// components/about/Achievements.tsx
'use client';

import { Award, Globe2, BadgeCheck, Trophy } from "lucide-react";

interface Achievement {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

interface AchievementsProps {
  achievements?: Achievement[];
  title?: string;
  subtitle?: string;
  description?: string;
}

const defaultAchievements: Achievement[] = [
  {
    icon: Award,
    title: "Trusted Travel Company",
    description: "Recognized for delivering reliable domestic and international travel experiences with outstanding customer satisfaction.",
    color: "bg-[#0F766E]/10 text-[#0F766E]",
  },
  {
    icon: Globe2,
    title: "25+ Destinations",
    description: "Offering carefully curated tours across Pakistan and popular international destinations throughout the year.",
    color: "bg-[#F97316]/10 text-[#F97316]",
  },
  {
    icon: BadgeCheck,
    title: "Quality Service",
    description: "Committed to providing professional travel planning, transparent pricing, and exceptional customer support.",
    color: "bg-[#16A34A]/10 text-[#16A34A]",
  },
  {
    icon: Trophy,
    title: "Thousands of Happy Travelers",
    description: "Our greatest achievement is the trust and positive experiences shared by thousands of satisfied customers.",
    color: "bg-[#FBBF24]/15 text-[#FBBF24]",
  },
];

export default function Achievements({ 
  achievements = defaultAchievements,
  title = "Milestones That Inspire Confidence",
  subtitle = "Company Achievements",
  description = "Every successful journey reflects our commitment to quality, reliability, and memorable travel experiences for our customers."
}: AchievementsProps) {
  return (
    <section className="bg-white py-20">
      <div className="container-custom">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            {subtitle}
          </span>
          <h2 className="mt-4 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            {title}
          </h2>
          <p className="mt-5 leading-8 text-gray-600">
            {description}
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {achievements.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group flex gap-6 rounded-3xl border border-gray-100 bg-[#F8FAFC] p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl ${item.color}`}>
                  <Icon size={32} />
                </div>

                <div>
                  <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-7 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}