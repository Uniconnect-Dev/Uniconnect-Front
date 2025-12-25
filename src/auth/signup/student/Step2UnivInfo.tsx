// src/auth/corporate/Step3BusinessInfo.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step3BusinessInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessNumber: '',
    legalName: '',
    representative: '',
    openingDate: '',
    address: { street: '', detail: '' },
  });

  const handleSubmit = () => {
    // API 호출 후 완료
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      {/* 상단 로고 */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto h-[72px] px-12 flex items-center">
          <img
            src="/logo.png"
            alt="UNICONNECT Logo"
            className="h-[15px] w-auto"
          />
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm p-10 my-8">
          {/* 진행 단계 */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div className="w-8 h-8 rounded-full bg-[#008FFF] text-white flex items-center justify-center text-sm font-semibold">
              3
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            사업자 정보 입력
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            아래 내용을 입력해 주세요.
          </p>

          {/* 사업자등록번호 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사업자등록번호 (10자리 숫자)
            </label>
            <input
              type="text"
              placeholder="사업자등록번호를 입력해주세요."
              value={formData.businessNumber}
              onChange={(e) =>
                setFormData({ ...formData, businessNumber: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008FFF]"
            />
          </div>

          {/* 법인명 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              법인명 (사업자등록증에 기재된 법인명)
            </label>
            <input
              type="text"
              placeholder="법인명을 입력해주세요."
              value={formData.legalName}
              onChange={(e) =>
                setFormData({ ...formData, legalName: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008FFF]"
            />
          </div>

          {/* 대표자 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              대표자
            </label>
            <input
              type="text"
              placeholder="대표자명을 입력해주세요."
              value={formData.representative}
              onChange={(e) =>
                setFormData({ ...formData, representative: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008FFF]"
            />
          </div>

          {/* 개업연월일 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              개업연월일
            </label>
            <input
              type="text"
              placeholder="개업연월일을 입력주세요."
              value={formData.openingDate}
              onChange={(e) =>
                setFormData({ ...formData, openingDate: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008FFF]"
            />
          </div>

          {/* 사업장 주소 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사업장 주소
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="업체를 입력해주세요."
                  value={formData.address.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, street: e.target.value },
                    })
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008FFF]"
                />
                <button className="px-6 py-3 bg-white border-2 border-[#008FFF] text-[#008FFF] rounded-lg font-medium hover:bg-[#008FFF] hover:text-white transition-colors flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                placeholder="층수를 입력해주세요."
                value={formData.address.detail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, detail: e.target.value },
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008FFF]"
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/signup/corporate/step2')}
              className="flex-1 py-3 border-2 border-[#008FFF] text-[#008FFF] rounded-lg font-semibold hover:bg-[#008FFF] hover:text-white transition-colors"
            >
              이전
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-[#008FFF] text-white rounded-lg font-semibold hover:bg-[#0077CC] transition-colors"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
