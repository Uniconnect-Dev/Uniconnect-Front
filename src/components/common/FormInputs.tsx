import React, { useEffect, useMemo, useRef, useState } from 'react';

interface TextInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
}

interface DateInputProps {
  label: string;
  placeholder?: string;
}

type Active = 'start' | 'end' | null;

export function TextInput({ label, placeholder, value, readOnly = false }: TextInputProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 min-w-0">
      <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full p-4 rounded-xl text-[16px] h-[56px]
          ${readOnly
            ? 'bg-[#F3F5F9] cursor-default outline-none text-[#949BA7]'
            : 'bg-white outline outline-1 outline-zinc-200 text-[#4B5563] hover:outline-gray-300 focus:outline-[#008FFF]'
          }`}
      />
    </div>
  );
}

export function FormSectionHeaderrequired({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-1 border-b border-gray-100 pb-3 w-full">
      <img src="/File_Blue.png" alt="" className="w-5 h-5" />
      <h2 className="text-[18px] font-semibold text-[#2D3139]">{title}</h2>
      <span className="text-[#009FFF]">*</span>
    </div>
  );
}

export function FormSectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-1 border-b border-gray-100 pb-3 w-full">
      <img src="/File_Blue.png" alt="" className="w-5 h-5" />
      <h2 className="text-[18px] font-semibold text-[#2D3139]">{title}</h2>
    </div>
  );
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
  // 6주(42칸) 고정
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstOfMonth.getDay(); // 0~6

  const start = new Date(year, month, 1 - startDayOfWeek);

  return Array.from({ length: 42 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      date: d,
      inMonth: d.getMonth() === month,
    };
  });
}

export function DateInput({ label, placeholder = 'YYYY.MM.DD' }: DateInputProps) {
  // 확정 값
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // 임시 선택 값
  const [tempDate, setTempDate] = useState<Date | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<Active>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const containerRef = useRef<HTMLDivElement>(null);

  /* ---------------- outside click → 확정 ---------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (tempDate && activeInput) {
          const formatted = formatDate(tempDate);
          if (activeInput === 'start') setStartDate(formatted);
          if (activeInput === 'end') setEndDate(formatted);
        }

        setTempDate(null);
        setIsOpen(false);
        setActiveInput(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [tempDate, activeInput]);

  /* ---------------- 확정된 날짜 → Date ---------------- */
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

  /* ---------------- 현재 active 기준 selected ---------------- */
  const selectedForActive =
    tempDate ??
    (activeInput === 'start' ? selectedStart : activeInput === 'end' ? selectedEnd : null);

  const days = useMemo(() => buildCalendarDays(currentMonth), [currentMonth]);

  /* ---------------- input open ---------------- */
  const openFor = (which: Active) => {
    setActiveInput(which);
    setIsOpen(true);

    const target = which === 'start' ? selectedStart : selectedEnd;
    if (target) {
      setCurrentMonth(new Date(target.getFullYear(), target.getMonth(), 1));
    }
  };

  /* ---------------- 날짜 클릭 → 임시 선택 ---------------- */
  const handleSelect = (date: Date) => {
    setTempDate(date); // ❗ 확정 아님
  };

  /* ---------------- input 표시 값 ---------------- */
  const displayStartDate =
    activeInput === 'start' && tempDate ? formatDate(tempDate) : startDate;

  const displayEndDate =
    activeInput === 'end' && tempDate ? formatDate(tempDate) : endDate;

  const isStartActive = activeInput === 'start' && isOpen;
  const isEndActive = activeInput === 'end' && isOpen;

  const startHasValue = !!startDate;
  const endHasValue = !!endDate;

  const inputBase =
    'w-full h-[56px] rounded-[14px] border px-4 pl-11 text-[16px] tracking-[-0.24px] cursor-pointer bg-white outline-none focus:outline-none focus-visible:outline-none';

  const inputText = (hasValue: boolean, active: boolean) =>
    hasValue || active
      ? 'text-[#008FFF] font-regular'
      : 'text-[#3A404A] font-regular placeholder:text-[#C7CDD6]';

  const inputBorder = (active: boolean) =>
    active ? 'border-[#008FFF]' : 'border-[#E6E8EC]';

  // 오늘 기준 (월 단위)
  const today = new Date();
  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + 6, 1);

  const isPrevDisabled = currentMonth <= minMonth;
  const isNextDisabled = currentMonth >= maxMonth;

  return (
    <div ref={containerRef} className="flex flex-1 min-w-0 flex-col gap-2 relative">
      <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
        {label}
      </label>

      {/* inputs */}
      <div className="flex gap-2 items-center">
        {/* start */}
        <div className="relative flex-1 min-w-0">
          <input
            readOnly
            value={displayStartDate}
            onFocus={() => openFor('start')}
            placeholder={placeholder}
            className={`${inputBase} ${inputBorder(isStartActive)} ${inputText(
              startHasValue,
              isStartActive
            )}`}
          />
          <img
            src={isStartActive || startHasValue ? '/cal_active.png' : '/cal.png'}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            alt=""
          />
        </div>

        <span className="text-[#C7CDD6] font-medium">~</span>

        {/* end */}
        <div className="relative flex-1 min-w-0">
          <input
            readOnly
            value={displayEndDate}
            onFocus={() => openFor('end')}
            placeholder={placeholder}
            className={`${inputBase} ${inputBorder(isEndActive)} ${inputText(
              endHasValue,
              isEndActive
            )}`}
          />
          <img
            src={isEndActive || endHasValue ? '/cal_active.png' : '/cal.png'}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            alt=""
          />
        </div>
      </div>

      {/* calendar */}
      {isOpen && activeInput && (
        <div
          className={[
            'absolute top-[92px] w-[320px] bg-white rounded-2xl z-50',
            'shadow-[0_12px_40px_rgba(16,24,40,0.12)] border border-[#EEF0F3] p-5',
            activeInput === 'start' ? 'left-0' : 'right-0',
          ].join(' ')}
        >
          {/* header */}
          <div className="flex justify-center items-center mb-4">
            <div className="flex items-center gap-4">
              {/* 이전 달 */}
              <button
                disabled={isPrevDisabled}
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
                  )
                }
                className={`w-8 h-8 flex items-center justify-center rounded-xl
                  ${isPrevDisabled ? 'cursor-default' : 'hover:bg-[#F4F6F8]'}
                `}
              >
                <img
                  src="/cal_arrow.png"
                  alt="prev"
                  draggable={false}
                  className={`w-5 h-5 scale-x-[-1] transition-opacity
                    ${isPrevDisabled
                      ? 'opacity-20'
                      : 'opacity-40 hover:opacity-100'}
                  `}
                />
              </button>

              {/* 월 표시 */}
              <span className="font-semibold text-[18px] tracking-[-0.3px]">
                {currentMonth.getFullYear()}.{String(currentMonth.getMonth() + 1).padStart(2, '0')}
              </span>

              {/* 다음 달 */}
              <button
                disabled={isNextDisabled}
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                  )
                }
                className={`w-8 h-8 flex items-center justify-center rounded-xl
                  ${isNextDisabled ? 'cursor-default' : 'hover:bg-[#F4F6F8]'}
                `}
              >
                <img
                  src="/cal_arrow.png"
                  alt="next"
                  draggable={false}
                  className={`w-5 h-5 transition-opacity
                    ${isNextDisabled
                      ? 'opacity-20'
                      : 'opacity-40 hover:opacity-100'}
                  `}
                />
              </button>
            </div>
          </div>



          {/* weekdays */}
          <div className="grid grid-cols-7 text-center text-[12px] text-[#949BA7] mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* days */}
          <div className="grid grid-cols-7">
            {days.map(({ date, inMonth }, i) => {
              const isSelected =
                selectedForActive && isSameDay(date, selectedForActive);

              const base =
                'w-10 h-10 rounded-xl text-[16px] font-regular flex items-center justify-center transition-colors';

              const color = isSelected
                ? 'bg-[#008FFF] text-white'
                : inMonth
                ? 'text-[#949BA7] hover:bg-[#F4FAFF] hover:text-[#008FFF]'
                : 'text-[#DFE1E5] hover:bg-[#F4F6F8]';

              return (
                <div key={i} className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (!inMonth) {
                        setCurrentMonth(
                          new Date(date.getFullYear(), date.getMonth(), 1)
                        );
                      }
                      handleSelect(date);
                    }}
                    className={`${base} ${color}`}
                  >
                    {date.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}