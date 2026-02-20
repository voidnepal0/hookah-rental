/* @react-compiler-disable */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useGetProducts } from "@/services";
import { Product, ProductAddon } from "@/types/productTypes";
import { API_URL } from "@/services/axiosInstance";
import ProductDetailsSkeleton from "@/components/Skeltons/ProductDetailsSkeleton";
import AuthModal from "@/components/auth/AuthModal";

interface ProductDetailsClientProps {
  initialProduct: {
    id: string;
    name: string;
    description: string;
    sellingPrice: number;
    brand: {
      name: string;
    } | null;
    shopProductCategory: {
      name: string;
    } | null;
    variants: {
      sellingPrice: number;
    }[];
    addons: {
      id: string;
      name: string;
      additionalPrice: number;
    }[];
    imageUrl: string;
    secondaryImageUrls: string[];
  } | null;
}

const ProductDetailsClient = ({
  initialProduct,
}: ProductDetailsClientProps) => {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration] = useState<"day">("day");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Use the initial product from server-side props
  const [currentProduct, setCurrentProduct] = useState(initialProduct);

  // Fallback client-side fetch if initialProduct is not available
  useEffect(() => {
    if (!currentProduct && typeof window !== "undefined") {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `/api/products/${window.location.pathname.split("/").pop()}`,
          );
          if (response.ok) {
            const product = await response.json();
            setCurrentProduct(product);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    }
  }, [currentProduct]);

  // Fetch all products to find the matching one by name
  const { data: allProducts, isLoading: isProductsLoading } = useGetProducts(
    1,
    100,
  );

  // Get recommended products (excluding current product)
  const recommendedProducts = (() => {
    if (!allProducts?.data || !currentProduct) return [];
    return allProducts.data
      .filter((prod: Product) => prod.id !== currentProduct.id)
      .slice(0, 8);
  })();

  // Handle add to cart
  const handleAddToCart = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!currentProduct) return;

    const cartItem = {
      productId: currentProduct.id, // Use the UUID instead of name
      duration: selectedDuration,
      addons: selectedAddons,
    };

    addToCart(cartItem);
  };

  // Toggle addon selection
  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    );
  };

  // Create array of images (main image + secondary images)
  const productImages = (() => {
    if (!currentProduct) return [];
    const images = [
      API_URL
        ? `${API_URL}${currentProduct.imageUrl}`
        : currentProduct.imageUrl,
    ];
    if (
      currentProduct.secondaryImageUrls &&
      currentProduct.secondaryImageUrls.length > 0
    ) {
      const secondaryImages = currentProduct.secondaryImageUrls.map((url) =>
        API_URL ? `${API_URL}${url}` : url,
      );
      images.push(...secondaryImages);
    }
    // Fill remaining slots with placeholders if needed
    while (images.length < 4) {
      images.push("/placeholder.png");
    }
    return images.slice(0, 4); // Ensure max 4 images
  })();

  // Get pricing from variants or fallback to selling price
  const getPrice = () => {
    if (!currentProduct) return { daily: 0 };

    if (currentProduct.variants && currentProduct.variants.length > 0) {
      const variant = currentProduct.variants[0];
      return {
        daily: variant.sellingPrice || 0,
      };
    }

    return {
      daily: currentProduct.sellingPrice || 0,
    };
  };

  const { daily } = getPrice();

  // Calculate addons total
  const addonsTotal = selectedAddons.reduce(
    (total: number, addonId: string) => {
      const addon = currentProduct?.addons?.find(
        (a: ProductAddon) => a.id === addonId,
      );
      return total + (Number(addon?.additionalPrice) || 0);
    },
    0,
  );

  const totalPrice = (daily + addonsTotal) * quantity;

  const productDisplayName = currentProduct?.name || "Unknown Product";

  const scrollRecommendedLeft = () => {
    const container = document.getElementById("recommended-scroll-container");
    if (container) {
      const scrollAmount = window.innerWidth >= 1024 ? 276 : 236;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRecommendedRight = () => {
    const container = document.getElementById("recommended-scroll-container");
    if (container) {
      const scrollAmount = window.innerWidth >= 1024 ? 276 : 236;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!currentProduct) {
    return <ProductDetailsSkeleton />;
  }

  if (isProductsLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!allProducts?.data) {
    return (
      <div
        className="min-h-screen lg:pt-[160px] max-w-[2000px] mx-auto pt-[80px] flex items-center justify-center"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/rentals"
            className="inline-block px-6 py-2 bg-primary text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
          >
            Back to Rentals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section
      className=" relative max-w-[2000px] mx-auto lg:pt-[80px] pt-[50px]"
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-sm">
          <Link
            href="/"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            Home
          </Link>
          <ChevronRight size={16} className="opacity-60" />
          <Link
            href="/rentals"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            Rentals
          </Link>
          <ChevronRight size={16} className="opacity-60" />
          <span className="font-medium">{productDisplayName}</span>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6">
          {/* Left Side - Thumbnails + Main Image */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Vertical Thumbnail Strip */}
            <div className="flex lg:flex-col font-poppins gap-3 order-2 lg:order-1">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden shrink-0 transition-all ${
                    currentImageIndex === index
                      ? "ring-2 ring-primary"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${productDisplayName} ${index + 1}`}
                    fill
                    className="sm:object-cover"
                    sizes="(max-width: 1024px) 80px, 96px"
                    priority
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div
              className="relative w-full lg:w-[400px] h-[600px] sm:h-[500px] rounded-2xl overflow-hidden order-1 lg:order-2"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              {currentProduct.shopProductCategory && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-primary text-black px-3 py-1 rounded-full font-bold text-xs uppercase">
                    {currentProduct.shopproductcategory?.name}
                  </span>
                </div>
              )}
              <Image
                src={productImages[currentImageIndex] || "/placeholder.png"}
                alt={productDisplayName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 400px, 500px"
                priority
              />
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6 font-poppins">
            {/* Product Title */}
            <div className="">
              <h1 className="text-3xl font-bold mb-2">{productDisplayName}</h1>

              {/* Pricing Section */}
              <div className="flex items-center justify-between">
                <div className="text-sm ">Per Day</div>
                <div className="text-xl text-primary font-bold">Rs {daily}</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="leading-relaxed text-sm opacity-90">
                {currentProduct.description}
              </p>
              {currentProduct.brand && (
                <div className="mt-2">
                  <span className="text-xs opacity-70">Brand: </span>
                  <span className="text-xs font-medium">
                    {currentProduct.brand.name}
                  </span>
                </div>
              )}
              {/* {currentProduct.sku && (
                <div className="mt-1">
                  <span className="text-xs opacity-70">SKU: </span>
                  <span className="text-xs font-medium">{currentProduct.sku}</span>
                </div>
              )} */}
            </div>

            {/* Addons Section */}
            {currentProduct.addons && currentProduct.addons.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-lg">Available Addons</h3>
                <div className="space-y-2">
                  {currentProduct.addons.map((addon: ProductAddon) => (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                      style={{ borderColor: "var(--border-primary)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedAddons.includes(addon.id)
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedAddons.includes(addon.id) && (
                            <span className="text-black text-xs">✓</span>
                          )}
                        </div>
                        <span className="font-medium">{addon.name}</span>
                      </div>
                      <span className="text-primary font-bold">
                        Rs {addon.additionalPrice}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center border-2 border-primary max-w-[180px] py-1 rounded-full justify-around w-full gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 cursor-pointer rounded-full bg-primary text-black flex items-center justify-center font-bold hover:bg-yellow-400 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 cursor-pointer rounded-full bg-primary text-black flex items-center justify-center font-bold hover:bg-yellow-400 transition-colors"
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between py-4">
              <span className="font-medium">Total Price</span>
              <span className="text-xl font-bold">Rs {totalPrice}</span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 cursor-pointer bg-primary text-black rounded-full font-bold text-sm uppercase flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="lg:mt-30 mt-20 z-30 pb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <span className="bg-primary h-10 lg:h-15 w-3"></span>
              <h2 className="font-bebas-neue text-[28px] lg:text-[48px] tracking-wider">
                Recommended
              </h2>
            </div>
            {/* Desktop Navigation Arrows */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={scrollRecommendedLeft}
                className="p-2 rounded-full cursor-pointer bg-primary text-black hover:bg-yellow-400 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={scrollRecommendedRight}
                className="p-2 rounded-full cursor-pointer bg-primary text-black hover:bg-yellow-400 transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div
            id="recommended-scroll-container"
            className="overflow-x-auto scrollbar-hide"
          >
            <div
              id="recommended-container"
              className="flex gap-4 pb-4"
              style={{ minWidth: "max-content" }}
            >
              {recommendedProducts.map((prod: Product) => (
                <div
                  key={prod.id}
                  className="group font-poppins relative overflow-hidden rounded-2xl lg:w-[260px] w-[220px]  shrink-0"
                >
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-primary text-black px-3 py-1 rounded-full font-poppins font-bold text-xs uppercase">
                    {prod.shopproductcategory?.name}
                  </div>

                  {/* Image Container */}
                  <Link
                    href={`/rentals/${prod.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="h-[450px]"
                  >
                    <Image
                      src={
                        API_URL ? `${API_URL}${prod.imageUrl}` : prod.imageUrl
                      }
                      alt={prod.name}
                      width={200}
                      height={200}
                      className="w-full h-[450px] object-cover rounded-2xl "
                    />
                  </Link>

                  {/* Content */}
                  <div className="mt-1">
                    <h3 className="text-[16px] uppercase tracking-wider truncate">
                      {prod.name}
                    </h3>

                    <div className="flex items-center mt-1 justify-between">
                      <div>
                        <span className="font-poppins text-sm opacity-70">
                          Per day
                        </span>
                        <div className="text-[20px]">
                          Rs{" "}
                          {(prod.variants?.[0] as { sellingPrice?: number })
                            ?.sellingPrice || prod.sellingPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="lg:hidden flex justify-center gap-4  mt-4">
            <button
              onClick={scrollRecommendedLeft}
              className="p-3 cursor-pointer rounded-full bg-primary z-10 text-black hover:bg-yellow-400 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={scrollRecommendedRight}
              className="p-3 rounded-full cursor-pointer bg-primary z-10 text-black hover:bg-yellow-400 transition-colors"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
      <div className="relative lg:pt-40 pt-60">
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
              theme === "dark" ? "/layout/cloudBlack.svg" : "/layout/cloud.svg"
            }
            alt="smoke"
            width={250}
            height={250}
            className="lg:w-auto lg:h-auto"
          />
        </div>
      </div>
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </section>
  );
};

export default ProductDetailsClient;
