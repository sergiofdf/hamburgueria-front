import { httpClient } from '../httpClient';

export async function removeOrder(id: number) {
  return await httpClient.delete(`/orders/${id}`);
}
