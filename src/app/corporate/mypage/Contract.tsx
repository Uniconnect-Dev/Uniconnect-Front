import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';

import { Search } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type ContractStatus = 'send' | 'before-sign' | 'complete';

interface ContractData {
  id: string;
  date: string;
  organizationName: string;
  collaborationType: string;
  status: ContractStatus;
}

const contractData: ContractData[] = [
  {
    id: '01',
    date: '2025.12.29',
    organizationName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    collaborationType: '샘플링',
    status: 'send',
  },
  {
    id: '02',
    date: '2025.12.29',
    organizationName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    collaborationType: '샘플링',
    status: 'before-sign',
  },
  {
    id: '03',
    date: '2025.12.29',
    organizationName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    collaborationType: '샘플링',
    status: 'complete',
  },
  {
    id: '04',
    date: '2025.12.29',
    organizationName:
      '이화여대 중앙 실전 IT 창업 학회 UNIS이화여대 중앙 실전 IT 창업 학회 UNIS',
    collaborationType: '샘플링',
    status: 'before-sign',
  },
];

function ContractTable() {
  return (
    <div className="w-full h-full rounded-3xl outline outline-1 outline-zinc-200 overflow-hidden bg-white flex flex-col">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          {/* Header - 패딩 없음 */}
          <thead className="bg-white border-b border-zinc-200">
            <tr className="h-14">
              <Th className="w-24">연번</Th>
              <Th className="w-32">매칭 성사일</Th>
              <Th>단체명</Th>
              <Th className="w-40">협업 형태</Th>
              <Th className="w-28 text-center">계약서 상세</Th>
              <Th className="w-32">계약 상태</Th>
            </tr>
          </thead>
        </table>

        {/* Body - 양옆 패딩 8px */}
        <div className="px-2">
          <table className="w-full border-collapse">
            <tbody>
              {contractData.map((contract) => (
                <Tr key={contract.id}>
                  <Td className="w-24">{contract.id}</Td>
                  <Td className="w-32">{contract.date}</Td>
                  <Td>
                    <div className="line-clamp-1">
                      {contract.organizationName}
                    </div>
                  </Td>
                  <Td className="w-40">{contract.collaborationType}</Td>
                  <Td className="w-28 text-center">
                    <ContractDetail status={contract.status} />
                  </Td>
                  <Td className="w-32">
                    <ContractStatusBadge status={contract.status} />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination - (overflow-auto 밖) */}
      <div className="h-14 px-5 border-t border-zinc-200 bg-white flex justify-end items-center gap-9 flex-shrink-0">
        <div className="flex items-center gap-7">
          <div className="w-6 h-6 relative rotate-180"></div>
          <div className="w-6 h-6 relative rotate-180">
            <div className="w-1.5 h-2.5 absolute left-[9px] top-[7px] border-2 border-zinc-200"></div>
          </div>
          <div className="text-gray-400 text-sm font-medium">1 페이지</div>
          <div className="w-6 h-6 relative">
            <div className="w-1.5 h-2.5 absolute left-[9px] top-[7px] border-2 border-zinc-200"></div>
          </div>
          <div className="w-6 h-6 relative"></div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sub Components ---------- */

function Th({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 text-left text-gray-400 text-sm font-medium ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-5 text-gray-600 text-sm font-medium ${className}`}>
      {children}
    </td>
  );
}
function Tr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="h-10 bg-white hover:bg-slate-100 transition">{children}</tr>
  );
}

/* 계약서 상세 버튼 */
function ContractDetail({ status }: { status: ContractStatus }) {
  if (status === 'send') {
    return (
      <div className="flex justify-center">
        <span className="text-gray-600">-</span>
      </div>
    );
  }

  if (status === 'before-sign') {
    return (
      <div className="flex justify-center">
        <div className="h-6 px-3 bg-gray-100 rounded-lg inline-flex items-center whitespace-nowrap">
          <span className="text-gray-600 text-xs font-semibold">
            계약서 보기
          </span>
        </div>
      </div>
    );
  }

  // complete
  return (
    <div className="flex justify-center">
      <div className="h-6 px-3 bg-sky-100 rounded-lg inline-flex items-center whitespace-nowrap">
        <span className="text-blue-600 text-xs font-semibold">서명본 보기</span>
      </div>
    </div>
  );
}

/* 계약 상태 배지 */
function ContractStatusBadge({ status }: { status: ContractStatus }) {
  if (status === 'send') {
    return (
      <div className="flex justify-start">
        <div className="h-6 pl-2 pr-3 bg-sky-100 rounded-lg inline-flex items-center gap-1">
          <div className="w-4 h-4 relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.33333V8"
                stroke="#2563EB"
                strokeWidth="1.33"
                strokeLinecap="round"
              />
              <path
                d="M12.6667 8H8"
                stroke="#2563EB"
                strokeWidth="1.33"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-blue-600 text-xs font-semibold whitespace-nowrap">
            계약서 전송
          </span>
        </div>
      </div>
    );
  }

  if (status === 'before-sign') {
    return (
      <div className="flex justify-start">
        <span className="px-2 py-0.5 bg-slate-100 rounded-3xl text-gray-400 text-xs font-semibold whitespace-nowrap">
          서명 전
        </span>
      </div>
    );
  }

  // complete
  return (
    <div className="flex justify-start">
      <span className="px-2 py-0.5 bg-emerald-50 rounded-3xl text-emerald-600 text-xs font-semibold whitespace-nowrap">
        계약 체결됨
      </span>
    </div>
  );
}

/* ---------- Search and Filter ---------- */

function Searchinput({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative w-80">
      <Search
        size={20}
        color="#6C727E"
        className="absolute left-4 top-1/2 -translate-y-1/2"
      />
      <input
        placeholder={placeholder}
        className="
          w-full
          pl-11 pr-4 py-4
          rounded-xl
          outline outline-1 outline-zinc-200
          placeholder:text-zinc-400
          focus:outline-zinc-300
        "
      />
    </div>
  );
}

function FilterButton() {
  return (
    <button
      className="
        inline-flex items-center gap-2
        px-4 py-3 rounded-xl
        outline outline-1 outline-zinc-200
        text-zinc-700
        hover:bg-zinc-50
        active:bg-zinc-100
        transition
      "
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
          stroke="currentColor"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-medium">필터링</span>
    </button>
  );
}

export default function Contract() {
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
                <p className="text-zinc-700 text-xl font-bold">계약서 작성</p>
              </div>
              <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
              <div className="flex flex-row">
                <Searchinput placeholder="단체명 검색 .." />
                <div className="flex flex-1"></div>
                <FilterButton />
              </div>
              <div className="flex-1 flex flex-col">
                <ContractTable />
              </div>
            </div>
          </div>
        </div>
      </CorporateLayout>
    </>
  );
}
