import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

import { Blog } from "@/services/blog";

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-48 xs:h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden">

        <Image
          src={blog.featuredImage}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-3 xs:left-4 sm:left-5 top-3 xs:top-4 sm:top-5 rounded-full bg-[#0F766E] px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-[10px] xs:text-xs sm:text-xs font-semibold text-white">
          {blog.category.replace(/-/g, " ")}
        </span>

      </div>

      {/* Content */}
      <div className="p-4 xs:p-5 sm:p-6">

        {/* Meta */}
        <div className="mb-3 xs:mb-3.5 sm:mb-4 flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 text-[10px] xs:text-xs sm:text-sm text-gray-500">

          <span className="flex items-center gap-1">
            <Calendar size={14} className="xs:w-[16px] xs:h-[16px]" />
            {new Date(blog.publishDate).toLocaleDateString()}
          </span>

          <span className="flex items-center gap-1">
            <User size={14} className="xs:w-[16px] xs:h-[16px]" />
            {blog.author}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} className="xs:w-[16px] xs:h-[16px]" />
            {blog.readTime} min read
          </span>

        </div>

        {/* Title */}
        <h3 className="mb-2 xs:mb-3 sm:mb-4 font-[var(--font-poppins)] text-lg xs:text-xl sm:text-2xl font-semibold text-[#1E293B] transition-colors duration-300 group-hover:text-[#0F766E] line-clamp-2">
          {blog.title}
        </h3>

        <p className="mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base leading-6 xs:leading-7 text-gray-600 line-clamp-3 xs:line-clamp-none">
  {blog.summary ||
    blog.content.replace(/<[^>]*>/g, "").substring(0, 120) + "..."}
</p>

        {/* Read More */}
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center gap-1.5 xs:gap-2 font-semibold text-[#F97316] transition-all duration-300 hover:gap-3 hover:text-[#0B5C56] text-sm xs:text-base"
        >
          Read More
          <ArrowRight size={16} className="xs:w-[18px] xs:h-[18px]" />
        </Link>

      </div>
    </article>
  );
}