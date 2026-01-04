import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../../components/layout/StudentLayout';
import RequestStatus from '@/components/common/RequestStatus';

/* =========================
   TextInput (로컬 UI 컴포넌트)
========================= */
interface TextInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
}

function TextInput({
  label,
  placeholder,
  value,
  readOnly = false,
}: TextInputProps) {
  return (
    <div className="flex flex-1 flex-col max-w-[960px] gap-2">
      <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full p-4 rounded-xl transition-all
          ${
            readOnly
              ? 'bg-[#F3F5F9] cursor-default outline-none text-[16px] text-[#949BA7]'
              : 'bg-white outline outline-1 outline-zinc-200 hover:outline-gray-300 focus:outline-[#008FFF]'
          }`}
      />
    </div>
  );
}

/* =========================
   Step 1 – 단체 정보
========================= */
export default function GroupInfoStep() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('ewha-commit@ewha.com');

  const handleNext = () => {
    navigate('/studentsampling/step2');
  };

  return (
    <StudentLayout>
      <div className="flex flex-col h-full max-w-[93%] mx-auto">
        {/* 상단 헤더 */}
        <div className="flex justify-between items-start w-full mt-2 mb-8">
          <div>
            <h1 className="text-[24px] font-semibold tracking-[-0.366px] mb-1">
              제휴 / 장기 협업
            </h1>
            <p className="text-[#949BA7] text-[15px] tracking-[-0.225px]">
              단체 정보를 입력 혹은 수정해주세요.
            </p>
          </div>

          {/* ✅ 공통 컴포넌트 사용 */}
          <RequestStatus activeStep={1} />
        </div>

        <div className="w-full h-[1px] bg-gray-200 mb-9" />

        {/* 본문 */}
        <div className="flex flex-col gap-8 w-full max-w-[1000px]">
          <div className="flex flex-row gap-10">
            <TextInput
              label="학교명"
              value="이화여자대학교"
              readOnly
            />
            <TextInput
              label="단체명"
              value="컴퓨터공학부 학생회 커밋"
              readOnly
            />
          </div>

          <div className="flex flex-row gap-10">
            <TextInput label="담당자명" value="홍길동" />
            <TextInput
              label="전화번호"
              placeholder="담당자 전화번호를 입력해주세요 (예: 010-0000-0000)"
            />
          </div>

          <div className="flex flex-row gap-10">
            <div className="flex-1 max-w-[calc(50%-20px)]">
              <label className="text-gray-700 font-semibold text-[15px] block mb-2">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl outline outline-1 outline-zinc-200
                  text-gray-600 focus:outline-[#008FFF]"
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-auto flex justify-end pb-10">
          <button
            onClick={handleNext}
            className="h-14 w-[200px] bg-[#E9ECEF] rounded-xl
              transition-colors hover:bg-gray-200 group"
          >
            <span className="text-[#B4BBC7] font-medium text-lg
              group-hover:text-gray-500 tracking-[-0.27px]">
              다음
            </span>
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}