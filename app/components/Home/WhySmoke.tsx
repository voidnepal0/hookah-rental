"use client";
import React from "react";
import Image from "next/image";

import { useTheme } from "@/app/contexts/ThemeContext";
import { whySmoke } from "../constants/whyConstants";
const WhySmoke = () => {
  const { theme } = useTheme();
  
 

  return (
    <section 
      className="relative  max-w-[2000px] lg:pt-[160px] pt-[80px] pb-15 overflow-hidden  mx-auto"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4  lg:px-8">
        
       
       

        {/* Header */}
        <header className=" mb-10 relative z-10">
          <div className="flex  items-center gap-6">
            <span className="bg-primary h-10 lg:h-15 w-3"></span>
            <h2 className="font-bebas-neue text-[28px] lg:text-[48px] ">
              Why smoke with us
            </h2>
          </div>
          
        </header>

        {/* Steps Grid */}
        <div className="flex flex-wrap justify-center  xl:gap-22 gap-8 mb-16 max-w-[1440px] mx-auto">
          {whySmoke.map((step, index) => (
            <div key={index} className="z-10 py-6  rounded-[24px] group text-center shrink-0 sm:w-[400px] w-full">
              <div className="flex items-center justify-center mb-6">
                 {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center border-2 bg-primary rounded-full border-none transition-colors">
                  <div className="text-black transition-colors">
                    {step.icon}
                  </div>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="font-bebas-neue text-center uppercase text-[28px] mb-3">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="font-poppins  text-center font-medium text-[16px] opacity-80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        
        <div className="absolute  bottom-0  right-0 pointer-events-none z-0">
          <Image src={theme === 'dark' ? '/whySmokeBlack.svg' : '/whySmoke.svg'} alt="smoke" width={250} height={250} className="w-auto h-auto" />
        </div>
      </div>
    </section>
  );
};

export default WhySmoke;
