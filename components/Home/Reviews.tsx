"use client"
import React, { useState } from 'react'
import { reviews } from '../../constants/reviewConstants'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import { QuoteIcon } from '../icons/QuoteIcon'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null)
const { theme } = useTheme();
  const nextReview = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setAnimationDirection('right')
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
      setIsAnimating(false)
      setAnimationDirection(null)
    }, 1000)
  }

  const prevReview = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setAnimationDirection('left')
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
      setIsAnimating(false)
      setAnimationDirection(null)
    }, 1000)
  }

  const currentReview = reviews[currentIndex]
  const nextReviewData = reviews[(currentIndex + 1) % reviews.length]

  return (
   <section className='relative lg:h-screen h-[85vh] max-w-[2000px] overflow-hidden pb-10 lg:pb-0 lg:pt-[160px] pt-[80px] mx-auto bg-(--bg-secondary) text-(--text-primary)'>
    <div className="absolute  bottom-0  right-0 pointer-events-none z-0">
              <Image src={theme === 'dark' ? '/hookahBlack.svg' : '/hookah.svg'} alt="smoke" width={250} height={250} className="w-auto h-auto" />
            </div>
             <div className="absolute  -bottom-10 left-0 pointer-events-none z-0">
              <Image src={theme === 'dark' ? '/cloudBlack.svg' : '/cloud.svg'} alt="smoke" width={250} height={250} className="lg:w-auto lg:h-auto" />
            </div>
    <div className='max-w-[1440px]  px-4 lg:px-8 mx-auto'>
       <header className="mb-10  relative ">
          <div className="flex items-center gap-6">
            <span className="bg-primary h-10 lg:h-15 w-3"></span>
            <h2 className="font-bebas-neue text-[28px] lg:text-[48px]">
            The Streets Approved It.
            </h2>
          </div>
          <p className="font-poppins lg:text-[24px] text-[18px] font-medium">
            Real feedback from people who know what a smooth session feels like.
          </p>
        </header>
        
        <div className='flex items-center justify-center relative h-[600px]'>
          {/* Next Review Card (behind, slightly offset) */}
          <div 
            className={`absolute w-full  md:max-w-[820px] sm:max-w-xl max-w-sm  bg-(--bg-primary) z-1 rounded-2xl shadow-2xl p-8 transition-all  ease-out ${
              isAnimating && animationDirection === 'right' ? 'skew-animation-right ' : 
              isAnimating && animationDirection === 'left' ? 'skew-animation-left ' : ''
            }`}
           
          >
            <div className="flex flex-col   h-full justify-center">
              <div className="mb-2">
               <QuoteIcon className='w-20 h-20  text-primary' />
              </div>
              <h3 className="font-bebas-neue text-primary text-[28px] mb-4">{nextReviewData.quote}</h3>
              <p className="font-poppins text-[14px] mb-4 italic line-clamp-2">
                &ldquo;{nextReviewData.comment}&rdquo;
              </p>
              <p className="font-poppins font-semibold text-[16px]">{nextReviewData.name}</p>
            </div>
          </div>

          {/* Current Review Card (on top, centered) */}
          <div 
            className={`absolute w-full    bg-(--bg-primary) z-10 rounded-2xl shadow-2xl p-6  transition-all duration-300 ease-out ${
              isAnimating ? 'md:max-w-[820px] sm:max-w-xl max-w-sm h-[320px]' : ' md:max-w-[770px] sm:max-w-lg max-w-xs  h-[380px]'
            }`}
            style={{ zIndex: 2, }}
          >
            <div className="flex flex-col  t h-full justify-center">
               <div className="">
               <QuoteIcon className='w-20 h-20 text-primary' />
              </div>
              <h3 className="font-bebas-neue text-primary text-[28px] mb-2">{currentReview.quote}</h3>
              <p className="font-poppins text-[14px] mb-4 leading-[160%]">
                {currentReview.comment}
              </p>
              <p className="font-poppins font-semibold text-[16px]">{currentReview.name}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="hidden cursor-pointer lg:block absolute xl:left-20 lg:left-5  z-10 bg-primary text-black rounded-full p-2 hover:scale-110 transition-transform"
            style={{ transform: 'translateX(-50%)' }}
          >
            <ArrowLeftIcon className='w-10 h-10' />
          </button>
          
          <button
            onClick={nextReview}
            className="hidden lg:block cursor-pointer absolute xl:right-20 lg:right-5 z-10 bg-primary text-black rounded-full p-2 hover:scale-110 transition-transform"
            style={{ transform: 'translateX(50%)' }}
          >
            <ArrowRightIcon className='w-10 h-10' />
          </button>

          <button
            onClick={prevReview}
            className="block lg:hidden cursor-pointer absolute -bottom-20  -translate-x-1/2 z-10 bg-primary text-black rounded-full p-2 hover:scale-110 transition-transform"
            style={{ transform: 'translateX(-50%)' }}
          >
            <ArrowLeftIcon className='w-8 h-8' />
          </button>
          
          <button
            onClick={nextReview}
            className="block lg:hidden absolute cursor-pointer  -bottom-20 translate-x-1/2 z-10 bg-primary text-black rounded-full p-2 hover:scale-110 transition-transform"
            style={{ transform: 'translateX(50%)' }}
          >
           <ArrowRightIcon className='w-8 h-8' />
          </button>
        </div>
    </div>
   </section>
  )
}

export default Reviews