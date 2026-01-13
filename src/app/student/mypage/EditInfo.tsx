import StudentLayout from '@/components/layout/StudentLayout';

type InputProps = {
  label: string;
};

function Textinput({ label }: InputProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="text-gray-400 font-semibold">{label}</label>
      <input className="w-full p-4 rounded-xl outline outline-1 outline-zinc-200" />
    </div>
  );
}

export default function EditInfo() {
  //const navigate = useNavigate();
  return (
    <>
      <StudentLayout>
        {/* 이 부분이 오른쪽 큰 흰 박스 안에 들어감 */}
        {/* 다음 버튼 하단 고정을 위해 최상위 div 높이 지정함 */}
        <div className="flex flex-col h-full">
          <div className="flex flex-col w-full flex-1">
            {/* 정보 수정 + 구분선*/}
            <div className="flex flex-col gap-4 w-full mb-5">
              <div className="flex flex-row gap-2">
                <img src="/building.svg" />
                <p className="text-zinc-700 text-xl font-bold">정보 수정</p>
              </div>
              <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
            </div>
            {/* 정보 영역 */}
            <div className="flex flex-col gap-7">
              <div className="flex inline-flex justify-between items-start">
                <div className="inline-flex flex-col justify-start items-start gap-2">
                  <p className="self-stretch justify-start text-gray-400 font-semibold">
                    단체 로고
                  </p>
                  <img
                    className="w-24 h-24 rounded-lg border border-zinc-200"
                    src="https://placehold.co/96x96"
                  />
                </div>
                <div className="pt-8 flex justify-start items-center gap-2">
                  <p className="text-center justify-start text-gray-400 text-sm font-semibold">
                    삭제하기
                  </p>
                  <div className="w-0 h-2.5 outline outline-1 outline-offset-[-0.50px] outline-zinc-200" />
                  <p className="text-center justify-start text-blue-600 text-sm font-semibold">
                    업데이트
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-12">
                <Textinput label="단체명" />
                <Textinput label="이메일" />
              </div>
              <div className="flex flex-row gap-12">
                <Textinput label="담당자명" />
                <Textinput label="연락처" />
              </div>
            </div>
          </div>
          {/*다음 버튼 하단 정렬 영역*/}
          <div className="mt-auto flex justify-end items-end gap-4">
            <button
              //onClick={handlePrev}
              className="h-14 w-[200px] rounded-xl outline outline-1 outline-offset-[-1px] outline-sky-500"
            >
              <span className="text-sky-500 font-medium text-lg">취소하기</span>
            </button>
            <button
              //onClick={handleNext}
              className="h-14 w-[200px] bg-blue-600 rounded-xl"
            >
              <span className="text-white font-medium text-lg">저장하기</span>
            </button>
          </div>
        </div>
      </StudentLayout>
    </>
  );
}
