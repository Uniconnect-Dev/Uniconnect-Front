import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selected: boolean;
}

export default function Cart() {
  const navigate = useNavigate();

  const [items, setItems] = useState<CartItem[]>(
    Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      name: '더블 치즈버거 세트',
      price: 4500,
      quantity: i % 3 === 0 ? 1 : 3,
      selected: i < 6,
    }))
  );

  /* ===============================
     선택
  =============================== */
  const allSelected = items.length > 0 && items.every((i) => i.selected);
  const selectedCount = items.filter((i) => i.selected).length;

  const toggleAll = () => {
    setItems((prev) =>
      prev.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  /* ===============================
     삭제
  =============================== */
  const deleteSelected = () => {
    if (!selectedCount) return;
    if (!window.confirm('선택한 상품을 삭제하시겠습니까?')) return;
    setItems((prev) => prev.filter((item) => !item.selected));
  };

  const deleteAll = () => {
    if (!items.length) return;
    if (!window.confirm('모두 삭제하시겠습니까?')) return;
    setItems([]);
  };

  const deleteOne = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  /* ===============================
     수량
  =============================== */
  const changeQuantity = (id: number, diff: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + diff) }
          : item
      )
    );
  };

  /* ===============================
     총합
  =============================== */
  const totalPrice = items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalCount = items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StudentLayout>
      <div className="max-w-[90%] mx-auto flex flex-col bg-white" style={{ height: '920px' }}>
        {/* 이전 버튼 - 고정 (약 44px) */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2.5 w-[74px] px-3.5 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 mb-4 mt-2 flex-shrink-0"
        >
          <img
            src="/public/arrow.png"
            alt="뒤로가기"
            className="w-2 scale-x-[-1]"
          />
          <span className="text-[16px] tracking-[-0.24px]">이전</span>
        </button>

        {/* 제목 - 고정 (약 32px) */}
        <h1 className="text-[24px] font-semibold tracking-[-0.36px] mb-2 flex-shrink-0">
          장바구니
        </h1>
        {/* 부제 - 고정 (약 40px) */}
        <p className="text-[16px] text-gray-400 tracking-[-0.24px] mb-6 flex-shrink-0">
          다양한 제휴 기업의 상품을 만나보세요.
        </p>

        {/* 회색 구분선 - 고정 (약 25px) */}
        <div className="border-t border-gray-200 mb-6 flex-shrink-0" />

        {/* 상단 컨트롤 - 고정 (약 44px) */}
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <p className="text-[14px] text-gray-400">
            전체{' '}
            <span className="text-blue-500 font-medium">
              {selectedCount}
            </span>{' '}
            / {items.length}
          </p>

          <div className="flex items-center gap-4 text-[14px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="accent-blue-500"
              />
              전체 선택
            </label>

            <button
              onClick={deleteSelected}
              className="text-blue-500 font-medium"
            >
              선택삭제
            </button>
            <button
              onClick={deleteAll}
              className="text-gray-400"
            >
              전체삭제
            </button>
          </div>
        </div>

        {/* 상품 리스트 - 여기만 스크롤!!! (나머지 공간 차지: 약 585px) */}
        <div className="overflow-y-auto flex-shrink-0" style={{ height: '585px' }}>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex items-center gap-4"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0
                    ${
                      item.selected
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-300'
                    }`}
                >
                  {item.selected && '✓'}
                </button>

                <div className="w-[96px] h-[96px] bg-gray-200 rounded-lg flex-shrink-0" />

                <div className="flex-1">
                  <p className="text-[16px] font-medium">{item.name}</p>
                  <p className="text-[18px] font-semibold mt-1">
                    {(item.price * item.quantity).toLocaleString()}원
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      className="w-8 h-8 border rounded"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => changeQuantity(item.id, 1)}
                      className="w-8 h-8 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => deleteOne(item.id)}
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 총액 - 고정 (약 150px) */}
        <div className="bg-white pt-6 pb-4 border-t flex justify-end items-center gap-6 flex-shrink-0 mt-6">
          <div className="text-right">
            <p className="text-[14px] text-gray-400 mb-1">총 상품 금액</p>
            <p className="text-[24px] font-semibold">
              {totalPrice.toLocaleString()}원
            </p>
          </div>

          <button className="h-[48px] px-8 bg-blue-500 text-white rounded-lg text-[16px] font-medium">
            총 {totalCount}개 구매하기
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}