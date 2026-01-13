// src/services/company.service.ts

import { api } from '@/lib/api/client';
import type { CompanyListResponse } from './company.types';

/**
 * 기업 리스트 조회
 */
export async function getCompanyList(): Promise<CompanyListResponse> {
  return api.get('/api/companies/list');
}
