// Order Types for Hookah Rental System

export interface ProductRequest {
  shopProductId: string;
  quantity: number;
  message?: string;
}

export interface ServiceRequest {
  shopServiceId: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface PaymentDistribution {
  paymentModeId: string;
  amount: number;
  status: "pending" | "paid" | "failed";
}

export interface CreateOrderRequest {
  orderType: "dine_in" | "takeaway" | "delivery";
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  quickDeliveryAddress?: string;
  notes?: string;
  totalAmount: number;
  productRequests: ProductRequest[];
  serviceRequests?: ServiceRequest[];
  paymentDistributions?: PaymentDistribution[];
}

export interface Order {
  id: string;
  orderNumber: number;
  orderType: "dine_in" | "takeaway" | "delivery";
  status: "pending" | "completed" | "cancelled" | "preparing" | "ready";
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  quickDeliveryAddress?: string;
  notes?: string;
  totalAmount: number;
  productRequests: Array<{
    id: string;
    shopProductId: string;
    quantity: number;
    message?: string;
    product: {
      id: string;
      name: string;
      imageUrl?: string;
      sellingPrice: number;
    };
  }>;
  serviceRequests?: Array<{
    id: string;
    shopServiceId: string;
    quantity: number;
    price: number;
    notes?: string;
    service: {
      id: string;
      name: string;
      description?: string;
    };
  }>;
  createdAt: string;
  updatedAt: string;
  shopId: string;
}

export interface OrderSummary {
  date: string;
  status: "pending" | "completed" | "cancelled" | "preparing" | "ready";
  totalOrders: number;
  totalRevenue: number;
  orderTypeBreakdown: {
    dine_in: number;
    takeaway: number;
    delivery: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

export interface CreateOrderResponse {
  id: string;
  orderNumber: number;
  status: string;
  totalAmount: number;
  createdAt: string;
}

export interface GetOrdersResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface OrderDetailsResponse extends Order {
  // Additional fields that might be in detailed view
  paymentStatus?: "pending" | "paid" | "failed";
  paymentMethod?: "cash" | "card" | "digital";
  deliveryTime?: string;
  preparationTime?: string;
}

// Query Parameters for fetching orders
export interface FetchOrdersParams {
  page?: number;
  limit?: number;
  status?: "pending" | "completed" | "cancelled" | "preparing" | "ready";
  orderType?: "dine_in" | "takeaway" | "delivery";
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  sortBy?: "createdAt" | "totalAmount" | "orderNumber";
  sortOrder?: "asc" | "desc";
}

// Order Summary Parameters
export interface OrderSummaryParams {
  date: string;
  status?: "pending" | "completed" | "cancelled" | "preparing" | "ready";
}

// Settle Order Request
export interface SettleOrderRequest {
  receivedAmount: number;
  paymentMethod: "cash" | "card" | "digital" | "esewa" | "khalti";
}

// Form Types
export interface CheckoutFormData {
  orderType: "dine_in" | "takeaway" | "delivery";
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  customerLandmark?: string;
  notes?: string;
  productRequests: ProductRequest[];
  serviceRequests?: ServiceRequest[];
  purchaseMethod: string;
  agreeToTerms: boolean;
}

// Cart to Order Conversion
export interface CartItem {
  productId: string;
  quantity: number;
  duration: 'hour' | 'day';
  message?: string;
}

export interface ConvertCartToOrderRequest {
  cartItems: CartItem[];
  orderDetails: Omit<CheckoutFormData, 'productRequests' | 'serviceRequests'>;
}
