export default function Tr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="h-10 bg-white hover:bg-slate-100 transition">{children}</tr>
  );
}
