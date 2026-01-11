// src/lib/api/client.ts
import axios, { AxiosResponse, AxiosError } from 'axios';
import { mapToAppError } from '@/lib/error/mapToAppError';
import type { ApiResponse } from './types';
import { getAccessToken } from '@/lib/auth/token';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res: AxiosResponse<ApiResponse<any>>) => {
    const body = res.data;

    // success 필드가 명시적으로 false인 경우만 에러 처리
    // success 필드가 없는 응답(회원가입, 로그인 등)은 그대로 반환
    if (body.success === false) {
      throw mapToAppError(body, res.status);
    }

    // success: true인 경우 data 반환, 아니면 body 전체 반환
    return body.data !== undefined ? body.data : body;
  },
  (error: AxiosError<ApiResponse<any>>) => {
    if (error.response) {
      throw mapToAppError(
        error.response.data,
        error.response.status
      );
    }

    throw mapToAppError(null);
  }
);

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});