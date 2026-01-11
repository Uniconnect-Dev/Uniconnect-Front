// src/services/s3.service.ts
import axios from 'axios';
import { getAccessToken } from '@/lib/auth/token';
import type { S3UploadMeta, S3UploadResponse } from './s3.types';

export const uploadFile = async (
  file: File,
  meta?: Partial<S3UploadMeta>
): Promise<S3UploadResponse> => {
  const formData = new FormData();

  // 파일 추가
  formData.append('file', file);

  // key가 없으면 타임스탬프 + 확장자로 생성 (영문/숫자/.-_/만 허용)
  const extension = file.name.split('.').pop() || 'file';
  const sanitizedExt = extension.replace(/[^a-zA-Z0-9]/g, '');
  const defaultKey = `uploads/${Date.now()}.${sanitizedExt}`;

  const uploadMeta: S3UploadMeta = {
    key: meta?.key || defaultKey,
    ...meta,
  };

  // meta 데이터를 JSON Blob으로 추가 (application/json 타입 명시)
  const metaBlob = new Blob([JSON.stringify(uploadMeta)], { type: 'application/json' });
  formData.append('meta', metaBlob);

  const token = getAccessToken();

  const response = await axios.post<S3UploadResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/s3/upload`,
    formData,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: true,
    }
  );

  // API 응답의 success 필드 체크
  if (!response.data.success) {
    throw new Error(response.data.message || '파일 업로드에 실패했습니다.');
  }

  return response.data;
};
