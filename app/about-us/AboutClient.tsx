"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function AboutUs() {
  const { theme } = useTheme();

  return (
    <section className="max-w-[2000px] mx-auto overflow-hidden lg:pt-[80px] pt-[40px] relative" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}>
      {/* Background decorative elements */}
      <div className="absolute -bottom-5 left-0 pointer-events-none z-0 ">
                <Image src={theme === 'dark' ? '/blackHookah.svg' : '/whiteHookah.svg'} alt="Hookah" width={250} height={250} className="w-auto h-auto" />
              </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-between mb-6 font-poppins text-sm">
          <div className="flex items-center gap-2">
            <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">
              Home
            </Link>
            <ChevronRight size={16} className="opacity-60" />
            <span className="font-medium">About Us</span>
          </div>
        </nav>

        {/* Full Width First Image */}
        <div className="relative w-full h-[300px] lg:h-[400px] mb-12 lg:mb-16">
          <Image
            src="/about-us/image1.svg"
            alt="About us hero image"
            fill
            className="object-cover rounded-2xl bg-black"
          />
          <div className='absolute font-bebas-neue flex flex-col items-center justify-center inset-0'>
            <h1 className="lg:text-[72px] text-[40px] lg:text-6xl font-bold text-white">SMOKE. CHILL. REPEAT.</h1>
            <p className="text-white text-center text-[20px] lg:text-[40px] mt-4">Premium hookah rentals with fresh flavors, anytime, anywhere</p>
          </div>
        </div>

      
        

        {/* Full Width Second Image */}
        <div className='grid grid-cols-1  md:grid-cols-5 gap-5 '>
          <div className='col-span-3'>
            <header className="font-bebas-neue  relative z-10">
          <div className="flex  items-center gap-6">
            <span className="bg-primary h-10 lg:h-15 w-3"></span>
            <h2 className="font-bebas-neue text-[28px] lg:text-[48px]">
              Who are we
            </h2>
          </div>
          <p className=" xl:text-[60px] tracking-[3] text-[28px]   font-medium">
            Your trusted source for fresh, clean, and flavorful hookahs.
          </p>
        </header>
        <div className='font-poppins font-normal text-[16px] leading-[160%] tracking-wider lg:mt-10 mt-5'>
          <p>We are a premium hookah and vape rental service designed for smoking enthusiasts who want a smooth, stylish, and hassle-free experience without the need to purchase expensive equipment. Our platform makes it easy to rent high-quality hookahs and explore a wide range of rich, long-lasting flavors at affordable prices. Whether you are planning a house party, celebrating with friends, hosting a private event, or just relaxing after a long day, we aim to bring a premium lounge-style experience right to your space with convenience, flexibility, and reliability.</p>
          <p className='mt-5'>Hygiene and quality are at the core of our service. Every hookah is thoroughly deep-cleaned, sanitized, and carefully inspected after each use to ensure fresh taste and smooth performance every time. With flexible rental durations and strict 18+ responsible service, we focus on delivering a clean, safe, and enjoyable smoking experience you can trust.</p>
        </div>

          </div>
        <div className="relative col-span-2 w-full h-[300px] md:h-[620px] mb-12 lg:mb-16">
          <Image
            src="/about-us/image2.svg"
            alt="About us secondary image"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
</div>
       
      </div>
    </section>
  );
}
