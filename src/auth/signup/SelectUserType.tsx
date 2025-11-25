// src/auth/SelectUserType.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectUserType() {
  const navigate = useNavigate();

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
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm p-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">회원가입</h1>
          <p className="text-sm text-gray-500 mb-10">
            회원 유형을 선택해주세요.
          </p>

          <div className="flex gap-4">
            {/* 기업 카드 */}
            <button
              onClick={() => navigate('/signup/corporate/step1')}
              className="flex-1 bg-[#E8F4FF] rounded-2xl p-8 hover:bg-[#D4EBFF] transition-colors"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-[#008FFF] rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                  </svg>
                </div>
                <span className="text-base font-semibold text-gray-900">
                  기업
                </span>
              </div>
            </button>

            {/* 학생 단체 카드 */}
            <button
              onClick={() => navigate('/signup/student/step1')}
              className="flex-1 bg-gray-100 rounded-2xl p-8 hover:bg-gray-200 transition-colors"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-gray-400 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                <span className="text-base font-semibold text-gray-900">
                  학생 단체
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
