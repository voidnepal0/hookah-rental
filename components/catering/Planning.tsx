'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HookahIcon } from '../icons/HookahIcon'
import { useTheme } from '@/contexts/ThemeContext'

const Planning = () => {
    const {theme} = useTheme()
  return (
    <section className='relative max-w-[2000px] mx-auto bg-(--bg-secondary) text-(--text-primary) py-20 overflow-hidden'>
         <div className="absolute  bottom-0  right-0 pointer-events-none z-0">
                      <Image src={theme === 'dark' ? '/hookahBlack.svg' : '/hookah.svg'} alt="smoke" width={250} height={250} className="w-auto h-auto" />
                    </div>
                     <div className="absolute  -bottom-10 left-0 pointer-events-none z-0">
                      <Image src={theme === 'dark' ? '/cloudBlack.svg' : '/cloud.svg'} alt="smoke" width={250} height={250} className="lg:w-auto lg:h-auto" />
                    </div>
        <div className='max-w-[1440px] mx-auto lg:h-[500px] lg:px-8 px-4'>
    <div className="relative w-full h-[300px] lg:h-[400px] mb-12 lg:mb-16">
              <Image
                src={theme === 'dark' ? '/catering/cateringPlanning.svg' : '/contact/contact1.svg'}
                alt="Contact us hero image"
                fill
                className="object-cover object-left lg:object-cover rounded-2xl bg-black"
              />
              <div className='absolute font-bebas-neue flex flex-col gap-4 max-w-3xl mx-auto text-center items-center justify-center inset-0'>
                <h2 className="lg:text-[72px] text-[40px]  lg:text-6xl font-bold text-white">Planning an event? Let us handle the hookah catering.</h2>
                   <div className='flex justify-center  '>
              <Link href={'/rentals'} className='relative cursor-pointer bg-[#F5C400] text-black rounded-full py-3 pl-8 pr-16 hover:bg-[#FFD700] transition-all duration-300 group'>
                <span className='font-bebas-neue text-lg md:text-xl tracking-wide'>RENT A HOOKAH</span>
                <HookahIcon className='absolute w-8 h-8 md:w-10 md:h-10 top-1/2 right-4 transform -translate-y-1/2 text-black group-hover:scale-110 transition-transform duration-300' />
              </Link>
            </div>
              </div>
             
            </div>
            
            </div>
           </section>
  )
}

export default Planning