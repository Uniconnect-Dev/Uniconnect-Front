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
    }, 10000);

    return () => clearTimeout(timer);
  }, [showToast]);

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
            <div className="w-[222px] h-[222px] bg-gray-200 rounded-lg" />
            <div>
              <h1 className="text-[24px] font-medium tracking-[-0.36px] mb-1">
                {productName}
              </h1>
              <p className="text-[22px] font-medium text-gray-400 tracking-[-0.33px]">
                {price.toLocaleString()}원
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
                {(price * count).toLocaleString()}원
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
          <div className="w-[960px] h-[500px] bg-gray-100 rounded-lg" />
        </div>

        {/* ================= 기업 정보 ================= */}
        <div className="mt-12 mb-2">
          <h2 className="text-[18px] font-regular mb-3 text-gray-500 tracking-[-0.27px]">기업</h2>
          <div className="border border-gray-300 rounded-lg p-4 flex items-center gap-4 mb-1.5">
            <div className="w-[80px] h-[80px] bg-gray-200 rounded-lg" />
            <div>
              <h2 className="text-[20px] font-semibold text-gray-900 tracking-[-0.3px] flex items-center gap-2">
                크라이치즈버거
                <img src="/arrow.png" alt="arrow" className="h-4" />
              </h2>
              <span className="inline-block mt-2 font-regular px-3 py-1 bg-[#E3F4FF] text-[#007AFF] text-[14px] rounded-[16px]">
                F&B
              </span>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
