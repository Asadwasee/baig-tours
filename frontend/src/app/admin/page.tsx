"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCompleteDashboard,
  CompleteDashboardResponse,
} from "@/services/dashboardService";
import { updateBookingStatus } from "@/services/adminBookingService";
import {
  DollarSign,
  CalendarCheck,
  Clock,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MapPin,
  Sparkles,
  Plus,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<CompleteDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCompleteDashboard();
      setData(res);
    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      setError(err.message || "Failed to load dashboard data from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, newStatus);
      fetchDashboardData();
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update booking status. Please refresh and try again.");
    } finally {
      setUpdatingId(null);
    }
  };


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
            <CheckCircle2 size={12} /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle size={12} /> Cancelled
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <RefreshCw size={32} className="text-[#F97316] animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading Dashboard Metrics...</p>
      </div>
    );
  }

  const stats = data?.stats;
  const maxRevenue = data?.charts?.monthlyBookings
    ? Math.max(...data.charts.monthlyBookings.revenue, 1)
    : 1;

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={18} className="text-[#F97316]" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Control Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Baig Tours Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Overview of total earnings, customer bookings, destinations & system analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
          
          <Link
            href="/admin/bookings"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:opacity-90 transition"
          >
            <Plus size={16} />
            <span>View All Bookings</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Revenue */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-24 w-24 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Total Revenue</span>
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <DollarSign size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            PKR {stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : "0"}
          </h3>
          <div className="flex items-center gap-1 text-xs text-emerald-400 mt-2 font-medium">
            <TrendingUp size={14} />
            <span>Confirmed & Completed earnings</span>
          </div>
        </div>

        {/* Card 2: Total Bookings */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-24 w-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Total Bookings</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <CalendarCheck size={20} />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            {stats?.totalBookings ?? 0}
          </h3>
          <div className="flex items-center justify-between text-xs text-slate-400 mt-2 font-medium">
            <span>{stats?.completedBookings ?? 0} Completed</span>
            <ArrowUpRight size={14} className="text-blue-400" />
          </div>
        </div>

        {/* Card 3: Pending Bookings */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 hover:border-amber-500/60 transition shadow-lg relative overflow-hidden group bg-gradient-to-b from-amber-500/5 to-transparent">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-amber-400">Pending Bookings</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock size={20} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-white">
              {stats?.pendingBookings ?? 0}
            </h3>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
              Requires Review
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Awaiting admin confirmation & voucher update.
          </p>
        </div>

        {/* Card 4: Packages & Customers */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Active Offerings</span>
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Package size={20} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div>
              <p className="text-xl font-bold text-white">{stats?.totalPackages ?? 0}</p>
              <p className="text-[11px] text-slate-400">Tour Packages</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">{stats?.customerCount ?? 0}</p>
              <p className="text-[11px] text-slate-400">Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp size={18} className="text-[#F97316]" />
                Monthly Revenue & Booking Performance
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Earnings and booking density across months in PKR.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-900 text-teal-400 border border-slate-800">
              Year {new Date().getFullYear()}
            </span>
          </div>

          {/* Custom Styled Bar Visualization */}
          <div className="h-56 flex items-end justify-between gap-2 pt-6 px-2">
            {data?.charts?.monthlyBookings?.months.map((month, idx) => {
              const rev = data.charts.monthlyBookings.revenue[idx] || 0;
              const count = data.charts.monthlyBookings.bookings[idx] || 0;
              const heightPercent = Math.max(Math.round((rev / maxRevenue) * 100), 8);

              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on Hover */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all pointer-events-none bg-slate-800 text-white text-[10px] px-2 py-1 rounded-md border border-slate-700 shadow-xl z-20 whitespace-nowrap">
                    <p className="font-bold text-orange-400">PKR {rev.toLocaleString()}</p>
                    <p className="text-slate-300">{count} Bookings</p>
                  </div>

                  {/* Bar */}
                  <div className="w-full bg-slate-900 rounded-lg overflow-hidden flex flex-col justify-end h-40">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#0B5C56] via-teal-500 to-[#F97316] rounded-t-md group-hover:brightness-125 transition-all duration-300"
                    />
                  </div>

                  <span className="text-[10px] font-medium text-slate-400 group-hover:text-white transition">
                    {month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Destinations Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-800 pb-4 mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin size={18} className="text-[#F97316]" />
                Popular Destinations
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Top destinations by customer demand.
              </p>
            </div>

            <div className="space-y-4">
              {data?.charts?.popularDestinations?.map((dest, idx) => (
                <div key={dest.destination || idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">
                      {dest.destination || "General Tour"}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {dest.bookings} Bookings ({dest.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.min(Number(dest.percentage) || 10, 100)}%` }}
                      className="h-full bg-gradient-to-r from-teal-500 to-[#F97316] rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-right text-slate-400 font-medium">
                    Revenue: PKR {dest.revenue ? dest.revenue.toLocaleString() : "0"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/admin/packages"
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 pt-2 border-t border-slate-800/60"
          >
            <span>Manage Tour Packages</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Recent Bookings Data Table */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CalendarCheck size={18} className="text-[#F97316]" />
              Recent Booking Activity
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest bookings placed by users across Pakistan.
            </p>
          </div>

          <Link
            href="/admin/bookings"
            className="flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition"
          >
            <span>View All Bookings</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5 rounded-l-xl">Customer</th>
                <th className="p-3.5">Package</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right rounded-r-xl">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {data?.recentBookings && data.recentBookings.length > 0 ? (
                data.recentBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-900/60 transition">
                    <td className="p-3.5 font-medium text-white">
                      <div>
                        <p className="font-semibold text-slate-100">
                          {b.customer?.fullName || b.customer?.name || "Guest Customer"}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {b.customer?.email || b.customer?.phone || "No contact info"}
                        </p>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div>
                        <p className="font-medium text-slate-200">
                          {b.package?.title || "Tour Package"}
                        </p>
                        <p className="text-[11px] text-teal-400">
                          {b.package?.destination || "Pakistan"}
                        </p>
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-white font-mono">
                      PKR {b.totalAmount ? b.totalAmount.toLocaleString() : "0"}
                    </td>
                    <td className="p-3.5">{getStatusBadge(b.status)}</td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          disabled={updatingId === b._id}
                          value={b.status}
                          onChange={(e) => handleStatusChange(b._id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-[#F97316]"
                        >
                          <option value="pending">Set Pending</option>
                          <option value="confirmed">Set Confirmed</option>
                          <option value="completed">Set Completed</option>
                          <option value="cancelled">Set Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-slate-400">
                    No recent bookings found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
