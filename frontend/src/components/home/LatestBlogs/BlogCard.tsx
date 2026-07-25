import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
}

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-64 overflow-hidden">

        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-5 top-5 rounded-full bg-[#0F766E] px-4 py-2 text-xs font-semibold text-white">
          {blog.category}
        </span>

      </div>

      {/* Content */}
      <div className="p-6">

        {/* Meta */}
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">

          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {blog.date}
          </span>

          <span className="flex items-center gap-1">
            <User size={16} />
            {blog.author}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={16} />
            {blog.readTime}
          </span>

        </div>

        {/* Title */}
        <h3 className="mb-4 font-[var(--font-poppins)] text-2xl font-semibold text-[#1E293B] transition-colors duration-300 group-hover:text-[#0F766E]">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-6 leading-7 text-gray-600">
          {blog.excerpt}
        </p>

        {/* Read More */}
        <Link
          href={`/blogs/${blog.id}`}
          className="inline-flex items-center gap-2 font-semibold text-[#F97316] transition-all duration-300 hover:gap-3 hover:text-[#0B5C56]"
        >
          Read More
          <ArrowRight size={18} />
        </Link>

      </div>
    </article>
  );
}