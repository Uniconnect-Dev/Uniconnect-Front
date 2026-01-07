interface PromotionSimpleBodyProps {
    category: string;
    onCategoryChange: (value: string) => void;
  }
  
  export default function PromotionSimpleBody({
    category,
    onCategoryChange,
  }: PromotionSimpleBodyProps) {
    return (
      <div className="flex flex-col gap-3">
        <label className="text-[15px] font-medium text-[#6C727E]">
          홍보 분류
        </label>
  
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full h-[56px] rounded-xl px-4 border border-[#DADDE3]"
        >
          <option value="">홍보 분류를 선택해주세요.</option>
          <option value="sns">SNS 프로모션</option>
          <option value="kakao">카카오톡 공지방</option>
          <option value="led">LED 스크린</option>
          <option value="email">이메일</option>
          <option value="etc">포스터 및 기타 홍보물</option>
        </select>
      </div>
    );
  }