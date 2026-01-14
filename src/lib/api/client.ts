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

// ==================== 토큰 자동 갱신 로직 ====================

// JWT 토큰에서 만료 시간 추출
const getTokenExpiry = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null; // ms로 변환
  } catch {
    return null;
  }
};

// 토큰이 곧 만료되는지 확인 (5분 전)
const isTokenExpiringSoon = (token: string, thresholdMs: number = 5 * 60 * 1000): boolean => {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true; // 만료 시간 모르면 갱신 시도
  return Date.now() > expiry - thresholdMs;
};

// 토큰 갱신 함수
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const responseData = response.data.data ?? response.data;
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = responseData;

    if (newAccessToken && typeof newAccessToken === 'string') {
      setAccessToken(newAccessToken);
      if (newRefreshToken && typeof newRefreshToken === 'string') {
        setRefreshToken(newRefreshToken);
      }
      console.log('[Auth] 토큰 자동 갱신 성공');
      return newAccessToken;
    }
  } catch (error) {
    console.error('[Auth] 토큰 자동 갱신 실패:', error);
  }
  return null;
};

// 주기적으로 토큰 상태 확인 및 갱신 (3분마다)
let refreshInterval: ReturnType<typeof setInterval> | null = null;

export const startTokenRefreshTimer = () => {
  if (refreshInterval) return; // 이미 실행 중이면 무시

  // refreshToken이 없으면 타이머 시작 안함
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.log('[Auth] refreshToken 없음, 타이머 시작 안함');
    return;
  }

  refreshInterval = setInterval(async () => {
    const token = getAccessToken();
    const currentRefreshToken = getRefreshToken();

    // refreshToken이 없으면 갱신 중단
    if (!currentRefreshToken) {
      stopTokenRefreshTimer();
      return;
    }

    if (token && isTokenExpiringSoon(token)) {
      console.log('[Auth] 토큰 만료 임박, 갱신 시도...');
      await refreshAccessToken();
    }
  }, 3 * 60 * 1000); // 3분마다 체크

  console.log('[Auth] 토큰 자동 갱신 타이머 시작');
};

export const stopTokenRefreshTimer = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
    console.log('[Auth] 토큰 자동 갱신 타이머 중지');
  }
};

// 앱 시작 시 즉시 토큰 체크
export const checkAndRefreshToken = async () => {
  const token = getAccessToken();
  const refreshToken = getRefreshToken();

  // refreshToken이 없으면 갱신 불가
  if (!refreshToken) {
    console.log('[Auth] refreshToken 없음, 토큰 갱신 건너뜀');
    return;
  }

  if (token && isTokenExpiringSoon(token, 10 * 60 * 1000)) { // 10분 이내 만료 예정이면
    console.log('[Auth] 앱 시작 시 토큰 갱신 필요');
    await refreshAccessToken();
  }
};

// ==================== 토큰 자동 갱신 로직 끝 ====================

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
    // 토큰이 "undefined" 문자열이거나 유효하지 않은 경우 체크
    if (token === 'undefined' || token === 'null' || token.length < 10) {
      console.error('[Auth] 유효하지 않은 토큰 감지, 토큰 제거:', token);
      clearAllAuthData();
      window.location.href = '/login';
      return Promise.reject(new Error('유효하지 않은 토큰'));
    }
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
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // API 응답이 { success, message, data } 형태로 래핑되어 있음
        const responseData = response.data.data ?? response.data;
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = responseData;

        // 토큰 유효성 검사
        if (!newAccessToken || typeof newAccessToken !== 'string') {
          console.error('[Auth] 토큰 갱신 실패: 유효하지 않은 accessToken', responseData);
          throw new Error('유효하지 않은 토큰 응답');
        }

        setAccessToken(newAccessToken);
        if (newRefreshToken && typeof newRefreshToken === 'string') {
          setRefreshToken(newRefreshToken);
        }

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('[Auth] 토큰 갱신 에러:', refreshError);
        processQueue(refreshError as Error, null);
        clearAllAuthData();
        window.location.href = '/login';
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      // 500 에러 디버깅
      if (error.response.status >= 500) {
        console.error('[API] 서버 에러:', {
          url: originalRequest?.url,
          method: originalRequest?.method,
          status: error.response.status,
          data: error.response.data,
        });
      }
      throw mapToAppError(error.response.data, error.response.status);
    }

    throw mapToAppError(null);
  }
);