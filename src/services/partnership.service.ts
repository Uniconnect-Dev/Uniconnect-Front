// src/services/partnership.service.ts
import { api } from '@/lib/api/client';
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
  return api.post('/api/partnership/proposals', payload);
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

  return api.post(
    `/api/partnership/proposals/${proposalId}/attachment`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

/**
 * 약관 동의 후 협업 제안을 최종 제출합니다.
 */
export const submitProposal = async (
  proposalId: number
): Promise<SubmitProposalResponse> => {
  return api.post(`/api/partnership/proposals/${proposalId}/submit`);
};
