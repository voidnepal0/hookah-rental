/**
 * Product API - Functions for product operations
 */

import { useQuery } from "@tanstack/react-query";
import { API_URL, SHOP_ID } from "../axiosInstance";
import type { Product, ProductResponse, ProductFilters } from "@/types/productTypes";

// Server-side function to get a product by name or ID
export async function getProductByIdOrName(identifier: string): Promise<Product | null> {
  if (!identifier) return null;
  
  try {
    // First try to fetch by ID
    const response = await fetch(`${API_URL}/website/${SHOP_ID}/products/${identifier}`);
    
    if (response.ok) {
      return response.json();
    }
    
    // If not found by ID, try to fetch all and filter by name
    const allProductsResponse = await fetch(`${API_URL}/website/${SHOP_ID}/products?limit=100`);
    if (!allProductsResponse.ok) return null;
    
    const data = await allProductsResponse.json();
    const normalizedIdentifier = identifier?.toString().toLowerCase() || '';
    
    return data.data?.find((product: Product) => 
      product.id === identifier || 
      (product.name && (
        product.name.toLowerCase() === normalizedIdentifier ||
        product.name.toLowerCase().replace(/\s+/g, '-') === normalizedIdentifier
      ))
    ) || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// ===== QUERIES =====

/**
 * Get all products with pagination
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10)
 */
export const useGetProducts = (page = 1, limit = 10) => {
  return useQuery<ProductResponse>({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/website/${SHOP_ID}/products?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Get products with filters
 * @param filters - Product filters (category, brand, q, page, limit)
 */
export const useGetProductsWithFilters = (filters: ProductFilters = {}) => {
  const { category, brand, q, page = 1, limit = 10 } = filters;
  
  return useQuery<ProductResponse>({
    queryKey: ["products", filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (category) params.append('category', category);
      if (brand) params.append('brand', brand);
      if (q) params.append('q', q);
      
      const response = await fetch(`${API_URL}/website/${SHOP_ID}/products?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Get single product by ID
 * @param productId - Product ID
 */
export const useGetProduct = (productId: string) => {
  return useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/website/${SHOP_ID}/products/${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


