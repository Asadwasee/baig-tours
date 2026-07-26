import { redirect } from "next/navigation";
import BookingForm from "@/components/booking/BookingForm";

interface BookingPageProps {
  searchParams: Promise<{
    package?: string;
  }>;
}

export default async function BookingPage({
  searchParams,
}: BookingPageProps) {
  const params = await searchParams;
  const packageId = params.package || "";

  if (!packageId) {
    redirect("/packages");
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <BookingForm packageId={packageId} />
      </div>
    </section>
  );
}