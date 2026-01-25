"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import { Trash2 } from 'lucide-react';
import { HookahIcon } from '@/components/icons/HookahIcon';
import toast from 'react-hot-toast';
import { getProductByIdOrName } from '@/services/api/productApi';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

// Define proper types for product details
interface ProductDetails {
  id: string;
  name: string;
  sellingPrice?: number;
  variants?: Array<{ sellingPrice?: number }>;
  imageUrl?: string;
  description?: string;
  brand?: { name: string };
  shopProductCategory?: { name: string };
}

const CartClient = () => {
  const { theme } = useTheme();
  const { cartItems, removeFromCart, updateQuantity, getCartCount } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [productDetails, setProductDetails] = useState<Record<string, ProductDetails>>({});

  // Fetch product details for cart items
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cartItems.length === 0) return;
      
      const details: Record<string, ProductDetails> = {};
      
      for (const item of cartItems) {
        try {
          // Use the existing getProductByIdOrName function
          const product = await getProductByIdOrName(item.productId);
          if (product) {
            details[item.productId] = product;
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
          // Don't show error toast here - CartContext handles it
        }
      }
      
      setProductDetails(details);
    };

    fetchProductDetails();
  }, [cartItems]);

  const subtotal = Object.entries(productDetails).reduce((total, [productId, product]) => {
    const cartItem = cartItems.find(item => item.productId === productId);
    if (!cartItem) return total;
    
    const price = cartItem.duration === 'hour' 
      ? (product.variants?.[0]?.sellingPrice || product.sellingPrice || 0)
      : ((product.variants?.[0]?.sellingPrice || product.sellingPrice || 0) * 10);
    
    return total + (price * cartItem.quantity);
  }, 0);
  
  const itemCount = getCartCount();
  const discount = voucherApplied ? voucherAmount : 0;
  const total = subtotal - discount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'hookah10') {
      setVoucherApplied(true);
      setVoucherAmount(Math.round(subtotal * 0.1)); // 10% discount
      toast.success('Coupon applied successfully! 10% discount');
    } else if (couponCode === '') {
      toast.error('Please enter a coupon code');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const cartImage = theme === 'dark' ? '/cart/whiteCart.svg' : '/cart/grayCart.svg';
  const hookahImage = theme === 'dark' ? '/layout/hookahBlack.svg' : '/layout/hookah.svg';
  const cloudImage = theme === 'dark' ? '/layout/cloudBlack.svg' : '/layout/cloud.svg';

  return (
    <>
      <section 
        className="w-full max-w-[2000px] mx-auto font-poppins lg:pt-[80px] pt-[55px] relative"
        style={{
          backgroundColor: "var(--bg-secondary)",
          color: "var(--text-primary)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center mb-6 font-poppins text-sm">
            <div className="flex items-center gap-2">
              <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">
                Home
              </Link>
              <ChevronRight size={16} className="opacity-60" />
              <span className="font-medium">Cart</span>
            </div>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="flex-1">
   
              
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <Image 
                    src={cartImage} 
                    alt="Empty Cart" 
                    width={120} 
                    height={120} 
                    className="mx-auto w-50 h-50 mb-6"
                  />
                  <p className="text-lg mb-4">Your cart is empty</p>
                  <Link 
                    href="/rentals"
                    className='relative cursor-pointer bg-[#F5C400] text-black rounded-full py-3 pl-8 pr-16 hover:bg-[#FFD700] transition-all duration-300 group inline-flex items-center'
                  >
                    <span className='font-bebas-neue text-lg md:text-xl tracking-wide'>RENT A HOOKAH</span>
                    <HookahIcon 
                      className="absolute w-8 h-8 md:w-10 md:h-10 top-1/2 right-4 transform -translate-y-1/2 text-black group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                </div>
              ) : (
                <>
                  {/* Table Header */}
                  <div className={`grid grid-cols-12 gap-4 pb-4 border-b ${theme === 'dark' ? 'border-black' : 'border-gray-200'} font-semibold text-sm`}>
                    <div className="col-span-6">Product</div>
                    <div className="col-span-3 text-center">Quantity</div>
                    <div className="col-span-3 text-right">Price</div>
                  </div>

                  {/* Cart Items */}
                  {cartItems.map((item) => {
                    const product = productDetails[item.productId];
                    if (!product) return null;
                    
                    const price = item.duration === 'hour' 
                      ? (product.variants?.[0]?.sellingPrice || product.sellingPrice || 0)
                      : ((product.variants?.[0]?.sellingPrice || product.sellingPrice || 0) * 10);
                    
                    return (
                      <div key={item.productId} className={`grid grid-cols-12 gap-4 py-4 border-b ${theme === 'dark' ? 'border-black' : 'border-gray-200'} items-center`}>
                        <div className="col-span-6">
                          <h3 className="font-medium">{product.name}</h3>
                        
                        </div>
                        <div className="col-span-3">
                          <div className="flex items-center  justify-center">
                            <div className="flex items-center p-1 border-2 border-primary rounded-[27px] justify-around gap-1 w-24 sm:w-32">
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer rounded-full bg-primary text-black flex items-center justify-center font-bold hover:bg-yellow-400 transition-colors text-xs sm:text-sm"
                              >
                                -
                              </button>
                              <span className="flex-1 text-center font-medium text-xs sm:text-sm">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer rounded-full bg-primary text-black flex items-center justify-center font-bold hover:bg-yellow-400 transition-colors text-xs sm:text-sm"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-right flex items-center justify-between">
                          <span className="font-medium">
                            Rs {price}{item.duration === 'hour' ? '/hour' : '/day'}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="ml-4 text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Rent Button */}
                  <div className="mt-8 text-center">
                    <Link 
                      href="/rentals"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--text-primary)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      <HookahIcon className="w-5 h-5" />
                      RENT A HOOKAH
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="lg:w-116">
                <div 
                  className="lg:p-6 rounded-lg"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                   
                  }}
                >
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Sub Total ({itemCount} items)</span>
                      <span className="font-medium">Rs {subtotal}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter Coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded"
                        style={{
                          borderColor: "var(--primary)",
                          backgroundColor: "var(--bg-secondary)",
                          color: "var(--text-secondary)",
                        }}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 text-black cursor-pointer rounded-[8px] bg-primary font-medium transition-colors"
                       
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.8";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                      >
                        Apply
                      </button>
                    </div>

                    {voucherApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Voucher Applied</span>
                        <span className="font-medium">Rs {discount}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-lg pt-4 border-t">
                      <span>Total Price</span>
                      <span>Rs {total}</span>
                    </div>
                  </div>

                  <button
                    className="w-full text-black cursor-pointer py-3 bg-primary rounded-[100px] font-semibold transition-colors flex items-center justify-center gap-2"
                    
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    Next
                <ArrowRightIcon className='w-5 h-5' />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='relative pt-60'>
          <div className="absolute  bottom-0  right-0 pointer-events-none z-0">
            <Image src={hookahImage} alt="Hookah" width={250} height={250} className="w-auto h-auto" />
          </div>
          <div className="absolute  lg:-bottom-10 -bottom-6 left-0 pointer-events-none z-0">
            <Image src={cloudImage} alt="Cloud" width={250} height={250} className="lg:w-auto lg:h-auto" />
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      )}
    </>
  );
};

export default CartClient;