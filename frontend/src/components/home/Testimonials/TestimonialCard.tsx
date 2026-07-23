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
    <div className="group rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Quote Icon */}
      <Quote
        size={36}
        className="mb-6 text-[#0F766E]/20"
      />

      {/* Review */}
      <p className="mb-8 leading-8 text-gray-600">
        "{testimonial.review}"
      </p>

      {/* Rating */}
      <div className="mb-6 flex">
        {[...Array(testimonial.rating)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-[#FBBF24] text-[#FBBF24]"
          />
        ))}
      </div>

      {/* User */}
      <div className="flex items-center gap-4">

        <div className="relative h-16 w-16 overflow-hidden rounded-full">

          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />

        </div>

        <div>

          <h4 className="font-[var(--font-poppins)] text-lg font-semibold text-[#1E293B]">
            {testimonial.name}
          </h4>

          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={14} />
            {testimonial.city}
          </p>

          <span className="mt-2 inline-block rounded-full bg-[#0F766E]/10 px-3 py-1 text-xs font-medium text-[#0F766E]">
            {testimonial.tour}
          </span>

        </div>

      </div>

    </div>
  );
}