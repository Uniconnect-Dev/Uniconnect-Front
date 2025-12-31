import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { Info } from 'lucide-react';

import { useState } from 'react';

function Checkbox() {
  return <div className="w-5 h-5 rounded-md border border-gray-400" />;
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 bg-sky-100 rounded-3xl text-xs font-semibold text-sky-500">
      {label}
    </span>
  );
}

function MatchingTable() {
  return (
    <div className="w-[960px] h-[576px] bg-white rounded-3xl border border-zinc-200 overflow-hidden">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="h-14 border-b border-zinc-200 text-gray-400 text-sm font-medium">
            <th className="w-12 pl-5 text-left"></th>
            <th className="w-32 pl-5 text-left">예상 비용</th>
            <th className="w-64 pl-5 text-left">단체명</th>
            <th className="text-left pl-5">행사명</th>
            <th className="w-48 pl-5 text-left">분류</th>
            <th className="w-28 pl-5 text-left">노출 인원</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="text-sm font-medium text-gray-600">
          <tr className="h-10 hover:bg-slate-100 transition-colors">
            <td className="pl-5">
              <Checkbox />
            </td>
            <td className="pl-5">20~30만 원</td>
            <td className="pl-5">고려대학교 학생회</td>
            <td className="pl-5">고려대학교 문과 대학 축제</td>
            <td className="pl-5">
              <div className="flex gap-1">
                <Tag label="남녀공학" />
                <Tag label="축제" />
                <Tag label="F&B" />
              </div>
            </td>
            <td className="pl-5">15,000</td>
          </tr>

          <tr className="h-10 hover:bg-slate-100 transition-colors">
            <td className="pl-5">
              <Checkbox />
            </td>
            <td className="pl-5">20~30만 원</td>
            <td className="pl-5">이화여대 중앙 실전 IT 창업 학회 UNIS</td>
            <td className="pl-5">창업 동아리 연합 해커톤</td>
            <td className="pl-5">
              <div className="flex gap-1">
                <Tag label="이화여대" />
                <Tag label="IT" />
                <Tag label="창업" />
              </div>
            </td>
            <td className="pl-5">2,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function Step3Matching() {
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
            <h1 className="text-2xl font-bold mb-2">매칭 / 견적</h1>
            <p className="text-sm text-gray-500 mb-6">
              선택하신 키워드와 매칭되는 학생 단체입니다. <br />
              샘플링 하길 원하는 행사를 선택해주세요.
            </p>
            <div className="flex flex-row gap-1 mb-2">
              <img src="/inform.svg" alt="inform" />
              <p className="text-gray-500 text-sm font-semibold">
                행사명을 클릭하면 상세 페이지로 이동합니다.
              </p>
            </div>
          </div>
          <RequestStatus activeStep={3} />
        </div>

        <div className="flex flex-col">
          <MatchingTable />
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
