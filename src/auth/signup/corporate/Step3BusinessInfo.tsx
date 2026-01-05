// src/auth/signup/corporate/Step3BusinessInfo.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';

// 임의 데이터 (실제 데이터셋으로 교체 가능)
const BUSINESS_TYPES = ['제조업', '도매 및 소매업', '정보통신업', '전문, 과학 및 기술 서비스업', '사업시설 관리, 사업 지원 및 임대 서비스업', '교육 서비스업'];
const BUSINESS_ITEMS = ['소프트웨어 개발 및 공급', '데이터베이스 및 온라인 정보제공업', '광고 대행업', '경영 컨설팅업', '전자상거래 소매업', '컴퓨터 시스템 통합 자문 및 구축 서비스업'];

export default function Step3BusinessInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessNumber: '',
    legalName: '',
    representative: '',
    openingDate: '',
    address: { street: '', detail: '' },
    businessType: '', // 업태
    businessItem: '', // 종목
  });

  // 드롭다운 관련 상태
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  // 필터링 로직
  const filteredTypes = BUSINESS_TYPES.filter(t => t.includes(formData.businessType)).slice(0, 5);
  const filteredItems = BUSINESS_ITEMS.filter(i => i.includes(formData.businessItem)).slice(0, 5);

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
    formData.businessType &&
    formData.businessItem;

  const handleSubmit = () => {
    navigate('/signup/complete');
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
                  value={formData.businessType}
                  onFocus={() => setShowTypeDropdown(true)}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="flex-1 w-full h-[44px] px-4 border text-[13px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
                />
                {showTypeDropdown && formData.businessType && filteredTypes.length > 0 && (
                  <div className="absolute z-10 w-[calc(100%-52px)] right-0 top-[52px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    {filteredTypes.map((t, i) => (
                      <button key={i} type="button" onClick={() => { setFormData({...formData, businessType: t}); setShowTypeDropdown(false); }} className="w-full px-4 py-3 text-left text-[13px] hover:bg-gray-50 border-b border-gray-50 last:border-0">{t}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* 종목 검색 드롭다운 */}
              <div className="flex items-center gap-3 relative" ref={itemRef}>
                <span className="w-6 text-[13px] font-medium text-[#949BA7] flex-shrink-0">종목</span>
                <input
                  type="text"
                  placeholder="종목 검색"
                  value={formData.businessItem}
                  onFocus={() => setShowItemDropdown(true)}
                  onChange={(e) => setFormData({ ...formData, businessItem: e.target.value })}
                  className="flex-1 w-full h-[44px] px-4 border text-[13px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
                />
                {showItemDropdown && formData.businessItem && filteredItems.length > 0 && (
                  <div className="absolute z-10 w-[calc(100%-52px)] right-0 top-[52px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    {filteredItems.map((item, i) => (
                      <button key={i} type="button" onClick={() => { setFormData({...formData, businessItem: item}); setShowItemDropdown(false); }} className="w-full px-4 py-3 text-left text-[13px] hover:bg-gray-50 border-b border-gray-50 last:border-0">{item}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 하단 버튼 세트 */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate('/signup/corporate/step2')}
              className="flex-1 h-[48px] border border-[#008FFF] text-[#008FFF] rounded-lg font-semibold text-[15px] hover:bg-[#F0F9FF] transition-colors"
            >
              이전
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`flex-1 h-[48px] rounded-lg font-semibold text-[15px] transition-colors ${
                isFormValid 
                  ? 'bg-[#008FFF] text-white hover:bg-[#0077CC]' 
                  : 'bg-gray-200 text-[#B4BBC7] cursor-not-allowed'
              }`}
            >
              가입완료
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}