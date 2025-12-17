import React from 'react';

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
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
            <span className="cursor-pointer hover:text-[#008FFF] text-[15px] text-gray-700 font-medium h-full flex items-center">
              기업 찾기
            </span>
            <span className="cursor-pointer hover:text-[#008FFF] text-[15px] text-gray-700 font-medium h-full flex items-center">
              샘플링 요청
            </span>
            <span className="cursor-pointer hover:text-[#008FFF] text-[15px] text-gray-700 font-medium h-full flex items-center">
              제휴 / 장기 협업
            </span>
            <span className="cursor-pointer text-[#008FFF] text-[15px] font-medium h-full flex items-center relative">
              쇼핑몰
              {/* 파란 밑줄 - 상단에서 72px 위치 */}
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#008FFF]"></span>
            </span>
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
                홍길동 님
              </p>
              <p className="text-sm text-gray-500">OO대학교</p>
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
