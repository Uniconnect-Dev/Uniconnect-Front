import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/lib/auth/token';

import { useNavigate } from 'react-router-dom';

import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Calendar,
  RotateCw,
  ArrowUpRight,
} from 'lucide-react';

import Th from '../../../components/common/tableRelated/Th';
import SortableTh from '@/components/common/tableRelated/SortableTh';
import Tr from '@/components/common/tableRelated/Tr';
import Td from '@/components/common/tableRelated/Td';

type MatchingStatus = 'waiting' | 'successed' | 'faild';
type Process =
  | 'contractConfirmed'
  | 'contractWriting'
  | 'manageForm'
  | 'sendProduct'
  | 'dataReport'
  | 'payment';

type collaborationType = 'sampling' | 'partnership';

interface MatchingData {
  id: string;
  date: string;
  organizationName: string;
  collaborationType: collaborationType;
  status: MatchingStatus;
  process: Process;
}

interface MatchingAPIResponse {
  matchingId: number;
  studentClub: string;
  collaborationType: string;
  matchedAt: string;
}

function MatchingTable({
  matchings,
  isFilterOpen,
  setIsFilterOpen,
}: {
  matchings: MatchingData[];
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-full h-full rounded-3xl outline outline-1 outline-zinc-200 bg-white flex flex-col overflow-hidden relative">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-white border-b border-zinc-200 sticky top-0 z-10">
            <tr className="h-14">
              <Th className="w-24">연번</Th>
              <SortableTh className="w-32">희망 협업일</SortableTh>
              <SortableTh>기업명</SortableTh>
              <Th className="w-28">협업 유형</Th>
              <SortableTh className="w-28">매칭 상태</SortableTh>
              <SortableTh className="w-32">프로세스</SortableTh>
            </tr>
          </thead>

          <tbody>
            {matchings.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  조회된 매칭 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              matchings.map((matching) => (
                <Tr key={matching.id}>
                  <Td className="w-24 first:pl-7">{matching.id}</Td>
                  <Td className="w-32">{matching.date}</Td>
                  <Td>
                    <div className="line-clamp-1">
                      {matching.organizationName}
                    </div>
                  </Td>
                  <Td className="w-28">
                    <CollaborationTypeTag type={matching.collaborationType} />
                  </Td>
                  <Td className="w-28">
                    <MatchingStatus status={matching.status} />
                  </Td>
                  <Td className="w-32 last:pr-7">
                    <Process
                      status={matching.process}
                      matchingId={matching.id}
                    />
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="h-14 px-5 border-t border-zinc-200 bg-white flex justify-end items-center gap-[29px] flex-shrink-0">
        <div className="flex items-center gap-7">
          <ChevronsLeft size={20} color="#DADFE7" />
          <ChevronLeft size={20} color="#DADFE7" />
          <div className="text-gray-400 text-sm font-medium">1 페이지</div>
          <ChevronRight size={20} color="#DADFE7" />
          <ChevronsRight size={20} color="#DADFE7" />
        </div>
      </div>

      {isFilterOpen && (
        <div className="absolute right-0 top-0 bottom-0 z-50">
          <FilterPanel
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

function MatchingStatus({ status }: { status: MatchingStatus }) {
  if (status === 'waiting') {
    return (
      <div className="px-2 py-0.5 bg-gray-100 rounded-3xl inline-flex justify-center items-center gap-2.5">
        <div className="text-gray-400 text-xs font-semibold">대기 중</div>
      </div>
    );
  }

  if (status === 'successed') {
    return (
      <div className="px-2 py-0.5 bg-emerald-50 rounded-3xl inline-flex justify-center items-center gap-2.5">
        <div className="text-emerald-600 text-xs font-semibold">매칭 성공</div>
      </div>
    );
  }

  return (
    <div className="px-2 py-0.5 bg-pink-100 rounded-3xl inline-flex justify-center items-center gap-2.5">
      <div className="text-red-500 text-xs">매칭 실패</div>
    </div>
  );
}

function Process({
  status,
  matchingId,
}: {
  status: Process;
  matchingId: string;
}) {
  const navigate = useNavigate();

  // 1. 화면에 표시될 텍스트 매핑
  const labelMap: Record<Process, string> = {
    contractConfirmed: '계약 확정',
    contractWriting: '계약서 작성',
    manageForm: '설문지 관리',
    sendProduct: '제품 발송',
    dataReport: '데이터 리포트',
    payment: '정산/결제',
  };

  // 2. 각 상태별로 이동할 "임의의 경로" 매핑
  // matchingId를 경로에 포함시켜서 어떤 데이터의 상세인지 구분할 수 있게 했습니다.
  const pathMap: Record<Process, string> = {
    contractConfirmed: `/corporatemypage/contract/confirm/${matchingId}`,
    contractWriting: `/corporatemypage/contract/`,
    manageForm: `/corporatemypage/survey/pollmanage`,
    sendProduct: `/corporatemypage/dashboard`,
    dataReport: `/corporatemypage/pollmanage`,
    payment: `/corporatemypage/paymenthistory`, // 아까 만드신 결제 상세 페이지
  };

  const handleNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 해당되는 경로로 이동
    const targetPath = pathMap[status];
    if (targetPath) {
      navigate(targetPath);
    }
  };

  return (
    <button
      onClick={handleNavigation}
      className="h-6 pl-3 pr-2 bg-sky-100 rounded-lg inline-flex items-center gap-0.5 text-blue-600 whitespace-nowrap hover:bg-sky-200 transition-colors cursor-pointer"
    >
      <span className="text-xs font-semibold">{labelMap[status]}</span>
      <ArrowUpRight size={14} />
    </button>
  );
}

function CollaborationTypeTag({ type }: { type: collaborationType }) {
  const labelMap: Record<collaborationType, string> = {
    sampling: '샘플링',
    partnership: '할인형 제휴',
  };

  return (
    <div className="px-2 py-0.5 bg-gray-100 rounded-3xl inline-flex justify-center items-center gap-2.5">
      <div className="text-gray-400 text-xs font-semibold">
        {labelMap[type]}
      </div>
    </div>
  );
}

function Searchinput({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative w-44">
      <Search
        size={20}
        color="#6C727E"
        className="absolute left-4 top-1/2 -translate-y-1/2"
      />
      <input
        placeholder={placeholder}
        className="
          w-full
          pl-11 pr-4 py-4
          rounded-xl
          outline outline-1 outline-zinc-200
          placeholder:text-zinc-400
          focus:outline-zinc-300
        "
      />
    </div>
  );
}

function FilterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center gap-2
        px-4 py-3 rounded-xl
        outline outline-1 outline-zinc-200
        text-zinc-700
        hover:bg-zinc-50
        active:bg-zinc-100
        transition
      "
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
          stroke="currentColor"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-medium">필터링</span>
    </button>
  );
}

function FilterPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('3개월');
  const [selectedType, setSelectedType] = useState('할인형 제휴');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<string[]>([]);

  const periods = ['상시', '1개월', '3개월', '6개월'];
  const types = ['샘플링', '장기 협업', '할인형 제휴', '기타'];
  const statuses = ['대기 중', '매칭 완료', '매칭 실패'];
  const process = [
    '계약 확정',
    '계약서 작성',
    '설문지 관리',
    '제품 발송',
    '데이터 리포트',
    '정산 / 결제',
    '협업 종료',
  ];

  const handleStatusToggle = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleProcessToggle = (process: string) => {
    setSelectedProcess((prev) =>
      prev.includes(process)
        ? prev.filter((s) => s !== process)
        : [...prev, process]
    );
  };

  const handleReset = () => {
    setSelectedPeriod('3개월');
    setSelectedType('할인형 제휴');
    setSelectedStatus([]);
    setSelectedProcess([]);
  };

  if (!isOpen) return null;

  return (
    <div className="w-96 h-full rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-gray-100 bg-white flex flex-col overflow-hidden">
      <div className="pl-9 pr-7 pt-6 pb-4 bg-white border-b border-gray-100 flex justify-between items-center">
        <div className="text-gray-900 text-xl font-semibold leading-8">
          필터링
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 hover:bg-gray-100 rounded transition-colors flex items-center justify-center"
        >
          <X size={20} color="#9CA3AF" />
        </button>
      </div>

      <div className="px-9 pt-5 pb-9 bg-white flex flex-col gap-10 overflow-y-auto">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" />
            <div className="text-gray-500 text-base font-semibold leading-6">
              희망 협업일
            </div>
          </div>

          <div className="w-80 flex flex-col gap-4">
            <div className="rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 flex overflow-hidden">
              {periods.map((period) => (
                <div
                  key={period}
                  className="flex-1 p-1.5 bg-white flex justify-center items-center"
                >
                  <button
                    onClick={() => setSelectedPeriod(period)}
                    className={`flex-1 px-3 py-1.5 rounded-lg flex justify-center items-center transition-colors ${
                      selectedPeriod === period ? 'bg-sky-100' : ''
                    }`}
                  >
                    <div
                      className={`text-base font-medium leading-6 ${
                        selectedPeriod === period
                          ? 'text-sky-500'
                          : 'text-gray-400'
                      }`}
                    >
                      {period}
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <Dateinput placeholder="0000.00.00" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" />
            <div className="text-gray-500 text-base font-semibold leading-6">
              협업 형태
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg flex items-center transition-colors ${
                  selectedType === type
                    ? 'bg-sky-100'
                    : 'outline outline-1 outline-offset-[-1px] outline-zinc-200'
                }`}
              >
                <div
                  className={`text-center text-base font-medium leading-6 ${
                    selectedType === type ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {type}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" />
            <div className="text-gray-500 text-base font-semibold leading-6">
              매칭 상태
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusToggle(status)}
                className={`px-3 py-1.5 rounded-lg flex items-center transition-colors ${
                  selectedStatus.includes(status)
                    ? 'bg-sky-100'
                    : 'outline outline-1 outline-offset-[-1px] outline-zinc-200'
                }`}
              >
                <div
                  className={`text-center text-base font-medium leading-6 ${
                    selectedStatus.includes(status)
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  {status}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" />
            <div className="text-gray-500 text-base font-semibold leading-6">
              프로세스
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {process.map((proc) => (
              <button
                key={proc}
                onClick={() => handleProcessToggle(proc)}
                className={`px-3 py-1.5 rounded-lg flex items-center transition-colors ${
                  selectedProcess.includes(proc)
                    ? 'bg-sky-100'
                    : 'outline outline-1 outline-offset-[-1px] outline-zinc-200'
                }`}
              >
                <div
                  className={`text-center text-base font-medium leading-6 ${
                    selectedProcess.includes(proc)
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  {proc}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500 flex justify-center items-center gap-1 hover:bg-sky-50 transition-colors"
          >
            <RotateCw size={15} color="#007aff" />
            <div className="text-center text-sky-500 text-base font-medium leading-6">
              초기화
            </div>
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-blue-600 rounded-xl flex justify-center items-center gap-1 hover:bg-blue-700 transition-colors"
          >
            <Search size={15} color="#ffffff" />
            <div className="text-center text-white text-base font-medium leading-6">
              조회
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

interface DateinputProps {
  placeholder?: string;
}

function Dateinput({ placeholder }: DateinputProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsStartOpen(false);
        setIsEndOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  };

  const handleDateSelect = (date: Date) => {
    const formatted = formatDate(date);
    if (activeInput === 'start') {
      setStartDate(formatted);
      setIsStartOpen(false);
    } else if (activeInput === 'end') {
      setEndDate(formatted);
      setIsEndOpen(false);
    }
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = `${currentMonth.getFullYear()}.${String(
    currentMonth.getMonth() + 1
  ).padStart(2, '0')}`;

  return (
    <div ref={containerRef} className="flex flex-1 flex-col gap-2 relative">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={startDate}
            readOnly
            onFocus={() => {
              setActiveInput('start');
              setIsStartOpen(true);
              setIsEndOpen(false);
            }}
            placeholder={placeholder}
            className="w-full p-4 pl-12 rounded-xl outline outline-1 outline-zinc-200"
          />
        </div>

        <span>~</span>

        <div className="relative flex-1">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={endDate}
            readOnly
            onFocus={() => {
              setActiveInput('end');
              setIsEndOpen(true);
              setIsStartOpen(false);
            }}
            placeholder={placeholder}
            className="w-full p-4 pl-12 rounded-xl outline outline-1 outline-zinc-200"
          />
        </div>
      </div>

      {(isStartOpen || isEndOpen) && (
        <div className="absolute top-full mt-4 w-80 bg-white rounded-2xl z-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1
                  )
                )
              }
            >
              &lt;
            </button>
            <span className="font-bold">{monthYear}</span>
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1
                  )
                )
              }
            >
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 text-xs text-gray-300 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
              <div key={d} className="text-center">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, idx) =>
              day ? (
                <button
                  key={idx}
                  onClick={() => handleDateSelect(day)}
                  className="w-10 h-10 rounded-lg text-gray-500 hover:bg-sky-100 hover:text-sky-500"
                >
                  {day.getDate()}
                </button>
              ) : (
                <div key={idx} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TabFilter() {
  const [selectedTab, setSelectedTab] = useState<string>('all');

  interface TabItem {
    id: string;
    label: string;
    count: number;
    activeBg: string;
    activeText: string;
    activeBadge: string;
  }

  const tabs: TabItem[] = [
    {
      id: 'all',
      label: '요청한 매칭',
      count: 99,
      activeBg: 'bg-sky-100',
      activeText: 'text-sky-500',
      activeBadge: 'bg-sky-500',
    },
    {
      id: 'pending',
      label: '받은 요청',
      count: 2,
      activeBg: 'bg-gray-100',
      activeText: 'text-gray-500',
      activeBadge: 'bg-gray-500',
    },
  ];

  return (
    <div className="w-80 pl-px rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex items-center overflow-hidden">
      {tabs.map((tab) => {
        const isActive = selectedTab === tab.id;

        return (
          <div
            key={tab.id}
            className="flex-1 p-1.5 bg-white flex justify-center items-center"
          >
            <button
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 px-3 py-1.5 rounded-lg flex justify-center items-center gap-1.5 transition-colors ${
                isActive ? tab.activeBg : ''
              }`}
            >
              <div
                className={`text-base leading-6 whitespace-nowrap ${
                  isActive
                    ? `font-semibold ${tab.activeText}`
                    : 'font-medium text-gray-400'
                }`}
              >
                {tab.label}
              </div>

              <div
                className={`px-1 rounded-3xl flex justify-center items-center ${
                  isActive ? `pl-[5px] pr-1 ${tab.activeBadge}` : 'bg-gray-400'
                }`}
              >
                <div className="text-white text-xs font-semibold leading-4 whitespace-nowrap">
                  {tab.count > 99 ? '99+' : tab.count}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Overview({
  counts,
}: {
  counts: { total: number; success: number; waiting: number; failed: number };
}) {
  return (
    <div className="w-full h-20 inline-flex gap-2">
      <div className="flex-1 self-stretch px-5 py-3 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-100 flex justify-between items-center">
        <div className="w-12 inline-flex flex-col justify-start items-start">
          <p className="self-stretch justify-start text-gray-400 text-xs font-semibold">
            전체 매칭
          </p>
          <p className="self-stretch justify-start text-zinc-700 text-xl font-bold">
            {counts.total}
          </p>
        </div>
        <img src="/totalmatching.svg" />
      </div>
      <div className="flex-1 self-stretch px-5 py-3 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-100 flex justify-between items-center">
        <div className="w-12 inline-flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-gray-400 text-xs font-semibold font-['Pretendard'] leading-4">
            매칭 완료
          </div>
          <div className="self-stretch justify-start text-emerald-600 text-xl font-bold font-['Pretendard'] leading-8">
            {counts.success}
          </div>
        </div>
        <img src="/matchingcompleated.svg" />
      </div>
      <div className="flex-1 self-stretch px-5 py-3 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-100 flex justify-between items-center">
        <div className="w-12 inline-flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-gray-400 text-xs font-semibold font-['Pretendard'] leading-4">
            대기 중
          </div>
          <div className="self-stretch justify-start text-gray-600 text-xl font-bold font-['Pretendard'] leading-8">
            {counts.waiting}
          </div>
        </div>
        <img src="/waiting.svg" />
      </div>
      <div className="flex-1 self-stretch px-5 py-3 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-100 flex justify-between items-center">
        <div className="w-12 inline-flex flex-col justify-start items-start">
          <div className="self-stretch justify-start text-gray-400 text-xs font-semibold font-['Pretendard'] leading-4">
            매칭 실패
          </div>
          <div className="self-stretch justify-start text-red-600 text-xl font-bold font-['Pretendard'] leading-8">
            {counts.failed}
          </div>
        </div>
        <div className="w-10 h-10 relative bg-pink-100 rounded-xl inline-flex justify-center items-center">
          <img src="/matchingfailed.svg" />
        </div>
      </div>
    </div>
  );
}

export default function MatchingResult() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [matchings, setMatchings] = useState<MatchingData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counts, setCounts] = useState({
    total: 0,
    success: 0,
    waiting: 0,
    failed: 0,
  });

  useEffect(() => {
    loadMatchings();
  }, []);

  const loadMatchings = async () => {
    setIsLoading(true);
    const token = getAccessToken();

    console.log('================ DEBUG MATCHING API ================');
    console.log(
      'API URL:',
      `${import.meta.env.VITE_API_BASE_URL}/api/contracts/matchings/company`
    );
    console.log('Access Token:', token);
    console.log('Token exists:', !!token);
    console.log('====================================================');

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/contracts/matchings/student-org`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('✅ RESPONSE STATUS:', response.status);
      console.log('✅ RESPONSE DATA:', response.data);

      if (response.data?.success && response.data?.data) {
        const formattedData: MatchingData[] = response.data.data.map(
          (item: MatchingAPIResponse, index: number) => {
            // 날짜 안전하게 처리
            let formattedDate = '-';
            if (item.matchedAt) {
              try {
                const date = new Date(item.matchedAt);
                // 유효한 날짜인지 확인
                if (!isNaN(date.getTime())) {
                  formattedDate = date
                    .toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                    .replace(/\. /g, '.')
                    .replace(/\.$/, '');
                }
              } catch (e) {
                console.error('날짜 변환 에러:', e);
              }
            }

            return {
              id: String(index + 1).padStart(2, '0'),
              date: formattedDate,
              organizationName: item.studentClub || '정보 없음',
              collaborationType:
                item.collaborationType === '샘플링'
                  ? 'sampling'
                  : 'partnership',
              status: 'waiting',
              process: 'contractConfirmed',
            };
          }
        );

        setMatchings(formattedData);

        setCounts({
          total: formattedData.length,
          success: 0,
          waiting: formattedData.length,
          failed: 0,
        });
      } else {
        console.warn('⚠️ success=false or data 없음', response.data);
        setMatchings([]);
      }
    } catch (err: any) {
      console.error('❌ MATCHING API ERROR');

      if (axios.isAxiosError(err)) {
        console.error('STATUS:', err.response?.status);
        console.error('RESPONSE DATA:', err.response?.data);
        console.error('HEADERS:', err.response?.headers);
      } else {
        console.error(err);
      }

      setMatchings([]);
      setCounts({ total: 0, success: 0, waiting: 0, failed: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CorporateLayout>
      <div className="flex flex-col h-full">
        <div className="flex justify-between w-full flex-1">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-2">
              <img src="/building.svg" />
              <p className="text-zinc-700 text-xl font-bold">매칭 결과</p>
            </div>
            <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100 mb-1" />
            <Overview counts={counts} />
            <div className="flex flex-row justify-between mt-3">
              <TabFilter />
              <div className="flex flex-row gap-4">
                <Searchinput placeholder="학생 단체명 검색 .." />
                <FilterButton onClick={() => setIsFilterOpen(true)} />
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <MatchingTable
                matchings={matchings}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </CorporateLayout>
  );
}
