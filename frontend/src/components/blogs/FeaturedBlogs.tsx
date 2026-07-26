import BlogCard from "@/components/cards/BlogCard";

interface Blog {
  _id: string;
  title: string;
  content: string;
  featuredImage: string;
  publishDate: string;
  slug: string;
}

interface FeaturedBlogsProps {
  blogs: Blog[];
}

export default function FeaturedBlogs({ blogs }: FeaturedBlogsProps) {
  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-6">
        Featured Blogs
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
          />
        ))}

      </div>

    </section>
  );
}