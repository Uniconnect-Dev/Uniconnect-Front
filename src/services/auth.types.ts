// src/services/auth.types.ts
export interface LoginRequest {
    loginId: string;
    password: string;
  }
  
  export type UserRole = 'Admin' | 'StudentOrg' | 'Corporate';
  
  export interface LoginResponse {
    tokenType: string;
    accessToken: string;
    accessTokenExpiresIn: number;
    refreshToken: string;
    refreshTokenExpiresIn: number;
    userId: number;
    username: string;
    role: UserRole;
    status: string;
    issuedAt: string;
  }
  