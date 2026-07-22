import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0F766E] to-[#0B5C56] py-24 text-white">

      {/* Background Decoration */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#F97316]/20 blur-3xl" />

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
            About Us
          </span>

        </div>

        <div className="max-w-3xl">

  <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
    Discover Our Story
  </span>

  <h1 className="mt-6 font-[var(--font-poppins)] text-5xl font-bold leading-tight">
    Passionate About Creating

    <span className="block text-[#FBBF24]">
      Unforgettable Journeys
    </span>
  </h1>

  <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
    Baig Tours has been helping travelers explore Pakistan and the world through carefully planned tours, exceptional hospitality, and unforgettable travel experiences. Every journey is designed to be safe, comfortable, and memorable.
  </p>

</div>

      </div>

    </section>
  );
}