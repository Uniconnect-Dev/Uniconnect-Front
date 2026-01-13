// QnADetail.tsx
import CorporateLayout from '../../../components/layout/CorporateLayout';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Calendar, ChevronLeft } from 'lucide-react';
import { getQnADetail } from '@/services/qna/qna.services';
import type { QnADetailItem } from '@/services/qna/qna.types';

type QnAStatus = 'before-ans' | 'complete';

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

  return (
    <div className="w-fit px-2 py-0.5 bg-emerald-50 rounded-3xl inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-emerald-600 text-xs font-semibold ">
        답변 완료
      </div>
    </div>
  );
}

export default function QnADetail() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const [isAsc, setIsAsc] = useState(true);
  const [qnaData, setQnaData] = useState<QnADetailItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (questionId) {
      loadQnADetail(Number(questionId));
    }
  }, [questionId]);

  const loadQnADetail = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await getQnADetail(id);
      console.log('QnA Detail:', response);
      setQnaData(response);
    } catch (err) {
      console.error('Q&A 상세 정보 로드 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString)
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '.')
      .replace(/\.$/, '');
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

  if (!qnaData) {
    return (
      <CorporateLayout>
        <div className="flex justify-center items-center h-full">
          <div className="text-gray-400">Q&A 정보를 찾을 수 없습니다.</div>
        </div>
      </CorporateLayout>
    );
  }

  const status: QnAStatus =
    qnaData.status === 'ANSWERED' ? 'complete' : 'before-ans';

  return (
    <CorporateLayout>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigate('/corporatemypage/qna')}
            className="inline-flex w-fit pl-1.5 pr-3 py-1.5 bg-slate-100 rounded-lg justify-start items-center gap-1 hover:bg-slate-200 active:scale-98 transition-all"
          >
            <ChevronLeft size={16} color="#949BA7" />
            <div className="text-gray-400 font-semibold">이전</div>
          </button>
          <div className="text-zinc-700 text-xl font-bold">
            질문 및 답변 상세
          </div>
        </div>

        <div className="flex flex-col p-10 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-gray-100 gap-7">
          <div className="flex flex-col">
            <QnAStatus status={status} />
            <div className="flex flex-row justify-between">
              <div className="text-gray-600 text-lg font-semibold mb-1.5 mt-2">
                {qnaData.title}
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
              <div className="text-gray-400 font-medium">
                {formatDate(qnaData.createdAt)}
              </div>
            </div>
          </div>

          {isAsc && (
            <>
              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />

              <div className="flex flex-col gap-1.5">
                <div className="self-stretch text-gray-400 font-semibold">
                  질문
                </div>
                <div className="self-stretch text-gray-600 font-medium whitespace-pre-wrap">
                  {qnaData.content}
                </div>

                {qnaData.fileUrls && qnaData.fileUrls.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1.5">
                    {qnaData.fileUrls.map((url, index) => (
                      <a>
                        key={index}
                        href={url}
                        target="_blank" rel="noopener noreferrer"
                        className="w-fit pl-2 pr-3 py-1.5 bg-slate-100
                        rounded-lg inline-flex justify-start items-center gap-1
                        hover:bg-slate-200 transition"
                        <img src="/file-pdf.svg" alt="file" />
                        <div className="text-gray-500 text-xs font-medium">
                          첨부파일 {index + 1}
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {qnaData.answerContent && (
          <div className="self-stretch px-10 pt-9 pb-10 bg-slate-100 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-gray-100 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch justify-start text-gray-400 font-semibold">
              답변
            </div>
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100"></div>
            <div className="self-stretch justify-start text-gray-600 font-medium whitespace-pre-wrap">
              {qnaData.answerContent}
            </div>
          </div>
        )}
      </div>
    </CorporateLayout>
  );
}
