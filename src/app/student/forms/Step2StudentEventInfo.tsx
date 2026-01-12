import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../../components/layout/StudentLayout';
import ShortTermForm from './ShortTermForm';
import LongTermForm from './LongTermForm';
import RequestStatus from '@/components/common/RequestStatus';
import { useCampaignForm } from '@/context/CampaignFormContext';
import type { CollaborationType } from '@/services/campaign.types';

export default function Step2StudentEventInfo() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCampaignForm();

  const handleDirectionChange = (direction: CollaborationType) => {
    updateFormData({ collaborationType: direction });
  };

  const handleNext = () => {
    // 필수 필드 검증
    if (!formData.name || !formData.locationName || !formData.startDate || !formData.endDate) {
      alert('행사 개요를 모두 입력해주세요.');
      return;
    }
    if (!formData.expectedParticipants || !formData.expectedExposures) {
      alert('참여자 구성 정보를 입력해주세요.');
      return;
    }
    navigate('/studentsampling/step3');
  };

  return (
    <StudentLayout>
      {/* px-6을 추가하여 화면 끝에 붙어 잘리는 현상을 물리적으로 방지 */}
      <div className="flex flex-col h-full w-full max-w-[960px] mx-auto overflow-y-auto pb-10 px-6 scrollbar-hide">

        {/* ================= 상단 헤더 ================= */}
        <div className="flex justify-between items-start w-full mt-4 mb-2">
          <div>
            <h1 className="text-[24px] font-semibold mb-1">
              제휴 / 장기 협업
            </h1>
            <p className="text-[#949BA7] text-[15px]">
              행사 정보를 입력해주세요.
            </p>
          </div>

          {/* Step 상태 표시 */}
          <RequestStatus activeStep={2} />
        </div>

        <div className="w-full py-4 mb-1">
          <div className="w-full h-px bg-gray-200" />
        </div>

        {/* ================= 본문 영역 ================= */}
        <div className="flex flex-col gap-12 w-full">

          {/* 협업 방향성 선택 */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-1">
              <img src="/File_Blue.png" alt="" className="w-5 h-5" />
              <h2 className="text-[18px] font-semibold text-[#2D3139]">
                희망 협업 방향성
              </h2>
              <span className="text-[#009FFF]">*</span>
            </div>

            <div className="flex flex-col gap-5">
              <DirectionCard
                active={formData.collaborationType === 'Sampling'}
                onClick={() => handleDirectionChange('Sampling')}
                title="샘플링"
                desc="One-time product sampling for evaluation or promotional purposes."
              />
              <DirectionCard
                active={formData.collaborationType === 'Partnership'}
                onClick={() => handleDirectionChange('Partnership')}
                title="장기 협업"
                desc="Long-term collaboration with recurring deliveries and dedicated support."
              />
            </div>
          </section>

          {/* 폼 렌더링 */}
          {formData.collaborationType === 'Sampling' ? <ShortTermForm /> : <LongTermForm />}
        </div>

        {/* ================= 하단 버튼 ================= */}
        <div className="mt-16 flex justify-between items-center w-full pb-10">
          <button
            onClick={() => navigate('/studentsampling/step1')}
            className="h-14 w-[160px] border border-gray-300 rounded-xl
              text-[#949BA7] hover:bg-gray-50 transition-colors"
          >
            이전
          </button>

          <button
            onClick={handleNext}
            className="h-14 w-[200px] bg-[#007AFF] rounded-xl
              text-white font-bold hover:bg-[#0062CC] transition-colors"
          >
            다음
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}

/* =========================
   Direction Card
========================= */
function DirectionCard({ active, onClick, title, desc }: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
        active
          ? 'border-[#008FFF] bg-[#F4FAFF]'
          : 'border-gray-200 bg-white'
      }`}
    >
      <div
        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          active ? 'border-[#008FFF]' : 'border-gray-300'
        }`}
      >
        {active && (
          <div className="h-2.5 w-2.5 rounded-full bg-[#008FFF]" />
        )}
      </div>

      <div>
        <p className="font-bold mb-1 text-[#4B5563]">{title}</p>
        <p className="text-[13px] text-[#949BA7]">{desc}</p>
      </div>
    </button>
  );
}
