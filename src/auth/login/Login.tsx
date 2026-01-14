import React, { useState, useEffect } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import { login as loginApi } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user, login } = useAuth();

  // 이미 로그인된 경우 해당 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === 'Company') {
        navigate('/StudentGroupSearch', { replace: true });
      } else if (user.role === 'StudentOrg') {
        navigate('/studentshopping', { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  const isFilled = id.trim() !== '' && pw.trim() !== '';

  const handleLogin = async () => {
    if (!isFilled || loading) return;

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await loginApi({
        loginId: id,
        password: pw,
      });

      // 디버깅: 로그인 응답 확인
      console.log('=== 로그인 API 응답 ===', res);
      console.log('accessToken:', res.accessToken);
      console.log('refreshToken:', res.refreshToken);
      console.log('userId:', res.userId);
      console.log('role:', res.role);

      // AuthContext를 통해 로그인 상태 저장
      login({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        userId: res.userId,
        role: res.role,
      });

      // role에 따라 다른 페이지로 이동
      if (res.role === 'Company') {
        navigate('/StudentGroupSearch', { replace: true });
      } else if (res.role === 'StudentOrg') {
        navigate('/studentshopping', { replace: true });
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

  // 로딩 중일 때는 아무것도 표시하지 않음
  if (isLoading) {
    return null;
  }

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
