import React from 'react';

interface Props {
  title: string;
  options: string[];
  value: string[];               // ❗ optional 제거
  onChange: (selected: string[]) => void;
}

export default function StudentTypeSelector({
  title,
  options,
  value,
  onChange,
}: Props) {
  const hasSelected = value.length > 0;

  const toggle = (item: string) => {
    const next = value.includes(item)
      ? value.filter((v) => v !== item)
      : [...value, item];

    onChange(next);
  };

  return (
    <div className="w-full rounded-2xl border border-[#E6E8EC] px-8 py-6 bg-white">
      {/* header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#585F69] tracking-[-0.27px]">
            {title}
          </h2>

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center
              ${hasSelected ? 'bg-[#008FFF]' : 'bg-[#EBEEF3]'}`}
          >
            {hasSelected && (
              <svg
                viewBox="0 -1 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </div>

        <div className="mt-3 w-full h-px bg-gray-200" />
      </div>

      {/* chips */}
      <div className="flex flex-wrap gap-2">
        {options.map((item) => {
          const isSelected = value.includes(item);

          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={`
                px-3 py-1.5 rounded-[8px] text-[16px]
                border transition-colors tracking-[-0.24px]
                ${
                  isSelected
                    ? 'bg-[#E3F4FF] border-transparent text-[#008FFF]'
                    : 'bg-white border-[#DADDE3] text-[#6C727E]'
                }
              `}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}