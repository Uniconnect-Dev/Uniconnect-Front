import { useState } from 'react';
export default function SortableTh({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isAsc, setIsAsc] = useState(true);

  return (
    <th
      className={`px-5 text-left text-gray-400 text-sm font-medium ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsAsc((prev) => !prev)}
        className="inline-flex items-center gap-2 cursor-pointer select-none"
      >
        <span>{children}</span>
        <img src={isAsc ? '/CaretDown.svg' : '/CaretUp.svg'} alt="sort" />
      </button>
    </th>
  );
}
