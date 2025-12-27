import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';

export default function OrderComplete() {
  const navigate = useNavigate();

  return (
    <StudentLayout>
      <div className="max-w-[90%] mx-auto flex flex-col bg-white" style={{ height: '920px' }}>
        {/* 제목 영역 */}
        <div className="flex-shrink-0 mb-8">
          <h1 className="text-[24px] font-semibold tracking-[-0.36px] mb-1 mt-2">
            주문 완료
          </h1>
          <p className="text-[16px] text-gray-400 tracking-[-0.24px]">
            다양한 제휴 기업의 상품을 만나보세요.
          </p>
        </div>

        {/* 중앙 컨텐츠 */}
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

          {/* 완료 메시지 */}
          <h2 className="text-[28px] font-semibold text-[#007AFF] mb-4">
            주문이 완료되었어요!
          </h2>

          <p className="text-[16px] text-gray-500 text-center mb-2">
            배송 후 주문 전달까지
          </p>
          <p className="text-[16px] text-gray-500 text-center mb-8">
            영업일 기준 1-2일이 소요됩니다.
          </p>

          {/* 버튼 */}
          <button
            onClick={() => navigate('/studentshopping')}
            className="px-8 py-3.5 bg-[#007AFF] text-white rounded-xl text-[16px] font-medium hover:bg-[#0066CC] transition"
          >
            주문 내역으로 이동
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}