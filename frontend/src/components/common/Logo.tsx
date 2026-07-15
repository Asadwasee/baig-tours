import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-opacity hover:scale-105"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F766E] text-xl font-bold text-white">
        B
      </div>

      <div>
        <h1 className="font-[var(--font-poppins)] text-xl font-bold text-[#1E293B]">
          Baig Tours
        </h1>

        <p className="text-xs text-gray-500">
          Tour & Travel
        </p>
      </div>
    </Link>
  );
}