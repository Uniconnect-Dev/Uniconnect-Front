// src/services/partnership.types.ts

export type ProposalType = 'Discount' | 'Etc';
export type PeriodType = 'Always' | 'Fixed';

export interface CollaborationMethodsJson {
  offline?: {
    booth?: boolean;
    sampling?: boolean;
  };
  online?: {
    sns?: string[];
    contentType?: string;
  };
  // 자유 입력 형태 지원
  methods?: {
    category: string;
    description: string;
  }[];
}

export interface ExpectedOutcomesJson {
  target?: string;
  expectedReach?: number;
  kpi?: string[];
  // 자유 입력 형태 지원
  outcomes?: string[];
}

export interface CreateProposalRequest {
  proposalType: ProposalType;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  productOrServiceName: string;
  industry: string;
  periodType: PeriodType;
  startDate?: string; // YYYY-MM-DD (Fixed인 경우 필수)
  endDate?: string;   // YYYY-MM-DD (Fixed인 경우 필수)
  proposalContent: string;
  attachmentUrl?: string;
  collaborationMethodsJson?: CollaborationMethodsJson;
  expectedOutcomesJson?: ExpectedOutcomesJson;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
}

export interface CreateProposalResponse {
  success: boolean;
  message: string;
  data: number; // proposalId
}

export interface SubmitProposalResponse {
  success: boolean;
  message: string;
  data: string;
}

export interface UploadAttachmentResponse {
  success: boolean;
  message: string;
  data: string; // attachment URL
}
