// src/constants/hashtags.ts
// 학생단체 키워드 태그 매핑

export interface HashtagOption {
  id: number;
  name: string;
}

// 학생 유형 (StudentType)
export const STUDENT_TYPE_OPTIONS: HashtagOption[] = [
  { id: 1, name: '총학생회' },
  { id: 2, name: '단과대학생회' },
  { id: 3, name: '과학생회' },
  { id: 4, name: '중앙동아리' },
  { id: 5, name: '과동아리' },
  { id: 6, name: '연합동아리' },
  { id: 7, name: '학회' },
  { id: 8, name: '국제교류단체' },
];

// 지역 (Region)
export const REGION_OPTIONS: HashtagOption[] = [
  { id: 9, name: '서대문구' },
  { id: 10, name: '마포구' },
  { id: 11, name: '종로구' },
  { id: 12, name: '성북구' },
  { id: 13, name: '관악구' },
  { id: 14, name: '동작구' },
  { id: 15, name: '광진구' },
  { id: 16, name: '노원구' },
  { id: 17, name: '강남구' },
  { id: 18, name: '부산' },
  { id: 19, name: '수원' },
];

// 취미 (Hobby)
export const HOBBY_OPTIONS: HashtagOption[] = [
  { id: 20, name: '카페' },
  { id: 21, name: '맛집' },
  { id: 22, name: '운동' },
  { id: 23, name: '러닝' },
  { id: 24, name: '산책' },
  { id: 25, name: '음악감상' },
  { id: 26, name: '연주' },
  { id: 27, name: '보드게임' },
  { id: 28, name: '패션' },
];

// 라이프스타일 (Lifestyle)
export const LIFESTYLE_OPTIONS: HashtagOption[] = [
  { id: 29, name: 'SNS' },
  { id: 30, name: '자기계발' },
  { id: 31, name: '트렌드' },
  { id: 32, name: '가성비' },
  { id: 33, name: '할인' },
  { id: 34, name: '건강' },
  { id: 35, name: '친환경' },
  { id: 36, name: '다이어트' },
  { id: 37, name: '독서' },
];

// 이름으로 ID 조회 헬퍼 함수
export function getTagIdsByNames(options: HashtagOption[], names: string[]): number[] {
  return names
    .map((name) => options.find((opt) => opt.name === name)?.id)
    .filter((id): id is number => id !== undefined);
}

// ID로 이름 조회 헬퍼 함수
export function getTagNamesByIds(options: HashtagOption[], ids: number[]): string[] {
  return ids
    .map((id) => options.find((opt) => opt.id === id)?.name)
    .filter((name): name is string => name !== undefined);
}
