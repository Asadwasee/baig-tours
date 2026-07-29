"use client";

import { useEffect, useState } from "react";
import {
  getAdminPackages,
  createPackage,
  updatePackage,
  deletePackage,
  duplicatePackage,
  PackageItem,
} from "@/services/adminPackageService";
import {
  Package,
  Search,
  Plus,
  Trash2,
  Copy,
  Edit,
  RefreshCw,
  MapPin,
  Tag,
  Star,
  CheckCircle2,
  X,
  Calendar,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<PackageItem>>({
    title: "",
    destination: "",
    category: "Luxury Tours",
    price: 35000,
    discountPrice: 0,
    duration: "5 Days / 4 Nights",
    availableSeats: 15,
    departureDate: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0],
    returnDate: new Date(Date.now() + 86400000 * 12).toISOString().split("T")[0],
    pickupLocation: "Islamabad International Airport",
    description: "",
    images: [""],
    isFeatured: false,
    isUpcoming: false,
  });

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await getAdminPackages();
      setPackages(res);
    } catch (err: any) {
      console.error("Packages load error:", err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openCreateModal = () => {
    setEditingPackage(null);
    setFormData({
      title: "",
      destination: "",
      category: "Luxury Tours",
      price: 35000,
      discountPrice: 0,
      duration: "5 Days / 4 Nights",
      availableSeats: 15,
      departureDate: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0],
      returnDate: new Date(Date.now() + 86400000 * 12).toISOString().split("T")[0],
      pickupLocation: "Islamabad International Airport",
      description: "",
      images: [""],
      isFeatured: false,
      isUpcoming: false,
    });
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: PackageItem) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title || "",
      destination: pkg.destination || "",
      category: pkg.category || "Luxury Tours",
      price: pkg.price || 0,
      discountPrice: pkg.discountPrice || 0,
      duration: pkg.duration || "5 Days / 4 Nights",
      availableSeats: pkg.availableSeats || 10,
      departureDate: pkg.departureDate ? new Date(pkg.departureDate).toISOString().split("T")[0] : "",
      returnDate: pkg.returnDate ? new Date(pkg.returnDate).toISOString().split("T")[0] : "",
      pickupLocation: pkg.pickupLocation || "Islamabad",
      description: pkg.description || "",
      images: pkg.images && pkg.images.length > 0 ? pkg.images : [""],
      isFeatured: pkg.isFeatured || pkg.featured || false,
      isUpcoming: pkg.isUpcoming || false,
    });
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.destination || !formData.price || !formData.description) {
      setFormError("Please fill out all required fields (Title, Destination, Price, Description).");
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    try {
      if (editingPackage) {
        await updatePackage(editingPackage._id, formData);
        setFormSuccess("Package updated successfully!");
      } else {
        await createPackage(formData);
        setFormSuccess("Package created successfully!");
      }
      await fetchPackages();
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    } catch (err: any) {
      setFormError(err.message || "Operation failed. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour package?")) return;
    setActionLoading(id);
    try {
      await deletePackage(id);
      await fetchPackages();
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("Failed to delete package from database.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    setActionLoading(id);
    try {
      await duplicatePackage(id);
      await fetchPackages();
    } catch (err: any) {
      console.error("Duplicate error:", err);
      alert("Failed to duplicate package.");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = packages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package size={24} className="text-[#F97316]" />
            Manage Tour Packages
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, duplicate, and manage all active holiday itineraries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#0B5C56] text-white text-xs font-bold shadow-lg shadow-orange-500/10 hover:opacity-95 transition"
          >
            <Plus size={16} />
            <span>Create New Package</span>
          </button>

          <button
            onClick={fetchPackages}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by package title, category, destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#F97316]"
          />
        </div>
      </div>

      {/* Grid of Packages */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 gap-3">
          <RefreshCw size={28} className="text-[#F97316] animate-spin" />
          <p className="text-xs text-slate-400">Loading tour packages...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-slate-950 border border-slate-800 rounded-2xl text-slate-400 text-sm">
          No tour packages found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg) => (
            <div
              key={pkg._id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition shadow-xl flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center gap-1">
                    <Tag size={10} /> {pkg.category || "General Tour"}
                  </span>
                  {(pkg.isFeatured || pkg.featured) && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Star size={10} /> Featured
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#F97316] transition leading-snug">
                  {pkg.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-orange-400" /> {pkg.destination}
                  </span>
                  {pkg.duration && <span>• {pkg.duration}</span>}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Price per head</span>
                  <span className="text-lg font-bold text-white font-mono">
                    PKR {pkg.price ? pkg.price.toLocaleString() : "0"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(pkg)}
                    title="Edit Package"
                    className="p-2 rounded-xl bg-slate-900 text-teal-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
                  >
                    <Edit size={14} />
                  </button>

                  <button
                    disabled={actionLoading === pkg._id}
                    onClick={() => handleDuplicate(pkg._id)}
                    title="Duplicate Package"
                    className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
                  >
                    <Copy size={14} />
                  </button>

                  <button
                    disabled={actionLoading === pkg._id}
                    onClick={() => handleDelete(pkg._id)}
                    title="Delete Package"
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT PACKAGE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Package size={20} className="text-[#F97316]" />
                {editingPackage ? "Edit Tour Package" : "Create New Tour Package"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. 5 Days Luxury Hunza & Attabad Lake Tour"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Destination *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destination || ""}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Hunza Valley"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category || "Luxury Tours"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
                  >
                    <option value="Luxury Tours">Luxury Tours</option>
                    <option value="Adventure Tours">Adventure Tours</option>
                    <option value="Family Tours">Family Tours</option>
                    <option value="Honeymoon Packages">Honeymoon Packages</option>
                    <option value="Cultural Tours">Cultural Tours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Price per Head (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ""}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 5 Days / 4 Nights"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Available Seats
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.availableSeats || 15}
                    onChange={(e) => setFormData({ ...formData, availableSeats: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Pickup Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pickupLocation || ""}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    placeholder="e.g. Islamabad International Airport"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Departure Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.departureDate || ""}
                    onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.returnDate || ""}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.images ? formData.images[0] : ""}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter itinerary details, trip highlights, stay details..."
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured || false}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-[#F97316] focus:ring-0"
                    />
                    <span>Mark as Featured Package</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isUpcoming || false}
                      onChange={(e) => setFormData({ ...formData, isUpcoming: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-[#F97316] focus:ring-0"
                    />
                    <span>Mark as Upcoming Tour</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#0B5C56] text-white text-xs font-bold shadow-md hover:opacity-95 transition flex items-center gap-2"
                >
                  {formSubmitting && <RefreshCw size={14} className="animate-spin" />}
                  <span>{editingPackage ? "Save Changes" : "Create Package"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
