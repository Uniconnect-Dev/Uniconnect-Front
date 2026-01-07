export default function Th({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 text-left text-gray-400 text-sm font-medium ${className}`}
    >
      {children}
    </th>
  );
}
