export default function GoogleMap() {
  return (
    <section className="py-12 bg-[#F8FAFC]">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl shadow-lg border border-slate-200">
          <iframe
            title="Baig Tours Location - Lahore, Pakistan"
            src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"
            className="h-[400px] xs:h-[450px] sm:h-[500px] w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}