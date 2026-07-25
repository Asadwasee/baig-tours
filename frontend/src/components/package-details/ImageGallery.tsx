"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/assets/images/packages/hunza.jpg",
  "/assets/images/packages/skardu.jpg",
  "/assets/images/packages/turkey.jpg",
  "/assets/images/packages/hunza.jpg",
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>

      {/* Main Image */}

      <div className="relative h-[520px] overflow-hidden rounded-3xl">

        <Image
          src={selectedImage}
          alt="Package"
          fill
          className="object-cover"
        />

      </div>

      {/* Thumbnails */}

      <div className="mt-5 grid grid-cols-4 gap-4">

        {images.map((image) => (
          <button
            key={image}
            onClick={() => setSelectedImage(image)}
            className={`relative h-28 overflow-hidden rounded-2xl border-2 transition
              ${
                selectedImage === image
                  ? "border-[#F97316]"
                  : "border-transparent"
              }`}
          >

            <Image
              src={image}
              alt="Thumbnail"
              fill
              className="object-cover"
            />

          </button>
        ))}

      </div>

    </div>
  );
}