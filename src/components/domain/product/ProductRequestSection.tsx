import React from 'react';
import { FormSectionHeaderrequired } from '@/components/common/field/FormSectionHeader';
import TextInput from '@/components/common/input/TextInputControl';
import SearchableDropdown from '@/components/common/input/SearchableDropdown';

interface ProductRequestSectionProps {
  item1: string;
  item2: string;
  quantity: string;
  fee: string;
  onChange: (next: Partial<{
    item1: string;
    item2: string;
    quantity: string;
    fee: string;
  }>) => void;
}

export default function ProductRequestSection({
  item1,
  item2,
  quantity,
  fee,
  onChange,
}: ProductRequestSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <FormSectionHeaderrequired title="제품 요청" />

      {/* 1행 */}
      <div className="flex gap-10">
        <SearchableDropdown
          label="희망 샘플링 품목 1"
          placeholder="희망 샘플군을 선택해주세요."
          options={[
            '식품',
            '음료',
            '화장품',
            '생활용품',
            '의류',
            '전자기기',
          ]}
          value={item1}
          onChange={(v) => onChange({ item1: v })}
        />

        <SearchableDropdown
          label="희망 샘플링 품목 2"
          placeholder="희망 샘플군을 선택해주세요."
          options={[
            '식품',
            '음료',
            '화장품',
            '생활용품',
            '의류',
            '전자기기',
          ]}
          value={item2}
          onChange={(v) => onChange({ item2: v })}
        />
      </div>

      {/* 2행 */}
      <div className="flex gap-10">
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-[#6C727E] font-medium text-[16px]">
            샘플링 권장량
          </label>
          <TextInput
            placeholder="샘플링 권장량을 낱개 단위로 작성해주세요."
            value={quantity}
            onChange={(e) =>
              onChange({ quantity: e.target.value })
            }
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label className="text-[#6C727E] font-medium text-[16px]">
            입점비
          </label>
          <TextInput
            placeholder="입점비를 입력해주세요."
            value={fee}
            onChange={(e) =>
              onChange({ fee: e.target.value })
            }
          />
        </div>
      </div>
    </section>
  );
}