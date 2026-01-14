// src/services/cart.types.ts

// 장바구니 아이템
export interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

// 장바구니 응답 (조회, 추가, 수정, 삭제 공통)
export interface CartResponse {
  cartId: number;
  studentOrgId: number;
  items: CartItem[];
  totalAmount: number;
  totalItemCount: number;
}

// 장바구니 아이템 추가 요청
export interface AddCartItemRequest {
  productId: number;
  quantity: number;
}

// 장바구니 아이템 수량 수정 요청
export interface UpdateCartItemRequest {
  quantity: number;
}

// UI용 확장 타입 (선택 상태 추가)
export interface CartItemWithSelection extends CartItem {
  selected: boolean;
}
