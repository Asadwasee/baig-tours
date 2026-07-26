import GalleryTable from "@/components/admin/GalleryTable";

export default function GalleryPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Gallery
        </h1>

        <button className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600">
          Upload Images
        </button>

      </div>

      <GalleryTable />

    </div>
  );
}