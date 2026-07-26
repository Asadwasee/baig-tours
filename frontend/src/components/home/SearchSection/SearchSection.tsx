import SearchForm from "./SearchForm";

export default function SearchSection() {
  return (
    <section className="bg-[#F8FAFC] py-14 sm:py-16 lg:py-20">
      <div className="container-custom">

        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">

          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F97316]">
            Find Your Next Journey
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-3xl font-bold text-[#1E293B] sm:text-4xl lg:text-5xl">
            Search Your Perfect Tour
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Discover domestic and international tour packages tailored to your
            travel preferences. Search by destination, package, category,
            departure date, price and duration.
          </p>

        </div>

        <SearchForm />

      </div>
    </section>
  );
}