import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { ChevronDown, Calendar } from 'lucide-react';

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

type DropdownProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

/* =========================
   Dropdown Input
========================= */
function Dropdowninput({ label, placeholder, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const options = [
    '옵션 1',
    '옵션 2',
    '옵션 3',
    '옵션 4',
    '옵션 5',
    '옵션 6',
    '옵션 7',
  ];

  const sortedOptions = [...options].sort((a, b) => {
    const aMatches = a.toLowerCase().includes(value.toLowerCase());
    const bMatches = b.toLowerCase().includes(value.toLowerCase());

    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  const handleSelect = (option: string) => {
    setValue(option);
    onChange?.(option);
    setIsOpen(false);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
          value={value}
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
            {sortedOptions.map((option, index) => {
              const isMatch =
                value && option.toLowerCase().includes(value.toLowerCase());

              return (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`p-2 text-gray-600 font-medium cursor-pointer hover:bg-gray-100 ${
                    isMatch ? 'bg-gray-100' : ''
                  }`}
                >
                  {option}
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
      onChange(formatted, endDate);
    }

    if (activeInput === 'end') {
      setEndDate(formatted);
      setIsEndOpen(false);
      onChange(startDate, formatted);
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
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={startDate}
            onFocus={() => {
              setActiveInput('start');
              setIsStartOpen(true);
              setIsEndOpen(false);
            }}
            className="w-full p-4 pl-12 rounded-xl outline outline-1 outline-zinc-200"
          />
        </div>

        <span>~</span>

        <div className="relative flex-1">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={endDate}
            onFocus={() => {
              setActiveInput('end');
              setIsEndOpen(true);
              setIsStartOpen(false);
            }}
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

  const handleNext = async () => {
    try {
      const res = await createSamplingProposal({
        productName,
        industry,
        samplingPurpose,
        samplingStartDate,
        samplingEndDate,
        productCount: Number(productCount),
        detailRequest: description,
      });

      // 성공 → step2로 이동
      navigate('/corporatesamplingrequest/step2');
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
              onChange={setIndustry}
            />
            <Dropdowninput
              label="샘플링 목적"
              placeholder="목적 선택"
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
            className="h-14 w-[200px] bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            다음
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
