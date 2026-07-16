import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="absolute inset-0 z-20 flex items-center">
      <div className="container-custom">
        <div className="max-w-3xl text-white">
          <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            ✈ Trusted Travel Partner
          </span>

          <h1 className="mt-6 font-[var(--font-poppins)] text-5xl font-bold leading-tight lg:text-7xl">
            Domestic & International
            <br />
            Tour Packages
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
            Explore breathtaking destinations across Pakistan and
            exciting international locations including Dubai,
            Turkey, Thailand, Malaysia and Azerbaijan with Baig Tours.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/packages"
              className="rounded-xl bg-[#F97316] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56]"
            >
              View Tour Packages
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#0F766E]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}