"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "@/app/contexts/ThemeContext";
import { socialLinks } from "../constants/footerConstants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import darkLogo from '@/public/logoDark.svg';
import logo from '@/public/Logo.svg';
const Footer = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const scrollToTopAndHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push('/');
  };

  return (
    <footer 
      className="w-full  max-w-[2000px]  mx-auto"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-[1440px]  mx-auto px-4 lg:px-8 pt-12  py-5">
        {/* Top Section - Logo and Contact aligned left/right */}
        <div className="flex items-start justify-between gap-8 mb-8">
          {/* Left - Logo */}
          <div className="flex items-center">
              <button onClick={scrollToTopAndHome} className="cursor-pointer">
                <Image 
                src={theme === 'dark' ? logo : darkLogo} 
                alt="Logo" 
                width={150} 
                height={150}
                className="w-auto lg:h-20 h-12 "
                />
              </button>
            </div>

          {/* Right - Contact */}
          <div className="flex flex-col gap-2 items-end justify-center">
            <h1 className="font-poppins text-[18px] lg:text-[24px] font-bold">Contact Us</h1>
            <p className="font-poppins text-[12px] lg:text-[14px]">9861XXXXXX / 9862XXXXXX</p>
          </div>
        </div>

        {/* Middle Section - Full Viewport Width Text */}
        <div className="w-full  px-4 lg:px-8">
          <div className="flex items-center justify-center w-full">
            <h2 className="font-bebas-neue text-[34px] sm:text-[42px] md:text-[52px] lg:text-[70px] xl:text-[93px] 2xl:text-[108px] w-full text-center font-bold leading-tight">
              Light Up the Moment. Smoke the Vibe.
            </h2>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mb-18">
          {socialLinks.map((links) => {
            return (
              <div 
                key={links.name} 
                className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded-full lg:p-3 p-2`}
              >
                <Link 
                  href={links.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="lg:w-7 lg:h-7 w-6 h-6 rounded-full p-1 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  {links.icon}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className={` hidden lg:flex font-poppins flex-col lg:flex-row lg:items-center gap-5 lg:gap-0 items-start lg:justify-between pt-8 ${theme === 'dark' ? 'border-t border-white' : 'border-t border-black'}`}>
          <p className="font-poppins text-[14px] opacity-80">
            &copy; 2025 Hookah Rental. 
          </p>
          <div className="flex gap-8 text-[14px]"> 
            <Link href={'#'}>Terms and Conditions</Link>
            <Link href={'#'}>Privacy Policy</Link>
          </div>
          <div className="flex gap-2 items-center text-[14px]">
            <p>Website by</p>
            <Link href={'https://voidnepal.com.np/'} target="_blank" rel="noopener noreferrer">
            <Image 
              src={`${theme === 'dark' ? '/logoWhite.svg' : '/logoBlack.svg'}`} 
              alt="Logo" 
              width={50} 
              height={50} 
              className="w-auto h-5" 
            />
            </Link>
          </div>
        </div>
        <div className={` flex lg:hidden font-poppins flex-col  items-center gap-5 lg:gap-0  justify-between pt-8 ${theme === 'dark' ? 'border-t border-white' : 'border-t border-black'}`}>
         <div className="flex gap-8 text-[18px]"> 
            <Link href={'#'}>Terms and Conditions</Link>
            <Link href={'#'}>Privacy Policy</Link>
          </div>
          <p className="font-poppins text-[22px] opacity-80">
            &copy; 2025 Hookah Rental. 
          </p>
          <div className="flex gap-2 items-center text-[18px]">
            <p>Website by</p> 
            <Link href={'https://voidnepal.com.np/'} target="_blank" rel="noopener noreferrer">
            <Image 
              src={`${theme === 'dark' ? '/logoWhite.svg' : '/logoBlack.svg'}`} 
              alt="Logo" 
              width={50} 
              height={50} 
              className="w-auto h-5" 
            />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;