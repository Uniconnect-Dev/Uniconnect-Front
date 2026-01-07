// src/lib/error/mapToAppError.ts
import { AppError } from './AppError';

export function mapToAppError(
  response: any,
  status?: number
): AppError {
  /**
   * 1️⃣ 서버가 명시적으로 실패를 내려준 경우
   * → message를 그대로 UI에 전달
   */
  if (response && response.success === false) {
    return new AppError(
      'SERVER',
      response.message || '요청에 실패했습니다',
      status
    );
  }

  /**
   * 2️⃣ 인증 실패 (주로 토큰 만료 / 잘못된 인증)
   * 로그인 API에서도 여기로 들어올 수 있음
   */
  if (status === 401) {
    return new AppError(
      'AUTH',
      '아이디 또는 비밀번호가 올바르지 않습니다',
      status
    );
  }

  /**
   * 3️⃣ 권한 없음
   */
  if (status === 403) {
    return new AppError(
      'FORBIDDEN',
      '권한이 없습니다',
      status
    );
  }

  /**
   * 4️⃣ 서버 에러
   */
  if (status && status >= 500) {
    return new AppError(
      'SERVER',
      '서버 오류가 발생했습니다',
      status
    );
  }

  /**
   * 5️⃣ 네트워크 / 알 수 없는 에러
   */
  return new AppError(
    'NETWORK',
    '네트워크 오류가 발생했습니다'
  );
}
