import { useState } from 'react';

interface SearchableDropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SearchableDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortedOptions = [...options].sort((a, b) => {
    const aMatch = a.toLowerCase().includes(value.toLowerCase());
    const bMatch = b.toLowerCase().includes(value.toLowerCase());
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-[#6C727E] font-medium">{label}</label>

      <div className="relative">
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full h-[56px] px-4 pr-12 rounded-xl
            outline outline-1 outline-zinc-200 text-[#4B5563]"
        />

        <button
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <img src="/arrow.png" alt="open" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl z-20
          shadow-[0px_4px_24px_rgba(0,0,0,0.06)]">
          {sortedOptions.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}