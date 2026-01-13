export interface CreateQnARequest {
  title: string;
  content: string;
  agreePersonalInfo: boolean;
  agreeNotification: boolean;
  files?: File[];
}

export interface CreateQnAResponse {
  success: boolean;
  message: string;
  data?: {
    qnaId: number;
  };
}
