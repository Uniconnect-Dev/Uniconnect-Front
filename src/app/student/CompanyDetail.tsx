import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';

export default function CompanyDetail() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const companyData = {
    name: '크라이치즈버거',
    category: 'F&B',
    logo: '/company-logo.png',
    description: '다양한 제휴 기업의 상품을 만나보세요.',
    products: Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      name: '제품명은 최대 180px',
      price: '4,500원',
      image: '/product-image.png'
    }))
  };

  // ✅ 제품 클릭 핸들러
  const handleCompanyClick = (productId: number) => {
    navigate(`/studentshopping/${companyId}/products/${productId}`);
  };

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
                {companyData.name}
                <img src="/arrow.png" alt="arrow" className="h-4" />
              </h2>
              <span className="inline-block mt-2 font-regular px-3 py-1 bg-[#E3F4FF] text-[#007AFF] text-[14px] rounded-[16px]">
                {companyData.category}
              </span>
            </div>
          </div>
        </div>

        <p className="text-[18px] font-medium text-gray-400 mb-3 tracking-[-0.27px]">
            제품 10
          </p>

        {/* 제품 목록 */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          

          <div className="grid grid-cols-5 gap-x-4 gap-y-6 mb-8">
            {companyData.products.map((product) => (
              <div key={product.id} className="flex flex-col">
                <div className="aspect-square w-[180px] h-[180px] bg-gray-200 rounded-lg mb-3" />

                {/* 🔽 클릭 가능 영역 */}
                <button
                  onClick={() => handleCompanyClick(product.id)}
                  className="text-left"
                >
                  <p className="text-[16px] font-medium text-gray-700 tracking-[-0.24px] flex items-center gap-1 hover:text-gray-900 transition-colors">
                    회사명
                    <img src="/arrow.png" alt="arrow" className="h-2.5 ml-1" />
                  </p>
                </button>

                <p className="text-[18px] font-medium text-gray-900 tracking-[-0.27px]">
                  {product.name}
                </p>
                <p className="text-[16px] font-medium text-gray-700 tracking-[-0.24px]">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
