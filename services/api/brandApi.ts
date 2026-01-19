/**
 * Brand API - React Query hooks for brand operations
 */

import { useQuery } from "@tanstack/react-query";
import { API_URL, SHOP_ID } from "../axiosInstance";
import type { Brand, BrandResponse } from "@/types/brandTypes";

// ===== QUERIES =====

/**
 * Get all brands
 */
export const useGetBrands = () => {
  return useQuery<BrandResponse>({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/website/${SHOP_ID}/brands`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Get brand by ID
 * @param brandId - Brand ID
 */
export const useGetBrandById = (brandId: string) => {
  return useQuery<Brand>({
    queryKey: ["brand", brandId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/website/${SHOP_ID}/brands/${brandId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!brandId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
