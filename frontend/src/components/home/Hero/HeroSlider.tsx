"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { heroSlides } from "@/constants/hero";

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      loop
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      className="h-[80vh] sm:h-[85vh] lg:h-screen"
    >
      {heroSlides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative h-[80vh] sm:h-[85vh] lg:h-screen w-full">

            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={slide.id === 1}
              className="object-cover"
            />

            {/* Better Overlay */}

            <div className="absolute inset-0 bg-gradient-to-r from-[#0F766E]/90 via-[#0F766E]/60 to-black/40" />

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}