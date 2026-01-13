import CorporateLayout from '@/components/layout/CorporateLayout';
import { ChevronLeft, X } from 'lucide-react';
import { useState, useRef, DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQnA } from '@/services/qna/addqna.service';

export default function AddQnA() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 파일 추가
  const handleFileAdd = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const fileArray = Array.from(newFiles);
    setFiles((prev) => [...prev, ...fileArray]);
  };

  // 파일 제거
  const handleFileRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 드래그 앤 드롭
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileAdd(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 제출
  const handleSubmit = async () => {
    // 유효성 검사
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const response = await createQnA({
        title: title.trim(),
        content: content.trim(),
        agreePersonalInfo: true, // 다음 페이지에서 받을 값
        agreeNotification: true, // 다음 페이지에서 받을 값
        files: files.length > 0 ? files : undefined,
      });

      console.log('Q&A 등록 성공:', response);
      // 성공 시 다음 페이지로 이동
      navigate('/corporatemypage/addqnadone');
    } catch (err) {
      console.error('Q&A 등록 실패:', err);
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = title.trim() && content.trim();

  return (
    <CorporateLayout>
      <div className="flex flex-col gap-6">
        {/* 이전 버튼 및 페이지 제목 */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-1.5 items-center">
            <ChevronLeft
              onClick={() => navigate('/corporatemypage/qna')}
              size={16}
              color="#949BA7"
              className="cursor-pointer"
            />
            <div className="text-zinc-700 text-xl font-bold">새 질문</div>
          </div>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100" />
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 font-semibold">제목</label>
          <textarea
            rows={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="질문 제목을 입력해주세요."
            className="p-4 rounded-xl outline outline-1 outline-zinc-200 resize-none"
          />
        </div>

        {/* 내용 */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 font-semibold">내용</label>
          <textarea
            value={content}
            placeholder="질문 내용을 작성해주세요."
            onChange={(e) =>
              e.target.value.length <= 500 && setContent(e.target.value)
            }
            className="h-36 p-4 rounded-xl outline outline-1 outline-zinc-200 resize-none"
          />
          <p className="text-xs text-gray-400 text-right">
            {content.length}/500
          </p>
        </div>

        {/* 별첨 자료 */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1">
            <label className="text-gray-500 font-semibold">별첨 자료</label>
            <p className="text-gray-400 font-medium">(선택)</p>
          </div>

          {/* 파일 목록 */}
          {files.length > 0 && (
            <div className="flex flex-col gap-2 mb-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    onClick={() => handleFileRemove(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 파일 업로드 영역 */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="h-fit p-[41px] rounded-xl outline outline-1 outline-zinc-200 flex flex-col justify-center items-center"
          >
            <div className="w-14 h-14 relative bg-gray-100 rounded-xl border border-dashed border-gray-400 overflow-hidden flex justify-center items-center">
              <img src="/Upload.svg" alt="upload" />
            </div>
            <div className="text-sm font-semibold mt-2.5">파일 드롭하기</div>
            <div className="text-gray-400 text-sm font-semibold mb-1">or</div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) => handleFileAdd(e.target.files)}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-fit px-3.5 py-1.5 bg-blue-600 rounded-[100px] gap-2.5 hover:bg-blue-700"
              type="button"
            >
              <span className="text-white text-sm font-semibold">
                파일 업로드
              </span>
            </button>
          </div>
        </div>

        {/* 다음 버튼 */}
        <div className="mt-auto flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isUploading}
            className={`h-14 w-[200px] rounded-xl transition-colors ${
              isFormValid && !isUploading
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-200'
            }`}
          >
            <span
              className={`text-lg font-semibold ${
                isFormValid && !isUploading ? 'text-white' : 'text-gray-400'
              }`}
            >
              {isUploading ? '처리중...' : '다음'}
            </span>
          </button>
        </div>
      </div>
    </CorporateLayout>
  );
}
