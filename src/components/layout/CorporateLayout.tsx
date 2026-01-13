import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getMyCompanyProfile } from '@/services/profile.service';
import type { CompanyProfileResponse } from '@/services/profile.types';

const navItems = [
  { label: '학생 단체 찾기', path: '/StudentGroupSearch' },
  { label: '샘플링 요청', path: '/corporatesamplingrequest/step1' },
  { label: '협업 제안', path: '/CollaborationProposal' },
];

interface CorporateLayoutProps {
  children: React.ReactNode;
}

export default function CorporateLayout({ children }: CorporateLayoutProps) {
  const location = useLocation();
  const [profile, setProfile] = useState<CompanyProfileResponse | null>(null);

  const isActive = (path: string) => {
    if (path === '/corporatesamplingrequest/step1') {
      return location.pathname.startsWith('/corporatesamplingrequest');
    }
    return location.pathname === path;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyCompanyProfile();
        setProfile(data);
      } catch (error) {
        console.error('프로필 조회 실패:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="h-screen bg-[#F7F8FA] flex flex-col overflow-hidden">
      {/* 상단 네비게이션 바 - 고정 */}
      <header className="w-full bg-white border-b border-gray-200 flex-shrink-0">
        <div className="w-full mx-auto flex items-center justify-start h-[72px] px-12">
          {/* 로고 */}
          <img
            src="/logo.png"
            alt="UNICONNECT Logo"
            className="h-[15px] w-auto"
          />

          {/* 메뉴 - 아이콘과 동일한 높이 */}
          <nav className="flex gap-6 px-12 items-center h-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`cursor-pointer text-[15px] font-medium h-full flex items-center relative ${
                  isActive(item.path)
                    ? 'text-[#008FFF]'
                    : 'text-gray-700 hover:text-[#008FFF]'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#008FFF]"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* 아이콘 */}
          <div className="flex items-center gap-4 ml-auto">
            <img
              src="/File.png"
              alt="장바구니"
              className="w-6 h-6 cursor-pointer"
            />
            <img
              src="/File.png"
              alt="사용자"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      </header>

      {/* 메인 컨테이너: 사이드바 + 콘텐츠 - 스크롤 가능 영역 */}
      <div className="flex w-full gap-6 p-6 flex-1 overflow-hidden">
        {/* 왼쪽 영역: 두 개의 흰 박스 (공통) - calc를 이용한 비율 유지 */}
        <aside className="w-[240px] flex flex-col gap-6 flex-shrink-0 h-full">
          {/* 첫 번째 박스: 사용자 정보 + 메뉴 - 전체의 64.5% (583/904) */}
          <div
            className="bg-white rounded-xl shadow-sm p-6 flex flex-col flex-shrink-0 overflow-y-auto"
            style={{ height: 'calc(64.5% - 12px)' }}
          >
            {/* 사용자 정보 */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-base font-semibold text-gray-900 mb-1">
                {profile?.brandName ?? '로딩 중...'}
              </p>
              <p className="text-sm text-gray-500">{profile?.industryName ?? ''}</p>
            </div>

            {/* 메뉴 */}
            <nav className="flex flex-col gap-4 text-sm text-gray-700">
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                매칭 확인
              </span>
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                정산 결제
              </span>
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                계약서 작성
              </span>
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                설문지 확인
              </span>
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                단체 정보 수정
              </span>
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                데이터 리포트 제출
              </span>
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                세금계산서 발행 요청
              </span>
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                Q&A 문의함
              </span>
            </nav>
          </div>

          {/* 두 번째 박스: 업데이트된 활동 - 전체의 35.5% (321/904) */}
          <div
            className="bg-white rounded-xl shadow-sm p-6 flex flex-col flex-shrink-0 overflow-y-auto"
            style={{ height: 'calc(35.5% - 12px)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-900">
                업데이트된 활동
              </p>
              <button className="text-xs text-gray-400">더보기</button>
            </div>

            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                매칭 완료
              </span>
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                설문지 제출
              </span>
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                설문지 제출
              </span>
              <span className="cursor-pointer hover:text-[#008FFF] flex items-center gap-2">
                <img src="/File.png" alt="" className="w-4 h-4" />
                설문지 제출
              </span>
            </div>
          </div>
        </aside>

        {/* 오른쪽 메인 콘텐츠 영역 (페이지마다 다름) - 독립 스크롤 */}
        <main className="flex-1 bg-white rounded-xl shadow-sm p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
