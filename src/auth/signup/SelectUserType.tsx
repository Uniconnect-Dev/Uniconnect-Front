// src/auth/signup/SelectUserType.tsx
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
              className="group flex-1 bg-white rounded-2xl p-8 hover:bg-[#E8F4FF] transition-colors border border-gray-200"
            >
              <div className="flex flex-col items-center gap-4">
                <img
                  src="/usertype_gray.png"
                  alt="기업"
                  className="w-20 h-20 group-hover:hidden"
                />
                <img
                  src="/usertype_selected.png"
                  alt="기업"
                  className="w-20 h-20 hidden group-hover:block"
                />
                <span className="text-base font-semibold text-gray-900 group-hover:hidden">
                  기업
                </span>
                <span className="text-base font-semibold hidden text-[#007AFF] group-hover:block">
                  기업
                </span>
              </div>
            </button>

            {/* 학생 단체 카드 */}
            <button
              onClick={() => navigate('/signup/student/step1')}
              className="group flex-1 bg-white rounded-2xl p-8 hover:bg-[#E8F4FF] transition-colors border border-gray-200"
            >
              <div className="flex flex-col items-center gap-4">
                <img
                  src="/usertype_gray.png"
                  alt="학생 단체"
                  className="w-20 h-20 group-hover:hidden"
                />
                <img
                  src="/usertype_selected.png"
                  alt="학생 단체"
                  className="w-20 h-20 hidden group-hover:block"
                />
                <span className="text-base font-semibold group-hover:hidden text-gray-900">
                  학생 단체
                </span>
                <span className="text-base font-semibold hidden text-[#007AFF] group-hover:block">
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