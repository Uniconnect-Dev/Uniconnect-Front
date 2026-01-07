import React from 'react';
import { FormSectionHeaderrequired } from '../../common/FormInputs';
import { EventCard } from './EventCard';

export interface EventComposition {
  id: string;
  category: string;
  details: string[];
}

interface Props {
  title: string;
  required?: boolean;
  maxEvents?: number;
  value: EventComposition[];
  onChange: (v: EventComposition[]) => void;
}

export function EventCompositionSection({
  title,
  required = false,
  maxEvents = 5,
  value,
  onChange,
}: Props) {
  const isSingle = value.length === 1;

  const addEvent = () => {
    if (value.length >= maxEvents) return;
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        category: '',
        details: [''],
      },
    ]);
  };

  const updateEvent = (updated: EventComposition) => {
    onChange(value.map((v) => (v.id === updated.id ? updated : v)));
  };

  const removeEvent = (id: string) => {
    onChange(value.filter((v) => v.id !== id));
  };

  return (
    <section className="flex flex-col gap-6">
      {required ? (
        <FormSectionHeaderrequired title={title} />
      ) : (
        <FormSectionHeaderrequired title={title} />
      )}

      {/* 카드 영역 */}
      <div className={isSingle ? 'flex flex-col' : 'grid grid-cols-2 gap-6'}>
        {value.map((event, index) => (
          <EventCard
            key={event.id}
            index={index}
            data={event}
            removable={value.length > 1}
            onChange={updateEvent}
            onRemove={() => removeEvent(event.id)}
          />
        ))}
      </div>

      {/* 행사 추가 */}
      <button
        type="button"
        onClick={addEvent}
        disabled={value.length >= maxEvents}
        className="w-full h-[56px] rounded-xl bg-[#F3F5F9] border border-dashed border-[#C7CDD6]
          text-[#949BA7] text-[16px] font-medium"
      >
        + 행사 추가 ({value.length}/{maxEvents})
      </button>
    </section>
  );
}