import React, { useState, useEffect } from 'react';
import CorporateLayout from '@/components/layout/CorporateLayout';
import { Search, RotateCcw, Calendar } from 'lucide-react';
import DateRangeInput from '@/components/common/input/DateRangeInput';
import { searchStudentCampaigns } from '@/services/campaign.service';
import type { CollaborationType } from '@/services/campaign.types';

/* =========================
   타입 정의
========================= */
interface StudentGroup {
  id: string;
  type: '샘플링' | '제휴';
  quantity: number;
  university: string;
  department: string;
  eventName: string;
  startDate: string;
  endDate?: string;
  imageUrl?: string;
}

/* =========================
   필터 칩 컴포넌트
========================= */
function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        h-[48px] w-[92px] rounded-lg text-[14px] font-medium
        border transition-colors
        ${
          active
            ? 'bg-[#E3F4FF] border-[#007AFF] text-[#007AFF]'
            : 'bg-white border-[#E6E8EC] text-[#6C727E] hover:bg-[#F9FAFB]'
        }
      `}
    >
      {label}
    </button>
  );
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
    <div className="flex rounded-lg border border-[#E6E8EC] overflow-hidden h-[48px] w-[280px] mr-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`
            h-full flex-1 text-[14px] font-medium transition-colors
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
   학생 단체 카드 컴포넌트
========================= */
function StudentGroupCard({ data }: { data: StudentGroup }) {
  const formatDate = () => {
    if (data.endDate) {
      return `${data.startDate} ~ ${data.endDate}`;
    }
    return data.startDate;
  };

  return (
    <div className="
      p-5 rounded-2xl border border-[#E6E8EC] bg-white
      hover:shadow-md hover:border-[#007AFF]
      transition-all cursor-pointer
    ">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          {/* 태그 */}
          <span className="
            px-2.5 py-1 rounded-full text-[12px] font-medium w-fit
            bg-[#F2F4F7] text-[#6C727E]
          ">
            {data.type}
          </span>

          {/* 수량 */}
          <p className="text-[28px] font-semibold text-[#2D3139]">
            {data.quantity.toLocaleString()}개
          </p>
        </div>

        {/* 이미지 */}
        <div className="w-[64px] h-[64px] rounded-full border border-[#E6E8EC] p-1">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#4CAF50] to-[#81C784] flex items-center justify-center">
            <span className="text-white text-[20px]">🎓</span>
          </div>
        </div>
      </div>

      {/* 학교 정보 */}
      <p className="text-[14px] font-medium leading-[20px] tracking-[-0.21px] text-[#6C727E] mt-3">
        {data.university} {data.department}
      </p>

      {/* 행사명 */}
      <p className="text-[18px] font-bold leading-[28px] tracking-[-0.27px] text-[#3A404A]">
        {data.eventName}
      </p>

      {/* 날짜 */}
      <div className="flex items-center gap-1.5 mt-3 text-[16px] font-medium leading-[24px] tracking-[-0.24px] text-[#6C727E]">
        <Calendar className="w-4 h-4" />
        <span>{formatDate()}</span>
      </div>
    </div>
  );
}

/* =========================
   메인 컴포넌트
========================= */
export default function StudentGroupSearch() {
  /* 학생단체 목록 상태 */
  const [studentGroups, setStudentGroups] = useState<StudentGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  /* 검색어 */
  const [searchQuery, setSearchQuery] = useState('');

  /* 기간 필터 */
  const [periodFilter, setPeriodFilter] = useState<'1month' | '3month' | '6month' | 'custom' | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  /* 유형 필터 */
  const [typeFilters, setTypeFilters] = useState<string[]>([]);

  const toggleTypeFilter = (type: string) => {
    setTypeFilters((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  /* 날짜 포맷 변환 (YYYY.MM.DD -> YYYY-MM-DD) */
  const formatDateForApi = (dateStr: string): string => {
    if (!dateStr) return '';
    return dateStr.replace(/\./g, '-');
  };

  /* 날짜 포맷 변환 (YYYY-MM-DD -> MM/DD) */
  const formatDateForUI = (dateStr: string): string => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[1]}/${parts[2]}`;
    }
    return dateStr;
  };

  /* API 호출 */
  const fetchStudentGroups = async () => {
    setIsLoading(true);
    try {
      // collaborationType 변환
      let collaborationType: CollaborationType | undefined;
      if (typeFilters.length === 1) {
        collaborationType = typeFilters[0] === '샘플링' ? 'Sampling' : 'Partnership';
      }

      const response = await searchStudentCampaigns({
        keyword: searchQuery || undefined,
        collaborationType,
        startDate: formatDateForApi(startDate) || undefined,
        endDate: formatDateForApi(endDate) || undefined,
        page: currentPage,
        size: 9,
      });

      // API 응답을 UI 타입에 맞게 변환
      const mapped: StudentGroup[] = response.content.map((item) => ({
        id: String(item.campaignId),
        type: '샘플링' as const, // API에 type이 없어서 기본값
        quantity: item.productQuantity,
        university: item.schoolName,
        department: item.organizationName,
        eventName: item.campaignName,
        startDate: formatDateForUI(item.startDate),
        endDate: item.endDate ? formatDateForUI(item.endDate) : undefined,
        imageUrl: item.logoUrl || undefined,
      }));

      setStudentGroups(mapped);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('학생단체 캠페인 조회 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /* 초기 로딩 */
  useEffect(() => {
    fetchStudentGroups();
  }, [currentPage]);

  /* 조회 버튼 클릭 */
  const handleSearch = () => {
    setCurrentPage(0);
    fetchStudentGroups();
  };

  /* 초기화 */
  const handleReset = () => {
    setSearchQuery('');
    setPeriodFilter(null);
    setStartDate('');
    setEndDate('');
    setTypeFilters([]);
    setCurrentPage(0);
  };

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
        <div className="border-t border-gray-200 mb-4 flex-shrink-0" />

        {/* ================= 필터 영역 ================= */}
        <div className="flex flex-col gap-4 mb-8 flex-shrink-0">
          {/* 검색 */}
          <div className="flex items-center gap-1">
            <span className="text-[16px] font-regular leading-[24px] tracking-[-0.24px] text-[#949BA7] w-[40px]">검색</span>
            <div className="flex-1 max-w-[400px]">
              <input
                type="text"
                placeholder="행사 및 학교 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full h-[48px] px-4 rounded-xl
                  border border-[#E6E8EC] bg-white
                  text-[15px] text-[#2D3139]
                  placeholder:text-[#9AA1AD]
                  outline-none focus:border-[#007AFF]
                "
              />
            </div>
          </div>

          {/* 기간 */}
          <div className="flex items-center gap-1">
            <span className="text-[16px] font-regular leading-[24px] tracking-[-0.24px] text-[#949BA7] w-[40px] ">기간</span>
            <PeriodSegment
              options={[
                { label: '1개월', value: '1month' },
                { label: '3개월', value: '3month' },
                { label: '6개월', value: '6month' },
              ]}
              value={periodFilter}
              onChange={(v) => setPeriodFilter(v as '1month' | '3month' | '6month' | 'custom' | null)}
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

          {/* 유형 + 버튼 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[16px] font-regular leading-[24px] tracking-[-0.24px] text-[#949BA7] w-[40px]">유형</span>
              <div className="flex items-center gap-2">
                <FilterChip
                  label="샘플링"
                  active={typeFilters.includes('샘플링')}
                  onClick={() => toggleTypeFilter('샘플링')}
                />
                <FilterChip
                  label="제휴"
                  active={typeFilters.includes('제휴')}
                  onClick={() => toggleTypeFilter('제휴')}
                />
              </div>
            </div>

            {/* 초기화 / 조회 버튼 */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="
                  flex items-center gap-2 px-5 py-2.5
                  rounded-xl border border-[#007AFF]
                  text-[#007AFF] text-[14px] font-medium
                  hover:bg-[#F4FAFF] transition-colors
                "
              >
                <RotateCcw className="w-4 h-4" />
                초기화
              </button>
              <button
                type="button"
                onClick={handleSearch}
                disabled={isLoading}
                className="
                  flex items-center gap-2 px-5 py-2.5
                  rounded-xl bg-[#007AFF]
                  text-white text-[14px] font-medium
                  hover:bg-[#0066DD] transition-colors
                  disabled:opacity-50
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
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="w-8 h-8 border-4 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : studentGroups.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-[#6C727E]">
              <p className="text-[16px]">조회된 학생단체 캠페인이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5">
              {studentGroups.map((item) => (
                <StudentGroupCard key={item.id} data={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </CorporateLayout>
  );
}