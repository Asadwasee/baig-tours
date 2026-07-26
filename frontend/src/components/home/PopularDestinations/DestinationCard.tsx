import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DestinationCardProps {
  destination: {
    id: number;
    name: string;
    region: string;
    tours: number;
    image: string;
  };
}

export default function DestinationCard({
  destination,
}: DestinationCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-56 xs:h-60 sm:h-64 md:h-72 lg:h-80 overflow-hidden">

        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Region Badge */}
        <span className="absolute left-3 top-3 xs:left-4 xs:top-4 rounded-full bg-[#F97316] px-2.5 py-1 xs:px-3 xs:py-1 text-[10px] xs:text-xs font-semibold text-white">
          {destination.region}
        </span>

        {/* Text */}
        <div className="absolute bottom-0 left-0 w-full p-4 xs:p-5 sm:p-6 text-white">

          <h3 className="mb-1 xs:mb-1.5 sm:mb-2 font-[var(--font-poppins)] text-xl xs:text-2xl sm:text-2xl lg:text-3xl font-bold line-clamp-1">
            {destination.name}
          </h3>

          <p className="mb-3 xs:mb-3.5 sm:mb-4 text-xs xs:text-sm text-gray-200">
            {destination.tours} Tours Available
          </p>

          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 xs:gap-2 font-medium text-[#FBBF24] transition hover:text-white text-sm xs:text-base"
          >
            Explore
            <ArrowRight
              size={16}
              className="xs:w-[18px] xs:h-[18px] transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

      </div>

    </div>
  );
}