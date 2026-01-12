import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../../components/layout/StudentLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { useCampaignForm } from '@/context/CampaignFormContext';
import { getFirstPageInfo, saveFirstPageInfo } from '@/services/campaign.service';

/* =========================
   TextInput (로컬 UI 컴포넌트)
========================= */
interface TextInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

function TextInput({
  label,
  placeholder,
  value,
  readOnly = false,
  onChange,
}: TextInputProps) {
  return (
    <div className="flex flex-1 flex-col max-w-[960px] gap-2">
      <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px]">
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full p-4 rounded-xl transition-all
          ${
            readOnly
              ? 'bg-[#F3F5F9] cursor-default outline-none text-[16px] text-[#949BA7]'
              : 'bg-white outline outline-1 outline-zinc-200 hover:outline-gray-300 focus:outline-[#008FFF]'
          }`}
      />
    </div>
  );
}

/* =========================
   Step 1 – 단체 정보
========================= */
export default function GroupInfoStep() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCampaignForm();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 첫 페이지 정보 조회
  useEffect(() => {
    const fetchFirstPageInfo = async () => {
      try {
        const response = await getFirstPageInfo();
        updateFormData({
          schoolName: response.schoolName,
          organizationName: response.organizationName,
        });
      } catch (error) {
        console.error('첫 페이지 정보 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFirstPageInfo();
  }, []);

  const handleNext = async () => {
    // 필수 필드 검증
    if (!formData.managerName || !formData.managerPhone || !formData.managerEmail) {
      alert('담당자 정보를 모두 입력해주세요.');
      return;
    }

    setIsSaving(true);
    try {
      // 담당자 정보 저장
      await saveFirstPageInfo({
        managerName: formData.managerName,
        managerPhone: formData.managerPhone,
        managerEmail: formData.managerEmail,
      });
      navigate('/studentsampling/step2');
    } catch (error) {
      console.error('담당자 정보 저장 실패:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">로딩 중...</p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="flex flex-col h-full max-w-[93%] mx-auto">
        {/* 상단 헤더 */}
        <div className="flex justify-between items-start w-full mt-2 mb-8">
          <div>
            <h1 className="text-[24px] font-semibold tracking-[-0.366px] mb-1">
              제휴 / 장기 협업
            </h1>
            <p className="text-[#949BA7] text-[15px] tracking-[-0.225px]">
              단체 정보를 입력 혹은 수정해주세요.
            </p>
          </div>

          {/* 공통 컴포넌트 사용 */}
          <RequestStatus activeStep={1} />
        </div>

        <div className="w-full h-[1px] bg-gray-200 mb-9" />

        {/* 본문 */}
        <div className="flex flex-col gap-8 w-full max-w-[1000px]">
          <div className="flex flex-row gap-10">
            <TextInput
              label="학교명"
              value={formData.schoolName}
              readOnly
            />
            <TextInput
              label="단체명"
              value={formData.organizationName}
              readOnly
            />
          </div>

          <div className="flex flex-row gap-10">
            <TextInput
              label="담당자명"
              value={formData.managerName}
              placeholder="담당자 이름을 입력해주세요"
              onChange={(value) => updateFormData({ managerName: value })}
            />
            <TextInput
              label="전화번호"
              value={formData.managerPhone}
              placeholder="담당자 전화번호를 입력해주세요 (예: 010-0000-0000)"
              onChange={(value) => updateFormData({ managerPhone: value })}
            />
          </div>

          <div className="flex flex-row gap-10">
            <div className="flex-1 max-w-[calc(50%-20px)]">
              <label className="text-[#6C727E] font-medium text-[16px] tracking-[-0.24px] block mb-2">
                이메일
              </label>
              <input
                type="email"
                value={formData.managerEmail}
                onChange={(e) => updateFormData({ managerEmail: e.target.value })}
                placeholder="이메일을 입력해주세요"
                className="w-full p-4 rounded-xl outline outline-1 outline-zinc-200
                  text-gray-600 focus:outline-[#008FFF]"
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-auto flex justify-end pb-10">
          <button
            onClick={handleNext}
            disabled={isSaving}
            className={`h-14 w-[200px] rounded-xl transition-colors ${
              isSaving
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#007AFF] hover:bg-[#0062CC]'
            }`}
          >
            <span className="text-white font-medium text-lg tracking-[-0.27px]">
              {isSaving ? '저장 중...' : '다음'}
            </span>
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
