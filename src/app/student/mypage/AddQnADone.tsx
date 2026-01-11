import React from 'react';
import CorporateLayout from '../../../components/layout/CorporateLayout';
import RequestStatus from '@/components/common/RequestStatus';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

export default function AddQnADone() {
  const navigate = useNavigate();
  return (
    <CorporateLayout>
      {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
      {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
      <div className="flex flex-col h-full">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold mb-2">접수 완료</h1>
            <p className="text-sm text-gray-500 mb-6">질문 업로드</p>
          </div>
        </div>
        <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100 mb-6"></div>

        {/*성공적으로 접수되었습니다*/}
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="w-10 h-10 mb-4 rounded-full bg-blue-600 flex items-center justify-center">
            <Check className="w-7 h-7 text-white stroke-[3]" />
          </div>
          <div className="flex flex-col gap-2 mb-10">
            <p className="text-center text-blue-600 text-2xl font-bold">
              성공적으로 업로드되었습니다.
            </p>
          </div>
          {/*버튼 영역*/}

          <button
            onClick={() => navigate('/studentmypage/qna')}
            className="h-14 w-[200px] bg-blue-600 rounded-xl"
          >
            <span className="text-white font-medium text-lg">
              질문 확인하기
            </span>
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
