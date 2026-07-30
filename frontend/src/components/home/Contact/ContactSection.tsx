"use client";

import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactSection() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-10 xs:mb-12 sm:mb-14 max-w-3xl text-center">
          <span className="text-xs xs:text-sm sm:text-base font-semibold uppercase tracking-wider text-[#F97316]">
            Get In Touch
          </span>

          <h2 className="mt-2 xs:mt-3 sm:mt-4 text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1E293B]">
            Let's Plan Your Next Journey
          </h2>

          <p className="mt-3 xs:mt-4 sm:mt-5 text-sm xs:text-base text-slate-600 px-2 xs:px-4">
            Whether you're planning a family vacation, honeymoon, corporate
            trip, or an international adventure, our travel experts are here
            to help you every step of the way.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid items-start gap-10 xs:gap-12 sm:gap-14 lg:grid-cols-2">
          {/* LEFT COLUMN - Contact Info */}
          <div className="order-2 lg:order-1">
            <ContactInfo />
          </div>

          {/* RIGHT COLUMN - Contact Form */}
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>

      </div>
    </section>
  );
}