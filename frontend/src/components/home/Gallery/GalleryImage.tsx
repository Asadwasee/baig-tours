// components/home/GalleryImage.tsx
import Image from "next/image";
import { GalleryMedia } from "@/types/gallery";

interface GalleryImageProps {
  image: GalleryMedia;
}

export default function GalleryImage({ image }: GalleryImageProps) {
  const categoryMap: Record<string, string> = {
    'domestic': 'Domestic',
    'international': 'International',
    'customer-memories': 'Memory'
  };

  const categoryDisplay = image.category ? categoryMap[image.category] || image.category : '';

  return (
    <div className="group relative h-[200px] xs:h-[220px] sm:h-[240px] md:h-[280px] lg:h-[340px] xl:h-[420px] overflow-hidden rounded-xl shadow-lg">
      <div className="relative h-full w-full">
        <Image
          src={image.mediaUrl}
          alt={image.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="absolute bottom-3 xs:bottom-4 sm:bottom-5 left-3 xs:left-4 sm:left-5">
          <h3 className="font-[var(--font-poppins)] text-lg xs:text-xl sm:text-2xl font-semibold text-white line-clamp-1">
            {image.title}
          </h3>
        </div>

        {categoryDisplay && (
          <div className="absolute top-3 xs:top-4 right-3 xs:right-4">
            <span className="rounded-full bg-[#0F766E]/80 px-2 xs:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs font-semibold text-white backdrop-blur-sm">
              {categoryDisplay}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}