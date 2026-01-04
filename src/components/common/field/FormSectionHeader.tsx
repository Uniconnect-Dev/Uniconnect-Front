export function FormSectionHeaderrequired({ title }: { title: string }) {
    return (
      <div className="flex items-center gap-1 -mb-2 w-full">
        <img src="/File_Blue.png" alt="" className="w-5 h-5" />
        <h2 className="text-[20px] font-bold text-[#2D3139]">{title}</h2>
        <span className="text-[#009FFF]">*</span>
      </div>
    );
  }