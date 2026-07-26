import Link from "next/link";
import GalleryImage from "./GalleryImage";
import { galleryImages } from "@/constants/galleryImages";

export default function Gallery() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-10 xs:mb-12 sm:mb-14 max-w-3xl text-center">

          <span className="text-xs xs:text-sm sm:text-base font-semibold uppercase tracking-wider text-[#F97316]">
            Travel Gallery
          </span>

          <h2 className="mt-2 xs:mt-3 sm:mt-4 text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1E293B]">
            Explore Beautiful Memories
          </h2>

          <p className="mt-3 xs:mt-4 sm:mt-5 text-sm xs:text-base text-slate-600 px-2 xs:px-4">
            Discover breathtaking moments captured from our domestic and
            international tours, showcasing unforgettable adventures and
            lifetime memories.
          </p>

        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-3 sm:gap-4 md:gap-4 lg:gap-6">

          {galleryImages.map((image) => (
            <GalleryImage
              key={image.id}
              image={image}
            />
          ))}

        </div>

        {/* CTA */}
        <div className="mt-10 xs:mt-12 sm:mt-14 text-center">

          <Link
            href="/gallery"
            className="inline-flex items-center rounded-xl bg-[#F97316] px-6 xs:px-7 sm:px-8 py-3 xs:py-3.5 sm:py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] hover:scale-105 text-sm xs:text-base"
          >
            View Full Gallery
          </Link>

        </div>

      </div>
    </section>
  );
}