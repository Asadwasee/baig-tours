import Link from "next/link";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/constants/testimonials";

export default function Testimonials() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom">

{/* Section Header */}

<div className="mx-auto mb-14 max-w-3xl text-center">

  <span className="font-semibold uppercase tracking-wider text-[#F97316]">
    Testimonials
  </span>

  <h2 className="mt-4 text-4xl font-bold text-[#1E293B]">
    What Our Travelers Say
  </h2>

  <p className="mt-5 text-slate-600">
    Thousands of travelers have trusted Baig Tours for unforgettable
    domestic and international experiences. Here's what they have to
    say about traveling with us.
  </p>

</div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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