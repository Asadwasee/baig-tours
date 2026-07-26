// app/about/page.tsx
'use client';

import { useSettings } from '@/hooks/useSettings';
import AboutHero from "@/components/about/AboutHero";
import Achievements from "@/components/about/Achievements";
import CompanyOverview from "@/components/about/CompanyOverview";
import Experience from "@/components/about/Experience";
import MissionVision from "@/components/about/MissionVision";
import TeamMembers from "@/components/about/TeamMembers";

export default function AboutPage() {
  const { settings, loading, error } = useSettings();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20">
        <div className="container-custom">
          <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
            <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  // Get about data from settings
  const about = settings?.aboutUs || {};

  return (
    <>
      <AboutHero 
        title={about.title || "Passionate About Creating"}
        subtitle={about.subtitle || "Unforgettable Journeys"}
        description={about.description || "Baig Tours has been helping travelers explore Pakistan and the world through carefully planned tours, exceptional hospitality, and unforgettable travel experiences. Every journey is designed to be safe, comfortable, and memorable."}
      />
      
      <CompanyOverview 
        title={about.companyTitle || "Your Trusted Travel Partner"}
        description={about.companyDescription || "Baig Tours is dedicated to creating memorable travel experiences across Pakistan and around the world. From breathtaking mountain adventures to luxurious international holidays, we focus on comfort, reliability, and exceptional customer service at every step of your journey."}
        fullDescription={about.fullDescription}
        image={about.bannerImage || "/assets/images/about/company.jpg"}
        highlights={about.highlights || [
          "Trusted by thousands of satisfied travelers",
          "Carefully planned domestic & international tours",
          "Professional guides & 24/7 customer support"
        ]}
      />
      
      <MissionVision 
        mission={about.mission || "To provide high-quality domestic and international travel experiences through carefully planned tours, exceptional customer service, reliable travel arrangements, and affordable packages that create lifelong memories for every traveler."}
        vision={about.vision || "To become one of Pakistan's most trusted travel companies by connecting people with extraordinary destinations, promoting responsible tourism, and setting new standards for excellence in the travel industry."}
        missionPoints={about.missionPoints || [
          "Customer-first travel experiences",
          "Reliable and transparent services",
          "Safe and comfortable journeys"
        ]}
        visionPoints={about.visionPoints || [
          "Expand global travel opportunities",
          "Promote sustainable tourism",
          "Deliver world-class travel experiences"
        ]}
      />
      
      <TeamMembers 
        team={about.teamMembers || undefined}
      />
      
      <Experience />
      
      <Achievements />
    </>
  );
}