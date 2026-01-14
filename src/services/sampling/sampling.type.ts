export interface CreateSamplingProposalRequest {
  productName: string;
  industry: string;
  samplingPurpose: string;
  samplingStartDate: string; // YYYY-MM-DD
  samplingEndDate: string; // YYYY-MM-DD
  productCount: number;
  detailRequest: string;
}

export interface SaveSamplingTargetsRequest {
  samplingProposalId: number;
  basicInfoKeywordIds: number[];
  lifestyleKeywordIds: number[];
  eventNatureKeywordIds: number[];
  customKeywords: string[];
}

export interface MatchedStudentOrg {
  studentOrgId: number;
  organizationName: string;
  schoolName: string;
  campaignName: string;
  matchedTags: string[];
  expectedParticipants: number;
  estimatedCostRange: string;
}

export interface StudentOrgDetail {
  studentOrgId: number;
  organizationName: string;
  schoolName: string;
  managerName: string;
  phone: string;
  email: string;
  estimatedCostRange: string;
}

export interface GetStudentOrgDetailParams {
  samplingProposalId: number;
  orgId: number;
  baseUnitCost: number;
  reportOptionFee: number;
  operationFee: number;
}

export interface SubmitSamplingProposalRequest {
  samplingProposalId: number;
  campaignIds: number[];
}

export interface SubmitSamplingProposalResponse {
  requestedCount: number;
  message: string;
}

// 단체별 예상 금액 계산
export interface OrgEstimateResponse {
  studentOrgId: number;
  organizationName: string;
  expectedParticipants: number;
  unitCost: number;
  baseCost: number;
  estimatedCostRange: string;
}

// 선택한 단체들의 총 예상 금액 계산
export interface TotalEstimateResponse {
  minCost: number;
  maxCost: number;
  displayRange: string;
}

export interface EstimateParams {
  samplingProposalId: number;
  baseUnitCost: number;
  reportOptionFee: number;
  operationFee: number;
}
