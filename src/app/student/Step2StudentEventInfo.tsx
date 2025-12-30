import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';
import ShortTermForm from './forms/ShortTermForm';
import LongTermForm from './forms/LongTermForm';

export default function Step2StudentEventInfo() {
  const navigate = useNavigate();
  const [direction, setDirection] = useState<'short' | 'long'>('short');

  return (
    <StudentLayout>
      {/* px-6을 추가하여 화면 끝에 붙어 잘리는 현상을 물리적으로 방지합니다. */}
      <div className="flex flex-col h-full w-full max-w-[1100px] mx-auto overflow-y-auto pb-10 px-6 scrollbar-hide">
        
        {/* 상단 헤더 */}
        <div className="flex justify-between items-start w-full mt-4 mb-2">
          <div>
            <h1 className="text-[24px] font-semibold mb-1">제휴 / 장기 협업</h1>
            <p className="text-[#949BA7] text-[15px]">행사 정보를 입력해주세요.</p>
          </div>
          {/* RequestStatus는 기존 컴포넌트 임포트 필요 */}
        </div>

        <div className="w-full py-4 mb-1">
          <div className="w-full h-px bg-gray-200" />
        </div>

        {/* 본문 영역 */}
        <div className="flex flex-col gap-12 w-full">
          {/* 협업 방향성 선택 */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-1">
              <img src="/File_Blue.png" alt="" className="w-5 h-5" />
              <h2 className="text-[18px] font-semibold text-[#2D3139]">희망 협업 방향성</h2>
              <span className="text-[#009FFF]">*</span>
            </div>

            <div className="flex flex-col gap-5">
              <DirectionCard 
                active={direction === 'short'} 
                onClick={() => setDirection('short')}
                title="샘플링"
                desc="One-time product sampling for evaluation or promotional purposes."
              />
              <DirectionCard 
                active={direction === 'long'} 
                onClick={() => setDirection('long')}
                title="장기 협업"
                desc="Long-term collaboration with recurring deliveries and dedicated support."
              />
            </div>
          </section>

          {/* 폼 렌더링 (각 폼 내부의 flex gap은 이제 min-w-0 덕분에 안전합니다) */}
          {direction === 'short' ? <ShortTermForm /> : <LongTermForm />}
        </div>

        {/* 하단 버튼 */}
        <div className="mt-16 flex justify-between items-center w-full pb-10">
          <button 
            onClick={() => navigate('/studentsampling/step1')} 
            className="h-14 w-[160px] border border-gray-300 rounded-xl text-[#949BA7] hover:bg-gray-50 transition-colors"
          >
            이전
          </button>
          <button 
            onClick={() => navigate('/studentsampling/step3')} 
            className="h-14 w-[200px] bg-[#007AFF] rounded-xl text-white font-bold hover:bg-[#0062CC] transition-colors"
          >
            다음
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}

function DirectionCard({ active, onClick, title, desc }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
        active ? 'border-[#008FFF] bg-[#F4FAFF]' : 'border-gray-200 bg-white'
      }`}
    >
      <div className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${active ? 'border-[#008FFF]' : 'border-gray-300'}`}>
        {active && <div className="h-2.5 w-2.5 rounded-full bg-[#008FFF]" />}
      </div>
      <div>
        <p className="font-bold mb-1 text-[#4B5563]">{title}</p>
        <p className="text-[13px] text-[#949BA7]">{desc}</p>
      </div>
    </button>
  );
}