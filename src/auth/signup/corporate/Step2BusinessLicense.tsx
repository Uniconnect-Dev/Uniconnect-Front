// src/auth/signup/corporate/Step2BusinessLicense.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import { uploadFile } from '@/services/s3.service';
import { AppError } from '@/lib/error/AppError';

export default function Step2BusinessLicense() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('PDF, JPG, PNG 형식의 파일만 업로드할 수 있습니다.');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedKey, setUploadedKey] = useState<string | null>(null);

  const validateFile = (selectedFile: File): boolean => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setShowError(true);
      return false;
    }
    return true;
  };

  const processFile = async (selectedFile: File) => {
    if (!validateFile(selectedFile)) return;

    setFile(selectedFile);
    setShowError(false);
    setUploading(true);
    setUploadProgress(0);

    // 진행률 애니메이션 (실제 업로드와 병행)
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      const response = await uploadFile(selectedFile, { type: 'business_license' });

      clearInterval(progressInterval);
      setUploadProgress(100);
      if (response.data) {
        setUploadedKey(response.data.key);
      } else {
        setShowError(true);
        setErrorMessage('응답 데이터가 없습니다.');
      }
      setUploadComplete(true);

      // 업로드된 key를 localStorage에 저장 (Step3에서 사용 가능)
      if (response.data) {
        localStorage.setItem('businessLicenseKey', response.data.key);
      } else {
        setShowError(true);
        setErrorMessage('응답 데이터가 없습니다.');
      }
    } catch (error) {
      clearInterval(progressInterval);
      setFile(null);
      setUploadProgress(0);

      if (error instanceof AppError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('파일 업로드 중 오류가 발생했습니다.');
      }
      setShowError(true);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) processFile(droppedFile);
  };

  return (
    <AuthLayout>
      <div className="w-full h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="w-full max-w-[416px] bg-white rounded-2xl shadow-sm px-8 py-10">
          
          {/* 진행 단계 */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#DADFE7] text-[#DADFE7] flex items-center justify-center text-[16px] font-medium pt-[0.5px]">1</div>
            <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[16px] font-medium pt-[0.5px]">2</div>
            <div className="w-6 h-6 rounded-full bg-white border-[1.5px] border-[#DADFE7] text-[#DADFE7] flex items-center justify-center text-[16px] font-medium pt-[0.5px]">3</div>
          </div>

          <h1 className="text-[24px] font-bold text-[#191F28] tracking-[-0.42px]">사업자등록증 입력</h1>
          <p className="text-[16px] text-[#949BA7] mb-8 tracking-[-0.3px]">사업자 확인을 위해 파일을 업로드해 주세요.</p>

          {/* 파일 업로드 영역 */}
          <div className="mb-10">
            <label className="block text-[15px] font-medium text-[#6C727E] mb-1.5 tracking-[-0.24px]">
              사업자등록증 파일 (1장)
            </label>

            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`group relative border rounded-2xl p-5 text-center transition-all duration-200 ${
                  isDragging
                    ? 'border-[#008FFF] bg-[#F0F9FF]'
                    : 'border-[#E5E8EB] hover:border-[#008FFF] hover:bg-[#F9FAFB]'
                }`}
              >
                <label className="cursor-pointer block">
                  <input type="file" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-4">
                      <div className={`w-[60px] h-[60px] rounded-2xl border-2 border-dashed flex items-center justify-center transition-all duration-200 ${
                        isDragging ? 'bg-white shadow-md' : 'bg-[#F2F4F7] group-hover:bg-white group-hover:shadow-md'
                      }`}>
                        <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                          <img 
                            src="/Upload.png" 
                            alt="Upload icon" 
                            className={`w-full h-full object-contain transition-transform duration-200 ${
                              isDragging ? 'scale-110' : 'group-hover:scale-110'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#4E5968]">파일 드롭하기</p>
                      <p className="text-[13px] text-[#8B95A1]">or</p>
                    </div>
                    <span className="-mt-2.5 px-[16px] py-[6px] bg-[#007AFF] text-white rounded-full text-[14px] font-medium hover:bg-[#0077CC] shadow-sm">
                      파일 업로드
                    </span>
                  </div>
                </label>
              </div>
            ) : (
              <div className="border border-[#E5E8EB] rounded-2xl p-5 bg-[#F9FAFB]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C727E" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#191F28] truncate">{file.name}</p>
                    <p className={`text-[12px] mt-0.5 ${uploadComplete ? 'text-[#008FFF] font-medium' : 'text-[#8B95A1]'}`}>
                      {uploading ? '업로드 중...' : '업로드 완료'}
                    </p>
                  </div>
                  <button
                    onClick={() => { setFile(null); setUploadComplete(false); }}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#949BA7" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
                {uploading && (
                  <div className="mt-4">
                    <div className="w-full bg-[#E5E8EB] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#008FFF] h-full transition-all duration-150 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 버튼 세트 */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/signup/corporate/step1')}
              className="flex-1 h-[48px] border border-[#008FFF] text-[#008FFF] rounded-lg text-[15px] font-semibold hover:bg-[#F0F9FF] transition-colors"
            >
              이전
            </button>
            <button
              onClick={() => navigate('/signup/corporate/step3')}
              disabled={!uploadComplete}
              className={`flex-1 h-[48px] rounded-lg text-[15px] font-semibold transition-colors ${
                uploadComplete ? 'bg-[#008FFF] text-white hover:bg-[#0077CC]' : 'bg-[#E5E8EB] text-[#B4BBC7] cursor-not-allowed'
              }`}
            >
              다음
            </button>
          </div>
        </div>
      </div>

      {/* 에러 모달 */}
      {showError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-[320px] w-full shadow-xl text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF4D4F" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3 className="text-[18px] font-bold text-[#191F28] mb-2">업로드 오류</h3>
            <p className="text-[14px] text-[#6C727E] mb-6">{errorMessage}</p>
            <button
              onClick={() => setShowError(false)}
              className="w-full py-3 bg-[#191F28] text-white rounded-xl font-semibold hover:bg-black transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}