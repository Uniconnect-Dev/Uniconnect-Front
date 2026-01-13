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
import { useCampaignForm } from '@/context/CampaignFormContext';
import {
  STUDENT_TYPE_OPTIONS,
  REGION_OPTIONS,
  HOBBY_OPTIONS,
  LIFESTYLE_OPTIONS,
  getTagIdsByNames,
} from '@/constants/hashtags';

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

export default function LongTermForm() {
  const { formData, updateFormData } = useCampaignForm();

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

  // 행사 구성 변경 시 Context 업데이트
  const handleEventsChange = (newEvents: EventComposition[]) => {
    setEvents(newEvents);
    // 행사 구성을 JSON 문자열로 저장
    const eventProgramsStr = JSON.stringify(
      newEvents.map((e) => ({ category: e.category, details: e.details }))
    );
    updateFormData({ eventPrograms: eventProgramsStr });
  };

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

  const updatePromotion = (id: string, next: Partial<Promotion>) => {
    const newPromotions = promotions.map((p) =>
      p.id === id ? { ...p, ...next } : p
    );
    setPromotions(newPromotions);
    // 프로모션 정보를 JSON 문자열로 저장
    const marketingMethodsStr = JSON.stringify(
      newPromotions.map((p) => ({
        type: p.type,
        expectedCount: p.expectedCount,
        description: p.description,
      }))
    );
    updateFormData({ marketingMethods: marketingMethodsStr });
  };

  /* =========================
     파일 업로드 핸들러
  ========================= */
  const handleFileChange = (file: File | null) => {
    updateFormData({ proposalFile: file });
  };

  /* =========================
     세부 요청 사항
  ========================= */
  const [extraRequestLength, setExtraRequestLength] = useState(0);

  return (
    <div className="flex flex-col gap-12 animate-fadeIn">
      {/* ================= 행사 개요 ================= */}
      <section className="flex flex-col gap-5">
        <FormSectionHeaderrequired title="행사 개요" />

        <div className="flex gap-10">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <FieldLabel>행사명</FieldLabel>
            <TextInput
              placeholder="행사명을 입력해주세요."
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <FieldLabel>행사 진행 장소</FieldLabel>
            <TextInput
              placeholder="행사 진행 장소를 입력해주세요."
              value={formData.locationName}
              onChange={(e) => updateFormData({ locationName: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <FieldLabel>행사 진행 시기</FieldLabel>
            <DateInput
              placeholder="YYYY.MM.DD"
              label=""
              startDate={formData.startDate}
              endDate={formData.endDate}
              onStartDateChange={(date) => updateFormData({ startDate: date })}
              onEndDateChange={(date) => updateFormData({ endDate: date })}
            />
          </div>

          <TextInputWithCounter
            label="한 줄 소개"
            placeholder="행사에 대한 한 줄 소개를 작성해주세요."
            maxLength={30}
            value={formData.purpose}
            onChange={(value) => updateFormData({ purpose: value })}
          />
        </div>
      </section>

      <div className="w-full h-px bg-gray-200" />

      {/* ================= 참여자 구성 ================= */}
      <section className="flex flex-col gap-6">
        <FormSectionHeaderrequired title="참여자 구성" />

        <div className="flex gap-10">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <FieldLabel>예상 참여 인원 수</FieldLabel>
            <TextInput
              placeholder="예상 참여 인원 수"
              type="number"
              value={formData.expectedParticipants?.toString() || ''}
              onChange={(e) =>
                updateFormData({ expectedParticipants: Number(e.target.value) || 0 })
              }
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <FieldLabel>예상 노출 인원 수</FieldLabel>
            <TextInput
              placeholder="예상 노출 인원 수"
              type="number"
              value={formData.expectedExposures?.toString() || ''}
              onChange={(e) =>
                updateFormData({ expectedExposures: Number(e.target.value) || 0 })
              }
            />
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <FieldLabel>연령대</FieldLabel>
            <TextInput
              placeholder="연령대 (예: 20대 초반)"
              value={formData.targetAgeDesc}
              onChange={(e) => updateFormData({ targetAgeDesc: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <FieldLabel>전공</FieldLabel>
            <TextInput
              placeholder="전공 (예: 컴퓨터공학, 경영학)"
              value={formData.targetMajorDesc}
              onChange={(e) => updateFormData({ targetMajorDesc: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* ================= 참여자 특성 ================= */}
      <section className="flex flex-col gap-6">
        <FormSectionHeaderrequired title="참여자 특성" />

        <div className="flex gap-10">
          <StudentTypeSelector
            title="학생 유형"
            options={STUDENT_TYPE_OPTIONS.map((opt) => opt.name)}
            value={studentTypes}
            onChange={(values) => {
              setStudentTypes(values);
              updateFormData({
                studentTypeTagIds: getTagIdsByNames(STUDENT_TYPE_OPTIONS, values),
              });
            }}
          />

          <StudentTypeSelector
            title="지역"
            options={REGION_OPTIONS.map((opt) => opt.name)}
            value={regions}
            onChange={(values) => {
              setRegions(values);
              updateFormData({
                regionTagIds: getTagIdsByNames(REGION_OPTIONS, values),
              });
            }}
          />
        </div>

        <div className="flex gap-10">
          <StudentTypeSelector
            title="취미"
            options={HOBBY_OPTIONS.map((opt) => opt.name)}
            value={hobbies}
            onChange={(values) => {
              setHobbies(values);
              updateFormData({
                hobbyTagIds: getTagIdsByNames(HOBBY_OPTIONS, values),
              });
            }}
          />

          <StudentTypeSelector
            title="관심사 / 라이프스타일"
            options={LIFESTYLE_OPTIONS.map((opt) => opt.name)}
            value={lifestyles}
            onChange={(values) => {
              setLifestyles(values);
              updateFormData({
                lifestyleTagIds: getTagIdsByNames(LIFESTYLE_OPTIONS, values),
              });
            }}
          />
        </div>
      </section>

      {/* ================= 제품 요청 ================= */}
      <ProductRequestSection
        item1={formData.preferredIndustry1}
        item2={formData.preferredIndustry2}
        quantity={formData.recommendedSamplingQty?.toString() || ''}
        fee={formData.boothFee?.toString() || ''}
        onChange={(next) => {
          updateFormData({
            ...(next.item1 !== undefined && { preferredIndustry1: next.item1 }),
            ...(next.item2 !== undefined && { preferredIndustry2: next.item2 }),
            ...(next.quantity !== undefined && { recommendedSamplingQty: Number(next.quantity) || 0 }),
            ...(next.fee !== undefined && { boothFee: Number(next.fee) || 0 }),
          });
        }}
      />

      {/* ================= 행사 구성 ================= */}
      <EventCompositionSection
        title="행사 구성"
        required
        value={events}
        onChange={handleEventsChange}
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
            value={formData.extraRequest}
            onChange={(e) => {
              updateFormData({ extraRequest: e.target.value });
              setExtraRequestLength(e.target.value.length);
            }}
            className="
              w-full h-[160px] p-4 rounded-xl
              border border-[#DADDE3]
              text-[16px] resize-none
            "
          />

          <p className="text-right text-xs text-[#9AA1AD]">
            {extraRequestLength}/500
          </p>
        </div>

        {/* 파일 업로드 */}
        <FileUploader onFileChange={handleFileChange} />
      </section>
    </div>
  );
}