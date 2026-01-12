// src/services/s3.types.ts

export interface S3UploadMeta {
  key: string; // S3 저장 경로/파일명 (필수)
  [k: string]: unknown;
}

export interface S3UploadResponse {
  code: string;
  message: string;
  data: {
    url?: string;
    key: string;
  } | null;
}
