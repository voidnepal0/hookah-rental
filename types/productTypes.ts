/**
 * Product-related type definitions
 */

export interface ShopProductCategory {
  id: string;
  name: string;
  description: string;
  image: string | null;
  shopId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface ProductBrand {
  id: string;
  name: string;
  shopId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  primaryUnit: string;
  secondaryUnit: string;
  conversionRate: number | null;
  secondaryUnitPrice: number | null;
  shopproductcategoryId: string;
  shopproductsubcategoryId: string | null;
  isAvailable: boolean;
  showonCostumerMenu: boolean;
  shopProductCategory: ShopProductCategory;
  imageUrl: string;
  secondaryImageUrls: string[];
  brand: ProductBrand;
  shopProductSubCategory: null | Record<string, unknown>;
  sku: string;
  current_stock_quantity: number;
  minimum_stock_quantity: number;
  isVariant: boolean;
  addons: Record<string, unknown>[];
  variants: Record<string, unknown>[];
}

export interface ProductResponse {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  data: Product[];
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  q?: string;
  page?: number;
  limit?: number;
}
