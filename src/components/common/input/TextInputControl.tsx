interface Props {
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  height?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInputControl({
  value,
  placeholder,
  readOnly = false,
  height = 56,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      style={{ height }}
      className={`
        w-full px-4 rounded-xl text-[16px]
        ${
          readOnly
            ? 'bg-[#F3F5F9] text-[#949BA7] cursor-default outline-none'
            : 'bg-white outline outline-1 outline-zinc-200 text-[#4B5563] hover:outline-gray-300 focus:outline-[#008FFF]'
        }
      `}
    />
  );
}