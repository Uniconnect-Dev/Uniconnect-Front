export interface QnAItem {
  questionId: number;
  title: string;
  status: 'WAITING' | 'ANSWERED';
  createdAt: string; // 추가
  answerCreatedAt?: string; // 기존
}

export interface GetQnAListResponse {
  success: boolean;
  message: string;
  data: {
    totalCount: number;
    pendingCount: number;
    answeredCount: number;
    questions: QnAItem[];
  };
}

export interface QnADetailItem {
  questionId: number;
  title: string;
  content: string;
  answerContent: string | null;
  status: string;
  createdAt: string;
  answerCreatedAt: string | null;
  fileUrls: string[]; // ✅ 항상 배열
}

export interface QnADetailResponse {
  questionId: number;
  title: string;
  content: string;
  answerContent: string | null;
  status: string;
  createdAt: string;
  answerCreatedAt: string | null;
  fileUrls?: string[];
}
