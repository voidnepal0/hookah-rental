/**
 * Order API Service
 * Handles all order-related API calls for the hookah rental system
 */

import { apiClient, SHOP_ID } from '../axiosInstance';
import type {
  CreateOrderRequest,
  Order,
  OrderSummary,
  GetOrdersResponse,
  OrderDetailsResponse,
  FetchOrdersParams,
  OrderSummaryParams,
  ApiResponse,
  CreateOrderResponse,
  SettleOrderRequest
} from '@/types/orderTypes';

// ===== ORDER QUERIES =====

/**
 * Create a new order
 * POST /website/{shopId}/order
 */
export const createOrder = async (orderData: CreateOrderRequest): Promise<ApiResponse<CreateOrderResponse>> => {
  const response = await apiClient.post(`/website/${SHOP_ID}/order`, orderData);
  return response.data;
};

/**
 * Get all orders for the customer
 * GET /orders/all
 */
export const getAllOrders = async (params: FetchOrdersParams = {}): Promise<ApiResponse<GetOrdersResponse>> => {
  const queryParams = new URLSearchParams();
  
  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const url = queryParams.toString() ? `/orders/all?${queryParams.toString()}` : '/orders/all';
  const response = await apiClient.get(url);
  return response.data;
};

/**
 * Get order by ID
 * GET /orders/{orderId}
 */
export const getOrderById = async (orderId: string): Promise<ApiResponse<OrderDetailsResponse>> => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data;
};

/**
 * Get order summary
 * GET /orders/summary
 */
export const getOrderSummary = async (params: OrderSummaryParams): Promise<ApiResponse<OrderSummary>> => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const url = `/orders/summary?${queryParams.toString()}`;
  const response = await apiClient.get(url);
  return response.data;
};

/**
 * Settle an order
 * POST /orders/{orderId}/settle
 */
export const settleOrder = async (orderId: string, paymentDetails: SettleOrderRequest): Promise<ApiResponse<Order>> => {
  const response = await apiClient.post(`/orders/${orderId}/settle`, paymentDetails);
  return response.data;
};

/**
 * Update order status
 * PATCH /orders/{orderId}/status
 */
export const updateOrderStatus = async (
  orderId: string, 
  status: "pending" | "completed" | "cancelled" | "preparing" | "ready"
): Promise<ApiResponse<Order>> => {
  const response = await apiClient.patch(`/orders/${orderId}/status`, { status });
  return response.data;
};

/**
 * Cancel an order
 * DELETE /orders/{orderId}
 */
export const cancelOrder = async (orderId: string): Promise<ApiResponse<{ message: string }>> => {
  const response = await apiClient.delete(`/orders/${orderId}`);
  return response.data;
};

/**
 * Get customer's order history
 * GET /orders/customer/history
 */
export const getCustomerOrderHistory = async (params: FetchOrdersParams = {}): Promise<ApiResponse<GetOrdersResponse>> => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const url = queryParams.toString() ? `/orders/customer/history?${queryParams.toString()}` : '/orders/customer/history';
  const response = await apiClient.get(url);
  return response.data;
};

/**
 * Track order status
 * GET /orders/{orderId}/track
 */
export const trackOrder = async (orderId: string): Promise<ApiResponse<{
  orderId: string;
  status: string;
  estimatedTime?: number;
  currentStep: string;
  steps: Array<{
    name: string;
    completed: boolean;
    timestamp?: string;
  }>;
}>> => {
  const response = await apiClient.get(`/orders/${orderId}/track`);
  return response.data;
};

// ===== HELPER FUNCTIONS =====

/**
 * Convert cart items to order product requests
 */
export const convertCartToProductRequests = (cartItems: Array<{
  productId: string;
  quantity: number;
  duration: 'hour' | 'day';
  message?: string;
}>) => {
  return cartItems.map(item => ({
    shopProductId: item.productId,
    quantity: item.quantity,
    message: item.message || `Rental duration: ${item.duration}`
  }));
};

/**
 * Calculate total amount from cart items
 */
export const calculateTotalAmount = (
  cartItems: Array<{
    productId: string;
    quantity: number;
    duration: 'hour' | 'day';
    price?: number;
  }>,
  productPrices: Record<string, number>
) => {
  return cartItems.reduce((total, item) => {
    const price = item.price || productPrices[item.productId] || 0;
    const durationMultiplier = item.duration === 'day' ? 10 : 1; // 10 hours for day rental
    return total + (price * item.quantity * durationMultiplier);
  }, 0);
};

/**
 * Validate order data before submission
 */
export const validateOrderData = (orderData: CreateOrderRequest): string[] => {
  const errors: string[] = [];

  if (!orderData.customerName || orderData.customerName.trim().length < 2) {
    errors.push('Customer name is required and must be at least 2 characters');
  }

  if (!orderData.customerPhone || !/^\+?[\d\s-()]+$/.test(orderData.customerPhone)) {
    errors.push('Valid customer phone number is required');
  }

  if (orderData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.customerEmail)) {
    errors.push('Valid customer email is required');
  }

  if (orderData.orderType === 'delivery' && !orderData.quickDeliveryAddress) {
    errors.push('Delivery address is required for delivery orders');
  }

  if (!orderData.productRequests || orderData.productRequests.length === 0) {
    errors.push('At least one product must be ordered');
  }

  if (orderData.totalAmount <= 0) {
    errors.push('Total amount must be greater than 0');
  }

  return errors;
};
