import {
  MapPin,
  BedDouble,
  Bus,
  UtensilsCrossed,
  Mountain,
} from "lucide-react";

export default function TourOverview() {
  return (
    <section className="py-16 bg-[#F8FAFC]">

      <div className="container-custom">

        {/* Heading */}

        <div className="mb-10">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Tour Overview
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Everything You Need To Know
          </h2>

        </div>

        {/* Quick Information */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

          <InfoCard
            icon={<Mountain size={24} />}
            title="Tour Type"
            value="Adventure Tour"
          />

          <InfoCard
            icon={<MapPin size={24} />}
            title="Destination"
            value="Hunza Valley"
          />

          <InfoCard
            icon={<BedDouble size={24} />}
            title="Hotel"
            value="4 Star Hotels"
          />

          <InfoCard
            icon={<Bus size={24} />}
            title="Transport"
            value="Luxury AC Bus"
          />

          <InfoCard
            icon={<UtensilsCrossed size={24} />}
            title="Meals"
            value="Breakfast & Dinner"
          />

        </div>

        {/* Description */}

        <div className="mt-14 rounded-3xl bg-white p-8 shadow-md">

          <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
            Tour Description
          </h3>

          <p className="mt-6 leading-8 text-gray-600">

            Experience the breathtaking beauty of Hunza Valley with Baig Tours.
            Explore Attabad Lake, Passu Cones, Khunjerab Pass, Baltit Fort,
            Altit Fort, Eagle Nest, local markets, and magnificent mountain
            landscapes. Stay in comfortable hotels, travel in luxury transport,
            and enjoy a carefully planned itinerary designed for families,
            couples, and adventure lovers.

          </p>

        </div>

      </div>

    </section>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E]">

        {icon}

      </div>

      <h4 className="mt-5 font-semibold text-[#1E293B]">

        {title}

      </h4>

      <p className="mt-2 text-gray-600">

        {value}

      </p>

    </div>
  );
}