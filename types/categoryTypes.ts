/**
 * Category-related type definitions
 */

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string | null;
  shopId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface CategoryResponse {
  items: Category[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
