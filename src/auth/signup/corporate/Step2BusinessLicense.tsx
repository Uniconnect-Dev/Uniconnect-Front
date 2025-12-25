// src/auth/signup/corporate/Step2BusinessLicense.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step2BusinessLicense() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (selectedFile: File): boolean => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setShowError(true);
      return false;
    }
    return true;
  };

  const processFile = (selectedFile: File) => {
    if (!validateFile(selectedFile)) return;

    setFile(selectedFile);
    setShowError(false);
    setUploading(true);
    setUploadProgress(0);
  };

  // 업로드 진행 애니메이션
  useEffect(() => {
    if (uploading) {
      const duration = 2000; // 2초
      const interval = 50; // 50ms마다 업데이트
      const steps = duration / interval;
      const increment = 100 / steps;
      let currentProgress = 0;

      const timer = setInterval(() => {
        currentProgress += increment;
        
        if (currentProgress >= 100) {
          setUploadProgress(100);
          setUploading(false);
          setUploadComplete(true);
          clearInterval(timer);
        } else {
          setUploadProgress(currentProgress);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [uploading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadComplete(false);
    setUploading(false);
    setUploadProgress(0);
  };

  const handleNext = () => {
    if (uploadComplete) {
      navigate('/signup/corporate/step3');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      {/* 상단 로고 */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto h-[72px] px-12 flex items-center">
          <img
            src="/logo.png"
            alt="UNICONNECT Logo"
            className="h-[15px] w-auto"
          />
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm p-10">
          {/* 진행 단계 */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div className="w-8 h-8 rounded-full bg-[#008FFF] text-white flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
              3
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            사업자등록증 입력
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            아래 내용을 입력해 주세요.
          </p>

          {/* 파일 업로드 영역 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사업자등록증 파일 (1장)
            </label>

            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  isDragging
                    ? 'border-[#008FFF] bg-[#F0F9FF]'
                    : 'border-gray-300 hover:border-[#008FFF] hover:bg-[#F0F9FF]'
                }`}
              >
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        파일 드롭하기
                      </p>
                      <p className="text-xs text-gray-500">or</p>
                    </div>
                    <span className="px-6 py-2 bg-[#008FFF] text-white rounded-lg text-sm font-medium hover:bg-[#0077CC]">
                      파일 업로드
                    </span>
                  </div>
                </label>
              </div>
            ) : (
              <div className="border border-gray-300 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    {uploading && (
                      <p className="text-xs text-gray-500">업로드 중...</p>
                    )}
                    {uploadComplete && (
                      <p className="text-xs text-gray-600">Completed</p>
                    )}
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {uploading && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#008FFF] h-2 rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/signup/corporate/step1')}
              className="flex-1 py-3 border-2 border-[#008FFF] text-[#008FFF] rounded-lg font-semibold hover:bg-[#008FFF] hover:text-white transition-colors"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              disabled={!uploadComplete}
              className="flex-1 py-3 bg-[#008FFF] text-white rounded-lg font-semibold hover:bg-[#0077CC] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        </div>
      </div>

      {/* 에러 모달 */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4">
            <p className="text-center font-medium text-gray-900 mb-2">
              지원하지 않는 파일 형식입니다.
            </p>
            <p className="text-center text-sm text-gray-500 mb-6">
              pdf, jpeg, png 형식만 지원합니다.
            </p>
            <button
              onClick={() => setShowError(false)}
              className="w-full py-3 bg-[#008FFF] text-white rounded-lg font-semibold hover:bg-[#0077CC]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}