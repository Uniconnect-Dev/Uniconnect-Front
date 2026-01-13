import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';

type Active = 'start' | 'end' | null;

interface Props {
  label?: string;
  startLabel?: string;
  endLabel?: string;
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  height?: number;
  inputWidth?: number;
  /* controlled mode */
  startValue?: string;
  endValue?: string;
  onStartChange?: (v: string) => void;
  onEndChange?: (v: string) => void;
  /* alias props for backward compatibility */
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (v: string) => void;
  onEndDateChange?: (v: string) => void;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

function buildCalendarDays(currentMonth: Date) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days: { date: Date; inMonth: boolean }[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({
      date: new Date(year, month, -firstDayOfWeek + i + 1),
      inMonth: false,
    });
  }

  for (let i = 1; i <= lastDate; i++) {
    days.push({ date: new Date(year, month, i), inMonth: true });
  }

  while (days.length % 7 !== 0) {
    days.push({
      date: new Date(year, month + 1, days.length),
      inMonth: false,
    });
  }

  return days;
}

export default function DateRangeInput({
  label,
  startLabel = '',
  endLabel = '',
  placeholder = 'YYYY.MM.DD',
  startPlaceholder,
  endPlaceholder,
  height = 56,
  inputWidth,
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  // alias props
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: Props) {
  // Support alias props (startDate/endDate as aliases for startValue/endValue)
  const effectiveStartValue = startValue ?? startDate;
  const effectiveEndValue = endValue ?? endDate;
  const effectiveOnStartChange = onStartChange ?? onStartDateChange;
  const effectiveOnEndChange = onEndChange ?? onEndDateChange;

  const isControlled = effectiveStartValue !== undefined;

  const [internalStart, setInternalStart] = useState('');
  const [internalEnd, setInternalEnd] = useState('');
  const [tempDate, setTempDate] = useState<Date | null>(null);

  const startDateValue = isControlled ? effectiveStartValue : internalStart;
  const endDateValue = isControlled ? (effectiveEndValue ?? '') : internalEnd;

  const setStartDateValue = (v: string) => {
    if (isControlled && effectiveOnStartChange) {
      effectiveOnStartChange(v);
    } else {
      setInternalStart(v);
    }
  };

  const setEndDateValue = (v: string) => {
    if (isControlled && effectiveOnEndChange) {
      effectiveOnEndChange(v);
    } else {
      setInternalEnd(v);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<Active>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const containerRef = useRef<HTMLDivElement>(null);

  /* outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        if (tempDate && activeInput) {
          const formatted = formatDate(tempDate);
          activeInput === 'start'
            ? setStartDateValue(formatted)
            : setEndDateValue(formatted);
        }
        setTempDate(null);
        setIsOpen(false);
        setActiveInput(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [tempDate, activeInput]);

  const selectedStart = useMemo(() => {
    if (!startDateValue) return null;
    const [y, m, d] = startDateValue.split('.').map(Number);
    return new Date(y, m - 1, d);
  }, [startDateValue]);

  const selectedEnd = useMemo(() => {
    if (!endDateValue) return null;
    const [y, m, d] = endDateValue.split('.').map(Number);
    return new Date(y, m - 1, d);
  }, [endDateValue]);

  const selectedForActive =
    tempDate ??
    (activeInput === 'start' ? selectedStart : selectedEnd);

  const days = useMemo(() => buildCalendarDays(currentMonth), [currentMonth]);

  const inputBase = `
    rounded-lg border px-4 pl-10
    text-[14px] cursor-pointer bg-white outline-none
    transition-colors
  `;

  const inputWidthClass = inputWidth ? '' : 'w-full';

  return (
    <div ref={containerRef} className="flex flex-col gap-2 relative">
      {/* 상단 label (선택적) */}
      {label && (
        <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
          {label}
        </label>
      )}

      {/* inputs */}
      <div className="flex gap-2 items-center">
        {/* 시작일 */}
        <div className={`flex flex-col gap-2 ${inputWidth ? '' : 'flex-1'}`}>
          {startLabel && (
            <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
              {startLabel}
            </label>
          )}
          <div className="relative">
            <Calendar
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                activeInput === 'start' || startDateValue ? 'text-[#007AFF]' : 'text-[#9AA1AD]'
              }`}
            />
            <input
              readOnly
              value={startDateValue}
              placeholder={startPlaceholder ?? placeholder}
              onFocus={() => {
                setActiveInput('start');
                setIsOpen(true);
              }}
              style={{ height, width: inputWidth }}
              className={`${inputBase} ${inputWidthClass} ${
                activeInput === 'start' || startDateValue
                  ? 'border-[#007AFF] text-[#007AFF]'
                  : 'border-[#E6E8EC] text-[#2D3139]'
              }`}
            />
          </div>
        </div>

        <span className="text-[#C7CDD6]">~</span>

        {/* 종료일 */}
        <div className={`flex flex-col gap-2 ${inputWidth ? '' : 'flex-1'}`}>
          {endLabel && (
            <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
              {endLabel}
            </label>
          )}
          <div className="relative">
            <Calendar
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                activeInput === 'end' || endDateValue ? 'text-[#007AFF]' : 'text-[#9AA1AD]'
              }`}
            />
            <input
              readOnly
              value={endDateValue}
              placeholder={endPlaceholder ?? placeholder}
              onFocus={() => {
                setActiveInput('end');
                setIsOpen(true);
              }}
              style={{ height, width: inputWidth }}
              className={`${inputBase} ${inputWidthClass} ${
                activeInput === 'end' || endDateValue
                  ? 'border-[#007AFF] text-[#007AFF]'
                  : 'border-[#E6E8EC] text-[#2D3139]'
              }`}
            />
          </div>
        </div>
      </div>

      {/* calendar */}
      {isOpen && activeInput && (
        <div className="absolute top-full mt-2 w-[320px] bg-white rounded-2xl border border-[#EEF0F3] p-5 z-50 shadow-lg">
          {/* 월 네비게이션 */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <span className="text-[#6C727E]">{'<'}</span>
            </button>
            <span className="text-[16px] font-medium text-[#2D3139]">
              {currentMonth.getFullYear()}.{String(currentMonth.getMonth() + 1).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <span className="text-[#6C727E]">{'>'}</span>
            </button>
          </div>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className="w-10 h-8 flex items-center justify-center text-[12px] text-[#9AA1AD]">
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 */}
          <div className="grid grid-cols-7 gap-1">
            {days.map(({ date, inMonth }, i) => {
              const isSelected =
                selectedForActive && isSameDay(date, selectedForActive);

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTempDate(date)}
                  className={`
                    w-10 h-10 rounded-xl text-[14px]
                    ${!inMonth ? 'text-[#C7CDD6]' : ''}
                    ${
                      isSelected
                        ? 'bg-[#E3F4FF] text-[#008FFF] font-medium'
                        : inMonth 
                          ? 'hover:bg-[#F4FAFF] text-[#2D3139]'
                          : ''
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}