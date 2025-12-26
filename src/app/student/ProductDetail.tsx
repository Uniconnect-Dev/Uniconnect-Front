import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [count, setCount] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const price = 4500;
  const productName = '더블 치즈버거 세트';

  /* ===============================
     장바구니 저장 로직
  =============================== */
  const addToCart = () => {
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
        name: productName,
        price,
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
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <StudentLayout>
      {/* 🔵 상단 토스트 */}
      {showToast && (
        <div className="fixed top-[88px] left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-full bg-blue-500 px-6 py-3 text-white shadow-lg">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-500 text-sm font-bold">
              ✓
            </div>
            <span className="text-[14px] font-medium tracking-[-0.21px]">
              장바구니에 물품이 담겼어요!
            </span>
            <button
              onClick={() => navigate('/studentshopping/cart')}
              className="ml-2 text-[14px] font-semibold underline underline-offset-2"
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
          className="flex items-center gap-2 mb-6 mt-2 text-gray-600"
        >
          <img
            src="/public/arrow.png"
            alt="뒤로가기"
            className="w-2 scale-x-[-1]"
          />
          <span className="text-[16px] tracking-[-0.24px]">제품 상세</span>
        </button>

        {/* 상단 영역 */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex gap-6">
            <div className="w-[240px] h-[240px] bg-gray-200 rounded-lg" />
            <div>
              <h1 className="text-[24px] font-semibold tracking-[-0.36px]">
                {productName}
              </h1>
              <p className="text-[18px] font-medium text-gray-500 mt-2">
                {price.toLocaleString()}원
              </p>
            </div>
          </div>

          {/* 수량 + 금액 */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-4">
              <button
                onClick={() => setCount(Math.max(1, count - 1))}
                className="w-8 h-8 border rounded"
              >
                -
              </button>
              <span className="w-6 text-center">{count}</span>
              <button
                onClick={() => setCount(count + 1)}
                className="w-8 h-8 border rounded"
              >
                +
              </button>
            </div>

            <p className="text-[14px] text-gray-400 mb-1">총 상품 금액</p>
            <p className="text-[24px] font-semibold">
              {(price * count).toLocaleString()}원
            </p>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-4">
          <button
            onClick={addToCart}
            className="w-[160px] h-[48px] border border-blue-400 text-blue-500 rounded-lg"
          >
            담기
          </button>
          <button className="w-[160px] h-[48px] bg-blue-500 text-white rounded-lg">
            주문하기
          </button>
        </div>

        {/* 제품 정보 */}
        <div className="mt-12">
          <h2 className="text-[18px] font-medium mb-4">제품 정보</h2>
          <div className="h-[400px] bg-gray-100 rounded-lg" />
        </div>

        {/* 기업 정보 */}
        <div className="mt-12">
          <h2 className="text-[18px] font-medium mb-4">기업</h2>
          <div className="border rounded-lg p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded" />
            <div>
              <p className="text-[16px] font-medium">크라이치즈버거</p>
              <span className="inline-block mt-1 px-2 py-1 text-[14px] bg-blue-50 text-blue-500 rounded-full">
                F&B
              </span>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
