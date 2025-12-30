import React from 'react';
import { TextInput, FormSectionHeader, FormSectionHeaderrequired, DateInput } from '../../../components/common/FormInputs';

export default function ShortTermForm() {
  return (
    <div className="flex flex-col gap-12 animate-fadeIn">
      {/* 행사 개요 */}
      <section className="flex flex-col gap-5">
        <FormSectionHeaderrequired title="행사 개요" />
        <div className="flex gap-10">
          <TextInput label="행사명" placeholder="진행하시는 행사 이름을 입력해주세요" />
          <TextInput label="행사 장소" placeholder="행사가 진행되는 장소를 입력해주세요" />
        </div>
        <div className="flex gap-10">
          <DateInput label="행사 기간" placeholder="YYYY.MM.DD" />
          <TextInput label="소개" placeholder="행사에 대한 간단한 소개를 입력해주세요" />
        </div>
      </section>

      {/* 참여자 구성 */}
      <section className="flex flex-col gap-6">
        <FormSectionHeader title="참여자 구성" />
        <div className="flex gap-10">
          <TextInput label="참여 인원" placeholder="예: 500명" />
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-[#6C727E] font-medium text-[16px]">연령대</label>
            <select className="w-full p-4 rounded-xl outline outline-1 outline-zinc-200 text-[#949BA7] bg-white">
              <option value="">연령대를 선택해주세요</option>
              <option value="20-24">20대 초반</option>
              <option value="25-29">20대 후반</option>
            </select>
          </div>
        </div>
        <textarea
          className="w-full h-32 p-4 rounded-xl outline outline-1 outline-zinc-200 text-[#4B5563] focus:outline-[#008FFF] resize-none"
          placeholder="참여자들의 주요 특징을 입력해주세요 (예: 취업 준비, 자취생 등)"
        />
      </section>

      {/* 추가 정보 */}
      <section className="flex flex-col gap-6">
        <FormSectionHeader title="추가 정보" />
        <div className="flex gap-10">
          <TextInput label="홍보 방식" placeholder="예: 인스타그램 게시물" />
          <TextInput label="프로모션 방식" placeholder="예: SNS 인증 이벤트" />
        </div>
        <div className="w-full p-8 border-2 border-dashed border-gray-200 rounded-xl bg-[#F9FBFF] text-center">
          <p className="text-[#949BA7] text-[14px]">파일을 드래그하거나 클릭하여 업로드하세요</p>
          <p className="text-[#B4BBC7] text-[12px] mt-1">(PDF, PPTX 형식만 지원)</p>
        </div>
      </section>
    </div>
  );
}