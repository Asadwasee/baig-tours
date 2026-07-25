import Image from "next/image";

interface GalleryImageProps {
  image: {
    id: number;
    title: string;
    image: string;
  };
}

export default function GalleryImage({ image }: GalleryImageProps) {
  return (
    <div className="group relative h-[200px] xs:h-[220px] sm:h-[240px] md:h-[280px] lg:h-[340px] xl:h-[420px] overflow-hidden rounded-xl shadow-lg">

      {/* Image */}
      <div className="relative h-full w-full">

        <Image
          src={image.image}
          alt={image.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        {/* Destination */}
        <div className="absolute bottom-3 xs:bottom-4 sm:bottom-5 left-3 xs:left-4 sm:left-5">

          <h3 className="font-[var(--font-poppins)] text-lg xs:text-xl sm:text-2xl font-semibold text-white line-clamp-1">
            {image.title}
          </h3>

        </div>

      </div>

    </div>
  );
}