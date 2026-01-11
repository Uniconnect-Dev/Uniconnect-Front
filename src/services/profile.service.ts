// src/services/profile.service.ts
import { api } from '@/lib/api/client';
import type {
  CompanyInitRequest,
  CompanyInitResponse,
  StudentOrgInitRequest,
  StudentOrgInitResponse,
} from './profile.types';

export const initCompanyProfile = async (
  payload: CompanyInitRequest
): Promise<CompanyInitResponse> => {
  return api.post('/api/profile/company/init', payload);
};

export const initStudentOrgProfile = async (
  payload: StudentOrgInitRequest
): Promise<StudentOrgInitResponse> => {
  return api.post('/api/profile/student-org/init', payload);
};
