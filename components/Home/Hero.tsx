"use client";

import Image from "next/image";
import { HookahIcon } from "../icons/HookahIcon";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export default function Hero() {
  const {theme} = useTheme()
  return (
    <section className="w-full max-w-[2000px] lg:pt-0 pt-[55px] mx-auto overflow-hidden bg-(--bg-primary) text-(--text-primary)">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 ">
        <div className='flex flex-col sm:flex-row  items-center justify-between gap-8 lg:gap-12 pt-12 md:pt-16 lg:pt-20'>
          {/* Left Content */}
          <div className='flex-1 font-bebas-neue max-w-[700px] z-10 text-center lg:text-left'>
            <h1 className='text-5xl text-center lg:text-start md:text-6xl lg:text-8xl font-bebas-neue leading-[0.95] mb-6 text-(--text-primary)'>
              RENT IT. CATER IT.<br/>SMOKE IT.
            </h1>
            <p className='text-[20px] text-center lg:text-start lg:text-[29px] text-(--text-primary) mb-8 max-w-[510px] leading-relaxed'>
              Whether it&apos;s a chill night at home or a full-on party with friends, we&apos;ve got smoke covered from start to finish.
            </p>
            <div className='flex justify-center lg:justify-start'>
              <Link href={'/rentals'} className='relative cursor-pointer bg-[#F5C400] text-black rounded-full py-3 pl-8 pr-16 hover:bg-[#FFD700] transition-all duration-300 group'>
                <span className='font-bebas-neue text-lg md:text-xl tracking-wide'>RENT A HOOKAH</span>
                <HookahIcon className='absolute w-8 h-8 md:w-10 md:h-10 top-1/2 right-4 transform -translate-y-1/2 text-black group-hover:scale-110 transition-transform duration-300' />
              </Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className='flex-1 xl:ml-30 lg:ml-10 max-w-[720px]  relative flex justify-center lg:justify-end items-center h-full'>
            {/* Yellow Blob Background */}
            <div className='absolute xl:-right-30 lg:-right-40 lg:top-20 w-[350px] h-[300px] md:w-[400px] md:h-[450px] lg:w-[850px] lg:h-[600px] '>
            <Image
              src={theme === 'dark' ? '/home/frame.svg' : '/home/frameWhite.svg'}
              alt="Frame background"
              width={550}
              height={550}
              className='w-full h-full object-contain'
            />
            </div>
            
            {/* Image Container */}
            <div className=' w-[280px] md:w-[350px] lg:w-[420px] h-[350px] md:h-[500px] lg:h-[700px] z-10'>
              {/* Girl Image */}
              <div className='absolute   inset-0 flex items-end justify-center'>
                <Image 
                  src="/home/girl.svg" 
                  alt="Person with hookah" 
                  width={700} 
                  height={700} 
                  className='w-full h-full object-contain object-bottom'
                  priority
                />
              </div>
              
              {/* Smoke Image */}
              <div className='absolute xl:top-42 lg:top-45 md:top-35 xl:left-2 md:left-3 lg:-left-2 top-23   w-[100px] md:w-[130px] lg:w-[200px] xl:w-[220px] z-20'>
                <Image 
                  src="/home/smoke.svg" 
                  alt="Smoke effect" 
                  width={220} 
                  height={150} 
                  className='w-full h-auto object-contain'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}