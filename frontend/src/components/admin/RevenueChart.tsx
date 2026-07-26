"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
 YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", revenue: 400000 },
  { month: "Feb", revenue: 520000 },
  { month: "Mar", revenue: 700000 },
  { month: "Apr", revenue: 650000 },
  { month: "May", revenue: 900000 },
  { month: "Jun", revenue: 1100000 },
];

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#0F766E"
          strokeWidth={3}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}