"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "@/app/contexts/ThemeContext";
import { socialLinks } from "../constants/footerConstants";
import Link from "next/link";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer 
      className="w-full"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-[1440px] mx-auto   px-4 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Section - Logo */}
          <div className="flex items-center w-full justify-between">
            <Image 
              src={theme === 'dark' ? "/Logo.svg" : "/logoDark.svg"} 
              alt="Logo" 
              width={150} 
              height={150}
              className="w-auto lg:h-20 h-10"
            />
            <div className="flex flex-col gap-2 items-end justify-center">
                <h1 className="font-poppins text-[24px] font-bold">Contact Us</h1>
                <p className="font-poppins text-[14px]">9861XXXXXX / 9862XXXXXX</p>
                
            </div>
          </div>

         
        </div>
          
          <div className="flex items-center lg:mt-0 mt-5  w-full justify-center">
            <h2 className="font-bebas-neue text-[40px] lg:text-[100px] font-bold">Light Up the Moment. Smoke the Vibe.</h2>
          </div>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((links) => {
              return (
                <div key={links.name} className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} lg:mt-0 mt-5 rounded-full p-3`}>
                <Link 
                  href={links.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full p-1 flex items-center justify-center hover:scale-110 transition-transform`}
                >
                  {links.icon}
                </Link>
                </div>
              );
            })}
          </div>
        {/* Bottom Section */}
        <div className={`mt-8 flex font-poppins lg:flex-row flex-col lg:items-center gap-5 lg:gap-0 items-start justify-between pt-8 ${theme === 'dark' ? 'border-t border-white' : 'border-t border-black'} text-center`}>
          <p className="font-poppins text-[14px] opacity-80">
           &copy; 2025 Hookah Rental. 
          </p>
          <div className="flex gap-8"> 
               <Link href={'#'}>Terms and Conditions</Link>
               <Link href={'#'}>Privacy Policy</Link>
          </div>
          <div className="flex gap-2">
             <p>Website by</p>
             <Image src={`${theme === 'dark' ? '/logoWhite.svg' : '/logoBlack.svg'}`} alt="Logo" width={50} height={50} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;