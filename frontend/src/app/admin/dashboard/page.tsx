import {
  Calendar,
  DollarSign,
  Package,
  Star,
} from "lucide-react";

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import StatsCard from "@/components/admin/StatsCard";
import DashboardCharts from "@/components/admin/DashboardCharts";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="p-6 space-y-8">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatsCard
              title="Total Bookings"
              value="245"
              change="+12%"
              icon={<Calendar size={28} />}
              bgColor="bg-blue-100"
              textColor="text-blue-600"
            />

            <StatsCard
              title="Revenue"
              value="PKR 2.5M"
              change="+18%"
              icon={<DollarSign size={28} />}
              bgColor="bg-green-100"
              textColor="text-green-600"
            />

            <StatsCard
              title="Packages"
              value="18"
              change="+5%"
              icon={<Package size={28} />}
              bgColor="bg-orange-100"
              textColor="text-orange-600"
            />

            <StatsCard
              title="Reviews"
              value="135"
              change="+20%"
              icon={<Star size={28} />}
              bgColor="bg-purple-100"
              textColor="text-purple-600"
            />

          </div>

          <DashboardCharts />

        </main>

      </div>

    </div>
  );
}