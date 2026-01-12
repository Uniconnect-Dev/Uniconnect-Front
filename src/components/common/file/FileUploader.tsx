import React, { useState, useEffect } from 'react';

export interface FileUploaderProps {
  label?: string;
  maxFiles?: number;
  onFileChange?: (file: File | null) => void;
}

export default function FileUploader({
  label = '제안서 첨부 (선택)',
  maxFiles = 6,
  onFileChange,
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
    return allowed.includes(file.type);
  };

  const handleFile = (selectedFile: File) => {
    if (!validateFile(selectedFile)) return;
    setFile(selectedFile);
    onFileChange?.(selectedFile);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#6C727E] font-medium text-[16px]">
        {label}
      </label>

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const dropped = e.dataTransfer.files[0];
            if (dropped) handleFile(dropped);
          }}
          className={`
            border-2 border-dashed rounded-xl p-10 text-center transition
            ${isDragging
              ? 'border-[#008FFF] bg-[#F0F9FF]'
              : 'border-[#DADDE3] hover:border-[#008FFF]'
            }
          `}
        >
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />

            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                ☁️
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium">파일 드롭하기</p>
                <p className="text-xs text-gray-400">or</p>
              </div>
              <span className="px-5 py-2 bg-[#008FFF] text-white rounded-lg text-sm">
                파일 업로드
              </span>
            </div>
          </label>
        </div>
      ) : (
        <div className="border border-[#DADDE3] rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm truncate">{file.name}</span>
          <button
            onClick={() => {
              setFile(null);
              onFileChange?.(null);
            }}
            className="text-[#949BA7]"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}