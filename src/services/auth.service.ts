// src/services/auth.service.ts
import { api } from '@/lib/api/client';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from './auth.types';

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
