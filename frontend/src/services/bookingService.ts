import axios from "axios";
import { BookingFormData } from "@/types/booking";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";


export const createBooking = async (
  bookingData: BookingFormData
) => {
  const response = await axios.post(
    `${API_URL}/bookings`,
    bookingData
    
  );


  return response.data;
};