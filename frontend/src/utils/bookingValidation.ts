import { BookingFormData, BookingFormErrors } from "@/types/booking";

export const validateBookingForm = (
  data: BookingFormData
): BookingFormErrors => {
  const errors: BookingFormErrors = {};

 

 if (!data.package) {
  errors.package = "Please select a package";
}

if (!data.customerDetails.fullName.trim()) {
  errors.fullName = "Full Name is required";
}

if (!data.customerDetails.email.trim()) {
  errors.email = "Email is required";
}

if (!data.customerDetails.phone.trim()) {
  errors.phone = "Phone is required";
}

if (!data.customerDetails.cnic.trim()) {
  errors.cnic = "CNIC is required";
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