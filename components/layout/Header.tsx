"use client"
import React, { useState } from 'react'
import { CartIcon } from '../icons/CartIcon'
import { navConstant } from '../../constants/navConstant'
import Image from 'next/image'
import { SunIcon } from '../icons/SunIcon'
import { MoonIcon } from '../icons/MoonIcon'
import { MenuIcon, CloseIcon } from '../icons/MenuIcon'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import darkLogo from '@/public/layout/logoDark.svg';
import logo from '@/public/layout/Logo.svg';
import { LogIn} from 'lucide-react';
import AuthModal from '../auth/AuthModal';
import ProfileIcon from './ProfileIcon';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  // Check if we're on a product detail page (under /rentals/)
  const isProductDetailPage = pathname.startsWith('/rentals/');

  return (
    <>
      <header className='flex max-w-[2000px] mx-auto fixed top-0 left-0 right-0 z-100 font-poppins items-center w-full shadow-[0px_2px_25px_rgba(0,0,0,0.1)] justify-between py-3' style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
        <div className='max-w-[1440px] px-4 lg:px-8 mx-auto items-center flex justify-between w-full'>
          {/* Mobile Menu Button */}
          <button 
            className='lg:hidden cursor-pointer  hover:scale-110 transition-transform'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <MenuIcon className='w-6 h-6 text-primary' />
            ) : (
              <MenuIcon className='w-8 h-8 text-primary' />
            )}
          </button>

          {/* Logo */}
          <div className='shrink-0'>
            <Link href="/">
              {theme === 'dark' ? (
                <Image src={logo} alt="Logo" width={100} height={100} loading='eager' className='w-auto h-auto' />
              ) : (
                <Image src={darkLogo} alt="Logo" width={100} height={100} loading='eager' className='w-auto h-auto' />
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex font-medium leading-[160%] text-[16px] items-center gap-10'>
            {navConstant.map((item) => (
              <Link 
                className={`relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                  (pathname === item.href || (isProductDetailPage && item.name === 'Rentals')) 
                    ? 'after:w-full text-primary' 
                    : 'after:w-0 hover:after:w-full hover:text-primary'
                }`} 
                key={item.name} 
                href={item.href}
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
            {user ? (
              <ProfileIcon />
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                 className="relative hidden lg:flex items-center gap-2 border px-5 py-1 rounded-xl font-semibold font-poppins cursor-pointer transition-all duration-600 ease-custom group hover:bg-(--bg-primary) hover:text-(--text-primary) hover:pr-5"
          >
            {/* Button text */}
            <span className="relative z-1">
              Login
            </span>

            {/* Icon with slide animation */}
            <span className="relative overflow-hidden w-0 transition-all duration-700 ease-custom group-hover:w-6">
              <LogIn
                className="transition-all duration-700 ease-custom"
                size={24}
              />
            </span>
              </button>
            )}
            <button 
              onClick={() => router.push('/cart')}
              className='relative cursor-pointer hover:scale-110 transition-transform'
            >
              <CartIcon className='w-8 h-8 text-primary group-hover:scale-110 transition-transform' />
              <span className='absolute font-poppins font-semibold top-0 -right-1 bg-primary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                {getCartCount()}
              </span>
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
            {user ? (
              <ProfileIcon />
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
               className="relative  items-center gap-2 border px-5 py-1 rounded-xl font-semibold font-poppins cursor-pointer transition-all duration-600 ease-custom group hover:bg-(--bg-primary) hover:text-(--text-primary) hover:pr-5"
          >
                Login
              </button>
            )}
            <button 
              onClick={() => router.push('/cart')}
              className='relative cursor-pointer hover:scale-110 transition-transform'
            >
              <CartIcon className='w-8 h-8 text-primary group-hover:scale-110 transition-transform' />
              <span className='absolute font-poppins font-semibold top-0 -right-1 bg-primary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                {getCartCount()}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div className={`lg:hidden fixed w-full top-0 left-0 h-full bg-primary text-black z-100  shadow-xl transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className='flex flex-col p-6 h-full'>
          {/* Close Button */}
          <div className='flex justify-end mb-8'>
            <button 
              className='p-2 cursor-pointer hover:scale-110 transition-transform'
              onClick={() => setMobileMenuOpen(false)}
            >
              <CloseIcon className='w-6 h-6' />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className='flex flex-col justify-between w-full h-full'>
          <nav className='flex flex-col font-medium leading-[160%] text-[18px] gap-4'>
            {navConstant.map((item) => (
              <Link 
                className={`relative py-2 block ${
                  pathname === item.href 
                    ? 'text-black' 
                    : 'text-black hover:text-black'
                }`} 
                key={item.name} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className={`relative ${pathname === item.href ? 'border-b-2 border-black' : ''}`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
             <div className="flex gap-2 justify-center items-center text-[14px]">
            <p className='font-poppins text-[20px]'>Website by</p>
            <Link href={'https://voidnepal.com.np/'} target="_blank" rel="noopener noreferrer">
            <Image 
              src={`/logoBlack.svg`} 
              alt="Logo" 
              width={50} 
              height={50} 
              className="w-auto h-5" 
            />
            </Link>
          </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-80'
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  )
}

export default Header
