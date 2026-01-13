import axios from 'axios';
import { getAccessToken } from '@/lib/auth/token';
import type { CreateQnARequest, CreateQnAResponse } from './qna.types';

export const createQnA = async (
  data: CreateQnARequest
): Promise<CreateQnAResponse> => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('agreePersonalInfo', 'true');
  formData.append('agreeNotification', 'true');

  if (data.files && data.files.length > 0) {
    data.files.forEach((file) => {
      formData.append('files', file);
    });
  }

  const token = getAccessToken();

  const response = await axios.post<CreateQnAResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/qna`,
    formData,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Content-Type은 명시하지 않음 - axios가 FormData를 감지하면 자동 설정
      },
      withCredentials: true,
    }
  );

  // s3.service.ts와 동일하게 success 체크
  if (!response.data.success) {
    throw new Error(response.data.message || '파일 업로드에 실패했습니다.');
  }

  return response.data;
};
