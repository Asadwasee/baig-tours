interface BlogDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const blogs = [
  {
    id: "1",
    title: "Top 10 Places to Visit in Hunza",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
    date: "18 July 2026",
    author: "Baig Tours",
    content: `Hunza Valley is one of the most beautiful destinations in Pakistan.
It offers breathtaking mountains, beautiful lakes, and rich culture.

Tourists from all over the world visit Hunza every year because of its
natural beauty and peaceful environment.`,
  },
  {
    id: "2",
    title: "Complete Guide to Skardu Tour",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
    date: "15 July 2026",
    author: "Baig Tours",
    content: `Skardu is famous for lakes, mountains and adventure tourism.

If you love trekking, camping and sightseeing, Skardu should definitely
be on your travel list.`,
  },
  {
    id: "3",
    title: "Why Visit Fairy Meadows?",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
    date: "10 July 2026",
    author: "Baig Tours",
    content: `Fairy Meadows offers one of the best views of Nanga Parbat.

It is an ideal destination for nature lovers, photographers and hikers.`,
  },
];

export default async function BlogDetailsPage({
  params,
}: BlogDetailsProps) {

  const { id } = await params;

  const blog = blogs.find((item) => item.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold">
          Blog Not Found
        </h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-8">

          <p className="text-gray-500 mb-2">
            {blog.date} • {blog.author}
          </p>

          <h1 className="text-4xl font-bold mb-6">
            {blog.title}
          </h1>

          <p className="text-gray-700 leading-8 whitespace-pre-line">
            {blog.content}
          </p>

        </div>
      </div>
    </main>
  );
}