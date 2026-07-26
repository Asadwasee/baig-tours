"use client";

import { useState } from "react";
import { submitContact } from "@/services/contactService";

export default function ContactForm() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);


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


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {

      setLoading(true);

      await submitContact({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });


      alert("Message sent successfully!");


      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });


    } catch (error) {

      console.log(error);
      alert("Failed to send message");

    } finally {

      setLoading(false);

    }
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
        required
      />


      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
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
        required
      />


      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-[#F97316] px-8 py-4 font-semibold text-white hover:bg-[#0F766E] disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

    </form>
  );
}