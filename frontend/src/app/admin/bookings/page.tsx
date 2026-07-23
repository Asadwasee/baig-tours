"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const statusOptions = ["pending", "confirmed", "cancelled", "completed"];
const paymentOptions = ["pending", "paid", "partial", "refunded"];

type Booking = {
  _id: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  currency: string;
  adults: number;
  children: number;
  travelDate: string;
  package?: {
    title?: string;
    destination?: string;
    price?: number;
  };
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
};

export default function AdminBookingManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const token = useMemo(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("adminToken") || "";
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || booking.paymentStatus === paymentFilter;
    return matchesStatus && matchesPayment;
  });

  const updateStatus = async (bookingId: string, nextStatus: string) => {
    try {
      await axios.patch(
        `${API_BASE}/api/bookings/${bookingId}/status`,
        { status: nextStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchBookings();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Status update failed");
    }
  };

  const updatePaymentStatus = async (bookingId: string, nextPaymentStatus: string) => {
    try {
      await axios.patch(
        `${API_BASE}/api/bookings/${bookingId}/payment-status`,
        { paymentStatus: nextPaymentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchBookings();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Payment status update failed");
    }
  };

  const exportBookings = async (format: "excel" | "pdf") => {
    try {
      const response = await axios.get(`${API_BASE}/api/bookings/export`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { format },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", format === "pdf" ? "bookings.pdf" : "bookings.xls");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Export failed");
    }
  };

  const openVoucher = async (bookingId: string) => {
    const popup = window.open(`${API_BASE}/api/bookings/${bookingId}/voucher`, "_blank");
    if (popup) {
      popup.focus();
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Booking Management</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportBookings("excel")}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Export Excel
          </button>
          <button
            onClick={() => exportBookings("pdf")}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="all">All booking statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={paymentFilter}
          onChange={(event) => setPaymentFilter(event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="all">All payment statuses</option>
          {paymentOptions.map((paymentStatus) => (
            <option key={paymentStatus} value={paymentStatus}>
              {paymentStatus}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="px-4 py-3 font-semibold">Travel Date</th>
                <th className="px-4 py-3 font-semibold">Guests</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    Loading bookings...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="border-t border-slate-200 align-top">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">
                        {booking.customer?.fullName || "Unknown customer"}
                      </div>
                      <div className="text-xs text-slate-500">{booking.customer?.email}</div>
                      <div className="text-xs text-slate-500">{booking.customer?.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{booking.package?.title || "Tour package"}</div>
                      <div className="text-xs text-slate-500">{booking.package?.destination}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {new Date(booking.travelDate).toLocaleDateString("en-PK")}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {booking.adults} adults / {booking.children} children
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {booking.totalAmount} {booking.currency}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={booking.status}
                        onChange={(event) => updateStatus(booking._id, event.target.value)}
                        className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={booking.paymentStatus}
                        onChange={(event) => updatePaymentStatus(booking._id, event.target.value)}
                        className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                      >
                        {paymentOptions.map((paymentStatus) => (
                          <option key={paymentStatus} value={paymentStatus}>
                            {paymentStatus}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openVoucher(booking._id)}
                        className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Print Voucher
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
