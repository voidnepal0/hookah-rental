import React from 'react'

const RentalsSkeleton = () => {
  return (
    <div className="relative max-w-[2000px] mx-auto lg:pt-[80px] pt-[50px]" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="h-12 w-48 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse mx-auto"></div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
            
            {/* Filter and Sort Controls */}
            <div className="flex gap-4 items-center">
              <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
              <div className="lg:hidden h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105">
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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            ))}
          </div>
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default RentalsSkeleton
