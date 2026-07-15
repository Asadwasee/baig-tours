import FeaturedPackages from "@/components/home/FeaturedPackages/FeaturedPackages";
import Hero from "@/components/home/Hero/Hero";
import SearchSection from "@/components/home/SearchSection/SearchSection";
import WhyChooseUs from "@/components/home/WhyChooseUs/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <Hero />
   <SearchSection />
   <FeaturedPackages />
   <WhyChooseUs />
   </>
  );
}
