import BlogCard from "@/components/cards/BlogCard";

const blogs = [
  {
    id: "1",
    title: "Top 10 Places to Visit in Hunza",
    description:
      "Discover the breathtaking beauty of Hunza Valley and explore its amazing tourist attractions.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    date: "18 July 2026",
  },
  {
    id: "2",
    title: "Complete Guide to Skardu",
    description:
      "Everything you need to know before planning your Skardu adventure.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    date: "15 July 2026",
  },
  {
    id: "3",
    title: "Why Visit Fairy Meadows?",
    description:
      "Experience one of Pakistan's most beautiful destinations with this complete travel guide.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    date: "10 July 2026",
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-bold text-center mb-3">
          Travel Blogs
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Explore travel stories and destination guides.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </main>
  );
}