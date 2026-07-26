import Link from "next/link";
import { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={
          blog.featuredImage ||
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
        }
        alt={blog.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <p className="text-sm text-gray-500 mb-2">
          {new Date(blog.publishDate).toDateString()}
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          {blog.title}
        </h2>

        <p className="text-gray-600 mb-5 line-clamp-3">
          {blog.content}
        </p>

        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-block bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-lg"
        >
          Read More →
        </Link>

      </div>

    </div>
  );
}