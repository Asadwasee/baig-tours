"use client";

import { useEffect, useState } from "react";
import {
  getAdminCustomers,
  deleteCustomer,
  CustomerItem,
} from "@/services/adminCustomerService";
import {
  Users,
  Search,
  Trash2,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  UserCheck,
} from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await getAdminCustomers();
      setCustomers(res);
    } catch (err) {
      console.error("Customers load error:", err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer profile?")) return;
    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.phone || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users size={24} className="text-[#F97316]" />
            Registered Customers
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Directory of customers who placed tour inquiries and reservations.
          </p>
        </div>

        <button
          onClick={fetchCustomers}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#F97316]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-3">
            <RefreshCw size={28} className="text-[#F97316] animate-spin" />
            <p className="text-xs text-slate-400">Loading customer profiles...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Customer Name</th>
                  <th className="p-3.5">Email Address</th>
                  <th className="p-3.5">Phone Number</th>
                  <th className="p-3.5">City / Location</th>
                  <th className="p-3.5 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.length > 0 ? (
                  filtered.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-900/60 transition">
                      <td className="p-3.5 font-medium text-white">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-bold shrink-0">
                            {c.fullName.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-100">{c.fullName}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <Mail size={13} className="text-slate-400" /> {c.email}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="flex items-center gap-1.5 text-slate-300 font-mono">
                          <Phone size={13} className="text-slate-400" /> {c.phone || "N/A"}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400">
                        {c.city || c.address || "Pakistan"}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDelete(c._id)}
                          title="Delete Customer Record"
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-slate-400">
                      No matching customer records found.
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
