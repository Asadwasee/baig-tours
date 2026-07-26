'use client';

import { usePackages } from '@/hooks/usePackages';
import ContactSection from "@/components/home/Contact/ContactSection";
import FeaturedPackages from "@/components/home/FeaturedPackages/FeaturedPackages";
import Gallery from "@/components/home/Gallery/Gallery";
import Hero from "@/components/home/Hero/Hero";
import LatestBlogs from "@/components/home/LatestBlogs/LatestBlogs";
import Newsletter from "@/components/home/Newsletter/Newsletter";
import PopularDestinations from "@/components/home/PopularDestinations/PopularDestinations";
import SearchSection from "@/components/home/SearchSection/SearchSection";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import UpcomingTours from "@/components/home/UpcomingTours/UpcomingTours";
import WhyChooseUs from "@/components/home/WhyChooseUs/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  const { packages: featuredPackages, loading: featuredLoading } = usePackages({
    featured: true,
    limit: 6
  });

  // Fetch upcoming tours
  const { packages: upcomingPackages, loading: upcomingLoading } = usePackages({
    upcoming: true,
    limit: 3
  });
  return (
   <>
   <Hero />
   <SearchSection />
   <FeaturedPackages
   packages = {featuredPackages}
   loading={featuredLoading} />
   <UpcomingTours
   tours={upcomingPackages}
   loading={upcomingLoading} />
   <PopularDestinations />
   <WhyChooseUs />
   <Testimonials />
   <Gallery />
   <LatestBlogs />
   <ContactSection />
   <Newsletter />
   </>
  );
}
