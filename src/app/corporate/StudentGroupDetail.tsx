import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CorporateLayout from '@/components/layout/CorporateLayout';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Briefcase } from 'lucide-react';

/* =========================
   희망 협업 방식 카드
========================= */
function CollaborationMethodCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-5 rounded-xl border border-[#E6E8EC] bg-white">
      <h4 className="text-[16px] font-semibold text-[#2D3139] mb-2">{title}</h4>
      <p className="text-[14px] text-[#6C727E] leading-relaxed">{description}</p>
    </div>
  );
}

/* =========================
   희망 협업 성과 카드
========================= */
function CollaborationOutcomeCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="p-5 rounded-xl border border-[#E6E8EC] bg-white">
      <p className="text-[24px] font-bold text-[#007AFF] mb-1">{value}</p>
      <p className="text-[14px] text-[#6C727E]">{label}</p>
    </div>
  );
}

/* =========================
   협업 이력 아이템
========================= */
function CollaborationHistoryItem({
  companyName,
  date,
  type,
  logoUrl,
}: {
  companyName: string;
  date: string;
  type: string;
  logoUrl?: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E6E8EC] bg-white">
      <div className="w-12 h-12 rounded-full bg-[#E3F4FF] flex items-center justify-center overflow-hidden">
        {logoUrl ? (
          <img src={logoUrl} alt={companyName} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[#007AFF] text-[20px]">🏢</span>
        )}
      </div>
      <div className="flex-1">
        <p className="text-[16px] font-medium text-[#2D3139]">{companyName}</p>
        <p className="text-[14px] text-[#9AA1AD]">
          {date} | {type}
        </p>
      </div>
    </div>
  );
}

/* =========================
   정보 행
========================= */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[15px]">
      <Icon className="w-4 h-4 text-[#9AA1AD]" />
      <span className="text-[#9AA1AD] w-[40px]">{label}</span>
      <span className="text-[#2D3139]">{value}</span>
    </div>
  );
}

/* =========================
   메인 컴포넌트
========================= */
export default function StudentGroupDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // TODO: API 연동 시 실제 데이터로 교체
  const mockData = {
    name: '크라이치즈버거',
    description: '문과대학의 대표 축제로 다양한 참여와 체험이 가능한 종합 문화 행사입니다.',
    category: 'F/B',
    period: '2026.01.11 ~ 2026.06.11',
    collaborationTypes: ['할인형 제휴', '샘플링', '기타'],
    imageUrl: '',
    collaborationMethods: [
      { title: '체험 부스', description: '문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스' },
      { title: '체험 부스', description: '문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스' },
      { title: '체험 부스', description: '문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스' },
      { title: '체험 부스', description: '문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스' },
      { title: '체험 부스', description: '문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스문화 체험 부스' },
    ],
    collaborationOutcomes: [
      { value: '5,000명 +', label: 'SNS 프로모션' },
      { value: '5,000명 +', label: 'SNS 프로모션' },
      { value: '5,000명 +', label: 'SNS 프로모션' },
    ],
    collaborationHistory: [
      { companyName: '블루블루', date: '2026-1', type: '물품 협찬' },
      { companyName: '블루블루', date: '2026-1', type: '물품 협찬' },
      { companyName: '블루블루', date: '2026-1', type: '물품 협찬' },
    ],
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRequestCollaboration = () => {
    // TODO: 협업 요청 페이지로 이동 또는 모달 열기
    navigate('/corporatesamplingrequest/step1');
  };

  return (
    <CorporateLayout>
      <div className="flex flex-col w-full max-w-[960px] mx-auto px-6 pb-16">
        {/* ================= 이전 버튼 ================= */}
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-[14px] text-[#6C727E] hover:text-[#007AFF] transition-colors mt-4 mb-4 w-fit"
        >
          <ChevronLeft className="w-4 h-4" />
          이전
        </button>

        {/* ================= 헤더 ================= */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <h1 className="text-[24px] font-bold text-[#2D3139]">{mockData.name}</h1>
              <ChevronRight className="w-5 h-5 text-[#2D3139]" />
            </div>
            <p className="text-[15px] text-[#6C727E]">{mockData.description}</p>
          </div>

          <button
            onClick={handleRequestCollaboration}
            className="px-5 py-2.5 rounded-lg bg-[#007AFF] text-white text-[14px] font-medium hover:bg-[#0066DD] transition-colors"
          >
            협업 요청하기
          </button>
        </div>

        {/* ================= 기본 정보 ================= */}
        <div className="flex flex-col gap-2 mb-6">
          <InfoRow icon={MapPin} label="분류" value={mockData.category} />
          <InfoRow icon={Calendar} label="기간" value={mockData.period} />
          <InfoRow icon={Briefcase} label="협업" value={mockData.collaborationTypes.join(', ')} />
        </div>

        <div className="border-t border-[#E6E8EC] my-6" />

        {/* ================= 제품/서비스 ================= */}
        <section className="mb-8">
          <h2 className="text-[18px] font-semibold text-[#2D3139] mb-4">제품/서비스</h2>
          <div className="w-full h-[200px] rounded-xl bg-[#F2F4F7] border border-[#E6E8EC] flex items-center justify-center">
            {mockData.imageUrl ? (
              <img
                src={mockData.imageUrl}
                alt="제품/서비스"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-[#9AA1AD] text-[14px]">이미지 없음</span>
            )}
          </div>
        </section>

        {/* ================= 희망 협업 방식 ================= */}
        <section className="mb-8">
          <h2 className="text-[18px] font-semibold text-[#2D3139] mb-4">희망 협업 방식</h2>
          <div className="grid grid-cols-3 gap-4">
            {mockData.collaborationMethods.map((method, idx) => (
              <CollaborationMethodCard
                key={idx}
                title={method.title}
                description={method.description}
              />
            ))}
          </div>
        </section>

        {/* ================= 희망 협업 성과 ================= */}
        <section className="mb-8">
          <h2 className="text-[18px] font-semibold text-[#2D3139] mb-4">희망 협업 성과</h2>
          <div className="grid grid-cols-3 gap-4">
            {mockData.collaborationOutcomes.map((outcome, idx) => (
              <CollaborationOutcomeCard
                key={idx}
                value={outcome.value}
                label={outcome.label}
              />
            ))}
          </div>
        </section>

        {/* ================= 협업 이력 ================= */}
        <section>
          <h2 className="text-[18px] font-semibold text-[#2D3139] mb-4">협업 이력</h2>
          <div className="flex flex-col gap-3">
            {mockData.collaborationHistory.map((history, idx) => (
              <CollaborationHistoryItem
                key={idx}
                companyName={history.companyName}
                date={history.date}
                type={history.type}
              />
            ))}
          </div>
        </section>
      </div>
    </CorporateLayout>
  );
}
