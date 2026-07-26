export default function GoogleMap() {
  return (
    <section className="py-16">

      <div className="container-custom">

        <iframe
          title="Baig Tours Location"
          src="https://www.google.com/maps?q=Karachi&output=embed"
          className="h-[500px] w-full rounded-3xl shadow-lg"
          loading="lazy"
        />

      </div>

    </section>
  );
}