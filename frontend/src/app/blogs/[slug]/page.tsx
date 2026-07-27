// src/app/blogs/[slug]/page.tsx

import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/services/blogService";
import { getImageUrl } from "@/utils/getImageUrl";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const imageUrl = blog.featuredImage ? getImageUrl(blog.featuredImage) : null;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-100">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
          {blog.category && (
            <span className="bg-teal-50 text-[#0F766E] border border-teal-200 px-3 py-1 rounded-full font-medium text-xs">
              {typeof blog.category === "object" ? blog.category.name : blog.category}
            </span>
          )}
          {blog.publishDate && (
            <span>
              {new Date(blog.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          {blog.title}
        </h1>

        {blog.author && (
          <p className="text-sm text-slate-600 mb-6">
            By{" "}
            <span className="font-semibold text-slate-800">
              {typeof blog.author === "object" ? blog.author.name : blog.author}
            </span>
          </p>
        )}

        {imageUrl && (
          <div className="relative h-[280px] sm:h-[400px] md:h-[480px] w-full overflow-hidden rounded-xl mb-8">
            <Image
              src={imageUrl}
              alt={blog.title || "Blog Image"}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-teal max-w-none text-slate-700 leading-relaxed">
          {blog.content?.includes("<") ? (
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          ) : (
            <p className="whitespace-pre-line text-lg text-slate-700 leading-8">
              {blog.content}
            </p>
          )}
        </div>
      </article>
    </main>
  );
}