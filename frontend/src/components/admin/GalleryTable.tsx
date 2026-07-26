"use client";

import DataTable from "./DataTable";

const columns = [
  { key: "image", label: "Image" },
  { key: "destination", label: "Destination" },
];

const data = [
  {
    image: "hunza.jpg",
    destination: "Hunza",
  },
  {
    image: "skardu.jpg",
    destination: "Skardu",
  },
];

export default function GalleryTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}