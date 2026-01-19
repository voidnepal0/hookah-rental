/**
 * Brand-related type definitions
 */

export interface Brand {
  id: string;
  name: string;
  shopId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface BrandResponse {
  items: Brand[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
