import Link from "next/link";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Blog Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-2">
          {blog.date}
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          {blog.title}
        </h2>

        <p className="text-gray-600 mb-5 line-clamp-3">
          {blog.description}
        </p>

        <Link
          href={`/blogs/${blog.id}`}
          className="inline-block bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-lg transition"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}