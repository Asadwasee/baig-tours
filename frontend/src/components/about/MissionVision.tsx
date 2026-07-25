// components/about/MissionVision.tsx
'use client';

import { Target, Eye } from "lucide-react";

interface MissionVisionProps {
  mission?: string;
  vision?: string;
  missionPoints?: string[];
  visionPoints?: string[];
}

export default function MissionVision({ 
  mission = "To provide high-quality domestic and international travel experiences through carefully planned tours, exceptional customer service, reliable travel arrangements, and affordable packages that create lifelong memories for every traveler.",
  vision = "To become one of Pakistan's most trusted travel companies by connecting people with extraordinary destinations, promoting responsible tourism, and setting new standards for excellence in the travel industry.",
  missionPoints = [
    "Customer-first travel experiences",
    "Reliable and transparent services",
    "Safe and comfortable journeys"
  ],
  visionPoints = [
    "Expand global travel opportunities",
    "Promote sustainable tourism",
    "Deliver world-class travel experiences"
  ]
}: MissionVisionProps) {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container-custom">

        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Our Purpose
          </span>
          <h2 className="mt-4 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Mission & Vision
          </h2>
          <p className="mt-5 leading-8 text-gray-600">
            We strive to deliver exceptional travel experiences while inspiring
            people to explore the beauty of Pakistan and the world with
            confidence, comfort, and unforgettable memories.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Mission */}
          <div className="group rounded-3xl bg-white p-10 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F766E]/10">
              <Target size={34} className="text-[#0F766E]" />
            </div>

            <h3 className="font-[var(--font-poppins)] text-3xl font-bold text-[#1E293B]">
              Our Mission
            </h3>

            <p className="mt-6 leading-8 text-gray-600">{mission}</p>

            <ul className="mt-8 space-y-3">
              {missionPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#0F766E]" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="group rounded-3xl bg-white p-10 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F97316]/10">
              <Eye size={34} className="text-[#F97316]" />
            </div>

            <h3 className="font-[var(--font-poppins)] text-3xl font-bold text-[#1E293B]">
              Our Vision
            </h3>

            <p className="mt-6 leading-8 text-gray-600">{vision}</p>

            <ul className="mt-8 space-y-3">
              {visionPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#F97316]" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}