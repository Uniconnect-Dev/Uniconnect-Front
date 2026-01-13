import React from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';
import { api } from '@/lib/api/client';

import { useState, useEffect, useRef } from 'react';

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
} from 'lucide-react';

import Th from '../../../components/common/tableRelated/Th';
import SortableTh from '@/components/common/tableRelated/SortableTh';
import Tr from '@/components/common/tableRelated/Tr';
import Td from '@/components/common/tableRelated/Td';

type ContractStatus = 'send' | 'before-sign' | 'complete';

interface ContractData {
  id: string;
  date: string;
  organizationName: string;
  collaborationType: string;
  status: ContractStatus;
}

const contractData: ContractData[] = [
  {
    id: '01',
    date: '2025.12.29',
    organizationName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    collaborationType: '샘플링',
    status: 'send',
  },
  {
    id: '02',
    date: '2025.12.29',
    organizationName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    collaborationType: '샘플링',
    status: 'before-sign',
  },
  {
    id: '03',
    date: '2025.12.29',
    organizationName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    collaborationType: '샘플링',
    status: 'complete',
  },
  {
    id: '04',
    date: '2025.12.29',
    organizationName:
      '이화여대 중앙 실전 IT 창업 학회 UNIS이화여대 중앙 실전 IT 창업 학회 UNIS',
    collaborationType: '샘플링',
    status: 'before-sign',
  },
];

function ContractTable({
  contracts,
  isFilterOpen,
  setIsFilterOpen,
  onApplyFilter,
}: {
  contracts: ContractData[];
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onApplyFilter: (filters: any) => void;
}) {
  return (
    <div className="w-full h-full rounded-3xl outline outline-1 outline-zinc-200 bg-white flex flex-col overflow-hidden relative">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-white border-b border-zinc-200 sticky top-0 z-10">
            <tr className="h-14">
              <Th className="w-24">연번</Th>
              <SortableTh className="w-32">매칭 성사일</SortableTh>
              <SortableTh>단체명</SortableTh>
              <Th className="w-40">협업 형태</Th>
              <Th className="w-28 text-center">계약서 상세</Th>
              <SortableTh className="w-32">계약 상태</SortableTh>
            </tr>
          </thead>

          <tbody>
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  조회된 계약 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              contracts.map((contract) => (
                <Tr key={contract.id}>
                  <Td className="w-24 first:pl-7">{contract.id}</Td>
                  <Td className="w-32">{contract.date}</Td>
                  <Td>
                    <div className="line-clamp-1">
                      {contract.organizationName}
                    </div>
                  </Td>
                  <Td className="w-40">{contract.collaborationType}</Td>
                  <Td className="w-28 text-center">
                    <ContractDetail status={contract.status} />
                  </Td>
                  <Td className="w-32 last:pr-7">
                    <ContractStatusBadge status={contract.status} />
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
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
            onApplyFilter={onApplyFilter}
          />
        </div>
      )}
    </div>
  );
}

/* 계약서 상세 버튼 */
function ContractDetail({ status }: { status: ContractStatus }) {
  if (status === 'send') {
    return (
      <div className="flex justify-center">
        <span className="text-gray-600">-</span>
      </div>
    );
  }

  if (status === 'before-sign') {
    return (
      <div className="flex justify-center">
        <div className="h-6 px-3 bg-gray-100 rounded-lg inline-flex items-center whitespace-nowrap">
          <span className="text-gray-600 text-xs font-semibold">
            계약서 보기
          </span>
        </div>
      </div>
    );
  }

  // complete
  return (
    <div className="flex justify-center">
      <div className="h-6 px-3 bg-sky-100 rounded-lg inline-flex items-center whitespace-nowrap">
        <span className="text-blue-600 text-xs font-semibold">서명본 보기</span>
      </div>
    </div>
  );
}

/* 계약 상태 배지 */
function ContractStatusBadge({ status }: { status: ContractStatus }) {
  if (status === 'send') {
    return (
      <div className="flex justify-start">
        <div className="h-6 pl-2 pr-3 bg-sky-100 rounded-lg inline-flex items-center gap-1">
          <Plus size={16} color="#007AFF" />
          <span className="text-blue-600 text-xs font-semibold whitespace-nowrap">
            계약서 전송
          </span>
        </div>
      </div>
    );
  }

  if (status === 'before-sign') {
    return (
      <div className="flex justify-start">
        <span className="px-2 py-0.5 bg-slate-100 rounded-3xl text-gray-400 text-xs font-semibold whitespace-nowrap">
          서명 전
        </span>
      </div>
    );
  }

  // complete
  return (
    <div className="flex justify-start">
      <span className="px-2 py-0.5 bg-emerald-50 rounded-3xl text-emerald-600 text-xs font-semibold whitespace-nowrap">
        계약 체결됨
      </span>
    </div>
  );
}

/* ---------- Search and Filter ---------- */

function Searchinput({
  placeholder,
  value,
  onChange,
  onSearch,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative w-80">
      <Search
        size={20}
        color="#6C727E"
        className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={onSearch}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
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
  onApplyFilter,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: {
    period: string;
    startDate: string;
    endDate: string;
    collaborationType: string;
    contractStatus: string[];
  }) => void;
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('3개월');
  const [selectedType, setSelectedType] = useState('샘플링');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const periods = ['상시', '1개월', '3개월', '6개월'];
  const types = ['샘플링', '장기 협업', '할인형 제휴', '기타'];
  const statuses = ['계약서 전송 필요', '서명 전', '계약 체결됨'];

  const statusMap: { [key: string]: string } = {
    '계약서 전송 필요': 'SEND',
    '서명 전': 'BEFORE_SIGN',
    '계약 체결됨': 'COMPLETE',
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleReset = () => {
    setSelectedPeriod('3개월');
    setSelectedType('샘플링');
    setSelectedStatus([]);
    setStartDate('');
    setEndDate('');
  };

  const handleApply = () => {
    const mappedStatuses = selectedStatus.map((s) => statusMap[s]);

    onApplyFilter({
      period: selectedPeriod,
      startDate: startDate || '2025-01-13',
      endDate: endDate || '2025-01-13',
      collaborationType: selectedType,
      contractStatus: mappedStatuses,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-96 h-full rounded-[32px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-gray-100 bg-white flex flex-col overflow-hidden">
      {/* Header */}
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

      {/* Body */}
      <div className="px-9 pt-5 pb-9 bg-white flex flex-col gap-10 overflow-y-auto">
        {/* 협업 기간 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" />
            <div className="text-gray-500 text-base font-semibold leading-6">
              협업 기간
            </div>
          </div>

          <div className="w-80 flex flex-col gap-4">
            {/* Period Selector */}
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

            {/* Date Range */}
            <Dateinput
              placeholder="0000.00.00"
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </div>
        </div>

        {/* 협업 형태 */}
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

        {/* 계약 상태 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" />
            <div className="text-gray-500 text-base font-semibold leading-6">
              계약 상태
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

        {/* Action Buttons */}
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
            onClick={handleApply}
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
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

function Dateinput({
  placeholder,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateinputProps) {
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

  const formatDateForAPI = (dateStr: string) => {
    // "2025.01.13" -> "2025-01-13"
    return dateStr.replace(/\./g, '-');
  };

  const handleDateSelect = (date: Date) => {
    const formatted = formatDate(date);
    if (activeInput === 'start') {
      onStartDateChange(formatDateForAPI(formatted));
      setIsStartOpen(false);
    } else if (activeInput === 'end') {
      onEndDateChange(formatDateForAPI(formatted));
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
            value={startDate.replace(/-/g, '.')}
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
            value={endDate.replace(/-/g, '.')}
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

export default function Contract() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [contracts, setContracts] = useState<ContractData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async (
    filters?: {
      period?: string;
      startDate?: string;
      endDate?: string;
      collaborationType?: string;
      contractStatus?: string[];
    },
    search?: string
  ) => {
    setIsLoading(true);

    try {
      // POST를 GET으로 변경하고 쿼리 파라미터로 전송
      const params = new URLSearchParams({
        period: filters?.period || '3개월',
        startDate: filters?.startDate || '2025-01-13',
        endDate: filters?.endDate || '2025-01-13',
        collaborationType: filters?.collaborationType || '샘플링',
        contractStatus: filters?.contractStatus?.[0] || 'SEND',
        searchTerm: search || '',
      });

      const response = await api.get(`/api/contracts?${params.toString()}`);

      if (response.data?.success && response.data?.data) {
        let formattedData = response.data.data.map(
          (item: any, index: number) => ({
            id: String(index + 1).padStart(2, '0'),
            date: item.matchedAt,
            organizationName: item.studentClub,
            collaborationType: item.collaborationType,
            status: mapContractStatus(item.contractStatus),
          })
        );

        if (search) {
          formattedData = formattedData.filter((contract: ContractData) =>
            contract.organizationName
              .toLowerCase()
              .includes(search.toLowerCase())
          );
        }

        setContracts(formattedData);
      } else {
        setContracts([]);
      }
    } catch (err) {
      console.error('계약 데이터 로드 실패:', err);
      setContracts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    loadContracts(undefined, searchTerm);
  };

  const handleApplyFilter = (filters: {
    period: string;
    startDate: string;
    endDate: string;
    collaborationType: string;
    contractStatus: string[];
  }) => {
    loadContracts(filters, searchTerm);
  };

  const mapContractStatus = (status: string): ContractStatus => {
    if (status === 'PENDING' || status === 'SEND') return 'send';
    if (status === 'BEFORE_SIGN' || status === 'UNSIGNED') return 'before-sign';
    if (status === 'COMPLETE' || status === 'SIGNED') return 'complete';
    return 'send';
  };

  return (
    <StudentLayout>
      <div className="flex flex-col h-full">
        <div className="flex justify-between w-full flex-1">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-2">
              <img src="/building.svg" />
              <p className="text-zinc-700 text-xl font-bold">계약서 작성</p>
            </div>
            <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
            <div className="flex flex-row">
              <Searchinput
                placeholder="단체명 검색 .."
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={handleSearch}
              />
              <div className="flex flex-1"></div>
              <FilterButton onClick={() => setIsFilterOpen(true)} />
            </div>
            <div className="flex-1 flex flex-col">
              <ContractTable
                contracts={contracts}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                onApplyFilter={handleApplyFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
