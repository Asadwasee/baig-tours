import Link from "next/link";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/constants/testimonials";

export default function Testimonials() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-10 xs:mb-12 sm:mb-14 max-w-3xl text-center">

          <span className="text-xs xs:text-sm sm:text-base font-semibold uppercase tracking-wider text-[#F97316]">
            Testimonials
          </span>

          <h2 className="mt-2 xs:mt-3 sm:mt-4 text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1E293B]">
            What Our Travelers Say
          </h2>

          <p className="mt-3 xs:mt-4 sm:mt-5 text-sm xs:text-base text-slate-600 px-2 xs:px-4">
            Thousands of travelers have trusted Baig Tours for unforgettable
            domestic and international experiences. Here's what they have to
            say about traveling with us.
          </p>

        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-4 xs:gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

      </div>
    </section>
  );
}