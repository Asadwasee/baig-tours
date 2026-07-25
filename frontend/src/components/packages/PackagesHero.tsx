// components/packages/PackagesHero.tsx
import Link from "next/link";

export default function PackagesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0F766E] to-[#0B5C56] py-16 xs:py-20 sm:py-24 text-white">

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#F97316] blur-3xl" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-4 xs:mb-5 sm:mb-6 flex items-center gap-2 text-xs xs:text-sm text-white/80">
          <Link href="/" className="transition hover:text-[#FBBF24]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#FBBF24]">Tour Packages</span>
        </div>

        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-white/10 px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-semibold backdrop-blur">
            Explore Pakistan & Beyond
          </span>

          <h1 className="mt-4 xs:mt-5 sm:mt-6 font-[var(--font-poppins)] text-3xl xs:text-4xl sm:text-5xl font-bold leading-tight">
            Discover Your Next
            <span className="block text-[#FBBF24]">Dream Destination</span>
          </h1>

          <p className="mt-3 xs:mt-4 sm:mt-6 max-w-2xl text-base xs:text-lg leading-7 xs:leading-8 text-white/90">
            Browse our carefully selected domestic and international tour
            packages. Whether you're looking for adventure, family vacations,
            honeymoon trips, or group tours, Baig Tours has the perfect journey
            waiting for you.
          </p>
        </div>

      </div>
    </section>
  );
}