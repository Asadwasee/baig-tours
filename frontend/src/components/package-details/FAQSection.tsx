"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is included in this package?",
    answer:
      "Accommodation, transportation, breakfast & dinner, sightseeing and professional tour guide.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes. Cancellation policies depend on the booking date and package terms.",
  },
  {
    question: "Is this tour suitable for families?",
    answer:
      "Yes. This package is designed for families, couples and groups.",
  },
  {
    question: "How do I reserve my seat?",
    answer:
      "Simply click Book Now or contact us through WhatsApp.",
  },
  {
    question: "Are meals included?",
    answer:
      "Breakfast and dinner are included throughout the tour.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F8FAFC] py-16">

      <div className="container-custom max-w-5xl">

        <div className="mb-12 text-center">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            FAQs
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white shadow-md"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >

                <span className="font-semibold text-[#1E293B]">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />

              </button>

              {open === index && (

                <div className="border-t border-gray-100 px-6 py-5 text-gray-600 leading-7">

                  {faq.answer}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}