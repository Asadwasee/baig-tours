import { BookingFormData, BookingFormErrors } from "@/types/booking";

export const validateBookingForm = (
  data: BookingFormData
): BookingFormErrors => {
  const errors: BookingFormErrors = {};

  if (!data.package) {
    errors.package = "Package is required";
  }

  if (!data.customerDetails.fullName.trim()) {
    errors.fullName = "Full Name is required";
  }

  if (!data.customerDetails.email.trim()) {
    errors.email = "Email is required";
  }

  if (!data.customerDetails.phone.trim()) {
  errors.phone = "Phone is required";
} else if (
  data.customerDetails.phone.length < 7 ||
  data.customerDetails.phone.length > 20
) {
  errors.phone = "Phone number must be between 7 and 20 characters";
}

 if (
  data.customerDetails.whatsappNumber &&
  (data.customerDetails.whatsappNumber.length < 7 ||
    data.customerDetails.whatsappNumber.length > 20)
) {
  errors.whatsappNumber = "WhatsApp number must be between 7 and 20 characters";
}

  if (!data.customerDetails.cnic.trim()) {
    errors.cnic = "CNIC / Passport is required";
  }

  if (!data.travelDate) {
    errors.travelDate = "Travel Date is required";
  }

  if (data.adults < 1) {
    errors.adults = "At least one adult is required";
  }

  if (data.children < 0) {
    errors.children = "Children cannot be negative";
  }

  return errors;
};