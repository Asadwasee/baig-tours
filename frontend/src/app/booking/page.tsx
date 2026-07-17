"use client";

import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  packageId: "",
  travelDate: "",
  adults: "1",
  children: "0",
  specialRequests: "",
};

export default function BookingPage() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      customerDetails: {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      package: form.packageId,
      travelDate: form.travelDate,
      adults: Number(form.adults),
      children: Number(form.children),
      specialRequests: form.specialRequests.trim(),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/bookings", payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Booking request submitted successfully.");
      setForm(initialForm);
      console.log(response.data);
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Booking failed. Please try again."
        : "Booking failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-800 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F97316]">Booking Form</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">Reserve your dream trip</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Submit your details and we will confirm your package availability for the selected travel date.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-0 focus:border-[#0B5C56]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-0 focus:border-[#0B5C56]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Phone number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-0 focus:border-[#0B5C56]"
                placeholder="03XX-XXXXXXX"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Select package</label>
              <select
                name="packageId"
                value={form.packageId}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0B5C56]"
              >
                <option value="">Choose a package</option>
                <option value="68b76ce33d62eb60ef4bb0a2">Hunza Valley Escape</option>
                <option value="68b76ce33d62eb60ef4bb0a2">Skardu Adventure</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Travel date</label>
              <input
                type="date"
                name="travelDate"
                value={form.travelDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0B5C56]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Adults</label>
                <input
                  type="number"
                  min="1"
                  name="adults"
                  value={form.adults}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0B5C56]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Children</label>
                <input
                  type="number"
                  min="0"
                  name="children"
                  value={form.children}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0B5C56]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Special requests</label>
              <textarea
                name="specialRequests"
                value={form.specialRequests}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0B5C56]"
                placeholder="Any additional notes?"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-[#F97316] px-6 py-3 font-semibold text-white transition hover:bg-[#0B5C56] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
