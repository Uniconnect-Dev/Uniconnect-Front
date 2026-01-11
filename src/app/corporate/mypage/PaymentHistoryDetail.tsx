import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';

import { useState, useEffect, useRef } from 'react';

import {
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
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
export default function PaymentHistoryDetail() {
  return (
    <CorporateLayout>
      <Tabs />
      <div className="w-full inline-flex flex-col justify-start items-start gap-5 mt-10">
        {/* Header Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          {/* Back Button */}
          <button className="pl-1.5 pr-3 py-1.5 bg-slate-100 rounded-lg inline-flex justify-start items-center gap-1 hover:bg-slate-200 transition-colors">
            <ChevronLeft size={16} color="#949BA7" />
            <span className="text-gray-400 text-base font-semibold">이전</span>
          </button>

          {/* Title & Actions */}
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="inline-flex flex-col justify-start items-start gap-2">
              <div className="inline-flex justify-center items-center gap-2">
                <h1 className="text-zinc-700 text-2xl font-bold">
                  결제 영수증 상세
                </h1>
                <div className="px-2 py-0.5 bg-sky-100 rounded-3xl flex justify-center items-center gap-2.5">
                  <span className="text-sky-500 text-xs font-semibold">
                    결제 필요
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-base font-medium">
                RCP-2024-001234
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-start items-center gap-2">
              <button className="px-5 py-2.5 bg-gray-900 rounded-xl flex justify-start items-center gap-3 hover:bg-gray-800 transition-colors">
                <Download size={20} color="white" />
                <span className="text-white text-base font-semibold">
                  다운로드
                </span>
              </button>
              <button className="w-32 px-5 py-2.5 bg-blue-600 rounded-xl flex justify-center items-center gap-3 hover:bg-blue-700 transition-colors">
                <span className="text-white text-base font-semibold">
                  결제하기
                </span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100 border-none" />
        </div>

        {/* Content Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          {/* Payment & Customer Info Row */}
          <div className="self-stretch inline-flex justify-start items-stretch gap-4">
            {/* Payment Info */}
            <section className="flex-1 p-6 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex flex-col justify-start items-start gap-4">
              <h2 className="self-stretch text-gray-900 text-lg font-semibold">
                결제 정보
              </h2>
              <dl className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-between items-center">
                  <dt className="text-gray-400 text-base font-medium">
                    결제일시
                  </dt>
                  <dd className="text-gray-600 text-base font-medium">
                    2025.11.15 14:32
                  </dd>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <dt className="text-gray-400 text-base font-medium">
                    결제수단
                  </dt>
                  <dd className="text-gray-600 text-base font-medium">
                    신용카드
                  </dd>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <dt className="text-gray-400 text-base font-medium">
                    카드번호
                  </dt>
                  <dd className="text-gray-600 text-base font-medium">
                    ****-****-****-1234
                  </dd>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <dt className="text-gray-400 text-base font-medium">
                    승인 번호
                  </dt>
                  <dd className="text-gray-600 text-base font-medium">
                    12345678
                  </dd>
                </div>
              </dl>
            </section>

            {/* Customer Info */}
            <section className="flex-1 p-6 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex flex-col justify-start items-start gap-4">
              <h2 className="self-stretch text-gray-900 text-lg font-semibold">
                고객 정보
              </h2>
              <dl className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-between items-center">
                  <dt className="text-gray-400 text-base font-medium">
                    고객명
                  </dt>
                  <dd className="text-gray-600 text-base font-medium">
                    홍길동
                  </dd>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <dt className="text-gray-400 text-base font-medium">
                    이메일
                  </dt>
                  <dd className="text-gray-600 text-base font-medium">
                    hong@gmail.com
                  </dd>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <dt className="text-gray-400 text-base font-medium">
                    연락처
                  </dt>
                  <dd className="text-gray-600 text-base font-medium">
                    010-0000-0000
                  </dd>
                </div>
              </dl>
            </section>
          </div>

          {/* Purchase Details */}
          <section className="self-stretch p-6 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 flex flex-col justify-start items-start gap-4">
            <h2 className="self-stretch text-gray-900 text-lg font-semibold">
              구매 내역
            </h2>

            {/* Table */}
            <div className="self-stretch py-2 bg-slate-100 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 flex flex-col justify-start items-start gap-0.5">
              {/* Table Header */}
              <div className="self-stretch border-b border-zinc-200 inline-flex justify-start items-center">
                <div className="flex-1 px-5 py-2 flex justify-start items-center gap-2.5">
                  <span className="text-gray-400 text-base font-medium">
                    이용 서비스
                  </span>
                </div>
                <div className="w-24 px-5 py-2 flex justify-start items-center gap-2.5">
                  <span className="text-gray-400 text-base font-medium">
                    수량
                  </span>
                </div>
                <div className="px-5 py-2 flex justify-start items-center gap-2.5">
                  <span className="w-28 text-gray-400 text-base font-medium">
                    단가
                  </span>
                </div>
                <div className="px-5 py-2 flex justify-start items-center gap-2.5">
                  <span className="w-28 text-gray-400 text-base font-medium">
                    금액
                  </span>
                </div>
              </div>

              {/* Table Body */}
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch inline-flex justify-start items-center">
                  <div className="flex-1 px-5 py-2 flex justify-start items-center gap-2.5">
                    <span className="text-gray-600 text-base font-medium">
                      제휴 수수료
                    </span>
                  </div>
                  <div className="w-24 px-5 py-2 flex justify-start items-center gap-2.5">
                    <span className="text-gray-600 text-base font-medium">
                      1
                    </span>
                  </div>
                  <div className="px-5 py-2 flex justify-start items-center gap-2.5">
                    <span className="w-28 text-gray-600 text-base font-medium">
                      50,000
                    </span>
                  </div>
                  <div className="px-5 py-2 flex justify-start items-center gap-2.5">
                    <span className="w-28 text-gray-600 text-base font-medium">
                      50,000
                    </span>
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center">
                  <div className="flex-1 px-5 py-2 flex justify-start items-center gap-2.5">
                    <span className="text-gray-600 text-base font-medium">
                      추가 마케팅
                    </span>
                  </div>
                  <div className="w-24 px-5 py-2 flex justify-start items-center gap-2.5">
                    <span className="text-gray-600 text-base font-medium">
                      2
                    </span>
                  </div>
                  <div className="px-5 py-2 flex justify-start items-center gap-2.5">
                    <span className="w-28 text-gray-600 text-base font-medium">
                      150,000
                    </span>
                  </div>
                  <div className="px-5 py-2 flex justify-start items-center gap-2.5">
                    <span className="w-28 text-gray-600 text-base font-medium">
                      300,000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100 border-none" />

            {/* Subtotal & Fees */}
            <dl className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <div className="self-stretch inline-flex justify-between items-center">
                <dt className="text-gray-400 text-base font-medium">소계</dt>
                <dd className="text-gray-600 text-base font-medium">
                  345,000 원
                </dd>
              </div>
              <div className="self-stretch inline-flex justify-between items-center">
                <dt className="text-gray-400 text-base font-medium">할인</dt>
                <dd className="text-gray-600 text-base font-medium">
                  - 39,000 원
                </dd>
              </div>
              <div className="self-stretch inline-flex justify-between items-center">
                <dt className="text-gray-400 text-base font-medium">
                  부가세(10%)
                </dt>
                <dd className="text-gray-600 text-base font-medium">
                  5,000 원
                </dd>
              </div>
            </dl>

            {/* Divider */}
            <hr className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100 border-none" />

            {/* Total */}
            <div className="self-stretch h-8 inline-flex justify-end items-center gap-5">
              <dt className="text-gray-600 text-base font-semibold">
                총 결제 금액
              </dt>
              <dd className="flex justify-end items-center gap-1">
                <span className="text-gray-900 text-2xl font-bold">27,000</span>
                <span className="text-gray-900 text-lg font-semibold">원</span>
              </dd>
            </div>
          </section>
        </div>
      </div>
    </CorporateLayout>
  );
}
