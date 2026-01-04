import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../../components/layout/StudentLayout';
import RequestStatus from '@/components/common/RequestStatus';

interface Company {
  id: number;
  name: string;
  description: string;
  tags: string[];
}

const MOCK_COMPANIES: Company[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: '아로마티카',
  description:
    '건강하고 지속 가능한 비건·클린 뷰티를 지향하는 천연 화장품 브랜드',
  tags: ['클라우드', 'SaaS', '비건'],
}));

export default function Step3ChooseCorporate() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const MAX_SELECT = 5;

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((v) => v !== id);
      if (prev.length >= MAX_SELECT) return prev;
      return [...prev, id];
    });
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
                {selectedIds.length}
              </span>
              <span className="text-[#949BA7]">
                {' '} / {MAX_SELECT}개 선택
              </span>
            </p>
          </div>
        </div>

        {/* ================= 카드 스크롤 영역 ================= */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-4 gap-3 pb-8">
            {MOCK_COMPANIES.map((company) => {
              const active = selectedIds.includes(company.id);

              return (
                <button
                  key={company.id}
                  onClick={() => toggleSelect(company.id)}
                  className={`flex flex-col rounded-2xl border text-left transition-all
                    ${
                      active
                        ? 'border-[#008FFF] bg-[#E3F4FF]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className="p-4">
                    <div className="h-[120px] rounded-xl bg-[#163C35] flex items-center justify-center">
                      <span className="text-white font-semibold tracking-wide">
                        AROMATICA
                      </span>
                    </div>
                  </div>

                  {/* 내용 */}
                  <div className="px-4 pb-4 flex flex-col gap-1">
                    <p className="font-semibold -mb-1 text-[18px] text-[#3A404A] tracking-[-0.27px]">
                      {company.name}
                    </p>

                    <p className="text-[14px] text-[#6C727E] line-clamp-2 tracking-[-0.21px]">
                      {company.description}
                    </p>

                    {/* ✅ 칩 영역 */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {company.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded-full text-[12px]
                            ${
                              active
                                ? 'bg-[#BBE2FF] text-[#008FFF]'
                                : 'bg-[#EBEEF3] text-[#6C727E]'
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
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
              disabled={selectedIds.length === 0}
              onClick={() => navigate('/studentsampling/step4')}
              className={`h-14 w-[200px] rounded-xl font-bold
                ${
                  selectedIds.length === 0
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