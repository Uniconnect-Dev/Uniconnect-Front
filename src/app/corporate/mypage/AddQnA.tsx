import CorporateLayout from '@/components/layout/CorporateLayout';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddQnA() {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  return (
    <CorporateLayout>
      {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
      {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
      <div className="flex flex-col gap-6">
        {/* 이전 버튼 및 페이지 제목 */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-1.5 items-center">
            <ChevronLeft
              onClick={() => navigate('/corporatemypage/qna')}
              size={16}
              color="#949BA7"
            />
            <div className="text-zinc-700 text-xl font-bold">새 질문</div>
          </div>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
        </div>
        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 font-semibold">제목</label>
          <textarea
            rows={1}
            placeholder="질문 제목을 입력해주세요."
            className="p-4 rounded-xl outline outline-1 outline-zinc-200 resize-none"
          />
        </div>
        {/* 내용 */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 font-semibold">내용</label>
          <textarea
            value={description}
            placeholder="질문 내용을 작성해주세요."
            onChange={(e) =>
              e.target.value.length <= 300 && setDescription(e.target.value)
            }
            className="h-36 p-4 rounded-xl outline outline-1 outline-zinc-200"
          />
          <p className="text-xs text-gray-400 text-right">
            {description.length}/500
          </p>
        </div>
        {/* 별첨 자료 */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1">
            <label className="text-gray-500 font-semibold">별첨 자료</label>
            <p className="text-gray-400 font-medium">(선택)</p>
          </div>
          <div className="h-fit p-[41px] rounded-xl outline outline-1 outline-zinc-200 flex flex-col justify-center items-center">
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
        <div className="mt-auto flex justify-end">
          <button
            onClick={() => navigate('/corporatemypage/addqnadone')}
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
