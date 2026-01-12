import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';
import { getProductDetail } from '@/services/product.service';
import { CATEGORY_DISPLAY_MAP, type ProductDetail as ProductDetailType, type ProductCategory } from '@/services/product.types';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export default function ProductDetail() {
  const navigate = useNavigate();
  const { companyId, productId } = useParams();
  const [count, setCount] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 제품 상세 정보 조회
  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!productId) return;

      setIsLoading(true);
      try {
        const response = await getProductDetail(Number(productId));
        setProduct(response);
      } catch (error) {
        console.error('제품 상세 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  /* ===============================
     장바구니 저장 로직
  =============================== */
  const addToCart = () => {
    if (!product) return;

    const raw = localStorage.getItem('cart');
    const cart: CartItem[] = raw ? JSON.parse(raw) : [];

    const existing = cart.find(
      (item) => item.productId === productId
    );

    if (existing) {
      existing.quantity += count;
    } else {
      cart.push({
        productId: productId!,
        name: product.productName,
        price: product.price,
        quantity: count,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setShowToast(true);
  };

  /* ===============================
     토스트 자동 닫힘
  =============================== */
  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [showToast]);

  // 기업 상세 페이지로 이동
  const handleCompanyClick = () => {
    if (product) {
      navigate(`/studentshopping/${product.companyId}`);
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">로딩 중...</p>
        </div>
      </StudentLayout>
    );
  }

  if (!product) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">제품을 찾을 수 없습니다.</p>
        </div>
      </StudentLayout>
    );
  }

  const categoryDisplay = product.industryName
    ? CATEGORY_DISPLAY_MAP[product.industryName as ProductCategory] || product.industryName
    : '';

  return (
    <StudentLayout>
      {/* 🔵 상단 토스트 */}
      {showToast && (
        <div className="fixed top-[88px] left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-3xl bg-[#007AFF] px-6 py-3 text-white shadow-lg">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-500 text-sm font-bold">
              ✓
            </div>
            <span className="text-[18px] font-medium tracking-[-0.21px]">
              장바구니에 물품이 담겼어요!
            </span>
            <button
              onClick={() => navigate('/studentshopping/cart')}
              className="ml-2 text-[16px] font-semibold underline underline-offset-2"
            >
              장바구니로 이동
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[90%] mx-auto">
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mb-6 mt-2 text-gray-600"
        >
          <img
            src="/public/arrow.png"
            alt="뒤로가기"
            className="h-3 scale-x-[-1]"
          />
          <span className="text-[18px] tracking-[-0.27px]">제품 상세</span>
        </button>

        {/* ================= 상단 영역 ================= */}
        <div className="grid grid-cols-[auto,1fr] gap-12 items-start mb-10">
          {/* 이미지 | 상품 정보 */}
          <div className="grid grid-cols-[222px,1fr] gap-6">
            <div className="w-[222px] h-[222px] bg-gray-200 rounded-lg overflow-hidden">
              {product.thumbnailUrl && (
                <img
                  src={product.thumbnailUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <h1 className="text-[24px] font-medium tracking-[-0.36px] mb-1">
                {product.productName}
              </h1>
              <p className="text-[22px] font-medium text-gray-400 tracking-[-0.33px]">
                {product.price.toLocaleString()}원
              </p>
            </div>
          </div>

          {/* 🔹 오른쪽: 수량 + 금액 + 버튼 */}
          <div className="flex flex-col items-end mt-[50px]">
            {/* 수량 선택 (캡슐형 UI) */}
            <div className="mb-4">
              <div className="flex h-[40px] overflow-hidden rounded-xl border border-gray-200">
                {/* - 버튼 */}
                <button
                  onClick={() => setCount(Math.max(1, count - 1))}
                  disabled={count === 1}
                  className={`w-[40px] flex items-center justify-center transition
                    ${
                      count === 1
                        ? 'text-gray-200 cursor-not-allowed'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                >
                  −
                </button>

                {/* 구분선 */}
                <div className="w-px bg-gray-300" />

                {/* 수량 */}
                <div className="w-[40px] flex items-center justify-center text-[18px] font-medium text-gray-800">
                  {count}
                </div>

                {/* 구분선 */}
                <div className="w-px bg-gray-300" />

                {/* + 버튼 */}
                <button
                  onClick={() => setCount(count + 1)}
                  className="w-[40px] flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* 금액 */}
            <div className="flex items-center gap-3 mb-5">
              <p className="text-[16px] font-medium text-gray-400">
                총 상품 금액
              </p>
              <p className="text-[28px] font-medium tracking-[-0.24px]">
                {(product.price * count).toLocaleString()}원
              </p>
            </div>


            {/* 버튼 */}
            <div className="flex gap-4">
              <button
                onClick={addToCart}
                className="w-[200px] h-[56px] font-medium border border-blue-400 text-[#008FFF] rounded-xl"
              >
                담기
              </button>
              <button className="w-[200px] h-[56px] bg-[#007AFF] text-white rounded-xl">
                주문하기
              </button>
            </div>
          </div>
        </div>

        {/* ================= 제품 정보 ================= */}
        <div className="mt-8">
          <h2 className="text-[18px] font-regular mb-3 text-gray-500 tracking-[-0.27px]">제품 정보</h2>
          <div className="w-[960px] min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            {product.detailImageUrl && (
              <img
                src={product.detailImageUrl}
                alt={`${product.productName} 상세 정보`}
                className="w-full h-auto"
              />
            )}
          </div>
        </div>

        {/* ================= 기업 정보 ================= */}
        <div className="mt-12 mb-2">
          <h2 className="text-[18px] font-regular mb-3 text-gray-500 tracking-[-0.27px]">기업</h2>
          <button
            onClick={handleCompanyClick}
            className="w-full border border-gray-300 rounded-lg p-4 flex items-center gap-4 mb-1.5 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="w-[80px] h-[80px] bg-gray-200 rounded-lg overflow-hidden">
              {product.thumbnailUrl && (
                <img
                  src={product.thumbnailUrl}
                  alt={product.companyName}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-[20px] font-semibold text-gray-900 tracking-[-0.3px] flex items-center gap-2">
                {product.companyName}
                <img src="/arrow.png" alt="arrow" className="h-4" />
              </h2>
              {categoryDisplay && (
                <span className="inline-block mt-2 font-regular px-3 py-1 bg-[#E3F4FF] text-[#007AFF] text-[14px] rounded-[16px]">
                  {categoryDisplay}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
