'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

interface CartItem {
  productId: string
  quantity: number
  duration: 'day'
  addons: string[]
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user } = useAuth()
  
  // Initialize cart state with an empty array
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const loadCart = () => {
      let cart: CartItem[] = []
      
      // If user is logged in, try to load their cart
      if (user) {
        try {
          const userCart = localStorage.getItem(`cart_${user.id}`)
          if (userCart) {
            const parsed = JSON.parse(userCart)
            if (Array.isArray(parsed)) {
              cart = parsed
            }
          }
        } catch (error) {
          console.error('Error loading user cart:', error)
          localStorage.removeItem(`cart_${user.id}`)
        }
      } else {
        // Fallback to old cart format for non-logged in users
        try {
          const savedCart = localStorage.getItem('cart')
          if (savedCart) {
            const parsed = JSON.parse(savedCart)
            if (Array.isArray(parsed)) {
              cart = parsed
            }
          }
        } catch (error) {
          console.error('Error loading cart:', error)
          localStorage.removeItem('cart')
        }
      }
      
      // Use setTimeout to avoid cascading renders
      setTimeout(() => {
        setCartItems(cart)
        setIsInitialized(true)
      }, 0)
    }
    
    loadCart()
  }, [user])

  // Handle user changes
  useEffect(() => {
    if (!isInitialized) return
    
    const updateCartForUser = () => {
      // When user logs in/out, we need to update the cart
      if (user) {
        // User logged in - try to load their cart
        try {
          const userCart = localStorage.getItem(`cart_${user.id}`)
          if (userCart) {
            const parsed = JSON.parse(userCart)
            if (Array.isArray(parsed)) {
              setTimeout(() => setCartItems(parsed), 0)
              return
            }
          }
        } catch (error) {
          console.error('Error loading user cart on auth change:', error)
          localStorage.removeItem(`cart_${user.id}`)
        }
      } else {
        // User logged out - try to load guest cart
        try {
          const guestCart = localStorage.getItem('cart')
          if (guestCart) {
            const parsed = JSON.parse(guestCart)
            if (Array.isArray(parsed)) {
              setTimeout(() => setCartItems(parsed), 0)
              return
            }
          }
        } catch (error) {
          console.error('Error loading guest cart:', error)
          localStorage.removeItem('cart')
        }
      }
      
      // If we get here, either there's no cart or there was an error
      setTimeout(() => setCartItems([]), 0)
    }
    
    updateCartForUser()
  }, [user, isInitialized])

  // Sync cart to localStorage when it changes
  useEffect(() => {
    // Skip if not initialized yet or no window object
    if (typeof window === 'undefined' || !isInitialized) return
    
    const saveCart = () => {
      // If user is logged in, save to their user-specific cart
      if (user) {
        if (cartItems.length > 0) {
          localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems))
        } else {
          localStorage.removeItem(`cart_${user.id}`)
        }
      } else {
        // For non-logged in users, use the old format
        if (cartItems.length > 0) {
          localStorage.setItem('cart', JSON.stringify(cartItems))
        } else {
          localStorage.removeItem('cart')
        }
      }
    }
    
    saveCart()
  }, [cartItems, user, isInitialized])

  // Track toast IDs to prevent duplicates
  const toastIds = React.useRef<Record<string, string>>({})

  const showToast = React.useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const toastId = toastIds.current[message]
    if (toastId) {
      toast.dismiss(toastId)
    }
    const id = type === 'success' 
      ? toast.success(message, { id: toastId })
      : toast.error(message, { id: toastId })
    toastIds.current[message] = id
  }, [])

  const removeFromCart = React.useCallback((productId: string) => {
    setCartItems((prevItems: CartItem[]) => {
      const item = prevItems.find((item: CartItem) => item.productId === productId)
      const newItems = prevItems.filter((item: CartItem) => item.productId !== productId)
      if (item) {
        // Schedule the toast to show after the state update
        setTimeout(() => showToast('Item removed from cart'), 0)
        return newItems
      }
      return prevItems.filter(item => item.productId !== productId)
    })
  }, [showToast])

  const clearCart = React.useCallback(() => {
    setCartItems([])
    // Schedule the toast to show after the state update
    setTimeout(() => showToast('Cart cleared successfully'), 0)
  }, [showToast])

  const updateQuantity = React.useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }, [removeFromCart])

  const addToCart = React.useCallback((item: Omit<CartItem, 'quantity'>) => {
    if (!user) {
      showToast('Please login to add items to cart', 'error')
      return
    }

    setCartItems((prevItems: CartItem[]) => {
      const existingItem = prevItems.find((cartItem: CartItem) => cartItem.productId === item.productId)
      if (existingItem) {
        // Schedule toast after state update
        setTimeout(() => showToast('Item quantity updated in cart'), 0)
        return prevItems.map(cartItem =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      // Schedule toast after state update
      setTimeout(() => showToast('Item added to cart successfully!'), 0)
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }, [user, showToast])

  const getCartTotal = React.useCallback((): number => {
    // This will need to be calculated from server data
    // For now, return 0 as placeholder
    return 0
  }, [])

  const getCartCount = React.useCallback((): number => {
    // Return the number of unique items in the cart
    return cartItems.length;
  }, [cartItems])

  const value = React.useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  }), [
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  ])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
