import BlogTable from "@/components/admin/BlogTable";

export default function BlogsPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Blogs
        </h1>

        <button className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600">
          Add Blog
        </button>

      </div>

      <BlogTable />

    </div>
  );
}