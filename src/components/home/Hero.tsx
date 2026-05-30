"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides } from "@/data/heroSlides";

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = heroSlides[activeSlide];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex h-[48vh] min-h-[420px] items-end overflow-hidden bg-white px-6 text-black md:px-12">
      <div
        className="absolute inset-0 scale-[1.02] bg-cover bg-center opacity-95 transition-all duration-700"
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/82 via-white/35 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-between gap-10 pb-10 md:pb-14">
        <div className="max-w-xl space-y-5 text-left">
          <div className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-black/60 shadow-sm backdrop-blur-md">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-black" />
            {currentSlide.tag}
          </div>

          <h1 className="max-w-lg text-4xl font-semibold leading-none tracking-[-0.04em] text-black sm:text-6xl md:text-5xl">
            {currentSlide.title}
          </h1>

          <p className="max-w-md text-sm font-normal leading-relaxed text-black/65 md:text-[15px]">
            {currentSlide.description}
          </p>

          <div className="flex flex-col items-center justify-start gap-4 pt-4 sm:flex-row">
            <Link
              href={currentSlide.primaryHref}
              className="w-full rounded-full bg-black px-8 py-3 text-center text-[13px] font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto"
            >
              {currentSlide.primaryButton}
            </Link>
            <Link
              href={currentSlide.secondaryHref}
              className="w-full rounded-full border border-black bg-transparent px-8 py-3 text-center text-[13px] font-medium text-black transition-all hover:bg-black hover:text-white sm:w-auto"
            >
              {currentSlide.secondaryButton}
            </Link>
          </div>

          <div className="flex items-center gap-2 pt-5">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                onClick={() => setActiveSlide(index)}
                className={`relative h-[3px] overflow-hidden rounded-full transition-all duration-500 ${
                  activeSlide === index ? "w-14 bg-black" : "w-5 bg-black/15 hover:bg-black/35"
                }`}
                aria-label={`${slide.title} slaydına geç`}
              />
            ))}
          </div>
        </div>

        <div className="hidden items-end gap-3 pb-1 lg:flex">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveSlide(index)}
              className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                activeSlide === index
                  ? "h-28 w-24 translate-y-0 opacity-100 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                  : "h-20 w-16 translate-y-2 opacity-70 hover:opacity-100"
              }`}
              aria-label={`${slide.title} önizlemesi`}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  activeSlide === index ? "bg-black/10" : "bg-black/35"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
