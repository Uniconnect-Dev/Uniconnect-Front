// src/services/company.types.ts

export interface CompanyListItem {
  companyId: number;
  brandName: string;
  logoUrl: string;
  shortDescription: string;
  industryName: string;
  used: boolean;
}

export type CompanyListResponse = CompanyListItem[];

export interface CompanyDetailResponse {
  companyId: number;
  brandName: string;
  logoUrl: string;
  description: string;
  website: string;
  snsUrl: string;
  industryName: string;
}
