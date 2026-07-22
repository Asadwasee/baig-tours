"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is included in this package?",
    answer:
      "The package includes hotel accommodation, luxury transport, breakfast & dinner, sightseeing tours, professional tour guide, and all scheduled activities mentioned in the itinerary.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes. Cancellation requests are accepted according to our cancellation policy. The refund amount depends on how many days before departure you cancel.",
  },
  {
    question: "Is this tour suitable for families?",
    answer:
      "Absolutely. This tour is designed for families, couples, solo travelers, and groups. Activities are suitable for all age groups unless stated otherwise.",
  },
  {
    question: "How do I reserve my seat?",
    answer:
      "You can reserve your seat by clicking the Book Now button or contacting us directly through WhatsApp. Our team will guide you through the booking process.",
  },
  {
    question: "Are meals included?",
    answer:
      "Breakfast and dinner are included throughout the tour. Lunch and personal snacks are not included unless specifically mentioned in the package details.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container-custom">

        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Need Help?
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Find answers to the most common questions travelers ask before
            booking their adventure with Baig Tours.
          </p>

        </div>

        {/* FAQ */}

        <div className="mx-auto max-w-4xl space-y-4">

          {faqs.map((faq, index) => {

            const isOpen = open === index;

            return (

              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#0F766E]/30 bg-white shadow-md"
                    : "border-gray-200 bg-white shadow-sm hover:border-[#0F766E]/20 hover:shadow-md"
                }`}
              >

                {/* Question */}

                <button
                  onClick={() =>
                    setOpen(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >

                  <span
                    className={`pr-6 text-lg font-semibold transition-colors ${
                      isOpen
                        ? "text-[#0F766E]"
                        : "text-[#1E293B]"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                      isOpen
                        ? "bg-[#F97316] text-white"
                        : "bg-[#F8FAFC] text-[#0F766E]"
                    }`}
                  >

                    {isOpen ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}

                  </div>

                </button>

                {/* Answer */}

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >

                  <div className="overflow-hidden">

                    <div className="border-t border-gray-100 px-6 pb-6 pt-5 leading-8 text-gray-600">

                      {faq.answer}

                    </div>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      </div>
    </section>
  );
}