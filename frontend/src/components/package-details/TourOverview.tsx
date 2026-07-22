import {
  MapPin,
  BedDouble,
  Bus,
  UtensilsCrossed,
  Mountain,
  Clock3,
} from "lucide-react";

export default function TourOverview() {
  return (
    <section className="bg-[#F8FAFC] py-20">

      <div className="container-custom">

        {/* Heading */}

        <div className="max-w-3xl">

          <span className="font-semibold uppercase tracking-wider text-[#F97316]">
            Tour Overview
          </span>

          <h2 className="mt-3 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
            Everything You Need To Know
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Discover the beauty of Hunza Valley through a carefully designed
            itinerary featuring breathtaking landscapes, comfortable
            accommodation, luxury transport, and unforgettable experiences.
          </p>

        </div>

        {/* Overview Cards */}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          <InfoCard
            icon={<Mountain size={22} />}
            title="Tour Type"
            value="Adventure Tour"
          />

          <InfoCard
            icon={<MapPin size={22} />}
            title="Destination"
            value="Hunza Valley"
          />

          <InfoCard
            icon={<Clock3 size={22} />}
            title="Duration"
            value="7 Days / 6 Nights"
          />

          <InfoCard
            icon={<BedDouble size={22} />}
            title="Accommodation"
            value="4-Star Hotels"
          />

          <InfoCard
            icon={<Bus size={22} />}
            title="Transport"
            value="Luxury AC Bus"
          />

          <InfoCard
            icon={<UtensilsCrossed size={22} />}
            title="Meals"
            value="Breakfast & Dinner"
          />

        </div>

        {/* Description */}

        <div className="mt-14 rounded-3xl bg-white p-8 shadow-md">

          <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1E293B]">
            About This Tour
          </h3>

          <p className="mt-6 leading-8 text-gray-600">

            Experience the breathtaking beauty of Hunza Valley with Baig Tours.
            Visit Attabad Lake, Passu Cones, Baltit Fort, Altit Fort, Eagle
            Nest, Khunjerab Pass, and many other iconic attractions. Enjoy
            luxury transportation, comfortable accommodation, delicious meals,
            and a professionally planned itinerary designed for families,
            couples, solo travelers, and adventure enthusiasts.

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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/20 hover:shadow-lg">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E]">

        {icon}

      </div>

      <p className="mt-5 text-sm text-gray-500">
        {title}
      </p>

      <h4 className="mt-1 font-semibold text-[#1E293B]">
        {value}
      </h4>

    </div>
  );
}