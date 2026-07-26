// Booking form data sent from the frontend.
export interface BookingFormData {
  package: string;

  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
    whatsappNumber: string;
    city: string;
    cnic: string;
  };

  travelDate: string;
  adults: number;
  children: number;
  totalAmount?: number;
  specialRequests: string;
}

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
  whatsappNumber?: string;
  city?: string;
  cnic?: string;
  travelDate?: string;
  adults?: string;
  children?: string;
  specialRequests?: string;
}