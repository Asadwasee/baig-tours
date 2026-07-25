import PackagesHero from "@/components/packages/PackagesHero";
import SearchSection from "@/components/packages/SearchSection";
import FilterSidebar from "@/components/packages/FilterSidebar";
import SortBar from "@/components/packages/SortBar";
import PackageGrid from "@/components/packages/PackageGrid";

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <PackagesHero />

      {/* Search */}
      <SearchSection />

      {/* Packages */}
      <section className="pb-20">
        <div className="container-custom">

          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">

            {/* Left Sidebar */}
            <aside>
              <FilterSidebar />
            </aside>

            {/* Right Content */}
            <div>

              <SortBar />

              <PackageGrid />

            </div>

          </div>

        </div>
      </section>
    </>
  );
}