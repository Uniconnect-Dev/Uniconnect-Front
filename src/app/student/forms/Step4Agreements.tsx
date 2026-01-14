import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../../components/layout/StudentLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { useCampaignForm } from '@/context/CampaignFormContext';
import {
  createCampaign,
  uploadCampaignProposal,
  submitCampaign,
} from '@/services/campaign.service';
import type { CreateCampaignRequest } from '@/services/campaign.types';

export default function Step4Agreement() {
  const navigate = useNavigate();
  const { formData, updateFormData, setCampaignId, resetFormData } = useCampaignForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [checks, setChecks] = useState({
    process: false,
    fee: false,
    violation: false,
    terms: false,
  });

  const allChecked =
    checks.process && checks.fee && checks.violation && checks.terms;

  const toggle = (key: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async () => {
    if (!allChecked) return;

    // 디버깅: 전송할 데이터 확인
    console.log('=== 전송할 캠페인 데이터 ===');
    console.log('name:', formData.name);
    console.log('startDate:', formData.startDate);
    console.log('endDate:', formData.endDate);
    console.log('locationName:', formData.locationName);
    console.log('purpose:', formData.purpose);
    console.log('collaborationType:', formData.collaborationType);
    console.log('expectedParticipants:', formData.expectedParticipants);
    console.log('expectedExposures:', formData.expectedExposures);
    console.log('targetAgeDesc:', formData.targetAgeDesc);
    console.log('targetMajorDesc:', formData.targetMajorDesc);
    console.log('preferredIndustry1:', formData.preferredIndustry1);
    console.log('preferredIndustry2:', formData.preferredIndustry2);
    console.log('recommendedSamplingQty:', formData.recommendedSamplingQty);
    console.log('boothFee:', formData.boothFee);
    console.log('studentTypeTagIds:', formData.studentTypeTagIds);
    console.log('regionTagIds:', formData.regionTagIds);
    console.log('hobbyTagIds:', formData.hobbyTagIds);
    console.log('lifestyleTagIds:', formData.lifestyleTagIds);
    console.log('eventPrograms:', formData.eventPrograms);
    console.log('marketingMethods:', formData.marketingMethods);
    console.log('promotionPlans:', formData.promotionPlans);
    console.log('extraRequest:', formData.extraRequest);
    console.log('selectedCompanyIds:', formData.selectedCompanyIds);
    console.log('==============================');

    setIsSubmitting(true);
    try {
      // 1. 캠페인 생성
      const campaignRequest: CreateCampaignRequest = {
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
        locationName: formData.locationName,
        purpose: formData.purpose,
        collaborationType: formData.collaborationType,
        expectedParticipants: formData.expectedParticipants,
        expectedExposures: formData.expectedExposures,
        targetAgeDesc: formData.targetAgeDesc,
        targetMajorDesc: formData.targetMajorDesc,
        preferredIndustry1: formData.preferredIndustry1,
        preferredIndustry2: formData.preferredIndustry2,
        recommendedSamplingQty: formData.recommendedSamplingQty,
        boothFee: formData.boothFee,
        studentTypeTagIds: formData.studentTypeTagIds,
        regionTagIds: formData.regionTagIds,
        hobbyTagIds: formData.hobbyTagIds,
        lifestyleTagIds: formData.lifestyleTagIds,
        eventPrograms: formData.eventPrograms,
        marketingMethods: formData.marketingMethods,
        promotionPlans: formData.promotionPlans || '',
        extraRequest: formData.extraRequest,
      };

      const createResponse = await createCampaign(campaignRequest);

      // 디버깅: API 응답 확인
      console.log('=== createCampaign 응답 ===', createResponse);

      // 응답 구조에 따라 campaignId 추출
      let campaignId: number;
      if (typeof createResponse === 'number') {
        campaignId = createResponse;
      } else if (createResponse?.data !== undefined) {
        campaignId = createResponse.data;
      } else if (createResponse?.campaignId !== undefined) {
        campaignId = createResponse.campaignId;
      } else {
        console.error('campaignId를 찾을 수 없음:', createResponse);
        throw new Error('캠페인 생성 응답에서 ID를 찾을 수 없습니다.');
      }

      console.log('추출된 campaignId:', campaignId);
      setCampaignId(campaignId);

      // 2. 제안서 파일 업로드 (파일이 있는 경우)
      if (formData.proposalFile) {
        await uploadCampaignProposal(campaignId, formData.proposalFile);
      }

      // 3. 최종 제출
      await submitCampaign(campaignId);

      // 4. 폼 데이터 초기화 및 완료 페이지로 이동
      updateFormData({ agreedToTerms: true });
      navigate('/studentsampling/step5');
    } catch (error) {
      console.error('캠페인 제출 실패:', error);
      alert('제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StudentLayout>
      <div className="flex flex-col w-full max-w-[960px] mx-auto px-6 pb-12">

        {/* ================= 헤더 ================= */}
        <div className="flex justify-between items-start mt-4 mb-2">
          <div>
            <h1 className="text-[24px] font-semibold mb-1">
              샘플링 규정 확인 및 동의
            </h1>
            <p className="text-[#949BA7] text-[15px]">
              안전하고 투명한 협업을 위한 필수 동의 절차입니다.
            </p>
          </div>
          <RequestStatus activeStep={4} />
        </div>

        <div className="border-t border-gray-200 my-4" />

        {/* ================= 경고 박스 ================= */}
        <div className="mb-8 rounded-xl bg-[#FFF1F0] px-5 py-4">
          <p className="text-[#FF433C] text-[18px] font-semibold tracking-[-0.27px]">
            꼭 확인해주세요
          </p>
          <p className="text-[#F76A65] text-[16px] leading-relaxed tracking-[-0.24px]">
            이용약관에 대한 사용자의 인지 및 이해는 전적으로 사용자 본인의 책임이며,
            UNI:CONNECT는 이로 인한 문제에 책임을 지지 않습니다.
          </p>
        </div>

        {/* ================= 약관 섹션 ================= */}
        <AgreementBlock
          title="[필수] 이후 프로세스 안내"
          content="기업이 승인할 경우 매칭이 확정되며, 이후 계약서와 제품 설문지가 활성화될 예정입니다. 기업이 거절할 경우 샘플링이 어려울 수 있습니다."
          checked={checks.process}
          onChange={() => toggle('process')}
        />

        <AgreementBlock
          title="[필수] 금액 안내 및 확인"
          content="UNI:CONNECT 내 매칭 성사 시 수수료 50,000원과 보증금 50,000원이 발생하며, 계약 내용 기반 샘플링이 성실하게 이루어진 경우 보증금 50,000원은 반환됩니다. 더 정확한 이용료는 매칭 확정 시 확인하실 수 있습니다. 또한, 안전한 매칭을 위해 매칭 성사 후 취소/환불할 경우 보증금 50,000원의 경우 반환이 어렵습니다."
          checked={checks.fee}
          onChange={() => toggle('fee')}
        />

        <AgreementBlock
          title="[필수] 플랫폼 이탈 협업 시 불이익 안내"
          content="UNI:CONNECT는 기업과 학생단체 간의 안전하고 투명한 협업을 보장하기 위해 모든 거래 과정을 플랫폼 내에서 관리합니다. 플랫폼 외부에서의 직거래·협업이 적발될 경우, 서비스 이용 제한 및 향후 캠페인 참여 불가 등의 불이익이 발생할 수 있습니다."
          checked={checks.violation}
          onChange={() => toggle('violation')}
        />

        <AgreementBlock
          title="[필수] 이용 약관 안내"
          content={`제1조 (목적)
본 약관은 UNI:CONNECT 플랫폼이 제공하는 서비스의 이용 조건 및 절차, 권리와 의무를 규정함을 목적으로 합니다.

제2조 (정의)
플랫폼이란 회사가 운영하는 UNI:CONNECT 서비스를 의미합니다.`}
          checked={checks.terms}
          onChange={() => toggle('terms')}
          scroll
        />

        {/* ================= 하단 버튼 ================= */}
        <div className="mt-16 flex justify-between">
          <button
            onClick={() => navigate('/studentsampling/step3')}
            disabled={isSubmitting}
            className="h-14 w-[160px] border border-gray-300 rounded-xl
              text-[#949BA7] hover:bg-gray-50 disabled:opacity-50"
          >
            이전
          </button>

          <button
            disabled={!allChecked || isSubmitting}
            onClick={handleSubmit}
            className={`h-14 w-[200px] rounded-xl font-bold
              ${
                allChecked && !isSubmitting
                  ? 'bg-[#007AFF] text-white hover:bg-[#0062CC]'
                  : 'bg-gray-300 text-white cursor-not-allowed'
              }`}
          >
            {isSubmitting ? '제출 중...' : '제출하기'}
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}

/* ================= 약관 블록 ================= */
function AgreementBlock({
  title,
  content,
  checked,
  onChange,
  scroll = false,
}: {
  title: string;
  content: string;
  checked: boolean;
  onChange: () => void;
  scroll?: boolean;
}) {
  return (
    <div className="mb-8">
      <p className="font-bold mb-4 text-[18px] text-[#3A404A] tracking-[-0.27px]">
        {title}
      </p>

      <div
        className={`rounded-xl border p-5 text-[16px] tracking-[-0.24px] text-[#6C727E] leading-relaxed bg-white
          ${scroll ? 'max-h-[180px] overflow-y-auto' : ''}
        `}
      >
        {content}
      </div>

      <label className="flex items-center gap-2 mt-4 text-[16px] tracking-[-0.24px] text-[#585F69] cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="scale-150 accent-[#007AFF] border border-gray-300"
        />
        해당 내용을 충분히 인지했으며, 동의합니다.
      </label>
    </div>
  );
}
