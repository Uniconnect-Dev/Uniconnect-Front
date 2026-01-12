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
