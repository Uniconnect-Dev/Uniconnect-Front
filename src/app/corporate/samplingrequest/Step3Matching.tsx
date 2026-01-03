import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { ChevronRight, Check } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Checkbox() {
  const [checked, setChecked] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setChecked((prev) => !prev)}
      className={`
        w-5 h-5 rounded-md flex items-center justify-center
        transition-colors
        ${checked ? 'bg-blue-600' : 'border border-gray-400 bg-white'}
      `}
      role="checkbox"
      aria-checked={checked}
    >
      {checked && <Check size={14} strokeWidth={2.2} className="text-white" />}
    </button>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 bg-sky-100 rounded-3xl text-xs font-semibold text-sky-500">
      {label}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-1">
      <span className="text-base font-medium text-gray-400">{label}</span>
      <span className="text-base font-medium text-gray-500">{value}</span>
    </div>
  );
}

function SidePannal({
  eventName,
  isOpen,
  onClose,
}: {
  eventName: string | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`w-96 h-full bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] overflow-y-auto
        transform transition-all duration-300 ease-out 
        ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className="w-80 mx-auto mt-8 flex flex-col gap-9">
        {/* 헤더 */}
        <div className="flex flex-col gap-5">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0.5">
                <h1 className="text-xl font-bold text-zinc-700 leading-8">
                  {eventName}
                </h1>
                <p className="text-base font-semibold text-gray-500 leading-6">
                  이화여대 중앙 실전 IT 창업 학회 UNIS
                </p>
              </div>

              <button className="px-3 py-1 bg-sky-100 rounded-3xl flex items-center gap-1 text-sky-500 text-sm font-medium">
                상세
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="border-b border-gray-100" />
          </div>
        </div>

        {/* 행사 개요 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" alt="icon" className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-600">행사 개요</h2>
          </div>

          <div className="flex flex-col gap-2">
            <Row label="장소" value="고려대학교 민주광장" />
            <Row label="일시" value="2025.09.22" />
            <Row label="노출 인원" value="4,500명" />
            <Row label="샘플링 필요량" value="200개" />
          </div>
        </div>

        {/* 참여자 특성 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" alt="icon" className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-600">참여자 특성</h2>
          </div>

          <div className="flex flex-col gap-2">
            <Row label="연령대" value="19–25세 대학생" />
            <Row label="전공" value="인문사회계열" />
            <Row label="관심사" value="문화, 트렌드" />
          </div>
        </div>

        {/* 참여 규모 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" alt="icon" className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-600">참여 규모</h2>
          </div>

          <div className="flex flex-col gap-2">
            <Row label="총 예상 참여자" value="8,000" />
            <Row label="문과대학 학우" value="3,000" />
            <Row label="타 단과대 유동인구" value="5,000" />
          </div>
        </div>

        {/* 홍보 프로세스 */}
        <div className="flex flex-col gap-4 mb-[148px]">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" alt="icon" className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-600">
              홍보 프로세스
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            <Row label="문과대학 인스타그램 홍보" value="SNS 홍보" />
            <Row label="공지방 배포" value="카카오톡 공지" />
            <Row label="현장 광고 송출" value="LED 스크린" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchingTable({
  onSelectEvent,
}: {
  onSelectEvent: (eventName: string) => void;
}) {
  return (
    <div className="w-full h-[576px] bg-white rounded-3xl border border-zinc-200 overflow-hidden">
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
            <td className="pl-5">
              <div
                onClick={() => onSelectEvent('고려대학교 문과 대학 축제')}
                className="line-clamp-1 cursor-pointer transition-colors hover:text-blue-600 hover:font-bold"
              >
                고려대학교 문과 대학 축제
              </div>
            </td>
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
            <td className="pl-5">
              <div
                onClick={() => onSelectEvent('창업 동아리 연합 해커톤')}
                className="
                  line-clamp-1
                  cursor-pointer
                  transition-colors
                  hover:text-blue-600
                  hover:font-bold
                "
              >
                창업 동아리 연합 해커톤
              </div>
            </td>
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
  //네비게이션
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/corporatesamplingrequest/step4');
  };
  const handlePrev = () => {
    navigate('/corporatesamplingrequest/step2');
  };

  // 사이드바 토글 관련 상태
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <>
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
            <MatchingTable
              onSelectEvent={(eventName) => {
                setSelectedEvent(eventName);
                setIsPanelOpen(true);
              }}
            />
          </div>
          {/*다음 버튼 하단 정렬 영역*/}
          <div className="mt-auto flex justify-end items-end gap-4">
            <button
              onClick={handlePrev}
              className="h-14 w-[200px] rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500"
            >
              <span className="text-sky-500 font-medium text-lg">이전</span>
            </button>
            <button
              onClick={handleNext}
              className="h-14 w-[200px] bg-blue-600 rounded-xl"
            >
              <span className="text-white font-medium text-lg">다음</span>
            </button>
          </div>
        </div>
      </CorporateLayout>

      {/*사이드 패널*/}
      <div className="fixed right-4 top-4 bottom-4 z-50 pointer-events-none">
        <div
          className={`h-full ${
            isPanelOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <SidePannal
            eventName={selectedEvent}
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
