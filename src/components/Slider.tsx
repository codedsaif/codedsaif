"use client";

import { useRef } from "react";
import Image from "next/image";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import type { Slide } from "@/lib/data";

export default function Slider({ sliderData }: { sliderData: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByView = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="group relative h-[240px] w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className="relative h-full w-full flex-none snap-center"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 445px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center bg-linear-to-t from-black/60 to-transparent p-3 pt-10">
              <span className="text-sm font-semibold text-accent">
                {slide.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => scrollByView(-1)}
        className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brand/60 text-white opacity-0 transition-opacity hover:bg-brand/80 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <BiLeftArrowAlt size={22} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => scrollByView(1)}
        className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brand/60 text-white opacity-0 transition-opacity hover:bg-brand/80 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <BiRightArrowAlt size={22} />
      </button>
    </div>
  );
}
