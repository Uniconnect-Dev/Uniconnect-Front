import React from 'react';
import { TextInput, FormSectionHeader } from '../../../components/common/FormInputs';

export default function LongTermForm() {
  return (
    <div className="flex flex-col gap-12 animate-fadeIn">
      <section className="flex flex-col gap-6">
        <FormSectionHeader title="장기 협업 상세" />
        <div className="flex gap-10">
          <TextInput label="희망 협업 기간" placeholder="예: 6개월 (상시)" />
          <TextInput label="희망 브랜드군" placeholder="예: 식품, 뷰티 등" />
        </div>
        <textarea
          className="w-full h-32 p-4 rounded-xl outline outline-1 outline-zinc-200 text-[#4B5563] focus:outline-[#008FFF] resize-none"
          placeholder="장기 협업 시 기대하는 파트너십 형태를 자유롭게 적어주세요."
        />
      </section>
      {/* 필요한 추가 섹션들을 여기에 구성 */}
    </div>
  );
}