import Link from "next/link";

export default function GalleryHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0F766E] to-[#0B5C56] py-24 text-white">

      {/* Background Decorations */}

      <div className="absolute inset-0 opacity-10">

        <div className="absolute -left-24 top-8 h-80 w-80 rounded-full bg-white blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#F97316] blur-3xl" />

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
            Gallery
          </span>

        </div>

        <div className="max-w-3xl">

          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            Explore Our Travel Memories
          </span>

          <h1 className="mt-6 font-[var(--font-poppins)] text-5xl font-bold leading-tight">

            Journey Through

            <span className="block text-[#FBBF24]">
              Our Gallery
            </span>

          </h1>

          <p className="mt-6 text-lg leading-8 text-white/90">

            Discover breathtaking destinations, unforgettable adventures,
            international tours, and cherished customer memories captured
            during every Baig Tours experience.

          </p>

        </div>

      </div>

    </section>
  );
}