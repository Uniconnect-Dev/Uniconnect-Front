import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CorporateLayout from '@/components/layout/CorporateLayout';

// 공통 폼 컴포넌트
import { FormSectionHeaderrequired } from '@/components/common/field/FormSectionHeader';
import TextInput from '@/components/common/input/TextInputControl';
import DateRangeInput from '@/components/common/input/DateRangeInput';

// 협업 관련 컴포넌트
import {
  CollaborationMethodSection,
  CollaborationMethod
} from '@/components/domain/Collaboration/CollaborationMethodSection';
import {
  CollaborationOutcomeSection,
  CollaborationOutcome
} from '@/components/domain/Collaboration/CollaborationOutcomeSection';

// API 서비스
import {
  createProposal,
  uploadProposalAttachment,
  submitProposal,
} from '@/services/partnership.service';
import type { ProposalType, PeriodType } from '@/services/partnership.types';
import { AppError } from '@/lib/error/AppError';

/* =========================
   공통 라벨 스타일
========================= */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
      {children}
    </label>
  );
}

/* =========================
   라디오 옵션 (텍스트형)
========================= */
function RadioOption({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-start gap-3 text-left"
    >
      <div
        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2
          ${active ? 'border-[#007AFF]' : 'border-gray-300'}
        `}
      >
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            active ? 'bg-[#007AFF]' : 'bg-gray-300'
          }`}
        />
      </div>

      <div>
        <p className="text-[16px] font-medium text-[#585F69] mb-1">
          {title}
        </p>
        <p className="text-[14px] text-[#949BA7] leading-relaxed">
          {desc}
        </p>
      </div>
    </button>
  );
}

/* =========================
   라디오 옵션 (박스형)
========================= */
function RadioCardOption({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-start gap-4 p-5 rounded-2xl border-2 text-left
        transition-all
        ${
          active
            ? 'border-[#007AFF] bg-[#F4FAFF]'
            : 'border-[#E6E8EC] bg-white hover:bg-[#F9FAFB]'
        }
      `}
    >
      <div
        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2
          ${active ? 'border-[#007AFF]' : 'border-[#C7CDD6]'}
        `}
      >
        {active && (
          <div className="h-2.5 w-2.5 rounded-full bg-[#007AFF]" />
        )}
      </div>

      <div>
        <p className="text-[16px] font-medium text-[#2D3139] mb-1">
          {title}
        </p>
        <p className="text-[14px] text-[#8B95A1] leading-relaxed">
          {desc}
        </p>
      </div>
    </button>
  );
}

/* =========================
   메인 컴포넌트
========================= */
export default function CollaborationProposal() {
  const navigate = useNavigate();

  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [isProposalDragging, setIsProposalDragging] = useState(false);

  /* 제안 분류 */
  const [type, setType] = useState<'bulk' | 'etc'>('bulk');

  /* 기업 정보 */
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  /* 제휴 정보 */
  const [productOrServiceName, setProductOrServiceName] = useState('');
  const [industries, setIndustries] = useState<string[]>([]);

  /* 희망 협업 기간 */
  const [periodType, setPeriodType] = useState<'always' | 'fixed'>('always');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  /* 제휴 내용 */
  const [proposalContent, setProposalContent] = useState('');

  /* 희망 협업 방향 */
  const [collaborationMethods, setCollaborationMethods] = useState<CollaborationMethod[]>([
    { id: crypto.randomUUID(), category: '', description: '' },
  ]);

  /* 희망 협업 성과 */
  const [collaborationOutcomes, setCollaborationOutcomes] = useState<CollaborationOutcome[]>([
    { id: crypto.randomUUID(), content: '' },
  ]);

  /* 정보 제공 동의 */
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  /* API 상태 */
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /* 날짜 포맷 변환 (YYYY.MM.DD -> YYYY-MM-DD) */
  const formatDateForApi = (dateStr: string): string => {
    if (!dateStr) return '';
    return dateStr.replace(/\./g, '-');
  };

  /* 폼 유효성 검사 */
  const isFormValid =
    contactName &&
    contactPhone &&
    contactEmail &&
    productOrServiceName &&
    industries.length > 0 &&
    proposalContent &&
    (periodType === 'always' || (startDate && endDate)) &&
    agreePrivacy;

  /* 제출 핸들러 */
  const handleSubmit = async () => {
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      // 1. 협업 제안 생성
      const proposalType: ProposalType = type === 'bulk' ? 'Discount' : 'Etc';
      const apiPeriodType: PeriodType = periodType === 'always' ? 'Always' : 'Fixed';

      // collaborationMethods를 JSON 형태로 변환
      const collaborationMethodsJson = {
        methods: collaborationMethods
          .filter(m => m.category || m.description)
          .map(m => ({ category: m.category, description: m.description })),
      };

      // collaborationOutcomes를 JSON 형태로 변환
      const expectedOutcomesJson = {
        outcomes: collaborationOutcomes
          .filter(o => o.content)
          .map(o => o.content),
      };

      const createResponse = await createProposal({
        proposalType,
        contactName,
        contactPhone,
        contactEmail,
        productOrServiceName,
        industry: industries.join(', '),
        periodType: apiPeriodType,
        ...(apiPeriodType === 'Fixed' && {
          startDate: formatDateForApi(startDate),
          endDate: formatDateForApi(endDate),
        }),
        proposalContent,
        collaborationMethodsJson,
        expectedOutcomesJson,
        agreePrivacy,
        agreeMarketing,
      });

      const proposalId = createResponse.data;

      // 2. 첨부파일 업로드 (파일이 있는 경우)
      if (proposalFile) {
        await uploadProposalAttachment(proposalId, proposalFile);
      }

      // 3. 최종 제출
      await submitProposal(proposalId);

      // 성공 시 이동 (완료 페이지 또는 목록)
      alert('협업 제안이 성공적으로 등록되었습니다.');
      navigate('/corporate');
    } catch (error) {
      if (error instanceof AppError) {
        setErrorMessage(error.message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('협업 제안 등록 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CorporateLayout>
      <div className="flex flex-col w-full max-w-[960px] mx-auto px-6 pb-16">
        {/* ================= 페이지 헤더 ================= */}
        <div className="mt-4 mb-6">
          <h1 className="text-[24px] font-semibold mb-1">협업 제안</h1>
          <p className="text-[#949BA7] text-[16px] tracking-[-0.24px]">
            혁신적인 아이디어와 서비스로 함께 성장할 파트너를 찾고 있습니다.
            <br />
            귀하의 제안을 상세히 작성해 주시면 검토 후 연락드리겠습니다.
          </p>
        </div>

        <div className="border-t border-gray-200 mb-8" />

        {/* ================= 제안 분류 ================= */}
        <FormSectionHeaderrequired title="제안 분류" />
        <div className="flex flex-col gap-3 mt-6">
          <RadioOption
            active={type === 'bulk'}
            onClick={() => setType('bulk')}
            title="할인형 제휴"
            desc="학생 단체가 필요한 물품을 더 저렴하게 단체 구매하도록 유도해, 실고객을 확보하고 홍보 효과를 얻는 서비스입니다."
          />

          <RadioOption
            active={type === 'etc'}
            onClick={() => setType('etc')}
            title="기타 제휴"
            desc="기존 협업 방식 외의 좋은 제안을 공유해주세요."
          />
        </div>

        <div className="border-t border-gray-200 mt-8 mb-8" />

        {/* ================= 기업 정보 ================= */}
        <section className="flex flex-col gap-5">
          <FormSectionHeaderrequired title="기업 정보" />

          <div className="flex gap-10">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <FieldLabel>담당자명</FieldLabel>
              <TextInput
                placeholder="담당자명을 입력해주세요."
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <FieldLabel>전화번호</FieldLabel>
              <TextInput
                placeholder="010-0000-0000"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <FieldLabel>이메일</FieldLabel>
              <TextInput
                placeholder="example@company.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className="flex-1 min-w-0" />
          </div>
        </section>

        <div className="border-t border-gray-200 mt-8 mb-8" />

        {/* ================= 제휴 정보 ================= */}
        <section className="flex flex-col gap-6 mb-6">
          <FormSectionHeaderrequired title="제휴 정보" />

          <div className="flex flex-col gap-2">
            <FieldLabel>제품/서비스명</FieldLabel>
            <TextInput
              placeholder="제품/서비스명을 입력해주세요."
              value={productOrServiceName}
              onChange={(e) => setProductOrServiceName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel>산업군</FieldLabel>

            <div className="flex flex-wrap gap-2">
              {[
                'IT/소프트웨어',
                '식품/음료',
                '교육/출판',
                '패션/뷰티',
                '금융/보험',
                '의료/헬스케어',
                '미디어/엔터테인먼트',
                '컨설팅/전문 서비스',
                '제조/생산',
                '운송/물류',
                '유통/소매',
                '기타',
              ].map((item) => {
                const isSelected = industries.includes(item);

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setIndustries((prev) =>
                        prev.includes(item)
                          ? prev.filter((v) => v !== item)
                          : [...prev, item]
                      );
                    }}
                    className={`
                      px-3 py-1.5 rounded-[8px] text-[16px]
                      border transition-colors tracking-[-0.24px]
                      ${
                        isSelected
                          ? 'bg-[#E3F4FF] border-transparent text-[#008FFF]'
                          : 'bg-white border-[#DADDE3] text-[#6C727E]'
                      }
                    `}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 희망 협업 기간 ================= */}
        <section className="flex flex-col gap-2">
          <FieldLabel>희망 협업 기간</FieldLabel>

          <RadioCardOption
            active={periodType === 'always'}
            onClick={() => setPeriodType('always')}
            title="상시 협업"
            desc="특정 기간 없이 지속적인 협업을 희망합니다."
          />

          <RadioCardOption
            active={periodType === 'fixed'}
            onClick={() => setPeriodType('fixed')}
            title="기간 지정"
            desc="협업 시작일과 종료일을 지정합니다."
          />

          {/* 기간 지정 선택 시에만 DateRangeInput 표시 */}
          {periodType === 'fixed' && (
            <div className="mt-4">
              <DateRangeInput
                startLabel="시작일"
                endLabel="종료일"
                placeholder="YYYY.MM.DD"
                startValue={startDate}
                endValue={endDate}
                onStartChange={setStartDate}
                onEndChange={setEndDate}
              />
            </div>
          )}
        </section>

        {/* ================= 제휴 내용 ================= */}
        <section className="flex flex-col gap-6 mt-6">
          <div className="flex flex-col gap-2">
            <FieldLabel>제휴 내용</FieldLabel>

            <textarea
              placeholder="제휴 요청 내용을 상세히 작성해주세요. 구체적인 내용일수록 빠른 검토가 가능합니다."
              maxLength={500}
              value={proposalContent}
              onChange={(e) => setProposalContent(e.target.value)}
              className="
                w-full h-[160px] p-4 rounded-xl
                border border-[#DADDE3]
                text-[16px] text-[#2D3139]
                resize-none
                focus:outline-none focus:border-[#007AFF]
              "
            />
          </div>
        </section>

        {/* ================= 제안 자료 ================= */}
        <section className="flex flex-col gap-2 mt-8">
          <FieldLabel>
            제안 자료 <span className="text-[#9AA1AD]">(1개)</span>{' '}
            <span className="text-[#9AA1AD]">(선택)</span>
          </FieldLabel>

          {!proposalFile ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsProposalDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsProposalDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsProposalDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) setProposalFile(file);
              }}
              className={`
                w-full rounded-2xl border p-6
                flex flex-col items-center justify-center text-center
                transition-colors
                ${
                  isProposalDragging
                    ? 'border-[#007AFF] bg-[#FFFFFF]'
                    : 'border-[#DADDE3] bg-white hover:bg-[#F9FAFB]'
                }
              `}
            >
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setProposalFile(file);
                  }}
                />

                <div className="flex flex-col items-center gap-1">
                  <div className="border border-dashed w-12 h-12 rounded-xl bg-[#F2F4F7] flex items-center justify-center">
                    <img src="/Upload.png" alt="upload" className="w-6" />
                  </div>

                  <p className="text-[14px] font-medium text-[#2D3139] tracking-[-0.21px]">
                    파일 드롭하기
                  </p>
                  <p className="text-[13px] text-[#9AA1AD]">or</p>

                  <span className="px-4 py-1.5 rounded-full bg-[#007AFF] text-white text-[14px] font-medium">
                    파일 업로드
                  </span>
                </div>
              </label>
            </div>
          ) : (
            <div className="w-full rounded-2xl border border-[#E5E8EB] bg-[#F9FAFB] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <img src="/File.png" alt="" className="w-5 h-5" />
                </div>

                <p className="text-[14px] text-[#2D3139] truncate">
                  {proposalFile.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setProposalFile(null)}
                className="text-[13px] text-[#9AA1AD] hover:text-[#007AFF]"
              >
                삭제
              </button>
            </div>
          )}
        </section>

        {/* ================= 희망 협업 방향 ================= */}
        <div className="border-t border-gray-200 mt-8 mb-8" />

        <CollaborationMethodSection
          title="희망 협업 방향"
          required
          maxItems={5}
          value={collaborationMethods}
          onChange={setCollaborationMethods}
        />

        {/* ================= 희망 협업 성과 ================= */}
        <div className="border-t border-gray-200 mt-8 mb-8" />

        <CollaborationOutcomeSection
          title="희망 협업 성과"
          required
          maxItems={5}
          value={collaborationOutcomes}
          onChange={setCollaborationOutcomes}
        />

        {/* ================= 정보 제공 동의 ================= */}
        <div className="border-t border-gray-200 mt-8 mb-8" />

        <section className="flex flex-col gap-4">
          <FormSectionHeaderrequired title="정보 제공 동의" />

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={(e) => setAgreePrivacy(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#007AFF] focus:ring-[#007AFF]"
            />
            <span className="text-[16px] text-[#2D3139]">
              개인정보 수집 및 이용 동의
            </span>
            <button type="button" className="text-[14px] text-[#007AFF] underline">
              전문보기
            </button>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeMarketing}
              onChange={(e) => setAgreeMarketing(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#007AFF] focus:ring-[#007AFF]"
            />
            <span className="text-[16px] text-[#2D3139]">
              마케팅 정보 수신 동의 <span className="text-[#9AA1AD]">(선택)</span>
            </span>
            <button type="button" className="text-[14px] text-[#007AFF] underline">
              전문보기
            </button>
          </label>
        </section>

        {/* ================= 에러 메시지 ================= */}
        {errorMessage && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-[14px]">{errorMessage}</p>
          </div>
        )}

        {/* ================= 등록하기 버튼 ================= */}
        <div className="mt-10">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            className={`
              w-full h-[56px] rounded-xl
              text-white text-[16px] font-semibold
              transition-colors
              ${isFormValid && !isLoading ? 'bg-[#007AFF] hover:bg-[#0066DD]' : 'bg-[#C7CDD6] cursor-not-allowed'}
            `}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                처리 중...
              </div>
            ) : (
              '등록하기'
            )}
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}