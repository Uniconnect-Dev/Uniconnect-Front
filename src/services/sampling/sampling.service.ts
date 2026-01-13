import { api } from '@/lib/api/client';
import {
  CreateSamplingProposalRequest,
  SaveSamplingTargetsRequest,
  MatchedStudentOrg,
  StudentOrgDetail,
  GetStudentOrgDetailParams,
  SubmitSamplingProposalRequest,
  SubmitSamplingProposalResponse,
  OrgEstimateResponse,
  TotalEstimateResponse,
  EstimateParams,
} from './sampling.type';

export async function createSamplingProposal(
  payload: CreateSamplingProposalRequest
) {
  return api.post<number>('/api/sampling/proposals', payload);
}

export async function saveSamplingTargets(
  payload: SaveSamplingTargetsRequest
) {
  return api.post('/api/sampling/proposals/targets', payload);
}

export async function getMatchedStudentOrgs(
  samplingProposalId: number
): Promise<MatchedStudentOrg[]> {
  return api.get<MatchedStudentOrg[]>(`/api/sampling/proposals/${samplingProposalId}/student-orgs`);
}

export async function getStudentOrgDetail(
  params: GetStudentOrgDetailParams
): Promise<StudentOrgDetail> {
  const { samplingProposalId, orgId, baseUnitCost, reportOptionFee, operationFee } = params;
  return api.get<StudentOrgDetail>(
    `/api/sampling/proposals/${samplingProposalId}/student-orgs/${orgId}`,
    {
      params: { baseUnitCost, reportOptionFee, operationFee }
    }
  );
}

export async function submitSamplingProposal(
  payload: SubmitSamplingProposalRequest
): Promise<SubmitSamplingProposalResponse> {
  return api.post<SubmitSamplingProposalResponse>('/api/sampling/proposals/submit', payload);
}

// 단체별 예상 금액 계산
export async function getOrgEstimate(
  params: EstimateParams & { orgId: number }
): Promise<OrgEstimateResponse> {
  const { samplingProposalId, orgId, baseUnitCost, reportOptionFee, operationFee } = params;
  return api.get<OrgEstimateResponse>(
    `/api/sampling/proposals/${samplingProposalId}/student-orgs/${orgId}/estimate`,
    {
      params: { baseUnitCost, reportOptionFee, operationFee }
    }
  );
}

// 선택한 단체들의 총 예상 금액 계산
export async function getTotalEstimate(
  params: EstimateParams,
  orgIds: number[]
): Promise<TotalEstimateResponse> {
  const { samplingProposalId, baseUnitCost, reportOptionFee, operationFee } = params;
  return api.post<TotalEstimateResponse>(
    `/api/sampling/proposals/${samplingProposalId}/estimate`,
    orgIds,
    {
      params: { baseUnitCost, reportOptionFee, operationFee }
    }
  );
}
