"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { BookingFormData } from "@/types/booking";
import { validateBookingForm } from "@/utils/bookingValidation";
import { BookingFormErrors } from "@/types/booking";

const initialFormData: BookingFormData = {
  package: "",

  customerDetails: {
    fullName: "",
    email: "",
    phone: "",
    cnic: "",
  },

  adults: 1,
  children: 0,

  travelDate: "",

  specialRequests: "",
};

export default function BookingForm() {
  const [formData, setFormData] =
  useState<BookingFormData>(initialFormData);

const [errors, setErrors] =
  useState<BookingFormErrors>({});

 const handleChange = (
  e: ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {
  const { name, value } = e.target;

  if (["fullName", "email", "phone", "cnic"].includes(name)) {
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

    const validationErrors =
        validateBookingForm(formData);

    if (Object.keys(validationErrors).length > 0) {

        setErrors(validationErrors);

        return;
    }

    console.log(formData);

};

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Book Your Tour
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Package */}
        <div>
          <label className="block mb-2 font-medium">
            Package
          </label>

          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Package</option>
            <option value="1">Hunza Tour</option>
            <option value="2">Skardu Tour</option>
            <option value="3">Swat Tour</option>
          </select>
          {errors.package && (
  <p className="text-red-500 text-sm mt-1">
    {errors.package}
  </p>
)}
        </div>

        {/* Full Name */}

        <div>
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.customerDetails.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter Full Name"
           
          />
           {errors.fullName && (
<p className="text-red-500 text-sm mt-1">
    {errors.fullName}
</p>)}
        </div>

        {/* Email */}

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.customerDetails.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter Email"
            
          />
          {errors.email && (
<p className="text-red-500 text-sm mt-1">
    {errors.email}
</p>)}
        </div>

        {/* Phone */}

        <div>
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.customerDetails.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="03XXXXXXXXX"
          
          />
            {errors.phone && (
<p className="text-red-500 text-sm mt-1">
    {errors.phone}
</p>)}
        </div>

       

        {/* CNIC */}

        <div>
          <label className="block mb-2 font-medium">
            CNIC / Passport
          </label>

          <input
            type="text"
            name="cnic"
            value={formData.customerDetails.cnic}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="35202-XXXXXXX-X"
            
          />
          {errors.cnic && (
<p className="text-red-500 text-sm mt-1">
    {errors.cnic}
</p>)}
        </div>

       

        {/* Adults */}

        <div>
          <label className="block mb-2 font-medium">
            Adults
          </label>

          <input
            type="number"
            name="adults"
            value={formData.adults}
            onChange={handleChange}
            min={1}
            className="w-full border rounded-lg p-3"
           
          />
           {errors.adults && (
<p className="text-red-500 text-sm mt-1">
    {errors.adults}
</p>)}
        </div>

        {/* Children */}

        <div>
          <label className="block mb-2 font-medium">
            Children
          </label>

          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleChange}
            min={0}
            className="w-full border rounded-lg p-3"
           
          />
           {errors.children && (
<p className="text-red-500 text-sm mt-1">
    {errors.children}
</p>)}
        </div>

        {/* Travel Date */}

        <div>
          <label className="block mb-2 font-medium">
            Travel Date
          </label>

          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
           
          />
           {errors.travelDate && (
<p className="text-red-500 text-sm mt-1">
    {errors.travelDate}
</p>)}
        </div>

        {/* Special Requests */}

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Special Requests
          </label>

          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={5}
            className="w-full border rounded-lg p-3"
            placeholder="Write your special requests..."
           
          />
           {errors.specialRequests && (
<p className="text-red-500 text-sm mt-1">
    {errors.specialRequests}
</p>)}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-lg transition"
          >
            Book Now
          </button>
        </div>
      </form>
    </section>
  );
}