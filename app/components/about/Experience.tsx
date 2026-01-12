import React from 'react'
import { experience } from '../constants/experienceConstant'
const Experience = () => {
  return (
    <section className='max-w-[2000px] mx-auto bg-(--bg-primary) lg:py-20 py-5  text-(--text-primary)'>
        <div className='max-w-[1440px] mx-auto px-4 lg:px-8'>
      <header className="  mb-10 relative z-10">
          <div className="flex  items-center justify-center gap-6">
            <span className="bg-primary h-10 lg:h-15 w-3"></span>
            <h2 className="font-bebas-neue tracking-[3]  text-[28px] lg:text-[48px]">
              The Experience
            </h2>
          </div>
          <p className="font-bebas-neue text-center lg:text-[60px] text-[36px]   font-medium">
            More than just a smoke
          </p>
        </header>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {experience.map((item) => (
            <div key={item.id} className='flex flex-col bg-(--bg-secondary) items-start rounded-[20px] px-4 py-5 gap-1'>
                <span className='bg-primary rounded-full p-2'>
              {item.icon}
              </span>
              <h2 className='font-bebas-neue text-[20px] lg:text-[28px]'>{item.title}</h2>
              <p className='font-poppins font-normal text-[16px] leading-[160%] tracking-wider'>{item.description}</p>
            </div>
          ))}
        </div>
        </div>
    </section>
  )
}

export default Experience