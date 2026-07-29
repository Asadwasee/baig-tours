// src/services/adminBookingService.ts
import { apiFetch } from "./api";

export interface Booking {
  _id: string;
  bookingNumber?: string;
  customer?: {
    _id?: string;
    fullName?: string;
    name?: string;
    email?: string;
    phone?: string;
    whatsappNumber?: string;
    city?: string;
  };
  package?: {
    _id?: string;
    title?: string;
    destination?: string;
    price?: number;
  };
  travelDate?: string;
  adults?: number;
  children?: number;
  totalAmount: number;
  currency?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus?: 'pending' | 'paid' | 'partial' | 'refunded';
  city?: string;
  whatsappNumber?: string;
  specialRequests?: string;
  source?: string;
  createdAt: string;
  updatedAt?: string;
}

export async function getAdminBookings(): Promise<Booking[]> {
  const data = await apiFetch<any>("/bookings");
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.bookings)) return data.bookings;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

export async function getAdminBookingById(id: string): Promise<Booking> {
  return apiFetch<Booking>(`/bookings/${id}`);
}

export async function updateBookingStatus(id: string, status: string): Promise<Booking> {
  return apiFetch<Booking>(`/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export async function updateBooking(id: string, data: Partial<Booking>): Promise<Booking> {
  return apiFetch<Booking>(`/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBooking(id: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/bookings/${id}`, {
    method: "DELETE",
  });
}

export async function exportBookingsCSV(): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  const response = await fetch(`${apiUrl}/bookings/export/csv`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  if (!response.ok) throw new Error("Failed to export CSV");
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "baig_tours_bookings.csv";
  a.click();
  window.URL.revokeObjectURL(url);
}
