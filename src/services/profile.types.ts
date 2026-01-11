// src/services/profile.types.ts

export interface CompanyInitRequest {
  brandName: string;
  logoUrl: string;
  mainContactId: number;
  industryId: number;
}

export interface CompanyInitResponse {
  companyId: number;
  brandName: string;
  logoUrl: string;
  mainContactId: number;
  industryId: number;
  industryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentOrgInitRequest {
  schoolName: string;
  organizationName: string;
  managerName: string;
  phone: string;
  email: string;
  logoUrl: string;
}

export interface StudentOrgInitResponse {
  studentOrgId: number;
  schoolName: string;
  organizationName: string;
  managerName: string;
  phone: string;
  email: string;
  logoUrl: string;
  verificationLevel: number;
  safetyFlag: boolean;
  createdAt: string;
  updatedAt: string;
}
