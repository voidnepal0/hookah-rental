"use client";
import React, { useState } from "react";
import { reviews } from "../constants/reviewConstants";
import { QuoteIcon } from "../icons/QuoteIcon";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

const ClinetSay = () => {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;
  const {theme} = useTheme()

  const getIndex = (i: number) => {
    return (i + total) % total;
  };

  const handleClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <section className="relative max-w-[2000px] mx-auto bg-(--bg-secondary) text-(--text-primary) py-20 overflow-hidden">
       <div className="absolute   -bottom-10  -right-5 pointer-events-none z-0">
                         <Image src={theme === 'dark' ? '/blackSmoke.svg' : '/smoke3.svg'} alt="smoke" width={250} height={250} className="w-auto h-auto rotate-x-180" />
                       </div>
      <div className="max-w-[1440px] h-[700px] mx-auto px-4">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-6">
            <span className="bg-primary h-10 w-3"></span>
            <h2 className="font-bebas-neue text-[48px]">
              What our clients say
            </h2>
          </div>
          <p className="font-poppins text-[20px] max-w-[600px]">
            We have successfully provided hookah catering for multiple events.
            Here’s what our clients say about us.
          </p>
        </header>

        {/* Slider */}
        <div className="relative h-[350px] flex  items-center justify-center">
          {reviews.map((review, index) => {
            const prev = getIndex(current - 1);
            const next = getIndex(current + 1);

            let position = "hidden";

            if (index === current) position = "active";
            else if (index === prev) position = "prev";
            else if (index === next) position = "next";

            return (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`
                  absolute cursor-pointer transition-all  duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  rounded-2xl shadow-xl bg-(--bg-primary)
                  ${
                    position === "active"
                      ? "z-20 scale-100 opacity-100  translate-x-0 w-[420px]"
                      : position === "prev"
                      ? "z-10 scale-90 opacity-40 -translate-x-[420px] h-[310px] w-[400px]"
                      : position === "next"
                      ? "z-10 scale-90 opacity-40 translate-x-[420px] h-[310px] w-[400px]"
                      : "opacity-0 scale-75 translate-x-0 pointer-events-none"
                  }
                `}
              >
                <div className="p-8 h-full flex flex-col justify-center">
                  <QuoteIcon
                    className={`${
                      position === "active" ? "w-16 h-16" : "w-12 h-12 opacity-60"
                    } text-primary mb-4`}
                  />

                  <h3
                    className={`font-bebas-neue text-primary ${
                      position === "active" ? "text-[24px]" : "text-[18px]"
                    }`}
                  >
                    {review.quote}
                  </h3>

                  <p
                    className={`font-poppins mt-3 ${
                      position === "active"
                        ? "text-[16px] leading-[160%]"
                        : "text-[12px] line-clamp-2 italic"
                    }`}
                  >
                    {review.comment}
                  </p>

                  <p className="mt-4 font-poppins font-semibold">
                    {review.name}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Arrows */}
          <button
            onClick={() => setCurrent(getIndex(current + 1))}
            className="absolute cursor-pointer left-6 z-30 bg-primary text-black rounded-full p-2 hover:scale-110 transition"
          >
            <ArrowLeftIcon className="w-10 h-10" />
          </button>

          <button
            onClick={() => setCurrent(getIndex(current - 1))}
            className="absolute cursor-pointer right-6 z-30 bg-primary text-black rounded-full p-2 hover:scale-110 transition"
          >
           <ArrowRightIcon className="w-10 h-10" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "bg-primary w-8" : "bg-gray-400 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinetSay;
