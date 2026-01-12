import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';
import { getCompanyProducts } from '@/services/product.service';
import { CATEGORY_DISPLAY_MAP, type CompanyProductListItem, type ProductCategory } from '@/services/product.types';

export default function CompanyDetail() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<CompanyProductListItem[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [industryName, setIndustryName] = useState('');
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 기업별 제품 목록 조회
  useEffect(() => {
    const fetchCompanyProducts = async () => {
      if (!companyId) return;

      setIsLoading(true);
      try {
        const response = await getCompanyProducts(Number(companyId), currentPage);
        setProducts(response.content);
        setTotalElements(response.totalElements);
        setTotalPages(response.totalPages);

        // 첫 번째 제품에서 기업 정보 추출
        if (response.content.length > 0) {
          setCompanyName(response.content[0].companyName);
          setIndustryName(response.content[0].industryName);
        }
      } catch (error) {
        console.error('기업 제품 목록 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyProducts();
  }, [companyId, currentPage]);

  // 제품 클릭 핸들러
  const handleProductClick = (productId: number) => {
    navigate(`/studentshopping/${companyId}/products/${productId}`);
  };

  // 카테고리 표시 변환
  const categoryDisplay = industryName
    ? CATEGORY_DISPLAY_MAP[industryName as ProductCategory] || industryName
    : '';

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (isLoading && products.length === 0) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">로딩 중...</p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="flex flex-col h-full max-w-[90%] mx-auto">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2.5
            w-[74px]
            px-3.5 py-1.5
            bg-gray-100
            text-gray-700
            rounded-md
            hover:bg-gray-200
            mb-4 mt-2
          "
        >
          <img
            src="/public/arrow.png"
            alt="뒤로가기"
            className="w-2 scale-x-[-1]"
          />
          <span className="text-[16px] tracking-[-0.24px]">이전</span>
        </button>

        {/* 회사 정보 */}
        <div className="mb-4">
          <h1 className="text-[24px] font-semibold mb-1 tracking-[-0.36px]">
            기업 상세
          </h1>
          <p className="text-[16px] text-gray-400 mb-3.5 tracking-[-0.24px]">
            다양한 제휴 기업의 상품을 만나보세요.
          </p>

          <div className="w-full h-[1px] bg-gray-200 mb-3.5" />

          <div className="border border-gray-300 rounded-lg p-4 flex items-center gap-4 mb-1.5">
            <div className="w-[80px] h-[80px] bg-gray-200 rounded-lg" />
            <div>
              <h2 className="text-[20px] font-semibold text-gray-900 tracking-[-0.3px] flex items-center gap-2">
                {companyName || '기업명'}
                <img src="/arrow.png" alt="arrow" className="h-4" />
              </h2>
              {categoryDisplay && (
                <span className="inline-block mt-2 font-regular px-3 py-1 bg-[#E3F4FF] text-[#007AFF] text-[14px] rounded-[16px]">
                  {categoryDisplay}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-[18px] font-medium text-gray-400 mb-3 tracking-[-0.27px]">
          제품 {totalElements}
        </p>

        {/* 제품 목록 */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {products.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">등록된 제품이 없습니다.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-5 gap-x-4 gap-y-6 mb-8">
                {products.map((product) => (
                  <div key={product.productId} className="flex flex-col">
                    <div
                      className="aspect-square w-[180px] h-[180px] bg-gray-200 rounded-lg mb-3 overflow-hidden cursor-pointer"
                      onClick={() => handleProductClick(product.productId)}
                    >
                      {product.thumbnailUrl && (
                        <img
                          src={product.thumbnailUrl}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* 클릭 가능 영역 */}
                    <button
                      onClick={() => handleProductClick(product.productId)}
                      className="text-left"
                    >
                      <p className="text-[16px] font-medium text-gray-700 tracking-[-0.24px] flex items-center gap-1 hover:text-gray-900 transition-colors">
                        {product.companyName}
                        <img src="/arrow.png" alt="arrow" className="h-2.5 ml-1" />
                      </p>
                    </button>

                    <p
                      className="text-[18px] font-medium text-gray-900 tracking-[-0.27px] cursor-pointer hover:text-gray-700"
                      onClick={() => handleProductClick(product.productId)}
                    >
                      {product.productName}
                    </p>
                    <p className="text-[16px] font-medium text-gray-700 tracking-[-0.24px]">
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                ))}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pb-6">
                  {/* 이전 버튼 */}
                  <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
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
                      {page + 1}
                    </button>
                  ))}

                  {/* 다음 버튼 */}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
