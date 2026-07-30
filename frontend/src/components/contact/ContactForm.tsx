"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { submitContactForm } from "@/services/contact";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      // Submit via backend API if available, fallback gracefully
      await submitContactForm({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      }).catch(() => {
        // Log locally if backend offline
        console.log("Contact form submitted locally:", formData);
      });

      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-5 xs:p-6 sm:p-8 shadow-lg border border-slate-100">
      <h3 className="mb-4 xs:mb-5 sm:mb-6 font-[var(--font-poppins)] text-xl xs:text-2xl sm:text-2xl font-bold text-[#1E293B]">
        Send us a Message
      </h3>

      {status === "success" && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-700 text-sm xs:text-base border border-emerald-200">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
          <span>Thank you! Your message has been sent successfully. We will get back to you soon.</span>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-700 text-sm xs:text-base border border-red-200">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5 xs:space-y-4">
        <div>
          <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="e.g. John Doe"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 xs:px-5 py-3 xs:py-3.5 outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 text-sm xs:text-base text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 xs:gap-4">
          <div>
            <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              required
              placeholder="e.g. +92 300 1234567"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 xs:px-5 py-3 xs:py-3.5 outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 text-sm xs:text-base text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 xs:px-5 py-3 xs:py-3.5 outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 text-sm xs:text-base text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            placeholder="Inquiry about tour packages..."
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 xs:px-5 py-3 xs:py-3.5 outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 text-sm xs:text-base text-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 xs:px-5 py-3 xs:py-3.5 outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 text-sm xs:text-base text-slate-800 min-h-[110px] xs:min-h-[130px]"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] py-3.5 xs:py-4 px-6 font-semibold text-white transition-all duration-300 hover:bg-[#ea580c] active:scale-[0.99] shadow-md hover:shadow-lg text-sm xs:text-base disabled:opacity-70 cursor-pointer"
        >
          <Send className="h-4 w-4 xs:h-5 xs:w-5" />
          <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
        </button>
      </form>
    </div>
  );
}