import {
  MapPin,
  Phone,
  Mail,
  Clock3,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-8">

      <div>
        <span className="font-semibold uppercase tracking-wider text-[#F97316]">
          Contact Information
        </span>

        <h2 className="mt-2 font-[var(--font-poppins)] text-4xl font-bold text-[#1E293B]">
          Get In Touch
        </h2>

        <p className="mt-4 text-gray-600">
          Feel free to contact us regarding tours, bookings or any travel
          related information.
        </p>
      </div>

      <div className="space-y-6">

        <InfoCard
          icon={<MapPin size={22} />}
          title="Office Address"
          value="Main Shahrah-e-Faisal, Karachi, Pakistan"
        />

        <InfoCard
          icon={<Phone size={22} />}
          title="Phone"
          value="+92 300 1234567"
        />

        <InfoCard
          icon={<Mail size={22} />}
          title="Email"
          value="info@baigtours.com"
        />

        <InfoCard
          icon={<Clock3 size={22} />}
          title="Office Hours"
          value="Mon - Sat : 9:00 AM - 6:00 PM"
        />

      </div>
    </div>
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
    <div className="flex items-start gap-5 rounded-2xl bg-gray-50 p-6 shadow-sm">

      <div className="rounded-xl bg-[#0F766E]/10 p-3 text-[#0F766E]">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-[#1E293B]">
          {title}
        </h3>

        <p className="mt-1 text-gray-600">
          {value}
        </p>
      </div>

    </div>
  );
}