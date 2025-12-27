import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface LocationState {
  items: OrderItem[];
  totalPrice: number;
  totalCount: number;
}

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [paymentMethod, setPaymentMethod] = useState<string>('');

  // 주문자 정보
  const [orderer, setOrderer] = useState({
    name: '손하늘',
    phone: '010-1234-5678',
    email: 'uniconnectbiz@gmail.com',
  });

  // 배송 정보
  const [delivery, setDelivery] = useState({
    recipient: '손하늘',
    phone: '010-1234-5678',
    address: '서울시 서대문구 이화여대길 52',
  });

  // 모달 상태
  const [isOrdererModalOpen, setIsOrdererModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  // 임시 편집 데이터
  const [tempOrderer, setTempOrderer] = useState(orderer);
  const [tempDelivery, setTempDelivery] = useState(delivery);

  // 주문자 정보 수정 모달 열기
  const openOrdererModal = () => {
    setTempOrderer(orderer);
    setIsOrdererModalOpen(true);
  };

  // 배송 정보 수정 모달 열기
  const openDeliveryModal = () => {
    setTempDelivery(delivery);
    setIsDeliveryModalOpen(true);
  };

  // 주문자 정보 저장
  const saveOrderer = () => {
    if (!tempOrderer.name.trim()) {
      alert('주문자명을 입력해주세요.');
      return;
    }
    if (!tempOrderer.phone.trim()) {
      alert('연락처를 입력해주세요.');
      return;
    }
    if (!tempOrderer.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    setOrderer(tempOrderer);
    setIsOrdererModalOpen(false);
  };

  // 배송 정보 저장
  const saveDelivery = () => {
    if (!tempDelivery.recipient.trim()) {
      alert('수취인명을 입력해주세요.');
      return;
    }
    if (!tempDelivery.phone.trim()) {
      alert('연락처를 입력해주세요.');
      return;
    }
    if (!tempDelivery.address.trim()) {
      alert('배송지를 입력해주세요.');
      return;
    }
    setDelivery(tempDelivery);
    setIsDeliveryModalOpen(false);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('결제 수단을 선택해주세요.');
      return;
    }
    navigate('/studentshopping/order/complete');
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
          주문/결제
        </h1>

        {/* 부제 */}
        <p className="text-[16px] text-gray-400 tracking-[-0.24px] mb-4 flex-shrink-0">
          다양한 제휴 기업의 상품을 만나보세요.
        </p>

        <div className="border-t border-gray-200 mb-6 flex-shrink-0" />

        {/* 스크롤 영역 */}
        <div className="overflow-y-auto flex-1">
          <div className="flex gap-6">
            {/* 왼쪽 영역 */}
            <div className="flex-1 flex flex-col gap-6">
              {/* 주문자 정보 */}
              <div className="border rounded-xl p-5 w-[620px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[18px] font-medium">주문자 정보</h2>
                  <button
                    onClick={openOrdererModal}
                    className="text-[#007AFF] text-[16px] tracking-[-0.24px]"
                  >
                    수정하기
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-[#949BA7] w-16">주문자</span>
                    <span>{orderer.name}</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#949BA7] w-16">연락처</span>
                    <span>{orderer.phone}</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#949BA7] w-16">이메일</span>
                    <span>{orderer.email}</span>
                  </div>
                </div>
              </div>

              {/* 배송 정보 */}
              <div className="border rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[18px] font-medium">배송 정보</h2>
                  <button
                    onClick={openDeliveryModal}
                    className="text-[#007AFF] text-[16px] tracking-[-0.24px]"
                  >
                    수정하기
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-[#949BA7] w-16">수취인</span>
                    <span>{delivery.recipient}</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#949BA7] w-16">연락처</span>
                    <span>{delivery.phone}</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#949BA7] w-16">배송지</span>
                    <span>{delivery.address}</span>
                  </div>
                </div>
              </div>

              {/* 결제 수단 */}
              <div className="border rounded-xl p-5">
                <h2 className="text-[18px] font-medium mb-4">결제 수단</h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5"
                    />
                    <span className="text-[#585F69] text-[16px]">
                      신용/체크카드
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="naver"
                      checked={paymentMethod === 'naver'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5"
                    />
                    <span className="text-[#585F69] text-[16px]">
                      네이버페이
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="kakao"
                      checked={paymentMethod === 'kakao'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5"
                    />
                    <span className="text-[#585F69] text-[16px]">
                      카카오페이
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* 오른쪽 영역 - 결제 정보 */}
            <div className="w-[340px] flex-shrink-0">
              <div className="border rounded-xl p-9 sticky top-0">
                <h2 className="text-[18px] font-semibold mb-4">결제 정보</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[16px]">
                    <span className="text-[#000000] tracking-[-0.24px] pt-1">
                      총 결제 금액
                    </span>
                    <span className="flex items-end gap-1 text-[24px] font-semibold">
                      {state?.totalPrice?.toLocaleString() || '0'}
                      <span className="text-[18px] font-medium pb-1.5">원</span>
                    </span>
                  </div>

                  <div className="border-t pt-3 text-[14px] text-gray-500">
                    <div className="flex justify-between items-start">
                      <p>
                        풀필먼트서비스(유)의 개인정보
                        <br />
                        제3차 제공 동의
                      </p>
                      <button className="text-[#949BA7] flex-shrink-0 underline">
                        보기
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-3 text-[14px] text-[#585F69]">
                    <div className="flex justify-between items-start">
                      <p>개인정보 제3자 제공 동의</p>
                      <button className="text-[#949BA7] flex-shrink-0 underline">
                        보기
                      </button>
                    </div>
                  </div>

                  <p className="text-[14px] text-gray-400 pt-2 text-center">
                    위 주문 내용을 확인 하였으며, 회원 본인은
                    <br />
                    개인정보 이용 및 제공(해외직구의 경우 국외 <br />
                    제공) 및 결제에 동의합니다.
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full h-[56px] bg-[#007AFF] text-white rounded-xl text-[18px] font-medium hover:bg-[#0066CC] transition"
                >
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 주문자 정보 수정 모달 */}
      {isOrdererModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-12 w-[480px] h-[395.14px]">
            <h3 className="text-[20px] font-semibold mb-5">주문자 정보 수정</h3>

            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-6">
                <label className="text-[16px] text-gray-600 font-medium w-15 flex-shrink-0">
                  주문자
                </label>
                <input
                  type="text"
                  value={tempOrderer.name}
                  onChange={(e) =>
                    setTempOrderer({ ...tempOrderer, name: e.target.value })
                  }
                  placeholder="주문자명을 입력해주세요."
                  className="h-[51px] flex-1 border border-gray-300 rounded-xl px-4 py-4 text-[16px] text-gray-400 focus:outline-none focus:text-[#3A404A] focus:border-[#007AFF]"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="text-[16px] text-gray-600 font-medium w-15 flex-shrink-0">
                  연락처
                </label>
                <input
                  type="text"
                  value={tempOrderer.phone}
                  onChange={(e) =>
                    setTempOrderer({ ...tempOrderer, phone: e.target.value })
                  }
                  placeholder="전화번호를 입력해주세요."
                  className="h-[51px] flex-1 border border-gray-300 rounded-xl px-4 py-4 text-[16px] text-gray-400 focus:outline-none focus:text-[#3A404A] focus:border-[#007AFF]"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="text-[16px] text-gray-600 font-medium w-15 flex-shrink-0">
                  이메일
                </label>
                <input
                  type="email"
                  value={tempOrderer.email}
                  onChange={(e) =>
                    setTempOrderer({ ...tempOrderer, email: e.target.value })
                  }
                  placeholder="이메일을 입력해주세요."
                  className="h-[51px] flex-1 border border-gray-300 rounded-xl px-4 py-4 text-[16px] text-gray-400 focus:outline-none focus:text-[#3A404A] focus:border-[#007AFF]"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsOrdererModalOpen(false)}
                className="flex-1 h-[60px] px-3 bg-[#E8EBED] rounded-xl text-[20px] font-regular text-[#949BA7] hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={saveOrderer}
                className="flex-1 h-[60px] px-3 bg-[#007AFF] text-white rounded-xl text-[20px] font-regular hover:bg-[#0066CC]"
              >
                완료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 배송 정보 수정 모달 */}
      {isDeliveryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-12 w-[680px]">
            <h3 className="text-[28px] font-semibold mb-10">배송 정보 수정</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-6">
                <label className="text-[20px] text-black w-24 flex-shrink-0">
                  수취인
                </label>
                <input
                  type="text"
                  value={tempDelivery.recipient}
                  onChange={(e) =>
                    setTempDelivery({
                      ...tempDelivery,
                      recipient: e.target.value,
                    })
                  }
                  placeholder="손하늘"
                  className="flex-1 border-2 border-[#007AFF] rounded-xl px-5 py-4 text-[18px] focus:outline-none focus:border-[#007AFF]"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="text-[20px] text-black w-24 flex-shrink-0">
                  연락처
                </label>
                <input
                  type="text"
                  value={tempDelivery.phone}
                  onChange={(e) =>
                    setTempDelivery({ ...tempDelivery, phone: e.target.value })
                  }
                  placeholder="010-1234-5678"
                  className="flex-1 border border-gray-300 rounded-xl px-5 py-4 text-[18px] focus:outline-none focus:border-[#007AFF]"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="text-[20px] text-black w-24 flex-shrink-0">
                  배송지
                </label>
                <input
                  type="text"
                  value={tempDelivery.address}
                  onChange={(e) =>
                    setTempDelivery({
                      ...tempDelivery,
                      address: e.target.value,
                    })
                  }
                  placeholder="배송지를 입력해주세요."
                  className="flex-1 border border-gray-300 rounded-xl px-5 py-4 text-[18px] text-gray-400 focus:outline-none focus:border-[#007AFF]"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsDeliveryModalOpen(false)}
                className="flex-1 h-[60px] bg-[#E8EBED] rounded-xl text-[20px] font-medium text-[#949BA7] hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={saveDelivery}
                className="flex-1 h-[60px] bg-[#007AFF] text-white rounded-xl text-[20px] font-semibold hover:bg-[#0066CC]"
              >
                완료
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
}