import { OrderStatus } from '../../entities/Order';
import { httpClient } from '../httpClient';

export interface createOrderProps {
  user_id: string;
}

export interface createOrderResponse {
  orderId: number;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
  total: number;
  user_id: string;
}

export async function createOrder({...params}: createOrderProps) {
  const { data } = await httpClient.post<createOrderResponse>('/orders', params);
  return data;
}
