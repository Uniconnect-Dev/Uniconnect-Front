// src/services/profile.service.ts
import { api } from '@/lib/api/client';
import type {
  CompanyInitRequest,
  CompanyInitResponse,
  CompanyProfileResponse,
  StudentOrgInitRequest,
  StudentOrgInitResponse,
  StudentOrgProfileResponse,
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

export const getMyStudentOrgProfile = async (): Promise<StudentOrgProfileResponse> => {
  return api.get('/api/profile/student-org/me');
};

export const getMyCompanyProfile = async (): Promise<CompanyProfileResponse> => {
  return api.get('/api/profile/company/me');
};
