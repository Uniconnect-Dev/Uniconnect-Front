// src/services/auth.service.ts
import axios from 'axios';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './auth.types';
import { api } from '@/lib/api/client';

export const login = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  return api.post('/auth/login', payload);
};

export const signupWithoutEmail = async (
  payload: SignupRequest
): Promise<SignupResponse> => {
  return api.post('/auth/signupWithoutEmail', payload);
};

/**
 * refreshToken으로 새 accessToken 발급
 * 주의: 이 함수는 api 클라이언트를 사용하지 않음 (순환 참조 방지)
 */
export const refreshAccessToken = async (
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  const response = await axios.post<RefreshTokenResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    { refreshToken } as RefreshTokenRequest
  );
  return response.data;
};
