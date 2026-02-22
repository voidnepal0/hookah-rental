/**
 * Product API - Functions for product operations
 */

import { useQuery } from "@tanstack/react-query";
import { apiClient, SHOP_ID } from "../axiosInstance";
import type {
  Product,
  ProductResponse,
  ProductFilters,
} from "@/types/productTypes";

export async function getProductById(id: string) {
  const response = await apiClient.get(`/website/${SHOP_ID}/products/${id}`);
  return response.data;
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
      const response = await apiClient.get(`/website/${SHOP_ID}/products`, {
        params: { page, limit },
      });
      return response.data;
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
      const params: Record<string, string | number> = {
        page,
        limit,
      };

      if (category) params.category = category;
      if (brand) params.brand = brand;
      if (q) params.q = q;

      const response = await apiClient.get(`/website/${SHOP_ID}/products`, {
        params,
      });
      return response.data;
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
      const response = await apiClient.get(
        `/website/${SHOP_ID}/products/${productId}`,
      );
      return response.data;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
