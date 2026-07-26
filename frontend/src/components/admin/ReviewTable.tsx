"use client";

import DataTable from "./DataTable";

const columns = [
  { key: "customer", label: "Customer" },
  { key: "rating", label: "Rating" },
  { key: "review", label: "Review" },
];

const data = [
  {
    customer: "Ali",
    rating: "⭐⭐⭐⭐⭐",
    review: "Amazing tour!",
  },
  {
    customer: "Sara",
    rating: "⭐⭐⭐⭐",
    review: "Very good experience.",
  },
];

export default function ReviewTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}