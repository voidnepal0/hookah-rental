"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createOrder } from "@/services/api/orderApi";
import { getProductById } from "@/services/api/productApi";
import { getDeliveryAddresses } from "@/services/api/addressApi";
import {
  CreateOrderRequest,
  CheckoutFormData,
  PaymentDistribution,
} from "@/types/orderTypes";
import { DeliveryAddress } from "@/types/addressTypes";
import { Payment } from "@/types/paymentTypes";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import Image from "next/image";
import { getPaymentMethod, Product, ProductAddon } from "@/services";

// Define product details interface
interface ProductDetails {
  id: string;
  name: string;
  sellingPrice?: number;
  variants?: Array<{ sellingPrice?: number }>;
  imageUrl?: string;
  description?: string;
  brand?: { name: string };
  shopProductCategory?: { name: string };
  addons?: Array<{
    id: string;
    name: string;
    additionalPrice: number;
    // ... other addon fields if needed
  }>;
}

const CheckoutPage = () => {
  const { theme } = useTheme();
  const { cartItems, clearCart } = useCart();
  const { user, fullUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productDetails, setProductDetails] = useState<
    Record<string, ProductDetails>
  >({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryAddresses, setDeliveryAddresses] = useState<DeliveryAddress[]>(
    [],
  );
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const voucherAmount = Number(searchParams.get("voucher")) || 0;
  const [paymentMethods, setPaymentMethods] = useState<Payment[]>([]);
  // Form state
  const [formData, setFormData] = useState<CheckoutFormData>({
    orderType: "delivery",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    customerLandmark: "",
    notes: "",
    productRequests: [],
    purchaseMethod: "",
    agreeToTerms: false,
  });

  const fetchProductDetails = async () => {
    if (cartItems.length === 0) return;
    const details: Record<string, ProductDetails> = {};
    let total = 0;

    for (const item of cartItems) {
      try {
        const product = await getProductById(item.productId);
        if (product) {
          details[item.productId] = product;

          const basePrice: number = product.sellingPrice;

          const selectedAddons =
            item.addons.filter((addonObject: any) =>
              product.addons.find(
                (addon: ProductAddon) => addonObject.addonId === addon.id,
              ),
            ) || ([] as any[]);
          // Calculate addons total
          const addonsTotal = selectedAddons?.reduce(
            (total: number, addonObject: any) => {
              const addon = product?.addons?.find(
                (a: ProductAddon) => a.id === addonObject.addonId,
              );
              return (
                total +
                (Number(addon?.additionalPrice) || 0) *
                  (addonObject.quantity || 0)
              );
            },
            0,
          );
          total += basePrice * item.quantity + addonsTotal;
        }
      } catch (error: unknown) {
        console.error(`Error fetching product ${item.productId}:`, error);
      }
    }

    console.log("DETAILS:::", JSON.stringify(details, null, 2));
    setProductDetails(details);
    setTotalAmount(total);

    // Update form with product requests
    const productRequests = cartItems.map((item) => ({
      shopProductId: item.productId,
      quantity: item.quantity,
      addons: item.addons,
    }));

    // Default service requests with 0 price and time
    const serviceRequests = [
      {
        shopServiceId: "",
        quantity: 0,
        price: 0,
        notes: "",
      },
    ];

    setFormData((prev) => ({
      ...prev,
      productRequests,
      serviceRequests,
    }));
  };

  // Fetch product details and calculate total
  useEffect(() => {
    fetchProductDetails();
  }, [cartItems]);

  // Fetch payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const methods = await getPaymentMethod();
        setPaymentMethods(methods);
        console.log("Payment methods:", methods);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  // Fetch delivery addresses and populate form with user data
  useEffect(() => {
    const fetchAddressesAndPopulateForm = async () => {
      // Fetch delivery addresses
      try {
        const addresses = await getDeliveryAddresses();
        setDeliveryAddresses(addresses);
        if (addresses.length > 0) {
          setSelectedAddress(addresses[0].id);
        }
      } catch (error) {
        console.error("Error fetching delivery addresses:", error);
      }

      // Populate form with user data if available
      if (fullUser || user) {
        setFormData((prev) => ({
          ...prev,
          customerName: fullUser?.name || user?.name || prev.customerName,
          customerEmail: fullUser?.email || user?.email || prev.customerEmail,
          customerPhone: fullUser?.phone || user?.phone || prev.customerPhone,
          customerAddress: fullUser?.address || prev.customerAddress,
        }));
      }
    };

    fetchAddressesAndPopulateForm();
  }, [fullUser, user]);

  // Form validation
  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.customerName.trim()) {
      errors.push("Full name is required");
    } else if (formData.customerName.trim().length < 2) {
      errors.push("Full name must be at least 2 characters");
    } else if (!/^[a-zA-Z\s]+$/.test(formData.customerName.trim())) {
      errors.push("Full name can only contain letters and spaces");
    }

    if (!formData.customerEmail?.trim()) {
      errors.push("Email is required");
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail.trim())
    ) {
      errors.push("Please enter a valid email address");
    }

    if (!formData.customerPhone.trim()) {
      errors.push("Phone number is required");
    } else if (!/^[0-9+\-\s()]+$/.test(formData.customerPhone.trim())) {
      errors.push(
        "Phone number can only contain numbers, +, -, spaces, and parentheses",
      );
    } else if (formData.customerPhone.replace(/\D/g, "").length < 10) {
      errors.push("Phone number must be at least 10 digits");
    }

    if (!formData.customerAddress.trim()) {
      errors.push("Address is required");
    }

    if (!formData.purchaseMethod.trim()) {
      errors.push("Please select a payment method");
    }

    if (errors.length > 0) {
      toast.error(errors[0]);
      return false;
    }

    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const paymentDistributions: PaymentDistribution[] = [];

      if (formData.purchaseMethod) {
        paymentDistributions.push({
          paymentModeId: formData.purchaseMethod,
          amount: totalAmount - voucherAmount,
          status: "pending",
        });
      }

      const orderRequest: CreateOrderRequest = {
        orderType: formData.orderType,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        quickDeliveryAddress: formData.customerAddress,
        notes: formData.notes,
        totalAmount: totalAmount - voucherAmount,
        productRequests: formData.productRequests,
        paymentDistributions,
      };

      const response = await createOrder(orderRequest);

      if (response?.id) {
        toast.success("Order placed successfully!");
        clearCart();
        router.push(`/orders/${response.id}`);
      } else {
        toast.error("Failed to place order");
      }
    } catch (error: unknown) {
      console.error("Order creation error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = theme === "dark";

  if (cartItems.length === 0) {
    return (
      <div className={`bg-(--bg-secondary) text-(--text-secondary)`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-8">
              Add some items to your cart before checking out
            </p>
            <Link
              href="/products" // or /shop or wherever your products are
              className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-(--bg-secondary)">
      {/* Background Container */}
      <div className="absolute inset-0 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 w-full h-1/2 lg:h-full bg-(--bg-secondary)"></div>
        <div className="lg:w-1/2 relative w-full overflow-hidden h-175 lg:h-full bg-(--bg-primary)">
          <div className="absolute hidden lg:block top-0 lg:right-0 pointer-events-none">
            <Image
              src={
                theme === "dark"
                  ? "/contact/blackcloud.svg"
                  : "/contact/whitecloud.svg"
              }
              alt="Cloud decoration"
              width={60}
              height={60}
              className="w-auto h-auto"
            />
          </div>

          <div className="absolute hidden lg:block bottom-0 right-0 pointer-events-none">
            <Image
              src={
                theme === "dark"
                  ? "/contact/blackhookah.svg"
                  : "/contact/whitehookah.svg"
              }
              alt="Hookah decoration"
              width={120}
              height={120}
              className="w-100 h-100"
            />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative font-poppins max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="pt-20">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/cart"
              className={`flex items-center mt-10 gap-2 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`}
            >
              <ArrowLeft size={20} />
              <span>Back to Cart</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col lg:flex-row ">
          {/* Left Half - Form Section */}
          <div className="lg:w-1/2 bg-(--bg-secondary) font-poppins text-(--text-secondary)">
            <form onSubmit={handleSubmit} className="h-full">
              <div className="lg:pr-5 mx-auto h-full mt-6 flex flex-col">
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 border-b ${
                        isDark
                          ? "bg-black border-gray-700 text-white"
                          : "bg-white border-gray-300 text-black"
                      } focus:outline-none `}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border-b ${
                        isDark
                          ? "bg-black border-gray-700 text-white"
                          : "bg-white border-gray-300 text-black"
                      } focus:outline-none `}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 border-b ${
                        isDark
                          ? "bg-black border-gray-700 text-white"
                          : "bg-white border-gray-300 text-black"
                      } focus:outline-none `}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Address *
                    </label>
                    {deliveryAddresses.length > 0 ? (
                      <div className="space-y-2 mb-3">
                        {deliveryAddresses.map((address) => (
                          <div
                            key={address.id}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                              selectedAddress === address.id
                                ? "border-primary"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => {
                              setSelectedAddress(address.id);
                              setFormData((prev) => ({
                                ...prev,
                                customerAddress: `${address.address}${address.streetName ? `, ${address.streetName}` : ""}${address.houseNumber ? `, ${address.houseNumber}` : ""}`,
                              }));
                            }}
                            style={{
                              borderColor:
                                selectedAddress === address.id
                                  ? "var(--primary)"
                                  : "var(--border-color)",
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4
                                  className="font-medium text-sm"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {address.addressName}
                                </h4>
                                <p
                                  className="text-xs mt-1"
                                  style={{ color: "var(--text-secondary)" }}
                                >
                                  {address.address}
                                  {address.streetName &&
                                    `, ${address.streetName}`}
                                  {address.houseNumber &&
                                    `, ${address.houseNumber}`}
                                </p>
                              </div>
                              {selectedAddress === address.id && (
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <input
                      type="text"
                      name="customerAddress"
                      value={formData.customerAddress}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 border-b ${
                        isDark
                          ? "bg-black border-gray-700 text-white"
                          : "bg-white border-gray-300 text-black"
                      } focus:outline-none `}
                      placeholder={
                        deliveryAddresses.length > 0
                          ? "Or enter a different address"
                          : "Enter your address"
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Landmark (optional)
                    </label>
                    <input
                      type="text"
                      name="customerLandmark"
                      value={formData.customerLandmark}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border-b ${
                        isDark
                          ? "bg-black border-gray-700 text-white"
                          : "bg-white border-gray-300 text-black"
                      } focus:outline-none `}
                      placeholder="Enter landmark near your address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Order Note
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-2 border-b ${
                        isDark
                          ? "bg-black border-gray-700 text-white"
                          : "bg-white border-gray-300 text-black"
                      } focus:outline-none `}
                      placeholder="Enter your message"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* ─────────────────────────────────────────────── */}
          {/* Right Half - Order Details Section (UPDATED)     */}
          {/* ─────────────────────────────────────────────── */}
          <div className="lg:w-1/2">
            <div className="lg:pl-5 h-full font-poppins bg-(--bg-primary) text-(--text-primary) flex flex-col py-8">
              <h2 className="text-xl font-semibold mb-6">Order Details</h2>

              {/* Cart Items + Addons */}
              <div className="space-y-6 mb-8">
                {cartItems.map((item) => {
                  const product = productDetails[item.productId];
                  if (!product) return null;

                  const basePrice =
                    product.variants?.[0]?.sellingPrice ||
                    product.sellingPrice ||
                    0;

                  const productSubtotal = basePrice * item.quantity;

                  return (
                    <div key={item.productId} className="space-y-3">
                      {/* Main product */}
                      <div className="flex justify-between items-center font-medium">
                        <span>
                          {product.name} × {item.quantity}
                        </span>
                        <span>Rs {productSubtotal}</span>
                      </div>

                      {/* Addons */}
                      {item.addons?.length > 0 && (
                        <div className="space-y-2 pl-6 text-sm">
                          {item.addons.map((addon) => {
                            const addonDetail = product.addons?.find(
                              (a) => a.id === addon.addonId,
                            );
                            if (!addonDetail) return null;

                            const addonTotal =
                              addonDetail.additionalPrice * addon.quantity;

                            return (
                              <div
                                key={addon.addonId}
                                className={`flex justify-between items-center ${
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                <span>
                                  + {addonDetail.name} × {addon.quantity}
                                </span>
                                <span>Rs {addonTotal}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Total Calculation */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Sub Total:</span>
                  <span>Rs {totalAmount}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Voucher Applied:</span>
                  <span>Rs {voucherAmount}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total Price:</span>
                  <span>Rs {totalAmount - voucherAmount}</span>
                </div>
              </div>

              {/* Purchase Method */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Purchase Method</h3>
                <div className="grid grid-cols-1 gap-4">
                  {paymentMethods?.map((method) => {
                    const getMethodInfo = (name: string) => {
                      switch (name.toLowerCase()) {
                        case "esewa":
                          return {
                            label: "eSewa",
                            icon: "/payment/esewa.svg",
                            alt: "eSewa Payment",
                          };
                        case "khalti":
                          return {
                            label: "Khalti",
                            icon: "/payment/khalti.svg",
                            alt: "Khalti Payment",
                          };
                        case "cash":
                          return {
                            label: "Cash on Delivery",
                            icon: "/payment/cash.svg",
                            alt: "Cash on Delivery",
                          };
                        case "bank":
                          return {
                            label: "Bank Transfer",
                            icon: "/payment/bank.svg",
                            alt: "Bank Transfer",
                          };
                        default:
                          return {
                            label: name,
                            icon: "/payment/default.svg",
                            alt: `${name} Payment`,
                          };
                      }
                    };

                    const methodInfo = getMethodInfo(method.name);

                    return (
                      <label
                        key={method.id}
                        className={`flex items-center border-(--border-color) p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          formData.purchaseMethod === method.id
                            ? "border-primary bg-opacity-10"
                            : ""
                        }`}
                      >
                        <div className="relative flex items-center justify-center w-7 h-7">
                          <input
                            type="radio"
                            name="purchaseMethod"
                            value={method.id}
                            checked={formData.purchaseMethod === method.id}
                            onChange={handleInputChange}
                            className="h-7 w-7 appearance-none rounded-full border-2 border-primary bg-transparent absolute"
                          />
                          {formData.purchaseMethod === method.id && (
                            <div className="w-4 h-4 rounded-full bg-primary z-10"></div>
                          )}
                        </div>
                        {typeof methodInfo.icon === "string" ? (
                          <div className="relative h-6 w-15 ml-4">
                            <Image
                              src={methodInfo.icon}
                              alt={methodInfo.alt}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="ml-4">{methodInfo.icon}</div>
                        )}
                        <span className="ml-2 text-lg">{methodInfo.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeToTerms: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 mt-1"
                  />
                  <span className="text-sm">
                    I have read and agree to the website terms and conditions.*
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.agreeToTerms}
                className={`w-full py-3 cursor-pointer rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isSubmitting || !formData.agreeToTerms
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-500"
                }`}
              >
                {isSubmitting ? "Processing..." : "PLACE ORDER →"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative lg:pt-80 pt-50 lg:pb-0">
        <div className="absolute bottom-0 right-0 pointer-events-none z-0">
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
        <div className="absolute lg:-bottom-10 -bottom-6 left-0 pointer-events-none z-0">
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
    </div>
  );
};

// Wrapper component to handle Suspense boundary
const CheckoutPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPage />
    </Suspense>
  );
};

export default CheckoutPageWrapper;
