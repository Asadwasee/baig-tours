import Link from "next/link";

export default function PackagesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0F766E] to-[#0B5C56] py-24 text-white">

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#F97316] blur-3xl" />
      </div>

      <div className="container-custom relative z-10">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-white/80">

          <Link
            href="/"
            className="transition hover:text-[#FBBF24]"
          >
            Home
          </Link>

          <span>/</span>

          <span className="text-[#FBBF24]">
            Tour Packages
          </span>

        </div>

        <div className="max-w-3xl">

          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            Explore Pakistan & Beyond
          </span>

          <h1 className="mt-6 font-[var(--font-poppins)] text-5xl font-bold leading-tight">

            Discover Your Next

            <span className="block text-[#FBBF24]">
              Dream Destination
            </span>

          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">

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