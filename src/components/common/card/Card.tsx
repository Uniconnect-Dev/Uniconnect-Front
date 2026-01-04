import React from 'react';

interface CardProps {
  title: string;
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export function Card({
  title,
  removable = false,
  onRemove,
  children,
}: CardProps) {
  return (
    <div className="rounded-2xl border border-[#E6E8EC] px-7 py-8 bg-white">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[20px] font-semibold text-[#3A404A] tracking-[-0.3px]">
          {title}
        </h3>

        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="text-[#949BA7] text-[20px]"
          >
            ×
          </button>
        )}
      </div>

      <div className="w-full h-px bg-[#EEF0F3] mb-4" />

      {/* content */}
      {children}
    </div>
  );
}