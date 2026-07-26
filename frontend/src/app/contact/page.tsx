import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import GoogleMap from "@/components/contact/GoogleMap";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="container-custom py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>

      <GoogleMap />
    </>
  );
}