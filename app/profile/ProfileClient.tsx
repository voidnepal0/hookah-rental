'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { User, Mail, Edit2, Save, X } from 'lucide-react'
import type { User as FullUser } from '@/types/userTypes'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import AddressManager from '@/components/profile/AddressManager'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'

const ProfileClient = () => {
  const { user, fullUser, refreshUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<Partial<FullUser>>({})
  const [isLoading, setIsLoading] = useState(false)
  const {theme} = useTheme();
  useEffect(() => {
    if (user && !fullUser) {
      console.log('Fetching user data for:', user.email)
      refreshUser()
    }
  }, [user, fullUser, refreshUser])

  useEffect(() => {
    if (fullUser) {
      console.log('Full user data received:', fullUser)
      setEditedUser(fullUser)
    }
  }, [fullUser])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedUser(fullUser || {})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedUser(fullUser || {})
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement update user API call
      // For now, just refresh the user data
      await refreshUser()
      setIsEditing(false)
      toast.success('Profile updated successfully! 🎉')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again. ❌')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof FullUser, value: string) => {
    setEditedUser((prev: Partial<FullUser>) => ({
      ...prev,
      [field]: value
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Please Login
          </h1>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            You need to be logged in to view your profile.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--text-primary)",
            }}
          >
            Go to Login
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    )
  }

  const displayName = fullUser?.name || user.name || user.email
  const initials = displayName
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)

  return (
    <div className="lg:pt-20 pt-15 max-w-[2000px] mx-auto" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex  items-center  gap-2 text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            <Link href="/" className="opacity-60 transition-opacity hover:opacity-100">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>
              My Profile
            </span>
          </nav>
          
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            My Profile
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Manage your personal information and account settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-lg border p-6 mb-6"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)"
          }}
        >
          <div className="flex items-cente justify-between mb-6">
            <div className="flex  items-center gap-4">
              <div className="w-auto h-auto rounded-full p-2 bg-primary text-black flex items-center justify-center font-bold text-2xl">
                {initials}
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {displayName}
                </h2>
                <p style={{ color: "var(--text-secondary)" }}>
                  Member since {fullUser ? new Date(fullUser.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex bg-primary h-10 cursor-pointer items-center gap-2 px-4  rounded-lg font-medium transition-colors"
                 
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center h-10 bg-primary cursor-pointer gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{
                      opacity: isLoading ? 0.7 : 1
                    }}
                  >
                    <Save size={18} />
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center h-10 cursor-pointer gap-2 px-4 py-2 rounded-lg font-medium transition-colors border"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                <User size={16} />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
              ) : (
                <p style={{ color: "var(--text-primary)" }}>
                  {fullUser?.name || user.name || 'Not set'}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                <Mail size={16} />
                Email Address
              </label>
              <p style={{ color: "var(--text-primary)" }}>
                {user.email}
              </p>
            </div>

            {/* <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                <Phone size={16} />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedUser.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Add your phone number"
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
              ) : (
                <p style={{ color: "var(--text-primary)" }}>
                  {fullUser?.phone || 'Not added'}
                </p>
              )}
            </div> */}

            {/* <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                <MapPin size={16} />
                Address
              </label>
              {isEditing ? (
                <textarea
                  value={editedUser.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Add your address"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
              ) : (
                <p style={{ color: "var(--text-primary)" }}>
                  {fullUser?.address || 'Not added'}
                </p>
              )}
            </div> */}
          </div>
        </div>

        {/* Delivery Addresses */}
        <div className="rounded-lg relative z-10 border p-6"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)"
          }}
        >
          <AddressManager />
        </div>
      </div>
      <div className='relative pt-60'>
        <div className="absolute bottom-0 right-0 pointer-events-none z-0">
          <Image 
            src={theme === 'dark' ? '/layout/hookahBlack.svg' : '/layout/hookah.svg'} 
            alt="smoke" 
            width={250} 
            height={250} 
            className="w-auto h-auto" 
          />
        </div>
        <div className="absolute lg:-bottom-10 -bottom-6 left-0 pointer-events-none z-0">
          <Image 
            src={theme === 'dark' ? '/layout/cloudBlack.svg' : '/layout/cloud.svg'} 
            alt="smoke" 
            width={250} 
            height={250} 
            className="lg:w-auto lg:h-auto" 
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileClient
