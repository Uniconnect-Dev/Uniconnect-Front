import CorporateLayout from '../../../components/layout/CorporateLayout';

import { useState } from 'react';

import { Calendar, ChevronLeft } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function WriteContract() {
  const navigate = useNavigate();
  return (
    <CorporateLayout>
      {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
      {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
      <div className="flex flex-col">
        {/* 이전 버튼 및 페이지 제목 */}
        <div className="flex flex-col gap-5 mb-6">
          <button className="inline-flex w-fit pl-1.5 pr-3 py-1.5 bg-slate-100 rounded-lg justify-start items-center gap-1 hover:bg-slate-200 active:scale-98 transition-all">
            <ChevronLeft size={16} color="#949BA7" />
            <div className="text-gray-400 font-semibold">이전</div>
          </button>
          <div className="flex flex-row gap-2">
            <img src="/building.svg" />
            <div className="text-zinc-700 text-xl font-bold">계약서 작성</div>
          </div>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
        </div>

        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <div className="p-2 bg-slate-100 rounded-2xl inline-flex justify-start items-center gap-1.5">
              <div className="px-2 py-0.5 bg-sky-100 rounded-3xl flex justify-center items-center gap-2.5">
                <span className="text-sky-500 text-xs font-semibold">
                  STEP 1
                </span>
              </div>
              <p className="text-zinc-700 font-medium">
                계약서 파일을 다운로드해주세요.
              </p>
            </div>
            <button className="w-fit h-14 px-7 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-center items-center gap-2.5">
              <span className="w-36 text-center text-zinc-700 text-lg font-semibold">
                파일 다운로드
              </span>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="p-2 bg-slate-100 rounded-2xl inline-flex justify-start items-center gap-1.5">
              <div className="px-2 py-0.5 bg-sky-100 rounded-3xl flex justify-center items-center gap-2.5">
                <span className="text-sky-500 text-xs font-semibold">
                  STEP 2
                </span>
              </div>
              <p className="text-zinc-700 font-medium">
                서명을 진행 후 업로드해주세요.
              </p>
            </div>
            <div className="h-fit p-[41px] rounded-xl outline outline-1 outline-zinc-200 flex flex-col justify-center items-center mb-4">
              <div className="w-14 h-14 relative bg-gray-100 rounded-xl border border-dashed border-gray-400 overflow-hidden flex justify-center items-center">
                <img src="/Upload.svg" />
              </div>
              <div className="text-sm font-semibold mt-2.5">파일 드롭하기</div>
              <div className="text-gray-400 text-sm font-semibold mb-1">or</div>
              <button className="w-fit px-3.5 py-1.5 bg-blue-600 rounded-[100px] gap-2.5">
                <span className="text-white text-sm font-semibold">
                  파일 업로드
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-auto flex justify-end">
          <button
            onClick={() => navigate('/studentmypage/writecontractdone')}
            className="h-14 w-[200px] bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            <span className="w-36 text-gray-400 text-lg font-semibold">
              다음
            </span>
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
