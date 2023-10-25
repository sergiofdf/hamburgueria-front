import { Order } from '../../entities/Order';
import { httpClient } from '../httpClient';

export async function findOneOrder(id: number) {
  const { data } = await httpClient.get<Order>(`/orders/${id}`);

  return data;
}
