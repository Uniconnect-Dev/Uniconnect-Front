// src/auth/signup/corporate/Step1CompanyInfo.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step1CompanyInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    agreeToTerms: false,
  });
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleNext = () => {
    // 유효성 검사 로직 추가
    navigate('/signup/corporate/step2');
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
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm p-10">
          {/* 진행 단계 */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#008FFF] text-white flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
              2
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            담당자 정보 입력
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            아래 내용을 입력해 주세요.
          </p>

          {/* 담당자명 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              담당자명
            </label>
            <input
              type="text"
              placeholder="이름을 입력주세요."
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008FFF]"
            />
          </div>

          {/* 이메일 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일을 입력주세요"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008FFF]"
              />
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">
                인증
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="영문, 숫자, 특수문자 조합 8-16자"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008FFF] mb-3"
            />
            <input
              type="password"
              placeholder="비밀번호 재입력"
              value={formData.passwordConfirm}
              onChange={(e) =>
                setFormData({ ...formData, passwordConfirm: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008FFF]"
            />
          </div>

          {/* 약관 동의 */}
          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                className="w-5 h-5 rounded border-gray-300 text-[#008FFF] focus:ring-[#008FFF]"
              />
              <span className="text-sm text-gray-700">
                개인정보 수집 및 이용 동의
              </span>
            </label>
            <button
              onClick={() => setShowTermsModal(true)}
              className="text-sm text-gray-500 underline hover:text-gray-700"
            >
              전문 보기
            </button>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/signup')}
              className="flex-1 py-3 border-2 border-[#008FFF] text-[#008FFF] rounded-lg font-semibold hover:bg-[#008FFF] hover:text-white transition-colors"
            >
              이전
            </button>
            <button
              onClick={handleNext}
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