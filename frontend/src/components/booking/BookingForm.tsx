"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
  BookingFormData,
  BookingFormErrors,
} from "@/types/booking";
import { validateBookingForm } from "@/utils/bookingValidation";
import { createBooking } from "@/services/bookingService";

interface BookingFormProps {
  packageId: string;
}

export default function BookingForm({
  packageId,
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
  package: packageId,

  customerDetails: {
    fullName: "",
    email: "",
    phone: "",
    whatsappNumber: "",
    city: "",
    cnic: "",
  },

  travelDate: "",
  adults: 1,
  children: 0,
  specialRequests: "",
});

  const [errors, setErrors] =
    useState<BookingFormErrors>({});

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (
      ["fullName", "email", "phone", "whatsappNumber", "cnic", "city"].includes(
        name
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        customerDetails: {
          ...prev.customerDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "adults" || name === "children"
            ? Number(value)
            : value,
      }));
    }
  };
const handleSubmit = async (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  const validationErrors = validateBookingForm(formData);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  

    try {
      const response = await createBooking(formData);

    alert("Booking submitted successfully!");
    setFormData({
  package: packageId,

  customerDetails: {
    fullName: "",
    email: "",
    phone: "",
    whatsappNumber: "",
    city: "",
    cnic: "",
  },

  travelDate: "",
  adults: 1,
  children: 0,
  specialRequests: "",
});

setErrors({});

  } catch (error) {
 console.error(error);
  


    alert("Failed to submit booking.");
  }
};
  

   
const today = new Date().toISOString().split("T")[0];

  return (
    <section className="max-w-4xl mx-auto rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Book Your Tour
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Full Name */}

        <div>
          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.customerDetails.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="w-full rounded-lg border p-3"
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.customerDetails.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full rounded-lg border p-3"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.customerDetails.phone}
            onChange={handleChange}
            placeholder="03XXXXXXXXX"
            className="w-full rounded-lg border p-3"
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone}
            </p>
          )}
        </div>

        {/* WhatsApp */}

        <div>
          <label className="mb-2 block font-medium">
            WhatsApp
          </label>

          <input
            type="text"
            name="whatsappNumber"
            value={formData.customerDetails.whatsappNumber}
            onChange={handleChange}
            placeholder="03XXXXXXXXX"
            className="w-full rounded-lg border p-3"
          />

          {errors.whatsappNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.whatsappNumber}
            </p>
          )}
        </div>

        {/* CNIC */}

        <div>
          <label className="mb-2 block font-medium">
            CNIC / Passport
          </label>

          <input
            type="text"
            name="cnic"
            value={formData.customerDetails.cnic}
            onChange={handleChange}
            placeholder="35202-XXXXXXX-X"
            className="w-full rounded-lg border p-3"
          />

          {errors.cnic && (
            <p className="mt-1 text-sm text-red-500">
              {errors.cnic}
            </p>
          )}
        </div>
        {/* City */}

<div>
  <label className="block mb-2 font-medium">
    City
  </label>

  <input
    type="text"
    name="city"
    value={formData.customerDetails.city}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
    placeholder="Enter City"
  />

  {errors.city && (
    <p className="text-red-500 text-sm mt-1">
      {errors.city}
    </p>
  )}
</div>

        {/* Adults */}

        <div>
          <label className="mb-2 block font-medium">
            Adults
          </label>

          <input
            type="number"
            name="adults"
            min={1}
            value={formData.adults}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          {errors.adults && (
            <p className="mt-1 text-sm text-red-500">
              {errors.adults}
            </p>
          )}
        </div>

        {/* Children */}

        <div>
          <label className="mb-2 block font-medium">
            Children
          </label>

          <input
            type="number"
            name="children"
            min={0}
            value={formData.children}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          {errors.children && (
            <p className="mt-1 text-sm text-red-500">
              {errors.children}
            </p>
          )}
        </div>

        {/* Travel Date */}

        <div>
          <label className="mb-2 block font-medium">
            Travel Date
          </label>

          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            min={today}
            className="w-full rounded-lg border p-3"
          />

          {errors.travelDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.travelDate}
            </p>
          )}
        </div>

        {/* Special Requests */}

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Special Requests
          </label>

          <textarea
            name="specialRequests"
            rows={5}
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Write your special requests..."
            className="w-full rounded-lg border p-3"
          />

          {errors.specialRequests && (
            <p className="mt-1 text-sm text-red-500">
              {errors.specialRequests}
            </p>
          )}
          
        </div>
       

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-teal-700 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            Book Now
          </button>
        </div>
      </form>
    </section>
  );
}