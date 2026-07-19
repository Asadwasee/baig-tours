"use client";

import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom">

        <div className="overflow-hidden rounded-3xl bg-[#0F766E] px-8 py-16 text-center text-white shadow-xl lg:px-20">

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <Mail className="h-8 w-8 text-[#FBBF24]" />
          </div>

          {/* Heading */}
          <h2 className="font-[var(--font-poppins)] text-4xl font-bold">
            Stay Updated with Baig Tours
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
            Subscribe to receive exclusive travel deals, upcoming tour
            announcements, destination guides and special discounts directly
            in your inbox.
          </p>

          {/* Form */}
          <form className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border border-white/20 bg-white px-5 py-4 text-[#1E293B] outline-none transition focus:border-[#FBBF24]"
            />

            <button
              type="submit"
              className="rounded-xl bg-[#F97316] px-8 py-4 font-semibold transition-all duration-300 hover:bg-[#0B5C56]"
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}