import StudentLayout from '@/components/layout/StudentLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/lib/auth/token';

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isModified?: boolean;
};

function Textinput({ label, value, onChange, isModified = false }: InputProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="text-gray-400 font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-4 rounded-xl outline outline-1 outline-zinc-200 ${
          isModified ? 'text-black' : 'text-gray-400'
        }`}
      />
    </div>
  );
}

interface StudentOrgProfile {
  studentOrgId: number;
  schoolName: string;
  organizationName: string;
  managerName: string;
  phone: string;
  email: string;
  logoUrl: string;
  verificationLevel: number;
  safetyFlag: boolean;
  createdAt: string;
  updatedAt: string;
}

interface OriginalData {
  organizationName: string;
  email: string;
  managerName: string;
  phone: string;
  logoUrl: string;
}

export default function EditInfo() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [logoUrl, setLogoUrl] = useState('https://placehold.co/96x96');
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [managerName, setManagerName] = useState('');
  const [phone, setPhone] = useState('');

  // 원본 데이터 저장
  const [originalData, setOriginalData] = useState<OriginalData>({
    organizationName: '',
    email: '',
    managerName: '',
    phone: '',
    logoUrl: '',
  });

  useEffect(() => {
    loadProfile(true);
  }, []);

  const loadProfile = async (isInitial = false) => {
    if (isInitial) setIsPageLoading(true);
    try {
      const token = getAccessToken();

      const response = await axios.get<{
        success: boolean;
        message: string;
        data: StudentOrgProfile;
      }>(`${import.meta.env.VITE_API_BASE_URL}/api/profile/student-org/me`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        withCredentials: true,
      });

      if (response.data.success && response.data.data) {
        const data = response.data.data;

        const orgName = data.organizationName || '';
        const mgName = data.managerName || '';
        const ph = data.phone || '';
        const em = data.email || '';

        setOrganizationName(orgName);
        setManagerName(mgName);
        setPhone(ph);
        setEmail(em);

        // logoUrl을 전체 URL로 변환
        let fullLogoUrl = 'https://placehold.co/96x96';
        if (data.logoUrl) {
          const s3BaseUrl = 'https://uniconnect-250909.s3.ap-northeast-2.amazonaws.com';
          fullLogoUrl = data.logoUrl.startsWith('http')
            ? data.logoUrl
            : `${s3BaseUrl}/${data.logoUrl.replace(/^\//, '')}`;
        }
        setLogoUrl(fullLogoUrl);

        // 원본 데이터 저장
        setOriginalData({
          organizationName: orgName,
          managerName: mgName,
          phone: ph,
          email: em,
          logoUrl: fullLogoUrl,
        });
      }
    } catch (err) {
      console.error('프로필 로드 실패:', err);
      alert('프로필 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = getAccessToken();

      // logoUrl에서 S3 base URL 제거하여 상대 경로로 변환
      const s3BaseUrl = 'https://uniconnect-250909.s3.ap-northeast-2.amazonaws.com';
      const relativeLogoUrl = logoUrl.startsWith(s3BaseUrl)
        ? logoUrl.replace(`${s3BaseUrl}/`, '')
        : logoUrl === 'https://placehold.co/96x96'
        ? ''
        : logoUrl;

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile/student-org/me`,
        {
          organizationName,
          managerName,
          phone,
          email,
          logoUrl: relativeLogoUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert('저장되었습니다.');
        loadProfile();
      }
    } catch (err) {
      console.error('저장 실패:', err);
      alert('저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    loadProfile();
  };

  if (isPageLoading) {
    return (
      <StudentLayout>
        <div className="flex justify-center items-center h-full">
          <div className="text-gray-400">로딩 중...</div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="flex flex-col h-full">
        <div className="flex flex-col w-full flex-1">
          <div className="flex flex-col gap-4 w-full mb-5">
            <div className="flex flex-row gap-2">
              <img src="/building.svg" />
              <p className="text-zinc-700 text-xl font-bold">정보 수정</p>
            </div>
            <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
          </div>

          <div className="flex flex-col gap-7">
            <div className="flex inline-flex justify-between items-start">
              <div className="inline-flex flex-col justify-start items-start gap-2">
                <p className="self-stretch justify-start text-gray-400 font-semibold">
                  단체 로고
                </p>
                <img
                  className="w-24 h-24 rounded-lg border border-zinc-200"
                  src={logoUrl}
                  alt="로고"
                />
              </div>
              <div className="pt-8 flex justify-start items-center gap-2">
                <button
                  onClick={() => setLogoUrl('https://placehold.co/96x96')}
                  className="text-center justify-start text-gray-400 text-sm font-semibold hover:text-gray-600"
                >
                  삭제하기
                </button>
                <div className="w-0 h-2.5 outline outline-1 outline-offset-[-0.50px] outline-zinc-200" />
                <button className="text-center justify-start text-blue-600 text-sm font-semibold hover:text-blue-700">
                  업데이트
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-12">
              <Textinput
                label="단체명"
                value={organizationName}
                onChange={setOrganizationName}
                isModified={organizationName !== originalData.organizationName}
              />
              <Textinput
                label="이메일"
                value={email}
                onChange={setEmail}
                isModified={email !== originalData.email}
              />
            </div>
            <div className="flex flex-row gap-12">
              <Textinput
                label="담당자명"
                value={managerName}
                onChange={setManagerName}
                isModified={managerName !== originalData.managerName}
              />
              <Textinput
                label="연락처"
                value={phone}
                onChange={setPhone}
                isModified={phone !== originalData.phone}
              />
            </div>
          </div>
        </div>

        <div className="mt-auto flex justify-end items-end gap-4">
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="h-14 w-[200px] rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500 hover:bg-sky-50 transition disabled:opacity-50"
          >
            <span className="text-sky-500 font-medium text-lg">취소하기</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="h-14 w-[200px] bg-blue-600 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            <span className="text-white font-medium text-lg">
              {isSaving ? '저장 중...' : '저장하기'}
            </span>
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
