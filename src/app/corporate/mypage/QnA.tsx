import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';

import { useState } from 'react';

import {
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import Th from '../../../components/common/tableRelated/Th';
import SortableTh from '@/components/common/tableRelated/SortableTh';
import Tr from '@/components/common/tableRelated/Tr';
import Td from '@/components/common/tableRelated/Td';

type QnAStatus = 'before-ans' | 'complete';

interface QnAData {
  id: string;
  date: string;
  QnAName: string;
  status: QnAStatus;
}

const QnAData: QnAData[] = [
  {
    id: '01',
    date: '2025.12.29',
    QnAName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    status: 'before-ans',
  },
  {
    id: '02',
    date: '2025.12.29',
    QnAName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    status: 'before-ans',
  },
  {
    id: '03',
    date: '2025.12.29',
    QnAName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    status: 'complete',
  },
  {
    id: '04',
    date: '2025.12.29',
    QnAName:
      '이화여대 중앙 실전 IT 창업 학회 UNIS이화여대 중앙 실전 IT 창업 학회 UNIS',
    status: 'before-ans',
  },
];

function QnATable() {
  return (
    <div className="w-full h-full rounded-3xl outline outline-1 outline-zinc-200 bg-white flex flex-col overflow-hidden relative">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          {/* Header - 패딩 없음 */}
          <thead className="bg-white border-b border-zinc-200 sticky top-0 z-10">
            <tr className="h-14">
              <Th className="w-24">연번</Th>
              <SortableTh className="w-32">등록일</SortableTh>
              <SortableTh>문의명</SortableTh>

              <Th className="w-28 text-center">문의 상태</Th>
            </tr>
          </thead>

          {/* Body - 양옆 패딩 8px */}
          <tbody>
            {QnAData.map((qna) => (
              <Tr key={qna.id}>
                <Td className="w-24 first:pl-7">{qna.id}</Td>
                <Td className="w-32">{qna.date}</Td>
                <Td>
                  <div className="line-clamp-1">{qna.QnAName}</div>
                </Td>

                <Td className="w-28 text-center">
                  <QnAStatus status={qna.status} />
                </Td>
              </Tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination - (overflow-auto 밖) */}
      <div className="h-14 px-5 border-t border-zinc-200 bg-white flex justify-end items-center gap-[29px] flex-shrink-0">
        <div className="flex items-center gap-7">
          <ChevronsLeft size={20} color="#DADFE7" />
          <ChevronLeft size={20} color="#DADFE7" />
          <div className="text-gray-400 text-sm font-medium">1 페이지</div>
          <ChevronRight size={20} color="#DADFE7" />
          <ChevronsRight size={20} color="#DADFE7" />
        </div>
      </div>
    </div>
  );
}

/* 문의 상태 */
function QnAStatus({ status }: { status: QnAStatus }) {
  if (status === 'before-ans') {
    return (
      <div className="px-2 py-0.5 bg-gray-100 rounded-3xl inline-flex justify-center items-center gap-2.5">
        <div className="justify-start text-gray-400 text-xs font-semibold ">
          답변 전
        </div>
      </div>
    );
  }

  // complete
  return (
    <div className="px-2 py-0.5 bg-emerald-50 rounded-3xl inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-emerald-600 text-xs font-semibold ">
        답변 완료
      </div>
    </div>
  );
}

interface TabItem {
  id: string;
  label: string;
  count: number;
  activeBg: string;
  activeText: string;
  activeBadge: string;
}

function TabFilter() {
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const tabs: TabItem[] = [
    {
      id: 'all',
      label: '전체',
      count: 99,
      activeBg: 'bg-sky-100',
      activeText: 'text-sky-500',
      activeBadge: 'bg-sky-500',
    },
    {
      id: 'pending',
      label: '답변 전',
      count: 2,
      activeBg: 'bg-gray-100',
      activeText: 'text-gray-500',
      activeBadge: 'bg-gray-500',
    },
    {
      id: 'completed',
      label: '답변 완료',
      count: 2,
      activeBg: 'bg-emerald-50',
      activeText: 'text-emerald-600',
      activeBadge: 'bg-emerald-600',
    },
  ];

  return (
    <div className="w-80 pl-px rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex items-center overflow-hidden">
      {tabs.map((tab) => {
        const isActive = selectedTab === tab.id;

        return (
          <div
            key={tab.id}
            className="flex-1 p-1.5 bg-white flex justify-center items-center"
          >
            <button
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 px-3 py-1.5 rounded-lg flex justify-center items-center gap-1.5 transition-colors ${
                isActive ? tab.activeBg : ''
              }`}
            >
              <div
                className={`text-base leading-6 whitespace-nowrap ${
                  isActive
                    ? `font-semibold ${tab.activeText}`
                    : 'font-medium text-gray-400'
                }`}
              >
                {tab.label}
              </div>

              <div
                className={`px-1 rounded-3xl flex justify-center items-center ${
                  isActive ? `pl-[5px] pr-1 ${tab.activeBadge}` : 'bg-gray-400'
                }`}
              >
                <div className="text-white text-xs font-semibold leading-4 whitespace-nowrap">
                  {tab.count > 99 ? '99+' : tab.count}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

function AddButton() {
  return (
    <button className="pl-4 pr-5 py-2.5 bg-blue-600 rounded-xl inline-flex justify-start items-center gap-1 hover:bg-blue-700 transition">
      <Plus size={20} color="white" strokeWidth={2} />
      <div className="justify-start text-white font-semibold">새 질문</div>
    </button>
  );
}

export default function QnA() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <>
      <CorporateLayout>
        {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
        {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between w-full flex-1">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row gap-2">
                <img src="/building.svg" />
                <p className="text-zinc-700 text-xl font-bold">Q&A 문의함</p>
              </div>
              <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
              <div className="flex flex-row">
                <TabFilter />
                <div className="flex flex-1"></div>
                <AddButton />
              </div>
              <div className="flex-1 flex flex-col">
                <QnATable />
              </div>
            </div>
          </div>
        </div>
      </CorporateLayout>
    </>
  );
}
