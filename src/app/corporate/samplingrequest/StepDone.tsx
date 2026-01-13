import React from 'react';
import { useNavigate } from 'react-router-dom';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import { Check } from 'lucide-react';

export default function StepDone() {
  const navigate = useNavigate();

  const handleBrowseStudentOrgs = () => {
    navigate('/StudentGroupSearch');
  };

  const handleCheckMatching = () => {
    navigate('/mypage/matching');
  };

  return (
    <CorporateLayout>
      {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
      {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <img src="/File_Blue.png" alt="" className="w-5 h-5" />
            <h1 className="text-[20px] font-semibold text-[#2D3139]">
              접수 완료
            </h1>
          </div>
        </div>
        <div className="border-t border-gray-200 mb-6" />

        {/*성공적으로 접수되었습니다*/}
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="w-10 h-10 mb-4 rounded-full bg-blue-600 flex items-center justify-center">
            <Check className="w-7 h-7 text-white stroke-[3]" />
          </div>
          <div className="flex flex-col gap-2 mb-10">
            <p className="text-center text-blue-600 text-2xl font-bold">
              성공적으로 접수되었습니다.
            </p>
            <p className="text-center text-gray-400 text-lg font-medium">
              영업일 기준 1-2일 이내로 '매칭 확인' 페이지에서
              <br />
              성사 여부를 전달해 드리겠습니다.
            </p>
          </div>
          {/*버튼 2개 영역*/}
          <div className="flex flex-row gap-4">
            <button
              onClick={handleBrowseStudentOrgs}
              className="h-14 w-[200px] rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500"
            >
              <span className="text-sky-500 font-medium text-lg">
                학생 단체 둘러보기
              </span>
            </button>
            <button
              onClick={handleCheckMatching}
              className="h-14 w-[200px] bg-blue-600 rounded-xl"
            >
              <span className="text-white font-medium text-lg">
                매칭 확인하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </CorporateLayout>
  );
}
