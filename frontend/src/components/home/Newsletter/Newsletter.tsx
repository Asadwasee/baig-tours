"use client";

import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom px-4 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-2xl xs:rounded-3xl bg-[#0F766E] px-4 xs:px-6 sm:px-8 md:px-12 lg:px-20 py-10 xs:py-12 sm:py-14 md:py-16 text-center text-white shadow-xl">

          {/* Icon */}
          <div className="mx-auto mb-4 xs:mb-5 sm:mb-6 flex h-14 w-14 xs:h-16 xs:w-16 items-center justify-center rounded-full bg-white/10">
            <Mail className="h-7 w-7 xs:h-8 xs:w-8 text-[#FBBF24]" />
          </div>

          {/* Heading */}
          <h2 className="font-[var(--font-poppins)] text-2xl xs:text-3xl sm:text-4xl font-bold">
            Stay Updated with Baig Tours
          </h2>

          {/* Description */}
          <p className="mx-auto mt-3 xs:mt-4 sm:mt-5 max-w-2xl text-base xs:text-lg sm:text-lg leading-7 xs:leading-8 text-white/80 px-2 xs:px-4">
            Subscribe to receive exclusive travel deals, upcoming tour
            announcements, destination guides and special discounts directly
            in your inbox.
          </p>

          {/* Form */}
          <form className="mx-auto mt-6 xs:mt-8 sm:mt-10 flex max-w-2xl flex-col gap-3 xs:gap-4 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border border-white/20 bg-white px-4 xs:px-5 py-3 xs:py-4 text-[#1E293B] outline-none transition focus:border-[#FBBF24] text-sm xs:text-base placeholder:text-sm xs:placeholder:text-base"
            />

            <button
              type="submit"
              className="rounded-xl bg-[#F97316] px-6 xs:px-7 sm:px-8 py-3 xs:py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] text-sm xs:text-base whitespace-nowrap"
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}