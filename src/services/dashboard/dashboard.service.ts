import axios from 'axios';
import * as T from '@/services/dashboard/dashbosrd.types';

const HOST_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// 2. baseURL 설정 시 앞에 슬래시가 중복되거나 누락되지 않도록 주의
const api = axios.create({
  baseURL: `${HOST_URL}/api/dashboard`, // absolute path로 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export const dashboardApi = {
  // [학생] 1. 수령 정보 입력
  postReceiveInfo: (data: T.ReceiveInfoRequest) =>
    api.post('/student/receive-info', data), // 경로 앞에 / 확인

  // [학생] 2. 인수증 제출
  postReceiptSubmit: (data: T.ReceiptSubmitRequest) => {
    const formData = new FormData();
    formData.append(
      'json',
      new Blob([JSON.stringify(data.json)], { type: 'application/json' })
    );
    formData.append('receiptImage', data.receiptImage);
    return api.post('/receipt/submit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // [공통] 3. 이미지 업로드
  postContentUpload: (data: T.ContentUploadRequest) => {
    const formData = new FormData();
    formData.append('collaborationId', String(data.collaborationId));
    formData.append('uploaderType', data.uploaderType);
    if (data.caption) formData.append('caption', data.caption);
    formData.append('image', data.image);
    return api.post('/content/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // [기업] 4. 제품 정보 입력
  postProductInfo: (data: T.ProductInfoRequest) =>
    api.post('/company/product-info', data),

  // [기업] 5. 발송 정보 수정
  patchShippingInfo: (data: T.ShippingInfoRequest) =>
    api.patch('/company/shipping-info', data),
};
