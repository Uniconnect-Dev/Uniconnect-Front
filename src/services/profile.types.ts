// src/services/profile.types.ts

export interface CompanyInitRequest {
  brandName: string;
  logoUrl: string;
  mainContactId: number;
  industryType: string; // 업종 enum (예: SOFTWARE_DEVELOPMENT)
  businessType: string; // 업태 enum (예: CORPORATION)
}

export interface CompanyInitResponse {
  companyId: number;
  brandName: string;
  logoUrl: string;
  mainContactId: number;
  industryType: string;
  industryName: string;
  businessType: string;
  businessTypeName: string;
  samplingPurpose: string;
  samplingStartDate: string;
  samplingEndDate: string;
  productName: string;
  productCount: number;
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

// GET /api/profile/student-org/me 응답
export interface StudentOrgProfileResponse {
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

// GET /api/profile/company/me 응답
export interface CompanyProfileResponse {
  companyId: number;
  brandName: string;
  logoUrl: string;
  mainContactId: number;
  industryType: string;
  industryName: string;
  businessType: string;
  businessTypeName: string;
  samplingPurpose: string;
  samplingStartDate: string;
  samplingEndDate: string;
  productName: string;
  productCount: number;
}
