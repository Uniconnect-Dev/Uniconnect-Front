import React from 'react';
import { FormSectionHeaderrequired } from '@/components/common/field/FormSectionHeader';
import { CollaborationMethodCard } from './CollaborationMethodCard';

export interface CollaborationMethod {
  id: string;
  category: string;
  description: string;
}

interface Props {
  title: string;
  required?: boolean;
  maxItems?: number;
  value: CollaborationMethod[];
  onChange: (v: CollaborationMethod[]) => void;
}

export function CollaborationMethodSection({
  title,
  required = false,
  maxItems = 5,
  value,
  onChange,
}: Props) {
  const isSingle = value.length === 1;

  const addMethod = () => {
    if (value.length >= maxItems) return;
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        category: '',
        description: '',
      },
    ]);
  };

  const updateMethod = (updated: CollaborationMethod) => {
    onChange(value.map((v) => (v.id === updated.id ? updated : v)));
  };

  const removeMethod = (id: string) => {
    onChange(value.filter((v) => v.id !== id));
  };

  return (
    <section className="flex flex-col gap-6">
      <FormSectionHeaderrequired title={title} />

      {/* 카드 영역 */}
      <div className={isSingle ? 'flex flex-col' : 'grid grid-cols-2 gap-6'}>
        {value.map((method) => (
          <CollaborationMethodCard
            key={method.id}
            data={method}
            removable={value.length > 1}
            onChange={updateMethod}
            onRemove={() => removeMethod(method.id)}
          />
        ))}
      </div>

      {/* 추가 버튼 */}
      <button
        type="button"
        onClick={addMethod}
        disabled={value.length >= maxItems}
        className="
          w-full h-[56px] rounded-xl
          bg-[#F3F5F9] border border-dashed border-[#C7CDD6]
          text-[#949BA7] text-[16px] font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        + 협업 방식 추가 ({value.length}/{maxItems})
      </button>
    </section>
  );
}