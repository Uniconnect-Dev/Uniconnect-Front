import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import arrowIcon from '@/assets/icon/arrow.png';
import calIcon from '@/assets/icon/cal.png';
import { useState, useRef, useEffect } from 'react';

function Requeststatus({ activeStep }) {
  const steps = [
    { id: 1, label: '기본 정보' },
    { id: 2, label: '타겟 설정' },
    { id: 3, label: '매칭 / 견적' },
    { id: 4, label: '규정 확인' },
  ];

  return (
    <div className="inline-flex items-center gap-7">
      {steps.map((step) => {
        const isActive = step.id === activeStep;

        return (
          <div
            key={step.id}
            className="flex items-center gap-2.5"
            data-state={isActive ? 'active' : 'default'}
          >
            <div
              className={`w-6 h-6 rounded-2xl inline-flex justify-center items-center
                ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'outline outline-[1.6px] outline-zinc-200 text-zinc-200'
                }`}
            >
              <span className="text-base font-semibold leading-6">
                {step.id}
              </span>
            </div>

            <span
              className={`text-lg font-semibold leading-7 ${
                isActive ? 'text-blue-600' : 'text-zinc-200' //현재 단계일 때와 아닐 때 색상 차이를 둠
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Textinput({ label, placeholder }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="text-gray-500 font-semibold">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full p-4 rounded-xl outline outline-1 outline-zinc-200"
      />
    </div>
  );
}

function Dropdowninput({ label, placeholder }) {
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

  // 입력값과 일치하는 옵션을 최상단으로 정렬
  const sortedOptions = [...options].sort((a, b) => {
    const aMatches = a.toLowerCase().includes(value.toLowerCase());
    const bMatches = b.toLowerCase().includes(value.toLowerCase());

    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  const handleSelect = (option) => {
    setValue(option);
    setIsOpen(false);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
    if (!isOpen) setIsOpen(true); // 타이핑 시작하면 드롭다운 열기
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isOpen && sortedOptions.length > 0) {
      e.preventDefault();
      handleSelect(sortedOptions[0]); // 최상단 옵션 선택
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
          onClick={handleButtonClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-0 m-0 flex items-center"
          type="button"
        >
          <img src={arrowIcon} alt="드롭다운 버튼" />
        </button>
      </div>

      {/* 드롭다운 메뉴 */}
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
                  className={`p-2 text-gray-600 font-medium hover:bg-gray-100 cursor-pointer ${
                    isMatch ? 'bg-gray-100' : 'bg-white'
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

function Dateinput({ label, placeholder }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeInput, setActiveInput] = useState(null);
  const containerRef = useRef(null); // 컨테이너 참조 추가

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsStartOpen(false);
        setIsEndOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleDateSelect = (date) => {
    const formattedDate = formatDate(date);

    if (activeInput === 'start') {
      setStartDate(formattedDate);
      setIsStartOpen(false);
    } else if (activeInput === 'end') {
      setEndDate(formattedDate);
      setIsEndOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleStartFocus = () => {
    setActiveInput('start');
    setIsStartOpen(true);
    setIsEndOpen(false);
  };

  const handleEndFocus = () => {
    setActiveInput('end');
    setIsEndOpen(true);
    setIsStartOpen(false);
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = `${currentMonth.getFullYear()}.${(
    currentMonth.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}`;

  return (
    <div
      ref={containerRef}
      className="flex flex-1 min-w-0 flex-col gap-2 relative"
    >
      {' '}
      {/* ref 추가 */}
      <label className="text-gray-500 font-semibold">{label}</label>
      <div className="flex gap-2 items-center">
        {/* 시작 날짜 */}
        <div className="relative flex-1 min-w-0">
          <img
            src={calIcon}
            alt="날짜 선택"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          />
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={handleStartFocus}
            placeholder={placeholder}
            className="w-full p-4 pl-12 rounded-xl outline outline-1 outline-zinc-200"
          />
        </div>

        <span className="shrink-0">~</span>

        {/* 종료 날짜 */}
        <div className="relative flex-1 min-w-0">
          <img
            src={calIcon}
            alt="날짜 선택"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          />
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onFocus={handleEndFocus}
            placeholder={placeholder}
            className="w-full p-4 pl-12 rounded-xl outline outline-1 outline-zinc-200"
          />
        </div>
      </div>
      {/* 캘린더 팝업 */}
      {(isStartOpen || isEndOpen) && (
        <div
          className={`absolute top-full mt-4 w-80 h-75 bg-white rounded-2xl z-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] p-4 ${
            isStartOpen ? 'left-0' : 'right-0' // 시작날짜면 left-0, 종료날짜면 right-0
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <button onClick={handlePrevMonth} className="m-2.25">
              &lt;
            </button>
            <span className="text-lg font-bold">{monthYear}</span>
            <button onClick={handleNextMonth} className="m-2.25">
              &gt;
            </button>
          </div>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-auto mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div
                key={day}
                className="w-10 h-6 flex text-zinc-200 text-xs font-medium items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-auto">
            {days.map((day, index) => (
              <div key={index} className="w-10 h-10">
                {day ? (
                  <button
                    onClick={() => handleDateSelect(day)}
                    className="w-full h-full flex items-center justify-center text-gray-400 font-medium hover:bg-sky-100 hover:text-sky-500 p-2 rounded-lg transition-colors"
                  >
                    {day.getDate()}
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Step1BasicInfot() {
  const [description, setDescription] = useState(''); //제품/서비스 정렬 onChange 관련 코드
  return (
    <CorporateLayout>
      {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
      {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
      <div className="flex flex-col min-h-full">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold mb-2">샘플링 요청</h1>
            <p className="text-sm text-gray-500 mb-6">
              제품 샘플링 및 협업 제안서
            </p>
          </div>
          <Requeststatus activeStep={1} />
        </div>
        <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100 mb-6"></div>
        {/* 샘플링 요청 폼*/}
        <div className="w-full flex flex-col gap-7">
          <Textinput
            label="제품 / 서비스명"
            placeholder="프로모션을 진행할 제품이나 서비스명을 입력해주세요."
          />
          <div className="w-full flex flex-row gap-12">
            {/*산업군*/}
            <Dropdowninput
              label="산업군"
              placeholder="산업군을 선택해주세요."
            />
            {/*샘플링 목적*/}
            <Dropdowninput
              label="샘플링 목적"
              placeholder="샘플링 목적을 선택해주세요."
            />
          </div>
          <div className="w-full flex flex-row gap-12">
            {/*샘플링 시기*/}
            <Dateinput label="샘플링 시기" placeholder="YYYY.MM.DD" />
            {/*제품 개수*/}
            <Textinput
              label="제품 개수"
              placeholder="제공할 제품 개수를 입력해주세요."
            />
          </div>
          {/*제품/서비스 설명*/}
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-gray-500 font-semibold">
              제품 / 서비스 설명
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  setDescription(e.target.value);
                }
              }}
              placeholder="샘플링을 진행할 제품/서비스에 대한 간단한 설명을 작성해주세요."
              className="w-full h-48 p-5 rounded-xl outline outline-1 outline-zinc-200 items-start"
            />
            <p className="w-full text-gray-400 text-xs text-right mb-7">
              {description.length}/300
            </p>
          </div>
        </div>
        {/*다음 버튼 하단 정렬 영역*/}
        <div className="mt-auto flex justify-end items-end">
          <button className="h-14 px-7 bg-gray-100 rounded-xl justify-center items-center">
            <span className="text-gray-400 text-lg font-semibold leading-7">
              다음
            </span>
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
