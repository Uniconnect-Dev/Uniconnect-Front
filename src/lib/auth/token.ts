// src/lib/auth/token.ts
export const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const clearAccessToken = () => {
  localStorage.removeItem('accessToken');
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
