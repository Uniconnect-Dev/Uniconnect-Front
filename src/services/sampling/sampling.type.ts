export interface CreateSamplingProposalRequest {
  productName: string;
  industry: string;
  samplingPurpose: string;
  samplingStartDate: string; // YYYY-MM-DD
  samplingEndDate: string; // YYYY-MM-DD
  productCount: number;
  detailRequest: string;
}
