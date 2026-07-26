"use client";

import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

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

          {/* LEFT COLUMN */}
          <div className="order-2 lg:order-1">

            <h3 className="mb-6 xs:mb-7 sm:mb-8 font-[var(--font-poppins)] text-xl xs:text-2xl sm:text-2xl font-semibold text-[#1E293B]">
              Get in Touch
            </h3>

            <div className="space-y-6 xs:space-y-7 sm:space-y-8">

              {/* Address */}
              <div className="flex items-start gap-3 xs:gap-4">

                <div className="rounded-xl bg-[#0F766E]/10 p-2.5 xs:p-3 flex-shrink-0">
                  <MapPin className="h-5 w-5 xs:h-6 xs:w-6 text-[#F97316]" />
                </div>

                <div>
                  <h4 className="text-sm xs:text-base font-semibold text-[#1E293B]">
                    Office Address
                  </h4>

                  <p className="mt-0.5 xs:mt-1 text-sm xs:text-base text-gray-600">
                    Islamabad, Pakistan
                  </p>
                </div>

              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 xs:gap-4">

                <div className="rounded-xl bg-[#0F766E]/10 p-2.5 xs:p-3 flex-shrink-0">
                  <Phone className="h-5 w-5 xs:h-6 xs:w-6 text-[#F97316]" />
                </div>

                <div>
                  <h4 className="text-sm xs:text-base font-semibold text-[#1E293B]">
                    Phone Number
                  </h4>

                  <p className="mt-0.5 xs:mt-1 text-sm xs:text-base text-gray-600">
                    +92 XXX XXXXXXX
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex items-start gap-3 xs:gap-4">

                <div className="rounded-xl bg-[#0F766E]/10 p-2.5 xs:p-3 flex-shrink-0">
                  <Mail className="h-5 w-5 xs:h-6 xs:w-6 text-[#F97316]" />
                </div>

                <div>
                  <h4 className="text-sm xs:text-base font-semibold text-[#1E293B]">
                    Email Address
                  </h4>

                  <p className="mt-0.5 xs:mt-1 text-sm xs:text-base text-gray-600">
                    info@baigtours.com
                  </p>
                </div>

              </div>

            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 xs:mt-9 sm:mt-10 inline-flex items-center gap-2 xs:gap-3 rounded-xl bg-[#25D366] px-5 xs:px-6 sm:px-7 py-3 xs:py-3.5 sm:py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm xs:text-base"
            >
              <MessageCircle size={18} className="xs:w-[20px] xs:h-[20px]" />
              Chat on WhatsApp
            </a>

            {/* Map */}
            <div className="mt-8 xs:mt-9 sm:mt-10 overflow-hidden rounded-2xl shadow-lg">

              <div className="flex h-40 xs:h-44 sm:h-48 md:h-52 items-center justify-center bg-gray-200 text-gray-500 text-sm xs:text-base">
                Google Map
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN - Contact Form */}
          <div className="order-1 lg:order-2 rounded-2xl bg-white p-5 xs:p-6 sm:p-8 shadow-lg">

            <h3 className="mb-4 xs:mb-5 sm:mb-6 font-[var(--font-poppins)] text-xl xs:text-2xl sm:text-2xl font-semibold text-[#1E293B]">
              Send us a Message
            </h3>

            <form className="space-y-3 xs:space-y-3.5 sm:space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-gray-300 px-4 xs:px-5 py-3 xs:py-4 outline-none transition focus:border-[#0F766E] text-sm xs:text-base"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full rounded-xl border border-gray-300 px-4 xs:px-5 py-3 xs:py-4 outline-none transition focus:border-[#0F766E] text-sm xs:text-base"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-gray-300 px-4 xs:px-5 py-3 xs:py-4 outline-none transition focus:border-[#0F766E] text-sm xs:text-base"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-gray-300 px-4 xs:px-5 py-3 xs:py-4 outline-none transition focus:border-[#0F766E] text-sm xs:text-base"
              />

              <textarea
                rows={4}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-gray-300 px-4 xs:px-5 py-3 xs:py-4 outline-none transition focus:border-[#0F766E] text-sm xs:text-base min-h-[100px] xs:min-h-[120px]"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-[#F97316] py-3 xs:py-3.5 sm:py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] text-sm xs:text-base"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}