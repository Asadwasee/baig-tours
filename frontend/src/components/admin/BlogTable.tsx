"use client";

import DataTable from "./DataTable";

const columns = [
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  { key: "date", label: "Date" },
];

const data = [
  {
    title: "Hunza Travel Guide",
    author: "Admin",
    date: "10 Jul",
  },
  {
    title: "Skardu Tips",
    author: "Admin",
    date: "18 Jul",
  },
];

export default function BlogTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}