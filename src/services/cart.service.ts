// src/services/cart.service.ts

import { api } from '@/lib/api/client';
import type {
  CartResponse,
  AddCartItemRequest,
  UpdateCartItemRequest,
} from './cart.types';

/**
 * 장바구니 조회 (없으면 자동 생성)
 */
export async function getCart(studentOrgId: number): Promise<CartResponse> {
  return api.get(`/api/carts/${studentOrgId}`);
}

/**
 * 장바구니에 상품 추가
 */
export async function addCartItem(
  studentOrgId: number,
  data: AddCartItemRequest
): Promise<CartResponse> {
  return api.post(`/api/carts/${studentOrgId}/items`, data);
}

/**
 * 장바구니 아이템 수량 수정
 */
export async function updateCartItemQuantity(
  studentOrgId: number,
  cartItemId: number,
  data: UpdateCartItemRequest
): Promise<CartResponse> {
  return api.put(`/api/carts/${studentOrgId}/items/${cartItemId}`, data);
}

/**
 * 장바구니 아이템 삭제
 */
export async function removeCartItem(
  studentOrgId: number,
  cartItemId: number
): Promise<CartResponse> {
  return api.delete(`/api/carts/${studentOrgId}/items/${cartItemId}`);
}

/**
 * 장바구니 전체 초기화
 */
export async function clearCart(studentOrgId: number): Promise<void> {
  return api.delete(`/api/carts/${studentOrgId}`);
}
