// types.ts

export type UploaderType = 'Company' | 'StudentOrg' | 'Admin';

// 1. 학생: 수령 정보 (POST /api/dashboard/student/receive-info)
export interface ReceiveInfoRequest {
  collaborationId: number;
  receiverName: string;
  receiverPhone: string;
  note: string; // 수령 주소 등
}

// 2. 학생/기업 공통: 이미지 업로드 (POST /api/dashboard/content/upload)
export interface ContentUploadRequest {
  collaborationId: number;
  uploaderType: UploaderType;
  caption?: string;
  image: File;
}

// 3. 학생: 인수증 제출 (POST /api/dashboard/receipt/submit)
export interface ReceiptSubmitRequest {
  json: {
    receiptTime: string;
    location: string;
    receivedQuantity: number;
    unit: string;
    expirationDate: string;
    hasDefect: boolean;
    remarks: string;
  };
  receiptImage: File;
}

// 4. 기업: 제품 정보 (POST /api/dashboard/company/product-info)
export interface ProductInfoRequest {
  collaborationId: number;
  productName: string;
  quantity: number;
  description: string;
}

// 5. 기업: 발송 정보 (PATCH /api/dashboard/company/shipping-info)
export interface ShippingInfoRequest {
  collaborationId: number;
  shippingDate: string; // YYYY-MM-DD
  isShipped: boolean;
  trackingNo: string;
}

// 6. 기업: 행사 날짜 픽스 (PATCH /api/dashboard/company/date-fix)
export interface DateFixRequest {
  collaborationId: number;
  eventDate: string;
}
