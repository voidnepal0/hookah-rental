"use client";
import React from "react";
import Image from "next/image";

import { useTheme } from "@/contexts/ThemeContext";
import { steps } from "../../constants/StepsConstants";
const HowItWorks = () => {
  const { theme } = useTheme();
  
 

  return (
    <section 
      className="relative  max-w-[2000px] lg:pt-[160px] pt-[80px] pb-15 overflow-hidden  mx-auto"
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        
        {/* Smoke frames at top left */}
        <div className="absolute sm:top-20 top-0  left-0 pointer-events-none z-0">
          <Image src={theme === 'dark' ? '/blackSmoke.svg' : '/smoke3.svg'} alt="smoke" width={250} height={250} className="w-auto h-auto" />
        </div>
       

        {/* Header */}
        <header className="  mb-10 relative z-10">
          <div className="flex  items-center gap-6">
            <span className="bg-primary h-10 lg:h-15 w-3"></span>
            <h2 className="font-bebas-neue text-[28px] lg:text-[48px]">
              How it works
            </h2>
          </div>
          <p className="font-poppins lg:text-[24px] text-[18px]  font-medium">
            Rent it. Cater it. Smoke it.
          </p>
        </header>

        {/* Steps Grid */}
        <div className="flex items-center justify-center max-w-[1440px] mx-auto flex-wrap gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className=" bg-(--bg-primary) h-[300px] z-10 sm:w-[320px] w-full py-3 px-5 rounded-[24px]   group">
              <div className="flex  items-center justify-between">
                 {/* Icon */}
              <div className="w-16 h-16  mb-6 flex items-center justify-center border-2 bg-primary rounded-full border-none transition-colors">
                <div className="text-black transition-colors">
                  {step.icon}
                </div>
              </div>
              {/* Step Number */}
              <div className={`text-7xl font-bebas-neue ${theme === 'dark' ? 'text-gray-500' : 'text-gray-300'} mb-4`}>
                {step.number}
              </div>
              
             
              </div>
              {/* Title */}
              <h3 className="font-poppins uppercase font-bebas-neue text-[28px] font-medium mb-3">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="font-poppins font-medium text-[16px] opacity-80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Hookah Icon at bottom right */}
        <div className="absolute -bottom-10 -right-7 pointer-events-none z-0 ">
          <Image src={theme === 'dark' ? '/blackHookah.svg' : '/whiteHookah.svg'} alt="Hookah" width={250} height={250} className="w-auto h-auto" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
