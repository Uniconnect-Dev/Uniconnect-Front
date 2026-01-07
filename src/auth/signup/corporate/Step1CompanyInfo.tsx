// src/auth/signup/corporate/Step1CompanyInfo.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';

export default function Step1CompanyInfo() {
  const navigate = useNavigate();
  
  // 상태 관리
  const [formData, setFormData] = useState({
    name: '', // 담당자 이름
    userId: '', // 아이디
    email: '',
    password: '',
    passwordConfirm: '',
    agreeToTerms: false,
  });

  // 검증 상태 (학생용 Step1의 로직 이식)
  const [idCheckStatus, setIdCheckStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [passwordError, setPasswordError] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 타이머 효과
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // 아이디 중복 체크 로직
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, userId: e.target.value });
    setIdCheckStatus('idle');
  };

  const handleIdBlur = () => {
    if (formData.userId) {
      setIdCheckStatus('checking');
      setTimeout(() => {
        // 시뮬레이션: 'admin'인 경우만 중복으로 처리
        setIdCheckStatus(formData.userId === 'admin' ? 'unavailable' : 'available');
      }, 800);
    }
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, passwordConfirm: e.target.value });
    setPasswordError(formData.password !== e.target.value);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isFormValid = 
    formData.name && 
    idCheckStatus === 'available' && 
    emailVerified && 
    formData.password && 
    !passwordError && 
    formData.agreeToTerms;

  const handleNext = () => {
    if (isFormValid) navigate('/signup/corporate/step2');
  };

  return (
    <AuthLayout>
      <div className="w-full h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="w-full max-w-[416px] bg-white rounded-2xl shadow-sm px-8 py-10">
          
          {/* 진행 단계 */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[16px] font-medium pt-[0.5px]">1</div>
            <div className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#DADFE7] text-[#DADFE7] flex items-center justify-center text-[16px] font-medium pt-[0.5px]">2</div>
            <div className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#DADFE7] text-[#DADFE7] flex items-center justify-center text-[16px] font-medium pt-[0.5px]">3</div>
          </div>

          <h1 className="text-[24px] font-bold text-[#191F28] tracking-[-0.42px]">담당자 정보 입력</h1>
          <p className="text-[16px] text-[#949BA7] mb-4 tracking-[-0.3px]">아래 내용을 입력해 주세요.</p>

          {/* 1. 담당자명 */}
          <div className="mb-4">
            <label className="block text-[15px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">담당자명</label>
            <input
              type="text"
              placeholder="이름을 입력해주세요."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-[48px] px-4 border text-[14px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
            />
          </div>

          

          {/* 3. 이메일 및 인증 */}
          <div className="mb-4">
            <label className="block text-[15px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">이메일</label>
            {!emailVerified ? (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="flex-1 h-[48px] px-4 border text-[14px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
                />
                <button
                  onClick={() => { setEmailVerificationSent(true); setTimer(180); }}
                  disabled={!formData.email || emailVerificationSent}
                  className={`px-5 rounded-xl font-medium text-[14px] ${formData.email && !emailVerificationSent ? 'bg-[#008FFF] text-white' : 'bg-gray-200 text-[#B4BBC7]'}`}
                >
                  인증
                </button>
              </div>
            ) : (
              <div className="relative">
                <input disabled value={formData.email} className="w-full h-[48px] px-4 border text-[15px] bg-gray-50 text-gray-500 rounded-xl" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#008FFF] font-medium text-[14px]">인증완료</div>
              </div>
            )}
            
            {emailVerificationSent && !emailVerified && (
              <div className="flex gap-2 mt-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="인증번호"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full h-[48px] px-4 border text-[15px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#008FFF] text-[13px]">{formatTime(timer)}</span>
                </div>
                <button
                  onClick={() => setEmailVerified(true)}
                  className="px-5 bg-[#008FFF] text-white rounded-xl font-medium text-[14px]"
                >
                  확인
                </button>
              </div>
            )}
          </div>

          {/* 2. 아이디 (요청하신 추가 필드) */}
          <div className="mb-4">
            <label className="block text-[15px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">아이디</label>
            <div className="relative">
              <input
                type="text"
                placeholder="아이디를 입력해주세요."
                value={formData.userId}
                onChange={handleIdChange}
                onBlur={handleIdBlur}
                className={`w-full h-[48px] px-4 border text-[14px] rounded-xl focus:outline-none ${
                  idCheckStatus === 'unavailable' ? 'border-red-500' : 'border-gray-300 focus:border-[#008FFF]'
                }`}
              />
              {idCheckStatus === 'checking' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-[#008FFF] rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {idCheckStatus === 'unavailable' && <p className="text-red-500 text-[10px] mt-1 ml-1">이미 존재하는 아이디입니다.</p>}
            {idCheckStatus === 'available' && <p className="text-[#008FFF] text-[10px] mt-1 ml-1">사용 가능한 아이디입니다.</p>}
          </div>

          {/* 4. 비밀번호 */}
          <div className="mb-4">
            <label className="block text-[15px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">비밀번호</label>
            <input
              type="password"
              placeholder="영문, 숫자, 특수문자 조합 8-16자"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full h-[48px] px-4 border text-[14px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF] mb-2"
            />
            <div className="relative">
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                placeholder="비밀번호 재입력"
                value={formData.passwordConfirm}
                onChange={handlePasswordConfirmChange}
                className={`w-full h-[48px] px-4 pr-12 border text-[14px] rounded-xl focus:outline-none ${passwordError ? 'border-red-500' : 'border-gray-300 focus:border-[#008FFF]'}`}
              />
              <button 
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {/* SVG 아이콘 생략 (기존과 동일) */}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-[10px] mt-1 ml-1">비밀번호가 일치하지 않습니다.</p>}
          </div>

          {/* 개인정보 수집 및 이용 동의 */}
          <div className="mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeToTerms: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-4 h-4 border-2 border-gray-300 rounded peer-checked:bg-[#007AFF] peer-checked:border-[#007AFF] flex items-center justify-center transition-colors">
                  {formData.agreeToTerms && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[14px] text-[#585F69] font-medium tracking-[-0.24px]">
                개인정보 수집 및 이용 동의
              </span>
              <button
                type="button"
                className="ml-auto text-[14px] text-[#949BA7] underline"
              >
                전문 보기
              </button>
            </label>
          </div>

          {/* 약관 및 버튼 생략 (위와 동일한 디자인) */}
          <div className="flex gap-3 mt-4">
            <button onClick={() => navigate('/signup')} className="flex-1 h-[48px] border border-[#008FFF] text-[#008FFF] rounded-lg font-semibold">이전</button>
            <button
              onClick={handleNext}
              disabled={!isFormValid}
              className={`flex-1 h-[48px] rounded-lg font-semibold transition-colors ${isFormValid ? 'bg-[#008FFF] text-white' : 'bg-gray-200 text-[#B4BBC7]'}`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}