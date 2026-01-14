import React, { useState, useEffect } from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { ChevronRight, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getAccessToken } from '@/lib/auth/token';

// 새 API 응답 타입
interface CampaignItem {
  campaignId: number;
  campaignName: string;
  productQuantity: number;
  startDate: string;
  endDate: string;
  schoolName: string;
  organizationName: string;
  logoUrl: string;
}

// 테이블에서 사용할 타입 (기존 MatchedStudentOrg와 호환)
interface MatchedStudentOrg {
  studentOrgId: number;
  organizationName: string;
  schoolName: string;
  campaignName: string;
  matchedTags: string[];
  expectedParticipants: number;
  estimatedCostRange: string;
  logoUrl?: string;
}

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        w-5 h-5 rounded-md flex items-center justify-center
        transition-colors
        ${checked ? 'bg-blue-600' : 'border border-gray-400 bg-white'}
      `}
      role="checkbox"
      aria-checked={checked}
    >
      {checked && <Check size={14} strokeWidth={2.2} className="text-white" />}
    </button>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 bg-sky-100 rounded-3xl text-xs font-semibold text-sky-500">
      {label}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-1">
      <span className="text-base font-medium text-gray-400">{label}</span>
      <span className="text-base font-medium text-gray-500">{value}</span>
    </div>
  );
}

function SidePannal({
  org,
  isOpen,
  onClose,
}: {
  org: MatchedStudentOrg | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!org) return null;

  return (
    <div
      className={`w-96 h-full bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] overflow-y-auto
        transform transition-all duration-300 ease-out
        ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className="w-80 mx-auto mt-8 flex flex-col gap-9">
        {/* 헤더 */}
        <div className="flex flex-col gap-5">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0.5">
                <h1 className="text-xl font-bold text-zinc-700 leading-8">
                  {org.campaignName}
                </h1>
                <p className="text-base font-semibold text-gray-500 leading-6">
                  {org.organizationName}
                </p>
              </div>

              <button className="px-3 py-1 bg-sky-100 rounded-3xl flex items-center gap-1 text-sky-500 text-sm font-medium">
                상세
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="border-b border-gray-100" />
          </div>
        </div>

        {/* 행사 정보 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" alt="icon" className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-600">행사 정보</h2>
          </div>

          <div className="flex flex-col gap-2">
            <Row label="학교" value={org.schoolName || '-'} />
            <Row label="수량" value={`${org.expectedParticipants.toLocaleString()}개`} />
            <Row label="기간" value={org.estimatedCostRange} />
          </div>
        </div>

        {/* 매칭 태그 */}
        {org.matchedTags.length > 0 && (
          <div className="flex flex-col gap-4 mb-[148px]">
            <div className="flex items-center gap-2">
              <img src="/File_Blue.png" alt="icon" className="w-5 h-5" />
              <h2 className="text-lg font-semibold text-gray-600">매칭 태그</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {org.matchedTags.map((tag, idx) => (
                <Tag key={idx} label={tag} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MatchingTable({
  data,
  selectedIds,
  onSelectionChange,
  onSelectEvent,
}: {
  data: MatchedStudentOrg[];
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onSelectEvent: (org: MatchedStudentOrg) => void;
}) {
  const handleCheckboxChange = (orgId: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, orgId]);
    } else {
      onSelectionChange(selectedIds.filter((id) => id !== orgId));
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-3xl border border-zinc-200 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="sticky top-0 bg-white z-10">
            <tr className="h-14 border-b border-zinc-200 text-gray-400 text-sm font-medium">
              <th className="w-12 pl-5 text-left"></th>
              <th className="w-48 pl-5 text-left">기간</th>
              <th className="w-48 pl-5 text-left">단체명</th>
              <th className="text-left pl-5">캠페인명</th>
              <th className="w-32 pl-5 text-left">학교</th>
              <th className="w-24 pl-5 text-left">수량</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-sm font-medium text-gray-600">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  매칭된 학생 단체가 없습니다.
                </td>
              </tr>
            ) : (
              data.map((org) => (
                <tr key={org.studentOrgId} className="h-10 hover:bg-slate-100 transition-colors">
                  <td className="pl-5">
                    <Checkbox
                      checked={selectedIds.includes(org.studentOrgId)}
                      onChange={(checked) => handleCheckboxChange(org.studentOrgId, checked)}
                    />
                  </td>
                  <td className="pl-5 text-xs">{org.estimatedCostRange}</td>
                  <td className="pl-5">{org.organizationName}</td>
                  <td className="pl-5">
                    <div
                      onClick={() => onSelectEvent(org)}
                      className="line-clamp-1 cursor-pointer transition-colors hover:text-blue-600 hover:font-bold"
                    >
                      {org.campaignName}
                    </div>
                  </td>
                  <td className="pl-5">{org.schoolName || '-'}</td>
                  <td className="pl-5">{org.expectedParticipants.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Step3Matching() {
  const navigate = useNavigate();
  const location = useLocation();
  const samplingProposalId = (location.state as { samplingProposalId?: number })?.samplingProposalId;

  const [matchedOrgs, setMatchedOrgs] = useState<MatchedStudentOrg[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 선택된 캠페인 ID 관리
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<number[]>([]);

  // 사이드바 토글 관련 상태
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<MatchedStudentOrg | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const token = getAccessToken();

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/company/campaigns`,
          {
            params: { page: 0, size: 100 },
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data?.content) {
          // API 응답을 MatchedStudentOrg 형태로 변환
          const mappedData: MatchedStudentOrg[] = response.data.content.map(
            (item: CampaignItem) => ({
              studentOrgId: item.campaignId,
              organizationName: item.organizationName || '정보 없음',
              schoolName: item.schoolName || '',
              campaignName: item.campaignName || '캠페인명 없음',
              matchedTags: [],
              expectedParticipants: item.productQuantity || 0,
              estimatedCostRange: `${item.startDate} ~ ${item.endDate}`,
              logoUrl: item.logoUrl,
            })
          );
          setMatchedOrgs(mappedData);
        } else {
          setMatchedOrgs([]);
        }
      } catch (err: any) {
        console.error('캠페인 데이터 로드 실패:', err);
        setError(err.message || '캠페인 데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleNext = () => {
    if (selectedCampaignIds.length === 0) {
      alert('최소 1개 이상의 학생 단체를 선택해주세요.');
      return;
    }
    navigate('/corporatesamplingrequest/step4', {
      state: { samplingProposalId, campaignIds: selectedCampaignIds }
    });
  };

  const handlePrev = () => {
    navigate('/corporatesamplingrequest/step2', {
      state: { samplingProposalId }
    });
  };

  return (
    <>
      <CorporateLayout>
        {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
        {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <img src="/File_Blue.png" alt="" className="w-5 h-5" />
              <h1 className="text-[20px] font-semibold text-[#2D3139]">
                매칭 / 견적
              </h1>
            </div>
            <RequestStatus activeStep={3} />
          </div>
          <div className="border-t border-gray-200 mb-6" />

          <div className="flex-1 flex flex-col min-h-0 mb-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">로딩 중...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <MatchingTable
                data={matchedOrgs}
                selectedIds={selectedCampaignIds}
                onSelectionChange={setSelectedCampaignIds}
                onSelectEvent={(org) => {
                  setSelectedOrg(org);
                  setIsPanelOpen(true);
                }}
              />
            )}
          </div>
          {/*다음 버튼 하단 정렬 영역*/}
          <div className="mt-auto flex justify-end items-end gap-4">
            <button
              onClick={handlePrev}
              className="h-14 w-[200px] rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500"
            >
              <span className="text-sky-500 font-medium text-lg">이전</span>
            </button>
            <button
              onClick={handleNext}
              className="h-14 w-[200px] bg-blue-600 rounded-xl"
            >
              <span className="text-white font-medium text-lg">다음</span>
            </button>
          </div>
        </div>
      </CorporateLayout>

      {/*사이드 패널*/}
      <div className="fixed right-4 top-4 bottom-4 z-50 pointer-events-none">
        <div
          className={`h-full ${
            isPanelOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <SidePannal
            org={selectedOrg}
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
