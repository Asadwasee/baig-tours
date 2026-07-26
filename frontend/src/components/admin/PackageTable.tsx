"use client";

import DataTable from "./DataTable";

const columns = [
  { key: "title", label: "Package" },
  { key: "price", label: "Price" },
  { key: "duration", label: "Duration" },
  { key: "status", label: "Status" },
];

const data = [
  {
    title: "Hunza Tour",
    price: "PKR 65,000",
    duration: "7 Days",
    status: "Active",
  },
  {
    title: "Skardu Tour",
    price: "PKR 75,000",
    duration: "6 Days",
    status: "Active",
  },
];

export default function PackageTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}