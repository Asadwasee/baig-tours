"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { heroSlides } from "@/constants/hero";

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      className="h-full w-full"
    >
      {heroSlides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative h-[85vh] w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={slide.id === 1}
              className="object-cover"
            />

            {/* Brand Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F766E]/80 via-[#0F766E]/50 to-black/20" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}