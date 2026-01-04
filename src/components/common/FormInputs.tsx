import React from 'react';

/* =====================
   Basic Text Input
===================== */

interface TextInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
}

export function TextInput({
  label,
  placeholder,
  value,
  readOnly = false,
}: TextInputProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 min-w-0">
      <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full p-4 rounded-xl text-[16px] h-[56px]
          ${
            readOnly
              ? 'bg-[#F3F5F9] cursor-default outline-none text-[#949BA7]'
              : 'bg-white outline outline-1 outline-zinc-200 text-[#4B5563] hover:outline-gray-300 focus:outline-[#008FFF]'
          }`}
      />
    </div>
  );
}

/* =====================
   Section Headers
===================== */

export function FormSectionHeaderrequired({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-1 -mb-2 w-full">
      <img src="/File_Blue.png" alt="" className="w-5 h-5" />
      <h2 className="text-[20px] font-bold text-[#2D3139]">{title}</h2>
      <span className="text-[#009FFF]">*</span>
    </div>
  );
}

export function FormSectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-1 w-full">
      <img src="/File_Blue.png" alt="" className="w-5 h-5" />
      <h2 className="text-[20px] font-bold text-[#2D3139]">{title}</h2>
    </div>
  );
}