"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log(formData);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-8 shadow-lg space-y-6"
    >
      <h2 className="font-[var(--font-poppins)] text-3xl font-bold text-[#1E293B]">
        Send Message
      </h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <textarea
        name="message"
        rows={6}
        placeholder="Write your message..."
        value={formData.message}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <button
        type="submit"
        className="rounded-xl bg-[#F97316] px-8 py-4 font-semibold text-white hover:bg-[#0F766E]"
      >
        Send Message
      </button>
    </form>
  );
}