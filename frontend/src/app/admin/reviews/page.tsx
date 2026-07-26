import ReviewTable from "@/components/admin/ReviewTable";

export default function ReviewsPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Reviews
      </h1>

      <ReviewTable />

    </div>
  );
}