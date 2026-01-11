"use client"
import React, { useState } from 'react'

import { CartIcon } from '../icons/CartIcon'
import { navConstant } from '../constants/navConstant'
import Image from 'next/image'
import {UserIcon} from '../icons/UserIcon'
import { SunIcon } from '../icons/SunIcon'
import { MoonIcon } from '../icons/MoonIcon'
import { MenuIcon, CloseIcon } from '../icons/MenuIcon'
import { useTheme } from '../../contexts/ThemeContext'
import Link from 'next/link'

const Header = () => {
  const [active, setActive]= useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const handleNavClick = (itemName: string) => {
    setActive(itemName);
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <header className='flex fixed top-0 left-0 right-0 z-100 font-poppins items-center w-full shadow-[0px_2px_25px_rgba(0,0,0,0.1)] justify-between py-3' style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
        <div className='max-w-[1440px] px-4 lg:px-8 mx-auto items-center flex justify-between w-full'>
          {/* Mobile Menu Button */}
          <button 
            className='lg:hidden cursor-pointer p-2 hover:scale-110 transition-transform'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <CloseIcon className='w-6 h-6' />
            ) : (
              <MenuIcon className='w-6 h-6' />
            )}
          </button>

          {/* Logo */}
          <div className='shrink-0'>
            <Link href="/">
              {theme === 'dark' ? (
                <Image src="/Logo.svg" alt="Logo" width={100} height={100} className='w-auto h-auto' />
              ) : (
                <Image src="/logoDark.svg" alt="Logo" width={100} height={100} className='w-auto h-auto' />
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex font-medium leading-[160%] text-[16px] items-center gap-10'>
            {navConstant.map((item) => (
              <Link 
                className={`relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                  active === item.name 
                    ? 'after:w-full text-primary' 
                    : 'after:w-0 hover:after:w-full hover:text-primary'
                }`} 
                key={item.name} 
                href={item.href}
                onClick={() => setActive(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className='hidden lg:flex items-center gap-3'>
            <button 
              onClick={toggleTheme}
              className='group rounded-full p-2 cursor-pointer hover:scale-110 transition-transform'
            >
              {theme === 'dark' ? (
                <SunIcon className='w-6 h-6 fill-primary text-primary group-hover:scale-110 transition-transform' />
              ) : (
                <MoonIcon className='w-6 h-6 fill-primary text-primary group-hover:scale-110 transition-transform' />
              )}
            </button>
            <button className='group bg-primary rounded-full p-1 cursor-pointer hover:scale-110 transition-transform'>
              <UserIcon className='w-6 h-6 text-primary group-hover:scale-110 transition-transform' />
            </button>
            <button className='relative cursor-pointer hover:scale-110 transition-transform'>
              <CartIcon className='w-8 h-8 text-primary group-hover:scale-110 transition-transform' />
              <span className='absolute font-poppins font-semibold top-0 -right-1 bg-primary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center'>3</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className='lg:hidden flex items-center gap-3'>
            <button 
              onClick={toggleTheme}
              className='group rounded-full p-2 cursor-pointer hover:scale-110 transition-transform'
            >
              {theme === 'dark' ? (
                <SunIcon className='w-6 h-6 fill-primary text-primary group-hover:scale-110 transition-transform' />
              ) : (
                <MoonIcon className='w-6 h-6 fill-primary text-primary group-hover:scale-110 transition-transform' />
              )}
            </button>
            <button className='group bg-primary rounded-full p-1 cursor-pointer hover:scale-110 transition-transform'>
              <UserIcon className='w-6 h-6 text-primary group-hover:scale-110 transition-transform' />
            </button>
            <button className='relative cursor-pointer hover:scale-110 transition-transform'>
              <CartIcon className='w-8 h-8 text-primary group-hover:scale-110 transition-transform' />
              <span className='absolute font-poppins font-semibold top-0 -right-1 bg-primary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center'>3</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div className={`lg:hidden fixed w-full top-0 left-0 h-full bg-(--bg-secondary) text-(--text-primary)  shadow-xl transition-all duration-300 ease-in-out z-90 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className='flex flex-col p-6 h-full'>
          {/* Close Button */}
          <div className='flex justify-end mb-8'>
            <button 
              className='p-2 hover:scale-110 transition-transform'
              onClick={() => setMobileMenuOpen(false)}
            >
              <CloseIcon className='w-6 h-6' />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className='flex flex-col font-medium leading-[160%] text-[18px] gap-6'>
            {navConstant.map((item) => (
              <Link 
                className={`relative py-2 ${
                  active === item.name 
                    ? 'text-primary' 
                    : 'hover:text-primary'
                }`} 
                key={item.name} 
                href={item.href}
                onClick={() => handleNavClick(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-80'
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Header