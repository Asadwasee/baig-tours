import Link from "next/link";
import BlogCard from "./BlogCard";
import { blogs } from "@/constants/blogs";

export default function LatestBlogs() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom">

       {/* Section Header */}

<div className="mx-auto mb-14 max-w-3xl text-center">

  <span className="font-semibold uppercase tracking-wider text-[#F97316]">
    Travel Blog
  </span>

  <h2 className="mt-4 text-4xl font-bold text-[#1E293B]">
    Latest Travel Tips & Guides
  </h2>

  <p className="mt-5 text-slate-600">
    Stay informed with expert travel guides, visa updates, destination
    recommendations, and practical tips to make every journey smoother.
  </p>

</div>
        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center rounded-xl bg-[#F97316] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#0B5C56] hover:scale-105"
          >
            View All Blogs
          </Link>
        </div>

      </div>
    </section>
  );
}