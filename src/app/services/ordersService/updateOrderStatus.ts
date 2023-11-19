import { OrderStatus } from './../../entities/Order';
import { httpClient } from '../httpClient';

export async function updateOrderStatus(id: number, orderStatus: OrderStatus) {
  return await httpClient.patch(`/orders/${id}`, {status: orderStatus});
}
