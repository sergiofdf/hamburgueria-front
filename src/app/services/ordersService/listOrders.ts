import { Order } from '../../entities/Order';
import { httpClient } from '../httpClient';

type OrderListResponse = Array<Order>;

export async function listOrders() {
  const { data } = await httpClient.get<OrderListResponse>('/orders');

  return data;
}
