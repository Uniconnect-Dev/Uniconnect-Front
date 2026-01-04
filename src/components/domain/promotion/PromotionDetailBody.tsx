import SearchableDropdown from '@/components/common/input/SearchableDropdown';

interface PromotionDetailBodyProps {
  type: string;
  expectedCount: string;
  description: string;
  onChange: (next: {
    type?: string;
    expectedCount?: string;
    description?: string;
  }) => void;
}

export default function PromotionDetailBody({
  type,
  expectedCount,
  description,
  onChange,
}: PromotionDetailBodyProps) {
  return (
    <div className="flex flex-col gap-5">   
      <SearchableDropdown
        label="프로모션 분류"
        placeholder="프로모션 분류를 선택해주세요."
        options={[
          '물품 협찬',
          '브랜드 체험 부스',
          '제품 / 서비스 시연',
          '협업 게시물 제작',
          '기타',
        ]}
        value={type}
        onChange={(v) => onChange({ type: v })}
      />

      <input
        value={expectedCount}
        onChange={(e) => onChange({ expectedCount: e.target.value })}
        placeholder="예상 도달 인원 및 참가자 수를 입력해주세요."
        className="w-full h-[56px] px-4 rounded-xl outline outline-1 outline-zinc-200"
      />

      <input
        value={description}
        onChange={(e) => onChange({ description: e.target.value })}
        placeholder="기타 추가 설명을 작성해주세요. (ex. 입점비 등)"
        maxLength={30}
        className="w-full h-[56px] px-4 rounded-xl outline outline-1 outline-zinc-200"
      />
    </div>
  );
}