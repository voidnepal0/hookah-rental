
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const ContacatClient = () => {
    
  return (
    <section className="  max-w-[2000px] mx-auto overflow-hidden lg:pt-[80px] pt-[40px] relative" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}>
      {/* Background decorative elements */}
    

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-between mb-6 font-poppins text-sm">
          <div className="flex items-center gap-2">
            <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">
              Home
            </Link>
            <ChevronRight size={16} className="opacity-60" />
            <span className="font-medium">Contact Us</span>
          </div>
        </nav>

        {/* Full Width First Image */}
        <div className="relative w-full h-[300px] lg:h-[400px] mb-12 lg:mb-16">
          <Image
            src="/contact/contact1.svg"
            alt="Contact us hero image"
            fill
            className="object-cover object-left lg:object-cover rounded-2xl bg-black"
          />
          <div className='absolute font-bebas-neue flex flex-col items-center justify-center inset-0'>
            <h1 className="lg:text-[72px] text-[40px] lg:text-6xl font-bold text-white">Get in Touch</h1>
            <p className="text-white text-center text-[20px] lg:text-[40px] mt-4">Whether you’re booking a hookah, asking about hygiene, or need support, our team is just a message away.</p>
          </div>
        </div>
        </div>
        </section>
  )
}

export default ContacatClient