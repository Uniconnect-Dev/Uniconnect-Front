// src/services/product.service.ts

import { api } from '@/lib/api/client';
import type {
  ProductCategory,
  ProductListResponse,
  ProductDetail,
  CompanyProductListResponse,
} from './product.types';

/**
 * 제품 목록 조회 (카테고리별, 페이지별)
 */
export async function getProducts(
  category?: ProductCategory,
  page: number = 0
): Promise<ProductListResponse> {
  const params: Record<string, string | number> = { page };
  if (category) {
    params.category = category;
  }
  return api.get('/api/products', { params });
}

/**
 * 제품 상세 조회
 */
export async function getProductDetail(productId: number): Promise<ProductDetail> {
  return api.get(`/api/products/${productId}`);
}

/**
 * 특정 기업의 제품 목록 조회 (페이지별)
 */
export async function getCompanyProducts(
  companyId: number,
  page: number = 0
): Promise<CompanyProductListResponse> {
  return api.get(`/api/products/company/${companyId}`, {
    params: { page },
  });
}
