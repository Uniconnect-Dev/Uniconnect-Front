interface FieldProps {
    label: string;
    children: React.ReactNode;
  }
  
  export function Field({ label, children }: FieldProps) {
    return (
      <div className="flex flex-col gap-2 min-w-0">
        <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
          {label}
        </label>
        {children}
      </div>
    );
  }