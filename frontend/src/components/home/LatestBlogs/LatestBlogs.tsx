import Link from "next/link";
import BlogCard from "./BlogCard";
import { blogs } from "@/constants/blogs";

export default function LatestBlogs() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-10 xs:mb-12 sm:mb-14 max-w-3xl text-center">

          <span className="text-xs xs:text-sm sm:text-base font-semibold uppercase tracking-wider text-[#F97316]">
            Travel Blog
          </span>

          <h2 className="mt-2 xs:mt-3 sm:mt-4 text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1E293B]">
            Latest Travel Tips & Guides
          </h2>

          <p className="mt-3 xs:mt-4 sm:mt-5 text-sm xs:text-base text-slate-600 px-2 xs:px-4">
            Stay informed with expert travel guides, visa updates, destination
            recommendations, and practical tips to make every journey smoother.
          </p>

        </div>

        {/* Blog Grid */}
        <div className="grid gap-4 xs:gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 xs:mt-12 sm:mt-14 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center rounded-xl bg-[#F97316] px-6 xs:px-7 sm:px-8 py-3 xs:py-3.5 sm:py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] hover:scale-105 text-sm xs:text-base"
          >
            View All Blogs
          </Link>
        </div>

      </div>
    </section>
  );
}