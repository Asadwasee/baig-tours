"use client";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const filters = [
  "All",
  "Domestic Tours",
  "International Tours",
  "Customer Memories",
  "Videos",
];

export default function GalleryFilter({
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <section className="-mt-12 relative z-20 mb-14">
      <div className="container-custom">

        <div className="rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-gray-100">

          <div className="flex flex-wrap justify-center gap-4">

            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedCategory(filter)}
                className={`rounded-full px-6 py-3 font-semibold transition-all duration-300
                  ${
                    selectedCategory === filter
                      ? "bg-[#0F766E] text-white shadow-lg"
                      : "bg-[#F8FAFC] text-[#1E293B] hover:bg-[#F97316] hover:text-white"
                  }`}
              >
                {filter}
              </button>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}