// QnA.tsx
import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';

import { useState, useEffect } from 'react';

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
import { useNavigate } from 'react-router-dom';
import { getQnAList } from '@/services/qna/qna.services';
import type { QnAItem } from '@/services/qna/qna.types';

type QnAStatus = 'before-ans' | 'complete';

interface QnAData {
  id: string;
  questionId: number;
  date: string;
  QnAName: string;
  status: QnAStatus;
}

function QnATable({ qnaList }: { qnaList: QnAData[] }) {
  const navigate = useNavigate();

  const handleRowClick = (questionId: number) => {
    navigate(`/corporatemypage/qna/${questionId}`);
  };

  return (
    <div className="w-full h-full rounded-3xl outline outline-1 outline-zinc-200 bg-white flex flex-col overflow-hidden relative">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-white border-b border-zinc-200 sticky top-0 z-10">
            <tr className="h-14">
              <Th className="w-24">연번</Th>
              <SortableTh className="w-32">등록일</SortableTh>
              <SortableTh>문의명</SortableTh>
              <Th className="w-28 text-center">문의 상태</Th>
            </tr>
          </thead>

          <tbody>
            {qnaList.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">
                  조회된 Q&A 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              qnaList.map((qna) => (
                <tr
                  key={qna.id}
                  onClick={() => handleRowClick(qna.questionId)}
                  className="h-14 border-b border-zinc-200 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <td className="w-24 pl-7 text-gray-600 text-sm font-medium">
                    {qna.id}
                  </td>
                  <td className="w-32 text-gray-600 text-sm font-medium">
                    {qna.date}
                  </td>
                  <td className="text-gray-600 text-sm font-medium">
                    <div className="line-clamp-1">{qna.QnAName}</div>
                  </td>
                  <td className="w-28 text-center">
                    <QnAStatus status={qna.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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

function TabFilter({
  selectedTab,
  onTabChange,
  counts,
}: {
  selectedTab: string;
  onTabChange: (tabId: string) => void;
  counts: { all: number; pending: number; completed: number };
}) {
  const tabs: TabItem[] = [
    {
      id: 'all',
      label: '전체',
      count: counts.all,
      activeBg: 'bg-sky-100',
      activeText: 'text-sky-500',
      activeBadge: 'bg-sky-500',
    },
    {
      id: 'pending',
      label: '답변 전',
      count: counts.pending,
      activeBg: 'bg-gray-100',
      activeText: 'text-gray-500',
      activeBadge: 'bg-gray-500',
    },
    {
      id: 'completed',
      label: '답변 완료',
      count: counts.completed,
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
              onClick={() => onTabChange(tab.id)}
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

export default function QnA() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [qnaList, setQnaList] = useState<QnAData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadQnAList();
  }, []);

  const loadQnAList = async () => {
    setIsLoading(true);
    try {
      const response = await getQnAList();
      console.log('API Response:', response);

      if (response && Array.isArray(response)) {
        const formattedData: QnAData[] = response.map(
          (item: QnAItem, index: number) => ({
            id: String(index + 1).padStart(2, '0'),
            questionId: item.questionId,
            date: item.createdAt
              ? new Date(item.createdAt)
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\. /g, '.')
                  .replace(/\.$/, '')
              : '-',
            QnAName: item.title,
            status: item.status === 'ANSWERED' ? 'complete' : 'before-ans',
          })
        );

        setQnaList(formattedData);
      } else {
        setQnaList([]);
      }
    } catch (err) {
      console.error('Q&A 데이터 로드 실패:', err);
      setQnaList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredQnaList = qnaList.filter((qna) => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'pending') return qna.status === 'before-ans';
    if (selectedTab === 'completed') return qna.status === 'complete';
    return true;
  });

  const counts = {
    all: qnaList.length,
    pending: qnaList.filter((q) => q.status === 'before-ans').length,
    completed: qnaList.filter((q) => q.status === 'complete').length,
  };

  return (
    <CorporateLayout>
      <div className="flex flex-col h-full">
        <div className="flex justify-between w-full flex-1">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-2">
              <img src="/building.svg" />
              <p className="text-zinc-700 text-xl font-bold">Q&A 문의함</p>
            </div>
            <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
            <div className="flex flex-row">
              <TabFilter
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                counts={counts}
              />
              <div className="flex flex-1"></div>
              <button
                onClick={() => navigate('/corporatemypage/addqna')}
                className="pl-4 pr-5 py-2.5 bg-blue-600 rounded-xl inline-flex justify-start items-center gap-1 hover:bg-blue-700 transition"
              >
                <Plus size={20} color="white" strokeWidth={2} />
                <div className="justify-start text-white font-semibold">
                  새 질문
                </div>
              </button>
            </div>
            <div className="flex-1 flex flex-col">
              <QnATable qnaList={filteredQnaList} />
            </div>
          </div>
        </div>
      </div>
    </CorporateLayout>
  );
}
