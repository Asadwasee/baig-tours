// src/components/cards/BlogCard.tsx

import Image from "next/image";
import Link from "next/link";
import { stripHtml } from "@/utils/stripHtml";
import { getImageUrl } from "@/utils/getImageUrl";

export default function BlogCard({ blog }: { blog: any }) {
  // HTML tags ko strip karke clean 120-character summary banayein
  const cleanDescription = stripHtml(blog.content || "").slice(0, 120) + "...";
  const imageUrl = blog.featuredImage ? getImageUrl(blog.featuredImage) : "/images/placeholder.jpg";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={blog.title || "Blog Post"}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
          {blog.title}
        </h3>

        {/* Cleaned text - Ab tag nazar nahi aayega */}
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
          {cleanDescription}
        </p>

        <Link
          href={`/blogs/${blog.slug}`}
          className="text-teal-700 font-semibold text-sm hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}