// Booking form data sent from the frontend.
export interface BookingFormData {
  package: string;

  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
    cnic: string;
  };

  adults: number;
  children: number;
  travelDate: string;
  specialRequests: string;
}

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

/**
 * Validation errors for the booking form.
 * Each property is optional because an error
 * only exists if validation fails.
 */
export interface BookingFormErrors {
  package?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  cnic?: string;
  adults?: string;
  children?: string;
  travelDate?: string;
  specialRequests?: string;
}