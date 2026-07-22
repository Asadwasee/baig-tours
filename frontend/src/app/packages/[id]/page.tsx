import PackageHero from "@/components/package-details/PackageHero";
import ImageGallery from "@/components/package-details/ImageGallery";
import BookingCard from "@/components/package-details/BookingCard";
import TourOverview from "@/components/package-details/TourOverview";
import HighlightsSection from "@/components/package-details/HighlightsSection";
import ItinerarySection from "@/components/package-details/ItinerarySection";
import VideosSection from "@/components/package-details/VideosSection";
import FAQSection from "@/components/package-details/FAQSection";
import ReviewsSection from "@/components/package-details/ReviewsSection";
import RelatedPackages from "@/components/package-details/RelatedPackages";

export default function PackageDetailsPage() {
  return (
    <>
      <PackageHero />

      <section className="bg-white py-16">

        <div className="container-custom">

          <div className="grid gap-10 lg:grid-cols-[1.7fr_0.8fr]">

            <ImageGallery />

            <BookingCard />

          </div>

        </div>

      </section>
      <TourOverview />
      <HighlightsSection />
      <ItinerarySection />
      <VideosSection />
      <FAQSection />
      <ReviewsSection />
      <RelatedPackages />
    </>
  );
}