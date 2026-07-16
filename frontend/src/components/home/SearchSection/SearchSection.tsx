import SearchForm from "./SearchForm";

export default function SearchSection() {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container-custom">

        <div className="mx-auto mb-12 max-w-2xl text-center">

          <span className="font-medium text-[#F97316]">
            FIND YOUR NEXT JOURNEY
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Search Your Perfect Tour
          </h2>

          <p className="mt-4 text-slate-600">
            Discover domestic and international tour packages tailored to your
            travel preferences. Search by destination, package, category,
            departure date, price, and duration.
          </p>

        </div>

        <SearchForm />

      </div>
    </section>
  );
}