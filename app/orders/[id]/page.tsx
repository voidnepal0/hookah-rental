"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  CheckCircle,
  XCircle,
  Truck,
  Utensils,
  Package,
} from "lucide-react";
import {
  getOrderById,
  settleOrder,
  updateOrderStatus,
} from "@/services/api/orderApi";
import { OrderDetailsResponse, SettleOrderRequest } from "@/types/orderTypes";
import toast from "react-hot-toast";
import HandledImage from "@/components/common/HandledImage";

const OrderDetailsPage = () => {
  const { theme } = useTheme();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<SettleOrderRequest>({
    receivedAmount: 0,
    paymentMethod: "cash",
  });

  const isDark = theme === "dark";

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;

      try {
        setLoading(true);
        const response = await getOrderById(orderId);

        if (response.success) {
          setOrder(response.data);
        } else {
          toast.error(response.message || "Failed to fetch order details");
        }
      } catch (error: unknown) {
        console.error("Error fetching order details:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch order details";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Handle order actions
  const handleSettleOrder = async (paymentData?: SettleOrderRequest) => {
    if (!orderId) return;

    try {
      setActionLoading(true);
      const payment = paymentData || paymentDetails;
      const response = await settleOrder(orderId, payment);

      if (response.success) {
        setOrder(response.data);
        setShowPaymentForm(false);
        toast.success("Order settled successfully!");
      } else {
        toast.error(response.message || "Failed to settle order");
      }
    } catch (error: unknown) {
      console.error("Error settling order:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to settle order";
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateStatus = async (
    status: "pending" | "completed" | "cancelled" | "preparing" | "ready",
  ) => {
    if (!orderId) return;

    try {
      setActionLoading(true);
      const response = await updateOrderStatus(orderId, status);

      if (response.success) {
        setOrder(response.data);
        toast.success(`Order status updated to ${status}`);
      } else {
        toast.error(response.message || "Failed to update order status");
      }
    } catch (error: unknown) {
      console.error("Error updating order status:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update order status";
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return {
          color: "text-green-500",
          icon: CheckCircle,
          label: "Completed",
        };
      case "cancelled":
        return { color: "text-red-500", icon: XCircle, label: "Cancelled" };
      case "preparing":
        return { color: "text-yellow-500", icon: Clock, label: "Preparing" };
      case "ready":
        return { color: "text-blue-500", icon: Package, label: "Ready" };
      default:
        return { color: "text-orange-500", icon: Clock, label: "Pending" };
    }
  };

  // Get order type icon
  const getOrderTypeIcon = (orderType: string) => {
    switch (orderType) {
      case "delivery":
        return Truck;
      case "dine_in":
        return Utensils;
      default:
        return Package;
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-300 rounded-lg"></div>
                <div className="h-48 bg-gray-300 rounded-lg"></div>
              </div>
              <div className="h-96 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Order not found</h1>
            <p className="mb-8">
              The order you&apos;re looking for doesn&apos;t exist
            </p>
            <Link
              href="/orders"
              className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const OrderTypeIcon = getOrderTypeIcon(order.orderType);

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/orders"
            className={`flex items-center gap-2 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`}
          >
            <ArrowLeft size={20} />
            <span>Back to Orders</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">Order Details</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Card */}
            <div
              className={`p-6 rounded-lg ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Order Status</h2>
                <div className={`flex items-center gap-2 ${statusInfo.color}`}>
                  <statusInfo.icon size={20} />
                  <span className="font-medium">{statusInfo.label}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Order Number
                  </p>
                  <p className="font-semibold">#{order.token}</p>
                </div>
                <div>
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Order Type
                  </p>
                  <div className="flex items-center gap-1">
                    <OrderTypeIcon size={16} />
                    <span className="font-medium capitalize">
                      {order.orderType.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <div>
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Date
                  </p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Total Amount
                  </p>
                  <p className="font-semibold">Rs. {order.totalAmount}</p>
                </div>
              </div>

              {/* Action Buttons */}
              {order.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdateStatus("cancelled")}
                    disabled={actionLoading}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      actionLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>

            {/* Customer Information */}
            <div
              className={`p-6 rounded-lg ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
            >
              <h2 className="text-xl font-semibold mb-4">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User
                    size={20}
                    className={isDark ? "text-gray-400" : "text-gray-600"}
                  />
                  <div>
                    <p
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Name
                    </p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone
                    size={20}
                    className={isDark ? "text-gray-400" : "text-gray-600"}
                  />
                  <div>
                    <p
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Phone
                    </p>
                    <p className="font-medium">{order.customerPhone}</p>
                  </div>
                </div>
                {order.customerEmail && (
                  <div className="flex items-center gap-3">
                    <Mail
                      size={20}
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    />
                    <div>
                      <p
                        className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Email
                      </p>
                      <p className="font-medium">{order.customerEmail}</p>
                    </div>
                  </div>
                )}
                {order.quickDeliveryAddress && (
                  <div className="flex items-center gap-3">
                    <MapPin
                      size={20}
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    />
                    <div>
                      <p
                        className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Delivery Address
                      </p>
                      <p className="font-medium">
                        {order.quickDeliveryAddress}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {order.notes && (
                <div className="mt-4">
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-1`}
                  >
                    Notes
                  </p>
                  <p className="font-medium">{order.notes}</p>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div
              className={`p-6 rounded-lg ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
            >
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.productRequests.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    {item?.shopProduct?.imageUrl && (
                      <HandledImage
                        src={item?.shopProduct?.imageUrl}
                        alt={item?.shopProduct?.name}
                        width={60}
                        height={60}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item?.shopProduct?.name}</h3>
                      <p
                        className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Quantity: {item.quantity}
                      </p>
                      {item.message && (
                        <p
                          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Note: {item.message}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        Rs. {item?.shopProduct?.sellingPrice * item.quantity}
                      </div>
                      <div
                        className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Rs. {item?.shopProduct?.sellingPrice} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Requests */}
            {order.serviceRequests && order.serviceRequests.length > 0 && (
              <div
                className={`p-6 rounded-lg ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Additional Services
                </h2>
                <div className="space-y-4">
                  {order.serviceRequests.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div>
                        <h3 className="font-medium">{service.service.name}</h3>
                        <p
                          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Quantity: {service.quantity}
                        </p>
                        {service.notes && (
                          <p
                            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                          >
                            Notes: {service.notes}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          Rs. {service.price * service.quantity}
                        </div>
                        <div
                          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Rs. {service.price} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div
              className={`p-6 rounded-lg sticky top-8 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
            >
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rs. {order.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Charge:</span>
                  <span>Rs. 0</span>
                </div>
                <div
                  className={`flex justify-between text-xl font-bold pt-3 border-t ${isDark ? "border-gray-700" : "border-gray-300"}`}
                >
                  <span>Total:</span>
                  <span>Rs. {order.totalAmount}</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg text-sm ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <span>
                    Payment Status: {order.paymentStatus || "Pending"}
                  </span>
                </div>
              </div>

              <div className="mt-4 text-sm">
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Order ID: {order.id}
                </p>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`w-full max-w-md mx-4 p-6 rounded-lg ${isDark ? "bg-gray-900" : "bg-white"}`}
          >
            <h3 className="text-xl font-semibold mb-4">Settle Order Payment</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Total Amount:{" "}
                  <span className="font-bold">Rs. {order?.totalAmount}</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Received Amount *
                </label>
                <input
                  type="number"
                  value={paymentDetails.receivedAmount}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      receivedAmount: Number(e.target.value),
                    }))
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark
                      ? "bg-black border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter received amount"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Method *
                </label>
                <select
                  value={paymentDetails.paymentMethod}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      paymentMethod: e.target
                        .value as SettleOrderRequest["paymentMethod"],
                    }))
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark
                      ? "bg-black border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="digital">Digital Payment</option>
                  <option value="esewa">eSewa</option>
                  <option value="khalti">Khalti</option>
                </select>
              </div>

              {paymentDetails.receivedAmount > 0 && (
                <div
                  className={`p-3 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
                >
                  <div className="flex justify-between">
                    <span>Change Amount:</span>
                    <span className="font-bold">
                      Rs.{" "}
                      {Math.max(
                        0,
                        paymentDetails.receivedAmount -
                          (order?.totalAmount || 0),
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPaymentForm(false)}
                disabled={actionLoading}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDark
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSettleOrder(paymentDetails)}
                disabled={actionLoading || paymentDetails.receivedAmount <= 0}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  actionLoading || paymentDetails.receivedAmount <= 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {actionLoading ? "Processing..." : "Settle Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
