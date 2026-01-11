// src/services/partnership.service.ts
import axios from 'axios';
import { api } from '@/lib/api/client';
import { getAccessToken } from '@/lib/auth/token';
import type {
  CreateProposalRequest,
  CreateProposalResponse,
  SubmitProposalResponse,
  UploadAttachmentResponse,
} from './partnership.types';

/**
 * 기업이 학생 단체에 협업 제안을 생성합니다.
 */
export const createProposal = async (
  payload: CreateProposalRequest
): Promise<CreateProposalResponse> => {
  const response = await api.post<CreateProposalResponse>(
    '/api/partnership/proposals',
    payload
  );
  return response as unknown as CreateProposalResponse;
};

/**
 * 협업 제안서에 첨부파일을 업로드합니다.
 */
export const uploadProposalAttachment = async (
  proposalId: number,
  file: File
): Promise<UploadAttachmentResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const token = getAccessToken();

  const response = await axios.post<UploadAttachmentResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/partnership/proposals/${proposalId}/attachment`,
    formData,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: true,
    }
  );

  if (!response.data.success) {
    throw new Error(response.data.message || '첨부파일 업로드에 실패했습니다.');
  }

  return response.data;
};

/**
 * 약관 동의 후 협업 제안을 최종 제출합니다.
 */
export const submitProposal = async (
  proposalId: number
): Promise<SubmitProposalResponse> => {
  const response = await api.post<SubmitProposalResponse>(
    `/api/partnership/proposals/${proposalId}/submit`
  );
  return response as unknown as SubmitProposalResponse;
};
