import React, { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import { login } from '@/services/auth.service';
import { setAccessToken, setRefreshToken, setUserId, setUserRole } from '@/lib/auth/token';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const isFilled = id.trim() !== '' && pw.trim() !== '';

  const handleLogin = async () => {
    if (!isFilled || loading) return;

    try {
      setLoading(true);
      setErrorMessage(null); // ✅ 이전 에러 초기화

      const res = await login({
        loginId: id,
        password: pw,
      });

      // 토큰 및 사용자 정보 저장
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      setUserId(res.userId);
      setUserRole(res.role);

      // role에 따라 다른 페이지로 이동
      if (res.role === 'Company') {
        navigate('/StudentGroupSearch');
      } else if (res.role === 'StudentOrg') {
        navigate('/studentshopping');
      } else {
        navigate('/login');
      }

    } catch (error: any) {
      setErrorMessage(
        error?.message ||
          '아이디 또는 비밀번호가 올바르지 않습니다'
      );
    } finally {
      setLoading(false);
    }
  };

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
        <div className="relative mb-2">
          <input
            type="password"
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

        {/* ❗ 로그인 실패 에러 메시지 */}
        {errorMessage && (
          <div className="flex items-center gap-1 text-xs text-red-500 mb-4">
            <span>●</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          disabled={!isFilled || loading}
          className={`w-full py-3 rounded-lg mb-4 text-sm font-medium transition-colors
            ${
              isFilled
                ? 'bg-[#007AFF] text-white'
                : 'bg-gray-200 text-gray-600'
            }
          `}
        >
          {loading ? '로그인 중...' : '로그인'}
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
