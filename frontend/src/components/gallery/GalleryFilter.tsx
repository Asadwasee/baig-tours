// components/gallery/GalleryFilter.tsx
'use client';

interface Props {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  stats?: {
    domestic: number;
    international: number;
    customerMemories: number;
  };
}

const filters = [
  { key: 'all', label: 'All' },
  { key: 'domestic', label: 'Domestic Tours' },
  { key: 'international', label: 'International Tours' },
  { key: 'customer-memories', label: 'Customer Memories' },
  { key: 'videos', label: 'Videos' },
];

export default function GalleryFilter({
  selectedCategory,
  setSelectedCategory,
  stats,
}: Props) {
  return (
    <section className="-mt-8 xs:-mt-10 sm:-mt-12 relative z-20 mb-10 xs:mb-12 sm:mb-14">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl xs:rounded-3xl bg-white p-4 xs:p-5 sm:p-6 shadow-2xl ring-1 ring-gray-100">
          <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4">
            {filters.map((filter) => {
              // Count for each category
              let count = 0;
              if (stats) {
                switch (filter.key) {
                  case 'domestic': count = stats.domestic; break;
                  case 'international': count = stats.international; break;
                  case 'customer-memories': count = stats.customerMemories; break;
                  default: break;
                }
              }
              
              return (
                <button
                  key={filter.key}
                  onClick={() => setSelectedCategory(filter.key)}
                  className={`rounded-full px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base font-semibold transition-all duration-300
                    ${
                      selectedCategory === filter.key
                        ? "bg-[#0F766E] text-white shadow-lg"
                        : "bg-[#F8FAFC] text-[#1E293B] hover:bg-[#F97316] hover:text-white"
                    }`}
                >
                  {filter.label}
                  {count > 0 && (
                    <span className="ml-1 xs:ml-2 rounded-full bg-white/20 px-1.5 xs:px-2 py-0.5 text-[10px] xs:text-xs">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}