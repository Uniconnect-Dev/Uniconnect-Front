import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import { useState, useEffect, useRef } from 'react';
import { FileText, Plus, Calendar } from 'lucide-react';

// ============ 타입 정의 ============

interface TabItem {
  id: string;
  label: string;
  count: number;
  activeBg: string;
  activeText: string;
  activeBadge: string;
}

interface SurveyData {
  id: number;
  title: string;
  company: string;
  date: string;
  questionCount: number;
  responseCount: string;
  status: '공개' | '비공개' | '편집 중';
}

// ============ 데이터 (하드코딩) ============

const SURVEY_LIST: SurveyData[] = [
  {
    id: 1,
    title: '연세대 공과대학 10반 샘플링 설문지 (초코맛)',
    company: '크라이치즈버거',
    date: '2025.06.12',
    questionCount: 7,
    responseCount: '1,231',
    status: '공개',
  },
  {
    id: 2,
    title: '연세대 정치외교학과 샘플링 설문지 (초코맛)',
    company: '크라이치즈버거',
    date: '2025.06.10',
    questionCount: 7,
    responseCount: '852',
    status: '공개',
  },
  {
    id: 3,
    title: '이화여자대학교 데이터사이언스학과 샘플링 설문지 (초코맛)',
    company: '크라이치즈버거',
    date: '2025.06.10',
    questionCount: 7,
    responseCount: '1,042',
    status: '공개',
  },
  {
    id: 4,
    title: '서강대학교 자연과학대학 샘플링 설문지 (바나나맛)',
    company: '크라이치즈버거',
    date: '2025.06.12',
    questionCount: 6,
    responseCount: '945',
    status: '공개',
  },
  {
    id: 5,
    title: '이화여자대학교 경제학과 샘플링 설문지 (초코맛)',
    company: '크라이치즈버거',
    date: '2025.06.11',
    questionCount: 6,
    responseCount: '763',
    status: '공개',
  },
  {
    id: 6,
    title: '연세대학교 건설환경공학과 샘플링 설문지 (쿠앤크맛)',
    company: '크라이치즈버거',
    date: '2025.06.10',
    questionCount: 6,
    responseCount: '1,120',
    status: '공개',
  },
];

// ============ 컴포넌트 ============

function TabFilter() {
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const tabs: TabItem[] = [
    {
      id: 'all',
      label: '공개',
      count: 6,
      activeBg: 'bg-sky-100',
      activeText: 'text-sky-500',
      activeBadge: 'bg-sky-500',
    },
    {
      id: 'hide',
      label: '비공개',
      count: 0,
      activeBg: 'bg-gray-100',
      activeText: 'text-gray-500',
      activeBadge: 'bg-gray-500',
    },
    {
      id: 'editing',
      label: '편집 중',
      count: 0,
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

function SurveyCard({ data }: { data: SurveyData }) {
  return (
    <article className="p-6 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-gray-100 flex flex-col justify-start items-start gap-3 hover:shadow-md transition-shadow">
      {/* Header */}
      <header className="self-stretch flex flex-col justify-start items-start gap-4">
        {/* Status Badge */}
        <div className="px-2 py-0.5 bg-emerald-50 rounded-3xl inline-flex justify-center items-center gap-2.5">
          <span className="text-emerald-600 text-xs font-semibold">
            {data.status}
          </span>
        </div>

        {/* Title & Product Name */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <h3
            className="self-stretch text-zinc-700 text-lg font-semibold line-clamp-1"
            title={data.title}
          >
            {data.title}
          </h3>
          <p className="self-stretch text-gray-400 text-base font-medium">
            {data.company}
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
              <img src="/cal.svg" alt="calendar" className="w-5 h-5" />
              <time className="text-gray-400 text-base font-medium">
                {data.date}
              </time>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <FileText size={20} color="#949BA7" />
              <span className="text-gray-400 text-base font-medium">
                {data.questionCount}개 문항
              </span>
            </div>
          </div>
        </div>

        {/* Response Count */}
        <div className="inline-flex flex-col justify-start items-start gap-2.5">
          <div className="px-2 py-1.5 bg-slate-100 rounded-lg inline-flex justify-start items-center gap-0.5">
            <img src="/user.svg" alt="user" />
            <span className="text-gray-400 text-xs font-semibold">
              {data.responseCount}
            </span>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default function PollManage() {
  return (
    <CorporateLayout>
      <div className="flex flex-col h-full">
        <div className="flex justify-between w-full flex-1">
          <div className="flex flex-col gap-5 w-full">
            {/* 상단 타이틀 바 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <img src="/building.svg" alt="building icon" />
                <h2 className="text-zinc-700 text-xl font-bold">설문지 관리</h2>
              </div>
              <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
            </div>

            {/* 필터 및 액션 버튼 */}
            <div className="flex flex-row justify-between items-center">
              <TabFilter />
              <button className="pl-6 pr-7 py-2.5 bg-blue-600 rounded-xl inline-flex justify-center items-center gap-1 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm">
                <Plus size={20} color="white" />
                <span className="text-white font-medium">설문지 제작</span>
              </button>
            </div>

            {/* 설문지 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
              {SURVEY_LIST.map((survey) => (
                <SurveyCard key={survey.id} data={survey} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </CorporateLayout>
  );
}
