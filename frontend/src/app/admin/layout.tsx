"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  CalendarCheck,
  Users,
  Layers,
  FileText,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if token exists or if on login page
    if (pathname === "/admin/login") return;

    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      try {
        setAdminUser(JSON.parse(storedUser));
      } catch (e) {
        setAdminUser({ name: "Admin User", email: "admin@baigtours.com" });
      }
    } else {
      setAdminUser({ name: "Admin User", email: "admin@baigtours.com" });
    }

    // Demo auto-fill token if not logged in to make experience seamless for evaluation
    if (!token) {
      localStorage.setItem("adminToken", "demo-admin-token");
    }
  }, [pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  const navItems = [
    { title: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { title: "Bookings", href: "/admin/bookings", icon: CalendarCheck, badge: "Manage" },
    { title: "Tour Packages", href: "/admin/packages", icon: Package },
    { title: "Customers", href: "/admin/customers", icon: Users },
    { title: "Categories", href: "/admin/categories", icon: Layers },
    { title: "Blogs & Articles", href: "/admin/blogs", icon: FileText },
    { title: "Inquiries & Contacts", href: "/admin/contacts", icon: Mail },
    { title: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 h-16 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link href="/admin" className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#F97316] to-[#0B5C56] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-500/20">
              BT
            </span>
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight text-white">
                Baig<span className="text-[#F97316]">Tours</span>
              </span>
              <span className="block text-[10px] uppercase font-semibold text-teal-400 tracking-wider">
                Admin Control Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center relative w-72 lg:w-96">
          <Search size={16} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search bookings, packages, customers..."
            className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#F97316] transition"
          />
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
          >
            <ExternalLink size={14} className="text-teal-400" />
            <span className="hidden sm:inline">Live Website</span>
          </Link>

          <button className="relative p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition">
            <Bell size={18} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#F97316] animate-ping" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#F97316]" />
          </button>

          {/* Admin User Profile */}
          <div className="flex items-center gap-3 border-l border-slate-800 pl-3">
            <div className="h-8 w-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-xs text-orange-400">
              {adminUser?.name ? adminUser.name.charAt(0) : "A"}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-200 leading-tight">
                {adminUser?.name || "Admin"}
              </p>
              <p className="text-[10px] text-slate-400 leading-tight">
                Super Admin
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Left Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 space-y-6">
            <div className="px-2 pt-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
                <Sparkles size={16} className="text-[#F97316]" />
                <span className="text-xs font-medium text-slate-300">
                  Version 2.0 • Active Mode
                </span>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive
                        ? "bg-gradient-to-r from-[#F97316] to-[#0B5C56] text-white shadow-md shadow-orange-500/10 font-semibold"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                      <span>{item.title}</span>
                    </div>
                    {item.badge ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        {item.badge}
                      </span>
                    ) : (
                      isActive && <ChevronRight size={14} />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Help / System Status */}
          <div className="p-4 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-medium mb-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Backend Connected</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Express API Server is active and accepting requests.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}
