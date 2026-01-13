import React from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Trash2 } from 'lucide-react';

type TabType = 'history' | 'payment' | 'invoice' | 'refund';

function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<TabType>('history');

  const tabs = [
    {
      id: 'history',
      label: '결제 내역 조회',
      path: '/studentmypage/paymenthistory',
    },
    {
      id: 'payment',
      label: '결제 수단 관리',
      path: '/studentmypage/paymentmethod',
    }, // 예시 경로
    {
      id: 'invoice',
      label: '세금계산서/영수증 발행',
      path: '/studentmypage/contract',
    },
    {
      id: 'refund',
      label: '환불 처리',
      path: '/studentmypage/contract',
    },
  ];

  return (
    <div className="w-full h-14 bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border-b border-gray-100 inline-flex justify-center items-center overflow-hidden rounded-xl">
      {tabs.map((tab) => {
        // 현재 경로가 tab.path를 포함하고 있다면 활성화
        const isActive = location.pathname.includes(tab.path);

        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)} // 클릭 시 해당 경로로 이동
            className={`flex-1 self-stretch p-1.5 flex justify-center items-center gap-2.5 ${
              isActive ? 'bg-sky-100' : 'bg-white'
            }`}
          >
            <div
              className={`justify-start text-base ${
                isActive
                  ? 'text-sky-500 font-semibold'
                  : 'text-gray-400 font-medium'
              }`}
            >
              {tab.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
function BankAccountCard() {
  return (
    <div className="self-stretch px-5 py-4 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-center items-center gap-1">
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
        <h3 className="self-stretch text-zinc-700 text-lg font-semibold">
          국민은행 **** 5678
        </h3>
        <p className="self-stretch text-gray-400 text-base font-medium">
          예금주 : 홍길동
        </p>
      </div>
      <Trash2 size={20} color="#FF2B15" />
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
            <p className="text-zinc-700 text-xl font-bold">결제 수단 관리</p>
          </div>
          <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
        </div>
        <BankAccountCard />
      </div>
    </StudentLayout>
  );
}
