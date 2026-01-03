import { Check } from 'lucide-react';

export default function Requeststatus({ activeStep }) {
  const steps = [
    { id: 1, label: '기본 정보' },
    { id: 2, label: '타겟 설정' },
    { id: 3, label: '매칭 / 견적' },
    { id: 4, label: '규정 확인' },
  ];

  return (
    <div className="inline-flex items-center gap-7">
      {steps.map((step) => {
        const isActive = step.id === activeStep;
        const isCompleted = step.id < activeStep;

        return (
          <div
            key={step.id}
            className="flex items-center gap-2.5"
            data-state={
              isActive ? 'active' : isCompleted ? 'completed' : 'default'
            }
          >
            {/* 번호 원 */}
            <div
              className={`w-6 h-6 rounded-2xl inline-flex justify-center items-center
    ${
      isActive
        ? 'bg-blue-600 text-white'
        : isCompleted
        ? 'bg-blue-300 text-white'
        : 'outline outline-[1.6px] outline-zinc-200 text-zinc-200'
    }`}
            >
              {isCompleted && !isActive ? (
                <Check size={16} strokeWidth={3} />
              ) : (
                <span className="text-base font-semibold leading-6">
                  {step.id}
                </span>
              )}
            </div>

            {/* 라벨 */}
            <span
              className={`text-lg font-semibold leading-7
                ${
                  isActive
                    ? 'text-blue-600'
                    : isCompleted
                    ? 'text-blue-300'
                    : 'text-zinc-200'
                }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
