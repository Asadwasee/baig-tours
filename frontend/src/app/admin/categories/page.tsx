"use client";

import { useEffect, useState } from "react";
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  CategoryItem,
} from "@/services/adminCategoryService";
import {
  Layers,
  Search,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  X,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<CategoryItem>>({
    name: "",
    description: "",
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAdminCategories();
      setCategories(res);
    } catch (err: any) {
      console.error("Categories load error:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || "",
      description: cat.description || "",
    });
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      setFormError("Category name is required.");
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, formData);
        setFormSuccess("Category updated successfully!");
      } else {
        await createCategory(formData);
        setFormSuccess("Category created successfully!");
      }
      await fetchCategories();
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
    if (!confirm("Are you sure you want to delete this tour category?")) return;
    setActionLoading(id);
    try {
      await deleteCategory(id);
      await fetchCategories();
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("Failed to delete category.");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers size={24} className="text-[#F97316]" />
            Tour Categories Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize tour packages into curated travel themes and categories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#0B5C56] text-white text-xs font-bold shadow-lg shadow-orange-500/10 hover:opacity-95 transition"
          >
            <Plus size={16} />
            <span>Add Category</span>
          </button>

          <button
            onClick={fetchCategories}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#F97316]"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 gap-3">
          <RefreshCw size={28} className="text-[#F97316] animate-spin" />
          <p className="text-xs text-slate-400">Loading tour categories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((cat) => (
            <div
              key={cat._id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div>
                <h3 className="text-base font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {cat.description || "No description provided."}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">/{cat.slug}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 rounded-lg bg-slate-900 text-teal-400 hover:text-white"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers size={18} className="text-[#F97316]" />
                {editingCategory ? "Edit Category" : "Create New Category"}
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Honeymoon Packages"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this tour category..."
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                />
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
                  <span>{editingCategory ? "Save Changes" : "Create Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
