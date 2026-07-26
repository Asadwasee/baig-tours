// components/gallery/GalleryCard.tsx
import Image from "next/image";
import { Play, Images } from "lucide-react";
import { GalleryMedia } from "@/types/gallery";

interface Props {
  item: GalleryMedia;
  onClick: () => void;
}

export default function GalleryCard({ item, onClick }: Props) {
  const isVideo = item.mediaType === 'video';
  const categoryMap = {
    'domestic': 'Domestic Tours',
    'international': 'International Tours',
    'customer-memories': 'Customer Memories'
  };

  return (
    <article 
      onClick={onClick}
      className="group overflow-hidden rounded-2xl xs:rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    >
      {/* Media */}
      <div className="relative h-56 xs:h-60 sm:h-64 md:h-72 overflow-hidden">
        {!isVideo ? (
          <Image
            src={item.mediaUrl}
            alt={item.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <video
            muted
            loop
            playsInline
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          >
            <source src={item.mediaUrl} type="video/mp4" />
          </video>
        )}

        {/* Category */}
        <span className="absolute left-3 xs:left-4 top-3 xs:top-4 rounded-full bg-[#0F766E] px-2 xs:px-3 py-1 text-[10px] xs:text-xs font-semibold text-white shadow">
          {categoryMap[item.category] || item.category}
        </span>

        {/* Video Badge */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="flex h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition duration-300 group-hover:scale-110">
              <Play size={20} className="xs:w-6 xs:h-6 sm:w-7 sm:h-7 ml-1 text-[#F97316]" fill="#F97316" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 xs:p-5">
        <div className="mb-2 xs:mb-3 flex items-center gap-1.5 xs:gap-2">
          <Images size={16} className="xs:w-[18px] xs:h-[18px] text-[#F97316]" />
          <span className="text-xs xs:text-sm font-medium text-gray-500">
            {isVideo ? "Video" : "Image"}
          </span>
        </div>
        <h3 className="font-[var(--font-poppins)] text-base xs:text-lg sm:text-xl font-bold text-[#1E293B] line-clamp-1">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-1 text-xs xs:text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}