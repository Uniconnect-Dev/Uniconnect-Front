// src/constants/targetKeywords.ts
// 기업용 샘플링 타깃 키워드 매핑

export interface TargetKeywordOption {
  id: number;
  label: string;
}

// 기본 정보 (BasicInfo)
export const BASIC_INFO_OPTIONS: TargetKeywordOption[] = [
  { id: 1, label: '기숙사생' },
  { id: 2, label: '통학생' },
  { id: 3, label: '신입생' },
  { id: 4, label: '졸업예정자' },
  { id: 5, label: '휴학생' },
  { id: 6, label: '여성대학생' },
  { id: 7, label: '남성대학생' },
  { id: 8, label: '성별무관' },
  { id: 9, label: '서울권대학' },
  { id: 10, label: '지방대학' },
];

// 라이프스타일 (Lifestyle)
export const LIFESTYLE_TARGET_OPTIONS: TargetKeywordOption[] = [
  { id: 11, label: '운동러' },
  { id: 12, label: '헬스' },
  { id: 13, label: '카페투어' },
  { id: 14, label: '맛집탐방' },
  { id: 15, label: '인스타감성' },
  { id: 16, label: '패션피플' },
  { id: 17, label: '뷰티' },
  { id: 18, label: '여행러' },
  { id: 19, label: '자기계발러' },
  { id: 20, label: '취준생' },
];

// 행사 성격 (EventNature)
export const EVENT_NATURE_OPTIONS: TargetKeywordOption[] = [
  { id: 21, label: '축제' },
  { id: 22, label: '신입생환영회' },
  { id: 23, label: '동아리박람회' },
  { id: 24, label: '시험기간' },
  { id: 25, label: '방학이벤트' },
  { id: 26, label: '학교행사' },
  { id: 27, label: '샘플링이벤트' },
  { id: 28, label: '현장배포' },
  { id: 29, label: '체험존' },
  { id: 30, label: 'SNS인증이벤트' },
];

// 라벨로 ID 조회 헬퍼 함수
export function getTargetKeywordIdsByLabels(
  options: TargetKeywordOption[],
  labels: string[]
): number[] {
  return labels
    .map((label) => options.find((opt) => opt.label === label)?.id)
    .filter((id): id is number => id !== undefined);
}

// ID로 라벨 조회 헬퍼 함수
export function getTargetKeywordLabelsByIds(
  options: TargetKeywordOption[],
  ids: number[]
): string[] {
  return ids
    .map((id) => options.find((opt) => opt.id === id)?.label)
    .filter((label): label is string => label !== undefined);
}

// 전체 옵션에서 ID로 라벨 조회
export function getAllTargetKeywordLabelsByIds(ids: number[]): string[] {
  const allOptions = [
    ...BASIC_INFO_OPTIONS,
    ...LIFESTYLE_TARGET_OPTIONS,
    ...EVENT_NATURE_OPTIONS,
  ];
  return ids
    .map((id) => allOptions.find((opt) => opt.id === id)?.label)
    .filter((label): label is string => label !== undefined);
}

// 전체 옵션에서 라벨로 ID 조회
export function getAllTargetKeywordIdsByLabels(labels: string[]): number[] {
  const allOptions = [
    ...BASIC_INFO_OPTIONS,
    ...LIFESTYLE_TARGET_OPTIONS,
    ...EVENT_NATURE_OPTIONS,
  ];
  return labels
    .map((label) => allOptions.find((opt) => opt.label === label)?.id)
    .filter((id): id is number => id !== undefined);
}
