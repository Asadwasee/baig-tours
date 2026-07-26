import PackageTable from "@/components/admin/PackageTable";

export default function PackagesPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Packages
        </h1>

        <button className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600">
          Add Package
        </button>

      </div>

      <PackageTable />

    </div>
  );
}