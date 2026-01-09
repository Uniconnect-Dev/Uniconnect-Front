import React from 'react';
import { FormSectionHeaderrequired } from '@/components/common/field/FormSectionHeader';

export interface CollaborationOutcome {
  id: string;
  content: string;
}

interface Props {
  title: string;
  required?: boolean;
  maxItems?: number;
  value: CollaborationOutcome[];
  onChange: (v: CollaborationOutcome[]) => void;
}

export function CollaborationOutcomeSection({
  title,
  required = false,
  maxItems = 5,
  value,
  onChange,
}: Props) {
  const addOutcome = () => {
    if (value.length >= maxItems) return;
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        content: '',
      },
    ]);
  };

  const updateOutcome = (id: string, content: string) => {
    onChange(value.map((v) => (v.id === id ? { ...v, content } : v)));
  };

  const removeOutcome = (id: string) => {
    onChange(value.filter((v) => v.id !== id));
  };

  return (
    <section className="flex flex-col gap-6">
      <FormSectionHeaderrequired title={title} />

      {/* 입력 필드 목록 */}
      <div className="flex flex-col gap-3">
        {value.map((outcome) => (
          <div key={outcome.id} className="flex items-center gap-3">
            <input
              value={outcome.content}
              onChange={(e) => updateOutcome(outcome.id, e.target.value)}
              placeholder="희망 협업 성과를 작성해주세요. (ex. SNS 게시물 도달량)"
              className="
                flex-1 h-[56px] px-4 rounded-xl
                border border-[#E6E8EC]
                text-[16px] text-[#2D3139]
                placeholder:text-[#B4BBC7]
                outline-none
                focus:border-[#007AFF]
              "
            />
            {value.length > 1 && (
              <button
                type="button"
                onClick={() => removeOutcome(outcome.id)}
                className="
                  w-[28px] h-[28px]
                  flex items-center justify-center
                  rounded-full
                  bg-[#B4BBC7]
                  text-white text-[18px]
                  hover:bg-[#9AA1AD]
                  transition-colors
                "
              >
                −
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 추가 버튼 */}
      <button
        type="button"
        onClick={addOutcome}
        disabled={value.length >= maxItems}
        className="
          w-full h-[56px] rounded-xl
          bg-[#F3F5F9] border border-dashed border-[#C7CDD6]
          text-[#949BA7] text-[16px] font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        + 희망 협업 성과 추가 ({value.length}/{maxItems})
      </button>
    </section>
  );
}