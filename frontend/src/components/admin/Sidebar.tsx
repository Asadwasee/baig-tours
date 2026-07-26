"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  CalendarCheck,
  FileText,
  Image,
  Star,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Packages",
    href: "/admin/packages",
    icon: Package,
  },
  {
    title: "Bookings",
    href: "/admin/booking",
    icon: CalendarCheck,
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-[#0B5C56] text-white shadow-xl">

      <div className="border-b border-white/20 p-6">

        <h1 className="text-2xl font-bold">
          Baig Tours
        </h1>

        <p className="text-sm text-gray-200">
          Admin Panel
        </p>

      </div>

      <nav className="mt-6 flex flex-col gap-2 px-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition

                ${
                  active
                    ? "bg-[#F97316] text-white"
                    : "hover:bg-white/10"
                }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>

            </Link>
          );
        })}
      </nav>
    </aside>
  );
}