// src/lib/services/dashboard.service.ts
import { api } from '@/lib/api/client';

export const postReceiveInfo = async (data: {
  collaborationId: number;
  receiverName: string;
  receiverPhone: string;
  note: string;
}) => {
  return api.post('/api/dashboard/student/receive-info', data);
};

export const postProductInfo = async (data: {
  collaborationId: number;
  productName: string;
  quantity: number;
  description: string;
}) => {
  return api.post('/api/dashboard/company/product-info', data);
};

export const patchShippingInfo = async (data: {
  collaborationId: number;
  shippingDate: string;
  isShipped: boolean;
  trackingNo: string;
}) => {
  return api.patch('/api/dashboard/company/shipping-info', data);
};

export const postReceiptSubmit = async (data: {
  json: any;
  receiptImage: File;
}) => {
  const formData = new FormData();
  formData.append('json', JSON.stringify(data.json));
  formData.append('receiptImage', data.receiptImage);

  return api.post('/api/dashboard/receipt/submit', formData);
};

export const postContentUpload = async (data: {
  collaborationId: number;
  uploaderType: string;
  caption: string;
  image: File;
}) => {
  const formData = new FormData();
  formData.append('collaborationId', String(data.collaborationId));
  formData.append('uploaderType', data.uploaderType);
  formData.append('caption', data.caption);
  formData.append('image', data.image);

  return api.post('/api/dashboard/content/upload', formData);
};
