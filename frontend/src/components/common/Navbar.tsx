import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <nav className="container-custom flex h-20 items-center justify-between">
            <Logo />

            <NavLinks />

            <Link
            href="/booking"
            className="hidden rounded-xl bg-[#F97316] px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#0B5C56] lg:block "
            >
                Book Now
            </Link>
        </nav>
    </header>
  );
}