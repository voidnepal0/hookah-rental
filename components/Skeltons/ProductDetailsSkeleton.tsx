import React from 'react'

const ProductDetailsSkeleton = () => {
  return (
    <div className="relative max-w-[2000px] mx-auto lg:pt-[80px] pt-[50px]" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb Skeleton */}
        <nav className="flex items-center gap-2 mb-6 text-sm">
          <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">
          {/* Left Side - Thumbnails + Main Image */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Vertical Thumbnail Strip */}
            <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse"
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full lg:w-[400px] h-[400px] lg:h-[500px] bg-gray-300 dark:bg-gray-600 rounded-2xl order-1 lg:order-2 animate-pulse">
              {/* Category Badge Skeleton */}
              <div className="absolute top-4 left-4">
                <div className="h-6 w-16 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-4"></div>
              
              {/* Pricing Section */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
                  <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
                <div className="text-right">
                  <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
                  <div className="h-7 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="h-3 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 max-w-[180px] py-1 rounded-full justify-around w-full gap-3">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between py-4 border-t border-gray-300 dark:border-gray-600">
              <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="h-8 w-28 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>

            {/* Add to Cart Button */}
            <div className="w-full py-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse h-12"></div>
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="lg:mt-30 mt-20 pb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="bg-gray-300 dark:bg-gray-600 h-10 lg:h-15 w-3 animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
            {/* Desktop Navigation Arrows */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="p-2 w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              <div className="p-2 w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Recommended Products Grid */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative overflow-hidden rounded-2xl lg:w-[260px] w-[220px] shrink-0">
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="h-6 w-16 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Image Container */}
                  <div className="h-[450px] bg-gray-300 dark:bg-gray-600 rounded-2xl animate-pulse"></div>

                  {/* Content */}
                  <div className="mt-1 space-y-2">
                    <div className="h-5 w-full bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Navigation Arrows */}
          <div className="lg:hidden flex justify-center gap-4 mt-4">
            <div className="p-3 w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            <div className="p-3 w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsSkeleton