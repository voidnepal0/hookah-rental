"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';
import { 
  Search, 
  ArrowUpDown, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Truck,
  Utensils,
  Eye
} from 'lucide-react';
import { getAllOrders } from '@/services/api/orderApi';
import { Order, FetchOrdersParams } from '@/types/orderTypes';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const { theme } = useTheme();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'totalAmount' | 'orderNumber'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const isDark = theme === 'dark';
  const ordersPerPage = 10;

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        const params: FetchOrdersParams = {
          page: currentPage,
          limit: ordersPerPage,
          search: searchTerm || undefined,
          status: statusFilter !== 'all' ? statusFilter as 'pending' | 'completed' | 'cancelled' | 'preparing' | 'ready' : undefined,
          orderType: orderTypeFilter !== 'all' ? orderTypeFilter as 'dine_in' | 'takeaway' | 'delivery' : undefined,
          sortBy,
          sortOrder
        };

        const response = await getAllOrders(params);
        
        if (response.success) {
          setOrders(response.data.orders);
          setTotalPages(response.data.pagination.totalPages);
          setTotalOrders(response.data.pagination.total);
        } else {
          toast.error(response.message || 'Failed to fetch orders');
        }
      } catch (error: unknown) {
        console.error('Error fetching orders:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch orders';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, searchTerm, statusFilter, orderTypeFilter, sortBy, sortOrder]);

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: 'text-green-500', icon: CheckCircle, label: 'Completed' };
      case 'cancelled':
        return { color: 'text-red-500', icon: XCircle, label: 'Cancelled' };
      case 'preparing':
        return { color: 'text-yellow-500', icon: Clock, label: 'Preparing' };
      case 'ready':
        return { color: 'text-blue-500', icon: Package, label: 'Ready' };
      default:
        return { color: 'text-orange-500', icon: Clock, label: 'Pending' };
    }
  };

  // Get order type icon
  const getOrderTypeIcon = (orderType: string) => {
    switch (orderType) {
      case 'delivery':
        return Truck;
      case 'dine_in':
        return Utensils;
      default:
        return Package;
    }
  };

  // Handle sort
  const handleSort = (field: 'createdAt' | 'totalAmount' | 'orderNumber') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setOrderTypeFilter('all');
    setSortBy('createdAt');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {totalOrders} order{totalOrders !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <Link 
            href="/rentals"
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Browse Hookahs
          </Link>
        </div>

        {/* Filters and Search */}
        <div className={`p-6 rounded-lg mb-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-black border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-black'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-black border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-black'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Order Type Filter */}
            <select
              value={orderTypeFilter}
              onChange={(e) => setOrderTypeFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-black border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-black'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">All Types</option>
              <option value="dine_in">Dine In</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          {loading ? (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center">
              <Package size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {searchTerm || statusFilter !== 'all' || orderTypeFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Start by renting some hookahs'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('totalAmount')}>
                      <div className="flex items-center gap-1">
                        Amount
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('createdAt')}>
                      <div className="flex items-center gap-1">
                        Date
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-800' : 'divide-gray-200'}`}>
                  {orders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    const OrderTypeIcon = getOrderTypeIcon(order.orderType);
                    
                    return (
                      <tr key={order.id} className={`hover:${isDark ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium">#{order.orderNumber}</div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {order.productRequests.length} item{order.productRequests.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium">{order.customerName}</div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {order.customerPhone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <OrderTypeIcon size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                            <span className="text-sm capitalize">{order.orderType.replace('_', ' ')}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">Rs. {order.totalAmount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center gap-2 ${statusInfo.color}`}>
                            <statusInfo.icon size={16} />
                            <span className="text-sm font-medium">{statusInfo.label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            href={`/orders/${order.id}`}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              isDark
                                ? 'bg-gray-800 text-white hover:bg-gray-700'
                                : 'bg-gray-100 text-black hover:bg-gray-200'
                            }`}
                          >
                            <Eye size={14} />
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && orders.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing {((currentPage - 1) * ordersPerPage) + 1} to {Math.min(currentPage * ordersPerPage, totalOrders)} of {totalOrders} orders
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isDark
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <ArrowLeft size={16} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : isDark
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isDark
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
