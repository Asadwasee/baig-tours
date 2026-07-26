import BookingTable from "@/components/admin/BookingTable";

export default function BookingPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Bookings
      </h1>

      <BookingTable />

    </div>
  );
}