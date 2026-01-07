// src/auth/signup/SignUpComplete.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';

export default function SignUpComplete() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="w-full h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="w-full max-w-[416px] bg-white rounded-2xl shadow-sm px-8 py-16 text-center">
          {/* 체크 아이콘 */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#007AFF] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path 
                  d="M7 16L13 22L25 10" 
                  stroke="white" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* 제목 */}
          <h1 className="text-[28px] font-bold text-[#191F28] mb-3 tracking-[-0.42px]">
            회원가입 완료
          </h1>

          {/* 부제목 */}
          <p className="text-[16px] text-[#949BA7] mb-10 tracking-[-0.24px]">
            유니커넥트와 더 쉬운 협업을 진행해보세요!
          </p>

          {/* 로그인하기 버튼 */}
          <button
            onClick={() => navigate('/login')}
            className="w-full h-[48px] bg-[#007AFF] text-white rounded-lg text-[16px] font-semibold hover:bg-[#0066CC] transition-colors"
          >
            로그인하기
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}