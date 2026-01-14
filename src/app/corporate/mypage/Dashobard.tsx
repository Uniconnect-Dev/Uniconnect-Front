import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Calendar,
  Download,
} from 'lucide-react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import * as dashboardService from '@/services/dashboard/dashboard.service';

// ============ 공통 컴포넌트 (스타일 유지) ============

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
        alt="Org logo"
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

function Textinput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label className="text-gray-500 font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 rounded-xl outline outline-1 outline-zinc-200 focus:outline-blue-500 transition-all"
      />
    </div>
  );
}

function Dateinput({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (date: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getDays = (date: Date) => {
    const y = date.getFullYear(),
      m = date.getMonth();
    const first = new Date(y, m, 1),
      last = new Date(y, m + 1, 0);
    const days: (Date | null)[] = [];
    for (let i = 0; i < first.getDay(); i++) days.push(null);
    for (let i = 1; i <= last.getDate(); i++) days.push(new Date(y, m, i));
    return days;
  };

  const handleSelect = (d: Date) => {
    const formatted = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}.${String(d.getDate()).padStart(2, '0')}`;
    onChange(formatted);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-2 relative text-left">
      <label className="text-gray-500 font-semibold">{label}</label>
      <div className="relative">
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          value={value}
          readOnly
          onFocus={() => setIsOpen(true)}
          className="w-full p-4 pl-12 rounded-xl outline outline-1 outline-zinc-200 cursor-pointer"
          placeholder="YYYY.MM.DD"
        />
      </div>
      {isOpen && (
        <div className="absolute top-full mt-2 w-80 bg-white rounded-2xl z-30 shadow-xl p-4">
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
            <span className="font-bold">
              {currentMonth.getFullYear()}.
              {String(currentMonth.getMonth() + 1).padStart(2, '0')}
            </span>
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
          <div className="grid grid-cols-7 gap-1">
            {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
              <div key={d} className="text-center text-xs text-gray-300">
                {d}
              </div>
            ))}
            {getDays(currentMonth).map((day, i) =>
              day ? (
                <button
                  key={i}
                  onClick={() => handleSelect(day)}
                  className="w-10 h-10 rounded-lg text-gray-500 hover:bg-sky-100 hover:text-sky-500"
                >
                  {day.getDate()}
                </button>
              ) : (
                <div key={i} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleTagSet({
  label,
  tags,
  value,
  onChange,
}: {
  label: string;
  tags: string[];
  value: number;
  onChange: (v: string, i: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label className="text-gray-500 font-semibold">{label}</label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <button
            key={i}
            onClick={() => onChange(tag, i)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              value === i
                ? 'bg-sky-100 border-sky-500 text-sky-600'
                : 'border-zinc-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="text-base font-medium">{tag}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FileUpload({
  label,
  optional,
  value,
  onChange,
}: {
  label: string;
  optional?: boolean;
  value: File | null;
  onChange: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-2 text-left">
      <div className="flex gap-1">
        <label className="text-gray-500 font-semibold">{label}</label>
        {optional && <span className="text-gray-400">(선택)</span>}
      </div>
      <div className="p-10 rounded-xl outline outline-1 outline-zinc-200 flex flex-col items-center">
        <div className="w-14 h-14 bg-gray-100 rounded-xl border border-dashed border-gray-400 flex justify-center items-center mb-2">
          {value ? (
            <div className="text-[10px] p-1 text-center truncate w-full">
              {value.name}
            </div>
          ) : (
            <Download className="text-gray-400" size={24} />
          )}
        </div>
        <p className="text-sm font-semibold">
          {value ? '파일 선택됨' : '파일 드롭하기'}
        </p>
        <p className="text-gray-400 text-xs mb-2">or</p>
        <button
          onClick={() => inputRef.current?.click()}
          className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold"
        >
          파일 업로드
        </button>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
}

function SectionCard({
  title,
  isComplete,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isComplete: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-[20px] outline outline-1 outline-zinc-200 flex flex-col bg-white">
      <button
        onClick={onToggle}
        className={`flex justify-between items-center ${isOpen ? 'mb-5' : ''}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-zinc-700 text-lg font-semibold">{title}</span>
          <div
            className={`px-2 py-0.5 rounded-3xl ${
              isComplete
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-pink-100 text-red-500'
            } text-xs font-semibold`}
          >
            {isComplete ? '작성 완료' : '입력 필요'}
          </div>
        </div>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>
      {isOpen && <div className="flex flex-col gap-7">{children}</div>}
    </div>
  );
}

// ============ 메인 컴포넌트 ============

export default function DashBoard() {
  const collaborationId = 123; // 실제 ID

  // --- 학생 State ---
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [promoFile, setPromoFile] = useState<File | null>(null);
  const [receiptTime, setReceiptTime] = useState('');
  const [receiptLocation, setReceiptLocation] = useState('');
  const [productCount, setProductCount] = useState('');
  const [productUnit, setProductUnit] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [productStatus, setProductStatus] = useState(0);
  const [receiptImage, setReceiptImage] = useState<File | null>(null);

  // --- 기업 State ---
  const [productName, setProductName] = useState('');
  const [coProductCount, setCoProductCount] = useState('');
  const [coProductUnit, setCoProductUnit] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPhoto, setProductPhoto] = useState<File | null>(null);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [shippingDate, setShippingDate] = useState('');
  const [shippingStatus, setShippingStatus] = useState(0);
  const [trackingNo, setTrackingNo] = useState('');

  const [sections, setSections] = useState({
    s1: true,
    s2: true,
    s3: true,
    c1: true,
    c2: true,
    c3: true,
  });

  const handleSubmitAll = async () => {
    try {
      // 1. 학생 수령 정보
      const p1 = dashboardService.postReceiveInfo({
        collaborationId,
        receiverName: recipientName,
        receiverPhone: recipientPhone,
        note: recipientAddress,
      });

      // 2. 기업 제품 정보
      const p2 = dashboardService.postProductInfo({
        collaborationId,
        productName,
        quantity: Number(coProductCount),
        description: productDesc,
      });

      // 3. 기업 발송 정보
      const p3 = dashboardService.patchShippingInfo({
        collaborationId,
        shippingDate: shippingDate.replace(/\./g, '-'),
        isShipped: shippingStatus > 0,
        trackingNo,
      });

      // 4. 파일 업로드들
      const uploads = [];
      if (promoFile)
        uploads.push(
          dashboardService.postContentUpload({
            collaborationId,
            uploaderType: 'StudentOrg',
            caption: '학생홍보물',
            image: promoFile,
          })
        );
      if (productPhoto)
        uploads.push(
          dashboardService.postContentUpload({
            collaborationId,
            uploaderType: 'Company',
            caption: '제품사진',
            image: productPhoto,
          })
        );
      if (companyLogo)
        uploads.push(
          dashboardService.postContentUpload({
            collaborationId,
            uploaderType: 'Company',
            caption: '기업로고',
            image: companyLogo,
          })
        );

      // 5. 인수증
      if (receiptImage) {
        uploads.push(
          dashboardService.postReceiptSubmit({
            json: {
              receiptTime: receiptTime.replace(/\./g, '-'),
              location: receiptLocation,
              receivedQuantity: Number(productCount),
              unit: productUnit,
              expirationDate: expiryDate.replace(/\./g, '-'),
              hasDefect: productStatus === 2,
              remarks,
            },
            receiptImage,
          })
        );
      }

      await Promise.all([p1, p2, p3, ...uploads]);
      alert('모든 정보가 성공적으로 제출되었습니다.');
    } catch (e) {
      console.error(e);
      alert('제출 중 오류가 발생했습니다. 모든 필수 항목을 확인해주세요.');
    }
  };

  const isS1Comp =
    recipientName !== '' && recipientPhone !== '' && recipientAddress !== '';
  const isS3Comp =
    receiptTime !== '' &&
    receiptLocation !== '' &&
    productCount !== '' &&
    receiptImage !== null;
  const isC1Comp = productName !== '' && coProductCount !== '';
  const isC3Comp = shippingDate !== '' && trackingNo !== '';

  return (
    <CorporateLayout>
      <div className="flex flex-col gap-5 max-w-[1200px] mx-auto pb-24 relative">
        {/* 헤더 */}
        <div className="flex flex-col gap-5">
          <button className="inline-flex w-fit pl-1.5 pr-3 py-1.5 bg-slate-100 rounded-lg items-center gap-1 hover:bg-slate-200 transition-all">
            <ChevronLeft size={16} color="#949BA7" />
            <span className="text-gray-400 font-semibold">이전</span>
          </button>
          <h1 className="text-zinc-700 text-xl font-bold text-left">
            협업 대시보드
          </h1>
        </div>

        <div className="flex flex-row gap-7 items-start">
          {/* 왼쪽: 학생 단체 */}
          <div className="flex-1 flex flex-col gap-5">
            <OrgCard
              category="학생 단체"
              organizationName="한양대학교 총학생회 000"
            />
            <SectionCard
              title="수령 정보"
              isComplete={isS1Comp}
              isOpen={sections.s1}
              onToggle={() => setSections((p) => ({ ...p, s1: !p.s1 }))}
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
            <SectionCard
              title="홍보물"
              isComplete={true}
              isOpen={sections.s2}
              onToggle={() => setSections((p) => ({ ...p, s2: !p.s2 }))}
            >
              <FileUpload
                label="별첨 자료"
                optional
                value={promoFile}
                onChange={setPromoFile}
              />
            </SectionCard>
            <SectionCard
              title="인수증"
              isComplete={isS3Comp}
              isOpen={sections.s3}
              onToggle={() => setSections((p) => ({ ...p, s3: !p.s3 }))}
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
              <div className="flex gap-4">
                <div className="flex-1">
                  <Textinput
                    label="제품 개수"
                    placeholder="개수"
                    value={productCount}
                    onChange={setProductCount}
                  />
                </div>
                <div className="flex-1">
                  <Textinput
                    label="단위"
                    placeholder="ex) 개/박스"
                    value={productUnit}
                    onChange={setProductUnit}
                  />
                </div>
              </div>
              <Dateinput
                label="제품 유통 기한"
                value={expiryDate}
                onChange={setExpiryDate}
              />
              <Textinput
                label="비고"
                placeholder="특이사항 입력"
                value={remarks}
                onChange={setRemarks}
              />
              <ToggleTagSet
                label="제품 이상 여부"
                tags={['검수 대기', '이상 없음', '이상 발견']}
                value={productStatus}
                onChange={(_, i) => setProductStatus(i)}
              />
              <FileUpload
                label="인수증 사진"
                value={receiptImage}
                onChange={setReceiptImage}
              />
            </SectionCard>
          </div>

          {/* 오른쪽: 기업 */}
          <div className="flex-1 flex flex-col gap-5">
            <OrgCard category="기업" organizationName="크라이치즈버거" />
            <SectionCard
              title="제품 정보"
              isComplete={isC1Comp}
              isOpen={sections.c1}
              onToggle={() => setSections((p) => ({ ...p, c1: !p.c1 }))}
            >
              <Textinput
                label="제공/서비스명"
                placeholder="제품명 입력"
                value={productName}
                onChange={setProductName}
              />
              <div className="flex gap-4">
                <div className="flex-1">
                  <Textinput
                    label="제품 개수"
                    placeholder="개수"
                    value={coProductCount}
                    onChange={setCoProductCount}
                  />
                </div>
                <div className="flex-1">
                  <Textinput
                    label="단위"
                    placeholder="ex) 개/박스"
                    value={coProductUnit}
                    onChange={setCoProductUnit}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label className="text-gray-500 font-semibold">제품 설명</label>
                <textarea
                  value={productDesc}
                  onChange={(e) =>
                    e.target.value.length <= 500 &&
                    setProductDesc(e.target.value)
                  }
                  className="h-32 p-5 rounded-xl outline outline-1 outline-zinc-200"
                  placeholder="설명 입력"
                />
                <p className="text-xs text-gray-400 text-right">
                  {productDesc.length}/500
                </p>
              </div>
            </SectionCard>
            <SectionCard
              title="홍보 컨텐츠"
              isComplete={true}
              isOpen={sections.c2}
              onToggle={() => setSections((p) => ({ ...p, c2: !p.c2 }))}
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
            <SectionCard
              title="발송 정보"
              isComplete={isC3Comp}
              isOpen={sections.c3}
              onToggle={() => setSections((p) => ({ ...p, c3: !p.c3 }))}
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
                onChange={(_, i) => setShippingStatus(i)}
              />
              <Textinput
                label="운송장 번호"
                placeholder="운송장 번호 입력"
                value={trackingNo}
                onChange={setTrackingNo}
              />
            </SectionCard>
          </div>
        </div>

        {/* 하단 고정 버튼 영역 (보내주신 디자인 적용) */}
        <div className="flex justify-end items-center gap-4 mt-auto">
          {/* 다운로드 버튼 */}
          <button className="w-48 h-14 px-7 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500 flex justify-center items-center gap-2.5 hover:bg-sky-50 transition-colors">
            <Download size={20} color="#007aff" />
            <div className="text-center text-sky-500 text-lg font-semibold leading-7">
              다운로드
            </div>
          </button>

          {/* 제출하기 버튼 */}
          <button
            onClick={handleSubmitAll}
            className="w-48 h-14 px-7 bg-blue-600 rounded-xl flex justify-center items-center gap-2.5 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <div className="flex-1 text-center text-white text-lg font-semibold leading-7">
              제출하기
            </div>
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
