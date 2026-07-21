import Image from "next/image";
import { Play, Images } from "lucide-react";
import { GalleryItem } from "@/constants/gallery";

interface Props {
  item: GalleryItem;
  onClick: () => void;
}

export default function GalleryCard({ item, onClick, }: Props) {
  return (
    <article 
    onClick={onClick}
    className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

     {/* Media */}

<div className="relative h-72 overflow-hidden">

  {item.type === "image" ? (

    <Image
      src={item.thumbnail}
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
      <source src={item.src} type="video/mp4" />
    </video>

  )}

  {/* Category */}

  <span className="absolute left-4 top-4 rounded-full bg-[#0F766E] px-3 py-1 text-xs font-semibold text-white shadow">
    {item.category}
  </span>

  {/* Video Badge */}

  {item.type === "video" && (

    <div className="absolute inset-0 flex items-center justify-center bg-black/20">

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition duration-300 group-hover:scale-110">

        <Play
          size={28}
          fill="#F97316"
          className="ml-1 text-[#F97316]"
        />

      </div>

    </div>

  )}

</div>

      {/* Content */}

      <div className="p-5">

        <div className="mb-3 flex items-center gap-2">

          <Images
            size={18}
            className="text-[#F97316]"
          />

          <span className="text-sm font-medium text-gray-500">

            {item.type === "video" ? "Video" : "Image"}

          </span>

        </div>

        <h3 className="font-[var(--font-poppins)] text-xl font-bold text-[#1E293B]">

          {item.title}

        </h3>

      </div>

    </article>
  );
}