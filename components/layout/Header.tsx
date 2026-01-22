"use client"
import React, { useState } from 'react'
import { CartIcon } from '../icons/CartIcon'
import { navConstant } from '../../constants/navConstant'
import Image from 'next/image'
import {UserIcon} from '../icons/UserIcon'
import { SunIcon } from '../icons/SunIcon'
import { MoonIcon } from '../icons/MoonIcon'
import { MenuIcon, CloseIcon } from '../icons/MenuIcon'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import darkLogo from '@/public/logoDark.svg';
import logo from '@/public/Logo.svg';
import { LogIn} from 'lucide-react';
import AuthModal from '../auth/AuthModal';
import { LogOutIcon } from '../icons/LogoutIcon'
import { useToast } from '../../hooks/useToast';
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const {success} = useToast();
  // Check if we're on a product detail page (under /rentals/)
  const isProductDetailPage = pathname.startsWith('/rentals/');

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setUserDropdownOpen(false);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleUserIconClick = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogoutConfirm = () => {
    logout();
    setLogoutConfirmOpen(false);
    success('Successfully logged out!');
    
  };

  const handleLogoutCancel = () => {
    setLogoutConfirmOpen(false);
  };

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
              <div className='relative'>
                <button 
                  onClick={handleUserIconClick}
                  className='group bg-primary rounded-full p-1 cursor-pointer hover:scale-110 transition-transform'
                  title="User menu"
                >
                  <UserIcon className='w-6 h-6 text-primary group-hover:scale-110 transition-transform' />
                </button>
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    onMouseEnter={() => {
                      if (hoverTimeout) {
                        clearTimeout(hoverTimeout);
                      }
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-3 border-b border-gray-200">
                      <p className="font-semibold font-poppins text-gray-800 text-sm">{user?.email}</p>
                      
                    </div>
                    <button
                      onClick={() => {
                        setLogoutConfirmOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      aria-label="Logout from account"
                      className="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      
                      <LogOutIcon className='w-4 h-4' />
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
            {user ? (
              <div className='relative'>
                <button 
                  onClick={handleUserIconClick}
                  className='group bg-primary rounded-full p-1 cursor-pointer hover:scale-110 transition-transform'
                  title="User menu"
                >
                  <UserIcon className='w-6 h-6 text-primary group-hover:scale-110 transition-transform' />
                </button>
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    onMouseEnter={() => {
                      if (hoverTimeout) {
                        clearTimeout(hoverTimeout);
                      }
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-3 border-b border-gray-200">
                      <p className="font-semibold text-gray-800 text-sm">{user?.email}</p>
                      <p className="text-xs text-gray-500">Role: {user?.role}</p>
                    </div>
                    <button
                      onClick={() => {
                        setLogoutConfirmOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      aria-label="Logout from account"
                      className="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOutIcon className='w-4 h-4' />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
               className="relative  items-center gap-2 border px-5 py-1 rounded-xl font-semibold font-poppins cursor-pointer transition-all duration-600 ease-custom group hover:bg-(--bg-primary) hover:text-(--text-primary) hover:pr-5"
          >
                Login
              </button>
            )}
            <button className='relative cursor-pointer hover:scale-110 transition-transform'>
              <CartIcon className='w-8 h-8 text-primary group-hover:scale-110 transition-transform' />
              <span className='absolute font-poppins font-semibold top-0 -right-1 bg-primary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center'>3</span>
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

      {/* Logout Confirmation Modal */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-(--bg-secondary) relative text-(--text-primary) rounded-[16px] shadow-xl w-full max-w-md font-poppins">
            {/* Header */}
            

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-center items-center mb-8">
                <div className={`flex justify-center items-center w-24 h-24 rounded-full ${theme === 'dark' ? 'text-white bg-[#AA1F1F]' : 'text-red-700 bg-red-100'}`}>
                  <LogOutIcon className="w-16 h-16" />
                </div>
              </div>
              <h2 className='font-bold mb-2'>Log Out</h2>
              <p className=" text-(--text-secondary) font-poppins mb-6">
                Are you sure you want to log out ? 
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleLogoutCancel}
                  className="flex w-full border items-center justify-center border-(--border-color) text-(--text-secondary) py-2 px-4 rounded-md font-medium font-poppins hover:bg-(--bg-secondary) transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="flex w-full items-center gap-5  bg-[#AA1F1F] text-white py-2 px-4 rounded-md font-medium font-poppins hover:bg-red-600 transition-colors cursor-pointer"
                >
                   <LogOutIcon className="w-7 h-7" />
                   <p>Yes, Log Out</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
