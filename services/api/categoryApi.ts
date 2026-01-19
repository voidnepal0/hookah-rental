/**
 * Category API - React Query hooks for category operations
 */

import { useQuery } from "@tanstack/react-query";
import { API_URL, SHOP_ID } from "../axiosInstance";
import type { Category, CategoryResponse } from "@/types/categoryTypes";

// ===== QUERIES =====

/**
 * Get all categories
 */
export const useGetCategories = () => {
  return useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/website/${SHOP_ID}/category`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Get category by ID
 * @param categoryId - Category ID
 */
export const useGetCategoryById = (categoryId: string) => {
  return useQuery<Category>({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/website/${SHOP_ID}/category/${categoryId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
