import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentLayout from '@/components/layout/StudentLayout';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCompanyDetail } from '@/services/company.service';
import type { CompanyDetailResponse } from '@/services/company.types';

export default function CorporateDetail() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const s3BaseUrl = 'https://uniconnect-250909.s3.ap-northeast-2.amazonaws.com';

  useEffect(() => {
    const fetchCompany = async () => {
      if (!companyId) return;
      setIsLoading(true);
      try {
        const data = await getCompanyDetail(Number(companyId));
        setCompany(data);
      } catch (error) {
        console.error('기업 상세 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompany();
  }, [companyId]);

  const getLogoUrl = (logoUrl: string | undefined) => {
    if (!logoUrl) return undefined;
    return logoUrl.startsWith('http') ? logoUrl : `${s3BaseUrl}/${logoUrl.replace(/^\//, '')}`;
  };

  // 하드코딩된 더미 데이터
  const dummyProducts = [
    { id: 1, image: '' },
    { id: 2, image: '' },
    { id: 3, image: '' },
    { id: 4, image: '' },
    { id: 5, image: '' },
    { id: 6, image: '' },
  ];

  const dummyCollaborationMethods = [
    {
      title: '체험 부스',
      description: '문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스',
    },
    {
      title: '체험 부스',
      description: '문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스',
    },
    {
      title: '체험 부스',
      description: '문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스',
    },
    {
      title: '체험 부스',
      description: '문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스',
    },
    {
      title: '체험 부스',
      description: '문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스',
    },
  ];

  const dummyStats = [
    { value: '5,000명 +', label: 'SNS 프로모션' },
    { value: '5,000명 +', label: 'SNS 프로모션' },
    { value: '5,000명 +', label: 'SNS 프로모션' },
  ];

  const dummyHistory = [
    { name: '블루블루', date: '2026-1', type: '물품 협찬' },
    { name: '블루블루', date: '2026-1', type: '물품 협찬' },
    { name: '블루블루', date: '2026-1', type: '물품 협찬' },
  ];

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
        </div>
      </StudentLayout>
    );
  }

  if (!company) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-full text-[#6C727E]">
          기업 정보를 찾을 수 없습니다.
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="flex flex-col h-full w-full max-w-[1200px] mx-auto px-6 overflow-y-auto">
        {/* 이전 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[14px] text-[#6C727E] hover:text-[#007AFF] mb-6 mt-4"
        >
          <ChevronLeft className="w-4 h-4" />
          이전
        </button>

        {/* 헤더 영역 */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-[28px] font-bold text-[#191F28]">
                {company.brandName}
              </h1>
              <ChevronRight className="w-6 h-6 text-[#191F28]" />
            </div>
            <p className="text-[14px] text-[#6C727E] mb-4">
              {company.description || '문과대학의 대표 축제로 다양한 참여와 체험이 가능한 종합 문화 행사입니다'}
            </p>

            {/* 메타 정보 */}
            <div className="flex flex-col gap-2 text-[14px]">
              <div className="flex items-center gap-3">
                <span className="text-[#007AFF]">●</span>
                <span className="text-[#6C727E]">분류</span>
                <span className="text-[#191F28] font-medium">{company.industryName || 'F/B'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#007AFF]">●</span>
                <span className="text-[#6C727E]">기간</span>
                <span className="text-[#191F28] font-medium">2026.01.11 ~ 2026.06.11</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#007AFF]">●</span>
                <span className="text-[#6C727E]">협업</span>
                <span className="text-[#191F28] font-medium">할인형 제휴, 샘플링, 기타</span>
              </div>
            </div>
          </div>

          {/* 협업 요청하기 버튼 */}
          <button
            className="px-6 py-3 bg-[#007AFF] text-white text-[14px] font-medium rounded-lg hover:bg-[#0066DD] transition-colors"
            onClick={() => navigate('/studentsampling/step1')}
          >
            협업 요청하기
          </button>
        </div>

        {/* 제품/서비스 섹션 */}
        <div className="mb-8">
          <h2 className="text-[16px] font-semibold text-[#191F28] mb-4">제품/서비스</h2>
          <div className="grid grid-cols-6 gap-3">
            {dummyProducts.map((product) => (
              <div
                key={product.id}
                className="aspect-square bg-[#F4F6F8] rounded-lg overflow-hidden"
              >
                {product.image ? (
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#E5E8EB]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 희망 협업 방식 섹션 */}
        <div className="mb-8">
          <h2 className="text-[16px] font-semibold text-[#191F28] mb-4">희망 협업 방식</h2>
          <div className="grid grid-cols-3 gap-4">
            {dummyCollaborationMethods.slice(0, 3).map((method, index) => (
              <div
                key={index}
                className="p-4 border border-[#E6E8EC] rounded-xl"
              >
                <h3 className="text-[14px] font-semibold text-[#191F28] mb-2">
                  {method.title}
                </h3>
                <p className="text-[12px] text-[#6C727E] leading-relaxed">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {dummyCollaborationMethods.slice(3, 5).map((method, index) => (
              <div
                key={index + 3}
                className="p-4 border border-[#E6E8EC] rounded-xl"
              >
                <h3 className="text-[14px] font-semibold text-[#191F28] mb-2">
                  {method.title}
                </h3>
                <p className="text-[12px] text-[#6C727E] leading-relaxed">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 희망 협업 성과 섹션 */}
        <div className="mb-8">
          <h2 className="text-[16px] font-semibold text-[#191F28] mb-4">희망 협업 성과</h2>
          <div className="grid grid-cols-3 gap-4">
            {dummyStats.map((stat, index) => (
              <div
                key={index}
                className="p-4 border border-[#E6E8EC] rounded-xl"
              >
                <p className="text-[24px] font-bold text-[#007AFF] mb-1">
                  {stat.value}
                </p>
                <p className="text-[14px] text-[#6C727E]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 협업 이력 섹션 */}
        <div className="mb-8 pb-8">
          <h2 className="text-[16px] font-semibold text-[#191F28] mb-4">협업 이력</h2>
          <div className="flex flex-col gap-3">
            {dummyHistory.map((history, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-xl"
              >
                <div className="w-10 h-10 bg-[#007AFF] rounded-full flex items-center justify-center">
                  <span className="text-white text-[12px] font-bold">B</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#191F28]">
                    {history.name}
                  </p>
                  <p className="text-[12px] text-[#6C727E]">
                    {history.date} | {history.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
