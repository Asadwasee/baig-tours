"use client";

import DataTable from "./DataTable";

const columns = [
  { key: "customer", label: "Customer" },
  { key: "package", label: "Package" },
  { key: "date", label: "Travel Date" },
  { key: "status", label: "Status" },
];

const data = [
  {
    customer: "Ali",
    package: "Hunza",
    date: "15 Aug",
    status: "Pending",
  },
  {
    customer: "Ahmed",
    package: "Turkey",
    date: "25 Aug",
    status: "Confirmed",
  },
];

export default function BookingTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}