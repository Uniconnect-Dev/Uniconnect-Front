import CorporateLayout from '../../../components/layout/CorporateLayout';

import { useState } from 'react';

import { Calendar, ChevronLeft } from 'lucide-react';

//API 연결 이후 플로우 수정이 들어가면 이 부분은 라우팅 시 토글된 행에서 Props로 받아올 것 같습니다.
type QnAStatus = 'before-ans' | 'complete';

interface QnAData {
  id: string;
  date: string;
  QnAName: string;
  status: QnAStatus;
}

const QnAData: QnAData[] = [
  {
    id: '01',
    date: '2025.12.29',
    QnAName: '이화여대 중앙 실전 IT 창업 학회 UNIS',
    status: 'before-ans',
  },
];

/* 문의 상태 */
function QnAStatus({ status }: { status: QnAStatus }) {
  if (status === 'before-ans') {
    return (
      <div className="w-fit px-2 py-0.5 bg-gray-100 rounded-3xl inline-flex justify-center items-center gap-2.5">
        <div className="justify-start text-gray-400 text-xs font-semibold ">
          답변 전
        </div>
      </div>
    );
  }

  // complete
  return (
    <div className="w-fit px-2 py-0.5 bg-emerald-50 rounded-3xl inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-emerald-600 text-xs font-semibold ">
        답변 완료
      </div>
    </div>
  );
}

export default function QnADetail() {
  const [isAsc, setIsAsc] = useState(true);

  return (
    <CorporateLayout>
      {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
      {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
      <div className="flex flex-col gap-5">
        {/* 이전 버튼 및 페이지 제목 */}
        <div className="flex flex-col gap-5">
          <button className="inline-flex w-fit pl-1.5 pr-3 py-1.5 bg-slate-100 rounded-lg justify-start items-center gap-1 hover:bg-slate-200 active:scale-98 transition-all">
            <ChevronLeft size={16} color="#949BA7" />
            <div className="text-gray-400 font-semibold">이전</div>
          </button>
          <div className="text-zinc-700 text-xl font-bold">
            질문 및 답변 상세
          </div>
        </div>
        {/* 질문 내용 박스*/}
        <div className="flex flex-col p-10 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-gray-100 gap-7">
          {QnAData.map((qna) => (
            <div key={qna.id} className="flex flex-col">
              <QnAStatus status={qna.status} />
              <div className="flex flex-row justify-between">
                <div className="text-gray-600 text-lg font-semibold mb-1.5 mt-2">
                  {qna.QnAName}
                </div>
                <button
                  type="button"
                  onClick={() => setIsAsc((prev) => !prev)}
                  className="inline-flex items-center gap-2 cursor-pointer select-none"
                >
                  <img
                    src={isAsc ? '/CaretDown.svg' : '/CaretUp.svg'}
                    alt="sort"
                  />
                </button>
              </div>
              <div className="flex flex-row gap-1">
                <Calendar size={20} color="#949BA7" />
                <div className="text-gray-400 font-medium">{qna.date}</div>
              </div>
            </div>
          ))}
          {isAsc && (
            <>
              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />

              <div className="flex flex-col gap-1.5">
                <div className="self-stretch text-gray-400 font-semibold">
                  질문
                </div>
                <div className="self-stretch text-gray-600 font-medium">
                  I would like to know more about the payment terms in the
                  partnership agreement. Specifically, I need clarification on
                  the payment schedule and whether invoices should be submitted
                  monthly or quarterly. Also, are there any penalties for late
                  submissions?
                  <br />I would like to know more about the payment terms in the
                  partnership agreement. Specifically, I need clarification on
                  the payment schedule and whether invoices should be submitted
                  monthly or quarterly. Also, are there any penalties for late
                  submissions?
                </div>

                <div className="w-fit pl-2 pr-3 py-1.5 bg-slate-100 rounded-lg inline-flex justify-start items-center gap-1 mt-1.5">
                  <img src="/file-pdf.svg" />
                  <div className="text-gray-500 text-xs font-medium">
                    질문 사항.pdf
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* 답변 내용 박스*/}
        <div className="self-stretch px-10 pt-9 pb-10 bg-slate-100 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-gray-100 inline-flex flex-col justify-start items-start gap-3">
          <div className="self-stretch justify-start text-gray-400  font-semibold ">
            답변
          </div>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100"></div>
          <div className="self-stretch justify-start text-gray-600font-medium ">
            Thank you for your inquiry. Payment terms are outlined in Section
            3.2 of the partnership agreement. Invoices should be submitted
            monthly by the 5th of each month for the previous month's
            activities. Payment will be processed within 14 business days of
            invoice approval. Late submissions may delay payment but do not
            incur penalties unless repeatedly missed. Please let us know if you
            need any clarification.
          </div>
        </div>
      </div>
    </CorporateLayout>
  );
}
