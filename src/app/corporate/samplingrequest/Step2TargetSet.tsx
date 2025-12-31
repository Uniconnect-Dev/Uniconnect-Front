import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';

import { useState } from 'react';

function Chip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      data-state={selected ? 'selected' : 'default'}
      className={`
        px-3 py-1.5 rounded-lg inline-flex items-center justify-center
        text-base font-medium leading-6
        transition-colors
        ${
          selected
            ? 'bg-sky-100 text-blue-600 hover:bg-sky-100'
            : 'outline outline-1 outline-offset-[-1px] outline-zinc-200 text-gray-500 hover:bg-gray-100 hover:outline-none'
        }
      `}
    >
      {label}
    </button>
  );
}

export default function Step2TargetSet() {
  const [selectedChips, setSelectedChips] = useState<string[]>([]); //선택된 Chip 상태 관리

  const toggleChip = (label: string) => {
    setSelectedChips((prev) => {
      if (prev.includes(label)) {
        //이미 선택됨 → 제거
        return prev.filter((item) => item !== label);
      }

      //최대 3개 제한
      if (prev.length >= 3) return prev;

      return [...prev, label];
    });
  };

  return (
    <CorporateLayout>
      {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
      {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
      <div className="flex flex-col min-h-full">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold mb-2">타겟 설정</h1>
            <p className="text-sm text-gray-500 mb-6">
              분류별 해시 태그를 선택하여 정확한 타겟팅을 진행할 수 있습니다.
            </p>
          </div>
          <RequestStatus activeStep={2} />
        </div>
        <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100 mb-6"></div>
        <div className="flex flex-row gap-[70px]">
          {/*해시태그 영역*/}
          <div className="w-full flex flex-col gap-10">
            {/*기본*/}
            <div className="flex flex-col gap-3 items-start">
              <p className="text-gray-600 font-semibold">기본</p>
              <div className="flex flex-wrap gap-2">
                {[
                  '이화여대',
                  '이화여대',
                  '서강대',
                  '서강대',
                  '서강대',
                  '연세대',
                  '연세대',
                ].map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    selected={selectedChips.includes(label)}
                    onToggle={() => toggleChip(label)}
                  />
                ))}
              </div>
            </div>
            {/*관심사*/}
            <div className="flex flex-col gap-3 items-start">
              <p className="text-gray-600 font-semibold">관심사</p>
              <div className="flex flex-wrap gap-2">
                {[
                  '이화여대',
                  '이화여대',
                  '서강대',
                  '서강대',
                  '서강대',
                  '연세대',
                  '연세대',
                ].map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    selected={selectedChips.includes(label)}
                    onToggle={() => toggleChip(label)}
                  />
                ))}
              </div>
            </div>
            {/*성격*/}
            <div className="flex flex-col gap-3 items-start">
              <p className="text-gray-600 font-semibold">성격</p>
              <div className="flex flex-wrap gap-2">
                {[
                  '이화여대',
                  '이화여대',
                  '서강대',
                  '서강대',
                  '서강대',
                  '연세대',
                  '연세대',
                ].map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    selected={selectedChips.includes(label)}
                    onToggle={() => toggleChip(label)}
                  />
                ))}
              </div>
            </div>
            {/*직접 입력*/}
            <div className="flex flex-col gap-3 items-start">
              <p className="text-gray-600 font-semibold">직접 입력</p>
              <div className="flex gap-2">
                <Chip label="+" />
              </div>
            </div>
          </div>
          {/*선택된 태그 영역*/}
          <div className="w-96 shrink-0 h-60 px-7 py-9 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 flex flex-col gap-4">
            <p className="text-zinc-700 text-lg font-semibold">
              선택된 태그 (최대 3개)
            </p>

            <div className="flex flex-wrap gap-3">
              {selectedChips.map((label) => (
                <div
                  key={label}
                  className="pl-3 pr-2 py-1 bg-sky-100 rounded-lg flex items-center gap-2"
                >
                  <span className="text-blue-600 font-medium">{label}</span>

                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => toggleChip(label)}
                    className="w-4 h-4 flex items-center justify-center text-blue-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*다음 버튼 하단 정렬 영역*/}
        <div className="mt-auto flex justify-end items-end gap-4">
          <button className="h-14 w-[200px] rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500">
            <span className="text-sky-500 font-medium text-lg">이전</span>
          </button>
          <button className="h-14 w-[200px] bg-blue-600 rounded-xl">
            <span className="text-white font-medium text-lg">다음</span>
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
