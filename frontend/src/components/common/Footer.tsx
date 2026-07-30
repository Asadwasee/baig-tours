"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { QUICK_LINKS, TOUR_CATEGORIES } from "@/constants/footer";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="mt-20 overflow-hidden rounded-t-3xl border-t border-[#0F766E] bg-[#0B5C56] text-white">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <h2 className="mb-4 text-3xl font-bold">
              <span className="text-[#F97316]">Baig</span> Tours
            </h2>

            <p className="text-sm leading-7 text-gray-300">
              Discover breathtaking destinations across Pakistan and exciting
              international tours with Baig Tours. We deliver safe,
              affordable, and unforgettable travel experiences backed by
              professional planning and exceptional customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="mb-5 h-1 w-12 rounded bg-[#F97316]" />

            <ul className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-gray-300 transition-colors duration-300 hover:text-[#F97316]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Categories */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Tour Categories
            </h3>

            <div className="mb-5 h-1 w-12 rounded bg-[#F97316]" />

            <ul className="space-y-3">
              {TOUR_CATEGORIES.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-gray-300 transition-colors duration-300 hover:text-[#F97316]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Contact Information
            </h3>

            <div className="mb-5 h-1 w-12 rounded bg-[#F97316]" />

            <div className="space-y-4 text-gray-300">

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#F97316]" />
                <span>Lahore, Pakistan</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#F97316]" />
                <span>+92 300 1234567</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#F97316]" />
                <span>info@baigtours.com</span>
              </div>

            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="mb-4 font-semibold text-white">
                Follow Us
              </h4>

              <div className="flex gap-4">

                <a
                  href="https://www.instagram.com/baigtour_pakistan_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-3 transition-all duration-300 hover:bg-[#F97316]"
                >
                  <FaInstagram size={18} />
                </a>

                <a
                  href="https://www.tiktok.com/@baigtourspakistan1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-3 transition-all duration-300 hover:bg-[#F97316]"
                >
                  <FaTiktok size={18} />
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-white">Baig Tours</span>. All Rights Reserved.
          </p>

          <p className="mt-2">
            Designed for unforgettable travel experiences.
          </p>
        </div>
      </Container>
    </footer>
  );
}