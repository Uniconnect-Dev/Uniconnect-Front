// src/services/campaign.types.ts

// 협업 유형
export type CollaborationType = 'Sampling' | 'Partnership';

// 학생단체 캠페인 아이템 (기업용 조회)
export interface StudentCampaignItem {
  campaignId: number;
  campaignName: string;
  productQuantity: number;
  startDate: string;
  endDate: string;
  schoolName: string;
  organizationName: string;
  logoUrl: string;
}

// 학생단체 캠페인 목록 응답 (페이지네이션)
export interface StudentCampaignListResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: StudentCampaignItem[];
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 학생단체 캠페인 검색 파라미터
export interface StudentCampaignSearchParams {
  keyword?: string;
  collaborationType?: CollaborationType;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

// 첫 페이지 기본 정보 조회 응답
export interface FirstPageInfoResponse {
  schoolName: string;
  organizationName: string;
}

// 첫 페이지 기본 정보 저장 요청
export interface FirstPageInfoRequest {
  managerName: string;
  managerPhone: string;
  managerEmail: string;
}

// 캠페인 생성 요청
export interface CreateCampaignRequest {
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  locationName: string;
  purpose: string;
  collaborationType: CollaborationType;
  productName?: string;
  productQuantity?: number;
  expectedParticipants: number;
  expectedExposures: number;
  targetAgeDesc: string;
  targetMajorDesc: string;
  preferredIndustry1?: string;
  preferredIndustry2?: string;
  recommendedSamplingQty?: number;
  boothFee?: number;
  extraRequest?: string;
  proposalFileUrl?: string;
  studentTypeTagIds: number[];
  regionTagIds: number[];
  hobbyTagIds: number[];
  lifestyleTagIds: number[];
  eventPrograms: string;
  marketingMethods: string;
  promotionPlans: string;
}

// 캠페인 생성 응답
export interface CreateCampaignResponse {
  campaignId: undefined;
  success: boolean;
  message: string;
  data: number; // campaignId
}

// 제안서 업로드 응답
export interface UploadProposalResponse {
  success: boolean;
  message: string;
  data: string; // file URL
}

// 캠페인 제출 응답
export interface SubmitCampaignResponse {
  success: boolean;
  message: string;
  data: string;
}

// 첫 페이지 저장 응답
export interface SaveFirstPageResponse {
  success: boolean;
  message: string;
  data: number;
}

// 추천 기업 아이템
export interface RecommendedCompany {
  companyId: number;
  brandName: string;
  logoUrl: string;
  description: string;
  matchedKeywords: string[];
  score: number;
}

// 추천 기업 목록 응답
export interface RecommendedCompaniesResponse {
  success: boolean;
  message: string;
  data: RecommendedCompany[];
}

// 캠페인 폼 데이터 (Step 간 공유)
export interface CampaignFormData {
  // Step 1 - 단체 정보
  schoolName: string;
  organizationName: string;
  managerName: string;
  managerPhone: string;
  managerEmail: string;

  // Step 2 - 행사 정보
  collaborationType: CollaborationType;
  name: string;
  locationName: string;
  startDate: string;
  endDate: string;
  purpose: string;
  expectedParticipants: number;
  expectedExposures: number;
  targetAgeDesc: string;
  targetMajorDesc: string;
  studentTypeTagIds: number[];
  regionTagIds: number[];
  hobbyTagIds: number[];
  lifestyleTagIds: number[];
  eventPrograms: string;
  marketingMethods: string;
  promotionPlans: string;
  extraRequest: string;
  proposalFile: File | null;
  proposalFileUrl: string;

  // Step 2 - 제품 요청
  preferredIndustry1: string;
  preferredIndustry2: string;
  recommendedSamplingQty: number;
  boothFee: number;

  // Step 3 - 기업 선택
  selectedCompanyIds: number[];

  // Step 4 - 약관 동의
  agreedToTerms: boolean;
}

// 초기 폼 데이터
export const initialCampaignFormData: CampaignFormData = {
  schoolName: '',
  organizationName: '',
  managerName: '',
  managerPhone: '',
  managerEmail: '',
  collaborationType: 'Sampling',
  name: '',
  locationName: '',
  startDate: '',
  endDate: '',
  purpose: '',
  expectedParticipants: 0,
  expectedExposures: 0,
  targetAgeDesc: '',
  targetMajorDesc: '',
  studentTypeTagIds: [],
  regionTagIds: [],
  hobbyTagIds: [],
  lifestyleTagIds: [],
  eventPrograms: '',
  marketingMethods: '',
  promotionPlans: '',
  extraRequest: '',
  proposalFile: null,
  proposalFileUrl: '',
  preferredIndustry1: '',
  preferredIndustry2: '',
  recommendedSamplingQty: 0,
  boothFee: 0,
  selectedCompanyIds: [],
  agreedToTerms: false,
};
