import CorporateLayout from '../../../components/layout/CorporateLayout';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronUp, Calendar } from 'lucide-react';

// ============ 공통 컴포넌트 ============

function OrgCard({
  category = '학생 단체',
  organizationName = '한양대학교 총학생회 000',
  imageUrl = 'https://placehold.co/40x40',
}) {
  return (
    <div className="w-full px-6 py-5 bg-slate-100 rounded-[20px] flex justify-start items-center gap-4">
      <img
        className="w-10 h-10 rounded-full flex-shrink-0"
        src={imageUrl}
        alt="Organization logo"
      />
      <div className="flex flex-col justify-center items-start">
        <div className="text-gray-400 text-base font-semibold leading-6">
          {category}
        </div>
        <div className="text-gray-900 text-xl font-bold leading-8">
          {organizationName}
        </div>
      </div>
    </div>
  );
}

type InputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

function Textinput({ label, placeholder, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-500 font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 rounded-xl outline outline-1 outline-zinc-200"
      />
    </div>
  );
}

type DateInputProps = {
  label: string;
  value?: string;
  onChange: (date: string) => void;
};

function Dateinput({ label, value, onChange }: DateInputProps) {
  const [date, setDate] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  };

  const handleDateSelect = (selectedDate: Date) => {
    const formatted = formatDate(selectedDate);
    setDate(formatted);
    setIsOpen(false);
    onChange(formatted);
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = `${currentMonth.getFullYear()}.${String(
    currentMonth.getMonth() + 1
  ).padStart(2, '0')}`;

  return (
    <div ref={containerRef} className="flex flex-col gap-2 relative">
      <label className="text-gray-500 font-semibold">{label}</label>
      <div className="relative">
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          value={date}
          readOnly
          onFocus={() => setIsOpen(true)}
          className="w-full p-4 pl-12 rounded-xl outline outline-1 outline-zinc-200 cursor-pointer"
          placeholder="YYYY.MM.DD"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-4 w-80 bg-white rounded-2xl z-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1
                  )
                )
              }
            >
              &lt;
            </button>
            <span className="font-bold">{monthYear}</span>
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1
                  )
                )
              }
            >
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 text-xs text-gray-300 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
              <div key={d} className="text-center">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, idx) =>
              day ? (
                <button
                  key={idx}
                  onClick={() => handleDateSelect(day)}
                  className="w-10 h-10 rounded-lg text-gray-500 hover:bg-sky-100 hover:text-sky-500"
                >
                  {day.getDate()}
                </button>
              ) : (
                <div key={idx} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type ToggleTagSetProps = {
  label?: string;
  tags?: string[];
  value?: number;
  onChange?: (value: string, index: number) => void;
};

function ToggleTagSet({
  label = '발송 여부',
  tags = ['미발송', '발송 완료'],
  value = 0,
  onChange,
}: ToggleTagSetProps) {
  const [selected, setSelected] = useState<number>(value);

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(tags[index], index);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-500 font-semibold">{label}</label>
      <div className="inline-flex justify-start items-start gap-2 flex-wrap">
        {tags.map((tag: string, index: number) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`
              px-3 py-1.5 rounded-lg flex justify-center items-center gap-2.5
              transition-all
              ${
                selected === index
                  ? 'bg-sky-100'
                  : 'outline outline-1 outline-offset-[-1px] outline-zinc-200 hover:bg-gray-50'
              }
            `}
          >
            <span
              className={`
                text-base font-medium leading-6
                ${selected === index ? 'text-blue-600' : 'text-gray-500'}
              `}
            >
              {tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

type FileUploadProps = {
  label: string;
  optional?: boolean;
  value?: File | null;
  onChange?: (file: File | null) => void;
};

function FileUpload({
  label,
  optional = false,
  value,
  onChange,
}: FileUploadProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <label className="text-gray-500 font-semibold">{label}</label>
        {optional && <p className="text-gray-400 font-medium">(선택)</p>}
      </div>
      <div className="h-fit p-[41px] rounded-xl outline outline-1 outline-zinc-200 flex flex-col justify-center items-center">
        <div className="w-14 h-14 relative bg-gray-100 rounded-xl border border-dashed border-gray-400 overflow-hidden flex justify-center items-center">
          <img src="/Upload.svg" alt="Upload" />
        </div>
        <div className="text-sm font-semibold mt-2.5">파일 드롭하기</div>
        <div className="text-gray-400 text-sm font-semibold mb-1">or</div>
        <button className="w-fit px-3.5 py-1.5 bg-blue-600 rounded-[100px] gap-2.5">
          <span className="text-white text-sm font-semibold">파일 업로드</span>
        </button>
      </div>
    </div>
  );
}

type SectionCardProps = {
  title: string;
  isComplete: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

function SectionCard({
  title,
  isComplete,
  isOpen,
  onToggle,
  children,
}: SectionCardProps) {
  return (
    <div className="p-5 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-zinc-200 flex flex-col">
      <button
        onClick={onToggle}
        className={`flex flex-row justify-between items-center ${
          isOpen ? 'mb-5' : ''
        }`}
      >
        <div className="flex flex-row gap-3">
          <span className="text-zinc-700 text-lg font-semibold">{title}</span>
          {isComplete ? (
            <div className="px-2 py-0.5 bg-emerald-50 rounded-3xl inline-flex justify-center items-center gap-2.5">
              <span className="text-emerald-600 text-xs font-semibold leading-4">
                작성 완료
              </span>
            </div>
          ) : (
            <div className="px-2 py-0.5 bg-pink-100 rounded-3xl inline-flex justify-center items-center gap-2.5">
              <span className="text-red-500 text-xs font-semibold">
                입력 필요
              </span>
            </div>
          )}
        </div>
        {isOpen ? (
          <ChevronUp size={16} color="#949BA7" />
        ) : (
          <ChevronDown size={16} color="#949BA7" />
        )}
      </button>
      {isOpen && <div className="flex flex-col gap-7">{children}</div>}
    </div>
  );
}

// ============ 메인 컴포넌트 ============

export default function DashBoard() {
  // 학생 단체 - 수령 정보
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');

  // 학생 단체 - 홍보물
  const [promoFile, setPromoFile] = useState<File | null>(null);

  // 학생 단체 - 인수증
  const [receiptTime, setReceiptTime] = useState('');
  const [receiptLocation, setReceiptLocation] = useState('');
  const [productCount, setProductCount] = useState('');
  const [productUnit, setProductUnit] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [productStatus, setProductStatus] = useState(0);

  // 기업 - 제품 정보
  const [productName, setProductName] = useState('');
  const [companyProductCount, setCompanyProductCount] = useState('');
  const [companyProductUnit, setCompanyProductUnit] = useState('');
  const [productDescription, setProductDescription] = useState('');

  // 기업 - 홍보 컨텐츠
  const [productPhoto, setProductPhoto] = useState<File | null>(null);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);

  // 기업 - 발송 정보
  const [shippingDate, setShippingDate] = useState('');
  const [shippingStatus, setShippingStatus] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState('');

  // 섹션 열림/닫힘 상태
  const [sections, setSections] = useState({
    studentReceipt: true,
    studentPromo: true,
    studentReceipt2: true,
    companyProduct: true,
    companyPromo: true,
    companyShipping: true,
  });

  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // 완료 상태 체크
  const isStudentReceiptComplete =
    recipientName.trim() !== '' &&
    recipientPhone.trim() !== '' &&
    recipientAddress.trim() !== '';

  const isStudentPromoComplete = true; // 선택 사항이므로 항상 완료

  const isStudentReceipt2Complete =
    receiptTime.trim() !== '' &&
    receiptLocation.trim() !== '' &&
    productCount.trim() !== '' &&
    productUnit.trim() !== '' &&
    expiryDate.trim() !== '' &&
    remarks.trim() !== '';

  const isCompanyProductComplete =
    productName.trim() !== '' &&
    companyProductCount.trim() !== '' &&
    companyProductUnit.trim() !== '' &&
    productDescription.trim() !== '';

  const isCompanyPromoComplete = true; // 선택 사항이므로 항상 완료

  const isCompanyShippingComplete =
    shippingDate.trim() !== '' && trackingNumber.trim() !== '';

  return (
    <CorporateLayout>
      <div className="flex flex-col gap-5">
        {/* 헤더 */}
        <div className="flex flex-col gap-5">
          <button className="inline-flex w-fit pl-1.5 pr-3 py-1.5 bg-slate-100 rounded-lg justify-start items-center gap-1 hover:bg-slate-200 active:scale-98 transition-all">
            <ChevronLeft size={16} color="#949BA7" />
            <div className="text-gray-400 font-semibold">이전</div>
          </button>
          <div className="text-zinc-700 text-xl font-bold">협업 대시보드</div>
        </div>

        <div className="flex flex-row gap-7">
          {/* 학생 단체 */}
          <div className="flex-1 flex flex-col gap-5">
            <OrgCard
              category="학생 단체"
              organizationName="한양대학교 총학생회 000"
            />

            {/* 수령 정보 */}
            <SectionCard
              title="수령 정보"
              isComplete={isStudentReceiptComplete}
              isOpen={sections.studentReceipt}
              onToggle={() => toggleSection('studentReceipt')}
            >
              <Textinput
                label="제품 수령인"
                placeholder="수령인명을 입력해주세요."
                value={recipientName}
                onChange={setRecipientName}
              />
              <Textinput
                label="수령인 연락처"
                placeholder="수령인 연락처를 입력해주세요."
                value={recipientPhone}
                onChange={setRecipientPhone}
              />
              <Textinput
                label="수령 주소"
                placeholder="수령 주소를 입력해주세요"
                value={recipientAddress}
                onChange={setRecipientAddress}
              />
            </SectionCard>

            {/* 홍보물 */}
            <SectionCard
              title="홍보물"
              isComplete={isStudentPromoComplete}
              isOpen={sections.studentPromo}
              onToggle={() => toggleSection('studentPromo')}
            >
              <FileUpload
                label="별첨 자료"
                optional
                value={promoFile}
                onChange={setPromoFile}
              />
            </SectionCard>

            {/* 인수증 */}
            <SectionCard
              title="인수증"
              isComplete={isStudentReceipt2Complete}
              isOpen={sections.studentReceipt2}
              onToggle={() => toggleSection('studentReceipt2')}
            >
              <Dateinput
                label="수령 시각"
                value={receiptTime}
                onChange={setReceiptTime}
              />
              <Textinput
                label="수령 장소"
                placeholder="수령 장소를 입력해주세요"
                value={receiptLocation}
                onChange={setReceiptLocation}
              />
              <div className="flex flex-row gap-4">
                <Textinput
                  label="제품 개수"
                  placeholder="개수를 입력해주세요"
                  value={productCount}
                  onChange={setProductCount}
                />
                <Textinput
                  label="단위"
                  placeholder="ex) 개/박스 등"
                  value={productUnit}
                  onChange={setProductUnit}
                />
              </div>
              <Dateinput
                label="제품 유통 기한"
                value={expiryDate}
                onChange={setExpiryDate}
              />
              <Textinput
                label="비고"
                placeholder="특이사항을 입력해주세요"
                value={remarks}
                onChange={setRemarks}
              />
              <ToggleTagSet
                label="제품 이상 여부"
                tags={['검수 대기', '이상 없음', '이상 발견']}
                value={productStatus}
                onChange={(_, index) => setProductStatus(index)}
              />
            </SectionCard>
          </div>

          {/* 기업 */}
          <div className="flex-1 flex flex-col gap-5">
            <OrgCard category="기업" organizationName="크라이치즈버거" />

            {/* 제품 정보 */}
            <SectionCard
              title="제품 정보"
              isComplete={isCompanyProductComplete}
              isOpen={sections.companyProduct}
              onToggle={() => toggleSection('companyProduct')}
            >
              <Textinput
                label="제공/서비스명"
                placeholder="제공 예정인 제품/서비스명을 입력해주세요."
                value={productName}
                onChange={setProductName}
              />
              <div className="flex flex-row gap-4">
                <Textinput
                  label="제품 개수"
                  placeholder="개수를 입력해주세요."
                  value={companyProductCount}
                  onChange={setCompanyProductCount}
                />
                <Textinput
                  label="단위"
                  placeholder="ex) 개/박스 등"
                  value={companyProductUnit}
                  onChange={setCompanyProductUnit}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 font-semibold">제품 설명</label>
                <textarea
                  value={productDescription}
                  onChange={(e) =>
                    e.target.value.length <= 500 &&
                    setProductDescription(e.target.value)
                  }
                  className="h-32 p-5 rounded-xl outline outline-1 outline-zinc-200"
                  placeholder="제품 설명을 입력해주세요"
                />
                <p className="text-xs text-gray-400 text-right">
                  {productDescription.length}/500
                </p>
              </div>
            </SectionCard>

            {/* 홍보 컨텐츠 */}
            <SectionCard
              title="홍보 컨텐츠"
              isComplete={isCompanyPromoComplete}
              isOpen={sections.companyPromo}
              onToggle={() => toggleSection('companyPromo')}
            >
              <FileUpload
                label="제품 사진"
                optional
                value={productPhoto}
                onChange={setProductPhoto}
              />
              <FileUpload
                label="기업 로고"
                optional
                value={companyLogo}
                onChange={setCompanyLogo}
              />
            </SectionCard>

            {/* 발송 정보 */}
            <SectionCard
              title="발송 정보"
              isComplete={isCompanyShippingComplete}
              isOpen={sections.companyShipping}
              onToggle={() => toggleSection('companyShipping')}
            >
              <Dateinput
                label="발송 예정 일자"
                value={shippingDate}
                onChange={setShippingDate}
              />
              <ToggleTagSet
                label="발송 여부"
                tags={[
                  '발송 준비 중',
                  '택배사 접수 완료',
                  '기사 배정',
                  '배송 중',
                ]}
                value={shippingStatus}
                onChange={(_, index) => setShippingStatus(index)}
              />
              <Textinput
                label="운송장 번호"
                placeholder="운송장 번호를 입력해주세요."
                value={trackingNumber}
                onChange={setTrackingNumber}
              />
            </SectionCard>
          </div>
        </div>
      </div>
    </CorporateLayout>
  );
}
