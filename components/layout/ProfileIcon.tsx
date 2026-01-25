'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { User, LogOut, ChevronDown } from 'lucide-react'

const ProfileIcon = () => {
  const { user, fullUser, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const displayName = fullUser?.name || user.name || user.email
  const initials = displayName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
    setShowLogoutModal(false)
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex cursor-pointer items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          style={{
            backgroundColor: isDropdownOpen ? "var(--bg-secondary)" : "transparent"
          }}
        >
          <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center font-semibold text-sm">
            {initials}
          </div>
          <ChevronDown 
            size={16} 
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            style={{ color: "var(--text-primary)" }}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg border z-50"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)"
            }}
          >
            <div className="p-4 border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-semibold">
                  {initials}
                </div>
                <div>
                  <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                    {displayName}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                style={{ color: "var(--text-primary)" }}
                onClick={() => setIsDropdownOpen(false)}
              >
                <User size={18} />
                <span>My Profile</span>
              </Link>

              {/* <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                style={{ color: "var(--text-primary)" }}
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link> */}

              <button
                onClick={() => {
                  setIsDropdownOpen(false)
                  setShowLogoutModal(true)
                }}
                className="flex cursor-pointer items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-red-600"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-(--bg-secondary) relative text-(--text-primary) rounded-[16px] shadow-xl w-full max-w-md font-poppins">
            {/* Content */}
            <div className="p-6">
              <div className="flex justify-center items-center mb-8">
                <div className={`flex justify-center items-center w-24 h-24 rounded-full bg-[#AA1F1F] text-white`}>
                  <LogOut size={64} />
                </div>
              </div>
              <h2 className='font-bold mb-2 text-xl' style={{ color: "var(--text-primary)" }}>Log Out</h2>
              <p className="text-(--text-secondary) font-poppins mb-6">
                Are you sure you want to log out ? 
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex w-full border items-center justify-center border-(--border-color) text-(--text-secondary) py-2 px-4 rounded-md font-medium font-poppins hover:bg-(--bg-secondary) transition-colors cursor-pointer"
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 bg-[#AA1F1F] text-white py-2 px-4 rounded-md font-medium font-poppins hover:bg-red-600 transition-colors cursor-pointer"
                >
                   <LogOut size={20} />
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

export default ProfileIcon
