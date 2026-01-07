import React, { useEffect, useMemo, useRef, useState } from 'react';

type Active = 'start' | 'end' | null;

interface Props {
  label: string;
  placeholder?: string;
  height?: number;
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
  placeholder = 'YYYY.MM.DD',
  height = 56,
}: Props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tempDate, setTempDate] = useState<Date | null>(null);

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
            ? setStartDate(formatted)
            : setEndDate(formatted);
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
    if (!startDate) return null;
    const [y, m, d] = startDate.split('.').map(Number);
    return new Date(y, m - 1, d);
  }, [startDate]);

  const selectedEnd = useMemo(() => {
    if (!endDate) return null;
    const [y, m, d] = endDate.split('.').map(Number);
    return new Date(y, m - 1, d);
  }, [endDate]);

  const selectedForActive =
    tempDate ??
    (activeInput === 'start' ? selectedStart : selectedEnd);

  const days = useMemo(() => buildCalendarDays(currentMonth), [currentMonth]);

  const inputBase =
    'w-full rounded-[14px] border px-4 pl-11 text-[16px] cursor-pointer bg-white outline-none focus:border-[#008FFF]';

  return (
    <div ref={containerRef} className="flex flex-col gap-2 relative">
      {/* label */}
      <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
        {label}
      </label>

      {/* inputs */}
      <div className="flex gap-2 items-center">
        <input
          readOnly
          value={startDate}
          placeholder={placeholder}
          onFocus={() => {
            setActiveInput('start');
            setIsOpen(true);
          }}
          style={{ height }}
          className={inputBase}
        />

        <span className="text-[#C7CDD6]">~</span>

        <input
          readOnly
          value={endDate}
          placeholder={placeholder}
          onFocus={() => {
            setActiveInput('end');
            setIsOpen(true);
          }}
          style={{ height }}
          className={inputBase}
        />
      </div>

      {/* calendar */}
      {isOpen && activeInput && (
        <div className="absolute top-[92px] w-[320px] bg-white rounded-2xl border border-[#EEF0F3] p-5 z-50 shadow">
          <div className="grid grid-cols-7 gap-1">
            {days.map(({ date }, i) => {
              const isSelected =
                selectedForActive && isSameDay(date, selectedForActive);

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTempDate(date)}
                  className={`
                    w-10 h-10 rounded-xl text-[14px]
                    ${
                      isSelected
                        ? 'bg-[#E3F4FF] text-[#008FFF]'
                        : 'hover:bg-[#F4FAFF]'
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