// src/services/auth.service.ts
import { api } from '@/lib/api/client';
import type { LoginRequest, LoginResponse } from './auth.types';

export const login = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  return api.post('/auth/login', payload);
};
