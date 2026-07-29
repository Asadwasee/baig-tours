"use client";

import { useEffect, useState } from "react";
import {
  getAdminContacts,
  replyContact,
  deleteContact,
  ContactItem,
} from "@/services/adminContactService";
import {
  Mail,
  Search,
  Trash2,
  RefreshCw,
  Send,
  User,
  Phone,
  Calendar,
  MessageSquare,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Reply Modal
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  const [replySuccess, setReplySuccess] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await getAdminContacts();
      setContacts(res);
    } catch (err: any) {
      console.error("Contacts load error:", err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openReplyModal = (contact: ContactItem) => {
    setSelectedContact(contact);
    setReplyText(contact.adminResponse || "");
    setReplyError(null);
    setReplySuccess(null);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact || !replyText.trim()) {
      setReplyError("Please enter a reply message.");
      return;
    }

    setReplySubmitting(true);
    setReplyError(null);

    try {
      await replyContact(selectedContact._id, replyText);
      setReplySuccess("Reply sent successfully!");
      await fetchContacts();
      setTimeout(() => setSelectedContact(null), 1000);
    } catch (err: any) {
      setReplyError(err.message || "Failed to send reply.");
    } finally {
      setReplySubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact message?")) return;
    setActionLoading(id);
    try {
      await deleteContact(id);
      await fetchContacts();
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("Failed to delete contact message.");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail size={24} className="text-[#F97316]" />
            Customer Inquiries & Messages
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review contact form messages, respond to customer inquiries, and manage leads.
          </p>
        </div>

        <button
          onClick={fetchContacts}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by sender name, email or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#F97316]"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-3">
            <RefreshCw size={28} className="text-[#F97316] animate-spin" />
            <p className="text-xs text-slate-400">Loading customer messages...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No contact inquiries found.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item._id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <User size={14} className="text-teal-400" /> {item.name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.email}
                    </span>
                    {item.phone && (
                      <span className="text-xs text-slate-400 font-mono">
                        • {item.phone}
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.status === "replied"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : item.status === "read"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-200">
                    Subject: {item.subject}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                    {item.message}
                  </p>

                  {item.adminResponse && (
                    <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-800/40 text-xs text-teal-300">
                      <span className="font-bold block text-teal-400 mb-0.5">Admin Reply:</span>
                      {item.adminResponse}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => openReplyModal(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white text-xs font-semibold transition"
                  >
                    <Send size={13} />
                    <span>{item.adminResponse ? "Edit Reply" : "Reply"}</span>
                  </button>

                  <button
                    disabled={actionLoading === item._id}
                    onClick={() => handleDelete(item._id)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REPLY MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare size={18} className="text-[#F97316]" />
                Reply to {selectedContact.name}
              </h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition"
              >
                <X size={18} />
              </button>
            </div>

            {replyError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{replyError}</span>
              </div>
            )}

            {replySuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{replySuccess}</span>
              </div>
            )}

            <form onSubmit={handleSendReply} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Original Message
                </label>
                <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-400 border border-slate-800">
                  {selectedContact.message}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Admin Response / Email Reply *
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your official response to customer..."
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F97316]"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedContact(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replySubmitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#0B5C56] text-white text-xs font-bold shadow-md hover:opacity-95 transition flex items-center gap-2"
                >
                  {replySubmitting ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                  <span>Send Response</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
