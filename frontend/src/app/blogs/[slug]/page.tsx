import { getBlogBySlug } from "@/services/blogService";


export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  return (
    <main>
      <h1>{blog.title}</h1>
    </main>
  );
}