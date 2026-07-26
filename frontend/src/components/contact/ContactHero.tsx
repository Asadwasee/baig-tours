export default function ContactHero() {
  return (
    <section className="relative flex h-[350px] items-center justify-center bg-[url('/assets/contact/contact-banner.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center text-white">
        <h1 className="font-[var(--font-poppins)] text-5xl font-bold">
          Contact Us
        </h1>

        <p className="mt-4 text-lg text-gray-200">
          We'd love to hear from you. Get in touch with Baig Tours.
        </p>
      </div>
    </section>
  );
}