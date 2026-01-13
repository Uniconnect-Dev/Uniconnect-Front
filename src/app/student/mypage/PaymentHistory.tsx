import React from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

import { useState, useEffect, useRef } from 'react';

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

type PaymentStatus = 'paid' | 'unpaid';

interface PaymentData {
  id: string;
  date: string;
  organizationName: string;
  charge: string;
  option: string;
  total: string;
  status: PaymentStatus;
}

const PaymentDataList: PaymentData[] = [
  {
    id: '01',
    date: '2025.12.29',
    organizationName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    charge: '50,000',
    option: '428,000',
    total: '478,000',
    status: 'unpaid',
  },
  {
    id: '02',
    date: '2025.12.29',
    organizationName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    charge: '50,000',
    option: '428,000',
    total: '478,000',
    status: 'paid',
  },
  {
    id: '03',
    date: '2025.12.29',
    organizationName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    charge: '50,000',
    option: '428,000',
    total: '478,000',
    status: 'paid',
  },
];

function PaymentTable() {
  return (
    <div className="w-full h-full rounded-3xl outline outline-1 outline-zinc-200 bg-white flex flex-col overflow-hidden relative">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="bg-white border-b border-zinc-200 sticky top-0 z-10">
            <tr className="h-14">
              <Th className="w-24">연번</Th>
              <SortableTh className="w-32">결제일</SortableTh>
              <Th>학생 단체명</Th>
              <Th className="w-28">수수료</Th>
              <Th className="w-28">옵션 금액</Th>
              <Th className="w-28">총액</Th>
              <SortableTh className="w-32">결제 여부</SortableTh>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {PaymentDataList.map((payment) => (
              <Tr key={payment.id}>
                <Td className="w-24 first:pl-7">{payment.id}</Td>
                <Td className="w-32">{payment.date}</Td>
                <Td>
                  <div className="line-clamp-1">{payment.organizationName}</div>
                </Td>
                <Td className="w-28">{payment.charge}</Td>
                <Td className="w-28">{payment.option}</Td>
                <Td className="w-28">{payment.total}</Td>
                <Td className="w-32 last:pr-7">
                  <PaymentStatusButton status={payment.status} />
                </Td>
              </Tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

function PaymentStatusButton({ status }: { status: PaymentStatus }) {
  if (status === 'unpaid') {
    return (
      <button className="h-6 px-3 bg-sky-100 rounded-lg flex items-center gap-0.5 hover:bg-sky-200 transition-colors whitespace-nowrap">
        <span className="text-blue-600 text-xs font-semibold">결제하기</span>
      </button>
    );
  }

  return (
    <button className="h-6 px-3 bg-gray-100 rounded-lg flex items-center gap-0.5 hover:bg-gray-200 transition-colors whitespace-nowrap">
      <span className="text-gray-500 text-xs font-semibold">
        결제 내역 확인
      </span>
    </button>
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
      id: 'waiting',
      label: '결제 대기',
      count: 2,
      activeBg: 'bg-gray-100',
      activeText: 'text-gray-500',
      activeBadge: 'bg-gray-500',
    },
    {
      id: 'completed',
      label: '결제 완료',
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

function Searchinput({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative w-44">
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

type TabType = 'history' | 'payment' | 'invoice' | 'refund';

function Tabs() {
  const [activeTab, setActiveTab] = useState<TabType>('history');

  const tabs = [
    { id: 'history' as TabType, label: '결제 내역 조회' },
    { id: 'payment' as TabType, label: '결제 수단 관리' },
    { id: 'invoice' as TabType, label: '세금계산서/영수증 발행' },
    { id: 'refund' as TabType, label: '환불 처리' },
  ];

  return (
    <div className="w-full h-14 bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border-b border-gray-100 inline-flex justify-center items-center overflow-hidden rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 self-stretch p-1.5 flex justify-center items-center gap-2.5 ${
            activeTab === tab.id ? 'bg-sky-100' : 'bg-white'
          }`}
        >
          <div
            className={`justify-start text-base ${
              activeTab === tab.id
                ? 'text-sky-500 font-semibold'
                : 'text-gray-400 font-medium'
            }`}
          >
            {tab.label}
          </div>
        </button>
      ))}
    </div>
  );
}

export default function PaymentHistory() {
  return (
    <StudentLayout>
      <Tabs />

      <div className="flex flex-col h-full mt-10 gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <img src="/building.svg" />
            <p className="text-zinc-700 text-xl font-bold">결제 내역 조회</p>
          </div>
          <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
        </div>

        <div className="flex flex-row justify-between">
          <TabFilter />
          <Searchinput placeholder="학생 단체명 검색 .." />
        </div>

        <div className="flex-1 flex flex-col">
          <PaymentTable />
        </div>
      </div>
    </StudentLayout>
  );
}
