import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../../components/layout/StudentLayout';
import RequestStatus from '@/components/common/RequestStatus';

export default function Step4Agreement() {
  const navigate = useNavigate();

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
            className="h-14 w-[160px] border border-gray-300 rounded-xl
              text-[#949BA7] hover:bg-gray-50"
          >
            이전
          </button>

          <button
            disabled={!allChecked}
            onClick={() => navigate('/studentsampling/step5')}
            className={`h-14 w-[200px] rounded-xl font-bold
              ${
                allChecked
                  ? 'bg-[#007AFF] text-white hover:bg-[#0062CC]'
                  : 'bg-gray-300 text-white cursor-not-allowed'
              }`}
          >
            다음
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