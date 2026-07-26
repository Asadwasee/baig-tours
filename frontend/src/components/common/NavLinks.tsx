"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants/navigation";

interface NavLinksProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({
  mobile = false,
  onLinkClick,
}: NavLinksProps) {

  const pathname = usePathname();

  if (mobile) {
    return (
      <ul className="flex flex-col px-6 py-5">

        {NAV_LINKS.map((item) => (

          <li key={item.title}>

            <Link
              href={item.href}
              onClick={onLinkClick}
              className={`block rounded-xl px-4 py-4 text-base transition ${
                pathname === item.href
                  ? "bg-[#0F766E]/10 font-semibold text-[#0F766E]"
                  : "text-[#1E293B] hover:bg-slate-100"
              }`}
            >
              {item.title}
            </Link>

          </li>

        ))}

      </ul>
    );
  }

  return (
    <ul className="hidden items-center gap-10 lg:flex">

      {NAV_LINKS.map((item) => (

        <li key={item.title}>

          <Link
            href={item.href}
            className={`font-medium transition-colors ${
              pathname === item.href
                ? "font-semibold text-[#0F766E]"
                : "text-[#1E293B] hover:text-[#0F766E]"
            }`}
          >
            {item.title}
          </Link>

        </li>

      ))}

    </ul>
  );
}