"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">

      {/* Call Button */}
      <a
        href="tel:+923001234567"
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Call Us"
      >
        <FaPhoneAlt size={22} />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={26} />
      </a>

    </div>
  );
}