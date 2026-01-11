"use client";

import Image from "next/image";
import { HookahIcon } from "../icons/HookahIcon";

export default function Hero() {
  return (
    <section className="w-full" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1440px] mx-auto px-6 py-20">
        <section className='max-w-[1440px] px-4 mx-auto py-8 md:py-16'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0'>
            <div className='max-w-[600px] w-full lg:w-auto text-center lg:text-left'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold font-bebas-neue leading-tight mb-4' style={{ color: 'var(--text-primary)' }}>
                RENT IT.<br/>CATER IT.<br/>SMOKE IT.
              </h1>
              <p className='text-sm md:text-base mb-6 font-poppins max-w-[500px]' style={{ color: 'var(--text-secondary)' }}>
                Whether it&apos;s a chill night at home or a full-on party with friends, we&apos;ve got the smoke covered from start to finish.
              </p>
              <div className='max-w-[250px] w-full mx-auto lg:mx-0'>
                <button className='relative w-full bg-[#F5C400] text-black rounded-[100px] py-3 px-6 hover:bg-yellow-400 transition-colors duration-300 group'>
                  <span className='mr-5 font-bebas-neue text-black text-lg'>RENT A HOOKAH</span>
                  <HookahIcon className='absolute w-10 h-10 top-1/2 right-3 transform -translate-y-1/2 text-black group-hover:scale-110 transition-transform duration-300' />
                </button>
              </div>
            </div>
            <div className='relative w-full lg:w-auto flex justify-center lg:justify-end mt-8 lg:mt-0'>
              <div className='relative w-[300px] md:w-[400px] lg:w-[500px] h-[300px] md:h-[400px] lg:h-[500px]'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Image src="/frame.svg" alt="frame" width={500} height={500} className='w-full h-full object-contain' />
                </div>
                <div className='absolute inset-0 flex items-center justify-center z-10'>
                  <Image src="/girl.svg" alt="girl" width={400} height={400} className='w-full h-full object-contain' />
                </div>
                <div className='absolute top-8 md:top-12 lg:top-16 left-1/2 transform -translate-x-1/2 z-20'>
                  <Image src="/smoke.svg" alt="smoke" width={150} height={150} className='w-[100px] md:w-[150px] lg:w-[200px] h-auto object-contain' />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
