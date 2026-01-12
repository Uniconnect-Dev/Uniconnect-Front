// src/services/product.types.ts

// 카테고리 enum
export type ProductCategory =
  | 'FNB'
  | 'BEAUTY'
  | 'EDUCATION'
  | 'TRAVEL'
  | 'ONLINE_SERVICE'
  | 'STATIONERY'
  | 'IT_TELECOM'
  | 'ETC';

// 제품 목록 아이템
export interface ProductListItem {
  companyId: number;
  companyName: string;
  productId: number;
  productName: string;
  price: number;
  thumbnailUrl: string;
}

// 기업별 제품 목록 아이템 (industryName 포함)
export interface CompanyProductListItem {
  companyId: number;
  companyName: string;
  industryName: string;
  productId: number;
  productName: string;
  price: number;
  thumbnailUrl: string;
}

// 제품 상세 정보
export interface ProductDetail {
  companyId: number;
  companyName: string;
  industryName: string;
  productId: number;
  productName: string;
  price: number;
  thumbnailUrl: string;
  detailImageUrl: string;
}

// 페이지네이션 Sort
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 페이지네이션 Pageable
export interface Pageable {
  offset: number;
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

// 페이지네이션 응답 (제품 목록)
export interface ProductListResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ProductListItem[];
  number: number;
  numberOfElements: number;
  sort: Sort;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 페이지네이션 응답 (기업별 제품 목록)
export interface CompanyProductListResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: CompanyProductListItem[];
  number: number;
  numberOfElements: number;
  sort: Sort;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 카테고리 매핑 (UI 표시용 <-> API용)
export const CATEGORY_MAP: Record<string, ProductCategory | undefined> = {
  '전체': undefined,
  'F&B': 'FNB',
  '뷰티': 'BEAUTY',
  '교육': 'EDUCATION',
  '여행': 'TRAVEL',
  '온라인 서비스': 'ONLINE_SERVICE',
  '문구/사무용품': 'STATIONERY',
  'IT/통신사': 'IT_TELECOM',
  '기타': 'ETC',
};

// API 카테고리 -> UI 표시용 매핑
export const CATEGORY_DISPLAY_MAP: Record<ProductCategory, string> = {
  'FNB': 'F&B',
  'BEAUTY': '뷰티',
  'EDUCATION': '교육',
  'TRAVEL': '여행',
  'ONLINE_SERVICE': '온라인 서비스',
  'STATIONERY': '문구/사무용품',
  'IT_TELECOM': 'IT/통신사',
  'ETC': '기타',
};
