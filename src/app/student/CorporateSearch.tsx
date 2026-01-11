import React, { useState } from 'react';
import CorporateLayout from '@/components/layout/CorporateLayout';
import { Search, RotateCcw, Calendar, ChevronDown } from 'lucide-react';
import DateRangeInput from '@/components/common/input/DateRangeInput';

/* =========================
   타입 정의
========================= */
interface Company {
  id: string;
  name: string;
  imageUrl?: string;
  startDate: string;
  endDate?: string;
  isAlways?: boolean;
  tag: '샘플링' | '제휴';
}

/* =========================
   기간 세그먼트 버튼 컴포넌트
========================= */
function PeriodSegment({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex rounded-lg border border-[#E6E8EC] overflow-hidden h-[48px]">
      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`
            h-full px-6 text-[14px] font-medium transition-colors
            ${index !== options.length - 1 ? 'border-r border-[#E6E8EC]' : ''}
            ${
              value === option.value
                ? 'bg-[#E3F4FF] text-[#007AFF]'
                : 'bg-white text-[#6C727E] hover:bg-[#F9FAFB]'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/* =========================
   드롭다운 컴포넌트
========================= */
function Dropdown({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-between
          h-[48px] w-[180px] px-4 rounded-lg
          border border-[#E6E8EC] bg-white
          text-[14px] text-[#6C727E]
          hover:bg-[#F9FAFB] transition-colors
        "
      >
        <span className={selectedOption ? 'text-[#2D3139]' : 'text-[#9AA1AD]'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-[#9AA1AD]" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="
            absolute top-[52px] left-0 z-20
            w-[180px] py-2 rounded-lg
            border border-[#E6E8EC] bg-white shadow-lg
          ">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-2.5 text-left text-[14px]
                  hover:bg-[#F4FAFF] transition-colors
                  ${value === option.value ? 'text-[#007AFF] bg-[#F4FAFF]' : 'text-[#2D3139]'}
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* =========================
   기업 카드 컴포넌트
========================= */
function CompanyCard({ data }: { data: Company }) {
  const formatDate = () => {
    if (data.isAlways) {
      return '상시';
    }
    if (data.endDate) {
      return `${data.startDate} ~ ${data.endDate}`;
    }
    return data.startDate;
  };

  return (
    <div className="
      h-[306px] rounded-2xl border border-[#E6E8EC] bg-white overflow-hidden
      hover:shadow-md hover:border-[#007AFF]
      transition-all cursor-pointer flex flex-col
    ">
      {/* 이미지 영역 */}
      <div className="relative w-full flex-1 bg-[#2E7D5B] flex items-center justify-center">
        {data.imageUrl ? (
          <img
            src={data.imageUrl}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        ) : (
          /* 기본 플레이스홀더 - 본문 로고 스타일 */
          <div className="flex flex-col items-center justify-center text-white/90">
            <div className="text-[72px] font-bold leading-none tracking-tighter">
              <span className="block">본</span>
              <span className="block -mt-2">문</span>
            </div>
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="p-4">
        {/* 기업명 */}
        <h3 className="text-[24px] font-semibold leading-[28px] tracking-[-0.36px] text-[#191F28]">
          {data.name}
        </h3>

        {/* 날짜 + 태그 */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5 text-[16px] font-semibold leading-[24px] tracking-[-0.24px] text-[#6C727E]">
            <Calendar className="w-4 h-4" />
            <span>{formatDate()}</span>
          </div>

          <span className="
            flex justify-center items-center gap-[10px]
            py-1 px-2 rounded-[16px] bg-[#EBEEF3]
            text-[12px] font-semibold leading-[150%] text-[#949BA7]
          ">
            {data.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================
   메인 컴포넌트
========================= */
export default function CorporateSearch() {
  /* 검색어 */
  const [searchQuery, setSearchQuery] = useState('');

  /* 기간 필터 */
  const [periodFilter, setPeriodFilter] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  /* 업종 필터 */
  const [industryFilter, setIndustryFilter] = useState('');

  const industryOptions = [
    { label: '전체', value: 'all' },
    { label: '샘플링', value: 'sampling' },
    { label: '제휴', value: 'partnership' },
    { label: '광고', value: 'advertisement' },
    { label: '이벤트', value: 'event' },
  ];

  /* 초기화 */
  const handleReset = () => {
    setSearchQuery('');
    setPeriodFilter(null);
    setStartDate('');
    setEndDate('');
    setIndustryFilter('');
  };

  /* 더미 데이터 */
  const dummyData: Company[] = [
    {
      id: '1',
      name: '크라이치즈버거',
      startDate: '12/02',
      endDate: '3/31',
      tag: '샘플링',
    },
    {
      id: '2',
      name: '크라이치즈버거',
      isAlways: true,
      startDate: '',
      tag: '샘플링',
    },
    {
      id: '3',
      name: '크라이치즈버거',
      startDate: '12/02',
      endDate: '3/31',
      tag: '샘플링',
    },
    {
      id: '4',
      name: '크라이치즈버거',
      startDate: '12/02',
      endDate: '3/31',
      tag: '샘플링',
    },
    {
      id: '5',
      name: '크라이치즈버거',
      startDate: '12/02',
      endDate: '3/31',
      tag: '샘플링',
    },
    {
      id: '6',
      name: '크라이치즈버거',
      startDate: '12/02',
      endDate: '3/31',
      tag: '샘플링',
    },
  ];

  return (
    <CorporateLayout>
      <div className="flex flex-col h-full w-full max-w-[1200px] mx-auto px-6">
        {/* ================= 페이지 헤더 ================= */}
        <div className="mt-4 mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" alt="" className="w-5 h-5" />
            <h1 className="text-[20px] font-semibold text-[#2D3139]">
              학생 단체 조회
            </h1>
          </div>
        </div>
        <div className="border-t border-gray-200 mb-6 flex-shrink-0" />

        {/* ================= 필터 영역 ================= */}
        <div className="flex flex-col gap-4 mb-8 flex-shrink-0">
          {/* 검색 */}
          <div className="flex items-center gap-4">
            <span className="text-[14px] text-[#949BA7] w-[32px]">검색</span>
            <div className="flex-1 max-w-[400px]">
              <input
                type="text"
                placeholder="기업 및 제품/서비스명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full h-[48px] px-4 rounded-lg
                  border border-[#E6E8EC] bg-white
                  text-[14px] text-[#2D3139]
                  placeholder:text-[#9AA1AD]
                  outline-none focus:border-[#007AFF]
                "
              />
            </div>
          </div>

          {/* 기간 */}
          <div className="flex items-center gap-4">
            <span className="text-[14px] text-[#949BA7] w-[32px]">기간</span>
            <div className="flex items-center gap-3">
              <PeriodSegment
                options={[
                  { label: '상시', value: 'always' },
                  { label: '1개월', value: '1month' },
                  { label: '3개월', value: '3month' },
                  { label: '6개월', value: '6month' },
                ]}
                value={periodFilter}
                onChange={(v) => setPeriodFilter(v)}
              />

              <DateRangeInput
                startPlaceholder="시작일..."
                endPlaceholder="종료일..."
                height={48}
                inputWidth={140}
                startValue={startDate}
                endValue={endDate}
                onStartChange={(v) => {
                  setStartDate(v);
                  setPeriodFilter('custom');
                }}
                onEndChange={(v) => {
                  setEndDate(v);
                  setPeriodFilter('custom');
                }}
              />
            </div>
          </div>

          {/* 업종 + 버튼 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[14px] text-[#949BA7] w-[32px]">업종</span>
              <Dropdown
                value={industryFilter}
                onChange={setIndustryFilter}
                options={industryOptions}
                placeholder="협업 방식 선택"
              />
            </div>

            {/* 초기화 / 조회 버튼 */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="
                  flex items-center gap-2 px-5 py-2.5
                  rounded-lg border border-[#007AFF]
                  text-[#007AFF] text-[14px] font-medium
                  hover:bg-[#F4FAFF] transition-colors
                "
              >
                <RotateCcw className="w-4 h-4" />
                초기화
              </button>
              <button
                type="button"
                className="
                  flex items-center gap-2 px-5 py-2.5
                  rounded-lg bg-[#007AFF]
                  text-white text-[14px] font-medium
                  hover:bg-[#0066DD] transition-colors
                "
              >
                <Search className="w-4 h-4" />
                조회
              </button>
            </div>
          </div>
        </div>

        {/* ================= 카드 그리드 ================= */}
        <div className="flex-1 overflow-y-auto pb-8">
          <div className="grid grid-cols-3 gap-5">
            {dummyData.map((item) => (
              <CompanyCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </CorporateLayout>
  );
}