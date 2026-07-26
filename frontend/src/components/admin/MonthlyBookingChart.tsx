"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", bookings: 20 },
  { month: "Feb", bookings: 35 },
  { month: "Mar", bookings: 28 },
  { month: "Apr", bookings: 45 },
  { month: "May", bookings: 60 },
  { month: "Jun", bookings: 52 },
];

export default function MonthlyBookingChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="bookings"
          fill="#F97316"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}