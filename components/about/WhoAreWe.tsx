'use client'
import React from "react";
import { WhoWeAre } from "../constants/aboutWhoConstant";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
const WhoAreWe = () => {
    const {theme} = useTheme();
  return (
    <section className="relative bg-(--bg-secondary) overflow-hidden text-(--text-primary) py-10 lg:pt-[160px] pt-[80px] max-w-[2000px] mx-auto">
          <div className="absolute hidden lg:block sm:top-20 lg:top-0   -right-10 pointer-events-none z-0">
                   <Image src={theme === 'dark' ? '/blackSmoke.svg' : '/smoke3.svg'} alt="smoke" width={250} height={250} className="w-auto h-auto rotate-x-180" />
                 </div>
                 <div className="absolute block lg:hidden  bottom-0  -right-10 pointer-events-none z-0">
                   <Image src={theme === 'dark' ? '/blackSmoke.svg' : '/smoke3.svg'} alt="smoke" width={250} height={250} className="w-auto h-auto rotate-x-180" />
                 </div>
      <div className="max-w-[1440px] z-10 flex flex-col lg:flex-row items-start justify-between gap-10 mx-auto px-4 lg:px-8">
        <div className="w-full lg:w-1/2 z-10">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
            {WhoWeAre.map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-(--bg-primary) items-start rounded-[20px] px-4 py-6 gap-4"
              >
                <span className="bg-primary rounded-full p-2">{item.icon}</span>
                <h2 className="font-bebas-neue text-[20px] lg:text-[28px]">
                  {item.title}
                </h2>
                <p className="font-poppins font-normal -mt-3 text-[16px] leading-[160%] tracking-wider ">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full z-10 lg:w-1/2">
          <header className="font-bebas-neue  relative z-10">
            <div className="flex   items-center gap-6">
              <span className="bg-primary h-10 lg:h-15 w-3"></span>
              <h2 className="font-bebas-neue text-[28px] lg:text-[48px]">
                Who are we  
              </h2>
            </div>
            <p className=" xl:text-[60px] tracking-[3] leading-tight lg:-mt-2 mt-0 text-[28px]   font-medium">
              Uncompromised quality and hygiene
            </p>
          </header>
          <div className="font-poppins font-normal text-[16px] leading-[160%] tracking-wider ">
            <p>
              In today&apos;s world, trust is everything. We take the hygiene of our
              equipment as seriously as the quality of our smoke. Every hookah
              goes through a rigorous, hospital-grade sanitization process
              before it reaches your door, ensuring complete cleanliness and
              safety. Each component is carefully cleaned, inspected, and
              prepared to meet the highest standards.
            </p>
            <p className="mt-3">
              From fresh flavors to well-maintained equipment, we focus on
              delivering a smooth and worry-free experience. With strict hygiene
              practices and attention to detail, we make sure your relaxation is
              safe, comfortable, and truly enjoyable every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
