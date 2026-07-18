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
      <div className="container-custom">

       {/* Section Header */}

<div className="mx-auto mb-14 max-w-3xl text-center">

  <span className="font-semibold uppercase tracking-wider text-[#F97316]">
    Get In Touch
  </span>

  <h2 className="mt-4 text-4xl font-bold text-[#1E293B]">
    Let's Plan Your Next Journey
  </h2>

  <p className="mt-5 text-slate-600">
    Whether you're planning a family vacation, honeymoon, corporate
    trip, or an international adventure, our travel experts are here
    to help you every step of the way.
  </p>

</div>

        {/* Two Columns */}
        <div className="grid items-start gap-14 lg:grid-cols-2">

          {/* LEFT COLUMN */}
          <div>

            <h3 className="mb-8 font-[var(--font-poppins)] text-2xl font-semibold text-[#1E293B]">
              Get in Touch
            </h3>

            <div className="space-y-8">

              {/* Address */}
              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-[#0F766E]/10 p-3">
                  <MapPin className="h-6 w-6 text-[#F97316]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#1E293B]">
                    Office Address
                  </h4>

                  <p className="mt-1 text-gray-600">
                    Islamabad, Pakistan
                  </p>
                </div>

              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-[#0F766E]/10 p-3">
                  <Phone className="h-6 w-6 text-[#F97316]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#1E293B]">
                    Phone Number
                  </h4>

                  <p className="mt-1 text-gray-600">
                    +92 XXX XXXXXXX
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-[#0F766E]/10 p-3">
                  <Mail className="h-6 w-6 text-[#F97316]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#1E293B]">
                    Email Address
                  </h4>

                  <p className="mt-1 text-gray-600">
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
              className="mt-10 inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-7 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>

            {/* Map */}
            <div className="mt-10 overflow-hidden rounded-2xl shadow-lg">

              <div className="flex h-52 items-center justify-center bg-gray-200 text-gray-500">
                Google Map
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}

          <div className="rounded-2xl bg-white p-8 shadow-lg">

            <h3 className="mb-6 font-[var(--font-poppins)] text-2xl font-semibold text-[#1E293B]">
              Send us a Message
            </h3>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-[#0F766E]"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-[#0F766E]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-[#0F766E]"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-[#0F766E]"
              />

              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-[#0F766E]"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-[#F97316] py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56]"
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