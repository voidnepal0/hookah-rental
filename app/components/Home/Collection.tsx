import React from "react";
import Image from "next/image";
import { product } from "../constants/ProductConstant";
import { Prodcut } from "@/app/types/prodcutTypes";

const Collection = () => {
  return (
    <section
      className="max-w-[2000px] lg:py-[160px] py-[80px] mx-auto"
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 relative">

        {/* Header */}
        <header className="flex items-center justify-between w-full gap-4 mb-10">
          <div className="flex items-center gap-6">
            <span className="bg-primary h-20 w-2"></span>
            <h2 className="font-bebas-neue text-[48px] tracking-wider">
              Our Smoke Collection
            </h2>
          </div>

          <button className="bg-primary text-black py-2 px-6 rounded-full hover:opacity-90 transition">
            See All
          </button>

          <div className="absolute -top-16 right-0 pointer-events-none opacity-70">
            <Image src="/smoke2.svg" alt="smoke" width={260} height={260} />
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[300px] gap-4">

          {product.map((item: Prodcut) => (
            <div
              key={item.id}
              className={`relative rounded-[20px] 
              ${item.id === 1 ? "col-span-2 row-span-2" : ""}`}
            >
              {/* Image */}
              <div className="flex flex-col h-full">
              <div className={`${item.id === 1 ? 'h-full' : 'h-full'} relative`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-[20px]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-primary text-black text-xs px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="mt-2">
                <h3 className=" text-lg font-semibold leading-tight">
                  {item.name}
                </h3>

                <p className=" text-sm mt-1 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between mt-4 text-sm">
                  <div>
                    <p>Per Hour</p>
                    <p className="font-semibold">
                      Rs {item.price[0].amount}
                    </p>
                  </div>

                  <div>
                    <p>Per Day</p>
                    <p className="font-semibold">
                      Rs {item.price[1]?.amount || item.price[0].amount}
                    </p>
                  </div>
                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Collection;
