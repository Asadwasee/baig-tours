"use client";

import MonthlyBookingChart from "./MonthlyBookingChart";
import RevenueChart from "./RevenueChart";
import PopularDestinationChart from "./PopularDestinationChart";

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          Monthly Bookings
        </h2>

        <MonthlyBookingChart />
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          Revenue
        </h2>

        <RevenueChart />
      </div>

      <div className="xl:col-span-2 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          Popular Destinations
        </h2>

        <PopularDestinationChart />
      </div>

    </div>
  );
}