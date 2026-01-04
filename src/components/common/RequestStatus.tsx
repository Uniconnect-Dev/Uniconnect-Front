import React from 'react';

interface Step {
  id: number;
  label: string;
}

interface RequestStatusProps {
  activeStep: number;
}

const STEPS: Step[] = [
  { id: 1, label: '단체 정보' },
  { id: 2, label: '행사 정보' },
  { id: 3, label: '기업 선택' },
  { id: 4, label: '약관 동의' },
];

export default function RequestStatus({ activeStep }: RequestStatusProps) {
  return (
    <div className="inline-flex items-center gap-7 mt-3.5">
      {STEPS.map((step) => {
        const isActive = step.id === activeStep;

        return (
          <div key={step.id} className="flex items-center gap-3">
            <div
              className={`
                w-6 h-6 rounded-full inline-flex justify-center items-center
                text-sm font-medium
                ${
                  isActive
                    ? 'bg-[#007AFF] text-white'
                    : 'border-2 border-gray-300 text-gray-300'
                }
              `}
            >
              {step.id}
            </div>

            <span
              className={`
                text-[18px] font-medium tracking-tight
                ${isActive ? 'text-[#007AFF]' : 'text-gray-300'}
              `}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}