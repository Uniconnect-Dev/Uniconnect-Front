// src/services/profile.types.ts

export interface CompanyInitRequest {
  brandName: string;
  logoUrl: string;
  mainContactId: number;
  industry: string; // 업종 enum
  businessType: string; // 업태 enum
}

export interface CompanyInitResponse {
  companyId: number;
  brandName: string;
  logoUrl: string;
  mainContactId: number;
  industry: string;
  businessType: string;
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
