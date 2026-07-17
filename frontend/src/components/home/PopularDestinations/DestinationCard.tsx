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
      <div className="relative h-80 overflow-hidden">

        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Region Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-[#F97316] px-4 py-1 text-xs font-semibold text-white">
          {destination.region}
        </span>

        {/* Text */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">

          <h3 className="mb-2 font-[var(--font-poppins)] text-2xl font-bold">
            {destination.name}
          </h3>

          <p className="mb-4 text-sm text-gray-200">
            {destination.tours} Tours Available
          </p>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 font-medium text-[#FBBF24] transition hover:text-white"
          >
            Explore
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

      </div>

    </div>
  );
}