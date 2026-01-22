"use client"
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import Image from 'next/image'
import type { Login, Register } from '../../types/authTypes'
import darkLogo from '@/public/logoDark.svg';
import logo from '@/public/Logo.svg';

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [formData, setFormData] = useState<Login | Register>({
    email: '',
    password: '',
    name: '',
    role: 'user'
  })
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const { login, register, error, clearError } = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (activeTab === 'login') {
        await login(formData as Login)
        onClose()
      } else {
        await register(formData as Register)
        onClose()
      }
    } catch {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false)
    }
  }

  const switchTab = (tab: 'login' | 'register') => {
    setActiveTab(tab)
    setFormData({
      email: '',
      password: '',
      name: '',
      role: 'user'
    })
    clearError()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-28 p-4 overflow-y-auto scrollbar-hide">
      <div className="bg-(--bg-primary) relative text-(--text-primary) rounded-lg shadow-xl w-full max-w-md font-poppins min-h-fit max-h-[90vh] overflow-y-auto">
        {/* Header with Logo */}
        <div className="flex flex-col items-center p-6 border-b border-(--border-color)">
            <div>
                <h2 className='font-poppins font-medium text-[28px] lg:text-[42px]'>Welcome to</h2>
            </div>
          <div className="mb-4">
            <Image 
              src={theme === 'dark' ? logo : darkLogo} 
              alt="Logo" 
              width={120} 
              height={120} 
              className='lg:w-120 lg:h-40 w-60 h-20' 
            />
          </div>
        
         
        </div>
 <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 cursor-pointer hover:bg-red-500/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-(--text-secondary) hover:text-red-500 transition-colors" />
          </button>
        {/* Tabs */}
        <div className="flex border-b border-(--border-color)">
          <button
            onClick={() => switchTab('login')}
            className={`flex-1 py-3 cursor-pointer px-4 text-sm font-medium font-poppins transition-colors ${
              activeTab === 'login'
                ? 'text-primary border-2 border-primary bg-black'
                : 'text-(--text-secondary) hover:text-(--text-primary)'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => switchTab('register')}
            className={`flex-1 cursor-pointer py-3 px-4 text-sm font-medium font-poppins transition-colors ${
              activeTab === 'register'
                ? 'text-primary border-2 border-primary bg-black'
                : 'text-(--text-secondary) hover:text-(--text-primary)'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-(--text-primary) mb-1 font-poppins">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={(formData as Register).name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-(--border-color) rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-(--bg-primary) text-(--text-primary)"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-(--text-primary) mb-1 font-poppins">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-(--border-color) rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-(--bg-primary) text-(--text-primary)"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-(--text-primary) mb-1 font-poppins">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-(--border-color) rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-(--bg-primary) text-(--text-primary)"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-primary text-black py-2 px-4 rounded-md font-medium font-poppins hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              activeTab === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-(--bg-secondary) border-t border-(--border-color) rounded-b-lg">
          <p className="text-sm text-(--text-secondary) text-center font-poppins">
            {activeTab === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchTab('register')}
                  className="text-primary cursor-pointer font-medium font-poppins hover:text-primary/80 transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchTab('login')}
                  className="text-primary font-medium font-poppins hover:text-primary/80 transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
