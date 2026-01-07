// src/auth/signup/student/Step1StaffInfo.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';

export default function Step1StaffInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    agreeToTerms: false,
  });
  const [showTermsModal, setShowTermsModal] = useState(false);
  
  // 검증 상태
  const [idCheckStatus, setIdCheckStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [passwordError, setPasswordError] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 타이머 효과
  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
    setIdCheckStatus('idle');
  };

  const handleIdBlur = () => {
    if (formData.name) {
      setIdCheckStatus('checking');
      // 시뮬레이션: 실제로는 API 호출
      setTimeout(() => {
        setIdCheckStatus(formData.name === 'uniconnect' ? 'unavailable' : 'available');
      }, 1000);
    }
  };

  const handleEmailVerification = () => {
    setEmailVerificationSent(true);
    setTimer(180); // 3분
  };

  const handleVerificationCodeSubmit = () => {
    // 시뮬레이션: 실제로는 API 호출
    setEmailVerified(true);
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, passwordConfirm: e.target.value });
    if (formData.password && e.target.value && formData.password !== e.target.value) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isFormValid = idCheckStatus === 'available' && emailVerified && formData.password && formData.passwordConfirm && !passwordError;

  const handleNext = () => {
    if (isFormValid) {
      navigate('/signup/student/step2');
    }
  };

  return (
    <AuthLayout>
      <div className="w-full h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="w-full max-w-[416px] bg-white rounded-2xl shadow-sm px-8 py-10">
          {/* 진행 단계 */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[16px] font-medium pt-[0.5px]">
              1
            </div>
            <div className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#DADFE7] text-[#DADFE7] flex items-center justify-center text-[16px] font-medium pt-[0.5px]">
              2
            </div>
          </div>

          <h1 className="text-[24px] font-bold text-[#191F28] tracking-[-0.42px]">
            기본 정보 입력
          </h1>
          <p className="text-[16px] text-[#949BA7] mb-8 tracking-[-0.3px]">
            아래 내용을 입력해 주세요.
          </p>

          {/* 아이디 */}
          <div className="mb-8">
            <label className="block text-[15px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">
              아이디
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="아이디를 입력해주세요."
                value={formData.name}
                onChange={handleIdChange}
                onBlur={handleIdBlur}
                className={`w-full h-[48px] px-4 border text-[15px] rounded-xl focus:outline-none ${
                  idCheckStatus === 'unavailable'
                    ? 'border-red-500'
                    : idCheckStatus === 'available'
                    ? 'border-gray-300'
                    : 'border-gray-300 focus:border-[#008FFF]'
                }`}
              />
              {idCheckStatus === 'checking' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-[#008FFF] rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {idCheckStatus === 'unavailable' && (
              <p className="text-red-500 text-[10px] mt-1">이미 존재하는 아이디입니다.</p>
            )}
            {idCheckStatus === 'available' && (
              <p className="text-[#008FFF] text-[10px] mt-1">사용 가능한 아이디입니다.</p>
            )}
          </div>

          {/* 이메일 */}
          <div className="mb-8">
            <label className="block text-[15px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">
              이메일
            </label>
            {!emailVerified ? (
              <div className="flex gap-2 mb-2">
                <input
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="flex-1 h-[48px] px-4 border text-[15px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
                />
                <button
                  type="button"
                  onClick={handleEmailVerification}
                  disabled={!formData.email || emailVerificationSent}
                  className={`px-5 py-3 rounded-xl font-medium text-[15px] whitespace-nowrap ${
                    formData.email && !emailVerificationSent
                      ? 'bg-[#008FFF] text-white hover:bg-[#0077CC]'
                      : 'bg-gray-200 text-[#B4BBC7]'
                  }`}
                >
                  인증
                </button>
              </div>
            ) : (
              <div className="relative mb-2">
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full h-[48px] px-4 pr-20 border text-[15px] bg-gray-50 text-gray-500 border-gray-300 rounded-xl focus:outline-none"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#008FFF] font-medium text-[15px]">
                  인증완료
                </div>
              </div>
            )}
            
            {emailVerificationSent && !emailVerified && (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="인증번호를 입력해주세요."
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full h-[48px] px-4 pr-20 border text-[15px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#008FFF] font-medium text-[15px]">
                    {formatTime(timer)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleVerificationCodeSubmit}
                  disabled={!verificationCode}
                  className={`px-5 py-3 rounded-xl font-medium text-[15px] whitespace-nowrap ${
                    verificationCode
                      ? 'bg-[#008FFF] text-white hover:bg-[#0077CC]'
                      : 'bg-gray-200 text-[#B4BBC7]'
                  }`}
                >
                  인증
                </button>
              </div>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="mb-12">
            <label className="block text-[14px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="영문, 숫자, 특수문자 조합 8-16자"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`w-full h-[48px] px-4 border text-[14px] rounded-xl focus:outline-none mb-2 ${
                passwordError ? 'border-red-500' : 'border-gray-300 focus:border-[#008FFF]'
              }`}
            />
            <div className="relative">
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                placeholder="비밀번호 재입력"
                value={formData.passwordConfirm}
                onChange={handlePasswordConfirmChange}
                className={`w-full h-[48px] px-4 pr-12 border text-[14px] rounded-xl focus:outline-none ${
                  passwordError ? 'border-red-500' : 'border-gray-300 focus:border-[#008FFF]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswordConfirm ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-[10px] mt">비밀번호가 잘못되었습니다.</p>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/signup')}
              className="flex-1 h-[48px] border border-[#008FFF] text-[#008FFF] rounded-lg text-[15px] font-semibold hover:bg-[#008FFF] hover:text-white transition-colors"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              disabled={!isFormValid}
              className={`flex-1 h-[48px] rounded-lg text-[15px] font-semibold transition-colors ${
                isFormValid
                  ? 'bg-[#008FFF] text-white hover:bg-[#0077CC]'
                  : 'bg-gray-200 text-[#B4BBC7]'
              }`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}