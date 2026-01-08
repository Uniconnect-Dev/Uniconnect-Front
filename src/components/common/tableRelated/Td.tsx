export default function Td({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-5 text-gray-600 text-sm font-medium ${className}`}>
      {children}
    </td>
  );
}
function Tr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="h-10 bg-white hover:bg-slate-100 transition">{children}</tr>
  );
}
