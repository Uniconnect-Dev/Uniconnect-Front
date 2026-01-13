// src/lib/api/client.ts
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { mapToAppError } from '@/lib/error/mapToAppError';
import type { ApiResponse } from './types';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearAllAuthData,
} from '@/lib/auth/token';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 토큰 갱신 중인지 추적
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - 토큰 추가
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - 에러 처리 및 토큰 갱신
api.interceptors.response.use(
  (res: AxiosResponse<ApiResponse<unknown>>) => {
    const body = res.data;

    // success 필드가 명시적으로 false인 경우만 에러 처리
    if (body.success === false) {
      throw mapToAppError(body, res.status);
    }

    // success: true인 경우 data 반환, 아니면 body 전체 반환
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (body.data !== undefined ? body.data : body) as any;
  },
  async (error: AxiosError<ApiResponse<unknown>>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러이고 재시도하지 않은 요청인 경우 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = getRefreshToken();

      // refreshToken이 없으면 로그아웃 처리
      if (!refreshToken) {
        clearAllAuthData();
        window.location.href = '/login';
        throw mapToAppError(error.response?.data ?? null, 401);
      }

      if (isRefreshing) {
        // 이미 갱신 중이면 대기열에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 토큰 갱신 요청 (순환 참조 방지를 위해 직접 axios 사용)
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        setAccessToken(newAccessToken);
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        clearAllAuthData();
        window.location.href = '/login';
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      throw mapToAppError(error.response.data, error.response.status);
    }

    throw mapToAppError(null);
  }
);