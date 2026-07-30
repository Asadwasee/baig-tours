// app/packages/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { usePackage } from '@/hooks/usePackage';
import PackageHero from '@/components/package-details/PackageHero';
import ImageGallery from '@/components/package-details/ImageGallery';
import BookingCard from '@/components/package-details/BookingCard';
import TourOverview from '@/components/package-details/TourOverview';
import HighlightsSection from '@/components/package-details/HighlightsSection';
import ItinerarySection from '@/components/package-details/ItinerarySection';
import VideosSection from '@/components/package-details/VideosSection';
import FAQSection from '@/components/package-details/FAQSection';
import ReviewsSection from '@/components/package-details/ReviewsSection';
import RelatedPackages from '@/components/package-details/RelatedPackages';


export default function PackageDetailsPage() {
  const { id } = useParams();
  const { package: packageData, loading, error } = usePackage(id as string);

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

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-[#1E293B]">Package Not Found</h2>
          <p className="mt-4 text-gray-600">
            {error || "The package you're looking for doesn't exist or has been removed."}
          </p>
          <a href="/packages" className="mt-6 inline-block rounded-xl bg-[#F97316] px-8 py-3 text-white">
            Browse All Packages
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <PackageHero packageData={packageData} />
      
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-[1.7fr_0.8fr]">
            <ImageGallery images={packageData.images || []} />
            <BookingCard packageData={packageData} />
          </div>
        </div>
      </section>
      
      <TourOverview packageData={packageData} />
      <HighlightsSection packageData={packageData} />
      <ItinerarySection itinerary={packageData.itinerary || []} />
      <VideosSection videos={packageData.videos || []} />
      <FAQSection faqs={packageData.faqs || []} />
      
      {/* ✅ FIX: Only render ReviewsSection if packageId exists */}
      {packageData._id && (
        <ReviewsSection  packageId={packageData._id}
  tourName={packageData.title} />
      )}
      
      <RelatedPackages 
        currentPackageId={packageData._id || ""} 
        category={packageData.category || ""} 
      />
    </>
  );
}