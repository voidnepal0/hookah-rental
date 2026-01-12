'use client'
import React from 'react'
import { QuoteIcon } from '../icons/QuoteIcon'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext';

const TeamQuote = () => {
    const {theme} = useTheme();
  return (
    <section className='relative   max-w-[2000px] mx-auto bg-(--bg-secondary) lg:py-30 py-15 text-(--text-primary)'>
         <div className="absolute  bottom-0  right-0 pointer-events-none z-0">
                      <Image src={theme === 'dark' ? '/hookahBlack.svg' : '/hookah.svg'} alt="smoke" width={250} height={250} className="w-auto h-auto" />
                    </div>
                     <div className="absolute  -bottom-10 left-0 pointer-events-none z-0">
                      <Image src={theme === 'dark' ? '/cloudBlack.svg' : '/cloud.svg'} alt="smoke" width={250} height={250} className="lg:w-auto lg:h-auto" />
                    </div>
       <div className='max-w-[1440px]  mx-auto lg:px-8 px-4 '>
    <div className='flex flex-col  items-center justify-between gap-5'>
             <QuoteIcon className='w-30 h-30 text-primary' />
             <h2 className='lg:text-[60px] z-10 text-[30px] font-bebas-neue text-center'>“Your trust means everything to us. From strict hygiene standards to premium-quality equipment, we ensure every hookah delivers a safe, smooth, and worry-free experience.”</h2>
             <p className='font-poppins z-10 text-center text-[23px]'>– The Hookah Nepal Team</p>
    </div>
        </div>     
      
    </section>
  )
}

export default TeamQuote