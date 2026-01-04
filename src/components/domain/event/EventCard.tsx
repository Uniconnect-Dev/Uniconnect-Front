import React from 'react';
import { TextInput } from '../../common/FormInputs';
import { Card } from '../../common/card/Card';
import { EventComposition } from './EventCompositionSection';

interface Props {
  index: number;
  data: EventComposition;
  removable: boolean;
  onChange: (v: EventComposition) => void;
  onRemove: () => void;
}

export function EventCard({
  index,
  data,
  removable,
  onChange,
  onRemove,
}: Props) {
  const canAddMore = data.details.length < 3;
  const canRemoveDetail = data.details.length >= 2;

  return (
    <Card
      title={`행사 목록`}
      removable={removable}
      onRemove={onRemove}
    >
      {/* 행사 분류 */}
      <TextInput
        label="행사 분류"
        placeholder="행사 분류를 입력해주세요. (ex. 체험 부스, 동아리 무대)"
        value={data.category}
        readOnly={false}
      />

      {/* 세부 구성 */}
      <div className="mt-4 flex flex-col gap-2">
        <label className="text-[#6C727E] font-medium text-[16px]">
          세부 구성
        </label>

        {data.details.map((detail, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={detail}
              onChange={(e) => {
                const next = [...data.details];
                next[i] = e.target.value;
                onChange({ ...data, details: next });
              }}
              placeholder="세부 이벤트를 입력해주세요."
              className="
                w-full h-[56px] px-4 rounded-xl
                border border-[#E6E8EC]
                text-[16px]
                outline-none
                focus:border-[#008FFF]
                focus:ring-0
              "
            />

            {canRemoveDetail && (
              <button
                type="button"
                onClick={() => {
                  const next = data.details.filter((_, idx) => idx !== i);
                  onChange({ ...data, details: next });
                }}
                className="
                  w-[26px] h-[24px] pb-[2px]
                  flex items-center justify-center
                  rounded-full
                  bg-[#B4BBC7]
                  text-white
                  text-[16px]
                "
              >
                −
              </button>
            )}
          </div>
        ))}

        {canAddMore && (
          <button
            type="button"
            onClick={() =>
              onChange({ ...data, details: [...data.details, ''] })
            }
            className="
              w-full h-[56px]
              rounded-xl
              text-start px-4
              border border-dashed border-[#C7CDD6]
              text-[#008FFF]
              text-[15px] font-medium
            "
          >
            + 구성 추가
          </button>
        )}
      </div>
    </Card>
  );
}