// src/lib/auth/token.ts

// Access Token
export const setAccessToken = (token: string) => {
  if (!token || typeof token !== 'string') {
    console.error('[Token] 유효하지 않은 accessToken:', token);
    return;
  }
  localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const clearAccessToken = () => {
  localStorage.removeItem('accessToken');
};

// Refresh Token
export const setRefreshToken = (token: string | null | undefined) => {
  if (!token || typeof token !== 'string') {
    // null/undefined는 정상적인 경우일 수 있으므로 warn으로 변경
    if (token !== null && token !== undefined) {
      console.warn('[Token] 유효하지 않은 refreshToken 타입:', typeof token);
    }
    return;
  }
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
