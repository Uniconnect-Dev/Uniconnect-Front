import CorporateLayout from '@/components/layout/CorporateLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/lib/auth/token';

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function Textinput({ label, value, onChange }: InputProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="text-gray-400 font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 rounded-xl outline outline-1 outline-zinc-200"
      />
    </div>
  );
}

interface CompanyProfile {
  companyId: number;
  brandName: string;
  logoUrl: string;
  mainContactId: number;
  industryId: number;
  industryName: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('https://placehold.co/96x96');
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const token = getAccessToken();
      console.log('Token:', token);

      const response = await axios.get<{
        success: boolean;
        message: string;
        data: CompanyProfile;
      }>(`${import.meta.env.VITE_API_BASE_URL}/api/profile/company/me`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        withCredentials: true,
      });

      console.log('API Response:', response.data);

      if (response.data.success && response.data.data) {
        const data = response.data.data;
        console.log('Profile Data:', data);

        setBrandName(data.brandName || '');

        // logoUrl을 전체 URL로 변환
        const fullLogoUrl = data.logoUrl
          ? `${import.meta.env.VITE_API_BASE_URL}/${data.logoUrl}`
          : 'https://placehold.co/96x96';

        setLogoUrl(fullLogoUrl);
        console.log('Full Logo URL:', fullLogoUrl); // URL 확인
      }
    } catch (err) {
      console.error('프로필 로드 실패:', err);
      alert('프로필 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = getAccessToken();

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile/company/me`,
        {
          brandName: brandName,
          logoUrl: logoUrl.replace(`${import.meta.env.VITE_API_BASE_URL}/`, ''), // 상대 경로로 변환
          mainContactId: 0, // 실제 값이 필요하면 state로 관리
          industryId: 0, // 실제 값이 필요하면 state로 관리
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
        loadProfile(); // 저장 후 최신 정보 다시 불러오기
      }
    } catch (err) {
      console.error('저장 실패:', err);
      alert('저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    loadProfile(); // 초기 데이터로 되돌리기
  };

  if (isLoading) {
    return (
      <CorporateLayout>
        <div className="flex justify-center items-center h-full">
          <div className="text-gray-400">로딩 중...</div>
        </div>
      </CorporateLayout>
    );
  }

  return (
    <CorporateLayout>
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
                value={brandName}
                onChange={setBrandName}
              />
              <Textinput label="이메일" value={email} onChange={setEmail} />
            </div>
            <div className="flex flex-row gap-12">
              <Textinput
                label="담당자명"
                value={contactName}
                onChange={setContactName}
              />
              <Textinput label="연락처" value={phone} onChange={setPhone} />
            </div>
          </div>
        </div>

        <div className="mt-auto flex justify-end items-end gap-4">
          <button
            onClick={handleCancel}
            className="h-14 w-[200px] rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500 hover:bg-sky-50 transition"
          >
            <span className="text-sky-500 font-medium text-lg">취소하기</span>
          </button>
          <button
            onClick={handleSave}
            className="h-14 w-[200px] bg-blue-600 rounded-xl hover:bg-blue-700 transition"
          >
            <span className="text-white font-medium text-lg">저장하기</span>
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
