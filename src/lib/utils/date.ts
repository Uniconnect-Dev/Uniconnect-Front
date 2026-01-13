// src/lib/utils/date.ts

/**
 * Date 객체를 UI 표시용 문자열로 변환 (점 구분)
 * @example formatDateForDisplay(new Date()) -> "2026.01.14"
 */
export const formatDateForDisplay = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
};

/**
 * Date 객체를 API 전송용 ISO 형식 문자열로 변환 (하이픈 구분)
 * @example formatDateForApi(new Date()) -> "2026-01-14"
 */
export const formatDateForApi = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/**
 * 점 구분 날짜 문자열을 ISO 형식(하이픈 구분)으로 변환
 * @example toApiDateFormat("2026.01.14") -> "2026-01-14"
 */
export const toApiDateFormat = (displayDate: string): string => {
  if (!displayDate) return '';
  return displayDate.replace(/\./g, '-');
};

/**
 * ISO 형식(하이픈 구분) 날짜 문자열을 점 구분으로 변환
 * @example toDisplayDateFormat("2026-01-14") -> "2026.01.14"
 */
export const toDisplayDateFormat = (apiDate: string): string => {
  if (!apiDate) return '';
  return apiDate.replace(/-/g, '.');
};
