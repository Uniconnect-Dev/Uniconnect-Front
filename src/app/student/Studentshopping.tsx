import React from 'react';
import StudentLayout from '../../components/layout/StudentLayout';

export default function ShoppingMall() {
  return (
    <StudentLayout>
      {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
      <div>
        <h1 className="text-2xl font-bold mb-2">쇼핑몰</h1>
        <p className="text-sm text-gray-500 mb-6">
          다양한 제품 기업의 샘플을 만나보세요.
        </p>

        {/* 필터 버튼들 */}
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-[#008FFF]">
            F&B
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-[#008FFF]">
            뷰티
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-[#008FFF]">
            교육
          </button>
          {/* 더 많은 필터... */}
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-5 gap-4">
          {/* 상품 카드들 */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
              <p className="text-sm font-medium mb-1">회사명 &gt;</p>
              <p className="text-sm mb-1">제품명은 최대 180px</p>
              <p className="text-sm font-semibold">4,500원</p>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
