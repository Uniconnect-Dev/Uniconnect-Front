// src/services/company.service.ts

import { api } from '@/lib/api/client';
import type { CompanyListResponse, CompanyDetailResponse } from './company.types';

/**
 * 기업 리스트 조회
 */
export async function getCompanyList(): Promise<CompanyListResponse> {
  return api.get('/api/companies/list');
}

/**
 * 기업 상세 조회
 */
export async function getCompanyDetail(companyId: number): Promise<CompanyDetailResponse> {
  return api.get(`/api/companies/${companyId}`);
}
