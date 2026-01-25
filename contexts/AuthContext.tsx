'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useLogin, useRegister } from '@/services/api/authApi'
import { getCurrentUser } from '@/services/api/userApi'
import type { Login, Register } from '@/types/authTypes'
import type { User as FullUser } from '@/types/userTypes'

interface User {
  id: string
  email: string
  role: string
  role_id?: string
  name?: string
  phone?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  fullUser: FullUser | null
  isLoading: boolean
  error: string | null
  login: (credentials: Login) => Promise<void>
  register: (userData: Register) => Promise<void>
  logout: () => void
  clearError: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [fullUser, setFullUser] = useState<FullUser | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loginMutation = useLogin()
  const registerMutation = useRegister()

  const refreshUser = async () => {
    try {
      console.log('Refreshing user data...')
      const userData = await getCurrentUser()
      console.log('User data from API:', userData)
      if (userData) {
        setFullUser(userData)
        setUser({
          id: userData.id,
          email: userData.email,
          role: userData.role, // Use the actual role from API
          name: userData.name,
          phone: userData.phone,
          address: userData.address
        })
        console.log('User state updated successfully')
      }
    } catch (error) {
      console.error('Error refreshing user data:', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        // Fetch full user data
        refreshUser()
      } catch {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = async (credentials: Login) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await loginMutation.mutateAsync(credentials)
      setUser(response.data.user)
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      // Fetch full user data after login
      await refreshUser()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: Register) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await registerMutation.mutateAsync(userData)
      setUser(response.user)
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('user', JSON.stringify(response.user))
      // Fetch full user data after register
      await refreshUser()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setFullUser(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setError(null)
  }

  const clearError = () => {
    setError(null)
  }

  const value: AuthContextType = {
    user,
    fullUser,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
