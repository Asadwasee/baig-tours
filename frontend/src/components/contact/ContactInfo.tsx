"use client";

import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6 xs:space-y-7 sm:space-y-8">
      <div>
        <h3 className="mb-6 xs:mb-7 sm:mb-8 font-[var(--font-poppins)] text-xl xs:text-2xl sm:text-2xl font-bold text-[#1E293B]">
          Get in Touch
        </h3>

        <div className="space-y-5 xs:space-y-6">
          {/* Office Address */}
          <div className="flex items-start gap-3.5 xs:gap-4">
            <div className="rounded-xl bg-[#0F766E]/10 p-2.5 xs:p-3 flex-shrink-0">
              <MapPin className="h-5 w-5 xs:h-6 xs:w-6 text-[#F97316]" />
            </div>

            <div>
              <h4 className="text-sm xs:text-base font-semibold text-[#1E293B]">
                Office Address
              </h4>
              <p className="mt-0.5 xs:mt-1 text-sm xs:text-base text-gray-600">
                Lahore, Pakistan
              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-start gap-3.5 xs:gap-4">
            <div className="rounded-xl bg-[#0F766E]/10 p-2.5 xs:p-3 flex-shrink-0">
              <Phone className="h-5 w-5 xs:h-6 xs:w-6 text-[#F97316]" />
            </div>

            <div>
              <h4 className="text-sm xs:text-base font-semibold text-[#1E293B]">
                Phone Number
              </h4>
              <p className="mt-0.5 xs:mt-1 text-sm xs:text-base text-gray-600">
                +92 300 1234567
              </p>
            </div>
          </div>

          {/* Email Address */}
          <div className="flex items-start gap-3.5 xs:gap-4">
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

          {/* Office Hours */}
          <div className="flex items-start gap-3.5 xs:gap-4">
            <div className="rounded-xl bg-[#0F766E]/10 p-2.5 xs:p-3 flex-shrink-0">
              <Clock className="h-5 w-5 xs:h-6 xs:w-6 text-[#F97316]" />
            </div>

            <div>
              <h4 className="text-sm xs:text-base font-semibold text-[#1E293B]">
                Office Hours
              </h4>
              <p className="mt-0.5 xs:mt-1 text-sm xs:text-base text-gray-600">
                Mon - Sat : 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div>
        <a
          href="https://wa.me/923001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 xs:gap-3 rounded-xl bg-[#25D366] px-5 xs:px-6 sm:px-7 py-3 xs:py-3.5 sm:py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm xs:text-base"
        >
          <MessageCircle size={20} className="xs:w-[22px] xs:h-[22px]" />
          Chat on WhatsApp
        </a>
      </div>

      {/* Google Map */}
      <div className="overflow-hidden rounded-2xl shadow-lg border border-slate-200">
        <iframe
          title="Baig Tours Location - Lahore, Pakistan"
          src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"
          className="h-44 xs:h-48 sm:h-56 w-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}