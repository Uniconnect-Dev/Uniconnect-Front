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
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
              3
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

      {/* 약관 전문 모달 */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[600px] max-h-[80vh] flex flex-col">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                개인정보 수집 및 이용 동의
              </h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 모달 내용 - 스크롤 영역 */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">제1장 총칙</h3>
                  <p className="mb-2">제1조 (목적)</p>
                  <p>
                    본 약관은 유니커넥트(이하 "회사")가 제공하는 자동화 프로그램
                    서비스(이하 "서비스")의 이용조건 및 절차, 이용자와 회사의
                    권리·의무 및 책임사항을 규정함을 목적으로 합니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    제2조 (용어의 정의)
                  </h3>
                  <p className="mb-2">
                    "서비스"란 회사가 제공하는 자동화 프로그램 및 관련 제반
                    서비스를 의미합니다.
                  </p>
                  <p className="mb-2">
                    "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는
                    기업 및 그 소속 직원을 말합니다.
                  </p>
                  <p>
                    "계정"이란 서비스 이용을 위해 필요한 아이디와 비밀번호를
                    포함한 로그인 정보를 의미합니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    제3조 (약관의 효력 및 변경)
                  </h3>
                  <p className="mb-2">
                    본 약관은 서비스 화면에 게시하거나 기타 방법으로
                    이용자에게 공지함으로써 효력이 발생합니다.
                  </p>
                  <p>
                    회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은
                    공지 후 7일이 경과한 날부터 효력이 발생합니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    제2장 서비스 이용
                  </h3>
                  <p className="font-semibold mb-2">제4조 (서비스 내용)</p>
                  <p className="mb-4">회사가 제공하는 서비스는 다음과 같습니다:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>생활물 중개 서비스</li>
                    <li>자동화된 매칭 시스템</li>
                    <li>데이터 분석 및 리포트 제공</li>
                    <li>기타 회사가 추가로 개발하거나 제공하는 서비스</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">제5조 (서비스 이용 신청)</p>
                  <p className="mb-2">
                    서비스 이용을 원하는 자는 회사가 정한 가입 양식에 따라
                    회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써
                    이용신청을 합니다.
                  </p>
                  <p>
                    회사는 제1항의 신청에 대하여 서비스 이용을 승낙함을
                    원칙으로 합니다.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">제6조 (개인정보의 보호)</p>
                  <p className="mb-2">
                    회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를
                    보호하기 위해 노력합니다.
                  </p>
                  <p>
                    개인정보의 보호 및 이용에 대해서는 관련 법령 및 회사의
                    개인정보처리방침이 적용됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full py-3 bg-[#008FFF] text-white rounded-lg font-semibold hover:bg-[#0077CC] transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}