import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';

export default function ShoppingMall() {
  const navigate = useNavigate();
  const FILTERS = ['전체', 'F&B', '뷰티', '교육', '여행', '온라인 서비스', '문구/사무용품', 'IT/통신사', '기타'];
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [currentPage, setCurrentPage] = useState(2);
  
  // 임시 데이터 (실제로는 API에서 가져올 데이터)
  const totalPages = 10;
  const itemsPerPage = 15;
  
  // 회사 상세 페이지로 이동
  const handlecompanyClick = (companyId: number) => {
    navigate(`/studentshopping/${companyId}`);
  };
  
  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <StudentLayout>
      <div className="flex flex-col h-full max-w-[90%] mx-auto">
        <div className="flex-shrink-0">
          <h1 className="text-[24px] font-semibold mb-1 mt-2 tracking-[-0.36px]">
            쇼핑몰
          </h1>
          <p className="text-[16px] font-regular text-gray-400 mb-3 tracking-[-0.24px]">
            다양한 제휴 기업의 상품을 만나보세요.
          </p>

          {/* 필터 버튼들 */}
          <div className="text-[14px] flex gap-2 mb-3.5">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`flex font-light items-center justify-center gap-[10px] px-3 py-0.5 rounded-[16px] border-[1.5px]
                  ${
                    selectedFilter === filter
                      ? 'border-[#008FFF] bg-[#E3F4FF] text-[#007AFF]'
                      : 'border-[#DADFE7] text-gray-600'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="w-full h-[1px] bg-gray-200 mb-3.5" />
        </div>

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* 상품 그리드 - 5열 3행 */}
          <div className="grid grid-cols-5 gap-x-4 gap-y-6 mb-8">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <div key={i} className="flex flex-col">
                {/* 이미지 영역 */}
                <div className="aspect-square w-[180px] h-[180px] bg-gray-200 rounded-lg mb-3 overflow-hidden">
                  {/* 실제 이미지가 들어갈 자리 */}
                </div>
                
                {/* 텍스트 정보 */}
                <button
                  onClick={() => handlecompanyClick(i)}
                  className="text-left"
                >
                  <p className="text-[16px] font-medium text-gray-700 tracking-[-0.24px] flex items-center gap-1 hover:text-gray-900 transition-colors">
                    회사명
                    <img src="/arrow.png" alt="arrow" className="h-3.3 ml-1 pb-0.5" />
                  </p>
                </button>
                <p className="text-[18px] font-medium text-gray-900 tracking-[-0.27px]">
                  제품명은 최대 180px
                </p>
                <p className="text-[16px] font-medium text-gray-700 tracking-[-0.24px]">
                  4,500원
                </p>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex items-center justify-center gap-2 pb-6">
            {/* 이전 버튼 */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              &lt;
            </button>

            {/* 페이지 번호들 */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center font-semibold justify-center rounded-full text-[14px] tracking-[-0.21px]
                  ${
                    currentPage === page
                      ? 'bg-gray-700 text-white font-semibold'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
              >
                {page}
              </button>
            ))}

            {/* 다음 버튼 */}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}