
"use client";
import React from "react";
import Image from "next/image";
import { product } from "../constants/ProductConstant";
import { Prodcut } from "@/app/types/prodcutTypes";
import { useTheme } from "@/app/contexts/ThemeContext";
import Link from "next/link";

const Collection = () => {
  const { theme } = useTheme();
  return (
    <section
      className="relative  max-w-[2000px] lg:pt-[160px] pt-[80px] mx-auto"
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">

        {/* Header */}
        <header className="flex items-center justify-between w-full gap-4 mb-10">
          <div className="flex items-center gap-6">
            <span className="bg-primary h-10 lg:h-15 w-3"></span>
            <h2 className="font-bebas-neue text-[28px] lg:text-[48px] ">
              Our Smoke Collection
            </h2>
          </div>

          <Link href={'/rentals'} className="bg-primary max-w-[100px] cursor-pointer w-full text-black py-2 px-6 z-10 rounded-full hover:opacity-90 transition">
            See All
          </Link>

          <div className="absolute lg:top-16 top-11 right-0 pointer-events-none ">
            <Image src={theme === 'dark' ? '/smoke2.svg' : '/whitesmoke.svg'} alt="smoke" width={260} height={260} className="w-auto h-auto" />
           
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4  h-[700px]  gap-4">

          {product.slice(0, 5).map((item: Prodcut) => {
            const productName = item.name.toLowerCase().replace(/\s+/g, '-');
            return (
            <Link
              key={item.id}
              href={`/rentals/${productName}`}
              className={`relative rounded-[20px] block  transition-transform duration-300
              ${item.id === 1 ? "col-span-2 row-span-2" : ""}`}
            >
              {/* Image */}
              <div className="flex flex-col h-full">
              <div className={`${item.id === 1 ? 'h-full' : 'h-full'} relative`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className={`${item.id === 1 ? 'object-cover' : 'object-cover'} rounded-[20px]`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 " />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-primary text-black text-xs px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="mt-1 font-poppins">
                <h3 className=" text-[16px] font-medium leading-[24px]">
                  {item.name}
                </h3>

              

                <div className="flex justify-between">
                  <div>
                    <p className="text-[14px] ">Per Hour</p>
                    <p className="text-[16px] font-semibold">
                      Rs {item.price[0].amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-[14px]">Per Day</p>
                    <p className="text-[16px] font-semibold">
                      Rs {item.price[1]?.amount || item.price[0].amount}
                    </p>
                  </div>
                  </div>
                </div>
              </div>

            </Link>
          );
        })}

        </div>
      </div>
    </section>
  );
};

export default Collection;
