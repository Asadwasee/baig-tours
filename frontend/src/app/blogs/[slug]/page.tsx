import { getBlogBySlug } from "@/services/blogService";


export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

 const blog = await getBlogBySlug(slug);

console.log("SLUG:", slug);
console.log("BLOG:", blog);


  return (
    <main className="min-h-screen bg-gray-50 py-12">

      <article className="max-w-4xl mx-auto bg-white rounded-xl p-8">

        <h1 className="text-4xl font-bold mb-5">
          {blog.title}
        </h1>

        <p className="text-gray-600">
          {blog.content}
        </p>

      </article>

    </main>
  );
}