// src/services/auth.types.ts
export interface LoginRequest {
  loginId: string;
  password: string;
}

export type UserRole = 'Admin' | 'StudentOrg' | 'Company';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  userId: number;
  username: string;
  role: UserRole;
  status: UserStatus;
  issuedAt: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  passwordConfirm: string;
  managerName: string;
  email: string;
  userrole: UserRole;
  userStatus: UserStatus;
}

export interface SignupResponse {
  userId: number;
  username: string;
  email: string;
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  tokenType: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}
