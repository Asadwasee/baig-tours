import BlogCard from "@/components/cards/BlogCard";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  featuredImage: string;
  content: string;
  publishDate: string;
}

interface BlogListProps {
  blogs: Blog[];
}


export default function BlogList({ blogs }: BlogListProps) {

  return (
    <section>

      <h2 className="text-3xl font-bold mb-6">
        Latest Blogs
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