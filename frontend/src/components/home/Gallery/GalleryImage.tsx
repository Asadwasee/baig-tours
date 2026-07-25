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
    <div className="group relative h-[280px] overflow-hidden rounded-xl shadow-lg md:h-[340px] lg:h-[420px]">

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
        <div className="absolute bottom-5 left-5">

          <h3 className="font-[var(--font-poppins)] text-2xl font-semibold text-white">
            {image.title}
          </h3>

        </div>

      </div>

    </div>
  );
}