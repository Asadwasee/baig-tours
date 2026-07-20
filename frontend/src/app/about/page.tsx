import AboutHero from "@/components/about/AboutHero";
import Achievements from "@/components/about/Achievements";
import CompanyOverview from "@/components/about/CompanyOverview";
import Experience from "@/components/about/Experience";
import MissionVision from "@/components/about/MissionVision";
import TeamMembers from "@/components/about/TeamMembers";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyOverview />
      <MissionVision />
      <TeamMembers />
      <Experience />
      <Achievements />
      
    </>
  );
}