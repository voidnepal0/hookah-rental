"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilterIcon } from "../../components/icons/FilterIcon";
import { useGetProducts } from "@/services";
import { Product, ProductResponse } from "@/types/productTypes";
import { API_URL } from "@/services/axiosInstance";
import RentalsSkeleton from "@/components/Skeltons/RentalsSkeleton";
import HandledImage from "@/components/common/HandledImage";

interface RentalsClientProps {
  initialProducts?: ProductResponse;
}

const RentalsPage: React.FC<RentalsClientProps> = ({ initialProducts }) => {
  const { theme } = useTheme();
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1200]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const itemsPerPage = 8;

  // Use initial data if provided, otherwise fetch from API
  const apiProduct = useGetProducts();
  const productData = initialProducts || apiProduct.data;

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = new Set(
      (productData?.data as Product[])?.map((p) => p.shopproductcategory?.name),
    );
    return Array.from(cats);
  }, [productData?.data]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    if (productData?.data) {
      (productData?.data as Product[])?.forEach((p) => {
        const categoryName = p.shopproductcategory?.name;
        counts[categoryName] = (counts[categoryName] || 0) + 1;
      });
    }
    return counts;
  }, [productData?.data]);

  // Toggle category filter
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedTypes([]);
    setPriceRange([0, 650]);
    setCurrentPage(1);
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = (productData?.data as Product[])?.filter((p) => {
      // Type filter
      if (
        selectedTypes.length > 0 &&
        !selectedTypes.includes(p.shopproductcategory?.name)
      ) {
        return false;
      }

      // Price filter
      const price =
        p.variants && p.variants.length > 0
          ? (p.variants[0].sellingPrice as number)
          : p.sellingPrice;
      if (price < priceRange[0] || price > priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort
    const sorted = (filtered ? [...filtered] : []).sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return (
            (a.variants && a.variants.length > 0
              ? (a.variants[0].sellingPrice as number)
              : a.sellingPrice) -
            (b.variants && b.variants.length > 0
              ? (b.variants[0].sellingPrice as number)
              : b.sellingPrice)
          );
        case "price-desc":
          return (
            (b.variants && b.variants.length > 0
              ? (b.variants[0].sellingPrice as number)
              : b.sellingPrice) -
            (a.variants && a.variants.length > 0
              ? (a.variants[0].sellingPrice as number)
              : a.sellingPrice)
          );
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default: // recommended
          return 0;
      }
    });

    return sorted;
  }, [selectedTypes, priceRange, sortBy, productData?.data]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  }, [filteredAndSortedProducts, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show skeleton when loading and no initial data
  if (apiProduct.isLoading && !initialProducts) {
    return <RentalsSkeleton />;
  }

  return (
    <React.Fragment>
      <section
        className="w-full max-w-[2000px] mx-auto font-poppins lg:pt-[80px] pt-[55px]"
        style={{
          backgroundColor: "var(--bg-secondary)",
          color: "var(--text-primary)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-between mb-6 font-poppins text-sm">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                Home
              </Link>
              <ChevronRight size={16} className="opacity-60" />
              <span className="font-medium">Rentals</span>
            </div>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden cursor-pointer flex items-center gap-2 p-2 rounded-lg hover:bg-primary transition-colors"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
              }}
            >
              <FilterIcon
                className={`${theme === "dark" ? "text-white" : "text-black"} w-8 h-8`}
              />
            </button>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside
              className="lg:w-78 border-r-2 border-(--border-color) shrink-0"
              style={{
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <div className="sticky hidden lg:block top-8 pr-5 rounded-lg">
                {/* Filters Header */}
                <div className="flex items-center  justify-between  mb-6">
                  <h2 className=" text-[24px] tracking-wider">Filters</h2>
                  <button
                    onClick={clearAllFilters}
                    className="font-poppins cursor-pointer text-sm text-primary hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Types Filter */}
                <div className="mb-8 ">
                  <h3 className="font-poppins font-semibold mb-4">Types</h3>
                  <div className="space-y-3">
                    {categories.map((category, i: number) => (
                      <label
                        key={category || i}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(category as string)}
                            onChange={() => toggleType(category as string)}
                            className="w-5 h-5 rounded border-2 border-gray-400 appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-all"
                          />
                          {selectedTypes.includes(category) && (
                            <svg
                              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-black pointer-events-none"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                        <span className="font-poppins text-sm capitalize group-hover:text-primary transition-colors">
                          {category} ({categoryCounts[category] || 0})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-poppins font-semibold mb-4">
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="1200"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full h-2 rounded-lg  cursor-pointer accent-primary"
                      style={{
                        background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(priceRange[1] / 1200) * 100}%, #d1d5db ${(priceRange[1] / 1200) * 100}%, #d1d5db 100%)`,
                      }}
                    />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-poppins text-sm">Rs</span>
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              Number(e.target.value),
                              priceRange[1],
                            ])
                          }
                          className="w-20 px-2 py-1 border rounded font-poppins text-sm"
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            borderColor: "var(--border-color)",
                          }}
                        />
                      </div>
                      <span className="font-poppins text-sm">To</span>
                      <div className="flex items-center gap-2">
                        <span className="font-poppins text-sm">Rs</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Number(e.target.value),
                            ])
                          }
                          className="w-20 px-2 py-1 border rounded font-poppins text-sm"
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            borderColor: "var(--border-color)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Header with Sort */}
              <div className="flex items-center justify-between mb-6">
                <h1 className=" lg:text-[28px] text-[20px] tracking-wider">
                  Rental Collection
                </h1>

                <div className="flex items-center gap-2">
                  <span className="font-poppins text-sm">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg font-poppins text-sm cursor-pointer"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </div>

              {/* Products Grid or No Products Found */}
              {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">No Products Found</h1>
                  <p className="mb-6 opacity-70">
                    Try adjusting your filters or search terms to find what
                    you&apos;re looking for.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="inline-block px-6 py-2 cursor-pointer bg-primary text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {paginatedProducts.map((prod) => (
                    <div key={prod.id} className="group z-30 relative">
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-20 bg-primary text-black px-3 py-1 rounded-full font-poppins font-bold text-xs uppercase">
                        {prod.shopproductcategory?.name}
                      </div>

                      {/* Image Container - Clickable */}
                      <Link
                        href={`/rentals/${prod.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block relative h-80"
                      >
                        <div className="absolute h-full w-full inset-0 flex items-center justify-center z-10">
                          <HandledImage
                            src={prod.imageUrl}
                            alt={prod.name}
                            width={200}
                            height={200}
                            className={`w-full h-full object-cover transition-all rounded-2xl duration-300`}
                          />
                        </div>
                      </Link>

                      {/* Content - Not clickable */}
                      <div className="">
                        <h3 className="text-[18px] pt-2  uppercase tracking-wider  truncate">
                          {prod.name}
                        </h3>

                        <div className="flex items-center  justify-between">
                          <div>
                            <span className="font-poppins text-sm opacity-70">
                              Per Day
                            </span>
                            <div className="text-[24px] text-primary">
                              Rs{" "}
                              {prod.variants && prod.variants.length > 0
                                ? (prod.variants[0].sellingPrice as number)
                                : prod.sellingPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 cursor-pointer bg-(--bg-primary) rounded-lg transition-colors disabled:cursor-not-allowed hover:bg-primary"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-10 h-10 rounded-lg bg-(--bg-primary) cursor-pointer font-poppins font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-primary text-black"
                            : "hover:bg-primary hover:text-black"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="font-poppins">...</span>
                      <button
                        onClick={() => goToPage(totalPages)}
                        className={`w-10 h-10 rounded-lg font-poppins font-medium transition-colors hover:bg-primary ${theme === "dark" ? "text-white" : "text-black"}`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    onClick={() =>
                      goToPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 cursor-pointer rounded-lg transition-colors disabled:cursor-not-allowed hover:bg-primary bg-(--bg-primary)"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
        <div className="relative pt-60">
          <div className="absolute  bottom-0  right-0 pointer-events-none z-0">
            <Image
              src={
                theme === "dark"
                  ? "/layout/hookahBlack.svg"
                  : "/layout/hookah.svg"
              }
              alt="smoke"
              width={250}
              height={250}
              className="w-auto h-auto"
            />
          </div>
          <div className="absolute  lg:-bottom-10 -bottom-6 left-0 pointer-events-none z-0">
            <Image
              src={
                theme === "dark"
                  ? "/layout/cloudBlack.svg"
                  : "/layout/cloud.svg"
              }
              alt="smoke"
              width={250}
              height={250}
              className="lg:w-auto lg:h-auto"
            />
          </div>
        </div>
      </section>

      {/* Mobile Filter Popup */}
      {mobileFilterOpen && (
        <div
          className="lg:hidden  fixed inset-0 bg-black/50  z-50 transition-opacity duration-300"
          onClick={() => setMobileFilterOpen(false)}
        />
      )}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-(--bg-secondary) text-(--text-primary) shadow-2xl transition-all duration-300 ease-in-out z-50 ${
          mobileFilterOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div className="p-6">
          {/* Filter Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] tracking-wider">Filters</h2>
            <button
              onClick={clearAllFilters}
              className="font-poppins cursor-pointer text-sm text-primary hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Types Filter */}
          <div className="mb-8">
            <h3 className="font-poppins font-semibold mb-4">Types</h3>
            <div className="space-y-3">
              {categories.map((category, index: number) => (
                <label
                  key={category || index}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(category)}
                      onChange={() => toggleType(category)}
                      className="w-5 h-5 rounded border-2 border-gray-400 appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-all"
                    />
                    {selectedTypes.includes(category) && (
                      <svg
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-black pointer-events-none"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="font-poppins text-sm capitalize group-hover:text-primary transition-colors">
                    {category} ({categoryCounts[category] || 0})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-poppins font-semibold mb-4">Price Range</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="1200"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full h-2 rounded-lg cursor-pointer accent-primary"
                style={{
                  background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(priceRange[1] / 1200) * 100}%, #d1d5db ${(priceRange[1] / 1200) * 100}%, #d1d5db 100%)`,
                }}
              />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-poppins text-sm">Rs</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-20 px-2 py-1 border rounded font-poppins text-sm"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                    }}
                  />
                </div>
                <span className="font-poppins text-sm">To</span>
                <div className="flex items-center gap-2">
                  <span className="font-poppins text-sm">Rs</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-20 px-2 py-1 border rounded font-poppins text-sm"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RentalsPage;
