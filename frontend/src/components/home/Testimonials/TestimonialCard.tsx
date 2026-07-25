import Image from "next/image";
import { Quote, Star, MapPin } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  city: string;
  tour: string;
  rating: number;
  review: string;
  image: string;
}

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className="group rounded-xl bg-white p-6 xs:p-7 sm:p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Quote Icon */}
      <Quote
        size={28}
        className="xs:w-[36px] xs:h-[36px] mb-4 xs:mb-5 sm:mb-6 text-[#0F766E]/20"
      />

      {/* Review */}
      <p className="mb-6 xs:mb-7 sm:mb-8 text-sm xs:text-base leading-7 xs:leading-8 text-gray-600 line-clamp-4 xs:line-clamp-none">
        "{testimonial.review}"
      </p>

      {/* Rating */}
      <div className="mb-4 xs:mb-5 sm:mb-6 flex">
        {[...Array(testimonial.rating)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className="xs:w-[18px] xs:h-[18px] fill-[#FBBF24] text-[#FBBF24]"
          />
        ))}
      </div>

      {/* User */}
      <div className="flex items-center gap-3 xs:gap-4">

        <div className="relative h-14 w-14 xs:h-16 xs:w-16 overflow-hidden rounded-full">

          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />

        </div>

        <div>

          <h4 className="font-[var(--font-poppins)] text-base xs:text-lg font-semibold text-[#1E293B]">
            {testimonial.name}
          </h4>

          <p className="mt-0.5 xs:mt-1 flex items-center gap-1 text-xs xs:text-sm text-gray-500">
            <MapPin size={12} className="xs:w-[14px] xs:h-[14px]" />
            {testimonial.city}
          </p>

          <span className="mt-1.5 xs:mt-2 inline-block rounded-full bg-[#0F766E]/10 px-2.5 xs:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs font-medium text-[#0F766E]">
            {testimonial.tour}
          </span>

        </div>

      </div>

    </div>
  );
}