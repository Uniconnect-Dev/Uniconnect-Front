import axios from 'axios';
import { getAccessToken } from '@/lib/auth/token';
import type {
  GetQnAListResponse,
  QnAItem,
  QnADetailItem,
  QnADetailResponse,
} from './qna.types';

export const getQnAList = async (): Promise<QnAItem[]> => {
  const token = getAccessToken();

  const response = await axios.get<GetQnAListResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/qna/my`,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: true,
    }
  );

  if (!response.data.success) {
    throw new Error(response.data.message || 'Q&A 목록 조회에 실패했습니다.');
  }

  return response.data.data.questions;
};

export const getQnADetail = async (
  questionId: number
): Promise<QnADetailItem> => {
  const token = getAccessToken();

  const response = await axios.get<{
    success: boolean;
    message: string;
    data: QnADetailResponse;
  }>(`${import.meta.env.VITE_API_BASE_URL}/api/qna/${questionId}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    withCredentials: true,
  });

  if (!response.data.success) {
    throw new Error(
      response.data.message || 'Q&A 상세 정보 조회에 실패했습니다.'
    );
  }

  const data = response.data.data;

  return {
    ...data,
    fileUrls: data.fileUrls ?? [],
  };
};
