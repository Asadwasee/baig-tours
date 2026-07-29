"use client";

import { useEffect, useState } from "react";
import {
  getAdminBookings,
  updateBookingStatus,
  deleteBooking,
  exportBookingsCSV,
  Booking,
} from "@/services/adminBookingService";
import {
  CalendarCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Trash2,
  RefreshCw,
  User,
  MapPin,
  DollarSign,
  Download,
  Eye,
  ChevronDown,
  AlertTriangle,
  Ban,
  Star,
} from "lucide-react";

// Allowed status transitions for a booking
const NEXT_ALLOWED_STATUSES: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: ["pending"], // allow re-activation
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  partial: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  refunded: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [exportLoading, setExportLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getAdminBookings();
      setBookings(res);
    } catch (err) {
      console.error("Bookings load error:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const booking = bookings.find((b) => b._id === id);
    if (!booking) return;

    const allowed = NEXT_ALLOWED_STATUSES[booking.status] || [];
    if (!allowed.includes(newStatus)) {
      alert(
        `Cannot change status from "${STATUS_LABELS[booking.status]}" to "${STATUS_LABELS[newStatus]}". This transition is not allowed.`
      );
      return;
    }

    const confirmMsg =
      newStatus === "cancelled"
        ? `Are you sure you want to CANCEL this booking? This will restore the seats.`
        : newStatus === "confirmed"
        ? `Confirm this booking? This will deduct seats from the package.`
        : newStatus === "completed"
        ? `Mark this booking as COMPLETED? Revenue will be counted after this.`
        : `Change status to "${STATUS_LABELS[newStatus]}"?`;

    if (!confirm(confirmMsg)) return;

    setUpdatingId(id);
    try {
      await updateBookingStatus(id, newStatus);
      await fetchBookings();
    } catch (err: any) {
      console.error("Status update error:", err);
      alert(err?.message || "Failed to update booking status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this booking? This action cannot be undone.")) return;
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err: any) {
      console.error("Delete error:", err);
      alert(err?.message || "Failed to delete booking.");
    }
  };

  const handleExportCSV = async () => {
    setExportLoading(true);
    try {
      await exportBookingsCSV();
    } catch (err) {
      alert("Failed to export CSV. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      (b.customer?.fullName || b.customer?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.customer?.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.package?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.package?.destination || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.city || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={12} /> Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock size={12} /> Pending
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Star size={12} /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Ban size={12} /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300">
            {status}
          </span>
        );
    }
  };

  // Summary counts
  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarCheck size={24} className="text-[#F97316]" />
            Manage Customer Bookings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review incoming tour reservations, approve bookings, and track their lifecycle.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            disabled={exportLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Download size={14} className={exportLoading ? "animate-bounce" : ""} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Status Workflow Info */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex flex-wrap gap-4 items-center">
        <span className="font-semibold text-slate-300 flex items-center gap-1">
          <AlertTriangle size={14} className="text-amber-400" /> Booking Workflow:
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
          Pending → <span className="text-emerald-400 font-medium">Confirmed</span> or <span className="text-rose-400 font-medium">Cancelled</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          Confirmed → <span className="text-blue-400 font-medium">Completed</span> or <span className="text-rose-400 font-medium">Cancelled</span>
        </span>
        <span className="flex items-center gap-1 text-slate-500">
          Revenue is counted only for <span className="text-blue-400 font-medium mx-1">Completed</span> bookings.
        </span>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="relative w-full md:w-96">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, email, package or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#F97316]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter size={16} className="text-slate-400 shrink-0" />
          {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition shrink-0 flex items-center gap-1.5 ${
                statusFilter === st
                  ? "bg-[#F97316] text-white font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {st}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${statusFilter === st ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>
                {counts[st]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-3">
            <RefreshCw size={28} className="text-[#F97316] animate-spin" />
            <p className="text-xs text-slate-400">Loading bookings list...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Customer Details</th>
                  <th className="p-3.5">Tour Package</th>
                  <th className="p-3.5">Travel Info</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((b) => {
                    const allowedNext = NEXT_ALLOWED_STATUSES[b.status] || [];
                    const isExpanded = expandedId === b._id;
                    return (
                      <>
                        <tr key={b._id} className="hover:bg-slate-900/60 transition">
                          <td className="p-3.5 font-medium text-white">
                            <div className="flex items-center gap-2.5">
                              <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 shrink-0">
                                <User size={14} />
                              </div>
                              <div>
                                <p className="font-semibold text-slate-100">
                                  {b.customer?.fullName || b.customer?.name || "Guest User"}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  {b.customer?.email || b.customer?.phone || "-"}
                                </p>
                                {b.customer?.phone && b.customer?.email && (
                                  <p className="text-[11px] text-slate-500">{b.customer.phone}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div>
                              <p className="font-medium text-slate-200">{b.package?.title || "Tour Package"}</p>
                              <p className="text-[11px] text-teal-400 flex items-center gap-1">
                                <MapPin size={11} /> {b.package?.destination || "Pakistan"}
                              </p>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div>
                              <p className="text-slate-200 font-medium">
                                {b.travelDate ? new Date(b.travelDate).toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}
                              </p>
                              <p className="text-[11px] text-slate-400">
                                {b.adults || 0} Adults{b.children ? `, ${b.children} Children` : ""}
                              </p>
                              {b.city && (
                                <p className="text-[11px] text-slate-500">{b.city}</p>
                              )}
                            </div>
                          </td>
                          <td className="p-3.5">
                            <p className="font-bold text-white font-mono">
                              PKR {b.totalAmount ? b.totalAmount.toLocaleString() : "0"}
                            </p>
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                                PAYMENT_STATUS_COLORS[b.paymentStatus || "pending"]
                              }`}
                            >
                              {b.paymentStatus || "pending"}
                            </span>
                          </td>
                          <td className="p-3.5">{getStatusBadge(b.status)}</td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Details toggle */}
                              <button
                                onClick={() => setExpandedId(isExpanded ? null : b._id)}
                                title="View details"
                                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition"
                              >
                                <Eye size={14} />
                              </button>

                              {/* Status change dropdown */}
                              {allowedNext.length > 0 ? (
                                <div className="relative">
                                  <select
                                    disabled={updatingId === b._id}
                                    value=""
                                    onChange={(e) => {
                                      if (e.target.value) handleStatusChange(b._id, e.target.value);
                                    }}
                                    className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#F97316] appearance-none pr-7 cursor-pointer"
                                  >
                                    <option value="" disabled>Change Status</option>
                                    {allowedNext.map((st) => (
                                      <option key={st} value={st}>
                                        → {STATUS_LABELS[st]}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ) : (
                                <span className="text-[10px] text-slate-500 px-2">
                                  {b.status === "completed" ? "Final" : "Final"}
                                </span>
                              )}

                              {/* Voucher link */}
                              <a
                                href={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/${b._id}/voucher?print=false`}
                                target="_blank"
                                rel="noreferrer"
                                title="View Voucher"
                                className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white transition"
                              >
                                <DollarSign size={14} />
                              </a>

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(b._id)}
                                title="Delete booking"
                                className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr key={`${b._id}-detail`} className="bg-slate-900/50">
                            <td colSpan={6} className="px-6 pb-4 pt-2">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                <div>
                                  <p className="text-slate-500 font-medium mb-0.5">Booking ID</p>
                                  <p className="text-slate-300 font-mono text-[10px]">{b._id}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 font-medium mb-0.5">WhatsApp</p>
                                  <p className="text-slate-300">{b.whatsappNumber || b.customer?.whatsappNumber || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 font-medium mb-0.5">City / Pickup</p>
                                  <p className="text-slate-300">{b.city || b.customer?.city || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 font-medium mb-0.5">Special Requests</p>
                                  <p className="text-slate-300">{b.specialRequests || "None"}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 font-medium mb-0.5">Booking Source</p>
                                  <p className="text-slate-300 capitalize">{b.source || "web"}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 font-medium mb-0.5">Created At</p>
                                  <p className="text-slate-300">{new Date(b.createdAt).toLocaleString("en-PK")}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 font-medium mb-0.5">Currency</p>
                                  <p className="text-slate-300">{b.currency || "PKR"}</p>
                                </div>
                                <div className="flex items-end">
                                  <a
                                    href={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/${b._id}/voucher`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500 hover:text-white text-xs font-semibold transition"
                                  >
                                    <DollarSign size={12} /> View Voucher
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-slate-400">
                      {searchTerm || statusFilter !== "all"
                        ? "No bookings match your search or filter."
                        : "No bookings found in the database."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
