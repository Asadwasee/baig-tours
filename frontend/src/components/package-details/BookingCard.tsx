import {
  CalendarDays,
  Clock3,
  Users,
  MapPin,
  Phone,
} from "lucide-react";

export default function BookingCard() {
  return (
    <aside className="sticky top-28 rounded-3xl bg-white p-7 shadow-xl">

      {/* Price */}

      <div>

        <p className="text-lg text-gray-400 line-through">
          PKR 80,000
        </p>

        <h2 className="font-[var(--font-poppins)] text-5xl font-bold text-[#F97316]">

          PKR 65,000

        </h2>

        <p className="mt-1 text-gray-500">
          Per Person
        </p>

      </div>

      {/* Discount */}

      <div className="mt-5 inline-flex rounded-full bg-orange-100 px-4 py-2 font-semibold text-[#F97316]">

        Save 20%

      </div>

      <hr className="my-7" />

      {/* Information */}

      <div className="space-y-5">

        <Info
          icon={<Clock3 size={18} />}
          label="Duration"
          value="7 Days / 6 Nights"
        />

        <Info
          icon={<CalendarDays size={18} />}
          label="Departure"
          value="15 Aug 2026"
        />

        <Info
          icon={<CalendarDays size={18} />}
          label="Return"
          value="21 Aug 2026"
        />

        <Info
          icon={<Users size={18} />}
          label="Seats Left"
          value="8 Available"
        />

        <Info
          icon={<MapPin size={18} />}
          label="Pickup"
          value="Islamabad"
        />

      </div>

      {/* Buttons */}

      <button className="mt-8 w-full rounded-xl bg-[#F97316] py-4 font-semibold text-white transition hover:bg-[#0B5C56]">

        Book Now

      </button>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0F766E] py-4 font-semibold text-[#0F766E] transition hover:bg-[#0F766E] hover:text-white">

        <Phone size={18} />

        WhatsApp Inquiry

      </button>

    </aside>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-1 rounded-lg bg-[#0F766E]/10 p-2 text-[#0F766E]">

        {icon}

      </div>

      <div>

        <p className="text-sm text-gray-500">
          {label}
        </p>

        <p className="font-semibold text-[#1E293B]">
          {value}
        </p>

      </div>

    </div>
  );
}