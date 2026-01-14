// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getAccessToken,
  getRefreshToken,
  getUserRole,
  getUserId,
  setAccessToken,
  setRefreshToken,
  setUserId,
  setUserRole,
  clearAllAuthData,
} from '@/lib/auth/token';
import { startTokenRefreshTimer, stopTokenRefreshTimer, checkAndRefreshToken } from '@/lib/api/client';
import type { UserRole } from '@/services/auth.types';

interface User {
  userId: number;
  role: UserRole;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (data: {
    accessToken: string;
    refreshToken: string;
    userId: number;
    role: UserRole;
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // 앱 시작 시 localStorage에서 인증 상태 복원
  useEffect(() => {
    const initializeAuth = () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const userId = getUserId();
      const role = getUserRole() as UserRole | null;

      if (accessToken && refreshToken && userId && role) {
        setIsAuthenticated(true);
        setUser({ userId, role });
        // 로그인 상태면 토큰 자동 갱신 시작
        checkAndRefreshToken();
        startTokenRefreshTimer();
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    initializeAuth();

    return () => {
      stopTokenRefreshTimer();
    };
  }, []);

  const login = useCallback(
    (data: {
      accessToken: string;
      refreshToken: string;
      userId: number;
      role: UserRole;
    }) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUserId(data.userId);
      setUserRole(data.role);

      setIsAuthenticated(true);
      setUser({ userId: data.userId, role: data.role });

      // 로그인 후 토큰 자동 갱신 타이머 시작
      startTokenRefreshTimer();
    },
    []
  );

  const logout = useCallback(() => {
    // 토큰 자동 갱신 타이머 중지
    stopTokenRefreshTimer();
    clearAllAuthData();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
