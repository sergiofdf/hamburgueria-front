import { OrderStatus } from './../../entities/Order';
import { httpClient } from '../httpClient';

export interface cancelOrderResponse {
  orderId: number;
  status: OrderStatus;
}

export async function cancelOrder(id: number) {
  return await httpClient.patch<cancelOrderResponse>(`/orders/${id}`, {status: OrderStatus.CANCELLED});
}
