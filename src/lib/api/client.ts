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

    if (!body.success) {
      throw mapToAppError(body, res.status);
    }

    return body.data;
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