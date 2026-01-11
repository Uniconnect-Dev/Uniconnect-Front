import React from 'react';
import { Card } from '@/components/common/card/Card';
import { CollaborationMethod } from './CollaborationMethodSection';

interface Props {
  data: CollaborationMethod;
  removable: boolean;
  onChange: (v: CollaborationMethod) => void;
  onRemove: () => void;
}

export function CollaborationMethodCard({
  data,
  removable,
  onChange,
  onRemove,
}: Props) {
  return (
    <Card title="협업 방식" removable={removable} onRemove={onRemove}>
      {/* 행사 분류 */}
      <div className="flex flex-col gap-2">
        <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
          행사 분류
        </label>
        <input
          value={data.category}
          onChange={(e) => onChange({ ...data, category: e.target.value })}
          placeholder="행사 분류를 입력해주세요. (ex. 체험 부스, 동아리 무대)"
          className="
            w-full h-[56px] px-4 rounded-xl
            border border-[#E6E8EC]
            text-[16px] text-[#2D3139]
            placeholder:text-[#B4BBC7]
            outline-none
            focus:border-[#007AFF]
          "
        />
      </div>

      {/* 설명 */}
      <div className="mt-4 flex flex-col gap-2">
        <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
          설명
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="간략한 설명을 작성해주세요."
          maxLength={50}
          className="
            w-full h-[100px] p-4 rounded-xl
            border border-[#E6E8EC]
            text-[16px] text-[#2D3139]
            placeholder:text-[#B4BBC7]
            resize-none
            outline-none
            focus:border-[#007AFF]
          "
        />
        <p className="text-right text-[13px] text-[#9AA1AD]">
          {data.description.length}/50
        </p>
      </div>
    </Card>
  );
}