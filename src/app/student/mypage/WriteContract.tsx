import StudentLayout from '../../../components/layout/StudentLayout';

import { useState, useRef } from 'react';

import { Calendar, ChevronLeft, X } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function WriteContract() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // 파일 업로드 버튼 클릭
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // 파일 삭제
  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <StudentLayout>
      <div className="flex flex-col">
        {/* 이전 버튼 및 페이지 제목 */}
        <div className="flex flex-col gap-5 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex w-fit pl-1.5 pr-3 py-1.5 bg-slate-100 rounded-lg justify-start items-center gap-1 hover:bg-slate-200 active:scale-98 transition-all"
          >
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
          {/* STEP 1 */}
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
            <button className="w-fit h-14 px-7 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-center items-center gap-2.5 hover:bg-gray-50 transition-colors">
              <span className="w-36 text-center text-zinc-700 text-lg font-semibold">
                파일 다운로드
              </span>
            </button>
          </div>

          {/* STEP 2 */}
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

            {/* 파일 업로드 영역 */}
            {!uploadedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`h-fit p-[41px] rounded-xl outline outline-1 flex flex-col justify-center items-center mb-4 transition-colors ${
                  isDragging
                    ? 'outline-blue-500 bg-blue-50'
                    : 'outline-zinc-200 bg-white'
                }`}
              >
                <div className="w-14 h-14 relative bg-gray-100 rounded-xl border border-dashed border-gray-400 overflow-hidden flex justify-center items-center">
                  <img src="/Upload.svg" alt="Upload" />
                </div>
                <div className="text-sm font-semibold mt-2.5">
                  파일 드롭하기
                </div>
                <div className="text-gray-400 text-sm font-semibold mb-1">
                  or
                </div>
                <button
                  onClick={handleUploadClick}
                  className="w-fit px-3.5 py-1.5 bg-blue-600 rounded-[100px] gap-2.5 hover:bg-blue-700 transition-colors"
                >
                  <span className="text-white text-sm font-semibold">
                    파일 업로드
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </div>
            ) : (
              // 업로드된 파일 표시
              <div className="p-4 rounded-xl outline outline-1 outline-zinc-200 flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.667 1.667H5.833c-.92 0-1.666.746-1.666 1.666v13.334c0 .92.746 1.666 1.666 1.666h8.334c.92 0 1.666-.746 1.666-1.666V6.667l-4.166-5z"
                        fill="#3B82F6"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-zinc-700">
                      {uploadedFile.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatFileSize(uploadedFile.size)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X size={16} color="#9CA3AF" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 다음 버튼 */}
        <div className="mt-auto flex justify-end">
          <button
            onClick={() => navigate('/studentmypage/writecontractdone')}
            disabled={!uploadedFile}
            className={`h-14 w-[200px] rounded-xl transition-colors ${
              uploadedFile
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <span
              className={`w-36 text-lg font-semibold ${
                uploadedFile ? 'text-white' : 'text-gray-400'
              }`}
            >
              다음
            </span>
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
