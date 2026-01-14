import React, { useState, useEffect } from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { ChevronRight, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMatchedStudentOrgs, getStudentOrgDetail, getOrgEstimate } from '@/services/sampling/sampling.service';
import type { MatchedStudentOrg, StudentOrgDetail, OrgEstimateResponse } from '@/services/sampling/sampling.type';

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
  samplingProposalId,
  isOpen,
  onClose,
}: {
  org: MatchedStudentOrg | null;
  samplingProposalId: number | undefined;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<StudentOrgDetail | null>(null);
  const [estimate, setEstimate] = useState<OrgEstimateResponse | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !org || !samplingProposalId) {
      setDetail(null);
      setEstimate(null);
      return;
    }

    const fetchData = async () => {
      try {
        setIsDetailLoading(true);
        const [detailData, estimateData] = await Promise.all([
          getStudentOrgDetail({
            samplingProposalId,
            orgId: org.studentOrgId,
            baseUnitCost: 0,
            reportOptionFee: 0,
            operationFee: 0,
          }),
          getOrgEstimate({
            samplingProposalId,
            orgId: org.studentOrgId,
            baseUnitCost: 0,
            reportOptionFee: 0,
            operationFee: 0,
          }),
        ]);
        setDetail(detailData);
        setEstimate(estimateData);
      } catch (err) {
        console.error('상세 조회 실패:', err);
      } finally {
        setIsDetailLoading(false);
      }
    };

    fetchData();
  }, [isOpen, org, samplingProposalId]);

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
                  {detail?.organizationName || org.organizationName}
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

        {isDetailLoading ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-gray-400">로딩 중...</p>
          </div>
        ) : (
          <>
            {/* 행사 정보 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <img src="/File_Blue.png" alt="icon" className="w-5 h-5" />
                <h2 className="text-lg font-semibold text-gray-600">행사 정보</h2>
              </div>

              <div className="flex flex-col gap-2">
                <Row label="학교" value={detail?.schoolName || org.schoolName} />
                <Row label="예상 참여자" value={`${org.expectedParticipants.toLocaleString()}명`} />
                <Row label="예상 비용" value={estimate?.estimatedCostRange || org.estimatedCostRange} />
              </div>
            </div>

            {/* 담당자 정보 */}
            {detail && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <img src="/File_Blue.png" alt="icon" className="w-5 h-5" />
                  <h2 className="text-lg font-semibold text-gray-600">담당자 정보</h2>
                </div>

                <div className="flex flex-col gap-2">
                  <Row label="담당자" value={detail.managerName || '-'} />
                  <Row label="연락처" value={detail.phone || '-'} />
                  <Row label="이메일" value={detail.email || '-'} />
                </div>
              </div>
            )}

            {/* 매칭 태그 */}
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
          </>
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
              <th className="w-32 pl-5 text-left">예상 비용</th>
              <th className="w-64 pl-5 text-left">단체명</th>
              <th className="text-left pl-5">행사명</th>
              <th className="w-48 pl-5 text-left">분류</th>
              <th className="w-28 pl-5 text-left">노출 인원</th>
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
                  <td className="pl-5">{org.estimatedCostRange}</td>
                  <td className="pl-5">{org.organizationName}</td>
                  <td className="pl-5">
                    <div
                      onClick={() => onSelectEvent(org)}
                      className="line-clamp-1 cursor-pointer transition-colors hover:text-blue-600 hover:font-bold"
                    >
                      {org.campaignName}
                    </div>
                  </td>
                  <td className="pl-5">
                    <div className="flex gap-1 flex-wrap">
                      {org.matchedTags.map((tag, idx) => (
                        <Tag key={idx} label={tag} />
                      ))}
                    </div>
                  </td>
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
    if (!samplingProposalId) {
      setError('샘플링 요청 정보가 없습니다.');
      setIsLoading(false);
      return;
    }

    const fetchMatchedOrgs = async () => {
      try {
        setIsLoading(true);
        const data = await getMatchedStudentOrgs(samplingProposalId);
        setMatchedOrgs(data);
      } catch (err: any) {
        setError(err.message || '매칭 데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchedOrgs();
  }, [samplingProposalId]);

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
            samplingProposalId={samplingProposalId}
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
