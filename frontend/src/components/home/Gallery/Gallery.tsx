import Link from "next/link";
import GalleryImage from "./GalleryImage";
import { galleryImages } from "@/constants/galleryImages";

export default function Gallery() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Section Header */}

<div className="mx-auto mb-14 max-w-3xl text-center">

  <span className="font-semibold uppercase tracking-wider text-[#F97316]">
    Travel Gallery
  </span>

  <h2 className="mt-4 text-4xl font-bold text-[#1E293B]">
    Explore Beautiful Memories
  </h2>

  <p className="mt-5 text-slate-600">
    Discover breathtaking moments captured from our domestic and
    international tours, showcasing unforgettable adventures and
    lifetime memories.
  </p>

</div>
      {/* Gallery Grid */}

<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">

  {galleryImages.map((image) => (
    <GalleryImage
      key={image.id}
      image={image}
    />
  ))}

</div>

        {/* CTA */}
        <div className="mt-14 text-center">

          <Link
            href="/gallery"
            className="inline-flex items-center rounded-xl bg-[#F97316] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] hover:scale-105"
          >
            View Full Gallery
          </Link>

        </div>

      </div>
    </section>
  );
}