import React, { useEffect, useState } from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import axios from 'axios';
import { getAccessToken } from '@/lib/auth/token';

import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import Th from '../../../components/common/tableRelated/Th';
import SortableTh from '@/components/common/tableRelated/SortableTh';
import Tr from '@/components/common/tableRelated/Tr';
import Td from '@/components/common/tableRelated/Td';

/* ================= 타입 ================= */

type MatchingStatus = 'waiting' | 'successed' | 'faild';
type Process =
  | 'contractConfirmed'
  | 'contractWriting'
  | 'manageForm'
  | 'sendProduct'
  | 'dataReport'
  | 'payment';

type CollaborationType = 'sampling' | 'partnership';
type Direction = 'requested' | 'received';

interface MatchingData {
  id: string;
  date: string;
  organizationName: string;
  collaborationType: CollaborationType;
  status: MatchingStatus;
  process: Process;
  direction: Direction; // ⭐ 핵심
}

interface MatchingAPIResponse {
  matchingId: number;
  studentClub: string;
  collaborationType: string;
  matchedAt: string;
  isRequester: boolean; // ⭐ 서버 기준
}

/* ================= 탭 ================= */

function TabFilter({
  selectedTab,
  onTabChange,
  counts,
}: {
  selectedTab: 'requested' | 'received';
  onTabChange: (tab: 'requested' | 'received') => void;
  counts: { requested: number; received: number };
}) {
  const tabs = [
    {
      id: 'requested',
      label: '요청한 매칭',
      count: counts.requested,
      activeBg: 'bg-sky-100',
      activeText: 'text-sky-500',
      activeBadge: 'bg-sky-500',
    },
    {
      id: 'received',
      label: '받은 요청',
      count: counts.received,
      activeBg: 'bg-gray-100',
      activeText: 'text-gray-500',
      activeBadge: 'bg-gray-500',
    },
  ] as const;

  return (
    <div className="w-80 pl-px rounded-xl outline outline-1 outline-zinc-200 inline-flex overflow-hidden">
      {tabs.map((tab) => {
        const isActive = selectedTab === tab.id;
        return (
          <div key={tab.id} className="flex-1 p-1.5">
            <button
              onClick={() => onTabChange(tab.id)}
              className={`w-full px-3 py-1.5 rounded-lg flex justify-center items-center gap-1.5 ${
                isActive ? tab.activeBg : ''
              }`}
            >
              <span
                className={`text-base ${
                  isActive
                    ? `font-semibold ${tab.activeText}`
                    : 'font-medium text-gray-400'
                }`}
              >
                {tab.label}
              </span>
              <span
                className={`px-1 rounded-full text-xs font-semibold text-white ${
                  isActive ? tab.activeBadge : 'bg-gray-400'
                }`}
              >
                {tab.count > 99 ? '99+' : tab.count}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ================= 테이블 ================= */

function MatchingTable({ matchings }: { matchings: MatchingData[] }) {
  return (
    <div className="w-full h-full rounded-3xl outline outline-1 outline-zinc-200 bg-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="border-b border-zinc-200 sticky top-0 bg-white">
            <tr className="h-14">
              <Th className="w-24">연번</Th>
              <SortableTh className="w-32">희망 협업일</SortableTh>
              <SortableTh>기업명</SortableTh>
              <Th className="w-28">협업 유형</Th>
            </tr>
          </thead>
          <tbody>
            {matchings.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400">
                  조회된 매칭 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              matchings.map((m) => (
                <Tr key={m.id}>
                  <Td className="pl-7">{m.id}</Td>
                  <Td>{m.date}</Td>
                  <Td>{m.organizationName}</Td>
                  <Td>{m.collaborationType}</Td>
                </Tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="h-14 px-5 border-t border-zinc-200 flex justify-end items-center gap-7">
        <ChevronsLeft size={20} color="#DADFE7" />
        <ChevronLeft size={20} color="#DADFE7" />
        <span className="text-sm text-gray-400">1 페이지</span>
        <ChevronRight size={20} color="#DADFE7" />
        <ChevronsRight size={20} color="#DADFE7" />
      </div>
    </div>
  );
}

/* ================= 메인 ================= */

export default function MatchingResult() {
  const [matchings, setMatchings] = useState<MatchingData[]>([]);
  const [selectedTab, setSelectedTab] = useState<'requested' | 'received'>(
    'requested'
  );

  useEffect(() => {
    loadMatchings();
  }, []);

  const loadMatchings = async () => {
    const token = getAccessToken();

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/contracts/matchings/company`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data: MatchingData[] = res.data.data.map(
      (item: MatchingAPIResponse, index: number) => ({
        id: String(index + 1).padStart(2, '0'),
        date: new Date(item.matchedAt)
          .toLocaleDateString('ko-KR')
          .replace(/\. /g, '.')
          .replace(/\.$/, ''),
        organizationName: item.studentClub,
        collaborationType:
          item.collaborationType === '샘플링' ? 'sampling' : 'partnership',
        status: 'waiting',
        process: 'contractConfirmed',
        direction: item.isRequester ? 'requested' : 'received',
      })
    );

    setMatchings(data);
  };

  /* ===== count 계산 ===== */
  const counts = {
    requested: matchings.filter((m) => m.direction === 'requested').length,
    received: matchings.filter((m) => m.direction === 'received').length,
  };

  const filteredMatchings = matchings.filter((m) =>
    selectedTab === 'requested'
      ? m.direction === 'requested'
      : m.direction === 'received'
  );

  return (
    <CorporateLayout>
      <div className="flex flex-col h-full gap-4">
        <div className="flex gap-2 items-center">
          <img src="/building.svg" />
          <h1 className="text-xl font-bold text-zinc-700">매칭 결과</h1>
        </div>

        <TabFilter
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          counts={counts}
        />

        <MatchingTable matchings={filteredMatchings} />
      </div>
    </CorporateLayout>
  );
}
