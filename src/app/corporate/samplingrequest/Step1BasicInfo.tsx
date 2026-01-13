import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { ChevronDown, Calendar } from 'lucide-react';
import { formatDateForDisplay, formatDateForApi } from '@/lib/utils/date';

import { createSamplingProposal } from '@/services/sampling/sampling.service';

/* =========================
   공통 타입
========================= */
type InputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

/* =========================
   Text Input
========================= */
function Textinput({ label, placeholder, value, onChange }: InputProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="text-gray-500 font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 rounded-xl outline outline-1 outline-zinc-200"
      />
    </div>
  );
}

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  placeholder?: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
};

/* =========================
   산업군 옵션
========================= */
const INDUSTRY_OPTIONS: DropdownOption[] = [
  { label: 'F&B', value: 'FNB' },
  { label: '뷰티', value: 'BEAUTY' },
  { label: '교육', value: 'EDUCATION' },
  { label: '여행', value: 'TRAVEL' },
  { label: '온라인 서비스', value: 'ONLINE_SERVICE' },
  { label: '문구/사무용품', value: 'STATIONERY' },
  { label: 'IT/통신사', value: 'IT_TELECOM' },
  { label: '기타', value: 'ETC' },
];

/* =========================
   샘플링 목적 옵션
========================= */
const PURPOSE_OPTIONS: DropdownOption[] = [
  { label: '신제품 홍보', value: 'NEW_PRODUCT' },
  { label: '브랜드 인지도 향상', value: 'BRAND_AWARENESS' },
  { label: '타겟 고객 확보', value: 'TARGET_CUSTOMER' },
  { label: '시장 조사', value: 'MARKET_RESEARCH' },
  { label: '기타', value: 'ETC' },
];

/* =========================
   Dropdown Input
========================= */
function Dropdowninput({ label, placeholder, options, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('');

  const sortedOptions = [...options].sort((a, b) => {
    const aMatches = a.label.toLowerCase().includes(displayValue.toLowerCase());
    const bMatches = b.label.toLowerCase().includes(displayValue.toLowerCase());

    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  const handleSelect = (option: DropdownOption) => {
    setDisplayValue(option.label);
    onChange?.(option.value); // API 값 전달
    setIsOpen(false);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isOpen && sortedOptions.length > 0) {
      e.preventDefault();
      handleSelect(sortedOptions[0]);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-2 relative">
      <label className="text-gray-500 font-semibold">{label}</label>

      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full p-4 pr-12 text-gray-600 placeholder:text-gray-400 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center"
        >
          <ChevronDown size={16} color="#6C727E" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl z-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] overflow-hidden">
          <ul className="flex flex-col max-h-60 overflow-y-auto">
            {sortedOptions.map((option) => {
              const isMatch =
                displayValue && option.label.toLowerCase().includes(displayValue.toLowerCase());

              return (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`p-2 text-gray-600 font-medium cursor-pointer hover:bg-gray-100 ${
                    isMatch ? 'bg-gray-100' : ''
                  }`}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

type DateInputProps = {
  label: string;
  onChange: (start: string, end: string) => void;
};

/* =========================
   Date Input
========================= */
function Dateinput({ label, onChange }: DateInputProps) {
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

  const handleDateSelect = (date: Date) => {
    const displayFormatted = formatDateForDisplay(date);
    const apiFormatted = formatDateForApi(date);

    if (activeInput === 'start') {
      setStartDate(displayFormatted);
      setIsStartOpen(false);
      // API 전송용은 ISO 형식으로
      const endApiFormatted = endDate ? endDate.replace(/\./g, '-') : '';
      onChange(apiFormatted, endApiFormatted);
    }

    if (activeInput === 'end') {
      setEndDate(displayFormatted);
      setIsEndOpen(false);
      // API 전송용은 ISO 형식으로
      const startApiFormatted = startDate ? startDate.replace(/\./g, '-') : '';
      onChange(startApiFormatted, apiFormatted);
    }
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = `${currentMonth.getFullYear()}.${String(
    currentMonth.getMonth() + 1
  ).padStart(2, '0')}`;

  return (
    <div ref={containerRef} className="flex flex-1 flex-col gap-2 relative">
      <label className="text-gray-500 font-semibold">{label}</label>

      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Calendar
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              startDate ? 'text-[#007AFF]' : 'text-gray-400'
            }`}
          />
          <input
            value={startDate}
            readOnly
            onFocus={() => {
              setActiveInput('start');
              setIsStartOpen(true);
              setIsEndOpen(false);
            }}
            className={`w-full p-4 pl-12 rounded-xl outline outline-1 cursor-pointer ${
              startDate
                ? 'outline-[#007AFF] text-[#007AFF]'
                : 'outline-zinc-200 text-gray-600'
            }`}
          />
        </div>

        <span className="text-gray-400">~</span>

        <div className="relative flex-1">
          <Calendar
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              endDate ? 'text-[#007AFF]' : 'text-gray-400'
            }`}
          />
          <input
            value={endDate}
            readOnly
            onFocus={() => {
              setActiveInput('end');
              setIsEndOpen(true);
              setIsStartOpen(false);
            }}
            className={`w-full p-4 pl-12 rounded-xl outline outline-1 cursor-pointer ${
              endDate
                ? 'outline-[#007AFF] text-[#007AFF]'
                : 'outline-zinc-200 text-gray-600'
            }`}
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

/* =========================
   Page
========================= */
export default function Step1BasicInfo() {
  const [productName, setProductName] = useState('');
  const [industry, setIndustry] = useState('');
  const [samplingPurpose, setSamplingPurpose] = useState('');
  const [productCount, setProductCount] = useState('');
  const [samplingStartDate, setSamplingStartDate] = useState('');
  const [samplingEndDate, setSamplingEndDate] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  // 필수 필드가 모두 채워졌는지 확인
  const isFormValid =
    productName.trim() !== '' &&
    industry !== '' &&
    samplingPurpose !== '' &&
    productCount.trim() !== '' &&
    samplingStartDate !== '' &&
    samplingEndDate !== '';

  const handleNext = async () => {
    try {
      const proposalId = await createSamplingProposal({
        productName,
        industry,
        samplingPurpose,
        samplingStartDate,
        samplingEndDate,
        productCount: Number(productCount),
        detailRequest: description,
      });

      // 성공 → step2로 이동 (proposalId 전달)
      navigate('/corporatesamplingrequest/step2', {
        state: { samplingProposalId: proposalId }
      });
    } catch (error: any) {
      alert(error.message || '샘플링 요청 생성 실패');
    }
  };

  return (
    <CorporateLayout>
      <div className="flex flex-col min-h-full">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">샘플링 요청</h1>
            <p className="text-sm text-gray-500">제품 샘플링 및 협업 제안서</p>
          </div>
          <RequestStatus activeStep={1} />
        </div>

        <div className="my-6 h-px bg-gray-100" />

        <div className="flex flex-col gap-7">
          <Textinput
            label="제품 / 서비스명"
            placeholder="프로모션을 진행할 제품이나 서비스명을 입력해주세요."
            value={productName}
            onChange={setProductName}
          />

          <div className="flex gap-12">
            <Dropdowninput
              label="산업군"
              placeholder="산업군 선택"
              options={INDUSTRY_OPTIONS}
              onChange={setIndustry}
            />
            <Dropdowninput
              label="샘플링 목적"
              placeholder="목적 선택"
              options={PURPOSE_OPTIONS}
              onChange={setSamplingPurpose}
            />
          </div>

          <div className="flex gap-12">
            <Dateinput
              label="샘플링 시기"
              onChange={(start, end) => {
                setSamplingStartDate(start);
                setSamplingEndDate(end);
              }}
            />
            <Textinput
              label="제품 개수"
              placeholder="제품 개수 입력"
              value={productCount}
              onChange={setProductCount}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500 font-semibold">
              제품 / 서비스 설명
            </label>
            <textarea
              value={description}
              onChange={(e) =>
                e.target.value.length <= 300 && setDescription(e.target.value)
              }
              className="h-48 p-5 rounded-xl outline outline-1 outline-zinc-200"
            />
            <p className="text-xs text-gray-400 text-right">
              {description.length}/300
            </p>
          </div>
        </div>

        <div className="mt-auto flex justify-end">
          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className={`h-14 w-[200px] rounded-xl transition-colors ${
              isFormValid
                ? 'bg-[#007AFF] text-white hover:bg-[#0062CC]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            다음
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
