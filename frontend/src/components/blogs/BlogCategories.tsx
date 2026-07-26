interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

interface BlogCategoriesProps {
  categories: Category[];
}

export default function BlogCategories({
  categories,
}: BlogCategoriesProps) {
  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-6">
        Blog Categories
      </h2>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >

            <div className="text-3xl mb-3">
              {item.icon}
            </div>

            <h3 className="font-semibold text-xl">
              {item.name}
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              {item.description}
            </p>

            <p className="text-teal-700 font-medium mt-3">
              {item.count} Blogs
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}