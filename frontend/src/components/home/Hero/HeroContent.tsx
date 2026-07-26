import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="absolute inset-0 z-20">

      <div className="container-custom flex h-full items-center">

        <div className="max-w-3xl -translate-y-8 sm:-translate-y-4 lg:translate-y-0 animate-fadeIn">

          {/* Badge */}

          <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-md sm:text-sm">
            ✈ Trusted Travel Partner
          </span>

          {/* Heading */}

          <h1 className="mt-6 font-[var(--font-poppins)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">

            Domestic & International

            <br />

            Tour Packages

          </h1>

          {/* Paragraph */}

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg sm:leading-8">

            Explore breathtaking destinations across Pakistan and exciting
            international locations including Dubai, Turkey, Thailand,
            Malaysia and Azerbaijan with Baig Tours.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              href="/packages"
              className="rounded-xl bg-[#F97316] px-8 py-4 text-center font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#0B5C56]"
            >
              View Tour Packages
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white px-8 py-4 text-center font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#0F766E]"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}