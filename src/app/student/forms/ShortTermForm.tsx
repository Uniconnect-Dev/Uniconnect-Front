import React, { useState } from 'react';

// section header
import {
  FormSectionHeaderrequired,
} from '../../../components/common/field/FormSectionHeader';

// inputs
import TextInput from '../../../components/common/input/TextInputControl';
import TextInputWithCounter from '../../../components/common/input/TextInputWithCounter';
import DateInput from '../../../components/common/input/DateRangeInput';

// chip
import StudentTypeSelector from '../../../components/common/chip/StudentTypeSelector';

// domain
import {
  EventComposition,
  EventCompositionSection,
} from '../../../components/domain/event/EventCompositionSection';

import { Card } from '@/components/common/card/Card';
import PromotionDetailBody from '@/components/domain/promotion/PromotionDetailBody';
import { FormSectionHeader } from '@/components/common/FormInputs';
import FileUploader from '@/components/common/file/FileUploader';
import ProductRequestSection from '@/components/domain/product/ProductRequestSection';

/* =========================
   공통 라벨 스타일
========================= */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
      {children}
    </label>
  );
}

interface Promotion {
  id: string;
  type: string;
  expectedCount: string;
  description: string;
}

export default function ShortTermForm() {
  /* =========================
     행사 구성
  ========================= */
  const [events, setEvents] = useState<EventComposition[]>([
    {
      id: crypto.randomUUID(),
      category: '',
      details: [''],
    },
  ]);

  /* =========================
     참여자 특성
  ========================= */
  const [studentTypes, setStudentTypes] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [lifestyles, setLifestyles] = useState<string[]>([]);

  /* =========================
     프로모션 목록
  ========================= */
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: crypto.randomUUID(),
      type: '',
      expectedCount: '',
      description: '',
    },
  ]);

  const addPromotion = () => {
    if (promotions.length >= 3) return;

    setPromotions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: '',
        expectedCount: '',
        description: '',
      },
    ]);
  };

  const removePromotion = (id: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePromotion = (
    id: string,
    next: Partial<Promotion>
  ) => {
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...next } : p
      )
    );
  };

  function setProductRequest(arg0: (prev: any) => any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex flex-col gap-12 animate-fadeIn">
      {/* ================= 행사 개요 ================= */}
      <section className="flex flex-col gap-5">
        <FormSectionHeaderrequired title="행사 개요" />

        <div className="flex gap-10">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <FieldLabel>행사명</FieldLabel>
            <TextInput placeholder="행사명을 입력해주세요." />
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <FieldLabel>행사 진행 장소</FieldLabel>
            <TextInput placeholder="행사 진행 장소를 입력해주세요." />
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <FieldLabel>행사 진행 시기</FieldLabel>
            <DateInput placeholder="YYYY.MM.DD" label="" />
          </div>

          <TextInputWithCounter
            label="한 줄 소개"
            placeholder="행사에 대한 한 줄 소개를 작성해주세요."
            maxLength={30}
          />
        </div>
      </section>

      <div className="w-full h-px bg-gray-200" />

      {/* ================= 참여자 구성 ================= */}
      <section className="flex flex-col gap-6">
        <FormSectionHeaderrequired title="참여자 구성" />

        <div className="flex gap-10">
          <TextInput placeholder="예상 참여 인원 수" />
          <TextInput placeholder="예상 노출 인원 수" />
        </div>

        <div className="flex gap-10">
          <TextInput placeholder="연령대" />
          <TextInput placeholder="전공" />
        </div>
      </section>

      {/* ================= 참여자 특성 ================= */}
      <section className="flex flex-col gap-6">
        <FormSectionHeaderrequired title="참여자 특성" />

        <div className="flex gap-10">
          <StudentTypeSelector
            title="학생 유형"
            options={[
              '이화여대', '연세대', '고려대', '성균관대',
              '한양대', '서강대', '중앙대', '경희대',
              '건국대', '동국대', '숙명여대', '국민대',
            ]}
            value={studentTypes}
            onChange={setStudentTypes}
          />

          <StudentTypeSelector
            title="지역"
            options={['서울', '수도권', '충청', '전라', '경상', '강원', '제주']}
            value={regions}
            onChange={setRegions}
          />
        </div>

        <div className="flex gap-10">
          <StudentTypeSelector
            title="취미"
            options={['운동', '게임', '여행', '음악', '패션', '독서', '요리']}
            value={hobbies}
            onChange={setHobbies}
          />

          <StudentTypeSelector
            title="관심사 / 라이프스타일"
            options={['친환경', '가성비', '프리미엄', '트렌디', '미니멀']}
            value={lifestyles}
            onChange={setLifestyles}
          />
        </div>
      </section>

      {/* ================= 행사 구성 ================= */}
      <EventCompositionSection
        title="행사 구성"
        required
        value={events}
        onChange={setEvents}
      />

      {/* ================= 프로모션 목록 ================= */}
      <section className="flex flex-col gap-4">
 
        <div
          className={`grid gap-6 ${
            promotions.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {promotions.map((promo) => (
            <Card
              key={promo.id}
              title="프로모션 목록"
              removable={promotions.length > 1}
              onRemove={() => removePromotion(promo.id)}
            >
              <PromotionDetailBody
                type={promo.type}
                expectedCount={promo.expectedCount}
                description={promo.description}
                onChange={(next) =>
                  updatePromotion(promo.id, next)
                }
              />
            </Card>
          ))}
        </div>

        {promotions.length < 3 && (
          <button
            type="button"
            onClick={addPromotion}
            className="w-full h-[56px] rounded-xl border border-dashed
              border-[#C7CDD6] text-[#008FFF] font-medium"
          >
            + 프로모션 목록 추가 ({promotions.length}/3)
          </button>
        )}
      </section>

      {/* ================= 기타 ================= */}
      <section className="flex flex-col gap-6">
        <FormSectionHeader title="기타" />

        {/* 세부 요청 사항 */}
        <div className="flex flex-col gap-2">
          <label className="text-[#6C727E] font-medium text-[16px]">
            세부 요청 사항 (선택)
          </label>

          <textarea
            placeholder="세부 요청 사항을 입력해주세요."
            maxLength={500}
            className="
              w-full h-[160px] p-4 rounded-xl
              border border-[#DADDE3]
              text-[16px] resize-none
            "
          />

          <p className="text-right text-xs text-[#9AA1AD]">
            0/500
          </p>
        </div>

        {/* 파일 업로드 */}
        <FileUploader />
      </section>
    </div>
  );
}