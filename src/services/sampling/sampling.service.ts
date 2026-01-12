import { api } from '@/lib/api/client';
import { CreateSamplingProposalRequest } from './sampling.type';

export async function createSamplingProposal(
  payload: CreateSamplingProposalRequest
) {
  return api.post<number>('/api/sampling/proposals', payload);
}
