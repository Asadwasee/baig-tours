// components/package-details/BookingCard.tsx
import {
  CalendarDays,
  Clock3,
  Users,
  MapPin,
  Phone,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import { Package } from "@/types/package";

interface BookingCardProps {
  packageData: Package;
}

export default function BookingCard({ packageData }: BookingCardProps) {

  const originalPrice = packageData.discountPrice ? packageData.price : null;
  const finalPrice = packageData.discountPrice || packageData.price;
  const discount = originalPrice ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

  return (
    <aside className="sticky top-28 rounded-[28px] border border-gray-100 bg-white p-6 shadow-lg">
      {/* Price */}
      <div>
        {originalPrice && (
          <p className="text-sm text-gray-400 line-through">
            PKR {originalPrice.toLocaleString()}
          </p>
        )}
        <div className="mt-1 flex items-end gap-2">
          <h2 className="font-[var(--font-poppins)] text-4xl font-bold text-[#F97316]">
            PKR {finalPrice.toLocaleString()}
          </h2>
          <span className="mb-1 text-sm text-gray-500">/person</span>
        </div>
        {discount > 0 && (
          <div className="mt-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-[#F97316]">
            Save {discount}%
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="mt-6 space-y-3 rounded-2xl bg-[#F8FAFC] p-4">
        <TrustItem icon={<ShieldCheck size={18} />} text="Instant Confirmation" />
        <TrustItem icon={<BadgeCheck size={18} />} text="Best Price Guarantee" />
      </div>

      {/* Tour Info */}
      <div className="mt-6 space-y-4">
        <Info icon={<Clock3 size={18} />} label="Duration" value={packageData.duration || 'N/A'} />
        <Info icon={<CalendarDays size={18} />} label="Departure" value={packageData.departureDate ? new Date(packageData.departureDate).toLocaleDateString() : 'Flexible'} />
        <Info icon={<CalendarDays size={18} />} label="Return" value={packageData.returnDate ? new Date(packageData.returnDate).toLocaleDateString() : 'Flexible'} />
        <Info icon={<Users size={18} />} label="Seats" value={`${packageData.availableSeats ?? 'Limited'} Available`} />
        <Info icon={<MapPin size={18} />} label="Pickup" value={packageData.pickupLocation || 'Islamabad'} />
      </div>

      {/* Buttons */}
      <Link href={`/booking?package=${packageData._id}`}>
   
        <button 
        className="mt-8 w-full rounded-xl bg-[#F97316] py-3.5 font-semibold text-white transition duration-300 hover:bg-[#0B5C56]">
          Book Now
        </button>
      </Link>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#0F766E] py-3.5 font-semibold text-[#0F766E] transition duration-300 hover:bg-[#0F766E] hover:text-white">
        <Phone size={18} />
        WhatsApp Inquiry
      </button>
    </aside>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-[#1E293B]">
      <div className="rounded-lg bg-[#0F766E]/10 p-2 text-[#0F766E]">{icon}</div>
      <span>{text}</span>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#0F766E]/10 p-2 text-[#0F766E]">{icon}</div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <span className="text-sm font-semibold text-[#1E293B]">{value}</span>
    </div>
  );
}