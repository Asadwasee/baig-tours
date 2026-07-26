"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Hunza",
    value: 40,
  },
  {
    name: "Skardu",
    value: 30,
  },
  {
    name: "Swat",
    value: 20,
  },
  {
    name: "Turkey",
    value: 10,
  },
];

const colors = [
  "#F97316",
  "#0F766E",
  "#2563EB",
  "#9333EA",
];

export default function PopularDestinationChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>
    </ResponsiveContainer>
  );
}