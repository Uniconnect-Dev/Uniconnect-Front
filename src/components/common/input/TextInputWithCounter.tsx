import React, { useState } from 'react';

interface Props {
  label: string;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  readOnly?: boolean;
  height?: number;
  onChange?: (value: string) => void;
}

export default function TextInputWithCounter({
  label,
  placeholder,
  value = '',
  maxLength = 30,
  readOnly = false,
  height = 56,
  onChange,
}: Props) {
  const [text, setText] = useState(value);

  // Sync with external value changes
  React.useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className="flex flex-1 flex-col gap-2 min-w-0">
      {/* label */}
      <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
        {label}
      </label>

      {/* input */}
      <input
        type="text"
        value={text}
        readOnly={readOnly}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => {
          if (readOnly) return;
          const newValue = e.target.value;
          setText(newValue);
          onChange?.(newValue);
        }}
        style={{ height }}
        className={`
          w-full px-4 rounded-xl text-[16px]
          ${
            readOnly
              ? 'bg-[#F3F5F9] cursor-default outline-none text-[#949BA7]'
              : 'bg-white outline outline-1 outline-zinc-200 text-[#4B5563] hover:outline-gray-300 focus:outline-[#008FFF]'
          }
        `}
      />

      {/* counter */}
      {!readOnly && (
        <div className="flex justify-end text-[12px] text-[#949BA7] -mt-1">
          {text.length}/{maxLength}
        </div>
      )}
    </div>
  );
}