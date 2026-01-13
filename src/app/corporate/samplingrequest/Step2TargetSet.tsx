import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { saveSamplingTargets } from '@/services/sampling/sampling.service';
import {
  BASIC_INFO_OPTIONS,
  LIFESTYLE_TARGET_OPTIONS,
  EVENT_NATURE_OPTIONS,
  type TargetKeywordOption,
} from '@/constants/targetKeywords';

function Chip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`
        px-3 py-1.5 rounded-lg inline-flex items-center justify-center
        text-base font-medium leading-6
        transition-colors
        ${
          selected
            ? 'bg-sky-100 text-blue-600 hover:bg-sky-100'
            : 'outline outline-1 outline-offset-[-1px] outline-zinc-200 text-gray-500 hover:bg-gray-100 hover:outline-none'
        }
      `}
    >
      {label}
    </button>
  );
}

interface SelectedKeyword {
  id: number;
  label: string;
  category: 'BasicInfo' | 'Lifestyle' | 'EventNature' | 'Custom';
}

export default function Step2TargetSet() {
  const navigate = useNavigate();
  const location = useLocation();
  const samplingProposalId = (location.state as { samplingProposalId?: number })?.samplingProposalId;

  const [selectedKeywords, setSelectedKeywords] = useState<SelectedKeyword[]>([]);
  const [customKeyword, setCustomKeyword] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  const totalSelected = selectedKeywords.length;
  const maxKeywords = 3;

  const toggleKeyword = (option: TargetKeywordOption, category: 'BasicInfo' | 'Lifestyle' | 'EventNature') => {
    setSelectedKeywords((prev) => {
      const exists = prev.find((k) => k.id === option.id);
      if (exists) {
        return prev.filter((k) => k.id !== option.id);
      }
      if (prev.length >= maxKeywords) return prev;
      return [...prev, { id: option.id, label: option.label, category }];
    });
  };

  const addCustomKeyword = () => {
    if (!customKeyword.trim()) return;
    if (selectedKeywords.length >= maxKeywords) return;
    if (selectedKeywords.some((k) => k.label === customKeyword.trim())) return;

    setSelectedKeywords((prev) => [
      ...prev,
      { id: -Date.now(), label: customKeyword.trim(), category: 'Custom' },
    ]);
    setCustomKeyword('');
    setIsAddingCustom(false);
  };

  const removeKeyword = (keyword: SelectedKeyword) => {
    setSelectedKeywords((prev) => prev.filter((k) => k.id !== keyword.id));
  };

  const isSelected = (id: number) => selectedKeywords.some((k) => k.id === id);

  const handleNext = async () => {
    if (!samplingProposalId) {
      alert('샘플링 요청 정보가 없습니다. 이전 단계로 돌아가주세요.');
      navigate('/corporatesamplingrequest/step1');
      return;
    }

    try {
      await saveSamplingTargets({
        samplingProposalId,
        basicInfoKeywordIds: selectedKeywords
          .filter((k) => k.category === 'BasicInfo')
          .map((k) => k.id),
        lifestyleKeywordIds: selectedKeywords
          .filter((k) => k.category === 'Lifestyle')
          .map((k) => k.id),
        eventNatureKeywordIds: selectedKeywords
          .filter((k) => k.category === 'EventNature')
          .map((k) => k.id),
        customKeywords: selectedKeywords
          .filter((k) => k.category === 'Custom')
          .map((k) => k.label),
      });

      navigate('/corporatesamplingrequest/step3', {
        state: { samplingProposalId }
      });
    } catch (error: any) {
      alert(error.message || '타겟 저장 실패');
    }
  };

  const handlePrev = () => {
    navigate('/corporatesamplingrequest/step1');
  };

  return (
    <CorporateLayout>
      <div className="flex flex-col min-h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" alt="" className="w-5 h-5" />
            <h1 className="text-[20px] font-semibold text-[#2D3139]">
              타겟 설정
            </h1>
          </div>
          <RequestStatus activeStep={2} />
        </div>
        <div className="border-t border-gray-200 mb-6" />

        <div className="flex flex-row gap-[70px]">
          {/* 해시태그 영역 */}
          <div className="w-full flex flex-col gap-10">
            {/* 기본 */}
            <div className="flex flex-col gap-3 items-start">
              <p className="text-gray-600 font-semibold">기본</p>
              <div className="flex flex-wrap gap-2">
                {BASIC_INFO_OPTIONS.map((option) => (
                  <Chip
                    key={option.id}
                    label={option.label}
                    selected={isSelected(option.id)}
                    onToggle={() => toggleKeyword(option, 'BasicInfo')}
                  />
                ))}
              </div>
            </div>

            {/* 라이프스타일 */}
            <div className="flex flex-col gap-3 items-start">
              <p className="text-gray-600 font-semibold">라이프스타일</p>
              <div className="flex flex-wrap gap-2">
                {LIFESTYLE_TARGET_OPTIONS.map((option) => (
                  <Chip
                    key={option.id}
                    label={option.label}
                    selected={isSelected(option.id)}
                    onToggle={() => toggleKeyword(option, 'Lifestyle')}
                  />
                ))}
              </div>
            </div>

            {/* 행사 성격 */}
            <div className="flex flex-col gap-3 items-start">
              <p className="text-gray-600 font-semibold">행사 성격</p>
              <div className="flex flex-wrap gap-2">
                {EVENT_NATURE_OPTIONS.map((option) => (
                  <Chip
                    key={option.id}
                    label={option.label}
                    selected={isSelected(option.id)}
                    onToggle={() => toggleKeyword(option, 'EventNature')}
                  />
                ))}
              </div>
            </div>

            {/* 직접 입력 */}
            <div className="flex flex-col gap-3 items-start">
              <p className="text-gray-600 font-semibold">직접 입력</p>
              <div className="flex gap-2 items-center">
                {isAddingCustom ? (
                  <>
                    <input
                      type="text"
                      value={customKeyword}
                      onChange={(e) => setCustomKeyword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addCustomKeyword()}
                      placeholder="키워드 입력"
                      className="px-3 py-1.5 rounded-lg outline outline-1 outline-zinc-200 text-base"
                      autoFocus
                    />
                    <button
                      onClick={addCustomKeyword}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-base"
                    >
                      추가
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingCustom(false);
                        setCustomKeyword('');
                      }}
                      className="px-3 py-1.5 rounded-lg outline outline-1 outline-zinc-200 text-gray-500 text-base"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <Chip
                    label="+ 직접 입력"
                    selected={false}
                    onToggle={() => setIsAddingCustom(true)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* 선택된 태그 영역 */}
          <div className="w-96 shrink-0 min-h-60 px-7 py-9 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 flex flex-col gap-4">
            <p className="text-zinc-700 text-lg font-semibold">
              선택된 태그 ({totalSelected}/{maxKeywords})
            </p>

            <div className="flex flex-wrap gap-3">
              {selectedKeywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className="pl-3 pr-2 py-1 bg-sky-100 rounded-lg flex items-center gap-2"
                >
                  <span className="text-blue-600 font-medium">{keyword.label}</span>
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="w-4 h-4 flex items-center justify-center text-blue-600 hover:text-blue-800"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {totalSelected === 0 && (
              <p className="text-gray-400 text-sm">태그를 선택해주세요</p>
            )}
          </div>
        </div>

        {/* 다음 버튼 하단 정렬 영역 */}
        <div className="mt-auto flex justify-end items-end gap-4">
          <button
            onClick={handlePrev}
            className="h-14 w-[200px] rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500"
          >
            <span className="text-sky-500 font-medium text-lg">이전</span>
          </button>
          <button
            onClick={handleNext}
            disabled={totalSelected === 0}
            className={`h-14 w-[200px] rounded-xl transition-colors ${
              totalSelected > 0
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <span className={`font-medium text-lg ${totalSelected > 0 ? 'text-white' : 'text-gray-500'}`}>
              다음
            </span>
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
