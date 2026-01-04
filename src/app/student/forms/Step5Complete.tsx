import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../../components/layout/StudentLayout';

export default function Step5Complete() {
  const navigate = useNavigate();

  return (
    <StudentLayout>
      <div
        className="max-w-[960px] mx-auto flex flex-col px-6"
        style={{ height: '800px' }}
      >
        {/* ================= 상단 제목 ================= */}
        <div className="flex-shrink-0 mt-4 mb-6">
          <h1 className="text-[24px] font-semibold tracking-[-0.36px] mb-1">
            접수 완료
          </h1>
          <p className="text-[16px] text-[#949BA7] tracking-[-0.24px]">
          다양한 기업에게 제품과 서비스를 제공 받으세요.
          </p>
        </div>

        <div className="border-t border-gray-200 mb-6 flex-shrink-0" />

        {/* ================= 중앙 컨텐츠 ================= */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* 체크 아이콘 */}
          <div className="w-16 h-16 bg-[#007AFF] rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-9 h-9 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* 메시지 */}
          <h2 className="text-[28px] font-semibold text-[#007AFF] mb-3 tracking-[-0.42px]">
            성공적으로 접수되었습니다.
          </h2>

          <p className="text-[16px] text-[#6C727E] text-center tracking-[-0.24px]">
            영업일 기준 1일 이내로 ‘매칭 확인’ 페이지에서
          </p>
          <p className="text-[16px] text-[#6C727E] text-center mb-10 tracking-[-0.24px]">
            성사 여부를 전달해 드리겠습니다.
          </p>

          {/* 버튼 영역 */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/studentsampling')}
              className="h-14 px-10 rounded-xl border border-[#007AFF]
                text-[#007AFF] font-medium text-[16px]
                hover:bg-[#F4FAFF] transition"
            >
              기업 둘러보기
            </button>

            <button
              onClick={() => navigate('/student/matching')}
              className="h-14 px-10 rounded-xl bg-[#007AFF]
                text-white font-medium text-[16px]
                hover:bg-[#0062CC] transition"
            >
              매칭 확인하기
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}