import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { Check } from 'lucide-react';
import { submitSamplingProposal } from '@/services/sampling/sampling.service';

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
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

function Agreement({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex flex-row gap-2">
      <Checkbox checked={checked} onChange={onChange} />
      <p className="text-gray-600 font-medium ">
        해당 내용에 대해 충분히 인지했으며, 동의합니다.
      </p>
    </div>
  );
}

export default function Step4Terms() {
  const navigate = useNavigate();
  const location = useLocation();
  const { samplingProposalId, campaignIds } = (location.state as {
    samplingProposalId?: number;
    campaignIds?: number[];
  }) || {};

  const [agreement1, setAgreement1] = useState(false);
  const [agreement2, setAgreement2] = useState(false);
  const [agreement3, setAgreement3] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allAgreed = agreement1 && agreement2 && agreement3;

  const handleNext = async () => {
    if (!samplingProposalId || !campaignIds || campaignIds.length === 0) {
      alert('샘플링 요청 정보가 없습니다. 이전 단계로 돌아가주세요.');
      navigate('/corporatesamplingrequest/step3');
      return;
    }

    if (!allAgreed) {
      alert('모든 약관에 동의해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await submitSamplingProposal({
        samplingProposalId,
        campaignIds,
      });
      navigate('/corporatesamplingrequest/stepDone', {
        state: { requestedCount: result.requestedCount, message: result.message }
      });
    } catch (error: any) {
      alert(error.message || '제출에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    navigate('/corporatesamplingrequest/step3', {
      state: { samplingProposalId }
    });
  };

  return (
    <CorporateLayout>
      {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
      {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
      <div className="flex flex-col min-h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" alt="" className="w-5 h-5" />
            <h1 className="text-[20px] font-semibold text-[#2D3139]">
              규정 확인 및 동의
            </h1>
          </div>
          <RequestStatus activeStep={4} />
        </div>
        <div className="border-t border-gray-200 mb-6" />

        {/*규정 동의 폼*/}
        <div className="flex flex-col gap-7">
          {/*꼭 확인해주세요*/}
          <div className="h-20 px-6 py-4 bg-pink-100/50 rounded-2xl inline-flex flex-col justify-center items-start gap-1">
            <div className="inline-flex justify-center items-center gap-1.5">
              <img src="/error.svg" />
              <p className="text-red-500 text-lg font-bold">꼭 확인해주세요</p>
            </div>

            <p className="text-red-400 font-medium">
              이용약관에 대한 사용자의 인지 및 이해는 전적으로 사용자 본인의
              책임이며, UNI:CONNECT는 이로 인한 문제에 책임을 지지 않습니다.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {/*이후 프로세스 안내*/}
            <>
              <div className="flex flex-col">
                <p className="text-gray-900 text-lg font-bold mb-3">
                  [필수] 이후 프로세스 안내
                </p>
                <div className="px-5 py-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 mb-4">
                  <p className="text-gray-500 text-sm font-medium">
                    학생 단체가 승인할 경우 매칭이 확정되며, 이후 계약서와 제품
                    설문지가 활성화될 예정입니다. 학생 단체가 거절할 경우
                    샘플링이 어렵습니다.
                  </p>
                </div>
                <Agreement checked={agreement1} onChange={setAgreement1} />
              </div>
            </>
            {/*플랫폼 이탈 협업 적발 시 불이익 안내*/}
            <>
              <div className="flex flex-col">
                <p className="text-gray-900 text-lg font-bold mb-3">
                  [필수] 플랫폼 이탈 협업 적발 시 불이익 안내
                </p>
                <div className="px-5 py-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 mb-4">
                  <p className="text-gray-500 text-sm font-medium">
                    UNI:CONNECT는 기업과 학생단체 간의 안전하고 투명한 협업을
                    보장하기 위해 모든 거래 과정을 플랫폼 내에서 관리합니다.
                    플랫폼 외부에서의 직거래·협업이 적발될 경우, 서비스 이용
                    제한 및 향후 캠페인 참여 불가 등의 불이익이 발생할 수
                    있습니다.
                  </p>
                </div>
                <Agreement checked={agreement2} onChange={setAgreement2} />
              </div>
            </>
            {/*이용 약관 안내*/}
            <>
              <div className="flex flex-col">
                <p className="text-gray-900 text-lg font-bold mb-3">
                  [필수] 이용 약관 안내
                </p>
                <div className="px-5 py-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 mb-4">
                  <p className="text-gray-500 text-sm font-medium">
                    <p className="font-bold">제1조 (목적)</p>본 약관은
                    UNI:CONNECT 플랫폼에서 제공하는 서비스의 이용조건 및 절차,
                    회사와 이용자의 권리, 의무, 책임사항을 규정함을 목적으로
                    합니다.
                    <p className="font-bold">
                      <br />
                      제2조 (정의)
                    </p>
                    1. "플랫폼"이란 회사가 운영하는 UNI:CONNECT 서비스를
                    의미합니다.
                    <br />
                    2. "이용자"란 본 약관에 따라 서비스를 이용하는 회원 및
                    비회원을 말합니다.
                    <p className="font-bold">
                      <br />
                      제3조 (서비스의 제공)
                    </p>
                  </p>
                </div>
                <Agreement checked={agreement3} onChange={setAgreement3} />
              </div>
            </>
          </div>
        </div>
        {/*다음 버튼 하단 정렬 영역*/}
        <div className="mt-auto flex justify-end items-end gap-4">
          <button
            onClick={handlePrev}
            disabled={isSubmitting}
            className="h-14 w-[200px] rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500"
          >
            <span className="text-sky-500 font-medium text-lg">이전</span>
          </button>
          <button
            onClick={handleNext}
            disabled={!allAgreed || isSubmitting}
            className={`h-14 w-[200px] rounded-xl transition-colors ${
              allAgreed && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <span className={`font-medium text-lg ${
              allAgreed && !isSubmitting ? 'text-white' : 'text-gray-500'
            }`}>
              {isSubmitting ? '제출 중...' : '제출'}
            </span>
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
