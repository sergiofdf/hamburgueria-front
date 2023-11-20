import { OrderStatus } from './../../entities/Order';
import { httpClient } from '../httpClient';

export interface updateOrderProps {
  id: number;
  orderStatus: OrderStatus;
}

export async function updateOrderStatus({id, orderStatus}: updateOrderProps) {
  return await httpClient.patch(`/orders/${id}`, {status: orderStatus});
}
