"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Star } from "lucide-react";
import { createReview } from "@/services/reviewServices";

interface ReviewFormProps {
  packageId: string;
   tourName: string;
}

interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  review: string;
}

const initialForm: ReviewFormData = {
  name: "",
  email: "",
  rating: 0,
  review: "",
};

export default function ReviewForm({
  packageId,
  tourName,

}: ReviewFormProps){
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
    await createReview({
      customerName: formData.name,
      customerEmail: formData.email,
      tourName,
      packageId,
      rating: formData.rating,
      review: formData.review,
    });

    alert("Review submitted successfully!");
    setFormData(initialForm);
  } catch (error) {
    console.error(error);
    alert("Failed to submit review.");
  } finally {
    setLoading(false);
  }
};
  return (
    <section className="rounded-3xl bg-[#F8FAFC] p-8 shadow-md">

      <div className="mb-8 text-center">

        <span className="font-semibold uppercase tracking-wider text-[#F97316]">
          Share Your Experience
        </span>

        <h2 className="mt-2 font-[var(--font-poppins)] text-3xl font-bold text-[#1E293B]">
          Write a Review
        </h2>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0F766E]"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0F766E]"
          />

        </div>

        <div>

          <p className="mb-3 font-medium text-[#1E293B]">
            Rating
          </p>

          <div className="flex gap-2">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                key={star}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    rating: star,
                  }))
                }
              >
                <Star
                  size={30}
                  fill={
                    star <= formData.rating
                      ? "#FBBF24"
                      : "none"
                  }
                  className={
                    star <= formData.rating
                      ? "text-[#FBBF24]"
                      : "text-gray-300"
                  }
                />
              </button>

            ))}

          </div>

        </div>

        <textarea
          name="review"
          rows={5}
          value={formData.review}
          onChange={handleChange}
          placeholder="Write your review..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0F766E]"
        />

        <button
  type="submit"
  disabled={loading}
  className="rounded-xl bg-[#F97316] px-8 py-3 font-semibold text-white transition hover:bg-[#0F766E] disabled:opacity-50"
>
  {loading ? "Submitting..." : "Submit Review"}
</button>

      </form>

    </section>
  );
}