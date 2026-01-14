import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../../components/layout/StudentLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { useCampaignForm } from '@/context/CampaignFormContext';
import axios from 'axios';
import { getAccessToken } from '@/lib/auth/token';

// /api/companies/list API 응답 타입
interface CompanyItem {
  companyId: number;
  brandName: string;
  logoUrl: string;
  shortDescription: string;
  industryName: string;
  used: boolean;
}

// S3 URL 변환 함수
const getFullLogoUrl = (logoUrl: string | null | undefined): string | undefined => {
  if (!logoUrl) return undefined;
  if (logoUrl.startsWith('http')) return logoUrl;
  const s3BaseUrl = 'https://uniconnect-250909.s3.ap-northeast-2.amazonaws.com';
  return `${s3BaseUrl}/${logoUrl.replace(/^\//, '')}`;
};

export default function Step3ChooseCorporate() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCampaignForm();
  const MAX_SELECT = 5;

  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 기업 목록 조회
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const token = getAccessToken();
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/companies/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // API 응답 구조 디버깅
        console.log('기업 목록 API 응답:', response.data);

        // 응답 구조에 따라 처리
        const data = response.data;
        if (Array.isArray(data)) {
          setCompanies(data);
        } else if (data?.content && Array.isArray(data.content)) {
          setCompanies(data.content);
        } else if (data?.data && Array.isArray(data.data)) {
          setCompanies(data.data);
        } else {
          console.error('예상치 못한 응답 구조:', data);
          setCompanies([]);
        }
      } catch (error) {
        console.error('기업 목록 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const toggleSelect = (id: number) => {
    const currentIds = formData.selectedCompanyIds;
    if (currentIds.includes(id)) {
      updateFormData({
        selectedCompanyIds: currentIds.filter((v) => v !== id),
      });
    } else if (currentIds.length < MAX_SELECT) {
      updateFormData({
        selectedCompanyIds: [...currentIds, id],
      });
    }
  };

  return (
    <StudentLayout>
      <div className="flex flex-col h-full w-full max-w-[960px] mx-auto px-6">

        {/* ================= 상단 고정 ================= */}
        <div className="flex-shrink-0">
          <div className="flex justify-between items-start mt-4 mb-2">
            <div>
              <h1 className="text-[24px] font-semibold mb-1">기업 선택</h1>
              <p className="text-[#949BA7] text-[15px]">
                협업 제안을 보낼 기업을 선택해주세요.
              </p>
            </div>
            <RequestStatus activeStep={3} />
          </div>

          <div className="border-t border-gray-200 my-4" />

          <div className="mb-4">
            <p className="text-[16px] font-medium text-[#2D3139]">
              기업 선호도에 따른 추천 목록입니다.{' '}
              <span className="text-[#949BA7]">(선택)</span>
            </p>
            <p className="text-[14px] mt-1">
              <span className="text-[#008FFF] font-medium">
                {formData.selectedCompanyIds.length}
              </span>
              <span className="text-[#949BA7]">
                {' '} / {MAX_SELECT}개 선택
              </span>
            </p>
          </div>
        </div>

        {/* ================= 카드 스크롤 영역 ================= */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">추천 기업을 불러오는 중...</p>
            </div>
          ) : companies.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">추천 기업이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 pb-8">
              {companies.map((company) => {
                const active = formData.selectedCompanyIds.includes(company.companyId);

                return (
                  <button
                    key={company.companyId}
                    onClick={() => toggleSelect(company.companyId)}
                    className={`flex flex-col rounded-2xl border text-left transition-all
                      ${
                        active
                          ? 'border-[#008FFF] bg-[#E3F4FF]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <div className="p-4">
                      <div className="h-[120px] rounded-xl bg-[#F3F5F9] flex items-center justify-center overflow-hidden">
                        {company.logoUrl ? (
                          <img
                            src={getFullLogoUrl(company.logoUrl)}
                            alt={company.brandName}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-gray-400 font-semibold tracking-wide">
                            {company.brandName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 내용 */}
                    <div className="px-4 pb-4 flex flex-col gap-1">
                      <p className="font-semibold -mb-1 text-[18px] text-[#3A404A] tracking-[-0.27px]">
                        {company.brandName}
                      </p>

                      <p className="text-[14px] text-[#6C727E] line-clamp-2 tracking-[-0.21px]">
                        {company.shortDescription || '설명이 없습니다.'}
                      </p>

                      {/* 업종 칩 */}
                      {company.industryName && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span
                            className={`px-2 py-1 rounded-full text-[12px]
                              ${
                                active
                                  ? 'bg-[#BBE2FF] text-[#008FFF]'
                                  : 'bg-[#EBEEF3] text-[#6C727E]'
                              }`}
                          >
                            {company.industryName}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= 하단 고정 ================= */}
        <div className="flex-shrink-0 pt-4 pb-6 bg-white">
          <div className="flex justify-between">
            <button
              onClick={() => navigate('/studentsampling/step2')}
              className="h-14 w-[160px] border border-gray-300 rounded-xl
                text-[#949BA7] hover:bg-gray-50"
            >
              이전
            </button>

            <button
              disabled={formData.selectedCompanyIds.length === 0}
              onClick={() => navigate('/studentsampling/step4')}
              className={`h-14 w-[200px] rounded-xl font-bold
                ${
                  formData.selectedCompanyIds.length === 0
                    ? 'bg-gray-300 text-white cursor-not-allowed'
                    : 'bg-[#007AFF] text-white hover:bg-[#0062CC]'
                }`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
