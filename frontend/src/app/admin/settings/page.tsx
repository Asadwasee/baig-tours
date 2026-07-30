"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSettings, SettingsData } from "@/services/settings";
import {
  Settings,
  Building,
  Phone,
  Mail,
  Share2,
  Globe,
  Save,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Partial<SettingsData>>({
    companyName: "Baig Tours",
    address: "Lahore, Pakistan",
    phone: "+92 300 1234567",
    email: "info@baigtours.com",
    whatsappNumber: "+92 300 1234567",
    seo: {
      metaTitle: "Baig Tours - Discover Beautiful Pakistan",
      metaDescription: "Best tour & travel agency in Pakistan for Hunza, Skardu, Swat, Naran & Neelum Valley.",
      metaKeywords: "Pakistan tours, Hunza tour package, Skardu travel, Swat trips",
    },
    footer: {
      content: "Unforgettable travel experiences across Pakistan.",
      copyright: "© 2026 Baig Tours. All rights reserved.",
    },
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getSettings();
        if (res) setSettings((prev) => ({ ...prev, ...res }));
      } catch (err) {
        console.log("Using default settings state");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    try {
      await updateSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      console.error("Save settings error:", err);
      setSaveError(err.message || "Failed to update settings in backend.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings size={24} className="text-[#F97316]" />
            System & Website Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure agency details, contact channels, SEO tags and platform metadata.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>System settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Company Profile */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building size={18} className="text-[#F97316]" />
            Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={settings.companyName || ""}
                onChange={(e) =>
                  setSettings({ ...settings, companyName: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp Hotline
              </label>
              <input
                type="text"
                value={settings.whatsappNumber || ""}
                onChange={(e) =>
                  setSettings({ ...settings, whatsappNumber: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Physical Address
            </label>
            <input
              type="text"
              value={settings.address || ""}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
            />
          </div>
        </div>

        {/* Section 2: SEO Optimization */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Globe size={18} className="text-[#F97316]" />
            Search Engine Optimization (SEO)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={settings.seo?.metaTitle || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo!, metaTitle: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.seo?.metaDescription || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo!, metaDescription: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F97316]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white font-bold text-xs shadow-lg shadow-orange-500/20 flex items-center gap-2 hover:opacity-90 transition"
        >
          <Save size={16} />
          <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
        </button>
      </form>
    </div>
  );
}
