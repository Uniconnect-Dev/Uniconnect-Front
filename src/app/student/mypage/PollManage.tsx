import React from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

import { useState, useEffect, useRef } from 'react';

import { FileText, Plus } from 'lucide-react';

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
      label: '공개',
      count: 99,
      activeBg: 'bg-sky-100',
      activeText: 'text-sky-500',
      activeBadge: 'bg-sky-500',
    },
    {
      id: 'hide',
      label: '비공개',
      count: 2,
      activeBg: 'bg-gray-100',
      activeText: 'text-gray-500',
      activeBadge: 'bg-gray-500',
    },
    {
      id: 'editing',
      label: '편집 중',
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

function SurveyCard() {
  return (
    <article className="p-6 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-gray-100 inline-flex flex-col justify-start items-start gap-3">
      {/* Header */}
      <header className="self-stretch flex flex-col justify-start items-start gap-4">
        {/* Status Badge */}
        <div className="px-2 py-0.5 bg-emerald-50 rounded-3xl inline-flex justify-center items-center gap-2.5">
          <span className="text-emerald-600 text-xs font-semibold">공개</span>
        </div>

        {/* Title & Product Name */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <h3 className="self-stretch text-zinc-700 text-lg font-semibold line-clamp-1">
            OO 제품 설문지인데요 truncate가 필요합니다.
          </h3>
          <p className="self-stretch text-gray-400 text-base font-medium">
            크라이치즈버거
          </p>
        </div>
      </header>

      {/* Divider */}
      <hr className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100 border-none" />

      {/* Footer */}
      <footer className="self-stretch inline-flex justify-end items-end gap-3">
        {/* Date & Question Count */}
        <div className="flex-1 flex justify-end items-start gap-3">
          <div className="flex-1 inline-flex flex-col justify-start items-start">
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <img src="/cal.svg" />
              <time className="text-gray-400 text-base font-medium">
                2000.00.00
              </time>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <FileText size={20} color="#949BA7" />
              <span className="text-gray-400 text-base font-medium">
                5개 문항
              </span>
            </div>
          </div>
        </div>

        {/* Response Count */}
        <div className="inline-flex flex-col justify-start items-start gap-2.5">
          <div className="px-2 py-1.5 bg-slate-100 rounded-lg inline-flex justify-start items-center gap-0.5">
            <img src="/user.svg" />
            <span className="text-gray-400 text-xs font-semibold">1,231</span>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default function PollManage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <>
      <StudentLayout>
        {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
        {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between w-full flex-1">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                  <img src="/building.svg" />
                  <p className="text-zinc-700 text-xl font-bold">설문지 관리</p>
                </div>
                <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
              </div>

              <div className="flex flex-row justify-between">
                <TabFilter />
                <button className="pl-6 pr-7 py-2.5 bg-blue-600 rounded-xl inline-flex justify-center items-center gap-1 hover:bg-blue-700 active:bg-blue-800 transition-colors">
                  <Plus size={20} color="white" />
                  <span className="text-white font-medium">설문지 제작</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <SurveyCard />
                <SurveyCard />
                <SurveyCard />
                <SurveyCard />
                <SurveyCard />
                <SurveyCard />
              </div>
            </div>
          </div>
        </div>
      </StudentLayout>
    </>
  );
}
