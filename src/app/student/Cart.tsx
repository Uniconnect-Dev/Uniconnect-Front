import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';
import { getStudentOrgId } from '@/lib/auth/token';
import {
  getCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
} from '@/services/cart.service';
import type { CartItemWithSelection } from '@/services/cart.types';

export default function Cart() {
  const navigate = useNavigate();
  const studentOrgId = getStudentOrgId();

  const [items, setItems] = useState<CartItemWithSelection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 장바구니 조회
  useEffect(() => {
    const fetchCart = async () => {
      if (!studentOrgId) return;
      setIsLoading(true);
      try {
        const response = await getCart(studentOrgId);
        setItems(response.items.map(item => ({ ...item, selected: true })));
      } catch (error) {
        console.error('장바구니 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [studentOrgId]);

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

  const toggleItem = (cartItemId: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  /* ===============================
     삭제
  =============================== */
  const deleteSelected = async () => {
    if (!selectedCount || !studentOrgId) return;
    if (!window.confirm('선택한 상품을 삭제하시겠습니까?')) return;

    const selectedItems = items.filter((item) => item.selected);

    try {
      // 선택된 아이템들을 순차적으로 삭제
      for (const item of selectedItems) {
        await removeCartItem(studentOrgId, item.cartItemId);
      }
      // 로컬 상태 업데이트
      setItems((prev) => prev.filter((item) => !item.selected));
    } catch (error) {
      console.error('장바구니 삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const deleteAll = async () => {
    if (!items.length || !studentOrgId) return;
    if (!window.confirm('모두 삭제하시겠습니까?')) return;

    try {
      await clearCart(studentOrgId);
      setItems([]);
    } catch (error) {
      console.error('장바구니 전체 삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const deleteOne = async (cartItemId: number) => {
    if (!studentOrgId) return;

    try {
      await removeCartItem(studentOrgId, cartItemId);
      setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    } catch (error) {
      console.error('장바구니 삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /* ===============================
     수량
  =============================== */
  const changeQuantity = async (cartItemId: number, diff: number) => {
    if (!studentOrgId) return;

    const item = items.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + diff);
    if (newQuantity === item.quantity) return;

    // 낙관적 업데이트
    setItems((prev) =>
      prev.map((i) =>
        i.cartItemId === cartItemId
          ? { ...i, quantity: newQuantity, subtotal: i.unitPrice * newQuantity }
          : i
      )
    );

    try {
      await updateCartItemQuantity(studentOrgId, cartItemId, { quantity: newQuantity });
    } catch (error) {
      console.error('수량 변경 실패:', error);
      // 실패 시 롤백
      setItems((prev) =>
        prev.map((i) =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: item.quantity, subtotal: item.subtotal }
            : i
        )
      );
      alert('수량 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /* ===============================
     총합
  =============================== */
  const totalPrice = items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.subtotal, 0);

  const totalCount = items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.quantity, 0);

  /* ===============================
     구매하기
  =============================== */
  const handlePurchase = () => {
    if (selectedCount === 0) {
      alert('구매할 상품을 선택해주세요.');
      return;
    }

    const selectedItems = items.filter((item) => item.selected);

    navigate('/studentshopping/order', {
      state: {
        items: selectedItems,
        totalPrice,
        totalCount,
      },
    });
  };

  return (
    <StudentLayout>
      <div
        className="max-w-[90%] mx-auto flex flex-col bg-white"
        style={{ height: '920px' }}
      >
        {/* 이전 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2.5 w-[74px] px-3.5 py-1.5 bg-[#F3F5F9] text-[#585F69] rounded-md hover:bg-gray-200 mb-4 mt-2 flex-shrink-0"
        >
          <img
            src="/public/arrow.png"
            alt="뒤로가기"
            className="w-2 scale-x-[-1]"
          />
          <span className="text-[16px] tracking-[-0.16px]">이전</span>
        </button>

        {/* 제목 */}
        <h1 className="text-[24px] font-semibold tracking-[-0.36px] mb-1 flex-shrink-0">
          장바구니
        </h1>

        {/* 부제 */}
        <p className="text-[16px] text-gray-400 tracking-[-0.24px] mb-4 flex-shrink-0">
          다양한 제휴 기업의 상품을 만나보세요.
        </p>

        <div className="border-t border-gray-200 mb-4 flex-shrink-0" />

        {/* 상단 컨트롤 */}
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <p className="text-[14px] text-gray-400">
            전체{' '}
            <span className="text-blue-500 font-medium">
              {selectedCount}
            </span>{' '}
            / {items.length}
          </p>

          <div className="flex items-center gap-2 text-[16px] tracking-[-0.24px]">
            <label className="flex items-center gap-2 mr-8 text-gray-400 cursor-pointer">
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

            {/* 회색 구분선 */}
            <span className="w-px h-4 bg-gray-300" />

            <button
              onClick={deleteAll}
              className="text-gray-600"
            >
              전체삭제
            </button>
          </div>
        </div>

        {/* ================= 상품 리스트 ================= */}
        <div
          className="overflow-y-auto flex-shrink-0"
          style={{ height: '585px' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">장바구니를 불러오는 중...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">장바구니가 비어있습니다.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="border rounded-xl p-3.5 flex gap-4"
                >
                  {/* 선택 (상단 정렬) */}
                  <button
                    onClick={() => toggleItem(item.cartItemId)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 self-start
                      ${
                        item.selected
                          ? 'bg-[#007AFF] border-[#007AFF] text-white'
                          : 'border-gray-300'
                      }`}
                  >
                    {item.selected && '✓'}
                  </button>

                  {/* 이미지 */}
                  <div className="w-[134px] h-[134px] bg-gray-200 rounded-lg flex-shrink-0" />

                  {/* 정보 */}
                  <div className="flex-1">
                    <p className="text-[16px] text-gray-500 font-medium pt-2.5">{item.productName}</p>
                    <p className="text-[20px] font-medium">
                      {item.subtotal.toLocaleString()} 원
                    </p>

                    {/* 수량 */}
                    <div className="mt-5">
                      <div className="inline-flex h-[40px] overflow-hidden rounded-lg border border-gray-300">
                        <button
                          onClick={() => changeQuantity(item.cartItemId, -1)}
                          disabled={item.quantity === 1}
                          className={`w-[40px] flex items-center justify-center transition
                            ${
                              item.quantity === 1
                                ? 'text-gray-200 cursor-not-allowed'
                                : 'text-gray-400 hover:bg-gray-100'
                            }`}
                        >
                          −
                        </button>

                        <div className="w-px bg-gray-300" />

                        <div className="w-[40px] flex items-center justify-center text-[18px] font-medium text-gray-800">
                          {item.quantity}
                        </div>

                        <div className="w-px bg-gray-300" />

                        <button
                          onClick={() => changeQuantity(item.cartItemId, 1)}
                          className="w-[40px] flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 삭제 */}
                  <button
                    onClick={() => deleteOne(item.cartItemId)}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0 self-start mt-1.5 mr-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= 하단 총액 ================= */}
        <div className="bg-white pt-6 pb-4 flex flex-col items-end gap-4 flex-shrink-0 mt-6">
          {/* 총 상품 금액 */}
          <div className="flex items-center justify-end gap-3">
            <p className="text-[16px] text-gray-500 pt-1">
              총 상품 금액
            </p>
            <p className="text-[28px] font-medium">
              {totalPrice.toLocaleString()} 원
            </p>
          </div>

          {/* 구매 버튼 */}
          <button
            onClick={handlePurchase}
            className="h-[56px] px-12 bg-[#007AFF] text-white rounded-xl text-[18px] font-medium hover:bg-[#0066CC] transition"
          >
            총 {totalCount}개 구매하기
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
