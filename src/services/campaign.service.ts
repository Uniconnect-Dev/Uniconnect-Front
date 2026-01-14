// src/services/campaign.service.ts

import { api } from '@/lib/api/client';
import type {
  FirstPageInfoResponse,
  FirstPageInfoRequest,
  CreateCampaignRequest,
  CreateCampaignResponse,
  UploadProposalResponse,
  SubmitCampaignResponse,
  SaveFirstPageResponse,
  RecommendedCompany,
  StudentCampaignListResponse,
  StudentCampaignSearchParams,
} from './campaign.types';

/**
 * 첫 페이지 기본 정보 조회 (학교명, 단체명)
 */
export async function getFirstPageInfo(): Promise<FirstPageInfoResponse> {
  return api.get('/api/campaigns/first-page');
}

/**
 * 첫 페이지 기본 정보 저장 (담당자 정보)
 */
export async function saveFirstPageInfo(
  data: FirstPageInfoRequest
): Promise<SaveFirstPageResponse> {
  return api.post('/api/campaigns/first-page', data);
}

/**
 * 캠페인 생성
 */
export async function createCampaign(
  data: CreateCampaignRequest
): Promise<CreateCampaignResponse> {
  return api.post('/api/campaigns', data);
}

/**
 * 캠페인 제안서 파일 업로드
 */
export async function uploadCampaignProposal(
  campaignId: number,
  file: File
): Promise<UploadProposalResponse> {
  const formData = new FormData();
  formData.append('file', file);

  return api.post(`/api/campaigns/${campaignId}/proposal`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 캠페인 최종 제출
 */
export async function submitCampaign(
  campaignId: number
): Promise<SubmitCampaignResponse> {
  return api.post(`/api/campaigns/${campaignId}/submit`);
}

/**
 * 추천 기업 목록 조회
 */
export async function getRecommendedCompanies(): Promise<RecommendedCompany[]> {
  return api.get('/api/sampling/campaigns/recommended-companies');
}

/**
 * 학생단체 캠페인 전체 조회 (기업용)
 */
export async function getStudentCampaigns(
  page: number = 0,
  size: number = 10
): Promise<StudentCampaignListResponse> {
  return api.get('/api/company/campaigns', {
    params: { page, size, sort: ['createdAt,DESC'] },
  });
}

/**
 * 학생단체 캠페인 검색 (기업용)
 */
export async function searchStudentCampaigns(
  params: StudentCampaignSearchParams
): Promise<StudentCampaignListResponse> {
  const queryParams: Record<string, string | number | string[]> = {};

  if (params.keyword) queryParams.keyword = params.keyword;
  if (params.collaborationType) queryParams.collaborationType = params.collaborationType;
  if (params.startDate) queryParams.startDate = params.startDate;
  if (params.endDate) queryParams.endDate = params.endDate;
  if (params.page !== undefined) queryParams.page = params.page;
  if (params.size !== undefined) queryParams.size = params.size;
  if (params.sort) queryParams.sort = params.sort;

  return api.get('/api/company/campaigns/search', { params: queryParams });
}
