// src/auth/signup/corporate/Step3BusinessInfo.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import { initCompanyProfile } from '@/services/profile.service';
import { uploadFile } from '@/services/s3.service';
import { getUserId } from '@/lib/auth/token';
import { AppError } from '@/lib/error/AppError';

// 업태 enum 목록
const BUSINESS_TYPES = [
  '법인사업자', '개인사업자', '스타트업', '중소기업', '중견기업', '대기업', '계열사',
  'B2B', 'B2C', 'B2B2C', 'SaaS', '플랫폼 기반', '구독형 서비스', '프로젝트 기반',
  '자체 개발', '외주 개발', '운영 대행', '위탁 운영', '솔루션 제공', 'API 제공',
  '온라인 서비스', '오프라인 운영', '온·오프라인 병행', '직접 판매', '간접 판매',
  '파트너십 기반', '기술 기반 기업', '데이터 기반 기업', '플랫폼 기업', '콘텐츠 기업', '연구 중심 기업'
];

// 업종 enum 목록
const INDUSTRY_TYPES = [
  '소프트웨어 개발업', 'IT 서비스업', '정보통신업', '데이터 처리업', '인공지능 서비스업',
  '클라우드 서비스업', '플랫폼 운영업', '시스템 통합(SI)', '솔루션 개발업', '컨설팅업',
  '경영컨설팅업', '전략컨설팅업', '마케팅 컨설팅업', '법률 서비스업', '회계·세무 서비스업',
  '인사·노무 서비스업', '리서치·조사업', '광고대행업', '마케팅대행업', '디지털마케팅업',
  '콘텐츠 제작업', '미디어 콘텐츠업', '영상 제작업', '디자인 서비스업', '브랜드 컨설팅업',
  '서비스업', '운영대행업', '아웃소싱업', 'CRM 서비스업', '제조업', '연구·개발(R&D)업',
  '기술 개발업', '도소매업', '유통업', '무역업', '전자상거래업', '교육 서비스업',
  '기업교육', '온라인 교육업', 'HR 서비스업', '채용 플랫폼 운영업', '금융 서비스업',
  '핀테크 서비스업', '결제 서비스업', '데이터 금융업'
];

export default function Step3BusinessInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessNumber: '',
    legalName: '',
    representative: '',
    openingDate: '',
    address: { street: '', detail: '' },
    businessTypeEnum: '', // 업태
    industry: '', // 업종
  });

  // 드롭다운 관련 상태
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const typeRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  // 로고 업로드 관련 상태
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setLogoUploading(true);
    setErrorMessage('');

    try {
      const response = await uploadFile(file, { type: 'company_logo' });
      if (response.data) {
        setLogoUrl(response.data.url || response.data.key);
      }
    } catch (error) {
      setLogoFile(null);
      setLogoPreview(null);
      if (error instanceof AppError) {
        setErrorMessage(error.message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('로고 업로드 중 오류가 발생했습니다.');
      }
    } finally {
      setLogoUploading(false);
    }
  };

  const handleLogoRemove = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setLogoUrl('');
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  // 필터링 로직
  const filteredTypes = BUSINESS_TYPES.filter(t => t.includes(formData.businessTypeEnum)).slice(0, 5);
  const filteredIndustries = INDUSTRY_TYPES.filter(i => i.includes(formData.industry)).slice(0, 5);

  // 외부 클릭 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) setShowTypeDropdown(false);
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) setShowItemDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isFormValid =
    formData.businessNumber.length >= 10 &&
    formData.legalName &&
    formData.representative &&
    formData.openingDate &&
    formData.businessTypeEnum &&
    formData.industry &&
    logoUrl; // 로고 필수

  const handleSubmit = async () => {
    if (!isFormValid || isLoading) return;

    const userId = getUserId();
    if (!userId) {
      setErrorMessage('로그인 정보가 없습니다. 다시 회원가입을 진행해주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      await initCompanyProfile({
        brandName: formData.legalName,
        logoUrl: logoUrl,
        mainContactId: userId,
        industry: formData.industry,
        businessTypeEnum: formData.businessTypeEnum,
      });

      navigate('/signup/complete');
    } catch (error) {
      if (error instanceof AppError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('기업 정보 등록 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="w-full max-w-[416px] bg-white rounded-2xl shadow-sm px-8 py-10 my-8 overflow-y-auto max-h-[90vh]">
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#DADFE7] text-[#DADFE7] flex items-center justify-center text-[16px] font-medium pt-[0.5px]">1</div>
            <div className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#DADFE7] text-[#DADFE7] flex items-center justify-center text-[16px] font-medium pt-[0.5px]">2</div>
            <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[16px] font-medium pt-[0.5px]">3</div>
          </div>

          <h1 className="text-[24px] font-bold text-[#191F28] tracking-[-0.42px]">사업자 정보 입력</h1>
          <p className="text-[16px] text-[#949BA7] mb-8 tracking-[-0.3px]">사업자 정보를 정확히 입력해 주세요.</p>

          {/* 로고 업로드 (필수) */}
          <div className="mb-6">
            <label className="block text-[14px] font-medium text-[#6C727E] mb-1.5">
              기업 로고 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              {logoPreview ? (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                  <img src={logoPreview} alt="로고 미리보기" className="w-full h-full object-cover" />
                  {logoUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleLogoRemove}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[#008FFF] hover:bg-[#F9FAFB] transition-colors">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9AA1AD" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </label>
              )}
              <div className="text-[12px] text-[#9AA1AD]">
                <p>JPG, PNG 형식</p>
                <p>권장 크기: 200x200px</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-[14px] font-medium text-[#6C727E] mb-1.5">사업자등록번호</label>
              <input type="text" placeholder="10자리 숫자를 입력해주세요." value={formData.businessNumber} onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })} className="w-full h-[44px] px-4 border text-[13px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]" />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-[#6C727E] mb-1.5">법인명</label>
              <input type="text" placeholder="법인명을 입력해주세요." value={formData.legalName} onChange={(e) => setFormData({ ...formData, legalName: e.target.value })} className="w-full h-[44px] px-4 border text-[13px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium text-[#6C727E] mb-1.5">대표자</label>
              <input type="text" placeholder="이름" value={formData.representative} onChange={(e) => setFormData({ ...formData, representative: e.target.value })} className="w-full h-[44px] px-4 border text-[13px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]" />
            </div>
            <div className="mb-3">
              <label className="block text-[14px] font-medium text-[#6C727E] mb-1.5">개업연월일</label>
              <input type="text" placeholder="YYYYMMDD" value={formData.openingDate} onChange={(e) => setFormData({ ...formData, openingDate: e.target.value })} className="w-full h-[44px] px-4 border text-[13px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]" />
            </div>
          </div>

          {/* 사업의 종류 (드롭다운 검색 형태) */}
          <div className="mb-10">
            <label className="block text-[14px] font-medium text-[#6C727E] mb-1.5">사업의 종류</label>
            <div className="space-y-3">
              {/* 업태 검색 드롭다운 */}
              <div className="flex items-center gap-3 relative" ref={typeRef}>
                <span className="w-6 text-[13px] font-medium text-[#949BA7] flex-shrink-0">업태</span>
                <input
                  type="text"
                  placeholder="업태를 입력해주세요."
                  value={formData.businessTypeEnum}
                  onFocus={() => setShowTypeDropdown(true)}
                  onChange={(e) => setFormData({ ...formData, businessTypeEnum: e.target.value })}
                  className="flex-1 w-full h-[44px] px-4 border text-[13px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
                />
                {showTypeDropdown && formData.businessTypeEnum && filteredTypes.length > 0 && (
                  <div className="absolute z-10 w-[calc(100%-52px)] right-0 top-[52px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-[200px] overflow-y-auto">
                    {filteredTypes.map((t, i) => (
                      <button key={i} type="button" onClick={() => { setFormData({...formData, businessTypeEnum: t}); setShowTypeDropdown(false); }} className="w-full px-4 py-3 text-left text-[13px] hover:bg-gray-50 border-b border-gray-50 last:border-0">{t}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* 업종 검색 드롭다운 */}
              <div className="flex items-center gap-3 relative" ref={itemRef}>
                <span className="w-6 text-[13px] font-medium text-[#949BA7] flex-shrink-0">업종</span>
                <input
                  type="text"
                  placeholder="업종을 입력해주세요."
                  value={formData.industry}
                  onFocus={() => setShowItemDropdown(true)}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="flex-1 w-full h-[44px] px-4 border text-[13px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
                />
                {showItemDropdown && formData.industry && filteredIndustries.length > 0 && (
                  <div className="absolute z-10 w-[calc(100%-52px)] right-0 top-[52px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-[200px] overflow-y-auto">
                    {filteredIndustries.map((item, i) => (
                      <button key={i} type="button" onClick={() => { setFormData({...formData, industry: item}); setShowItemDropdown(false); }} className="w-full px-4 py-3 text-left text-[13px] hover:bg-gray-50 border-b border-gray-50 last:border-0">{item}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 에러 메시지 */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-[13px]">{errorMessage}</p>
            </div>
          )}

          {/* 하단 버튼 세트 */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate('/signup/corporate/step2')}
              disabled={isLoading}
              className="flex-1 h-[48px] border border-[#008FFF] text-[#008FFF] rounded-lg font-semibold text-[15px] hover:bg-[#F0F9FF] transition-colors disabled:opacity-50"
            >
              이전
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className={`flex-1 h-[48px] rounded-lg font-semibold text-[15px] transition-colors ${
                isFormValid && !isLoading
                  ? 'bg-[#008FFF] text-white hover:bg-[#0077CC]'
                  : 'bg-gray-200 text-[#B4BBC7] cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  처리 중...
                </div>
              ) : (
                '가입완료'
              )}
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}