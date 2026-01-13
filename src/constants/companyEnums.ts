// src/constants/companyEnums.ts
// 기업 업태/업종 enum 매핑

export interface EnumOption {
  value: string; // API로 보내는 enum 값
  label: string; // UI에 표시되는 한글명
}

// 업종 (IndustryType) - 백엔드 enum과 동기화
export const INDUSTRY_TYPE_OPTIONS: EnumOption[] = [
  { value: 'SOFTWARE_DEVELOPMENT', label: '소프트웨어 개발업' },
  { value: 'IT_SERVICE', label: 'IT 서비스업' },
  { value: 'INFORMATION_COMMUNICATION', label: '정보통신업' },
  { value: 'DATA_PROCESSING', label: '데이터 처리업' },
  { value: 'AI_SERVICE', label: '인공지능 서비스업' },
  { value: 'CLOUD_SERVICE', label: '클라우드 서비스업' },
  { value: 'PLATFORM_OPERATION', label: '플랫폼 운영업' },
  { value: 'SYSTEM_INTEGRATION', label: '시스템 통합(SI)' },
  { value: 'SOLUTION_DEVELOPMENT', label: '솔루션 개발업' },
  { value: 'CONSULTING', label: '컨설팅업' },
  { value: 'MANAGEMENT_CONSULTING', label: '경영컨설팅업' },
  { value: 'STRATEGY_CONSULTING', label: '전략컨설팅업' },
  { value: 'MARKETING_CONSULTING', label: '마케팅 컨설팅업' },
  { value: 'LEGAL_SERVICE', label: '법률 서비스업' },
  { value: 'ACCOUNTING_TAX_SERVICE', label: '회계·세무 서비스업' },
  { value: 'HR_LABOR_SERVICE', label: '인사·노무 서비스업' },
  { value: 'RESEARCH_SURVEY', label: '리서치·조사업' },
  { value: 'ADVERTISING_AGENCY', label: '광고대행업' },
  { value: 'MARKETING_AGENCY', label: '마케팅대행업' },
  { value: 'DIGITAL_MARKETING', label: '디지털마케팅업' },
  { value: 'CONTENT_PRODUCTION', label: '콘텐츠 제작업' },
  { value: 'MEDIA_CONTENT', label: '미디어 콘텐츠업' },
  { value: 'VIDEO_PRODUCTION', label: '영상 제작업' },
  { value: 'DESIGN_SERVICE', label: '디자인 서비스업' },
  { value: 'BRAND_CONSULTING', label: '브랜드 컨설팅업' },
  { value: 'SERVICE', label: '서비스업' },
  { value: 'OPERATION_AGENCY', label: '운영대행업' },
  { value: 'OUTSOURCING', label: '아웃소싱업' },
  { value: 'CRM_SERVICE', label: 'CRM 서비스업' },
  { value: 'MANUFACTURING', label: '제조업' },
  { value: 'RESEARCH_DEVELOPMENT', label: '연구·개발(R&D)업' },
  { value: 'TECHNOLOGY_DEVELOPMENT', label: '기술 개발업' },
  { value: 'WHOLESALE_RETAIL', label: '도소매업' },
  { value: 'DISTRIBUTION', label: '유통업' },
  { value: 'TRADE', label: '무역업' },
  { value: 'E_COMMERCE', label: '전자상거래업' },
  { value: 'EDUCATION_SERVICE', label: '교육 서비스업' },
  { value: 'CORPORATE_EDUCATION', label: '기업교육' },
  { value: 'ONLINE_EDUCATION', label: '온라인 교육업' },
  { value: 'HR_SERVICE', label: 'HR 서비스업' },
  { value: 'RECRUITMENT_PLATFORM', label: '채용 플랫폼 운영업' },
  { value: 'FINANCIAL_SERVICE', label: '금융 서비스업' },
  { value: 'FINTECH_SERVICE', label: '핀테크 서비스업' },
  { value: 'PAYMENT_SERVICE', label: '결제 서비스업' },
  { value: 'DATA_FINANCE', label: '데이터 금융업' },
];

// 업태 (BusinessType) - 백엔드 enum과 동기화
export const BUSINESS_TYPE_OPTIONS: EnumOption[] = [
  { value: 'CORPORATION', label: '법인사업자' },
  { value: 'INDIVIDUAL', label: '개인사업자' },
  { value: 'STARTUP', label: '스타트업' },
  { value: 'SMALL_BUSINESS', label: '중소기업' },
  { value: 'MEDIUM_BUSINESS', label: '중견기업' },
  { value: 'LARGE_ENTERPRISE', label: '대기업' },
  { value: 'SUBSIDIARY', label: '계열사' },
  { value: 'B2B', label: 'B2B' },
  { value: 'B2C', label: 'B2C' },
  { value: 'B2B2C', label: 'B2B2C' },
  { value: 'SAAS', label: 'SaaS' },
  { value: 'PLATFORM_BASED', label: '플랫폼 기반' },
  { value: 'SUBSCRIPTION_SERVICE', label: '구독형 서비스' },
  { value: 'PROJECT_BASED', label: '프로젝트 기반' },
  { value: 'IN_HOUSE_DEVELOPMENT', label: '자체 개발' },
  { value: 'OUTSOURCED_DEVELOPMENT', label: '외주 개발' },
  { value: 'OPERATION_AGENCY', label: '운영 대행' },
  { value: 'CONSIGNMENT_OPERATION', label: '위탁 운영' },
  { value: 'SOLUTION_PROVIDER', label: '솔루션 제공' },
  { value: 'API_PROVIDER', label: 'API 제공' },
  { value: 'ONLINE_SERVICE', label: '온라인 서비스' },
  { value: 'OFFLINE_OPERATION', label: '오프라인 운영' },
  { value: 'OMNI_CHANNEL', label: '온·오프라인 병행' },
  { value: 'DIRECT_SALES', label: '직접 판매' },
  { value: 'INDIRECT_SALES', label: '간접 판매' },
  { value: 'PARTNERSHIP_BASED', label: '파트너십 기반' },
  { value: 'TECH_BASED_COMPANY', label: '기술 기반 기업' },
  { value: 'DATA_BASED_COMPANY', label: '데이터 기반 기업' },
  { value: 'PLATFORM_COMPANY', label: '플랫폼 기업' },
  { value: 'CONTENT_COMPANY', label: '콘텐츠 기업' },
  { value: 'RESEARCH_FOCUSED_COMPANY', label: '연구 중심 기업' },
];

// 헬퍼 함수: label로 enum value 찾기
export function getIndustryTypeValue(label: string): string | undefined {
  return INDUSTRY_TYPE_OPTIONS.find((opt) => opt.label === label)?.value;
}

export function getBusinessTypeValue(label: string): string | undefined {
  return BUSINESS_TYPE_OPTIONS.find((opt) => opt.label === label)?.value;
}

// 헬퍼 함수: enum value로 label 찾기
export function getIndustryTypeLabel(value: string): string | undefined {
  return INDUSTRY_TYPE_OPTIONS.find((opt) => opt.value === value)?.label;
}

export function getBusinessTypeLabel(value: string): string | undefined {
  return BUSINESS_TYPE_OPTIONS.find((opt) => opt.value === value)?.label;
}

// UI에서 사용할 label 배열
export const INDUSTRY_TYPE_LABELS = INDUSTRY_TYPE_OPTIONS.map((opt) => opt.label);
export const BUSINESS_TYPE_LABELS = BUSINESS_TYPE_OPTIONS.map((opt) => opt.label);
