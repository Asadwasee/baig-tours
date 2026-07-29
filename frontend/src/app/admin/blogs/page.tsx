"use client";

import { useEffect, useState } from "react";
import {
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  BlogItem,
} from "@/services/adminBlogService";
import {
  FileText,
  Search,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Tag,
  Eye,
  CheckCircle2,
  X,
  AlertCircle,
  Clock,
  User,
} from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<BlogItem>>({
    title: "",
    category: "travel-tips",
    summary: "",
    content: "",
    author: "Baig Tours Team",
    featuredImage: "",
    isPublished: true,
    isFeatured: false,
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAdminBlogs();
      setBlogs(res);
    } catch (err: any) {
      console.error("Blogs load error:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      category: "travel-tips",
      summary: "",
      content: "",
      author: "Baig Tours Team",
      featuredImage: "",
      isPublished: true,
      isFeatured: false,
    });
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const openEditModal = (blog: BlogItem) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      category: blog.category || "travel-tips",
      summary: blog.summary || "",
      content: blog.content || "",
      author: blog.author || "Baig Tours Team",
      featuredImage: blog.featuredImage || "",
      isPublished: blog.isPublished !== undefined ? blog.isPublished : true,
      isFeatured: blog.isFeatured || false,
    });
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.content) {
      setFormError("Please fill out all required fields (Title, Category, Content).");
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    try {
      if (editingBlog) {
        await updateBlog(editingBlog._id, formData);
        setFormSuccess("Blog updated successfully!");
      } else {
        await createBlog(formData);
        setFormSuccess("Blog created successfully!");
      }
      await fetchBlogs();
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
    if (!confirm("Are you sure you want to delete this blog article?")) return;
    setActionLoading(id);
    try {
      await deleteBlog(id);
      await fetchBlogs();
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("Failed to delete blog from database.");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.category || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.author || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoriesList = [
    { value: "travel-tips", label: "Travel Tips" },
    { value: "destinations", label: "Destinations" },
    { value: "food-guides", label: "Food Guides" },
    { value: "road-trips", label: "Road Trips" },
    { value: "hotel-reviews", label: "Hotel Reviews" },
    { value: "news", label: "News & Updates" },
    { value: "tour-guides", label: "Tour Guides" },
    { value: "visa-guides", label: "Visa Guides" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText size={24} className="text-[#F97316]" />
            Manage Travel Blogs & Articles
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish travel guides, destination highlights, and news stories for website visitors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#0B5C56] text-white text-xs font-bold shadow-lg shadow-orange-500/10 hover:opacity-95 transition"
          >
            <Plus size={16} />
            <span>Create New Article</span>
          </button>

          <button
            onClick={fetchBlogs}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by blog title, category, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#F97316]"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 gap-3">
          <RefreshCw size={28} className="text-[#F97316] animate-spin" />
          <p className="text-xs text-slate-400">Loading blog articles...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-slate-950 border border-slate-800 rounded-2xl text-slate-400 text-sm">
          No blog articles found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog) => (
            <div
              key={blog._id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition shadow-xl flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase tracking-wider">
                    {blog.category}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    blog.isPublished ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                  }`}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#F97316] transition leading-snug line-clamp-2">
                  {blog.title}
                </h3>

                {blog.summary && (
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {blog.summary}
                  </p>
                )}

                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-orange-400" /> {blog.author || "Admin"}
                  </span>
                  {blog.views !== undefined && (
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {blog.views} views
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(blog)}
                    title="Edit Blog"
                    className="p-2 rounded-xl bg-slate-900 text-teal-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
                  >
                    <Edit size={14} />
                  </button>

                  <button
                    disabled={actionLoading === blog._id}
                    onClick={() => handleDelete(blog._id)}
                    title="Delete Blog"
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

      {/* CREATE / EDIT BLOG MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText size={20} className="text-[#F97316]" />
                {editingBlog ? "Edit Blog Article" : "Create New Blog Article"}
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
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Top 10 Places to Visit in Hunza Valley"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category || "travel-tips"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author || "Baig Tours Team"}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.featuredImage || ""}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Summary / Excerpt
                  </label>
                  <input
                    type="text"
                    maxLength={300}
                    value={formData.summary || ""}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Short 1-2 sentence description of the article..."
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Content *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.content || ""}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your article content here..."
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublished || false}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-[#F97316] focus:ring-0"
                    />
                    <span>Publish Immediately</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured || false}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-[#F97316] focus:ring-0"
                    />
                    <span>Feature on Homepage</span>
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
                  <span>{editingBlog ? "Save Article" : "Publish Article"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
