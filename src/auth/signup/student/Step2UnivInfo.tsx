// src/auth/signup/student/Step2UnivInfo.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';

// 국내 모든 대학교 리스트 (가나다순)
const UNIVERSITIES = [
  '가야대학교', '가천대학교', '가톨릭관동대학교', '가톨릭꽃동네대학교', '가톨릭대학교',
  '감리교신학대학교', '강남대학교', '강릉원주대학교', '강원대학교', '건국대학교',
  '건양대학교', '경기대학교', '경남과학기술대학교', '경남대학교', '경동대학교',
  '경북대학교', '경상국립대학교', '경성대학교', '경운대학교', '경일대학교',
  '경희대학교', '계명대학교', '고려대학교', '고신대학교', '공주대학교',
  '광신대학교', '광운대학교', '광주가톨릭대학교', '광주대학교', '광주여자대학교',
  '국민대학교', '군산대학교', '극동대학교', '금강대학교', '금오공과대학교',
  '김천대학교', '꽃동네대학교', '나사렛대학교', '남부대학교', '남서울대학교',
  '단국대학교', '대구가톨릭대학교', '대구대학교', '대구예술대학교', '대구한의대학교',
  '대신대학교', '대전가톨릭대학교', '대전대학교', '대전신학대학교', '대진대학교',
  '덕성여자대학교', '동국대학교', '동덕여자대학교', '동명대학교', '동서대학교',
  '동신대학교', '동아대학교', '동양대학교', '동의대학교', '루터대학교',
  '명지대학교', '목원대학교', '목포가톨릭대학교', '목포대학교', '목포해양대학교',
  '배재대학교', '백석대학교', '부경대학교', '부산가톨릭대학교', '부산대학교',
  '부산외국어대학교', '부산장신대학교', '삼육대학교', '상명대학교', '상지대학교',
  '서강대학교', '서경대학교', '서울과학기술대학교', '서울기독대학교', '서울대학교',
  '서울신학대학교', '서울여자대학교', '서울장신대학교', '서원대학교', '선문대학교',
  '성결대학교', '성공회대학교', '성균관대학교', '성신여자대학교', '세명대학교',
  '세종대학교', '송원대학교', '수원가톨릭대학교', '수원대학교', '순천대학교',
  '순천향대학교', '숭실대학교', '신경대학교', '신라대학교', '아세아연합신학대학교',
  '아주대학교', '안동대학교', '안양대학교', '연세대학교', '영남대학교',
  '영남신학대학교', '영산대학교', '예수대학교', '예원예술대학교', '용인대학교',
  '우석대학교', '우송대학교', '울산대학교', '원광대학교', '위덕대학교',
  '유원대학교', '을지대학교', '이화여자대학교', '인제대학교', '인천가톨릭대학교',
  '인천대학교', '인하대학교', '장로회신학대학교', '전남대학교', '전북대학교',
  '전주대학교', '제주대학교', '조선대학교', '중부대학교', '중앙대학교',
  '중앙승가대학교', '청주대학교', '초당대학교', '총신대학교', '추계예술대학교',
  '충남대학교', '충북대학교', '침례신학대학교', '칼빈대학교', '평택대학교',
  '포항공과대학교', '한경국립대학교', '한국공학대학교', '한국교통대학교', '한국국제대학교',
  '한국기술교육대학교', '한국성서대학교', '한국외국어대학교', '한국장로교신학대학교', '한국전통문화대학교',
  '한국체육대학교', '한국항공대학교', '한국해양대학교', '한남대학교', '한동대학교',
  '한라대학교', '한려대학교', '한림대학교', '한밭대학교', '한서대학교',
  '한성대학교', '한세대학교', '한신대학교', '한양대학교', '협성대학교',
  '호남대학교', '호남신학대학교', '호서대학교', '홍익대학교', 'KAIST',
  'DGIST', 'GIST', 'UNIST'
];

export default function Step2UnivInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: '',
    department: '',
    advisorName: '',
    agreeToTerms: false,
  });
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색어 포함된 학교 필터링 (최대 6개)
  const filteredSchools = UNIVERSITIES
    .filter(school => school.includes(searchQuery))
    .slice(0, 6);

  // 전체 매칭 결과 수
  const totalMatches = UNIVERSITIES.filter(school => school.includes(searchQuery)).length;

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSchoolDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 검색어 변경 시 hover 인덱스 초기화
  useEffect(() => {
    setHoveredIndex(0);
  }, [searchQuery]);

  const handleSchoolSelect = (school: string) => {
    setFormData({ ...formData, schoolName: school });
    setSearchQuery(school);
    setShowSchoolDropdown(false);
  };

  const handleSchoolInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSchoolDropdown(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSchoolDropdown || filteredSchools.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHoveredIndex((prev) => (prev + 1) % filteredSchools.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHoveredIndex((prev) => (prev - 1 + filteredSchools.length) % filteredSchools.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSchools[hoveredIndex]) {
        handleSchoolSelect(filteredSchools[hoveredIndex]);
      }
    }
  };

  const isFormValid = formData.schoolName && formData.department && formData.advisorName && formData.agreeToTerms;

  const handleSubmit = () => {
    if (isFormValid) {
      // TODO: 회원가입 API 호출
      console.log('회원가입 완료:', formData);
      navigate('/signup/complete');
    }
  };

  return (
    <AuthLayout>
      <div className="w-full h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="w-full max-w-[416px] bg-white rounded-2xl shadow-sm px-8 py-10">
          {/* 진행 단계 */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#DADFE7] text-[#DADFE7] flex items-center justify-center text-[16px] font-medium pt-[0.5px]">
              1
            </div>
            <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[16px] font-medium pt-[0.5px]">
              2
            </div>
          </div>

          <h1 className="text-[24px] font-bold text-[#191F28] tracking-[-0.42px]">
            단체 정보 입력
          </h1>
          <p className="text-[16px] text-[#949BA7] mb-8 tracking-[-0.3px]">
            아래 내용을 입력해 주세요.
          </p>

          {/* 학교명 */}
          <div className="mb-8 relative" ref={dropdownRef}>
            <label className="block text-[15px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">
              학교명
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="학교명을 입력해주세요."
                value={searchQuery}
                onChange={handleSchoolInputChange}
                onFocus={() => setShowSchoolDropdown(true)}
                onKeyDown={handleKeyDown}
                className="w-full h-[48px] px-4 pr-10 border text-[15px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setFormData({ ...formData, schoolName: '' });
                    setShowSchoolDropdown(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </button>
              )}
            </div>
            
            {/* 드롭다운 */}
            {showSchoolDropdown && searchQuery && filteredSchools.length > 0 && (
              <div 
                className={`absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg ${
                  totalMatches > 6 ? 'max-h-[224px] overflow-y-auto' : ''
                }`}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#CBD5E0 #F7FAFC'
                }}
              >
                {filteredSchools.map((school, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSchoolSelect(school)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={`w-full px-4 py-2.5 text-left text-[15px] transition-colors ${
                      index === hoveredIndex
                        ? 'bg-gray-50 text-[#191F28]'
                        : 'text-[#191F28] hover:bg-gray-50'
                    }`}
                  >
                    {school}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 단체명 */}
          <div className="mb-8">
            <label className="block text-[15px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">
              단체명
            </label>
            <input
              type="text"
              placeholder="단체명을 입력주세요."
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="w-full h-[48px] px-4 border text-[15px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
            />
          </div>

          {/* 담당자명 */}
          <div className="mb-8">
            <label className="block text-[15px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">
              담당자명
            </label>
            <input
              type="text"
              placeholder="담당자명을 입력해주세요."
              value={formData.advisorName}
              onChange={(e) =>
                setFormData({ ...formData, advisorName: e.target.value })
              }
              className="w-full h-[48px] px-4 border text-[15px] border-gray-300 rounded-xl focus:outline-none focus:border-[#008FFF]"
            />
          </div>

          {/* 개인정보 수집 및 이용 동의 */}
          <div className="mb-12">
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

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/signup/student/step1')}
              className="flex-1 h-[48px] border border-[#008FFF] text-[#008FFF] rounded-lg text-[15px] font-semibold hover:bg-[#008FFF] hover:text-white transition-colors"
            >
              이전
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`flex-1 h-[48px] rounded-lg text-[15px] font-semibold transition-colors ${
                isFormValid
                  ? 'bg-[#008FFF] text-white hover:bg-[#0077CC]'
                  : 'bg-gray-200 text-[#B4BBC7]'
              }`}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}