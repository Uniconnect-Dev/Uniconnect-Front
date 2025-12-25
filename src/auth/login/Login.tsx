import React, { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const isFilled = id.trim() !== '' && pw.trim() !== '';

  return (
    <AuthLayout>
      <div className="w-full max-w-[424px] h-[374px] py-[50px] px-8 bg-white rounded-2xl shadow-m">
        {/* 로고 */}
        <div className="flex justify-center mb-8">
          <img
            src="/logowithouticon.png"
            alt="UNICONNECT"
            className="h-[24px] w-auto"
          />
        </div>

        {/* 아이디 입력 */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors
              ${
                id
                  ? 'border-[#008FFF]'
                  : 'border-gray-300 focus:border-blue-500'
              }
            `}
          />
          {id && (
            <button
              onClick={() => setId('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors
              ${
                pw
                  ? 'border-[#008FFF]'
                  : 'border-gray-300 focus:border-blue-500'
              }
            `}
          />
          {pw && (
            <button
              onClick={() => setPw('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* 로그인 버튼 */}
        <button
          className={`w-full py-3 rounded-lg mb-4 text-sm font-medium transition-colors
            ${
              isFilled
                ? 'bg-[#007AFF] text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
            }
          `}
        >
          로그인
        </button>

        {/* 하단 링크 */}
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex gap-1">
            <span className="cursor-pointer hover:text-gray-700">
              아이디 찾기
            </span>
            <span>|</span>
            <span className="cursor-pointer hover:text-gray-700">
              비밀번호 찾기
            </span>
          </div>
          <span className="cursor-pointer hover:text-gray-700">회원가입</span>
        </div>
      </div>
    </AuthLayout>
  );
}
