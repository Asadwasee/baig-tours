"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import Logo from "./Logo";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">

        <nav className="container-custom flex h-20 items-center justify-between">

          <Logo />

          {/* Desktop Navigation */}

          <NavLinks />

          {/* Desktop CTA */}

          <Link
            href="/booking"
            className="hidden rounded-xl bg-[#F97316] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#0B5C56] lg:block"
          >
            Book Now
          </Link>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg p-2 text-[#1E293B] transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={28} />
          </button>

        </nav>

      </header>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}

        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/50"
        />

        {/* Sidebar */}

        <aside
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-200 p-5">

            <Logo />

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 transition hover:bg-slate-100"
            >
              <X size={24} />
            </button>

          </div>

          {/* Navigation */}

          <NavLinks
            mobile
            onLinkClick={() => setIsOpen(false)}
          />

          {/* CTA */}

          <div className="border-t border-slate-200 p-6">

            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl bg-[#F97316] py-3 text-center font-semibold text-white transition hover:bg-[#0B5C56]"
            >
              Book Now
            </Link>

          </div>

        </aside>
      </div>
    </>
  );
}