// src/lib/auth/token.ts

// Access Token
export const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const clearAccessToken = () => {
  localStorage.removeItem('accessToken');
};

// Refresh Token
export const setRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token);
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const clearRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};

// User Role
export const setUserRole = (role: string) => {
  localStorage.setItem('userRole', role);
};

export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

export const clearUserRole = () => {
  localStorage.removeItem('userRole');
};

// Clear all auth data
export const clearAllAuthData = () => {
  clearAccessToken();
  clearRefreshToken();
  clearUserId();
  clearUserRole();
  clearStudentOrgId();
};

export const setUserId = (userId: number) => {
  localStorage.setItem('userId', String(userId));
};

export const getUserId = (): number | null => {
  const id = localStorage.getItem('userId');
  return id ? Number(id) : null;
};

export const clearUserId = () => {
  localStorage.removeItem('userId');
};

export const setStudentOrgId = (studentOrgId: number) => {
  localStorage.setItem('studentOrgId', String(studentOrgId));
};

export const getStudentOrgId = (): number | null => {
  const id = localStorage.getItem('studentOrgId');
  return id ? Number(id) : null;
};

export const clearStudentOrgId = () => {
  localStorage.removeItem('studentOrgId');
};
